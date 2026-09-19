import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  // Check and trigger auto-revert for any payment links that crossed the 48h boundary
  db.triggerAutoRevertForExpiredLinks();

  const requests = db.getAccommodationRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, requestId, reason } = body;

    if (!requestId || !action) {
      return NextResponse.json({ error: 'Missing requestId or action' }, { status: 400 });
    }

    if (action === 'CONFIRM_PAY_NOW') {
      const res = db.confirmPayNowRequest(requestId);
      if (!res.success) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ success: true, message: 'Payment captured and request confirmed.' });
    }

    if (action === 'CONFIRM_PAY_AT_PROPERTY') {
      const res = db.confirmPayAtPropertyRequest(requestId);
      if (!res.success) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({
        success: true,
        invoice: res.invoice,
        message: 'Request confirmed for pay-at-property. Partner invoice generated automatically.'
      });
    }

    if (action === 'SIMULATE_CAPTURE_FAILURE') {
      const res = db.simulateCaptureFailure(requestId);
      if (!res.success) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({
        success: true,
        paymentLinkUrl: res.paymentLinkUrl,
        message: 'Capture failed. 48-hour expiring recovery payment link generated.'
      });
    }

    if (action === 'DECLINE') {
      const ok = db.declineRequest(requestId, reason || 'Lodge fully booked');
      return NextResponse.json({ success: ok, message: 'Request declined and hold voided.' });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
