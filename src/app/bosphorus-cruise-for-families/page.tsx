import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Baby, ShieldCheck, Anchor, Cake } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /bosphorus-cruise-for-families
 *
 * Family-of-4 niche page. Targets multi-generation travel intent
 * (parents + kids + sometimes grandparents). Key differentiators:
 *   - Hotel pickup means no taxi-with-kids step
 *   - Pay-onboard means no parent-funded prepayment risk
 *   - Free cancellation 24h covers sick-kid scenarios
 *   - Children pricing (under-3 free, 4-10 child rate)
 *   - Calm formats over party formats
 */

export const metadata: Metadata = {
  title: "Bosphorus Cruise for Families Istanbul",
  description:
    "Family-friendly Bosphorus cruise Istanbul — hotel pickup, under-3 free, 4-10 child rate, free 24h cancellation. From €30/adult, TÜRSAB licensed.",
  alternates: {
    canonical: `${SITE_URL}/bosphorus-cruise-for-families`,
    languages: buildHreflang("/bosphorus-cruise-for-families"),
  },
  openGraph: {
    title: "Bosphorus Cruise for Families Istanbul",
    description:
      "Family-friendly Bosphorus cruise — hotel pickup, kid-rate pricing, calm formats, TÜRSAB A licensed. Sunset, dinner, and private yacht options.",
    url: `${SITE_URL}/bosphorus-cruise-for-families`,
    type: "article",
  },
};

const REASONS = [
  {
    icon: Anchor,
    title: "Hotel pickup included on dinner cruise",
    desc: "No taxi-with-tired-kids step. The pickup vehicle stops at your central European-side hotel (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) 30-45 minutes before the 20:30 departure.",
  },
  {
    icon: ShieldCheck,
    title: "TÜRSAB-licensed since 2001",
    desc: `Operated under Meryem Yıldız Travel, TÜRSAB A Group licence #${TURSAB_LICENSE_NUMBER}. 50,000+ guests served. The same safety standards parents apply to any Istanbul transport apply here.`,
  },
  {
    icon: Baby,
    title: "Under-3 free · 4-10 child rate",
    desc: "Children under 3 sail free on all packages. Ages 4-10 get a child rate, confirmed at booking. The dinner cruise menu has child-friendly options (grilled chicken, rice, fruit) — no fish course pushed on under-12s.",
  },
  {
    icon: Cake,
    title: "Birthday + Eid + family-celebration ready",
    desc: "Onboard cake delivery + a quiet announcement by the crew on request. Especially common during Eid (Ramazan Bayramı + Kurban Bayramı) — families often book the dinner cruise as the bayram evening venue.",
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
      name: "Is the Bosphorus cruise safe for kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails operates under TÜRSAB A Group licence #" + TURSAB_LICENSE_NUMBER + " (since 2001) and follows Turkish Maritime Authority safety standards — life jackets per passenger, marine-trained crew, hourly safety checks. The shared dinner cruise vessel has indoor seating with full Bosphorus views, so families with young children don't have to spend time on the open deck.",
      },
    },
    {
      "@type": "Question",
      name: "What is the kid pricing on Bosphorus cruise packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Children under 3 sail free on all packages. Children aged 4-10 are charged at the child rate — typically 50% of the adult price for the same package. Ages 11+ pay adult rate. Exact child pricing for your package and date is confirmed during booking — send the kid ages via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "What's the best Bosphorus cruise format for a family of 4?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For families of 4 (2 adults + 2 kids), the shared dinner cruise Silver Soft package (€30/adult) is the most common booking. It includes hotel pickup, a 3.5-hour Bosphorus route, dinner with child-friendly options, and a family-friendly Turkish night entertainment program. For families of 8+, the private yacht charter (€280+) reserves the whole boat for the group with custom pacing.",
      },
    },
    {
      "@type": "Question",
      name: "Are the cruise times kid-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sunset cruise departs 18:30-19:30 depending on season, returns by 21:00-21:30 — fits a normal kid bedtime. Dinner cruise departs 20:30 and returns around 00:00 — better for older children (8+) or for families where kids regularly stay up later. Private yacht charters can be timed to any hour you specify, including a midday family lunch cruise.",
      },
    },
    {
      "@type": "Question",
      name: "Can we cancel if a kid gets sick?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free cancellation up to 24 hours before departure. For shared cruises with pay-onboard, no card is charged in the first place. For private yacht charters where a deposit was paid, the deposit is fully refundable when cancelled 24h+ before departure. Same-day cancellations due to illness are handled case-by-case via WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a high-chair for toddlers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High-chairs are available on the dinner cruise with 24-hour advance notice. Mention the toddler age + need for high-chair in the WhatsApp booking message and operations will load one onto the vessel before departure.",
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
    { "@type": "ListItem", position: 3, name: "For Families", item: `${SITE_URL}/bosphorus-cruise-for-families` },
  ],
};

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
        <div className="container-main max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Bosphorus Cruise</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">For Families</span>
          </nav>

          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Family-friendly · Hotel pickup · Kid pricing
            </p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">
              Bosphorus Cruise for Families Istanbul
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              Family-of-4 routine: hotel pickup, dinner with child-friendly
              options, Turkish night entertainment, return to the hotel by
              midnight. Under-3 sails free, 4-10 child rate, free
              cancellation 24h before departure. From €30 per adult.
            </p>
          </header>

          <SocialProofBadges variant="generic" />

          <section className="mb-8 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">Quick answer for families</h2>
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              For a family of 4 (2 adults + 2 kids), the most-booked option
              is the shared dinner cruise Silver Soft package — €30 per
              adult, child rate for ages 4-10 (under 3 free), hotel pickup
              included, 3.5-hour Bosphorus route + Turkish night
              entertainment + dinner with child-friendly options. Total
              evening for the family runs roughly €100-€130 depending on
              kid ages. Free cancellation 24h before departure covers
              sick-kid scenarios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Why this works for families
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {REASONS.map((r) => (
                <div key={r.title} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <r.icon className="h-5 w-5 text-[var(--brand-primary)]" />
                    <h3 className="text-base font-semibold text-[var(--heading)]">{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              Pricing for a family of 4
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[var(--line)]">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">Format</th>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">2 adults</th>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">+ 1 kid (4-10)</th>
                    <th className="px-3 py-2 font-semibold text-[var(--heading)]">+ 1 toddler (under 3)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--line)]">
                    <td className="px-3 py-2 font-medium text-[var(--heading)]">Sunset cruise (€30 Mon/Tue/Thu)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€60</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€75 (child €15)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€75 (under-3 free)</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <td className="px-3 py-2 font-medium text-[var(--heading)]">Dinner cruise Silver Soft (€30)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€60</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€75 (child €15)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€75 (under-3 free)</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <td className="px-3 py-2 font-medium text-[var(--heading)]">Dinner cruise Silver Alcoholic (€45)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€90</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€105 (child €15)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€105 (under-3 free)</td>
                  </tr>
                  <tr className="border-b border-[var(--line)] last:border-0">
                    <td className="px-3 py-2 font-medium text-[var(--heading)]">Private yacht 2h (€280 base)</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€280 yacht</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€280 yacht</td>
                    <td className="px-3 py-2 text-[var(--body-text)]">€280 yacht</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              Indicative figures. Exact child rate per package + date is
              confirmed during booking. Private yacht charter is priced per
              yacht regardless of family size up to vessel capacity.
            </p>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              Family FAQ
            </h2>
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
              Book a family Bosphorus cruise
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Send your hotel name + kid ages + preferred date. We confirm
              the right package, pickup time, and child rate within 24
              hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/istanbul-dinner-cruise" className="btn-cta !px-6 !py-3">
                See dinner cruise
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  "Hi MerrySails! Family Bosphorus cruise enquiry. Adults: [N], kids ages: [ages], hotel: [name], date: [date].",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                WhatsApp family enquiry
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">
              Operated under Meryem Yıldız Travel · TÜRSAB A Group licence #
              {TURSAB_LICENSE_NUMBER} · 50,000+ guests on the Bosphorus since 2001.
            </p>
          </section>
        </div>
      </main>
      <StickyMobileCta
        reserveHref="/istanbul-dinner-cruise"
        reserveLabel="Reserve from €30"
        whatsappLocation="families_landing"
        whatsappPrefill="Hi MerrySails! Family Bosphorus cruise enquiry. Adults: [N], kids ages: [ages]."
      />
    </>
  );
}
