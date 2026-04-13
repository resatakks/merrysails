import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Proposal Yacht Rental Istanbul | Private Bosphorus Proposal Yacht",
  description:
    "Book a proposal yacht rental in Istanbul with private Bosphorus route planning, decoration setup, photographer add-ons, and WhatsApp quote support.",
  alternates: { canonical: `${SITE_URL}/proposal-yacht-rental-istanbul` },
  openGraph: {
    title: "Proposal Yacht Rental Istanbul | Private Bosphorus Proposal Yacht",
    description:
      "Private yacht rental in Istanbul for marriage proposals, sunset route planning, decoration, and premium Bosphorus proposal setups.",
    url: `${SITE_URL}/proposal-yacht-rental-istanbul`,
    type: "website",
  },
  keywords: [
    "proposal yacht rental istanbul",
    "proposal yacht istanbul",
    "marriage proposal yacht istanbul",
    "bosphorus proposal yacht",
    "private yacht proposal istanbul",
    "romantic yacht rental istanbul",
  ],
};

const faqItems = [
  {
    q: "What is a proposal yacht rental in Istanbul?",
    a: "A proposal yacht rental is a private Bosphorus yacht charter arranged specifically for a marriage proposal, with route planning, timing support, and optional setup items such as flowers, neon signage, violinist, photographer, and dinner service.",
  },
  {
    q: "How much does a proposal yacht rental in Istanbul cost?",
    a: "Proposal yacht rentals in Istanbul usually start from €320 to €450 for a short private cruise, depending on yacht type, duration, guest count, and setup details. Decoration, photographer, and premium catering are quoted separately.",
  },
  {
    q: "Is a proposal yacht better than a shared Bosphorus cruise?",
    a: "Yes, for proposal intent a private yacht is usually the better match because you control the timing, privacy level, and onboard setup. Shared cruises are better for lower-budget sightseeing or dinner packages, not for a focused proposal moment.",
  },
  {
    q: "Can you arrange flowers, photographer, or violinist on the yacht?",
    a: "Yes. MerrySails can arrange proposal decoration, bouquet, photographer, videographer, violinist, cake, dinner table, and route timing to align the proposal moment with sunset or bridge lighting.",
  },
  {
    q: "What route is best for a Bosphorus proposal yacht?",
    a: "The best route depends on your preferred mood. Sunset proposals often work well around Ortakoy, Maiden's Tower, and the first Bosphorus Bridge, while evening proposals may favor bridge-light views and quieter private stretches for the actual proposal moment.",
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
  name: "Proposal Yacht Rental Istanbul",
  description:
    "Private yacht rental on the Bosphorus for marriage proposals, romantic setups, sunset planning, and premium event execution in Istanbul.",
  provider: {
    "@type": "TravelAgency",
    name: "MerrySails",
    url: SITE_URL,
  },
  areaServed: "Istanbul, Turkey",
  serviceType: "Proposal Yacht Rental",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Proposal Yacht Rental Istanbul", item: `${SITE_URL}/proposal-yacht-rental-istanbul` },
  ],
};

export default function ProposalYachtRentalIstanbulPage() {
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
            <li className="text-gray-800 font-medium">Proposal Yacht Rental Istanbul</li>
          </ol>
        </nav>

        <div className="bg-rose-50 border-l-4 border-rose-600 rounded-r-xl p-5 mb-6">
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Quick answer:</strong> This is the right page if you want a private Bosphorus yacht for a marriage proposal,
            not a shared cruise. Proposal yacht rentals work best when privacy, timing, and onboard setup matter more than the
            lowest price.
          </p>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Proposal Yacht Rental Istanbul
        </h1>
        <p className="text-sm font-semibold text-rose-600 mb-6">
          Private Bosphorus Proposal Yacht · Sunset Route Planning · Decoration & Photo Add-ons
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Guests searching for proposal yacht rental in Istanbul usually have one goal: build a private proposal moment
          around the Bosphorus, with the right route, timing, and setup support. That buying intent is different from a
          shared dinner cruise or a generic yacht charter quote.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          MerrySails arranges private proposal yachts with licensed vessels, planning support, and add-ons such as flowers,
          photographer, violinist, table styling, and dinner service. The goal is not only to rent a yacht, but to make the
          proposal flow feel controlled, discreet, and memorable.
        </p>

        <section className="mb-10 rounded-2xl border border-rose-100 bg-rose-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">When This Page Is the Better Match</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "You want a private proposal moment instead of a shared public cruise.",
              "You need a sunset or evening route planned around a specific proposal timing.",
              "You want setup support such as flowers, cake, violin, or photographer.",
              "You want a quote shaped by guest count, route, and setup level rather than a generic cruise ticket.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white bg-white p-4 shadow-sm text-sm text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Shapes the Proposal Yacht Quote?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Cruise duration",
                desc: "A short 2-hour sunset proposal and a longer dinner-on-yacht setup do not fall into the same quote band.",
              },
              {
                title: "Setup level",
                desc: "Simple flower setup, photographer support, violinist, LED sign, or full dinner table styling all change the proposal package.",
              },
              {
                title: "Guest count",
                desc: "A two-person proposal, a proposal with family onboard, and a larger celebration afterward each need a different yacht fit.",
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Compare the Closest Commercial Options</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/private-bosphorus-dinner-cruise",
                title: "Private Dinner Cruise",
                description: "Best if the proposal should sit inside a private dinner-on-yacht format.",
              },
              {
                href: "/yacht-charter-istanbul",
                title: "Yacht Charter Istanbul",
                description: "Best if you are comparing broader private yacht rental options before deciding the final event type.",
              },
              {
                href: "/boat-rental-istanbul",
                title: "Boat Rental Istanbul",
                description: "Best if you want a simpler private boat without a full proposal setup or premium yacht spec.",
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

        <div className="bg-gray-900 text-white rounded-xl p-6 mb-10 text-center">
          <p className="mb-3 font-medium text-lg">Get a proposal yacht quote on WhatsApp</p>
          <a
            href="https://wa.me/905370406822?text=Hello%2C%20I%20want%20a%20proposal%20yacht%20rental%20quote%20in%20Istanbul."
            className="inline-flex items-center justify-center bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Quote
          </a>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proposal Yacht Rental Istanbul FAQ</h2>
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
