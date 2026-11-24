---
name: "Quiet Time Study & Revelation Journal"
description: "A reverent, contemplative digital sanctuary for daily scripture meditation and devotional journal-keeping."
colors:
  primary: "#d4af37"
  primary-hover: "#e6c55d"
  primary-dim: "#b8922c"
  bg-dark: "#0d1117"
  surface-dark: "#151b23"
  surface-elevated-dark: "#1e2632"
  text-dark: "#f0f3f6"
  text-muted-dark: "#94a3b8"
  bg-light: "#f8fafc"
  surface-light: "#ffffff"
  surface-elevated-light: "#f1f5f9"
  text-light: "#0f172a"
  text-muted-light: "#64748b"
  bg-sepia: "#f5f0e6"
  surface-sepia: "#ebe3d3"
  surface-elevated-sepia: "#ded4c0"
  text-sepia: "#2a2217"
  text-muted-sepia: "#6d5e4d"
  success: "#34d399"
  danger: "#f87171"
  info: "#38bdf8"
  warning: "#fbbf24"
  prayer: "#c084fc"
typography:
  display:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.04em"
  serif:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.22rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "normal"
  ui:
    fontFamily: "Outfit, system-ui, -apple-system, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  scale:
    - "0.65rem"
    - "0.7rem"
    - "0.72rem"
    - "0.74rem"
    - "0.75rem"
    - "0.76rem"
    - "0.78rem"
    - "0.8rem"
    - "0.82rem"
    - "0.83rem"
    - "0.85rem"
    - "0.88rem"
    - "0.95rem"
    - "1.0rem"
    - "1.08rem"
    - "1.1rem"
    - "1.15rem"
    - "1.22rem"
    - "1.25rem"
    - "1.35rem"
rounded:
  xs: "3px"
  sm: "4px"
  md: "5px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg-dark}"
    rounded: "{rounded.lg}"
    padding: "7px 14px"
  button-surface:
    backgroundColor: "{colors.surface-elevated-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.lg}"
    padding: "7px 14px"
---

# Design System

## Overview

The design system for the **Quiet Time Study & Revelation Journal** is conceived as a **contemplative sanctuary**. It rejects generic, high-stimulation SaaS aesthetics (loud buttons, purple gradients, gamified badges, complex dashboards) in favor of literary warmth, dignified restraint, and liturgical serenity.

The visual language balances three deliberate typographic voices:
- **Cinzel:** Majestic classical Roman inscriptional serif for titles and landmarks.
- **Lora:** Warm, highly legible literary serif for prolonged scripture reading and personal reflection writing.
- **Outfit:** Crisp, neutral humanist sans-serif for UI labels, navigation tabs, and system controls.

---

## Colors

The interface supports three atmosphere modes tailored for different prayer and study environments:

### 1. Midnight Dark (Default)
Designed for low-light early morning or late-night devotions to prevent eye fatigue.
- **Background (`--bg`):** `#0d1117` (Deep midnight slate)
- **Surface (`--surface`):** `#151b23`
- **Surface Elevated (`--surface-elevated`):** `#1e2632`
- **Primary Text (`--text`):** `#f0f3f6`
- **Muted Text (`--text-muted`):** `#94a3b8` (WCAG AAA compliant contrast)
- **Accent Gold (`--gold`):** `#d4af37` (Celestial gold)

### 2. Papyrus Sepia
Evokes traditional leather-bound study Bibles and natural parchment.
- **Background (`--bg`):** `#f5f0e6` (Warm papyrus)
- **Surface (`--surface`):** `#ebe3d3`
- **Surface Elevated (`--surface-elevated`):** `#ded4c0`
- **Primary Text (`--text`):** `#2a2217` (Deep umber)
- **Muted Text (`--text-muted`):** `#6d5e4d`
- **Accent Gold (`--gold`):** `#8c6227` (Antique bronze gold)

### 3. Daylight Light
Clean, crisp daylight reading with high contrast.
- **Background (`--bg`):** `#f8fafc`
- **Surface (`--surface`):** `#ffffff`
- **Surface Elevated (`--surface-elevated`):** `#f1f5f9`
- **Primary Text (`--text`):** `#0f172a`
- **Muted Text (`--text-muted`):** `#64748b`
- **Accent Gold (`--gold`):** `#b45309` (Amber ochre)

### 4. Semantic Status Accents
- **Connected / Saved (`--success`):** `#34d399` (Quiet emerald)
- **Local Mode / Info (`--info`):** `#38bdf8` (Calm sky blue)
- **Disconnect / Delete (`--danger`):** `#f87171` (Soft coral)
- **Biblical Warning (`--warning`):** `#fbbf24` (Amber gold)
- **Prayer Stamp (`--prayer`):** `#c084fc` (Soft lavender)

---

## Typography

Typographic scale and hierarchy prioritize sustained reading comfort and contemplative focus:

- **Section Headings (`h2`, `h3`):** `Cinzel`, `1.15rem–1.25rem`, weight `600`, tracking `0.03em–0.04em`.
- **Scripture Verse (`.verse-text`):** `Lora`, `1.22rem`, `line-height: 1.85`, upright Roman (`font-style: normal;`). Traditional Bibles reserve italics for emphasis or translator notes; body scripture is presented upright and grounded.
- **Reflection Editor (`.unified-editor`):** `Lora`, `1.05rem`, `line-height: 1.85`. Provides a natural journal cadence.
- **UI & Controls:** `Outfit`, `0.85rem–0.88rem`, normal letter-spacing. Clean, invisible utility.
- **Uppercase Meta Labels:** Reserved for tiny category tags (`0.72rem–0.75rem`) with `0.04em` letter-spacing.

---

## Layout

- **Study Grid:** Desktop employs a balanced two-column study desk:
  - **Left (1.12fr):** Hermeneutical tools (Scripture verse box, Word token toolbar, 13 analytical questions, topical/telescopic frameworks).
  - **Right (0.88fr):** Journal Studio (Unified `contenteditable` Markdown editor with 5-color highlights, autosave snapshots, and document export).
- **Responsive Stacking:** On tablets and mobile (`< 1024px`), the layout stacks gracefully into a single natural reading column.
- **Zero Scroll Lock on Mobile:** The sticky panel on desktop unpins on mobile (`position: static;`) to guarantee fluid, unencumbered thumb scrolling.
- **Full Sheet Mode:** A dedicated clean presentation view (`#pageModal`) displays reflections formatted for quiet reflection, study sharing, or printing.

---

## Elevation & Depth

- **No Zero-Blur Hard Shadows:** Avoid retro block shadows or artificial 3D bevels.
- **Subtle Surface Contrasts:** Separation between page zones is achieved via slight background luminance shifts (`--surface` vs `--surface-elevated`) rather than heavy multi-layered borders.
- **Floating Modals & Sheets:**
  - Desktop: Centered card with soft ambient occlusion (`box-shadow: 0 10px 25px rgba(0,0,0,0.4)`).
  - Mobile (`< 640px`): Fluid bottom sheet that slides up from the base of the viewport.

---

## Shapes

- **Base Radius:** `8px` (`--radius: 8px`) applied consistently across cards, inputs, and buttons to soften corners without feeling bubbly.
- **Pills:** `9999px` applied to scripture reference presets, verse chips, and tag badges.
- **Interactive Word Tokens:** Soft `3px` corner radius with comfortable touch envelopes (`min-height: 36px` on mobile) for effortless word study.

---

## Components

### 1. Storage, Sync & Snapshot Menu
- Status indicator (`Private Mode` / `Sync: Active`) and `Restore Snapshots` live calmly inside the `⋯` header menu alongside a primary `Save` button.
- Replaces noisy multi-button save bars with a quiet, reassurance-first layout.

### 2. Scripture Tokenizer & Verse Display
- Parses verses into individual clickable word tokens.
- Clicking a word triggers inline lexical definitions and an optional `✨ Word Spark` catalytic deep-dive without jarring page transitions.

### 3. Journal Studio
- Unified live-formatted `contenteditable` editor backed by lossless Markdown serialization.
- Formatting bar with Undo/Redo, Bold, Italic, Underline, 5 semantic highlight colors (Gold, Green, Blue, Rose, Amber), Section Heading (`H3`), and Bullet Lists.

### 4. Consolidated Share & Export Menu
- Secondary actions (`Storage & Sync`, `Full Document Sheet`, `Restore Snapshots`, `Copy Notes Text`, `Clean Guide for Friend`, `Download Markdown`, `Print / Save PDF`) are housed in the calm `⋯` dropdown menu.

### 5. Catalytic Nudge Callout (`.catalyst-box`)
- Optional, user-triggered 1px-bordered `--surface` callout presenting brief 1–2 sentence Socratic thought-starters and a silent meditation pause via `/api/catalyst` (`store: false`). Never auto-runs or writes notes on the user's behalf.

---

## Do's and Don'ts

### Do
- **Do** preserve the upright Roman serif for scripture reading.
- **Do** maintain high contrast (> 4.5:1) for all placeholder and secondary text.
- **Do** prioritize stillness and negative space over compact information density.
- **Do** ensure every interactive element on mobile has at least a 36px–44px touch hit area.

### Don't
- **Don't** reintroduce nested cards (boxes inside boxes).
- **Don't** add AI-slop design tells (thick 3px colored left borders on cards, neon gradients, floating icon tiles).
- **Don't** add distracting animations, tickers, or gamified streak counters.
- **Don't** hardcode external shared cloud endpoints—local-first privacy must remain absolute.
