# Rules.md — Authoritative Project Rules & Governance
## Victoria Falls, Livingstone & Chobe Regional Tourism Platform

---

> [!IMPORTANT]
> All AI agents, contributors, and developers working on this repository **MUST ALWAYS** follow these rules without exception. These rules supersede generic assumptions and codify the findings of the Self-Debate Audit and the [FINAL_PRD.md](file:///c:/Users/victo/Downloads/Vic%20Falls/FINAL_PRD.md).

---

## 1. Scope Governance & Boundary Rules

1. **V1 vs. V2 Scope Isolation:**
   * **STRICTLY PROHIBITED in V1:** Live Hotelbeds APItude API runtime integration, automated dynamic basket packaging discounts, self-service partner extranet portals, and multi-currency processing at the payment gateway.
   * **PERMITTED in V1:** Direct partner contracts (e.g. Explorers Village), Mapbox reference hotel map, instant activity bookings with scarce add-on capacity checks, and USD ($) Stripe checkout.
   * *Rationale:* Premature complexity will delay launch; all database schemas are pre-architected to support V2 without destructive migrations.

2. **Currency Standard:**
   * All prices, transactions, invoices, and stored database amounts must be strictly denominated in **USD ($)**.
   * Any future currency switcher for EUR, GBP, or AUD is informational only (using cached conversion rates); the final Stripe charge is always USD.

---

## 2. Data Integrity & Schema Rules

1. **Traveller Deduplication:**
   * `Traveller.email` is strictly unique (`@unique`).
   * When creating a booking, the system **MUST** look up existing `Traveller` records by email first. If found, reuse and update the existing profile; never insert duplicate traveler records.
   * *Rationale:* Essential for calculating the **Regional Combination Rate** success metric.

2. **Add-On Capacity Enforcement:**
   * Add-ons with `capacityLimit == null` follow the base activity's "always available" rule.
   * Add-ons with a defined `capacityLimit: Int` (e.g. "VIP Co-Pilot Front Seat" = 1) **MUST** be validated against existing bookings for that slot prior to checkout. If limit is reached, disable selection with a "Sold Out for this Slot" badge.

3. **Mapped Property Coordinate Verification Gate:**
   * A `MappedProperty` pin **CANNOT** have its `partnerId` assigned or `isBookablePartner` set to `true` unless `locationVerifiedByStaff == true`.
   * Admins must visually verify the latitude/longitude against satellite maps before linking a revenue-generating partner.

4. **Structured Invoicing & Commission Math:**
   * Partner commission terms must never be stored as unparsed text. They must use `commissionType` (`PERCENTAGE` | `FIXED_AMOUNT`) and `commissionValue` (`Decimal`).
   * `PartnerInvoice.commissionAmountUSD` must be computed automatically at confirmation time:
     $$\text{commissionAmountUSD} = \begin{cases} \text{quotedRateUSD} \times \left(\frac{\text{commissionValue}}{100}\right) & \text{if PERCENTAGE} \\ \text{commissionValue} & \text{if FIXED\_AMOUNT} \end{cases}$$

---

## 3. Financial, Payment & Resiliency Rules

1. **Rate Protection ("Rate-Lapse" Rule):**
   * The rate quoted to the traveler at the moment of request submission (`quotedRateUSD`) is **locked and legally guaranteed**.
   * If a partner lodge increases prices while a request is pending, the platform absorbs the difference; the guest’s quoted price is never changed post-submission.

2. **Accommodation Pre-Authorization & Expiry Boundary:**
   * For `PAY_NOW` accommodation requests, Stripe creates a **pre-authorization hold** (up to 7 days).
   * Upon staff approval, the hold is captured.
   * **If capture fails:** A secure Stripe Payment Link is generated with an expiry timestamp:
     $$\text{securePaymentLinkExpiresAt} = \text{now}() + 48\text{ hours}$$
   * **Hard Expiry Boundary:** If the link is not paid within 48 hours, the request **automatically reverts to `paymentPath = PAY_AT_PROPERTY`**, transitions status to `CONFIRMED`, and generates a `PartnerInvoice`. No booking may linger in an unresolved payment state indefinitely.

3. **Payment Authority vs. Email Delivery:**
   * **Payment capture in Stripe is strictly authoritative.**
   * If the confirmation email fails to send due to mail service downtime, the booking status **remains CONFIRMED**.
   * The system logs the failure, attempts 1 automatic retry, and flags an alert in the admin queue for manual resend.

4. **Transparent National Park Fees:**
   * Park fees (e.g. $15 for Victoria Falls helicopter flights) must never be hidden in fine print.
   * They must be itemized on the experience page and presented with an optional pre-payment checkbox at checkout so travelers avoid cash friction on arrival.

---

## 4. UI/UX & Design System Rules

1. **Design Quality Standard:**
   * The UI must look like an ultra-premium, modern luxury travel publication (bespoke HSL palette: warm earth tones, deep safari obsidian, rich gold accents).
   * Browser default styles, generic bootstrap looks, or plain unstyled HTML are **STRICTLY FORBIDDEN**.
   * Use Vanilla CSS / CSS Modules with modern CSS variables, fluid responsive typography, glassmorphism headers, and smooth micro-animations. Avoid Tailwind CSS unless explicitly requested.

2. **The Shearwater Experience Conversion Hierarchy:**
   All activity product pages must adhere to the proven conversion structure:
   * **Hero Section:** Full-width panoramic gallery using local high-res photography + quick-scan pill badges (*Duration*, *Departures*, *Pickup Included*, *Fitness Level*).
   * **Tier Switcher:** Interactive toggle between flight/activity options (e.g., *Flight of Angels 12-13 min* vs. *Zambezi Spectacular 25 min*).
   * **What's Included & Excluded:** Clear green checkmarks vs. red crosses, with explicit park fee disclosure.
   * **Sticky Booking Sidebar:** Real-time price calculator, date/time slot picker, scarce add-on toggles, and primary "Book Now" CTA.
   * **Technical & Safety Specs:** Commercial certifications, aircraft models (Bell 206 / Airbus), bubble window preview.
   * **Trip Preparation & FAQ Accordion:** Dress code, passport requirements, weather cancellation rules.

3. **Map UX for Non-Bookable Pins:**
   * Non-bookable reference pins on the hotel map must show property name and address, accompanied by:  
     *"Looking to include this property in a custom itinerary? [Inquire with Concierge]"*.
   * Non-bookable pins must never display an active "Book Now" button or an error screen.

4. **Zero Placeholders Rule:**
   * Never use placeholder images (`via.placeholder.com` or generic stock photos) when real assets exist.
   * Utilize the high-resolution imagery in `Shearwater Agents Info Pack/` (*Helicopter, Explorers Village, Cruises, Rafting, Chobe*).

---

## 5. Technical Implementation & Operational Rules

1. **Spreadsheet Ingestion:**
   * Catalog updates must accept an `.xlsx` file with two tabs: `Activities` and `AddOns`.
   * Add-ons link to parent activities via `activitySlug`.
   * Spreadsheet upload requires side-by-side diff preview and staff sign-off before committing to PostgreSQL.

2. **Email Infrastructure:**
   * Automated customer transactional emails (booking vouchers, payment receipts, expiring links) **must** route through a dedicated transactional email provider (**Resend** or **AWS SES**).
   * Zoho Mail is restricted to human one-on-one customer support and concierge correspondence.

3. **Staff Confirmation SLA:**
   * All pending accommodation requests must be processed within **24 hours** (target <12 hours for daytime submissions).
   * The admin triage queue must display a live SLA countdown clock with visual urgency indicators (Green $\to$ Amber $\to$ Red).
