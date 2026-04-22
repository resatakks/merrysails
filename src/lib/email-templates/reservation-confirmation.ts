import {
  getReservationDetailUrl,
  getReservationInvoiceUrl,
  getReservationVoucherUrl,
  getTourUrlBySlug,
} from "@/lib/reservation-links";
import {
  getExperienceSupportGuide,
  getExperienceSupportPageUrl,
} from "@/lib/experience-support";
import { currencySymbol, escapeHtml } from "./helpers";

interface ReservationConfirmationData {
  reservationId: string;
  customerName: string;
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
  variant?: "received" | "confirmed";
}

function renderFactsTable(
  facts: Array<{ label: string; value: string }>
): string {
  return `
    <table style="width:100%;border-collapse:collapse;">
      ${facts
        .map(
          (fact) => `
        <tr>
          <td style="color:#64748b;padding:7px 0;font-size:13px;width:38%;">${escapeHtml(fact.label)}</td>
          <td style="color:#0f172a;padding:7px 0;text-align:right;font-weight:600;font-size:13px;">${escapeHtml(fact.value)}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

function renderBulletList(items: string[], tone: "neutral" | "warm" = "neutral"): string {
  const color = tone === "warm" ? "#92400e" : "#334155";
  return `
    <ul style="margin:10px 0 0;padding-left:20px;color:${color};font-size:13px;line-height:1.8;">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderSupportSection(
  tourSlug: string,
  privateTransferRequested?: boolean
): string {
  const guide = getExperienceSupportGuide(tourSlug);
  const guideUrl = getExperienceSupportPageUrl(tourSlug);

  if (!guide) {
    return "";
  }

  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:24px;">
      <p style="color:#0f172a;font-size:15px;font-weight:700;margin:0 0 8px;">📍 ${escapeHtml(guide.supportLabel)}</p>
      <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 14px;">${escapeHtml(guide.summary)}</p>
      ${renderFactsTable(guide.facts)}
      ${
        guide.shuttleRows && guide.shuttleRows.length > 0
          ? `
        <div style="margin-top:14px;border:1px solid #dbeafe;border-radius:12px;overflow:hidden;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#eff6ff;">
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Location</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#1d4ed8;">Transportation time</th>
              </tr>
            </thead>
            <tbody>
              ${guide.shuttleRows
                .map(
                  (row) => `
                <tr>
                  <td style="padding:10px 12px;border-top:1px solid #dbeafe;font-size:13px;color:#0f172a;font-weight:600;">${escapeHtml(row.location)}</td>
                  <td style="padding:10px 12px;border-top:1px solid #dbeafe;font-size:13px;color:#334155;">${escapeHtml(row.time)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        ${
          guide.shuttleNote
            ? `<p style="color:#475569;font-size:13px;line-height:1.7;margin:12px 0 0;">${escapeHtml(guide.shuttleNote)}</p>`
            : ""
        }
        ${
          guide.shuttleExtraNote
            ? `<p style="color:#92400e;font-size:13px;line-height:1.7;margin:8px 0 0;">${escapeHtml(guide.shuttleExtraNote)}</p>`
            : ""
        }
      `
          : ""
      }
      ${
        guide.directions && guide.directions.length > 0
          ? `
        <div style="margin-top:14px;">
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">How to reach the meeting point</p>
          ${renderBulletList(guide.directions)}
        </div>
      `
          : ""
      }
      ${
        guide.included && guide.included.length > 0
          ? `
        <div style="margin-top:14px;">
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">Included</p>
          ${renderBulletList(guide.included)}
        </div>
      `
          : ""
      }
      ${
        guide.excluded && guide.excluded.length > 0
          ? `
        <div style="margin-top:14px;">
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">Excluded</p>
          ${renderBulletList(guide.excluded)}
        </div>
      `
          : ""
      }
      ${
        privateTransferRequested
          ? `
        <div style="margin-top:16px;background:#fff7ed;border:1px solid #fdba74;border-radius:12px;padding:14px 16px;">
          <p style="color:#9a3412;font-size:13px;font-weight:700;margin:0 0 6px;">🚗 Private transfer requested</p>
          <p style="color:#9a3412;font-size:13px;line-height:1.7;margin:0;">${escapeHtml(guide.privateTransferNote)}</p>
        </div>
      `
          : ""
      }
      ${
        guideUrl
          ? `
        <div style="margin-top:16px;text-align:center;">
          <a href="${guideUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;">
            View Meeting & Boarding Details
          </a>
        </div>
      `
          : ""
      }
    </div>
  `;
}

export function reservationConfirmationEmail(data: ReservationConfirmationData): string {
  const symbol = currencySymbol(data.currency);
  const reservationUrl = getReservationDetailUrl(data.reservationId);
  const invoiceUrl = getReservationInvoiceUrl(data.reservationId);
  const voucherUrl = getReservationVoucherUrl(data.reservationId);
  const tourUrl = getTourUrlBySlug(data.tourSlug);
  const supportGuideUrl = getExperienceSupportPageUrl(data.tourSlug);
  const variant = data.variant ?? "received";
  const isConfirmed = variant === "confirmed";
  const isPrivateYachtFlow = data.tourSlug === "yacht-charter-in-istanbul";
  const cancellationSummary = isPrivateYachtFlow
    ? "Free cancellation up to 48 hours before departure"
    : "Free cancellation up to 24 hours before departure";
  const heroBadge = isConfirmed
    ? "Reservation Confirmed"
    : "Reservation Received";
  const greetingBody = isConfirmed
    ? "Great news — your reservation is now confirmed. Your selected departure is secured, and two separate PDF files are attached for quick access: your invoice and your voucher."
    : "Thank you for choosing MerrySails. Your reservation has been received and our team will review the booking details shortly.";
  const reservationNote = isConfirmed
    ? "Your booking is now secured"
    : "Please save this reference";
  const nextSteps = isConfirmed
    ? [
        "Your date and selected option are now confirmed.",
        isPrivateYachtFlow
          ? "Our operations team will confirm the payment schedule in writing."
          : "Payment will be collected on board by cash or card.",
        isPrivateYachtFlow
          ? "The final marina pin and boarding contact will be shared before departure."
          : "Arrive 15 minutes before departure and keep your voucher open on your phone.",
      ]
    : [
        "Our team will review your booking and confirm availability.",
        isPrivateYachtFlow
          ? "You will receive the charter follow-up and confirmation steps by email or WhatsApp."
          : "You will receive a confirmation message via email or WhatsApp.",
        "Keep this reservation ID ready for support and follow-up.",
      ];

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

    <div style="background:linear-gradient(135deg,#0c1b2e 0%,#1a3a5c 50%,#0f2847 100%);border-radius:18px 18px 0 0;padding:28px 24px 34px;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:auto 0 0 0;height:32px;background:linear-gradient(180deg,rgba(247,181,44,0) 0%,rgba(247,181,44,0.22) 100%);"></div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="width:56px;vertical-align:top;">
            <div style="width:44px;height:44px;border-radius:14px;background:#0c2d48;color:#f7b52c;font-size:22px;line-height:44px;text-align:center;font-weight:800;">M</div>
          </td>
          <td style="vertical-align:top;">
            <p style="color:#ffffff;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.4px;">MerrySails</p>
            <p style="color:#94a3b8;margin:4px 0 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Merry Tourism</p>
          </td>
        </tr>
      </table>

      <div style="margin-top:22px;">
        <div style="display:inline-block;background:rgba(34,197,94,0.16);border:1px solid rgba(74,222,128,0.35);border-radius:999px;padding:9px 18px;color:#4ade80;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
          ${heroBadge}
        </div>
      </div>

      <h1 style="color:#ffffff;margin:18px 0 0;font-size:28px;font-weight:800;line-height:1.15;">${escapeHtml(data.tourName)}</h1>
      <p style="color:#cbd5e1;margin:10px 0 0;font-size:14px;line-height:1.7;">
        ${greetingBody}
      </p>
    </div>

    <div style="background:#ffffff;padding:0 24px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 0 18px 18px;">
      <div style="padding-top:24px;margin-bottom:22px;">
        <h2 style="color:#0f172a;margin:0 0 8px;font-size:19px;font-weight:700;">Dear ${escapeHtml(data.customerName)},</h2>
        <p style="color:#64748b;margin:0;font-size:14px;line-height:1.7;">
          Reservation ID <strong>${escapeHtml(data.reservationId)}</strong> is now connected to your booking record.
        </p>
      </div>

      <div style="background:linear-gradient(135deg,#fef9e7 0%,#fef3c7 100%);border:1px solid #fde68a;border-radius:14px;padding:18px 20px;text-align:center;margin-bottom:22px;">
        <p style="color:#92400e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;font-weight:700;">Reservation ID</p>
        <p style="color:#78350f;font-size:25px;font-weight:800;margin:0;letter-spacing:2px;font-family:'Courier New',monospace;">${escapeHtml(data.reservationId)}</p>
        <p style="color:#a16207;font-size:12px;margin:8px 0 0;">${reservationNote}</p>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:22px;">
        <div style="background:#0f172a;padding:13px 18px;">
          <p style="color:#f7b52c;margin:0;font-size:14px;font-weight:700;">Booking Details</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;width:38%;">Tour</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${escapeHtml(data.tourName)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">Date</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;">${escapeHtml(data.date)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">Departure</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${escapeHtml(data.time)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">Guests</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;">${data.guests} ${data.guests === 1 ? "guest" : "guests"}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;">Total</td>
            <td style="color:#0f172a;font-size:20px;padding:12px 18px;text-align:right;font-weight:800;">${symbol}${data.totalPrice}</td>
          </tr>
        </table>
      </div>

      ${
        data.packageName ||
        (data.addOns && data.addOns.length > 0) ||
        data.privateTransferRequested ||
        (data.additionalGuests && data.additionalGuests.length > 0)
          ? `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
          <p style="color:#0f172a;font-size:14px;font-weight:700;margin:0 0 10px;">Selected Booking Option</p>
          ${data.packageName ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>Package:</strong> ${escapeHtml(data.packageName)}</p>` : ""}
          ${
            data.addOns && data.addOns.length > 0
              ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>Add-ons:</strong> ${escapeHtml(data.addOns.join(", "))}</p>`
              : ""
          }
          ${
            data.additionalGuests && data.additionalGuests.length > 0
              ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>Other passengers:</strong> ${escapeHtml(data.additionalGuests.join(", "))}</p>`
              : ""
          }
          ${
            data.privateTransferRequested
              ? `<p style="color:#9a3412;font-size:14px;line-height:1.7;margin:0;"><strong>Private transfer:</strong> Requested separately. Our team will contact you before departure.</p>`
              : ""
          }
        </div>
      `
          : ""
      }

      ${data.notes ? `
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:16px 18px;margin-bottom:22px;">
          <p style="color:#0369a1;font-size:13px;font-weight:700;margin:0 0 6px;">Your Special Requests</p>
          <p style="color:#0c4a6e;font-size:14px;line-height:1.7;margin:0;">${escapeHtml(data.notes)}</p>
        </div>
      ` : ""}

      ${isConfirmed ? renderSupportSection(data.tourSlug, data.privateTransferRequested) : ""}

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
        <p style="color:#166534;font-size:15px;font-weight:700;margin:0 0 10px;">What's next</p>
        ${renderBulletList(nextSteps)}
      </div>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
        <p style="color:#92400e;margin:0 0 8px;font-size:14px;font-weight:700;">Good to know</p>
        ${renderBulletList(
          [
            cancellationSummary,
            isPrivateYachtFlow
              ? "Payment timing is confirmed in writing for your charter."
              : "Payment is collected on board by cash or card.",
            "Drinks and inclusions depend on the package selected on your booked experience page.",
            "Professional photography may be available on board depending on the experience.",
          ],
          "warm"
        )}
      </div>

      <div style="text-align:center;margin-bottom:22px;">
        <a href="${reservationUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4b2b,#ff0844);color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 8px;">
          Track Reservation
        </a>
        <a href="${invoiceUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          Open Invoice
        </a>
        <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
          Open Voucher
        </a>
        ${
          supportGuideUrl
            ? `<a href="${supportGuideUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          Meeting Details
        </a>`
            : ""
        }
        <a href="${tourUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          Experience Page
        </a>
      </div>

      <div style="text-align:center;padding-top:18px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:14px;margin:0 0 14px;">Need help? We are here for you.</p>
        <a href="https://wa.me/905370406822" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          WhatsApp
        </a>
        <a href="tel:+905370406822" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          Call Us
        </a>
        <a href="mailto:info@merrysails.com" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          Email
        </a>
      </div>
    </div>

    <div style="padding:18px 12px 0;text-align:center;">
      <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">MerrySails</p>
      <p style="color:#64748b;font-size:12px;margin:6px 0 0;">Merry Tourism | TURSAB Licensed A Group Travel Agency</p>
      <p style="text-align:center;color:#94a3b8;font-size:10px;margin:14px 0 0;line-height:1.6;">
        This email was sent because a booking was made on merrysails.com.<br>
        If you did not make this reservation, please <a href="mailto:info@merrysails.com" style="color:#64748b;">contact us</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
}
