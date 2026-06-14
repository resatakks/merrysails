"use client";

/**
 * ReviewCtaBlock
 * --------------
 * 2026-06-14 — Post-conversion "Leave us a review" CTA to drive Google review
 * velocity (operator goal: MerrySails only 6 reviews — too low). Rendered on
 * the reservation confirmation page only (the happy moment, post-booking).
 *
 * - Uses GBP_REVIEW_URL constant (src/lib/constants.ts) — never hardcoded.
 * - Fires GA4 custom event `review_cta_click` on click (via trackEvent).
 * - English copy: MerrySails serves English-speaking international tourists.
 */

import { Star } from "lucide-react";
import { GBP_REVIEW_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export default function ReviewCtaBlock() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-5 text-center">
      <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
      </div>
      <p className="text-sm text-[var(--body-text)] mb-4">
        Enjoyed your time on the Bosphorus? A quick Google review helps fellow
        travelers find us — and means the world to our crew.
      </p>
      <a
        href={GBP_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("review_cta_click", { location: "reservation_confirmation" })}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-amber-400 text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-all"
      >
        <Star className="w-4 h-4" />
        Leave a Google review
      </a>
    </div>
  );
}
