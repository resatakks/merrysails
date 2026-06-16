/**
 * Daily cleanup of stale parse sessions + cost spike alert.
 * Scheduled via vercel.json cron at 04:00 Europe/Istanbul (01:00 UTC).
 *
 * 1. Deletes ParseSession rows older than 7 days (TTL is 24h, this is a
 *    backstop for any orphans).
 * 2. Deletes ParseLog rows older than 90 days (keeps recent audit/cost data).
 * 3. Sums today's spend; if > $1, sends a Telegram alert to active admins.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMessage } from "@/lib/telegram/bot";

const COST_SPIKE_THRESHOLD_USD = 1.0;

export async function GET(req: Request) {
  // Vercel cron sends `x-vercel-cron: 1`; reject manual hits unless an
  // admin Bearer matches the webhook secret.
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  const isAuthed = isVercelCron || (secret && auth === `Bearer ${secret}`);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── 1. Delete old sessions ──
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  const [sessionsDeleted, logsDeleted] = await Promise.all([
    prisma.parseSession.deleteMany({
      where: { createdAt: { lt: sevenDaysAgo } },
    }),
    prisma.parseLog.deleteMany({
      where: { createdAt: { lt: ninetyDaysAgo } },
    }),
  ]);

  // ── 2. Today's cost spike check ──
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const todaySum = await prisma.parseLog.aggregate({
    where: { createdAt: { gte: todayStart } },
    _sum: { costUsd: true },
    _count: { _all: true },
  });
  const todayUsd = todaySum._sum.costUsd ?? 0;
  const todayCount = todaySum._count._all;

  let alertSent = false;
  if (todayUsd > COST_SPIKE_THRESHOLD_USD) {
    const admins = await prisma.telegramUser.findMany({
      where: { isActive: true, notifyDaily: true },
    });
    for (const admin of admins) {
      await sendMessage({
        chat_id: admin.chatId,
        text: [
          `⚠️ <b>Parser maliyet uyarısı</b>`,
          ``,
          `Bugün şimdiye kadar: <b>$${todayUsd.toFixed(4)}</b> · ${todayCount} parse`,
          `Eşik: $${COST_SPIKE_THRESHOLD_USD.toFixed(2)}`,
          ``,
          `<i>Yüksek volume mü, yoksa bug mı? /yenis_son ile son parse'lara bak.</i>`,
        ].join("\n"),
      });
    }
    alertSent = admins.length > 0;
  }

  return NextResponse.json({
    ok: true,
    cleanup: {
      sessionsDeleted: sessionsDeleted.count,
      logsDeleted: logsDeleted.count,
    },
    today: {
      parses: todayCount,
      costUsd: todayUsd,
      alertSent,
    },
  });
}

export const runtime = "nodejs";
