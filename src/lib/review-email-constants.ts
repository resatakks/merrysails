/**
 * Shared constants for the post-trip-review email AND its WhatsApp/Call
 * click tracker (/track/review-click). Both the email builder
 * (src/lib/email-templates/post-trip-review.ts) and the tracker page import
 * from here so the operator digits + discount message can never drift out
 * of sync between the two.
 *
 * SECURITY NOTE: the tracker page builds its redirect destination ENTIRELY
 * from these hardcoded constants — never from a query-string value. See
 * src/app/track/review-click/page.tsx.
 */

import { PHONE, WHATSAPP_URL } from "@/lib/constants";
import {
  getDiscountWhatsappText,
  isReviewLocale,
  type ReviewLocale,
} from "@/lib/email-templates/post-trip-review";

/** Operator WhatsApp number (E.164, no "+") — same value as WHATSAPP_URL. */
export const REVIEW_WHATSAPP_URL = WHATSAPP_URL;

/** Operator phone number for the Call button (tel: link). */
export const REVIEW_CALL_TEL = PHONE;

/**
 * Discount-card WhatsApp button destination: bare operator wa.me URL with the
 * locale-appropriate pre-filled WELCOMEBACK10 claim message. Mirrors the
 * exact construction used in postTripReviewEmail — resolves through the same
 * getDiscountWhatsappText() accessor so copy changes never go out of sync.
 * Falls back to `en` for any locale the tracker doesn't recognise.
 */
export function discountWhatsappUrlFor(locale?: string | null): string {
  const resolved: ReviewLocale =
    locale && isReviewLocale(locale) ? locale : "en";
  const text = getDiscountWhatsappText(resolved);
  return `${REVIEW_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

/** Contact-row WhatsApp button destination: bare wa.me, no prefilled text. */
export const contactWhatsappUrl = REVIEW_WHATSAPP_URL;

/** Call button destination. */
export const callTelUrl = `tel:${REVIEW_CALL_TEL}`;
