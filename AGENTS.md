# Antigravity Profile — QTAPP

This profile defines the durable identity, technical architecture, devotional principles, and operational runbook for Google Antigravity when developing, maintaining, or enhancing the scripture app (**QTAPP**).

---

## 1. Profile Overview
- **Profile Name:** QTAPP
- **App Domain:** Scripture Study, Devotional Meditation & Revelation Journal
- **Spiritual Foundation:** Inspired by Bishop Dag Heward-Mills' teaching on *How You Can Have an Effective Quiet Time with God Every Day*.
- **Live Production URL:** https://quiet-time-guide.vercel.app
- **Local Source Directory:** `C:\Users\johna\quiet-time-app`

---

## 2. Core Devotional Study Frameworks
When modifying or extending QTAPP, Antigravity must preserve these four core study pillars:

1. **Microscopic Bible Study (13 Analytical Questions):**
   - Word-by-word examination of scripture verses.
   - 13 hermeneutical questions identifying: God's character, commands to obey, promises to claim, warnings to heed, sins to avoid, and personal applications.
   - Questions must always allow direct meditation typing with seamless one-click insertion into the journal notes.

2. **Topical Bible Study (Six W's):**
   - Exploration of biblical themes (Faith, Patience, Love, Zeal) using the Six W's (Why, How, Where, When, What, Who).
   - In-app dictionary definition automatically loads when typing a topic.

3. **Telescopic Bible Study:**
   - Whole-book macro context: author, historical background, recipient situation, and overarching message.

4. **Daily Seven Steps Rhythm:**
   - Unhurried devotional sequence accessible via the slide-out 🌿 7 Steps Guide drawer:
     1. Pray to Begin (*Psalm 119:18*)
     2. Read the Passage (*Exodus 34:6-7*)
     3. Meditate & Reflect (*2 Timothy 2:7*)
     4. Deeper Study (*Acts 17:11*)
     5. Use Study Tools (*2 Timothy 2:15*)
     6. Write Down Revelations (*Exodus 34:1*)
     7. Conclude in Prayer (*1 Thessalonians 5:17*)

---

## 3. Design System & Typography Rules (Impeccable Standards)
QTAPP strictly adheres to Impeccable design quality with **0 anti-patterns**:
- **Display Serif:** `Cinzel` (`500`, `600`, `700`) for headers, brand landmarks, and verse references.
- **Literary Reading Serif:** `Lora` (upright Roman, not slanted italics) for comfortable, authoritative scripture reading and journal reflections.
- **Functional UI Sans:** `Outfit` (`400`, `500`, `600`) for clean, distinctive, uncluttered navigation and controls.
- **Color Palettes:**
  - *Midnight Dark:* `#0d1117` background with celestial gold `#d4af37` accents.
  - *Papyrus Sepia:* `#f5f0e6` warm leather-bound aesthetic with bronze `#8c6227`.
  - *Daylight Light:* `#f8fafc` slate study theme.
- **Layout Restraint:**
  - Single unified 52px header (no stacked header/nav bars).
  - Sticky scripture desk docking cleanly at `top: 52px` when scrolling.
  - No card-inside-card nesting; flat hierarchy.
  - Preserved whitespace and generous line-height (`1.85`).

---

## 4. Distribution & Hosting Model
QTAPP is distributed exclusively as a live web application hosted on Vercel:
- **Source of Truth:** `C:\Users\johna\quiet-time-app\index.html` (on Git branch `main`)
- **Live Production URL:** https://quiet-time-guide.vercel.app
- **Sharing:** Users share the live URL via the in-app **🔗 Share App Link** action (`shareLiveGuideLink()`). Offline standalone `.html` distribution copies are retired.

---

## 5. Deployment & Verification Commands
- **Vercel Production Deploy:**
  ```powershell
  cd C:\Users\johna\quiet-time-app
  node scripts/deploy.js
  # Or: npx vercel deploy --prod --yes --token $env:VERCEL_TOKEN
  ```
- **Impeccable Quality Audit:**
  ```powershell
  npx @impeccable/cli-windows-x64 detect index.html
  npx @impeccable/cli-windows-x64 detect https://quiet-time-guide.vercel.app
  ```
  Both must exit with **0 anti-patterns**.

---

## 6. Safety & Content Guardrails
- **Zero Copyright Infringement:** Do not generate or output verbatim book excerpts or copyrighted paragraphs from external publications.
- **Privacy First:** User notes and reflections belong strictly to the believer and God. Store everything in browser `localStorage`.
