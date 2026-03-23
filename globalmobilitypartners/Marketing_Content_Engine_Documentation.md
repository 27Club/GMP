# Marketing Content Engine — Technical Documentation

**Client:** Global Mobility Partners
**Prepared by:** Debra Gail White
**Date:** March 18, 2026
**Status:** Phase 1 Complete

---

## Executive Summary

Global Mobility Partners now has a fully automated marketing content pipeline that transforms meeting transcripts into ready-to-review blog posts, LinkedIn content, FAQs, and SEO metadata — with no manual content creation required.

When a meeting ends, the AI Notetaker captures the transcript and creates a record on the Meetings board. A team member reviews the meeting and selects whether to generate marketing content. Once selected, the system automatically generates a full suite of marketing assets and writes them to the Content Engine board for review.

The entire system runs within **Monday.com** and **Make.com** — no external scripts, servers, or hosting required.

---

## System Architecture

### Overview

The pipeline consists of three integrated components:

1. **Monday.com AI Notetaker** — Captures meeting transcripts automatically
2. **Monday.com Workflow Builder** — Moves transcript data to the Meetings board
3. **Make.com Scenarios** — Orchestrates content generation via OpenAI

### Flow Diagram

```
Meeting Ends
    │
    ▼
AI Notetaker captures transcript
    │
    ▼
Monday Workflow: "Create AI Meeting Notes Item"
  - Creates item on Meetings board
  - Maps meeting name + transcript to columns
    │
    ▼
User reviews meeting, sets "Generate Content?" = "Yes"
    │
    ▼
Make Scenario: "Meeting Board Sync" (event-driven webhook)
  - Detects column change on Meetings board
  - Sets Status to "Processing"
  - Creates new item on Content Engine board
  - Reads transcript from Meetings board
  - Copies transcript to Content Engine item
  - Calls content generation sub-scenario
  - On success: Sets Status to "Done", Generate Content to "Complete"
  - On error: Sets Status to "Error"
    │
    ▼
Make Scenario: "Create Marketing Content" (sub-scenario)
  - Reads transcript from Content Engine item
  - Sends to OpenAI (o4-mini) with structured prompt
  - Parses JSON response
  - Writes all generated content to Content Engine board columns
    │
    ▼
Content ready for review on Marketing Content Engine board
```

---

## Components

### 1. Monday.com AI Notetaker

- **Function:** Automatically joins meetings and records transcripts
- **Trigger:** Meeting ends → Notetaker processes recording
- **Output:** Meeting name, transcript, and metadata available as dynamic fields

> **Important Note:** The AI Notetaker is a walled garden within Monday.com. Meeting transcripts are **not accessible** via the Monday.com GraphQL API, the MCP server, or any programmatic method. The **only** way to retrieve the transcript is through Monday.com's AI Workflows, using the "When Notetaker Meeting Ended" trigger which exposes "Meeting Transcript" as a dynamic field. This workflow must be built manually in the Monday.com UI — it cannot be created or configured via API.

### 2. Monday Workflow: "Create AI Meeting Notes Item"

- **Trigger:** "When Notetaker Meeting Ended"
- **Action:** Creates an item on the AI Meeting Notes Tracker board
- **Mapped Fields:**
  - Item Name ← Meeting name
  - Transcript column ← Meeting Transcript (dynamic field from Notetaker)
- **Board:** AI Meeting Notes Tracker (ID: 18404381152)

### 3. Make Scenario: "Meeting Board Sync" (ID: 4621460)

**Type:** Event-driven (webhook trigger)
**Edit URL:** https://us1.make.com/38808/scenarios/4621460/edit

| Module | Type | Function |
|--------|------|----------|
| 1 | Monday Webhook | Watches "Generate Content?" column for changes (webhook ID: 2653062) |
| 2 | Monday: Change Column Values | Sets Status = "Processing" on Meetings board (Item: `{{1.pulseId}}`) |
| 4 | Monday: Create Item | Creates item on Content Engine board in "Generated Content" group (Name: `{{1.pulseName}}`) |
| 5 | HTTP Request | Reads transcript from Meetings board item via Monday GraphQL API |
| 6 | Monday: Change Column Values | Copies transcript to Content Engine item (Item: `{{4.id}}`) |
| 3 | Call Sub-scenario | Calls "Create Marketing Content" with `item_id = {{4.id}}`, waits for completion |
| 7 | Monday: Change Column Values | **Success path:** Sets Status = "Done" on Meetings board (Item: `{{1.pulseId}}`) |
| 7e | Monday: Change Column Values | **Error handler path:** Sets Status = "Error" on Meetings board (Item: `{{1.pulseId}}`) |

**Status column (`color_mm1j3rfh`) tracks the full lifecycle:**
- **Processing** — Set immediately when the webhook fires (Module 2), so the team knows content generation is in progress
- **Done** — Set after content generation completes successfully (Module 7)
- **Error** — Set if content generation fails for any reason (Module 7e, error handler on Module 3)

### 4. Make Scenario: "Create Marketing Content" (ID: 4583539)

**Type:** On-demand (called via sub-scenario or API)
**Edit URL:** https://us1.make.com/38808/scenarios/4583539/edit

| Module | Type | Function |
|--------|------|----------|
| 9 | HTTP Request | Reads transcript from Content Engine board item via Monday GraphQL API |
| 2 | OpenAI (o4-mini) | Generates all marketing content from transcript (JSON response format) |
| 7 | JSON Parse | Parses structured content from OpenAI response |
| 8 | Monday: Change Column Values | Writes all generated content to Content Engine board columns (except Blog Draft) |
| 10 | HTTP Request | Posts Blog Draft as an HTML-formatted item update via `create_update` mutation (bypasses 2,000 character column limit). Uses `replace()` to sanitize quotes and newlines. Filtered: skips if blog is empty. |

**Input Interface:**
- `item_id` (required) — Content Engine board item ID
- `meeting_item_id` (optional) — Meetings board item ID

**OpenAI Configuration:**
- Model: o4-mini
- Response format: `{"type": "json_object"}`
- Max output tokens: 8,000
- Blog output format: HTML (uses `<h2>`, `<p>`, `<strong>`, `<ul>`, `<li>`, etc.)
- Prompt generates: blog draft (HTML), LinkedIn post, FAQ entry, LinkedIn hooks, SEO title, meta description, content pillar, core problem, hidden risk, strategic insight, objection handled

---

## Monday.com Boards

### AI Meeting Notes Tracker (ID: 18404381152)

**URL:** global-mobility-partners.monday.com/boards/18404381152

**Purpose:** Central hub for all meeting records from AI Notetaker. Team reviews meetings here and selects which ones should generate marketing content.

| Column | ID | Type | Purpose |
|--------|----|------|---------|
| Name | `name` | Text | Meeting name |
| Meeting Date | `date_mm1jdb0c` | Date | Date of meeting |
| Meeting Topic | `text_mm1jac9y` | Text | Topic/subject |
| Attendees | `multiple_person_mm1j3p79` | People | Meeting participants |
| Transcript | `long_text_mm1jwj6k` | Long Text | Full meeting transcript |
| Action Items | `text_mm1jcns5` | Text | Key action items |
| Content Type | `dropdown_mm1j5812` | Dropdown | Marketing, Support, Sales, Operations |
| Generate Content? | `color_mm1j6ejs` | Status | Yes / Complete / No |
| Status | `color_mm1j3rfh` | Status | Processing / Done / Error |
| Follow-up Status | `color_mm1jx2y8` | Status | In Progress / Completed / Blocked / Not Started |
| Priority | `color_mm1jaqsz` | Status | Priority level |
| Notes Attached | `file_mm1jxrdv` | File | Attached documents |

**Groups:**
- Completed Meetings (`group_mm1jjbk`)
- Archived Meetings (`group_mm1jvq74`)
- Upcoming Meetings (`topics`)

### Marketing Content Engine (ID: 18401797200)

**URL:** global-mobility-partners.monday.com/boards/18401797200

**Purpose:** Stores all generated marketing content. Each item represents one meeting's content output, ready for team review and publishing.

| Column | ID | Type | Content |
|--------|----|------|---------|
| Name | `name` | Text | Meeting/content name |
| Transcript Excerpt | `long_text_mm0y5paq` | Long Text | Source transcript |
| Blog Draft | `long_text_mm0yfxyy` | Long Text | Full blog post draft |
| LinkedIn Post | `long_text_mm0ygp2e` | Long Text | LinkedIn post copy |
| FAQ Entry | `long_text_mm0y9fs1` | Long Text | FAQ question & answer |
| LinkedIn Hooks | `long_text_mm0y6gaj` | Long Text | LinkedIn hook variations |
| Core Problem | `long_text_mm0y6akq` | Long Text | Core problem identified |
| Hidden Risk | `long_text_mm0y5wsy` | Long Text | Hidden risk angle |
| Strategic Insight | `long_text_mm0ytt6x` | Long Text | Strategic insight |
| Objection Handled | `long_text_mm0yyfr9` | Long Text | Objection handling angle |
| Content Pillar | `dropdown_mm0yart6` | Dropdown | Content category |
| SEO Title | `text_mm0ytyts` | Text | SEO-optimized title |
| Meta Description | `text_mm0ywtxh` | Text | SEO meta description |

**Groups:**
- Generated Content (`group_mm0yk2g7`)

---

## What Was Built

### Phase 1 Deliverables (Complete)

1. **AI Notetaker Integration**
   - Monday.com AI Notetaker configured for automatic meeting capture
   - Monday Workflow Builder automation ("Create AI Meeting Notes Item") connects Notetaker output to the Meetings board
   - Meeting transcript mapped as a dynamic field from the Notetaker trigger

2. **Meeting Board Sync Scenario (Make.com)**
   - Event-driven webhook trigger — fires instantly when "Generate Content?" is set to "Yes"
   - No polling or scheduled runs — fully reactive architecture
   - Automatically creates Content Engine items and copies transcript data
   - Calls content generation as a sub-scenario and waits for completion
   - Status tracking on Meetings board: Processing → Done on success, Error on failure

3. **Content Generation Scenario (Make.com)**
   - OpenAI-powered content generation using o4-mini model
   - Structured JSON output for reliable parsing
   - Generates 11 distinct content assets from a single transcript:
     - Blog Draft
     - LinkedIn Post
     - LinkedIn Hooks
     - FAQ Entry
     - SEO Title & Meta Description
     - Content Pillar classification
     - Core Problem, Hidden Risk, Strategic Insight, Objection Handled
   - All content written directly to Monday.com board columns (except Blog Draft)
   - Blog Draft posted as an HTML-formatted item update via `create_update` mutation (bypasses 2,000 character column limit)

4. **Monday.com Board Architecture**
   - AI Meeting Notes Tracker board — meeting intake and triage
   - Marketing Content Engine board — content output and review
   - Status tracking across both boards (Processing → Done/Error)

---

## Next Steps — Future Phases

### Phase 2: Publishing (Blog + LinkedIn)

**Objective:** Publish approved content directly from the Content Engine board.

- **Blog Publishing**
  - New Make scenario triggered by approval status on Content Engine board
  - Publishes Blog Draft column content to website CMS
  - Creates URL and links back to Monday item

- **LinkedIn Publishing**
  - New Make scenario (or module within blog scenario) for LinkedIn API
  - Publishes LinkedIn Post column content to company LinkedIn page
  - Posts can be scheduled or published immediately

- **Workflow:** Team reviews generated content on Content Engine board → approves → Make publishes to blog and LinkedIn automatically

### Phase 3: Image Generation

**Objective:** Auto-generate featured images for blog posts and LinkedIn posts.

- **Two separate image assets per content item:**
  - Blog featured image (landscape, optimized for web)
  - LinkedIn post image (square or portrait, optimized for feed)
- **Different sizes/formats** allow each platform's image to be tailored independently
- Images stored as file attachments on Content Engine board
- AI image generation (e.g., DALL-E or similar) based on content context
- Images included automatically when publishing in Phase 2

---

## Technical Reference

### Connection IDs (Make.com)

| Service | Connection ID |
|---------|--------------|
| Monday.com | 153017 |
| OpenAI | 4683909 |
| HTTP Auth (Make API) | apiKeyKeychain: 86399 |

### Key IDs

| Resource | ID |
|----------|-----|
| Content Generation Scenario | 4583539 |
| Meeting Board Sync Scenario | 4621460 |
| Meetings Board | 18404381152 |
| Content Engine Board | 18401797200 |
| Content Engine Group | group_mm0yk2g7 |
| Webhook | 2653062 |

### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `https://api.monday.com/v2` | Monday.com GraphQL API |
| `https://us1.make.com/api/v2/scenarios/{id}/run` | Trigger Make scenario |
| `https://us1.make.com/api/v2/scenarios/{id}/blueprint` | Read/update scenario blueprint |

---

*This document serves as the technical record for Phase 1 of the Marketing Content Engine. All automation runs within Monday.com and Make.com with no external hosting or dependencies.*
