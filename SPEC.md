# `SPEC.md` — Quiet Time Study & Revelation Journal (QTAPP)

**Version:** `1.0.0` (verified from `package.json` and `PROFILE.md`)  
**Production URL:** `https://quiet-time-guide.vercel.app` (verified in `AGENTS.md`, `GEMINI.md`, `PROFILE.md`)  
**Architecture:** Local-first, standalone Single Page Application (`index.html`) using vanilla HTML, CSS, and JavaScript with zero frontend build step, paired with an optional Vercel Node.js serverless function (`api/catalyst.mjs`) for live Gemini catalytic study nudges (`vercel.json` defines `{ "cleanUrls": true, "fluid": true }`).

---

## 1. Repository & Artifact Inventory

### Verified Repository Files
| File | Role |
| :--- | :--- |
| `index.html` | Complete client-side application (DOM structure, CSS design system, state management, centralized `APP_CONFIG`, dictionary cache, Bible/sync/catalyst fetch logic). |
| `api/catalyst.mjs` | Vercel Node.js serverless function (`POST /api/catalyst`) calling `@google/genai` Interactions API (`store: false`) with structured JSON output and `@vercel/functions` custom metrics. |
| `config/app.config.json` | Externalized runtime endpoints, defaults, and storage keys. |
| `config/study-frameworks.json` | Externalized 13 Microscopic questions, 6 Topical W's, Daily 7 Steps, and opening prayer template. |
| `config/prompts.json` | Externalized System Instructions and Templates A/B/C consumed by `api/catalyst.mjs`. |
| `config/devotional-catalyst.schema.json` | Canonical `DevotionalCatalystResponse` JSON Schema enforced by `api/catalyst.mjs`. |
| `manifest.json` & `icon.svg` | PWA manifest and app icon for home screen installability. |
| `scripts/deploy.js` | Vercel production deployment script deploying workspace `index.html`. |
| `docs/AI_STUDIO_PROMPTS_AND_SCHEMAS.md` | Human-readable Google AI Studio System Instructions, 3 catalytic prompt templates, `DevotionalCatalystResponse` JSON schema, and TypeScript storage interfaces. |
| `AGENTS.md` | Antigravity operational profile, 4 study pillars, typography/layout rules, Vercel distribution model, deploy/audit commands. |
| `DESIGN.md` | Design tokens (Midnight Dark, Papyrus Sepia, Daylight Light), typography (`Cinzel`, `Lora`, `Outfit`), layout, and component rules. |
| `GEMINI.md` | Quick Antigravity configuration pointing to `AGENTS.md`. |
| `PRODUCT.md` | Product positioning, operating context, privacy commitments, and study capabilities. |
| `PROFILE.md` | High-level identity, devotional mission, and UI/storage overview. |
| `package.json` | Node manifest (`"engines": { "node": ">=22" }`, scripts `start`/`deploy`, deps `@google/genai` and `@vercel/functions`). |
| `vercel.json` | Vercel config (`{ "cleanUrls": true, "fluid": true }`). |
| `.env.example` | Environment variable template (`GEMINI_API_KEY`, `GEMINI_MODEL`, `VERCEL_TOKEN`). |

---

## 2. Core User Flows & State Transitions

### 2.1 Application Boot & Initialization Flow
1. `DOMContentLoaded` triggers `init()` and `initCloudSync()` in `index.html`.
2. `init()` executes:
   * `initAutocompleteDatalist()`
   * `initKeyboardFormatShortcuts()` (binds `Ctrl/Cmd + H`, `Ctrl/Cmd + Z`, `Ctrl/Cmd + Y`, `input`, `mouseup`, `keyup`, `focus`, `blur` on `#journalEditor`, `#topicalJournalEditor`, `#teleJournalEditor`)
   * `initVerseInputAutocomplete()` (book prefix completion + `BOOK_TYPO_MAP` autocorrect)
   * `initSeparateDrafts()` (loads `TOPICAL_DRAFT_KEY` and `TELE_DRAFT_KEY`, runs `onTopicalTopicInput`)
   * `updateCheckboxesUI()`, `renderVerseDisplay()`, `renderQuestions()`, `renderTopical()`, `renderSevenSteps()`, `loadSavedJournal()`, `renderArchive()`
3. `initCloudSync()` executes:
   * `migrateStorageIfLegacy()` (migrates `qt_journal_draft_clean_v1` → `qt_user_draft_v2` and `qt_journal_archive_clean_v1` → `qt_user_archive_v2`)
   * Inspects `window.location.search` for `?sync=` or `?ws=`; if present, saves to `SYNC_KEY_STORAGE`, cleans URL via `window.history.replaceState()`, and sets `cloudSyncId`.
   * If `cloudSyncId` is non-empty → `updateSyncUiState('connected')` + `pullFromCloud(true)`. Otherwise → `updateSyncUiState('local')`.
   * Registers `visibilitychange` and `focus` listeners to invoke `pullFromCloud(true)` when `cloudSyncId` is set.

### 2.2 Study Mode & Note Context Switching
* **State Variable:** `currentActiveTabId` (`"microTab"` | `"topicalTab"` | `"telescopicTab"` | `"archiveTab"`).
* **Transition (`switchMainTab(tabId, el)`):** Removes `.active` from all `.tab-section` and `.nav-tab-btn`/`.tab-link` elements, then activates the selected section and tab button.
* **Context Binding (`getActiveNoteContext()`):**
  * `topicalTab` → `{ type: 'topical', editor: #topicalJournalEditor, area: #topicalJournalText, preview: #topicalJournalPreview, key: TOPICAL_DRAFT_KEY }`
  * `telescopicTab` → `{ type: 'tele', editor: #teleJournalEditor, area: #teleJournalText, preview: #teleJournalPreview, key: TELE_DRAFT_KEY }`
  * Default / `microTab` → `{ type: 'micro', editor: #journalEditor, area: #journalText, preview: #journalPreview, key: DRAFT_KEY }`

### 2.3 Scripture Lookup, Tokenization & Word Study Flow
1. **Shelf Toggle:** `togglePassageShelf()` toggles `#passageShelf` visibility (`none` ↔ `block`) and button label (`🔍 Change Verse` ↔ `✕ Close`).
2. **Reference Input & Fetch (`onVerseInput(val)`):**
   * Normalizes typos via `BOOK_TYPO_MAP` and autocompletes `BIBLE_BOOKS` prefixes on input.
   * Debounced (`450ms`) fetch:
     * If `#bibleVersion` is `'ylt'` → queries `bolls.life/search/YLT/`.
     * Otherwise → queries `bible-api.com/{reference}?translation={ver}` (`kjv`, `bsb`, `web`, `asv`, `bbe`, `darby`, `dra`, `oeb-us`, `oeb-cw`, `clementine`).
   * Updates `currentScripture` (`{ reference, version, text, verses }`) and `activeTargetVerse`, then calls `renderVerseDisplay()`.
3. **Version / Translation Transitions (`onVersionChange()`):**
   * `'biblehub'` → calls `openBibleHubParallel()` and resets `<select>` to previous version.
   * `'custom'` → calls `assignCustomTranslation()` (prompts for acronym and updates `#bibleVersion` with `custom_<VER>`).
   * `'custom_*'` → switches `currentScripture.version` to custom name and re-renders.
   * Standard translation → re-triggers `onVerseInput(ref)`.
   * `pasteScripture()` → reads `navigator.clipboard.readText()` (or `prompt()` fallback) and passes text to `assignCustomTranslation()`.
4. **Verse Display & Word Selection (`renderVerseDisplay()`, `selectWord()`, `deselectWord()`):**
   * Splits `currentScripture.text` (or `currentScripture.verses` for multi-verse passages with clickable `.verse-num-badge` chips calling `setTargetVerse()`) into clickable `.verse-word` tokens.
   * Clicking a word sets `activeWord`, highlights `.verse-word.selected`, opens `#wordToolbar`, and triggers `fetchLiveDefinition(activeWord)`:
     1. Checks `OFFLINE_BIBLE_DICTIONARY[cleanWord]` and `OFFLINE_BIBLE_DICTIONARY[normalizeBiblicalWord(cleanWord)]`.
     2. Falls back to `api.dictionaryapi.dev` (exact word, then normalized root).
     3. On failure/offline, renders fallback links to Webster's 1828 & Blue Letter Bible Strong's Concordance.
   * Clicking the active word again or `✕ Deselect` calls `deselectWord()`.

### 2.4 Study Framework Flows
* **Microscopic Study (13 Questions):**
  * State: `currentQuestionIndex` (`0`–`12`) over `QUESTIONS` (`q1`–`q13`).
  * Navigation: `switchQuestionDropdown(qId)` / `navigateQuestion(delta)` → `displayActiveQuestion(idx)`.
  * Input (`onActiveQuestionInput(val)`): writes immediately to `localStorage.setItem('qt_ans_' + q.id, val)`, updates `#activeQuestionBadge` (`✓ Answered`) and `(✓)` dropdown suffix.
  * Insertion into notes: `pushActiveQuestion(includeQuestion)`, `insertAllQuestionsToJournal(includeQuestions)`, `insertAllVersesAsSections()`, `insertCurrentScripture()`, `insertWordNote()`, `insertDictDefinitionToNotes()` → all call `insertIntoActiveNote(text)` (which inserts parsed Markdown HTML at cursor/block via `Selection`/`Range` and calls `syncEditorToStorage()`).
  * Reset: `clearCurrentQuestionAnswer()` (single question) or `resetMicroStudy()` (resets `#journalEditor`, `#journalText`, `DRAFT_KEY`, and clears all 13 `qt_ans_*` keys).
* **Topical Study (6 W's):**
  * Topic input (`onTopicalTopicInput(val)`): checks `OFFLINE_BIBLE_DICTIONARY`, then `350ms` debounced `api.dictionaryapi.dev` lookup to populate `#topicalDef`.
  * State: `currentTopicalIndex` (`0`–`5`) over `TOPICAL_DIMS`.
  * Input (`onActiveTopicalInput(val)`): writes to `localStorage.setItem('qt_topical_ans_' + currentTopicalIndex, val)`.
  * Insertion: `insertTopicalHeading()`, `pushActiveTopical(includeAspect)`, `insertAllTopicalDimensions()`, `insertCurrentScriptureToTopical()` → inserts into `#topicalJournalEditor` (`TOPICAL_DRAFT_KEY`).
  * Reset: `clearCurrentTopicalAnswer()` or `resetTopicalStudy()`.
* **Telescopic Study:**
  * Inputs `#teleBook`, `#teleContext`, `#teleTheme` → `insertTelescopicNotes()`, `insertCurrentScriptureToTele()` → inserts into `#teleJournalEditor` (`TELE_DRAFT_KEY`).
  * Reset: `resetTeleStudy()`.

### 2.5 Rich Text Editor, Snapshots & Archive Transitions
* **Formatting (`execNoteFormat(cmd)`, `toggleHighlight()`, `setHighlightColor(color)`):**
  * Operates on active `.unified-editor` (`contenteditable="true"`).
  * Supports `undo`, `redo`, `bold`, `italic`, `underline`, `highlight` (`.note-highlight.hl-{gold|green|blue|rose|amber}`), `h3`, and `list`.
  * Every edit runs `syncEditorToStorage(editor)`: converts `editor.innerHTML` → Markdown via `htmlToMarkdown()`, updates the paired hidden `<textarea>`, saves to `localStorage`, and triggers `debounceSnapshot(md)` (`3000ms`, Microscopic only, max 8 items in `SNAPSHOT_KEY`) and `debounceCloudSync()` (`3500ms`).
* **Archive (`saveToArchive()`, `saveTopicalToArchive()`, `saveTeleToArchive()`):**
  * Prepends `{ id: Date.now(), date: new Date().toISOString(), ref, content }` to `ARCHIVE_KEY` (`qt_user_archive_v2`), calls `renderArchive()`, and invokes `pushToCloud()`.
  * Archive actions: `loadArchiveItem(id)`, `previewArchiveItem(id)` (opens `#pageModal`), `deleteArchiveItem(id)`, `clearArchive()`.

### 2.6 Cloud Sync State Machine
States managed by `updateSyncUiState(status)`:
```
[local] ("Private Mode" | cloudSyncId === "")
   │
   ├── enableCloudSync() [POST extendsclass bin] ───────────────┐
   ├── connectManualSyncKey() [user enters key] ───────────────┤
   └── ?sync=<id> URL param on init ───────────────────────────┤
                                                               ▼
[syncing] ("Syncing...") ◄── pullFromCloud() / pushToCloud() ──► [connected] ("Sync: Active")
   │                                                               │
   └── HTTP/Network error ─────────────────────────────────────► [offline] ("Sync: Offline")
                                                                   │
[any synced state] ── disconnectCloudSync() ───────────────────► [local]
```

### 2.7 UI Overlays & Theme Transitions
* **Theme (`toggleTheme()`):** Cycles `themes = ['dark', 'sepia', 'light']` applying `""`, `"theme-sepia"`, or `"theme-light"` to `document.body.className`.
* **7 Steps Drawer (`openSevenStepsDrawer()` / `closeSevenStepsDrawer()`):** Toggles `.open` on `#sevenStepsDrawerBackdrop` and `#sevenStepsDrawer`; supports `Escape` key dismissal.
* **Full Document Sheet (`openFullPageModal()` / `switchFullSheetTab('micro'|'topical'|'tele')`):** Opens `#pageModal` rendering the active editor HTML/Markdown for reading or `window.print()`.
* **Backup (`exportSyncBackup()` / `importSyncBackup()`):** Downloads/restores JSON `{ exportedAt, syncId, draft, archive, scripture }`.

---

## 3. Exact System Prompts & JSON Schemas Verified in AI Studio

> **Integration Note:** These prompts, instructions, schemas, and TypeScript interfaces are externalized in `config/prompts.json` and `config/devotional-catalyst.schema.json` (documented in `docs/AI_STUDIO_PROMPTS_AND_SCHEMAS.md`) and served live via `POST /api/catalyst` (`api/catalyst.mjs`) using `@google/genai` with `store: false`. Local/offline `file://` copies gracefully degrade without external AI calls.

### 3.1 System Instructions (Verbatim from `AI_STUDIO_PROMPTS_AND_SCHEMAS.md`)
```markdown
You are a quiet, catalytic Christian devotional study assistant for personal Quiet Time. Your spiritual foundation is inspired by Bishop Dag Heward-Mills' teaching on *How You Can Have an Effective Quiet Time with God Every Day*.

### Absolute Primary Directive: Catalyze, Never Ghostwrite
1. **Never do the spiritual work for the user:** Do not provide full, pre-packaged answers or write complete devotional reflections. The believer must hear from God directly and receive their own revelation.
2. **Be a Socratic Devotional Coach:** Offer 1-2 sentence catalytic thought-starters, probing questions, or linguistic insights that unlock the passage and invite the user into deeper quiet contemplation.
3. **Provide Context, Leave Application to the User:** You may clarify ancient historical context, original Greek/Hebrew nuances, or sentence structure, but leave the personal conviction and life application entirely in the hands of the Holy Spirit and the user.
4. **Brevity & Reverence:** Keep responses short, humble, uncluttered, and unhurried. Zero conversational filler, zero superficial motivational talk.
5. **Invite Silence:** Frequently point the user to pause, meditate on a specific striking word, and listen in prayer.
```

### 3.2 Prompt Templates (Verbatim from `AI_STUDIO_PROMPTS_AND_SCHEMAS.md`)

#### Template A: Microscopic Study Catalyst (Verse Probing)
```markdown
Provide minimal, catalytic study nudges for the following scripture:

**Reference:** {{reference}} ({{version}})
**Passage:** "{{text}}"

For each question below, provide ONLY a brief 1-2 sentence thought-starter or probing question designed to help ME hear from God and formulate my own revelation:

1. **Meaning in Plain Language:** (Briefly clarify the grammatical sense in 1 sentence).
2. **Current Circumstances:** (Ask 1 piercing question connecting the verse to daily life).
3. **Personal Prompting:** (Give 1 quiet nudge to listen for the Holy Spirit's voice).
4. **Explicit Statements:** (Identify 1 key foundational truth declared).
5. **What It Is NOT Saying:** (Name 1 common misinterpretation to beware of).
6. **Practical Life Application:** (Ask 1 challenging question regarding behavioral obedience).
7. **Command to Obey:** (Highlight the explicit directive to follow).
8. **Warning to Heed:** (Flag any spiritual pitfall or subtle temptation mentioned).
9. **Example to Follow or Avoid:** (Point to the character disposition modeled).
10. **Allegory / Type:** (Note any underlying biblical symbolism or prophetic picture).
11. **Promise to Claim:** (Identify the covenant promise and its condition).
12. **Prayer Petitions:** (Offer 1 starter prayer phrase for the user to complete).
13. **Who to Share With:** (Prompt the user to consider who in their life needs this truth).
```

#### Template B: Topical Study Catalyst (The 6 W's)
```markdown
Give catalytic study pointers for a Topical Study on:

**Topic:** {{topic}}
**Definition:** {{definition}}
**Passages:** {{supporting_scriptures}}

Do not write my notes for me. Instead, give me 1-2 probing questions or biblical contrasts for each dimension to guide my personal discovery:
1. **Why & Why Not:** (What makes this essential, and what does absence cost?).
2. **How & How Not:** (What does authentic practice look like vs. a religious counterfeit?).
3. **Where & Where Not:** (In what life situations is this tested most severely?).
4. **When & When Not:** (What is the divine timing and when is caution required?).
5. **What & What Not:** (What is the true biblical distinction vs. common confusion?).
6. **Who & Who Not:** (Who needs this virtue demonstrated to them today?).
```

#### Template C: Single Word Meditation (Linguistic Deep-Dive)
```markdown
Provide linguistic and biblical background for a single word in my meditation passage:

**Passage:** {{reference}} — "{{text}}"
**Focus Word:** {{focus_word}}

Please provide:
1. **Original Greek/Hebrew Term & Literal Meaning:** (Pithy linguistic breakdown).
2. **Biblical Nuance:** (How this word is uniquely used elsewhere in scripture).
3. **Meditation Spark:** (1 contemplative question for me to ponder in God's presence).
```

### 3.3 Verified JSON Schema (`DevotionalCatalystResponse`)
```json
{
  "type": "object",
  "properties": {
    "reference": { "type": "string" },
    "focusWord": { "type": "string" },
    "catalysts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "e.g., q1, q2... or topical dimension" },
          "questionTitle": { "type": "string" },
          "catalyticPrompt": { 
            "type": "string", 
            "description": "Max 1-2 sentences. A thought-starter, historical context, or probing question—never a finished answer." 
          }
        },
        "required": ["id", "questionTitle", "catalyticPrompt"]
      }
    },
    "silentMeditationPause": {
      "type": "string",
      "description": "A 1-sentence prompt inviting the believer to pause and listen to God in silence."
    }
  },
  "required": ["reference", "catalysts", "silentMeditationPause"]
}
```

### 3.4 Native App Data Interfaces (Documented in `AI_STUDIO_PROMPTS_AND_SCHEMAS.md`)
```typescript
interface CurrentScripture {
  reference: string;
  version: string;
  text: string;
  verses?: Array<{ verse: number; text: string }>;
}

interface ArchiveEntry {
  id: number;           // Date.now()
  date: string;         // ISO date
  ref: string;          // e.g. "2 Timothy 2:15"
  content: string;      // User's personal written revelation
}
```

---

## 4. API Endpoints & External Integrations

### 4.1 Serverless Backend Route (`api/catalyst.mjs`)
| Method & Route | Handler | Runtime / Auth | Purpose |
| :--- | :--- | :--- | :--- |
| `POST /api/catalyst` | `api/catalyst.mjs` | Node.js Fluid Compute (`GEMINI_API_KEY`, optional `GEMINI_MODEL` defaulting to `gemini-4-hydrogen`) | Renders `config/prompts.json` (`microscopic`, `topical`, or `word`), calls `@google/genai` Interactions API (`store: false`) enforcing `config/devotional-catalyst.schema.json`, and emits Vercel Custom Metrics (`catalyst.requests`, `catalyst.duration_ms`). |

### 4.2 Client-Side `fetch()` Endpoints (Configured via `APP_CONFIG.endpoints`)
| Service | Method & Endpoint | Caller in `index.html` | Purpose |
| :--- | :--- | :--- | :--- |
| Bible API | `GET https://bible-api.com/{reference}?translation={ver}` | `onVerseInput()` | Fetches passage text & `verses[]` for `kjv`, `bsb`, `web`, `asv`, `bbe`, `darby`, `dra`, `oeb-us`, `oeb-cw`, `clementine`. |
| Bolls Bible API | `GET https://bolls.life/get-chapter/YLT/{bookId}/{chapter}/` (fallback: `search/YLT/`) | `onVerseInput()` | Fetches exact chapter/verse Young's Literal Translation (`ylt`). |
| Free Dictionary API | `GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}` | `fetchLiveDefinition()`, `onTopicalTopicInput()` | Lexical lookup for selected verse words (with archaic KJV normalization fallback) and topical terms. |
| ExtendsClass JSON Storage | `POST / GET / PUT https://extendsclass.com/api/json-storage/bin[/{cloudSyncId}]` | `enableCloudSync()`, `pullFromCloud()`, `pushToCloud()` | Persists full study state (`updatedAt`, `draft`, `topicalDraft`, `teleDraft`, `topicalTopic`, `teleBook`, `teleContext`, `teleTheme`, `microAnswers`, `topicalAnswers`, `archive`, `scripture`). |
| QTAPP Catalyst API | `POST /api/catalyst` | `fetchCatalyst()` (`requestMicroCatalyst`, `requestTopicalCatalyst`, `requestWordCatalyst`) | Optional, user-triggered catalytic study nudges (hosted deployments only). |

### 4.3 External Browser Navigation URLs
* `https://biblehub.com/{book}/{chapter}-{verse}.htm` — Parallel translations (`getBibleHubUrl()`, `openBibleHubParallel()`).
* `https://www.blueletterbible.org/search/search.cfm?Criteria={word}&t=KJV#s=s_primary_0_1` — Strong's Concordance (`fetchLiveDefinition()`, `renderLiveDefinition()`, `openConcordanceForWord()`).
* `https://webstersdictionary1828.com/Dictionary/{word}` — Archaic fallback link (`fetchLiveDefinition()`).

---

## 5. Environment Variables, Config & Storage Keys

### 5.1 Environment Variables (see `.env.example`)
* **`GEMINI_API_KEY`** (Serverless Runtime — Vercel Project Env Var): Required for `POST /api/catalyst`.
* **`GEMINI_MODEL`** (Serverless Runtime — Optional): Overrides default `gemini-4-hydrogen`.
* **`VERCEL_TOKEN`** (Deployment CLI): Passed to `npx vercel deploy --prod --yes` via `scripts/deploy.js`.

### 5.2 Build / Hosting Configuration
* `package.json`: `{ "name": "qtapp", "version": "1.0.0", "description": "QTAPP — Quiet Time Study & Revelation Journal", "scripts": { "start": "npx serve .", "deploy": "node scripts/deploy.js" } }`
* `vercel.json`: `{ "cleanUrls": true, "fluid": true }`

### 5.3 Client Configuration & `localStorage` Keys (in `index.html`)
* `SYNC_KEY_STORAGE`: `'qt_private_sync_key_v2'`
* `SYNC_TIME_STORAGE`: `'qt_last_sync_time_v2'`
* `DRAFT_KEY`: `'qt_user_draft_v2'` (legacy fallback: `'qt_journal_draft_clean_v1'`)
* `TOPICAL_DRAFT_KEY`: `'qt_topical_draft_v2'`
* `TELE_DRAFT_KEY`: `'qt_telescopic_draft_v2'`
* `ARCHIVE_KEY`: `'qt_user_archive_v2'` (legacy fallback: `'qt_journal_archive_clean_v1'`)
* `SNAPSHOT_KEY`: `'qt_user_snapshots_v2'`
* Dynamic keys: `'qt_ans_' + q.id` (`q1`–`q13`), `'qt_topical_ans_' + index` (`0`–`5`), `'qt_completed_steps'`.

---

## 6. Frontend Component Hierarchy

QTAPP uses vanilla DOM elements inside `index.html` (styled with `--font-head: 'Cinzel'`, `--font-serif: 'Lora'`, `--font-ui: 'Outfit'` and theme tokens from `DESIGN.md`):

```text
body (.theme-sepia | .theme-light | default Midnight Dark)
├── header.unified-header
│   ├── .brand-group ("QUIET TIME · Study & Journal")
│   ├── nav.unified-nav
│   │   ├── #navMicro (Microscopic)
│   │   ├── #navTopical (Topical)
│   │   ├── #navTele (Telescopic)
│   │   └── #navArchive (Archive + #archiveCount)
│   └── .header-actions
│       ├── .guide-pill-btn (7 Steps Guide trigger)
│       ├── Theme toggle button (toggleTheme)
│       ├── #headerSaveBtn (manualSaveCloud)
│       └── .dropdown-wrap -> #shareMenuDropdown (Storage & Sync, Full Document Sheet, Restore Snapshots, Copy Notes, Share App Link, Download MD, Print, Hard Reset)
│
├── main
│   ├── section#scriptureDesk.scripture-card
│   │   ├── .scripture-header-bar (#verseRefTag, #toggleShelfBtn, #bibleHubLinkBtn, + Insert to Notes)
│   │   ├── #passageShelf (#verseInput, #bibleVersion, Paste, #shelfBibleHubLinkBtn)
│   │   ├── .verse-box -> #verseDisplay (.verse-num-badge, .verse-word tokens)
│   │   └── #wordToolbar (#selectedWordLabel, Insert Word Note, Concordance, Deselect, #dictContentArea)
│   │
│   ├── #microTab.tab-section.active -> .study-grid
│   │   ├── .study-left -> .study-surface
│   │   │   ├── .target-verse-bar (#targetVerseSelect, #targetVerseChips, bulk insert buttons)
│   │   │   └── .question-dropdown-studio (#questionSelectDropdown, Prev/Next, #questionStepIndicator, #activeQuestionCard, #activeQuestionInput)
│   │   └── .study-right -> .studio-panel
│   │       ├── Notes header (+ Scripture, Reset All)
│   │       ├── .note-format-bar (Undo, Redo, B, I, U, Highlight + .hl-swatches, H3, List)
│   │       ├── #journalEditor (.unified-editor, contenteditable) + hidden #journalText + #journalPreview
│   │       └── Action bar (#bottomSaveBtn, + Add to Archive)
│   │
│   ├── #topicalTab.tab-section -> .study-grid
│   │   ├── .study-left -> .study-surface (#topicalTopic, #topicalDef, + Add Topic Heading, .question-dropdown-studio with #topicalQuestionSelectDropdown & #activeTopicalCard)
│   │   └── .study-right -> .studio-panel (Topical Notes header, .note-format-bar, #topicalJournalEditor, hidden #topicalJournalText, #topicalJournalPreview, Save & Archive)
│   │
│   ├── #telescopicTab.tab-section -> .study-grid
│   │   ├── .study-left -> .study-surface (#teleBook, #teleContext, #teleTheme, + Insert Outline)
│   │   └── .study-right -> .studio-panel (Telescopic Notes header, .note-format-bar, #teleJournalEditor, hidden #teleJournalText, #teleJournalPreview, Save & Archive)
│   │
│   ├── #archiveTab.tab-section -> .card (Clear All, #archiveList)
│   └── #sevenStepsDrawerBackdrop -> #sevenStepsDrawer.drawer-panel (Daily Seven Steps 1–7)
│
├── #syncModal.modal-backdrop (#syncLocalCard, #syncConnectedCard, #manualSyncKeyInput, #importBackupInput)
├── #restoreModal.modal-backdrop (#modalSnapshotList)
├── #pageModal.modal-backdrop (#fullSheetTabMicro, #fullSheetTabTopical, #fullSheetTabTele, #modalContent)
└── #toast
```

---

## 7. Implementation Alignment Status (Resolved in Milestones 1–4)

All discrepancies observed in the initial snapshot have been resolved:
1. **Missing Helper Definitions & Dead Code:** `shareLiveGuideLink()` replaces the retired offline HTML download (`exportFreshFriendCopy()`); obsolete `initAutocompleteDatalist()`, `renderSevenSteps()`, `#*JournalPreview`, and ~30 unreachable legacy functions and ~35 dead CSS selectors were removed.
2. **Unified `contenteditable` Sync:** `pullFromCloud()`, `importSyncBackup()`, and `loadArchiveItem()` all update the visible `.unified-editor` DOM and `localStorage`, and multi-color highlights survive Markdown round-trips.
3. **Full-Scope Cloud Sync & Backup:** `pushToCloud()`, `pullFromCloud()`, `enableCloudSync()`, `exportSyncBackup()`, and `importSyncBackup()` persist all three study drafts (`draft`, `topicalDraft`, `teleDraft`), Topical/Telescopic metadata, all 13 Microscopic Q&A answers, and all 6 Topical W's answers (backward-compatible with legacy payloads).
4. **Design Font & Doc Alignment:** `DESIGN.md`, `PRODUCT.md`, `PROFILE.md`, `AGENTS.md`, and `SPEC.md` now consistently specify `Outfit`, `Lora`, and `Cinzel`, document the unified editor, `manifest.json`, live Vercel-only sharing, and live `POST /api/catalyst` endpoint.