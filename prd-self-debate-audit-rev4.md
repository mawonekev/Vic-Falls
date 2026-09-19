# Self-Debate Audit — PRD Rev. 3
## Victoria Falls, Livingstone & Chobe Tourism Platform

---

### Section 0: Changes in This Update

**Skeptic:** "Excel does not support live sync the way a cloud spreadsheet tool would" is stated as a technical fact. It isn't one — Excel files in OneDrive/SharePoint are queryable live via Microsoft Graph API. This is a scope decision dressed up as a technical limitation, which will mislead whoever reads this PRD in six months and wonders why live sync was never attempted.

**Author:** Fair distinction. The intent was "we're not building live sync in V1," not "it's impossible." Concede the wording.

**Engineer:** Confirms Skeptic — Graph API sync is a known, documented path. Not hard, just not chosen. The PRD should say that.

**Product Lead:** Separate concern, same section: nobody has sized the actual manual workload. Two destinations' worth of activities, now with add-ons as a second import type, uploaded by hand every time a price changes — that's a real recurring staff burden not accounted for anywhere.

**Judge:** Correction — reword to reflect a scope decision, not a capability limit. Workload concern noted but not corrected here; it's an operational note, not a PRD defect.

---

### Section 1: Product Summary

**Skeptic:** "Sold together as one trip" oversells a platform where one half (activities) is instant and the other half (accommodation) is a request that might not be confirmed for days. A first-time reader of just this paragraph would not guess that.

**Author:** The summary is intentionally high-level; the split is fully explained in Sections 4 and 5.

**Product Lead:** Doesn't resolve it — this is the same tension flagged back when the business idea was stress-tested, and it's resurfacing here because the PRD still doesn't say anywhere how long "request to book" is expected to take. See Section 5.2.

**Judge:** No standalone correction to Section 1. Tracked under Section 5.2 instead, where the actual gap lives.

---

### Section 2: Problem Statement

**Skeptic:** No objection — this section is a restatement of the business idea, not a technical or functional claim.

**Judge:** Clean. No correction.

---

### Section 3: Users & Personas

**Skeptic:** "Partner... not a user of the site" is asserted, but Section 5.2's failed-capture recovery flow requires a human at the business to *contact* the partner hotel to reconfirm availability manually — nothing says who does that outreach or how. The persona list is silent on this.

**Author:** That's staff's job, covered under "internal staff/admin... reviews and confirms accommodation requests."

**Product Lead:** Then say so explicitly — "confirms with the partner" is currently implied, not stated, for the recovery path specifically.

**Judge:** Minor correction — extend the staff persona description to explicitly cover recovery-path partner contact.

---

### Section 4: Scope

**Skeptic:** "Booking directly against a non-partner hotel shown on the map" is listed Out of Scope, but there's no stated behavior for what a traveller sees when they tap a non-bookable pin. Out of scope for booking isn't the same as undefined for display.

**Author:** Covered by Section 5.2's "reference-only pins" language.

**Engineer:** That only says what data a reference pin carries, not what UI action (if any) it offers. This is a genuine gap — does tapping it do nothing, or show "contact us to add this property"?

**Product Lead:** Also worth flagging: every non-bookable pin is effectively free advertising for a hotel with no relationship to the business. Is that desired, or should reference pins be limited/anonymized?

**Judge:** Correction — add explicit behavior for a non-bookable pin tap. Business decision on scope of information shown → `[ASK]`.

---

### Section 5.1: Activity Booking & Add-Ons

**Skeptic:** Add-ons follow "the same always-available rule as the base activity" — but a "guaranteed seat" add-on, by its own name, promises something an unlimited-inventory system cannot actually guarantee. Selling a guarantee the system has no way to honor is not the same risk class as an unlimited base activity slot.

**Product Lead:** This is the sharpest issue in the whole document. "Guaranteed VIP seat" sold to unlimited buyers on a 4-seat helicopter isn't an edge case, it's a predictable customer complaint and a possible refund/chargeback wave the first time it happens on a busy day.

**Author:** The base activity already carries this exact risk by design, per the original business idea, and was accepted as a business decision with the cost sitting on the operator relationship.

**Skeptic:** The base activity risk was accepted knowingly. This PRD extends that same rule to *add-ons that explicitly promise scarcity* without that extension ever being decided — it was inherited silently when add-ons were added to scope in Rev. 3.

**Judge:** Upheld. This is a new risk, not a carried-forward one, and it wasn't decided. Correction required.

---

### Section 5.2: Accommodation Request Flow

**Product Lead:** Nowhere does the PRD state how long a traveller should expect to wait for staff to confirm a request. Someone who has already booked international flights and is waiting on a hotel confirmation needs a time expectation, or the "request to book" experience just feels like being ignored.

**Skeptic:** Compounding gap: the secure-payment-link recovery flow (on a failed capture) has no expiry. A `confirmed` accommodation booking with a `capture_failed` payment and an unresponded link could sit in that state indefinitely — the business may owe the partner a commission on a stay that was never actually paid for.

**Engineer:** Confirms — nothing in the data model or flow closes this loop. There's no timeout state, no automatic re-notification, no fallback if the guest never responds to the secure link.

**Author:** The pay-at-property fallback was meant to cover this — staff can switch the path manually.

**Skeptic:** "Can" isn't "must." Nothing forces or prompts that switch if the guest goes silent.

**Judge:** Both upheld. Corrections required: a stated confirmation SLA, and an expiry/escalation rule for an unresolved secure payment link.

---

### Section 5.3–5.4: Admin Screens

**Engineer:** The hotel-map admin screen lets staff "link a mapped pin to a Partner record," but nothing verifies the pin's coordinates actually correspond to the real property before that link goes live. A wrong pin now represents a real bookable hotel to a traveller.

**Skeptic:** `IssueReport` has no severity or priority field, and no field indicating *what* about a listing is wrong (price vs. photo vs. location) — just a free-text description. For a small catalogue this may be tolerable; flagging it regardless.

**Judge:** First point upheld as a real data-integrity gap — correction required. Second point is low severity, noted but not corrected (free text is adequate at this catalogue size).

---

### Section 6: Data Models

**Skeptic:** `Traveller` has no unique constraint on `email`, and no described lookup-or-create logic. An activity booker and an accommodation requester using the same email could end up as two separate `Traveller` rows.

**Product Lead:** That silently breaks Success Metric #3 — the combination rate — which depends on matching the same person across both booking types. If the data model can't guarantee that match, the metric is reporting a number nobody can trust.

**Author:** Concede — this wasn't addressed in any revision.

**Engineer:** Confirms this is a straightforward fix: unique constraint on `email`, lookup-or-create at booking time.

**Skeptic, second point:** `Partner.commissionTerms` is free text. `PartnerInvoice.commissionAmountUSD` has no defined formula tied to it — for activities, commission is `gross − nett`, cleanly computable; for accommodation, there's no equivalent structure, so every invoice amount is a manual, unaudited calculation.

**Judge:** Both upheld, both corrections required.

---

### Section 7: Technical Architecture

**Engineer:** Three issues. First, Stripe immediate-capture for activities has no described handling for a charge that succeeds but the confirmation email then fails to send — is the booking still valid with no proof sent to the guest? Second, the geo/places provider is still completely undecided despite the map being **In Scope for V1**, not a future phase — that's a core scope item with no chosen technology, no cost estimate, and no stated refresh strategy for stale listings. Third, Zoho Mail is a mailbox product; using it as a transactional sender for booking confirmations risks deliverability and rate-limit problems that a dedicated transactional provider (Resend, SES, Postmark) is built to avoid.

**Author:** Zoho was your current stated provider, migration to AWS was already flagged as planned for later.

**Engineer:** Understood as a business choice, but the reliability risk should be named explicitly rather than passed over silently, since it directly affects whether a paying customer gets their confirmation.

**Judge:** All three upheld. First and third get corrections/flags; the geo/places gap is already an open question, but its severity should be raised given it's in-scope, not deferred.

---

### Section 8: Business Rules & Policies

**Product Lead:** Restates the add-on overselling issue from Section 5.1 — this is where the rule is formally stated, so the correction belongs here as much as there.

**Judge:** Same lapse, recorded once, corrected in both the rule text and the add-on flow.

---

### Section 9: Business Model

**Product Lead:** The gross/nett commission math doesn't account for Stripe's own processing fee. "Margin" as currently defined slightly overstates what the business actually keeps.

**Author:** True, but immaterial to V1 functional requirements — this is a financial reporting nuance, not a booking-flow defect.

**Judge:** Agreed, low severity. Noted, not corrected in the requirements themselves — flagged as a risk only.

---

### Section 10: Success Metrics

**Product Lead:** None of the four (or five, with add-on attach rate) metrics has a target or threshold. A conversion rate with nothing to compare it to doesn't tell you whether the idea is working, only that it happened.

**Author:** Targets were never requested and reasonably belong to the business owner, not the PRD.

**Judge:** Agreed with Author on ownership, but the PRD should still say explicitly that thresholds are undefined and whose job it is to set them, rather than leaving it silently implied. Minor correction.

---

### Section 11: Risks & Assumptions

**Skeptic:** Doesn't yet list the add-on overselling risk or the Traveller-deduplication gap — both were found in this audit, not carried from earlier revisions.

**Judge:** Both added.

---

### Section 12: Open Questions

**Skeptic:** No new gaps beyond what's already listed, but the geo/places question deserves to be reframed given it blocks an in-scope feature, not a future one.

**Judge:** Reframed, not newly added.

---

## Ranked Lapses

1. **[Critical]** — §5.1/§8, Skeptic + Product Lead: add-ons that promise scarcity (e.g. "guaranteed seat") inherit the "always available" rule meant for unlimited base activities, creating a real overselling risk the business never decided to accept for add-ons specifically.
2. **[High]** — §6, Skeptic + Product Lead: no unique constraint or lookup-or-create logic on `Traveller.email` — silently breaks the combination-rate success metric.
3. **[High]** — §5.2, Product Lead: no stated SLA for staff confirmation of an accommodation request.
4. **[High]** — §5.2, Skeptic + Engineer: no expiry or escalation rule for an unresolved secure payment link after a failed capture — a booking can remain confirmed without payment indefinitely.
5. **[Medium-High]** — §6, Skeptic: `PartnerInvoice.commissionAmountUSD` has no defined formula, since `Partner.commissionTerms` is unstructured text — accommodation commission is uncomputable and unauditable.
6. **[Medium-High]** — §7, Engineer: geo/places data provider is undecided despite the hotel map being in scope for V1, with no cost, rate-limit, or staleness-refresh plan.
7. **[Medium]** — §7, Engineer: Zoho Mail as a transactional sender risks deliverability/rate-limit issues; not flagged anywhere as a risk.
8. **[Medium]** — §0, Skeptic + Engineer: "Excel doesn't support live sync" is stated as a technical fact when it's a scope decision.
9. **[Medium]** — §5.3, Engineer: no verification step for a `MappedProperty` pin's real-world accuracy before it's linked to a live `Partner`.
10. **[Medium]** — §7, Engineer: no defined behavior for a successful, captured activity payment whose confirmation email then fails to send.
11. **[Low]** — §4/§5.2, Engineer + Product Lead: no defined behavior for tapping a non-bookable map pin.
12. **[Low]** — §10, Product Lead: success metrics have no stated targets or named owner for setting them.

## Exact Corrections

1. In §5.1 and §8, add: *"Add-ons that imply a limited or guaranteed resource (e.g. a guaranteed seat) are excluded from the default 'always available' rule and require a `capacityLimit` field on `AddOn` (nullable — null means unlimited, a number means hard-capped). `[ASK: which add-ons, if any, need a real capacity limit, and what is it per activity?]`"*
2. In §6, under `Traveller`: add `email` as a unique field, and in §5.1/§5.2 add: *"Booking creation looks up an existing `Traveller` by email before creating a new record; an existing match is reused rather than duplicated."*
3. In §5.2, add: *"Staff are expected to confirm or decline a submitted `AccommodationRequest` within `[ASK: how many hours/days is the target confirmation window?]`. The traveller-facing request form states this expectation at submission."*
4. In §5.2 and §6 (`Payment`), add: `securePaymentLinkExpiresAt` field, and the rule: *"If a secure payment link is not completed by `securePaymentLinkExpiresAt` (`[ASK: how many hours/days should the link remain valid?]`), the `AccommodationRequest` automatically reverts to `paymentPath = PAY_AT_PROPERTY` and a `PartnerInvoice` is generated, so no booking remains in an unresolved payment state indefinitely."*
5. In §6 (`Partner`), replace `commissionTerms` (text) with: `commissionType` (enum: `PERCENTAGE` / `FIXED_AMOUNT`), `commissionValue` (decimal). In §8, add: *"`PartnerInvoice.commissionAmountUSD` is computed automatically from `quotedRateUSD` and the partner's `commissionType`/`commissionValue` at confirmation time, mirroring the gross/nett calculation used for activities."*
6. In §7, replace the geo/places line with: *"Geo/places data source: `[ASK: which provider — cost, rate limits, and how often listings are refreshed to avoid stale or closed properties still appearing on the map, all need to be decided before this in-scope feature can be built.]`"*
7. In §7 and §11, add: *"Risk: Zoho Mail is a mailbox product, not a dedicated transactional email service, and may face deliverability or rate-limit issues at booking-confirmation volume. `[ASK: is a dedicated transactional provider acceptable for V1, or is Zoho a fixed constraint?]`"*
8. In "Changes in This Update" (§0), replace the Excel line with: *"Spreadsheet source confirmed as Excel. Manual admin upload is used by choice for V1 — Excel files can technically be synced live via Microsoft Graph API, but that integration is out of scope for this version, not technically unavailable."*
9. In §5.3, add: *"Before a `MappedProperty` can be linked to an active `Partner` record, staff must confirm the pin's address and coordinates match the actual property. `[ASSUME: this is a manual visual check against the map, not an automated address-validation service, unless one is specifically requested.]`"*
10. In §7, add: *"If a `Payment` is captured successfully but the confirmation email fails to send, the `ActivityBooking` remains `confirmed` regardless — payment success, not email delivery, is authoritative. A failed email triggers one automatic retry; if that also fails, it is logged for staff to resend manually."*
11. In §5.2, add: *"Tapping a non-bookable `MappedProperty` pin shows its name and address only, with no booking action. `[ASK: should a non-bookable pin invite the traveller to contact the business about adding that property, or show nothing further?]`"*
12. In §10, add: *"No target thresholds are defined for these metrics in this PRD; setting them is the business owner's decision, to be made once initial data is available, not a build requirement."*

---

## Revised PRD (Rev. 4 — Post-Audit)

### Changes in This Update

This revision applies every unresolved lapse from a self-debate audit of
Rev. 3. Twelve corrections were made across data models, business rules,
and technical architecture. Several introduce new `[ASK]` items that
require a decision before build — most notably around add-on capacity
limits, accommodation confirmation timing, and secure payment link
expiry, none of which were decided previously and are not invented here.

- **Add-ons that imply scarcity (e.g. "guaranteed seat") are no longer
  covered by the "always available" rule by default.** A new
  `capacityLimit` field allows specific add-ons to be capped.
- **`Traveller` records are now deduplicated by email**, protecting the
  accuracy of the combination-rate success metric.
- **A confirmation SLA and a secure-payment-link expiry are now
  required**, closing two paths where a booking could sit unresolved
  indefinitely.
- **Accommodation commission is now a structured, computable field**
  (`commissionType`/`commissionValue`) instead of free text.
- **The geo/places data source gap is elevated** — it's in scope for V1
  and still has no chosen provider.
- **Zoho Mail's suitability as a transactional sender is now flagged as
  a risk**, not silently assumed adequate.
- **The Excel "no live sync" line is reworded** to describe a scope
  choice, not a technical limitation.
- **A mapped-hotel verification step, an email-failure fallback, and a
  non-bookable pin's tap behavior are now defined.**
- **Success metrics now state explicitly that no target thresholds are
  set in this document.**

### 1. Product Summary

A booking website for the "Golden Triangle" of Southern Africa — Victoria
Falls (Zimbabwe), Livingstone (Zambia), and Chobe/Kasane (Botswana) —
sold together as one trip to international travellers from the US/Canada,
UK/Western Europe, and Australia/New Zealand. Version one covers two
distinct booking experiences: instant, paid activity booking with
optional add-ons, and an inquiry-based accommodation flow where the
traveller chooses to pay on the site now or pay the property on arrival.
A map view built from external geo data shows the broader hotel
landscape in each destination, alongside the smaller set of properties
actually bookable through the site. The business acts as a travel agent,
not a stockholder.

### 2. Problem Statement

An international traveller planning a Victoria Falls trip today has to
book a helicopter flight with one operator, a hotel through a generic
OTA, and a Chobe day trip over an email thread with a third party, with
no single party coordinating the whole itinerary, the border logistics,
or the payment experience. This platform exists to be that single
coordinator, without pretending to control inventory it does not own.

### 3. Users & Personas

- **Traveller** — the only user of the public-facing site. Browses and
  books activities instantly (with optional add-ons), browses a hotel
  map, and submits accommodation requests to bookable partner
  properties with a choice of payment timing.
- **Partner (hotel or activity operator)** — not a user of the site.
  Provides pricing and availability that staff enter into the system.
  Receives payment or an invoice per the agreed commission. When a
  "pay now" accommodation payment capture fails, staff are responsible
  for re-confirming availability with this partner directly as part of
  the recovery flow.
- **Internal staff/admin** — not customer-facing. Maintains the
  activity and add-on spreadsheet import, verifies mapped hotel
  locations before linking them to a `Partner`, reviews and confirms
  accommodation requests within the stated SLA, manages the manual
  review gate, captures/voids held payments, sends secure payment links
  on capture failure, tracks pay-at-property invoicing, and reviews
  reported issues.

### 4. Scope

#### In Scope for V1
- Activity browsing and instant, paid booking across all three
  destinations, gross/nett priced, availability always shown, with
  optional add-ons (capacity-limited where the add-on implies scarcity).
- A map view of all hotels in the three destination areas, sourced from
  an external geo/places data source, with bookable partner properties
  distinguished from reference-only listings.
- Accommodation request-to-book flow for directly-agreed (bookable)
  properties, with a pay-now (held, then captured) or pay-at-property
  choice, a stated staff confirmation SLA, and an expiring secure
  payment link on capture failure.
- Staff/admin screens for activity and add-on import and sign-off,
  mapped-hotel verification, accommodation review/confirmation, payment
  capture/void/secure-link generation, pay-at-property invoice
  tracking with automatic commission calculation, and issue-report
  review.
- A "report an issue" link on every activity and accommodation page,
  creating a tracked record and notifying the owner directly.
- One static border/visa/currency reference page.
- Automatic confirmation emails for paid activity bookings and confirmed
  accommodation requests, with a retry-then-manual-resend fallback if
  delivery fails.

#### Out of Scope for V1
- The Hotelbeds integration and the "honour the lower rate" rule.
- Real capacity/seat tracking for activities or standard add-ons — only
  add-ons explicitly flagged as scarce carry a capacity limit.
- Personalization, package deals, or a loyalty scheme.
- A partner-facing portal or login.
- Automated, itinerary-specific border/visa messaging.
- Multi-currency checkout beyond USD.
- Any accounting-system integration beyond a manual, in-app invoice
  tracking record.
- Direct booking against a non-partner hotel shown on the map (display
  only, per Section 5.2).

### 5. Functional Requirements

#### 5.1 Activity booking and checkout
- Traveller browses activities by destination and category, opens a
  detail page, selects a date, time slot, and guest count.
- Traveller may select zero or more optional add-ons. **Add-ons with a
  `capacityLimit` set enforce that limit at checkout**; add-ons with no
  limit follow the same always-available rule as the base activity.
  `[ASK: which specific add-ons, if any, need a real capacity limit,
  and what is it per activity?]`
- Booking lookup: the traveller's email is checked against existing
  `Traveller` records first; an existing match is reused, not
  duplicated.
- Checkout captures payment via Stripe immediately on success.
- On success: an `ActivityBooking` record is created (`confirmed`),
  linked to any `ActivityBookingAddOn` records, and a confirmation
  email is sent. **Payment success is authoritative regardless of email
  outcome** — a failed send triggers one automatic retry, then is
  logged for manual resend if that also fails.
- On payment failure: no records are created; the traveller sees a
  plain retry message.

#### 5.2 Hotel map and accommodation request-to-book flow
- The site shows a map of hotels in each destination, from an external
  geo/places source (Section 7). Properties linked to an active
  `Partner` record are bookable; others are reference-only, showing
  name and address with **no booking action**.
  `[ASK: should a non-bookable pin invite the traveller to contact the
  business about adding that property, or show nothing further?]`
- For a bookable property, the traveller submits a request with the
  same fields as before, and chooses **Pay now** or **Pay at
  property**. The request form states the expected confirmation
  timeframe. `[ASK: what is the target staff confirmation SLA — hours
  or days?]`
- Every `AccommodationRequest` requires manual staff confirmation,
  including the border/permit review gate.
- **On staff confirmation:**
  - `PAY_NOW`: the held payment is captured.
    - **If capture fails:** guest is notified immediately with a
      secure Stripe payment link and a pay-at-property fallback option.
      **The link carries an expiry** (`securePaymentLinkExpiresAt`).
      `[ASK: how long should the link remain valid before it expires?]`
      If it expires unused, the request **automatically** reverts to
      `PAY_AT_PROPERTY` and a `PartnerInvoice` is generated — no
      booking is left in an unresolved payment state indefinitely.
  - `PAY_AT_PROPERTY`: a `PartnerInvoice` is created, with its
    commission amount computed automatically from the partner's
    `commissionType`/`commissionValue` (Section 6) — no manual
    calculation required.
- **On decline:** a `PAY_NOW` hold is voided; the traveller is
  notified.
- Rate-lapse rule unchanged: `quotedRateUSD` is fixed at confirmation.

#### 5.3 Staff/admin screens
- **Activity catalogue:** upload/import the Excel spreadsheet
  (`grossPriceUSD`/`nettPriceUSD` per activity and add-on), with
  sign-off on price changes.
- **Hotel map data:** before linking a `MappedProperty` to a `Partner`,
  staff confirm the pin's address and coordinates match the real
  property. `[ASSUME: manual visual check, not an automated
  address-validation service, unless specifically requested.]`
- **Accommodation request queue:** confirm/decline, capture/void,
  generate secure payment links, with the request's time-in-queue
  visible against the stated SLA.
- **Invoicing:** `PartnerInvoice` status tracking, with commission
  amounts calculated automatically rather than entered by hand.
- **Issue reports:** queue of submitted `IssueReport` records.

#### 5.4 "Report an issue" flow
Unchanged — creates an `IssueReport` record and sends a direct
notification to the owner.

### 6. Data Models

**Activity**
- `id`, `destination`, `name`, `category`, `description`,
  `durationMinutes`, `grossPriceUSD`, `nettPriceUSD`, `includedItems`,
  `excludedItems`, `restrictions`, `photos`, `lastVerifiedDate`,
  `status`, `sourceRowRef`

**AddOn**
- `id`, `activityId` (FK), `name`, `description`, `grossPriceUSD`,
  `nettPriceUSD`, **`capacityLimit`** (nullable integer — null means
  unlimited), `status`, `sourceRowRef`

**ActivityBooking**
- `id`, `activityId` (FK), `travellerId` (FK), `bookingDate`,
  `timeSlot`, `numAdults`, `numChildren`, `totalAmountUSD`,
  `paymentId` (FK), `status` (`confirmed`), `createdAt`

**ActivityBookingAddOn**
- `id`, `activityBookingId` (FK), `addOnId` (FK), `priceAtBookingUSD`

**MappedProperty**
- `id`, `name`, `address`, `latitude`, `longitude`, `sourceApiId`,
  `destination`, `isBookablePartner`, `partnerId` (FK, nullable),
  **`locationVerifiedByStaff`** (boolean, must be true before
  `partnerId` can be set)

**AccommodationRequest**
- `id`, `partnerId` (FK), `travellerId` (FK), `checkInDate`,
  `checkOutDate`, `roomType`, `numGuests`, `quotedRateUSD`,
  `paymentPath`, `status`, `paymentId` (FK, nullable),
  `manualReviewNotes`, `createdAt`, `confirmedAt`

**Partner**
- `id`, `type`, `name`, `destination`, `contactEmail`, `contactPhone`,
  **`commissionType`** (enum: `PERCENTAGE` / `FIXED_AMOUNT`),
  **`commissionValue`** (decimal), `contentRightsGranted`, `status`

**Payment**
- `id`, `type`, `relatedBookingId` or `relatedAccommodationRequestId`,
  `amountUSD`, `gatewayReference`, `status`, `capturedAt`,
  `securePaymentLinkUrl`, `securePaymentLinkSentAt`,
  **`securePaymentLinkExpiresAt`**

**PartnerInvoice**
- `id`, `partnerId` (FK), `accommodationRequestId` (FK),
  `commissionAmountUSD` (auto-computed from `quotedRateUSD` and the
  partner's commission fields), `status`, `createdAt`, `billedAt`,
  `paidAt`

**IssueReport**
- `id`, `pageType`, `pageRefId`, `description`, `reporterContact`,
  `status`, `createdAt`

**Traveller**
- `id`, `name`, **`email` (unique)**, `phone`, `nationality`

### 7. Technical Architecture & Integrations

- **Framework:** Next.js (TypeScript).
- **ORM/Database:** Prisma ORM over PostgreSQL.
- **Payment gateway:** Stripe. PaymentIntents with manual capture for
  accommodation pay-now, Payment Links for the secure-link recovery
  flow (with an expiry, per Section 5.2). Immediate capture for
  activity checkout. Payment success is authoritative independent of
  confirmation email delivery (Section 5.1).
- **Spreadsheet-to-database:** Excel, via manual admin upload. This is
  a scope choice for V1 — Excel files can technically be synced live
  via Microsoft Graph API, but that integration is out of scope here,
  not technically unavailable. `[ASK: separate sheet for add-ons, or
  columns on the activity sheet?]`
- **Geo/places data source: still undecided, and this blocks an
  in-scope feature (the hotel map), not a future one.**
  `[ASK: which provider — cost, rate limits, and a refresh strategy for
  stale or closed listings all need deciding before this can be
  built.]`
- **Email sending:** Zoho Mail for V1. **Risk:** Zoho is a mailbox
  product, not a dedicated transactional email service, and may face
  deliverability or rate-limit issues at confirmation volume.
  `[ASK: is Zoho acceptable as a fixed constraint for V1, or should a
  dedicated transactional provider (e.g. Resend, SES) be worth
  adopting now instead of at the planned later migration?]`
- **Hosting/domain:** deferred to a later version.

### 8. Business Rules & Policies

- **Rate-lapse honouring, manual review gate, "always show
  availability" for base activities, pay-at-property invoicing:**
  unchanged.
- **Add-on availability is no longer blanket "always available."**
  Add-ons that imply a limited or guaranteed resource carry a
  `capacityLimit`; only add-ons with no limit set inherit the base
  activity's always-available rule.
- **Accommodation commission is calculated automatically** from
  `quotedRateUSD` and the partner's `commissionType`/`commissionValue`,
  the same computable approach used for activity gross/nett margin —
  no unaudited manual calculation.
- **Failed capture recovery now has a hard boundary:** an unresolved
  secure payment link expires and auto-reverts the booking to
  pay-at-property rather than remaining open-ended.
- **Accommodation confirmation has a stated SLA**, shown to the
  traveller at request time.

### 9. Business Model

| Stream | Basis |
| :--- | :--- |
| Activity margin | `grossPriceUSD − nettPriceUSD` on the base activity, captured at booking |
| Add-on margin | Same gross/nett formula, capacity-limited where flagged, captured at booking |
| Accommodation, pay-now | Captured at confirmation (or via secure link, before expiry); business pays the partner its share |
| Accommodation, pay-at-property | Invoiced automatically via `PartnerInvoice`, after the stay |

**Risk noted, not corrected here:** none of the above margins account
for Stripe's own processing fee — reported margin is gross of
processing costs, not net take-home.

### 10. Success Metrics

1. Activity funnel (page visits to `ActivityBooking` — still needs an
   analytics tool, unresolved).
2. Accommodation funnel, by `paymentPath`, now measurable against the
   stated confirmation SLA.
3. Combination rate, by `Traveller` — now reliable, since `Traveller`
   records are deduplicated by email.
4. Payment path split.
5. `[ASK: add-on attach rate as a fifth metric — yes or no?]`

**No target thresholds are defined for any of these metrics in this
PRD.** Setting them is the business owner's decision, to be made once
initial data is available, not a build requirement.

### 11. Risks & Assumptions

- **New, from this audit:** add-ons implying scarcity were, until this
  revision, silently covered by the unlimited-availability rule meant
  for base activities — corrected, but the specific add-ons needing a
  real limit are still undecided.
- **New, from this audit:** `Traveller` deduplication was previously
  unaddressed and would have silently corrupted the combination-rate
  metric.
- **New, from this audit:** Zoho Mail's suitability as a transactional
  sender at volume is unverified.
- Geo/places data source, its cost, and its refresh strategy remain
  undecided despite being required for an in-scope feature.
- Analytics tooling for the activity funnel metric is still undecided.
- Reported margins do not account for Stripe processing fees.

### 12. Open Questions

1. Which add-ons, if any, need a real `capacityLimit`, and what is it?
2. What is the target staff confirmation SLA for an accommodation
   request?
3. How long should a secure payment link remain valid before it
   expires and auto-reverts the booking to pay-at-property?
4. Which geo/places data source should populate the hotel map — cost,
   rate limits, and refresh strategy all need deciding, since this
   blocks an in-scope feature?
5. Is Zoho acceptable as a fixed email constraint for V1, or should a
   dedicated transactional provider be adopted now?
6. Should a non-bookable map pin invite contact about adding that
   property, or show nothing further?
7. In the Excel file, are add-ons a separate sheet/tab or columns on
   the same sheet as their parent activity?
8. Is any analytics tool already in use, or is activity-funnel tracking
   out of scope for V1 reporting?
9. Should add-on attach rate be tracked as a fifth success metric?
