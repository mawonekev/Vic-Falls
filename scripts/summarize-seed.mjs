import { INITIAL_ACTIVITIES, INITIAL_MAPPED_PROPERTIES, INITIAL_PARTNERS } from '../src/lib/seed-data.js';

console.log('=== TOTAL ACTIVITIES: ' + INITIAL_ACTIVITIES.length + ' ===');
const byCat = {};
for (const a of INITIAL_ACTIVITIES) {
  byCat[a.category] = (byCat[a.category] || 0) + 1;
}
console.log('Categories:', byCat);

console.log('\n--- ALL ACTIVITIES LIST ---');
INITIAL_ACTIVITIES.forEach((a, i) => {
  console.log(`${i + 1}. [${a.category}] [${a.destination}] ${a.name} ($${a.grossPriceUSD}) [slug: ${a.slug}]`);
});

console.log('\n=== TOTAL HOTELS / MAPPED PROPERTIES: ' + INITIAL_MAPPED_PROPERTIES.length + ' ===');
const byDest = {};
for (const p of INITIAL_MAPPED_PROPERTIES) {
  byDest[p.destination] = (byDest[p.destination] || 0) + 1;
}
console.log('By Destination:', byDest);
