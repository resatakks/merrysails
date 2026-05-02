import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auditDomain, diffToxic, type ToxicEntry } from "@/lib/disavow";
import { sendDailyReport } from "@/lib/telegram/notifications";

const TARGETS = ["merrysails.com", "merrytourism.com", "kingsworldtransfer.com"];

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const fromVercelCron = req.headers.get("user-agent")?.includes("vercel-cron");
    const tokenOk = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
    if (!tokenOk && !fromVercelCron) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const runAt = new Date();
    const reportLines: string[] = [`🛡️ <b>Disavow Audit — ${runAt.toISOString().slice(0, 10)}</b>`, ""];
    const summary: Record<string, { total: number; toxic: number; review: number; newToxic: number }> = {};

    for (const domain of TARGETS) {
      const audit = await auditDomain(domain);

      const prev = await prisma.disavowSnapshot.findFirst({
        where: { domain },
        orderBy: { runAt: "desc" },
        select: { toxic: true },
      });
      const prevToxic = (prev?.toxic as unknown as ToxicEntry[] | null) ?? null;
      const { added } = diffToxic(prevToxic, audit.toxic);

      await prisma.disavowSnapshot.create({
        data: {
          domain,
          runAt,
          totalRefdoms: audit.total,
          toxicCount: audit.toxic.length,
          reviewCount: audit.review.length,
          toxic: audit.toxic as unknown as object,
          review: audit.review as unknown as object,
        },
      });

      summary[domain] = {
        total: audit.total,
        toxic: audit.toxic.length,
        review: audit.review.length,
        newToxic: added.length,
      };

      reportLines.push(`<b>${domain}</b>`);
      reportLines.push(`  total refdoms: ${audit.total}`);
      reportLines.push(`  toxic: ${audit.toxic.length}  (review: ${audit.review.length})`);
      if (added.length > 0) {
        reportLines.push(`  🆕 yeni toxic (${added.length}):`);
        for (const a of added.slice(0, 8)) {
          reportLines.push(`    • ${a.domain} (spam:${a.spamScore})`);
        }
        if (added.length > 8) reportLines.push(`    … +${added.length - 8} daha`);
      } else {
        reportLines.push(`  ✅ yeni toxic yok`);
      }
      reportLines.push("");
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://merrysails.com";
    const fileToken = process.env.CRON_SECRET || "";
    reportLines.push(`📥 <b>Disavow dosyaları (GSC'ye yükle):</b>`);
    for (const domain of TARGETS) {
      reportLines.push(
        `  • ${domain}: ${baseUrl}/api/disavow/file?domain=${encodeURIComponent(domain)}&token=${fileToken}`,
      );
    }
    reportLines.push("");
    reportLines.push("ℹ️ GSC: https://search.google.com/search-console/disavow-links");

    await sendDailyReport(reportLines.join("\n")).catch((e) => {
      console.error("[DISAVOW-AUDIT] Telegram error:", e);
    });

    return NextResponse.json({ success: true, runAt, summary });
  } catch (error) {
    console.error("[DISAVOW-AUDIT] Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
