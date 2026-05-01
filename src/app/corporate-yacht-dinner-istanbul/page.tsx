import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/corporate-yacht-dinner-istanbul`;

export const metadata: Metadata = {
  title: "Corporate Yacht Dinner Istanbul 2026 | Company Dinner on the Bosphorus",
  description:
    "Corporate yacht dinner in Istanbul for team dinners, client hosting, and invoice-led company evenings that need a private Bosphorus setting and dinner-first planning.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/corporate-yacht-dinner-istanbul"),
  },
  openGraph: {
    title: "Corporate Yacht Dinner Istanbul 2026 | Company Dinner on the Bosphorus",
    description:
      "Use this page when the company brief is specifically a dinner-led private yacht evening in Istanbul, not a generic charter or broad event page.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Corporate yacht dinner Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Yacht Dinner Istanbul",
  description:
    "Commercial support page for companies planning a private yacht dinner in Istanbul for client hosting, team dinners, board dinners, or executive evenings on the Bosphorus.",
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
  serviceType: "Corporate Yacht Dinner Planning",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Corporate Yacht Dinner Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for all company events?",
    a: "No. The broader owner page for company briefs is Corporate Events. This page is for narrower corporate requests where the evening is clearly dinner-led and still private.",
  },
  {
    q: "When is a corporate yacht dinner a better fit than a restaurant?",
    a: "It is a better fit when privacy, host control, guest experience, and Bosphorus atmosphere matter more than using a fixed land venue. It works especially well for client hosting, executive dinners, and smaller team evenings.",
  },
  {
    q: "Can you handle invoicing and company details?",
    a: "Yes. Corporate requests can be handled with invoice-ready commercial details and a clearer planning flow around guest count, timing, and onboard service needs.",
  },
  {
    q: "Should I use this page if I only need a yacht, not a dinner plan?",
    a: "No. If the vessel decision comes before the dinner brief, Yacht Charter Istanbul or Boat Rental Istanbul is the better first stop.",
  },
  {
    q: "What if the request is a launch, standing cocktail, or branded event instead?",
    a: "Use Corporate Events first. That page is better for broader company briefs that are not centered on a seated dinner flow.",
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
    title: "Client hosting dinner",
    description:
      "Best when the dinner itself is part of the hosting strategy and the setting should feel more private than a restaurant table.",
  },
  {
    title: "Leadership or board dinner",
    description:
      "Best when timing, privacy, and a calmer onboard environment matter more than a large-scale event setup.",
  },
  {
    title: "Smaller team evening",
    description:
      "Best when the company wants a more polished dinner-first experience rather than a broad launch or standing reception.",
  },
];

const quoteDrivers = [
  "Guest count and whether the dinner is seated, mixed, or more executive in style",
  "Menu, drinks, dietary constraints, and service level expected on board",
  "Whether transfers, marina access, or a simpler boarding plan are needed for guests",
  "Invoice details, company name, and any event timing constraints",
  "Whether the request is truly dinner-led or should move back to the broader corporate-events owner page",
];

const comparePages = [
  {
    href: "/corporate-events",
    title: "Corporate Events",
    description:
      "Use the main company-event owner page if the brief is broader than a dinner and may include launches, speeches, branding, or larger guest-flow planning.",
  },
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Dinner Cruise",
    description:
      "Use this if the dinner should stay private but the request is personal rather than company-led.",
  },
  {
    href: "/yacht-charter-istanbul",
    title: "Yacht Charter Istanbul",
    description:
      "Use this when the vessel or package comparison comes before the dinner brief.",
  },
  {
    href: "/contact",
    title: "Corporate Quote Check",
    description:
      "Use contact when the date, guest count, and company brief are already clear and you want an answer from the team quickly.",
  },
];

const flowSteps = [
  {
    title: "Confirm that the event is company-led",
    description:
      "This page is for invoice-ready business requests, not private birthdays, anniversaries, or proposal-led dinners.",
  },
  {
    title: "Define the dinner brief first",
    description:
      "The key question is what kind of company dinner you need: executive hosting, client entertainment, or a team evening with a more formal meal.",
  },
  {
    title: "Match the yacht and service plan",
    description:
      "After the brief is clear, the yacht, menu style, and route logic are matched to the guest count and hosting standard.",
  },
  {
    title: "Confirm boarding, transfer, and invoice flow",
    description:
      "The final commercial path depends on guest logistics, dinner timing, and the level of operational support needed around the event.",
  },
];

export default function CorporateYachtDinnerIstanbulPage() {
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
            <span className="text-[var(--heading)]">Corporate Yacht Dinner Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Corporate Yacht Dinner Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the company brief is clearly dinner-led: client hosting,
                executive dinners, board dinners, or a polished team evening on a private yacht.
                The broader owner page is still{" "}
                <Link href="/corporate-events" className="text-[var(--brand-primary)] hover:underline">
                  Corporate Events
                </Link>
                ; this page exists for the narrower case where the meal and hosting rhythm come
                before broader event production.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Company-ready planning
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. Corporate dinner requests are planned around guest flow, service level,
                  and invoice-ready logistics before the final yacht format is confirmed.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/corporate-events"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Open corporate owner page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask for a company quote
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us quote the right corporate dinner format
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {quoteDrivers.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">Fast reply path</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  Send the date, guest count, and company name through{" "}
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
              When a corporate yacht dinner is the right fit
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
              How the company dinner planning flow usually works
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
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
                  Strong fit when
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>The dinner itself is part of the hosting strategy.</li>
                  <li>You need a private setting rather than public tickets or a restaurant booking.</li>
                  <li>The event is clearly business-led and needs invoice-ready handling.</li>
                  <li>Guest experience and privacy matter more than building a broad launch setup.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
                <h2 className="mb-3 text-xl font-bold text-[var(--heading)]">
                  Move back to another page when
                </h2>
                <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  <li>The event is a standing cocktail, launch, or brand-heavy activation.</li>
                  <li>You are still comparing yacht packages more than the dinner brief.</li>
                  <li>The request is actually private or family-led rather than company-led.</li>
                  <li>You need a generic event owner page instead of a dinner-first qualifier.</li>
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Corporate yacht dinner FAQs
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

          <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Request a company yacht dinner quote
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-blue-50">
              Send the date, guest count, and whether the evening is for client hosting, an
              executive dinner, or a team event. We will route it to the right company event flow.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-blue-50"
              >
                Request company quote
              </Link>
              <TrackedContactLink
                href={WHATSAPP_URL}
                kind="whatsapp"
                label="corporate_yacht_dinner_page_whatsapp"
                location="corporate_yacht_dinner_page"
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
