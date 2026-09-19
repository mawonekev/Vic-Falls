# Victoria Falls, Livingstone & Chobe Tourism Platform
# Final Product Requirements Document (PRD — V1 Final Production)

**Document Version:** 1.0 (Synthesized from Rev. 4 Post-Audit & Technical Blueprints)  
**Author:** AI Systems Architect & Product Strategy Team  
**Status:** Approved for Implementation  
**Target Markets:** United States & Canada, United Kingdom & Western Europe, Australia & New Zealand  

---

## 1. Executive Summary & Vision

The platform is a specialized inbound travel agency and digital booking platform for the **"Golden Triangle" of Southern Africa**:
1. **Victoria Falls (Zimbabwe)** — Adventure & scenic capital.
2. **Livingstone (Zambia)** — Heritage, Devil’s Pool & riverside lodges.
3. **Chobe / Kasane (Botswana)** — Premier African river & wildlife safari.

The platform operates as a **curated travel agency and booking coordinator**, not an inventory stockholder. It unifies high-converting, instant-paid activity bookings (modeled on the proven layout of **Shearwater Victoria Falls**) with an inquiry-based accommodation request-to-book engine (with a choice between online payment hold and pay-at-property).

A geo-spatial map showcases the broader regional hotel landscape, clearly distinguishing **directly contracted partner properties (bookable)** from **general area reference listings (non-bookable)**.

---

## 2. Problem Statement & Value Proposition

### 2.1 The Problem
International long-haul travelers face high friction when booking trips to Victoria Falls:
* **Fragmented Logistics:** Flights, helicopter tours, river cruises, and safari excursions must be booked across disparate, uncoordinated third-party websites and slow email chains.
* **Cross-Border Confusion:** Navigating border logistics between Zimbabwe, Zambia, and Botswana (KAZA Univisa, border post transfers, entry permits) causes anxiety.
* **Hidden Costs:** Opaque national park fees, fuel levies, and monument access charges are often sprung on travelers as unexpected cash charges upon arrival.
* **Generic OTAs Fail at Curation:** Global OTAs (Expedia, Booking.com) offer no local coordination, no bundle logic, and no real-time guidance on transfer connections.

### 2.2 The Solution
* A **single, cohesive platform** that sells the three destinations as one unified trip.
* **Instant activity checkout** with full pricing transparency (explicit gross vs. nett margin accounting, transparent park fee itemization, and scarce add-on capacity protection).
* An **accommodation request engine** for vetted partner lodges (e.g., Explorers Village) providing flexible payment timing.
* An interactive **destination hotel map** offering clear geographical orientation across all three countries.

---

## 3. Users & Personas

| Persona | Primary Role | System Interactions |
| :--- | :--- | :--- |
| **International Traveller** (Customer) | Sole user of public-facing web app (USA, UK, EU, AU). | • Browses activities by destination/category.<br>• Completes instant paid activity checkout via Stripe.<br>• Adds optional add-ons (subject to capacity caps).<br>• Explores interactive hotel map.<br>• Submits accommodation booking requests (Pay Now vs. Pay at Property).<br>• Accesses static border, visa, and logistics travel guides.<br>• Submits issue reports via on-page utility links. |
| **Partner Provider** (Hotels & Operators) | External local vendors (Shearwater, Wild Horizons, Explorers Village, etc.). *Does not log into V1 system.* | • Submits wholesale rates and allocations via staff.<br>• Receives activity guest vouchers and accommodation booking dispatches via email/WhatsApp.<br>• Receives payment from platform (for Pay Now bookings) or automated monthly commission invoices (for Pay at Property stays). |
| **Staff / Operations Admin** (Internal) | Operations and reservations team managing catalog and fulfillment. | • Uploads and validates Excel activity/add-on catalog spreadsheets.<br>• Conducts visual verification of mapped hotel coordinates before partner linking.<br>• Manages Accommodation Request Queue within stated SLA (verifying room availability & border constraints).<br>• Captures held payments or voids authorizations.<br>• Dispatches secure Stripe payment links on capture failures.<br>• Tracks `PartnerInvoice` lifecycle and reviews customer issue reports. |

---

## 4. Scope Boundaries

### 4.1 In Scope for Version 1 (V1)
1. **Activity Catalog & Instant Booking:**
   * High-converting product display pages (modeled on Shearwater's helicopter experience).
   * Instant online checkout via Stripe for activities in Victoria Falls, Livingstone, and Chobe.
   * Add-ons support with optional hard capacity limits (`capacityLimit`).
   * Gross/nett pricing model with instant payment capture.
   * Automatic email confirmation with guaranteed payment authority (and retry fallback).
2. **Interactive Hotel Map:**
   * Destination map view (Leaflet / Mapbox) displaying hotels across Victoria Falls, Livingstone, and Kasane.
   * Clear distinction between **Bookable Partner Properties** and **Reference-Only Listings**.
   * Non-bookable pins display name, address, and an inquiry trigger.
3. **Accommodation Request-to-Book Flow:**
   * Direct-contracted partner hotels (e.g., Explorers Village deluxe/standard/camping).
   * Guest choice: **Pay Now** (credit card pre-authorization/hold) or **Pay at Property**.
   * Stated staff confirmation SLA (target: 24 hours).
   * Automated recovery for failed captures with expiring secure Stripe Payment Links.
   * Auto-fallback to Pay at Property if a payment link expires.
4. **Staff / Admin Management Portal:**
   * Excel spreadsheet importer for activities and add-ons with preview and sign-off.
   * Hotel map data management with manual coordinate verification gate.
   * Accommodation request triage queue with SLA tracking timer.
   * Invoicing dashboard for Pay-at-Property commission tracking with automated commission math.
   * Issue reports queue.
5. **Static Logistics Guide:**
   * Unified guide for KAZA Univisa, national park fees, seasonal water levels, and border crossings.
6. **On-Page "Report an Issue" Utility:**
   * Present on every activity and hotel page; logs into database and alerts operations.

### 4.2 Out of Scope for V1 (Roadmapped for V2)
* **Hotelbeds APItude Live API Integration:** Deferred to V2. V1 relies on direct partner contracts and the reference map. (The system schema is architected to allow Hotelbeds connectivity in V2 without schema rewrites).
* **Multi-Currency Processing at Gateway:** V1 processes checkout strictly in **USD ($)**. (Multi-currency display converter is informational only).
* **Real-time Seat / Slot Inventory Engine:** General activities remain on the "always available" model; only scarce add-ons enforce a capacity ceiling.
* **Automated Dynamic Packaging / Basket Bundling:** Multi-day packages in V1 are curated as static product bundles rather than a dynamic cart discount engine.
* **External Partner Extranet / Login Portal:** Partners do not have self-service dashboards in V1.
* **Direct Booking on Non-Partner Mapped Hotels:** Reference-only properties cannot be booked directly.

---

## 5. Functional Requirements & Workflows

### 5.1 Activity Browsing, Add-Ons & Instant Checkout Flow
1. **Catalog Navigation:** Travelers filter activities by destination (Vic Falls, Livingstone, Chobe) and category (Air, Water, Adrenaline, Safari & Wildlife, Culture & Heritage).
2. **Experience Product Page (Shearwater Design System):**
   * **Hero Media Stage:** Full-width panoramic photography carousel with high-res assets from the info pack.
   * **Key Specifications Bar:** Duration (e.g., *12–13 min*), Departure Times, Hotel Transfers included, Fitness requirements, Minimum Age.
   * **Option Switcher:** Interactive toggle between activity tiers (e.g., *Flight of Angels 12-13 min* vs. *Zambezi Spectacular 25 min*).
   * **Inclusions & Exclusions Breakdown:** Explicit green/red itemized list highlighting park fees ($15/person).
   * **Safety & Aircraft Specs:** Certifications, pilot ratings, bubble-window guarantees.
3. **Add-On Selection & Capacity Rules:**
   * Travelers may attach zero or more add-ons (e.g., *HD Souvenir Video USB*, *VIP Co-Pilot Front Seat*, *Pre-Paid National Park Entry*).
   * **Capacity Enforcement:**
     * If `AddOn.capacityLimit == null`: Unlimited availability (inherits base activity rule).
     * If `AddOn.capacityLimit != null`: The system validates remaining capacity for that specific date/time slot before allowing checkout.
4. **Traveller Deduplication:**
   * At checkout, the system performs a lookup on `Traveller.email`. If a match is found, the existing record is updated and linked; otherwise, a new unique `Traveller` record is created.
5. **Payment Capture & Authoritative State:**
   * Stripe Elements captures the gross USD amount immediately.
   * Upon successful capture:
     * `Payment` record created with status `CAPTURED`.
     * `ActivityBooking` created with status `CONFIRMED`.
     * Linked `ActivityBookingAddOn` records created.
     * Trigger confirmation email to traveler and voucher dispatch to local operator.
   * **Resilience Rule:** Payment success is authoritative. If the transactional email delivery fails, the booking remains `CONFIRMED`. The system executes 1 automatic retry; if still unsuccessful, an alert is flagged in the admin queue for manual resend.

---

### 5.2 Hotel Map & Accommodation Request-to-Book Flow
1. **Interactive Hotel Map:**
   * Built using Leaflet / Mapbox.
   * **Bookable Partner Pins (Gold Accent):** Displays property title, photo, starting rate, and a direct **"Request to Book"** CTA.
   * **Reference-Only Pins (Muted Gray):** Displays property name and address. Tapping a non-bookable pin displays: *"This property is not directly bookable online. Looking to include this lodge in a custom itinerary? [Contact Concierge]"*.
2. **Booking Request Submission:**
   * Guest selects Check-In, Check-Out, Room Type, and Number of Guests.
   * Guest chooses Payment Method:
     * **Option A: Pay Now (Online Pre-Authorization):** Guest inputs card details via Stripe. A payment authorization hold is placed (held for up to 7 days per card network rules).
     * **Option B: Pay at Property:** No card charge at submission. Guest agrees to pay hotel upon arrival.
   * The submission screen prominently displays the **Confirmation SLA Guarantee**:  
     > *"Your reservation request has been received. Our Victoria Falls reservations team will confirm room availability with the lodge within 24 hours."*
3. **Staff Review & Approval Gate:**
   * Staff verify actual room availability with the partner lodge.
   * Staff review any cross-border logistics or date incompatibilities.
4. **Staff Action Outcomes:**
   * **Scenario 1: Approved (Pay Now):**
     * Staff clicks "Confirm & Capture". The held payment is captured.
     * System transitions `AccommodationRequest.status` to `CONFIRMED`.
     * Guest receives confirmed accommodation voucher.
   * **Scenario 2: Approved, but Payment Capture Fails:**
     * If the authorization has expired or capture is declined by the issuing bank:
     * System generates an expiring **Stripe Payment Link** (`securePaymentLinkExpiresAt` set to **48 hours** from generation).
     * Guest receives an urgent payment link email with an option to switch to Pay at Property.
     * **Hard Expiry Boundary:** If the guest does not complete payment within 48 hours, the request **automatically reverts to `paymentPath = PAY_AT_PROPERTY`**, transitions status to `CONFIRMED`, and generates a `PartnerInvoice`. This prevents bookings from lingering in an unresolved payment state indefinitely.
   * **Scenario 3: Approved (Pay at Property):**
     * Staff clicks "Confirm". Request status transitions to `CONFIRMED`.
     * An automated `PartnerInvoice` is generated with `commissionAmountUSD` computed automatically via formula:
       $$\text{commissionAmountUSD} = \begin{cases} \text{quotedRateUSD} \times \left(\frac{\text{commissionValue}}{100}\right) & \text{if commissionType} = \text{PERCENTAGE} \\ \text{commissionValue} & \text{if commissionType} = \text{FIXED\_AMOUNT} \end{cases}$$
     * Guest receives confirmation voucher with instructions for payment on arrival.
   * **Scenario 4: Declined:**
     * Staff enters a decline reason (e.g., "Fully booked", "Seasonal maintenance").
     * Any held payment authorization is immediately voided.
     * Guest is notified with alternative lodge suggestions.

---

### 5.3 Staff & Operations Admin Workflows
1. **Activity Catalog Excel Import:**
   * Admin uploads an `.xlsx` file containing two structured tabs: `Activities` and `AddOns`.
   * The portal parses the sheet, displays a side-by-side diff of price/content changes, and requires admin sign-off before committing updates to the live database.
2. **Mapped Property Coordinate Verification Gate:**
   * Prior to linking any `MappedProperty` pin to a revenue-generating `Partner`, the admin must perform a visual check against satellite imagery/Google Maps.
   * Admin toggles `locationVerifiedByStaff = true`. Only verified pins can be assigned a `partnerId`.
3. **Accommodation Triage Queue:**
   * Real-time list of pending requests with a visual SLA countdown timer (e.g., green for <12h, amber for 12–20h, pulsing red for >20h).
4. **Partner Invoicing & Commission Dashboard:**
   * Displays all `PartnerInvoice` records generated from Pay-at-Property stays.
   * Filters by partner, stay date, and payment status (`PENDING`, `BILLED`, `PAID`).
5. **Issue Reports Viewer:**
   * Feed of traveler-submitted issues flagged by page URL, issue type, and reporter email.

---

## 6. Complete Data Models & Schemas (Prisma / PostgreSQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Destination {
  VICTORIA_FALLS
  LIVINGSTONE
  CHOBE
}

enum ActivityCategory {
  AIR
  WATER
  ADRENALINE
  SAFARI_WILDLIFE
  CULTURE_HERITAGE
}

enum RecordStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum CommissionType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum PaymentPath {
  PAY_NOW
  PAY_AT_PROPERTY
}

enum RequestStatus {
  PENDING
  CONFIRMED
  DECLINED
  CANCELLED
}

enum PaymentStatus {
  HELD
  CAPTURED
  FAILED
  VOIDED
  REFUNDED
}

enum InvoiceStatus {
  DRAFT
  ISSUED
  PAID
  CANCELLED
}

// -------------------------------------------------------------
// TRAVELLER (Deduplicated by Unique Email)
// -------------------------------------------------------------
model Traveller {
  id                    String                 @id @default(uuid())
  email                 String                 @unique
  fullName              String
  phone                 String?
  nationality           String?
  createdAt             DateTime               @default(now())
  updatedAt             DateTime               @updatedAt
  bookings              ActivityBooking[]
  accommodationRequests AccommodationRequest[]
}

// -------------------------------------------------------------
// ACTIVITY & ADD-ON MODELS
// -------------------------------------------------------------
model Activity {
  id               String            @id @default(uuid())
  destination      Destination
  category         ActivityCategory
  name             String
  slug             String            @unique
  shortDescription String
  fullDescription  String            @db.Text
  durationMinutes  Int
  grossPriceUSD    Decimal           @db.Decimal(10, 2)
  nettPriceUSD     Decimal           @db.Decimal(10, 2)
  parkFeeUSD       Decimal           @default(0.00) @db.Decimal(10, 2)
  includedItems    String[]
  excludedItems    String[]
  restrictions     String[]
  photos           String[]
  lastVerifiedDate DateTime          @default(now())
  status           RecordStatus      @default(ACTIVE)
  sourceRowRef     Int?
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  addOns           AddOn[]
  bookings         ActivityBooking[]
}

model AddOn {
  id            String                  @id @default(uuid())
  activityId    String
  activity      Activity                @relation(fields: [activityId], references: [id], onDelete: Cascade)
  name          String
  description   String?
  grossPriceUSD Decimal                 @db.Decimal(10, 2)
  nettPriceUSD  Decimal                 @db.Decimal(10, 2)
  capacityLimit Int?                    // Null = unlimited; Integer = hard slot ceiling
  status        RecordStatus            @default(ACTIVE)
  sourceRowRef  Int?
  createdAt     DateTime                @default(now())
  updatedAt     DateTime                @updatedAt
  bookingItems  ActivityBookingAddOn[]
}

model ActivityBooking {
  id              String                 @id @default(uuid())
  activityId      String
  activity        Activity               @relation(fields: [activityId], references: [id])
  travellerId     String
  traveller       Traveller              @relation(fields: [travellerId], references: [id])
  bookingDate     DateTime
  timeSlot        String
  numAdults       Int
  numChildren     Int                    @default(0)
  totalAmountUSD  Decimal                @db.Decimal(10, 2)
  parkFeesPaidUSD Decimal                @default(0.00) @db.Decimal(10, 2)
  paymentId       String?                @unique
  payment         Payment?               @relation(fields: [paymentId], references: [id])
  status          RequestStatus          @default(CONFIRMED)
  createdAt       DateTime               @default(now())
  addOns          ActivityBookingAddOn[]
}

model ActivityBookingAddOn {
  id                String          @id @default(uuid())
  activityBookingId String
  activityBooking   ActivityBooking @relation(fields: [activityBookingId], references: [id], onDelete: Cascade)
  addOnId           String
  addOn             AddOn           @relation(fields: [addOnId], references: [id])
  quantity          Int             @default(1)
  priceAtBookingUSD Decimal         @db.Decimal(10, 2)
}

// -------------------------------------------------------------
// PARTNER & HOTEL MAP MODELS
// -------------------------------------------------------------
model Partner {
  id                    String                 @id @default(uuid())
  name                  String
  destination           Destination
  contactEmail          String
  contactPhone          String?
  commissionType        CommissionType         @default(PERCENTAGE)
  commissionValue       Decimal                @db.Decimal(10, 2) // e.g. 20.00 for 20%
  contentRightsGranted  Boolean                @default(true)
  status                RecordStatus           @default(ACTIVE)
  createdAt             DateTime               @default(now())
  updatedAt             DateTime               @updatedAt
  mappedProperties      MappedProperty[]
  accommodationRequests AccommodationRequest[]
  invoices              PartnerInvoice[]
}

model MappedProperty {
  id                     String      @id @default(uuid())
  name                   String
  address                String
  latitude               Float
  longitude              Float
  destination            Destination
  sourceApiId            String?
  isBookablePartner      Boolean     @default(false)
  locationVerifiedByStaff Boolean     @default(false) // Must be true to link partner
  partnerId              String?
  partner                Partner?    @relation(fields: [partnerId], references: [id])
  createdAt              DateTime    @default(now())
  updatedAt              DateTime    @updatedAt
}

// -------------------------------------------------------------
// ACCOMMODATION REQUESTS & INVOICING
// -------------------------------------------------------------
model AccommodationRequest {
  id                 String          @id @default(uuid())
  partnerId          String
  partner            Partner         @relation(fields: [partnerId], references: [id])
  travellerId        String
  traveller          Traveller       @relation(fields: [travellerId], references: [id])
  checkInDate        DateTime
  checkOutDate       DateTime
  roomType           String
  numGuests          Int
  quotedRateUSD      Decimal         @db.Decimal(10, 2)
  paymentPath        PaymentPath
  status             RequestStatus   @default(PENDING)
  paymentId          String?         @unique
  payment            Payment?        @relation(fields: [paymentId], references: [id])
  manualReviewNotes  String?         @db.Text
  createdAt          DateTime        @default(now())
  confirmedAt        DateTime?
  invoice            PartnerInvoice?
}

model Payment {
  id                         String                @id @default(uuid())
  gatewayReference           String?               // Stripe PaymentIntent ID
  amountUSD                  Decimal               @db.Decimal(10, 2)
  status                     PaymentStatus         @default(HELD)
  capturedAt                 DateTime?
  securePaymentLinkUrl       String?
  securePaymentLinkSentAt    DateTime?
  securePaymentLinkExpiresAt DateTime?             // 48h SLA boundary
  createdAt                  DateTime              @default(now())
  activityBooking            ActivityBooking?
  accommodationRequest       AccommodationRequest?
}

model PartnerInvoice {
  id                     String               @id @default(uuid())
  partnerId              String
  partner                Partner              @relation(fields: [partnerId], references: [id])
  accommodationRequestId String               @unique
  accommodationRequest   AccommodationRequest @relation(fields: [accommodationRequestId], references: [id])
  commissionAmountUSD    Decimal              @db.Decimal(10, 2) // Auto-computed at confirmation
  status                 InvoiceStatus        @default(DRAFT)
  createdAt              DateTime             @default(now())
  billedAt               DateTime?
  paidAt                 DateTime?
}

// -------------------------------------------------------------
// ISSUE REPORTING
// -------------------------------------------------------------
model IssueReport {
  id              String   @id @default(uuid())
  pageUrl         String
  pageType        String   // ACTIVITY, HOTEL, GENERAL
  pageRefId       String?
  description     String   @db.Text
  reporterEmail   String?
  reporterContact String?
  status          String   @default("OPEN")
  createdAt       DateTime @default(now())
}
```

---

## 7. Technical Architecture & Third-Party Infrastructure

```
                  ┌─────────────────────────────────────────────────────────┐
                  │                 Next.js 14+ (App Router)                │
                  │       TypeScript | Tailwind-Free Fluid CSS System       │
                  └────────────────────────────┬────────────────────────────┘
                                               │
               ┌───────────────────────────────┴───────────────────────────────┐
               ▼                                                               ▼
┌──────────────────────────────┐                              ┌──────────────────────────────────┐
│  Traveller-Facing UI Engine  │                              │    Admin & Operations Portal     │
├──────────────────────────────┤                              ├──────────────────────────────────┤
│ • Shearwater Experience UX   │                              │ • Excel Importer (SheetJS)       │
│ • Interactive Hotel Map      │                              │ • Request Queue & SLA Countdown  │
│ • Stripe Elements Checkout   │                              │ • Hotel Coordinate Verifier      │
│ • On-Page Issue Reporter     │                              │ • Partner Invoice Generator      │
└──────────────┬───────────────┘                              └────────────────┬─────────────────┘
               │                                                               │
               └───────────────────────────────┬───────────────────────────────┘
                                               │
                               ┌───────────────┴───────────────┐
                               ▼                               ▼
               ┌───────────────────────────────┐ ┌───────────────────────────────┐
               │     PostgreSQL via Prisma     │ │        Stripe Payments        │
               ├───────────────────────────────┤ ├───────────────────────────────┤
               │ • Unique Traveller Emails     │ │ • Immediate Activity Capture  │
               │ • AddOn Capacity Verification │ │ • 7-Day Pre-Auth Hold (Hotel) │
               │ • Auto-computed Invoicing     │ │ • Expiring Recovery Links     │
               └───────────────────────────────┘ └───────────────────────────────┘
```

### 7.1 Key Technical Decisions & Audited Choices
1. **Frontend & Backend Framework:** Next.js (TypeScript) deployed on Vercel or AWS Amplify. Provides unified React Server Components for SEO-critical activity pages and API Route handlers for Stripe webhook processing.
2. **Geo & Mapping Engine:**
   * **Recommendation:** **Mapbox GL JS** with pre-seeded geo-data from OpenStreetMap / Overpass API for Victoria Falls, Livingstone, and Kasane.
   * **Refresh Strategy:** Mapped properties are cached in PostgreSQL. Refreshed quarterly via admin review to eliminate stale listings without incurring runtime API rate costs.
3. **Transactional Email Service:**
   * **Audit Risk:** Zoho Mail is a standard IMAP/POP mailbox and risks silent rate-limiting, poor deliverability, and missing webhook feedback for customer booking confirmations.
   * **Decision:** Implement **Resend** or **AWS SES** for all transactional emails (booking confirmations, voucher dispatch, expiring payment links). Zoho Mail is retained strictly for staff manual correspondence.
4. **Resilience & Idempotency:**
   * Stripe Webhook handlers are idempotent, checking `Payment.gatewayReference` before processing.
   * If email transmission fails following payment capture, the transaction remains `CONFIRMED`, an automated retry is scheduled, and an operations alert is triggered.

---

## 8. Business Rules, Financial Logic & Policies

### 8.1 Rate Protection & "Rate-Lapse" Rule
* The quoted rate shown to the traveler at the time of request submission is **guaranteed**.
* If a hotel partner increases its rate while an `AccommodationRequest` is pending in the queue, the platform absorbs the price difference or negotiates with the partner; the guest's `quotedRateUSD` is never altered post-submission.

### 8.2 National Park Fees & Transparency
* All national park fees (e.g., Zimbabwe Parks & Wildlife Management Authority $15 fee for helicopter flights, rainforest entry fees) are clearly broken down as a separate line item.
* Activity checkout offers a seamless pre-payment option so international guests do not have to carry exact cash USD to the helipad or jetty.

### 8.3 Invoicing & Net Margin Realism
* Reported activity margins represent $\text{grossPriceUSD} - \text{nettPriceUSD}$.
* **Financial Reporting Note:** The accounting system accounts for Stripe gateway processing fees (estimated at 2.9% + $0.30) as an operational cost of sale, ensuring accurate net take-home accounting.

---

## 9. Resolution of Audit Open Questions `[ASK]`

The following operational policies are formally adopted for V1:

| Open Question (`[ASK]`) | Final Adopted Resolution | Operational Implementation |
| :--- | :--- | :--- |
| **1. Add-ons requiring real `capacityLimit`** | **Limited:** "VIP Co-Pilot Front Seat" (capped at 1 per helicopter flight) and "Private Vehicle Upgrade" (capped by vehicle availability).<br>**Unlimited:** "HD 4K Video USB" and "Pre-Paid National Park Fees". | Set `AddOn.capacityLimit = 1` for VIP seat; set to `null` for digital media and park levies. |
| **2. Staff Confirmation SLA Window** | **24 Hours Standard.** (Guaranteed response within 12 hours for requests submitted between 08:00–18:00 CAT). | Displayed on the request form. SLA countdown timer embedded in Admin triage queue. |
| **3. Secure Payment Link Expiry** | **48 Hours from issuance.** | `Payment.securePaymentLinkExpiresAt = now() + 48h`. Upon expiry, auto-reverts request to `PAY_AT_PROPERTY`. |
| **4. Hotel Map Geo Provider** | **Mapbox GL JS** with locally curated seed database. | High-performance vector tiles; zero runtime API query bloat; quarterly admin validation. |
| **5. Email Provider Selection** | **Resend / AWS SES** for automated transactional sends; **Zoho Mail** for human inbox support. | Resolves the critical deliverability and rate-limit audit risk. |
| **6. Non-Bookable Pin Behavior** | Displays lodge name, address, and a **"Inquire with Concierge"** interactive modal. | Captures lead intent for custom safari planning instead of dead-ending the traveler. |
| **7. Excel Import Format** | **Single Excel workbook with two tabs:** `Activities` and `AddOns`. | The `AddOns` sheet links to parent activities via `activitySlug` or `activityName`. |
| **8. Analytics Tooling** | **PostHog** (or Plausible Analytics) for privacy-compliant funnel and conversion tracking. | Tracks funnel drop-offs from activity view $\to$ checkout $\to$ booking completion. |
| **9. Add-On Attach Rate Metric** | **Yes.** Adopted as Core Metric #5. | Calculated as: $\frac{\text{Total Bookings with } \ge 1 \text{ AddOn}}{\text{Total Activity Bookings}}$. |

---

## 10. Success Metrics & Performance KPIs

The platform monitors five primary operational metrics. Target thresholds are to be benchmarked by the business owner during the initial 90 days of live traffic:

1. **Activity Conversion Funnel Rate:** Percentage of unique activity page visitors who complete a paid `ActivityBooking`.
2. **Accommodation Request-to-Confirmation Rate:** Percentage of submitted `AccommodationRequest` records successfully confirmed by staff within the 24-hour SLA.
3. **Regional Combination Rate:** Percentage of unique `Traveller` records (deduplicated by email) who book across multiple categories (e.g., Activity + Accommodation) or multiple destinations (e.g., Vic Falls + Chobe).
4. **Payment Path Split Ratio:** Percentage breakdown between `PAY_NOW` vs. `PAY_AT_PROPERTY` accommodation requests.
5. **Add-On Attach Rate:** Percentage of activity bookings that include at least one paid add-on.

---

## 11. Implementation & Phased Rollout Plan

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Core Experience Platform (Weeks 1–3)                          │
│ • Design system & components cloning Shearwater conversion layout.     │
│ • Activity product engine loaded with local fact sheets & photos.      │
│ • Deduplicated Traveller lookup and Stripe Elements activity checkout. │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Hotel Map & Request-to-Book Engine (Weeks 4–5)                │
│ • Interactive Mapbox destination map with partner & reference pins.    │
│ • Accommodation Request flow (Pay Now hold vs Pay at Property).        │
│ • Confirmation SLA counter & expiring secure payment link recovery.    │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Admin Suite & Operational Hardening (Weeks 6–7)               │
│ • Excel catalog import with diff validation.                           │
│ • Auto-computed PartnerInvoice generation.                             │
│ • Transactional email dispatch via Resend with delivery retry workers. │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Sign-Off & Approval

* **Product Management:** Approved  
* **Lead System Architect:** Approved  
* **Operations & Fulfillment:** Approved  

This document serves as the sole source of truth for the Version 1 build.
