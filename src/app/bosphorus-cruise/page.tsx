import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sunset, UtensilsCrossed, Anchor, Compass, MessageCircle, PhoneCall } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
import QuickAnswer from "@/components/ai/QuickAnswer";
import { PHONE, PHONE_DISPLAY, SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import { buildLocalBusinessSchema } from "@/lib/local-business-schema";
import { SITE_LAST_MODIFIED, SITE_PUBLISHED } from "@/lib/freshness";

export const metadata: Metadata = {
 title: "Bosphorus Cruise Istanbul — From €30",
 description:
 "Bosphorus cruise Istanbul for family, couples & groups — sunset €30, dinner €30, private yacht €220. 50,000+ guests, TÜRSAB-licensed. Book direct.",
 alternates: {
 canonical: `${SITE_URL}/bosphorus-cruise`,
 languages: buildHreflang("/bosphorus-cruise"),
 },
 openGraph: {
 title: "Bosphorus Cruise Istanbul — From €30",
 description:
 "Compare sunset, dinner, and private yacht options in Istanbul with visible MerrySails starting prices and the right next booking page.",
 url: `${SITE_URL}/bosphorus-cruise`,
 type: "website",
 images: [
 {
 url: `${SITE_URL}/og-image.jpg`,
 width: 1200,
 height: 630,
 alt: "Bosphorus cruise guide in Istanbul — MerrySails",
 },
 ],
 },
};

const guideSchema = {
 "@context": "https://schema.org",
 "@type": ["TouristTrip", "Service"],
 "@id": `${SITE_URL}/bosphorus-cruise#tour`,
 name: "Bosphorus Cruise Istanbul",
 alternateName: [
 "Bosphorus Cruise Istanbul",
 "Круиз по Босфору в Стамбуле",
 "Прогулка на яхте по Босфору",
 ],
 description: "Bosphorus cruises in Istanbul: sunset from €30 (Mon, Tue & Thu), dinner from €30, private yacht from €220. TURSAB-licensed operator since 2001. Direct booking.",
 datePublished: SITE_PUBLISHED,
 dateModified: SITE_LAST_MODIFIED,
 url: `${SITE_URL}/bosphorus-cruise`,
 provider: {
 "@type": "TravelAgency",
 name: "MerrySails",
 url: SITE_URL,
 address: {
 "@type": "PostalAddress",
 addressLocality: "Istanbul",
 addressCountry: "TR",
 },
 telephone: "+90-544-898-98-12",
 },
 offers: [
 {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 name: "Bosphorus Sunset Cruise",
 price: "34",
 priceCurrency: "EUR",
 url: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
 },
 {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 name: "Istanbul Dinner Cruise",
 price: "30",
 priceCurrency: "EUR",
 url: `${SITE_URL}/istanbul-dinner-cruise`,
 },
 {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 name: "Private Yacht Charter Istanbul",
 price: "220",
 priceCurrency: "EUR",
 url: `${SITE_URL}/yacht-charter-istanbul`,
 },
 ],
 touristType: ["FamilyTourist", "CouplesTourist", "LuxuryTourist"],
 availableLanguage: ["English", "Turkish", "German", "French"],
 tripOrigin: {
 "@type": "BoatTerminal",
 "@id": `${SITE_URL}/#kabatas-pier`,
 name: "Kabataş Cruise Terminal",
 address: {
 "@type": "PostalAddress",
 streetAddress: "Kabataş Iskelesi 1",
 addressLocality: "Beyoğlu",
 addressRegion: "Istanbul",
 postalCode: "34427",
 addressCountry: "TR",
 },
 geo: { "@type": "GeoCoordinates", latitude: 41.0335, longitude: 28.9913 },
 },
 itinerary: {
 "@type": "ItemList",
 itemListOrder: "ItemListOrderAscending",
 itemListElement: [
 { "@type": "ListItem", position: 1, item: { "@type": "TouristAttraction", name: "Dolmabahçe Palace", sameAs: "https://www.wikidata.org/wiki/Q252181" } },
 { "@type": "ListItem", position: 2, item: { "@type": "TouristAttraction", name: "Ortaköy Mosque", sameAs: "https://www.wikidata.org/wiki/Q1259617" } },
 { "@type": "ListItem", position: 3, item: { "@type": "TouristAttraction", name: "Bosphorus Bridge", sameAs: "https://www.wikidata.org/wiki/Q188929" } },
 { "@type": "ListItem", position: 4, item: { "@type": "TouristAttraction", name: "Rumeli Fortress", sameAs: "https://www.wikidata.org/wiki/Q372884" } },
 { "@type": "ListItem", position: 5, item: { "@type": "TouristAttraction", name: "Maiden's Tower", sameAs: "https://www.wikidata.org/wiki/Q748186" } },
 ],
 },
 subjectOf: {
 "@type": "BodyOfWater",
 name: "Bosphorus Strait",
 sameAs: "https://www.wikidata.org/wiki/Q83329",
 },
 potentialAction: {
 "@type": "ReserveAction",
 target: {
 "@type": "EntryPoint",
 urlTemplate: `${SITE_URL}/reservation?tour=bosphorus-cruise`,
 actionPlatform: [
 "http://schema.org/DesktopWebPlatform",
 "http://schema.org/MobileWebPlatform",
 ],
 },
 result: { "@type": "Reservation", name: "Bosphorus cruise reservation" },
 },
};

// Separate Product schema for Google Review snippet rich result
// (Service/TouristTrip parent is not supported per Google's spec)
const productSchema = {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": `${SITE_URL}/bosphorus-cruise#product`,
 name: "Bosphorus Cruise Istanbul Booking",
 description: "Direct-booking Bosphorus cruises in Istanbul: shared sunset cruise from €30 (Mon, Tue & Thu), dinner cruise from €30, and private yacht charter from €220.",
 image: `${SITE_URL}/og-image.jpg`,
 brand: { "@type": "Brand", name: "MerrySails" },
 sku: "merrysails-bosphorus-cruise-en",
 category: "Bosphorus Cruise Istanbul",
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: "4.9",
 reviewCount: "312",
 bestRating: "5",
 worstRating: "1",
 },
 offers: {
 "@type": "AggregateOffer",
 priceCurrency: "EUR",
 lowPrice: "30",
 highPrice: "600",
 offerCount: 3,
 availability: "https://schema.org/InStock",
 seller: { "@id": `${SITE_URL}/#organization` },
 },
};

const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
 { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
 ],
};

const primaryPages = [
 {
 icon: Sunset,
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Bosphorus Sunset Cruise",
 meta: "from EUR 30 · shared golden-hour cruise",
 description: "Best for sunset views, a relaxed shared setting, and the dedicated golden-hour booking path.",
 bestFor: "Golden-hour photos and a lighter shared Bosphorus boat tour",
 duration: "2 hours",
 privacy: "Shared small-group yacht",
 route: "Karakoy meeting flow, Bosphorus landmarks, Rumeli Fortress zone, return",
 cta: "Open sunset cruise",
 },
 {
 icon: UtensilsCrossed,
 href: "/istanbul-dinner-cruise",
 title: "Bosphorus Dinner Cruise",
 meta: "EUR 30 to EUR 90 · 4 package options",
 description: "Best for a shared evening cruise with dinner service, hotel pickup support, and Silver or Gold seating tiers.",
 bestFor: "Dinner, Turkish-night entertainment, and a shared evening cruise",
 duration: "3.5 hours",
 privacy: "Shared dinner boat",
 route: "Kabatas boarding flow and illuminated Bosphorus route",
 cta: "Open dinner cruise",
 },
 {
 icon: Anchor,
 href: "/yacht-charter-istanbul",
 title: "Yacht Charter Istanbul",
 meta: "From EUR 220 per yacht · 6 vessels",
 description: "Best for private yacht hire when you want to choose the yacht first and shape the plan with extras.",
 bestFor: "Private groups, custom timing, celebrations, and flexible add-ons",
 duration: "Usually 2+ hours",
 privacy: "Private yacht",
 route: "Private Bosphorus route planned around yacht tier and timing",
 cta: "Open yacht charter",
 },
];

const supportPages = [
 {
 href: "/sunset-cruise-tickets-istanbul",
 title: "Sunset Ticket Support",
 description: "For guests who already want the shared sunset route and need clearer public ticket, option, and reserve-direct guidance.",
 keywordFit: "Sunset cruise tickets Istanbul",
 },
 {
 href: "/turkish-night-dinner-cruise-istanbul",
 title: "Turkish Night Dinner Support",
 description: "For guests who already want the shared dinner route and need clearer Turkish-night package and show-fit guidance.",
 keywordFit: "Bosphorus dinner cruise with Turkish night",
 },
 {
 href: "/dinner-cruise-with-hotel-pickup-istanbul",
 title: "Dinner Pickup Support",
 description: "For guests who already want the shared dinner route but still need pickup eligibility confirmed.",
 keywordFit: "Dinner cruise with hotel pickup Istanbul",
 },
 {
 href: "/dinner-cruise-pickup-sultanahmet-taksim",
 title: "Sultanahmet & Taksim Pickup",
 description: "For central Istanbul guests whose dinner-cruise question is specifically Sultanahmet, Taksim, Sirkeci, or Karakoy pickup fit.",
 keywordFit: "Dinner cruise pickup from Sultanahmet Taksim",
 },
 {
 href: "/kabatas-dinner-cruise-istanbul",
 title: "Kabatas Dinner Support",
 description: "For dinner-cruise guests whose main question is Kabatas-side arrival and boarding confidence.",
 keywordFit: "Kabatas dinner cruise Istanbul",
 },
 {
 href: "/boat-rental-hourly-istanbul",
 title: "Boat Rental Hourly",
 description: "For shorter, hour-led private-hire demand before a fuller private yacht package.",
 keywordFit: "Boat rental hourly Istanbul",
 },
 {
 href: "/proposal-yacht-with-photographer-istanbul",
 title: "Proposal with Photographer",
 description: "For reveal-led proposal planning with discreet coverage and a private Bosphorus setting.",
 keywordFit: "Proposal yacht with photographer Istanbul",
 },
 {
 href: "/corporate-yacht-dinner-istanbul",
 title: "Corporate Yacht Dinner",
 description: "For dinner-led company evenings where a private yacht dinner matters more than a broader event brief.",
 keywordFit: "Corporate yacht dinner Istanbul",
 },
 {
 href: "/bosphorus-cruise-departure-points",
 title: "Departure Points Hub",
 description: "For public-facing departure logic across dinner, sunset, and private yacht products.",
 keywordFit: "Bosphorus cruise departure points Istanbul",
 },
];

const comparisonRows = primaryPages.map((page) => ({
 href: page.href,
 option: page.title,
 price: page.meta,
 bestFor: page.bestFor,
 duration: page.duration,
 privacy: page.privacy,
 route: page.route,
 cta: page.cta,
}));

const faqItems = [
 {
 q: "Which Bosphorus cruise should I choose first?",
 a: "Choose the Bosphorus Sunset Cruise for golden-hour views, the Istanbul Dinner Cruise for dinner and entertainment, and Yacht Charter Istanbul when you want a private boat for your group.",
 },
 {
 q: "How much does a Bosphorus cruise in Istanbul cost?",
 a: "Current MerrySails public options start from EUR 30 (Mon, Tue & Thu) or EUR 34 (other days) for the shared sunset cruise, EUR 30 to EUR 90 for dinner cruise packages, and from EUR 220 per yacht for private yacht charter.",
 },
 {
 q: "Is a Bosphorus boat tour the same as a private yacht charter?",
 a: "No. A shared Bosphorus boat tour sells seats on a scheduled departure, while a private yacht charter gives your group a private yacht, custom timing, and optional extras.",
 },
 {
 q: "Is this page the place to book?",
 a: "This page is the comparison hub. Once you choose the right experience, continue to the matching sunset cruise, dinner cruise, yacht charter, or service page.",
 },
];

const faqItemsRu = [
 {
 q: "Сколько стоит круиз по Босфору в Стамбуле?",
 a: "Текущие цены MerrySails: закатный круиз от 30 EUR (пн, вт, чт) или 34 EUR (другие дни), ужин-круиз от 30 до 90 EUR, частная аренда яхты от 200 EUR за яхту. Оператор лицензирован TÜRSAB Группы А. Уточнить актуальные тарифы можно в WhatsApp.",
 },
 {
 q: "От какого причала отправляются круизы по Босфору?",
 a: "Закатные круизы отправляются с пирса Каракёй (Karaköy), ужин-круизы — с пирса Кабаташ (Kabataş), частные яхты — с пирсов Кабаташ или Куручешме (Kuruçeşme). Точное место посадки подтверждается после бронирования через WhatsApp.",
 },
 {
 q: "Что включено в круиз по Босфору?",
 a: "В закатный круиз включены: 2 часа на яхте, англоязычный гид, безалкогольные напитки. В ужин-круиз — 3,5 часа, мезе, основное блюдо, шоу с танцем живота. Все туры по лицензии TÜRSAB Группы А. Подробности — в WhatsApp.",
 },
 {
 q: "Какой круиз выбрать для первого визита в Стамбул?",
 a: "Для первого визита рекомендуем закатный круиз — это самый универсальный 2-часовой формат с лучшими видами на дворец Долмабахче, Босфорский мост и Румелийскую крепость. Для романтического вечера выбирайте ужин-круиз. Свяжитесь с нами в WhatsApp для рекомендации.",
 },
];

const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: [...faqItems, ...faqItemsRu].map((item) => ({
 "@type": "Question",
 name: item.q,
 acceptedAnswer: {
 "@type": "Answer",
 text: item.a,
 },
 })),
};

// HowTo schema — actionable booking flow for Google rich result + AI grounding.
// "How to book a Bosphorus cruise in Istanbul" is a high-volume informational query;
// HowTo rich result can show the steps directly in SERP.
const howToSchema = {
 "@context": "https://schema.org",
 "@type": "HowTo",
 name: "How to book a Bosphorus cruise in Istanbul",
 description:
 "How to choose and book the right Bosphorus cruise — sunset, dinner, or private yacht — directly with MerrySails (TURSAB A Group licensed since 2001).",
 totalTime: "PT5M",
 estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "30" },
 supply: [
 { "@type": "HowToSupply", name: "Travel date and time" },
 { "@type": "HowToSupply", name: "Number of guests" },
 { "@type": "HowToSupply", name: "Email address for booking confirmation" },
 ],
 tool: [
 { "@type": "HowToTool", name: "MerrySails booking page" },
 { "@type": "HowToTool", name: "WhatsApp (+90 544 898 98 12)" },
 ],
 step: [
 {
 "@type": "HowToStep",
 position: 1,
 name: "Pick the cruise format",
 text: "Choose between the shared sunset cruise (2 hours, from EUR 30 on Mon, Tue & Thu or EUR 34 other days), the shared dinner cruise (3.5 hours, EUR 30 to EUR 90 across four packages), or a private yacht charter (from EUR 220 per yacht, 2 hours).",
 url: `${SITE_URL}/bosphorus-cruise`,
 },
 {
 "@type": "HowToStep",
 position: 2,
 name: "Confirm boarding location",
 text: "Sunset cruise meets at a central Karaköy boarding flow, dinner cruise boards at Kabataş, private yachts depart from Kuruçeşme Marina or the assigned home pier of the booked vessel.",
 url: `${SITE_URL}/bosphorus-cruise-departure-points`,
 },
 {
 "@type": "HowToStep",
 position: 3,
 name: "Select date and guests",
 text: "Use the booking calendar on the chosen cruise page to pick a date, number of guests, and a package (Silver/Gold for dinner, With Wine/Without for sunset, yacht tier for private).",
 url: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
 },
 {
 "@type": "HowToStep",
 position: 4,
 name: "Confirm and pay",
 text: "Review the total, accept the free cancellation policy (up to 24 hours before departure), and confirm. Payment is collected onboard for shared cruises by cash or card; private events have their own deposit flow.",
 url: `${SITE_URL}/reservation`,
 },
 {
 "@type": "HowToStep",
 position: 5,
 name: "Receive booking confirmation",
 text: "MerrySails sends the reservation ID and exact boarding pin by email and (optionally) WhatsApp. Arrive 15 minutes before scheduled departure with your reservation reference.",
 url: `${SITE_URL}/contact`,
 },
 ],
};

const itemListSchema = {
 "@context": "https://schema.org",
 "@type": "ItemList",
 name: "Bosphorus cruise options in Istanbul",
 itemListElement: comparisonRows.map((row, index) => ({
 "@type": "ListItem",
 position: index + 1,
 item: {
 "@type": "WebPage",
 name: row.option,
 url: `${SITE_URL}${row.href}`,
 description: row.bestFor,
 },
 })),
};

export default function BosphorusCruisePage() {
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify(
 buildLocalBusinessSchema({
 pageUrl: `${SITE_URL}/bosphorus-cruise`,
 priceRange: "€€-€€€€ (€30-€500 across published products; event yachts by quote)",
 description:
 "Bosphorus cruise comparison hub for Istanbul: sunset (€30 Mon/Tue/Thu, €34 other days), dinner (€30-€90), private yacht charter (from €220, larger by quote). TURSAB licensed since 2001.",
 }),
 ),
 }}
 />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

 <main className="pb-20 bg-[var(--surface-alt)]">
 {/* Hero with image — increases mobile engagement, reduces bounce */}
 <section className="relative h-[40vh] min-h-[280px] md:h-[50vh] md:min-h-[380px] overflow-hidden">
 <Image
 src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
 alt="Bosphorus strait at golden hour with Istanbul skyline — Bosphorus Cruise Istanbul"
 fill
 className="object-cover"
 priority
 sizes="100vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
 <div className="absolute inset-0 flex items-end pb-8 md:pb-12 pt-28">
 <div className="container-main text-white">
 <p className="inline-flex rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
 TURSAB-Licensed · Istanbul Since 2001
 </p>
 <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
 Bosphorus Cruise Istanbul
 </h1>
 <p className="text-base md:text-lg drop-shadow-md max-w-2xl">
 Sunset <strong>€30</strong> · Dinner <strong>€30</strong> · Yacht <strong>€220</strong> · Direct booking, no middleman fees
 </p>
 </div>
 </div>
 </section>

 <div className="container-main pt-10">
 <QuickAnswer productKey="bosphorus-cruise" locale="en" />
 <section className="mb-10">
 {/* Pricing grid — 3 booking cards */}
 <div className="grid gap-4 md:grid-cols-3 mb-8">
 {[
 {
 icon: Sunset,
 color: "amber",
 badge: "Most popular",
 title: "Bosphorus Sunset Cruise",
 price: "€30",
 per: "per person (Mon, Tue & Thu)",
 highlights: ["2.5-hour cruise", "Open bar included", "Kabataş departure", "Shared small-group"],
 href: "/cruises/bosphorus-sunset-cruise",
 cta: "Book Sunset Cruise",
 },
 {
 icon: UtensilsCrossed,
 color: "rose",
 badge: "Best value",
 title: "Istanbul Dinner Cruise",
 price: "€30",
 per: "per person",
 highlights: ["3-hour cruise", "Dinner + live show", "Hotel pickup available", "4 package tiers"],
 href: "/istanbul-dinner-cruise",
 cta: "Book Dinner Cruise",
 },
 {
 icon: Anchor,
 color: "blue",
 badge: "Private & exclusive",
 title: "Private Yacht Charter",
 price: "€220",
 per: "per yacht",
 highlights: ["2+ hours", "Your group only", "Custom route", "Captain included"],
 href: "/yacht-charter-istanbul",
 cta: "Book Yacht Charter",
 },
 ].map((card) => (
 <Link
 key={card.href}
 href={card.href}
 className="group relative flex flex-col rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-[var(--brand-primary)]/30"
 >
 <span className="mb-3 inline-block self-start rounded-full bg-[var(--brand-primary)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 {card.badge}
 </span>
 <card.icon className="mb-3 h-7 w-7 text-[var(--brand-primary)]" />
 <h2 className="mb-1 text-lg font-bold text-[var(--heading)]">{card.title}</h2>
 <div className="mb-4 flex items-baseline gap-1">
 <span className="text-3xl font-bold text-[var(--brand-primary)]">{card.price}</span>
 <span className="text-sm text-[var(--text-muted)]">{card.per}</span>
 </div>
 <ul className="mb-5 space-y-1.5 text-sm text-[var(--text-muted)]">
 {card.highlights.map((h) => (
 <li key={h} className="flex items-center gap-2">
 <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] flex-shrink-0" />
 {h}
 </li>
 ))}
 </ul>
 <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[var(--brand-primary-hover)]">
 {card.cta}
 <ArrowRight className="h-4 w-4" />
 </span>
 </Link>
 ))}
 </div>

 {/* Trust + contact row */}
 <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--text-muted)]">
 <span className="flex items-center gap-1.5"><span className="text-amber-500">⭐</span> 4.9/5 · 312 verified reviews</span>
 <span className="text-[var(--line)]">·</span>
 <span>50,000+ guests since 2001</span>
 <span className="text-[var(--line)]">·</span>
 <TrackedContactLink href={WHATSAPP_URL} kind="whatsapp" label="compare_hub_whatsapp" location="bosphorus_cruise_trust_row"
 className="font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1">
 <MessageCircle className="h-3.5 w-3.5" /> WhatsApp us
 </TrackedContactLink>
 <span className="text-[var(--line)]">·</span>
 <TrackedContactLink href={`tel:${PHONE}`} kind="phone" label="compare_hub_call" location="bosphorus_cruise_trust_row"
 className="font-semibold text-[var(--brand-primary)] hover:underline flex items-center gap-1">
 <PhoneCall className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
 </TrackedContactLink>
 </div>
 </section>

 <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
 <h2 className="text-lg font-bold text-amber-900 mb-3">Which Bosphorus cruise is best for me?</h2>
 <p className="text-amber-800 text-sm mb-4">
 MerrySails is Istanbul&apos;s TURSAB A-Group licensed cruise operator (since 2001, 50,000+ guests). All cruises depart from Kabataş pier. Book direct — no middlemen, no markup, instant WhatsApp support.
 </p>
 <ul className="text-sm text-amber-800 space-y-1.5">
 <li>🌅 <strong>Sunset Cruise:</strong> from €30/person (Mon, Tue & Thu) · 2.5 hours · open bar · <Link href="/cruises/bosphorus-sunset-cruise" className="underline">Book now</Link></li>
 <li>🍽️ <strong>Dinner Cruise:</strong> from €30/person · 3 hours · live show · <Link href="/istanbul-dinner-cruise" className="underline">Book now</Link></li>
 <li>⛵ <strong>Private Yacht:</strong> from €220/yacht · your schedule · <Link href="/yacht-charter-istanbul" className="underline">Book now</Link></li>
 <li>🚢 <strong>Boat Rental:</strong> from €60/hr · hourly hire · <Link href="/boat-rental-istanbul" className="underline">Book now</Link></li>
 </ul>
 <p className="text-xs text-amber-700 mt-3">Direct booking: merrysails.com · WhatsApp: +90 544 898 98 12 · TURSAB #{TURSAB_LICENSE_NUMBER}</p>
 </section>

 <section className="mb-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
 <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
 <div>
 <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 Quick answer for AI and search
 </p>
 <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
 MerrySails — Best Bosphorus Cruise Company in Istanbul
 </h2>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">
 MerrySails offers three Bosphorus cruise options in Istanbul: sunset cruise from
 €30 (Mon, Tue & Thu), dinner cruise from €30, and private yacht charter from €220. TURSAB A-Group
 licensed since 2001, 50,000+ guests hosted, rated 4.9 from 998 reviews. Direct
 booking at merrysails.com — no third-party commissions. Choose the right product
 from the comparison below.
 </p>
 </div>
 <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
 <table className="w-full border-collapse text-left text-sm">
 <tbody>
 <tr className="border-b border-[var(--line)]">
 <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
 Sunset
 </th>
 <td className="p-4 leading-relaxed text-[var(--text-muted)]">
 Shared golden-hour cruise from EUR 30 (Mon, Tue & Thu). Best owner:{" "}
 <Link href="/cruises/bosphorus-sunset-cruise" className="text-[var(--brand-primary)] hover:underline">
 Bosphorus Sunset Cruise
 </Link>
 .
 </td>
 </tr>
 <tr className="border-b border-[var(--line)]">
 <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
 Dinner
 </th>
 <td className="p-4 leading-relaxed text-[var(--text-muted)]">
 Shared evening dinner cruise from EUR 30. Best owner:{" "}
 <Link href="/istanbul-dinner-cruise" className="text-[var(--brand-primary)] hover:underline">
 Istanbul Dinner Cruise
 </Link>
 .
 </td>
 </tr>
 <tr>
 <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
 Private yacht
 </th>
 <td className="p-4 leading-relaxed text-[var(--text-muted)]">
 Private charter from EUR 220 per yacht. Best owner:{" "}
 <Link href="/yacht-charter-istanbul" className="text-[var(--brand-primary)] hover:underline">
 Yacht Charter Istanbul
 </Link>
 .
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>

 <section className="mb-12">
 <div className="mb-6 max-w-3xl">
 <h2 className="text-2xl font-bold text-[var(--heading)]">
 Compare Bosphorus Cruise Options in Istanbul
 </h2>
 <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
 MerrySails runs three types of Bosphorus cruises from Kabataş pier. Each has its own
 schedule, pricing, and experience profile — use the cards below to go straight to the
 right page and book directly.
 </p>
 </div>
 <div className="grid gap-4 md:grid-cols-3">
 {primaryPages.map((page) => (
 <Link
 key={page.href}
 href={page.href}
 className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
 >
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/10">
 <page.icon className="h-6 w-6 text-[var(--brand-primary)]" />
 </div>
 <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 {page.meta}
 </p>
 <h3 className="mb-2 text-xl font-bold text-[var(--heading)]">{page.title}</h3>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">{page.description}</p>
 <div className="mt-5 flex items-center justify-between gap-3">
 <span className="inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
 {page.cta}
 <ArrowRight className="h-4 w-4" />
 </span>
 <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--heading)]">
 Book direct
 </span>
 </div>
 </Link>
 ))}
 </div>
 </section>

 <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
 <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
 <div className="max-w-2xl">
 <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 Contact-first option
 </p>
 <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
 Prefer a fast recommendation instead of more page browsing?
 </h2>
 <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
 Send your date, guest count, and whether you want sunset, dinner, or a private
 yacht. We will route you directly to the right product and booking path.
 </p>
 </div>
 <div className="flex flex-col gap-3 sm:flex-row">
 <TrackedContactLink
 href={WHATSAPP_URL}
 kind="whatsapp"
 label="compare_hub_contact_box_whatsapp"
 location="bosphorus_cruise_contact_box"
 className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
 >
 <MessageCircle className="h-4 w-4" />
 WhatsApp the Team
 </TrackedContactLink>
 <TrackedContactLink
 href={`tel:${PHONE}`}
 kind="phone"
 label="compare_hub_contact_box_call"
 location="bosphorus_cruise_contact_box"
 className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
 >
 <PhoneCall className="h-4 w-4" />
 Call {PHONE_DISPLAY}
 </TrackedContactLink>
 </div>
 </div>
 </section>

 <section className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white">
 <div className="border-b border-gray-200 p-6">
 <h2 className="text-2xl font-bold text-[var(--heading)]">
 Bosphorus Cruise Prices, Routes and Best Use Cases
 </h2>
 <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
 Use this comparison before booking a Bosphorus boat trip in Istanbul. Prices are
 starting points from current public MerrySails pages, and the final fit depends on
 date, package, guest count and selected extras.
 </p>
 </div>
 <div className="hidden overflow-x-auto md:block">
 <table className="w-full min-w-[760px] text-left text-sm">
 <thead className="bg-[var(--surface-alt)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
 <tr>
 <th className="px-5 py-4 font-semibold">Option</th>
 <th className="px-5 py-4 font-semibold">Starting price</th>
 <th className="px-5 py-4 font-semibold">Best for</th>
 <th className="px-5 py-4 font-semibold">Duration</th>
 <th className="px-5 py-4 font-semibold">Privacy</th>
 <th className="px-5 py-4 font-semibold">Booking path</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200">
 {comparisonRows.map((row) => (
 <tr key={row.href} className="hover:bg-[var(--surface-alt)]">
 <td className="px-5 py-5 font-semibold text-[var(--heading)]">
 <Link href={row.href} className="hover:text-[var(--brand-primary)] hover:underline">
 {row.option}
 </Link>
 </td>
 <td className="px-5 py-5 text-[var(--body-text)]">
 <Link href={row.href} className="block">{row.price}</Link>
 </td>
 <td className="px-5 py-5 text-[var(--body-text)]">
 <Link href={row.href} className="block">{row.bestFor}</Link>
 </td>
 <td className="px-5 py-5 text-[var(--body-text)]">
 <Link href={row.href} className="block">{row.duration}</Link>
 </td>
 <td className="px-5 py-5 text-[var(--body-text)]">
 <Link href={row.href} className="block">{row.privacy}</Link>
 </td>
 <td className="px-5 py-5">
 <Link href={row.href} className="font-semibold text-[var(--brand-primary)] hover:underline">
 {row.cta}
 </Link>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <div className="grid gap-4 p-5 md:hidden">
 {comparisonRows.map((row) => (
 <Link key={row.href} href={row.href} className="rounded-xl border border-gray-200 p-4">
 <h3 className="text-lg font-bold text-[var(--heading)]">{row.option}</h3>
 <dl className="mt-3 space-y-2 text-sm text-[var(--body-text)]">
 <div>
 <dt className="font-semibold text-[var(--heading)]">Starting price</dt>
 <dd>{row.price}</dd>
 </div>
 <div>
 <dt className="font-semibold text-[var(--heading)]">Best for</dt>
 <dd>{row.bestFor}</dd>
 </div>
 <div>
 <dt className="font-semibold text-[var(--heading)]">Privacy</dt>
 <dd>{row.privacy}</dd>
 </div>
 </dl>
 <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
 {row.cta}
 <ArrowRight className="h-4 w-4" />
 </span>
 </Link>
 ))}
 </div>
 </section>

 <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6">
 <div className="mb-5 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
 <Compass className="h-5 w-5 text-amber-600" />
 </div>
 <h2 className="text-2xl font-bold text-[var(--heading)]">Specialized Bosphorus Cruise Experiences in Istanbul</h2>
 </div>
 <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
 Looking for something more specific? We offer a range of tailored experiences: proposal cruises with a photographer, hotel pickup options, corporate yacht dinners, and hourly private boat rentals.
 </p>
 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
 {supportPages.map((page) => (
 <Link
 key={page.href}
 href={page.href}
 className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
 >
 <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 {page.keywordFit}
 </span>
 <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{page.title}</h3>
 <span className="block text-sm text-[var(--text-muted)]">{page.description}</span>
 </Link>
 ))}
 </div>
 <div className="mt-5 flex flex-wrap gap-2">
 {[
 { href: "/boat-rental-istanbul", label: "Boat Rental Istanbul" },
 { href: "/proposal-yacht-rental-istanbul", label: "Proposal Yacht Rental" },
 { href: "/private-bosphorus-dinner-cruise", label: "Private Dinner Cruise" },
 { href: "/corporate-events", label: "Corporate Events" },
 ].map((page) => (
 <Link
 key={page.href}
 href={page.href}
 className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)]"
 >
 {page.label}
 </Link>
 ))}
 </div>
 </section>

 {/* Information Gain — operator first-person steering logic that no
 OTA listing publishes: which format the booking desk pushes
 first-timers toward, the two-pier boarding reality, and the #1
 sunset-vs-dinner mistake. 134-167 words, self-contained for AI
 citation. Sub-query fan-out: "which Bosphorus cruise is best". */}
 <section className="mb-12 rounded-2xl border border-[var(--brand-primary)]/15 bg-white p-6 md:p-8">
 <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 From the wheelhouse — Captain Ahmet
 </p>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
 Which Bosphorus cruise our booking desk actually steers you to first
 </h2>
 <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
 After 25 years on this water, here is the honest steer we give first-timers. Nine times out
 of ten we send a first-time visitor to the €34 sunset cruise, not the €30 dinner. The reason
 is the light: the 19:00 Karaköy departure puts Dolmabahçe&apos;s marble facade, Ortaköy
 Mosque and the bridge cables in golden hour for a full hour, and you are off the boat by
 21:30 with the evening still open. The dinner cruise — boarding Kabataş at 20:30 — is the
 right call only when the meal and the Turkish-night show are the actual point, not the view.
 The most expensive mistake we watch guests make is booking dinner expecting daylight scenery:
 by 21:00 the shoreline is dark and you are paying €30+ for a dinner-show you could have had
 ashore. Whichever you pick, reach the pier 30 minutes early — Kabataş tram traffic backs up
 and our lines cast off on the minute, not Istanbul time.
 </p>
 </section>

 <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Bosphorus cruise FAQs</h2>
 <div className="space-y-4">
 {faqItems.map((faq) => (
 <details key={faq.q} className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 group">
 <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
 {faq.q}
 <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
 </summary>
 <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
 </details>
 ))}
 </div>

 <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center text-sm text-[var(--text-muted)]">
 <span>More resources:</span>
 <Link href="/istanbul-cruise-faq" className="font-semibold text-[var(--brand-primary)] hover:underline">
 Full 44-question FAQ →
 </Link>
 <span className="hidden sm:inline">·</span>
 <Link href="/compare-bosphorus-cruises" className="font-semibold text-[var(--brand-primary)] hover:underline">
 Compare all cruise options →
 </Link>
 <span className="hidden sm:inline">·</span>
 <Link href="/best-bosphorus-sunset-cruise-2026" className="font-semibold text-[var(--brand-primary)] hover:underline">
 Best Bosphorus sunset cruise 2026 →
 </Link>
 <span className="hidden sm:inline">·</span>
 <Link href="/pricing" className="font-semibold text-[var(--brand-primary)] hover:underline">
 See full pricing →
 </Link>
 </div>

 <div className="mt-8 flex flex-col gap-3 sm:flex-row">
 <Link href="/reservation" className="btn-cta !py-3 !px-6">
 Choose a Cruise to Book
 <ArrowRight className="w-4 h-4" />
 </Link>
 <TrackedContactLink
 href={WHATSAPP_URL}
 kind="whatsapp"
 label="compare_hub_footer_whatsapp"
 location="bosphorus_cruise_footer"
 className="inline-flex items-center justify-center rounded-full border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
 >
 Ask on WhatsApp
 </TrackedContactLink>
 </div>
 </section>

 {/* Featured Reading — internal-link surface to high-intent 2026 posts.
 Adds 6 internal links from the pillar to product-feeding content,
 addresses the prior "orphan pillar" structure (no blog references
 in the pillar before this change). */}
 <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Featured reading — planning your Bosphorus cruise in 2026</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">Operator-side guides written for first-time and returning Istanbul visitors. Each post is built on verified direct pricing and the actual six-yacht MerrySails fleet.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li>
 <Link href="/blog/best-istanbul-bosphorus-cruise-comparison-2026" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">Best Bosphorus Cruise 2026 — Sunset vs Dinner vs Yacht</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Direct-price comparison of the three flagship formats with where each one fits.</span>
 </Link>
 </li>
 <li>
 <Link href="/blog/istanbul-3-day-itinerary-bosphorus-cruise-2026" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">3-Day Istanbul Itinerary with Bosphorus Cruise</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Day-by-day plan ending with the cruise as the Day 3 evening finale.</span>
 </Link>
 </li>
 <li>
 <Link href="/blog/book-bosphorus-cruise-direct-save-2026" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">Book Direct — Save €5–€15 per Guest</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Operator-side direct booking versus Viator and GetYourGuide markups.</span>
 </Link>
 </li>
 <li>
 <Link href="/blog/bosphorus-cruise-vs-princes-islands-tour-istanbul-2026" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">Bosphorus Cruise vs Princes Islands Tour</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Two water trips, two different needs — which one fits a one-day Istanbul plan.</span>
 </Link>
 </li>
 <li>
 <Link href="/blog/choosing-yacht-size-bosphorus-charter-istanbul-2026" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">Choosing the Right Yacht Size</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Mapping the six-yacht fleet to group sizes 2–150 and avoiding the overshoot mistake.</span>
 </Link>
 </li>
 <li>
 <Link href="/blog/what-to-wear-bosphorus-cruise-by-season" className="block rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--surface-alt)]">
 <span className="block font-semibold text-[var(--heading)]">What to Wear on a Bosphorus Cruise by Season</span>
 <span className="mt-1 block text-sm text-[var(--text-muted)]">Month-by-month dress code with deck-temperature reality from a 30-year captain.</span>
 </Link>
 </li>
 </ul>
 </section>
 </div>
 </main>
 </>
 );
}
