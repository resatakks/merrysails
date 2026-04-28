import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import { PHONE_DISPLAY, SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const canonicalUrl = `${SITE_URL}/private-dinner-cruise-for-couples-istanbul`;

export const metadata: Metadata = {
  title: "Private Dinner Cruise for Couples Istanbul 2026 | MerrySails",
  description:
    "Private dinner cruise for couples in Istanbul for guests who want a quieter Bosphorus evening, their own table, and a dinner-led private yacht flow without a shared cruise format.",
  alternates: {
    canonical: canonicalUrl,
    languages: buildHreflang("/private-dinner-cruise-for-couples-istanbul"),
  },
  openGraph: {
    title: "Private Dinner Cruise for Couples Istanbul 2026 | MerrySails",
    description:
      "Use this page when a couple wants a private Bosphorus dinner, a quieter atmosphere, and clear routing between private dinner, proposal, and shared dinner options.",
    url: canonicalUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Private dinner cruise for couples Istanbul — MerrySails",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Dinner Cruise for Couples Istanbul",
  description:
    "Commercial support page for couples comparing a private Bosphorus dinner cruise in Istanbul when privacy, atmosphere, and a dinner-led private yacht flow matter more than a shared evening package.",
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
  },
  serviceType: "Private Dinner Cruise for Couples",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Private Dinner Cruise for Couples Istanbul", item: canonicalUrl },
  ],
};

const faqItems = [
  {
    q: "Is this the main owner page for private dinner yacht bookings?",
    a: "No. The broader owner-style page is Private Bosphorus Dinner Cruise. This page is a narrower support URL for couples whose main question is whether the evening should stay private, dinner-led, and quieter than a shared cruise.",
  },
  {
    q: "When should a couple use this page instead of the shared dinner cruise?",
    a: "Use this page when the table should belong only to the couple, the atmosphere should stay quieter, and the evening should not be built around a public entertainment format.",
  },
  {
    q: "When should a couple use the proposal page instead?",
    a: "Use the proposal page when the key brief is the reveal itself, decoration timing, photography, or a surprise setup rather than a simple private dinner on the Bosphorus.",
  },
  {
    q: "Can this page work for anniversaries and date nights too?",
    a: "Yes. It is a good fit for anniversaries, honeymoon evenings, and quieter date-night bookings where dinner and privacy matter more than a broader event build.",
  },
  {
    q: "What shapes the final quote for a couple's private dinner cruise?",
    a: "The quote depends on yacht size, route duration, menu style, drinks, and whether the evening needs extras like flowers, cake, live music, or photography.",
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
    title: "Dinner and privacy both matter",
    description:
      "Use this page when the couple wants a meal on the water but does not want to share the yacht or the table with other guests.",
  },
  {
    title: "A calmer atmosphere is the goal",
    description:
      "This page fits couples who prefer a quieter Bosphorus evening over a louder entertainment-led cruise format.",
  },
  {
    title: "The evening is romantic but not necessarily a proposal",
    description:
      "It works when the booking is for a date night, honeymoon evening, or anniversary dinner without needing a full proposal build.",
  },
];

const quoteDrivers = [
  {
    title: "How private and how long",
    description:
      "The first quote driver is the yacht class, route duration, and whether the couple wants a simple dinner slot or a longer private evening.",
  },
  {
    title: "Menu and drinks style",
    description:
      "A simple dinner table, a fuller seafood menu, champagne, cake, or custom beverage service can all change the final plan.",
  },
  {
    title: "Romantic extras",
    description:
      "Flowers, violin, photographer, and soft table styling are optional layers when the couple wants more than a clean private dinner.",
  },
  {
    title: "Whether the brief becomes a proposal",
    description:
      "If the booking turns into a reveal-led evening, the cleaner fit usually becomes the proposal page rather than this couple-focused support URL.",
  },
];

const comparePages = [
  {
    href: "/private-bosphorus-dinner-cruise",
    title: "Private Bosphorus Dinner Cruise",
    description:
      "Use the broader owner-style page when you are still comparing private dinner formats beyond a couple-only brief.",
  },
  {
    href: "/proposal-yacht-rental-istanbul",
    title: "Proposal Yacht Rental Istanbul",
    description:
      "Use this when the moment is centered on a reveal, surprise timing, and proposal setup rather than a simple private dinner.",
  },
  {
    href: "/istanbul-dinner-cruise",
    title: "Istanbul Dinner Cruise",
    description:
      "Use the protected shared-dinner owner page when a public dinner cruise with a lower entry price is still in the mix.",
  },
  {
    href: "/contact",
    title: "Ask for a Couple's Dinner Quote",
    description:
      "Use contact when the date, occasion, and preferred atmosphere are already clear and you want the team to price the evening.",
  },
];

const reasonCards = [
  {
    title: "Date night on the Bosphorus",
    description: "A clean fit when the goal is a private dinner with skyline views and a slower rhythm than a public cruise.",
  },
  {
    title: "Anniversary dinner on a yacht",
    description: "Useful when the couple wants dinner to stay private without turning the evening into a larger celebration format.",
  },
  {
    title: "Honeymoon or travel highlight",
    description: "A good support page when the couple wants one memorable evening in Istanbul without the structure of a shared event.",
  },
];

export default function PrivateDinnerCruiseForCouplesIstanbulPage() {
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
            <span className="text-[var(--heading)]">Private Dinner Cruise for Couples Istanbul</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
                Narrow commercial support page
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                Private Dinner Cruise for Couples Istanbul
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                Use this page when the couple already knows the evening should stay private, dinner-led,
                and quieter than a shared cruise. The broader owner-style page is still{" "}
                <Link
                  href="/private-bosphorus-dinner-cruise"
                  className="text-[var(--brand-primary)] hover:underline"
                >
                  Private Bosphorus Dinner Cruise
                </Link>
                ; this support page exists for couple-focused intent where privacy, atmosphere, and a
                romantic dinner flow matter more than a broader group or event brief.
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  Trust and planning reality
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  MerrySails works under Merry Tourism, a TURSAB-backed Istanbul operator since
                  2001. We quote after we confirm date, route length, dinner style, and whether
                  the evening needs simple privacy or extra romantic details.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/private-bosphorus-dinner-cruise"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Compare private dinner options <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  Ask for a couple&apos;s quote
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What helps us quote the evening cleanly
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {[
                  "Preferred date and whether sunset or night views matter more",
                  "Whether the evening is a date night, honeymoon, or anniversary",
                  "Dinner style, drinks, cake, flowers, or photography requests",
                  "How private and understated the atmosphere should stay",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  If the evening is really a proposal build with surprise timing, route the request
                  to the proposal page instead of forcing it into a generic couple-dinner brief.
                </p>
              </div>
            </aside>
          </section>

          <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              When this couples dinner page is the right fit
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {fitCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              What usually changes the couple&apos;s private dinner quote
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {quoteDrivers.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Common couple-led reasons to book a private dinner yacht
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {reasonCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              Compare with related Bosphorus dinner paths
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {comparePages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-[var(--brand-primary)]/20 hover:bg-white"
                >
                  <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">Couple dinner cruise FAQs</h2>
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
                  Couple-led private booking
                </p>
                <h2 className="mb-3 text-3xl font-bold">Tell us how quiet, romantic, or simple the evening should feel</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                  Send the date, whether it is a date night or anniversary, and whether you want a
                  simple private dinner or a more styled evening. We will route you to the cleanest
                  Bosphorus booking path.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  Request a private dinner quote
                </Link>
                <TrackedContactLink
                  href={WHATSAPP_URL}
                  kind="whatsapp"
                  label="private_dinner_couples_support_whatsapp"
                  location="private_dinner_couples_support_page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  WhatsApp us
                </TrackedContactLink>
                <TrackedContactLink
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  kind="phone"
                  label="private_dinner_couples_support_phone"
                  location="private_dinner_couples_support_page"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Call {PHONE_DISPLAY}
                </TrackedContactLink>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
