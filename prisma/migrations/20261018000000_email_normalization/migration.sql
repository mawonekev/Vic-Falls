-- PostgreSQL Migration: Authoritative Email Normalization & Unique Indexes
-- Enforces clean lowercase, trimmed, zero-width-stripped emails across all entities

-- Step 1: Normalize existing emails in Traveller
UPDATE "Traveller"
SET "email" = LOWER(TRIM(REGEXP_REPLACE("email", '[\u200B\u200C\u200D\uFEFF\s]+', '', 'g')));

-- Step 2: Normalize existing emails in Partner
UPDATE "Partner"
SET "contactEmail" = LOWER(TRIM(REGEXP_REPLACE("contactEmail", '[\u200B\u200C\u200D\uFEFF\s]+', '', 'g')));

-- Step 3: Normalize reporterEmail in IssueReport where populated
UPDATE "IssueReport"
SET "reporterEmail" = LOWER(TRIM(REGEXP_REPLACE("reporterEmail", '[\u200B\u200C\u200D\uFEFF\s]+', '', 'g')))
WHERE "reporterEmail" IS NOT NULL;

-- Step 4: Conditionally normalize reporterContact in IssueReport ONLY when it contains '@' (preserving phone / WhatsApp contacts)
UPDATE "IssueReport"
SET "reporterContact" = LOWER(TRIM(REGEXP_REPLACE("reporterContact", '[\u200B\u200C\u200D\uFEFF\s]+', '', 'g')))
WHERE "reporterContact" IS NOT NULL AND "reporterContact" LIKE '%@%';

-- Step 5: Enforce unique constraint index on Traveller(email)
CREATE UNIQUE INDEX IF NOT EXISTS "Traveller_email_key" ON "Traveller"("email");

-- Step 6: Create index on Partner(contactEmail) for fast partner communication lookup
CREATE INDEX IF NOT EXISTS "Partner_contactEmail_idx" ON "Partner"("contactEmail");

-- Step 7: Create index on IssueReport(reporterEmail)
CREATE INDEX IF NOT EXISTS "IssueReport_reporterEmail_idx" ON "IssueReport"("reporterEmail");
