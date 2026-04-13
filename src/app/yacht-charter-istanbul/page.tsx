import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Yacht Charter Istanbul — Private Bosphorus from €280 | MerrySails",
  description:
    "Private yacht charter Istanbul on the Bosphorus. From €280 for up to 12 guests. Wedding, corporate, birthday charters available. TURSAB licensed. Book online.",
  alternates: { canonical: `${SITE_URL}/yacht-charter-istanbul` },
  openGraph: {
    title: "Yacht Charter Istanbul — Private Bosphorus from €280 | MerrySails",
    description:
      "Private yacht charter on the Bosphorus from €280/half day. Wedding, corporate, birthday events. TURSAB licensed since 2001.",
    url: `${SITE_URL}/yacht-charter-istanbul`,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a yacht charter in Istanbul cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private yacht charter in Istanbul starts from €280 for a half-day cruise (4 hours) for up to 12 guests. Full-day charters start from €480. Prices include captain and crew, fuel, and port fees. Catering and drinks can be arranged additionally.",
      },
    },
    {
      "@type": "Question",
      name: "How many guests can a yacht charter in Istanbul accommodate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our standard private yachts accommodate 6-12 guests. For larger groups up to 30, we have gulet and motor yacht options. Corporate events and weddings can be arranged for 50+ guests with our larger fleet.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the private yacht charter depart from in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private yacht charters depart from Kuruçeşme Marina, Bebek Marina, or Ataköy Marina depending on your preference and itinerary. All marinas are in central Istanbul and easily accessible.",
      },
    },
    {
      "@type": "Question",
      name: "Can I charter a yacht for a wedding in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Istanbul Bosphorus weddings are increasingly popular. We provide decorated yachts for wedding ceremonies and receptions, with catering, flowers, photography setup, and DJ/music options. Wedding yacht packages start from €1,500.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum charter duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum charter duration is 2 hours. We recommend at least 4 hours (half day) to enjoy the Bosphorus scenery at a relaxed pace. Full-day charters (8 hours) allow you to cruise both straits and visit anchorage spots.",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring my own food and drinks on a yacht charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you are welcome to bring your own food and drinks for private charters. We can also arrange full catering service from our partner restaurants — Turkish mezze, BBQ on deck, or formal dining. Please let us know your preference when booking.",
      },
    },
  ],
};

export default function YachtCharterIstanbulPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Yacht Charter Istanbul</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Yacht Charter Istanbul — Private Bosphorus from €280
        </h1>
        <p className="text-sm font-semibold text-blue-600 mb-6">
          ★ 4.9/5 Rating · TURSAB Licensed Since 2001 · Up to 50 Guests · Custom Itineraries
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Hire a private yacht on the Bosphorus and enjoy Istanbul on your own terms. Whether it's a romantic sunset cruise for two, a birthday party for 12, a corporate event, or a wedding celebration — MerrySails has the perfect vessel and crew for your occasion.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Since 2001, MerrySails has operated private yacht charters on the Istanbul Bosphorus with TURSAB licensing and an impeccable safety record. Our fleet ranges from intimate sailboats to spacious gulets and motor yachts.
        </p>

        <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Which Charter Request Fits Your Plan Best?</h2>
          <p className="text-sm text-gray-700 mb-5">
            Most yacht charter enquiries close faster when the guest count, event type, and preferred departure pier are clear from the start. If your event already falls into one of the tracks below, use the matching page before you request a quote.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/corporate-events",
                title: "Corporate Bosphorus Event",
                description: "Client hosting, team dinners, product launches, or executive entertaining with AV and catering planning.",
              },
              {
                href: "/private-events",
                title: "Birthday or Private Celebration",
                description: "Best for birthdays, family gatherings, graduation parties, and private groups that need food, music, and decoration support.",
              },
              {
                href: "/istanbul-dinner-cruise",
                title: "Dinner-Led Experience",
                description: "Choose this when the main decision is dining, sunset timing, or a ready-made Bosphorus evening instead of a fully custom charter.",
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
          <div className="mt-5 rounded-xl border border-dashed border-blue-200 bg-white/70 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Fast Quote Checklist</h3>
            <ul className="grid gap-2 text-sm text-gray-700 md:grid-cols-2">
              {[
                "Event date and preferred start time",
                "Guest count and whether children are joining",
                "Occasion type: proposal, birthday, dinner, corporate, wedding",
                "Need for catering, decoration, cake, DJ, or transfer support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 text-center">
          <p className="text-gray-800 mb-4 font-medium">
            Get a custom quote for your private yacht charter. Responds within 2 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-3"
          >
            Request Charter Quote
          </Link>
          <Link
            href="/reservation"
            className="inline-block bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Book Online
          </Link>
        </div>

        {/* Packages */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yacht Charter Packages 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Package</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pkg: "Half-Day Charter (4h)", price: "€280", details: "Up to 12 guests · Captain & crew · Bosphorus route" },
                  { pkg: "Full-Day Charter (8h)", price: "€480", details: "Up to 12 guests · Captain & crew · Extended route both straits" },
                  { pkg: "Sunset Charter (2h)", price: "€180", details: "Up to 8 guests · Golden hour on the Bosphorus" },
                  { pkg: "Gulet Charter (up to 30)", price: "€650+", details: "Half day · Large group · Traditional wooden gulet" },
                  { pkg: "Wedding / Event Charter", price: "From €1,500", details: "Custom duration · Decoration · Catering · DJ available" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.pkg}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.price}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Occasions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect for Every Occasion</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "💑", title: "Romantic Getaway", desc: "Sunset cruise for two with champagne and canapés on the Bosphorus. The most romantic way to experience Istanbul." },
              { icon: "🎂", title: "Birthday Party", desc: "Celebrate your birthday on the water. We arrange decorations, cake, music, and catering for your group." },
              { icon: "💼", title: "Corporate Events", desc: "Team building, client entertainment, or product launches on the Bosphorus. Impress clients with Istanbul's most iconic backdrop." },
              { icon: "💍", title: "Wedding Charter", desc: "Intimate wedding ceremony or reception on a decorated yacht. Istanbul's skyline as your backdrop." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why MerrySails */}
        <section className="mb-10 bg-blue-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Charter with MerrySails?</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {[
              "TURSAB Licensed — operating safely since 2001",
              "Modern fleet: sailboats, motor yachts, gulets",
              "Experienced English-speaking captains",
              "Fully insured — all guests covered",
              "Flexible itineraries — you choose the route",
              "Catering and drinks arranged on request",
              "24/7 WhatsApp support",
              "Free cancellation up to 48h before charter",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yacht Charter Istanbul — FAQ</h2>
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

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Bosphorus Experiences</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "/bosphorus-cruise", label: "Bosphorus Sightseeing Cruise from €15" },
              { href: "/istanbul-dinner-cruise", label: "Istanbul Dinner Cruise from €65" },
              { href: "/private-tours", label: "Private Guided Tours from €180" },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-blue-700 font-medium">
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
