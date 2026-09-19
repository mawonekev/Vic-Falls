import fs from 'fs';
import path from 'path';

const baseDir = 'c:/Users/victo/Downloads/Vic Falls/Shearwater Agents Info Pack';
const entries = fs.readdirSync(baseDir, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory()) {
    const subDir = path.join(baseDir, entry.name);
    const subFiles = fs.readdirSync(subDir, { withFileTypes: true });
    console.log(`\n📁 [${entry.name}] (${subFiles.length} items)`);
    for (const f of subFiles.slice(0, 10)) {
      console.log(`   - ${f.isDirectory() ? '[DIR] ' : ''}${f.name}`);
    }
    if (subFiles.length > 10) {
      console.log(`   ... and ${subFiles.length - 10} more`);
    }
  }
}
