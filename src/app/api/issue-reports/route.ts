import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { normalizeEmail, isValidEmail, normalizeIfEmail } from '@/lib/email';

export async function GET() {
  const reports = db.getIssueReports();
  return NextResponse.json({ reports });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageUrl, pageType, pageRefId, description, reporterEmail, reporterContact } = body;

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    let normalizedReporterEmail: string | undefined = undefined;
    if (reporterEmail && typeof reporterEmail === 'string' && reporterEmail.trim()) {
      normalizedReporterEmail = normalizeEmail(reporterEmail);
      if (!isValidEmail(normalizedReporterEmail)) {
        return NextResponse.json({ error: 'Invalid reporter email address' }, { status: 400 });
      }
    }

    const processedContact = reporterContact ? (normalizeIfEmail(reporterContact) || undefined) : undefined;

    const report = db.submitIssueReport({
      pageUrl: pageUrl || 'Unknown',
      pageType: pageType || 'GENERAL',
      pageRefId,
      description,
      reporterEmail: normalizedReporterEmail,
      reporterContact: processedContact
    });

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
