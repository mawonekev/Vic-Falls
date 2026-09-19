import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const invoices = db.getInvoices();
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, invoiceId } = body;

    if (action === 'MARK_PAID' && invoiceId) {
      const ok = db.markInvoicePaid(invoiceId);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: 'Invalid invoice action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
