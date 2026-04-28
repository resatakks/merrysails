import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";
const SAFETY_DAILY_CAP_TRY = Number(process.env.GOOGLE_ADS_SAFETY_DAILY_CAP_TRY ?? "500");

interface AdsCredentials {
  customerId: string;
  developerToken: string;
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  loginCustomerId?: string;
}

function readAdsCreds(): AdsCredentials | null {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET?.trim();
  if (!customerId || !developerToken || !refreshToken || !clientId || !clientSecret) {
    return null;
  }
  return {
    customerId,
    developerToken,
    refreshToken,
    clientId,
    clientSecret,
    loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "").trim() || undefined,
  };
}

async function getAccessToken(creds: AdsCredentials): Promise<string> {
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
  if (!res.ok) throw new Error(`OAuth: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("OAuth: missing access_token");
  return data.access_token;
}

function adsHeaders(creds: AdsCredentials, accessToken: string): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": creds.developerToken,
    "Content-Type": "application/json",
  };
  if (creds.loginCustomerId) {
    headers["login-customer-id"] = creds.loginCustomerId;
  }
  return headers;
}

interface CampaignToday {
  campaignId: string;
  name: string;
  costToday: number;
  budgetToday: number;
}

async function fetchTodaysCampaignSpend(
  creds: AdsCredentials,
  accessToken: string
): Promise<CampaignToday[]> {
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:search`;
  const res = await fetch(url, {
    method: "POST",
    headers: adsHeaders(creds, accessToken),
    body: JSON.stringify({
      query: `
        SELECT
          campaign.id,
          campaign.name,
          metrics.cost_micros,
          campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status = 'ENABLED'
          AND segments.date DURING TODAY
      `,
    }),
  });
  if (!res.ok) {
    throw new Error(`Ads search failed: ${res.status} ${await res.text()}`);
  }
  type AdsSearchResponse = {
    results?: Array<{
      campaign?: { id?: string; name?: string };
      metrics?: { costMicros?: string };
      campaignBudget?: { amountMicros?: string };
    }>;
  };
  const body = (await res.json()) as AdsSearchResponse;
  return (body.results ?? []).map((row) => ({
    campaignId: row.campaign?.id ?? "",
    name: row.campaign?.name ?? "",
    costToday: Number(row.metrics?.costMicros ?? 0) / 1_000_000,
    budgetToday: Number(row.campaignBudget?.amountMicros ?? 0) / 1_000_000,
  }));
}

async function pauseCampaigns(
  creds: AdsCredentials,
  accessToken: string,
  campaignIds: string[]
): Promise<void> {
  if (campaignIds.length === 0) return;
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaigns:mutate`;
  const operations = campaignIds.map((id) => ({
    update: {
      resourceName: `customers/${creds.customerId}/campaigns/${id}`,
      status: "PAUSED",
    },
    updateMask: "status",
  }));
  const res = await fetch(url, {
    method: "POST",
    headers: adsHeaders(creds, accessToken),
    body: JSON.stringify({ operations }),
  });
  if (!res.ok) {
    throw new Error(`Pause failed: ${res.status} ${await res.text()}`);
  }
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
        sendMessage({ chat_id: u.chatId, text }).catch(() => null)
      )
    );
  } catch (err) {
    console.error("[safety-check] telegram notify failed:", err);
  }
}

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  // Vercel cron sends Authorization: Bearer <CRON_SECRET> automatically when set.
  // Allow url-param override for manual ops checks.
  const tokenParam = req.nextUrl.searchParams.get("token");
  return tokenParam === cronSecret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const creds = readAdsCreds();
  if (!creds) {
    return NextResponse.json({ skipped: "missing_credentials" });
  }

  let accessToken: string;
  try {
    accessToken = await getAccessToken(creds);
  } catch (err) {
    return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 });
  }

  let campaigns: CampaignToday[];
  try {
    campaigns = await fetchTodaysCampaignSpend(creds, accessToken);
  } catch (err) {
    return NextResponse.json({ error: "ads_query_failed", details: String(err) }, { status: 502 });
  }

  const totalSpendToday = campaigns.reduce((sum, c) => sum + c.costToday, 0);
  const totalBudgetToday = campaigns.reduce((sum, c) => sum + c.budgetToday, 0);
  const breached = totalSpendToday > SAFETY_DAILY_CAP_TRY;

  if (breached) {
    const ids = campaigns.map((c) => c.campaignId).filter(Boolean);
    try {
      await pauseCampaigns(creds, accessToken, ids);
    } catch (err) {
      await notifyTelegram(
        `🚨 GOOGLE ADS SAFETY CAP BREACHED ₺${totalSpendToday.toFixed(2)} but PAUSE FAILED: ${String(err).slice(0, 200)}`
      );
      return NextResponse.json({ error: "pause_failed", details: String(err) }, { status: 502 });
    }
    const lines = [
      `🚨 <b>GOOGLE ADS SAFETY CAP BREACHED</b>`,
      `Today's spend: <b>₺${totalSpendToday.toFixed(2)}</b> (cap ₺${SAFETY_DAILY_CAP_TRY})`,
      `Auto-paused ${ids.length} active campaign(s):`,
      ...campaigns.map((c) => `• ${c.name} — ₺${c.costToday.toFixed(2)} (budget ₺${c.budgetToday.toFixed(0)})`),
    ];
    await notifyTelegram(lines.join("\n"));
    return NextResponse.json({
      breached: true,
      paused: ids,
      totalSpendToday,
      cap: SAFETY_DAILY_CAP_TRY,
    });
  }

  return NextResponse.json({
    breached: false,
    activeCampaigns: campaigns.length,
    totalSpendToday,
    totalDailyBudget: totalBudgetToday,
    cap: SAFETY_DAILY_CAP_TRY,
  });
}
