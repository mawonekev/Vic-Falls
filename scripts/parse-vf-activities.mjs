import fs from 'fs';

const filePath = 'C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/steps/569/content.md';
const c = fs.readFileSync(filePath, 'utf8');

const text = c
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean);

const startIdx = text.findIndex(t => t.includes('Specialised Safaris'));
if (startIdx !== -1) {
  console.log(text.slice(startIdx, startIdx + 200).join('\n'));
}
