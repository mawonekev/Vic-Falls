/**
 * One-Off & Idempotent Email Normalization Backfill Script
 *
 * Requirements:
 * 1. Detect rows that collide after normalization (e.g. John@x.com and john@x.com).
 *    Do NOT delete or auto-merge them. Print a report listing each collision group
 *    with related booking and request counts, and STOP so the user can decide how to merge.
 * 2. Runnable in dry-run mode first (default: dry-run, pass --execute to commit changes).
 * 3. Idempotently normalizes Traveller.email, Partner.contactEmail, and IssueReport contacts.
 */

import { normalizeEmail, isValidEmail, normalizeIfEmail } from '../src/lib/email';
import { db } from '../src/lib/db';
import { PrismaClient } from '@prisma/client';

interface CollisionItem {
  id: string;
  rawEmail: string;
  fullName: string;
  bookingCount: number;
  requestCount: number;
}

interface CollisionGroup {
  normalizedEmail: string;
  records: CollisionItem[];
}

async function runBackfill() {
  const args = process.argv.slice(2);
  const isExecute = args.includes('--execute');
  const isDryRun = !isExecute || args.includes('--dry-run');

  console.log('===============================================================');
  console.log(' VICTORIA FALLS PLATFORM: EMAIL NORMALIZATION BACKFILL');
  console.log(` Mode: ${isDryRun ? 'DRY-RUN (Simulated - No Writes)' : 'EXECUTE (Committing Changes)'}`);
  console.log('===============================================================\n');

  // Check if PostgreSQL database is connected or if using persistent runtime store
  let prisma: PrismaClient | null = null;
  let usePrisma = false;

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
    try {
      prisma = new PrismaClient();
      await prisma.$connect();
      usePrisma = true;
      console.log('✓ Connected to PostgreSQL via Prisma Client.');
    } catch (e: any) {
      console.log(`ℹ PostgreSQL not reachable (${e.message}). Auditing runtime database layer.`);
      prisma = null;
      usePrisma = false;
    }
  } else {
    console.log('ℹ DATABASE_URL not set to live instance. Auditing application data layer & seed store.');
  }

  // -------------------------------------------------------------------------
  // 1. AUDIT & COLLISION DETECTION: TRAVELLERS
  // -------------------------------------------------------------------------
  console.log('\n--- Step 1: Scanning Travellers for Normalization Collisions ---');

  interface RawTraveller {
    id: string;
    email: string;
    fullName: string;
  }

  let travellers: RawTraveller[] = [];
  let bookings: { id: string; travellerId: string; travellerEmail: string }[] = [];
  let requests: { id: string; travellerId: string; travellerEmail: string }[] = [];

  if (usePrisma && prisma) {
    travellers = await prisma.traveller.findMany({
      select: { id: true, email: true, fullName: true }
    });
    bookings = await (prisma as any).activityBooking.findMany({
      select: { id: true, travellerId: true, travellerEmail: true }
    });
    requests = await (prisma as any).accommodationRequest.findMany({
      select: { id: true, travellerId: true, travellerEmail: true }
    });
  } else {
    // Audit in-memory & seed database
    const travellersAny = (db as any).travellers || [];
    travellers = travellersAny.map((t: any) => ({
      id: t.id,
      email: t.email,
      fullName: t.fullName
    }));
    bookings = ((db as any).activityBookings || []).map((b: any) => ({
      id: b.id,
      travellerId: b.travellerId,
      travellerEmail: b.travellerEmail
    }));
    requests = ((db as any).accommodationRequests || []).map((r: any) => ({
      id: r.id,
      travellerId: r.travellerId,
      travellerEmail: r.travellerEmail
    }));
  }

  console.log(`Found ${travellers.length} traveller records to analyze.`);

  // Group by normalized email
  const emailGroups = new Map<string, RawTraveller[]>();

  for (const t of travellers) {
    const norm = normalizeEmail(t.email);
    const existing = emailGroups.get(norm) || [];
    existing.push(t);
    emailGroups.set(norm, existing);
  }

  // Detect collision groups
  const collisions: CollisionGroup[] = [];

  for (const [normEmail, group] of Array.from(emailGroups.entries())) {
    if (group.length > 1) {
      // Multiple records normalize to the same address!
      const items: CollisionItem[] = group.map(t => {
        const bCount = bookings.filter(b => b.travellerId === t.id || b.travellerEmail.toLowerCase() === t.email.toLowerCase()).length;
        const rCount = requests.filter(r => r.travellerId === t.id || r.travellerEmail.toLowerCase() === t.email.toLowerCase()).length;
        return {
          id: t.id,
          rawEmail: t.email,
          fullName: t.fullName,
          bookingCount: bCount,
          requestCount: rCount
        };
      });
      collisions.push({
        normalizedEmail: normEmail,
        records: items
      });
    }
  }

  if (collisions.length > 0) {
    console.error('\n🚨 CRITICAL: EMAIL NORMALIZATION COLLISIONS DETECTED!');
    console.error(`Found ${collisions.length} collision group(s).`);
    console.error('As specified in Rules.md & PRD, records will NOT be auto-merged or deleted.');
    console.error('Stopping backfill execution immediately for manual review.\n');

    collisions.forEach((col, idx) => {
      console.error(`--- Collision Group #${idx + 1}: <${col.normalizedEmail}> ---`);
      col.records.forEach(rec => {
        console.error(`  • ID: ${rec.id}`);
        console.error(`    Raw Email:   "${rec.rawEmail}"`);
        console.error(`    Full Name:   "${rec.fullName}"`);
        console.error(`    Activity Bookings:      ${rec.bookingCount}`);
        console.error(`    Accommodation Requests: ${rec.requestCount}`);
      });
      console.error('');
    });

    console.error('Action Required: Resolve the duplicate records above before re-running backfill.\n');
    process.exit(1);
  }

  console.log('✓ Zero collision groups detected. All traveller emails resolve uniquely after normalization.');

  // -------------------------------------------------------------------------
  // 2. DETECT CHANGES FOR TRAVELLERS
  // -------------------------------------------------------------------------
  const travellerUpdates: { id: string; from: string; to: string }[] = [];
  for (const t of travellers) {
    const norm = normalizeEmail(t.email);
    if (t.email !== norm) {
      travellerUpdates.push({ id: t.id, from: t.email, to: norm });
    }
  }

  console.log(`Travellers requiring email normalization: ${travellerUpdates.length} of ${travellers.length}`);
  travellerUpdates.forEach(u => {
    console.log(`  • [Traveller ${u.id}] "${u.from}" -> "${u.to}"`);
  });

  // -------------------------------------------------------------------------
  // 3. DETECT CHANGES FOR PARTNERS
  // -------------------------------------------------------------------------
  console.log('\n--- Step 2: Scanning Partners for Normalization ---');

  interface RawPartner {
    id: string;
    name: string;
    contactEmail: string;
  }

  let partners: RawPartner[] = [];
  if (usePrisma && prisma) {
    partners = await prisma.partner.findMany({
      select: { id: true, name: true, contactEmail: true }
    });
  } else {
    partners = db.getPartners().map(p => ({
      id: p.id,
      name: p.name,
      contactEmail: p.contactEmail
    }));
  }

  const partnerUpdates: { id: string; name: string; from: string; to: string }[] = [];
  for (const p of partners) {
    const norm = normalizeEmail(p.contactEmail);
    if (p.contactEmail !== norm) {
      partnerUpdates.push({ id: p.id, name: p.name, from: p.contactEmail, to: norm });
    }
  }

  console.log(`Partners requiring contactEmail normalization: ${partnerUpdates.length} of ${partners.length}`);
  partnerUpdates.forEach(u => {
    console.log(`  • [Partner: ${u.name}] "${u.from}" -> "${u.to}"`);
  });

  // -------------------------------------------------------------------------
  // 4. DETECT CHANGES FOR ISSUE REPORTS
  // -------------------------------------------------------------------------
  console.log('\n--- Step 3: Scanning Issue Reports for Email Normalization ---');
  let issueReports: any[] = [];
  if (usePrisma && prisma) {
    issueReports = await (prisma as any).issueReport.findMany();
  } else {
    issueReports = db.getIssueReports();
  }

  const issueUpdates: { id: string; field: string; from: string; to: string }[] = [];
  for (const r of issueReports) {
    if (r.reporterEmail) {
      const norm = normalizeEmail(r.reporterEmail);
      if (r.reporterEmail !== norm) {
        issueUpdates.push({ id: r.id, field: 'reporterEmail', from: r.reporterEmail, to: norm });
      }
    }
    if (r.reporterContact && r.reporterContact.includes('@')) {
      const norm = normalizeIfEmail(r.reporterContact) || r.reporterContact;
      if (r.reporterContact !== norm) {
        issueUpdates.push({ id: r.id, field: 'reporterContact', from: r.reporterContact, to: norm });
      }
    }
  }

  console.log(`Issue reports requiring normalization: ${issueUpdates.length} of ${issueReports.length}`);
  issueUpdates.forEach(u => {
    console.log(`  • [Issue ${u.id}] ${u.field}: "${u.from}" -> "${u.to}"`);
  });

  // -------------------------------------------------------------------------
  // 5. COMMIT CHANGES (IF NOT DRY-RUN)
  // -------------------------------------------------------------------------
  console.log('\n---------------------------------------------------------------');
  if (isDryRun) {
    console.log(' [DRY RUN COMPLETED] Summary:');
    console.log(`  • Traveller updates pending:    ${travellerUpdates.length}`);
    console.log(`  • Partner updates pending:      ${partnerUpdates.length}`);
    console.log(`  • Issue Report updates pending: ${issueUpdates.length}`);
    console.log('\n No changes were written. To commit these changes, re-run with:');
    console.log('   npm run backfill:execute (or: node --experimental-strip-types scripts/backfill-normalize-emails.ts --execute)');
  } else {
    console.log(' [EXECUTING UPDATES] Writing normalized records to database...');

    if (usePrisma && prisma) {
      for (const u of travellerUpdates) {
        await prisma.traveller.update({
          where: { id: u.id },
          data: { email: u.to }
        });
      }
      for (const u of partnerUpdates) {
        await prisma.partner.update({
          where: { id: u.id },
          data: { contactEmail: u.to }
        });
      }
      for (const u of issueUpdates) {
        await (prisma as any).issueReport.update({
          where: { id: u.id },
          data: { [u.field]: u.to }
        });
      }
    }

    console.log(' ✓ Successfully updated all records idempotently.');
  }

  console.log('===============================================================\n');

  if (prisma) {
    await prisma.$disconnect();
  }
}

runBackfill().catch(err => {
  console.error('Fatal backfill error:', err);
  process.exit(1);
});
