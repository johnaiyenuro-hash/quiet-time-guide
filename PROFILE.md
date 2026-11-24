# Application Profile — QTAPP

## 1. Identity & Overview
- **Application Name:** QTAPP
- **Full Title:** QTAPP · Scripture Meditation & Revelation Journal
- **Codename:** QTAPP
- **Version:** 1.0.0
- **Platform:** Web Application (Local-First Responsive PWA)
- **Deployment URL:** [https://quiet-time-guide.vercel.app](https://quiet-time-guide.vercel.app)
- **Target Audience:** Believers, Bible students, Christian leaders, and ministers engaging in daily devotional study, scripture meditation, and spiritual journal-keeping.

---

## 2. Devotional Mission & Foundations
QTAPP is designed as an unhurried, contemplative sanctuary for personal quiet time with God, directly modeled upon biblical principles and foundational teachings by Bishop Dag Heward-Mills (*How You Can Have an Effective Quiet Time with God Every Day*).

### Core Pillars
1. **Microscopic Bible Study:** Word-by-word examination of scripture verses through 13 analytical questions uncovering commands, promises, warnings, and applications.
2. **Topical Bible Study:** Thematic exploration via the Six W's hermeneutical framework (Why, How, Where, When, What, Who).
3. **Telescopic Bible Study:** Macro understanding of entire books, analyzing overarching historical settings, recipients, authorial intent, and central themes.
4. **Daily Seven Steps Rhythm:** An unhurried sequence from opening petition (*Psalm 119:18*) to quiet listening and concluding prayer (*1 Thessalonians 5:17*).

---

## 3. Technical Architecture Profile

### Front-End Engineering
- **Format:** Standalone Single Page Application (`index.html`), zero heavy build dependencies.
- **PWA Manifest:** Configured via `manifest.json` for home screen installation on iOS, Android, and Desktop.
- **Typography Triad:**
  - Display / Landmarks: `Cinzel` (Classical Roman Display Serif)
  - Scripture Reading & Journal: `Lora` (Literary Editorial Serif, Upright Roman)
  - Interface Controls: `Outfit` (Clean, Modern Humanist Sans)

### Storage & Synchronization
- **Primary Storage:** 100% private in-browser `localStorage` (`DRAFT_KEY`, `TOPICAL_DRAFT_KEY`, `TELE_DRAFT_KEY`, `ARCHIVE_KEY`).
- **Sync Protocol:** Zero-knowledge private key pairing (e.g. `fedbdde`), enabling synchronization between personal phone and desktop without accounts, tracking, or passwords.
- **Offline Resilience:** All hermeneutical frameworks, question guides, and saved archives function without network connectivity.

---

## 4. UI & Ergonomics Profile
- **Header:** Unified 52px navigation bar featuring brand identity, study mode pills (`🔬 Microscopic`, `🏷️ Topical`, `📜 Telescopic`, `📁 Archive`), slide-out Daily 7 Steps Guide, and theme switcher.
- **Scripture Lectern:** Serene scripture card with collapsible `🔍 Change Verse` lookup, live tokenized words with inline Greek/Hebrew dictionary definitions, Strong's Concordance lookups, predictive verse autocompletion, and 11 non-copyrighted translations (KJV, BSB, WEB, ASV, BBE, DARBY, DRA, YLT, OEB-US, OEB-CW, VULGATE).
- **Journal Studio:** Unified live-formatted `contenteditable` Markdown editor with auto-saving drafts, Restore Snapshots modal, rich formatting toolbar (Undo/Redo, Bold, Italic, Underline, 5-color Highlights, Headings, Lists), Full Document Sheet presentation modal, native spellchecking across all inputs, single-question Q&A insertion, whole-framework insertion, and optional catalytic study nudges via Vercel serverless `/api/catalyst`.
