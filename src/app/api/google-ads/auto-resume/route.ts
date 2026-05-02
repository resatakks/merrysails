/**
 * GET /api/google-ads/auto-resume
 *
 * Daily auto-resume of campaigns that the safety-check route paused.
 * Runs once per day at midnight Turkey time (21:00 UTC) via Vercel cron.
 *
 * Strategy:
 * - Re-enable any campaign in CAMPAIGN_IDS_TO_KEEP_ACTIVE that is currently PAUSED.
 * - Send Telegram notification so the user knows.
 * - Idempotent: if a campaign is already ENABLED, it's a no-op.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";

// Campaigns that should always be active (re-enabled if safety-check paused them).
// Keep this list in sync with the campaigns you intentionally want serving.
const CAMPAIGN_IDS_TO_KEEP_ACTIVE = [
  "23790970534", // Search | EN | Dinner | Istanbul Presence
  "23786355995", // Search | EN | Sunset | Istanbul Presence
  "23781846453", // Search | EN | Generic Cruise | Istanbul Presence
  "23812825406", // Search | EN | Brand Defense | MerrySails
];

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

interface CampaignStatus {
  id: string;
  name: string;
  status: string;
}

async function fetchCampaignStatuses(
  creds: AdsCredentials,
  accessToken: string,
  ids: string[]
): Promise<CampaignStatus[]> {
  if (ids.length === 0) return [];
  const idList = ids.map((id) => `'${id}'`).join(",");
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/googleAds:search`;
  const res = await fetch(url, {
    method: "POST",
    headers: adsHeaders(creds, accessToken),
    body: JSON.stringify({
      query: `SELECT campaign.id, campaign.name, campaign.status FROM campaign WHERE campaign.id IN (${idList})`,
    }),
  });
  if (!res.ok) throw new Error(`Ads search failed: ${res.status} ${await res.text()}`);
  type Resp = { results?: Array<{ campaign?: { id?: string; name?: string; status?: string } }> };
  const body = (await res.json()) as Resp;
  return (body.results ?? []).map((r) => ({
    id: r.campaign?.id ?? "",
    name: r.campaign?.name ?? "",
    status: r.campaign?.status ?? "",
  }));
}

async function enableCampaigns(
  creds: AdsCredentials,
  accessToken: string,
  campaignIds: string[]
): Promise<void> {
  if (campaignIds.length === 0) return;
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${creds.customerId}/campaigns:mutate`;
  const operations = campaignIds.map((id) => ({
    update: {
      resourceName: `customers/${creds.customerId}/campaigns/${id}`,
      status: "ENABLED",
    },
    updateMask: "status",
  }));
  const res = await fetch(url, {
    method: "POST",
    headers: adsHeaders(creds, accessToken),
    body: JSON.stringify({ operations }),
  });
  if (!res.ok) throw new Error(`Enable failed: ${res.status} ${await res.text()}`);
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
  } catch {
    // Silent — telegram errors should not block the resume itself.
  }
}

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
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

  let statuses: CampaignStatus[];
  try {
    statuses = await fetchCampaignStatuses(creds, accessToken, CAMPAIGN_IDS_TO_KEEP_ACTIVE);
  } catch (err) {
    return NextResponse.json({ error: "ads_query_failed", details: String(err) }, { status: 502 });
  }

  const pausedToResume = statuses.filter((c) => c.status === "PAUSED");
  if (pausedToResume.length === 0) {
    return NextResponse.json({
      resumed: 0,
      message: "All target campaigns already ENABLED",
      checked: statuses.length,
    });
  }

  try {
    await enableCampaigns(
      creds,
      accessToken,
      pausedToResume.map((c) => c.id)
    );
  } catch (err) {
    await notifyTelegram(
      `🚨 AUTO-RESUME FAILED for ${pausedToResume.length} campaign(s): ${String(err).slice(0, 200)}`
    );
    return NextResponse.json({ error: "enable_failed", details: String(err) }, { status: 502 });
  }

  const lines = [
    `🟢 <b>Daily auto-resume — Google Ads</b>`,
    `Re-enabled ${pausedToResume.length} campaign(s):`,
    ...pausedToResume.map((c) => `• ${c.name}`),
  ];
  await notifyTelegram(lines.join("\n"));

  return NextResponse.json({
    resumed: pausedToResume.length,
    campaigns: pausedToResume.map((c) => ({ id: c.id, name: c.name })),
  });
}
