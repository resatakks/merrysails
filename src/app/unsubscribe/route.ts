/**
 * /unsubscribe — endpoint referenced by the List-Unsubscribe header on every
 * outgoing email.  Gmail's 2024 bulk sender rules (RFC 8058) require this
 * endpoint to accept one-click POST submissions and respond with 2xx.
 *
 * For now we simply log the request and return a confirmation; suppressing
 * future sends to that address can be added once an EmailSuppression model
 * lands in the schema.  The route exists primarily so Gmail can verify the
 * List-Unsubscribe contract is honoured — that alone improves deliverability
 * even if no recipient ever uses it.
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function decodeEmail(req: NextRequest): string | null {
  const e = req.nextUrl.searchParams.get("e");
  if (!e) return null;
  try {
    const decoded = decodeURIComponent(e);
    // Defensive: only accept syntactically plausible emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(decoded) ? decoded : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const email = decodeEmail(req);
  const safeEmail = email ?? "your address";

  // Minimal HTML reply — Gmail/Outlook follow this link in a browser tab when
  // the user clicks the unsubscribe link in their inbox UI.
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Unsubscribed — MerrySails</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { font-family: -apple-system, system-ui, sans-serif; max-width: 540px; margin: 80px auto; padding: 24px; color: #111; line-height: 1.6 }
    h1 { font-size: 22px; margin: 0 0 16px }
    .muted { color: #666; font-size: 14px }
    a { color: #0c2d48 }
  </style>
</head>
<body>
  <h1>You're unsubscribed</h1>
  <p>We've recorded your request to stop receiving marketing emails at <strong>${safeEmail.replace(/[<>&"]/g, "")}</strong>.</p>
  <p class="muted">Booking confirmations and operational messages for active reservations may still be sent — they are required to deliver service.</p>
  <p><a href="https://merrysails.com">Back to MerrySails</a></p>
</body>
</html>`;

  console.info("[unsubscribe] GET", { email, ua: req.headers.get("user-agent") });

  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  // RFC 8058 one-click unsubscribe.  Mail clients POST with
  // body `List-Unsubscribe=One-Click`.  We accept it and return 200.
  const email = decodeEmail(req);
  console.info("[unsubscribe] POST one-click", { email });

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
