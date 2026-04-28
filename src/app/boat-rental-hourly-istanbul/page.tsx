import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { fleet } from "@/data/fleet";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const startingRate = Math.min(...fleet.map((boat) => boat.pricePerHour));
const canonicalUrl = `${SITE_URL}/boat-rental-hourly-istanbul`;

export const metadata: Metadata = {
  title: `Boat Rental Hourly Istanbul 2026 — From EUR ${startingRate}/hour | MerrySails`,
  description:
    `Hourly boat rental in Istanbul from EUR ${startingRate}/hour for guests who already know they want a private boat by the hour rather than a package-led yacht charter.`,
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/boat-rental-hourly-istanbul"),
  },
  openGraph: {
    title: `Boat Rental Hourly Istanbul 2026 — From EUR ${startingRate}/hour | MerrySails`,
    description:
      "Use this page when per-hour pricing, short private hire, and a lighter vessel-first Bosphorus plan are the main booking questions.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Boat rental hourly Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Boat Rental Hourly Istanbul",
  description:
    "Commercial support page for private hourly boat rental in Istanbul for guests who want a vessel-first Bosphorus plan with per-hour pricing logic.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Hourly Private Boat Rental",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Boat Rental Hourly Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is hourly boat rental the same as yacht charter?",
    a: "No. Use hourly boat rental when the key decision is per-hour private hire and a lighter vessel-first plan. Use yacht charter when you want the package-led private charter ladder first.",
  },
  {
    q: "Is this the main owner page for boat rental?",
    a: "No. The broader owner page is Boat Rental Istanbul. This page is a narrower support URL for guests specifically searching for hourly private hire logic.",
  },
  {
    q: "What does the hourly rate usually cover?",
    a: "The hourly rate starts with the boat and time block, while the final quote still depends on the selected vessel, route, guest count, and any food, drink, or celebration add-ons.",
  },
  {
    q: "Who is hourly boat rental best for?",
    a: "It works best for shorter Bosphorus outings, simple private rides, photo runs, lighter celebrations, and guests who do not need a heavier package-led charter structure.",
  },
  {
    q: "When should I move to another page instead?",
    a: "Move to yacht charter for package-led private plans, private dinner cruise for dinner-first private evenings, and proposal or corporate pages when the brief is already occasion-led.",
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
    title: "You are thinking in hours, not packages",
    description:
      "Use this page when the guest is already asking in hourly private-hire terms rather than comparing charter packages.",
  },
  {
    title: "A lighter private Bosphorus plan is enough",
    description:
      "This page fits shorter scenic rides, lighter private outings, and simpler private bookings that do not need a premium charter structure.",
  },
  {
    title: "The vessel comes before the occasion",
    description:
      "Use this page when the main decision is how much boat time and what kind of vessel you need before layering on extras.",
  },
];

const hourlyReasons = [
  {
    title: "Short scenic ride",
    description: "A clear fit when the group wants a private Bosphorus run without building a large event around it.",
  },
  {
    title: "Flexible photo or sunset timing",
    description: "A practical option when timing matters more than menu structure or a full-service charter format.",
  },
  {
    title: "Simple private celebration",
    description: "A lighter private setup for smaller birthday, friend, or family plans that do not need a heavier event brief.",
  },
];

const flowSteps = [
  {
    title: "Confirm hourly private hire is the real intent",
    description:
      "This page is for guests who already know the booking should be priced around time blocks rather than a broad package ladder.",
  },
  {
    title: "Choose the vessel and likely hour block",
    description:
      "The first useful input is the boat size, group size, and whether the plan is closer to a short ride, sunset slot, or longer private outing.",
  },
  {
    title: "Add route or occasion details only if needed",
    description:
      "Dinner, flowers, cake, music, and other extras can still be added later if the brief grows beyond a simple hourly hire.",
  },
  {
    title: "Move to a broader owner page when the brief gets heavier",
    description:
      "If the request becomes package-led, dinner-led, proposal-led, or company-led, it usually belongs on a more specific owner or support page.",
  },
];

const comparePages = [
  {
    href: "/boat-rental-istanbul",
    title: "Boat Rental Istanbul",
    description: "Use the broader boat-rental owner page when you still want to compare private boat formats more generally.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description: "Use this when the booking should start from a more premium, package-led private yacht structure.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description: "Use this when dinner service is the main reason for the booking, not hourly boat time itself.",
  },
  {
    href: "/contact",
    title: "Ask for an Hourly Quote",
    description: "Use contact when the date, group size, and rough duration are already known and you want a quick answer.",
  },
];

const hourlyCards = fleet.map((boat) => ({
  title: boat.name,
  price: `From EUR ${boat.pricePerHour}/hour`,
  body: `${boat.type} for up to ${boat.capacity} guests.`,
}));

export default function BoatRentalHourlyIstanbulPage() {
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
            <span className="text-[var(--heading)]">Boat Rental Hourly Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Boat Rental Hourly Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the guest already wants a private boat by the hour and does not
                need a heavier yacht-charter package first. The broader owner page is still{" "}
                <Link href="/boat-rental-istanbul" className="text-[var(--brand-primary)] hover:underline">
                  Boat Rental Istanbul
                </Link>
                ; this page exists for hourly private-hire intent where time block and vessel fit
                are the main buying questions.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Visible hourly starting point
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">From EUR {startingRate}/hour</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Hourly private hire starts with the vessel and time block. The final quote still
                  depends on route, duration, guest count, and any optional add-ons.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/boat-rental-istanbul"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Open boat rental owner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask for hourly quote
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us quote hourly private hire quickly
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and rough start time",
                  "Expected duration in hours",
                  "Guest count and whether it is a couple, family, or small group",
                  "Whether the plan is sightseeing, sunset, simple celebration, or a photo run",
                  "Whether the request still fits hourly hire or belongs on another page",
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
                  Send the date, expected hours, and guest count through{" "}
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
              When hourly boat rental is the right fit
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
              Typical hourly private-hire use cases
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {hourlyReasons.map((item) => (
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
              Fleet starting rates for hourly planning
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {hourlyCards.map((boat) => (
                <div
                  key={boat.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    {boat.price}
                  </p>
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{boat.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{boat.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              How hourly private hire usually works
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
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">Strong fit when</h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>You are already thinking in hourly private-hire terms.</li>
                  <li>The booking is lighter than a full yacht-charter package.</li>
                  <li>You want a vessel-first route decision with simple timing.</li>
                  <li>A shorter Bosphorus outing is enough for the group.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
                  Move back to another page when
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>You want a more premium, package-led private yacht ladder.</li>
                  <li>Dinner service is the main reason for the booking.</li>
                  <li>The event is already proposal-led or company-led.</li>
                  <li>You still need to compare private-boat formats broadly rather than hourly logic.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare with the pages that own the final routing decision
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Hourly boat rental FAQs</h2>
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
              Request an hourly private-boat quote
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              Send the date, expected hours, and guest count. We will tell you whether the booking
              belongs on hourly boat rental, the broader boat-rental owner page, or a different
              private format entirely.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50"
              >
                Request hourly quote
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="boat_rental_hourly_page_whatsapp"
                location="boat_rental_hourly_page"
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
