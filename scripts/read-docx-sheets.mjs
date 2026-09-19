import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Simple unzip helper for docx (standard zip format)
// We can use child_process or a tiny zip parser
import { execSync } from 'child_process';

const factSheetsDir = 'c:/Users/victo/Downloads/Vic Falls/Shearwater Agents Info Pack/Fact Sheets';
const files = fs.readdirSync(factSheetsDir);

console.log("Fact sheets in directory:", files);

for (const file of files) {
  if (file.endsWith('.docx')) {
    const fullPath = path.join(factSheetsDir, file);
    try {
      // Use powershell to extract text from word/document.xml
      const psScript = `
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip = [System.IO.Compression.ZipFile]::OpenRead('${fullPath.replace(/'/g, "''")}')
        $entry = $zip.GetEntry('word/document.xml')
        if ($entry) {
          $reader = New-Object System.IO.StreamReader($entry.Open())
          $xml = $reader.ReadToEnd()
          $reader.Close()
          $zip.Dispose()
          # strip xml tags
          $xml -replace '<[^>]+>', ' ' -replace '\\s+', ' '
        } else {
          $zip.Dispose()
          ""
        }
      `;
      const text = execSync(`powershell -NoProfile -Command "${psScript.replace(/\n/g, ' ')}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      console.log(`\n========================================`);
      console.log(`FILE: ${file}`);
      console.log(`========================================`);
      console.log(text.trim().slice(0, 1500));
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }
}
