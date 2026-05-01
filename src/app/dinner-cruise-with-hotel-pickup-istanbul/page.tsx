import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { getTourBySlug } from "@/data/tours";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/dinner-cruise-with-hotel-pickup-istanbul`;

function requireTour(slug: string, label: string) {
  const tour = getTourBySlug(slug);
  if (!tour) {
    throw new Error(`${label} data is missing.`);
  }
  return tour;
}

const dinnerTour = requireTour("bosphorus-dinner-cruise", "Dinner cruise");

export const metadata: Metadata = {
  title: "Dinner Cruise with Hotel Pickup Istanbul 2026 | MerrySails",
  description:
    "Dinner cruise with hotel pickup support in Istanbul for guests who want a shared Bosphorus evening and selected central European-side pickup logic before Kabatas boarding.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/dinner-cruise-with-hotel-pickup-istanbul"),
  },
  openGraph: {
    title: "Dinner Cruise with Hotel Pickup Istanbul 2026 | MerrySails",
    description:
      "Use this page when hotel pickup is the deciding factor for a shared Bosphorus dinner cruise in Istanbul. Compare package fit, pickup logic, and Kabatas boarding context.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Dinner cruise with hotel pickup Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dinner Cruise with Hotel Pickup Istanbul",
  description:
    "Support page for guests comparing a shared Bosphorus dinner cruise in Istanbul when hotel pickup from selected central European-side zones is part of the decision.",
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
  serviceType: "Shared Bosphorus Dinner Cruise Pickup Support",
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
    { "@type": "ListItem", position: 2, name: "Dinner Cruise with Hotel Pickup Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is hotel pickup guaranteed for every Istanbul dinner cruise booking?",
    a: "No. The shared dinner cruise uses pickup support for selected central European-side zones, but the final plan still depends on hotel location, street access, and the operating flow on your date.",
  },
  {
    q: "Is this the main page for comparing dinner cruise packages?",
    a: "No. The main package owner is the Istanbul Dinner Cruise page. This support page is for guests whose main question is whether hotel pickup and the Kabatas boarding flow fit their evening.",
  },
  {
    q: "Do Asian-side hotels usually get the same pickup support?",
    a: "Usually not. Asian-side guests are often asked to arrive directly to the Kabatas side instead of entering the shared pickup flow.",
  },
  {
    q: "What happens after pickup is confirmed?",
    a: "The team confirms whether your hotel can use direct pickup or a nearby collection point, then routes you into the shared dinner-cruise boarding plan tied to the Kabatas side.",
  },
  {
    q: "When should I choose a different page instead?",
    a: "Choose the main dinner page if you are still comparing packages, private dinner cruise if the evening should stay fully private, and yacht charter or boat rental if the vessel matters more than the shared dinner format.",
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
    title: "Pickup is the deciding constraint",
    description:
      "Use this page when the question is not just price or menu, but whether the evening can begin from your hotel instead of direct arrival.",
  },
  {
    title: "You still want the shared dinner format",
    description:
      "This page stays within the public dinner-cruise flow. It is not for guests who need a private yacht or a custom dinner build.",
  },
  {
    title: "Kabatas planning matters",
    description:
      "Use this page when you need to understand how hotel pickup support connects to the Kabatas-side boarding plan.",
  },
];

const flowSteps = [
  {
    title: "Start with the main dinner package fit",
    description:
      "First confirm that a shared Bosphorus dinner cruise is the right product. The protected dinner owner page remains the main place to compare Silver and Gold package choices.",
  },
  {
    title: "Send hotel and date details",
    description:
      "Share your hotel, guest count, and date. Pickup support depends on location, street access, and whether your stay fits the selected central European-side operating zones.",
  },
  {
    title: "Receive pickup or meeting-point confirmation",
    description:
      "Some guests get direct hotel pickup, while others are routed to a nearby collection point when vehicle access is limited.",
  },
  {
    title: "Join the Kabatas-side boarding flow",
    description:
      "Once the transfer logic is confirmed, the evening continues inside the shared dinner-cruise operation rather than a separate private transfer product.",
  },
];

const supportLimits = [
  "Treat pickup as operating support, not a blanket citywide promise.",
  "Selected central European-side zones are the first fit for the shared dinner flow.",
  "Some hotels need a nearby collection point instead of door pickup.",
  "Asian-side stays often work better with direct arrival to the Kabatas side.",
  "The written confirmation is the final source of truth for the evening plan.",
];

const dinnerPackages = dinnerTour.packages?.map((pkg) => ({
  name: pkg.name,
  price: `EUR ${pkg.price}`,
  description: pkg.description,
  features: pkg.features.slice(0, 4),
})) ?? [];

const trustSignals = [
  "Merry Tourism has operated Istanbul travel products since 2001.",
  "The shared dinner route sits under a TURSAB-backed Istanbul operator.",
  "Pickup is checked against hotel location, access, and the live operating flow before being confirmed.",
  "The protected Istanbul Dinner Cruise page remains the final package owner, so support routing does not replace the real booking source.",
];

const pickupDecisionRows = [
  {
    question: "I already want the shared dinner cruise and my main blocker is hotel transfer",
    bestPage: "Dinner Pickup Support",
    reason: "Pickup eligibility is the deciding modifier, so the transfer-led support page is the right first stop.",
  },
  {
    question: "I already want the shared dinner cruise and my main blocker is Kabatas-side boarding",
    bestPage: "Kabatas Dinner Support",
    reason: "Pier-side arrival confidence is a different sub-intent from pickup support.",
  },
  {
    question: "I want the shared dinner route because of the Turkish-night show and evening mood",
    bestPage: "Turkish Night Dinner Support",
    reason: "Show-led package fit is a different question from transfer logistics.",
  },
  {
    question: "I need a private dinner yacht instead of the public evening boat",
    bestPage: "Private Bosphorus Dinner Cruise",
    reason: "Private dinner intent should not be handled on a pickup-led shared-cruise page.",
  },
];

const comparePages = [
  {
    href: "/istanbul-dinner-cruise",
    title: "Istanbul Dinner Cruise",
    description:
      "Use the main owner page to compare shared dinner packages, inclusions, and the public evening format first.",
  },
  {
    href: "/turkish-night-dinner-cruise-istanbul",
    title: "Turkish Night Dinner Support",
    description:
      "Use this when the deciding question is the Turkish-night dinner format and package fit rather than transfer eligibility.",
  },
  {
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    title: "Sultanahmet & Taksim Pickup",
    description:
      "Use this when the main question is whether a central hotel around Sultanahmet, Taksim, Sirkeci, or Karakoy fits the dinner pickup flow.",
  },
  {
    href: "/guides/kabatas-pier",
    title: "Kabatas Pier Guide",
    description:
      "Use this when the product is already chosen and you only need boarding and arrival context around the Kabatas side.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Use this when dinner should stay private and the yacht, table, and timing belong only to your group.",
  },
  {
    href: "/contact",
    title: "Contact for Pickup Check",
    description:
      "Use this when the hotel, date, or guest count is already clear and you want the team to confirm the evening flow.",
  },
];

export default function DinnerCruiseWithHotelPickupIstanbulPage() {
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
            <span className="text-[var(--heading)]">Dinner Cruise with Hotel Pickup Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Dinner Cruise with Hotel Pickup Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the shared dinner cruise is already close to the right fit and
                hotel pickup support is the deciding question. The main owner page is still{" "}
                <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
                  Istanbul Dinner Cruise
                </Link>
                ; this page exists to clarify whether selected central European-side pickup logic
                and the Kabatas boarding flow match your evening.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Trust and booking reality
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Pickup support is confirmed after we review hotel location, street access,
                  and the live dinner-cruise operating plan.
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
                  Ask about pickup support
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={dinnerTour.image}
                  alt="Shared Bosphorus dinner cruise in Istanbul with evening dining setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us confirm the pickup-led dinner flow
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Hotel name or district",
                  "Date and preferred dinner package",
                  "Guest count and whether children are joining",
                  "Whether you need direct pickup or can use a nearby meeting point",
                  "Whether the evening still fits the shared dinner format",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">Fastest confirmation path</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Send the hotel, date, and guest count through{" "}
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
              When this pickup-focused dinner page is the right fit
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
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-[var(--heading)]">
                  How the hotel-pickup dinner flow usually works
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
                  This is a routing layer around the shared dinner cruise, not a separate transfer
                  product. The goal is to confirm whether your hotel can join the evening flow
                  cleanly before you rely on pickup.
                </p>
              </div>
              <Link href="/guides/kabatas-pier" className="btn-secondary">
                Read Kabatas boarding guide
              </Link>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              Which dinner packages sit behind the pickup request?
            </h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Pickup support does not replace the dinner product. It sits behind the same shared
              Bosphorus evening, so the commercial split still comes from the package tier, not
              from a separate transfer product. This keeps the pickup page useful without stealing
              the owner role from the main dinner page.
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
              Dinner cruise with hotel pickup vs Turkish night vs Kabatas support
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
                  {pickupDecisionRows.map((row) => (
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
              Pickup limits and decision points
            </h2>
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {supportLimits.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="font-bold text-[var(--brand-primary)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h3 className="mb-3 text-base font-semibold text-[var(--heading)]">
                  Not the best first click if
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>You are still deciding between sunset, dinner, and private yacht formats.</li>
                  <li>You only want to compare Silver and Gold dinner packages.</li>
                  <li>You need a private yacht, private dinner, or a custom event brief.</li>
                  <li>Your main question is only where Kabatas is rather than whether pickup fits.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare with the pages that own the final booking decision
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
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
                  Why trust MerrySails for dinner cruise pickup planning?
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  This support page exists to answer one narrow commercial blocker: whether the
                  shared dinner cruise can start from your hotel area cleanly. Trust matters here
                  because guests should see operator facts, realistic pickup rules, and the handoff
                  back to the correct dinner owner page before they request confirmation.
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
                <h3 className="mb-2 text-xl font-semibold text-[var(--heading)]">
                  Send the hotel and keep the booking on the dinner owner path
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                  If the shared dinner route is already right, send the hotel, date, and package
                  idea so we can confirm whether pickup is available, whether a nearby collection
                  point is cleaner, or whether the booking should move to direct Kabatas arrival.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/istanbul-dinner-cruise" className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                    Open dinner owner page
                  </Link>
                  <TrackedContactLink
                    href={WHATSAPP_URL}
                    kind="whatsapp"
                    label="dinner_pickup_mid_whatsapp"
                    location="dinner_pickup_mid"
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

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Pickup support FAQs</h2>
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

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Check whether your hotel fits the dinner pickup flow
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              Send the hotel, date, guest count, and preferred dinner package. We will tell you
              whether the booking belongs on the shared dinner route with pickup support or on a
              different page entirely.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50"
              >
                Request pickup check
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="dinner_pickup_page_whatsapp"
                location="dinner_pickup_page"
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
