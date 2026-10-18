/**
 * Authoritative Email Normalization & Validation Utility
 *
 * Enforces unified identity matching across the Victoria Falls, Livingstone & Chobe platform:
 * - Unicode NFKC normalization
 * - Zero-width & invisible character stripping (U+200B, U+200C, U+200D, U+FEFF)
 * - Internal & external whitespace stripping
 * - Full lowercasing
 * - Preservation of local dots and +tag aliases (provider-neutral)
 * - Pragmatic RFC-aligned validation without excessive regexes
 */

// Zero-width and invisible character regex
const ZERO_WIDTH_AND_INVISIBLE_REGEX = /[\u200B\u200C\u200D\uFEFF]/g;

// All whitespace regex
const ALL_WHITESPACE_REGEX = /\s+/g;

/**
 * Normalizes an email address according to the platform specification:
 * 1. Trim leading and trailing whitespace.
 * 2. Apply Unicode NFKC normalization.
 * 3. Remove zero-width and invisible characters (U+200B, U+200C, U+200D, U+FEFF) and internal whitespace.
 * 4. Lowercase the entire address.
 *
 * NOTE: Dots in the local part and +tag suffixes are strictly preserved.
 */
export function normalizeEmail(input: string | null | undefined): string {
  if (typeof input !== 'string') {
    return '';
  }

  // 1. Unicode NFKC normalization
  let normalized = input.normalize('NFKC');

  // 2. Remove zero-width, invisible characters, and any whitespace (internal or boundary)
  normalized = normalized
    .replace(ZERO_WIDTH_AND_INVISIBLE_REGEX, '')
    .replace(ALL_WHITESPACE_REGEX, '');

  // 3. Lowercase entire address
  return normalized.toLowerCase();
}

/**
 * Pragmatic validation check:
 * - Total length <= 254 characters and > 0
 * - Exactly one '@' character
 * - Local part between 1 and 64 characters
 * - Local part does not start or end with a dot, no consecutive dots
 * - Domain has at least one dot
 * - Domain does not start or end with a dot or hyphen
 * - Domain labels between dots are valid non-empty alphanumeric/hyphen segments
 * - Top-level domain (TLD) has at least 2 characters
 * - No whitespace characters
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Sensible total length limits (RFC 5321 specifies 254 octets max)
  if (email.length > 254 || email.length < 3) {
    return false;
  }

  // Must not contain any whitespace
  if (/\s/.test(email)) {
    return false;
  }

  // Exactly one '@' symbol
  const atIndex = email.indexOf('@');
  const lastAtIndex = email.lastIndexOf('@');
  if (atIndex <= 0 || atIndex !== lastAtIndex || atIndex === email.length - 1) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  // Local part length check (max 64 characters)
  if (localPart.length < 1 || localPart.length > 64) {
    return false;
  }

  // Local part cannot start or end with dot, or have consecutive dots
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return false;
  }

  // Domain must contain at least one dot
  if (!domain.includes('.')) {
    return false;
  }

  // Domain cannot start or end with dot
  if (domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }

  // Domain labels check
  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return false;
  }

  for (const part of domainParts) {
    if (part.length === 0 || part.length > 63) {
      return false;
    }
    // Domain labels cannot start or end with hyphen
    if (part.startsWith('-') || part.endsWith('-')) {
      return false;
    }
    // Pragmatic character check for domain label
    if (!/^[a-z0-9-]+$/.test(part)) {
      return false;
    }
  }

  // Top-level domain must be at least 2 characters and only letters
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return false;
  }

  return true;
}

/**
 * Conditionally normalizes a contact string if and only if it represents an email address.
 * Used for `IssueReport.reporterContact`, which is nullable and may hold a phone number,
 * WhatsApp handle (e.g. "+263 77 210 0110"), or an email.
 *
 * If it is an email, it returns the normalized email.
 * If it is a phone number or other contact method, it trims and preserves the original value
 * without corrupting it.
 */
export function normalizeIfEmail(contact: string | null | undefined): string | null | undefined {
  if (contact === null || contact === undefined) {
    return contact;
  }

  const trimmed = contact.trim();
  if (!trimmed) {
    return trimmed;
  }

  // If it contains an '@', attempt email normalization and validation
  if (trimmed.includes('@')) {
    const normalized = normalizeEmail(trimmed);
    if (isValidEmail(normalized)) {
      return normalized;
    }
  }

  // Return the original contact preserved without corruption
  return trimmed;
}

/**
 * Transactional email dispatcher helper: guarantees recipient address is normalized
 * before handing off to Resend, AWS SES, or notification loggers.
 */
export interface TransactionalEmailPayload {
  to: string;
  subject: string;
  template: 'BOOKING_CONFIRMATION' | 'ACCOMMODATION_REQUEST' | 'SECURE_PAYMENT_LINK' | 'ISSUE_ACKNOWLEDGEMENT';
  data: Record<string, any>;
}

export async function sendTransactionalEmail(payload: TransactionalEmailPayload): Promise<{
  success: boolean;
  normalizedTo: string;
  messageId: string;
}> {
  const normalizedTo = normalizeEmail(payload.to);
  if (!isValidEmail(normalizedTo)) {
    throw new Error(`Cannot send transactional email: invalid recipient address "${payload.to}"`);
  }

  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Log authoritative dispatch record (Resend / AWS SES integration target)
  console.log(`[Transactional Email] Dispatching to ${normalizedTo} | Template: ${payload.template} | MsgID: ${messageId}`);

  return {
    success: true,
    normalizedTo,
    messageId
  };
}
