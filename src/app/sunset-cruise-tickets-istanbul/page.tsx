import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { getTourBySlug } from "@/data/tours";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/sunset-cruise-tickets-istanbul`;

function requireTour(slug: string, label: string) {
  const tour = getTourBySlug(slug);
  if (!tour) {
    throw new Error(`${label} data is missing.`);
  }
  return tour;
}

const sunsetTour = requireTour("bosphorus-sunset-cruise", "Sunset cruise");

export const metadata: Metadata = {
  title: "Sunset Cruise Tickets Istanbul 2026 | Shared Bosphorus Sunset Options",
  description:
    "Sunset cruise tickets Istanbul support page for guests who already want the shared Bosphorus sunset route and need clearer ticket, package, and reserve-direct guidance.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Sunset Cruise Tickets Istanbul 2026 | Shared Bosphorus Sunset Options",
    description:
      "Use this page when the shared sunset cruise is already the likely fit and the main question is ticket, package, and reserve-direct clarity before booking in Istanbul.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Sunset cruise tickets Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sunset Cruise Tickets Istanbul",
  description:
    "Commercial support page for guests comparing shared Bosphorus sunset-cruise tickets in Istanbul when package fit and reserve-direct clarity are the main decision points.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Shared Bosphorus Sunset Cruise Ticket Support",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sunset Cruise Tickets Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for the Bosphorus sunset cruise?",
    a: "No. The protected owner page remains Bosphorus Sunset Cruise. This support page is only for the narrower case where ticket fit, shared options, and reserve-direct clarity are the main buying questions.",
  },
  {
    q: "What are the current shared sunset options?",
    a: "The current public structure shows two shared sunset options on the same route: Without Wine at EUR 34 and With Wine at EUR 40.",
  },
  {
    q: "Should I use this page if I am still deciding between sunset and dinner?",
    a: "No. Use the Bosphorus Cruise compare hub first if you are still broad. This page assumes the shared sunset route is already the likely direction.",
  },
  {
    q: "Is this the right page if my main question is Karakoy-side meeting flow?",
    a: "Not always. Use the Karakoy guide when your main concern is local arrival and waterfront context. Use this page when the real decision is ticket fit and shared sunset option clarity.",
  },
  {
    q: "Where do I finish the booking?",
    a: "Once the sunset option is clear, move to the main Bosphorus Sunset Cruise owner page or the reservation flow to complete the booking.",
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
    title: "The shared sunset route is already the right product",
    description:
      "Use this page when you already know you want the shared golden-hour cruise and do not need to compare dinner or private yacht options anymore.",
  },
  {
    title: "Ticket and package fit is the deciding question",
    description:
      "This page is for the narrower case where the real question is which shared sunset option to reserve and how the public ticket logic works.",
  },
  {
    title: "You want reserve-direct clarity before contacting the team",
    description:
      "Use this page when the next step is moving toward the owner page or reservation flow rather than reading another broad comparison article.",
  },
];

const decisionRows = [
  {
    question: "I want the shared sunset cruise and need the current public ticket options",
    bestPage: "Sunset Ticket Support",
    reason: "This page exists for ticket-led shared-sunset intent, especially when the decision is between the two public options.",
  },
  {
    question: "I want the shared sunset cruise and need boarding / Karakoy arrival context",
    bestPage: "Karakoy Waterfront Guide",
    reason: "Meeting-flow and public arrival logic are better handled in the local-support guide than on a ticket-led service page.",
  },
  {
    question: "I am still comparing sunset, dinner, and private yacht options",
    bestPage: "Bosphorus Cruise Compare Hub",
    reason: "Broad comparison should stay on the main hub instead of dropping into a narrow sunset ticket page too early.",
  },
  {
    question: "I am ready to book the shared sunset experience",
    bestPage: "Bosphorus Sunset Cruise",
    reason: "The protected owner page remains the final booking and package owner for the main shared sunset product.",
  },
];

const ticketRows = [
  ["Without Wine", "EUR 34", "Guests who want the shared sunset route with light hospitality and no wine service"],
  ["With Wine", "EUR 40", "Guests who want the same shared route with 2 glasses of wine per guest"],
];

const packageHighlights = sunsetTour.packages?.map((pkg) => ({
  name: pkg.name,
  price: `EUR ${pkg.price}`,
  description: pkg.description,
  features: pkg.features.slice(0, 4),
})) ?? [];

const trustSignals = [
  "Merry Tourism has operated Istanbul travel products since 2001.",
  "TURSAB A Group licensing stays behind the booking and written follow-up flow.",
  "The same protected sunset owner page remains the source of truth for live route and booking details.",
  "Boarding details are confirmed in writing instead of left to generic pier assumptions.",
];

const flowSteps = [
  {
    title: "Confirm the shared sunset route is the right product",
    description:
      "This page only makes sense after you know the plan should stay on the shared golden-hour route rather than dinner or private yacht.",
  },
  {
    title: "Choose the right public sunset option",
    description:
      "The key choice is between the public shared sunset options, not between multiple different sunset routes.",
  },
  {
    title: "Use Karakoy guidance only if the arrival flow is the blocker",
    description:
      "Ticket fit and meeting-flow fit are different sub-intents. Switch to the local guide only when arrival confidence is the real blocker.",
  },
  {
    title: "Finish on the owner page or reservation flow",
    description:
      "Once the option is clear, move back to the main sunset owner page or reservation flow for the live booking details.",
  },
];

const comparePages = [
  {
    href: "/cruises/bosphorus-sunset-cruise",
    title: "Bosphorus Sunset Cruise",
    description:
      "Use the protected owner page for live option details, route truth, booking flow, and the final reserve-direct path.",
  },
  {
    href: "/guides/karakoy-waterfront",
    title: "Karakoy Waterfront Guide",
    description:
      "Use the guide when the main question is how to approach the Karakoy-side meeting flow rather than which sunset option to reserve.",
  },
  {
    href: "/bosphorus-cruise",
    title: "Bosphorus Cruise Compare Hub",
    description:
      "Use this if you still need to compare sunset, dinner, and private yacht formats before booking.",
  },
  {
    href: "/reservation",
    title: "Reservation Flow",
    description:
      "Use the reservation flow when you already know the sunset product is right and want to continue into the booking process.",
  },
];

export default function SunsetCruiseTicketsIstanbulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Sunset Cruise Tickets Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Sunset Cruise Tickets Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the shared Bosphorus sunset cruise is already the likely fit and the real
                question is how the public sunset ticket options work. The protected owner page is still{" "}
                <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">
                  Bosphorus Sunset Cruise
                </Link>
                ; this page exists to clarify the shared sunset options and the reserve-direct path before
                the booking moves back to the owner page.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Current shared sunset ladder
                </p>
                <p className="text-3xl font-bold text-[var(--heading)]">EUR 34 / EUR 40</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  The current public sunset structure shows two shared options on the same golden-hour route:
                  Without Wine and With Wine.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/cruises/bosphorus-sunset-cruise" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                  Open sunset owner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/reservation" className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white">
                  Start reservation flow
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={sunsetTour.image}
                  alt="Shared Bosphorus sunset cruise at golden hour in Istanbul"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us confirm the right sunset ticket path
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and whether sunset timing is flexible",
                  "Whether the decision is between the two shared sunset options",
                  "Whether the main blocker is ticket fit or Karakoy-side arrival flow",
                  "Whether the booking should stay on the shared sunset route rather than a private yacht",
                  "Whether you are ready for the owner page or reservation flow already",
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
                  Send the date and whether you want the sunset route with or without wine through{" "}
                  <Link href="/contact" className="text-[var(--brand-primary)] hover:underline">contact</Link>{" "}
                  or WhatsApp at {PHONE_DISPLAY}.
                </p>
              </div>
            </aside>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">When this sunset ticket page is the right fit</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Sunset cruise tickets vs Karakoy guide vs compare hub</h2>
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Current shared sunset ticket options</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--heading)]">
                    <th className="px-4 py-3 font-semibold">Option</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--line)] last:border-0">
                      <td className="px-4 py-3 text-[var(--heading)]">{row[0]}</td>
                      <td className="px-4 py-3 font-medium text-[var(--brand-primary)]">{row[1]}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">What is included in each sunset cruise ticket?</h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
              Both sunset ticket options stay on the same shared golden-hour Bosphorus route. The main difference is
              whether the booking should stay lighter without wine or include the wine-served shared option. That keeps
              this page narrow and avoids mixing sunset ticket intent with dinner or private-yacht planning.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {packageHighlights.map((pkg) => (
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">How the sunset ticket decision usually works</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {flowSteps.map((item, index) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">Step {index + 1}</p>
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Compare with the pages that own the final sunset decision</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white">
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Sunset ticket FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details key={item.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {item.q}
                    <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Why trust MerrySails for sunset cruise tickets in Istanbul?</h2>
                <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  This page is not trying to replace the protected sunset owner page. Its job is to answer the narrow
                  ticket question, then hand the booking back to the right owner URL with clear operator facts, visible
                  pricing, and written boarding follow-up.
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
                <h3 className="mb-2 text-xl font-semibold text-[var(--heading)]">Move back to the sunset owner page when the ticket is clear</h3>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                  If you already know the date and whether you want the wine option, continue to the sunset owner page
                  or send the brief on WhatsApp so the team can confirm the right shared route quickly.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/cruises/bosphorus-sunset-cruise" className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                    Open sunset owner page
                  </Link>
                  <TrackedContactLink
                    href={WHATSAPP_URL}
                    kind="whatsapp"
                    label="sunset_ticket_page_mid_whatsapp"
                    location="sunset_ticket_page_mid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                  >
                    WhatsApp the date
                  </TrackedContactLink>
                </div>
              </div>
            </div>
          </section>

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Choose the right sunset option and continue to booking</h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              If the sunset route is already the right fit, move to the owner page or reservation flow. If the only blocker is Karakoy-side arrival confidence, switch to the local guide.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/cruises/bosphorus-sunset-cruise" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50">
                Open sunset cruise
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="sunset_ticket_page_whatsapp"
                location="sunset_ticket_page"
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
