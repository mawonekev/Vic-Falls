import fs from 'fs';

const filePath = 'C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/steps/656/content.md';
const c = fs.readFileSync(filePath, 'utf8');

console.log("Length of Booking.com Vic Falls page:", c.length);

// Extract text lines
const text = c
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean);

console.log("Total lines:", text.length);

// Find hotel names or listings
const hotels = [];
for (let i = 0; i < text.length; i++) {
  const line = text[i];
  if (
    line.includes('Hotel') ||
    line.includes('Lodge') ||
    line.includes('Camp') ||
    line.includes('Resort') ||
    line.includes('Suites') ||
    line.includes('Villa') ||
    line.includes('Backpackers') ||
    line.includes('Guest House') ||
    line.includes('B&B')
  ) {
    hotels.push(line);
  }
}

const uniqueHotels = [...new Set(hotels)].filter(h => h.length < 80 && !h.includes('{') && !h.includes('<'));
console.log("Found unique potential hotel names:", uniqueHotels.length);
console.log(uniqueHotels.slice(0, 40).join('\n'));
