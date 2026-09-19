import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  if (slug) {
    const activity = db.getActivityBySlug(slug);
    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }
    return NextResponse.json({ activity });
  }

  let list = db.getActivities();
  if (destination) {
    list = list.filter(a => a.destination === destination);
  }
  if (category) {
    list = list.filter(a => a.category === category);
  }

  return NextResponse.json({ activities: list });
}
