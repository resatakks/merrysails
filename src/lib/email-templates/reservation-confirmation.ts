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
import { currencySymbol, emailLegalFooter, emailLogoBlock, escapeHtml } from "./helpers";
import { getReservationEmailStrings } from "./reservation-confirmation-strings";
import { getMeetingPointMapUrl } from "@/lib/meeting-points";

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
  /** Subtotal before group discount. Set when groupDiscountSavings > 0. */
  originalTotal?: number;
  /** Amount saved via group discount. */
  groupDiscountSavings?: number;
  /** Promo code (kept for reference; not shown in UI). */
  groupDiscountCode?: string;
  /** Mixed-package booking line items (≥2 entries). When set, renders the
   * package mix instead of the single `packageName` row. */
  items?: { packageName: string; guests: number }[];
  /** Age-tier breakdown — 2026-05-25 child discount feature.
   * adults pay full, children (3-13) pay 50%, infants (0-3) are free. */
  guestBreakdown?: { adults: number; children: number; infants: number };
  /** € saved via the child 50% discount. Surfaced as a "Çocuk indirimi"
   * line under the price table when > 0. */
  childDiscountSavings?: number;
  /** Customer locale (en/tr/de/fr/nl/ru). Drives the per-locale email copy.
   * Additive + optional — defaults to "en" so the email is never broken by a
   * missing/unknown locale. (A DE/RU/FR/NL/TR customer used to receive an
   * all-English email; 2026-06-20.) */
  locale?: string;
  /** Overrides the computed "Guests" table row verbatim (e.g. "Up to 10
   * guests" for a capacity-priced private charter). Takes precedence over
   * guestBreakdown/guests when set. */
  guestSummaryOverride?: string;
  /** Free-text pickup/meeting-point note — set on phone/WhatsApp-arranged
   * bookings where there's no fixed tour departurePoint. Rendered as a
   * dedicated box, with a tappable Google Maps link when the text matches
   * a known location (see lib/meeting-points.ts). */
  meetingPointNote?: string;
  /** Fully-formatted payment sentence (e.g. "Payment: $110.00 cash on
   * board."). Replaces the generic pay-on-board bullet in Good to Know —
   * set on manual bookings where the amount/method is known upfront. */
  paymentNote?: string;
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
  t: ReturnType<typeof getReservationEmailStrings>,
  privateTransferRequested?: boolean,
  packageName?: string
): string {
  const guide = getExperienceSupportGuide(tourSlug, packageName);
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
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#1d4ed8;">${escapeHtml(t.supportLocation)}</th>
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#1d4ed8;">${escapeHtml(t.supportTransportTime)}</th>
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
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">${escapeHtml(t.supportHowToReach)}</p>
          ${renderBulletList(guide.directions)}
        </div>
      `
          : ""
      }
      ${
        guide.included && guide.included.length > 0
          ? `
        <div style="margin-top:14px;">
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">${escapeHtml(t.supportIncluded)}</p>
          ${renderBulletList(guide.included)}
        </div>
      `
          : ""
      }
      ${
        guide.excluded && guide.excluded.length > 0
          ? `
        <div style="margin-top:14px;">
          <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">${escapeHtml(t.supportExcluded)}</p>
          ${renderBulletList(guide.excluded)}
        </div>
      `
          : ""
      }
      ${
        privateTransferRequested
          ? `
        <div style="margin-top:16px;background:#fff7ed;border:1px solid #fdba74;border-radius:12px;padding:14px 16px;">
          <p style="color:#9a3412;font-size:13px;font-weight:700;margin:0 0 6px;">🚗 ${escapeHtml(t.supportPrivateTransfer)}</p>
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
            ${escapeHtml(t.supportViewDetails)}
          </a>
        </div>
      `
          : ""
      }
    </div>
  `;
}

export function reservationConfirmationEmail(data: ReservationConfirmationData): string {
  const t = getReservationEmailStrings(data.locale);
  const symbol = currencySymbol(data.currency);
  const reservationUrl = getReservationDetailUrl(data.reservationId);
  const invoiceUrl = getReservationInvoiceUrl(data.reservationId);
  const voucherUrl = getReservationVoucherUrl(data.reservationId);
  const tourUrl = getTourUrlBySlug(data.tourSlug);
  const supportGuideUrl = getExperienceSupportPageUrl(data.tourSlug);
  const variant = data.variant ?? "received";
  const isConfirmed = variant === "confirmed";
  const isPrivateYachtFlow = data.tourSlug === "yacht-charter-in-istanbul";
  // Tea/soft-drinks/snack hospitality is identical on the yacht and the
  // shared sunset cruise (verified against the catalog copy in
  // data/tours.ts) — only the dinner cruise and other products differ, so
  // they keep the generic drinksNote fallback.
  const hasCommonHospitality =
    isPrivateYachtFlow || data.tourSlug === "bosphorus-sunset-cruise";
  const cancellationSummary = isPrivateYachtFlow
    ? t.cancellation48
    : t.cancellation24;
  const heroBadge = isConfirmed ? t.badgeConfirmed : t.badgeReceived;
  const greetingBody = isConfirmed ? t.greetingConfirmed : t.greetingReceived;
  const reservationNote = isConfirmed
    ? t.noteBookingSecured
    : t.noteSaveReference;
  // When payment terms / the meeting point are already known at send time
  // (a manual booking, or any booking with these fields set), the generic
  // "will be confirmed / shared before departure" yacht bullets contradict
  // what was just shown above them — swap in a bullet that doesn't re-open
  // something already settled.
  const paymentAlreadyKnown = Boolean(data.paymentNote?.trim());
  const meetingPointAlreadyKnown = Boolean(data.meetingPointNote?.trim());
  const nextSteps = isConfirmed
    ? [
        t.nextConfirmed1,
        isPrivateYachtFlow
          ? (paymentAlreadyKnown ? t.nextConfirmedPayYachtKnown : t.nextConfirmedPayYacht)
          : t.nextConfirmedPay,
        isPrivateYachtFlow
          ? (meetingPointAlreadyKnown ? t.nextConfirmedBoardYachtKnown : t.nextConfirmedBoardYacht)
          : t.nextConfirmedBoard,
      ]
    : [
        t.nextReceived1,
        isPrivateYachtFlow ? t.nextReceivedConfirmYacht : t.nextReceivedConfirm,
        t.nextReceived3,
      ];

  return `
<!DOCTYPE html>
<html lang="${escapeHtml(data.locale && /^[a-z]{2}$/.test(data.locale) ? data.locale : "en")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${escapeHtml(t.documentTitle)}</title>
  <style>
    @media only screen and (max-width:480px) {
      .ms-hero { padding: 22px 18px 24px !important; }
      .ms-hero-title { font-size: 22px !important; line-height: 1.2 !important; margin-top: 14px !important; }
      .ms-hero-sub { font-size: 13px !important; line-height: 1.6 !important; }
      .ms-hero-badge { padding: 7px 14px !important; font-size: 11px !important; }
      .ms-wrap { padding: 16px 12px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div class="ms-wrap" style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <div class="ms-hero" style="background:linear-gradient(135deg,#0c1b2e 0%,#1a3a5c 55%,#1f3a5f 100%);border-radius:18px 18px 0 0;padding:30px 28px 30px;">
      ${emailLogoBlock({ onDark: true })}

      <div style="margin-top:24px;">
        <span class="ms-hero-badge" style="display:inline-block;background:rgba(34,197,94,0.18);border:1px solid rgba(74,222,128,0.4);border-radius:999px;padding:8px 16px;color:#86efac;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">
          ${heroBadge}
        </span>
      </div>

      <h1 class="ms-hero-title" style="color:#ffffff;margin:16px 0 0;font-size:26px;font-weight:800;line-height:1.2;letter-spacing:-0.3px;">${escapeHtml(data.tourName)}</h1>
      <p class="ms-hero-sub" style="color:#cbd5e1;margin:10px 0 0;font-size:14px;line-height:1.65;">
        ${greetingBody}
      </p>
    </div>

    <div style="background:#ffffff;padding:0 24px 32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 0 18px 18px;">
      <div style="padding-top:24px;margin-bottom:22px;">
        <h2 style="color:#0f172a;margin:0 0 8px;font-size:19px;font-weight:700;">${escapeHtml(t.dear(data.customerName))}</h2>
        <p style="color:#64748b;margin:0;font-size:14px;line-height:1.7;">
          ${escapeHtml(t.idConnectedPrefix)}<strong>${escapeHtml(data.reservationId)}</strong>${escapeHtml(t.idConnectedSuffix)}
        </p>
      </div>

      <div style="background:linear-gradient(135deg,#fef9e7 0%,#fef3c7 100%);border:1px solid #fde68a;border-radius:14px;padding:18px 20px;text-align:center;margin-bottom:22px;">
        <p style="color:#92400e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;font-weight:700;">${escapeHtml(t.reservationIdLabel)}</p>
        <p style="color:#78350f;font-size:25px;font-weight:800;margin:0;letter-spacing:2px;font-family:'Courier New',monospace;">${escapeHtml(data.reservationId)}</p>
        <p style="color:#a16207;font-size:12px;margin:8px 0 0;">${reservationNote}</p>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:22px;">
        <div style="background:#0f172a;padding:13px 18px;">
          <p style="color:#f7b52c;margin:0;font-size:14px;font-weight:700;">${escapeHtml(t.bookingDetails)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;width:38%;">${escapeHtml(t.tour)}</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${escapeHtml(data.tourName)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">${escapeHtml(t.date)}</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;">${escapeHtml(data.date)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">${escapeHtml(t.departure)}</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${escapeHtml(data.time)}</td>
          </tr>
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;">${escapeHtml(t.guests)}</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;">${
              data.guestSummaryOverride
                ? escapeHtml(data.guestSummaryOverride)
                : data.guestBreakdown && (data.guestBreakdown.children > 0 || data.guestBreakdown.infants > 0)
                ? (() => {
                    const parts: string[] = [];
                    if (data.guestBreakdown.adults > 0) {
                      parts.push(t.adults(data.guestBreakdown.adults));
                    }
                    if (data.guestBreakdown.children > 0) {
                      parts.push(t.children(data.guestBreakdown.children));
                    }
                    if (data.guestBreakdown.infants > 0) {
                      parts.push(t.infants(data.guestBreakdown.infants));
                    }
                    return escapeHtml(parts.join(", "));
                  })()
                : escapeHtml(t.guest(data.guests))
            }</td>
          </tr>
          ${
            data.childDiscountSavings && data.childDiscountSavings > 0
              ? `
          <tr>
            <td style="color:#16a34a;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;font-weight:600;">${escapeHtml(t.childDiscountLabel)}</td>
            <td style="color:#16a34a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:700;">−${symbol}${data.childDiscountSavings}</td>
          </tr>
          `
              : ""
          }
          ${
            data.groupDiscountSavings && data.groupDiscountSavings > 0 && data.originalTotal
              ? `
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;width:38%;">${escapeHtml(t.subtotal)}</td>
            <td style="color:#0f172a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;">${symbol}${data.originalTotal}</td>
          </tr>
          <tr>
            <td style="color:#16a34a;font-size:13px;padding:12px 18px;border-bottom:1px solid #f1f5f9;font-weight:600;">${escapeHtml(t.groupDiscount)}</td>
            <td style="color:#16a34a;font-size:14px;padding:12px 18px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:700;">−${symbol}${data.groupDiscountSavings}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="color:#64748b;font-size:13px;padding:12px 18px;">${escapeHtml(t.total)}</td>
            <td style="color:#0f172a;font-size:20px;padding:12px 18px;text-align:right;font-weight:800;">${symbol}${data.totalPrice}</td>
          </tr>
        </table>
      </div>

      ${
        data.meetingPointNote?.trim()
          ? (() => {
              const mapUrl = getMeetingPointMapUrl(data.meetingPointNote);
              const noteHtml = escapeHtml(data.meetingPointNote!.trim());
              return `
        <div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:14px;padding:16px 18px;margin-bottom:22px;">
          <p style="font-size:13px;color:#1e3a8a;font-weight:700;margin:0 0 8px;">📍 ${escapeHtml(t.meetingPoint)}</p>
          <p style="margin:0;font-size:14px;line-height:1.7;">${
            mapUrl
              ? `<a href="${mapUrl}" style="color:#1d4ed8;font-weight:700;text-decoration:underline;">${noteHtml}</a>`
              : `<span style="color:#1e3a8a;">${noteHtml}</span>`
          }</p>
        </div>
      `;
            })()
          : ""
      }

      ${
        (data.items && data.items.length >= 2) ||
        data.packageName ||
        (data.addOns && data.addOns.length > 0) ||
        data.privateTransferRequested ||
        (data.additionalGuests && data.additionalGuests.length > 0)
          ? `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
          <p style="color:#0f172a;font-size:14px;font-weight:700;margin:0 0 10px;">${escapeHtml(t.selectedOption)}</p>
          ${
            data.items && data.items.length >= 2
              ? `<p style="color:#334155;font-size:14px;margin:0 0 4px;"><strong>${escapeHtml(t.packagesLabel)}</strong></p><ul style="color:#334155;font-size:14px;margin:0 0 8px;padding-left:20px;line-height:1.7;">${data.items
                  .map(
                    (it) =>
                      `<li>${escapeHtml(it.packageName)} — ${escapeHtml(t.packageGuests(it.guests))}</li>`
                  )
                  .join("")}</ul>`
              : data.packageName
                ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>${escapeHtml(t.packageLabel)}</strong> ${escapeHtml(data.packageName)}</p>`
                : ""
          }
          ${
            data.addOns && data.addOns.length > 0
              ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>${escapeHtml(t.addOnsLabel)}</strong> ${escapeHtml(data.addOns.join(", "))}</p>`
              : ""
          }
          ${
            data.additionalGuests && data.additionalGuests.length > 0
              ? `<p style="color:#334155;font-size:14px;margin:0 0 8px;"><strong>${escapeHtml(t.otherPassengersLabel)}</strong> ${escapeHtml(data.additionalGuests.join(", "))}</p>`
              : ""
          }
          ${
            data.privateTransferRequested
              ? `<p style="color:#9a3412;font-size:14px;line-height:1.7;margin:0;"><strong>${escapeHtml(t.privateTransferInline)}</strong> ${escapeHtml(t.privateTransferInlineBody)}</p>`
              : ""
          }
        </div>
      `
          : ""
      }

      ${data.notes ? `
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:16px 18px;margin-bottom:22px;">
          <p style="color:#0369a1;font-size:13px;font-weight:700;margin:0 0 6px;">${escapeHtml(t.specialRequests)}</p>
          <p style="color:#0c4a6e;font-size:14px;line-height:1.7;margin:0;">${escapeHtml(data.notes)}</p>
        </div>
      ` : ""}

      ${isConfirmed ? renderSupportSection(data.tourSlug, t, data.privateTransferRequested, data.packageName) : ""}

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
        <p style="color:#166534;font-size:15px;font-weight:700;margin:0 0 10px;">${escapeHtml(t.whatsNext)}</p>
        ${renderBulletList(nextSteps)}
      </div>

      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
        <p style="color:#92400e;margin:0 0 8px;font-size:14px;font-weight:700;">${escapeHtml(t.goodToKnow)}</p>
        ${renderBulletList(
          [
            cancellationSummary,
            data.paymentNote ?? (isPrivateYachtFlow ? t.paymentYacht : t.paymentOnboard),
            hasCommonHospitality ? t.hospitalityIncludedNote : t.drinksNote,
            t.photographyNote,
            ...(isPrivateYachtFlow ? [t.byoNoteYacht] : []),
          ],
          "warm"
        )}
      </div>

      <div style="text-align:center;margin-bottom:22px;">
        <a href="${reservationUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4b2b,#ff0844);color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 8px;">
          ${escapeHtml(t.trackReservation)}
        </a>
        <a href="${invoiceUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          ${escapeHtml(t.openInvoice)}
        </a>
        <a href="${voucherUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;">
          ${escapeHtml(t.openVoucher)}
        </a>
        ${
          supportGuideUrl
            ? `<a href="${supportGuideUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          ${escapeHtml(t.meetingDetails)}
        </a>`
            : ""
        }
        <a href="${tourUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 6px 8px;border:1px solid #cbd5e1;">
          ${escapeHtml(t.experiencePage)}
        </a>
      </div>

      <!-- 2026-06-03: "Get ready / Bosphorus Guide" CTA block removed —
           per user feedback the section was visually disruptive and the
           Track Reservation / Open Invoice / Open Voucher buttons above
           already give guests the navigation they need. -->

      <!-- MerryTourism VIP transfer CTA removed 2026-05-26 (cross-brand cleanup) -->

      <div style="text-align:center;padding-top:18px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:14px;margin:0 0 14px;">${escapeHtml(t.needHelp)}</p>
        <a href="https://wa.me/905448989812" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          ${escapeHtml(t.whatsapp)}
        </a>
        <a href="tel:+905448989812" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          ${escapeHtml(t.callUs)}
        </a>
        <a href="mailto:info@merrysails.com" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:8px;font-weight:600;font-size:13px;margin:0 6px 8px;">
          ${escapeHtml(t.email)}
        </a>
      </div>
    </div>

    <div style="padding:18px 12px 0;text-align:center;">
      ${emailLegalFooter()}
      <p style="text-align:center;color:#94a3b8;font-size:10px;margin:14px 0 0;line-height:1.6;">
        ${escapeHtml(t.footerSent("merrysails.com"))}<br>
        ${escapeHtml(t.footerNotYou)} <a href="mailto:info@merrysails.com" style="color:#64748b;">${escapeHtml(t.footerContactUs)}</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
}
