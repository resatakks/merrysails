import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Istanbul Dinner Cruise 2026 — From €65 with Dinner & Transfer | MerrySails",
  description:
    "Book an Istanbul dinner cruise from €65 with buffet dinner, unlimited local drinks, Turkish night show, and hotel transfer. TURSAB licensed since 2001. Reserve 2026 dates online.",
  alternates: { canonical: `${SITE_URL}/istanbul-dinner-cruise` },
  keywords: [
    "istanbul dinner cruise",
    "bosphorus dinner cruise",
    "dinner cruise istanbul 2026",
    "istanbul dinner cruise price",
    "bosphorus dinner cruise with hotel transfer",
    "turkish night cruise istanbul",
  ],
  openGraph: {
    title: "Istanbul Dinner Cruise 2026 — From €65 with Dinner & Transfer | MerrySails",
    description:
      "All-inclusive Bosphorus dinner cruise from €65 with dinner, drinks, Turkish show, and hotel pickup. TURSAB licensed since 2001.",
    url: `${SITE_URL}/istanbul-dinner-cruise`,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does an Istanbul dinner cruise cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Istanbul dinner cruises start from €65 per person for a standard dinner cruise with open buffet and unlimited local drinks. Premium options with a la carte dinner and wine start from €95 per person. All prices include hotel pickup and drop-off.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the Istanbul dinner cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our dinner cruise includes: open buffet dinner with Turkish and international cuisine, unlimited local drinks (beer, wine, rakı, soft drinks), live Turkish folk music and dance show, belly dance performance, hotel pickup and drop-off, and approximately 3 hours on the Bosphorus.",
      },
    },
    {
      "@type": "Question",
      name: "When does the Istanbul dinner cruise depart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard dinner cruise departs at 7:30 PM from Ortaköy or Eminönü pier and returns at approximately 10:30 PM. Hotel pickups start from 6:30 PM depending on your hotel location.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the Istanbul dinner cruise depart from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dinner cruises depart from Ortaköy Marina or Eminönü Pier. We provide hotel pickup service from all major areas of Istanbul including Taksim, Sultanahmet, Beşiktaş, Şişli, and Kadıköy.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Istanbul dinner cruise suitable for couples?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The Istanbul dinner cruise is one of the most romantic experiences in the city. We can arrange special table settings for couples, anniversary celebrations, and proposals. Please mention your occasion when booking.",
      },
    },
    {
      "@type": "Question",
      name: "What is the dress code for the Istanbul dinner cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Smart casual dress is recommended. There is no strict dress code, but most guests wear smart casual or semi-formal attire. Comfortable shoes are recommended as you'll be on a boat.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a private dinner cruise on the Bosphorus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer private dinner cruise charters for corporate events, birthday parties, weddings, and group celebrations. Private yacht dinner cruises start from €1,200 for groups up to 12 people. Contact us for a custom quote.",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Istanbul Dinner Cruise",
  description: "All-inclusive dinner cruise on the Bosphorus with Turkish show, unlimited drinks, and hotel transfer",
  provider: {
    "@type": "TravelAgency",
    name: "MerrySails",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: 65,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  areaServed: "Istanbul, Turkey",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Istanbul Dinner Cruise", item: `${SITE_URL}/istanbul-dinner-cruise` },
  ],
};

export default function IstanbulDinnerCruisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Istanbul Dinner Cruise</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Istanbul Dinner Cruise — All-Inclusive from €65
        </h1>
        <p className="text-sm font-semibold text-blue-600 mb-6">
          ★ 4.8/5 Rating · 1,200+ Reviews · TURSAB Licensed · Hotel Pickup Included
        </p>

        {/* Answer Capsule */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-5 mb-6">
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>Quick answer:</strong> An Istanbul dinner cruise on the Bosphorus costs from <strong>€65 per person</strong> and includes an open buffet dinner, unlimited local drinks, a live Turkish entertainment show, and hotel pickup. Cruises depart at <strong>7:30 PM</strong> from Ortaköy or Eminönü and last approximately <strong>3 hours</strong>. MerrySails has been operating TURSAB-licensed dinner cruises in Istanbul since 2001.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Is This the Right Bosphorus Cruise for You?</h2>
          <p className="text-sm text-gray-700 mb-5">
            Choose this page if you want the strongest all-in-one evening package. If you only want sightseeing or need a private setup, compare the options below before booking.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Dinner Cruise",
                price: "From €65 pp",
                bestFor: "Couples, families, and first-time visitors who want dinner, show, and transfer in one booking.",
                href: "/reservation",
                cta: "Reserve dinner cruise",
              },
              {
                title: "Sightseeing Cruise",
                price: "From €15 pp",
                bestFor: "Guests who want a shorter daytime Bosphorus cruise without dinner or evening entertainment.",
                href: "/bosphorus-cruise",
                cta: "Compare sightseeing cruise",
              },
              {
                title: "Private Yacht",
                price: "From €280 total",
                bestFor: "Proposals, birthdays, and private groups that need a custom route, timing, or setup.",
                href: "/boat-rental-istanbul",
                cta: "Compare private boat rental",
              },
            ].map((option) => (
              <div key={option.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-blue-700 mb-2">{option.price}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{option.bestFor}</p>
                <Link
                  href={option.href}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  {option.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Experience Istanbul&apos;s most magical scenery from the water — an all-inclusive Bosphorus dinner cruise combining exquisite cuisine, unlimited drinks, and a live Turkish entertainment show. Glide past illuminated palaces, mosques, and bridges as the city sparkles after dark.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          MerrySails has been operating Bosphorus dinner cruises since 2001. With TURSAB license and hundreds of 5-star reviews, we are Istanbul&apos;s most trusted dinner cruise provider for couples, families, and corporate groups.
        </p>

        <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Best Pages to Compare Before Booking</h2>
          <p className="text-sm text-gray-700 mb-5">
            Guests comparing dinner cruise options usually also review boat rental, yacht charter, and classic Bosphorus cruise pages before booking.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                href: "/boat-rental-istanbul",
                title: "Boat Rental Istanbul",
                description: "Private boat rental for small groups, proposals, and custom routes.",
              },
              {
                href: "/yacht-charter-istanbul",
                title: "Yacht Charter Istanbul",
                description: "Private yacht charter with flexible timing, route, and catering upgrades.",
              },
              {
                href: "/bosphorus-cruise",
                title: "Bosphorus Cruise",
                description: "Classic sightseeing option for guests comparing dinner vs daytime experiences.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-100/40"
              >
                <span className="block text-base font-semibold text-gray-900 mb-1">{item.title}</span>
                <span className="block text-sm text-gray-600">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Which Booking Intent Fits This Page Best?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Dinner + show in one booking",
                desc: "Best fit for travelers who want one product that includes dinner, drinks, entertainment, and transfer without building a separate plan.",
              },
              {
                title: "Couples and celebration nights",
                desc: "Strong commercial fit for anniversaries, romantic evenings, birthday dinners, and first-time Istanbul visitors who want an easy evening plan.",
              },
              {
                title: "Users comparing sunset vs dinner",
                desc: "This page works well for visitors who have buying intent but still need to understand whether a sunset cruise, private yacht, or dinner cruise suits them better.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Dinner Cruise vs Private Yacht vs Sightseeing Cruise</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Dinner Cruise",
                desc: "Best when you want one evening booking with dinner, entertainment, and hotel transfer already included.",
              },
              {
                title: "Private Yacht",
                desc: "Better if you need privacy, custom timing, proposal setup, birthday decoration, or a fully private route.",
              },
              {
                title: "Sightseeing Cruise",
                desc: "Better for budget-first guests who only want Bosphorus views and do not need dinner or an evening show.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 text-center">
          <p className="text-gray-800 mb-4 font-medium">
            Book your Istanbul dinner cruise tonight — instant confirmation, free cancellation up to 24h.
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Dinner Cruise Now
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Need a faster answer? WhatsApp us at{" "}
            <a
              href="https://wa.me/905370406822?text=Hi%2C%20I%27d%20like%20to%20book%20the%20Istanbul%20dinner%20cruise"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              +90 537 040 68 22
            </a>{" "}
            for same-day availability, couple tables, and group pricing.
          </p>
        </div>

        {/* What's Included */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Included in the Dinner Cruise</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Open buffet dinner — Turkish & international cuisine",
              "Unlimited local drinks (beer, wine, rakı, soft drinks)",
              "Live Turkish folk music and dance show",
              "Belly dance & whirling dervish performance",
              "Hotel pickup and drop-off from central Istanbul",
              "Approximately 3 hours on the Bosphorus",
              "Professional captain and crew",
              "All taxes and port fees included",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-3">
                <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dinner Cruise Packages 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Package</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Price/Person</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Includes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: "Standard Dinner Cruise", price: "€65", includes: "Buffet dinner + unlimited local drinks + show + hotel transfer" },
                  { pkg: "Premium Dinner Cruise", price: "€95", includes: "A la carte dinner + wine + VIP seating + show + hotel transfer" },
                  { pkg: "Sunset + Dinner Combo", price: "€110", includes: "Sunset cruise + dinner cruise + full day on water + all meals" },
                  { pkg: "Private Yacht Dinner (up to 12)", price: "€1,200", includes: "Exclusive yacht + catered dinner + drinks + custom route" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.pkg}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.price}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll See on the Bosphorus</h2>
          <p className="text-gray-600 mb-4">Your dinner cruise route passes Istanbul&apos;s most iconic landmarks lit up at night:</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Maiden's Tower", desc: "Legendary island tower in the middle of the Bosphorus" },
              { name: "Dolmabahçe Palace", desc: "19th-century Ottoman imperial palace on the waterfront" },
              { name: "Ortaköy Mosque", desc: "Iconic neo-baroque mosque reflected in the water" },
              { name: "Bosphorus Bridges", desc: "Two suspension bridges connecting Europe and Asia" },
              { name: "Çırağan Palace", desc: "Historic palace now a luxury Kempinski hotel" },
              { name: "Rumeli Fortress", desc: "15th-century Ottoman fortress on the hillside" },
            ].map((sight) => (
              <div key={sight.name} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-1">{sight.name}</h3>
                <p className="text-gray-600 text-sm">{sight.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Istanbul Dinner Cruise — Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-lg p-4 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.name}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Bosphorus Experiences</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "/bosphorus-cruise", label: "Bosphorus Sightseeing Cruise — from €15" },
              { href: "/private-tours", label: "Private Bosphorus Tour — from €180" },
              { href: "/yacht-charter-istanbul", label: "Yacht Charter Istanbul — from €280" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-blue-700 font-medium"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
