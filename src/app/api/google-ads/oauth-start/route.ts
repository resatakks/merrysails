import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REDIRECT_URI = "https://merrysails.com/api/google-ads/oauth-callback";
const SCOPE = "https://www.googleapis.com/auth/adwords";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || token !== cronSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const clientId = process.env.GOOGLE_ADS_CLIENT_ID?.trim();
  if (!clientId) {
    return NextResponse.json({ error: "GOOGLE_ADS_CLIENT_ID not set in env" }, { status: 422 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
    state: token,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/auth?${params.toString()}`
  );
}
