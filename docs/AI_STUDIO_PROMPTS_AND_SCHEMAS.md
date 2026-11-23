# QTAPP: Core Prompts, System Instructions & Schemas for Google AI Studio

This reference package extracts the hermeneutical prompts, devotional frameworks, and data schemas from the **Quiet Time Study & Revelation Journal (QTAPP)**. You can directly copy and paste these into **Google AI Studio** (using Gemini 1.5 Pro, Gemini 1.5 Flash, or Gemini 2.0).

---

## 1. System Instructions (AI Studio System Prompt)

Paste this into the **System Instructions** box in Google AI Studio:

```markdown
You are a reverent, spiritually insightful Christian devotional companion and hermeneutical guide for personal Quiet Time Bible study. Your biblical foundation is inspired by classic devotional study principles (specifically Bishop Dag Heward-Mills' teaching on *How You Can Have an Effective Quiet Time with God Every Day*).

### Persona & Tone:
- **Atmosphere:** Serene, unhurried, contemplative, and spiritually grounded.
- **Tone:** Reverent, pastoral, encouraging, and biblically sound. Avoid academic dryness and avoid superficial motivational fluff.
- **Theological Posture:** Christ-centered, scripture-rooted, honoring the inspiration and authority of God's Word, and sensitive to the quiet promptings of the Holy Spirit.

### Core Hermeneutical Rules:
1. **Scripture First:** Anchor every insight strictly in the provided scripture passage, its original context, and explicit biblical phrasing.
2. **Distinguish What Scripture Says vs. What It Does Not:** Always separate direct biblical commands from human assumptions, religious traditions, or common misreadings.
3. **Actionable Application:** Ensure applications are tangible, personal, and behavioral—never vague platitudes.
4. **Devotional Humility:** Frame prayer points and personal reflections to lead the believer into quiet personal communion with God.
5. **Formatting:** Use clean Markdown with bold key terms, clear section headers, and indented bullet points.
```

---

## 2. Prompt Templates

### Template A: Microscopic Bible Study (The 13 Hermeneutical Questions)

**Use Case:** Given a specific verse or short passage, generate detailed answers to all 13 core analytical questions or a specific subset.

#### User Prompt Template:
```markdown
Conduct a Microscopic Bible Study on the following passage:

**Scripture Reference:** {{reference}} ({{version}})
**Scripture Text:**
"{{text}}"

**Optional Focused Word / Phrase:** {{focus_word}}

Please analyze this scripture across the 13 foundational Quiet Time questions:
1. **Meaning in Plain Language:** What does this verse mean directly in simple, clear terms?
2. **Relevance to Current Circumstances:** What does it mean to me in practical modern circumstances, trials, or decisions?
3. **Personal Prompting:** What is God saying personally to the heart through the Holy Spirit?
4. **Explicit Statements:** What explicit biblical truths and statements are directly asserted?
5. **What It Is NOT Saying:** What false assumptions, human exaggerations, or common misreadings must be rejected?
6. **Practical Life Application:** What is a concrete, tangible behavioral action to take?
7. **Command to Obey:** Is there a direct command, requirement, or instruction for the believer?
8. **Warning to Heed:** What spiritual dangers, pitfalls, or errors are warned against?
9. **Example to Follow or Avoid:** What character attitudes or behaviors are modeled?
10. **Allegory / Parable / Type:** Are there spiritual metaphors, prophetic types, or deeper allegories?
11. **Promise to Claim:** What covenant promise is given, and what conditions are attached?
12. **Prayer Petitions:** What concrete prayers emerge from this passage?
13. **Who to Share With:** Who in the believer's sphere of influence needs encouragement from this truth?
```

---

### Template B: Topical Bible Study (The Six Dimensions / 6 W's)

**Use Case:** Exhaustive topical synthesis exploring a spiritual virtue or theme (e.g., *Patience*, *Faith*, *Zeal*, *Humility*).

#### User Prompt Template:
```markdown
Perform a Topical Bible Study using the Six Dimensions (The 6 W's):

**Topic:** {{topic}}
**Biblical / Etymological Definition:** {{definition}}
**Anchor Scriptures:** {{supporting_scriptures}}

Examine this topic across all six dimensions:
1. **Why & Why Not:** Why must the believer pursue this quality, and what spiritual ruin or lack occurs when it is absent?
2. **How & How Not:** How is this virtue exercised practically in daily life, and what dangerous counterfeits or false appearances exist?
3. **Where & Where Not:** In what areas of life (home, workplace, secret life, trials) is it tested, and where must compromise never be permitted?
4. **When & When Not:** What is the right timing and season for its expression, and when might misapplication be inappropriate?
5. **What & What Not:** What is its true biblical essence versus what it is commonly mistaken for?
6. **Who & Who Not:** Toward whom should this quality be demonstrated, and who requires discernment or boundaries?
```

---

### Template C: Telescopic Bible Study (Macro / Whole-Book Synthesis)

**Use Case:** Surveying an entire book or major chapter to understand context, authorial intent, and overarching structure.

#### User Prompt Template:
```markdown
Perform a Telescopic Bible Study synthesis:

**Book or Chapter:** {{book_or_chapter}}
**Author & Historical Setting:** {{historical_context}}
**Intended Recipients & Situation:** {{recipients}}

Please provide a clear structural overview:
1. **Historical & Theological Context:** Who wrote this, from where, and to whom? What historical pressure prompted the writing?
2. **Central Overarching Theme:** What is the single unifying message or motif running through the text?
3. **Structural Outline:** Break down the text into its natural thematic sections or movements.
4. **Key Theological Anchors:** What foundational doctrines of God, Christ, the Holy Spirit, or salvation are established?
5. **Key Practical Commands:** What core ethical and devotional obligations are placed on the readers?
```

---

### Template D: Rhema & Devotional Journal Synthesis

**Use Case:** Synthesizing study findings and personal notes into a finished Quiet Time presentation sheet.

#### User Prompt Template:
```markdown
Synthesize the following Quiet Time study reflections into a clean, unhurried devotional journal entry:

**Date:** {{date}}
**Scripture:** {{reference}} — "{{text}}"
**Study Method:** {{study_method}}
**Raw User Reflections:**
{{raw_notes}}

Format the final output as a quiet devotional journal entry:
# Quiet Time — {{date}}
## Scripture Meditation: {{reference}}
> {{text}}

### Divine Insights & Rhema
[Distilled spiritual insights]

### Practical Obedience & Action
[Concrete next steps]

### Prayer Petitions
[Personal prayer points responding to the Word]
```

---

## 3. Structured Output JSON Schemas

In Google AI Studio, under **Advanced Settings**, turn on **Structured Output** and select **JSON Schema**.

### Schema 1: Microscopic Study Response (`MicroscopicStudyResult`)
```json
{
  "type": "object",
  "properties": {
    "reference": { "type": "string" },
    "version": { "type": "string" },
    "text": { "type": "string" },
    "focusWord": { "type": "string" },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "q1 through q13" },
          "title": { "type": "string" },
          "prompt": { "type": "string" },
          "reflection": { "type": "string" }
        },
        "required": ["id", "title", "prompt", "reflection"]
      }
    },
    "summaryRhema": { "type": "string" },
    "prayer": { "type": "string" }
  },
  "required": ["reference", "text", "questions"]
}
```

### Schema 2: Topical Study Response (`TopicalStudyResult`)
```json
{
  "type": "object",
  "properties": {
    "topic": { "type": "string" },
    "definition": { "type": "string" },
    "dimensions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "prompt": { "type": "string" },
          "reflection": { "type": "string" },
          "scriptureReferences": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["title", "prompt", "reflection"]
      }
    },
    "keyApplication": { "type": "string" }
  },
  "required": ["topic", "dimensions"]
}
```

---

## 4. Native App Data Structures

For full parity with the QTAPP app storage, these are the exact data structures used in `localStorage` and cloud synchronization:

### 1. `CurrentScripture` Object
```typescript
interface CurrentScripture {
  reference: string;    // e.g., "2 Timothy 2:15"
  version: string;      // e.g., "kjv", "web", "asv", "bsb", "ylt"
  text: string;         // Full scripture text
  verses?: Array<{
    verse: number;
    text: string;
  }>;
}
```

### 2. `ArchiveEntry` Object (Stored in `qt_journal_archive_clean_v1`)
```typescript
interface ArchiveEntry {
  id: number;           // Unix timestamp (Date.now())
  date: string;         // ISO date string (new Date().toISOString())
  ref: string;          // e.g., "2 Timothy 2:15" or "🏷️ Topic: Patience" or "📜 Book: Ephesians"
  content: string;      // Markdown formatted journal entry
}
```

### 3. Cloud Sync Payload (`qt_cloud_payload`)
```typescript
interface CloudSyncPayload {
  updatedAt: number;    // Unix timestamp
  draft: string;        // Active Microscopic journal markdown
  archive: ArchiveEntry[];
  scripture: CurrentScripture;
}
```

### 4. LocalStorage Keys Reference
- `qt_journal_draft_clean_v1`: Microscopic study markdown draft.
- `qt_topical_draft_v2`: Topical study markdown draft.
- `qt_telescopic_draft_v2`: Telescopic study markdown draft.
- `qt_journal_archive_clean_v1`: JSON array of archived entries.
- `qt_ans_q1` to `qt_ans_q13`: Individual responses to the 13 microscopic questions.
- `qt_topical_ans_0` to `qt_topical_ans_5`: Responses to the 6 topical dimensions.
