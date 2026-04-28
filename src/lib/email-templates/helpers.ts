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
  const onDark = opts.onDark ?? true;
  const merryColor = onDark ? "#ffffff" : "#0f172a";
  const sailsColor = onDark ? "#7da6ff" : "#182987";
  const subColor = onDark ? "#94a3b8" : "#64748b";
  return `
    <table role="presentation" style="border-collapse:collapse;">
      <tr>
        <td style="vertical-align:middle;padding-right:10px;">
          <a href="${SITE_URL}" style="text-decoration:none;display:inline-block;">
            <table role="presentation" style="border-collapse:collapse;width:44px;height:44px;border-radius:14px;background:#182987;">
              <tr>
                <td style="width:44px;height:44px;text-align:center;vertical-align:middle;line-height:44px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;">
                    <path d="M12 22V8"/>
                    <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                    <circle cx="12" cy="5" r="3"/>
                  </svg>
                </td>
              </tr>
            </table>
          </a>
        </td>
        <td style="vertical-align:middle;">
          <a href="${SITE_URL}" style="text-decoration:none;color:inherit;">
            <span style="display:block;font-size:22px;font-weight:800;letter-spacing:-0.4px;line-height:1.1;color:${merryColor};">Merry<span style="color:${sailsColor};">Sails</span></span>
            <span style="display:block;margin-top:4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${subColor};">${escapeHtml(TURSAB_AGENCY_NAME)}</span>
          </a>
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
