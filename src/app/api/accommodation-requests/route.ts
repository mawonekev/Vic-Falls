import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      partnerId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      numGuests,
      paymentPath,
      guestName,
      guestEmail,
      guestPhone
    } = body;

    if (!partnerId || !roomTypeId || !checkInDate || !checkOutDate || !guestName || !guestEmail) {
      return NextResponse.json(
        { error: 'Missing required accommodation request fields' },
        { status: 400 }
      );
    }

    const result = db.createAccommodationRequest({
      partnerId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      numGuests: Number(numGuests || 2),
      paymentPath: paymentPath === 'PAY_NOW' ? 'PAY_NOW' : 'PAY_AT_PROPERTY',
      guestName,
      guestEmail,
      guestPhone
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      request: result.request,
      message: 'Accommodation request submitted. Our team will confirm within 24 hours.'
    });
  } catch (err: any) {
    console.error('Accommodation request error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
