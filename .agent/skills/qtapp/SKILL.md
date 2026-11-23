---
name: qtapp
description: >-
  Antigravity profile and domain runbook for the QTAPP scripture study and meditation application.
  Use whenever developing, modifying, testing, or deploying the Quiet Time Study & Revelation Journal app.
---

# Antigravity Profile: QTAPP

Use this skill whenever working on the **QTAPP** scripture study app.

## Quick Reference & Links
- **Primary HTML File:** [index.html](../../index.html)
- **Design Tokens & System:** [DESIGN.md](../../DESIGN.md)
- **Product Truth:** [PRODUCT.md](../../PRODUCT.md)
- **Workspace Agent Rules:** [AGENTS.md](../../AGENTS.md)
- **Production URL:** [quiet-time-guide.vercel.app](https://quiet-time-guide.vercel.app)

## Workflows & Commands

### 1. Synchronizing All 5 Distribution Replicas
Always run after modifying `index.html`:
```powershell
node "C:\Users\johna\.gemini\antigravity-cli\brain\43223302-9de8-4212-ac10-66578f37cfeb\scratch\sync_all_copies.js"
```

### 2. Deploying to Vercel Production
```powershell
cd C:\Users\johna\quiet-time-app
node scripts/deploy.js
# Or: npx vercel deploy --prod --yes --token $env:VERCEL_TOKEN
```

### 3. Auditing Impeccable Design Quality
```powershell
npx @impeccable/cli-windows-x64 detect index.html
npx @impeccable/cli-windows-x64 detect https://quiet-time-guide.vercel.app
```
Both local and live scans must report **0 anti-patterns**.
