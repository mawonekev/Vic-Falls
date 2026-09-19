import fs from 'fs';

const filePath = 'C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/steps/507/content.md';
const content = fs.readFileSync(filePath, 'utf8');

const urlRegex = /https?:\/\/[^\s"'<>\\]+/g;
const urls = content.match(urlRegex) || [];

const filtered = new Set();
for (const u of urls) {
  if (u.includes('shearwater')) {
    filtered.add(u);
  }
}

console.log("Found Shearwater URLs:", filtered.size);
for (const u of Array.from(filtered).sort()) {
  console.log(u);
}
