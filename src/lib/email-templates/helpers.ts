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
 * Brand block for email headers. Uses a remote logo image with a styled text
 * fallback so clients that block images still see the MerrySails brand.
 */
export function emailLogoBlock(opts: { onDark?: boolean } = {}): string {
  const onDark = opts.onDark ?? true;
  const titleColor = onDark ? "#ffffff" : "#0f172a";
  const subColor = onDark ? "#94a3b8" : "#64748b";
  const tileBg = onDark ? "#0c2d48" : "#f1f5f9";
  return `
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:60px;vertical-align:top;">
          <a href="${SITE_URL}" style="text-decoration:none;display:inline-block;width:48px;height:48px;border-radius:14px;background:${tileBg};text-align:center;">
            <img src="${SITE_URL}/logo.svg" alt="MerrySails" width="48" height="48" style="display:inline-block;width:48px;height:48px;border:0;outline:none;border-radius:14px;" />
          </a>
        </td>
        <td style="vertical-align:middle;padding-left:6px;">
          <p style="color:${titleColor};margin:0;font-size:24px;font-weight:800;letter-spacing:-0.4px;line-height:1.1;">MerrySails</p>
          <p style="color:${subColor};margin:4px 0 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(TURSAB_AGENCY_NAME)}</p>
        </td>
      </tr>
    </table>
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
