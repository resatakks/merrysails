import { emailLegalFooter, escapeHtml } from "./helpers";

interface ReservationCancelledData {
  reservationId: string;
  customerName: string;
  tourName: string;
  date: string;
  time: string;
  totalPrice: number;
  currency: string;
}

export function reservationCancelledEmail(data: ReservationCancelledData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#dc2626;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;">Reservation Cancelled</h1>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <p style="color:#0f172a;margin:0 0 16px;font-size:15px;">
        Dear ${escapeHtml(data.customerName)}, your reservation <strong>${escapeHtml(data.reservationId)}</strong> has been cancelled.
      </p>

      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#991b1b;padding:4px 0;font-size:13px;">Tour</td><td style="color:#991b1b;padding:4px 0;text-align:right;">${escapeHtml(data.tourName)}</td></tr>
          <tr><td style="color:#991b1b;padding:4px 0;font-size:13px;">Date</td><td style="color:#991b1b;padding:4px 0;text-align:right;">${escapeHtml(data.date)}</td></tr>
          <tr><td style="color:#991b1b;padding:4px 0;font-size:13px;">Time</td><td style="color:#991b1b;padding:4px 0;text-align:right;">${escapeHtml(data.time)}</td></tr>
        </table>
      </div>

      <p style="color:#64748b;font-size:13px;margin:0 0 16px;">
        Our standard shared-cruise flow is pay-on-board, so no further action is usually needed. If your booking included any special pre-arranged payment or custom deposit, our team will contact you directly.
      </p>

      <p style="color:#64748b;font-size:13px;margin:0;">
        Want to rebook? Visit <a href="https://merrysails.com/cruises" style="color:#f59e0b;">merrysails.com</a> or contact us via
        <a href="https://wa.me/905370406822" style="color:#f59e0b;">WhatsApp</a>.
      </p>
    </div>

    <div style="padding:16px;text-align:center;">
      ${emailLegalFooter()}
    </div>
  </div>
</body>
</html>`;
}
