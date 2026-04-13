import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Corporate Yacht Event Turkey | Team Building Bosphorus Istanbul",
  description:
    "Organise a corporate yacht event in Turkey on the Bosphorus. Team building Bosphorus cruises for 10–100 guests from €280. AV equipment, catering, official invoicing. Book direct.",
  keywords: [
    "corporate yacht event turkey",
    "corporate yacht event istanbul",
    "team building bosphorus",
    "team building bosphorus cruise",
    "corporate events istanbul boat",
    "corporate boat hire istanbul",
    "company event istanbul",
    "corporate yacht istanbul",
    "team building istanbul",
    "corporate cruise bosphorus",
    "business event yacht istanbul",
  ],
  alternates: { canonical: "https://merrysails.com/corporate-events" },
  openGraph: {
    title: "Corporate Events on the Bosphorus | Team Building & Company Cruises Istanbul",
    description:
      "Private corporate cruises on the Bosphorus for 10–100 guests. AV equipment, catering, official invoicing. From €280.",
    url: "https://merrysails.com/corporate-events",
    type: "website" as const,
    images: [
      {
        url: "https://merrysails.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Corporate event on a private yacht on the Bosphorus — MerrySails Istanbul",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Yacht Event Turkey — Team Building Bosphorus Istanbul",
  description:
    "Corporate yacht events in Turkey on the Bosphorus Istanbul. Team building cruises, client entertainment, product launches, and company parties. Private vessels for 10–100 guests from €280. AV equipment, catering, and official Turkish invoicing available.",
  provider: {
    "@id": "https://merrysails.com/#organization",
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Corporate Event Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Basic Corporate",
        price: "280",
        priceCurrency: "EUR",
        description: "2-hour private cruise for up to 15 guests. Captain, crew, refreshments, English guide.",
      },
      {
        "@type": "Offer",
        name: "Standard Corporate",
        price: "550",
        priceCurrency: "EUR",
        description: "3-hour private cruise for up to 30 guests. Catering, open bar, AV setup.",
      },
      {
        "@type": "Offer",
        name: "Premium Corporate",
        price: "1200",
        priceCurrency: "EUR",
        description: "4-hour private cruise for up to 60 guests. Plated dinner, full bar, AV, MC.",
      },
      {
        "@type": "Offer",
        name: "Exclusive Corporate",
        price: "1800",
        priceCurrency: "EUR",
        description: "4–6 hour multi-vessel event for up to 120 guests. Full catering, AV, photographer, dedicated coordinator.",
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a corporate boat event cost in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Corporate boat hire in Istanbul starts from €280 for the Essential package (up to 15 guests, 2 hours). Business Premium for 30 guests is from €520 (3 hours). Executive for 60 guests from €980 (4 hours). Full fleet events for 100 guests from €1,800. Catering and AV are available as add-ons.",
      },
    },
    {
      "@type": "Question",
      name: "Can we get an official Turkish invoice for a corporate cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails issues official Turkish fatura (tax invoices) with full VAT breakdown for all corporate bookings. English-language proforma invoices are also provided for international corporate expense processing.",
      },
    },
    {
      "@type": "Question",
      name: "Is AV equipment available for presentations on the yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Basic AV includes wireless microphones and Bluetooth speakers. Full AV adds a 100-inch retractable projection screen with HDMI projector and LED uplighting. Must be confirmed 7 days before the event.",
      },
    },
    {
      "@type": "Question",
      name: "What catering is available for corporate groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Catering ranges from cocktail platters (Turkish mezze, canapés, €18/person) to full plated dinners (3-course, €38/person). Halal, vegetarian, vegan, and gluten-free options available with 48 hours notice.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum group size for a corporate Bosphorus cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MerrySails accommodates corporate groups from 10 to 100 guests. Groups over 60 use our largest event yacht or a multi-vessel charter arrangement. Groups over 100 are possible with 30+ days advance notice.",
      },
    },
    {
      "@type": "Question",
      name: "What types of corporate events work on a yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Team building cruises, client entertainment events, product launches, annual company parties, end-of-year celebrations, board dinners, incentive travel reward events, and project completion dinners all work well on the Bosphorus. The private vessel format ensures no distractions.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Book a Corporate Boat Event in Istanbul",
  description: "Step-by-step guide to booking a corporate cruise on the Bosphorus with MerrySails.",
  step: [
    {
      "@type": "HowToStep",
      name: "Submit your event brief",
      text: "Contact MerrySails via email (info@merrysails.com) or WhatsApp (+90 537 040 68 22) with your event date, guest count, event type, and any requirements (AV, catering, dietary needs).",
    },
    {
      "@type": "HowToStep",
      name: "Receive and review proposal",
      text: "Within 24 hours you will receive a personalised proposal with vessel options, pricing, catering menu, and availability confirmation.",
    },
    {
      "@type": "HowToStep",
      name: "Confirm and pay deposit",
      text: "Approve the proposal and pay the 50% deposit by bank transfer, credit card, or — for Istanbul clients — cash. Booking confirmation and official proforma invoice are issued immediately.",
    },
    {
      "@type": "HowToStep",
      name: "Coordinate logistics",
      text: "In the 7 days before the event, finalise the run sheet, catering menu, guest count, AV requirements, and any special arrangements with your MerrySails event coordinator.",
    },
    {
      "@type": "HowToStep",
      name: "Pay final balance",
      text: "The remaining 50% is due 3 business days before the event. Full invoice with VAT breakdown is issued upon final payment.",
    },
    {
      "@type": "HowToStep",
      name: "Board and enjoy",
      text: "On the event day, guests board 30–45 minutes before departure. The onboard event coordinator manages catering timing, AV, and logistics throughout the cruise.",
    },
  ],
};

const packages = [
  {
    name: "Basic",
    guests: "Up to 15",
    duration: "2 hours",
    price: "€280",
    includes: ["Captain & crew", "Refreshments", "English guide", "Official invoice"],
    highlight: false,
  },
  {
    name: "Standard",
    guests: "Up to 30",
    duration: "3 hours",
    price: "€550",
    includes: ["Catering platter", "Open bar", "AV basic setup", "Official invoice"],
    highlight: false,
  },
  {
    name: "Premium",
    guests: "Up to 60",
    duration: "4 hours",
    price: "€1,200",
    includes: ["Plated dinner", "Full open bar", "Full AV + projector", "MC, Official invoice"],
    highlight: true,
  },
  {
    name: "Exclusive",
    guests: "Up to 120",
    duration: "4–6 hours",
    price: "€1,800+",
    includes: [
      "Multi-vessel option",
      "Full catering",
      "AV + photographer",
      "Dedicated coordinator, Official invoice",
    ],
    highlight: false,
  },
];

const avCateringTable = [
  { item: "Wireless microphone + Bluetooth speakers", category: "AV", price: "Included from Standard" },
  { item: "100-inch retractable screen + HDMI projector", category: "AV", price: "Included from Premium" },
  { item: "LED uplighting in corporate brand colours", category: "AV", price: "from €80" },
  { item: "4G/5G live streaming setup", category: "AV", price: "from €120" },
  { item: "Cocktail platters — Turkish mezze & canapés", category: "Catering", price: "from €18/person" },
  { item: "3-course plated dinner", category: "Catering", price: "from €38/person" },
  { item: "Full open bar (alcoholic + non-alcoholic)", category: "Catering", price: "from €25/person" },
  { item: "Non-alcoholic beverages package", category: "Catering", price: "from €12/person" },
  { item: "Halal / vegetarian / vegan menu (48 hrs notice)", category: "Catering", price: "No surcharge" },
];

export default function CorporateEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">
              Corporate Yacht Event Turkey
              <br className="hidden md:block" />
              <span className="text-[var(--brand-primary)]">
                {" "}Team Building Bosphorus Istanbul
              </span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
              Book a fully private vessel on the Bosphorus for team building, client
              entertainment, product launches, or company celebrations. Groups from 10 to 100
              guests. AV equipment, catering, and official Turkish invoicing available. From €280.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
              >
                Request a Corporate Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
              >
                WhatsApp: +90 537 040 68 22
              </a>
            </div>
          </div>

          {/* Answer capsule */}
          <div className="bg-blue-50 border-l-4 border-[var(--brand-primary)] rounded-r-xl p-5 mb-12 max-w-3xl mx-auto">
            <p className="text-[var(--heading)] font-medium">
              <strong>Quick answer:</strong> Corporate boat hire in Istanbul starts from €280 for
              up to 15 guests (2 hours) on a fully private vessel. Packages scale to €1,800+ for
              100-guest fleet events with AV, catering, and a dedicated event coordinator. All
              bookings include official Turkish fatura invoicing.
            </p>
          </div>

          <section className="mb-16 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">
              Fastest Path to the Right Corporate Cruise
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
              Corporate enquiries usually close faster when the guest count, event format, and the
              real objective are clear from the first message. Use the closest entry point below
              before you request a quote.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/yacht-charter-istanbul",
                  title: "Need a flexible private yacht",
                  description:
                    "Best when the timing, route, guest count, and onboard setup still need to be shaped around your event brief.",
                },
                {
                  href: "/private-events",
                  title: "Celebration rather than B2B",
                  description:
                    "Choose this when the request is really a birthday, proposal, anniversary, or private celebration instead of a corporate format.",
                },
                {
                  href: "/istanbul-dinner-cruise",
                  title: "Dinner-first format",
                  description:
                    "Start here when catering and a ready-made Bosphorus dinner flow matter more than a custom corporate run sheet.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-white bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-100/40"
                >
                  <span className="block text-base font-semibold text-[var(--heading)] mb-1">
                    {item.title}
                  </span>
                  <span className="block text-sm text-[var(--text-muted)]">{item.description}</span>
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-dashed border-blue-200 bg-white/70 p-4">
              <h3 className="text-base font-semibold text-[var(--heading)] mb-2">
                4 Details That Speed Up the Quote
              </h3>
              <ul className="grid gap-2 text-sm text-[var(--text-muted)] md:grid-cols-2">
                {[
                  "Preferred event date and boarding time",
                  "Expected guest count and whether international guests are attending",
                  "Need for dinner, open bar, AV, photographer, MC, or branding",
                  "Invoice name and whether you need a Turkish fatura or English proforma first",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Packages table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Corporate Event Packages & Pricing
            </h2>
            <div className="overflow-x-auto rounded-2xl shadow-sm">
              <table className="w-full bg-white text-sm">
                <thead className="bg-[var(--brand-primary)] text-white">
                  <tr>
                    <th className="text-left px-5 py-4 font-semibold">Package</th>
                    <th className="text-left px-5 py-4 font-semibold">Guests</th>
                    <th className="text-left px-5 py-4 font-semibold">Duration</th>
                    <th className="text-left px-5 py-4 font-semibold">Price From</th>
                    <th className="text-left px-5 py-4 font-semibold">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, i) => (
                    <tr
                      key={pkg.name}
                      className={pkg.highlight ? "bg-blue-50 border-l-4 border-[var(--brand-primary)]" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-5 py-4 font-semibold text-[var(--heading)]">
                        {pkg.name}{pkg.highlight && <span className="ml-2 text-xs bg-[var(--brand-primary)] text-white px-2 py-0.5 rounded-full">Most Popular</span>}
                      </td>
                      <td className="px-5 py-4 text-[var(--text-muted)]">{pkg.guests}</td>
                      <td className="px-5 py-4 text-[var(--text-muted)]">{pkg.duration}</td>
                      <td className="px-5 py-4 font-bold text-[var(--brand-primary)]">
                        {pkg.price}
                      </td>
                      <td className="px-5 py-4 text-[var(--text-muted)]">
                        {pkg.includes.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              * Catering and AV equipment are available as add-ons priced separately. Low season
              (November–March) rates are approximately 15–20% lower. Contact us for a custom
              quote.
            </p>
          </section>

          {/* Why Istanbul */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Why Istanbul for Corporate Events?
            </h2>
            <p className="text-[var(--text-muted)] mb-6 max-w-3xl leading-relaxed">
              Istanbul is one of Europe&apos;s top corporate event destinations — a city that straddles two continents, offers world-class hospitality infrastructure, and delivers dramatic scenery that no conference room can replicate. When you take your corporate event onto the Bosphorus, you are hosting it on a strait that connects the Black Sea to the Sea of Marmara, flanked by 2,500 years of Ottoman and Byzantine history.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  title: "Strategic location",
                  body: "Istanbul's position between Europe and the Middle East makes it ideal for international corporate gatherings. Direct flights from 300+ cities. Visa-on-arrival or e-visa for most nationalities.",
                },
                {
                  title: "Cost advantage",
                  body: "Corporate yacht events in Istanbul cost 40–60% less than equivalent events in London, Paris, or Dubai. The euro/TL exchange rate provides significant value for European and international companies.",
                },
                {
                  title: "Year-round venue",
                  body: "Unlike outdoor venues in northern Europe, Istanbul's mild climate and enclosed heated yacht decks mean corporate yacht events in Turkey operate comfortably 12 months per year.",
                },
                {
                  title: "Memorable wow factor",
                  body: "Sailing past illuminated Ottoman palaces while hosting a product launch or team dinner creates genuine emotion and lasting memory — far beyond what a hotel ballroom can achieve.",
                },
                {
                  title: "Logistics & infrastructure",
                  body: "Istanbul has two international airports, 5-star hotel capacity exceeding 50,000 rooms, and a mature MICE industry. MerrySails coordinates all on-water logistics so you focus on your agenda.",
                },
                {
                  title: "Official invoicing",
                  body: "All MerrySails corporate bookings include official Turkish fatura (tax invoices) with full VAT breakdown — essential for international corporate expense processing.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Bosphorus for corporate */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 text-[var(--heading)]">
              Why Choose a Bosphorus Cruise for Team Building?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Zero distractions",
                  body: "On a private vessel, there are no other companies, no shared spaces, and no reason to check email. Team interaction is natural and sustained.",
                },
                {
                  title: "Memorable setting",
                  body: "Istanbul's Bosphorus — two continents, 14 historic landmarks, and one of the world's most dramatic waterfronts — creates events employees and clients remember for years.",
                },
                {
                  title: "Fully private",
                  body: "Every corporate booking is fully private. No shared-tour passengers. No public deck. The vessel, its route, and its schedule are organised around your agenda.",
                },
                {
                  title: "Year-round operation",
                  body: "Enclosed, heated lower decks make Bosphorus corporate events viable in winter. Summer events use open-air upper decks with unobstructed views.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AV & Catering Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              AV Equipment &amp; Catering Options — Full Menu
            </h2>
            <div className="overflow-x-auto rounded-2xl shadow-sm">
              <table className="w-full bg-white text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Item</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Category</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {avCateringTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 text-[var(--heading)]">{row.item}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.category === "AV" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-semibold text-[var(--brand-primary)]">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              * Halal, vegetarian, vegan, and gluten-free diets accommodated with 48 hours&apos; notice. Non-alcoholic packages available.
            </p>
          </section>

          {/* Case Study / Testimonial */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Real Corporate Event — Case Study
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-[var(--brand-primary)]">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <p className="font-bold text-[var(--heading)]">Leading European Tech Company — 40-Person Team Building Event</p>
                  <p className="text-sm text-[var(--text-muted)]">Premium Package · 4 hours · Gulet on the Bosphorus · September 2025</p>
                </div>
              </div>
              <blockquote className="text-[var(--text-muted)] leading-relaxed mb-4 italic">
                &ldquo;We brought 40 colleagues to Istanbul for our annual strategy offsite. MerrySails arranged a 4-hour Bosphorus cruise with a full mezze dinner, open bar, and a 100-inch projection screen for our leadership presentation. The AV setup worked flawlessly even on the water — our presenter was delighted. Watching the Ortaköy Mosque and Bosphorus Bridge pass by during our Q&amp;A session was genuinely extraordinary. Our team rated it the best company event in five years. The official Turkish invoice was provided within 24 hours for our finance team. Booking was handled in under 48 hours via WhatsApp. We are already planning the next one.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                <p className="text-sm font-semibold text-[var(--heading)]">Head of People Operations</p>
                <span className="text-[var(--text-muted)] text-sm">· Enterprise Software Company, Amsterdam</span>
              </div>
            </div>
          </section>

          {/* B2B Billing Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Invoice &amp; B2B Billing
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[var(--heading)] mb-3">Official Turkish Invoice (Fatura)</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span>All corporate bookings receive an official Turkish <em>e-fatura</em> (e-invoice)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span>Full VAT breakdown (KDV) included — suitable for corporate expense reporting</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span>English-language proforma invoice provided on booking confirmation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span>Final Turkish fatura issued within 24 hours of event completion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span>Available in PDF and e-invoice XML format for ERP system upload</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[var(--heading)] mb-3">Payment Options for Companies</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span><strong>Bank transfer:</strong> EUR, USD, TRY accepted — IBAN details on proforma</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span><strong>Credit card:</strong> Visa, Mastercard, Amex via secure payment link</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span><strong>Corporate purchase order:</strong> accepted for repeat clients (pre-agreed terms)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span><strong>Deposit structure:</strong> 50% on booking, 50% 3 days before event</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--brand-primary)] font-bold">✓</span>
                    <span><strong>Currency:</strong> prices quoted in EUR; TRY invoices issued at official TCMB rate</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to book */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              How to Book a Corporate Cruise in Istanbul
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Submit event brief",
                  body: "Email or WhatsApp us your event date, guest count, event type, and requirements. We respond within 24 hours with a personalised proposal.",
                },
                {
                  step: "02",
                  title: "Confirm & deposit",
                  body: "Approve the proposal and pay 50% deposit. Booking confirmation and proforma invoice issued immediately. Official fatura on final payment.",
                },
                {
                  step: "03",
                  title: "Coordinate & cruise",
                  body: "Finalise logistics 7 days before. Pay balance 3 days before. Board on the day — our coordinator manages everything on board.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-black text-[var(--brand-primary)] mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Frequently Asked Questions — Corporate Events Istanbul
            </h2>
            <div className="space-y-4 max-w-3xl">
              {faqSchema.mainEntity.map((faq) => (
                <div key={faq.name} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{faq.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-4 text-[var(--heading)]">
              Related Pages & Resources
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/blog/corporate-boat-hire-istanbul", label: "Corporate Boat Hire Guide" },
                { href: "/private-events", label: "Private Events (Birthday, Wedding)" },
                { href: "/private-tours", label: "Private Yacht Charter" },
                { href: "/blog/private-yacht-charter-istanbul-price", label: "Yacht Charter Prices" },
                { href: "/blog/istanbul-boat-tour-price-2026", label: "Boat Tour Prices 2026" },
                { href: "/contact", label: "Contact & Booking" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-[var(--brand-primary)] border border-[var(--brand-primary)] px-4 py-2 rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                >
                  {link.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[var(--brand-primary)] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Plan Your Corporate Event on the Bosphorus?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Send us your event brief and receive a personalised proposal within 24 hours. AV,
              catering, and official invoicing included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Get a Corporate Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[var(--brand-primary)] transition-colors"
              >
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
