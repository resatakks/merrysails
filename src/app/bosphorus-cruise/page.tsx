import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul — Best Tours from €15 | MerrySails",
  description:
    "Compare all Bosphorus cruise options in Istanbul: sightseeing from €15, sunset €40, dinner €65, yacht charter €280+. TURSAB licensed since 2001. Best price guarantee — book online.",
  keywords: [
    "bosphorus cruise",
    "bosphorus cruise istanbul",
    "istanbul cruise",
    "bosphorus boat tour",
    "istanbul boat tour",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "bosphorus sightseeing cruise",
    "yacht charter istanbul",
    "bosphorus cruise 2026",
    "best bosphorus cruise",
    "cheap bosphorus cruise",
    "bosphorus cruise tickets",
    "bosphorus cruise price",
  ],
  alternates: { canonical: `${SITE_URL}/bosphorus-cruise` },
  openGraph: {
    title: "Bosphorus Cruise Istanbul — Best Tours from €15 | MerrySails",
    description:
      "Compare all Bosphorus cruise options: sightseeing €15, sunset €40, dinner €65, yacht €280+. TURSAB licensed. Book online — best price guarantee.",
    url: `${SITE_URL}/bosphorus-cruise`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bosphorus Cruise Istanbul — All Tours Compared",
      },
    ],
  },
};

const faqs = [
  {
    question: "How much does a Bosphorus cruise cost?",
    answer:
      "Bosphorus cruise prices start from €15 for a 1.5-hour sightseeing cruise. Sunset cruises are €40, dinner cruises €65 (all-inclusive with hotel pickup), and private yacht charters from €280. All prices include drinks and onboard amenities.",
  },
  {
    question: "Which Bosphorus cruise is best for first-time visitors?",
    answer:
      "The Bosphorus sightseeing cruise (€15, 1.5 hours) is perfect for first-time visitors. It covers all major landmarks — Maiden's Tower, Dolmabahçe Palace, Ortaköy Mosque, and both Bosphorus bridges — with an audio guide in 12 languages.",
  },
  {
    question: "Where do Bosphorus cruises depart from?",
    answer:
      "Most shared Bosphorus cruises depart from Eminönü Pier, located near the Galata Bridge in the old city. Private yacht cruises depart from Kuruçeşme Marina. Both locations are easily accessible by tram, metro, or taxi.",
  },
  {
    question: "What is the best time of year for a Bosphorus cruise?",
    answer:
      "April to October offers the best weather with warm temperatures and long daylight hours. However, Bosphorus cruises operate year-round. Winter cruises are less crowded and offer dramatic skies, while summer provides the most spectacular sunsets.",
  },
  {
    question: "Is food included on Bosphorus cruises?",
    answer:
      "It depends on the cruise type. The sightseeing cruise (€15) includes soft drinks and snacks. The sunset cruise (€40) includes welcome drinks, soft drinks, and a snack platter. The dinner cruise (€65) features a full 4-course Turkish dinner with unlimited local drinks.",
  },
  {
    question: "Can I book a private Bosphorus cruise?",
    answer:
      "Yes, private yacht charters start from €280 for a 2-hour cruise with a professional crew. You get a dedicated yacht for up to 15 guests with a customizable route. Add-ons include catering (€35/person), a photographer (€190), and extra hours (€125–300).",
  },
  {
    question: "How long is a Bosphorus cruise?",
    answer:
      "Cruise durations vary by type: sightseeing is 1.5 hours, lunch cruise 2 hours, sunset cruise 2.5 hours, and dinner cruise 3.5 hours. Private yacht charters are typically 2–3 hours but can be extended.",
  },
  {
    question: "Do I need to book a Bosphorus cruise in advance?",
    answer:
      "We recommend booking at least 24 hours in advance, especially during peak season (June–September). Online booking guarantees your spot and often includes free cancellation. Same-day availability is possible but not guaranteed.",
  },
];

const cruiseTypes = [
  {
    name: "Sightseeing Cruise",
    price: "€15",
    duration: "1.5 hours",
    departures: "10:00, 14:00, 16:00",
    includes: "Audio guide, soft drinks, WiFi, snacks",
    bestFor: "First-time visitors, families, budget travelers",
    href: "/cruises/bosphorus-sightseeing-cruise",
  },
  {
    name: "Sunset Cruise",
    price: "€40",
    duration: "2.5 hours",
    departures: "17:00 (winter) / 18:00 (summer)",
    includes: "Welcome drinks, open bar (soft), snack platter, live commentary",
    bestFor: "Couples, photographers, romantic evenings",
    href: "/cruises/bosphorus-sunset-cruise",
  },
  {
    name: "Dinner Cruise",
    price: "€65",
    duration: "3.5 hours",
    departures: "19:30",
    includes: "4-course dinner, unlimited drinks, live show, hotel pickup",
    bestFor: "Special occasions, groups, nightlife lovers",
    href: "/cruises/bosphorus-dinner-cruise",
  },
  {
    name: "Yacht Charter",
    price: "€280+",
    duration: "2–3 hours",
    departures: "Flexible",
    includes: "Private yacht, crew, custom route, drinks",
    bestFor: "Proposals, birthdays, corporate events, families",
    href: "/cruises/yacht-charter-in-istanbul",
  },
];

const departures = [
  {
    name: "Eminönü Pier",
    description:
      "Main departure point for shared cruises (sightseeing, sunset, dinner). Located near Galata Bridge, accessible via T1 Tram (Eminönü stop) or a short walk from Sultanahmet.",
  },
  {
    name: "Kuruçeşme Marina",
    description:
      "Departure point for private yacht charters. Located on the European side near Ortaköy, accessible by bus or taxi from Taksim (15 min).",
  },
];

const tourTripSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Bosphorus Cruise Istanbul",
  description:
    "Compare and book the best Bosphorus cruises in Istanbul: sightseeing, sunset, dinner, and private yacht charter. TURSAB licensed company since 2001.",
  touristType: ["Cultural", "Sightseeing", "Luxury"],
  provider: {
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "MerrySails",
    url: SITE_URL,
    telephone: "+905001234567",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Bosphorus Sightseeing Cruise",
      price: "15",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/bosphorus-sightseeing-cruise`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Bosphorus Sunset Cruise",
      price: "40",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Bosphorus Dinner Cruise",
      price: "65",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/bosphorus-dinner-cruise`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Private Yacht Charter Istanbul",
      price: "280",
      priceCurrency: "EUR",
      url: `${SITE_URL}/cruises/yacht-charter-in-istanbul`,
      availability: "https://schema.org/InStock",
    },
  ],
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Maiden's Tower (Kız Kulesi)" },
      { "@type": "ListItem", position: 2, name: "Dolmabahçe Palace" },
      { "@type": "ListItem", position: 3, name: "Ortaköy Mosque" },
      { "@type": "ListItem", position: 4, name: "Bosphorus Bridge" },
      { "@type": "ListItem", position: 5, name: "Rumeli Fortress" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bosphorus Cruise",
      item: `${SITE_URL}/bosphorus-cruise`,
    },
  ],
};

export default function BosphorusCruisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourTripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[var(--surface-alt)] border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-[var(--brand-primary)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Bosphorus Cruise</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Bosphorus Cruise Istanbul
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-4">
            Compare every Bosphorus cruise option — from a budget-friendly{" "}
            <strong>€15 sightseeing cruise</strong> to a{" "}
            <strong>€65 all-inclusive dinner cruise</strong> with Turkish night
            show — and find the perfect boat tour for your Istanbul trip. TURSAB
            A Group licensed company since 2001.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/cruises/bosphorus-sightseeing-cruise"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition"
            >
              Book from €15
            </Link>
            <Link
              href="#cruise-types"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              Compare All Cruises
            </Link>
          </div>
        </div>
      </section>

      {/* Cruise Types Comparison */}
      <section id="cruise-types" className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            All Bosphorus Cruise Types Compared
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            We operate four types of Bosphorus cruises, each designed for a
            different budget and experience. All cruises depart daily, include
            drinks, and are operated on our licensed fleet.
          </p>

          {/* Mobile cards */}
          <div className="grid gap-6 md:hidden">
            {cruiseTypes.map((cruise) => (
              <div
                key={cruise.name}
                className="rounded-xl border p-6 hover:border-[var(--brand-primary)] transition"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-lg font-bold">{cruise.name}</h3>
                  <span className="text-xl font-bold text-[var(--brand-primary)]">
                    {cruise.price}
                  </span>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Duration</dt>
                    <dd className="font-medium">{cruise.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Departures</dt>
                    <dd className="font-medium">{cruise.departures}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Includes</dt>
                    <dd className="text-gray-700">{cruise.includes}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Best for</dt>
                    <dd className="text-gray-700">{cruise.bestFor}</dd>
                  </div>
                </dl>
                <Link
                  href={cruise.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                >
                  View Details &amp; Book &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="py-3 px-4 text-left font-semibold">Cruise</th>
                  <th className="py-3 px-4 text-left font-semibold">Price</th>
                  <th className="py-3 px-4 text-left font-semibold">Duration</th>
                  <th className="py-3 px-4 text-left font-semibold">Departures</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    What&apos;s Included
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Best For</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {cruiseTypes.map((cruise) => (
                  <tr
                    key={cruise.name}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4 font-semibold">{cruise.name}</td>
                    <td className="py-4 px-4 font-bold text-[var(--brand-primary)]">
                      {cruise.price}
                    </td>
                    <td className="py-4 px-4">{cruise.duration}</td>
                    <td className="py-4 px-4">{cruise.departures}</td>
                    <td className="py-4 px-4 max-w-xs">{cruise.includes}</td>
                    <td className="py-4 px-4 max-w-xs">{cruise.bestFor}</td>
                    <td className="py-4 px-4">
                      <Link
                        href={cruise.href}
                        className="whitespace-nowrap text-[var(--brand-primary)] font-medium hover:underline"
                      >
                        Book &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Booking Guide */}
      <section className="py-16 lg:py-24 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How to Book a Bosphorus Cruise
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            Booking your Bosphorus cruise with MerrySails is simple and secure.
            Follow these steps:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your Cruise</h3>
              <p className="text-gray-600 text-sm">
                Browse our cruise types above and select the experience that
                matches your budget, group size, and interests.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Pick a Date &amp; Time</h3>
              <p className="text-gray-600 text-sm">
                Select your preferred departure date and time. Multiple daily
                departures are available for most cruises.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border">
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Book Online &amp; Go</h3>
              <p className="text-gray-600 text-sm">
                Complete your booking online with instant confirmation. Free
                cancellation up to 24 hours before departure on most cruises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departure Points */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Departure Points
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            All our Bosphorus cruises depart from two convenient locations in
            Istanbul:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {departures.map((d) => (
              <div key={d.name} className="rounded-xl border p-6">
                <h3 className="text-lg font-bold mb-2">{d.name}</h3>
                <p className="text-gray-600 text-sm">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Go */}
      <section className="py-16 lg:py-24 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Best Time for a Bosphorus Cruise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">
                Peak Season (June &ndash; September)
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Warm weather (25&ndash;35&deg;C), long daylight hours, and
                spectacular sunsets. This is the most popular time for Bosphorus
                cruises, so advance booking is recommended. Private yacht
                swimming tours are only available in this period.
              </p>
              <h3 className="font-bold text-lg mb-2">
                Shoulder Season (April &ndash; May, October &ndash; November)
              </h3>
              <p className="text-gray-600 text-sm">
                Pleasant temperatures (15&ndash;25&deg;C), fewer crowds, and
                excellent value. Many consider this the best time for a
                Bosphorus cruise, offering dramatic autumn colors or spring
                blooms along the shoreline.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                Winter Season (December &ndash; March)
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Cooler temperatures (5&ndash;12&deg;C) but strikingly moody
                skies. Indoor seating is available on all boats. Dinner cruises
                are particularly popular in winter for their warm, festive
                atmosphere.
              </p>
              <h3 className="font-bold text-lg mb-2">Best Time of Day</h3>
              <p className="text-gray-600 text-sm">
                Morning cruises (10:00) offer the clearest visibility for
                photography. Sunset cruises provide the most romantic atmosphere.
                Dinner cruises showcase the illuminated Bosphorus skyline at
                night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will See */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What You&apos;ll See on a Bosphorus Cruise
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Every Bosphorus cruise passes these iconic landmarks spanning two
            continents:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Maiden's Tower (Kız Kulesi)",
                desc: "Iconic island tower dating to 408 BC, one of Istanbul's most photographed landmarks.",
              },
              {
                name: "Dolmabahçe Palace",
                desc: "Magnificent Ottoman palace on the European shore, last residence of the sultans.",
              },
              {
                name: "Ortaköy Mosque",
                desc: "Baroque-style mosque framed against the Bosphorus Bridge — the ultimate Istanbul photo.",
              },
              {
                name: "Bosphorus Bridge",
                desc: "The first bridge connecting Europe and Asia (1973), illuminated in colors at night.",
              },
              {
                name: "Rumeli Fortress",
                desc: "15th-century Ottoman fortress built by Mehmet the Conqueror before conquering Constantinople.",
              },
              {
                name: "Beylerbeyi Palace",
                desc: "Elegant marble palace on the Asian side, once used to host foreign heads of state.",
              },
            ].map((landmark) => (
              <div key={landmark.name} className="rounded-lg border p-4">
                <h3 className="font-semibold mb-1">{landmark.name}</h3>
                <p className="text-gray-600 text-sm">{landmark.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Cruise Options */}
      <section className="py-16 lg:py-24 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            More Cruise &amp; Tour Options
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Beyond the main cruise types, we offer specialty experiences for
            every occasion:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Lunch Cruise", price: "€35", href: "/cruises/istanbul-lunch-cruise" },
              { name: "Princes' Islands Tour", price: "€45", href: "/cruises/istanbul-princes-island-tour" },
              { name: "Marriage Proposal Yacht", price: "€280+", href: "/cruises/romantic-marriage-proposal" },
              { name: "Birthday Party Yacht", price: "€280+", href: "/cruises/yacht-birthday-party" },
              { name: "Yacht Wedding", price: "€680+", href: "/cruises/yacht-weddings" },
              { name: "Corporate Event Cruise", price: "€280+", href: "/cruises/corporate-event-bosphorus-cruise" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg border bg-white p-5 hover:border-[var(--brand-primary)] transition flex items-center justify-between"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-[var(--brand-primary)] font-bold text-sm">
                  {item.price}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Bosphorus Cruise — Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border p-4 open:shadow-sm transition"
              >
                <summary className="cursor-pointer font-semibold text-gray-800 list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                    &#9662;
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[var(--brand-primary)] text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Cruise the Bosphorus?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Choose your cruise, pick a date, and book online with instant
            confirmation. Free cancellation available on most cruises. Best price
            guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cruises/bosphorus-sightseeing-cruise"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:bg-gray-100 transition"
            >
              Book from €15
            </Link>
            <Link
              href="/cruises/bosphorus-dinner-cruise"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-white/30 font-semibold hover:bg-white/10 transition"
            >
              Dinner Cruise — €65
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
