/**
 * Generic reservation confirmation sender — pulls all data from the DB so no
 * per-customer hardcoding is needed. Use this for every future custom /
 * phone-arranged booking. The reservation must already exist with structured
 * [MERRYSAILS_META] notes (meetingPointNote, paymentMethod, emailTemplate).
 *
 * Usage:
 *   node --env-file=.env.local scripts/send-reservation-email.mjs MRY-2026-0046
 *   node --env-file=.env.local scripts/send-reservation-email.mjs MRY-2026-0046 --dry-run
 */
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const SITE_BASE = "https://merrysails.com";
const CC = [
  "info@merrysails.com",
  "resatakkus10@gmail.com",
  "info@merrytravel.com.tr",
  "info@merrytourism.com",
];

function normalizeUrl(s) {
  try {
    const u = new URL(s);
    const m = u.searchParams.get("sslmode");
    if (!m || ["prefer", "require", "verify-ca"].includes(m)) {
      u.searchParams.set("sslmode", "verify-full");
      u.searchParams.delete("uselibpqcompat");
    }
    return u.toString();
  } catch { return s; }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

function parseMeta(notes) {
  if (!notes) return {};
  const m = notes.match(/\[MERRYSAILS_META\](.*?)\[\/MERRYSAILS_META\]/s);
  if (!m) return {};
  try {
    return JSON.parse(m[1]);
  } catch {
    return {};
  }
}

function currencySymbol(currency) {
  switch (currency) {
    case "EUR": return "€";
    case "USD": return "$";
    case "TRY": return "₺";
    case "GBP": return "£";
    default: return currency;
  }
}

function paymentNoteFor(method, totalDisplay) {
  switch (method) {
    case "cash_on_board": return `Payment: ${totalDisplay} cash on board.`;
    case "card_on_board": return `Payment: ${totalDisplay} by card on board.`;
    case "card_paid": return `Payment received in full (${totalDisplay}). Nothing due on board.`;
    case "bank_transfer": return `Payment by bank transfer (${totalDisplay}). Please share the proof if not already sent.`;
    default: return `Payment: ${totalDisplay} collected on the day of the experience.`;
  }
}

function formatDate(dateInput) {
  const d = new Date(dateInput);
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", opts).format(d);
}

function buildHtml({ reservation, meta }) {
  const reservationId = reservation.reservationId;
  const reservationUrl = `${SITE_BASE}/reservation/${reservationId}`;
  const voucherUrl = `${SITE_BASE}/reservation/${reservationId}/voucher`;
  const invoiceUrl = `${SITE_BASE}/reservation/${reservationId}/invoice`;

  const symbol = currencySymbol(reservation.currency);
  const totalDisplay = `${symbol}${Number(reservation.totalPrice).toFixed(2)}`;
  const paymentNote = paymentNoteFor(meta.paymentMethod, totalDisplay);
  const pickupLocation = meta.meetingPointNote?.trim() || "Karaköy";
  const pickup = reservation.time?.trim()
    ? `${pickupLocation} · ${reservation.time}`
    : pickupLocation;

  // "standard" = normal sunset/dinner cruise confirmation wording.
  // anything else (default "custom-booking") = private-booking-by-phone wording.
  const isStandard = (meta?.emailTemplate ?? "custom-booking") === "standard";
  const headerSub = isStandard
    ? "Your booking is confirmed."
    : "Private booking arranged by phone.";
  const introLine = isStandard
    ? `Hi ${escapeHtml(reservation.customerName)}, your MerrySails booking is confirmed. Below is your reservation summary — please keep this email and the attached voucher handy.`
    : `Hi ${escapeHtml(reservation.customerName)}, your private booking with MerrySails is confirmed. Below is your reservation summary — please keep this email and the attached voucher handy.`;
  const footerLine = isStandard
    ? "This confirmation was issued for your MerrySails reservation."
    : "This confirmation was issued because a private booking was arranged by phone.";

  const meetingPointBlock = meta.meetingPointNote
    ? `<div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:14px;padding:16px 18px;margin-bottom:18px;">
        <p style="font-size:13px;color:#1e3a8a;font-weight:700;margin:0 0 8px;">Meeting point</p>
        <p style="margin:0;font-size:13px;color:#1e3a8a;line-height:1.7;">${escapeHtml(meta.meetingPointNote)}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">
    <div style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
      <div style="background:linear-gradient(135deg,#0c1b2e,#0f2847);padding:22px 28px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle;">
              <table style="border-collapse:collapse;"><tr>
                <td style="width:42px;vertical-align:middle;">
                  <div style="width:42px;height:42px;border-radius:13px;background:#0c2d48;color:#f7b52c;font-size:21px;line-height:42px;text-align:center;font-weight:800;">M</div>
                </td>
                <td style="padding-left:12px;vertical-align:middle;">
                  <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.3px;">Merry<span style="color:#f7b52c;">Sails</span></div>
                  <div style="color:#cbd5e1;font-size:11px;margin-top:2px;">Merry Tourism</div>
                </td>
              </tr></table>
            </td>
            <td style="text-align:right;vertical-align:middle;">
              <div style="font-size:11px;color:#f7b52c;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">MerrySails</div>
              <div style="color:#ffffff;font-size:19px;font-weight:800;margin-top:3px;">Booking Confirmed</div>
              <div style="color:#cbd5e1;font-size:11px;margin-top:4px;">${headerSub}</div>
            </td>
          </tr>
        </table>
      </div>
      <div style="height:5px;background:linear-gradient(90deg,#f7b52c,#ff8a00);"></div>
      <div style="padding:28px;">
        <p style="color:#0f172a;margin:0 0 18px;font-size:15px;line-height:1.7;">
          ${introLine}
        </p>
        <div style="margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid #e2e8f0;">
          <table style="width:100%;border-collapse:collapse;"><tr>
            <td style="vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Reservation ID</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:15px;letter-spacing:0.04em;">${escapeHtml(reservationId)}</div>
            </td>
            <td style="text-align:right;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Total</div>
              <div style="color:#0f172a;font-weight:800;margin-top:5px;font-size:18px;">${escapeHtml(totalDisplay)}</div>
            </td>
          </tr></table>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">
          <tr>
            <td style="width:50%;padding:0 12px 14px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Lead Guest</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(reservation.customerName)} (${reservation.guests} guest${reservation.guests > 1 ? "s" : ""})</div>
            </td>
            <td style="width:50%;padding:0 0 14px 12px;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Experience</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(reservation.tourName)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 12px 14px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Date</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(formatDate(reservation.date))}</div>
            </td>
            <td style="padding:0 0 14px 12px;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Pickup</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(pickup)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 12px 4px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Phone</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(reservation.customerPhone)}</div>
            </td>
            <td style="padding:0 0 4px 12px;"></td>
          </tr>
        </table>
        ${meetingPointBlock}
        <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:14px;padding:16px 18px;margin-bottom:22px;">
          <p style="font-size:13px;color:#92400e;font-weight:700;margin:0 0 8px;">Good to know</p>
          <p style="margin:0;font-size:13px;color:#92400e;line-height:1.7;">
            • Free cancellation up to 24 hours before departure.<br />
            • ${escapeHtml(paymentNote)}<br />
            • Keep your reservation ID handy on your phone.
          </p>
        </div>
        <div style="text-align:center;margin-bottom:6px;">
          <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">Open Voucher</a>
          <a href="${invoiceUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">Open Invoice</a>
          <a href="${reservationUrl}" style="display:inline-block;background:linear-gradient(135deg,#f7b52c,#ff8a00);color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">Reservation Details</a>
        </div>
        <p style="color:#64748b;font-size:13px;margin:18px 0 0;line-height:1.7;text-align:center;">
          Reach us anytime on WhatsApp:
          <a href="https://wa.me/905448989812" style="color:#f59e0b;font-weight:700;text-decoration:none;">+90 544 898 98 12</a>
          &nbsp;·&nbsp;
          <a href="https://wa.me/905448989812" style="color:#f59e0b;font-weight:700;text-decoration:none;">+90 544 898 98 12</a>
        </p>
      </div>
      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:18px 28px;border-top:1px solid #e2e8f0;line-height:1.7;">
        <div style="color:#64748b;font-weight:700;">MerrySails · Meryem Yıldız Travel</div>
        TURSAB A Group licensed since 2001 · merrysails.com · info@merrysails.com<br />
        ${footerLine}
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function fetchPdf(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`PDF fetch failed: ${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const reservationId = (process.argv[2] || "").toUpperCase();
  if (!reservationId) {
    throw new Error("Usage: node send-reservation-email.mjs <RESERVATION_ID> [--dry-run]");
  }
  const dryRun = process.argv.includes("--dry-run");

  const adapter = new PrismaPg({ connectionString: normalizeUrl(process.env.DATABASE_URL) });
  const prisma = new PrismaClient({ adapter });

  const reservation = await prisma.reservation.findUnique({ where: { reservationId } });
  if (!reservation) throw new Error(`Reservation ${reservationId} not found`);
  const meta = parseMeta(reservation.notes);
  await prisma.$disconnect();

  const isStandard = (meta?.emailTemplate ?? "custom-booking") === "standard";
  const subject = isStandard
    ? `MerrySails — Booking confirmation · ${reservationId}`
    : `MerrySails — Private booking confirmation · ${reservationId}`;
  const html = buildHtml({ reservation, meta });

  if (dryRun) {
    const fs = await import("node:fs");
    const path = `/tmp/${reservationId}-preview.html`;
    fs.writeFileSync(path, html);
    console.log(`Dry run — HTML written to ${path}`);
    console.log(`Subject: ${subject}`);
    console.log(`To: ${reservation.customerEmail}`);
    console.log(`CC: ${CC.join(", ")}`);
    return;
  }

  const smtpUser = (process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD ?? "").trim();
  if (!smtpUser || !smtpPass) throw new Error("Missing SMTP credentials");

  console.log("Fetching live PDFs…");
  const [voucherBuf, invoiceBuf] = await Promise.all([
    fetchPdf(`${SITE_BASE}/reservation/${reservationId}/voucher/pdf?download=1`),
    fetchPdf(`${SITE_BASE}/reservation/${reservationId}/invoice/pdf?download=1`),
  ]);
  console.log(`Voucher PDF: ${voucherBuf.length} bytes · Invoice PDF: ${invoiceBuf.length} bytes`);

  const fromName = (process.env.SMTP_FROM_NAME ?? process.env.EMAIL_FROM_NAME ?? "MerrySails").trim();
  const fromEmail = (process.env.SMTP_FROM_EMAIL ?? smtpUser).trim();

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: reservation.customerEmail,
    cc: CC,
    subject,
    html,
    attachments: [
      { filename: `${reservationId}-voucher.pdf`, content: voucherBuf, contentType: "application/pdf" },
      { filename: `${reservationId}-invoice.pdf`, content: invoiceBuf, contentType: "application/pdf" },
    ],
  };

  // Gmail SMTP: try implicit-TLS 465 first, fall back to STARTTLS 587 if refused.
  const ports = [
    { port: 465, secure: true },
    { port: 587, secure: false },
  ];
  let info, lastErr;
  for (const { port, secure } of ports) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
      });
      console.log(`Sending to ${reservation.customerEmail} via port ${port} (CC: ${CC.join(", ")})…`);
      info = await transporter.sendMail(mailOptions);
      break;
    } catch (err) {
      lastErr = err;
      console.warn(`Port ${port} failed: ${err.code ?? err.message}. Trying next…`);
    }
  }
  if (!info) throw lastErr ?? new Error("All SMTP ports failed");

  console.log("Sent. messageId=", info.messageId);
  console.log("Accepted:", info.accepted);
  console.log("Rejected:", info.rejected);
}

main().catch((err) => {
  console.error("Send failed:", err);
  process.exit(1);
});
