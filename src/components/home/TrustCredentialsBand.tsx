/**
 * TrustCredentialsBand — corporate trust & verification band.
 *
 * Placed high on the homepage (just under the hero/TourGrid) so credibility
 * hits before the visitor scrolls into the product grids.  Three layers:
 *
 *   1. A real first-party aggregate strip (blended rating, review count,
 *      cumulative guests, TÜRSAB licence, no-hidden-fees) — every number is
 *      sourced from `src/lib/trust-evidence.ts`, so it stays truthful and
 *      stays in sync with the AI-citation TrustEvidence block below it.
 *   2. A verification / review-platform logo row (TripAdvisor, Google Reviews,
 *      Trustpilot, iyzico secure payment, TÜRSAB).  Framed truthfully as
 *      "verified on" / "secure payments via" — NO fabricated per-platform star
 *      counts.  Muted grayscale that warms to full brand colour on hover so it
 *      reads premium, not spammy.
 *   3. The three safety / licensing trust points (licensed agency, Bosphorus-
 *      specific planning, safety & boarding clarity) — folded in from the old
 *      standalone text-wall on the homepage so the E-E-A-T / AI signal copy is
 *      preserved in a tighter, more visual form.
 *
 * Server component — the hover treatment is pure CSS, no client JS needed.
 */
import { ShieldCheck, Compass, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PARENT_OPERATOR_STATS,
  SATISFACTION_STATS,
} from "@/lib/trust-evidence";

/* ------------------------------------------------------------------ */
/* Verification / review-platform badges                               */
/* Brand-accurate inline SVG (no external logo assets in the repo).    */
/* Each badge is greyscale by default and animates to full colour on   */
/* hover via the `group`/`group-hover` utilities on the wrapper.       */
/* ------------------------------------------------------------------ */

function TripAdvisorBadge() {
  return (
    <svg viewBox="0 0 28 18" className="h-6 w-auto" role="img" aria-label="Tripadvisor">
      <circle cx="9" cy="9" r="7.4" fill="none" stroke="#34E0A1" strokeWidth="1.6" />
      <circle cx="19" cy="9" r="7.4" fill="none" stroke="#34E0A1" strokeWidth="1.6" />
      <circle cx="9" cy="9" r="2.7" fill="#34E0A1" />
      <circle cx="19" cy="9" r="2.7" fill="#34E0A1" />
      <circle cx="14" cy="5.4" r="1.1" fill="#34E0A1" />
    </svg>
  );
}

function GoogleReviewsBadge() {
  return (
    <svg viewBox="0 0 18 18" className="h-5 w-auto" role="img" aria-label="Google Reviews">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.92v2.33A9 9 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.98 10.72A5.4 5.4 0 0 1 3.7 9c0-.6.1-1.18.28-1.72V4.95H.92A9 9 0 0 0 0 9c0 1.45.35 2.82.92 4.05l3.06-2.33z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .92 4.95l3.06 2.33C4.68 5.16 6.66 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function TrustpilotBadge() {
  return (
    <svg viewBox="0 0 20 19" className="h-5 w-auto" role="img" aria-label="Trustpilot">
      <path
        d="M10 0l2.45 6.18L19 6.4l-5.12 4.06L15.6 17 10 13.3 4.4 17l1.72-6.54L1 6.4l6.55-.22z"
        fill="#00B67A"
      />
    </svg>
  );
}

function IyzicoBadge() {
  return (
    <svg viewBox="0 0 64 18" className="h-4 w-auto" role="img" aria-label="iyzico secure payment">
      <text
        x="0"
        y="14"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#1E64FF"
        letterSpacing="-0.5"
      >
        iyzico
      </text>
    </svg>
  );
}

function TursabBadge() {
  return (
    <svg viewBox="0 0 64 18" className="h-4 w-auto" role="img" aria-label="TÜRSAB licensed">
      <rect x="0" y="2" width="4" height="14" rx="1" fill="#E11D2A" />
      <text
        x="8"
        y="14"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="800"
        fill="#E11D2A"
        letterSpacing="0.5"
      >
        TÜRSAB
      </text>
    </svg>
  );
}

const verificationBadges = [
  { node: <TripAdvisorBadge />, caption: "Tripadvisor", note: "Reviewed on" },
  { node: <GoogleReviewsBadge />, caption: "Google Reviews", note: "Verified on" },
  { node: <TrustpilotBadge />, caption: "Trustpilot", note: "Reviewed on" },
  { node: <IyzicoBadge />, caption: "iyzico", note: "Secure payments" },
  { node: <TursabBadge />, caption: `#${PARENT_OPERATOR_STATS.tursabLicenseNumber}`, note: "Licensed agency" },
] as const;

/* ------------------------------------------------------------------ */
/* Real first-party aggregate strip                                    */
/* ------------------------------------------------------------------ */

const aggregateStats = [
  {
    value: `${SATISFACTION_STATS.averageRatingBlended.toFixed(2)}★`,
    label: `${SATISFACTION_STATS.totalReviewsBlended.toLocaleString("en-US")}+ verified reviews`,
  },
  {
    value: `${(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+`,
    label: `Guests hosted since ${PARENT_OPERATOR_STATS.tursabSinceYear}`,
  },
  {
    value: "TÜRSAB A",
    label: `Licence #${PARENT_OPERATOR_STATS.tursabLicenseNumber} · ${PARENT_OPERATOR_STATS.tursabYearsActive} yrs`,
  },
  {
    value: "No hidden fees",
    label: "Direct operator price",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Safety & licensing points (folded in from the former text-wall)     */
/* ------------------------------------------------------------------ */

const credentials = [
  {
    icon: ShieldCheck,
    title: "Licensed travel-agency operation",
    description:
      "MerrySails is operated by Merry Tourism, a TÜRSAB A Group licensed travel agency — licensing, booking support, and guest communication stay tied to a named Istanbul operator.",
  },
  {
    icon: Compass,
    title: "Bosphorus-specific planning",
    description:
      "Sunset, dinner, and private yacht bookings use different timing, boarding, package, and route logic, so guests can choose the right product before contacting the team.",
  },
  {
    icon: LifeBuoy,
    title: "Safety & boarding clarity",
    description:
      "Booking pages and confirmation messages are the source of truth for exact meeting points, inclusions, timing, and vessel-specific details.",
  },
] as const;

interface Props {
  className?: string;
}

export default function TrustCredentialsBand({ className }: Props) {
  return (
    <section
      aria-label="Trust, credentials and verification"
      className={cn(
        "bg-gradient-to-b from-[var(--surface-teal)] to-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <header className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
            Trusted &amp; Verified
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-bold text-[var(--heading)] md:text-3xl">
            A TÜRSAB-licensed Bosphorus operator, reviewed across every major platform
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            {SATISFACTION_STATS.totalReviewsBlended.toLocaleString("en-US")}+ verified guest
            reviews, {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)},000+ guests
            hosted since {PARENT_OPERATOR_STATS.tursabSinceYear}, and secure online payment — book
            the same boat and crew at the direct operator price.
          </p>
        </header>

        {/* Real aggregate strip */}
        <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
          {aggregateStats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-5 text-center">
              <dd className="text-xl font-bold text-[var(--brand-primary)] md:text-2xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Thin divider */}
        <div className="mx-auto mt-10 max-w-4xl border-t border-[var(--line)]" />

        {/* Verification / partner logo row */}
        <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Reviewed &amp; verified on
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {verificationBadges.map((badge) => (
            <li
              key={badge.caption}
              className="group flex min-w-[7.5rem] flex-col items-center gap-2 rounded-2xl border border-[var(--line)] bg-white px-5 py-4 transition-colors hover:border-[var(--brand-primary)]/30"
            >
              <span className="flex h-7 items-center grayscale transition-[filter] duration-300 group-hover:grayscale-0">
                {badge.node}
              </span>
              <span className="text-center text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {badge.note}
                <span className="block font-bold text-[var(--heading)] normal-case tracking-normal">
                  {badge.caption}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* Safety & licensing credentials */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--line)] bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10">
                <item.icon className="h-5 w-5 text-[var(--brand-primary)]" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-[var(--heading)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
