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

// 2026-06-02 — One customer contact channel for ALL locales (incl. ru):
// WhatsApp. There is no Telegram customer CTA anywhere; the Telegram bot is
// internal ops-only and unrelated to these helpers.

/**
 * Returns the customer messaging channel for a given locale.
 * Always WhatsApp — single channel across en/tr/de/fr/nl/ru.
 */
export function getContactChannel(_locale: string | null | undefined): {
  url: string;
  label: string;
  icon: "whatsapp";
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
): { url: string; label: string; icon: "whatsapp" } {
  const base = getContactChannel(locale);
  return { ...base, url: `${base.url}?text=${encodeURIComponent(message)}` };
}
