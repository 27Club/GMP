import { NextRequest, NextResponse } from "next/server";

const MONDAY_API_URL = "https://api.monday.com/v2";
const GITHUB_API_URL = "https://api.github.com/repos/27Club/gmp-web/contents";
const BLOG_BOARD_ID = "18405333684";
const BLOG_URL_COLUMN = "text_mm1srwte";
const SITE_URL = process.env.SITE_URL || "https://gmp-livid.vercel.app";

// Column IDs on the Blog Post board
const COLUMNS = {
  seoTitle: "text_mm0ytyts",
  metaDescription: "text_mm0ywtxh",
  approvalStatus: "color_mm1hsn3k",
  publishDate: "date_mm1hz0qw",
  blogUrl: BLOG_URL_COLUMN,
};

interface MondayItem {
  id: string;
  name: string;
  column_values: { id: string; text: string | null }[];
  updates: { text_body: string }[];
}

function getColumnValue(item: MondayItem, columnId: string): string {
  const col = item.column_values.find((c) => c.id === columnId);
  return col?.text || "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function mondayQuery(query: string) {
  const res = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      Authorization: process.env.MONDAY_API_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

async function readItem(itemId: string): Promise<MondayItem | null> {
  const columnIds = Object.values(COLUMNS).map((id) => `"${id}"`).join(", ");
  const data = await mondayQuery(
    `{ items(ids: [${itemId}]) { id name column_values(ids: [${columnIds}]) { id text } updates(limit: 1) { text_body } } }`
  );
  return data?.data?.items?.[0] || null;
}

async function readApprovedItemsForToday(): Promise<MondayItem[]> {
  const columnIds = Object.values(COLUMNS).map((id) => `"${id}"`).join(", ");
  const data = await mondayQuery(
    `{ boards(ids: [${BLOG_BOARD_ID}]) { items_page(limit: 100) { items { id name column_values(ids: [${columnIds}]) { id text } updates(limit: 1) { text_body } } } } }`
  );
  const items: MondayItem[] =
    data?.data?.boards?.[0]?.items_page?.items || [];
  const today = new Date().toISOString().split("T")[0];

  return items.filter((item) => {
    const approval = getColumnValue(item, COLUMNS.approvalStatus);
    const publishDate = getColumnValue(item, COLUMNS.publishDate);
    const blogUrl = getColumnValue(item, COLUMNS.blogUrl);
    return approval === "Done" && publishDate === today && !blogUrl;
  });
}

async function publishItem(item: MondayItem): Promise<{ slug: string; url: string }> {
  const seoTitle = getColumnValue(item, COLUMNS.seoTitle) || item.name;
  const metaDesc =
    getColumnValue(item, COLUMNS.metaDescription) ||
    "Global immigration insights from Global Mobility Partners.";
  const blogContent = item.updates?.[0]?.text_body || "";

  if (!blogContent) {
    throw new Error(`Item ${item.id} has no blog content in updates`);
  }

  const slug = slugify(seoTitle);
  const today = new Date().toISOString().split("T")[0];

  // Build markdown with frontmatter
  const markdown = `---
title: "${seoTitle.replace(/"/g, "'")}"
date: ${today}
excerpt: "${metaDesc.replace(/"/g, "'")}"
author: Global Mobility Partners
tags: [Global Mobility, Immigration]
---

${blogContent}`;

  // Base64 encode
  const encoded = Buffer.from(markdown).toString("base64");

  // Push to GitHub
  const ghRes = await fetch(
    `${GITHUB_API_URL}/content/blog/${slug}.md`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        Accept: "application/vnd.github+v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `blog: publish ${seoTitle}`,
        content: encoded,
        branch: "main",
      }),
    }
  );

  if (!ghRes.ok) {
    const err = await ghRes.json();
    throw new Error(`GitHub API error: ${err.message}`);
  }

  const blogUrl = `${SITE_URL}/blog/${slug}`;

  // Write URL back to Monday
  await mondayQuery(
    `mutation { change_column_value(board_id: ${BLOG_BOARD_ID}, item_id: ${item.id}, column_id: "${BLOG_URL_COLUMN}", value: "\\"${blogUrl}\\"") { id } }`
  );

  return { slug, url: blogUrl };
}

// POST /api/publish — publish a blog post
// Accepts: Monday.com webhook, Make HTTP call, or direct API call
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Monday.com webhook challenge/verification
    if (body.challenge) {
      return NextResponse.json({ challenge: body.challenge });
    }

    // Determine item ID from different payload formats
    let itemId: string | undefined;

    // Monday.com webhook format
    if (body.event?.pulseId) {
      // Only process Approval Status column changes to "Done"
      if (body.event.columnId === COLUMNS.approvalStatus) {
        const label = body.event.value?.label?.text;
        if (label !== "Done") {
          return NextResponse.json({ message: "Ignored — not Done" });
        }
      }
      itemId = String(body.event.pulseId);
    }
    // Direct API call format (from Make or manual)
    else {
      const apiKey = request.headers.get("x-api-key");
      if (apiKey !== process.env.PUBLISH_API_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      itemId = body.itemId || body.item_id;
    }

    if (!itemId) {
      return NextResponse.json(
        { error: "itemId is required" },
        { status: 400 }
      );
    }

    const item = await readItem(itemId);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const approval = getColumnValue(item, COLUMNS.approvalStatus);
    if (approval !== "Done") {
      return NextResponse.json(
        { error: "Item not approved", status: approval },
        { status: 422 }
      );
    }

    const existingUrl = getColumnValue(item, COLUMNS.blogUrl);
    if (existingUrl) {
      return NextResponse.json(
        { message: "Already published", url: existingUrl },
        { status: 200 }
      );
    }

    const result = await publishItem(item);
    return NextResponse.json({
      message: "Published",
      ...result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/publish — publish all approved items with today's publish date
// Called by Vercel cron at 9 AM MST daily
export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key") ||
    request.nextUrl.searchParams.get("key");
  if (apiKey !== process.env.PUBLISH_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await readApprovedItemsForToday();

    if (items.length === 0) {
      return NextResponse.json({
        message: "No posts to publish today",
        published: [],
      });
    }

    const results = [];
    for (const item of items) {
      try {
        const result = await publishItem(item);
        results.push({ itemId: item.id, ...result });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        results.push({ itemId: item.id, error: message });
      }
    }

    return NextResponse.json({
      message: `Processed ${results.length} posts`,
      published: results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
