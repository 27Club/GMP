# Product Requirements Document
# Phase 2: Blog Publishing Automation

**Client:** Global Mobility Partners
**Prepared by:** Debra Gail White
**Date:** March 19, 2026
**Version:** 1.0

---

## Overview

Phase 1 of the Marketing Content Engine is complete — meetings are automatically captured, and marketing content (blog drafts, LinkedIn posts, FAQs, SEO metadata) is generated from meeting transcripts with a single click on the Monday.com board.

Phase 2 extends the pipeline to **publish approved blog content directly to the Global Mobility Partners website** from the Content Engine board — no need to copy/paste into WordPress.

---

## Problem Statement

Today, after content is generated on the Content Engine board, a team member must:

1. Copy the blog draft from Monday.com
2. Log into WordPress
3. Create a new post manually
4. Paste the title, content, and meta description
5. Publish or schedule the post
6. Return to Monday.com to note the blog URL

This manual process is time-consuming, error-prone, and creates a gap between content generation and publishing.

---

## Proposed Solution

Add a **one-click blog publishing workflow** to the existing Content Engine board:

1. Team member reviews the generated blog draft on the Content Engine board
2. Team member sets the **"Publish Blog"** column to **"Ready to Publish"**
3. The system automatically:
   - Reads the blog draft, SEO title, and meta description from the board
   - Creates a post on the WordPress website
   - Writes the live blog URL back to the Monday.com board
   - Updates the publish status to **"Published"**
4. If publishing fails, the status is set to **"Failed"** so the team knows to investigate

---

## User Experience

### New Columns on Content Engine Board

| Column | Type | Values |
|--------|------|--------|
| Publish Blog | Status | Ready to Publish / Published / Failed |
| Blog URL | Text | Auto-populated with the live post URL after publishing |

### Workflow

```
Team reviews generated blog draft on Content Engine board
    │
    ▼
Sets "Publish Blog" → "Ready to Publish"
    │
    ▼
Blog post automatically created on WordPress
    │
    ▼
"Publish Blog" updated to "Published"
"Blog URL" populated with live link
```

### Draft vs. Live Publishing

Posts will be created as **WordPress drafts** by default. This allows a final review in WordPress (formatting, images, categories) before the post goes live. This behavior can be changed to auto-publish if the team prefers to skip the WordPress review step.

---

## Content Mapping

The following Content Engine board fields map to WordPress post fields:

| Monday.com Column | WordPress Field | Notes |
|-------------------|----------------|-------|
| SEO Title | Post Title | Optimized for search |
| Blog Draft | Post Content | Full blog body text |
| Meta Description | Post Excerpt | Used by SEO plugins (e.g., Yoast) |
| Content Pillar | Category | Optional — can map to WordPress categories |

---

## Technical Approach

- **Platform:** Make.com (new scenario, consistent with existing automation)
- **Trigger:** Event-driven webhook on the Content Engine board — fires when "Publish Blog" column changes
- **Publishing:** WordPress REST API (`/wp-json/wp/v2/posts`)
- **Authentication:** WordPress Application Password (secure, no plugin required, built into WordPress)
- **Status tracking:** Publish status and blog URL written back to Monday.com automatically
- **Error handling:** Failed publishes are flagged on the board for team visibility

No new tools, platforms, or hosting are required. This builds directly on the existing Monday.com + Make.com infrastructure from Phase 1.

---

## Requirements from Client

| Item | Details |
|------|---------|
| WordPress admin access | Needed to create an Application Password for the automation |
| Preferred post status | Draft (default) or auto-publish live? |
| WordPress categories | Should Content Pillar map to specific WordPress categories? If so, provide the category names |
| Author | Which WordPress user should posts be authored by? |

---

## Timeline

| Milestone | Estimate |
|-----------|----------|
| WordPress credentials provided | Waiting on client |
| Scenario build + configuration | Same day as credentials received |
| Testing with draft post | Same day |
| Go-live | Upon client approval of test post |

---

## Future Phases

| Phase | Feature |
|-------|---------|
| Phase 2b | LinkedIn post publishing from Content Engine board |
| Phase 3 | AI-generated featured images (separate blog + LinkedIn sizes) |

---

*This document proposes the Phase 2 blog publishing extension to the Marketing Content Engine. All automation will run within the existing Monday.com and Make.com infrastructure with no additional tools or hosting.*
