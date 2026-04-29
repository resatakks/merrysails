/**
 * GET /api/gsc/performance?token=...&days=28&type=queries|pages|countries|devices
 *
 * Fetches Google Search Console performance data.
 * Returns top 25 rows + 28-day summary with WoW/period comparison.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GSC_BASE = "https://searchconsole.googleapis.com/webmasters/v3";

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

function readGscCreds() {
  const siteUrl = process.env.GSC_SITE_URL?.trim();
  const clientId = process.env.GSC_CLIENT_ID?.trim();
  const clientSecret = process.env.GSC_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GSC_REFRESH_TOKEN?.trim();
  if (!siteUrl || !clientId || !clientSecret || !refreshToken) return null;
  return { siteUrl, clientId, clientSecret, refreshToken };
}

async function getAccessToken(creds: NonNullable<ReturnType<typeof readGscCreds>>): Promise<string> {
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

function toISODate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

type GscRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

async function queryGsc(
  accessToken: string,
  siteUrl: string,
  body: Record<string, unknown>
): Promise<{ rows?: GscRow[] }> {
  const encoded = encodeURIComponent(siteUrl);
  const res = await fetch(`${GSC_BASE}/sites/${encoded}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GSC ${res.status}: ${await res.text()}`);
  return res.json() as Promise<{ rows?: GscRow[] }>;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const creds = readGscCreds();
  if (!creds) return NextResponse.json({ skipped: "missing_credentials" });

  const days = Math.min(90, Math.max(7, Number(req.nextUrl.searchParams.get("days") ?? "28")));
  const type = (req.nextUrl.searchParams.get("type") ?? "queries") as
    | "queries"
    | "pages"
    | "countries"
    | "devices";

  const dimensionMap: Record<typeof type, string> = {
    queries: "query",
    pages: "page",
    countries: "country",
    devices: "device",
  };
  const dimension = dimensionMap[type] ?? "query";

  let token: string;
  try { token = await getAccessToken(creds); }
  catch (err) { return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 }); }

  const endDate = toISODate(daysAgo(3)); // GSC has ~3 day lag
  const startDate = toISODate(daysAgo(days + 3));
  const prevEndDate = toISODate(daysAgo(days + 4));
  const prevStartDate = toISODate(daysAgo(days * 2 + 4));

  type SummaryRow = { clicks?: number; impressions?: number; ctr?: number; position?: number };

  const [topRows, currentSummary, prevSummary] = await Promise.all([
    queryGsc(token, creds.siteUrl, {
      startDate,
      endDate,
      dimensions: [dimension],
      rowLimit: 25,
      orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
    }),
    queryGsc(token, creds.siteUrl, {
      startDate,
      endDate,
      rowLimit: 1,
    }) as Promise<{ rows?: SummaryRow[] }>,
    queryGsc(token, creds.siteUrl, {
      startDate: prevStartDate,
      endDate: prevEndDate,
      rowLimit: 1,
    }) as Promise<{ rows?: SummaryRow[] }>,
  ]).catch((err) => {
    throw new Error(String(err));
  });

  const cur = (currentSummary.rows ?? [])[0];
  const prev = (prevSummary.rows ?? [])[0];

  function pct(a: number | undefined, b: number | undefined) {
    if (!a || !b || b === 0) return null;
    return Math.round(((a - b) / b) * 100);
  }

  return NextResponse.json({
    period: { startDate, endDate, days },
    summary: {
      clicks: cur?.clicks ?? 0,
      impressions: cur?.impressions ?? 0,
      ctr: cur?.ctr != null ? Math.round(cur.ctr * 10000) / 100 : null,
      avgPosition: cur?.position != null ? Math.round(cur.position * 10) / 10 : null,
      vsLastPeriod: {
        clicks: pct(cur?.clicks, prev?.clicks),
        impressions: pct(cur?.impressions, prev?.impressions),
      },
    },
    rows: (topRows.rows ?? []).map((row) => ({
      key: row.keys?.[0] ?? "",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr != null ? Math.round(row.ctr * 10000) / 100 : 0,
      position: row.position != null ? Math.round(row.position * 10) / 10 : 0,
    })),
  });
}
