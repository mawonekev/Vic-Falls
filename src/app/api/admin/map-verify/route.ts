import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const properties = db.getMappedProperties();
  const partners = db.getPartners();
  return NextResponse.json({ properties, partners });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, propertyId, verified, partnerId } = body;

    if (action === 'TOGGLE_VERIFIED') {
      const ok = db.verifyMappedPropertyCoordinate(propertyId, Boolean(verified));
      return NextResponse.json({ success: ok });
    }

    if (action === 'LINK_PARTNER') {
      const res = db.linkPropertyToPartner(propertyId, partnerId);
      if (!res.success) return NextResponse.json({ error: res.error }, { status: 400 });
      return NextResponse.json({ success: true, message: 'Property successfully linked to partner.' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
