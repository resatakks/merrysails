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
  const currencySymbol = data.currency === "EUR" ? "\u20AC" : data.currency === "USD" ? "$" : data.currency === "TRY" ? "\u20BA" : data.currency;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - MerrySails</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Hero Header -->
    <div style="background:linear-gradient(135deg,#0c1b2e 0%,#1a3a5c 50%,#0f2847 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;position:relative;overflow:hidden;">
      <!-- Decorative wave -->
      <div style="position:absolute;bottom:0;left:0;right:0;height:40px;background:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 100%22%3E%3Cpath fill=%22%23ffffff%22 d=%22M0,50 C360,100 720,0 1080,50 C1260,75 1350,62 1440,50 L1440,100 L0,100 Z%22/%3E%3C/svg%3E') no-repeat bottom center;background-size:cover;"></div>
      <!-- Logo & Brand -->
      <div style="margin-bottom:8px;">
        <span style="color:#f5c542;font-size:32px;">&#9875;</span>
      </div>
      <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;">MerrySails</h1>
      <p style="color:#7eb8e0;margin:6px 0 0;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Istanbul Bosphorus Experience</p>

      <!-- Success Badge -->
      <div style="margin-top:24px;">
        <div style="display:inline-block;background:rgba(34,197,94,0.15);border:2px solid rgba(34,197,94,0.4);border-radius:50px;padding:10px 28px;">
          <span style="color:#4ade80;font-size:15px;font-weight:600;">&#10003; Reservation Received</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div style="background:#ffffff;padding:0 32px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

      <!-- Greeting -->
      <div style="padding-top:32px;margin-bottom:24px;">
        <h2 style="color:#0f172a;margin:0 0 8px;font-size:20px;font-weight:700;">Dear ${data.customerName},</h2>
        <p style="color:#64748b;margin:0;font-size:15px;line-height:1.6;">
          Thank you for choosing MerrySails! Your reservation has been successfully received.
          Our team will review your booking and get in touch with you shortly to confirm the details.
        </p>
      </div>

      <!-- Reservation ID Card -->
      <div style="background:linear-gradient(135deg,#fef9e7 0%,#fef3c7 100%);border:1px solid #fde68a;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
        <p style="color:#92400e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;font-weight:600;">Reservation ID</p>
        <p style="color:#78350f;font-size:26px;font-weight:800;margin:0;letter-spacing:2px;font-family:'Courier New',monospace;">${data.reservationId}</p>
        <p style="color:#a16207;font-size:12px;margin:8px 0 0;">Please save this for your records</p>
      </div>

      <!-- Booking Details -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
        <div style="background:#0f172a;padding:14px 20px;">
          <p style="color:#f5c542;margin:0;font-size:14px;font-weight:700;">&#128674; Booking Details</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#64748b;font-size:13px;padding:14px 20px;border-bottom:1px solid #f1f5f9;width:35%;">Tour</td>
            <td style="color:#0f172a;font-size:14px;padding:14px 20px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${data.tourName}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:14px 20px;border-bottom:1px solid #f1f5f9;">Date</td>
            <td style="color:#0f172a;font-size:14px;padding:14px 20px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:500;">&#128197; ${data.date}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:14px 20px;border-bottom:1px solid #f1f5f9;">Departure</td>
            <td style="color:#0f172a;font-size:14px;padding:14px 20px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:500;">&#128336; ${data.time}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:14px 20px;border-bottom:1px solid #f1f5f9;">Guests</td>
            <td style="color:#0f172a;font-size:14px;padding:14px 20px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:500;">&#128101; ${data.guests} ${data.guests === 1 ? 'guest' : 'guests'}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:14px 20px;">Total</td>
            <td style="color:#0f172a;font-size:20px;padding:14px 20px;text-align:right;font-weight:800;">${currencySymbol}${data.totalPrice}</td>
          </tr>
        </table>
      </div>

      ${data.notes ? `
      <!-- Special Requests -->
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="color:#0369a1;font-size:13px;font-weight:600;margin:0 0 4px;">&#128221; Your Special Requests</p>
        <p style="color:#0c4a6e;font-size:14px;margin:0;line-height:1.5;">${data.notes}</p>
      </div>
      ` : ''}

      <!-- What's Next -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="color:#166534;font-size:15px;font-weight:700;margin:0 0 12px;">&#128640; What Happens Next?</p>
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:6px 12px 6px 0;vertical-align:top;width:28px;"><span style="background:#22c55e;color:white;border-radius:50%;display:inline-block;width:22px;height:22px;text-align:center;line-height:22px;font-size:12px;font-weight:700;">1</span></td>
            <td style="color:#15803d;font-size:13px;padding:6px 0;line-height:1.5;">Our team will review your booking and confirm availability</td>
          </tr>
          <tr>
            <td style="padding:6px 12px 6px 0;vertical-align:top;"><span style="background:#22c55e;color:white;border-radius:50%;display:inline-block;width:22px;height:22px;text-align:center;line-height:22px;font-size:12px;font-weight:700;">2</span></td>
            <td style="color:#15803d;font-size:13px;padding:6px 0;line-height:1.5;">You'll receive a confirmation message via email or WhatsApp</td>
          </tr>
          <tr>
            <td style="padding:6px 12px 6px 0;vertical-align:top;"><span style="background:#22c55e;color:white;border-radius:50%;display:inline-block;width:22px;height:22px;text-align:center;line-height:22px;font-size:12px;font-weight:700;">3</span></td>
            <td style="color:#15803d;font-size:13px;padding:6px 0;line-height:1.5;">Arrive 15 minutes before departure at the meeting point</td>
          </tr>
        </table>
      </div>

      <!-- Track Reservation Button -->
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://merrysails.com/reservation/${data.reservationId}" style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(245,158,11,0.35);">
          Track Your Reservation &#8594;
        </a>
      </div>

      <!-- Useful Info -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:18px 20px;margin-bottom:24px;">
        <p style="color:#92400e;margin:0 0 10px;font-size:14px;font-weight:700;">&#128161; Good to Know</p>
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="color:#78350f;font-size:13px;padding:4px 0;line-height:1.5;">&#10003; Free cancellation up to 24 hours before departure</td>
          </tr>
          <tr>
            <td style="color:#78350f;font-size:13px;padding:4px 0;line-height:1.5;">&#10003; Payment on board — cash (EUR/USD/TRY) or credit card</td>
          </tr>
          <tr>
            <td style="color:#78350f;font-size:13px;padding:4px 0;line-height:1.5;">&#10003; Complimentary drinks & snacks included on most tours</td>
          </tr>
          <tr>
            <td style="color:#78350f;font-size:13px;padding:4px 0;line-height:1.5;">&#10003; Professional photography available on board</td>
          </tr>
        </table>
      </div>

      <!-- Contact Section -->
      <div style="text-align:center;padding:20px 0 0;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:14px;margin:0 0 16px;">Need help? We're here for you!</p>
        <div>
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://wa.me/905370406822" style="height:42px;v-text-anchor:middle;width:200px;" arcsize="20%" fillcolor="#25D366">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">WhatsApp Us</center>
          </v:roundrect>
          <![endif]-->
          <a href="https://wa.me/905370406822" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px;">
            &#128172; WhatsApp
          </a>
          <a href="tel:+905370406822" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px;">
            &#128222; Call Us
          </a>
          <a href="mailto:info@merrysails.com" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px;">
            &#9993; Email
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:linear-gradient(135deg,#0c1b2e 0%,#1a3a5c 100%);border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
      <p style="color:#f5c542;font-size:14px;font-weight:700;margin:0 0 4px;">MerrySails</p>
      <p style="color:#7eb8e0;font-size:12px;margin:0 0 12px;">Merry Tourism | TURSAB Licensed A Group Travel Agency</p>
      <p style="color:#64748b;font-size:11px;margin:0 0 4px;">Alemdar Mah. Divanyolu Cad., Fatih/Istanbul, Turkey</p>
      <p style="color:#64748b;font-size:11px;margin:0;">
        <a href="https://merrysails.com" style="color:#f5c542;text-decoration:none;">merrysails.com</a>
        &nbsp;&bull;&nbsp;
        <a href="mailto:info@merrysails.com" style="color:#94a3b8;text-decoration:none;">info@merrysails.com</a>
      </p>
    </div>

    <!-- Legal -->
    <p style="text-align:center;color:#94a3b8;font-size:10px;margin:16px 0 0;line-height:1.5;">
      This email was sent because a booking was made on merrysails.com.<br>
      If you did not make this reservation, please <a href="mailto:info@merrysails.com" style="color:#64748b;">contact us</a>.
    </p>
  </div>
</body>
</html>`;
}
