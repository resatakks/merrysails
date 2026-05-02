import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateDisavowFile, type ToxicEntry, type RefDomain } from "@/lib/disavow";

const ALLOWED_DOMAINS = new Set(["merrysails.com", "merrytourism.com", "kingsworldtransfer.com"]);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const domain = url.searchParams.get("domain") || "";
  const token = url.searchParams.get("token") || "";

  if (process.env.CRON_SECRET && token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!ALLOWED_DOMAINS.has(domain)) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  const snap = await prisma.disavowSnapshot.findFirst({
    where: { domain },
    orderBy: { runAt: "desc" },
  });
  if (!snap) {
    return NextResponse.json({ error: "No snapshot yet — run /api/disavow/audit first" }, { status: 404 });
  }

  const audit = {
    domain,
    total: snap.totalRefdoms,
    toxic: snap.toxic as unknown as ToxicEntry[],
    review: (snap.review as unknown as RefDomain[]) ?? [],
  };
  const text = generateDisavowFile(audit, snap.runAt);

  return new NextResponse(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="disavow-${domain.replace(".", "-")}.txt"`,
      "Cache-Control": "no-store",
    },
  });
}

export const runtime = "nodejs";
