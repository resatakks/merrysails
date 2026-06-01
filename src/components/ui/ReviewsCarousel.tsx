import { Star, Quote } from "lucide-react";
import { getReviewsForProduct, type CuratedReview } from "@/data/curated-reviews";

/**
 * Recent reviews carousel — surfaces 3-4 curated guest reviews on
 * commercial pages. Static / server-rendered (no client interaction
 * needed for the badge to convert).
 *
 * Why curated vs auto-pulled:
 *   - Trustpilot widget is the long-term plan but the account is
 *     pending. Tripadvisor and GetYourGuide are explicitly NOT used.
 *   - Reservation table doesn't have a review_text field — adding one
 *     would require backfilling.
 *   - Curated list (15 reviews, refreshed monthly from operator inbox)
 *     gives accurate attributable feedback right now with no platform
 *     dependency.
 *
 * Layout: card grid, scroll-snap on mobile. First name + country flag
 * + cruise date — verifiable but private.
 */

type Props = {
  productKey: CuratedReview["productKey"];
  className?: string;
};

const FLAG: Record<string, string> = {
  GB: "🇬🇧",
  US: "🇺🇸",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IT: "🇮🇹",
  PL: "🇵🇱",
  CH: "🇨🇭",
  AE: "🇦🇪",
  SA: "🇸🇦",
  EG: "🇪🇬",
  IN: "🇮🇳",
  AU: "🇦🇺",
  SG: "🇸🇬",
  RU: "🇷🇺",
  TR: "🇹🇷",
  NL: "🇳🇱",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ReviewsCarousel({ productKey, className = "" }: Props) {
  const reviews = getReviewsForProduct(productKey, 4);
  if (reviews.length === 0) return null;

  return (
    <section
      aria-label="Recent guest reviews"
      className={`rounded-2xl border border-[var(--line)] bg-white p-6 ${className}`}
    >
      <h2 className="mb-1 text-xl font-bold text-[var(--heading)]">
        Recent guest reviews
      </h2>
      <p className="mb-5 text-xs text-[var(--text-muted)]">
        Collected directly via WhatsApp and email follow-up after the cruise.
        First name + country + date are real; full names are kept private
        for guest comfort.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {reviews.map((r) => (
          <article
            key={`${r.firstName}-${r.cruiseDate}`}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <Quote className="h-4 w-4 text-[var(--brand-primary)]/40" aria-hidden />
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < r.rating
                        ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                        : "text-gray-300"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-[var(--body-text)]">
              &ldquo;{r.text}&rdquo;
            </p>
            <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span aria-hidden>{FLAG[r.country] ?? "🌍"}</span>
              <span className="font-semibold text-[var(--heading)]">{r.firstName}</span>
              <span>·</span>
              <span>cruised {formatDate(r.cruiseDate)}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
