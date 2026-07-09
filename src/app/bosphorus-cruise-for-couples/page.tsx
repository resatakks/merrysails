import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Camera, Wine, Music } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";

/**
 * /bosphorus-cruise-for-couples
 *
 * Couples are the largest single segment of direct bookings (avg group
 * size 2.4 — most pairs). High-CR niche page: surfaces the romance-specific
 * value props (sunset timing, private dinner option, proposal/anniversary
 * tie-ins) without forcing visitors to choose a specific product first.
 */

export const metadata: Metadata = {
  title: "Bosphorus Cruise for Couples Istanbul",
  description:
    "Bosphorus cruise for couples in Istanbul — sunset €30 (Mon/Tue/Thu), private dinner cruise €220, proposal/anniversary yacht. Direct booking, no OTA markup.",
  alternates: {
    canonical: `${SITE_URL}/bosphorus-cruise-for-couples`,
    languages: buildHreflang("/bosphorus-cruise-for-couples"),
  },
  openGraph: {
    title: "Bosphorus Cruise for Couples Istanbul",
    description:
      "Romance-focused Bosphorus cruise options for couples — sunset shared, private dinner yacht, proposal and anniversary upgrades.",
    url: `${SITE_URL}/bosphorus-cruise-for-couples`,
    type: "article",
  },
};

const PRODUCTS = [
  {
    title: "Shared sunset cruise (€30-€40)",
    desc: "Lightest commitment — 2 hours of golden-hour Bosphorus on a shared yacht. Best for couples who already have dinner plans on land. Mon/Tue/Thu €30, other days €34, wine option €35-€40.",
    href: "/cruises/bosphorus-sunset-cruise",
    icon: Camera,
    badge: "Most popular",
  },
  {
    title: "Shared dinner cruise (€30-€90)",
    desc: "Full evening: dinner + Turkish night entertainment + 3.5-hour Bosphorus route. Hotel pickup included. Couples often pick Silver Alcoholic (€45) — sensible mid-tier with wine.",
    href: "/bosphorus-dinner-cruise-istanbul",
    icon: Wine,
    badge: null,
  },
  {
    title: "Private dinner on a yacht (€220+)",
    desc: "Just the two of you (or the two of you + your closest people). The whole yacht is reserved — no other guests, custom timing, menu chosen at booking. Best for milestone evenings.",
    href: "/private-bosphorus-dinner-cruise",
    icon: Heart,
    badge: "Premium",
  },
  {
    title: "Proposal yacht (€220+)",
    desc: "If the cruise IS the proposal moment — full surprise styling, photographer, violinist on boarding, route timed to sunset. Different intent from anniversary; same yacht fleet.",
    href: "/proposal-yacht-rental-istanbul",
    icon: Music,
    badge: null,
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
      name: "Which Bosphorus cruise is best for couples?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three options work well. For a light first-night experience, the shared sunset cruise (€30 Mon/Tue/Thu, €34 other days) covers 2 hours of golden hour without a dinner commitment. For a full evening, the shared dinner cruise (€30-€90 four-tier ladder) bundles dinner, entertainment, and hotel pickup. For a milestone evening or proposal, the private yacht charter (€220+) reserves the whole boat for just the two of you.",
      },
    },
    {
      "@type": "Question",
      name: "Is the shared dinner cruise too crowded for a romantic evening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the format you want. Shared dinner cruise has other couples and small groups on the same boat — the atmosphere is festive (live Turkish night entertainment), not silent or restaurant-quiet. If you want a quieter, just-the-two-of-you setting, choose the private dinner cruise on a yacht (€220+) — same Bosphorus route, no shared seating.",
      },
    },
    {
      "@type": "Question",
      name: "What's the price difference for couples between shared and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For 2 guests: shared sunset cruise = €60-€68 total. Shared dinner cruise Silver Soft = €60 total. Private 2-hour yacht charter = €220 total (the whole yacht, regardless of group size). So the upgrade to private is roughly 4-5x for shared, but you get exclusive use of the vessel, custom timing, and no other guests onboard.",
      },
    },
    {
      "@type": "Question",
      name: "Can we add a proposal element on a couples cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — but only on a private yacht charter. Surprise proposal styling (decoration, hidden photographer, ring presentation timing) only works when the boat is reserved exclusively for the couple. Shared cruises can't accommodate the surprise mechanic. See our proposal yacht page for the full setup.",
      },
    },
    {
      "@type": "Question",
      name: "Is hotel pickup included for couples on the dinner cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all four dinner cruise packages include hotel pickup from central European-side hotels (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy). For sunset cruise, the meeting point is at Karaköy pier and the exact location is shared by WhatsApp the day before. For private yacht charter, transfer can be arranged on request.",
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
      name: "For Couples",
      item: `${SITE_URL}/bosphorus-cruise-for-couples`,
    },
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
            <span className="text-[var(--heading)] truncate">For Couples</span>
          </nav>

          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
              Romance · For two
            </p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">
              Bosphorus Cruise for Couples Istanbul
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              Three formats fit couples differently. The shared sunset cruise
              is the lightest — 2 hours of golden hour for €30-€40 the pair.
              The shared dinner cruise covers a full evening for €60-€180 the
              pair. The private yacht reserves the whole boat from €220, the
              option for milestone evenings and proposals.
            </p>
          </header>

          <SocialProofBadges variant="generic" />

          <section className="mb-8 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">Quick answer</h2>
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
              For couples spending one evening in Istanbul, the shared sunset
              cruise (€30 Mon/Tue/Thu, €34 other days) gives you golden hour
              on the Bosphorus without a full-evening commitment. For couples
              who want dinner + entertainment + the cruise in one booking,
              the shared dinner cruise (€30-€90) bundles everything with
              hotel pickup included. For a milestone — anniversary,
              proposal, honeymoon — the private yacht charter (€220+ for 2
              hours) reserves the whole boat for just you two.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">
              Three formats for couples — which one fits your evening
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block rounded-2xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--brand-primary)]/40"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <p.icon className="h-5 w-5 text-[var(--brand-primary)]" />
                    <h3 className="text-base font-semibold text-[var(--heading)]">{p.title}</h3>
                    {p.badge && (
                      <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{p.desc}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
                    See details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Photo + memory framing */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
              What the photos look like — Bosphorus golden hour
            </h2>
            <p className="text-sm leading-relaxed text-[var(--body-text)]">
              The southern Bosphorus loop passes Dolmabahçe Palace, Ortaköy
              Mosque, the first Bosphorus Bridge, and the Rumeli Hisarı
              fortress — Istanbul's four most-photographed waterfront
              landmarks — all during the 30-45 minute golden-hour window
              between approximately 18:30 and 20:00 in summer (one hour
              earlier in winter). For couples, the post-sunset blue-hour
              segment (when the city lights come on and the sky still has
              colour) is the photography moment that ends up framed at home.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
              On private yacht charters, you can add a professional
              photographer (50+ edited photos delivered within 7 days) or
              ask the captain to slow at specific landmarks for your own
              phone-photo timing.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">Couples FAQ</h2>
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
              Plan your evening on the Bosphorus
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">
              Send the evening you're thinking of (date or even just
              "Thursday next week") + format preference (shared sunset /
              shared dinner / private yacht) and we return a complete plan
              in 24 hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/bosphorus-cruise" className="btn-cta !px-6 !py-3">
                See all options
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  "Hi MerrySails! We're a couple thinking about a Bosphorus cruise — could you help us pick between shared sunset, shared dinner, and private yacht for [date]?",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                WhatsApp the planning team
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
        reserveHref="/cruises/bosphorus-sunset-cruise"
        reserveLabel="Reserve from €30"
        whatsappLocation="couples_landing"
        whatsappPrefill="Hi MerrySails! We're a couple planning a Bosphorus cruise — what fits for [date]?"
      />
    </>
  );
}
