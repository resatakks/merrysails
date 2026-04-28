import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    await prisma.botVisit.create({
      data: {
        provider: body.provider.slice(0, 64),
        agent: body.agent.slice(0, 128),
        path: body.path.slice(0, 512),
        userAgent: body.userAgent ?? null,
        ip: body.ip ?? null,
        country: body.country ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silent fail — bot tracking should never break the site
    console.error("[BOT-VISIT]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
