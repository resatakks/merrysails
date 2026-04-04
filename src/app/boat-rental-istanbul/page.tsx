import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Boat Rental Istanbul | Private & Group Bosphorus Boat Hire 2026",
  description:
    "Rent a boat in Istanbul for Bosphorus cruising. Private & group boat hire from €80/hr — small yachts, gulets, and corporate vessels. TURSAB licensed. WhatsApp booking available.",
  alternates: { canonical: `${SITE_URL}/boat-rental-istanbul` },
  openGraph: {
    title: "Boat Rental Istanbul | Private & Group Bosphorus Boat Hire 2026",
    description:
      "Istanbul boat rental from €80/hr. Private yachts, gulets & corporate charters on the Bosphorus. TURSAB licensed since 2001. Instant WhatsApp booking.",
    url: `${SITE_URL}/boat-rental-istanbul`,
    type: "website",
  },
  keywords: [
    "boat rental istanbul",
    "istanbul boat hire",
    "rent a boat istanbul bosphorus",
    "bosphorus boat rental",
    "private boat hire istanbul",
    "yacht rental istanbul",
    "gulet hire istanbul",
    "corporate boat charter istanbul",
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Boat Rental Istanbul — Private & Group Bosphorus Boat Hire",
  description:
    "Private and group boat rental on the Bosphorus in Istanbul. Hourly and day charter options including small yachts, gulets, and corporate-grade vessels. TURSAB licensed operator since 2001.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  provider: {
    "@type": "TravelAgency",
    name: "MerrySails",
    url: SITE_URL,
    telephone: "+90-537-040-68-22",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Alemdar Mah. Divanyolu Cad. Ogul Han No:62 Ic Kapi No: 402",
      addressLocality: "Fatih",
      addressRegion: "Istanbul",
      postalCode: "34093",
      addressCountry: "TR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
  },
  offers: [
    {
      "@type": "Offer",
      name: "Small Yacht Hourly Rental",
      price: "80",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: "Small private yacht, up to 8 guests, 1-hour minimum",
    },
    {
      "@type": "Offer",
      name: "Gulet Hourly Rental",
      price: "200",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: "Traditional Turkish gulet, up to 20 guests, 2-hour minimum",
    },
    {
      "@type": "Offer",
      name: "Corporate Charter",
      price: "800",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: "Corporate-grade vessel, 30–120 guests, custom branding available",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 41.0082,
      longitude: 28.9784,
    },
    geoRadius: "30000",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to rent a boat in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boat rental in Istanbul starts from €80–150 per hour for a small private yacht accommodating up to 8 guests. Traditional gulets cost €200–400 per hour for up to 20 guests. Corporate charters for 30–120 guests start from €800. All prices include a licensed captain and crew. Contact MerrySails via WhatsApp for a personalised quote.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum rental period for a boat in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum rental period is 2 hours for private yachts and gulets. Half-day charters (4–5 hours) and full-day charters (8 hours) are available at reduced hourly rates. Corporate and event charters are typically booked for a minimum of 3 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a boat licence to rent a boat in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No licence is required. All MerrySails boat rentals include a licensed Turkish captain and crew. You simply arrive, board, and enjoy the Bosphorus — our team handles navigation, safety, and all maritime requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Where do rental boats depart from in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private and corporate boat rentals depart from Kuruçeşme Marina on the European Bosphorus shore. The marina has parking, clean facilities, and is accessible by taxi from Taksim (15–20 minutes) or Sultanahmet (25–30 minutes). Exact GPS coordinates and meeting instructions are sent with your booking confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a boat for a birthday, wedding, or corporate event in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails specialises in private event boat hire including birthdays, weddings, corporate team events, product launches, and private parties. We provide catering, decoration, DJ, and photographer add-ons. Corporate charters include branding options. Contact us for a custom event quote.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book a boat rental in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend booking at least 3–7 days in advance for private yacht rentals, and 2–4 weeks in advance for corporate events and large group charters, especially during peak season (May–September). Last-minute bookings may be available — contact us via WhatsApp for immediate availability.",
      },
    },
    {
      "@type": "Question",
      name: "Is the boat rental price per person or for the whole boat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boat rental in Istanbul is priced per boat (not per person), so the cost is shared among your group. A small yacht at €80–150/hr for up to 8 guests works out to €10–19 per person per hour. A gulet at €200–400/hr for up to 20 guests costs €10–20 per person per hour.",
      },
    },
    {
      "@type": "Question",
      name: "What is the deposit policy for boat rental in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails requires a 50% deposit to confirm your boat rental booking. The remaining 50% is due 48 hours before departure. Full refund for cancellations 14+ days before; 50% refund for cancellations 7–13 days before; non-refundable within 7 days. Bookings cancelled due to unsafe weather conditions (captain's discretion) receive a full refund or free reschedule.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Book a Boat Rental in Istanbul",
  description: "Step-by-step guide to booking a private or group boat rental on the Bosphorus in Istanbul with MerrySails.",
  totalTime: "PT10M",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose Your Vessel",
      text: "Select your boat type based on group size and occasion: small yacht (up to 8 guests), gulet (up to 20 guests), or corporate vessel (30–120 guests).",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Contact MerrySails",
      text: "WhatsApp us at +90 537 040 68 22 or fill in the online enquiry form with your preferred date, group size, duration, and any special requirements.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Receive Your Quote",
      text: "We will confirm availability and send a detailed quote including vessel specs, route options, catering packages, and add-on services within a few hours.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Confirm and Pay",
      text: "Confirm your booking with a deposit (50%). We accept EUR/USD/TRY via bank transfer or credit card. Final payment is due 48 hours before departure.",
      position: 4,
    },
    {
      "@type": "HowToStep",
      name: "Board and Cruise",
      text: "Arrive at Kuruçeşme Marina at your scheduled time. The crew meets you at the gate, boards you, and you set sail on the Bosphorus.",
      position: 5,
    },
  ],
};

const fleetData = [
  {
    type: "Small Yacht",
    capacity: "2–8 guests",
    hourly: "€80–150/hr",
    halfDay: "€320–550 (4 hrs)",
    fullDay: "€600–1,000 (8 hrs)",
    bestFor: "Couples, small groups, proposals, birthdays",
  },
  {
    type: "Gulet (Traditional)",
    capacity: "8–20 guests",
    hourly: "€200–400/hr",
    halfDay: "€750–1,400 (4 hrs)",
    fullDay: "€1,400–2,800 (8 hrs)",
    bestFor: "Family groups, mid-size parties, team events",
  },
  {
    type: "Corporate Vessel",
    capacity: "30–120 guests",
    hourly: "€800+/hr",
    halfDay: "€3,000+ (4 hrs)",
    fullDay: "€5,500+ (8 hrs)",
    bestFor: "Corporate events, conferences, product launches, gala dinners",
  },
];

const seasonalPricing = [
  {
    season: "Spring (Apr–May)",
    smallYacht: "€80–120/hr",
    gulet: "€200–320/hr",
    corporate: "€800–1,000/hr",
    note: "Peak photography season — book 1 week ahead",
  },
  {
    season: "Summer (Jun–Sep)",
    smallYacht: "€120–150/hr",
    gulet: "€300–400/hr",
    corporate: "€1,000–1,200/hr",
    note: "High demand — book 2+ weeks ahead",
  },
  {
    season: "Autumn (Oct–Nov)",
    smallYacht: "€80–110/hr",
    gulet: "€200–300/hr",
    corporate: "€800–1,000/hr",
    note: "Best value + dramatic golden-hour light",
  },
  {
    season: "Winter (Dec–Mar)",
    smallYacht: "€65–90/hr",
    gulet: "€170–250/hr",
    corporate: "€680–850/hr",
    note: "15–20% lower rates · same-day bookings often available",
  },
];

const includedItems = [
  "Licensed captain with 10+ years Bosphorus experience",
  "Crew (1–3 members depending on vessel)",
  "Life jackets & safety equipment (TURSAB compliant)",
  "Fuel for the agreed route & duration",
  "Bosphorus route map & landmark guide",
  "Bluetooth speaker system on board",
  "Basic refreshments (water, soft drinks) on 2-hr charters",
  "TURSAB-licensed passenger insurance",
];

const extraItems = [
  { item: "Full catering — Turkish mezze platter", price: "from €18/person" },
  { item: "3-course plated dinner", price: "from €38/person" },
  { item: "Open bar (alcoholic + non-alcoholic)", price: "from €25/person" },
  { item: "Professional photographer (2 hrs)", price: "from €150" },
  { item: "DJ + sound system", price: "from €200" },
  { item: "Rose petal decoration & candles (proposals)", price: "from €80" },
  { item: "Custom branding / company signage", price: "from €120" },
  { item: "Full AV (100-inch screen + projector)", price: "from €180" },
];

const faqs = faqJsonLd.mainEntity;

export default function BoatRentalIstanbulPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">Boat Rental Istanbul</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Boat Rental Istanbul | Private &amp; Group Bosphorus Boat Hire 2026
        </h1>
        <p className="text-sm font-semibold text-blue-600 mb-6">
          ★ 4.9/5 Rating · 2,847 Reviews · TURSAB Licensed · Captain &amp; Crew Included
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Rent a private boat on the Bosphorus and experience Istanbul on your own terms. MerrySails offers fully crewed boat hire for couples, private groups, and corporate clients — from intimate two-hour sunset sails to all-day corporate charters with catering and entertainment. No licence required: our professional captains handle everything.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          With a{" "}
          <a href="https://www.tursab.org.tr/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            TURSAB A Group
          </a>{" "}
          licence and 25 years of Bosphorus operations, MerrySails is Istanbul's most trusted boat hire operator — serving 50,000+ guests since 2001.
        </p>

        {/* WhatsApp CTA */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-10 text-center">
          <p className="text-gray-800 mb-2 font-semibold text-lg">
            Get an Instant Boat Rental Quote
          </p>
          <p className="text-gray-600 mb-4 text-sm">
            Message us on WhatsApp with your date, group size and occasion — we reply within minutes.
          </p>
          <a
            href="https://wa.me/905370406822?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20boat%20rental%20in%20Istanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mr-4 mb-2"
          >
            WhatsApp Us Now
          </a>
          <Link
            href="/reservation"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-2"
          >
            Book Online
          </Link>
        </div>

        {/* Fleet & Pricing Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Boat Rental Istanbul — Fleet &amp; Pricing 2026
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            All rentals include a licensed captain, crew, life jackets, and fuel. Catering, decoration, photographer, and DJ available as add-ons.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Vessel Type</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Capacity</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Hourly Rate</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Half Day (4 hrs)</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-700">Full Day (8 hrs)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                </tr>
              </thead>
              <tbody>
                {fleetData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.type}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.capacity}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.hourly}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.halfDay}</td>
                    <td className="px-4 py-3 text-center text-gray-700">{row.fullDay}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Prices are indicative ranges for 2026. Final pricing depends on vessel, date, duration, and add-on services.{" "}
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Contact us for a confirmed quote.
            </a>
          </p>
        </section>

        {/* Seasonal Pricing Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Seasonal Boat Rental Rates — Istanbul 2026
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Prices vary by season. Summer carries a 20–30% premium; winter offers the best value.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Season</th>
                  <th className="text-center px-4 py-3 font-semibold">Small Yacht (up to 8)</th>
                  <th className="text-center px-4 py-3 font-semibold">Gulet (up to 20)</th>
                  <th className="text-center px-4 py-3 font-semibold">Corporate (30–120)</th>
                  <th className="text-left px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {seasonalPricing.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.season}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.smallYacht}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.gulet}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700">{row.corporate}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Included vs Extras */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What&apos;s Included vs. Available as Extras
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg text-green-700">Always Included</h3>
              <ul className="space-y-2">
                {includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg text-blue-700">Optional Extras</h3>
              <div className="space-y-2">
                {extraItems.map((extra) => (
                  <div key={extra.item} className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-700">{extra.item}</span>
                    <span className="text-sm font-semibold text-blue-700 ml-4 flex-shrink-0">{extra.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minimum Duration & Deposit Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Minimum Duration &amp; Deposit Policy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Minimum Booking Durations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Small Yacht:</strong> 2 hours minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Gulet:</strong> 2 hours minimum (3 hrs recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Corporate vessel:</strong> 3 hours minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Full-day charter:</strong> 8 hours (significant discount vs hourly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">—</span>
                  <span>Additional hours may be added on the day (subject to availability)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Deposit &amp; Cancellation Policy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Deposit:</strong> 50% to confirm booking (bank transfer or card)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Final payment:</strong> remaining 50% due 48 hours before departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Free cancellation:</strong> 14+ days before — full refund</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Partial refund:</strong> 7–13 days before — 50% returned</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Non-refundable:</strong> within 7 days (weather cancellations excepted)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">—</span>
                  <span><strong>Weather cancellation:</strong> full refund or free reschedule</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hourly vs Day Charter */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hourly Boat Hire vs Day Charter — Which Should You Choose?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Hourly Boat Rental</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                  Minimum 2 hours — flexible add-on hours available
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                  Perfect for proposals, birthday toasts, sunset sails
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                  Lower upfront cost — pay only for time used
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                  Small yacht from €80/hr, gulet from €200/hr
                </li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Day Charter (Full Day)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                  8+ hours on the water — explore the full Bosphorus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                  Ideal for corporate retreats, large family outings, filming
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                  Best per-hour rate — significant savings vs hourly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                  Full catering, swimming stops, island visits possible
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Private vs Corporate */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Private Boat Hire vs Corporate Charter in Istanbul
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Whether you are planning an intimate private occasion or a large corporate event, MerrySails has a dedicated offering for each.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Private Boat Hire</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Ideal for couples, families, and friend groups up to 20 guests. Choose from romantic sunset sails, birthday celebrations, marriage proposals (rose petals + violin available), bachelorette parties, and anniversary dinners on the water.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Proposals from €280 (2 hrs, up to 8 guests)</li>
                <li>Birthday charters from €400 (3 hrs, up to 12 guests)</li>
                <li>Bachelorette parties from €500 (3 hrs, gulet)</li>
                <li>Custom decoration, catering and photographer add-ons</li>
              </ul>
              <Link
                href="/private-events"
                className="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline"
              >
                View Private Events →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Corporate Boat Charter</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                Tailored for companies hosting team-building events, product launches, client entertainment, and conference gala dinners. Vessels accommodate 30–120 guests with catering, AV equipment, and branding options.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Corporate vessels from €800/hr (30–120 guests)</li>
                <li>Full catering — meze, grilled seafood, open bar</li>
                <li>AV system, microphone, presentation screen available</li>
                <li>Custom branding and signage on vessel</li>
              </ul>
              <Link
                href="/corporate-events"
                className="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline"
              >
                View Corporate Events →
              </Link>
            </div>
          </div>
        </section>

        {/* How to Book */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Book a Boat Rental in Istanbul — Step by Step
          </h2>
          <ol className="space-y-4">
            {howToJsonLd.step.map((step) => (
              <li key={step.position} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.position}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{step.name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What's Included */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is Included in Istanbul Boat Rental?
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Licensed captain with 10+ years Bosphorus experience",
              "Crew (1–3 members depending on vessel size)",
              "Life jackets and safety equipment (Turkish maritime code compliant)",
              "Fuel for the agreed route and duration",
              "Bosphorus route map and landmark guide",
              "Bluetooth speaker system on board",
              "Basic refreshments (water, soft drinks) for 2-hour charters",
              "TURSAB-licensed passenger insurance",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-3"
              >
                <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bosphorus Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Will You See on a Private Bosphorus Boat Rental?
          </h2>
          <p className="text-gray-600 mb-4">
            Your private boat navigates the full European and Asian Bosphorus shoreline, passing Istanbul&apos;s most iconic waterfront monuments:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Dolmabahçe Palace", desc: "600-metre marble Ottoman imperial palace on the waterfront" },
              { name: "Ortaköy Mosque", desc: "Iconic neo-baroque mosque beneath the Bosphorus Bridge" },
              { name: "Rumeli Hisarı Fortress", desc: "15th-century fortress built in 4 months for the siege of Constantinople" },
              { name: "Çırağan Palace", desc: "Historic palace now a luxury Kempinski hotel with private pier" },
              { name: "Maiden's Tower", desc: "Byzantine-era island tower in the middle of the strait" },
              { name: "Bosphorus Bridges", desc: "Two suspension bridges connecting Europe and Asia over the strait" },
            ].map((sight) => (
              <div key={sight.name} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{sight.name}</h3>
                <p className="text-gray-600 text-xs">{sight.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Boat Rental Istanbul — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.name}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Book Your Istanbul Boat Rental?
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Available 7 days a week. WhatsApp us for instant availability and pricing — or book online and receive immediate confirmation.
          </p>
          <a
            href="https://wa.me/905370406822?text=Hi%2C%20I%27d%20like%20to%20book%20a%20boat%20rental%20in%20Istanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mr-4 mb-2"
          >
            WhatsApp Enquiry
          </a>
          <Link
            href="/reservation"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-2"
          >
            Book Online Now
          </Link>
        </section>

        {/* Related Services */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Other Bosphorus Experiences
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "/yacht-charter-istanbul", label: "Yacht Charter Istanbul — from €280" },
              { href: "/istanbul-dinner-cruise", label: "Bosphorus Dinner Cruise — from €65" },
              { href: "/corporate-events", label: "Corporate Events on the Bosphorus" },
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
