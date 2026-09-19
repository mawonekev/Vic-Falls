import {
  Activity,
  AddOn,
  ActivityBooking,
  Traveller,
  Partner,
  MappedProperty,
  AccommodationRequest,
  Payment,
  PartnerInvoice,
  IssueReport
} from './types';
import {
  INITIAL_ACTIVITIES,
  INITIAL_PARTNERS,
  INITIAL_MAPPED_PROPERTIES,
  INITIAL_ACCOMMODATION_REQUESTS,
  INITIAL_INVOICES
} from './seed-data';

// Persistent in-memory data store with atomic operations
class VicFallsDatabase {
  private activities: Activity[] = [...INITIAL_ACTIVITIES];
  private partners: Partner[] = [...INITIAL_PARTNERS];
  private mappedProperties: MappedProperty[] = [...INITIAL_MAPPED_PROPERTIES];
  private accommodationRequests: AccommodationRequest[] = [...INITIAL_ACCOMMODATION_REQUESTS];
  private activityBookings: ActivityBooking[] = [];
  private travellers: Traveller[] = [
    {
      id: 'trav-101',
      email: 'sarah.jenkins@example.co.uk',
      fullName: 'Sarah Jenkins',
      nationality: 'United Kingdom',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'trav-102',
      email: 'mchang@example.com',
      fullName: 'Michael Chang',
      nationality: 'United States',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  private payments: Payment[] = [];
  private invoices: PartnerInvoice[] = [...INITIAL_INVOICES];
  private issueReports: IssueReport[] = [];

  // ==========================================
  // TRAVELLER (Deduplicated by Email)
  // ==========================================
  public upsertTraveller(data: { email: string; fullName: string; phone?: string; nationality?: string }): Traveller {
    const normalizedEmail = data.email.trim().toLowerCase();
    let traveller = this.travellers.find(t => t.email.toLowerCase() === normalizedEmail);

    if (traveller) {
      // Update existing traveller
      traveller.fullName = data.fullName || traveller.fullName;
      if (data.phone) traveller.phone = data.phone;
      if (data.nationality) traveller.nationality = data.nationality;
      traveller.updatedAt = new Date().toISOString();
      return traveller;
    }

    // Create new unique traveller
    traveller = {
      id: `trav-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      fullName: data.fullName,
      phone: data.phone,
      nationality: data.nationality,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.travellers.push(traveller);
    return traveller;
  }

  public getTravellerByEmail(email: string): Traveller | undefined {
    return this.travellers.find(t => t.email.toLowerCase() === email.trim().toLowerCase());
  }

  // ==========================================
  // ACTIVITIES & CAPACITY ENFORCEMENT
  // ==========================================
  public getActivities(): Activity[] {
    return this.activities.filter(a => a.status === 'ACTIVE');
  }

  public getActivityBySlug(slug: string): Activity | undefined {
    return this.activities.find(a => a.slug === slug);
  }

  public getActivityById(id: string): Activity | undefined {
    return this.activities.find(a => a.id === id);
  }

  /**
   * Enforce add-on capacity limits per slot
   * e.g. "VIP Co-Pilot Front Seat" = max 1 per helicopter flight
   */
  public checkAddOnCapacity(
    activityId: string,
    addOnId: string,
    bookingDate: string,
    timeSlot: string
  ): { available: boolean; remainingCapacity: number | null; reason?: string } {
    const activity = this.getActivityById(activityId);
    if (!activity) return { available: false, remainingCapacity: 0, reason: 'Activity not found' };

    const addOn = activity.addOns.find(a => a.id === addOnId);
    if (!addOn) return { available: false, remainingCapacity: 0, reason: 'Add-on not found' };

    // Null capacityLimit means unlimited availability
    if (addOn.capacityLimit === null || addOn.capacityLimit === undefined) {
      return { available: true, remainingCapacity: null };
    }

    // Count existing bookings for this exact slot that booked this add-on
    const bookedCount = this.activityBookings
      .filter(
        b =>
          b.activityId === activityId &&
          b.bookingDate === bookingDate &&
          b.timeSlot === timeSlot &&
          b.status === 'CONFIRMED'
      )
      .reduce((sum, b) => {
        const item = b.addOns.find(a => a.addOnId === addOnId);
        return sum + (item ? item.quantity : 0);
      }, 0);

    const remaining = addOn.capacityLimit - bookedCount;
    return {
      available: remaining > 0,
      remainingCapacity: Math.max(0, remaining),
      reason: remaining <= 0 ? `Sold out for this slot (capacity limit of ${addOn.capacityLimit} reached)` : undefined
    };
  }

  // ==========================================
  // ACTIVITY INSTANT BOOKING
  // ==========================================
  public createActivityBooking(params: {
    activitySlug: string;
    bookingDate: string;
    timeSlot: string;
    numAdults: number;
    numChildren: number;
    guestEmail: string;
    guestName: string;
    guestPhone?: string;
    guestNationality?: string;
    selectedAddOnIds: string[];
    prePayParkFees: boolean;
  }): { success: boolean; booking?: ActivityBooking; error?: string } {
    const activity = this.getActivityBySlug(params.activitySlug);
    if (!activity) return { success: false, error: 'Activity not found' };

    // 1. Capacity Checks for scarce add-ons
    for (const addOnId of params.selectedAddOnIds) {
      const cap = this.checkAddOnCapacity(activity.id, addOnId, params.bookingDate, params.timeSlot);
      if (!cap.available) {
        return { success: false, error: cap.reason || 'An add-on is unavailable for this time slot' };
      }
    }

    // 2. Upsert Traveller by Unique Email
    const traveller = this.upsertTraveller({
      email: params.guestEmail,
      fullName: params.guestName,
      phone: params.guestPhone,
      nationality: params.guestNationality
    });

    // 3. Compute Gross Pricing
    const baseTotal = activity.grossPriceUSD * params.numAdults + (activity.grossPriceUSD * 0.5) * params.numChildren;
    const parkFeesTotal = params.prePayParkFees ? activity.parkFeeUSD * (params.numAdults + params.numChildren) : 0;

    const bookedAddOns: { id: string; addOnId: string; addOnName: string; quantity: number; priceAtBookingUSD: number }[] = [];
    let addOnsTotal = 0;

    for (const addOnId of params.selectedAddOnIds) {
      const addOn = activity.addOns.find(a => a.id === addOnId);
      if (addOn) {
        bookedAddOns.push({
          id: `bookaddon-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          addOnId: addOn.id,
          addOnName: addOn.name,
          quantity: 1,
          priceAtBookingUSD: addOn.grossPriceUSD
        });
        addOnsTotal += addOn.grossPriceUSD;
      }
    }

    const totalAmountUSD = baseTotal + parkFeesTotal + addOnsTotal;

    // 4. Simulate Authoritative Payment
    const paymentId = `pay-${Date.now()}`;
    this.payments.push({
      id: paymentId,
      gatewayReference: `pi_sim_${Date.now()}`,
      amountUSD: totalAmountUSD,
      status: 'CAPTURED',
      capturedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

    const booking: ActivityBooking = {
      id: `bk-${Date.now()}`,
      activityId: activity.id,
      activityName: activity.name,
      travellerId: traveller.id,
      travellerEmail: traveller.email,
      travellerName: traveller.fullName,
      bookingDate: params.bookingDate,
      timeSlot: params.timeSlot,
      numAdults: params.numAdults,
      numChildren: params.numChildren,
      totalAmountUSD,
      parkFeesPaidUSD: parkFeesTotal,
      prePaidParkFees: params.prePayParkFees,
      paymentId,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      voucherCode: `VF-${Math.floor(100000 + Math.random() * 900000)}`,
      addOns: bookedAddOns.map(a => ({
        ...a,
        activityBookingId: `bk-${Date.now()}`
      }))
    };

    this.activityBookings.push(booking);
    return { success: true, booking };
  }

  public getActivityBookings(): ActivityBooking[] {
    return this.activityBookings;
  }

  public getActivityBookingByVoucher(voucherCode: string): ActivityBooking | undefined {
    return this.activityBookings.find(b => b.voucherCode.toUpperCase() === voucherCode.toUpperCase().trim());
  }

  // ==========================================
  // HOTEL MAP & MAPPED PROPERTIES
  // ==========================================
  public getMappedProperties(): MappedProperty[] {
    return this.mappedProperties;
  }

  public getMappedPropertyById(id: string): MappedProperty | undefined {
    return this.mappedProperties.find(p => p.id === id);
  }

  /**
   * Rule: locationVerifiedByStaff must be true before linking to a partner
   */
  public verifyMappedPropertyCoordinate(id: string, verified: boolean): boolean {
    const prop = this.mappedProperties.find(p => p.id === id);
    if (!prop) return false;
    prop.locationVerifiedByStaff = verified;
    return true;
  }

  public linkPropertyToPartner(propertyId: string, partnerId: string): { success: boolean; error?: string } {
    const prop = this.mappedProperties.find(p => p.id === propertyId);
    if (!prop) return { success: false, error: 'Property not found' };

    if (!prop.locationVerifiedByStaff) {
      return { success: false, error: 'Coordinates must be verified by staff before linking to a bookable partner' };
    }

    const partner = this.partners.find(p => p.id === partnerId);
    if (!partner) return { success: false, error: 'Partner not found' };

    prop.partnerId = partner.id;
    prop.isBookablePartner = true;
    return { success: true };
  }

  // ==========================================
  // PARTNERS & ACCOMMODATION REQUESTS
  // ==========================================
  public getPartners(): Partner[] {
    return this.partners;
  }

  public getPartnerById(id: string): Partner | undefined {
    return this.partners.find(p => p.id === id);
  }

  public createAccommodationRequest(params: {
    partnerId: string;
    roomTypeId: string;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    paymentPath: 'PAY_NOW' | 'PAY_AT_PROPERTY';
    guestName: string;
    guestEmail: string;
    guestPhone?: string;
  }): { success: boolean; request?: AccommodationRequest; error?: string } {
    const partner = this.getPartnerById(params.partnerId);
    if (!partner) return { success: false, error: 'Partner not found' };

    const room = partner.roomTypes.find(r => r.id === params.roomTypeId);
    if (!room) return { success: false, error: 'Room type not found' };

    // Calculate nights
    const inDate = new Date(params.checkInDate);
    const outDate = new Date(params.checkOutDate);
    const diffTime = Math.max(1, Math.round((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)));
    const quotedRateUSD = room.rateUSD * diffTime;

    const traveller = this.upsertTraveller({
      email: params.guestEmail,
      fullName: params.guestName,
      phone: params.guestPhone
    });

    const now = new Date();
    const slaDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24-hour guarantee

    const request: AccommodationRequest = {
      id: `req-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.name,
      travellerId: traveller.id,
      travellerName: traveller.fullName,
      travellerEmail: traveller.email,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      roomType: room.name,
      numGuests: params.numGuests,
      quotedRateUSD, // Rate is locked & protected
      paymentPath: params.paymentPath,
      status: 'PENDING',
      createdAt: now.toISOString(),
      slaDeadline: slaDeadline.toISOString()
    };

    if (params.paymentPath === 'PAY_NOW') {
      const payId = `pay-hold-${Date.now()}`;
      this.payments.push({
        id: payId,
        gatewayReference: `pi_hold_${Date.now()}`,
        amountUSD: quotedRateUSD,
        status: 'HELD', // 7-day hold
        createdAt: now.toISOString()
      });
      request.paymentId = payId;
    }

    this.accommodationRequests.push(request);
    return { success: true, request };
  }

  public getAccommodationRequests(): AccommodationRequest[] {
    return this.accommodationRequests;
  }

  public getAccommodationRequestById(id: string): AccommodationRequest | undefined {
    return this.accommodationRequests.find(r => r.id === id);
  }

  /**
   * Triage Action: Confirm Pay Now (capture payment)
   */
  public confirmPayNowRequest(requestId: string): { success: boolean; error?: string } {
    const req = this.getAccommodationRequestById(requestId);
    if (!req) return { success: false, error: 'Request not found' };

    req.status = 'CONFIRMED';
    req.confirmedAt = new Date().toISOString();

    if (req.paymentId) {
      const pay = this.payments.find(p => p.id === req.paymentId);
      if (pay) {
        pay.status = 'CAPTURED';
        pay.capturedAt = new Date().toISOString();
      }
    }

    return { success: true };
  }

  /**
   * Triage Action: Confirm Pay at Property -> Generate Partner Invoice
   * Formula: commissionAmountUSD = quotedRateUSD * (commissionValue / 100) or fixed amount
   */
  public confirmPayAtPropertyRequest(requestId: string): { success: boolean; invoice?: PartnerInvoice; error?: string } {
    const req = this.getAccommodationRequestById(requestId);
    if (!req) return { success: false, error: 'Request not found' };

    const partner = this.getPartnerById(req.partnerId);
    if (!partner) return { success: false, error: 'Partner not found' };

    req.status = 'CONFIRMED';
    req.confirmedAt = new Date().toISOString();

    // Compute commission
    const commissionAmountUSD =
      partner.commissionType === 'PERCENTAGE'
        ? Math.round(req.quotedRateUSD * (partner.commissionValue / 100) * 100) / 100
        : partner.commissionValue;

    const invoice: PartnerInvoice = {
      id: `inv-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.name,
      accommodationRequestId: req.id,
      guestName: req.travellerName,
      stayDates: `${req.checkInDate} to ${req.checkOutDate}`,
      grossBookingUSD: req.quotedRateUSD,
      commissionAmountUSD,
      status: 'ISSUED',
      createdAt: new Date().toISOString(),
      billedAt: new Date().toISOString()
    };

    this.invoices.push(invoice);
    return { success: true, invoice };
  }

  /**
   * Triage Action: Simulate capture failure -> generate 48-hour expiring Stripe payment link
   */
  public simulateCaptureFailure(requestId: string): { success: boolean; paymentLinkUrl?: string; error?: string } {
    const req = this.getAccommodationRequestById(requestId);
    if (!req) return { success: false, error: 'Request not found' };

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48h boundary
    const paymentLinkUrl = `https://checkout.stripe.com/pay/csl_${Math.random().toString(36).substring(2, 12)}?req=${req.id}`;

    let pay = req.paymentId ? this.payments.find(p => p.id === req.paymentId) : undefined;
    if (!pay) {
      pay = {
        id: `pay-recov-${Date.now()}`,
        amountUSD: req.quotedRateUSD,
        status: 'FAILED',
        createdAt: now.toISOString()
      };
      this.payments.push(pay);
      req.paymentId = pay.id;
    } else {
      pay.status = 'FAILED';
    }

    pay.securePaymentLinkUrl = paymentLinkUrl;
    pay.securePaymentLinkSentAt = now.toISOString();
    pay.securePaymentLinkExpiresAt = expiresAt.toISOString();

    return { success: true, paymentLinkUrl };
  }

  /**
   * Enforce 48h Auto-Revert to PAY_AT_PROPERTY if payment link expired
   */
  public triggerAutoRevertForExpiredLinks(): number {
    const now = new Date();
    let revertedCount = 0;

    for (const req of this.accommodationRequests) {
      if (req.paymentPath === 'PAY_NOW' && req.status === 'PENDING' && req.paymentId) {
        const pay = this.payments.find(p => p.id === req.paymentId);
        if (pay && pay.securePaymentLinkExpiresAt && new Date(pay.securePaymentLinkExpiresAt) < now) {
          // Hard expiry reached -> switch to PAY_AT_PROPERTY and confirm
          req.paymentPath = 'PAY_AT_PROPERTY';
          this.confirmPayAtPropertyRequest(req.id);
          revertedCount++;
        }
      }
    }

    return revertedCount;
  }

  public declineRequest(requestId: string, reason: string): boolean {
    const req = this.getAccommodationRequestById(requestId);
    if (!req) return false;
    req.status = 'DECLINED';
    req.manualReviewNotes = reason;
    if (req.paymentId) {
      const pay = this.payments.find(p => p.id === req.paymentId);
      if (pay) pay.status = 'VOIDED';
    }
    return true;
  }

  // ==========================================
  // INVOICING & REPORTING
  // ==========================================
  public getInvoices(): PartnerInvoice[] {
    return this.invoices;
  }

  public markInvoicePaid(invoiceId: string): boolean {
    const inv = this.invoices.find(i => i.id === invoiceId);
    if (!inv) return false;
    inv.status = 'PAID';
    inv.paidAt = new Date().toISOString();
    return true;
  }

  // ==========================================
  // EXCEL CATALOG IMPORT
  // ==========================================
  public updateActivityFromCatalog(item: Partial<Activity> & { slug: string }): { updated: boolean; added: boolean } {
    const index = this.activities.findIndex(a => a.slug === item.slug);
    if (index >= 0) {
      this.activities[index] = { ...this.activities[index], ...item, status: 'ACTIVE' };
      return { updated: true, added: false };
    } else {
      const newAct: Activity = {
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        slug: item.slug,
        name: item.name || 'New Activity',
        destination: item.destination || 'VICTORIA_FALLS',
        category: item.category || 'AIR',
        shortDescription: item.shortDescription || '',
        fullDescription: item.fullDescription || '',
        durationMinutes: item.durationMinutes || 60,
        durationLabel: item.durationLabel || `${item.durationMinutes || 60} min`,
        grossPriceUSD: item.grossPriceUSD || 100,
        nettPriceUSD: item.nettPriceUSD || 80,
        parkFeeUSD: item.parkFeeUSD || 0,
        departureTimes: item.departureTimes || ['09:00', '14:00'],
        pickupIncluded: item.pickupIncluded ?? true,
        fitnessLevel: item.fitnessLevel || 'Easy',
        minAge: item.minAge || 2,
        includedItems: item.includedItems || [],
        excludedItems: item.excludedItems || [],
        restrictions: item.restrictions || [],
        photos: item.photos && item.photos.length > 0 ? item.photos : ['/images/helicopter/hero-angels.jpg'],
        rating: 5.0,
        reviewCount: 1,
        addOns: item.addOns || [],
        status: 'ACTIVE'
      };
      this.activities.push(newAct);
      return { updated: false, added: true };
    }
  }

  // ==========================================
  // ISSUE REPORTS
  // ==========================================
  public submitIssueReport(params: {
    pageUrl: string;
    pageType: 'ACTIVITY' | 'HOTEL' | 'GENERAL';
    pageRefId?: string;
    description: string;
    reporterEmail?: string;
    reporterContact?: string;
  }): IssueReport {
    const report: IssueReport = {
      id: `issue-${Date.now()}`,
      pageUrl: params.pageUrl,
      pageType: params.pageType,
      pageRefId: params.pageRefId,
      description: params.description,
      reporterEmail: params.reporterEmail,
      reporterContact: params.reporterContact,
      status: 'OPEN',
      createdAt: new Date().toISOString()
    };
    this.issueReports.push(report);
    return report;
  }

  public getIssueReports(): IssueReport[] {
    return this.issueReports;
  }
}

// Global Singleton
const globalForDb = globalThis as unknown as { vicFallsDb?: VicFallsDatabase };
export const db = globalForDb.vicFallsDb ?? new VicFallsDatabase();
if (process.env.NODE_ENV !== 'production') globalForDb.vicFallsDb = db;
