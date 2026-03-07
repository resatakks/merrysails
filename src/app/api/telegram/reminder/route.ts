import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyReminder } from "@/lib/telegram/notifications";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Turkey UTC+3
    const now = new Date();
    const trNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    // Window: 1h45m to 2h45m from now (matches hourly cron)
    const windowStart = new Date(now.getTime() + 105 * 60 * 1000);
    const windowEnd = new Date(now.getTime() + 165 * 60 * 1000);

    // Today's date boundaries
    const dayStart = new Date(Date.UTC(trNow.getUTCFullYear(), trNow.getUTCMonth(), trNow.getUTCDate(), -3, 0, 0));
    const dayEnd = new Date(Date.UTC(trNow.getUTCFullYear(), trNow.getUTCMonth(), trNow.getUTCDate(), 20, 59, 59));

    const reservations = await prisma.reservation.findMany({
      where: {
        date: { gte: dayStart, lte: dayEnd },
        status: { notIn: ["cancelled", "completed"] },
      },
    });

    // Filter by tour time within the 2-hour window
    // Combine date + time to get actual datetime
    const toRemind = reservations.filter((r: typeof reservations[number]) => {
      const [hours, minutes] = r.time.split(":").map(Number);
      const tourDate = new Date(r.date);
      tourDate.setUTCHours(hours - 3, minutes, 0, 0); // Convert Turkey time to UTC
      return tourDate >= windowStart && tourDate < windowEnd;
    });

    let sent = 0;
    for (const r of toRemind) {
      await notifyReminder({ ...r, totalPrice: Number(r.totalPrice) });
      sent++;
    }

    return NextResponse.json({ success: true, checked: reservations.length, reminded: sent });
  } catch (error) {
    console.error("[MERRYSAILS-REMINDER] Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 30;
