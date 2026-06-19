import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /merrysails-vs-viator
 *
 * Highest-intent SERP segment outside of "buy now" — direct-vs-OTA
 * comparison. Visitors here have a Viator tab open and are wondering
 * if booking direct is cheaper / different. They are 30-60 seconds
 * away from a booking decision.
 *
 * Editorial honesty: Viator is genuinely useful in two cases (existing
 * OTA credit, corporate travel booking through a managed platform).
 * For everyone else, direct booking saves €5-€15/guest on shared
 * cruises and €50-€100/yacht on private charters with no experience
 * trade-off (same boats, same crew, same route).
 */

export const metadata: Metadata = {
  title: "MerrySails vs Viator — Save €5-€15",
  description:
    "Honest comparison: direct booking with MerrySails saves €5-€15 per guest vs Viator markup on the same Bosphorus cruise boats. Same vessels, same crew, lower price.",
  alternates: {
    canonical: `${SITE_URL}/merrysails-vs-viator`,
    languages: buildHreflang("/merrysails-vs-viator"),
  },
  openGraph: {
    title: "MerrySails vs Viator — Save €5-€15",
    description:
      "Direct-vs-OTA comparison: Viator re-sells the same MerrySails boats at 15-30% markup. Same experience, lower price, faster cancellation when you book direct.",
    url: `${SITE_URL}/merrysails-vs-viator`,
    type: "article",
  },
};

const ROWS: Array<{
  category: string;
  merrysails: string;
  viator: string;
  winner?: "merrysails" | "viator" | "tie";
}> = [
  {
    category: "Sunset cruise price (per guest)",
    merrysails: "€30 (Mon/Tue/Thu) · €34 other days",
    viator: "€36-€48 for the same MerrySails sailing (markup baked in)",
    winner: "merrysails",
  },
  {
    category: "Dinner cruise price (Silver Soft)",
    merrysails: "€30 — entry-level package",
    viator: "€38-€48 for the same Silver Soft package",
    winner: "merrysails",
  },
  {
    category: "Private yacht charter (Boutique 2h)",
    merrysails: "€220 — entire yacht",
    viator: "€255-€290 for the same yacht (markup €35-€70)",
    winner: "merrysails",
  },
  {
    category: "Booking confirmation",
    merrysails: "Instant — WhatsApp reply in 3 minutes avg",
    viator: "Instant from Viator platform, but operator round-trip 1-4 hours",
    winner: "merrysails",
  },
  {
    category: "Cancellation policy",
    merrysails: "Free up to 24 h before · instant refund (or no charge for pay-onboard)",
    viator: "Free 24 h before · refund processed via Viator (5-10 business days)",
    winner: "merrysails",
  },
  {
    category: "Payment timing",
    merrysails: "Pay onboard for shared cruises (no upfront card charge)",
    viator: "Card charged at booking — 5-10 business days to refund if cancelled",
    winner: "merrysails",
  },
  {
    category: "Customer support",
    merrysails: "Direct WhatsApp to the operations team running the boat",
    viator: "Viator support layer first, then routed to operator",
    winner: "merrysails",
  },
  {
    category: "Same boat / captain / crew?",
    merrysails: "Yes — direct operator",
    viator: "Yes — Viator re-sells MerrySails boats (same vessel)",
    winner: "tie",
  },
  {
    category: "Same route / same sunset timing?",
    merrysails: "Yes — operator schedule",
    viator: "Yes — Viator listing follows MerrySails operating schedule",
    winner: "tie",
  },
  {
    category: "Familiar checkout interface",
    merrysails: "merrysails.com — modern but newer brand",
    viator: "Viator interface — used many times before by repeat OTA users",
    winner: "viator",
  },
  {
    category: "Cumulative travel-credit usage",
    merrysails: "No platform credit system",
    viator: "Existing Viator credit / TripAdvisor balance usable",
    winner: "viator",
  },
  {
    category: "Corporate-travel platform integration",
    merrysails: "Direct invoice on request",
    viator: "Integrated with managed corporate booking platforms",
    winner: "viator",
  },
];

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
      name: "Does Viator add a markup on Bosphorus cruises?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Viator adds 15-30% markup on the same operator-direct sunset, dinner, and yacht-charter prices. On a €30 MerrySails sunset cruise, Viator lists €36-€42. On a €220 yacht charter, Viator lists €255-€290. The boat, route, captain, and crew are identical — only the price differs.",
      },
    },
    {
      "@type": "Question",
      name: "Is direct booking with MerrySails the same boat as Viator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails is the licensed operator running the cruises. Viator and GetYourGuide are listing platforms that re-sell our boats with a commission added to the listed price. The vessel, captain, crew, route, food, and inclusions are identical — direct booking just removes the platform layer and the markup that comes with it.",
      },
    },
    {
      "@type": "Question",
      name: "When does Viator booking still make sense?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two cases. First, if you have existing Viator or TripAdvisor credit to burn — direct booking saves money but expiring credit costs more. Second, if your corporate travel policy routes all bookings through a managed Viator contract. Outside those cases, direct booking via merrysails.com or WhatsApp is consistently the cheaper, faster, lower-friction path.",
      },
    },
    {
      "@type": "Question",
      name: "How much do I actually save booking direct?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "€5-€15 per guest on shared sunset and dinner cruises (4-person family = €20-€60 total). €50-€100 per yacht on private charters. The exact figure depends on Viator's daily pricing for the date — markups vary from 15% to 30% depending on demand. The MerrySails operator-side price stays stable.",
      },
    },
    {
      "@type": "Question",
      name: "Is direct booking with MerrySails secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails operates under Meryem Yıldız Travel, TÜRSAB A Group licensed (#" + TURSAB_LICENSE_NUMBER + ") since 2001 with 50,000+ guests served. The same legal protections that apply to Viator-mediated bookings apply to direct bookings — the operator runs the cruise either way. The only thing removed is the resale layer.",
      },
    },
    {
      "@type": "Question",
      name: "What is the MerrySails cancellation policy vs Viator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both offer free cancellation 24 h before departure on most products. The difference is refund speed: MerrySails processes refunds instantly (or you simply don't pay if shared-cruise pay-onboard), while Viator refunds run through the platform and take 5-10 business days to land back on the card.",
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
    { "@type": "ListItem", position: 3, name: "MerrySails vs Viator", item: `${SITE_URL}/merrysails-vs-viator` },
  ],
};

function Mark({
  winner,
  who,
}: {
  winner?: "merrysails" | "viator" | "tie";
  who: "merrysails" | "viator";
}) {
  if (!winner || winner === "tie") return null;
  if (winner === who) return <Check className="inline h-4 w-4 text-emerald-600" aria-label="Winner" />;
  return <X className="inline h-4 w-4 text-gray-400" aria-label="Less suitable" />;
}

export default function Page() {
  return (
    <>
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
            <span className="text-[var(--heading)] truncate">vs Viator</span>
          </nav>

          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Direct-vs-OTA · Updated June 2026
            </p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">
              MerrySails vs Viator — Save €5–€15 per Guest
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              Viator re-sells the same MerrySails boats with a 15–30 % markup
              baked into the listed price. Same vessel, same captain, same
              route — different price. This page shows the real numbers and
              the two cases where Viator still makes sense.
            </p>
          </header>

          <SocialProofBadges variant="generic" />

          <section className="mb-8 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">TL;DR — the markup math</h2>
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              On the same Bosphorus cruise boats, Viator lists prices 15-30 %
              above the operator-direct price. The exact difference is{" "}
              <strong>€5-€15 per guest</strong> on shared sunset and dinner
              cruises, and <strong>€50-€100 per yacht</strong> on private
              charters. The platform doesn't change the boat, the captain, or
              the route — it adds a resale margin. Direct booking via
              merrysails.com or WhatsApp removes the resale layer and the
              5-10 business day refund cycle.
            </p>
          </section>

          {/* Comparison table */}
          <section className="mb-8 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--line)] bg-[var(--surface-alt)]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">Category</th>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">MerrySails (direct)</th>
                  <th className="px-4 py-3 font-semibold text-[var(--heading)]">Viator</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.category} className="border-b border-[var(--line)] last:border-0">
                    <td className="px-4 py-3 align-top font-medium text-[var(--heading)]">{row.category}</td>
                    <td className="px-4 py-3 align-top text-[var(--body-text)]">
                      <Mark winner={row.winner} who="merrysails" /> {row.merrysails}
                    </td>
                    <td className="px-4 py-3 align-top text-[var(--body-text)]">
                      <Mark winner={row.winner} who="viator" /> {row.viator}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">When Viator still makes sense</h2>
            <ol className="space-y-3 text-sm leading-relaxed text-[var(--body-text)]">
              <li>
                <strong>1. Existing Viator / TripAdvisor credit.</strong> If you
                have credit to use before expiry, the saved markup is worth
                less than the expiring balance.
              </li>
              <li>
                <strong>2. Corporate travel through a managed platform.</strong>{" "}
                If your company policy routes all bookings through a Viator
                contract, the OTA listing is the only path your finance team
                will accept.
              </li>
            </ol>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              For everyone else — solo travellers, couples, families, friend
              groups, organic corporate bookings — direct booking is cheaper,
              faster, and lower-friction.
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

          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">
              Skip the markup — book direct
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Same boats, lower price, instant refund. Pay onboard for shared
              cruises — no upfront card. Free cancellation up to 24 h before
              departure.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">From €30</span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Sunset cruise direct</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See dates <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/istanbul-dinner-cruise"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">From €30</span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Dinner cruise direct</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See packages <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/yacht-charter-istanbul"
                className="flex flex-col items-start rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)]">From €220</span>
                <span className="mt-1 font-semibold text-[var(--heading)]">Yacht charter direct</span>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                  See the fleet <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
            <p className="mt-4 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #
              {TURSAB_LICENSE_NUMBER} · 50,000+ guests since 2001. WhatsApp:{" "}
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
        reserveLabel="Compare direct prices"
        whatsappLocation="vs_viator_compare"
        whatsappPrefill="Hi MerrySails! I was about to book on Viator — what's the direct price for [sunset/dinner/yacht] on [date]?"
      />
    </>
  );
}
