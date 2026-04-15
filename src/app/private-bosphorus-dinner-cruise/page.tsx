import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Private Bosphorus Dinner Cruise | Private Yacht Dinner in Istanbul",
  description:
    "Book a private Bosphorus dinner cruise in Istanbul with a dedicated yacht, dinner service, route planning, and proposal or celebration setup support. WhatsApp quotes available.",
  alternates: { canonical: `${SITE_URL}/private-bosphorus-dinner-cruise` },
  openGraph: {
    title: "Private Bosphorus Dinner Cruise | Private Yacht Dinner in Istanbul",
    description:
      "Private dinner yacht on the Bosphorus for proposals, birthdays, and premium celebrations in Istanbul.",
    url: `${SITE_URL}/private-bosphorus-dinner-cruise`,
    type: "website",
  },
  keywords: [
    "private bosphorus dinner cruise",
    "private dinner cruise istanbul",
    "private yacht dinner istanbul",
    "romantic dinner cruise bosphorus",
    "proposal yacht dinner istanbul",
    "birthday yacht dinner istanbul",
  ],
};

const faqItems = [
  {
    q: "What is a private Bosphorus dinner cruise?",
    a: "A private Bosphorus dinner cruise is a yacht or private boat reserved only for your group, with a fixed departure time, private crew, dinner service, and optional setup such as flowers, photographer, or live music.",
  },
  {
    q: "How much does a private Bosphorus dinner cruise cost in Istanbul?",
    a: "Private Bosphorus dinner cruises usually start from €380 for a 2-3 hour yacht experience, depending on guest count, vessel type, route, and dining setup. Proposal and celebration setups are quoted separately.",
  },
  {
    q: "Is a private dinner cruise better than a shared dinner cruise?",
    a: "A shared dinner cruise is better for budget-friendly all-inclusive plans, while a private Bosphorus dinner cruise is better for couples, proposals, birthdays, and guests who want privacy, custom timing, and a tailored setup.",
  },
  {
    q: "Can you arrange a proposal or birthday setup on the yacht?",
    a: "Yes. MerrySails can arrange proposal decoration, birthday table styling, photographer, violinist, cake, and premium catering upgrades for private dinner yacht bookings.",
  },
  {
    q: "Where do private dinner yachts depart from?",
    a: "Most private dinner yacht departures are arranged from central Bosphorus marinas such as Kurucesme or nearby approved piers. Exact boarding details are confirmed with the quote and reservation.",
  },
];

const faqJsonLd = {
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Bosphorus Dinner Cruise",
  description:
    "Private yacht dinner cruise in Istanbul for couples, proposals, birthdays, and premium group events on the Bosphorus.",
  provider: {
    "@type": "TravelAgency",
    name: "MerrySails",
    url: SITE_URL,
  },
  areaServed: "Istanbul, Turkey",
  serviceType: "Private Yacht Dinner Cruise",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Private Bosphorus Dinner Cruise", item: `${SITE_URL}/private-bosphorus-dinner-cruise` },
  ],
};

export default function PrivateBosphorusDinnerCruisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Private Bosphorus Dinner Cruise</li>
          </ol>
        </nav>

        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-5 mb-6">
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Quick answer:</strong> A private Bosphorus dinner cruise is the right option if you want a dedicated yacht,
            your own timing, and a dinner setup that is not shared with other guests. It is usually chosen for proposals,
            anniversaries, birthdays, and premium small-group celebrations.
          </p>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Private Bosphorus Dinner Cruise
        </h1>
        <p className="text-sm font-semibold text-blue-600 mb-6">
          Private Yacht Dinner · Proposal & Celebration Setup · Custom Route · Istanbul
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Guests searching for a private Bosphorus dinner cruise are usually not looking for the standard shared dinner boat.
          They want privacy, a better onboard atmosphere, and a plan built around a proposal, celebration, or premium evening with their own group.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          MerrySails arranges private yacht dinner experiences in Istanbul with licensed vessels, professional crew, dinner service,
          route planning, and optional extras such as violin, flowers, cake, photo, or table styling. This makes the page a stronger
          fit for private-yacht-dinner intent than a generic dinner cruise result.
        </p>

        <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">When This Page Is the Better Match</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "You want a private yacht instead of a shared dinner boat.",
              "You need a proposal, anniversary, or birthday setup.",
              "You want custom boarding time or route flexibility.",
              "You need a quote based on guest count, dinner format, and extras.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Usually Shapes the Quote</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Guest count",
                desc: "The right yacht type and dinner service plan depends first on how many guests will join.",
              },
              {
                title: "Occasion",
                desc: "Proposal, birthday, anniversary, or corporate dinner setups create different decoration and service requirements.",
              },
              {
                title: "Route & timing",
                desc: "Golden hour, post-sunset dining, bridge lighting, and cruise duration all change the plan and final quote.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Compare Before You Book</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/istanbul-dinner-cruise",
                title: "Shared Dinner Cruise",
                description: "Best if you want the lowest-cost all-inclusive dinner cruise package.",
              },
              {
                href: "/boat-rental-istanbul",
                title: "Boat Rental Istanbul",
                description: "Best for broader private boat hire and event-led route planning.",
              },
              {
                href: "/yacht-charter-istanbul",
                title: "Yacht Charter Istanbul",
                description: "Best for guests comparing full private yacht options beyond dinner format.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white bg-white p-4 shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-100/40"
              >
                <span className="block text-base font-semibold text-gray-900 mb-1">{item.title}</span>
                <span className="block text-sm text-gray-600">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What to Send for a Faster Private Dinner Quote</h2>
          <p className="text-sm text-gray-600 mb-5">
            The fastest quotes happen when we know the dining format, the occasion, and whether the
            request is really a dinner cruise or a more specific event format.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Preferred date, boarding time, and whether you want sunset, post-sunset, or late dinner timing.",
              "Guest count and whether the booking is for a couple, family, or a larger private group.",
              "Occasion type: proposal, birthday, anniversary, or private business dinner.",
              "Dinner expectations: standard menu, premium menu, cake, drinks, flowers, or photographer.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <span className="font-bold text-blue-600 mr-2">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Which Private Dinner Plan Fits Best?</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            This page performs best when the guest already knows they want a private dinner yacht. If the real need is a
            proposal setup, a broader boat-rental comparison, or a hosted private event, moving to the right page usually
            gets a faster and more accurate quote.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/boat-rental-istanbul",
                title: "Private Couple Dinner",
                description: "Best for a simple private yacht evening with timing, route, and dinner planning as the main focus.",
              },
              {
                href: "/proposal-yacht-rental-istanbul",
                title: "Proposal Dinner Setup",
                description: "Best if the dinner cruise also needs proposal decoration, photo support, or a surprise plan.",
              },
              {
                href: "/private-events",
                title: "Birthday or Celebration Dinner",
                description: "Best for small private groups who need a more occasion-led dinner and entertainment setup.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-100/40"
              >
                <span className="block text-base font-semibold text-gray-900 mb-1">{item.title}</span>
                <span className="block text-sm text-gray-600">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What to Send for a Faster Quote</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Preferred date, preferred boarding time, and whether you want sunset or post-sunset dining.",
              "Guest count and whether the plan is a proposal, birthday, anniversary, or private celebration.",
              "Food expectation: standard dinner service, premium menu, cake, or drinks upgrade.",
              "Any extras such as photographer, violinist, flowers, LED letters, or table styling.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose the Best Occasion Page</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Private dinner requests often overlap with proposal, private event, or corporate-event planning. If your plan is more specific than a dinner cruise, these pages are the better match.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/proposal-yacht-rental-istanbul",
                title: "Proposal Yacht Rental",
                description: "Best for guests who need a proposal-first setup, route timing, and decoration support.",
              },
              {
                href: "/private-events",
                title: "Private Events",
                description: "Best for birthdays, anniversaries, and small-group private celebrations on board.",
              },
              {
                href: "/corporate-events",
                title: "Corporate Events",
                description: "Best for hosted business dinners, executive guest plans, and team entertainment.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300"
              >
                <span className="block text-base font-semibold text-gray-900 mb-1">{item.title}</span>
                <span className="block text-sm text-gray-600">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="bg-gray-900 text-white rounded-xl p-6 mb-10 text-center">
          <p className="mb-3 font-medium text-lg">Get a private dinner yacht quote on WhatsApp</p>
          <a
            href="https://wa.me/905370406822?text=Hello%2C%20I%20want%20a%20private%20Bosphorus%20dinner%20cruise%20quote."
            className="inline-flex items-center justify-center bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Quote
          </a>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Private Bosphorus Dinner Cruise FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <details key={index} className="rounded-lg border p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                  {faq.q}
                  <span className="flex-shrink-0 text-gray-500 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
