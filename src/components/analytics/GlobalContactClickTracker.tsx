"use client";

import { useEffect } from "react";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

/**
 * Site-wide safety net for WhatsApp / phone conversion tracking.
 *
 * Most contact CTAs use <TrackedContactLink>, but ~37 files still render a raw
 * <a href={WHATSAPP_URL}> (footer, page CTAs, hero buttons). Without this, those
 * clicks never fire the whatsapp_click / phone_click GA4 + Google Ads conversion
 * events — massively undercounting the primary conversion channel.
 *
 * This attaches ONE delegated listener on document. Anchors already instrumented
 * by TrackedContactLink carry data-contact-tracked="1" and are skipped here, so
 * no event is counted twice.
 */
export default function GlobalContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      // Skip anchors handled by TrackedContactLink (avoids double-counting).
      if (anchor.dataset.contactTracked === "1") return;

      const href = (anchor.getAttribute("href") || "").trim();
      if (!href) return;

      const isWhatsApp = /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i.test(href);
      const isPhone = href.startsWith("tel:");
      if (!isWhatsApp && !isPhone) return;

      const location =
        typeof window !== "undefined" ? window.location.pathname : "unknown";
      const label = (anchor.textContent || "").trim().slice(0, 80) || "contact-link";

      if (isWhatsApp) {
        trackWhatsAppClick({ label, location });
      } else {
        trackPhoneClick({ label, location });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
