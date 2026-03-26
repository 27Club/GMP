# GMP — Status Update
**Date:** March 25, 2026
**Prepared for:** Kyle & Michelle, Global Mobility Partners

---

## Summary

Two things completed today:

1. **All 4 content types working** — Blog Post, Email Newsletter, LinkedIn Post, and LinkedIn Newsletter all generate content end-to-end and route to their dedicated boards.
2. **LinkedIn publishing automation started** — Successfully posted to LinkedIn via API. Make.com scenario built to auto-publish from the LinkedIn Post board based on the Profile dropdown.

---

## 1. Content Engine — All 4 Content Types Working

Previously only LinkedIn Post was working. Today we fixed the remaining 3 content types:

| Content Type | Status | Destination Board |
|---|---|---|
| Blog Post | Working | Blog Post (18405333684) |
| Email Newsletter | Working | Email Newsletter (18405340749) |
| LinkedIn Post | Working | LinkedIn Post (18405134840) |
| LinkedIn Newsletter | Working | LinkedIn Newsletter (18405340870) |

**What was fixed:**
- The sub-scenario (ChatGPT Prompt) was trying to write board-specific columns on every run, even when the columns didn't exist on the target board
- Simplified the sub-scenario: removed column writes and router, now it just generates content via OpenAI and posts a formatted update on the item
- This works for all 4 boards without needing to know which board it's writing to

---

## 2. LinkedIn Publishing Automation

**Tested and working:** Posted to a personal LinkedIn page via the LinkedIn API.

**Make.com scenario:** Post to LinkedIn (ID: 4636002)
- Triggers when "Publish LinkedIn" status changes on the LinkedIn Post board
- Reads the LinkedIn Post content from the item
- Routes by Profile dropdown:
  - **Company Page** — needs Community Management API (application pending with client)
  - **Michelle** — ready, needs her OAuth token
  - **Parneet** — ready, needs her OAuth token

**LinkedIn developer app:** Client ID `78l9qt8sie9xus`
- Products: Share on LinkedIn + Sign In with LinkedIn (OpenID Connect)
- Scopes: `w_member_social`, `openid`, `profile`

**What's needed to finish:**
1. **Employee tokens** — Michelle and Parneet each do a 30-second OAuth authorization (screenshare or in-person)
2. **Company page posting** — requires a second LinkedIn app with only the Community Management API. LinkedIn requires a form submission and approval for this. Working on it with the client.

---

## What's Next

**LinkedIn — Get employee tokens:**
- Schedule 5 minutes with Michelle and Parneet
- They click a link, log in, click Allow — done
- Their personal LinkedIn pages will auto-publish from the LinkedIn Post board

**LinkedIn — Company page access:**
- Create a new LinkedIn app with only Community Management API
- Submit the application form (requires client involvement)
- Once approved, add company page route to the existing scenario

**LinkedIn Newsletter:**
- Separate scenario needed (different board, different content format)
- Also requires Community Management API for publishing articles

---

*Prepared by Debra Gail White*
