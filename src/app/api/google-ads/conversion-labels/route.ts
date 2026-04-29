import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v20";

function isAuthorized(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${cronSecret}`) return true;
  return req.nextUrl.searchParams.get("token") === cronSecret;
}

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
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

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "").trim();
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim();

  if (!customerId || !developerToken || !process.env.GOOGLE_ADS_REFRESH_TOKEN) {
    return NextResponse.json({ error: "missing_credentials" }, { status: 422 });
  }

  let accessToken: string;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    return NextResponse.json({ error: "oauth_failed", details: String(err) }, { status: 502 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
    "Content-Type": "application/json",
  };

  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${customerId}/googleAds:search`;
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
        SELECT
          conversion_action.id,
          conversion_action.name,
          conversion_action.status,
          conversion_action.tag_snippets,
          conversion_action.type
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
        ORDER BY conversion_action.name
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "ads_query_failed", details: text }, { status: 502 });
  }

  type Row = {
    conversionAction?: {
      id?: string;
      name?: string;
      status?: string;
      type?: string;
      tagSnippets?: Array<{
        type?: string;
        pageFormat?: string;
        eventSnippet?: string;
        globalSiteTag?: string;
      }>;
    };
  };

  const body = (await res.json()) as { results?: Row[] };
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? `AW-${customerId}`;

  const conversions = (body.results ?? []).map((row) => {
    const action = row.conversionAction ?? {};
    const snippets = action.tagSnippets ?? [];

    let label: string | null = null;
    for (const snippet of snippets) {
      const eventSnippet = snippet.eventSnippet ?? "";
      const match = eventSnippet.match(/['"]send_to['"]\s*:\s*['"]AW-\d+\/([^'"]+)['"]/);
      if (match) {
        label = match[1];
        break;
      }
    }

    return {
      id: action.id,
      name: action.name,
      status: action.status,
      type: action.type,
      label,
      sendTo: label ? `${adsId}/${label}` : null,
    };
  });

  return NextResponse.json({ conversions, adsId });
}
