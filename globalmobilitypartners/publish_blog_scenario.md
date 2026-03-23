# Publish Blog Post — Make.com Scenario Setup

## Prerequisites

1. **WordPress Application Password** — needed before activating
   - WordPress Admin → Users → Your Profile → Application Passwords
   - Create one named "Make Automation"
   - Save the username + generated password

2. **New column on Content Engine board** — "Publish Blog" (Status type)
   - Labels: `Ready to Publish` (index 0), `Published` (index 1), `Failed` (index 2)

3. **New column on Content Engine board** — "Blog URL" (Text type)
   - Stores the live URL after publishing

---

## Scenario: "Publish Blog Post"

### Create in Make

1. Go to Make → Create a new scenario
2. Name it: **"Publish Blog Post"**

### Module 1: Monday Webhook (Trigger)

- **Type:** `monday:watchBoardColumnValuesV2`
- **Board:** Marketing Content Engine (18401797200)
- **Column:** "Publish Blog" (the new status column)
- This fires when someone sets "Publish Blog" to "Ready to Publish"

### Module 2: Monday — Get Item Column Values

- **Type:** `monday:GetItemsByColumnValues` or HTTP Request
- **Purpose:** Read the content needed for the blog post
- **Board ID:** 18401797200
- **Item ID:** `{{1.pulseId}}`
- **Columns to read:**
  - `text_mm0ytyts` — SEO Title (used as blog post title)
  - `text_mm0ywtxh` — Meta Description (used as excerpt)
  - `long_text_mm0yfxyy` — Blog Draft (used as post content)
  - `dropdown_mm0yart6` — Content Pillar (used for category)

**HTTP Request version (if using raw API):**
```json
{
  "url": "https://api.monday.com/v2",
  "method": "POST",
  "headers": {
    "Authorization": "{{MONDAY_TOKEN}}",
    "Content-Type": "application/json"
  },
  "body": {
    "query": "{ items(ids: [{{1.pulseId}}]) { name column_values(ids: [\"text_mm0ytyts\", \"text_mm0ywtxh\", \"long_text_mm0yfxyy\", \"dropdown_mm0yart6\"]) { id text } } }"
  }
}
```

### Module 3: HTTP Request — Create WordPress Post

- **Type:** `http:MakeRequest`
- **URL:** `https://www.globalmobilitypartnersllc.com/wp-json/wp/v2/posts`
- **Method:** POST
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Basic {{base64(username:application_password)}}`
- **Body (JSON):**
```json
{
  "title": "{{2.data.data.items[].column_values[text_mm0ytyts].text}}",
  "content": "{{2.data.data.items[].column_values[long_text_mm0yfxyy].text}}",
  "excerpt": "{{2.data.data.items[].column_values[text_mm0ywtxh].text}}",
  "status": "draft"
}
```

**Notes:**
- `status: "draft"` creates as draft so someone can review before making it live
- Change to `"publish"` if you want it to go live immediately
- The response returns the post `id` and `link` (the live URL)

### Module 4: Monday — Update Column Values (Success)

- **Type:** `monday:ChangeMultipleColumnValuesV2`
- **Board ID:** 18401797200
- **Item ID:** `{{1.pulseId}}`
- **Updates:**
  - "Publish Blog" status → `Published`
  - "Blog URL" text → `{{3.data.link}}` (the WordPress post URL from Module 3)

### Error Handler on Module 3

- **Type:** `monday:ChangeMultipleColumnValuesV2`
- **Board ID:** 18401797200
- **Item ID:** `{{1.pulseId}}`
- **Updates:**
  - "Publish Blog" status → `Failed`

---

## Step-by-Step Build Instructions

### Step 1: Add columns to Content Engine board

In Monday.com on the Marketing Content Engine board:

1. Add a **Status** column named **"Publish Blog"**
   - Label 0: "Ready to Publish" (color: blue or your preference)
   - Label 1: "Published" (color: green)
   - Label 2: "Failed" (color: red)

2. Add a **Text** column named **"Blog URL"**

### Step 2: Create the scenario in Make

1. **New Scenario** → name it "Publish Blog Post"

2. **Add Module 1** — Monday.com: Watch Column Values
   - Board: Marketing Content Engine
   - Column: Publish Blog
   - Save and run once to register the webhook

3. **Add Module 2** — HTTP: Make a Request
   - URL: `https://api.monday.com/v2`
   - Method: POST
   - Headers: `Authorization` = your Monday token, `Content-Type` = `application/json`
   - Body type: Raw → JSON
   - Body: `{"query": "{ items(ids: [{{1.pulseId}}]) { name column_values(ids: [\"text_mm0ytyts\", \"text_mm0ywtxh\", \"long_text_mm0yfxyy\"]) { id text } } }"}`

4. **Add Module 3** — HTTP: Make a Request
   - URL: `https://www.globalmobilitypartnersllc.com/wp-json/wp/v2/posts`
   - Method: POST
   - Headers:
     - `Content-Type` = `application/json`
     - `Authorization` = `Basic [base64 encoded username:app_password]`
   - Body type: Raw → JSON
   - Body:
     ```
     {
       "title": "{{mapped SEO Title from Module 2}}",
       "content": "{{mapped Blog Draft from Module 2}}",
       "excerpt": "{{mapped Meta Description from Module 2}}",
       "status": "draft"
     }
     ```
   - **Tip:** In Make, use the `base64()` function for the auth header, or use Make's built-in HTTP Basic Auth under the credentials section

5. **Add Module 4** — Monday.com: Change Multiple Column Values
   - Board: Marketing Content Engine (18401797200)
   - Item ID: `{{1.pulseId}}`
   - Publish Blog: Published
   - Blog URL: `{{3.data.link}}`

6. **Add Error Handler** on Module 3
   - Monday.com: Change Multiple Column Values
   - Board: Marketing Content Engine (18401797200)
   - Item ID: `{{1.pulseId}}`
   - Publish Blog: Failed

### Step 3: WordPress Application Password

1. Log into WordPress admin: `www.globalmobilitypartnersllc.com/wp-admin`
2. Go to **Users → Profile**
3. Scroll to **Application Passwords**
4. Enter name: `Make Automation`
5. Click **Add New Application Password**
6. Copy the generated password (shown only once)
7. In Make Module 3, set the Authorization header:
   - Format: `Basic base64(username:password)`
   - Or use Make's HTTP Basic Auth credential field with username + app password

### Step 4: Test

1. Pick an existing Content Engine item with blog content
2. Set "Publish Blog" to "Ready to Publish"
3. Check Make execution history
4. Verify draft appears in WordPress admin → Posts
5. Verify "Published" status and Blog URL updated on Monday board

---

## WordPress Post Format Notes

- Posts are created as **drafts** by default — team can review in WordPress before publishing
- To auto-publish, change `"status": "draft"` to `"status": "publish"` in Module 3
- The Blog Draft content from Monday is plain text — WordPress will wrap it in paragraphs automatically
- If you want HTML formatting (headings, lists, etc.), update the OpenAI prompt in scenario 4583539 to output HTML-formatted blog content
