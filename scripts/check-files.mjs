import fs from 'fs';
import path from 'path';

const packDir = 'c:/Users/victo/Downloads/Vic Falls/Shearwater Agents Info Pack';
const dirs = [
  'Helicopter',
  'Rafting',
  'Adventure Jetboat',
  'Bridge Slide',
  'Bridge Swing',
  'Bungee Jumping',
  'Historical Bridge Tour',
  'Guided Tour of the Falls',
  'Morning Cruise',
  'Standard Sunset Cruise',
  'Riversong Cruise',
  'Elephant Safari',
  'Game Drive',
  'Night Game Drive',
  'Game Walk',
  'Batoka Hike & Ndebele Village Tour',
  'Traditional Village Tour',
  'Simunye - Spirit of Africa',
  'Chobe Day Trip'
];

for (const d of dirs) {
  const full = path.join(packDir, d);
  if (fs.existsSync(full)) {
    const files = fs.readdirSync(full).filter(f => !fs.statSync(path.join(full, f)).isDirectory());
    console.log(`[${d}]:`, files.slice(0, 5).join(', '));
  }
}
