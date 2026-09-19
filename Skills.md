# Skills.md — Project Skills & Operational Runbooks
## Victoria Falls, Livingstone & Chobe Regional Tourism Platform

---

This document outlines the specialized skills, procedural runbooks, and automation workflows tailored to this project. Each skill provides clear inputs, operational steps, verification criteria, and recovery procedures.

---

## 1. Skill Index & Quick Reference

| Skill ID | Skill Name | Primary Purpose | Frequency |
| :--- | :--- | :--- | :--- |
| **SK-01** | `ingest-fact-sheets` | Extracts data from docx/pdf fact sheets in `Shearwater Agents Info Pack/` into structured JSON/seed data. | Onboarding & content updates |
| **SK-02** | `import-excel-catalog` | Validates, diffs, and commits the two-tab catalog spreadsheet (`Activities` & `AddOns`) into PostgreSQL. | As supplier rates update |
| **SK-03** | `verify-hotel-coordinates` | Validates geo-coordinates for `MappedProperty` pins prior to granting partner status. | When adding hotel pins |
| **SK-04** | `test-stripe-payment-flows` | Validates immediate capture, 7-day pre-auth holds, and 48h expiring payment link fallbacks. | Pre-deployment & CI |
| **SK-05** | `generate-partner-invoices` | Calculates and issues automated commission invoices for Pay-at-Property stays. | Monthly billing cycle |
| **SK-06** | `monitor-sla-and-retries` | Scans pending requests approaching the 24h SLA and retries failed transactional emails. | Automated background cron |

---

## 2. Detailed Skill Runbooks

### SK-01: Ingest Fact Sheets & Media (`ingest-fact-sheets`)
* **Objective:** Ingest rich text, specifications, restrictions, and high-resolution photography from `Shearwater Agents Info Pack/` into the application database.
* **Input Assets:**
  - `Shearwater Agents Info Pack/Fact Sheets/*.docx` & `*.pdf`
  - Photo libraries: `Helicopter/`, `Explorers Village/`, `Rafting/`, `Falls Pics/`, etc.
* **Execution Procedure:**
  1. Parse `.docx` files using standard python or Node.js parsers to extract:
     - `name`, `durationMinutes`, `includedItems`, `excludedItems`, `restrictions`, `fitnessLevel`, `pickupTimes`.
  2. Map local photo files to their corresponding activity slug (e.g. `Helicopter/Heli -1.jpg` $\to$ `/images/activities/helicopter-flight-of-angels/hero.jpg`).
  3. Generate TypeScript seed objects complying with the Prisma `Activity` schema.
  4. Ensure park fee exclusion ($15 for helicopter) is explicitly set in `parkFeeUSD`.
* **Verification:**
  - Run database seed script (`npx prisma db seed`).
  - Verify activity page renders with high-res photo gallery and complete inclusions/exclusions list.

---

### SK-02: Import Excel Catalog (`import-excel-catalog`)
* **Objective:** Ingest staff-managed Excel pricing workbooks into PostgreSQL with change-diff validation and audit sign-off.
* **Workbook Specification:**
  - File format: `.xlsx`
  - Tab 1: `Activities` (Columns: `slug`, `name`, `destination`, `category`, `grossPriceUSD`, `nettPriceUSD`, `parkFeeUSD`, `status`).
  - Tab 2: `AddOns` (Columns: `activitySlug`, `name`, `grossPriceUSD`, `nettPriceUSD`, `capacityLimit`, `status`).
* **Execution Procedure:**
  1. Upload workbook via Admin Portal (`/admin/catalog-import`).
  2. Parser checks for:
     - Missing required columns or negative price values.
     - Foreign key integrity (each `activitySlug` on `AddOns` must exist on `Activities`).
     - Valid integer or null for `capacityLimit`.
  3. Generate side-by-side diff highlighting modified prices, newly added items, and deactivated records.
  4. Require staff admin confirmation before executing transaction commit.
* **Verification:**
  - Admin audit log records timestamp, admin email, and row count updated.

---

### SK-03: Verify Hotel Coordinates (`verify-hotel-coordinates`)
* **Objective:** Ensure all pins displayed on the Mapbox hotel map reflect true physical locations before linking to a commercial `Partner`.
* **Input:** `MappedProperty` records loaded from seed data or external geo sources.
* **Execution Procedure:**
  1. Admin opens `/admin/map-verify`.
  2. System displays pin on satellite map alongside property address and destination coordinates.
  3. Admin cross-references physical location:
     - Victoria Falls town center vs. Zambezi riverfront vs. Livingstone vs. Kasane/Chobe.
  4. Admin clicks "Verify Location" $\to$ sets `locationVerifiedByStaff = true`.
  5. Only once verified can the admin select a `Partner` record from the dropdown to enable direct **"Request to Book"** functionality.
* **Verification:**
  - Query database: confirm no record exists where `isBookablePartner == true` and `locationVerifiedByStaff == false`.

---

### SK-04: Test Stripe Payment Flows (`test-stripe-payment-flows`)
* **Objective:** Rigorously test all payment scenarios using Stripe CLI and test cards.
* **Scenarios to Validate:**
  1. **Immediate Activity Capture:**
     - Checkout an activity with 2 adults + 1 child + 1 VIP Front Seat AddOn.
     - Confirm Stripe PaymentIntent captures immediately; booking transitions to `CONFIRMED`.
  2. **Accommodation Pre-Authorization Hold (Pay Now):**
     - Submit request with `paymentPath = PAY_NOW`.
     - Confirm Stripe PaymentIntent creates `status = requires_capture`.
     - Admin clicks "Confirm & Capture" $\to$ capture succeeds $\to$ status `CONFIRMED`.
  3. **Capture Failure & 48h Expiring Recovery Link:**
     - Simulate capture failure (e.g. card expired or voided hold).
     - Confirm system generates Stripe Payment Link with `securePaymentLinkExpiresAt = now() + 48h`.
     - Confirm email is sent with urgent payment call-to-action.
     - Simulate link expiry $\to$ confirm request automatically falls back to `PAY_AT_PROPERTY` and creates `PartnerInvoice`.
* **Verification:**
  - Check Stripe Dashboard event logs and database state consistency.

---

### SK-05: Generate Partner Invoices (`generate-partner-invoices`)
* **Objective:** Calculate and export monthly commission statements for completed Pay-at-Property stays.
* **Execution Procedure:**
  1. Admin navigates to `/admin/invoices` at end of billing cycle.
  2. System aggregates all `AccommodationRequest` records where:
     - `paymentPath == PAY_AT_PROPERTY`
     - `status == CONFIRMED`
     - `checkOutDate` is in the past.
  3. Commission formula executes automatically:
     $$\text{commissionAmountUSD} = \text{quotedRateUSD} \times \left(\frac{\text{commissionValue}}{100}\right)$$
  4. Admin reviews statements grouped by `Partner` (e.g., Explorers Village).
  5. Click "Issue Invoices" $\to$ status changes from `DRAFT` to `ISSUED`, and PDF statement is emailed to partner contact.
* **Verification:**
  - Verify total commission matches sum of individual requests without rounding drift.

---

### SK-06: Monitor SLA & Email Retry Worker (`monitor-sla-and-retries`)
* **Objective:** Protect customer satisfaction and delivery resilience via automated scheduled checks.
* **Execution Procedure (Runs every 15 minutes):**
  1. **SLA Scanner:**
     - Query `AccommodationRequest` where `status == PENDING`.
     - If `createdAt` $> 20$ hours ago, trigger urgent Slack/Email notification to operations team: *"Request #[ID] has 4 hours remaining in SLA"*.
  2. **Email Retry Worker:**
     - Query failed email dispatch logs.
     - For records with `retryCount < 2`, re-attempt send via Resend / AWS SES.
     - If retry fails twice, flag ticket in admin queue for manual phone/WhatsApp follow-up.
* **Verification:**
  - Zero unaddressed requests exceed 24 hours without operational notification.
