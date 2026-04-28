import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/bosphorus-cruise-departure-points`;

export const metadata: Metadata = {
  title: "Bosphorus Cruise Departure Points Istanbul 2026 | MerrySails",
  description:
    "Bosphorus cruise departure points in Istanbul explained by product type: Kabatas for dinner flow, Karakoy for sunset meeting flow, and Kurucesme-side marinas for private yacht departures.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/bosphorus-cruise-departure-points"),
  },
  openGraph: {
    title: "Bosphorus Cruise Departure Points Istanbul 2026 | MerrySails",
    description:
      "Use this page when the main question is where different Bosphorus cruise products start in Istanbul and which owner page each departure flow belongs to.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bosphorus cruise departure points Istanbul — MerrySails",
      },
    ],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Bosphorus Cruise Departure Points Istanbul",
  description:
    "Public support hub for Bosphorus cruise departure logic in Istanbul, clarifying which MerrySails owner or support page fits dinner, sunset, and private-yacht boarding flows.",
  url: canonicalUrl,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Bosphorus Cruise Departure Points Istanbul", item: canonicalUrl },
  ],
};

const flowCards = [
  {
    title: "Kabatas dinner-cruise flow",
    eyebrow: "Shared dinner product",
    description:
      "The shared dinner cruise uses the Kabatas-side boarding logic, often alongside selected central European-side pickup support.",
    ownerHref: "/istanbul-dinner-cruise",
    ownerLabel: "Open dinner owner page",
    supportHref: "/kabatas-dinner-cruise-istanbul",
    supportLabel: "See Kabatas support page",
  },
  {
    title: "Karakoy sunset meeting flow",
    eyebrow: "Shared golden-hour product",
    description:
      "The sunset cruise uses a Karakoy-side meeting flow, with the final boarding pin confirmed after booking for your date.",
    ownerHref: "/cruises/bosphorus-sunset-cruise",
    ownerLabel: "Open sunset owner page",
    supportHref: "/guides/karakoy-waterfront",
    supportLabel: "Read Karakoy guide",
  },
  {
    title: "Kurucesme-side private yacht departures",
    eyebrow: "Private charter direction",
    description:
      "Private yacht departures often use Kurucesme-side marina logic, but the written confirmation remains the final source of truth for the assigned yacht.",
    ownerHref: "/yacht-charter-istanbul",
    ownerLabel: "Open yacht owner page",
    supportHref: "/kurucesme-marina-yacht-charter",
    supportLabel: "See Kurucesme yacht support",
  },
];

const faqItems = [
  {
    q: "Do all Bosphorus cruises in Istanbul use the same departure point?",
    a: "No. Shared dinner, shared sunset, and private yacht products use different operational flows, so departure logic depends on the product rather than one generic pier.",
  },
  {
    q: "Should I rely on a generic map pin before booking?",
    a: "No. Public departure references are useful for planning, but the written booking confirmation is the final source of truth for the exact operational handoff on your date.",
  },
  {
    q: "Which page should I open first if I am still comparing products?",
    a: "Open the Bosphorus Cruise compare hub first. Use the narrower departure and support pages only after the product direction is already clear.",
  },
  {
    q: "When should I use a local guide instead of a commercial support page?",
    a: "Use the guide when you mainly need transport, neighborhood, or waterfront context. Use the commercial support page when the departure question is directly tied to an active booking decision.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const planningNotes = [
  "Treat the product owner page as the first booking decision and the departure page as the second click.",
  "Use Kabatas logic only for the shared dinner path, not as a generic Istanbul cruise assumption.",
  "Use Karakoy logic only after the sunset product is already chosen.",
  "Use Kurucesme-side marina logic for private yachts, but wait for the final written boarding handoff before arranging transport.",
];

export default function BosphorusCruiseDeparturePointsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]"
          >
            <Link href="/" className="hover:text-[var(--brand-primary)]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Bosphorus Cruise Departure Points Istanbul</span>
          </nav>

          <section className="mb-12 max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              Public support hub
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
              Bosphorus Cruise Departure Points Istanbul
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
              Use this page when the main question is where different Bosphorus cruise products
              start in Istanbul. MerrySails does not treat one generic waterfront pin as the answer
              for every booking. Dinner, sunset, and private-yacht departures each follow a different
              logic, and the right next click depends on the product first.
            </p>
          </section>

          <section className="mb-12 grid gap-4 lg:grid-cols-3">
            {flowCards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {item.eyebrow}
                </p>
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">{item.title}</h2>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={item.ownerHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                  >
                    {item.ownerLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={item.supportHref}
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-5 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                  >
                    {item.supportLabel}
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Departure planning rules that keep booking decisions clean
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {planningNotes.map((item) => (
                <li key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Departure-point FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-xl text-[var(--brand-primary)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] px-6 py-10 text-white md:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Product first, departure second
                </p>
                <h2 className="mb-3 text-3xl font-bold">Choose the right owner page before you solve the waterfront detail</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  If you are still broad, start with the compare hub. If the product is already chosen,
                  use the matching support page or local guide above.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/bosphorus-cruise"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Open compare hub
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Ask the team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
