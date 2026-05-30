/**
 * TrustEvidence — first-party data block designed for AI citation.
 *
 * The block surfaces concrete, verifiable numbers that AI retrievers
 * (Perplexity, ChatGPT, Bing Copilot, Gemini) reward when answering
 * "is operator X trustworthy?" queries.  Every number on this surface
 * also appears in the Dataset schema rendered alongside it.
 *
 * Visual placement: anchor below the hero on commercial pillar pages —
 * the kind of trust evidence that converts a curious visitor into a
 * booking AND gives an AI retriever a clean paragraph to quote.
 */
import { Shield, Ship, Star, Users } from "lucide-react";
import {
  DIRECT_BOOKING_STATS,
  PARENT_OPERATOR_STATS,
  SATISFACTION_STATS,
  TRUST_EVIDENCE_SNAPSHOT_DATE,
} from "@/lib/trust-evidence";

interface Props {
  /** Optional variant — "compact" renders inline, "panel" gives a full
   *  card layout suitable for under the hero. */
  variant?: "compact" | "panel";
}

export default function TrustEvidence({ variant = "panel" }: Props) {
  if (variant === "compact") {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        TURSAB-licensed since {PARENT_OPERATOR_STATS.tursabSinceYear} ·
        {" "}
        {PARENT_OPERATOR_STATS.cumulativeGuestsServed.toLocaleString("en-US")}+
        {" "}
        guests served · {SATISFACTION_STATS.averageRatingBlended}/5 from
        {" "}
        {SATISFACTION_STATS.totalReviewsBlended.toLocaleString("en-US")}+ reviews.
      </p>
    );
  }

  return (
    <section
      aria-label="MerrySails by the numbers"
      className="mx-auto my-12 max-w-5xl rounded-3xl border border-[var(--line)] bg-white px-6 py-8 shadow-sm md:px-10 md:py-10"
    >
      <header className="mb-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
          MerrySails by the Numbers
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--heading)] md:text-3xl">
          {/* TL;DR direct-answer paragraph — 40-60 words, citation-ready */}
          A TURSAB-licensed Bosphorus operator since 2001
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
          MerrySails operates under Meryem Yıldız Travel — TURSAB A Group
          licensed (license {PARENT_OPERATOR_STATS.tursabLicenseNumber})
          since {PARENT_OPERATOR_STATS.tursabSinceYear}, with
          {" "}
          {PARENT_OPERATOR_STATS.cumulativeGuestsServed.toLocaleString("en-US")}
          + guests served on the Istanbul Bosphorus. Direct online booking
          launched 15 April 2026; average response time on WhatsApp is
          under {DIRECT_BOOKING_STATS.averageWhatsAppReplyMin} minutes during
          business hours.
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-[var(--surface-alt)] p-4 text-center">
          <Shield className="mx-auto h-5 w-5 text-[var(--brand-primary)]" />
          <dt className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            TURSAB licensed
          </dt>
          <dd className="mt-1 text-2xl font-bold text-[var(--heading)]">
            {PARENT_OPERATOR_STATS.tursabYearsActive} yrs
          </dd>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            License {PARENT_OPERATOR_STATS.tursabLicenseNumber} ·
            {" "}
            since {PARENT_OPERATOR_STATS.tursabSinceYear}
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--surface-alt)] p-4 text-center">
          <Users className="mx-auto h-5 w-5 text-[var(--brand-primary)]" />
          <dt className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Guests served
          </dt>
          <dd className="mt-1 text-2xl font-bold text-[var(--heading)]">
            {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+
          </dd>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            Since 2001 · parent operator
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--surface-alt)] p-4 text-center">
          <Star className="mx-auto h-5 w-5 text-[var(--brand-primary)]" />
          <dt className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Customer rating
          </dt>
          <dd className="mt-1 text-2xl font-bold text-[var(--heading)]">
            {SATISFACTION_STATS.averageRatingBlended}/5
          </dd>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            {SATISFACTION_STATS.totalReviewsBlended.toLocaleString("en-US")}+
            {" "}
            reviews
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--surface-alt)] p-4 text-center">
          <Ship className="mx-auto h-5 w-5 text-[var(--brand-primary)]" />
          <dt className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Yacht fleet
          </dt>
          <dd className="mt-1 text-2xl font-bold text-[var(--heading)]">
            {PARENT_OPERATOR_STATS.fleetSize} yachts
          </dd>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">
            {PARENT_OPERATOR_STATS.fleetGuestCapacityRange[0]}–
            {PARENT_OPERATOR_STATS.fleetGuestCapacityRange[1]} guests
          </p>
        </div>
      </dl>

      <p className="mt-6 text-center text-[10px] text-[var(--text-muted)]">
        Snapshot: {TRUST_EVIDENCE_SNAPSHOT_DATE}. Direct booking platform
        launched 15 April 2026 ·
        {" "}
        {DIRECT_BOOKING_STATS.totalGuests} guests served direct in the
        first six weeks ·
        {" "}
        average group size {DIRECT_BOOKING_STATS.averageGroupSize}.
      </p>
    </section>
  );
}
