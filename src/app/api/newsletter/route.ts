import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function newsletterConfirmationEmail(email: string): string {
  const siteUrl = "https://merrysails.com";
  const unsubUrl = `${siteUrl}/unsubscribe?token=unsubscribe&email=${encodeURIComponent(email)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Welcome to MerrySails</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background:#f8f9fa;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" style="width:100%;max-width:560px;border-collapse:collapse;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:28px 32px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:800;">MerrySails</p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="background:#D4A857;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 24px;">
              <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f172a;line-height:1.3;">
                Welcome aboard, ${escapeHtml(email.split("@")[0])}!
              </h1>
              <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
                You are now subscribed to insider Istanbul cruise tips from MerrySails. Once a month, you will receive sunset timing tips, boutique boat updates, and members-only early-bird fares -- nothing more.
              </p>

              <!-- CTA -->
              <table role="presentation" style="border-collapse:collapse;margin:24px 0;">
                <tr>
                  <td style="background:#D4A857;border-radius:10px;">
                    <a href="${siteUrl}/cruises/bosphorus-sunset-cruise" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                      Browse Bosphorus Cruises &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">
                Questions? Reply to this email or reach us at
                <a href="mailto:info@merrysails.com" style="color:#D4A857;text-decoration:none;">info@merrysails.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                MerrySails -- Merry Tourism -- TURSAB A-Group License #14316
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;">
                You subscribed at merrysails.com.
                <a href="${unsubUrl}" style="color:#94a3b8;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function newsletterInternalNotification(email: string, source: string, locale: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="font-family:Arial,sans-serif;padding:24px;">
  <h2 style="color:#0f172a;">New Newsletter Subscriber — MerrySails</h2>
  <table style="border-collapse:collapse;width:100%;max-width:480px;">
    <tr><td style="color:#64748b;padding:6px 0;font-size:13px;width:35%;">Email</td><td style="font-weight:600;font-size:13px;">${escapeHtml(email)}</td></tr>
    <tr><td style="color:#64748b;padding:6px 0;font-size:13px;">Source</td><td style="font-size:13px;">${escapeHtml(source)}</td></tr>
    <tr><td style="color:#64748b;padding:6px 0;font-size:13px;">Locale</td><td style="font-size:13px;">${escapeHtml(locale)}</td></tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      email?: unknown;
      source?: unknown;
      locale?: unknown;
      company?: unknown;
    };

    // Honeypot: if company is filled, silently succeed (bot)
    if (body.company && String(body.company).trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 64) : "footer";
    const locale = typeof body.locale === "string" ? body.locale.trim().slice(0, 8) : "en";

    if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
    }

    // If already exists return success silently (don't reveal)
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: rawEmail } });

    if (existing) {
      return NextResponse.json({ success: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    await prisma.newsletterSubscriber.create({
      data: {
        email: rawEmail,
        source,
        locale,
        ipAddress: ip,
        userAgent,
      },
    });

    // Send confirmation to subscriber (non-blocking)
    sendEmail({
      to: rawEmail,
      subject: "Welcome to MerrySails",
      html: newsletterConfirmationEmail(rawEmail),
    }).catch((err) => console.error("[newsletter] confirmation email failed:", err));

    // Send internal notification
    const internalTo = "info@merrysails.com";
    sendEmail({
      to: internalTo,
      subject: `New newsletter subscriber: ${rawEmail}`,
      html: newsletterInternalNotification(rawEmail, source, locale),
    }).catch((err) => console.error("[newsletter] internal notification failed:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] POST error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
