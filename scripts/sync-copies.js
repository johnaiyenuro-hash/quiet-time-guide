const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const sourcePath = path.join(projectDir, 'index.html');

if (!fs.existsSync(sourcePath)) {
  console.error('Error: index.html not found at', sourcePath);
  process.exit(1);
}

const cleanHtml = fs.readFileSync(sourcePath, 'utf8');
const personalSyncId = process.env.QTAPP_PERSONAL_SYNC_ID || 'fedbdde';
const personalHtml = cleanHtml.replace(
  /const\s+EMBEDDED_SYNC_ID\s*=\s*["'][^"']*["'];/,
  `const EMBEDDED_SYNC_ID = "${personalSyncId}";`
);

const targets = [
  { label: 'Local desktop copy', file: 'C:/Users/johna/quiet_time_guide_app.html', content: cleanHtml },
  { label: 'Google Drive Distribution', file: 'G:/My Drive/fl media/Distribution/download/quiet_time_guide_app.html', content: cleanHtml },
  { label: 'Google Drive Antigravity', file: 'G:/My Drive/fl media/Distribution/download/Antigravity/quiet_time_guide_app.html', content: cleanHtml },
  { label: "John's personal copy", file: 'G:/My Drive/fl media/Distribution/download/quiet_time_guide_app - john.html', content: personalHtml }
];

let syncedCount = 1; // index.html is copy #1
console.log('✓ Source of truth:', sourcePath);

for (const target of targets) {
  const dir = path.dirname(target.file);
  if (!fs.existsSync(dir)) {
    console.warn(`- Skipped (${target.label}): directory not found (${dir})`);
    continue;
  }
  fs.writeFileSync(target.file, target.content, 'utf8');
  syncedCount++;
  console.log(`✓ Synced (${target.label}): ${target.file}`);
}

console.log(`Synchronized ${syncedCount}/${targets.length + 1} copies successfully.`);
