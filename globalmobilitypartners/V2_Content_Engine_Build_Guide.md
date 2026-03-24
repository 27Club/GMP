# Marketing Content Engine V2 — Build Guide

**Date:** March 24, 2026
**Status:** In Progress
**Prepared by:** Debra Gail White

---

## Overview

V2 replaces the single-board content engine with a **content-type routing** architecture. Meetings generate content that routes to one of four destination boards based on a "Content Type" dropdown selection.

### V1 → V2 Changes

| Aspect | V1 | V2 |
|---|---|---|
| Intake board | AI Meeting Notes Tracker (18404381152) | V2 AI Meeting Notes Tracker (18405337734) |
| Destination | Single board: Marketing Content Engine (18401797200) | 4 boards based on Content Type |
| Prompt | Hardcoded in Make scenario | User-written Prompt column on Meetings board |
| Content generation | Scenario 4583539 (hardcoded prompt) | Scenario 4632957 (generic — reads prompt from input) |
| Trigger | Scenario 4621460 | New "V2 Meeting Board Sync" scenario |

---

## Architecture

```
V2 AI Meeting Notes Tracker (18405337734)
  User fills: Transcript + Prompt + Content Type
  User sets: "Generate Content?" = Yes
    │
    ▼
V2 Meeting Board Sync (NEW Make scenario — webhook trigger)
  1. Sets Status = "Processing"
  2. Reads Prompt, Transcript, Content Type
  3. Routes based on Content Type:
     │
     ├─ "Blog Post"         → Board 18405333684
     ├─ "Email Newsletter"  → Board 18405340749
     ├─ "LinkedIn Newsletter"→ Board 18405340870
     └─ "LinkedIn Post"     → Board 18405134840
     │
  4. Creates item on destination board
  5. Copies Transcript + Prompt to destination item
  6. Calls Generic ChatGPT Prompt scenario (4632957)
     with: item_id, board_id, prompt, transcript
  7. Sets Status = "Done" (or "Error")
    │
    ▼
Generic ChatGPT Prompt (Scenario 4632957 — sub-scenario)
  1. Sends prompt + transcript to OpenAI (o4-mini)
  2. Parses JSON response
  3. Routes by board schema:
     ├─ Blog/Email schema → writes mm0y... column IDs
     └─ LinkedIn schema   → writes mm1q... column IDs
  4. Posts full HTML content as item Update (green bubble)
    │
    ▼
Content ready for review on destination board
```

---

## Board Reference

### V2 AI Meeting Notes Tracker (18405337734)

**Intake board.** User reviews meeting and triggers content generation.

| Column | ID | Type | Purpose |
|---|---|---|---|
| Name | `name` | name | Meeting name |
| Meeting Date | `date_mm1jdb0c` | date | Meeting date |
| Attendees | `multiple_person_mm1j3p79` | people | Participants |
| **Prompt** | `text_mm1ryypy` | **text** | User-written generation prompt |
| **Content Type** | `dropdown_mm1j5812` | dropdown | Routes to destination board |
| Generate Content? | `color_mm1j6ejs` | status | Yes / Complete / No |
| Status | `color_mm1j3rfh` | status | Processing / Done / Error |
| Transcript | `long_text_mm1jwj6k` | long_text | Full meeting transcript |
| Regenerate? | `boolean_mm1qappr` | checkbox | Trigger regeneration |
| Regeneration Prompt | `long_text_mm1qyatd` | long_text | Prompt for regeneration |

**Content Type dropdown values (active only):**

| ID | Label | Destination Board |
|---|---|---|
| 5 | LinkedIn Post | 18405134840 |
| 6 | LinkedIn Newsletter | 18405340870 |
| 7 | Blog Post | 18405333684 |
| 8 | Email Newsletter | 18405340749 |

> **Note:** The Prompt column is `text` type (2,000 character limit), not `long_text`. If prompts regularly exceed 2,000 characters, this column should be changed to `long_text` in Monday.com.

### Destination Boards

All four boards have the same column **names** but two different sets of column **IDs**.

#### Schema A — "Blog Schema" (Blog Post + Email Newsletter)

Used by:
- **Blog Post** (18405333684) — group: `group_mm0yk2g7`
- **Email Newsletter** (18405340749) — group: `group_mm0yk2g7`

| Column Name | Column ID | Type |
|---|---|---|
| Prompt | `long_text_mm1qv1zj` | long_text |
| Source Text / Transcript | `long_text_mm0y5paq` | long_text |
| Core Problem | `long_text_mm0y6akq` | long_text |
| Hidden Risk | `long_text_mm0y5wsy` | long_text |
| Strategic Insight | `long_text_mm0ytt6x` | long_text |
| Objection Handled | `long_text_mm0yyfr9` | long_text |
| SEO Title | `text_mm0ytyts` | text |
| Meta Description | `text_mm0ywtxh` | text |
| LinkedIn Post | `long_text_mm0ygp2e` | long_text |
| FAQ Entry | `long_text_mm0y9fs1` | long_text |
| LinkedIn Hooks | `long_text_mm0y6gaj` | long_text |
| Regenerate? | `color_mm1qyt11` | status |
| Regeneration Prompt | `long_text_mm1qvvgy` | long_text |

#### Schema B — "LinkedIn Schema" (LinkedIn Post + LinkedIn Newsletter)

Used by:
- **LinkedIn Post** (18405134840) — group: `topics`
- **LinkedIn Newsletter** (18405340870) — group: `topics`

| Column Name | Column ID | Type |
|---|---|---|
| Prompt | `long_text_mm1qav6x` | long_text |
| Source Text | `long_text_mm1qzbm3` | long_text |
| Core Problem | `long_text_mm1qbzfb` | long_text |
| Hidden Risk | `long_text_mm1qj7q7` | long_text |
| Strategic Insight | `long_text_mm1qytdh` | long_text |
| Objection Handled | `long_text_mm1qsws2` | long_text |
| SEO Title | `text_mm1qzehq` | text |
| Meta Description | `text_mm1qen4b` | text |
| LinkedIn Post | `long_text_mm1q51qs` | long_text |
| FAQ Entry | `long_text_mm1qanha` | long_text |
| LinkedIn Hooks | `long_text_mm1qp4x7` | long_text |
| Regenerate? | `color_mm1q33q8` | status |
| Regeneration Prompt | `long_text_mm1q8gbh` | long_text |
| Photo | `file_mm1qt26y` | file |
| Publish LinkedIn | `color_mm1qfd4y` | status |
| LinkedIn URL | `text_mm1qerze` | text |
| Profile | `dropdown_mm1qqv51` | dropdown |
| Approval Status | `color_mm1q80xz` | status |
| Reviewer | `multiple_person_mm1q48gj` | people |
| Publish Date | `date_mm1qmmb` | date |

---

## Scenario 1: Generic ChatGPT Prompt (4632957) — DEPLOYED

**URL:** https://us1.make.com/38808/scenarios/4632957/edit
**Type:** On-demand (sub-scenario)
**Status:** Blueprint updated via API on 2026-03-24. Ready for testing.

### Input Interface

| Parameter | Type | Required | Description |
|---|---|---|---|
| `item_id` | text | Yes | Destination board item ID |
| `board_id` | text | Yes | Destination board ID |
| `prompt` | text | Yes | Content generation prompt (from Meetings board) |
| `transcript` | text | Yes | Meeting transcript (from Meetings board) |

### Updated Module Flow

```
Module 2 (OpenAI o4-mini)
  → Module 3 (JSON Parse)
    → Router
      ├─ Route A [Blog/Email schema]: Module 4A (HTTP: Write columns) → Module 5A (HTTP: Post HTML update)
      └─ Route B [LinkedIn schema]:   Module 4B (HTTP: Write columns) → Module 5B (HTTP: Post HTML update)
```

### Module Details

**Module 1 — REMOVE.** No longer needed. Prompt and transcript come from input parameters.

**Module 2 — OpenAI (o4-mini)**

Replace the current `input` field. Change from reading `{{1.data.data.items...}}` to:

```
{{var.input.prompt}}

IMPORTANT:
- Output each key exactly once. Do not repeat keys.
- hooks must be an array of strings (3 items).
- faq must be a single string.
- Return ONLY raw JSON. No markdown, no backticks, no commentary.

Return ONLY valid JSON:

{
  "core_problem": "",
  "hidden_risk": "",
  "strategic_insight": "",
  "objection_handled": "",
  "seo_title": "",
  "meta_description": "",
  "blog": "",
  "linkedin_post": "",
  "hooks": [],
  "faq": ""
}

=== INPUT TEXT ===
{{var.input.transcript}}
```

All other OpenAI settings remain the same (model: o4-mini, JSON mode, max_output_tokens: 8000).

**Module 3 — JSON Parse** — No changes. Still `{{2.result}}`.

**Router — Add after Module 3**

**Route A — Blog/Email Schema**
- Filter: `{{var.input.board_id}}` IN `18405333684`, `18405340749`
- Filter label: "Blog or Email board"

**Module 4A — HTTP Request (Write Blog/Email columns)**

Method: POST
URL: `https://api.monday.com/v2`
Headers: Authorization (Monday API token), Content-Type: application/json
Body (JSON string):
```json
{
  "query": "mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) { change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $columnValues) { id } }",
  "variables": {
    "boardId": "{{var.input.board_id}}",
    "itemId": "{{var.input.item_id}}",
    "columnValues": "{\"long_text_mm0y6akq\": {\"text\": \"{{replace(replace(3.core_problem; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"long_text_mm0y5wsy\": {\"text\": \"{{replace(replace(3.hidden_risk; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"long_text_mm0ytt6x\": {\"text\": \"{{replace(replace(3.strategic_insight; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"long_text_mm0yyfr9\": {\"text\": \"{{replace(replace(3.objection_handled; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"text_mm0ytyts\": \"{{replace(replace(3.seo_title; \"\\\"\"; \"'\"); newline; \" \")}}\",\"text_mm0ywtxh\": \"{{replace(replace(3.meta_description; \"\\\"\"; \"'\"); newline; \" \")}}\",\"long_text_mm0ygp2e\": {\"text\": \"{{replace(replace(3.linkedin_post; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"long_text_mm0y9fs1\": {\"text\": \"{{replace(replace(3.faq; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"long_text_mm0y6gaj\": {\"text\": \"{{replace(replace(3.hooks; \"\\\"\"; \"'\"); newline; \" \")}}\"}"
  }
}
```

**Module 5A — HTTP Request (Post HTML update)**

Same as current Module 5 — posts `{{3.blog}}` as HTML update via `create_update` mutation.
```json
{
  "query": "mutation($itemId: ID!, $body: String!) { create_update(item_id: $itemId, body: $body) { id } }",
  "variables": {
    "itemId": "{{var.input.item_id}}",
    "body": "{{replace(replace(3.blog; \"\\\"\"; \"'\"); newline; \"\")}}"
  }
}
```

Filter: Skip if `{{3.blog}}` is empty.

**Route B — LinkedIn Schema**
- Filter: `{{var.input.board_id}}` IN `18405134840`, `18405340870`
- Filter label: "LinkedIn board"

**Module 4B — HTTP Request (Write LinkedIn columns)**

Same structure as Module 4A but with LinkedIn column IDs:
- `long_text_mm1qbzfb` ← core_problem
- `long_text_mm1qj7q7` ← hidden_risk
- `long_text_mm1qytdh` ← strategic_insight
- `long_text_mm1qsws2` ← objection_handled
- `text_mm1qzehq` ← seo_title
- `text_mm1qen4b` ← meta_description
- `long_text_mm1q51qs` ← linkedin_post
- `long_text_mm1qanha` ← faq
- `long_text_mm1qp4x7` ← hooks

**Module 5B — HTTP Request (Post HTML update)**

Identical to Module 5A.

---

## Scenario 2: V2 Meeting Board Sync (NEW — User Must Create Shell)

**Type:** Webhook trigger (event-driven)
**Board:** V2 AI Meeting Notes Tracker (18405337734)

> **Setup:** Create a new scenario in Make.com UI. Add a Monday.com webhook module watching board 18405337734, column `color_mm1j6ejs` (Generate Content?). Then we can PATCH the blueprint.

### Module Flow

```
Module 1 (Monday Webhook)
  → Module 2 (Monday: Set Status = Processing)
    → Module 3 (HTTP: Read Prompt + Transcript + Content Type)
      → Module 4 (Tools: Set Multiple Variables — resolve board_id, group_id, column IDs)
        → Module 5 (HTTP: Create item on destination board)
          → Module 6 (HTTP: Write Prompt + Transcript to destination item)
            → Module 7 (Call Sub-Scenario 4632957)
              → Module 8 (Monday: Set Status = Done, Generate Content = Complete)
                [Error Handler on Module 7] → Module 9 (Monday: Set Status = Error)
```

### Module Details

**Module 1 — Monday Webhook**
- Board: 18405337734 (V2 AI Meeting Notes Tracker)
- Column: `color_mm1j6ejs` (Generate Content?)
- Fires when value changes

**Module 2 — Monday: Change Column Values**
- Board: 18405337734
- Item: `{{1.pulseId}}`
- Set `color_mm1j3rfh` (Status) = "Processing" (index 0)

**Module 3 — HTTP Request (Read Meeting Data)**
```json
{
  "query": "{ items(ids: [{{1.pulseId}}]) { id name column_values(ids: [\"text_mm1ryypy\", \"long_text_mm1jwj6k\", \"dropdown_mm1j5812\"]) { id text } } }"
}
```

Returns:
- `column_values[0].text` = Prompt
- `column_values[1].text` = Transcript
- `column_values[2].text` = Content Type label (e.g., "Blog Post")

**Module 4 — Tools: Set Multiple Variables**

| Variable | Value |
|---|---|
| `content_type` | `{{3.data.data.items[].column_values[2].text}}` |
| `prompt` | `{{3.data.data.items[].column_values[0].text}}` |
| `transcript` | `{{3.data.data.items[].column_values[1].text}}` |
| `board_id` | `{{if(4.content_type = "Blog Post"; "18405333684"; if(4.content_type = "Email Newsltter"; "18405340749"; if(4.content_type = "LinkedIn Newsltter"; "18405340870"; "18405134840")))}}` |
| `group_id` | `{{if(4.content_type = "Blog Post"; "group_mm0yk2g7"; if(4.content_type = "Email Newsltter"; "group_mm0yk2g7"; if(4.content_type = "LinkedIn Newsltter"; "topics"; "topics")))}}` |
| `prompt_col` | `{{if(4.board_id = "18405333684" or 4.board_id = "18405340749"; "long_text_mm1qv1zj"; "long_text_mm1qav6x")}}` |
| `source_col` | `{{if(4.board_id = "18405333684" or 4.board_id = "18405340749"; "long_text_mm0y5paq"; "long_text_mm1qzbm3")}}` |

> **Important:** The Content Type labels have typos ("Newsltter"). The `if()` conditions must match the EXACT text as stored in Monday.com.

**Module 5 — HTTP Request (Create Item on Destination Board)**
```json
{
  "query": "mutation ($boardId: ID!, $groupId: String!, $itemName: String!) { create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName) { id } }",
  "variables": {
    "boardId": "{{4.board_id}}",
    "groupId": "{{4.group_id}}",
    "itemName": "{{1.pulseName}}"
  }
}
```

**Module 6 — HTTP Request (Write Prompt + Transcript to Destination Item)**
```json
{
  "query": "mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) { change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $columnValues) { id } }",
  "variables": {
    "boardId": "{{4.board_id}}",
    "itemId": "{{5.data.data.create_item.id}}",
    "columnValues": "{\"{{4.prompt_col}}\": {\"text\": \"{{replace(replace(4.prompt; \"\\\"\"; \"'\"); newline; \" \")}}\"},\"{{4.source_col}}\": {\"text\": \"{{replace(replace(4.transcript; \"\\\"\"; \"'\"); newline; \" \")}}\"}"
  }
}
```

**Module 7 — Call Sub-Scenario (4632957)**
- Scenario: 4632957 (Generic ChatGPT Prompt)
- Wait for completion: Yes
- Input data:
  - `item_id` = `{{5.data.data.create_item.id}}`
  - `board_id` = `{{4.board_id}}`
  - `prompt` = `{{4.prompt}}`
  - `transcript` = `{{4.transcript}}`

**Module 8 — Monday: Change Column Values (Success)**
- Board: 18405337734
- Item: `{{1.pulseId}}`
- Set `color_mm1j3rfh` (Status) = "Done" (index 1)
- Set `color_mm1j6ejs` (Generate Content?) = "Complete" (index 1)

**Module 9 — Error Handler on Module 7 → Monday: Change Column Values (Error)**
- Board: 18405337734
- Item: `{{1.pulseId}}`
- Set `color_mm1j3rfh` (Status) = "Error" (index 2)

---

## Implementation Steps

### Step 1: Fix Content Type Dropdown Typos (Optional but Recommended)

In Monday.com UI, go to V2 AI Meeting Notes Tracker → Content Type column → edit labels:
- "LinkedIn Newsltter" → "LinkedIn Newsletter"
- "Email Newsltter" → "Email Newsletter"

> If you fix these, update the `if()` conditions in Module 4 of the trigger scenario to match the corrected text.

### Step 2: Generic ChatGPT Prompt Scenario (4632957) — DONE

Blueprint deployed via Make API on 2026-03-24. Changes:
- Removed Module 1 (no longer reads from item — prompt/transcript come from inputs)
- Module 2 (OpenAI) updated to use `{{var.input.prompt}}` and `{{var.input.transcript}}`
- Added Router (Module 10) after JSON Parse with two routes
- Route A: Blog/Email schema (boards 18405333684, 18405340749) — writes `mm0y...` columns
- Route B: LinkedIn schema (boards 18405134840, 18405340870) — writes `mm1q...` columns
- Input interface: `item_id`, `board_id`, `prompt`, `transcript`
- Test by calling with known item on each board type

### Step 3: Create V2 Meeting Board Sync Scenario

1. In Make.com UI, create a new scenario
2. Add Monday.com webhook trigger watching board 18405337734, column `color_mm1j6ejs`
3. Build the module flow as described above
4. Test end-to-end with each Content Type

### Step 4: End-to-End Test

For each Content Type:
1. Create a test item on V2 AI Meeting Notes Tracker
2. Add a test transcript and prompt
3. Select the Content Type
4. Set "Generate Content?" = Yes
5. Verify:
   - Status changes to "Processing" immediately
   - Item created on correct destination board
   - Transcript and Prompt copied to destination item
   - Content generated and written to columns
   - HTML blog update posted on destination item
   - Status changes to "Done"

---

## Connection & Key Reference

| Resource | ID |
|---|---|
| V2 AI Meeting Notes Tracker | 18405337734 |
| Blog Post board | 18405333684 |
| Email Newsletter board | 18405340749 |
| LinkedIn Newsletter board | 18405340870 |
| LinkedIn Post board | 18405134840 |
| Generic ChatGPT Prompt scenario | 4632957 |
| V2 Meeting Board Sync scenario | TBD (user creates shell) |
| Monday.com connection | 153017 |
| OpenAI connection | 4683909 |
| Make API auth | apiKeyKeychain: 86399 |

---

*This document is the technical build specification for V2 of the Marketing Content Engine.*
