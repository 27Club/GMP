# Monday.com "Autofill with AI" — Research Notes

**Date:** March 24, 2026
**Context:** Evaluated for use in GMP Marketing Content Engine and LinkedIn Content board

---

## What It Is

"Autofill with AI" is a feature layer you apply to existing columns in Monday.com. It is **not** a separate column type. You activate it via the column header menu (three dots → "Autofill with AI"), write or select a prompt, and Monday's AI fills the column for each item.

- Runs automatically on **new items** added after configuration
- Retroactive application to existing items is **unreliable** (known community issue)
- Can be triggered via Monday automations (e.g., "When status changes" → AI block)
- Setup is **UI-only** — no API to configure or trigger AI autofill

---

## How Custom Prompts Work

- Select "Custom action" from the action list
- Write a prompt (up to **3,000 characters**)
- Reference other columns via a **variable picker UI** — click to insert column values inline
- Example: `"Based on the meeting transcript in {Transcript}, generate a summary"`
- AI uses the referenced column values for each item when generating output

---

## Supported Column Types

### As Output (columns you can autofill)

| Column Type | Available AI Actions |
|---|---|
| **Text** | Detect sentiment, Extract info, Improve text, Summarize, Translate, Writing assistant, Custom action |
| **Status** | Assign label (AI picks from your defined labels) |
| **Dropdown** | Assign label |
| **People** | Assign person (based on role/skill matching) |

### NOT Supported as Output

- **Long Text** — explicitly not supported
- This is a critical limitation for content generation workflows

### As Input (what AI can read from)

- Item name
- Text columns
- Files column (monday docs, invoices, resumes, images — up to 15MB / 250,000 chars)
- Link column (webpage content)
- In monday CRM: Emails & Activities
- **Cannot read from Updates/conversations (the green bubble)**

---

## Pre-Built Actions

Monday provides curated prompt templates:

- **Detect sentiment** — Positive / Negative / Neutral
- **Extract info** — Pull structured data from files, images, links, text
- **Improve text** — Rewrite for clarity/quality
- **Summarize** — Condense long text
- **Translate** — Multiple languages
- **Writing assistant** — Generate text with tone/length controls
- **Assign label** — AI picks a Status/Dropdown label
- **Assign person** — AI assigns based on role matching
- **Custom action** — Freeform prompt with column variables

Monday notes that pre-built actions yield better results than custom prompts for the tasks they cover.

---

## "AI That Knows More" (Beta) — Web Search

- Powered by **Tavily Inc.**
- When enabled on a Custom action, AI can search the web for information not on the board
- Useful for CRM enrichment: finding company details, CEO names, funding info
- **Beta** — gradually rolling out, not available to all accounts

---

## Pricing & AI Credits

| Detail | Value |
|---|---|
| Plan requirement | All paid plans (Standard, Pro, Enterprise) |
| Free monthly credits | 500 credits/month |
| One-time trial credits | 6,000 (non-Enterprise) or 12,000 (Enterprise) |
| Cost per credit | $0.01 |
| Credits per action | 8 credits per item (multiple actions on same item within 24 hours = still 8) |
| AI add-on | Starts at $200/month for more credits |

**Cost example:** 1,000 items × 8 credits = 8,000 credits = $80 (exceeds the free 500/month significantly)

---

## Limitations

1. **Long Text column not supported** as output — cannot generate blog posts, LinkedIn posts, or any long-form content
2. **3,000 character prompt limit** — constraining for complex instructions
3. **No API configuration** — setup is UI-only, cannot automate setup
4. **Cannot read from Updates/conversations** (the green bubble with HTML content)
5. **No structured JSON output** — cannot return multiple fields from one prompt
6. **No model selection** — cannot choose GPT-4o, o4-mini, etc.
7. **Single-board scope** — cannot reference columns from other boards
8. **No output formatting control** beyond tone/length
9. **Minimum 40 characters** of input text required
10. **Retroactive fill is unreliable** on existing items
11. **Cannot read from subitems** across parent-child relationships

---

## Autofill AI vs. AI Workflows vs. Make + OpenAI

| Dimension | Monday Autofill AI | Monday AI Workflows | Make.com + OpenAI |
|---|---|---|---|
| Setup complexity | Very low (point-and-click) | Low (workflow builder) | Medium (scenario builder) |
| Prompt flexibility | 3,000 chars | Limited | Unlimited |
| Model choice | None (Monday's model) | None | Any model (o4-mini, GPT-4o, etc.) |
| Output destination | Text, Status, Dropdown, People only | Item columns + create items | Any column via API + any external system |
| Long Text output | Not supported | Limited | Full support via API |
| Structured JSON | No | No | Yes (JSON mode, function calling) |
| Cross-board | No | Yes | Yes |
| Read Updates | No | No | Yes (via GraphQL API) |
| Multi-step logic | No (single action per column) | Yes (workflow steps) | Yes (branching, iteration, error handling) |
| Triggers | New item / automation | Status change, Notetaker, date, etc. | Any Monday trigger + 1000s of app triggers |
| Cost at scale | 8 credits ($0.08) per item | Credits | Make ops (~$9/mo for 10k ops) + OpenAI API (~$0.01-0.10 per generation) |
| Web search | Beta (Tavily) | No | Full control (any search API) |

---

## Recommendation for GMP

**Stick with Make.com + OpenAI for the content engine.** Monday Autofill AI cannot:
- Write to Long Text columns (where all content lives)
- Output structured JSON (needed for multi-field content generation)
- Read from Updates (where blog drafts are stored as HTML)
- Work cross-board (Meetings board → Content Engine board)
- Provide model control or unlimited prompt length

**Where Monday Autofill AI could help (small utility tasks):**
- Auto-assigning Profile dropdown (Company Page / Michelle / Parneet) based on content topic
- Auto-setting Approval Status based on content quality
- Quick sentiment detection on incoming messages
- CRM lead enrichment using the web search beta (e.g., looking up attorney firm details for Kyle's pipeline)

---

## Sources

- [Autofill with AI / AI-powered columns — Monday Support](https://support.monday.com/hc/en-us/articles/18640208769682-Autofill-with-AI)
- [AI-powered automations and columns — Monday Support](https://support.monday.com/hc/en-us/articles/18433811274386)
- [AI Credits — Monday Support](https://support.monday.com/hc/en-us/articles/29544502265746-AI-Credits)
- [AI Feature Catalog — Monday Support](https://support.monday.com/hc/en-us/articles/24047211522194)
- [The workflow builder: AI blocks — Monday Support](https://support.monday.com/hc/en-us/articles/23825120540306)
- [Run AI auto-fills on existing data — Monday Community Forum](https://community.monday.com/t/run-ai-auto-fills-on-existing-data/91198)
- [3000 characters limit custom AI prompt — Monday Community Forum](https://community.monday.com/t/3000-characters-limit-or-more-custom-ai-prompt-within-automations/114978)
