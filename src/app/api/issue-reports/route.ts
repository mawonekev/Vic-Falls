import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    const report = db.submitIssueReport({
      pageUrl: pageUrl || 'Unknown',
      pageType: pageType || 'GENERAL',
      pageRefId,
      description,
      reporterEmail,
      reporterContact
    });

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
