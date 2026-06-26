export interface Package {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  addOns?: AddOn[];
  weekdayDiscount?: {
    weekdays: number[];
    discountedPrice: number;
    label?: string;
  };
}

export interface AddOn {
  name: string;
  price: string;
  /**
   * Request-only extra (operator 2026-06-26): no fixed price. Selecting it adds
   * the item to the booking note as a "please quote" request instead of charging
   * it. Only priced add-ons (e.g. the 4-course meal) reach the pricing layer;
   * request-only ones are skipped in reservation-pricing + BookingModal totals.
   */
  requestOnly?: boolean;
}

export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type BookingMode = "book" | "quote";
export type PriceMode = "perPerson" | "perGroup" | "custom";

/**
 * Per-locale translated copy for a tour. Optional everywhere — when a locale
 * key is missing the UI falls back to the English (root) fields.
 * `packages` / `itinerary` arrays are matched to the English source by index.
 */
export type TourLocale = "tr" | "de" | "fr" | "nl" | "ru";
export type TourI18nEntry = {
  nameEn?: string;
  description?: string;
  longDescription?: string;
  route?: string;
  duration?: string;
  departureTime?: string;
  departurePoint?: string;
  highlights?: string[];
  bestFor?: string[];
  importantNotes?: string[];
  packages?: { name: string; description?: string; features?: string[] }[];
  itinerary?: { time?: string; title?: string; description?: string }[];
  includes?: string[];
  notIncluded?: string[];
  faq?: { question: string; answer: string }[];
};

export interface Tour {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  longDescription: string;
  duration: string;
  capacity: string;
  priceEur: number;
  originalPriceEur?: number;
  packages?: Package[];
  addOns?: AddOn[];
  includes: string[];
  notIncluded?: string[];
  highlights: string[];
  badge: string;
  badgeColor: string;
  image: string;
  gallery: string[];
  galleryAlts?: string[];
  videoSrc?: string;
  route: string;
  departureTime: string;
  departurePoint: string;
  category: "cruise" | "private" | "event" | "tour" | "organization";
  rating: number;
  reviewCount: number;
  itinerary?: ItineraryStep[];
  faq?: FAQ[];
  availability?: string;
  bestFor?: string[];
  importantNotes?: string[];
  canonicalPath?: string;
  isCoreProduct?: boolean;
  showPricing?: boolean;
  bookingMode?: BookingMode;
  priceMode?: PriceMode;
  enquiryLabel?: string;
  i18n?: Partial<Record<TourLocale, TourI18nEntry>>;
}

// 2026-06-26 (operator): yacht add-ons simplified. ONLY the 4-course meal is
// priced (€50/person — 2 guests = €100). Every other extra is sold as a
// "request" with no fixed price: selecting it appends the item to the booking
// note so we send a tailored quote (DJ, photographer, decoration etc. vary by
// date/group). Per the canonical fleet model below there are no Essential/
// Premium/VIP tiers any more, so the three historical arrays share one list.
const yachtSharedAddOns: AddOn[] = [
  { name: "4-Course Meal (Fish / Chicken / Meat / Vegetarian / Vegan)", price: "EUR 50 / person" },
  { name: "Unlimited Drinks Package (Alcohol / Wine)", price: "On request", requestOnly: true },
  { name: "Professional Photographer", price: "On request", requestOnly: true },
  { name: "DJ", price: "On request", requestOnly: true },
  { name: "Live Violinist", price: "On request", requestOnly: true },
  { name: "Belly Dancer", price: "On request", requestOnly: true },
  { name: "Turkish Music Group", price: "On request", requestOnly: true },
  { name: "Birthday Cake", price: "On request", requestOnly: true },
  { name: "Marriage Proposal / Table Decoration", price: "On request", requestOnly: true },
  { name: "VIP Pickup & Drop-off", price: "On request", requestOnly: true },
  { name: "Extra Hour", price: "On request", requestOnly: true },
];

// Historical tier aliases — all yacht packages now share one add-on list.
const yachtPremiumAddOns: AddOn[] = yachtSharedAddOns;
const yachtVipAddOns: AddOn[] = yachtSharedAddOns;

// CANONICAL per-vessel fleet (operator-confirmed 2026-06-19). The ONLY correct
// private-yacht pricing model: 6 boats, NO Essential/Premium/VIP tiers.
// Bookable published prices (whole yacht, 2h min, 10% off from 3h):
//   Boutique 12 €220 · Premium 15 €320 · Group 40 Standard €380 · Group 40 Signature €500.
//   Event Yacht 90 + Mega Event 150 = BY QUOTE (no published price → not a picker tier).
// Every occasion/event yacht page (proposal, wedding, party, dinner, etc.) sells
// the SAME fleet; the occasion is delivered via add-ons (decoration, catering, DJ…),
// not a separate vessel price. Headline "from €220".
const yachtFleetPackages: Package[] = [
  {
    name: "Boutique Yacht · 12 Guests",
    price: 220,
    originalPrice: 260,
    description: "Boutique-class yacht for up to 12 guests on a 2-hour private Bosphorus sailing",
    features: [
      "2-hour private Bosphorus sailing (whole yacht)",
      "Capacity up to 12 guests",
      "Licensed captain and crew",
      "Soft drinks, water, and light snack tray",
      "Bluetooth audio onboard",
      "10% discount automatic from 3 hours",
    ],
    addOns: yachtSharedAddOns,
  },
  {
    name: "Premium Yacht · 15 Guests",
    price: 320,
    originalPrice: 380,
    description: "Premium yacht with a wider top deck and refined lounge for up to 15 guests",
    features: [
      "2-hour private Bosphorus sailing (whole yacht)",
      "Capacity up to 15 guests",
      "Licensed captain and crew",
      "Soft drinks, water, and light snack tray",
      "Bluetooth audio onboard",
      "10% discount automatic from 3 hours",
    ],
    addOns: yachtPremiumAddOns,
  },
  {
    name: "Group Yacht · 40 Guests · Standard",
    price: 380,
    originalPrice: 450,
    description: "Group-class yacht for up to 40 guests at the Standard rate",
    features: [
      "2-hour private Bosphorus sailing (whole yacht)",
      "Capacity up to 40 guests",
      "Licensed captain and crew",
      "Soft drinks, water, and light snack tray",
      "Bluetooth audio onboard",
      "10% discount automatic from 3 hours",
    ],
    addOns: yachtVipAddOns,
  },
  {
    name: "Group Yacht · 40 Guests · Signature",
    price: 500,
    originalPrice: 590,
    description: "Same 40-guest group yacht at the Signature rate",
    features: [
      "2-hour private Bosphorus sailing (whole yacht)",
      "Capacity 15–40 guests",
      "Licensed captain and crew",
      "Soft drinks, water, and light snack tray",
      "Bluetooth audio onboard",
      "10% discount automatic from 3 hours",
    ],
    addOns: yachtVipAddOns,
  },
];

// Deprecated tour slugs that 308-redirect via next.config.ts. They stay in
// `tours` for legacy metaOverrides/relatedTours references, but must NOT be
// surfaced as internal links (sitemap, /cruises hub) — linking to a redirect
// is a Semrush "permanent redirect" issue.
export const REDIRECTED_TOUR_SLUGS = new Set<string>([
  "romantic-marriage-proposal",
  "corporate-event-bosphorus-cruise",
  "private-bosphorus-dinner-yacht-cruise",
  "private-yacht-swimming-tour",
  "yacht-weddings",
  "wedding-anniversary",
  "yacht-birthday-party",
  "bosphorus-sightseeing-yacht-cruise",
  "bachelorette-yacht-party",
  "private-bosphorus-sunset-cruise",
  "private-bosphorus-lunch-yacht-cruise",
]);

export const tours: Tour[] = [
  // ========== BOSPHORUS CRUISES ==========
  {
    id: "1",
    slug: "bosphorus-sunset-cruise",
    name: "Boğaz Gün Batımı Turu",
    nameEn: "Bosphorus Sunset Cruise",
    description: "Bosphorus sunset cruise Istanbul — from €30 Mon, Tue & Thu (€34 other days). 2-hour golden-hour sailing, live guide, light hospitality, two options: Without Wine and With Wine.",
    longDescription: "MerrySails operates a shared Bosphorus sunset sailing built for guests who want the golden-hour experience on the strait without sitting through a full evening dinner programme. Boarding begins around 18:30 from Karaköy ferry pier, beside the Mimar Sinan statue (by Marmaray, near Balıkçı Kemal) — and the yacht leaves the pier at 19:00 for an approximately 2-hour loop along the southern Bosphorus.\n\nThe Bosphorus is a 31-kilometre strait separating Europe from Asia, linking the Black Sea to the Sea of Marmara. Istanbul straddles both banks, and the southern stretch of the strait — from the old city up to Rumeli Hisarı — holds the densest concentration of Ottoman waterfront heritage in the country. From the deck the route passes Dolmabahçe Sarayı (the 1856 imperial residence built for Sultan Abdülmecid I), the Maiden's Tower on its small islet about 200 metres off the Asian shore, the 1853 Baroque façade of Ortaköy Camii against the first Bosphorus Bridge, and finally Rumeli Hisarı — the 1452 fortress Mehmed II raised in four months to control the strait before the conquest of Constantinople. The yacht turns there and heads back south as the sky moves into blue hour.\n\nWe operate two pricing tiers on the same route. The base Without-Wine fare is €34 (€30 on Monday, Tuesday and Thursday sailings), and the With-Wine fare is €40 (€35 on the same three weekdays). The midweek discount applies automatically at checkout — no coupon code is needed, and the structure is fixed every week of the year.\n\nOnboard hospitality is laid out across three small categories rather than one long list. Hot drinks include freshly brewed tea and Turkish coffee. The cold-drink selection is iced tea, house lemonade, a seasonal fruit juice and bottled water. A snack platter with mixed nuts, salted crackers and a fresh-fruit plate is served from the moment guests board. Guests on the With-Wine package additionally receive two glasses of wine each. A live English-speaking guide narrates the landmarks as the vessel passes each one.\n\nMerrySails operates under Meryem Yıldız Travel — TURSAB A Group licensed since 2001 with 50,000+ guests hosted on the Bosphorus over that period.",
    duration: "2 hours",
    capacity: "Shared sunset yacht seating",
    priceEur: 30,
    originalPriceEur: 50,
    packages: [
      {
        name: "Without Wine",
        price: 34,
        originalPrice: 50,
        description: "Shared 2-hour golden-hour cruise with light hospitality and no wine service",
        features: [
          "2-hour sunset sailing on a shared luxury yacht",
          "Live English-speaking guide on board",
          "Hot drinks — tea and Turkish coffee",
          "Cold drinks — iced tea, lemonade, fruit juice and bottled water",
          "Snack platter — mixed nuts, crackers and a fresh-fruit plate",
        ],
        weekdayDiscount: { weekdays: [1, 2, 4], discountedPrice: 30, label: "Monday, Tuesday & Thursday Sailings" },
      },
      {
        name: "Bosphorus Sunset Cruise with Wine",
        price: 40,
        originalPrice: 56,
        description: "Shared sunset departure with wine service on the same 2-hour Bosphorus route",
        features: [
          "2-hour sunset sailing on a shared luxury yacht",
          "2 glasses of wine per guest",
          "Hot drinks — tea and Turkish coffee",
          "Cold drinks — iced tea, lemonade, fruit juice and bottled water",
          "Snack platter — mixed nuts, crackers and a fresh-fruit plate",
          "Live English-speaking guide on board",
        ],
        weekdayDiscount: { weekdays: [1, 2, 4], discountedPrice: 35, label: "Monday, Tuesday & Thursday Sailings" },
      },
    ],
    includes: [
      "2-hour shared Bosphorus sunset sailing on a luxury yacht",
      "Live English-speaking guide narrating the route",
      "Hot drinks — tea and Turkish coffee",
      "Cold drinks — iced tea, lemonade, fruit juice and bottled water",
      "Snack platter — mixed nuts, crackers and a fresh-fruit plate",
      "2 glasses of wine per guest on the With-Wine option",
    ],
    notIncluded: [
      "Wine service outside the selected sunset option",
      "Other alcoholic drinks",
      "Hotel pickup and drop-off (+ extra charge)",
      "Tips",
    ],
    highlights: ["Maiden's Tower", "Dolmabahçe Palace", "Ortaköy Mosque", "Rumeli Fortress", "Bosphorus Bridge"],
    badge: "",
    badgeColor: "",
    // Sunset visuals parked 2026-05-27 — fresh original shoot pending.
    // Using our own yacht photos from the fleet folder as placeholder.
    image: "/images/sunset-2026/hero.jpeg",
    gallery: [
      "/images/sunset-2026/hero.jpeg",
      "/images/sunset-2026/01.jpeg",
      "/images/sunset-2026/02.jpeg",
      "/images/sunset-2026/03.jpeg",
      "/images/sunset-2026/04.jpeg",
      "/images/sunset-2026/05.jpeg",
      "/images/sunset-2026/06.jpeg",
      "/images/sunset-2026/07.jpeg",
      "/images/sunset-2026/08.jpeg",
      "/images/sunset-2026/09.jpeg",
      "/images/sunset-2026/10.jpeg",
      "/images/sunset-2026/11.jpeg",
      "/images/sunset-2026/12.jpeg",
    ],
    /* Parked 2026-05-26 — restore when new originals are ready:
    image: "/images/sunset5.jpeg",
    gallery: [
      "/images/sunset5.jpeg",
      "/images/sunset1.jpeg",
      "/images/sunset2.jpeg",
      "/images/sunset3.jpeg",
      "/images/sunset4.jpeg",
      "/images/sunset6.jpeg",
    ],
    videoSrc: "/images/sunsetvideo.mp4",
    */
    route: "Karaköy ferry pier (next to the Mimar Sinan statue, by Marmaray and Balıkçı Kemal) → Dolmabahçe & Ortaköy → First Bosphorus Bridge → Rumeli Hisarı turnaround → return at blue hour",
    departureTime: "19:00 (boarding from 18:30)",
    departurePoint: "Karaköy ferry pier next to the Mimar Sinan statue (by Marmaray, near Balıkçı Kemal) — exact boarding berth confirmed by WhatsApp after booking",
    category: "cruise",
    rating: 4.93,
    reviewCount: 621,
    availability: "All Year",
    bestFor: [
      "Couples and golden-hour travelers",
      "First-time Istanbul visitors",
      "Photography enthusiasts and golden hour istanbul seekers",
      "Travelers on a tight itinerary (2-hour format)",
      "Small groups on a shared luxury yacht",
      "Guests who prefer a relaxed sunset boat tour without dinner",
      "Families with older children or teens",
      "Solo travelers joining a shared sailing",
    ],
    importantNotes: [
      "The live public sunset ladder starts from EUR 30 (every Mon, Tue & Thu) — EUR 34 on other days for Without Wine; wine option from EUR 35 (Mon, Tue & Thu) or EUR 40 on other days",
      "The shared sunset product runs as a small-group luxury-yacht format and the final boarding count can vary by departure",
      "The cruise departs from Karaköy ferry pier Meydanı, next to the Mimar Sinan statue — boarding from 18:30, vessel leaves at 19:00",
      "The same sunset route can be booked with or without wine service depending on the selected option",
      "A live English-speaking guide narrates the landmarks during the sailing",
      "Hotel pickup and drop-off are available as an extra service on the shared sunset cruise",
      "Departure time shifts with the season: April-May around 19:00, June-August around 20:00-20:30, September-October around 18:30-19:30, November-March around 17:00-17:30 — the exact slot is confirmed at booking",
      "Peak summer departures (June-August) offer the longest golden-hour window on the water; spring and autumn offer cooler temperatures and fewer crowds",
      "Arrive at the Karakoy meeting point at least 15 minutes before departure — the boarding flow starts 15 minutes early",
    ],
    canonicalPath: "/cruises/bosphorus-sunset-cruise",
    isCoreProduct: true,
    showPricing: true,
    bookingMode: "book",
    priceMode: "perPerson",
    itinerary: [
      { time: "18:45", title: "Boarding Before Sunset", description: "Meet at the confirmed Bosphorus-side point, board the shared yacht, and settle in before departure." },
      { time: "19:00", title: "Maiden's Tower & Dolmabahce", description: "The route starts with Istanbul's most photogenic southern Bosphorus landmarks while the guide shares historical context." },
      { time: "19:20", title: "Ortakoy & First Bridge", description: "Cruise into the golden-hour stretch where Ortakoy Mosque and the first Bosphorus Bridge frame the skyline." },
      { time: "19:45", title: "Rumeli Fortress at Golden Hour", description: "Reach the upper landmark zone as the sunset color peaks across the water and waterfront mansions." },
      { time: "20:25", title: "Blue-Hour Return", description: "Sail back toward the city lights with drinks and snacks still being served on board." },
    ],
    faq: [
      { question: "How much is the Bosphorus sunset cruise?", answer: "The live public sunset ladder starts from EUR 30 per person (every Monday, Tuesday and Thursday). On other days the Without Wine option is EUR 34 and the wine-served option is EUR 40 per guest." },
      { question: "Is there a weekday discount on the sunset cruise?", answer: "Yes. Every Monday, Tuesday and Thursday sailing of the Bosphorus sunset cruise runs at a lower price: the Without Wine option is EUR 30 instead of EUR 34, and the With Wine option is EUR 35 instead of EUR 40. The discount applies automatically when you choose a Monday, Tuesday or Thursday date — no promo code is needed and the schedule is fixed, so the midweek price is reliable all year." },
      { question: "How many sunset options are there?", answer: "The public sunset cruise is structured around two shared options on the same route: Without Wine and Bosphorus Sunset Cruise with Wine." },
      { question: "What is included in the sunset cruise?", answer: "Both packages cover the full 2-hour sailing with a live English-speaking guide. Onboard hospitality is grouped into three categories: hot drinks (tea, Turkish coffee), cold drinks (iced tea, lemonade, fruit juice, bottled water) and a snack platter with mixed nuts, crackers and a fresh-fruit plate. The With-Wine package adds 2 glasses of wine per guest." },
      { question: "How long does the cruise last?", answer: "The sunset cruise lasts approximately 2 hours and the public booking flow is shown as a 19:00 departure." },
      { question: "Where does the sunset cruise depart from?", answer: "The cruise departs from Karaköy ferry pier, beside the Mimar Sinan statue (by Marmaray, near Balıkçı Kemal). Boarding starts at 18:30 and the vessel leaves the pier at 19:00. The exact boarding berth is shared by WhatsApp after booking." },
      { question: "What happens if the weather is bad?", answer: "If sailing conditions become unsafe, the cruise can be moved to another departure or refunded according to the booking terms." },
      { question: "What time does the Bosphorus sunset cruise depart in 2026?", answer: "The departure time adjusts seasonally to stay inside the golden-hour window. In summer (June-August) departures are typically around 20:00-20:30, spring and autumn (April-May, September-October) around 18:30-19:30, and winter (November-March) around 17:00-17:30. The confirmed slot is shared at booking." },
      { question: "Is the Bosphorus sunset cruise worth it?", answer: "Yes — the istanbul sunset cruise is one of the most efficient ways to see the Bosphorus landmarks and the city skyline in the best light of the day, without committing to a 3.5-hour dinner program. From EUR 30 (Mon, Tue & Thu) on a shared luxury yacht with live guiding, it is a strong value for a 2-hour golden hour bosphorus experience. The shared format means you are alongside other guests rather than on a private charter, but the yacht is a luxury vessel and the group size stays manageable. For first-time visitors who want the Bosphorus context before choosing a private or dinner product, this is the most direct 2-hour entry point." },
      { question: "Can I take photos on the sunset cruise?", answer: "Absolutely. The shared yacht has open deck space and the route is timed to pass Maiden's Tower, Ortakoy Mosque, and Rumeli Fortress during peak golden-hour color. Most guests bring cameras or shoot on phones — the crew does not restrict photography from the deck. The western-facing sections of the route (early in the cruise) catch the sun directly; the Maiden's Tower passage and the Ortakoy Mosque view tend to offer the strongest foreground-to-sky contrast. If you want dedicated sunset photography coverage, the private bosphorus sunset cruise option gives you the yacht exclusively and allows you to add a professional photographer as an extra." },
      { question: "What is the difference between the With Wine and Without Wine option?", answer: "Both options sail the same 2-hour route on the same shared luxury yacht with the same three-category hospitality (hot drinks, cold drinks, snack platter). The only difference is that the With-Wine option adds 2 glasses of wine per guest and is priced at EUR 40 (or EUR 35 on Mon, Tue & Thu), while the Without-Wine option is EUR 34 (or EUR 30 on Mon, Tue & Thu) and skips alcohol entirely." },
      { question: "How early should I arrive for the sunset cruise?", answer: "Plan to be at the Karakoy meeting point at least 15 minutes before departure. The boarding flow starts early and late arrivals can miss the vessel. The exact meeting pin is sent after booking." },
    ],
  },
  {
    id: "2",
    slug: "bosphorus-dinner-cruise",
    name: "Boğaz Yemekli Tur",
    nameEn: "Bosphorus Dinner Cruise",
    description: "Shared Bosphorus dinner cruise in Istanbul with four verified package tiers, dinner service, Turkish-night shows, and hotel pickup support from central European-side zones.",
    longDescription: "This shared dinner cruise is built around four public packages on the same Bosphorus night route: Silver Dinner Cruise - Soft Drinks at EUR 30, Silver Dinner Cruise - Alcoholic at EUR 45, Gold Dinner Cruise - Soft Drinks at EUR 80, and Gold Dinner Cruise - Unlimited Alcohol at EUR 90.\n\nThe cruise lasts about 3.5 hours, runs on a shared dinner boat, and uses the Kabatas Pier boarding flow. For many central European-side hotels, pickup and drop-off are part of the shared dinner-cruise operation, and the live calendar currently shows 20:30 departures.\n\nAcross the ladder, the evening combines dinner service, stage entertainment, DJ music, and illuminated Bosphorus views. The main package differences are not the route itself but the table tier, beverage inclusion, and dinner-menu level. Silver stays with standard seating arranged by the operation, while Gold moves into guaranteed stage-close VIP tables with a wider menu and more premium service.\n\nThe dinner menu follows a classic Turkish-night banquet structure. Both Silver and Gold packages open with a welcome cocktail and a spread of 10 cold mezes — typically white bean salad, stuffed vine leaves (yaprak sarma), hummus, tarama, shepherd\u2019s salad, roasted red pepper, cacik (yogurt with cucumber and mint), eggplant salad, white cheese, and seasonal pickles. A fresh seasonal salad and a hot starter follow before the main course. The main course is served as a live-selection at the table: guests choose between a fish option, chicken option, or a meat dish. Vegetarian guests can request a grilled vegetable plate or pasta as a substitute — inform the crew at boarding and the kitchen will accommodate. The meal closes with baklava (flaky pastry layered with pistachio and honey syrup) and a fresh fruit plate, accompanied by Turkish coffee or tea.\n\nSilver packages serve the same menu with standard seating. Gold packages elevate the experience with a broader VIP dinner menu — additional starter choices, chef-attended main-course service, and priority table placement guaranteeing stage visibility. Gold Unlimited Alcohol adds unlimited local and imported alcoholic drinks (raki, wine, beer, spirits) on top of the VIP food menu.\n\nChildren are warmly welcome on all dinner cruise packages. The kid-friendly environment includes the show program, the illuminated Bosphorus sailing, and the same dinner menu. Children aged 3 and under join free of charge; ages 4 to 10 are eligible for a child discount — confirm when booking. Families regularly choose Silver Soft Drinks as the most comfortable format for mixed-age groups.\n\nThe entertainment program runs in three acts across the 3.5 hours: an opening Turkish folklore and belly-dance segment, a live music interlude with Turkish and international hits, and a DJ-led finale. The stage sits centrally in the main saloon — Gold tables are positioned within 5 metres of the stage. The program runs in parallel with dinner service so guests never have to pause eating to watch the show.\n\nThe Istanbul dinner cruise departs from Kabatas Pier at 20:30. Pickup from central European-side districts (Sultanahmet, Sirkeci, Topkapi, Taksim, Harbiye, Beyoglu, Karakoy) is included in all packages. Asian-side guests should make their way independently to Kabatas — return timing after the cruise is typically around midnight, which is too late for regular ferry connections. With 50,000+ guests hosted since 2001 under TURSAB A Group license, Merry Tourism operates this route as one of Istanbul\u2019s most consistently rated shared dinner-cruise products.",
    duration: "3.5 hours",
    capacity: "Shared dinner boat seating arranged by package",
    priceEur: 30,
    originalPriceEur: 40,
    packages: [
      {
        name: "Silver Dinner Cruise - Soft Drinks",
        price: 30,
        originalPrice: 40,
        description: "Entry shared dinner cruise with standard seating and unlimited soft drinks",
        features: [
          "3.5-hour shared Bosphorus dinner cruise",
          "Standard seating with no table selection",
          "Welcome cocktail and 10 cold mezes",
          "Fresh seasonal salad, hot starter, live dinner menu selection, baklava and fruit",
          "Unlimited soft drinks and tea included",
          "Hotel pickup and drop-off from central European-side areas",
          "Traditional Turkish shows and DJ",
        ],
      },
      {
        name: "Silver Dinner Cruise - Alcoholic",
        price: 45,
        originalPrice: 60,
        weekdayDiscount: { weekdays: [1, 2, 4], discountedPrice: 40, label: "Monday, Tuesday & Thursday Sailings" },
        description: "Shared dinner cruise with standard seating and local alcoholic service",
        features: [
          "3.5-hour shared Bosphorus dinner cruise",
          "Standard seating with no table selection",
          "Welcome cocktail and 10 cold mezes",
          "Fresh seasonal salad, hot starter, live dinner menu selection, baklava and fruit",
          "2 glasses of local alcoholic drinks plus soft drinks and tea",
          "Imported drinks available with extra charge",
          "Hotel pickup and drop-off from central European-side areas",
          "Traditional Turkish shows and DJ",
        ],
      },
      {
        name: "Gold Dinner Cruise - Soft Drinks",
        price: 80,
        originalPrice: 110,
        weekdayDiscount: { weekdays: [1, 2, 4], discountedPrice: 75, label: "Monday, Tuesday & Thursday Sailings" },
        description: "Premium shared dinner cruise with guaranteed stage-close VIP table and unlimited soft drinks",
        features: [
          "3.5-hour shared Bosphorus dinner cruise",
          "Guaranteed VIP table close to the stage",
          "Welcome drink, Turkish appetizers, seasonal salads and hot starter",
          "Broader VIP dinner menu with chef-served main-course selection",
          "Baklava and fruit dessert service",
          "Unlimited soft drinks",
          "Hotel pickup and drop-off from central European-side areas",
          "Special shows and professional DJ",
        ],
      },
      {
        name: "Gold Dinner Cruise - Unlimited Alcohol",
        price: 90,
        originalPrice: 120,
        weekdayDiscount: { weekdays: [1, 2, 4], discountedPrice: 85, label: "Monday, Tuesday & Thursday Sailings" },
        description: "Premium shared dinner cruise with best stage-view VIP tables and unlimited local plus imported alcoholic drinks",
        features: [
          "3.5-hour shared Bosphorus dinner cruise",
          "Best VIP tables close to the stage guaranteed",
          "Welcome drink, Turkish appetizers, mixed salads and hot starter",
          "Best-available VIP dinner menu with live service selection",
          "Baklava and fruit dessert service",
          "Unlimited local and imported alcoholic drinks plus unlimited soft drinks",
          "Hotel pickup and drop-off from central European-side areas",
          "Premium service, special shows and DJ performance",
        ],
      },
    ],
    includes: [
      "3.5-hour shared Bosphorus dinner cruise",
      "Hotel pickup and drop-off from central European-side hotels",
      "Air-conditioned transfer vehicle",
      "Dinner service and package-based table tier",
      "Traditional Turkish entertainment and DJ performance",
      "Package-based beverage service",
    ],
    notIncluded: ["Imported drinks on Silver Alcoholic", "Tips", "Private yacht dinner setup", "Professional photo service"],
    highlights: ["Silver and Gold package ladder", "Guaranteed VIP tables on Gold", "Dinner service", "Turkish night entertainment", "Hotel transfer from central areas"],
    badge: "Best Seller",
    badgeColor: "bg-[var(--brand-primary)] text-white",
    // DMCA-disputed images moved off public/ on 2026-05-26 pending resolution.
    // Originals preserved at ~/Desktop/_dmca-backup-2026-05-26 for evidence/restoration.
    // image kept as generic CC0 Bosphorus skyline so og:image + Product JSON-LD remain
    // populated; gallery [] hides the visible hero block (TourDetailClient skips render).
    image: "/images/dinner-etkinlik-13.jpeg",
    gallery: [
      "/images/dinner-etkinlik-13.jpeg",
      "/images/dinner-etkinlik.jpeg",
      "/images/dinner-etkinlik-2.jpeg",
      "/images/dinner-etkinlik-3.jpeg",
      "/images/dinner-etkinlik-4.jpeg",
      "/images/dinner-etkinlik-5.jpeg",
      "/images/dinnet-etkinlik-6.jpeg",
      "/images/dinner-etkinlik-7.jpeg",
      "/images/dinner-etkinlik-8.jpeg",
      "/images/dinner-etkinlik-9.jpeg",
      "/images/dinner-etkinlik-10.jpeg",
      "/images/dinner-etkinlik-11.jpeg",
      "/images/dinner-etkinlik-12.jpeg",
      "/images/dinner-etkinlik-13.jpeg",
      "/images/vip-menu.jpeg",
      "/images/vip-menu-1.jpeg",
      "/images/vip-menu-2.jpeg",
      "/images/fix-vip-menu.jpeg",
      "/images/fix-vip-menu-2.jpeg",
      "/images/meze.jpeg",
      "/images/meze-1.jpeg",
      "/images/vip-meyve.jpeg",
      "/images/balik-fix-vip.jpeg",
      "/images/vegan-fix-vip.jpeg",
    ],
    route: "Kabatas departure → illuminated Bosphorus route → return to central pier",
    departureTime: "20:30",
    departurePoint: "Kabatas Pier",
    category: "cruise",
    rating: 4.88,
    reviewCount: 312,
    availability: "All Year",
    bestFor: [
      "Guests who want the classic Istanbul night-cruise experience",
      "Visitors comparing Silver vs Gold seating and drink levels",
      "Travelers who prefer dinner, entertainment, and skyline views in one booking",
      "Friends, couples, and small groups who do not need a private yacht",
      "Families with children — kids welcome, child discount ages 3-13",
      "Vegetarian and dietary-conscious travelers — menu substitutions available",
      "Guests celebrating birthdays, anniversaries, or special occasions",
      "Hotel guests in Sultanahmet, Taksim, or Beyoglu — hotel pickup included",
    ],
    importantNotes: [
      "Kabatas Pier is the main meeting point, with pickup flow depending on the final package and boarding plan",
      "Pickup coverage usually centers on European-side districts such as Sultanahmet, Sirkeci, Topkapi, Taksim, Harbiye, Beyoglu, and Karakoy",
      "Asian-side stays generally make their own way to Kabatas because return timing is late for regular public transport",
      "Some streets may require a nearby meeting point instead of direct hotel-door pickup",
      "Silver uses standard seating, while Gold moves into guaranteed stage-close VIP tables",
      "Silver Dinner Cruise - Alcoholic currently includes 2 glasses of local alcoholic drinks plus soft drinks and tea",
      "Gold Dinner Cruise - Unlimited Alcohol is the top shared package and includes unlimited local and imported alcoholic drinks",
      "Silver packages can be booked up to 50 guests per booking, while Gold tiers currently show up to 30 guests per booking",
      "The live calendar currently shows evening departures at 20:30",
    ],
    canonicalPath: "/istanbul-dinner-cruise",
    isCoreProduct: true,
    showPricing: true,
    bookingMode: "book",
    priceMode: "perPerson",
    itinerary: [
      { time: "TBC", title: "Hotel Pickup & Boarding", description: "Guests using transfer service are collected from central European-side hotels, then board the shared dinner boat and settle into their assigned seating." },
      { time: "TBC", title: "Dinner Service", description: "Welcome cocktail, cold mezes, salad, main-course choice, dessert, fruit, and package-based drinks are served on board." },
      { time: "TBC", title: "Night Show Program", description: "The stage program combines Turkish night entertainment, live music, and DJ-led transitions while the cruise continues on the Bosphorus." },
      { time: "TBC", title: "Illuminated Bosphorus Sailing", description: "Between service and performances, the cruise continues along Istanbul's evening shoreline." },
      { time: "TBC", title: "Return to Pier & Hotel Drop-Off", description: "The boat returns after the show program and the final service round, followed by hotel drop-off for transferred guests." },
    ],
    faq: [
      { question: "How many dinner-cruise packages are available?", answer: "The shared dinner cruise is presented in four packages: Silver Soft Drinks, Silver Alcoholic, Gold Soft Drinks, and Gold Unlimited Alcohol." },
      { question: "What is the entry price for the dinner cruise?", answer: "The current package grid starts from EUR 30 per guest for the Silver soft-drinks option." },
      { question: "Is there a weekday discount on the dinner cruise?", answer: "Yes. On every Monday, Tuesday and Thursday departure three packages are EUR 5 lower: Silver Alcoholic is EUR 40 (from EUR 45), Gold Soft Drinks is EUR 75 (from EUR 80), and Gold Unlimited Alcohol is EUR 85 (from EUR 90). The Silver Soft Drinks entry tier stays at EUR 30. The lower price is applied automatically when you pick a Monday, Tuesday or Thursday date — no promo code is required." },
      { question: "What is the highest package price?", answer: "The top shared dinner-cruise option is the Gold Unlimited Alcohol package at EUR 90 per guest." },
      { question: "Is this page for private yacht dinners?", answer: "No. This page is for the shared Bosphorus dinner cruise. Private yacht dinners have their own page so guests can choose the right experience quickly." },
      { question: "What changes between the packages?", answer: "The route stays the same, but the package difference is real: Silver uses standard seating, Gold uses guaranteed VIP tables close to the stage, Silver Alcoholic adds a limited local-alcohol service, and Gold Unlimited Alcohol adds unlimited local plus imported alcoholic drinks." },
      { question: "Is hotel pickup available from the Asian side?", answer: "No. Shared dinner-cruise pickup usually focuses on central European-side districts, so Asian-side guests normally come directly to the Kabatas side." },
      { question: "Is the dinner cruise menu vegetarian-friendly?", answer: "Yes. The main course is offered as a live selection at the table — guests can request a grilled vegetable plate or pasta as a vegetarian substitute. Inform the crew at boarding and the kitchen will accommodate. The rest of the menu (mezes, salad, baklava, fruit, Turkish coffee) is suitable for vegetarians." },
      { question: "Are kids welcome on the dinner cruise?", answer: "Yes, children are warmly welcome on all dinner cruise packages. Children aged 3 and under join free of charge; ages 4 to 10 are eligible for a child discount — confirm at booking. The show program and illuminated Bosphorus sailing are family-friendly. The Silver Soft Drinks package is the most popular choice for families with mixed-age groups." },
      { question: "Can I book the dinner cruise with hotel pickup from Sultanahmet?", answer: "Yes. Hotel pickup is included in all four dinner cruise packages. The pickup route covers central European-side districts including Sultanahmet, Sirkeci, Topkapi, Taksim, Harbiye, Beyoglu, and Karakoy. Your exact pickup time and meeting point are confirmed after booking. Asian-side guests should come directly to Kabatas Pier at 20:30." },
      { question: "What is the dress code on the dinner cruise?", answer: "There is no strict dress code. Smart casual attire is recommended — most guests dress comfortably but presentably. Flat, non-slip shoes are advisable for walking on deck. There is no requirement for formal dress on any package, including Gold Unlimited Alcohol." },
      { question: "How many courses are served on the dinner cruise?", answer: "The dinner follows a multi-course banquet format. You receive: a welcome cocktail, 10 cold mezes (stuffed vine leaves, hummus, shepherd's salad, cacik, eggplant salad, white cheese, and more), a fresh seasonal salad, a hot starter, a live main-course selection (fish, chicken, or meat), baklava, and a fresh fruit plate with Turkish coffee or tea. Gold packages include an expanded VIP menu with additional starter choices and chef-attended main-course service." },
    ],
  },
  {
    id: "3",
    slug: "yacht-charter-in-istanbul",
    name: "İstanbul Yat Kiralama",
    nameEn: "Yacht Charter in Istanbul",
    description: "Private Bosphorus yacht charter across a six-vessel fleet from EUR 220 — boutique 12-guest and premium 15-guest decks, 40-guest group yachts in Standard and Signature trims, and event-class yachts at 90 and 150 guests. Whole-yacht pricing, captain and crew included, automatic 10% drop from 3 hours.",
    longDescription: "Pick the yacht that fits your group, then expand it with catering, alcohol, DJ, live music, photographer, transfer, or extra time on the water — each on a separate brief. The bookable fleet spans a 12-guest boutique yacht (from EUR 220/2h) and a 15-guest premium yacht (from EUR 320/2h), 40-guest group yachts in Standard (from EUR 380/2h) and Signature (from EUR 500/2h) trims, with the 90-guest event yacht and the 150-guest mega event yacht booked by bespoke quote.\n\nEvery bookable sailing starts on a 2-hour minimum and uses the same fixed structure: captain, crew, fuel, soft drinks, and snacks ride with the deck price. From 3 hours onward, a flat 10% reduction is applied automatically across the bookable fleet. Catering, alcohol service, DJ, dance acts, proposal styling, photographer, and hotel transfer sit on a separate quote so the deck price stays clean.\n\nA private sailing is fundamentally different from a shared cruise. The yacht is exclusively yours: no other passengers, no fixed departure synced to a group headcount, no shared hospitality queue. The captain shapes the route around the sections of the strait you want to spend time at, and the pace adapts to your group rather than a public timetable. Decoration, custom catering, photography, and live music can all be arranged through the separate brief that sits next to the deck price.",
    duration: "2 hours (extendable)",
    capacity: "Yacht size is matched to package tier and group plan",
    priceEur: 220,
    originalPriceEur: 260,
    packages: [
      {
        name: "Boutique Yacht · 12 Guests",
        price: 220,
        originalPrice: 260,
        description: "Boutique-class yacht for up to 12 guests on a 2-hour Bosphorus sailing",
        features: [
          "2-hour private Bosphorus sailing (whole yacht)",
          "Capacity up to 12 guests",
          "Licensed captain and crew",
          "Soft drinks, water, and light snack tray",
          "Bluetooth audio onboard",
          "10% discount automatic from 3 hours",
        ],
        addOns: yachtSharedAddOns,
      },
      {
        name: "Premium Yacht · 15 Guests",
        price: 320,
        originalPrice: 380,
        description: "Premium yacht with a wider top deck and refined lounge for up to 15 guests",
        features: [
          "2-hour private Bosphorus sailing (whole yacht)",
          "Capacity up to 15 guests",
          "Licensed captain and crew",
          "Soft drinks, water, and light snack tray",
          "Bluetooth audio onboard",
          "10% discount automatic from 3 hours",
        ],
        addOns: yachtPremiumAddOns,
      },
      {
        name: "Group Yacht · 40 Guests · Standard",
        price: 380,
        originalPrice: 450,
        description: "Group-class yacht for up to 40 guests at the smaller-group (≤15) Standard rate",
        features: [
          "2-hour private Bosphorus sailing (whole yacht)",
          "Capacity up to 40 guests",
          "Licensed captain and crew",
          "Soft drinks, water, and light snack tray",
          "Bluetooth audio onboard",
          "10% discount automatic from 3 hours",
        ],
        addOns: yachtVipAddOns,
      },
      {
        name: "Group Yacht · 40 Guests · Signature",
        price: 500,
        originalPrice: 590,
        description: "Same 40-guest group yacht at the larger-group (15–40) Signature rate",
        features: [
          "2-hour private Bosphorus sailing (whole yacht)",
          "Capacity 15–40 guests",
          "Licensed captain and crew",
          "Soft drinks, water, and light snack tray",
          "Bluetooth audio onboard",
          "10% discount automatic from 3 hours",
        ],
        addOns: yachtVipAddOns,
      },
    ],
    addOns: yachtSharedAddOns,
    includes: [
      "2-hour private Bosphorus yacht cruise",
      "Professional captain and crew",
      "Tea, coffee and water",
      "Package-specific yacht tier",
    ],
    notIncluded: [
      "Meal, drink, transfer, and entertainment extras outside the selected package",
      "Tips",
    ],
    highlights: [
      "Per-vessel yacht fleet ladder",
      "Private Bosphorus route",
      "Package-specific extras menu",
      "Per-yacht pricing",
      "Extra-hour option by tier",
    ],
    badge: "Premium",
    badgeColor: "bg-amber-500 text-white",
    // DMCA-disputed images moved off public/ on 2026-05-26 pending resolution.
    // Originals preserved at ~/Desktop/_dmca-backup-2026-05-26 for evidence/restoration.
    // image kept as generic CC0 Bosphorus skyline so og:image + Product JSON-LD remain
    // populated; gallery [] hides the visible hero block (TourDetailClient skips render).
    image: "/images/tours/yacht-charter-in-istanbul/01.webp",
    gallery: [
      "/images/tours/yacht-charter-in-istanbul/01.webp",
      "/images/tours/yacht-charter-in-istanbul/02.webp",
      "/images/tours/yacht-charter-in-istanbul/03.webp",
      "/images/tours/yacht-charter-in-istanbul/04.webp",
      "/images/tours/yacht-charter-in-istanbul/05.webp",
      "/images/tours/yacht-charter-in-istanbul/06.webp",
    ],
    route: "Custom route based on preference",
    departureTime: "Flexible",
    departurePoint: "Bosphorus marina confirmed with yacht assignment",
    category: "private",
    rating: 5.0,
    reviewCount: 65,
    bestFor: [
      "Couples and private celebrations",
      "Proposal and engagement nights on the Bosphorus",
      "Anniversary and honeymoon experiences",
      "Birthday and milestone celebrations",
      "Corporate team events and client entertainment",
      "Family reunions and multi-generational groups",
      "Professional photoshoots with Bosphorus backdrop",
      "Friend groups who want total privacy on the water",
    ],
    importantNotes: [
      "The real difference between vessels is yacht size, comfort, and stability level — the boat is priced per vessel for the whole charter, not per person",
      "The Boutique 12-guest yacht (from €220) is the entry point for couples and small groups; larger groups step up to the Premium 15, Group 40 Standard, or Group 40 Signature, with the Event and Mega Event yachts quoted on request",
      "Every charter is a captained private sailing; guests are not asked to skipper the vessel themselves",
      "Add-on rates change with the vessel and the request, especially for extra hours, wine, meal menus, and proposal decoration",
      "The live booking flow presents each bookable yacht as a standard 2-hour private cruise, then opens customization through optional extras at checkout",
      "Booking 2 to 3 days ahead is recommended for standard charters, while larger event plans should be arranged 1 to 2 weeks earlier",
      "The final departure marina is confirmed with the yacht assignment and booking details",
      "Weather flexibility: if conditions on the original departure date are unsuitable for sailing, the booking can be rescheduled to the next available date at no extra charge",
      "Route customization: the captain can be briefed on specific landmarks or areas you want to focus on — sunset angle, Maiden's Tower approach, upper Bosphorus villages — and will adapt the route accordingly",
      "Crew composition: every charter includes a licensed captain and a deck crew member; additional crew such as a dedicated host, professional photographer, or musician can be added through the extras menu during booking",
    ],
    canonicalPath: "/yacht-charter-istanbul",
    isCoreProduct: true,
    showPricing: true,
    bookingMode: "book",
    priceMode: "perGroup",
    faq: [
      { question: "How many yachts are in the charter fleet?", answer: "The MerrySails charter fleet currently shows six yachts on the page: a 12-guest boutique yacht, a 15-guest premium yacht, two 40-guest group yachts (Standard and Signature), a 90-guest event yacht, and a 150-guest mega event yacht. Each yacht has its own dedicated detail page with full pricing." },
      { question: "Are yacht prices per person or per yacht?", answer: "All yacht charter prices are per yacht (per deck), never per guest." },
      { question: "What is the entry yacht price?", answer: "The entry yacht is the 12-guest boutique yacht from EUR 220 for a 2-hour Bosphorus sailing." },
      { question: "What changes between yachts in the fleet?", answer: "Deck size, onboard comfort, and ride smoothness differ across the six yachts. All bookable yachts share the same 2-hour minimum and accept the same add-on categories on a separate brief. A flat 10% discount applies automatically from a 3-hour sailing onward across the bookable fleet." },
      { question: "Can add-ons be layered on top of the charter?", answer: "Yes. Catering, alcohol, DJ, live music, photographer, proposal styling, and transfer are quoted separately per request. Soft drinks and light snacks are part of the deck price." },
      { question: "How much is one extra hour?", answer: "Hourly totals scale per yacht class. From a 3-hour sailing onward the published total already applies the flat 10% discount across the bookable fleet — see each yacht's own pricing table for exact totals at every duration step." },
      { question: "How much does a private yacht charter in Istanbul cost?", answer: "A private Bosphorus yacht charter at MerrySails starts from EUR 220 for a 2-hour sailing on the 12-guest boutique yacht — priced per yacht, not per guest. The per-vessel ladder runs from EUR 220 (boutique 12) through the 15-guest premium yacht (from EUR 320) and the 40-guest group yacht (from EUR 380 Standard, EUR 500 Signature); the 90-guest event yacht and the 150-guest mega event yacht are by bespoke quote. Captain, crew, fuel, soft drinks and snacks are included on every charter, with no concierge or OTA markup added — you book direct from the TÜRSAB A-Group operator. Sailings of 3 hours or longer drop a flat 10% automatically. Add-ons such as catering, wine, decoration, DJ, and photographer are layered on via a separate brief." },
      { question: "What is the difference between a shared cruise and a private yacht charter?", answer: "On a shared cruise you sail alongside other guests on a fixed route at a fixed departure time — it is an efficient and affordable way to see the Bosphorus. On a private yacht charter the boat is exclusively yours: no other passengers, departure at a time that suits you, and a captain who adapts the route to your preferences. You can also bring your own decoration, catering, or photographer, none of which are possible on a shared product. The private format is a fundamentally different experience designed for occasions, not sightseeing." },
      { question: "Can we hire a yacht for a marriage proposal in Istanbul?", answer: "Yes. The Bosphorus is one of the most iconic proposal locations in the world, and Merry Tourism (TURSAB A Group licensed since 2001) has arranged proposal sailings for guests from dozens of countries. Proposal extras — rose petal decoration, professional photographer, champagne, a cake, and candlelit table setup — are quoted separately and can be added to any yacht in the bookable fleet. The 12-guest boutique yacht is the most popular choice for proposals; the 15-guest premium yacht adds more room if you want to host close family on board after the moment. The captain circles the Maiden's Tower at the requested time so the proposal lands on the most iconic backdrop in the city." },
      { question: "Are private yacht charters available year-round in Istanbul?", answer: "Yes. Merry Tourism operates private Bosphorus yacht charters every month of the year. Istanbul has a four-season climate: summer (June-September) offers warm evenings ideal for deck use, spring and autumn offer mild temperatures with dramatic light for photography, and winter sailings are fully operational on calm days. If weather on your booked date is unsuitable for sailing, your booking is rescheduled at no charge. For events such as proposals or celebrations, early booking (1-2 weeks ahead) is recommended during peak summer months." },
      { question: "What is included in the EUR 220 entry yacht charter?", answer: "The 12-guest boutique yacht from EUR 220 for 2 hours covers: a private Bosphorus sailing on a boutique-class yacht, a licensed captain and deck crew, complimentary soft drinks, water, and a light snack tray on board. The yacht is exclusively yours for the duration — no other guests. From this base you can add catering, wine and drinks, proposal decoration, a professional photographer, live music, extra hours, or round-trip hotel transfer on a separate brief that runs alongside the deck price." },
      { question: "Where do private yachts depart from in Istanbul?", answer: "The departure marina is confirmed with your booking details once the yacht assignment is made. Merry Tourism uses Bosphorus-side marinas in the European part of Istanbul — the exact pier is shared in your booking confirmation. If you want to request a specific departure point (for example near your hotel in Besiktas or Ortakoy), mention it in the booking notes and the team will confirm feasibility. Hotel transfer add-ons can also be added if you prefer a door-to-marina pickup." },
    ],
  },
  {
    id: "4",
    slug: "bosphorus-sightseeing-cruise",
    name: "Boğaz Kısa Tur",
    nameEn: "Bosphorus Short Cruise",
    description: "A short Bosphorus sightseeing route for guests who want a compact daytime overview of Istanbul's landmark shoreline with a live English-speaking guide.",
    longDescription: "This short Bosphorus cruise is designed for travelers with limited time or those who want a compact daytime overview of the strait. The route covers the essential southern Bosphorus highlights in an efficient format and works best as a supporting daytime guide rather than a competing booking focus.\n\nDepart from the historic Eminönü Pier and immediately be greeted by the stunning panorama of Istanbul's layered skyline — minarets, domes, and modern towers rising together in perfect harmony.\n\nA live English-speaking guide brings each landmark to life with fascinating historical commentary as you pass the mysterious Maiden's Tower, the magnificent Dolmabahçe Palace, and the picturesque Ortaköy Mosque. A Bosphorus boat ride that covers the strait's southern half, showcasing the best of Istanbul from the water.",
    duration: "1.5 hours",
    capacity: "Max 50 guests",
    priceEur: 15,
    includes: ["Live English-speaking guide", "Soft drinks", "WiFi", "Photo spots"],
    notIncluded: ["Hotel pickup", "Alcoholic beverages", "Meals", "Guide tip"],
    highlights: ["Maiden's Tower", "Dolmabahçe Palace", "Ortaköy Mosque", "Continental views", "Affordable sightseeing"],
    badge: "Budget Friendly",
    badgeColor: "bg-green-500 text-white",
    image: "/images/sunset-2026/06.jpeg",
    gallery: [],
    route: "Eminönü → Maiden's Tower → Dolmabahçe → Ortaköy → Return",
    departureTime: "10:00 / 14:00 / 16:00",
    departurePoint: "Eminönü Pier",
    category: "cruise",
    rating: 4.75,
    reviewCount: 445,
  },
  {
    id: "5",
    slug: "private-bosphorus-sunset-cruise",
    canonicalPath: "/private-bosphorus-dinner-cruise",
    name: "Özel Boğaz Gün Batımı Yat Turu",
    nameEn: "Private Bosphorus Sunset Cruise",
    description: "Watch the sunset from your own private yacht. An intimate Bosphorus experience with professional crew and complimentary beverages.",
    longDescription: "Experience the legendary Bosphorus sunset from the privacy and comfort of your own yacht. As the golden hour paints Istanbul's skyline in warm hues, you'll glide past centuries-old palaces, majestic mosques, and the iconic bridges connecting two continents.\n\nYour professional captain charts the perfect route to catch the sunset at its most spectacular angle, while complimentary tea, coffee, and soft drinks keep you refreshed. The intimate setting makes this perfect for romantic evenings, family celebrations, or simply treating yourself to Istanbul's most magical moment.",
    duration: "2 hours",
    capacity: "Yacht size is matched to the guest count and the selected service setup",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    addOns: [
      { name: "Photographer", price: "€190" },
      { name: "Violinist", price: "€180" },
      { name: "Unlimited Alcohol", price: "€50–65" },
      { name: "Extra Hour", price: "€125–300" },
    ],
    includes: ["Private yacht & crew", "Tea, coffee & water", "Sunset timing", "Flexible route"],
    notIncluded: ["Tips", "Alcoholic beverages"],
    highlights: ["Private sunset experience", "Maiden's Tower views", "Dolmabahçe Palace", "Bosphorus Bridge", "Professional crew"],
    badge: "Romantic",
    badgeColor: "bg-rose-500 text-white",
    // DMCA-disputed images moved off public/ on 2026-05-26 pending resolution.
    // Originals preserved at ~/Desktop/_dmca-backup-2026-05-26 for evidence/restoration.
    // image kept as generic CC0 Bosphorus skyline so og:image + Product JSON-LD remain
    // populated; gallery [] hides the visible hero block (TourDetailClient skips render).
    image: "/images/fleet/y9/01.jpeg",
    gallery: [],
    route: "Kuruçeşme → Maiden's Tower → Bosphorus Bridge → Return",
    departureTime: "Timed with sunset",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
    rating: 4.95,
    reviewCount: 89,
  },
  {
    id: "6",
    slug: "private-bosphorus-dinner-yacht-cruise",
    canonicalPath: "/private-bosphorus-dinner-cruise",
    name: "Özel Boğaz Yemekli Yat Turu",
    nameEn: "Private Bosphorus Dinner Yacht Cruise",
    description: "A private dinner cruise on the Bosphorus with gourmet Turkish cuisine, candlelit atmosphere, and illuminated skyline views.",
    longDescription: "Combine the exclusivity of a private yacht with the finest Turkish gastronomy on this intimate dinner cruise. As your vessel glides through the illuminated Bosphorus, a carefully prepared multi-course dinner is served on deck under the stars.\n\nThe menu features authentic Turkish mezes, fresh seafood, grilled specialties, and traditional desserts — all prepared with locally sourced ingredients. The candlelit setting and gentle Bosphorus breeze create an atmosphere that's impossible to replicate on land.",
    duration: "3 hours",
    capacity: "Max 12 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Private yacht", "4-course Turkish dinner", "Professional crew", "Candlelit setup"],
    notIncluded: ["Tips", "Hotel transfer"],
    highlights: ["Private dining", "Gourmet Turkish cuisine", "Illuminated Bosphorus", "Candlelit atmosphere", "Flexible timing"],
    badge: "Gourmet",
    badgeColor: "bg-[var(--brand-primary)] text-white",
    // DMCA-disputed images moved off public/ on 2026-05-26 pending resolution.
    // Originals preserved at ~/Desktop/_dmca-backup-2026-05-26 for evidence/restoration.
    // image kept as generic CC0 Bosphorus skyline so og:image + Product JSON-LD remain
    // populated; gallery [] hides the visible hero block (TourDetailClient skips render).
    image: "/images/fleet/y9/01.jpeg",
    gallery: [],
    route: "Kuruçeşme → Bosphorus Night Tour → Return",
    departureTime: "19:00 / 20:00",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
    rating: 4.92,
    reviewCount: 47,
  },
  {
    id: "7",
    slug: "private-bosphorus-lunch-yacht-cruise",
    name: "Özel Boğaz Öğle Yemeği Yat Turu",
    nameEn: "Private Bosphorus Lunch Yacht Cruise",
    description: "A private daytime yacht experience with lunch on the Bosphorus. Perfect for families and groups.",
    longDescription: "Enjoy the Bosphorus in broad daylight on this private lunch cruise. The midday sun illuminates Istanbul's architectural wonders in their full glory — from the blue tiles of the Sultanahmet skyline to the white marble facades of waterfront palaces.\n\nA freshly prepared Turkish lunch is served on deck as you cruise between the continents, offering unparalleled photo opportunities and a relaxed atmosphere that's perfect for families, friends, and groups.",
    duration: "2 hours",
    capacity: "Yacht size is matched to the guest count and the selected service setup",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Private yacht", "Lunch on board", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "Alcoholic beverages"],
    highlights: ["Daytime Bosphorus views", "Fresh Turkish lunch", "Family-friendly", "Swimming stop option", "Photo opportunities"],
    badge: "Daytime",
    badgeColor: "bg-sky-500 text-white",
    image: "/images/tours/private-bosphorus-lunch-yacht-cruise/01.webp",
    gallery: [
      "/images/tours/private-bosphorus-lunch-yacht-cruise/01.webp",
      "/images/tours/private-bosphorus-lunch-yacht-cruise/02.webp",
      "/images/tours/private-bosphorus-lunch-yacht-cruise/03.webp",
      "/images/tours/private-bosphorus-lunch-yacht-cruise/04.webp",
      "/images/tours/private-bosphorus-lunch-yacht-cruise/05.webp",
      "/images/tours/private-bosphorus-lunch-yacht-cruise/06.webp",
    ],
    route: "Kuruçeşme → Bosphorus Tour → Swimming Stop → Return",
    departureTime: "12:00",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
    rating: 4.85,
    reviewCount: 38,
  },
  {
    id: "8",
    slug: "bosphorus-sightseeing-yacht-cruise",
    canonicalPath: "/private-bosphorus-dinner-cruise",
    name: "Boğaz Tekne Turu (Yat)",
    nameEn: "Bosphorus Sightseeing Yacht Cruise",
    description: "Private yacht sightseeing cruise along the Bosphorus. See all the highlights from your own boat.",
    longDescription: "Enjoy a private sightseeing cruise on the Bosphorus aboard your own yacht. Unlike shared cruises, this experience gives you complete freedom to stop, explore, and photograph at your leisure.\n\nYour captain knows every landmark and hidden gem along the strait, from the grand Dolmabahçe Palace to the charming fishing villages of the upper Bosphorus.",
    duration: "2 hours",
    capacity: "Yacht size is matched to the guest count and the selected service setup",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Private yacht", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "Alcoholic beverages"],
    highlights: ["Private experience", "All Bosphorus landmarks", "Flexible stops", "Photo opportunities"],
    badge: "Private",
    badgeColor: "bg-[var(--brand-primary)] text-white",
    image: "/images/tours/bosphorus-sightseeing-yacht-cruise/01.webp",
    gallery: [
      "/images/tours/bosphorus-sightseeing-yacht-cruise/01.webp",
      "/images/tours/bosphorus-sightseeing-yacht-cruise/02.webp",
      "/images/tours/bosphorus-sightseeing-yacht-cruise/03.webp",
      "/images/tours/bosphorus-sightseeing-yacht-cruise/04.webp",
      "/images/tours/bosphorus-sightseeing-yacht-cruise/05.webp",
      "/images/tours/bosphorus-sightseeing-yacht-cruise/06.webp",
    ],
    route: "Custom sightseeing route",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
    rating: 4.9,
    reviewCount: 56,
  },
  // ========== YACHT ORGANIZATIONS ==========
  {
    id: "9",
    slug: "romantic-marriage-proposal",
    canonicalPath: "/proposal-yacht-rental-istanbul",
    name: "Romantik Evlilik Teklifi",
    nameEn: "Romantic Marriage Proposal on Yacht",
    description: "Create the most magical proposal moment against the backdrop of the Bosphorus sunset with rose petals, candles, and live music.",
    longDescription: "Make your love story legendary with a marriage proposal set against the most romantic backdrop imaginable — the Bosphorus at sunset.\n\nEvery detail is meticulously designed to create a moment you'll both treasure forever. As you board your privately decorated vessel, your partner will be greeted by a pathway of rose petals leading to a candlelit setting with panoramic views of the strait.\n\nThe boat gently circles the iconic Maiden's Tower — steeped in its own legendary love story — as the sky transforms into a canvas of warm colors. A professional photographer discreetly captures every emotion.",
    duration: "2 hours",
    capacity: "2–6 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    addOns: [
      { name: "Professional Photographer", price: "€190" },
      { name: "Violinist", price: "€180" },
      { name: "DJ", price: "€250" },
      { name: "Proposal Decoration", price: "€50–75" },
      { name: "Champagne", price: "€50" },
      { name: "Unlimited Alcohol", price: "€50–65" },
      { name: "Custom Cake", price: "€35–60" },
      { name: "Extra Hour", price: "€125–300" },
      { name: "VIP Pickup", price: "€150" },
    ],
    includes: ["Romantic decoration", "Snacks & drinks", "Professional crew", "Custom route"],
    notIncluded: ["Tips", "Photographer (add-on)", "Live music (add-on)"],
    highlights: ["Maiden's Tower backdrop", "Sunset timing", "Romantic decoration", "Complete privacy", "Customizable"],
    badge: "Romantic",
    badgeColor: "bg-rose-500 text-white",
    // DMCA-disputed images moved off public/ on 2026-05-26 pending resolution.
    // Originals preserved at ~/Desktop/_dmca-backup-2026-05-26 for evidence/restoration.
    // image kept as generic CC0 Bosphorus skyline so og:image + Product JSON-LD remain
    // populated; gallery [] hides the visible hero block (TourDetailClient skips render).
    image: "/images/fleet/y9/01.jpeg",
    gallery: [],
    route: "Special romantic route (around Maiden's Tower)",
    departureTime: "Timed with sunset",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 5.0,
    reviewCount: 52,
  },
  {
    id: "10",
    slug: "yacht-birthday-party",
    canonicalPath: "/proposal-yacht-rental-istanbul",
    name: "Yat Doğum Günü Partisi",
    nameEn: "Yacht Birthday Party Istanbul",
    description: "The ultimate party boat in Istanbul — celebrate your birthday on a private yacht on the Bosphorus with DJ, custom cake, and decoration support.",
    longDescription: "Looking for a party boat in Istanbul? This yacht birthday party on the Bosphorus transforms a luxury vessel into your own floating celebration venue — the ultimate Istanbul birthday experience.\n\nThe custom birthday cake takes center stage, while the DJ reads the room and keeps the energy high. As the party boat cruises past Istanbul's illuminated skyline, the open deck becomes a dance floor under the stars.",
    duration: "2 hours (extendable)",
    capacity: "Max 25 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    addOns: [
      { name: "DJ", price: "€250" },
      { name: "Belly Dancer", price: "€180–190" },
      { name: "Birthday Cake (Small)", price: "€35" },
      { name: "Birthday Cake (Large)", price: "€60" },
      { name: "Unlimited Alcohol", price: "€50–65" },
      { name: "4-Course Meal", price: "€35/person" },
      { name: "Photographer", price: "€190" },
      { name: "Extra Hour", price: "€125–300" },
    ],
    includes: ["Party setup", "Sound system", "Professional crew", "Tea, coffee & water"],
    notIncluded: ["Tips", "DJ (add-on)", "Cake (add-on)"],
    highlights: ["Private yacht party", "Custom decorations", "Bosphorus night views", "Dance floor on deck"],
    badge: "Party",
    badgeColor: "bg-purple-500 text-white",
    image: "/images/tours/yacht-birthday-party/01.webp",
    gallery: [
      "/images/tours/yacht-birthday-party/01.webp",
      "/images/tours/yacht-birthday-party/02.webp",
      "/images/tours/yacht-birthday-party/03.webp",
      "/images/tours/yacht-birthday-party/04.webp",
      "/images/tours/yacht-birthday-party/05.webp",
      "/images/tours/yacht-birthday-party/06.webp",
    ],
    route: "Kuruçeşme → Bosphorus Night Tour → Return",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 5.0,
    reviewCount: 57,
  },
  {
    id: "11",
    slug: "yacht-weddings",
    canonicalPath: "/proposal-yacht-rental-istanbul",
    name: "Yat Düğünü",
    nameEn: "Exclusive Yacht Wedding Istanbul",
    description: "Host your dream wedding on a luxury yacht cruising the Bosphorus. Complete event coordination and customizable packages.",
    longDescription: "Say 'I do' on the Bosphorus — one of the most spectacular wedding venues on earth. Our exclusive yacht wedding service transforms a luxury vessel into your dream wedding venue, complete with elegant decoration, professional catering, and stunning views.\n\nFrom intimate ceremonies for close family to grand celebrations with full entertainment, every detail is tailored to your vision.",
    duration: "4 hours",
    capacity: "Max 50 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Yacht rental", "Decoration", "Professional crew", "Sound system"],
    notIncluded: ["Tips", "Additional entertainment"],
    highlights: ["Bosphorus backdrop", "Full customization", "Professional coordination", "Elegant decoration"],
    badge: "Wedding",
    badgeColor: "bg-rose-400 text-white",
    image: "/images/tours/yacht-weddings/01.webp",
    gallery: [
      "/images/tours/yacht-weddings/01.webp",
      "/images/tours/yacht-weddings/02.webp",
      "/images/tours/yacht-weddings/03.webp",
      "/images/tours/yacht-weddings/04.webp",
      "/images/tours/yacht-weddings/05.webp",
      "/images/tours/yacht-weddings/06.webp",
    ],
    route: "Custom wedding route",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 5.0,
    reviewCount: 23,
  },
  {
    id: "12",
    slug: "wedding-anniversary",
    canonicalPath: "/proposal-yacht-rental-istanbul",
    name: "Yat Evlilik Yıldönümü",
    nameEn: "Wedding Anniversary on Yacht",
    description: "Celebrate your love story on a private yacht with romantic decoration, gourmet dinner, and Bosphorus views.",
    longDescription: "Commemorate your wedding anniversary with an unforgettable private yacht experience on the Bosphorus. Whether it's your first or your fiftieth, the romantic atmosphere of a candlelit cruise past Istanbul's iconic landmarks creates the perfect celebration.",
    duration: "2 hours",
    capacity: "2–10 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Romantic decoration", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "Photographer (add-on)"],
    highlights: ["Private romantic setting", "Bosphorus sunset", "Anniversary decoration", "Customizable"],
    badge: "Anniversary",
    badgeColor: "bg-rose-500 text-white",
    image: "/images/tours/wedding-anniversary/01.webp",
    gallery: [
      "/images/tours/wedding-anniversary/01.webp",
      "/images/tours/wedding-anniversary/02.webp",
      "/images/tours/wedding-anniversary/03.webp",
      "/images/tours/wedding-anniversary/04.webp",
      "/images/tours/wedding-anniversary/05.webp",
      "/images/tours/wedding-anniversary/06.webp",
    ],
    route: "Romantic Bosphorus route",
    departureTime: "Timed with sunset",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 4.95,
    reviewCount: 31,
  },
  {
    id: "13",
    slug: "bachelorette-yacht-party",
    canonicalPath: "/proposal-yacht-rental-istanbul",
    name: "Bekarlığa Veda Yat Partisi",
    nameEn: "Bachelorette Yacht Party Istanbul",
    description: "The ultimate bachelorette party on a private yacht. Music, decorations, and Bosphorus fun.",
    longDescription: "Send the bride-to-be off in style with an unforgettable bachelorette party on the Bosphorus! Your private yacht becomes the ultimate party venue with custom decorations, music, and endless fun.\n\nDance on deck as you cruise past Istanbul's stunning skyline, take Instagram-worthy photos against the backdrop of bridges and palaces, and create memories that will last a lifetime.",
    duration: "2 hours (extendable)",
    capacity: "Max 20 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Party setup", "Sound system", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "DJ (add-on)", "Custom decorations (add-on)"],
    highlights: ["Private party", "Custom decorations", "Photo opportunities", "Bosphorus views", "Fun atmosphere"],
    badge: "Party",
    badgeColor: "bg-pink-500 text-white",
    image: "/images/tours/bachelorette-yacht-party/01.webp",
    gallery: [
      "/images/tours/bachelorette-yacht-party/01.webp",
      "/images/tours/bachelorette-yacht-party/02.webp",
      "/images/tours/bachelorette-yacht-party/03.webp",
      "/images/tours/bachelorette-yacht-party/04.webp",
      "/images/tours/bachelorette-yacht-party/05.webp",
      "/images/tours/bachelorette-yacht-party/07.webp",
    ],
    route: "Kuruçeşme → Bosphorus Fun Tour → Return",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 4.97,
    reviewCount: 41,
  },
  {
    id: "14",
    slug: "corporate-event-bosphorus-cruise",
    canonicalPath: "/corporate-events",
    name: "Kurumsal Etkinlik Boğaz Turu",
    nameEn: "Corporate Event Bosphorus Cruise",
    description: "Host your corporate event on the Bosphorus. Professional event coordination, A/V equipment, and full catering.",
    longDescription: "Transform your next corporate event into an extraordinary experience. Our Corporate Event Bosphorus Cruise provides a unique venue that combines the prestige of Istanbul's iconic waterway with professional-grade event infrastructure.\n\nA dedicated event coordinator works with you from planning to ensure every detail aligns with your vision — whether it's team-building, a product launch, investor dinner, or annual celebration.\n\nThe vessel comes equipped with A/V equipment including projector, wireless microphones, and high-speed WiFi.",
    duration: "2 hours (extendable)",
    capacity: "Max 50 guests",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Yacht rental", "A/V equipment", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "Catering (add-on)", "Transfer (add-on)"],
    highlights: ["Professional venue", "A/V equipment", "Custom branding", "Networking atmosphere", "Unique venue"],
    badge: "Corporate",
    badgeColor: "bg-[var(--brand-primary)] text-white",
    image: "/images/tours/corporate-event-bosphorus-cruise/01.jpg",
    gallery: [
      "/images/tours/corporate-event-bosphorus-cruise/01.jpg",
      "/images/tours/corporate-event-bosphorus-cruise/02.jpg",
      "/images/tours/corporate-event-bosphorus-cruise/03.jpg",
      "/images/tours/corporate-event-bosphorus-cruise/04.jpg",
      "/images/tours/corporate-event-bosphorus-cruise/05.jpg",
      "/images/tours/corporate-event-bosphorus-cruise/06.jpg",
    ],
    route: "Custom corporate route",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "organization",
    rating: 4.88,
    reviewCount: 34,
  },
  {
    id: "15",
    slug: "private-yacht-swimming-tour",
    canonicalPath: "/private-bosphorus-dinner-cruise",
    name: "Özel Yat Yüzme Turu",
    nameEn: "Private Istanbul Yacht Swimming Tour",
    description: "Swim in the Bosphorus from your private yacht. Crystal clear waters, stunning views, and total freedom.",
    longDescription: "Combine the thrill of swimming in one of the world's most famous waterways with the luxury of a private yacht charter. This unique experience takes you to the pristine waters near the Black Sea entrance, where the current is gentler and the water crystal clear.\n\nYour captain knows all the best swimming spots — secluded coves, calm bays, and scenic stretches where you can jump off the yacht into refreshing waters surrounded by stunning natural beauty.",
    duration: "3 hours",
    capacity: "Yacht size is matched to the guest count and the selected service setup",
    priceEur: 220,
    originalPriceEur: 260,
    packages: yachtFleetPackages,
    includes: ["Private yacht", "Swimming stops", "Tea, coffee & water", "Professional crew"],
    notIncluded: ["Tips", "Water sports equipment (add-on)"],
    highlights: ["Swimming in Bosphorus", "Secluded coves", "Crystal clear water", "Private experience", "Natural beauty"],
    badge: "Summer",
    badgeColor: "bg-cyan-500 text-white",
    image: "/images/tours/private-yacht-swimming-tour/01.webp",
    gallery: [
      "/images/tours/private-yacht-swimming-tour/01.webp",
      "/images/tours/private-yacht-swimming-tour/02.webp",
      "/images/tours/private-yacht-swimming-tour/03.webp",
      "/images/tours/private-yacht-swimming-tour/04.webp",
      "/images/tours/private-yacht-swimming-tour/05.webp",
      "/images/tours/private-yacht-swimming-tour/06.webp",
    ],
    route: "Kuruçeşme → Upper Bosphorus → Swimming Spots → Return",
    departureTime: "10:00 / 14:00",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
    rating: 4.92,
    reviewCount: 44,
  },
  // ========== TOURS ==========
  {
    id: "16",
    slug: "istanbul-princes-island-tour",
    name: "İstanbul Prens Adaları Turu",
    nameEn: "Istanbul Princes' Islands Tour",
    description: "Full-day Princes' Islands tour from Istanbul — ferry to Büyükada with guided tour, seaside lunch, and free time. The best princess island tour experience.",
    longDescription: "This Princes' Islands tour takes you from Istanbul to the enchanting car-free archipelago in the Sea of Marmara — one of the most popular day trips from Istanbul.\n\nThis comprehensive 8-hour princess island tour begins with a scenic ferry ride from the meeting point, offering sweeping views of the Istanbul skyline. Your first stop is Büyükada, the largest island, where elegant Victorian-era wooden mansions line pine-shaded streets.\n\nHop on for a guided tour around the island, discovering hidden monasteries, panoramic hilltop viewpoints, and quiet beaches. After a traditional Turkish lunch at a seaside restaurant, enjoy free time for relaxation and photography. The Istanbul prince islands ferry ride itself is a highlight — a scenic 90-minute journey past the Asian shoreline.",
    duration: "8 hours",
    capacity: "Max 50 guests",
    priceEur: 45,
    includes: ["Lunch", "Guiding service", "Bosphorus boat tickets", "Island tour"],
    notIncluded: ["Beverages", "Tips", "Personal expenses"],
    highlights: ["Büyükada exploration", "Car-free island", "Seaside lunch", "Victorian mansions", "Photography opportunities"],
    badge: "Full Day",
    badgeColor: "bg-emerald-500 text-white",
    image: "/images/tours/istanbul-princes-island-tour/01.jpg",
    gallery: [
      "/images/tours/istanbul-princes-island-tour/01.jpg",
      "/images/tours/istanbul-princes-island-tour/02.jpg",
      "/images/tours/istanbul-princes-island-tour/03.jpg",
      "/images/tours/istanbul-princes-island-tour/04.jpg",
      "/images/tours/istanbul-princes-island-tour/05.jpg",
      "/images/tours/istanbul-princes-island-tour/06.jpg",
    ],
    route: "Meeting Point → Ferry → Büyükada → Return",
    departureTime: "09:00",
    departurePoint: "In front of Cibali Tram Station",
    category: "tour",
    rating: 4.83,
    reviewCount: 84,
  },
  {
    id: "17",
    slug: "full-day-istanbul-old-city-tour",
    name: "Tam Gün İstanbul Eski Şehir Turu",
    nameEn: "Full Day Istanbul Old City Tour",
    description: "Explore Istanbul's most iconic historical sites including Hagia Sophia, Blue Mosque, Topkapi Palace, and Grand Bazaar.",
    longDescription: "Discover the magnificent historical heart of Istanbul on this comprehensive full-day walking tour. Your professional guide leads you through thousands of years of history, from the Byzantine Empire to the Ottoman golden age.\n\nVisit the awe-inspiring Hagia Sophia, marvel at the Blue Mosque's cascading domes and six minarets, explore the opulent Topkapi Palace where sultans ruled an empire, and lose yourself in the labyrinthine corridors of the legendary Grand Bazaar.",
    duration: "8 hours",
    capacity: "Max 20 guests",
    priceEur: 60,
    includes: ["Professional guide", "Entrance fees", "Lunch", "Hotel pickup"],
    notIncluded: ["Tips", "Personal expenses", "Beverages"],
    highlights: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar", "Hippodrome"],
    badge: "History",
    badgeColor: "bg-amber-600 text-white",
    image: "/images/tours/full-day-istanbul-old-city-tour/01.jpg",
    gallery: [
      "/images/tours/full-day-istanbul-old-city-tour/01.jpg",
      "/images/tours/full-day-istanbul-old-city-tour/02.jpg",
      "/images/tours/full-day-istanbul-old-city-tour/03.jpg",
      "/images/tours/full-day-istanbul-old-city-tour/04.jpg",
      "/images/tours/full-day-istanbul-old-city-tour/05.jpg",
      "/images/tours/full-day-istanbul-old-city-tour/06.jpg",
    ],
    route: "Hotel → Sultanahmet → Hagia Sophia → Blue Mosque → Topkapi → Grand Bazaar → Return",
    departureTime: "09:00",
    departurePoint: "Hotel pickup",
    category: "tour",
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "18",
    slug: "istanbul-bosphorus-lunch-cruise",
    name: "Boğaz Öğle Yemeği Turu",
    nameEn: "Istanbul Bosphorus Lunch Cruise",
    description: "Istanbul boat cruise combining a Bosphorus tour with a two-continents visit to both European and Asian sides. Lunch included. The best cruise in Istanbul.",
    longDescription: "Experience the best of both worlds — literally — on this unique Istanbul boat cruise that combines a scenic Bosphorus cruise with guided visits to both the European and Asian sides of Istanbul.\n\nThe day begins with a comfortable boat cruise through Istanbul's famous strait past palaces and fortresses, followed by a traditional Turkish lunch at a seaside restaurant. Then cross to the Asian side to explore the colorful Kadıköy neighborhood and the vibrant Moda district — one of the most complete cruise experiences in Istanbul.",
    duration: "7 hours",
    capacity: "Max 40 guests",
    priceEur: 55,
    includes: ["Bosphorus cruise", "Lunch", "Professional guide", "Two continents visit"],
    notIncluded: ["Tips", "Beverages", "Personal expenses"],
    highlights: ["Two continents", "Bosphorus cruise", "Turkish lunch", "Kadıköy exploration", "Asian side"],
    badge: "Popular",
    badgeColor: "bg-[var(--brand-primary)] text-white",
    image: "/images/fleet/y9/05.jpeg",
    gallery: [],
    route: "Meeting Point → Bosphorus Cruise → Asian Side → European Side → Return",
    departureTime: "09:30",
    departurePoint: "Eminönü Pier",
    category: "tour",
    rating: 4.85,
    reviewCount: 96,
  },
  {
    id: "19",
    slug: "istanbul-lunch-cruise",
    name: "İstanbul Öğle Yemeği Turu",
    nameEn: "Istanbul Lunch Cruise",
    description: "A daytime Bosphorus cruise with a freshly prepared Turkish lunch on board.",
    longDescription: "Enjoy a relaxing midday cruise along the Bosphorus with a delicious Turkish lunch served on board. The perfect way to combine sightseeing with dining as you pass by Istanbul's most iconic waterfront landmarks in the warm afternoon light.",
    duration: "2 hours",
    capacity: "Max 50 guests",
    priceEur: 35,
    includes: ["Turkish lunch", "Soft drinks", "Bosphorus cruise", "Audio guide"],
    notIncluded: ["Alcoholic beverages", "Tips"],
    highlights: ["Lunchtime cruise", "Turkish cuisine", "Bosphorus views", "Affordable", "Daytime experience"],
    badge: "Lunch",
    badgeColor: "bg-orange-500 text-white",
    image: "/images/fleet/y9/04.jpeg",
    gallery: [],
    route: "Eminönü → Bosphorus Tour → Return",
    departureTime: "12:30",
    departurePoint: "Eminönü Pier",
    category: "cruise",
    rating: 4.78,
    reviewCount: 67,
  },
  {
    id: "20",
    slug: "bosphorus-cruise-for-cruise-passengers",
    name: "Kruvaziyer Yolcuları İçin Boğaz Turu",
    nameEn: "Bosphorus Cruise for Cruise Passengers",
    description: "Specially designed for cruise ship passengers with port pickup and guaranteed return before departure.",
    longDescription: "Designed specifically for cruise ship passengers docking at Istanbul's ports, this tour offers a comprehensive Bosphorus experience with guaranteed timely return to your ship.\n\nOur team picks you up directly from the cruise port and takes you on a scenic Bosphorus cruise, ensuring you see all the highlights while making it back well before your ship's departure.",
    duration: "4 hours",
    capacity: "Max 30 guests",
    priceEur: 50,
    includes: ["Port pickup & return", "Bosphorus cruise", "Professional guide", "Soft drinks"],
    notIncluded: ["Lunch", "Tips", "Personal expenses"],
    highlights: ["Port pickup", "Guaranteed return", "Bosphorus highlights", "Professional guide"],
    badge: "Cruise Ship",
    badgeColor: "bg-sky-600 text-white",
    image: "/images/tours/bosphorus-sightseeing-cruise/01.jpg",
    gallery: [
      "/images/tours/bosphorus-sightseeing-cruise/01.jpg",
      "/images/tours/bosphorus-sightseeing-cruise/02.jpg",
      "/images/tours/bosphorus-sightseeing-cruise/03.jpg",
      "/images/tours/bosphorus-sightseeing-cruise/04.jpg",
      "/images/tours/bosphorus-sightseeing-cruise/05.jpg",
      "/images/tours/bosphorus-sightseeing-cruise/06.jpg",
    ],
    route: "Cruise Port → Bosphorus Tour → Cruise Port",
    departureTime: "Based on ship schedule",
    departurePoint: "Istanbul Cruise Port",
    category: "tour",
    rating: 4.88,
    reviewCount: 42,
  },
  {
    id: "21",
    slug: "new-years-eve-party-cruise",
    name: "Yılbaşı Gecesi Parti Turu",
    nameEn: "New Year's Eve Party Cruise Istanbul",
    description: "Ring in the New Year on the Bosphorus with dinner, entertainment, and a spectacular fireworks display.",
    longDescription: "Welcome the New Year in the most spectacular way possible — on the Bosphorus! This special New Year's Eve cruise features a gala dinner, unlimited drinks, live entertainment, DJ, and front-row views of Istanbul's legendary midnight fireworks display.\n\nAs the clock strikes midnight, you'll be surrounded by the city's dazzling fireworks reflected on the water — an experience you'll never forget.",
    duration: "5 hours",
    capacity: "Max 200 guests",
    priceEur: 120,
    includes: ["Gala dinner", "Unlimited drinks", "Live entertainment", "DJ", "Party favors"],
    notIncluded: ["Hotel transfer", "Tips"],
    highlights: ["Midnight fireworks", "Gala dinner", "Unlimited drinks", "Live entertainment", "Bosphorus views"],
    badge: "Special Event",
    badgeColor: "bg-amber-500 text-white",
    image: "/images/tours/new-years-eve-party-cruise/01.webp",
    gallery: [
      "/images/tours/new-years-eve-party-cruise/01.webp",
      "/images/tours/new-years-eve-party-cruise/02.webp",
      "/images/tours/new-years-eve-party-cruise/03.webp",
      "/images/tours/new-years-eve-party-cruise/04.webp",
      "/images/tours/new-years-eve-party-cruise/05.webp",
      "/images/tours/new-years-eve-party-cruise/06.webp",
    ],
    route: "Eminönü → Full Bosphorus → Fireworks Viewing → Return",
    departureTime: "20:00",
    departurePoint: "Eminönü Pier",
    category: "event",
    rating: 4.9,
    reviewCount: 156,
  },
];

export function getTourBySlug(slug: string, locale?: string): Tour | undefined {
  const tour = tours.find((t) => t.slug === slug);
  if (!tour || !locale || locale === "en") return tour;
  // Lazy import to avoid a circular dep — tour-locales depends on Tour type
  // from this file.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { applyTourLocale } = require("@/data/tour-locales") as typeof import("@/data/tour-locales");
  return applyTourLocale(tour, locale);
}

export function isCoreProduct(tour: Tour): boolean {
  return tour.isCoreProduct === true;
}

export function isPricingVisible(tour: Tour): boolean {
  return tour.showPricing ?? isCoreProduct(tour);
}

export function getBookingMode(tour: Tour): BookingMode {
  return tour.bookingMode ?? (isPricingVisible(tour) ? "book" : "quote");
}

export function getTourPath(tour: Tour): string {
  return tour.canonicalPath ?? `/cruises/${tour.slug}`;
}

export function getPriceMode(tour: Tour): PriceMode {
  return tour.priceMode ?? (isPricingVisible(tour) ? "perPerson" : "custom");
}

export function getPriceSuffix(tour: Tour): string {
  const mode = getPriceMode(tour);
  if (mode === "perGroup") return "/group";
  if (mode === "custom") return "";
  return "/person";
}

export function getTourFormat(tour: Tour): string {
  if (tour.slug === "bosphorus-sunset-cruise") return "Shared sunset cruise";
  if (tour.slug === "bosphorus-dinner-cruise") return "Shared dinner cruise";
  if (tour.slug === "yacht-charter-in-istanbul") return "Private yacht charter";

  if (tour.category === "private") return "Private Bosphorus charter";
  if (tour.category === "event" || tour.category === "organization") return "Planned private event";
  if (tour.category === "tour") return "Guided Istanbul tour";
  return "Shared cruise experience";
}

export function getCoreTours(): Tour[] {
  return tours.filter(isCoreProduct);
}

export function getSupportTours(): Tour[] {
  return tours.filter((tour) => !isCoreProduct(tour));
}

export function getToursByCategory(category: Tour["category"]): Tour[] {
  return tours.filter((tour) => tour.category === category);
}

export function getOrganizationTours(): Tour[] {
  return tours.filter((tour) => tour.category === "organization");
}

export function getCruiseTours(): Tour[] {
  return tours.filter((tour) => tour.category === "cruise" || tour.category === "private");
}
