/**
 * GET /api/seo/test?token=...
 * Smoke-test: balance + 3 SERP + backlinks + LLM mentions (1 query)
 */
import { NextRequest, NextResponse } from "next/server";
import { checkRankings, getBacklinkSummary, checkLlmMentions, getBalance } from "@/lib/dataforseo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get("token") === secret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // 1. Balance
  try { results.balance = await getBalance(); }
  catch (err) { results.balance = { error: String(err) }; }

  // 2. SERP — TR
  try {
    results.serp_tr = await checkRankings(
      "merrysails.com",
      ["kiralık yat istanbul", "istanbul yat turu"],
      2792, "tr"
    );
  } catch (err) { results.serp_tr = { error: String(err) }; }

  // 3. SERP — EN
  try {
    results.serp_en = await checkRankings(
      "merrysails.com",
      ["yacht charter istanbul"],
      2792, "en"
    );
  } catch (err) { results.serp_en = { error: String(err) }; }

  // 4. Backlinks
  try { results.backlinks = await getBacklinkSummary("merrysails.com"); }
  catch (err) { results.backlinks = { error: String(err) }; }

  // 5. LLM Mentions (1 query — minimal cost)
  try {
    results.llm = await checkLlmMentions(
      "merrysails",
      ["best yacht charter company in Istanbul"]
    );
  } catch (err) { results.llm = { error: String(err) }; }

  return NextResponse.json({
    ok: true,
    domain: "merrysails.com",
    testedAt: new Date().toISOString(),
    ...results,
  });
}
