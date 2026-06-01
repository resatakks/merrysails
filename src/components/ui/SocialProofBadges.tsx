import { Star, Users, Award, Clock } from "lucide-react";
import { DIRECT_BOOKING_STATS, SATISFACTION_STATS, PARENT_OPERATOR_STATS } from "@/lib/trust-evidence";

/**
 * Social-proof + trust-badge row for commercial pages.
 *
 * Why this exists (2026-06-01):
 *   Clarity 7d: 168 sessions → 2 bookings = 1.2% conversion. The product
 *   pages have rich schema (4.91/5 from 1,181 reviews) but the trust
 *   signal is buried below the fold or only inside JSON-LD. Mobile users
 *   landing on /cruises/<slug> never see "TURSAB-licensed, 50k+ guests,
 *   4.91 rating" because they bounce before scrolling.
 *
 *   This component surfaces 4 high-impact trust signals as a horizontal
 *   row of badges, placed directly under the above-fold price/CTA card.
 *
 * Variants:
 *   - product: shows product-specific rating (sunset/dinner/yacht) +
 *     direct booking count
 *   - generic: shows blended 4.91/5 + 50k+ parent operator guests
 */
type Props = {
  variant?: "product" | "generic";
  productKey?: "sunset" | "dinner" | "yacht";
  className?: string;
};

export default function SocialProofBadges({
  variant = "generic",
  productKey,
  className = "",
}: Props) {
  const rating =
    productKey === "sunset"
      ? SATISFACTION_STATS.averageRatingSunset
      : productKey === "dinner"
        ? SATISFACTION_STATS.averageRatingDinner
        : productKey === "yacht"
          ? SATISFACTION_STATS.averageRatingYacht
          : SATISFACTION_STATS.averageRatingBlended;
  const reviews =
    productKey === "sunset"
      ? SATISFACTION_STATS.reviewCountSunset
      : productKey === "dinner"
        ? SATISFACTION_STATS.reviewCountDinner
        : productKey === "yacht"
          ? SATISFACTION_STATS.reviewCountYacht
          : SATISFACTION_STATS.totalReviewsBlended;

  return (
    <div
      className={`mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 ${className}`}
      aria-label="Trust signals"
    >
      {/* Rating */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Star className="h-5 w-5 shrink-0 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {rating.toFixed(2)}/5
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {reviews.toLocaleString("en-US")} reviews
          </div>
        </div>
      </div>

      {/* Guests served (parent operator scale) */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Users className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            guests since {PARENT_OPERATOR_STATS.tursabSinceYear}
          </div>
        </div>
      </div>

      {/* TURSAB license */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Award className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            TÜRSAB A
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            licence #{PARENT_OPERATOR_STATS.tursabLicenseNumber}
          </div>
        </div>
      </div>

      {/* WhatsApp response time (operational signal) */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {DIRECT_BOOKING_STATS.averageWhatsAppReplyMin} min
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            avg WhatsApp reply
          </div>
        </div>
      </div>
    </div>
  );
}
