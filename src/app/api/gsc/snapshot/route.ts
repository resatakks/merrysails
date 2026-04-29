import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEARCH_ANALYTICS_URL = (siteUrl: string) =>
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GSC_CLIENT_ID ?? "",
      client_secret: process.env.GSC_CLIENT_SECRET ?? "",
      refresh_token: process.env.GSC_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

async function queryGsc(accessToken: string, siteUrl: string, date: string, dimensions: string[]) {
  const res = await fetch(SEARCH_ANALYTICS_URL(siteUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: date,
      endDate: date,
      dimensions,
      rowLimit: 10,
      dataState: "all",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GSC query failed (${res.status}): ${err}`);
  }
  return res.json() as Promise<{ rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[] }>;
}

// GSC data has ~3 day lag — snapshot is for 3 days ago
function snapshotDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 3);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const siteUrl = process.env.GSC_SITE_URL ?? "sc-domain:merrysails.com";
  const date = snapshotDate();

  // Skip if already stored
  const existing = await prisma.gscSnapshot.findUnique({
    where: { date: new Date(date) },
  });
  if (existing) {
    return NextResponse.json({ skipped: true, date, message: "Already stored" });
  }

  const accessToken = await getAccessToken();

  // Fetch site-wide totals (no dimension)
  const totalsRes = await queryGsc(accessToken, siteUrl, date, ["query"]);
  const rows = totalsRes.rows ?? [];
  const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = rows.reduce((s, r) => s + r.impressions, 0);
  const totalCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const avgPosition = rows.length > 0
    ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / Math.max(totalImpressions, 1)
    : 0;

  // Top queries
  const topQueriesSorted = [...rows]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));

  // Top pages
  const pagesRes = await queryGsc(accessToken, siteUrl, date, ["page"]);
  const topPages = (pagesRes.rows ?? [])
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));

  const snapshot = await prisma.gscSnapshot.create({
    data: {
      date: new Date(date),
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalCtr,
      position: avgPosition,
      topPages,
      topQueries: topQueriesSorted,
    },
  });

  return NextResponse.json({ success: true, date, snapshot });
}

export const runtime = "nodejs";
export const maxDuration = 30;
