interface ReservationNotificationData {
  reservationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string | null;
  tourName: string;
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  currency: string;
  notes?: string | null;
}

export function reservationNotificationEmail(data: ReservationNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#16a34a;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;">🎉 New Reservation!</h1>
      <p style="color:#bbf7d0;margin:4px 0 0;font-size:14px;">${data.reservationId}</p>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <!-- Tour Info -->
      <h3 style="color:#0f172a;margin:0 0 16px;font-size:16px;">Tour Details</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Tour</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${data.tourName}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Date</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.date}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Time</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.time}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Guests</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.guests}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Total</td><td style="color:#16a34a;padding:4px 0;text-align:right;font-weight:700;font-size:18px;">${data.currency === "EUR" ? "€" : data.currency}${data.totalPrice}</td></tr>
      </table>

      <!-- Customer Info -->
      <h3 style="color:#0f172a;margin:0 0 16px;font-size:16px;">Customer</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Name</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.customerName}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Email</td><td style="padding:4px 0;text-align:right;"><a href="mailto:${data.customerEmail}" style="color:#3b82f6;">${data.customerEmail}</a></td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Phone</td><td style="padding:4px 0;text-align:right;"><a href="tel:${data.customerPhone}" style="color:#3b82f6;">${data.customerPhone}</a></td></tr>
        ${data.customerCountry ? `<tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Country</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.customerCountry}</td></tr>` : ""}
      </table>

      ${data.notes ? `<div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="color:#92400e;margin:0;font-size:13px;"><strong>Notes:</strong> ${data.notes}</p></div>` : ""}

      <!-- Quick Actions -->
      <div style="text-align:center;">
        <a href="https://wa.me/${data.customerPhone.replace(/[^0-9]/g, "")}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">WhatsApp</a>
        <a href="tel:${data.customerPhone}" style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Call</a>
      </div>
    </div>

    <div style="padding:16px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">MerrySails Reservation System</p>
    </div>
  </div>
</body>
</html>`;
}
