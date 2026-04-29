import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REDIRECT_URI = "https://merrysails.com/api/google-ads/oauth-callback";

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state");
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || state !== cronSecret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (error) {
    return new NextResponse(`Google auth error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new NextResponse("Missing auth code", { status: 400 });
  }

  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("GOOGLE_ADS_CLIENT_ID or CLIENT_SECRET not set", { status: 422 });
  }

  const params = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = (await res.json()) as {
    refresh_token?: string;
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.refresh_token) {
    return new NextResponse(
      `Token exchange failed: ${data.error ?? res.status} — ${data.error_description ?? "no refresh_token in response"}`,
      { status: 502 }
    );
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>OAuth Success — MerrySails Ads</title>
<style>body{font-family:monospace;padding:40px;background:#0a0a0a;color:#e0e0e0;}
code{background:#1a1a1a;padding:8px 14px;border-radius:6px;display:block;word-break:break-all;
     border:1px solid #333;margin:12px 0;}
.ok{color:#4ade80;}h2{color:#facc15;}</style></head><body>
<h2>✅ Refresh Token Alındı</h2>
<p>Şunu Vercel'e ekle: <strong>GOOGLE_ADS_REFRESH_TOKEN</strong></p>
<code>${data.refresh_token}</code>
<p style="margin-top:24px;color:#888;font-size:13px;">Bu sayfayı kapatabilirsin. Token güvende — sadece Vercel env'e yapıştır.</p>
</body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
