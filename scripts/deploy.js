const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectDir = path.resolve(__dirname, '..');
let token = process.env.VERCEL_TOKEN;
if (!token && fs.existsSync(path.join(projectDir, '.env.local'))) {
  const envContent = fs.readFileSync(path.join(projectDir, '.env.local'), 'utf8');
  const match = envContent.match(/VERCEL_TOKEN=["']?([^"'\r\n]+)/);
  if (match) token = match[1];
}

if (!token) {
  console.error('Error: VERCEL_TOKEN not found in environment or .env.local');
  process.exit(1);
}

// Sync latest HTML from Google Drive or local workspace into index.html
const srcHtml = fs.readFileSync('G:/My Drive/fl media/Distribution/download/quiet_time_guide_app.html', 'utf8');
fs.writeFileSync(path.join(projectDir, 'index.html'), srcHtml, 'utf8');

console.log('Deploying to production on Vercel...');
const output = execSync(`npx vercel deploy --prod --yes --token ${token}`, {
  cwd: projectDir,
  encoding: 'utf8'
});
console.log(output);
