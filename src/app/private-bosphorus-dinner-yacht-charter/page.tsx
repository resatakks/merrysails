import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import QuickAnswer from "@/components/ai/QuickAnswer";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { getTourBySlug } from "@/data/tours";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/private-bosphorus-dinner-yacht-charter`;

function requireTour(slug: string, label: string) {
  const tour = getTourBySlug(slug);
  if (!tour) throw new Error(`${label} data is missing.`);
  return tour;
}

const tour = requireTour("private-bosphorus-dinner-yacht-cruise", "Private Bosphorus Dinner Yacht Charter, Istanbul");

export const metadata: Metadata = {
  title: "Private Bosphorus Dinner Yacht Charter",
  description: "Private Bosphorus dinner yacht charter from €320 — your own yacht, a four-course dinner, captain and crew. MerrySails, TURSAB-licensed since 2001.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/private-bosphorus-dinner-yacht-charter"),
  },
  openGraph: {
    title: "Private Bosphorus Dinner Yacht Charter",
    description: "Private Bosphorus dinner yacht charter from €320 — your own yacht, a four-course dinner, captain and crew. MerrySails, TURSAB-licensed since 2001.",
    url: canonicalUrl,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Private Bosphorus Dinner Yacht Charter, Istanbul — MerrySails" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Bosphorus Dinner Yacht Charter, Istanbul",
  description: "Private Bosphorus dinner yacht charter from €320 — your own yacht, a four-course dinner, captain and crew. MerrySails, TURSAB-licensed since 2001.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "City", name: "Istanbul" },
  serviceType: "Private Bosphorus Dinner Yacht Charter, Istanbul",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Private Bosphorus Dinner Yacht Charter, Istanbul",
  description: "Private Bosphorus dinner yacht charter from €320 — your own yacht, a four-course dinner, captain and crew. MerrySails, TURSAB-licensed since 2001.",
  image: Array.from(new Set([tour.image, ...(tour.gallery ?? [])])).slice(0, 6),
  sku: "merrysails-private-bosphorus-dinner-yacht-charter",
  category: "Private Bosphorus Dinner Yacht Charter, Istanbul",
  brand: { "@type": "Brand", name: "MerrySails" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: tour.rating, reviewCount: tour.reviewCount, bestRating: 5, worstRating: 1 },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: String(tour.packages?.[0]?.price ?? tour.priceEur),
    highPrice: String(tour.packages?.[tour.packages.length - 1]?.price ?? tour.priceEur),
    offerCount: tour.packages?.length ?? 1,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
    seller: { "@id": `${SITE_URL}/#organization` },
    ...OFFER_MERCHANT_DEFAULTS,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Private Bosphorus Dinner Yacht Charter, Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    "q": "How much is a private dinner yacht charter in Istanbul?",
    "a": "Essential is €320 for a three-hour private charter with a four-course dinner, captain and crew. Premium is €550 with a larger yacht and wine pairing, and VIP is €850 with a luxury yacht, premium spirits and a personal chef."
  },
  {
    "q": "How is this different from the shared dinner cruise?",
    "a": "The shared dinner cruise seats your group among other guests on a fixed package. This private charter gives your group the whole yacht, with the dinner and timing arranged around you alone."
  },
  {
    "q": "Is a dinner included in the charter?",
    "a": "Yes — a four-course dinner is part of every tier, served on board during the sailing. Higher tiers add wine pairing, a dessert selection and, on VIP, a personal chef."
  },
  {
    "q": "Where does the private dinner yacht board?",
    "a": "Private dinner charters board on the European side of the Bosphorus; the exact pier and meeting instructions are confirmed by WhatsApp once your date is reserved."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Private Bosphorus Dinner Yacht Charter, Istanbul",
  url: canonicalUrl,
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".page-intro"] },
};

const fitCards = [
  {
    "title": "The yacht is yours alone",
    "description": "This is a private charter, not the shared dinner cruise — your group has the whole boat and deck for the evening."
  },
  {
    "title": "Dinner is built in",
    "description": "Every tier includes a four-course dinner on board, with wine pairing and a personal chef on the higher tiers."
  },
  {
    "title": "For occasions that matter",
    "description": "Anniversaries, proposals and milestone dinners suit this charter; add a photographer or styling to mark the night."
  }
];

const packageHighlights = tour.packages?.map((pkg) => ({
  name: pkg.name,
  price: `EUR ${pkg.price}`,
  description: pkg.description,
  features: (pkg.features ?? []).slice(0, 4),
})) ?? [];

const trustSignals = [
  "MerrySails has welcomed more than 50,000 guests onto the Bosphorus since 2001.",
  "We hold a TURSAB A Group licence and confirm every booking in writing before you sail.",
  "The prices shown here are live published rates pulled directly from our booking system.",
  "Boarding details for your specific date arrive by WhatsApp — never a vague pier guess.",
];

export default function Page() {
  const heroImage = tour.image;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Private Bosphorus Dinner Yacht Charter, Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">Private Bosphorus Dinner Yacht Charter, Istanbul</h1>
              <QuickAnswer locale="en" title={"Private Bosphorus Dinner Yacht Charter, Istanbul"} question={"What does a private Bosphorus dinner yacht charter cost in Istanbul?"} content={"A private Bosphorus dinner yacht charter with MerrySails starts at €320 (Essential, three hours, four-course dinner, captain and crew), with Premium at €550 adding wine pairing and a larger yacht, and VIP at €850 with a luxury vessel, premium spirits and a personal chef. The boat is yours alone for an evening dinner sailing past the lit shoreline."} />
              <p className="page-intro mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">When dinner on the Bosphorus should feel like your own evening, this is the charter. You take the whole yacht, a four-course dinner is served on board, and the crew runs the sail while your group has the deck to itself.</p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">Private dinner from</p>
                <p className="text-3xl font-bold text-[var(--heading)]">EUR 320</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Whole-yacht evening charter with a four-course dinner. Premium adds wine pairing and a larger boat; VIP brings a personal chef and premium spirits.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/private-bosphorus-dinner-cruise" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                  Open the private dinner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/reservation" className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white">
                  Start your booking
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={heroImage} alt="Private Bosphorus Dinner Yacht Charter, Istanbul in Istanbul with MerrySails" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">Three things we confirm with you first</h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Your date and how much room there is to move it",
                  "Your group size, so the right boat is reserved",
                  "Any extras — wine, catering, a photographer — quoted up front",
                  "The exact pier, sent in writing once you reserve",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="font-bold text-[var(--brand-primary)]">✓</span><span>{item}</span></li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">Fastest way to a firm answer</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Drop your date through <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">contact</Link> or WhatsApp {PHONE_DISPLAY}; our team replies with live availability.</p>
              </div>
            </aside>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Who this page is for</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {packageHighlights.length > 0 && (
            <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Packages and what they cost</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {packageHighlights.map((pkg) => (
                  <div key={pkg.name} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--heading)]">{pkg.name}</h3>
                        {pkg.description && <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{pkg.description}</p>}
                      </div>
                      <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-sm font-semibold text-white">{pkg.price}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2"><span className="font-bold text-[var(--brand-primary)]">✓</span><span>{feature}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-[var(--text-muted)]">Want the full price list? <Link href="/pricing" className="font-semibold text-[var(--brand-primary)] hover:underline">See every Bosphorus cruise price →</Link></p>
            </section>
          )}

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Questions guests ask before booking</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">{item.q}<span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">▼</span></summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Why guests choose MerrySails</h2>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-start gap-2"><span className="font-bold text-[var(--brand-primary)]">✓</span><span>{signal}</span></li>
              ))}
            </ul>
          </section>

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Plan a private dinner on your own yacht</h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">Share your date, group size and any menu preferences and we confirm the vessel, the boarding pier, and a full quote for the evening.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/private-bosphorus-dinner-cruise" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50">Open the private dinner page</Link>
              <TrackedContactLink href={WHATSAPP_URL} kind="whatsapp" label="private-bosphorus-dinner-yacht-charter_cta_whatsapp" location="private-bosphorus-dinner-yacht-charter" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)]">Message us on WhatsApp</TrackedContactLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
