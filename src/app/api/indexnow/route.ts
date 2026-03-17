import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, getAllSiteUrls } from "@/lib/indexnow";

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
    urls = await getAllSiteUrls();
  } else if (body.urls && Array.isArray(body.urls)) {
    urls = body.urls;
  } else {
    return NextResponse.json(
      { error: "Provide { urls: [...] } or { all: true }" },
      { status: 400 }
    );
  }

  const results = await submitToIndexNow(urls);

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
