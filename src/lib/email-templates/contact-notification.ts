interface ContactNotificationData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function contactNotificationEmail(data: ContactNotificationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#3b82f6;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;">📩 New Contact Message</h1>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px;vertical-align:top;">From</td><td style="color:#0f172a;padding:6px 0;font-weight:600;">${data.name}</td></tr>
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px;vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#3b82f6;">${data.email}</a></td></tr>
        <tr><td style="color:#64748b;padding:6px 0;font-size:13px;vertical-align:top;">Subject</td><td style="color:#0f172a;padding:6px 0;font-weight:600;">${data.subject}</td></tr>
      </table>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
        <p style="color:#0f172a;margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
      </div>

      <div style="text-align:center;margin-top:20px;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:10px 24px;border-radius:6px;font-weight:600;font-size:13px;">Reply</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}
