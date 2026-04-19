import { getReservationDetailUrl, getReservationVoucherUrl } from "@/lib/reservation-links";
import { escapeHtml } from "./helpers";

interface ReservationReminderData {
  reservationId: string;
  customerName: string;
  tourName: string;
  date: string;
  time: string;
  guests: number;
  departurePoint?: string;
  packageName?: string;
  addOns?: string[];
}

export function reservationReminderEmail(data: ReservationReminderData): string {
  const reservationUrl = getReservationDetailUrl(data.reservationId);
  const voucherUrl = getReservationVoucherUrl(data.reservationId);

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
      <h1 style="color:#f59e0b;margin:0;font-size:24px;">Your Cruise Starts Soon</h1>
      <p style="color:#94a3b8;margin:8px 0 0;font-size:14px;">MerrySails Reminder</p>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <p style="color:#0f172a;margin:0 0 16px;font-size:15px;">
        Hi ${escapeHtml(data.customerName)}! 👋 Just a friendly reminder about your upcoming Bosphorus experience:
      </p>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">📋 Reservation</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:700;">${escapeHtml(data.reservationId)}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">🚢 Tour</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:600;">${escapeHtml(data.tourName)}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">📅 Date</td><td style="color:#166534;padding:6px 0;text-align:right;">${escapeHtml(data.date)}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">⏰ Time</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:700;">${escapeHtml(data.time)}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">👥 Guests</td><td style="color:#166534;padding:6px 0;text-align:right;">${data.guests}</td></tr>
          ${data.packageName ? `<tr><td style="color:#166534;padding:6px 0;font-size:14px;">📦 Package</td><td style="color:#166534;padding:6px 0;text-align:right;">${escapeHtml(data.packageName)}</td></tr>` : ""}
          ${data.addOns && data.addOns.length > 0 ? `<tr><td style="color:#166534;padding:6px 0;font-size:14px;">➕ Add-ons</td><td style="color:#166534;padding:6px 0;text-align:right;">${escapeHtml(data.addOns.join(", "))}</td></tr>` : ""}
          ${data.departurePoint ? `<tr><td style="color:#166534;padding:6px 0;font-size:14px;">📍 Meeting Point</td><td style="color:#166534;padding:6px 0;text-align:right;">${escapeHtml(data.departurePoint)}</td></tr>` : ""}
        </table>
      </div>

      <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:20px;">
        <p style="color:#92400e;margin:0;font-size:13px;font-weight:600;">Quick Reminders:</p>
        <ul style="color:#92400e;margin:8px 0 0;padding-left:20px;font-size:13px;line-height:1.8;">
          <li>Please arrive <strong>15 minutes early</strong></li>
          <li>Bring a light jacket (it can be breezy on the water)</li>
          <li>Camera ready — the views are incredible!</li>
        </ul>
      </div>

      <div style="text-align:center;margin-bottom:20px;">
        <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          Open Voucher
        </a>
        <a href="${reservationUrl}" style="display:inline-block;background:#f59e0b;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          Reservation Details
        </a>
      </div>

      <p style="color:#64748b;font-size:13px;margin:0;">
        Need to reach us? WhatsApp: <a href="https://wa.me/905370406822" style="color:#f59e0b;">+90 537 040 68 22</a>
      </p>
    </div>

    <div style="padding:16px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">MerrySails — Merry Tourism | TURSAB Licensed</p>
    </div>
  </div>
</body>
</html>`;
}
