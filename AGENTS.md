# AGENTS.md — Multi-Agent System & Project Architecture Guide
## Victoria Falls, Livingstone & Chobe Regional Tourism Platform

---

## 1. Project Overview & Context

This project is a specialized regional Online Travel Agency (OTA) and digital Destination Management Platform (DMC) for the **"Golden Triangle" of Southern Africa**:
- **Victoria Falls (Zimbabwe)**: Adventure, aerial scenic flights, Zambezi river excursions, cultural experiences.
- **Livingstone (Zambia)**: Devil's Pool, colonial & bridge heritage, riverside luxury lodges.
- **Chobe / Kasane (Botswana)**: Chobe River safaris, premier elephant concentrations, and national park game drives.

The platform combines **instant-paid activity bookings** (cloning and elevating the high-converting conversion layout of **Shearwater Victoria Falls**) with an **inquiry-based accommodation request-to-book engine** (offering travelers a choice between online payment hold and pay-at-property).

---

## 2. Agent Roles & Specializations

When collaborating on this codebase, Antigravity operates across specialized agent roles:

```
                                  ┌──────────────────────────────────┐
                                  │      Lead System Architect       │
                                  │  (PRD Alignment & Core Engine)   │
                                  └─────────────────┬────────────────┘
                                                    │
         ┌──────────────────────┬───────────────────┴───────────────────┬──────────────────────┐
         ▼                      ▼                                       ▼                      ▼
┌──────────────────┐  ┌──────────────────┐                    ┌──────────────────┐  ┌──────────────────┐
│Experience & UX   │  │Accommodation &   │                    │Checkout & Payment│  │Operations & Admin│
│Architect         │  │Hotel Map Agent   │                    │Fulfillment Agent │  │Workflow Agent    │
├──────────────────┤  ├──────────────────┤                    ├──────────────────┤  ├──────────────────┤
│• Shearwater page │  │• Request-to-Book │                    │• Stripe Elements │  │• Excel catalog   │
│  design system   │  │  engine          │                    │• 7-day pre-auth  │  │  importer        │
│• Fact sheet data │  │• Mapbox GL JS    │                    │  hold (hotels)   │  │• Auto commission │
│  ingestion       │  │  interactive map │                    │• 48h expiring    │  │  invoicing       │
│• Add-on capacity │  │• Pin coordinate  │                    │  recovery links  │  │• SLA queue timer │
│  enforcement     │  │  verification    │                    │• Webhook handler │  │• Issue reporting │
└──────────────────┘  └──────────────────┘                    └──────────────────┘  └──────────────────┘
```

### 2.1 Lead System Architect
- **Mission**: Ensures all features strictly comply with the [FINAL_PRD.md](file:///c:/Users/victo/Downloads/Vic%20Falls/FINAL_PRD.md) and [Rules.md](file:///c:/Users/victo/Downloads/Vic%20Falls/Rules.md).
- **Responsibilities**:
  - Enforce V1 vs. V2 scope boundaries (e.g. Hotelbeds live API and multi-currency gateway processing are deferred to V2).
  - Supervise Prisma database schema migrations and data integrity.
  - Maintain the single source of truth across customer-facing, operational, and financial layers.

### 2.2 Experience & UX Architect
- **Mission**: Deliver a visually stunning, world-class travel booking UI targeting discerning travelers from the US, UK/Europe, and Australia.
- **Responsibilities**:
  - Implement the **Shearwater-inspired experience layout**: hero panoramic galleries, pill badges (*12-13 min*, *Daily*, *Pick-up Included*), split-screen narrative with sticky booking sidebar, transparent park fee itemization, and customer reviews.
  - Ingest high-res photography and technical specs from the local `Shearwater Agents Info Pack`.
  - Enforce add-on capacity checks (e.g., *VIP Co-Pilot Front Seat* = max 1 per flight) before allowing checkout.

### 2.3 Accommodation & Hotel Map Agent
- **Mission**: Orchestrate the hybrid accommodation showcase and geographic hotel orientation.
- **Responsibilities**:
  - Implement the **Interactive Hotel Map** (Mapbox GL JS) populated with cached regional hotel data across Victoria Falls, Livingstone, and Kasane.
  - Maintain the clear boundary between **Bookable Partner Properties** (gold pins, direct request CTA) and **Reference-Only Properties** (gray pins, concierge inquiry modal).
  - Manage the **Request-to-Book flow**: check-in/out dates, guest counts, room types, payment preference (`PAY_NOW` vs. `PAY_AT_PROPERTY`), and display the guaranteed 24-hour SLA notice.

### 2.4 Checkout & Payment Fulfillment Agent
- **Mission**: Provide frictionless, rock-solid, and resilient payment processing via Stripe.
- **Responsibilities**:
  - Immediate USD gross charge capture for activity bookings.
  - Manual capture pre-authorization hold (up to 7 days) for `PAY_NOW` accommodation requests.
  - Automated recovery: generate a 48-hour expiring Stripe Payment Link (`securePaymentLinkExpiresAt`) on capture failure, auto-reverting to `PAY_AT_PROPERTY` upon expiry.
  - Guarantee **Payment Authority**: Stripe charge success is authoritative; email delivery failure triggers background retries and an admin ticket, never canceling confirmed bookings.

### 2.5 Operations & Admin Workflow Agent
- **Mission**: Empower internal staff to manage inventory, fulfill requests, and invoice partners without manual spreadsheet chaos.
- **Responsibilities**:
  - Two-tab Excel catalog parser (`Activities` and `AddOns`) with side-by-side diff previews and admin sign-off.
  - Mapped property coordinate verification gate (`locationVerifiedByStaff`).
  - Accommodation triage dashboard with real-time SLA countdown clocks.
  - Automated `PartnerInvoice` generation calculating exact commissions from structured partner terms (`commissionType` and `commissionValue`).

---

## 3. Technology Stack & Directory Structure

```
c:\Users\victo\Downloads\Vic Falls\
├── AGENTS.md                                # This agent system manifest
├── Rules.md                                 # Authoritative project coding & business rules
├── Skills.md                                # Runbooks and specialized operational workflows
├── FINAL_PRD.md                             # Authoritative Product Requirements Document
├── Victoria_Falls_Tourism_Business_Blueprint.md # Strategic market analysis & business blueprint
├── Shearwater Agents Info Pack/             # Source assets (photos, fact sheets, brochures)
│   ├── Helicopter/                          # 30+ high-res aerial photos
│   ├── Explorers Village/                   # Accommodation photos (deluxe, standard, camping)
│   ├── Fact Sheets/                         # Detailed .docx/.pdf specs for all activities
│   └── ...                                  # Rafting, Bungee, Cruises, Chobe Day Trip, etc.
│
└── src/ (Implementation Target)
    ├── app/                                 # Next.js 14+ App Router (pages & server actions)
    │   ├── (public)/                        # Customer-facing routes
    │   │   ├── activities/[slug]/           # Shearwater-style activity detail page
    │   │   ├── hotels/                      # Hotel map & request-to-book interface
    │   │   ├── guide/                       # Visa, border & logistics reference guide
    │   │   └── report-issue/                # On-page utility issue reporter
    │   ├── admin/                           # Staff back-office portal
    │   │   ├── catalog-import/              # Excel sheet upload & sign-off
    │   │   ├── request-queue/               # Accommodation triage & SLA countdown
    │   │   ├── map-verify/                  # Hotel coordinate verification
    │   │   └── invoices/                    # Partner commission invoicing dashboard
    │   └── api/                             # Webhook handlers & background workers
    │       ├── webhooks/stripe/             # Stripe payment intent & link listeners
    │       └── emails/retry/                # Transactional email retry worker
    ├── components/                          # Reusable UI components
    │   ├── booking-sidebar/                 # Sticky price & date booking widget
    │   ├── hotel-map/                       # Mapbox GL JS vector map
    │   ├── media-gallery/                   # Full-screen carousel & lightbox
    │   └── ui/                              # Buttons, modals, badges, accordions
    ├── lib/                                 # Shared utilities & services
    │   ├── prisma.ts                        # Prisma ORM client instance
    │   ├── stripe.ts                        # Stripe SDK wrapper
    │   ├── email.ts                         # Resend / SES transactional mailer
    │   └── excel-parser.ts                  # SheetJS catalog spreadsheet parser
    └── prisma/
        └── schema.prisma                    # Complete PostgreSQL schema
```

---

## 4. Communication & Execution Protocols

1. **Verify Before Action**: Always check [Rules.md](file:///c:/Users/victo/Downloads/Vic%20Falls/Rules.md) before altering pricing logic, data models, or payment workflows.
2. **Preserve Asset Fidelity**: Use the actual high-resolution photography and fact sheet data in `Shearwater Agents Info Pack`. Do not use placeholder content or low-resolution placeholders when local assets exist.
3. **Traceability**: All booking records must be traceable to unique `Traveller` emails, ensuring exact metrics for cross-destination combination rates.
