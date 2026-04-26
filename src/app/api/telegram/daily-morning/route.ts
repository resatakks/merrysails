import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendDailyReport } from "@/lib/telegram/notifications";
import { formatMorningBriefing } from "@/lib/telegram/formatters";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const trNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const start = new Date(Date.UTC(trNow.getUTCFullYear(), trNow.getUTCMonth(), trNow.getUTCDate(), -3, 0, 0));
    const end = new Date(Date.UTC(trNow.getUTCFullYear(), trNow.getUTCMonth(), trNow.getUTCDate(), 20, 59, 59));

    const reservations = await prisma.reservation.findMany({
      where: { date: { gte: start, lte: end }, status: { not: "cancelled" } },
      orderBy: { date: "asc" },
    });

    const mapped = reservations.map((r: typeof reservations[number]) => ({ ...r, totalPrice: Number(r.totalPrice) }));
    const text = formatMorningBriefing(mapped);
    const result = await sendDailyReport(text);

    return NextResponse.json({ success: true, reservations: reservations.length, ...result });
  } catch (error) {
    console.error("[MERRYSAILS-MORNING] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
