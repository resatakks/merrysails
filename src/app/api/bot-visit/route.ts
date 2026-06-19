import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// No caching — this is a write endpoint
export const dynamic = "force-dynamic";

interface BotVisitPayload {
  provider: string;
  agent: string;
  path: string;
  userAgent?: string;
  ip?: string;
  country?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BotVisitPayload;

    if (!body.provider || !body.agent || !body.path) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    // Compute optimization (2026-06-19): bot visits are no longer written to
    // Neon. Per-request writes kept the DB awake 24/7 for crawler logging
    // (crawlers, not customers). Log to Vercel runtime logs instead — free,
    // ephemeral, and never wakes the database.
    console.log(
      "[BOT-VISIT]",
      JSON.stringify({
        provider: body.provider.slice(0, 64),
        agent: body.agent.slice(0, 128),
        path: body.path.slice(0, 512),
        country: body.country ?? null,
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silent fail — bot tracking should never break the site
    console.error("[BOT-VISIT]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
