import { getReservationLinkContext } from "@/lib/reservation-links";
import { getExperienceSupportPageUrl } from "@/lib/experience-support";
import { currencySymbol, escapeHtml } from "./helpers";

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
  packageName?: string;
  addOns?: string[];
  additionalGuests?: string[];
  privateTransferRequested?: boolean;
  notes?: string | null;
}

export function reservationNotificationEmail(data: ReservationNotificationData): string {
  const cleanPhone = data.customerPhone.replace(/[^0-9]/g, "");
  const linkContext = getReservationLinkContext(data.tourSlug, data.reservationId);
  const supportGuideUrl = getExperienceSupportPageUrl(data.tourSlug);
  const symbol = currencySymbol(data.currency);

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#16a34a;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;">🎉 New Reservation!</h1>
      <p style="color:#bbf7d0;margin:4px 0 0;font-size:14px;">${escapeHtml(data.reservationId)}</p>
    </div>

    <div style="background:#fff;padding:24px;border:1px solid #e2e8f0;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#64748b;padding:4px 0;font-size:12px;">Page Type</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(linkContext.pageLabel)}</td></tr>
          <tr><td style="color:#64748b;padding:4px 0;font-size:12px;">Booking Flow</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(linkContext.bookingLabel)}</td></tr>
        </table>
      </div>

      <!-- Tour Info -->
      <h3 style="color:#0f172a;margin:0 0 16px;font-size:16px;">Tour Details</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Tour</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(data.tourName)}</td></tr>
        ${data.packageName ? `<tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Package</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(data.packageName)}</td></tr>` : ""}
        ${(data.addOns && data.addOns.length > 0) ? `<tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Add-ons</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.addOns.join(", "))}</td></tr>` : ""}
        ${data.privateTransferRequested ? `<tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Transfer</td><td style="color:#0f172a;padding:4px 0;text-align:right;">Private transfer requested — team should confirm pickup details</td></tr>` : ""}
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Date</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.date)}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Time</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.time)}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Guests</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.guests}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Total</td><td style="color:#16a34a;padding:4px 0;text-align:right;font-weight:700;font-size:18px;">${symbol}${data.totalPrice}</td></tr>
      </table>

      <!-- Customer Info -->
      <h3 style="color:#0f172a;margin:0 0 16px;font-size:16px;">Customer</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Name</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.customerName)}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Email</td><td style="padding:4px 0;text-align:right;"><a href="mailto:${escapeHtml(data.customerEmail)}" style="color:#3b82f6;">${escapeHtml(data.customerEmail)}</a></td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Phone</td><td style="padding:4px 0;text-align:right;"><a href="tel:${escapeHtml(data.customerPhone)}" style="color:#3b82f6;">${escapeHtml(data.customerPhone)}</a></td></tr>
        ${data.customerCountry ? `<tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Country</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.customerCountry)}</td></tr>` : ""}
      </table>

      ${(data.additionalGuests && data.additionalGuests.length > 0) ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="color:#1d4ed8;margin:0;font-size:13px;"><strong>Other passengers:</strong> ${escapeHtml(data.additionalGuests.join(", "))}</p></div>` : ""}
      ${data.notes ? `<div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="color:#92400e;margin:0;font-size:13px;"><strong>Notes:</strong> ${escapeHtml(data.notes)}</p></div>` : ""}
      ${data.privateTransferRequested ? `<div style="background:#fff7ed;border:1px solid #fdba74;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="color:#9a3412;margin:0;font-size:13px;line-height:1.7;"><strong>Transfer follow-up:</strong> The guest requested private transfer support. Please confirm routing, pickup point, and any extra charge before departure.</p></div>` : ""}

      <!-- Quick Actions -->
      <div style="text-align:center;">
        <a href="${linkContext.reservationUrl}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Open Reservation</a>
        <a href="${linkContext.invoiceUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;border:1px solid #cbd5e1;">Invoice</a>
        <a href="${linkContext.voucherUrl}" style="display:inline-block;background:#f59e0b;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Voucher</a>
        ${supportGuideUrl ? `<a href="${supportGuideUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;border:1px solid #cbd5e1;">Meeting Guide</a>` : ""}
        <a href="${linkContext.tourUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;border:1px solid #cbd5e1;">Tour Page</a>
        <a href="https://wa.me/${cleanPhone}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">WhatsApp</a>
        <a href="tel:${escapeHtml(data.customerPhone)}" style="display:inline-block;background:#3b82f6;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Call</a>
      </div>
    </div>

    <div style="padding:16px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">MerrySails Reservation System</p>
    </div>
  </div>
</body>
</html>`;
}
