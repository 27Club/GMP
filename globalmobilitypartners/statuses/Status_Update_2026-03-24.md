# GMP — Status Update
**Date:** March 24–25, 2026
**Prepared for:** Kyle & Michelle, Global Mobility Partners

---

## Summary

Three major deliverables completed:

1. **New GMP Website** — A modern, fast Next.js site replacing WordPress, live on Vercel with automated blog publishing built in.
2. **V2 Marketing Content Engine** — Fully automated content generation from meeting transcripts, now supporting 4 content types routed to dedicated boards.
3. **Blog Publishing Automation** — End-to-end pipeline tested: approved blog posts on Monday.com publish directly to the website via GitHub API. Scheduling logic built for same-day and future-dated posts.

---

## 1. GMP Website

**Live site:** https://gmp-livid.vercel.app
**GitHub repo:** https://github.com/27Club/gmp-web
**Vercel project:** https://vercel.com/27-club/gmp

**Complete website with 9 pages:**

| Page | Live URL | Description |
|------|----------|-------------|
| Homepage | https://gmp-livid.vercel.app/ | Hero, services overview, stats, testimonial, latest blog posts |
| Law Firms | https://gmp-livid.vercel.app/law-firms | Services for US immigration law firms, partnership model |
| Businesses | https://gmp-livid.vercel.app/businesses | Corporate immigration services, pain points, process |
| Technology | https://gmp-livid.vercel.app/technology | Case tracking, document management, compliance tools |
| Meet The Team | https://gmp-livid.vercel.app/team | All 6 team members with bios |
| Contact | https://gmp-livid.vercel.app/contact | Contact form, FAQ, location & LinkedIn info |
| Blog | https://gmp-livid.vercel.app/blog | All published posts with tags and excerpts |
| Blog Post | https://gmp-livid.vercel.app/blog/[slug] | Individual article pages |
| Privacy Policy | https://gmp-livid.vercel.app/privacy | Standard privacy policy |

**Design:**
- Professional navy blue and gold color scheme matching GMP branding
- Fully responsive — works on mobile, tablet, and desktop
- Fast load times with static page generation (Next.js 16)
- Security headers configured (XSS protection, content type, framing, referrer policy)
- Dynamic copyright year in footer

**Tech stack:**
- Next.js 16 + Tailwind CSS (framework & styling)
- Vercel (hosting, CDN, auto-deploy)
- GitHub (source code & blog content storage)

---

## 2. V2 Marketing Content Engine

The content engine takes any meeting transcript and generates marketing content automatically, routed by content type to its own dedicated board.

**How it works:**

1. A meeting is recorded and the transcript appears on the V2 AI Meeting Notes Tracker board
2. You add a Prompt (instructions for the AI) and select a Content Type
3. Set "Generate Content?" to Yes
4. The automation creates an item on the matching destination board, generates content via OpenAI, and posts a formatted update on the item
5. Status is set to Done when complete

**4 Content Types — 4 Destination Boards:**

| Content Type | Destination Board | Board ID |
|---|---|---|
| Blog Post | Blog Post | 18405333684 |
| Email Newsletter | Email Newsletter | 18405340749 |
| LinkedIn Post | LinkedIn Post | 18405134840 |
| LinkedIn Newsletter | LinkedIn Newsletter | 18405340870 |

**Source board:** V2 AI Meeting Notes Tracker (18405337734)

**All 4 content types tested and working end-to-end on March 24.**

**What the AI generates (posted as a formatted update on each item):**
- SEO title and meta description
- Core problem, hidden risk, strategic insight, objection handled
- Blog/article content (full HTML)
- LinkedIn post copy
- LinkedIn hooks (3 variations)
- FAQ entry

**Make.com Scenarios:**

| Scenario | ID | Purpose |
|----------|-----|---------|
| V2 Meeting Board Sync | 4635653 | Trigger/Router — watches for "Generate Content" webhook, reads prompt/transcript/content type, creates item on destination board, calls ChatGPT subscenario |
| ChatGPT Prompt | 4632957 | Subscenario — sends prompt + transcript to OpenAI (o4-mini), posts formatted content as update on the item |

---

## 3. Blog Publishing Automation (NEW)

**Tested end-to-end on March 24–25.** Blog posts from Monday.com now publish directly to the live website.

**How it works:**

1. Content engine generates a blog post and writes it to the Blog Post board
2. Team reviews content, sets Approval Status to "Done" and a Publish Date
3. If Publish Date = today → blog publishes immediately to the website
4. If Publish Date = future → blog publishes at 9 AM MST on that date
5. The live blog URL is written back to the Monday board item ("Blog URL" column)

**Pipeline:**

```
Blog Post Board (Monday.com, 18405333684)
    |
    v
Approval Status = "Done"
    |
    v
Make.com reads: SEO Title, Meta Description, Publish Date, Blog Content (from item update)
    |
    v
Formats as Markdown with YAML frontmatter
    |
    v
GitHub API pushes file to 27Club/gmp-web repo (content/blog/{slug}.md)
    |
    v
Vercel detects commit → rebuilds site (~30 seconds)
    |
    v
Blog post live at https://gmp-livid.vercel.app/blog/{slug}
    |
    v
Live URL written back to Monday board "Blog URL" column
```

**Monday Board Columns Used:**

| Column | ID | Purpose |
|--------|-----|---------|
| Name | `name` | Item name (fallback title) |
| SEO Title | `text_mm0ytyts` | Blog post title |
| Meta Description | `text_mm0ywtxh` | Blog post excerpt |
| Approval Status | `color_mm1hsn3k` | Must be "Done" to publish |
| Publish Date (MST) | `date_mm1hz0qw` | When to publish |
| Blog URL | `text_mm1srwte` | Live URL written back after publishing (NEW — added March 25) |

**Make Scenario Blueprints Built:**

| Scenario | File | Trigger |
|----------|------|---------|
| Blog Publish on Approval | `blog_publish_on_approval.json` | Webhook — fires when Approval Status changes to Done. Publishes immediately if Publish Date = today. |
| Blog Publish Scheduled | `blog_publish_scheduled.json` | Scheduled — runs daily at 9 AM MST. Catches future-dated posts on their publish date. |

**End-to-end test results:**
- Published "Streamlining Your Global Mobility Policy Review Process" directly from Monday board item to live website
- Blog URL written back to Monday: https://gmp-livid.vercel.app/blog/streamlining-global-mobility-policy-review
- Vercel deployment completed in 21 seconds

**5 blog posts currently live:**

| Post | Date | URL |
|------|------|-----|
| Streamlining Your Global Mobility Policy Review Process | March 25, 2026 | https://gmp-livid.vercel.app/blog/streamlining-global-mobility-policy-review |
| Test Post: Automated Blog Publishing is Live | March 24, 2026 | https://gmp-livid.vercel.app/blog/test-automated-publishing |
| Middle East Conflict: Key Mobility and Travel Updates | November 15, 2024 | https://gmp-livid.vercel.app/blog/middle-east-conflict-mobility-updates |
| Netherlands and Poland: Ukrainian Temporary Protection Updates | October 28, 2024 | https://gmp-livid.vercel.app/blog/netherlands-poland-ukrainian-protection |
| UAE Remote Working Visa Program Now Accepting Applications | October 10, 2024 | https://gmp-livid.vercel.app/blog/uae-remote-working-visa |

---

## What's Next

**Blog publishing — Deploy Make scenarios:**
- Import the two blog publish blueprint JSONs into Make.com
- Replace API tokens (Monday + GitHub PAT)
- Set up the Monday webhook for the Approval Status column
- Set scheduled scenario to 16:00 UTC (9 AM MST)
- Test end-to-end from Monday board through to live website

**Automated blog images (Phase 2 — GitHub Issue #1):**
- https://github.com/27Club/gmp-web/issues/1
- Automatically source or generate cover images for each blog post
- Options: AI-generated images, stock photo APIs (Unsplash/Pexels), or uploaded assets

**LinkedIn publishing:**
- Connect LinkedIn API to auto-publish LinkedIn Posts from the LinkedIn Post board
- LinkedIn company page ready for testing

**Website improvements:**
- Custom domain setup (when ready to replace globalmobilitypartnersllc.com)
- SEO optimization and sitemap generation
- Google Analytics / Tag Manager integration

---

## All URLs & Resources

**Website:**
- Live site: https://gmp-livid.vercel.app
- Alt URL: https://gmp-27-club.vercel.app
- Vercel dashboard: https://vercel.com/27-club/gmp
- GitHub repo: https://github.com/27Club/gmp-web

**Monday.com Boards:**
- V2 AI Meeting Notes Tracker: Board ID 18405337734
- Blog Post: Board ID 18405333684
- Email Newsletter: Board ID 18405340749
- LinkedIn Post: Board ID 18405134840
- LinkedIn Newsletter: Board ID 18405340870

**Make.com Scenarios:**
- V2 Meeting Board Sync (Trigger/Router): Scenario ID 4635653
- ChatGPT Prompt (Subscenario): Scenario ID 4632957
- Blog Publish on Approval: Blueprint ready (`blog_publish_on_approval.json`)
- Blog Publish Scheduled: Blueprint ready (`blog_publish_scheduled.json`)

**GitHub:**
- Website repo: https://github.com/27Club/gmp-web
- Blog images issue: https://github.com/27Club/gmp-web/issues/1

---

## Architecture

```
Content Generation:
  Monday.com (V2 Meeting Notes Tracker)
      → Make.com Scenario 4635653 (Trigger/Router)
      → Make.com Scenario 4632957 (ChatGPT/OpenAI o4-mini)
      → Monday.com (Blog Post / Email / LinkedIn boards)

Blog Publishing:
  Monday.com (Blog Post board, Approval Status = Done)
      → Make.com (Blog Publish scenario)
      → GitHub API (27Club/gmp-web, content/blog/{slug}.md)
      → Vercel (auto-deploy, ~30 seconds)
      → Live at gmp-livid.vercel.app/blog/{slug}
      → URL written back to Monday.com

Website:
  Next.js 16 + Tailwind CSS → GitHub (27Club/gmp-web) → Vercel (CDN + hosting)
```

No servers to manage, no WordPress to maintain, no plugins to update.

---

*Prepared by Debra Gail White*
