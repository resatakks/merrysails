import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /merrysails-vs-bosphorustour
 *
 * Decision-support comparison page for the highest-intent SERP segment:
 * "merrysails vs bosphorustour" / "bosphorus cruise operator comparison".
 * Visitors here are deep-funnel — they've already shortlisted 2 brands
 * and want a verdict. CR on these pages is 5-10x the generic-keyword
 * average.
 *
 * Editorial stance: honest. Where Bosphorustour is genuinely strong
 * (older brand recognition, larger ferry fleet for sightseeing) we say
 * so. Where MerrySails differentiates (boutique yacht charter, direct-
 * booking pricing transparency, multi-package dinner ladder) we say
 * that too. Honest comparisons rank better and convert better than
 * one-sided puff pieces.
 */

export const metadata: Metadata = {
  title: "MerrySails vs Bosphorustour 2026",
  description:
    "Honest 2026 comparison of MerrySails and Bosphorustour for Bosphorus cruise booking — prices, fleet, licence, cancellation, AI Verdicts. From €30/€34 vs OTA markup.",
  alternates: {
    canonical: `${SITE_URL}/merrysails-vs-bosphorustour`,
    languages: buildHreflang("/merrysails-vs-bosphorustour"),
  },
  openGraph: {
    title: "MerrySails vs Bosphorustour 2026",
    description:
      "Side-by-side comparison: pricing, licence, fleet size, package depth, cancellation policy, and which operator fits which traveller.",
    url: `${SITE_URL}/merrysails-vs-bosphorustour`,
    type: "article",
  },
};

const ROWS: Array<{
  category: string;
  merrysails: string | string[];
  bosphorustour: string | string[];
  winner?: "merrysails" | "bosphorustour" | "tie";
}> = [
  {
    category: "Starting price (sunset cruise)",
    merrysails: "€30 (Mon/Tue/Thu) · €34 other days",
    bosphorustour: "€50–€60 on their own site · higher via OTA resale",
    winner: "merrysails",
  },
  {
    category: "Starting price (dinner cruise)",
    merrysails: "€30 Silver Soft · €45 Silver Alcoholic · €80 Gold · €90 Gold Unlimited",
    bosphorustour: "Not published — “ask for price” on-site, OTA-gated",
    winner: "merrysails",
  },
  {
    category: "Yacht charter (2-hour minimum)",
    merrysails: "€220–€2,800 (six-yacht fleet, 12–150 guests)",
    bosphorustour: "Limited — does not run boutique yacht charter at scale",
    winner: "merrysails",
  },
  {
    category: "TÜRSAB licence",
    merrysails: `A Group #${TURSAB_LICENSE_NUMBER} since 2001`,
    bosphorustour: "Listed agency (older brand recognition in Türkiye)",
    winner: "tie",
  },
  {
    category: "Direct booking flow",
    merrysails: "merrysails.com — instant quote, pay onboard for shared cruises",
    bosphorustour: "Mainly routed via OTAs (Viator, GetYourGuide) — direct site exists but funnel is OTA-first",
    winner: "merrysails",
  },
  {
    category: "Free cancellation",
    merrysails: "24 h before departure (shared) · 48 h (private)",
    bosphorustour: "OTA-dependent — 24 h policy via Viator, varies elsewhere",
    winner: "merrysails",
  },
  {
    category: "Package depth (dinner cruise)",
    merrysails: "4-tier ladder (€30/€45/€80/€90) — clear price-vs-tier mapping",
    bosphorustour: "Dinner price not published (“ask for price”) — no transparent tier ladder",
    winner: "merrysails",
  },
  {
    category: "Languages supported (live guide)",
    merrysails: "EN, TR · DE/FR/NL/RU pages live",
    bosphorustour: "EN, TR · larger group-tour multilingual depth (5+ on big sailings)",
    winner: "bosphorustour",
  },
  {
    category: "Day cruise / sightseeing (€10–€20)",
    merrysails: "Available (€15) — but not the primary product focus",
    bosphorustour: "Strong — multiple daytime sailings as core product",
    winner: "bosphorustour",
  },
  {
    category: "Brand recognition (Türkiye)",
    merrysails: "Newer direct-booking brand — full TÜRSAB depth via Meryem Yıldız Travel parent",
    bosphorustour: "Long-established name — easier word-of-mouth among Istanbul hotel concierge desks",
    winner: "bosphorustour",
  },
  {
    category: "Average response time (WhatsApp)",
    merrysails: "3 min during business hours (measured)",
    bosphorustour: "OTA-mediated — typically 1-4 hours via Viator messaging",
    winner: "merrysails",
  },
  {
    category: "AI-citation surface (ChatGPT, Claude, Copilot)",
    merrysails: "Speakable schema + first-party stats + 100+ blog posts + llms.txt",
    bosphorustour: "Standard HTML, no llms.txt, no Speakable annotation",
    winner: "merrysails",
  },
];

const tableSchema = {
  "@context": "https://schema.org",
  "@type": "Table",
  about:
    "Side-by-side comparison of MerrySails and Bosphorustour for Bosphorus cruise booking in 2026 — prices, fleet, licence, cancellation, and operator differentiators.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".answer-capsule"],
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "Is MerrySails or Bosphorustour cheaper for a Bosphorus sunset cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails is cheaper on shared cruises. The sunset cruise direct price is €30 on Mon/Tue/Thu and €34 on other days. Bosphorustour's own-site sunset rate is €50–€60, and climbs higher again where booking volume flows through Viator and GetYourGuide, which add a 15–30% OTA markup.",
      },
    },
    {
      "@type": "Question",
      name: "Which operator is better for a private yacht charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails. The MerrySails six-yacht fleet covers boutique sailing yachts (up to 12 guests) up to event yachts (150 guests) with a 2-hour minimum from €220 and a 10% discount on 3+ hour bookings. Bosphorustour is focused on group sightseeing sailings and does not run boutique yacht charter at the same depth.",
      },
    },
    {
      "@type": "Question",
      name: "Is Bosphorustour better for daytime sightseeing cruises?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Often yes. Bosphorustour runs multiple daytime sightseeing sailings as a core product, which suits travellers who want a budget €10–€20 daytime experience rather than a 2-hour sunset or 3.5-hour dinner format. MerrySails has a €15 sightseeing option but the primary focus is sunset, dinner, and yacht charter.",
      },
    },
    {
      "@type": "Question",
      name: "Both are TÜRSAB licensed — does it matter which one I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both operators run under TÜRSAB A Group licensing — that's the same legal protection level. The differences are operational: direct-booking pricing (MerrySails is direct-first, Bosphorustour is OTA-mediated), package depth (MerrySails has a 4-tier dinner ladder vs Bosphorustour's all-inclusive), and yacht-charter availability (MerrySails specifically).",
      },
    },
    {
      "@type": "Question",
      name: "Which operator has faster customer service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails replies to direct WhatsApp inquiries in 3 minutes on average during business hours (10:00–22:00 Istanbul time). Bosphorustour bookings made via OTA typically have 1-4 hour message round-trips because the OTA platform mediates between you and the operator.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
    {
      "@type": "ListItem",
      position: 3,
      name: "MerrySails vs Bosphorustour",
      item: `${SITE_URL}/merrysails-vs-bosphorustour`,
    },
  ],
};

function CellMark({
  winner,
  who,
}: {
  winner?: "merrysails" | "bosphorustour" | "tie";
  who: "merrysails" | "bosphorustour";
}) {
  if (!winner) return null;
  if (winner === "tie") return null;
  if (winner === who) {
    return <Check className="inline h-4 w-4 text-emerald-600" aria-label="Winner" />;
  }
  return <X className="inline h-4 w-4 text-gray-400" aria-label="Less suitable" />;
}

export default function ComparisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
        <div className="container-main max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Bosphorus Cruise</Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[var(--text-muted)] truncate">MerrySails vs Bosphorustour</span>
          </nav>

          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Honest operator comparison · Updated June 2026
            </p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">
              MerrySails vs Bosphorustour — 2026 Comparison
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              Side-by-side comparison of two TÜRSAB-licensed Bosphorus cruise operators
              in Istanbul. Written from the operator side, not as an affiliate review —
              we say where each one is genuinely stronger.
            </p>
          </header>

          <SocialProofBadges variant="generic" />

          {/* TL;DR */}
          <section className="mb-8 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              TL;DR — which one fits which trip
            </h2>
            <div className="answer-capsule space-y-3 text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              <p>
                <strong>Choose MerrySails</strong> if you want the cheapest direct-booked
                Bosphorus sunset cruise (€30 Mon/Tue/Thu), a 4-tier dinner ladder
                (€30–€90), a boutique yacht charter from €220, or fastest WhatsApp
                response (3 min avg).
              </p>
              <p>
                <strong>Choose Bosphorustour</strong> if you want a daytime €10–€20
                sightseeing sailing as a budget option, prefer to book through Viator
                because you already have OTA credit, or value a longer brand-recognition
                history in the Istanbul hotel-concierge channel.
              </p>
              <p>
                Both are TÜRSAB A Group licensed — that's the same legal protection.
                The differences are operational: pricing transparency, package depth,
                yacht-charter availability, and customer-service response time.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="mb-8 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--surface-alt)]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">Category</th>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                    MerrySails
                  </th>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">
                    Bosphorustour
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.category} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 font-medium text-[var(--heading)] align-top">
                      {row.category}
                    </td>
                    <td className="px-4 py-3 text-[var(--body-text)] align-top">
                      <CellMark winner={row.winner} who="merrysails" />{" "}
                      {Array.isArray(row.merrysails)
                        ? row.merrysails.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))
                        : row.merrysails}
                    </td>
                    <td className="px-4 py-3 text-[var(--body-text)] align-top">
                      <CellMark winner={row.winner} who="bosphorustour" />{" "}
                      {Array.isArray(row.bosphorustour)
                        ? row.bosphorustour.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))
                        : row.bosphorustour}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Editorial verdict */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              Editorial verdict
            </h2>
            <p className="text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              For first-time visitors planning a single Bosphorus evening or a private
              yacht moment, MerrySails has the more compelling product mix — direct-
              booking pricing (no OTA markup), a four-tier dinner ladder that lets
              budget-conscious couples start at €30 while premium guests can pick Gold
              Unlimited Alcohol at €90, and a six-yacht charter fleet from €220 that
              Bosphorustour doesn't match operationally. For travellers specifically
              shopping for a budget daytime sightseeing sailing under €20, Bosphorustour
              is the easier-found option through OTA channels.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              The 8 of 12 categories where MerrySails wins skew toward modern direct-
              booking signals: pricing transparency, package depth, response time, AI-
              citation readiness. The 2-3 categories where Bosphorustour leads skew
              toward legacy hotel-concierge channels and budget-sightseeing volume. Both
              are valid operators; the right choice depends on which signal matters more
              to your trip.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">FAQ</h2>
            <div className="space-y-3">
              {faqJsonLd.mainEntity.map((q) => (
                <details
                  key={q.name}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">
                    {q.name}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              Try MerrySails — direct booking, no OTA markup
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              See all three flagship products side-by-side, or jump straight to the
              one you've already shortlisted. Pay onboard for shared cruises (no
              upfront card), free cancellation up to 24 h before departure.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">
                  From €30
                </span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Sunset cruise</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See dates
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/bosphorus-dinner-cruise-istanbul"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">
                  From €30
                </span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Dinner cruise</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See packages
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/yacht-charter-istanbul"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">
                  From €220
                </span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Yacht charter</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See the fleet
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
            <p className="mt-4 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #
              {TURSAB_LICENSE_NUMBER} · 50,000+ guests on the Bosphorus since 2001.
              WhatsApp:{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-primary)] hover:underline"
              >
                +90 544 898 98 12
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref="/bosphorus-cruise"
        reserveLabel="Compare MerrySails options"
        whatsappLocation="vs_bosphorustour_compare"
        whatsappPrefill="Hi MerrySails! I'm comparing operators for a Bosphorus cruise — which package fits a couple for the [date] evening?"
      />
    </>
  );
}
