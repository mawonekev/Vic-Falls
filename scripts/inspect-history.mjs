import fs from 'fs';
import readline from 'readline';

async function main() {
  const fileStream = fs.createReadStream('C:/Users/mawon/.gemini/antigravity-ide/brain/12c86c25-f994-431d-a7d6-b51548c194d4/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"')) {
      const parsed = JSON.parse(line);
      console.log(`\n=== STEP ${parsed.step_index} USER INPUT ===`);
      console.log(parsed.content);
    }
  }
}
main();
