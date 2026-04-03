import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Private Events Bosphorus | Birthday, Wedding & Celebration Cruises Istanbul",
  description:
    "Book a private event on the Bosphorus in Istanbul. Birthday parties, wedding celebrations, anniversaries & proposals on a private yacht from €280. Decoration, DJ, and catering included.",
  keywords: [
    "private events istanbul yacht",
    "birthday boat istanbul",
    "birthday party boat istanbul",
    "wedding celebration cruise bosphorus",
    "anniversary cruise istanbul",
    "proposal yacht istanbul",
    "bachelorette party boat istanbul",
    "private celebration bosphorus",
  ],
  alternates: { canonical: "https://merrysails.com/private-events" },
  openGraph: {
    title: "Private Events Bosphorus | Birthday, Wedding & Celebration Cruises Istanbul",
    description:
      "Private birthday parties, wedding celebrations, anniversaries, and proposals on the Bosphorus. From €280. Decoration, DJ, catering.",
    url: "https://merrysails.com/private-events",
    type: "website" as const,
    images: [
      {
        url: "https://merrysails.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Private celebration event on a Bosphorus yacht — MerrySails Istanbul",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Events on the Bosphorus Istanbul — Birthday, Wedding & Celebration Cruises",
  description:
    "Book a private yacht on the Bosphorus for birthday parties, wedding celebrations, proposals, anniversaries, and bachelorette parties. Fully customisable with decoration, DJ, and catering.",
  provider: {
    "@id": "https://merrysails.com/#organization",
  },
  areaServed: { "@type": "City", name: "Istanbul" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Private Event Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Essential",
        price: "280",
        priceCurrency: "EUR",
        description: "2-hour private yacht cruise for up to 15 guests. Captain, crew, refreshments.",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "380",
        priceCurrency: "EUR",
        description: "3-hour private cruise for up to 30 guests. Decoration, catering platter, open bar.",
      },
      {
        "@type": "Offer",
        name: "VIP",
        price: "680",
        priceCurrency: "EUR",
        description:
          "4-hour luxury yacht event for up to 60 guests. Full decoration, plated dinner, premium bar, DJ.",
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
      name: "How much does a private birthday boat party cost in Istanbul?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A private birthday boat in Istanbul starts from €280 for up to 15 guests (2 hours). Premium for 30 guests is €380 (3 hours, decoration included). VIP for 60 guests is €680 (4 hours, DJ + catering + full decoration). Prices are per vessel, not per person.",
      },
    },
    {
      "@type": "Question",
      name: "Can I organise a marriage proposal on a Bosphorus yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MerrySails specialises in Bosphorus proposal cruises. Our Romance package includes rose petal decoration, champagne, a professional photographer, and optional violinist. We coordinate the reveal moment so you can focus entirely on your partner.",
      },
    },
    {
      "@type": "Question",
      name: "Is a DJ available for birthday parties on the Bosphorus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A professional DJ with full sound system (speakers, subwoofer, mixer) is available for €180 per event (up to 4 hours). Music genres are specified in advance: Turkish pop, international, R&B, Latin, or a custom playlist.",
      },
    },
    {
      "@type": "Question",
      name: "What decoration is included in the private event packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decoration ranges from Basic (personalised banner, 20 balloons, floral centrepiece, €60) to Premium (balloon arch, full vessel decoration, fairy lights, photo corner, €220). All packages include the cake presentation ceremony coordinated with music and lighting.",
      },
    },
    {
      "@type": "Question",
      name: "How many guests can join a private event cruise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private event cruises accommodate 10 to 100 guests. Groups of 10–15 suit a gulet, 30–60 suit a mid-size event yacht, and 60–100 guests use our largest vessel or a two-vessel charter arrangement.",
      },
    },
    {
      "@type": "Question",
      name: "What events can I host on a private Bosphorus yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Birthday parties, wedding receptions and celebrations, marriage proposals, bachelorette and hen parties, anniversary cruises, family gatherings, graduation parties, and any private celebration can be hosted on a Bosphorus yacht with MerrySails.",
      },
    },
  ],
};

const eventTypes = [
  {
    icon: "🎂",
    title: "Birthday Parties",
    desc: "From 10 to 100 guests. Decoration packages, DJ, birthday cake, and catering. The Bosphorus backdrop makes every birthday unforgettable.",
    link: "/blog/birthday-party-boat-istanbul",
  },
  {
    icon: "💍",
    title: "Marriage Proposals",
    desc: "Bosphorus proposal packages with rose petals, champagne, photographer, and optional violinist. We coordinate the moment — you just ask.",
    link: "/cruises/yacht-charter-in-istanbul",
  },
  {
    icon: "🥂",
    title: "Wedding Celebrations",
    desc: "Wedding day cruises, after-party receptions, and pre-wedding events. Full catering, decoration, and entertainment for up to 100 guests.",
    link: "/private-tours",
  },
  {
    icon: "🎉",
    title: "Bachelorette & Hen Parties",
    desc: "Private yacht hen parties with DJ, open bar, custom decoration, and a Bosphorus route chosen for the best sunset and party atmosphere.",
    link: "/private-tours",
  },
  {
    icon: "🌅",
    title: "Anniversary Cruises",
    desc: "Private sunset or dinner cruise for two to twenty guests. Romantic decoration, champagne on arrival, and a custom cake for milestone anniversaries.",
    link: "/blog/bosphorus-sunset-cruise-istanbul",
  },
  {
    icon: "🎓",
    title: "Graduations & Milestones",
    desc: "Celebrate graduations, promotions, and personal milestones on the Bosphorus. Flexible catering and decoration to match your celebration style.",
    link: "/contact",
  },
];

const packages = [
  {
    name: "Essential",
    guests: "Up to 15",
    duration: "2 hrs",
    price: "€280",
    highlight: false,
    features: [
      "Fully private vessel",
      "Captain & crew",
      "Refreshments",
      "English guide",
      "Free cancellation (14+ days)",
    ],
  },
  {
    name: "Premium",
    guests: "Up to 30",
    duration: "3 hrs",
    price: "€380",
    highlight: true,
    features: [
      "Decoration package",
      "Catering platter",
      "Open bar",
      "Birthday cake optional",
      "Photo corner setup",
    ],
  },
  {
    name: "VIP",
    guests: "Up to 60",
    duration: "4 hrs",
    price: "€680",
    highlight: false,
    features: [
      "Full vessel decoration",
      "Plated dinner",
      "Premium bar",
      "DJ optional (+€180)",
      "Event coordinator on board",
    ],
  },
];

export default function PrivateEventsPage() {
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

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* Hero */}
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">
              Private Events on the Bosphorus
              <br className="hidden md:block" />
              <span className="text-[var(--brand-primary)]">
                {" "}Birthday, Wedding & Celebration Cruises Istanbul
              </span>
            </h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
              Celebrate any occasion on a fully private yacht on the Bosphorus. Birthday parties,
              proposals, wedding receptions, bachelorette cruises, and anniversaries — from 10 to
              100 guests. Decoration, DJ, and catering packages available. From €280.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
              >
                Book Your Private Event <ArrowRight className="w-4 h-4" />
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
          <div className="bg-pink-50 border-l-4 border-pink-400 rounded-r-xl p-5 mb-12 max-w-3xl mx-auto">
            <p className="text-[var(--heading)] font-medium">
              <strong>Quick answer:</strong> A private event boat in Istanbul starts from €280 for
              up to 15 guests (2 hours) — no shared passengers, fully private. Decoration packages
              from €60, DJ add-on from €180, catering from €18/person. Groups from 10 to 100 guests
              accommodated.
            </p>
          </div>

          {/* Event types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              What Type of Private Event Are You Planning?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map((event) => (
                <Link key={event.title} href={event.link} className="group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="text-3xl mb-3">{event.icon}</div>
                    <h3 className="font-bold text-[var(--heading)] mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Packages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Private Event Packages & Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-2xl p-6 shadow-sm ${
                    pkg.highlight
                      ? "bg-[var(--brand-primary)] text-white ring-2 ring-[var(--brand-primary)]"
                      : "bg-white"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="text-xs font-bold uppercase tracking-wide text-blue-200 mb-2">
                      Most Popular
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      pkg.highlight ? "text-white" : "text-[var(--heading)]"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      pkg.highlight ? "text-blue-200" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {pkg.guests} · {pkg.duration}
                  </p>
                  <p
                    className={`text-3xl font-black mb-5 ${
                      pkg.highlight ? "text-white" : "text-[var(--brand-primary)]"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2 text-sm ${
                          pkg.highlight ? "text-blue-100" : "text-[var(--text-muted)]"
                        }`}
                      >
                        <span
                          className={`font-bold ${pkg.highlight ? "text-white" : "text-[var(--brand-primary)]"}`}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                        pkg.highlight
                          ? "bg-white text-[var(--brand-primary)] hover:bg-blue-50"
                          : "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)]"
                      }`}
                    >
                      Book {pkg.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              * All prices are per vessel, not per person. Decoration (from €60), DJ (€180),
              catering (from €18/person), and birthday cake (from €65) are available as add-ons.
              Low season (November–March) rates are 15–20% lower.
            </p>
          </section>

          {/* Add-ons */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Popular Add-Ons for Private Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[var(--heading)] mb-3">Decoration Packages</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>
                    <strong className="text-[var(--heading)]">Basic — €60:</strong> Banner,
                    balloons, floral centrepiece, cake ceremony
                  </li>
                  <li>
                    <strong className="text-[var(--heading)]">Standard — €120:</strong> Balloon
                    arch, table centrepieces, rose petals, photo corner
                  </li>
                  <li>
                    <strong className="text-[var(--heading)]">Premium — €220:</strong> Full vessel
                    decoration, fairy lights, ceiling decor, custom banner
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[var(--heading)] mb-3">Entertainment & Catering</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>
                    <strong className="text-[var(--heading)]">DJ (4 hrs) — €180:</strong> Full
                    sound system, custom genre playlist
                  </li>
                  <li>
                    <strong className="text-[var(--heading)]">Cocktail catering — €18/person:</strong>{" "}
                    Turkish mezze, canapés, standing reception
                  </li>
                  <li>
                    <strong className="text-[var(--heading)]">Dinner — €38/person:</strong>{" "}
                    3-course plated meal with dietary options
                  </li>
                  <li>
                    <strong className="text-[var(--heading)]">Birthday cake — from €65:</strong>{" "}
                    Standard to custom design, serves 15–60
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">
              Frequently Asked Questions — Private Events Istanbul
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
              Related Pages & Planning Guides
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/blog/birthday-party-boat-istanbul", label: "Birthday Party Boat Guide" },
                { href: "/blog/bosphorus-sunset-cruise-istanbul", label: "Sunset Cruise Guide" },
                { href: "/blog/private-yacht-charter-istanbul-price", label: "Yacht Charter Prices" },
                { href: "/corporate-events", label: "Corporate Events" },
                { href: "/private-tours", label: "All Private Yacht Tours" },
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
              Ready to Plan Your Private Bosphorus Event?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Tell us the occasion, your guest count, and your preferred date. We will send a
              personalised proposal with decoration, catering, and entertainment options within 24
              hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Your Private Event <ArrowRight className="w-4 h-4" />
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
