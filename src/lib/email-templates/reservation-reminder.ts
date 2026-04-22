import {
  getReservationDetailUrl,
  getReservationVoucherUrl,
} from "@/lib/reservation-links";
import {
  getExperienceSupportGuide,
  getExperienceSupportPageUrl,
} from "@/lib/experience-support";
import { escapeHtml } from "./helpers";

interface ReservationReminderData {
  reservationId: string;
  customerName: string;
  tourName: string;
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  departurePoint?: string;
  packageName?: string;
  addOns?: string[];
  privateTransferRequested?: boolean;
}

function renderReminderFacts(
  facts: Array<{ label: string; value: string }>
): string {
  return `
    <table style="width:100%;border-collapse:collapse;">
      ${facts
        .map(
          (fact) => `
        <tr>
          <td style="color:#64748b;padding:6px 0;font-size:13px;width:38%;">${escapeHtml(fact.label)}</td>
          <td style="color:#0f172a;padding:6px 0;text-align:right;font-weight:600;font-size:13px;">${escapeHtml(fact.value)}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

export function reservationReminderEmail(data: ReservationReminderData): string {
  const reservationUrl = getReservationDetailUrl(data.reservationId);
  const voucherUrl = getReservationVoucherUrl(data.reservationId);
  const supportGuide = getExperienceSupportGuide(data.tourSlug);
  const supportGuideUrl = getExperienceSupportPageUrl(data.tourSlug);
  const hasExtras = Boolean(
    data.packageName ||
      (data.addOns && data.addOns.length > 0) ||
      data.privateTransferRequested
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px 16px;">
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1b3160 55%,#15284f 100%);border-radius:18px 18px 0 0;padding:26px 22px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:54px;vertical-align:top;">
            <div style="width:42px;height:42px;border-radius:13px;background:#0c2d48;color:#f7b52c;font-size:21px;line-height:42px;text-align:center;font-weight:800;">M</div>
          </td>
          <td style="vertical-align:top;">
            <p style="color:#ffffff;margin:0;font-size:22px;font-weight:800;">MerrySails</p>
            <p style="color:#94a3b8;margin:4px 0 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Reminder Email</p>
          </td>
        </tr>
      </table>

      <div style="margin-top:18px;display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(247,181,44,0.14);border:1px solid rgba(247,181,44,0.24);color:#f7b52c;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
        Cruise starts soon
      </div>
      <h1 style="color:#ffffff;margin:14px 0 0;font-size:26px;font-weight:800;line-height:1.2;">Your Bosphorus cruise starts soon</h1>
      <p style="color:#cbd5e1;margin:10px 0 0;font-size:14px;line-height:1.7;">
        We are sending your meeting details, timing, and quick boarding reminders before departure.
      </p>
    </div>

    <div style="background:#fff;padding:24px 22px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 18px 18px;">
      <p style="color:#0f172a;margin:0 0 16px;font-size:15px;line-height:1.7;">
        Hi ${escapeHtml(data.customerName)}, your <strong>${escapeHtml(data.tourName)}</strong> booking is coming up soon. Please keep your voucher handy and plan to arrive a little early for a smooth boarding flow.
      </p>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:20px;">
        ${renderReminderFacts([
          { label: "Reservation ID", value: data.reservationId },
          { label: "Experience", value: data.tourName },
          { label: "Date", value: data.date },
          { label: "Departure time", value: data.time },
          { label: "Guests", value: String(data.guests) },
          ...(data.packageName ? [{ label: "Package", value: data.packageName }] : []),
        ])}
      </div>

      ${
        data.departurePoint
          ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:16px 18px;margin-bottom:20px;">
          <p style="color:#1d4ed8;margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Meeting Point</p>
          <p style="color:#1e3a8a;margin:0;font-size:14px;line-height:1.7;">${escapeHtml(data.departurePoint)}</p>
        </div>
      `
          : ""
      }

      ${
        supportGuide
          ? `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:20px;">
          <p style="color:#0f172a;margin:0 0 8px;font-size:14px;font-weight:700;">${escapeHtml(supportGuide.supportLabel)}</p>
          <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 12px;">${escapeHtml(supportGuide.summary)}</p>
          ${renderReminderFacts(supportGuide.facts.slice(0, 3))}
          ${
            supportGuide.shuttleRows && supportGuide.shuttleRows.length > 0
              ? `<p style="color:#475569;font-size:13px;line-height:1.7;margin:12px 0 0;">${escapeHtml(supportGuide.shuttleNote ?? "")}</p>`
              : ""
          }
        </div>
      `
          : ""
      }

      ${
        hasExtras
          ? `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;margin-bottom:20px;">
          <p style="color:#0f172a;margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Selected Option</p>
          ${data.packageName ? `<p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 4px;"><strong>Package:</strong> ${escapeHtml(data.packageName)}</p>` : ""}
          ${data.addOns && data.addOns.length > 0 ? `<p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 4px;"><strong>Add-ons:</strong> ${escapeHtml(data.addOns.join(", "))}</p>` : ""}
          ${
            data.privateTransferRequested
              ? `<p style="color:#9a3412;font-size:14px;line-height:1.7;margin:0;"><strong>Private transfer:</strong> Requested separately. Our team will contact you with the final pickup plan.</p>`
              : ""
          }
        </div>
      `
          : ""
      }

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:16px 18px;margin-bottom:20px;">
        <p style="color:#92400e;margin:0;font-size:13px;font-weight:700;">Before you arrive</p>
        <ul style="color:#92400e;margin:8px 0 0;padding-left:20px;font-size:13px;line-height:1.8;">
          <li>Please arrive <strong>15 minutes early</strong></li>
          <li>Keep your reservation ID and voucher open on your phone</li>
          <li>Bring a light jacket because it can feel cooler on the water</li>
          <li>Reply on WhatsApp if you need last-minute help with the meeting point</li>
        </ul>
      </div>

      <div style="text-align:center;margin-bottom:20px;">
        <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
          Open Voucher
        </a>
        <a href="${reservationUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4b2b,#ff0844);color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
          Reservation Details
        </a>
        ${
          supportGuideUrl
            ? `<a href="${supportGuideUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          Meeting Details
        </a>`
            : ""
        }
      </div>

      <p style="color:#64748b;font-size:13px;margin:0;line-height:1.7;">
        Need to reach us quickly? WhatsApp: <a href="https://wa.me/905370406822" style="color:#f59e0b;font-weight:700;">+90 537 040 68 22</a>
      </p>
    </div>

    <div style="padding:16px;text-align:center;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">MerrySails — Merry Tourism | TURSAB 14316</p>
    </div>
  </div>
</body>
</html>`;
}
