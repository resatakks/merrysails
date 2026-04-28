import { emailLegalFooter, emailLogoBlock, escapeHtml } from "./helpers";

interface LeadAutoresponderData {
  customerName?: string | null;
  product?: string | null;
}

export function leadAutoresponderEmail(data: LeadAutoresponderData): string {
  const greetingName = (data.customerName ?? "").trim() || "there";
  const productLabel = (data.product ?? "").trim() || "MerrySails experience";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your inquiry — MerrySails</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div style="background:linear-gradient(135deg,#0c1b2e 0%,#1a3a5c 50%,#0f2847 100%);border-radius:18px 18px 0 0;padding:28px 24px 30px;">
      ${emailLogoBlock({ onDark: true })}
      <div style="margin-top:22px;">
        <div style="display:inline-block;background:rgba(34,197,94,0.16);border:1px solid rgba(74,222,128,0.35);border-radius:999px;padding:9px 18px;color:#4ade80;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
          Inquiry Received
        </div>
      </div>
      <h1 style="color:#ffffff;margin:18px 0 0;font-size:24px;font-weight:800;line-height:1.2;">Thanks, ${escapeHtml(greetingName)} — we got your request.</h1>
      <p style="color:#cbd5e1;margin:10px 0 0;font-size:14px;line-height:1.7;">
        Our team has received your inquiry about <strong>${escapeHtml(productLabel)}</strong> and will reach out to you very soon by phone, WhatsApp, or email.
      </p>
    </div>

    <div style="background:#ffffff;padding:24px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 0 18px 18px;">
      <p style="color:#0f172a;margin:0 0 12px;font-size:15px;font-weight:600;">What happens next</p>
      <ul style="margin:0 0 18px;padding-left:20px;color:#334155;font-size:13px;line-height:1.8;">
        <li>A MerrySails advisor reviews your request and matches it to the right boat, route, and timing.</li>
        <li>We reach out within a few hours during operating hours (10:00–22:00 Istanbul time).</li>
        <li>If you prefer to talk now, WhatsApp is the fastest channel.</li>
      </ul>

      <div style="text-align:center;margin:18px 0 6px;">
        <a href="https://wa.me/905370406822" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700;font-size:14px;margin:0 6px 8px;">Chat on WhatsApp</a>
        <a href="tel:+905370406822" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700;font-size:14px;margin:0 6px 8px;">Call +90 537 040 68 22</a>
      </div>
    </div>

    <div style="padding:18px 12px 0;text-align:center;">
      ${emailLegalFooter()}
      <p style="text-align:center;color:#94a3b8;font-size:10px;margin:14px 0 0;line-height:1.6;">
        You are receiving this email because you submitted an inquiry through a Google Ads form for MerrySails.<br>
        If this was not you, please <a href="mailto:info@merrysails.com" style="color:#64748b;">let us know</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
}
