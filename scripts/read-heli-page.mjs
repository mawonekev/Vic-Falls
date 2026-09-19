import fs from 'fs';

const filePath = 'C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/steps/553/content.md';
const c = fs.readFileSync(filePath, 'utf8');

const bodyIndex = c.indexOf('<body');
console.log('bodyIndex:', bodyIndex);
if (bodyIndex !== -1) {
  const bodyContent = c.slice(bodyIndex);
  // Remove all tags
  const text = bodyContent.replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(Boolean);
  console.log('Total text lines:', text.length);
  console.log(text.slice(0, 100).join('\n'));
} else {
  console.log('No body tag found');
}
