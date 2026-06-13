export const SITE_URL = "https://merrysails.com";
export const SITE_NAME = "MerrySails";
export const COMPANY_NAME = "Merry Tourism";
export const PHONE = "+905448989812";
export const PHONE_DISPLAY = "+90 544 898 98 12";
export const EMAIL = "info@merrysails.com";
export const WHATSAPP_URL = "https://wa.me/905448989812";

// Google Business Profile review URL — operator-facing CTA for direct review
// asks (post-cruise WhatsApp, post-booking email, in-cabin QR). Discovered via
// Places API findplacefromtext 2026-06-13. Also injected into Organization
// sameAs so AI engines + Google entity graph reconcile the brand to its GBP.
export const GBP_PLACE_ID = "ChIJo5HLfp5GCgsRKqlEhm13b3k";
export const GBP_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GBP_PLACE_ID}`;

export const ADDRESS = "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih, Istanbul, Turkey";
export const MAX_BOOKING_GUESTS = 25;
export const TURSAB_LICENSE_NUMBER = "14316";
export const TURSAB_AGENCY_NAME = "Meryem Yildiz Travel";
export const TURSAB_LEGAL_NAME = "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI";

// 2026-06-02 — One contact channel for ALL locales: WhatsApp.
// (Previously /ru routed to Telegram on the false premise that WhatsApp was
// blocked in Russia from Feb 2026. That carve-out is removed everywhere.)
// `getContactChannel` still returns the same shape so downstream UI keeps
// branching on `icon`; the `"telegram"` branch never fires from this helper
// but the union member stays for type-compat with admin-only call sites.

/**
 * Returns the preferred messaging channel for a given locale.
 * Always WhatsApp now — single channel across en/tr/de/fr/nl/ru.
 */
export function getContactChannel(_locale: string | null | undefined): {
  url: string;
  label: string;
  icon: "whatsapp" | "telegram";
} {
  return { url: WHATSAPP_URL, label: "WhatsApp", icon: "whatsapp" };
}

/**
 * Variant of getContactChannel that appends a prefilled message body.
 * WhatsApp uses `?text=` query (wa.me supports this).
 */
export function getContactChannelWithMessage(
  locale: string | null | undefined,
  message: string,
): { url: string; label: string; icon: "whatsapp" | "telegram" } {
  const base = getContactChannel(locale);
  return { ...base, url: `${base.url}?text=${encodeURIComponent(message)}` };
}
