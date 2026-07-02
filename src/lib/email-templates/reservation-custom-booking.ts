import {
  getReservationDetailUrl,
  getReservationInvoiceUrl,
  getReservationVoucherUrl,
} from "@/lib/reservation-links";
import { emailLegalFooter, escapeHtml, currencySymbol } from "./helpers";

/**
 * Custom-booking confirmation email — used for phone- or WhatsApp-arranged
 * private bookings (e.g. Private Princes' Island Swimming Tour) where the
 * standard package/time/cash-or-card copy from reservation-confirmation.ts
 * doesn't apply. Reusable for future bespoke bookings.
 */
export interface ReservationCustomBookingEmailData {
  reservationId: string;
  customerName: string;
  tourName: string;
  date: string;
  pickup: string;
  totalPrice: number;
  currency: string;
  paymentNote?: string;
  customerPhone?: string;
  meetingPointNote?: string;
  guestCount?: number;
}

export function reservationCustomBookingEmail(
  data: ReservationCustomBookingEmailData
): string {
  const reservationUrl = getReservationDetailUrl(data.reservationId);
  const voucherUrl = getReservationVoucherUrl(data.reservationId);
  const invoiceUrl = getReservationInvoiceUrl(data.reservationId);
  const totalDisplay = `${currencySymbol(data.currency)}${data.totalPrice.toFixed(2)}`;
  const paymentNote =
    data.paymentNote?.trim() || "Payment is collected directly on the day of the experience.";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <div style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">

      <div style="background:linear-gradient(135deg,#0c1b2e,#0f2847);padding:22px 28px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle;">
              <table style="border-collapse:collapse;">
                <tr>
                  <td style="width:42px;vertical-align:middle;">
                    <div style="width:42px;height:42px;border-radius:13px;background:#0c2d48;color:#f7b52c;font-size:21px;line-height:42px;text-align:center;font-weight:800;">M</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.3px;">Merry<span style="color:#f7b52c;">Sails</span></div>
                    <div style="color:#cbd5e1;font-size:11px;margin-top:2px;">Merry Tourism</div>
                  </td>
                </tr>
              </table>
            </td>
            <td style="text-align:right;vertical-align:middle;">
              <div style="font-size:11px;color:#f7b52c;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">MerrySails</div>
              <div style="color:#ffffff;font-size:19px;font-weight:800;margin-top:3px;">Booking Confirmed</div>
              <div style="color:#cbd5e1;font-size:11px;margin-top:4px;">Private booking arranged by phone.</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="height:5px;background:linear-gradient(90deg,#f7b52c,#ff8a00);"></div>

      <div style="padding:28px;">
        <p style="color:#0f172a;margin:0 0 18px;font-size:15px;line-height:1.7;">
          Hi ${escapeHtml(data.customerName)}, your private booking with MerrySails is confirmed. Below is your reservation summary — please keep this email and the attached voucher handy.
        </p>

        <div style="display:flex;justify-content:space-between;margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid #e2e8f0;">
          <div>
            <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Reservation ID</div>
            <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:15px;letter-spacing:0.04em;">${escapeHtml(data.reservationId)}</div>
          </div>
          <div style="text-align:right;">
            <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Total</div>
            <div style="color:#0f172a;font-weight:800;margin-top:5px;font-size:18px;">${escapeHtml(totalDisplay)}</div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">
          <tr>
            <td style="width:50%;padding:0 12px 14px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Lead Guest</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(data.customerName)}${data.guestCount && data.guestCount > 0 ? ` (${data.guestCount} guest${data.guestCount > 1 ? "s" : ""})` : ""}</div>
            </td>
            <td style="width:50%;padding:0 0 14px 12px;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Experience</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(data.tourName)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 12px 14px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Date</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(data.date)}</div>
            </td>
            <td style="padding:0 0 14px 12px;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Pickup</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(data.pickup)}</div>
            </td>
          </tr>
          ${
            data.customerPhone
              ? `<tr>
            <td style="padding:0 12px 4px 0;vertical-align:top;">
              <div style="color:#64748b;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-size:11px;">Phone</div>
              <div style="color:#0f172a;font-weight:600;margin-top:5px;font-size:14px;">${escapeHtml(data.customerPhone)}</div>
            </td>
            <td style="padding:0 0 4px 12px;"></td>
          </tr>`
              : ""
          }
        </table>

        ${
          data.meetingPointNote?.trim()
            ? `<div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:14px;padding:16px 18px;margin-bottom:18px;">
          <p style="font-size:13px;color:#1e3a8a;font-weight:700;margin:0 0 8px;">Meeting point</p>
          <p style="margin:0;font-size:13px;color:#1e3a8a;line-height:1.7;">${escapeHtml(data.meetingPointNote.trim())}</p>
        </div>`
            : ""
        }

        <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:14px;padding:16px 18px;margin-bottom:22px;">
          <p style="font-size:13px;color:#92400e;font-weight:700;margin:0 0 8px;">Good to know</p>
          <p style="margin:0;font-size:13px;color:#92400e;line-height:1.7;">
            • Free cancellation up to 24 hours before departure.<br />
            • ${escapeHtml(paymentNote)}<br />
            • Keep your reservation ID handy on your phone.
          </p>
        </div>

        <div style="text-align:center;margin-bottom:6px;">
          <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
            Open Voucher
          </a>
          <a href="${invoiceUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
            Open Invoice
          </a>
          <a href="${reservationUrl}" style="display:inline-block;background:linear-gradient(135deg,#f7b52c,#ff8a00);color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
            Reservation Details
          </a>
        </div>

        <p style="color:#64748b;font-size:13px;margin:18px 0 0;line-height:1.7;text-align:center;">
          Reach us anytime on WhatsApp: <a href="https://wa.me/905448989812" style="color:#f59e0b;font-weight:700;text-decoration:none;">+90 544 898 98 12</a>
        </p>
      </div>

      <div style="text-align:center;color:#94a3b8;font-size:11px;padding:18px 28px;border-top:1px solid #e2e8f0;line-height:1.7;">
        <div style="color:#64748b;font-weight:700;">MerrySails · Meryem Yıldız Travel</div>
        TURSAB A Group licensed since 2001 · merrysails.com · info@merrysails.com<br />
        This confirmation was issued because a private booking was arranged by phone.
      </div>
    </div>

    <div style="padding:16px;text-align:center;">
      ${emailLegalFooter()}
    </div>
  </div>
</body>
</html>`;
}
