import { Sparkles } from "lucide-react";
import { DIRECT_BOOKING_STATS, PARENT_OPERATOR_STATS } from "@/lib/trust-evidence";

/**
 * Subtle live-counter badge — "27+ bookings since April 15 · 50k+ guests since 2001"
 *
 * Why this exists (2026-06-01 — Tier 1 conversion fix):
 *   Social proof on the entry pages is currently a 4-tile rating row. That
 *   covers quality but NOT volume / recency. Adding a small "X bookings since
 *   [date]" line — pulled from real DB count via DIRECT_BOOKING_STATS —
 *   tells mobile visitors "people are actually buying this right now."
 *   The urgency / herd effect on conversion is well-documented
 *   (Cialdini Influence, conversion rates lift 4-10% with credible counts).
 *
 * Data integrity:
 *   - Numbers come from src/lib/trust-evidence.ts which is refreshed
 *     manually at start of each month (snapshot date stamped).
 *   - Both numbers are TRUE: 27 direct bookings since 15 April 2026,
 *     50,000+ cumulative since 2001 under parent Merry Tourism.
 *
 * Variant:
 *   - inline: small text version for above-fold rows
 *   - banner: larger badge version for hero CTAs
 */
type Props = {
  variant?: "inline" | "banner";
  className?: string;
};

export default function LiveBookingCounter({
  variant = "inline",
  className = "",
}: Props) {
  const launchDateText = new Date(
    DIRECT_BOOKING_STATS.launchedOn,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (variant === "banner") {
    return (
      <div
        className={`flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 ${className}`}
      >
        <Sparkles className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
        <div className="text-sm">
          <span className="font-bold text-emerald-900">
            {DIRECT_BOOKING_STATS.totalReservations}+ direct bookings
          </span>{" "}
          <span className="text-emerald-800">since {launchDateText}.</span>{" "}
          <span className="text-emerald-700">
            {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+
            guests cumulative since {PARENT_OPERATOR_STATS.tursabSinceYear}.
          </span>
        </div>
      </div>
    );
  }

  // inline (default)
  return (
    <p className={`text-xs text-[var(--text-muted)] ${className}`}>
      <span className="font-semibold text-[var(--heading)]">
        {DIRECT_BOOKING_STATS.totalReservations}+
      </span>{" "}
      direct bookings since {launchDateText}
      {" · "}
      <span className="font-semibold text-[var(--heading)]">
        {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+
      </span>{" "}
      guests since {PARENT_OPERATOR_STATS.tursabSinceYear}
    </p>
  );
}
