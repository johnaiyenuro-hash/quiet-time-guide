# Product Profile — QTAPP

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Believers, Bible students, Christian leaders, and ministers engaging in personal daily devotions, scripture meditation, and spiritual journal-keeping.

Primary situation: Unhurried, quiet morning or late-night personal communion with God, reading scripture, studying biblical words, and recording revelations and prayers on either phone or desktop.

## Product Profile — QTAPP Purpose

A self-contained digital Quiet Time sanctuary and revelation journal designed according to biblical study principles (specifically inspired by Bishop Dag Heward-Mills' foundational teaching on *How You Can Have an Effective Quiet Time with God Every Day*). It bridges the gap between scholarly Bible study tools and personal devotional prayer, equipping believers to draw deep personal revelations from scripture.

## Positioning

Unlike generic note-taking apps (Notion, Apple Notes) or busy online reference portals filled with ads and commentary tabs (Blue Letter Bible, BibleGateway), the Quiet Time Guide provides an intimate, distraction-free devotional environment. It pairs word-by-word interactive microscopic study (lexical definitions, Strong's concordance) with guided hermeneutical frameworks (the 13 analytical questions, Topical 6 W's, and Daily 7 Steps) directly connected to a live markdown reflection studio.

## Operating Context

- **Use Scene:** Early morning devotions, bedside personal prayer, quiet desk study, church retreat reflections.
- **Ambient Light:** Low-light early morning / dark bedroom (making dark mode and warm sepia mode critical for eye comfort).
- **Devices:** Smartphones (iPhone / Android) for quick devotional reading, laptops/tablets for extended study and typing.
- **Privacy Expectation:** Deeply personal prayers, confessions, and intimate spiritual revelations. Notes must remain 100% private to the user's device by default.

## Capabilities and Constraints

- **Local-First Privacy:** All journal drafts, scripture selections, and archives store directly in browser `localStorage`. Zero external data transmission unless explicitly opted in.
- **Optional Private Cloud Sync:** Users can generate an isolated, private sync key to link their personal phone and laptop seamlessly without passwords or account registration.
- **Multi-Passage Scripture Engine:** Live verse fetching (KJV/WEB), interactive word tokenization for instant in-app lexicon definitions, multi-verse study targeting.
- **Hermeneutical Frameworks:**
  1. *Microscopic Study:* 13 reflective questions with one-click insertion into the journal studio.
  2. *Topical Study:* Six W's framework (Why, How, Where, When, What, Who).
  3. *Telescopic Study:* Book-level setting, background context, and central theme.
  4. *Daily 7 Steps:* Systematic spiritual rhythm from opening prayer to quiet listening.
- **Journal Studio:** Unified live-formatted `contenteditable` Markdown editor with 5 semantic highlight colors, autosave snapshots with Restore modal, full-state export/import JSON backup, full-sheet document reader, and print/PDF generation.
- **Optional Catalytic Study Companion:** On the hosted Vercel deployment, users may optionally invoke brief 1–2 sentence Socratic thought-starters and word nuances via `/api/catalyst` (`store: false`, transmitting only the active scripture/topic/word—never personal journal notes).

## Brand Commitments

- **Voice & Atmosphere:** Sacred, contemplative, reverent, dignified, and peaceful.
- **Visual Identity:** Epigraphic classical Roman headers (`Cinzel`), warm literary editorial serif for scripture and reflections (`Lora`), balanced with neutral UI clarity (`Outfit`).
- **Color Identity:** Warm celestial gold (`#d4af37`), deep midnight slate (`#0d1117`), warm papyrus sepia (`#f5f0e6`), and clean parchment white (`#f8fafc`).
- **Restraint:** No noisy badges, no gamification streaks, no social feeds, no unsolicited popups.

## Product Profile — QTAPP Principles

1. **Stillness Over Stimulation:** Every element must protect the user's contemplative focus. Actions should be calm, quiet, and unobtrusive.
2. **Scripture Has Authority:** Scripture text is presented with reverence in authoritative, upright literary typography rather than casual italics or condensed UI fonts.
3. **Absolute Privacy by Default:** Devotional reflections belong strictly to the believer and God. There is zero telemetry, tracking, or default cloud sharing.
4. **Hermeneutical Rigor Made Accessible:** Guide the user through deep inductive Bible study methods without overwhelming them with theological jargon or complicated interfaces.
