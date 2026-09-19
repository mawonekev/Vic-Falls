import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ActivityClientPage } from './ActivityClientPage';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const activities = db.getActivities();
  return activities.map(a => ({ slug: a.slug }));
}

export default function ActivityDetailPage({ params }: PageProps) {
  const activity = db.getActivityBySlug(params.slug);

  if (!activity) {
    notFound();
  }

  // Get related/alternative activities for tier switcher (e.g. 12min vs 25min helicopter)
  const allActivities = db.getActivities();
  const relatedTiers = allActivities.filter(
    a => a.category === activity.category && a.destination === activity.destination
  );

  return (
    <ActivityClientPage
      activity={activity}
      relatedTiers={relatedTiers}
    />
  );
}
