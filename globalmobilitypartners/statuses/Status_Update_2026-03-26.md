# GMP — Status Update
**Date:** March 26, 2026
**Prepared for:** Kyle & Michelle, Global Mobility Partners

---

## Summary

LinkedIn auto-publishing is now fully working end-to-end. When you set "Publish LinkedIn" to Yes on the LinkedIn Post board, it posts to Michelle's LinkedIn and updates the Status column.

---

## 1. LinkedIn Publishing — WORKING

**Flow:** Publish LinkedIn = Yes → Status = Processing → Post to LinkedIn → Status = Done

**What was fixed:**
- Make.com has a confirmed bug where it strips custom HTTP headers (like LinkedIn-Version) from HTTP modules deployed via API
- Switched from LinkedIn's `/rest/posts` API (requires LinkedIn-Version header) to `/v2/ugcPosts` API (no custom headers needed)
- Created fresh Make webhook to clear stale queue that was blocking execution
- Scenario 4636002 is valid, active, and processing correctly

**Current state:**
| Profile | Status |
|---|---|
| Michelle | Working — posts to her personal LinkedIn |
| Company Page | Pending — needs Community Management API approval |
| Parneet | Pending — needs OAuth token |

---

## 2. Content Formatting — Updated

Updated the ChatGPT Prompt sub-scenario (4638086) with formatting rules for LinkedIn posts:
- Line breaks between paragraphs
- Strong opening hook
- Short paragraphs (2-3 sentences)
- Numbered tips on separate lines
- Call to action at the end

Future content generated will be properly formatted for LinkedIn readability.

---

## What's Next

1. **Delete the test post** on Michelle's LinkedIn (wall-of-text post from today)
2. **Re-generate content** for the LinkedIn Post item to get properly formatted version
3. **Company page posting** — waiting on LinkedIn Community Management API approval
4. **Parneet's token** — OAuth flow when ready

---

*Prepared by Debra Gail White*
