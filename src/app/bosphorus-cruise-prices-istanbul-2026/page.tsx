import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import BookingReassurance from "@/components/conversion/BookingReassurance";
import {
  PHONE,
  PHONE_DISPLAY,
  SITE_URL,
  TURSAB_LICENSE_NUMBER,
  WHATSAPP_URL,
} from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import { buildLocalBusinessSchema } from "@/lib/local-business-schema";
import { SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/freshness";

const PATH = "/bosphorus-cruise-prices-istanbul-2026";
const PAGE_URL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  // Source title 37 chars; root layout template appends " | MerrySails" → 50 rendered.
  // (CLAUDE.md rule 5 — do NOT hardcode the suffix.)
  title: "Bosphorus Cruise Prices Istanbul 2026",
  description:
    "2026 Bosphorus cruise price index: €7 public ferry to €500+ private yacht. Sunset €34, dinner €30-€90, yacht €220 per boat — TÜRSAB-licensed direct rates.",
  alternates: {
    canonical: PAGE_URL,
    // EN-root only — this slug is intentionally NOT in LOCALIZED_ROUTES, so
    // buildHreflang() returns undefined (no premature locale signals). Calling
    // it keeps the helper as the single hreflang source of truth.
    languages: buildHreflang(PATH),
  },
  openGraph: {
    title: "Bosphorus Cruise Prices Istanbul 2026 — Index",
    description:
      "From the €7 public ferry to €500+ private yacht charter — every Bosphorus cruise price in Istanbul, verified against MerrySails direct booking rates.",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bosphorus cruise prices in Istanbul 2026 — MerrySails price index",
      },
    ],
  },
};

// ── Self-contained FAQ (handoff). The "best season / cheapest month" question
//    carried an [OPERATOR:] placeholder for seasonality data we do NOT have,
//    so it is DROPPED entirely — no fabrication. ───────────────────────────────
const faqItems = [
  {
    q: "How much does a Bosphorus cruise in Istanbul cost in 2026?",
    a: "Prices span a wide band by format. The cheapest option is the public Şehir Hatları / Turyol ferry at roughly €7-€12. A shared sunset cruise is €34 per person (€40 with wine), and a shared dinner cruise runs €30 to €90 per person across four packages. A private yacht is priced per boat, not per person: from €220 for a boutique yacht up to €500 for the group signature, with larger event yachts by quote.",
  },
  {
    q: "Are Bosphorus cruise prices per person or per boat?",
    a: "It depends on the format. Shared sunset and dinner cruises are priced per person — you buy a seat on a scheduled departure. Private yacht charter and hourly boat rental are priced per boat: one flat rate covers your whole group up to the vessel's capacity, so the per-person cost falls as your group grows.",
  },
  {
    q: "What is the cheapest Bosphorus cruise in Istanbul?",
    a: "If you only want to be on the water, the public Şehir Hatları or Turyol ferry is the cheapest at around €7-€12 — but it is transit, with no live guide, no refreshments, and no curated route. Among guided experiences, the shared sunset cruise at €34 per person is the lowest-priced way to get the narrated golden-hour Bosphorus route with a small group.",
  },
  {
    q: "Is a private yacht charter cheaper than buying separate cruise tickets?",
    a: "For larger groups it can be. A €220 boutique yacht holds up to 12 guests, so two hours works out near €18-€20 per head for a fully private boat — competitive with shared dinner-cruise package rates while giving you the entire vessel and your own route. For two people, the shared sunset or dinner cruise is the cheaper choice.",
  },
  {
    q: "Do longer private charters get a discount?",
    a: "Yes. Private yacht charter has a two-hour entry rate and an hourly step-up per vessel, and a flat 10% discount applies automatically from three hours onward. There is no promo code — the longer-charter discount is calculated at checkout.",
  },
];

// ── Per-person shared price index ─────────────────────────────────────────────
const sharedRows = [
  {
    option: "Bosphorus Sunset Cruise",
    price: "€34 / person (€40 with wine)",
    basis: "Per person · shared",
    duration: "2 hours",
    href: "/cruises/bosphorus-sunset-cruise",
  },
  {
    option: "Bosphorus Dinner Cruise",
    price: "€30 – €90 / person (4 packages)",
    basis: "Per person · shared",
    duration: "3.5 hours",
    href: "/bosphorus-dinner-cruise-istanbul",
  },
  {
    option: "Public Bosphorus Ferry",
    price: "≈ €7 – €12",
    basis: "Per person · public transit",
    duration: "1.5 – 2 hours",
    href: null,
  },
];

// ── Per-boat private yacht price index (synced with /pricing) ─────────────────
const yachtRows = [
  { option: "Boutique Yacht", price: "€220 / 2h (€110/hr step-up)", capacity: "Up to 12 guests" },
  { option: "Premium Yacht", price: "€320 / 2h (€160/hr step-up)", capacity: "Up to 15 guests" },
  { option: "Group Yacht (Standard)", price: "€380 / 2h (€190/hr step-up)", capacity: "Up to 40 guests" },
  { option: "Group Yacht (Signature)", price: "€500 / 2h", capacity: "15 – 40 guests" },
  { option: "Event / Mega Event Yacht", price: "By bespoke quote", capacity: "Up to 90 / 150 guests" },
];

// ── Market-context table with named public-operator sources ───────────────────
const marketRows = [
  {
    operator: "Şehir Hatları (public ferry)",
    type: "Scheduled public transit, no guide",
    price: "≈ €7 – €12",
  },
  {
    operator: "Turyol (public/short tour boats)",
    type: "Short scheduled sightseeing loops",
    price: "≈ €8 – €15",
  },
  {
    operator: "MerrySails (this operator)",
    type: "Guided shared cruise + private charter",
    price: "€34 sunset · €30-€90 dinner · €220+ yacht",
  },
];

const touristTripSchema = {
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": `${PAGE_URL}#pricing-index`,
  name: "Bosphorus Cruise Prices Istanbul 2026",
  description:
    "2026 Bosphorus cruise price index: ferry ≈€7-€12, sunset €34 (€40 wine), dinner €30-€90, private yacht €220-€500 per boat. TURSAB-licensed direct rates.",
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_LAST_MODIFIED,
  url: PAGE_URL,
  provider: {
    "@type": "TravelAgency",
    name: "MerrySails",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    telephone: "+90-544-898-98-12",
  },
  touristType: ["FamilyTourist", "CouplesTourist", "LuxuryTourist"],
  availableLanguage: ["English", "Turkish", "German", "French"],
  areaServed: { "@type": "Place", name: "Bosphorus Strait, Istanbul" },
  offers: [
    {
      "@type": "Offer",
      ...OFFER_MERCHANT_DEFAULTS,
      name: "Bosphorus Sunset Cruise",
      price: "34",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
    },
    {
      "@type": "Offer",
      ...OFFER_MERCHANT_DEFAULTS,
      name: "Istanbul Dinner Cruise",
      price: "30",
      priceCurrency: "EUR",
      url: `${SITE_URL}/bosphorus-dinner-cruise-istanbul`,
    },
    {
      "@type": "Offer",
      ...OFFER_MERCHANT_DEFAULTS,
      name: "Private Yacht Charter Istanbul",
      price: "220",
      priceCurrency: "EUR",
      url: `${SITE_URL}/yacht-charter-istanbul`,
    },
  ],
};

// Separate Product block carries the AggregateOffer band + rating star (a
// TouristTrip/Service parent cannot host aggregateRating per CLAUDE.md rule 4a).
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${PAGE_URL}#product`,
  name: "Bosphorus Cruise Istanbul — 2026 Price Index",
  description:
    "Direct 2026 Bosphorus cruise prices: shared sunset €34, dinner €30-€90, private yacht €220-€500 per boat. Booked direct with MerrySails, no OTA markup.",
  image: `${SITE_URL}/og-image.jpg`,
  brand: { "@type": "Brand", name: "MerrySails" },
  sku: "merrysails-bosphorus-cruise-prices-2026",
  category: "Bosphorus Cruise Istanbul Pricing",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "30",
    highPrice: "500",
    offerCount: 6,
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
    { "@type": "ListItem", position: 3, name: "Bosphorus Cruise Prices 2026", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function BosphorusCruisePricesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildLocalBusinessSchema({
              pageUrl: PAGE_URL,
              priceRange: "€-€€€€ (€7 public ferry to €500+ private yacht; event yachts by quote)",
              description:
                "Bosphorus cruise price index for Istanbul: public ferry ≈€7-€12, shared sunset €34 (€40 wine), dinner €30-€90, private yacht €220-€500 per boat. TURSAB licensed since 2001.",
            }),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="pb-20 bg-[var(--surface-alt)]">
        {/* Hero */}
        <section className="relative h-[36vh] min-h-[260px] md:h-[44vh] md:min-h-[340px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
            alt="Bosphorus strait at golden hour with Istanbul skyline — Bosphorus cruise prices 2026"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-end pb-8 md:pb-12 pt-28">
            <div className="container-main text-white">
              <p className="inline-flex rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
                TÜRSAB A-Group · Verified Direct Rates · 2026
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
                Bosphorus Cruise Prices in Istanbul (2026): The Complete Price Index
              </h1>
              <p className="text-base md:text-lg drop-shadow-md max-w-2xl">
                From the <strong>€7</strong> public ferry to a <strong>€500+</strong> private yacht — every format, priced.
              </p>
            </div>
          </div>
        </section>

        <div className="container-main pt-10">
          {/* TL;DR self-contained answer block (130-160 words) */}
          <section className="mb-10 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6 md:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              The short answer
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              Bosphorus cruise prices in Istanbul range from about <strong>€7</strong> for the public Şehir Hatları or
              Turyol ferry to <strong>€500+</strong> for a private yacht charter — the format you pick decides the price.
              A shared <strong>sunset cruise is €34 per person</strong> (€40 with wine) for a guided two-hour golden-hour
              route. A shared <strong>dinner cruise runs €30 to €90 per person</strong> across four packages, with the
              Turkish-night show included. A <strong>private yacht is priced per boat, not per person</strong>: from
              <strong> €220</strong> for a boutique yacht (up to 12 guests) and rising by tier and capacity, with a flat
              <strong> 10% discount from three hours</strong>. Shared sunset and dinner cruises are sold per person;
              yacht charter and hourly rental are sold per boat. All figures below are MerrySails direct booking rates —
              no OTA markup, no booking fee.
            </p>
          </section>

          {/* Price index — shared per person */}
          <section className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                The Price Index — Shared Cruises (Per Person)
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Shared departures sell a seat on a scheduled boat. These are the lowest-commitment ways onto the
                Bosphorus, and the cheapest line is the public ferry — transit only, no guide or refreshments.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[var(--surface-alt)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Option</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold">Pricing basis</th>
                    <th className="px-5 py-4 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sharedRows.map((row) => (
                    <tr key={row.option} className="hover:bg-[var(--surface-alt)]">
                      <td className="px-5 py-5 font-semibold text-[var(--heading)]">
                        {row.href ? (
                          <Link href={row.href} className="hover:text-[var(--brand-primary)] hover:underline">
                            {row.option}
                          </Link>
                        ) : (
                          row.option
                        )}
                      </td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.price}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.basis}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Price index — private yacht per boat */}
          <section className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                The Price Index — Private Yacht Charter (Per Boat)
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Private charter is priced per vessel, captain and crew included. Each yacht has a two-hour entry rate
                and an hourly step-up; a flat 10% discount applies automatically from three hours. See the full breakdown
                on the{" "}
                <Link href="/yacht-charter-istanbul" className="font-semibold text-[var(--brand-primary)] hover:underline">
                  yacht charter Istanbul
                </Link>{" "}
                page.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-[var(--surface-alt)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Yacht tier</th>
                    <th className="px-5 py-4 font-semibold">Price (per boat)</th>
                    <th className="px-5 py-4 font-semibold">Capacity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {yachtRows.map((row) => (
                    <tr key={row.option} className="hover:bg-[var(--surface-alt)]">
                      <td className="px-5 py-5 font-semibold text-[var(--heading)]">{row.option}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.price}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* €220 value-leader callout (2026-06-27): the boutique yacht at
                €220 / 2h is the lowest credible price to charter a private boat
                on the Bosphorus — comparable private charters elsewhere start
                around €450-600 for the same two hours. Factual value claim, no
                competitor named. */}
            <div className="border-t border-emerald-200 bg-emerald-50/70 p-6 md:flex md:items-center md:justify-between md:gap-6">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  The €220 value leader
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900 md:text-base">
                  At <strong>€220 for 2 hours</strong>, the boutique yacht is the lowest credible price to charter a
                  private boat on the Bosphorus — most comparable private charters run <strong>€450–€600+</strong> for
                  the same two hours. One flat rate covers your whole group of up to 12, captain and crew included, so
                  for a small group it works out near €18–€20 a head for a fully private boat.
                </p>
              </div>
              <Link
                href="/yacht-charter-istanbul"
                className="mt-4 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 md:mt-0"
              >
                See yacht charter <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Market-context table with named public sources */}
          <section className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[var(--heading)]">
                Market Context — How the Prices Compare
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                The Bosphorus is served by three very different price tiers. The public boats are the cheapest way to
                cross the water; a guided cruise buys you the narrated route, refreshments, and a curated experience.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-[var(--surface-alt)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Source / operator</th>
                    <th className="px-5 py-4 font-semibold">What you get</th>
                    <th className="px-5 py-4 font-semibold">Typical price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {marketRows.map((row) => (
                    <tr key={row.operator} className="hover:bg-[var(--surface-alt)]">
                      <td className="px-5 py-5 font-semibold text-[var(--heading)]">{row.operator}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.type}</td>
                      <td className="px-5 py-5 text-[var(--body-text)]">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-xs text-[var(--text-muted)]">
              Sources: public-transit fares from Şehir Hatları and Turyol scheduled services; guided-cruise and charter
              figures are MerrySails published direct rates (see{" "}
              <Link href="/pricing" className="font-semibold text-[var(--brand-primary)] hover:underline">
                full pricing
              </Link>
              ).
            </p>
          </section>

          {/* Expert quote — Captain Ahmet (verbatim handoff) */}
          <section className="mb-10 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10">
                <ShieldCheck className="h-5 w-5 text-[var(--brand-primary)]" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                From the wheelhouse — Captain Ahmet
              </p>
            </div>
            <blockquote className="max-w-3xl border-l-4 border-[var(--brand-primary)]/40 pl-5 text-base italic leading-relaxed text-[var(--text-muted)]">
              &ldquo;People ask me why one Bosphorus cruise is €7 and another is €500, and the honest answer is that
              you are not buying the same thing. The €7 ferry is a bus on water — it gets you across, nothing more. What
              you pay for on a cruise is the route, the timing, the guide, and the boat being yours or shared. We have
              run this water under a TÜRSAB A-Group licence since 2001 and hosted more than 50,000 guests, so my advice
              is simple: pick the format that matches your evening, not the lowest number you can find. The price is
              just the format wearing a price tag.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              MerrySails — TÜRSAB A-Group licensed since 2001 · 50,000+ guests hosted · TÜRSAB #{TURSAB_LICENSE_NUMBER}
            </p>
          </section>

          {/* First-party trust + contact row (ONLY the verified 50,000+ datum) */}
          <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-[var(--heading)]">
                  Book direct at these prices — no OTA markup
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                  MerrySails has hosted <strong>50,000+ guests since 2001</strong> as a TÜRSAB A-Group licensed operator.
                  Every figure on this page is the direct booking rate — send your date and guest count and we will
                  route you to the right cruise and confirm the price.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="price_index_whatsapp"
                  location="bosphorus_cruise_prices_contact_box"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp the Team
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE}`}
                  kind="phone"
                  label="price_index_call"
                  location="bosphorus_cruise_prices_contact_box"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call {PHONE_DISPLAY}
                </TrackedContactLink>
              </div>
            </div>
            {/* Reassurance strip (2026-06-27): free-cancellation + instant-confirm
                + fast WhatsApp reply, next to the booking contact CTAs. */}
            <BookingReassurance className="mt-6" />
          </section>

          {/* In-content contextual links (RED LINE: no nav strip) */}
          <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Book the right Bosphorus cruise</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Now that you know the prices, go straight to the booking page that fits your evening. For a full
              side-by-side of formats, start at the{" "}
              <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Bosphorus cruise comparison hub
              </Link>
              .
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/cruises/bosphorus-sunset-cruise"
                className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
              >
                <h3 className="mb-1 text-lg font-bold text-[var(--heading)]">Bosphorus Sunset Cruise</h3>
                <p className="text-sm text-[var(--text-muted)]">€34 per person · 2 hours · shared golden-hour route.</p>
                <span className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                  Book sunset <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/bosphorus-dinner-cruise-istanbul"
                className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
              >
                <h3 className="mb-1 text-lg font-bold text-[var(--heading)]">Istanbul Dinner Cruise</h3>
                <p className="text-sm text-[var(--text-muted)]">€30 – €90 per person · 3.5 hours · 4 packages.</p>
                <span className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                  Book dinner <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/yacht-charter-istanbul"
                className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
              >
                <h3 className="mb-1 text-lg font-bold text-[var(--heading)]">Yacht Charter Istanbul</h3>
                <p className="text-sm text-[var(--text-muted)]">From €220 per boat · private · 10% off from 3 hours.</p>
                <span className="mt-3 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                  Book yacht <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Bosphorus cruise price FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.q} className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center text-sm text-[var(--text-muted)]">
              <span>More resources:</span>
              <Link href="/pricing" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Full pricing →
              </Link>
              <span className="hidden sm:inline">·</span>
              <Link href="/bosphorus-cruise" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Compare all cruises →
              </Link>
              <span className="hidden sm:inline">·</span>
              <Link href="/istanbul-cruise-faq" className="font-semibold text-[var(--brand-primary)] hover:underline">
                Full cruise FAQ →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
