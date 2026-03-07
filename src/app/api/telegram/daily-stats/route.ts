import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendDailyReport } from "@/lib/telegram/notifications";
import { formatDailyStats } from "@/lib/telegram/formatters";

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
      where: { date: { gte: start, lte: end } },
      select: { status: true, totalPrice: true, tourName: true },
    });

    type ReservationRow = typeof reservations[number];
    const active = reservations.filter((r: ReservationRow) => r.status !== "cancelled");
    const revenue = active.reduce((s: number, r: ReservationRow) => s + (r.totalPrice || 0), 0);

    const tourCounts: Record<string, number> = {};
    for (const r of active) {
      tourCounts[r.tourName] = (tourCounts[r.tourName] || 0) + 1;
    }
    const topTours = Object.entries(tourCounts).map(([tour, count]) => ({ tour, count })).sort((a, b) => b.count - a.count);

    const text = formatDailyStats({
      total: reservations.length,
      completed: reservations.filter((r: ReservationRow) => r.status === "completed").length,
      cancelled: reservations.filter((r: ReservationRow) => r.status === "cancelled").length,
      newCount: reservations.filter((r: ReservationRow) => r.status === "pending").length,
      revenue,
      currency: "€",
      topTours,
    });

    const result = await sendDailyReport(text);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[MERRYSAILS-STATS] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 30;
