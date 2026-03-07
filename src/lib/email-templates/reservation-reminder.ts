interface ReservationReminderData {
  reservationId: string;
  customerName: string;
  tourName: string;
  date: string;
  time: string;
  guests: number;
}

export function reservationReminderEmail(data: ReservationReminderData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
      <h1 style="color:#f59e0b;margin:0;font-size:24px;">Your Cruise is Tomorrow!</h1>
      <p style="color:#94a3b8;margin:8px 0 0;font-size:14px;">MerrySails Reminder</p>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <p style="color:#0f172a;margin:0 0 16px;font-size:15px;">
        Hi ${data.customerName}! 👋 Just a friendly reminder about your upcoming Bosphorus experience:
      </p>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">📋 Reservation</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:700;">${data.reservationId}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">🚢 Tour</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:600;">${data.tourName}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">📅 Date</td><td style="color:#166534;padding:6px 0;text-align:right;">${data.date}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">⏰ Time</td><td style="color:#166534;padding:6px 0;text-align:right;font-weight:700;">${data.time}</td></tr>
          <tr><td style="color:#166534;padding:6px 0;font-size:14px;">👥 Guests</td><td style="color:#166534;padding:6px 0;text-align:right;">${data.guests}</td></tr>
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
