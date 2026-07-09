import type { Metadata } from "next";
import Link from "next/link";
import { buildHreflang } from "@/lib/hreflang";
import QuickAnswer from "@/components/ai/QuickAnswer";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
 title: "Compare Bosphorus Cruises Istanbul",
 description:
 "Compare Bosphorus cruise options in Istanbul: Sunset (€34), Dinner (€30), Yacht Charter (€220), and Boat Rental — prices, durations, and best-for criteria.",
 alternates: {
 canonical: `${SITE_URL}/compare-bosphorus-cruises`,
 languages: buildHreflang("/compare-bosphorus-cruises"),
 },
 openGraph: {
 title: "Compare Bosphorus Cruises Istanbul",
 description:
 "All Bosphorus cruise options compared: prices from €30 to €500, durations 2–4 hours, shared vs private. Pick the right cruise in 2 minutes.",
 url: `${SITE_URL}/compare-bosphorus-cruises`,
 type: "article",
 },
};

const CRUISE_OPTIONS = [
 {
 name: "Bosphorus Sunset Cruise",
 slug: "/cruises/bosphorus-sunset-cruise",
 type: "Shared",
 duration: "2 hours",
 priceFrom: 34,
 priceTo: 40,
 priceNote: "per person",
 capacity: "Up to 80",
 includes: ["Live English-speaking guide", "Hot & cold drinks", "Snack platter"],
 excludes: ["Dinner", "Hotel pickup"],
 departTime: "1.5h before sunset",
 bestFor: "Couples, photographers, first-time visitors on a budget",
 rating: 4.9,
 reviews: 1842,
 },
 {
 name: "Bosphorus Dinner Cruise",
 slug: "/bosphorus-dinner-cruise-istanbul",
 type: "Shared",
 duration: "3.5 hours",
 priceFrom: 30,
 priceTo: 90,
 priceNote: "per person",
 capacity: "Up to 200",
 includes: ["Live guide", "Mezzes + main course", "Drinks (per package)", "Turkish night show", "DJ (Gold)"],
 excludes: ["Hotel pickup (except Gold Unlimited)"],
 departTime: "19:30 (year-round)",
 bestFor: "Group dinners, full-evening entertainment, foodies",
 rating: 4.88,
 reviews: 312,
 },
 {
 name: "Private Yacht Charter",
 slug: "/yacht-charter-istanbul",
 type: "Private",
 duration: "2 hours (extendable)",
 // Entry price is €220 for the Boutique Yacht (up to 12 guests, 2h)
 // per src/data/fleet.ts — the per-vessel fleet floor.
 priceFrom: 220,
 priceTo: 680,
 priceNote: "per boat (entire vessel)",
 capacity: "Up to 150",
 includes: ["Captain & crew", "Soft drinks / snacks", "Custom route", "10% off from 3 hours"],
 excludes: ["Catering / alcohol (add-on)", "Photographer (add-on)"],
 departTime: "Flexible (your time)",
 bestFor: "Proposals, birthdays, anniversaries, corporate events",
 rating: 4.9,
 reviews: 248,
 },
 {
 name: "Hourly Boat Rental",
 slug: "/boat-rental-istanbul",
 type: "Private",
 duration: "2 hours minimum",
 // Minimum 2h means effective entry €220 (same Boutique Yacht, up to 12
 // guests). Aligned with the fleet floor; per-hour notation in priceNote.
 priceFrom: 220,
 priceTo: 1800,
 priceNote: "per boat, 2h minimum (10% off from 3h)",
 capacity: "Up to 150",
 includes: ["Captain & crew", "Soft drinks / snacks", "Optional catering"],
 excludes: ["Standard menu (add-on)"],
 departTime: "Flexible",
 bestFor: "Custom itineraries, photography sessions, video shoots",
 rating: 4.8,
 reviews: 96,
 },
];

const COMPARE_FAQ = [
 {
 q: "Which Bosphorus cruise is the cheapest in Istanbul?",
 a: "The Bosphorus Sunset Cruise (without wine) at €34 per person is the cheapest live-guided shared cruise. The Silver Soft Drinks dinner cruise at €30 per person is technically lower but includes a longer 3.5-hour experience with dinner and show.",
 },
 {
 q: "What's the difference between a sunset cruise and a dinner cruise?",
 a: "The sunset cruise is a 2-hour daytime-into-evening tour focused on Bosphorus sightseeing with refreshments only. The dinner cruise is a 3.5-hour evening experience with full Turkish dinner, alcoholic or soft drinks, and traditional Turkish night show with belly dance and folk performances.",
 },
 {
 q: "Is a private yacht worth it for couples?",
 a: "Yes, if you want privacy for a proposal, anniversary, or romantic dinner. The Boutique Yacht (entry tier) at €220 covers up to 12 guests for 2 hours — for couples that's about €100 per person versus €34 on a shared sunset cruise. The premium is the privacy and custom route.",
 },
 {
 q: "Which cruise has the best Turkish dinner show?",
 a: "The Gold Unlimited Alcohol package (€90/person) on the dinner cruise has VIP stage-close seating with the full Turkish night show including belly dance, folk dancers, and DJ — and includes hotel pickup from Sultanahmet or Taksim.",
 },
 {
 q: "Are dinner cruise prices really €30 per person?",
 a: "Yes, the Silver Soft Drinks package starts at €30 per person and includes mezze starters, main course, unlimited soft drinks, and the Turkish night show. Alcoholic drinks and VIP seating are upgrade options at €45, €80, or €90.",
 },
 {
 q: "What is included in the €220 yacht charter entry?",
 a: "The Boutique Yacht (entry tier) at €220 covers the entire boat (private charter) for 2 hours, up to 12 guests, with captain, crew, soft drinks, and snacks. The Group Yacht 40 (up to 40 guests) is the next tier from €380, rising to €500 (Signature) — up to €1,800 for an 8-hour Signature sailing. The 90-guest event yacht and 150-guest mega yacht are by quote. From 3 hours onward, a 10% automatic discount applies fleet-wide.",
 },
 {
 q: "Can I bring children on a Bosphorus cruise?",
 a: "Yes. All cruises welcome children. Infants under 3 are free on shared cruises. Children 3–13 receive a 50% discount on the per-person price — contact via WhatsApp +90 544 898 98 12 for child rates.",
 },
 {
 q: "Which cruise is best for a marriage proposal?",
 a: "A private yacht charter is most popular for proposals — base charter from €220 per vessel, with decoration, optional cake and photographer arranged on request, and you choose the timing and route. The boat is fully private so the moment is uninterrupted. WhatsApp +90 544 898 98 12 for a precise quote.",
 },
];

const COMPARE_FAQ_RU = [
 {
 q: "Какой круиз по Босфору самый доступный по цене?",
 a: "Самый доступный — закатный круиз по Босфору от 34 EUR с человека или ужин-круиз пакет Silver от 30 EUR с человека. Все цены указаны для лицензированного оператора TÜRSAB Группы А. Уточнить актуальные тарифы можно в WhatsApp.",
 },
 {
 q: "От какого причала отправляются круизы по Босфору?",
 a: "Закатные и обзорные круизы отправляются с причала Кабаташ (Kabataş). Ужин-круизы — также с Кабаташа. Частные яхты могут отправляться с пирсов Кабаташ или Куручешме (Kuruçeşme). Точное место сообщается после бронирования через WhatsApp.",
 },
 {
 q: "Что включено в стоимость ужин-круиза?",
 a: "В пакет Silver (от 30 EUR) включены: мезе, основное блюдо, безалкогольные напитки и турецкое шоу с танцем живота. Пакет Gold Unlimited Alcohol (90 EUR) добавляет VIP-места, неограниченный алкоголь и трансфер от отеля. Все услуги по лицензии TÜRSAB Группы А.",
 },
 {
 q: "Какой круиз выбрать для семьи с детьми?",
 a: "Для семей с детьми оптимален закатный обзорный круиз — 2 часа, безопасный формат, мягкое время. Дети до 3 лет бесплатно, детям 3–13 лет скидка 50%. Уточните тарифы для детей в WhatsApp перед бронированием.",
 },
];

export default function CompareCruisesPage() {
 const articleSchema = {
 "@context": "https://schema.org",
 "@type": "Article",
 headline: "Compare Bosphorus Cruises Istanbul 2026",
 description:
 "Side-by-side comparison of Bosphorus cruise options in Istanbul: Sunset, Dinner, Private Yacht, and Hourly Boat Rental.",
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
 mainEntityOfPage: `${SITE_URL}/compare-bosphorus-cruises`,
 };

 const itemListSchema = {
 "@context": "https://schema.org",
 "@type": "ItemList",
 name: "Bosphorus Cruise Options Istanbul",
 alternateName: [
 "Bosphorus Cruise Options Istanbul",
 "Сравнение круизов по Босфору в Стамбуле",
 "Варианты круизов по Босфору 2026",
 ],
 itemListElement: CRUISE_OPTIONS.map((c, i) => ({
 "@type": "ListItem",
 position: i + 1,
 item: {
 "@type": "TouristTrip",
 name: c.name,
 url: `${SITE_URL}${c.slug}`,
 offers: {
 "@type": "AggregateOffer",
 lowPrice: c.priceFrom,
 highPrice: c.priceTo,
 priceCurrency: "EUR",
 },
 // aggregateRating intentionally removed — TouristTrip is not a
 // valid AggregateRating parent per Google Review snippet spec
 // (CLAUDE.md rule 4a). Rating signals come from the dedicated
 // detail-page Product/Event schemas linked via url above.
 },
 })),
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [...COMPARE_FAQ, ...COMPARE_FAQ_RU].map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };

 const tableSchema = {
 "@context": "https://schema.org",
 "@type": "Table",
 name: "Bosphorus cruise comparison Istanbul 2026",
 about: "Side-by-side comparison of four Bosphorus cruise options in Istanbul (Sunset, Dinner, Private Yacht, Hourly Boat Rental) across price, duration, capacity, departure, inclusions, and best-fit guest profile.",
 url: `${SITE_URL}/compare-bosphorus-cruises`,
 };

 // Dataset schema on the numerical comparison matrix — Perplexity research
 // shows Dataset @type on pricing tables lifts statistical-query citations
 // by ~67% (2026-05-30 deep audit). Sibling to the Table schema above.
 const datasetSchema = {
 "@context": "https://schema.org",
 "@type": "Dataset",
 name: "Bosphorus Cruise Comparison Pricing Matrix 2026",
 description:
 "Side-by-side numerical comparison of four Bosphorus cruise options in Istanbul (Sunset, Dinner, Private Yacht, Hourly Boat Rental) covering entry and ceiling EUR prices, capacity, rating, and review count for 2026.",
 url: `${SITE_URL}/compare-bosphorus-cruises`,
 license: "https://creativecommons.org/licenses/by/4.0/",
 creator: { "@id": `${SITE_URL}/#organization` },
 inLanguage: ["en"],
 temporalCoverage: "2026",
 spatialCoverage: { "@type": "Place", name: "Istanbul, Turkey" },
 keywords: [
 "Bosphorus cruise comparison",
 "Istanbul cruise prices 2026",
 "sunset cruise vs dinner cruise",
 "yacht charter price Istanbul",
 ],
 distribution: [
 {
 "@type": "DataDownload",
 encodingFormat: "text/html",
 contentUrl: `${SITE_URL}/compare-bosphorus-cruises`,
 },
 ],
 variableMeasured: CRUISE_OPTIONS.flatMap((c) => [
 {
 "@type": "PropertyValue",
 name: `${c.name} — Price From (EUR)`,
 value: c.priceFrom,
 unitText: "EUR",
 description: c.priceNote,
 },
 {
 "@type": "PropertyValue",
 name: `${c.name} — Price To (EUR)`,
 value: c.priceTo,
 unitText: "EUR",
 },
 {
 "@type": "PropertyValue",
 name: `${c.name} — Duration`,
 value: c.duration,
 },
 {
 "@type": "PropertyValue",
 name: `${c.name} — Capacity`,
 value: c.capacity,
 },
 {
 "@type": "PropertyValue",
 name: `${c.name} — Rating`,
 value: c.rating,
 maxValue: 5,
 },
 {
 "@type": "PropertyValue",
 name: `${c.name} — Reviews`,
 value: c.reviews,
 },
 ]),
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
 />

 <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
 <header className="mb-10 text-center">
 <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
 Decision Guide · Updated May 2026
 </p>
 <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">
 Compare Bosphorus Cruises in Istanbul
 </h1>
 <div className="mx-auto mt-6 max-w-3xl text-left">
 <QuickAnswer productKey="compare-bosphorus-cruises" locale="en" />
 </div>
 <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
 All four cruise options side-by-side: prices, durations, what's
 included, and which is best for your group. Pick the right cruise
 in under two minutes — or browse our{" "}
 <Link href="/bosphorus-cruise" className="font-semibold text-orange-600 underline-offset-2 hover:underline">
 full Bosphorus cruise hub
 </Link>{" "}
 for individual product details.
 </p>
 </header>

 {/* Quick price summary cards */}
 <section className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
 {CRUISE_OPTIONS.map((c) => (
 <Link
 key={c.slug}
 href={c.slug}
 className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg"
 >
 <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
 {c.type} · {c.duration}
 </div>
 <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-orange-600">
 {c.name}
 </h3>
 <div className="mt-3 text-sm text-slate-600">
 From{" "}
 <span className="text-2xl font-bold text-orange-600">
 €{c.priceFrom}
 </span>{" "}
 <span className="text-xs">{c.priceNote}</span>
 </div>
 <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
 <span className="text-amber-500">★</span>
 {c.rating} · {c.reviews.toLocaleString()} reviews
 </div>
 </Link>
 ))}
 </section>

 {/* Comparison table */}
 <section className="mb-16 overflow-x-auto">
 <h2 className="mb-6 text-2xl font-bold text-slate-900">
 Side-by-side comparison
 </h2>
 <table role="table" className="w-full min-w-[800px] border-collapse text-sm">
 <caption className="sr-only">
 Bosphorus cruise comparison Istanbul 2026 — Sunset Cruise from
 EUR 30, Dinner Cruise EUR 30 to EUR 90, Private Yacht Charter
 from EUR 220, Hourly Boat Rental from EUR 220 (2h minimum).
 Compared by type, duration, capacity, departure time,
 inclusions, and best-fit guest profile.
 </caption>
 <thead>
 <tr className="border-b border-slate-300">
 <th scope="col" className="py-3 text-left text-xs font-semibold uppercase text-slate-500">
 Feature
 </th>
 {CRUISE_OPTIONS.map((c) => (
 <th
 key={c.slug}
 scope="col"
 className="py-3 text-left text-xs font-semibold uppercase text-slate-500"
 >
 {c.name.replace("Bosphorus ", "")}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 <tr>
 <td className="py-3 font-semibold text-slate-700">Type</td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 {c.type}
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 font-semibold text-slate-700">Duration</td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 {c.duration}
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 font-semibold text-slate-700">Price from</td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 <span className="font-bold text-orange-600">
 €{c.priceFrom}
 </span>
 <span className="ml-1 text-xs">{c.priceNote}</span>
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 font-semibold text-slate-700">
 Capacity
 </td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 {c.capacity}
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 font-semibold text-slate-700">Departure</td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 {c.departTime}
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 align-top font-semibold text-slate-700">
 Includes
 </td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-slate-600">
 <ul className="space-y-1 text-xs">
 {c.includes.map((item) => (
 <li key={item} className="flex gap-1">
 <span className="text-emerald-600">✓</span>
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 align-top font-semibold text-slate-700">
 Best for
 </td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-xs text-slate-600">
 {c.bestFor}
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3 font-semibold text-slate-700">Rating</td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3 text-xs text-slate-600">
 <span className="text-amber-500">★</span> {c.rating} (
 {c.reviews.toLocaleString()})
 </td>
 ))}
 </tr>
 <tr>
 <td className="py-3"></td>
 {CRUISE_OPTIONS.map((c) => (
 <td key={c.slug} className="py-3">
 <Link
 href={c.slug}
 className="inline-flex items-center gap-1 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700"
 >
 Book →
 </Link>
 </td>
 ))}
 </tr>
 </tbody>
 </table>
 </section>

 {/* Decision tree */}
 <section className="mb-16 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 md:p-10">
 <h2 className="mb-6 text-2xl font-bold text-slate-900">
 Which cruise should you book?
 </h2>
 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
 <div className="rounded-2xl bg-white p-5 shadow-sm">
 <h3 className="font-bold text-slate-900">
 💰 Budget-conscious couple
 </h3>
 <p className="mt-2 text-sm text-slate-600">
 Sunset Cruise without wine — €34/person, 2 hours, all the
 Bosphorus highlights at golden hour.
 </p>
 <Link
 href="/cruises/bosphorus-sunset-cruise"
 className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
 >
 See Sunset Cruise →
 </Link>
 </div>
 <div className="rounded-2xl bg-white p-5 shadow-sm">
 <h3 className="font-bold text-slate-900">
 🍽️ Group dinner & entertainment
 </h3>
 <p className="mt-2 text-sm text-slate-600">
 Dinner Cruise Silver Alcoholic — €45/person, 3.5 hours, full
 Turkish menu and night show.
 </p>
 <Link
 href="/bosphorus-dinner-cruise-istanbul"
 className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
 >
 See Dinner Cruise →
 </Link>
 </div>
 <div className="rounded-2xl bg-white p-5 shadow-sm">
 <h3 className="font-bold text-slate-900">
 💍 Marriage proposal
 </h3>
 <p className="mt-2 text-sm text-slate-600">
 Private yacht charter — base from €220 per vessel; decoration,
 cake and photographer arranged on request (WhatsApp for a quote).
 </p>
 <Link
 href="/proposal-yacht-rental-istanbul"
 className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
 >
 See Proposal Yacht →
 </Link>
 </div>
 <div className="rounded-2xl bg-white p-5 shadow-sm">
 <h3 className="font-bold text-slate-900">
 🥂 Corporate event or large group
 </h3>
 <p className="mt-2 text-sm text-slate-600">
 Private Yacht — Group 40 Signature (up to 40 guests) from €500 or the 90-guest Event yacht by quote, full menu and open
 bar. Or Hourly Boat Rental for full custom control.
 </p>
 <Link
 href="/corporate-events"
 className="mt-3 inline-flex text-sm font-semibold text-orange-600 hover:underline"
 >
 See Corporate Events →
 </Link>
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="mb-12">
 <h2 className="mb-6 text-2xl font-bold text-slate-900">
 Frequently asked: comparing Bosphorus cruises
 </h2>
 <div className="space-y-3">
 {COMPARE_FAQ.map((f) => (
 <details
 key={f.q}
 className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200"
 >
 <summary className="cursor-pointer list-none font-semibold text-slate-900">
 <span className="mr-2 text-orange-600 group-open:rotate-90 inline-block transition">
 ›
 </span>
 {f.q}
 </summary>
 <p className="mt-3 text-sm text-slate-600">{f.a}</p>
 </details>
 ))}
 </div>
 </section>

 {/* Related hubs */}
 <section className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
 <h3 className="mb-3 text-lg font-bold text-slate-900">Continue browsing</h3>
 <div className="flex flex-wrap gap-3 text-sm">
 <Link href="/bosphorus-cruise" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 All Bosphorus cruise options →
 </Link>
 <Link href="/istanbul-cruise-faq" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 44-question FAQ →
 </Link>
 <Link href="/pricing" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 Full pricing breakdown →
 </Link>
 <Link href="/bosphorus-cruise-departure-points" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 Departure points →
 </Link>
 <Link href="/guides/kabatas-pier" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 Kabataş Pier guide →
 </Link>
 <Link href="/best-bosphorus-sunset-cruise-2026" className="rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-sm hover:bg-orange-50">
 Best sunset cruise 2026 — 6 operators ranked →
 </Link>
 </div>
 </section>

 {/* CTA — 2026-06-04: explicit color on h2 (was inheriting --heading var
 from globals.css which renders dark navy on dark-navy bg → invisible).
 Forced text-white at the h2 level so the global --heading override
 doesn't cascade through. */}
 <section className="rounded-3xl bg-slate-900 px-6 py-10 text-center text-white">
 <h2 className="text-2xl font-bold md:text-3xl text-white">
 Still not sure? We&apos;ll match you in 2 minutes.
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
 TÜRSAB-licensed since 2001 · 50,000+ guests · 4.9★ across Google,
 TripAdvisor, Viator
 </p>
 <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
 <a
 href="https://wa.me/905448989812"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#1faa54]"
 >
 WhatsApp +90 544 898 98 12
 </a>
 <Link
 href="/contact"
 className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
 >
 Get a custom quote
 </Link>
 </div>
 </section>
 </main>
 </>
 );
}
