# Victoria Falls, Livingstone & Chobe Regional Tourism Platform
### Premier OTA & Destination Management System for Southern Africa's "Golden Triangle"

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Mapbox GL](https://img.shields.io/badge/Mapbox_GL-3.0-blueviolet?style=flat-square&logo=mapbox)](https://www.mapbox.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-teal?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)

---

## 1. Executive Summary

This platform is a specialized regional Online Travel Agency (OTA) and digital Destination Management Platform (DMC) engineered for the **"Golden Triangle" of Southern Africa**:
- **Victoria Falls (Zimbabwe)**: Aerial flights over the cataract, Grade 5 Batoka Gorge white water rafting, Victoria Falls Bridge high wire adrenaline, Zambezi river excursions, and cultural dining.
- **Livingstone (Zambia)**: Devil's Pool on Livingstone Island, colonial railway heritage, walking rhino safaris in Mosi-oa-Tunya National Park, and luxury riverside lodges.
- **Chobe / Kasane (Botswana)**: Chobe River wildlife safaris, premier elephant concentrations, Chobe National Park game drives, and luxury riverboat safaris.

The platform marries **instant-paid activity bookings** (elevating the conversion architecture of Shearwater Victoria Falls) with an **inquiry-based accommodation request-to-book engine** (offering travelers flexible payment hold options and guaranteed 24-hour fulfillment SLAs).

---

## 2. Core Architecture & Highlights

### 🚁 Granular Activity Catalog (49 Subgroup Experiences)
Rather than generic subgroup headers, every adventure is unpacked into individual, fully bookable inventory items with transparent statutory park fees, age/fitness criteria, aircraft/boat specifications, and authentic high-resolution photography:
- **AIR (5)**: 12–13 min Flight of Angels ($173), 22 min Batoka Gorge Canyon Flight ($271), 25 min Zambezi Spectacular ($328), 15 min & 30 min Livingstone Microlights ($190 & $380).
- **WATER (11)**: Low Water Rafting (#1–#19, $173), High Water Rafting (#11–#23, $161), 2-Day Rafting Expedition ($462), Upper Zambezi Canoe Safari ($170), Batoka Jet Boat ($141), Jet Boat & Hike Combo ($185), Riversong Luxury Sunset Cruise ($98), Classic Sunset ($65), Dawn Sunrise ($75), Midday Lunch ($65), and Starlight Dinner Cruise ($110).
- **ADRENALINE (14)**: 111m Bridge Bungee Jump ($194), Bridge Swing Solo ($137) & Tandem ($201), Bridge Slide Solo ($58) & Tandem ($82), Batoka Gorge Flying Fox ($69), Batoka Canopy Tour ($81), Big Air 3-Way Combo ($280), Gruesome Twosome ($245), Livingstone Island & Devil's Pool (Morning $149, Lunch $199, High Tea $189), and Shearwater Ticket to Adventure Multi-Passes ($385 & $495).
- **CULTURE & HERITAGE (10)**: Guided Rainforest Tours (Zimbabwe $32, Zambia $35), Full-Moon Lunar Rainbow Tour ($32), Historic Bridge Theatrical Catwalk Tour ($64), Bamba Tram Bridge Run ($75), The Boma Dinner & Drum Show ($71), Simunye Spirit of Africa Musical ($69), Dusty Road Township Dining ($55), Traditional Village Tour ($60), and Batoka Gorge Hike & Ndebele Village ($75).
- **SAFARI & WILDLIFE (9)**: Zambezi NP Morning ($79) & Afternoon ($79) Game Drives, Night Game Drive with Bush Barbecue Dinner ($272), Guided Walking Safari on Foot ($112), "Through the Eyes of an Elephant" Ethical Encounter ($148), Chobe National Park Full Day Safari ($249), Chobe Overnight Wilderness Camping ($381), White Rhino Tracking ($120), and Hwange National Park Full Day Safari ($295).

### 🏨 Interactive Regional Hotel Map (66 Mapped Properties)
- **Mapbox GL JS Vector Engine**: Tri-region viewport controls centered across Zimbabwe, Zambia, and Botswana.
- **Visual Distinction**:
  - **Bookable Partner Properties (Gold Pins)**: Direct Request-to-Book flow with protected rates, real-time calendar pickers, and room type selection (*Shearwater Explorers Village*, *The Victoria Falls Waterfront*, *Chobe Safari Lodge*).
  - **Reference-Only Accommodations (Gray Pins)**: Concierge inquiry modal with amenity pills, verified geocodes, and transparent concierge advisory notices.
- **Destination Distribution**:
  - Victoria Falls (Zimbabwe): 29 properties
  - Livingstone (Zambia): 18 properties
  - Chobe / Kasane (Botswana): 19 properties

### 💳 Resilient Payment & Financial Engine
- **Gross USD Pricing**: Activities charged immediately via Stripe payment gateway.
- **Manual Capture Pre-Authorization**: Accommodation requests with `PAY_NOW` hold funds on traveler credit cards for up to 7 days until partner confirmation.
- **Automated Payment Recovery**: In the event of hold expiration, generates a secure 48-hour Stripe Payment Link (`securePaymentLinkExpiresAt`), auto-reverting to `PAY_AT_PROPERTY` upon expiration without dropping bookings.
- **Automated Commission Invoicing**: Staff dashboard generates exact partner commission invoices from structured contract terms (Percentage or Fixed USD per room-night).

### ✉️ Authoritative Email Normalization & Identity Matching
Single-entity deduplication ensures the combination-rate metric between activity bookings and hotel requests remains 100% reliable:
- **Unified Normalization (`src/lib/email.ts`)**:
  - Trims boundary whitespace and removes internal whitespace.
  - Applies Unicode NFKC normalization (`input.normalize('NFKC')`).
  - Strips zero-width and invisible characters (`U+200B`, `U+200C`, `U+200D`, `U+FEFF`).
  - Lowercases the entire address while strictly preserving local-part dots and `+tag` aliases (provider-neutral).
  - Pragmatic RFC-aligned validation (`isValidEmail`) rejecting malformed or over-length inputs without giant regexes.
- **Three-Layer Defense**:
  - **Client-Side:** Normalizes on blur (`onBlur`), validates before submission, displays clear inline errors, and applies standard accessibility/mobile attributes (`type="email"`, `autoComplete="email"`, `inputMode="email"`, `autoCapitalize="none"`).
  - **Server-Side (Authoritative):** All booking, accommodation, and issue API endpoints validate and normalize payloads before processing, rejecting invalid submissions with clean `400 Bad Request` responses.
  - **Database Layer (`src/lib/prisma.ts`):** Prisma Client Extensions (`$extends`) automatically sanitize `Traveller.email`, `Partner.contactEmail`, and `IssueReport` on `create`, `update`, and `upsert`.
  - **Contact Preservation:** Nullable `IssueReport.reporterContact` values are conditionally normalized only when representing an email address, safeguarding phone numbers and WhatsApp strings (e.g. `+263 77 210 0110`).
- **Collision Detection & Migration Backfill (`scripts/backfill-normalize-emails.ts`)**:
  - Scans legacy rows for collisions (e.g. `John@x.com` vs. `john@x.com`), tabulates associated booking/request counts, and halts execution for manual review without destructive auto-merging.
  - Idempotent and runnable in safe dry-run mode (`npm run backfill`) or commit mode (`npm run backfill:execute`).

### 🎛️ Operations & Admin Back-Office Portal
- **Spreadsheet Catalog Importer**: Upload 2-tab Excel spreadsheets (`Activities` and `AddOns`) with automated side-by-side diff previews, error checks, and staff sign-off.
- **Accommodation Request Triage Queue**: Real-time 24-hour SLA countdown timers (`slaDeadline`), status toggles (`PENDING` -> `HELD` -> `CONFIRMED` / `DECLINED`), and guest communications.
- **Map Coordinate Verifier**: Interactive visual verification gate enforcing `locationVerifiedByStaff` before properties can be bound to commercial partner contracts.
- **Partner Invoicing & Billing**: One-click PDF/CSV invoice calculation tracking gross amounts, net payable, and agency commission shares.

---

## 3. Technology Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Design Tokens (`globals.css`) with responsive glassmorphism, gold accenting, and modern typography.
- **Mapping**: [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) with custom SVG markers and popups.
- **Database / ORM**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL target schema.
- **Spreadsheet Processing**: [SheetJS (xlsx)](https://docs.sheetjs.com/) for bidirectional Excel ingestion.
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 4. Directory Structure

```
├── AGENTS.md                                # Multi-agent governance and specialized roles
├── Rules.md                                 # Immutable business and coding rules
├── Skills.md                                # Runbooks & operational procedures
├── FINAL_PRD.md                             # Authoritative Product Requirements Document
├── Victoria_Falls_Tourism_Business_Blueprint.md # Strategic market analysis
├── JOURNAL.md                               # Architectural Decision Records & dev changelog
├── README.md                                # Platform documentation
│
├── public/
│   ├── images/
│   │   ├── activities/                      # 57+ high-res photos for all 49 activities
│   │   ├── lodges/                          # Room and lodge imagery
│   │   └── destinations/                    # Regional hero assets
│   └── templates/                           # Catalog Excel import templates
│
├── src/
│   ├── app/
│   │   ├── (public)/                        # Customer-facing routes
│   │   │   ├── activities/                  # Activity directory & filters
│   │   │   │   └── [slug]/                  # Shearwater-style activity detail page
│   │   │   ├── hotels/                      # Interactive hotel map & request-to-book
│   │   │   ├── guide/                       # Visa, border & logistics reference guide
│   │   │   └── report-issue/                # Traveler issue reporter
│   │   │
│   │   ├── admin/                           # Staff back-office portal
│   │   │   ├── catalog-import/              # Excel sheet upload & diff preview
│   │   │   ├── request-queue/               # Triage dashboard & 24h SLA countdown
│   │   │   ├── map-verify/                  # Hotel coordinate verification tool
│   │   │   ├── invoices/                    # Partner commission invoicing dashboard
│   │   │   └── issues/                      # Customer issue resolution queue
│   │   │
│   │   └── api/                             # Backend REST endpoints & webhooks
│   │       ├── activities/                  # Activity search & retrieval
│   │       ├── hotels/                      # Hotel inventory & partner feed
│   │       ├── bookings/activity/           # Instant payment booking processor
│   │       ├── accommodation-requests/      # Request-to-book engine
│   │       ├── admin/catalog-import/        # Catalog batch sync
│   │       ├── admin/invoices/              # Automated billing generator
│   │       ├── admin/map-verify/            # Geocode staff verification
│   │       └── admin/triage/                # Request approval / rejection
│   │
│   ├── components/                          # Modular React components
│   │   ├── Navigation.tsx                   # Main global navigation
│   │   ├── BookingModal.tsx                 # Activity checkout modal
│   │   ├── RequestModal.tsx                 # Hotel request-to-book modal
│   │   ├── ReportIssueModal.tsx             # On-page feedback modal
│   │   └── ...
│   │
│   └── lib/                                 # Business logic & seed databases
│       ├── seed-data.ts                     # 49 activities & 66 properties
│       ├── types.ts                         # Complete TypeScript interfaces
│       ├── email.ts                         # NFKC normalization & pragmatic email validator
│       ├── excel-parser.ts                  # SheetJS parser for catalog import
│       └── prisma.ts                        # Extended Prisma client with email normalization
│
├── prisma/
│   ├── schema.prisma                        # PostgreSQL schema definition
│   └── migrations/                          # SQL migrations (email normalization & unique keys)
│
├── scripts/
│   ├── backfill-normalize-emails.ts         # Collision detector & idempotent normalization backfill
│   └── ...                                  # Asset and catalog generators
│
└── tests/
    └── email-normalization.test.ts          # 24 unit & cross-service integration tests
```

---

## 5. Getting Started

### Prerequisites
- Node.js 18.17.0+ or Node.js 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/mawonekev/Vic-Falls.git
cd Vic-Falls

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables
Configure `.env.local` with the following variables:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
DATABASE_URL="postgresql://user:password@localhost:5432/vicfalls"
```

### Running Locally
```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm start
```

### Testing & Database Backfill
```bash
# Run unit & integration test suite (24 tests)
npm test

# Run email normalization backfill in dry-run mode (safe audit)
npm run backfill

# Execute and commit email normalization backfill to database
npm run backfill:execute
```
The application will be accessible at `http://localhost:3000`.

---

## 6. Key Application Routes

### Public Front-End
- **Home**: `http://localhost:3000/`
- **Activities Directory**: `http://localhost:3000/activities`
- **Granular Activity Detail**: `http://localhost:3000/activities/helicopter-flight-of-angels`
- **Interactive Hotel Map**: `http://localhost:3000/hotels`
- **Logistics & Border Guide**: `http://localhost:3000/guide`

### Operations & Staff Back-Office
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Catalog Excel Importer**: `http://localhost:3000/admin/catalog-import`
- **Accommodation Request Triage**: `http://localhost:3000/admin/request-queue`
- **Map Geocode Verification**: `http://localhost:3000/admin/map-verify`
- **Partner Commission Invoices**: `http://localhost:3000/admin/invoices`
- **Issue Ticket Resolution**: `http://localhost:3000/admin/issues`

---

## 7. License & Rights

Commercial rights, branding, imagery, and operational blueprints are reserved for the Destination Management Platform and authorized regional travel partners across Zimbabwe, Zambia, and Botswana.
