import { INITIAL_MAPPED_PROPERTIES } from '../src/lib/seed-data.js';

console.log('Total Properties:', INITIAL_MAPPED_PROPERTIES.length);

const destinations = ['VICTORIA_FALLS', 'LIVINGSTONE', 'CHOBE'];

let missingPhotos = 0;
let missingPrice = 0;
let missingCoords = 0;

for (const dest of destinations) {
  const filtered = INITIAL_MAPPED_PROPERTIES.filter(p => p.destination === dest);
  console.log(`\n================== ${dest} (${filtered.length}) ==================`);
  filtered.forEach((p, idx) => {
    if (!p.photo) missingPhotos++;
    if (!p.startingPriceUSD) missingPrice++;
    if (!p.latitude || !p.longitude) missingCoords++;
    console.log(`${idx + 1}. ${p.name}`);
    console.log(`   Address: ${p.address}`);
    console.log(`   Coords: [${p.latitude}, ${p.longitude}] | Verified: ${p.locationVerifiedByStaff} | Bookable: ${p.isBookablePartner}`);
    console.log(`   Rating: ${p.rating}★ | From: $${p.startingPriceUSD}/night | Photo: ${p.photo}`);
    if (p.amenities && p.amenities.length > 0) {
      console.log(`   Amenities: ${p.amenities.slice(0, 4).join(', ')}...`);
    }
  });
}

console.log(`\nChecks: missingPhotos=${missingPhotos}, missingPrice=${missingPrice}, missingCoords=${missingCoords}`);
