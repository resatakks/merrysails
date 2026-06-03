import {
  TURSAB_AGENCY_NAME,
  TURSAB_LEGAL_NAME,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";

export function escapeHtml(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function currencySymbol(currency: string): string {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "TRY":
      return "₺";
    case "GBP":
      return "£";
    default:
      return currency;
  }
}

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://merrysails.com").replace(/\/$/, "");

/**
 * Brand block for email headers — mirrors the Header.tsx pattern:
 * a navy-blue rounded-square tile with a white anchor icon, next to the
 * "Merry" + "Sails" wordmark. Uses inline SVG (Apple Mail / Gmail mobile /
 * iOS Mail render it; Outlook degrades gracefully to the navy tile).
 */
export function emailLogoBlock(opts: { onDark?: boolean } = {}): string {
  // 2026-06-03 redesign — the previous block crammed a coloured anchor tile,
  // a multi-coloured wordmark, and an all-caps "MERYEM YİLDİZ TRAVEL" line
  // into the hero. Reviewed live in Gmail desktop + iOS Mail and it looked
  // cluttered, especially when stacked on mobile. New treatment: clean
  // wordmark only, single accent colour for "Sails", optional onDark/onLight
  // variant. Trust signal moved to the body header (Reservation ID block).
  const onDark = opts.onDark ?? true;
  const merryColor = onDark ? "#ffffff" : "#0f172a";
  const sailsColor = onDark ? "#7da6ff" : "#182987";
  const subColor = onDark ? "#94a3b8" : "#64748b";
  return `
    <a href="${SITE_URL}" style="display:inline-block;text-decoration:none;color:inherit;">
      <span style="display:block;font-size:24px;font-weight:800;letter-spacing:-0.4px;line-height:1;color:${merryColor};">Merry<span style="color:${sailsColor};">Sails</span></span>
      <span style="display:block;margin-top:6px;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:${subColor};font-weight:600;">Bosphorus Cruises &amp; Yacht Charter</span>
    </a>
  `;
}

/**
 * Footer brand string — the legally-correct TURSAB-licensed agency name.
 */
export function emailLegalFooter(): string {
  return `
    <p style="color:#0f172a;font-size:13px;font-weight:700;margin:0;">MerrySails</p>
    <p style="color:#64748b;font-size:12px;margin:6px 0 0;">${escapeHtml(TURSAB_AGENCY_NAME)} &middot; TURSAB Licensed A Group Travel Agency &middot; License ${escapeHtml(TURSAB_LICENSE_NUMBER)}</p>
    <p style="color:#94a3b8;font-size:10.5px;margin:4px 0 0;">${escapeHtml(TURSAB_LEGAL_NAME)}</p>
  `;
}
