import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { getTourBySlug } from "@/data/tours";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/turkish-night-dinner-cruise-istanbul`;

function requireTour(slug: string, label: string) {
  const tour = getTourBySlug(slug);
  if (!tour) {
    throw new Error(`${label} data is missing.`);
  }
  return tour;
}

const dinnerTour = requireTour("bosphorus-dinner-cruise", "Dinner cruise");

export const metadata: Metadata = {
  title: "Turkish Night Dinner Cruise Istanbul 2026 | Shared Bosphorus Show & Dinner",
  description:
    "Turkish night dinner cruise Istanbul support page for guests who already want the shared Bosphorus evening and need clearer show, package, and shared-night format guidance.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/turkish-night-dinner-cruise-istanbul"),
  },
  openGraph: {
    title: "Turkish Night Dinner Cruise Istanbul 2026 | Shared Bosphorus Show & Dinner",
    description:
      "Use this page when the Turkish-night show, shared dinner format, and package fit are the main booking questions before a Bosphorus evening in Istanbul.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Turkish night dinner cruise Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Turkish Night Dinner Cruise Istanbul",
  description:
    "Commercial support page for guests comparing a shared Bosphorus dinner cruise in Istanbul when the Turkish-night show and dinner-led package fit are the main decision points.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  openingHours: "Mo-Su 00:00-23:59",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Shared Bosphorus Dinner Cruise Show Support",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "30",
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
    url: `${SITE_URL}/istanbul-dinner-cruise`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Turkish Night Dinner Cruise Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for the Bosphorus dinner cruise?",
    a: "No. The protected owner page remains Istanbul Dinner Cruise. This support page is only for the narrower case where the Turkish-night show and shared evening format are the main buying questions.",
  },
  {
    q: "Should I use this page if I still need to compare sunset, dinner, and yacht options?",
    a: "No. Use the Bosphorus Cruise compare hub first if you are still broad. This page assumes a shared dinner cruise is already the likely direction.",
  },
  {
    q: "Is the Turkish night the same as a private dinner yacht experience?",
    a: "No. This page belongs to the shared dinner-cruise route with public evening entertainment. Private dinner yacht plans belong on the private dinner or yacht-charter pages instead.",
  },
  {
    q: "Do I still need the pickup or Kabatas pages?",
    a: "Use the pickup page when hotel transfer eligibility is the main blocker. Use the Kabatas page when pier-side arrival confidence is the main blocker. Use this page when the deciding question is the Turkish-night dinner format itself.",
  },
  {
    q: "What stays the final source of truth for the evening plan?",
    a: "The live dinner-cruise page and the written booking confirmation remain the source of truth for exact package details, boarding instructions, and the final operational flow.",
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

const fitCards = [
  {
    title: "The show format is the deciding question",
    description:
      "Use this page when the guest already wants the shared evening and needs clearer Turkish-night, stage, and dinner-flow context before booking.",
  },
  {
    title: "A shared public dinner cruise is still the right product",
    description:
      "This page is not for guests who need a private yacht, a private dinner table, or a custom proposal or company brief.",
  },
  {
    title: "Package fit matters more than marina or route planning",
    description:
      "Use this page when the practical question is what kind of evening entertainment and shared dinner structure to expect.",
  },
];

const decisionRows = [
  {
    question: "I want a shared Bosphorus dinner with Turkish-night entertainment",
    bestPage: "Turkish Night Dinner Support",
    reason: "The show-led shared evening is the main decision point, not private yacht routing or boarding logistics.",
  },
  {
    question: "I already want the shared dinner cruise but need hotel transfer clarity",
    bestPage: "Dinner Pickup Support",
    reason: "Pickup eligibility is a different modifier from the Turkish-night package question.",
  },
  {
    question: "I already want the shared dinner cruise but need Kabatas boarding confidence",
    bestPage: "Kabatas Dinner Support",
    reason: "Pier-side arrival and boarding logic are different from the show and package fit question.",
  },
  {
    question: "I want dinner on a private yacht instead of a public evening boat",
    bestPage: "Private Bosphorus Dinner Cruise",
    reason: "Private dinner intent should not be mixed with the public Turkish-night dinner route.",
  },
];

const flowSteps = [
  {
    title: "Confirm the shared dinner route is the right product",
    description:
      "This support page only makes sense after you know the evening should stay on the main shared Bosphorus dinner path.",
  },
  {
    title: "Compare the Turkish-night dinner fit",
    description:
      "The real question here is whether a stage-entertainment-led evening and a shared dinner boat match the mood you want.",
  },
  {
    title: "Move to pickup or Kabatas pages only if logistics become the blocker",
    description:
      "Show fit, pickup fit, and boarding fit are three different sub-intents. Use the narrower page only for the blocker you actually have.",
  },
  {
    title: "Finish the booking on the main dinner owner page",
    description:
      "Once the format is clear, move back to the owner page for package comparison, reservation flow, and the live dinner-cruise details.",
  },
];

const dinnerPackages = dinnerTour.packages?.map((pkg) => ({
  name: pkg.name,
  price: `EUR ${pkg.price}`,
  description: pkg.description,
  features: pkg.features.slice(0, 4),
})) ?? [];

const trustSignals = [
  "Merry Tourism has operated Istanbul travel services since 2001.",
  "The shared dinner cruise sits under a TURSAB-backed operator with written booking follow-up.",
  "Pickup, Kabatas boarding, and package details are confirmed in writing for the booked date.",
  "This support page narrows Turkish-night intent without replacing the protected dinner owner page.",
];

const comparePages = [
  {
    href: "/istanbul-dinner-cruise",
    title: "Istanbul Dinner Cruise",
    description:
      "Use the protected owner page for package comparison, reservation flow, and the live shared dinner-cruise details.",
  },
  {
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    title: "Dinner Cruise with Hotel Pickup",
    description:
      "Use this when hotel location and pickup eligibility matter more than the show format itself.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    title: "Sultanahmet & Taksim Pickup",
    description:
      "Use this when the show fit is clear and the remaining blocker is central hotel pickup around Sultanahmet, Taksim, Sirkeci, or Karakoy.",
  },
  {
    href: "/kabatas-dinner-cruise-istanbul",
    title: "Kabatas Dinner Support",
    description:
      "Use this when the practical blocker is Kabatas-side arrival and boarding confidence rather than Turkish-night fit.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Use this when the evening should stay private and dinner-led instead of public and show-led.",
  },
];

export default function TurkishNightDinnerCruiseIstanbulPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <span className="text-[var(--heading)]">Turkish Night Dinner Cruise Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Turkish Night Dinner Cruise Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the shared Bosphorus dinner cruise is already the likely fit and
                the real question is whether the Turkish-night dinner format is right for your
                evening. The protected owner page is still{" "}
                <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
                  Istanbul Dinner Cruise
                </Link>
                ; this page exists to clarify the show-led shared-night format before the booking
                moves back to the main dinner owner.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Shared show-led evening
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. This page is for the public dinner-cruise route where the show format,
                  evening mood, and package fit matter more than private-yacht planning.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/istanbul-dinner-cruise"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Compare dinner packages <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask about show fit
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={dinnerTour.image}
                  alt="Shared Bosphorus dinner cruise in Istanbul with Turkish-night atmosphere"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us confirm the right Turkish-night dinner fit
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and guest count",
                  "Whether the group wants the shared public dinner format",
                  "Whether hotel pickup or direct arrival is part of the question",
                  "Whether the decision is show-led or should move to a private dinner yacht instead",
                  "Whether a package-led evening is still better than a custom charter",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">Fast reply path</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Send the date, hotel, and guest count through{" "}
                  <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">
                    contact
                  </Link>{" "}
                  or WhatsApp at {PHONE_DISPLAY}.
                </p>
              </div>
            </aside>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this Turkish night dinner cruise page is the right fit
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Which dinner package usually fits a Turkish-night Bosphorus evening?
            </h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              The Turkish-night question usually sits inside the main shared dinner product, not outside it. These
              four dinner packages keep the same evening route and show flow, while table tier and beverage inclusion
              create the real commercial split.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {dinnerPackages.map((pkg) => (
                <div key={pkg.name} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--heading)]">{pkg.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{pkg.description}</p>
                    </div>
                    <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1 text-sm font-semibold text-white">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="font-bold text-[var(--brand-primary)]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Turkish night dinner cruise vs pickup vs Kabatas support
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--heading)]">
                    <th className="px-4 py-3 font-semibold">Main question</th>
                    <th className="px-4 py-3 font-semibold">Best page</th>
                    <th className="px-4 py-3 font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionRows.map((row) => (
                    <tr key={row.question} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 text-[var(--heading)]">{row.question}</td>
                      <td className="px-4 py-3 font-medium text-[var(--brand-primary)]">{row.bestPage}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How the Turkish-night dinner decision usually works
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {flowSteps.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare with the pages that own the final dinner decision
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Turkish night dinner FAQs
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {item.q}
                    <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
                  Why trust MerrySails for Turkish-night dinner cruise planning?
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  This page exists to tighten one narrow decision: whether the shared dinner cruise with Turkish-night
                  atmosphere is the right fit. The trust layer should stay visible before guests move into the final
                  owner page and reservation flow.
                </p>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  {trustSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <span className="font-bold text-[var(--brand-primary)]">✓</span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-[var(--surface-alt)] p-5">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">Best next step</p>
                <h3 className="mb-2 text-xl font-semibold text-[var(--heading)]">Move to the main dinner owner page once the format is clear</h3>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                  If the real answer is “yes, we want the shared dinner with Turkish-night entertainment”, the clean
                  next move is to compare the four public packages on the protected dinner owner page or send the hotel
                  and date on WhatsApp for a quick recommendation.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/istanbul-dinner-cruise" className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                    Open dinner owner page
                  </Link>
                  <TrackedContactLink
                    href={WHATSAPP_URL}
                    kind="whatsapp"
                    label="turkish_night_mid_whatsapp"
                    location="turkish_night_mid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                  >
                    WhatsApp the hotel
                  </TrackedContactLink>
                </div>
              </div>
            </div>
          </section>

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Check whether the Turkish-night dinner format fits your evening
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              Send the date, guest count, and whether the main question is the show format,
              pickup, or pier-side boarding. We will route you to the correct shared dinner path.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50"
              >
                Request dinner guidance
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="turkish_night_dinner_page_whatsapp"
                location="turkish_night_dinner_page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)]"
              >
                Ask on WhatsApp
              </TrackedContactLink>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
