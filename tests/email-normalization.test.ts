import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEmail, isValidEmail, normalizeIfEmail } from '../src/lib/email';
import { db } from '../src/lib/db';

describe('Unit Tests: Email Normalization & Validation', () => {
  it('handles uppercase conversion to lowercase', () => {
    assert.equal(normalizeEmail('SARAH.JENKINS@EXAMPLE.CO.UK'), 'sarah.jenkins@example.co.uk');
    assert.equal(normalizeEmail('John.Doe@ZambeziAdventures.COM'), 'john.doe@zambeziadventures.com');
  });

  it('trims leading and trailing surrounding whitespace', () => {
    assert.equal(normalizeEmail('   sarah@example.com   '), 'sarah@example.com');
    assert.equal(normalizeEmail('\t\n traveller@shearwater.com \r\n'), 'traveller@shearwater.com');
  });

  it('removes internal whitespace', () => {
    assert.equal(normalizeEmail('sarah . jenkins @ example . com'), 'sarah.jenkins@example.com');
    assert.equal(normalizeEmail('m chang @ example.com'), 'mchang@example.com');
  });

  it('removes zero-width and invisible characters (U+200B, U+200C, U+200D, U+FEFF)', () => {
    // U+200B Zero-width space
    // U+200C Zero-width non-joiner
    // U+200D Zero-width joiner
    // U+FEFF Byte order mark / zero-width no-break space
    const withZeroWidth = 'sarah\u200B.\u200Cjenkins\u200D@\uFEFFexample.co.uk';
    assert.equal(normalizeEmail(withZeroWidth), 'sarah.jenkins@example.co.uk');
  });

  it('normalizes full-width Unicode characters via NFKC', () => {
    // Full-width characters commonly generated on East Asian keyboards:
    // ＴＥＳＴ@ＥＸＡＭＰＬＥ.ＣＯＭ
    const fullWidth = 'ＴＥＳＴ@ＥＸＡＭＰＬＥ.ＣＯＭ';
    assert.equal(normalizeEmail(fullWidth), 'test@example.com');
  });

  it('strictly preserves plus-tags (provider-specific aliases)', () => {
    assert.equal(normalizeEmail('sarah+vicfalls2026@example.com'), 'sarah+vicfalls2026@example.com');
    assert.equal(normalizeEmail('JOHN+HELI-FLIGHT@EXAMPLE.COM'), 'john+heli-flight@example.com');
  });

  it('strictly preserves dots in local part', () => {
    assert.equal(normalizeEmail('sarah.middle.jenkins@example.co.uk'), 'sarah.middle.jenkins@example.co.uk');
    assert.equal(normalizeEmail('FIRST.LAST@DOMAIN.COM'), 'first.last@domain.com');
  });

  it('returns empty string for null, undefined, or empty inputs', () => {
    assert.equal(normalizeEmail(''), '');
    assert.equal(normalizeEmail(null as any), '');
    assert.equal(normalizeEmail(undefined as any), '');
  });

  // --- Validation Tests ---

  it('rejects email missing @', () => {
    assert.equal(isValidEmail('sarah.jenkinsexample.com'), false);
    assert.equal(isValidEmail('plainaddress'), false);
  });

  it('rejects email with double @', () => {
    assert.equal(isValidEmail('sarah@@example.com'), false);
    assert.equal(isValidEmail('sarah@sub@example.com'), false);
  });

  it('rejects empty string and short invalid values', () => {
    assert.equal(isValidEmail(''), false);
    assert.equal(isValidEmail('@'), false);
    assert.equal(isValidEmail('a@'), false);
    assert.equal(isValidEmail('@b.c'), false);
  });

  it('rejects over-length input exceeding 254 total octets', () => {
    const longDomain = 'a'.repeat(250) + '.com';
    assert.equal(isValidEmail(`user@${longDomain}`), false);
  });

  it('rejects over-length local part exceeding 64 octets', () => {
    const longLocal = 'a'.repeat(65);
    assert.equal(isValidEmail(`${longLocal}@example.com`), false);
  });

  it('validates legal local part up to 64 octets', () => {
    const maxLegalLocal = 'a'.repeat(64);
    assert.equal(isValidEmail(`${maxLegalLocal}@example.com`), true);
  });

  it('rejects domain without dot or with invalid domain labels', () => {
    assert.equal(isValidEmail('user@localhost'), false);
    assert.equal(isValidEmail('user@.example.com'), false);
    assert.equal(isValidEmail('user@example.com.'), false);
    assert.equal(isValidEmail('user@example..com'), false);
    assert.equal(isValidEmail('user@-example.com'), false);
  });

  it('rejects top-level domain with less than 2 characters', () => {
    assert.equal(isValidEmail('user@example.c'), false);
    assert.equal(isValidEmail('user@example.co'), true);
    assert.equal(isValidEmail('user@example.com'), true);
  });

  it('accepts valid normalized email addresses', () => {
    assert.equal(isValidEmail('sarah.jenkins@example.co.uk'), true);
    assert.equal(isValidEmail('mchang@example.com'), true);
    assert.equal(isValidEmail('reservations@explorersvillage.com'), true);
    assert.equal(isValidEmail('pilot+copilot@shearwater.co.zw'), true);
  });
});

describe('Unit Tests: normalizeIfEmail for IssueReport.reporterContact', () => {
  it('preserves international phone numbers without corruption', () => {
    assert.equal(normalizeIfEmail('+263 77 210 0110'), '+263 77 210 0110');
    assert.equal(normalizeIfEmail('+260 97 123 4567'), '+260 97 123 4567');
  });

  it('preserves WhatsApp text and labels without corruption', () => {
    assert.equal(normalizeIfEmail('WhatsApp: +1 (555) 019-2834'), 'WhatsApp: +1 (555) 019-2834');
  });

  it('normalizes reporterContact when an email address is entered', () => {
    assert.equal(normalizeIfEmail('  SARAH.JENKINS@EXAMPLE.CO.UK  '), 'sarah.jenkins@example.co.uk');
    assert.equal(normalizeIfEmail('GUEST\u200B@SHEARWATER.COM'), 'guest@shearwater.com');
  });

  it('preserves null or undefined reporterContact safely', () => {
    assert.equal(normalizeIfEmail(null), null);
    assert.equal(normalizeIfEmail(undefined), undefined);
  });
});

describe('Integration Tests: Cross-Service Deduplication & Entity Integrity', () => {
  it('matches one person across Activity Booking and Accommodation Request by normalized email', () => {
    // 1. Initial traveller exists: Sarah Jenkins
    const initialTraveller = db.getTravellerByEmail('sarah.jenkins@example.co.uk');
    assert.ok(initialTraveller, 'Seed traveller sarah.jenkins@example.co.uk must exist');
    const originalTravellerId = initialTraveller.id;

    // 2. Guest books an activity typing email in UPPERCASE with whitespace:
    // "  SARAH.JENKINS@EXAMPLE.CO.UK  "
    const rawActivityEmail = '  SARAH.JENKINS@EXAMPLE.CO.UK  ';
    const bookingResult = db.createActivityBooking({
      activitySlug: 'helicopter-flight-of-angels',
      bookingDate: '2026-11-15',
      timeSlot: '09:00',
      numAdults: 2,
      numChildren: 0,
      guestEmail: rawActivityEmail,
      guestName: 'Sarah Jenkins',
      selectedAddOnIds: [],
      prePayParkFees: true
    });

    assert.ok(bookingResult.success, 'Activity booking should succeed');
    assert.equal(bookingResult.booking?.travellerId, originalTravellerId, 'Activity booking must match existing traveller ID');
    assert.equal(bookingResult.booking?.travellerEmail, 'sarah.jenkins@example.co.uk', 'Stored booking email must be normalized');

    // 3. Guest later submits an accommodation request typing email with zero-width characters:
    // "Sarah\u200B.Jenkins\uFEFF@Example.co.uk"
    const rawAccommodationEmail = 'Sarah\u200B.Jenkins\uFEFF@Example.co.uk';
    const accommodationResult = db.createAccommodationRequest({
      partnerId: 'partner-explorers-village',
      roomTypeId: 'room-deluxe-chalet',
      checkInDate: '2026-11-14',
      checkOutDate: '2026-11-17',
      numGuests: 2,
      paymentPath: 'PAY_NOW',
      guestName: 'Sarah Jenkins',
      guestEmail: rawAccommodationEmail
    });

    assert.ok(accommodationResult.success, 'Accommodation request should succeed');
    assert.equal(accommodationResult.request?.travellerId, originalTravellerId, 'Accommodation request must match the exact same traveller ID');
    assert.equal(accommodationResult.request?.travellerEmail, 'sarah.jenkins@example.co.uk', 'Stored request email must be normalized');

    // 4. Verify the database has not created duplicate travellers
    const allTravellers = (db as any).travellers.filter((t: any) => t.email === 'sarah.jenkins@example.co.uk');
    assert.equal(allTravellers.length, 1, 'Only one single traveller record must exist for sarah.jenkins@example.co.uk');
  });

  it('correctly handles IssueReport submission with email normalization and phone preservation', () => {
    // Submit issue with raw email
    const report1 = db.submitIssueReport({
      pageUrl: '/activities/helicopter-flight-of-angels',
      pageType: 'ACTIVITY',
      description: 'Found a small typo in the duration text',
      reporterEmail: '  TRAVELER.SUPPORT@GMAIL.COM  '
    });

    assert.equal(report1.reporterEmail, 'traveler.support@gmail.com', 'reporterEmail must be normalized to lowercase');

    // Submit issue with phone number in reporterContact
    const report2 = db.submitIssueReport({
      pageUrl: '/hotels',
      pageType: 'HOTEL',
      description: 'Inquired about lodge shuttle schedule',
      reporterContact: '+263 77 999 8888'
    });

    assert.equal(report2.reporterContact, '+263 77 999 8888', 'Phone contact in reporterContact must be preserved');

    // Submit issue with email in reporterContact
    const report3 = db.submitIssueReport({
      pageUrl: '/guide',
      pageType: 'GENERAL',
      description: 'Visa rules question',
      reporterContact: '  EXPLORER@YAHOO.COM  '
    });

    assert.equal(report3.reporterContact, 'explorer@yahoo.com', 'Email in reporterContact must be normalized');
  });

  it('detects un-normalized collision groups without auto-merging or deleting', () => {
    // Simulate legacy/un-normalized dataset with colliding emails:
    // "John@x.com" and "john@x.com"
    const mockLegacyTravellers = [
      { id: 't-1', email: 'John@x.com', fullName: 'John Doe' },
      { id: 't-2', email: 'john@x.com', fullName: 'J. Doe' },
      { id: 't-3', email: 'alice@x.com', fullName: 'Alice' }
    ];

    const mockBookings = [
      { id: 'b-1', travellerId: 't-1' },
      { id: 'b-2', travellerId: 't-1' }
    ];

    const mockRequests = [
      { id: 'r-1', travellerId: 't-2' }
    ];

    // Run collision detection logic
    const emailGroups = new Map<string, typeof mockLegacyTravellers>();
    for (const t of mockLegacyTravellers) {
      const norm = normalizeEmail(t.email);
      const group = emailGroups.get(norm) || [];
      group.push(t);
      emailGroups.set(norm, group);
    }

    const collisionGroups: { normalized: string; items: any[] }[] = [];
    for (const [norm, group] of emailGroups.entries()) {
      if (group.length > 1) {
        const items = group.map(t => ({
          ...t,
          bookings: mockBookings.filter(b => b.travellerId === t.id).length,
          requests: mockRequests.filter(r => r.travellerId === t.id).length
        }));
        collisionGroups.push({ normalized: norm, items });
      }
    }

    assert.equal(collisionGroups.length, 1, 'Exactly one collision group must be detected');
    assert.equal(collisionGroups[0].normalized, 'john@x.com');
    assert.equal(collisionGroups[0].items.length, 2, 'Collision group must contain both colliding records');

    const rec1 = collisionGroups[0].items.find(i => i.id === 't-1');
    const rec2 = collisionGroups[0].items.find(i => i.id === 't-2');
    assert.equal(rec1.bookings, 2, 'Record t-1 must accurately report 2 bookings');
    assert.equal(rec1.requests, 0, 'Record t-1 must accurately report 0 requests');
    assert.equal(rec2.bookings, 0, 'Record t-2 must accurately report 0 bookings');
    assert.equal(rec2.requests, 1, 'Record t-2 must accurately report 1 request');
  });
});

