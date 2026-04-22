import {
  getBookingAbandonmentContext,
  getBookingAbandonmentTriggerLabel,
  normalizeBookingAbandonmentPhone,
  type BookingAbandonmentNotification,
} from "@/lib/booking-abandonment";
import { currencySymbol, escapeHtml } from "./helpers";

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-GB", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function bookingAbandonmentNotificationEmail(
  data: BookingAbandonmentNotification
): string {
  const context = getBookingAbandonmentContext(data.tourSlug);
  const symbol = currencySymbol(data.currency);
  const cleanPhone = normalizeBookingAbandonmentPhone(data.customerPhone).replace(
    /^\+/,
    ""
  );
  const hasWhatsapp = cleanPhone.length >= 7;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:20px;">
    <div style="background:#f59e0b;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
      <h1 style="color:#111827;margin:0;font-size:22px;">Abandoned Booking Lead</h1>
      <p style="color:#78350f;margin:6px 0 0;font-size:14px;">${escapeHtml(data.tourName)}</p>
    </div>

    <div style="background:#ffffff;border:1px solid #e2e8f0;padding:24px;">
      <div style="background:#fff7ed;border:1px solid #fdba74;border-radius:10px;padding:14px 16px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#9a3412;padding:4px 0;font-size:12px;">Trigger</td><td style="color:#111827;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(getBookingAbandonmentTriggerLabel(data.trigger))}</td></tr>
          <tr><td style="color:#9a3412;padding:4px 0;font-size:12px;">Captured At</td><td style="color:#111827;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(formatDateTime(data.occurredAt))}</td></tr>
          <tr><td style="color:#9a3412;padding:4px 0;font-size:12px;">Page Type</td><td style="color:#111827;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(context.pageLabel)}</td></tr>
          <tr><td style="color:#9a3412;padding:4px 0;font-size:12px;">Booking Flow</td><td style="color:#111827;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(context.bookingLabel)}</td></tr>
        </table>
      </div>

      <h3 style="color:#0f172a;margin:0 0 14px;font-size:16px;">Customer</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Name</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.customerName || "-")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Email</td><td style="padding:4px 0;text-align:right;">${
          data.customerEmail
            ? `<a href="mailto:${escapeHtml(data.customerEmail)}" style="color:#2563eb;">${escapeHtml(data.customerEmail)}</a>`
            : "-"
        }</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Phone</td><td style="padding:4px 0;text-align:right;">${
          data.customerPhone
            ? `<a href="tel:${escapeHtml(data.customerPhone)}" style="color:#2563eb;">${escapeHtml(data.customerPhone)}</a>`
            : "-"
        }</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Fields completed</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(
          data.fieldsCompleted.length > 0 ? data.fieldsCompleted.join(", ") : "-"
        )}</td></tr>
      </table>

      <h3 style="color:#0f172a;margin:0 0 14px;font-size:16px;">Booking Intent</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Tour</td><td style="color:#0f172a;padding:4px 0;text-align:right;font-weight:600;">${escapeHtml(data.tourName)}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Date</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.date)}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Time</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.time || "-")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Guests</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.guests}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Package</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.packageName || "-")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Add-ons</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.addOns.length > 0 ? data.addOns.join(", ") : "-")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Total shown</td><td style="color:#f59e0b;padding:4px 0;text-align:right;font-weight:700;">${symbol}${data.totalPrice}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Departure point</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${escapeHtml(data.departurePoint || "-")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px;">Private transfer</td><td style="color:#0f172a;padding:4px 0;text-align:right;">${data.privateTransferRequested ? "Requested" : "No"}</td></tr>
      </table>

      ${
        data.additionalGuests.length > 0
          ? `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="margin:0;color:#1d4ed8;font-size:13px;"><strong>Additional guests:</strong> ${escapeHtml(data.additionalGuests.join(", "))}</p></div>`
          : ""
      }
      ${
        data.customerMessage
          ? `<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="margin:0;color:#0f172a;font-size:13px;line-height:1.6;"><strong>Customer message:</strong> ${escapeHtml(data.customerMessage)}</p></div>`
          : ""
      }
      ${
        data.pageUrl
          ? `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:16px;"><p style="margin:0;color:#475569;font-size:13px;line-height:1.6;"><strong>Captured from:</strong> <a href="${escapeHtml(data.pageUrl)}" style="color:#2563eb;">${escapeHtml(data.pageUrl)}</a></p></div>`
          : ""
      }

      <div style="text-align:center;">
        <a href="${context.tourUrl}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Open Tour Page</a>
        ${
          context.supportGuideUrl
            ? `<a href="${context.supportGuideUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;border:1px solid #cbd5e1;">Meeting Guide</a>`
            : ""
        }
        ${
          data.customerEmail
            ? `<a href="mailto:${escapeHtml(data.customerEmail)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">Reply by Email</a>`
            : ""
        }
        ${
          data.customerPhone
            ? `<a href="tel:${escapeHtml(data.customerPhone)}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;border:1px solid #cbd5e1;">Call</a>`
            : ""
        }
        ${
          hasWhatsapp
            ? `<a href="https://wa.me/${cleanPhone}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:13px;margin:4px;">WhatsApp</a>`
            : ""
        }
      </div>
    </div>

    <div style="padding:16px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">MerrySails booking-abandonment alert</p>
    </div>
  </div>
</body>
</html>`;
}
