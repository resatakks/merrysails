import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data/blog";
import { tours } from "@/data/tours";
import { guides } from "@/data/guides";

const SITE_URL = "https://merrysails.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "merrysails-indexnow-key";

/**
 * POST /api/indexnow
 * Submit URLs to IndexNow (Bing, Yandex, etc.) for instant indexing.
 *
 * Body options:
 *   { "urls": ["https://merrysails.com/blog/my-post"] }  — submit specific URLs
 *   { "all": true }  — submit all site URLs
 *
 * Auth: Requires INDEXNOW_SECRET env var to match Authorization header.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json().catch(() => ({}));

  let urls: string[] = [];

  if (body.all) {
    // Submit all site URLs
    const staticUrls = [
      SITE_URL,
      `${SITE_URL}/cruises`,
      `${SITE_URL}/private-tours`,
      `${SITE_URL}/blog`,
      `${SITE_URL}/guides`,
      `${SITE_URL}/about`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/faq`,
    ];
    const tourUrls = tours.map((t) => `${SITE_URL}/cruises/${t.slug}`);
    const blogUrls = blogPosts.map((p) => `${SITE_URL}/blog/${p.slug}`);
    const guideUrls = guides.map((g) => `${SITE_URL}/guides/${g.slug}`);
    urls = [...staticUrls, ...tourUrls, ...blogUrls, ...guideUrls];
  } else if (body.urls && Array.isArray(body.urls)) {
    urls = body.urls;
  } else {
    return NextResponse.json(
      { error: "Provide { urls: [...] } or { all: true }" },
      { status: 400 }
    );
  }

  // IndexNow API allows max 10,000 URLs per request
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }

  const results = [];

  for (const batch of batches) {
    const payload = {
      host: "merrysails.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    };

    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      results.push({
        submitted: batch.length,
        status: res.status,
        ok: res.status === 200 || res.status === 202,
      });
    } catch (error) {
      results.push({
        submitted: batch.length,
        status: 0,
        ok: false,
        error: String(error),
      });
    }
  }

  return NextResponse.json({
    totalUrls: urls.length,
    results,
    timestamp: new Date().toISOString(),
  });
}

/**
 * GET /api/indexnow
 * Returns the IndexNow key for verification.
 * Also serves as the key verification endpoint if keyLocation points here.
 */
export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: { "Content-Type": "text/plain" },
  });
}
