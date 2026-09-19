import { INITIAL_ACTIVITIES } from '../src/lib/seed-data.js';

console.log('Auditing', INITIAL_ACTIVITIES.length, 'activities...');

let issues = 0;
for (const a of INITIAL_ACTIVITIES) {
  if (!a.id || !a.slug || !a.name || !a.destination || !a.category) {
    console.error('Basic field missing in', a.id);
    issues++;
  }
  if (!a.grossPriceUSD || a.grossPriceUSD <= 0) {
    console.error('Invalid price in', a.slug, a.grossPriceUSD);
    issues++;
  }
  if (!a.photos || a.photos.length === 0) {
    console.error('No photos in', a.slug);
    issues++;
  }
  if (!a.shortDescription || !a.fullDescription) {
    console.error('Missing description in', a.slug);
    issues++;
  }
}

console.log('Activity Audit Completed. Total Issues:', issues);
