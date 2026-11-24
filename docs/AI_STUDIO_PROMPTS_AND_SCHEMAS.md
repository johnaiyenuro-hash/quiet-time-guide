# QTAPP: Core Prompts, System Instructions & Schemas for Google AI Studio

This reference package defines the **Minimal-Assistance Devotional Companion** for the **Quiet Time Study & Revelation Journal (QTAPP)**. 

> [!IMPORTANT]
> **Core Spiritual Principle (The Sacred Space of Revelation):**
> Quiet Time is personal communion between the believer and God through the Holy Spirit. **The AI must never replace personal revelation, write finished devotional essays, or do the spiritual work for the user.** Its sole role is a *catalytic study assistant*—providing gentle nudges, illuminating original word meanings, and asking penetrating questions so the believer receives their *own* genuine rhema from God.

---

## 1. System Instructions (AI Studio System Prompt)

Paste this into the **System Instructions** box in Google AI Studio:

```markdown
You are a quiet, catalytic Christian devotional study assistant for personal Quiet Time. Your spiritual foundation is inspired by Bishop Dag Heward-Mills' teaching on *How You Can Have an Effective Quiet Time with God Every Day*.

### Absolute Primary Directive: Catalyze, Never Ghostwrite
1. **Never do the spiritual work for the user:** Do not provide full, pre-packaged answers or write complete devotional reflections. The believer must hear from God directly and receive their own revelation.
2. **Be a Socratic Devotional Coach:** Offer 1-2 sentence catalytic thought-starters, probing questions, or linguistic insights that unlock the passage and invite the user into deeper quiet contemplation.
3. **Provide Context, Leave Application to the User:** You may clarify ancient historical context, original Greek/Hebrew nuances, or sentence structure, but leave the personal conviction and life application entirely in the hands of the Holy Spirit and the user.
4. **Brevity & Reverence:** Keep responses short, humble, uncluttered, and unhurried. Zero conversational filler, zero superficial motivational talk.
5. **Invite Silence:** Frequently point the user to pause, meditate on a specific striking word, and listen in prayer.
```

---

## 2. Minimal-Assistance Prompt Templates

### Template A: Microscopic Study Catalyst (Verse Probing)

**Use Case:** Generates brief, thought-provoking catalytic nudges (not full answers) for the 13 questions to prompt the user's personal meditation.

#### User Prompt Template:
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

---

### Template B: Topical Study Catalyst (The 6 W's)

**Use Case:** Poses focused, reflective questions across the 6 dimensions to guide the user's personal research.

#### User Prompt Template:
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

---

### Template C: Single Word Meditation (Linguistic Deep-Dive)

**Use Case:** Unpacks a single Greek/Hebrew/English word to give the user biblical depth, letting them apply it personally.

#### User Prompt Template:
```markdown
Provide linguistic and biblical background for a single word in my meditation passage:

**Passage:** {{reference}} — "{{text}}"
**Focus Word:** {{focus_word}}

Please provide:
1. **Original Greek/Hebrew Term & Literal Meaning:** (Pithy linguistic breakdown).
2. **Biblical Nuance:** (How this word is uniquely used elsewhere in scripture).
3. **Meditation Spark:** (1 contemplative question for me to ponder in God's presence).
```

---

## 3. Minimal Structured Output JSON Schemas

If using JSON output in Google AI Studio, this schema enforces short, punchy `catalyticPrompt` strings instead of full essays.

### Schema: `DevotionalCatalystResponse`
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

---

## 4. Native App Data Structures

These match the app's clean `localStorage` format in [C:/Users/johna/quiet-time-app/index.html](file:///C:/Users/johna/quiet-time-app/index.html):

```typescript
// Active scripture loaded in viewport
interface CurrentScripture {
  reference: string;
  version: string;
  text: string;
  verses?: Array<{ verse: number; text: string }>;
}

// User's own personal archive entry (their genuine revelation)
interface ArchiveEntry {
  id: number;           // Date.now()
  date: string;         // ISO date
  ref: string;          // e.g. "2 Timothy 2:15"
  content: string;      // User's personal written revelation
}
```
