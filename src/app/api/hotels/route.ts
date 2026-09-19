import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');

  let properties = db.getMappedProperties();
  if (destination) {
    properties = properties.filter(p => p.destination === destination);
  }

  const partners = db.getPartners();

  return NextResponse.json({
    properties,
    partners
  });
}
