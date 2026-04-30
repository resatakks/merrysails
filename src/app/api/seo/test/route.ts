/**
 * GET /api/seo/test?token=...
 * Quick smoke-test for DataForSEO integration.
 * Tests: balance check + 3 keyword rank checks for merrysails.com
 */
import { NextRequest, NextResponse } from "next/server";
import { checkRankings, getBalance } from "@/lib/dataforseo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get("token") === secret;
}

// Test keywords — TR + EN
const TEST_KEYWORDS = [
  "kiralık yat istanbul",
  "istanbul yat turu",
  "yacht charter istanbul",
];

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // 1. Balance check
  try {
    results.balance = await getBalance();
  } catch (err) {
    results.balance = { error: String(err) };
  }

  // 2. SERP rank check — TR keywords
  try {
    const trRankings = await checkRankings("merrysails.com", TEST_KEYWORDS.slice(0, 2), 2792, "tr");
    results.serp_tr = trRankings;
  } catch (err) {
    results.serp_tr = { error: String(err) };
  }

  // 3. SERP rank check — EN keyword
  try {
    const enRankings = await checkRankings("merrysails.com", TEST_KEYWORDS.slice(2), 2792, "en");
    results.serp_en = enRankings;
  } catch (err) {
    results.serp_en = { error: String(err) };
  }

  return NextResponse.json({
    ok: true,
    domain: "merrysails.com",
    testedAt: new Date().toISOString(),
    ...results,
  });
}
