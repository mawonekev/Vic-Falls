import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      activitySlug,
      bookingDate,
      timeSlot,
      numAdults,
      numChildren = 0,
      guestEmail,
      guestName,
      guestPhone,
      guestNationality,
      selectedAddOnIds = [],
      prePayParkFees = true
    } = body;

    if (!activitySlug || !bookingDate || !timeSlot || !guestEmail || !guestName || !numAdults) {
      return NextResponse.json(
        { error: 'Missing required booking fields (activity, date, time slot, guest info)' },
        { status: 400 }
      );
    }

    const result = db.createActivityBooking({
      activitySlug,
      bookingDate,
      timeSlot,
      numAdults: Number(numAdults),
      numChildren: Number(numChildren),
      guestEmail,
      guestName,
      guestPhone,
      guestNationality,
      selectedAddOnIds,
      prePayParkFees: Boolean(prePayParkFees)
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      message: 'Booking confirmed and payment captured successfully.'
    });
  } catch (err: any) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
