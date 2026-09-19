// Domain types strictly aligned with FINAL_PRD.md Section 6

export type Destination = 'VICTORIA_FALLS' | 'LIVINGSTONE' | 'CHOBE';

export type ActivityCategory =
  | 'AIR'
  | 'WATER'
  | 'ADRENALINE'
  | 'SAFARI_WILDLIFE'
  | 'CULTURE_HERITAGE';

export type RecordStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type CommissionType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export type PaymentPath = 'PAY_NOW' | 'PAY_AT_PROPERTY';

export type RequestStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'CANCELLED';

export type PaymentStatus = 'HELD' | 'CAPTURED' | 'FAILED' | 'VOIDED' | 'REFUNDED';

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED';

export interface Traveller {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  nationality?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddOn {
  id: string;
  activityId: string;
  name: string;
  description?: string;
  grossPriceUSD: number;
  nettPriceUSD: number;
  capacityLimit?: number | null; // null = unlimited; integer = hard slot ceiling
  status: RecordStatus;
  sourceRowRef?: number;
}

export interface Activity {
  id: string;
  destination: Destination;
  category: ActivityCategory;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  durationLabel: string; // e.g. "12–13 min"
  grossPriceUSD: number;
  nettPriceUSD: number;
  parkFeeUSD: number;
  departureTimes: string[];
  pickupIncluded: boolean;
  fitnessLevel: 'Easy' | 'Moderate' | 'High' | 'Extreme';
  minAge: number;
  includedItems: string[];
  excludedItems: string[];
  restrictions: string[];
  aircraftSpecs?: {
    model: string;
    capacity: string;
    features: string[];
  };
  photos: string[];
  rating: number;
  reviewCount: number;
  addOns: AddOn[];
  status: RecordStatus;
  sourceRowRef?: number;
}

export interface ActivityBookingAddOn {
  id: string;
  activityBookingId: string;
  addOnId: string;
  addOnName: string;
  quantity: number;
  priceAtBookingUSD: number;
}

export interface ActivityBooking {
  id: string;
  activityId: string;
  activityName: string;
  travellerId: string;
  travellerEmail: string;
  travellerName: string;
  bookingDate: string;
  timeSlot: string;
  numAdults: number;
  numChildren: number;
  totalAmountUSD: number;
  parkFeesPaidUSD: number;
  prePaidParkFees: boolean;
  paymentId?: string;
  status: RequestStatus;
  createdAt: string;
  voucherCode: string;
  addOns: ActivityBookingAddOn[];
}

export interface Partner {
  id: string;
  name: string;
  destination: Destination;
  contactEmail: string;
  contactPhone?: string;
  commissionType: CommissionType;
  commissionValue: number; // e.g. 20.00 for 20%
  contentRightsGranted: boolean;
  status: RecordStatus;
  roomTypes: {
    id: string;
    name: string;
    description: string;
    rateUSD: number;
    capacity: number;
    photo: string;
  }[];
}

export interface MappedProperty {
  id: string;
  name: string;
  address: string;
  destination: Destination;
  latitude: number;
  longitude: number;
  sourceApiId?: string;
  isBookablePartner: boolean;
  locationVerifiedByStaff: boolean; // Must be true before linking partner
  partnerId?: string;
  startingPriceUSD?: number;
  photo?: string;
  rating?: number;
  amenities?: string[];
  inquireOnlyNotice?: string;
}

export interface AccommodationRequest {
  id: string;
  partnerId: string;
  partnerName: string;
  travellerId: string;
  travellerName: string;
  travellerEmail: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  numGuests: number;
  quotedRateUSD: number; // Locked & protected rate
  paymentPath: PaymentPath;
  status: RequestStatus;
  paymentId?: string;
  manualReviewNotes?: string;
  createdAt: string;
  confirmedAt?: string;
  slaDeadline: string; // createdAt + 24 hours
}

export interface Payment {
  id: string;
  gatewayReference?: string;
  amountUSD: number;
  status: PaymentStatus;
  capturedAt?: string;
  securePaymentLinkUrl?: string;
  securePaymentLinkSentAt?: string;
  securePaymentLinkExpiresAt?: string; // 48h boundary
  createdAt: string;
}

export interface PartnerInvoice {
  id: string;
  partnerId: string;
  partnerName: string;
  accommodationRequestId: string;
  guestName: string;
  stayDates: string;
  grossBookingUSD: number;
  commissionAmountUSD: number;
  status: InvoiceStatus;
  createdAt: string;
  billedAt?: string;
  paidAt?: string;
}

export interface IssueReport {
  id: string;
  pageUrl: string;
  pageType: 'ACTIVITY' | 'HOTEL' | 'GENERAL';
  pageRefId?: string;
  description: string;
  reporterEmail?: string;
  reporterContact?: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
}
