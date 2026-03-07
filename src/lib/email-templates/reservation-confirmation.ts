interface ReservationConfirmationData {
  reservationId: string;
  customerName: string;
  tourName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  currency: string;
  notes?: string | null;
}

export function reservationConfirmationEmail(data: ReservationConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:12px 12px 0 0;padding:32px;text-align:center;">
      <h1 style="color:#f59e0b;margin:0;font-size:28px;font-weight:700;">MerrySails</h1>
      <p style="color:#94a3b8;margin:8px 0 0;font-size:14px;">Istanbul Bosphorus Cruise & Yacht Charter</p>
    </div>

    <!-- Content -->
    <div style="background:#ffffff;padding:32px;border:1px solid #e2e8f0;">
      <h2 style="color:#0f172a;margin:0 0 8px;font-size:22px;">Booking Confirmed!</h2>
      <p style="color:#64748b;margin:0 0 24px;font-size:15px;">
        Dear ${data.customerName}, your reservation has been received. Here are your details:
      </p>

      <!-- Reservation Card -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span style="color:#64748b;font-size:13px;">Reservation ID</span>
          <span style="color:#0f172a;font-weight:700;font-size:15px;">${data.reservationId}</span>
        </div>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#64748b;font-size:13px;padding:6px 0;">Tour</td>
            <td style="color:#0f172a;font-size:14px;padding:6px 0;text-align:right;font-weight:600;">${data.tourName}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:6px 0;">Date</td>
            <td style="color:#0f172a;font-size:14px;padding:6px 0;text-align:right;">${data.date}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:6px 0;">Time</td>
            <td style="color:#0f172a;font-size:14px;padding:6px 0;text-align:right;">${data.time}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:6px 0;">Guests</td>
            <td style="color:#0f172a;font-size:14px;padding:6px 0;text-align:right;">${data.guests}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:6px 0;">Total</td>
            <td style="color:#f59e0b;font-size:18px;padding:6px 0;text-align:right;font-weight:700;">${data.currency === "EUR" ? "€" : data.currency}${data.totalPrice}</td>
          </tr>
        </table>
        ${data.notes ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;"><p style="color:#64748b;font-size:13px;margin:0;">Notes: ${data.notes}</p>` : ""}
      </div>

      <!-- Track Reservation -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://merrysails.com/reservation/${data.reservationId}" style="display:inline-block;background:#f59e0b;color:#0f172a;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:600;font-size:15px;">
          Track Your Reservation
        </a>
      </div>

      <!-- Important Info -->
      <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="color:#92400e;margin:0;font-size:13px;font-weight:600;">Important Information</p>
        <ul style="color:#92400e;margin:8px 0 0;padding-left:20px;font-size:13px;line-height:1.6;">
          <li>Free cancellation up to 24 hours before departure</li>
          <li>Please arrive 15 minutes before departure time</li>
          <li>Payment can be made in cash (EUR/USD/TRY) or by card onboard</li>
        </ul>
      </div>

      <!-- Contact -->
      <p style="color:#64748b;font-size:13px;margin:0;line-height:1.6;">
        Questions? Reach us anytime:<br>
        WhatsApp: <a href="https://wa.me/905370406822" style="color:#f59e0b;">+90 537 040 68 22</a><br>
        Email: <a href="mailto:info@merrysails.com" style="color:#f59e0b;">info@merrysails.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9;border-radius:0 0 12px 12px;padding:20px;text-align:center;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">
        MerrySails — Merry Tourism | TURSAB Licensed A Group Travel Agency<br>
        Alemdar Mah. Divanyolu Cad., Fatih/Istanbul
      </p>
    </div>
  </div>
</body>
</html>`;
}
