export const SITE_URL = "https://merrysails.com";
export const SITE_NAME = "MerrySails";
export const COMPANY_NAME = "Merry Tourism";
export const PHONE = "+905448989812";
export const PHONE_DISPLAY = "+90 544 898 98 12";
export const EMAIL = "info@merrysails.com";
export const WHATSAPP_URL = "https://wa.me/905448989812";
export const ADDRESS = "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih, Istanbul, Turkey";
export const MAX_BOOKING_GUESTS = 25;
export const TURSAB_LICENSE_NUMBER = "14316";
export const TURSAB_AGENCY_NAME = "Meryem Yildiz Travel";
export const TURSAB_LEGAL_NAME = "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI";

// Telegram contact channel — primary fallback for Russian visitors.
// WhatsApp has been blocked inside Russia since Feb 2026, so every WhatsApp
// CTA on `/ru` routes must route to Telegram instead. Handle is a placeholder
// until the user confirms the production Telegram account.
export const TELEGRAM_HANDLE = "merrysails"; // placeholder
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;
export const TELEGRAM_DISPLAY = "@merrysails";

/**
 * Returns the preferred messaging channel for a given locale.
 * - `ru` → Telegram (WhatsApp blocked in Russia since Feb 2026)
 * - anything else → WhatsApp
 *
 * Render layer can branch on `icon` to swap the lucide icon (or inline SVG).
 * `url` already includes the deep-link target and is safe for `<a href>`.
 */
export function getContactChannel(locale: string | null | undefined): {
  url: string;
  label: string;
  icon: "whatsapp" | "telegram";
} {
  if (locale === "ru") {
    return { url: TELEGRAM_URL, label: "Telegram", icon: "telegram" };
  }
  return { url: WHATSAPP_URL, label: "WhatsApp", icon: "whatsapp" };
}

/**
 * Variant of getContactChannel that appends a prefilled message body.
 * Useful for "Plan on WhatsApp" / "Plan on Telegram" intent CTAs.
 *
 * - WhatsApp uses `?text=` query (wa.me supports this)
 * - Telegram t.me does NOT support a prefill query, so the message is dropped
 *   silently — clicking still opens a chat with the account.
 */
export function getContactChannelWithMessage(
  locale: string | null | undefined,
  message: string,
): { url: string; label: string; icon: "whatsapp" | "telegram" } {
  const base = getContactChannel(locale);
  if (base.icon === "whatsapp") {
    return { ...base, url: `${base.url}?text=${encodeURIComponent(message)}` };
  }
  return base;
}
