/**
 * GET /api/google-ads/budget-review?token=...
 *
 * Weekly budget pacing rule — runs via Vercel cron every Monday at 06:00 UTC.
 * Logic:
 *   - Fetch last 7 days of campaign performance
 *   - If at least MIN_CONVERSIONS in 7 days AND cost-per-conversion < MAX_CPA_TRY:
 *       → increase all ENABLED budgets by GROWTH_MULTIPLIER (default 1.20 = +20%)
 *   - If spend 7d > 0 but conversions = 0 AND spend > ZERO_CONV_THRESHOLD:
 *       → reduce budgets by 0.8 (−20%) to conserve budget until tracking is validated
 *   - Always sends Telegram summary
 *   - Hard ceiling: no single budget can exceed BUDGET_CEILING_TRY per day
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";
const GROWTH_MULTIPLIER = Number(process.env.ADS_WEEKLY_GROWTH_MULTIPLIER ?? "1.2");
const REDUCTION_MULTIPLIER = 0.8;
const MIN_CONVERSIONS = Number(process.env.ADS_MIN_WEEKLY_CONVERSIONS ?? "1");
const MAX_CPA_TRY = Number(process.env.ADS_MAX_CPA_TRY ?? "3500");
const ZERO_CONV_THRESHOLD_TRY = Number(process.env.ADS_ZERO_CONV_THRESHOLD ?? "500");
const BUDGET_CEILING_TRY = Number(process.env.ADS_BUDGET_CEILING_TRY ?? "800");

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

function readAdsCreds() {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  if (!customerId || !developerToken || !refreshToken || !clientId || !clientSecret) return null;
  return { customerId, developerToken, refreshToken, clientId, clientSecret };
}

async function getAccessToken(creds: NonNullable<ReturnType<typeof readAdsCreds>>): Promise<string> {
  const params = new URLSearchParams({
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
    refresh_token: creds.refreshToken,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`OAuth: ${res.status} — ${await res.text()}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("missing access_token");
  return data.access_token;
}

function headers(creds: NonNullable<ReturnType<typeof readAdsCreds>>, token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "developer-token": creds.developerToken,
    "Content-Type": "application/json",
  };
}

async function notifyTelegram(text: string): Promise<void> {
  if (!process.env.TELEGRAM_BOT_TOKEN) return;
  try {
    const { sendMessage } = await import("@/lib/telegram/bot");
    const { prisma } = await import("@/lib/db");
    const users = await prisma.telegramUser.findMany({
      where: { isActive: true, notifyNew: true },
      select: { chatId: true },
    });
    await Promise.all(
      users.map((u: { chatId: string }) =>
        sendMessage({ chat_id: u.chatId, text, parse_mode: "HTML" }).catch(() => null)
      )
    );
  } catch (err) {
    console.error("[budget-review] telegram failed:", err);
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readAdsCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_credentials" });

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  const searchUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:search`;

  // 1. Fetch 7-day aggregate + today's budget per campaign
  type Row = {
    campaign?: { id?: string; name?: string };
    metrics?: { costMicros?: string; conversions?: number };
    campaignBudget?: { resourceName?: string; amountMicros?: string };
  };

  const [sevenDayRes, budgetRes] = await Promise.all([
    fetch(searchUrl, {
      method: "POST",
      headers: headers(creds, token),
      body: JSON.stringify({
        query: `
          SELECT campaign.id, campaign.name,
                 metrics.cost_micros, metrics.conversions
          FROM campaign
          WHERE campaign.status = 'ENABLED'
            AND segments.date DURING LAST_7_DAYS
        `,
      }),
    }),
    fetch(searchUrl, {
      method: "POST",
      headers: headers(creds, token),
      body: JSON.stringify({
        query: `
          SELECT campaign.id, campaign.name,
                 campaign_budget.resource_name, campaign_budget.amount_micros
          FROM campaign
          WHERE campaign.status = 'ENABLED'
        `,
      }),
    }),
  ]);

  if (!sevenDayRes.ok || !budgetRes.ok) {
    const detail = !sevenDayRes.ok ? await sevenDayRes.text() : await budgetRes.text();
    return NextResponse.json({ error: "query_failed", details: detail }, { status: 502 });
  }

  const sevenDayBody = (await sevenDayRes.json()) as { results?: unknown[] };
  const budgetBody = (await budgetRes.json()) as { results?: unknown[] };

  // Aggregate 7-day metrics per campaign
  const metricsMap = new Map<string, { cost: number; conversions: number; name: string }>();
  for (const row of (sevenDayBody.results ?? []) as Row[]) {
    const id = row.campaign?.id ?? "";
    if (!id) continue;
    const existing = metricsMap.get(id);
    if (existing) {
      existing.cost += Number(row.metrics?.costMicros ?? 0) / 1_000_000;
      existing.conversions += Number(row.metrics?.conversions ?? 0);
    } else {
      metricsMap.set(id, {
        name: row.campaign?.name ?? "",
        cost: Number(row.metrics?.costMicros ?? 0) / 1_000_000,
        conversions: Number(row.metrics?.conversions ?? 0),
      });
    }
  }

  // Budget info — deduplicate shared budgets
  const budgetMap = new Map<string, { resourceName: string; currentMicros: number; campaignIds: string[]; campaignNames: string[] }>();
  for (const row of (budgetBody.results ?? []) as Row[]) {
    const rn = row.campaignBudget?.resourceName ?? "";
    const id = row.campaign?.id ?? "";
    if (!rn || !id) continue;
    const existing = budgetMap.get(rn);
    if (existing) {
      existing.campaignIds.push(id);
      existing.campaignNames.push(row.campaign?.name ?? "");
    } else {
      budgetMap.set(rn, {
        resourceName: rn,
        currentMicros: Number(row.campaignBudget?.amountMicros ?? 0),
        campaignIds: [id],
        campaignNames: [row.campaign?.name ?? ""],
      });
    }
  }

  // Decide action based on 7-day aggregates
  const totalCost7d = [...metricsMap.values()].reduce((s, m) => s + m.cost, 0);
  const totalConv7d = [...metricsMap.values()].reduce((s, m) => s + m.conversions, 0);
  const avgCpa = totalConv7d > 0 ? totalCost7d / totalConv7d : null;

  const shouldGrow =
    totalConv7d >= MIN_CONVERSIONS && avgCpa !== null && avgCpa < MAX_CPA_TRY;
  const shouldCut =
    totalConv7d === 0 && totalCost7d > ZERO_CONV_THRESHOLD_TRY;

  const multiplier = shouldGrow ? GROWTH_MULTIPLIER : shouldCut ? REDUCTION_MULTIPLIER : 1.0;
  const action = shouldGrow ? "grow" : shouldCut ? "cut" : "hold";

  const updates: Array<{ resourceName: string; oldTry: number; newTry: number; names: string[] }> = [];

  if (multiplier !== 1.0 && budgetMap.size > 0) {
    const operations = [...budgetMap.values()].map((b) => {
      const rawNew = b.currentMicros * multiplier;
      const ceilMicros = BUDGET_CEILING_TRY * 1_000_000;
      const newMicros = Math.min(Math.round(rawNew), ceilMicros);
      updates.push({
        resourceName: b.resourceName,
        oldTry: b.currentMicros / 1_000_000,
        newTry: newMicros / 1_000_000,
        names: b.campaignNames,
      });
      return {
        update: { resourceName: b.resourceName, amountMicros: String(newMicros) },
        updateMask: "amountMicros",
      };
    });

    const mutUrl = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaignBudgets:mutate`;
    const mutRes = await fetch(mutUrl, {
      method: "POST",
      headers: headers(creds, token),
      body: JSON.stringify({ operations }),
    });
    if (!mutRes.ok) {
      const errText = await mutRes.text();
      return NextResponse.json({ error: "mutate_failed", details: errText }, { status: 502 });
    }
  }

  const actionEmoji = { grow: "📈", hold: "⏸", cut: "📉" }[action];
  const lines = [
    `${actionEmoji} <b>Haftalık Ads Bütçe Değerlendirmesi</b>`,
    `7 günlük harcama: <b>₺${totalCost7d.toFixed(0)}</b> | Dönüşüm: <b>${totalConv7d.toFixed(1)}</b>`,
    avgCpa !== null ? `Ortalama CPA: ₺${avgCpa.toFixed(0)}` : "CPA: hesaplanamıyor (dönüşüm yok)",
    "",
    action === "grow" ? `✅ Bütçe +%${Math.round((GROWTH_MULTIPLIER - 1) * 100)} artırıldı` :
    action === "cut"  ? `⚠️ Dönüşüm yok, bütçe -%${Math.round((1 - REDUCTION_MULTIPLIER) * 100)} kısıldı` :
    "▶️ Bütçe sabit tutuldu (yeterli veri yok)",
    ...(updates.length > 0 ? [
      "",
      "Güncellemeler:",
      ...updates.map((u) => `• ${u.names.join("/")} ₺${u.oldTry.toFixed(0)} → ₺${u.newTry.toFixed(0)}/gün`),
    ] : []),
  ];
  await notifyTelegram(lines.join("\n"));

  return NextResponse.json({
    action,
    multiplier,
    totalCost7d: Math.round(totalCost7d),
    totalConv7d,
    avgCpa: avgCpa !== null ? Math.round(avgCpa) : null,
    updates,
  });
}
