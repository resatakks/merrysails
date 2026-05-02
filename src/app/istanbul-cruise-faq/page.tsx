import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  title: "Istanbul Bosphorus Cruise FAQ 2026: 60+ Answered Questions",
  description:
    "Comprehensive Istanbul Bosphorus cruise FAQ: prices, departure points, durations, dress code, weather policy, group discounts, kids, accessibility, dietary options. Direct answers from MerrySails (TURSAB-licensed since 2001).",
  alternates: {
    canonical: `${SITE_URL}/istanbul-cruise-faq`,
  },
  openGraph: {
    title: "Istanbul Bosphorus Cruise FAQ — 60+ Answered Questions 2026",
    description:
      "Everything you need to know about Bosphorus cruises: prices €30-€680, departure from Kabataş, year-round operation, multilingual guides, dietary and accessibility info.",
    url: `${SITE_URL}/istanbul-cruise-faq`,
    type: "article",
  },
};

const FAQ_SECTIONS: Array<{
  title: string;
  emoji: string;
  questions: Array<{ q: string; a: string }>;
}> = [
  {
    title: "Pricing & Packages",
    emoji: "💰",
    questions: [
      {
        q: "How much does a Bosphorus cruise cost in 2026?",
        a: "Bosphorus cruise prices in 2026 start at €30 per person for the Silver Soft Drinks dinner cruise and €34 per person for the sunset cruise without wine. Private yacht charter starts at €280 for the entire boat (up to 8 guests). All prices are EUR-fixed at booking and paid in TRY at the daily rate.",
      },
      {
        q: "What is the cheapest Bosphorus cruise in Istanbul?",
        a: "The cheapest live-guided Bosphorus cruise is the Sunset Cruise without wine at €34 per person for 2 hours, or the Silver Soft Drinks dinner cruise at €30 per person for 3.5 hours including dinner and Turkish night show.",
      },
      {
        q: "Are Bosphorus cruise prices per person or per boat?",
        a: "Shared cruises (Sunset, Dinner) are priced per person. Private yacht charters and hourly boat rentals are priced per boat — meaning you book the entire vessel for one flat fee, regardless of how many guests up to capacity.",
      },
      {
        q: "Do you offer group discounts?",
        a: "Yes. Groups of 10+ on shared cruises receive a discount. Corporate and event groups of 20+ get custom pricing on private charter. Contact WhatsApp +90 537 040 68 22 for a group quote.",
      },
      {
        q: "Are children's tickets cheaper?",
        a: "Yes. Children under 6 are free on shared cruises. Children 6–12 typically receive a 30–50% discount depending on the package. Children 13+ pay the adult rate.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept credit cards (Visa, Mastercard, Amex), bank transfer, and cash payment in TRY. Online bookings use secure card processing.",
      },
      {
        q: "Are there any hidden fees or port taxes?",
        a: "No. The price you see includes the captain, crew, maritime safety equipment, travel insurance, and port fees. Food and drinks are included as per package. The only additional cost would be optional add-ons you choose (extra drinks beyond your package, photographer, etc.).",
      },
      {
        q: "Can I cancel my booking?",
        a: "Yes. We offer free cancellation up to 48 hours before departure on all shared cruises and private charters. Cancellations within 48 hours may incur a fee depending on package type.",
      },
      {
        q: "Do you offer seasonal pricing or peak surcharges?",
        a: "No. MerrySails offers the same fixed prices year-round. There are no peak season surcharges, weekend premiums, or holiday pricing increases. Same quality, same price every day.",
      },
    ],
  },
  {
    title: "Departure & Logistics",
    emoji: "📍",
    questions: [
      {
        q: "Where do Bosphorus cruises depart from?",
        a: "Most MerrySails cruises depart from Kabataş on the European side of Istanbul. Private yacht charters can also depart from Beşiktaş or Bebek by request. Kabataş is reachable by Funicular F1 from Taksim, Tram T1 from Sultanahmet, or by car (paid parking nearby).",
      },
      {
        q: "Is hotel pickup included?",
        a: "Hotel pickup from Sultanahmet or Taksim is included in the Gold Unlimited Alcohol dinner package (€90/person) and is available as an add-on for other packages. Private charters can include pickup on request.",
      },
      {
        q: "How do I get to Kabataş Marina from Sultanahmet or Taksim?",
        a: "From Sultanahmet: take Tram T1 (Bağcılar–Kabataş line) directly to Kabataş station — about 15 minutes. From Taksim: walk down to Kabataş via Funicular F1 — about 3 minutes. Both options are well-signed and tourist-friendly.",
      },
      {
        q: "What time should I arrive before departure?",
        a: "Please arrive 20 minutes before scheduled departure. Sunset cruises depart approximately 1.5 hours before sunset (varies by season). Dinner cruises depart at 19:30 year-round. Boarding closes 5 minutes before departure.",
      },
      {
        q: "Where exactly is the boarding point at Kabataş?",
        a: "Boarding is at Kabataş Pier, accessed via the marina entrance just north of the Funicular station. After your booking confirmation, you'll receive a map pin via email and WhatsApp.",
      },
      {
        q: "Is parking available at Kabataş?",
        a: "Yes, paid parking is available at Kabataş Otopark next to the marina. We recommend public transport (tram or funicular) for easier access.",
      },
      {
        q: "Do you operate in winter?",
        a: "Yes, we operate year-round. Boats have heated indoor lounges and covered upper decks. Winter cruises (November–March) are quieter, equally beautiful, and same price as peak season.",
      },
      {
        q: "What happens if it rains or weather is bad?",
        a: "Cruises operate in light rain — boats have indoor seating with panoramic windows. Cruises are only cancelled in severe weather (high winds or storms) decided by the captain for safety. In that case, you receive a full refund or rebooking option.",
      },
    ],
  },
  {
    title: "What's Included & Onboard",
    emoji: "🍽️",
    questions: [
      {
        q: "What food is served on the dinner cruise?",
        a: "The dinner cruise menu includes Turkish mezzes (cold appetizers like hummus, eggplant salad, yogurt dip), warm starters (cigara böreği), a main course (chicken, fish, or vegetarian), and dessert. Gold packages include premium menu with extra appetizers and grilled meat options.",
      },
      {
        q: "Are vegetarian or vegan meals available?",
        a: "Yes. Vegetarian options are standard on all dinner cruises. Vegan and gluten-free meals are available on request — please specify dietary needs during booking via WhatsApp +90 537 040 68 22 or in the booking notes.",
      },
      {
        q: "Are halal meals available?",
        a: "Yes, all meat served on MerrySails dinner cruises is halal-certified. The kitchen is halal-only.",
      },
      {
        q: "What drinks are included?",
        a: "Silver Soft Drinks (€30): unlimited soft drinks, juice, water, tea, coffee. Silver Alcoholic (€45): above + local beer, wine, raki. Gold Soft Drinks (€80): premium soft drinks, juices. Gold Unlimited Alcohol (€90): unlimited local + imported alcohol.",
      },
      {
        q: "Is there a Turkish night show on the dinner cruise?",
        a: "Yes. The dinner cruise features a 60–75 minute Turkish night show including belly dance, folk dancers from various Turkish regions, fire show, and finale DJ set on Gold packages. Children-appropriate content.",
      },
      {
        q: "Is there a live guide on the cruise?",
        a: "Yes, the Sunset Cruise includes a live English-speaking guide explaining landmarks (Dolmabahçe Palace, Ortaköy Mosque, Bosphorus bridges, Beylerbeyi Palace). The dinner cruise focuses on dinner and entertainment but staff are bilingual. Audio guides are available in 12 languages.",
      },
      {
        q: "What languages are guides available in?",
        a: "Live guides primarily speak English and Turkish. Audio guides on the Sunset Cruise are available in 12 languages: English, Turkish, German, French, Spanish, Italian, Russian, Arabic, Chinese, Japanese, Korean, Portuguese.",
      },
      {
        q: "Can I drink alcohol on the cruise if I'm under 21?",
        a: "The legal drinking age in Turkey is 18. Guests 18+ can consume alcohol if their package includes it. We require ID verification at boarding for alcohol-included packages.",
      },
    ],
  },
  {
    title: "Routes & Sights",
    emoji: "🗺️",
    questions: [
      {
        q: "What landmarks do you see on a Bosphorus cruise?",
        a: "The standard Bosphorus cruise route from Kabataş passes Dolmabahçe Palace, Ortaköy Mosque, the 15 July Martyrs Bridge, Beylerbeyi Palace (Asian side), Çırağan Palace, Rumeli Fortress, Anadolu Fortress, and the Fatih Sultan Mehmet Bridge. Sunset cruise turns back near the second bridge.",
      },
      {
        q: "Does the cruise go to the Black Sea?",
        a: "No. Standard cruises stay within the Bosphorus strait between the European and Asian sides of Istanbul. They do not go up to the Black Sea — that would require a 6+ hour journey. The 2-hour cruise covers all the major landmarks within the Istanbul section.",
      },
      {
        q: "Do you cross to the Asian side of Istanbul?",
        a: "The Bosphorus cruise runs along the strait between European and Asian sides — you'll see Beylerbeyi Palace, Kuzguncuk, Çengelköy, and Anadolu Fortress on the Asian shore. The boat crosses back and forth multiple times for the best photo angles.",
      },
      {
        q: "Where can I take the best photos?",
        a: "The upper deck is best for photography — open-air with 360° views. Best landmarks for photos: Maiden's Tower (start of cruise), Ortaköy Mosque under the bridge, Çırağan Palace (golden hour), Rumeli Fortress, and the European-Asian shore split.",
      },
      {
        q: "Can I see Hagia Sophia from the Bosphorus?",
        a: "Yes, you'll see the historic peninsula skyline from the boat — including Hagia Sophia, Topkapı Palace, and the Blue Mosque silhouettes. The closest view is at the start/end of the cruise from Kabataş.",
      },
    ],
  },
  {
    title: "Booking & Customization",
    emoji: "📅",
    questions: [
      {
        q: "How far in advance should I book?",
        a: "Off-peak (November–March): 1–2 days in advance is fine. Peak season (June–September) and weekends: book 1–2 weeks ahead. Holidays (New Year's Eve, etc.): book 4+ weeks ahead.",
      },
      {
        q: "Can I book a private yacht for a marriage proposal?",
        a: "Yes, this is one of our most popular services. The Premium private yacht (€380, up to 12 guests) is most popular for proposals. We can arrange decoration, optional photographer, custom cake, and music. Contact WhatsApp +90 537 040 68 22 to plan.",
      },
      {
        q: "Can I rent a boat for a corporate event?",
        a: "Yes. We offer corporate event yacht charters with customized food, drinks, presentation equipment, branded décor, and entertainment. Capacity ranges from 12 to 200 guests across our fleet.",
      },
      {
        q: "Do you offer birthday party cruises?",
        a: "Yes. Private yacht charters are popular for birthdays. We can arrange birthday cake, decoration, custom playlist, and DJ services as add-ons.",
      },
      {
        q: "Can I customize the route on a private cruise?",
        a: "Yes. Private yacht charters and hourly boat rentals offer flexible routes — extended Bosphorus tour, Princes' Islands stop, anchored sunset photography, or custom itineraries. Discuss with our team during booking.",
      },
      {
        q: "Do you offer wedding cruises?",
        a: "Yes. We have hosted full wedding ceremonies and receptions on yacht charters. Capacity up to 200 guests with catering, decoration, and entertainment partnerships.",
      },
    ],
  },
  {
    title: "Accessibility & Safety",
    emoji: "♿",
    questions: [
      {
        q: "Are the boats wheelchair accessible?",
        a: "Most boats have ground-floor lounges accessible via the boarding ramp. Upper decks require stairs. Please notify us in advance via WhatsApp so we can assign the most accessible vessel and assist with boarding.",
      },
      {
        q: "Are children safe on the cruise?",
        a: "Yes. Children's life jackets are available on board. Our boats meet Turkish maritime safety standards including TURSAB regulations. Children must be accompanied by an adult at all times.",
      },
      {
        q: "Are pets allowed?",
        a: "Service animals are welcome. For other pets, please contact us in advance — small pets may be allowed on private charters with prior approval, but not on shared cruises.",
      },
      {
        q: "What safety equipment is on board?",
        a: "All boats carry life jackets for every passenger, life rings, fire extinguishers, GPS, marine radio, and first-aid kits. Crew are trained in maritime safety. Travel insurance is included in the ticket price.",
      },
      {
        q: "What is the dress code?",
        a: "Smart-casual is recommended for the dinner cruise. Sunset cruise is casual. Bring a light jacket — even in summer, evenings on the water can be cool. Closed shoes recommended for safety.",
      },
    ],
  },
  {
    title: "Trust & Verification",
    emoji: "✅",
    questions: [
      {
        q: "Is MerrySails licensed?",
        a: "Yes. MerrySails is operated by Merry Tourism, a TURSAB A-Group licensed travel agency since 2001 (License #14316). TURSAB A-Group is the highest category of Turkish travel agency licensing, requiring full insurance, financial guarantees, and government oversight.",
      },
      {
        q: "How long has MerrySails been operating?",
        a: "We have been operating Bosphorus cruise and yacht charter services in Istanbul since 2001 — over 25 years. We have hosted more than 50,000 guests across all our cruise types.",
      },
      {
        q: "Where can I read reviews?",
        a: "MerrySails has 4.9★ average rating across Google, TripAdvisor, and Viator combined. You can read recent reviews on our Google Business profile, TripAdvisor listing, or directly on our cruise pages.",
      },
      {
        q: "What if I'm unsatisfied with my cruise?",
        a: "Contact us immediately via WhatsApp +90 537 040 68 22 or info@merrysails.com. We respond within 24 hours and resolve concerns directly. As a TURSAB-licensed operator, customers also have recourse through TURSAB if needed — though in 25 years of operation we resolve nearly all concerns directly.",
      },
    ],
  },
];

export default function CruiseFAQPage() {
  const allQuestions = FAQ_SECTIONS.flatMap((s) => s.questions);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Istanbul Bosphorus Cruise FAQ 2026",
    description:
      "60+ frequently asked questions about Bosphorus cruises in Istanbul: prices, logistics, food, accessibility, safety, booking customization.",
    author: {
      "@type": "Organization",
      name: "MerrySails",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "MerrySails",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
    mainEntityOfPage: `${SITE_URL}/istanbul-cruise-faq`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-16">
        <header className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
            Knowledge Base · Updated May 2026
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">
            Istanbul Bosphorus Cruise FAQ
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            {allQuestions.length}+ direct answers to the most common questions
            about Bosphorus cruises in Istanbul. Drawn from 25 years of
            operation and 50,000+ hosted guests.
          </p>
        </header>

        {/* Quick navigation */}
        <nav className="mb-12 rounded-2xl bg-slate-50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Jump to section
          </p>
          <div className="flex flex-wrap gap-2">
            {FAQ_SECTIONS.map((s) => {
              const id = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <a
                  key={s.title}
                  href={`#${id}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-orange-50 hover:text-orange-700"
                >
                  <span>{s.emoji}</span>
                  <span>{s.title}</span>
                  <span className="text-slate-400">({s.questions.length})</span>
                </a>
              );
            })}
          </div>
        </nav>

        {FAQ_SECTIONS.map((section) => {
          const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={section.title} id={id} className="mb-12 scroll-mt-20">
              <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-slate-900">
                <span className="text-3xl">{section.emoji}</span>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.questions.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-slate-900">
                      <span className="mr-2 inline-block text-orange-600 transition group-open:rotate-90">
                        ›
                      </span>
                      {f.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-slate-900 px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">
            Question not answered?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            Our team responds on WhatsApp typically within 5 minutes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#1faa54]"
            >
              WhatsApp +90 537 040 68 22
            </a>
            <Link
              href="/compare-bosphorus-cruises"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Compare cruise options →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
