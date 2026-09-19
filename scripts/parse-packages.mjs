import fs from 'fs';

const filePath = 'C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/steps/587/content.md';
const c = fs.readFileSync(filePath, 'utf8');

const text = c
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, '\n')
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean);

console.log('Total text lines in packages:', text.length);
for (let i = 0; i < text.length; i++) {
  if (text[i].toLowerCase().includes('package') || text[i].includes('$')) {
    console.log(text.slice(Math.max(0, i - 1), i + 3).join(' | '));
  }
}
