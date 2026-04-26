import type { LocalizedField } from "@/i18n/localize";

export interface CommercialIntent {
  keyword: LocalizedField<string>;
  title: LocalizedField<string>;
  description: LocalizedField<string>;
  href: string;
  targetType: "core-product" | "service-page" | "commercial-guide";
  preserveIndexedUrl: boolean;
}

export const commercialIntents: CommercialIntent[] = [
  {
    keyword: { en: "bosphorus cruise istanbul" },
    title: { en: "Generic Bosphorus cruise buyers who still need the right format" },
    description: {
      en: "Guests searching broadly for a Bosphorus cruise in Istanbul should start with the comparison hub before narrowing into sunset, dinner, or private yacht.",
    },
    href: "/bosphorus-cruise",
    targetType: "core-product",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus sunset cruise istanbul" },
    title: { en: "Sunset cruise buyers who want a clean golden-hour option" },
    description: {
      en: "Guests comparing sunset timings, wine options, and a lighter shared cruise should land on the core sunset page first.",
    },
    href: "/cruises/bosphorus-sunset-cruise",
    targetType: "core-product",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "sunset cruise tickets istanbul" },
    title: { en: "Sunset-cruise buyers who already want the shared golden-hour route and need ticket-fit clarity" },
    description: {
      en: "Guests specifically searching for sunset cruise tickets, public shared options, and reserve-direct sunset fit should use the dedicated ticket-led support page first.",
    },
    href: "/sunset-cruise-tickets-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus dinner cruise istanbul" },
    title: { en: "Dinner cruise buyers who want the main shared evening route" },
    description: {
      en: "Guests looking for the main shared dinner cruise, package ladder, and evening flow should land on the core dinner owner page first.",
    },
    href: "/istanbul-dinner-cruise",
    targetType: "core-product",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus dinner cruise with turkish night" },
    title: { en: "Dinner-cruise buyers who care most about the Turkish-night show and shared evening format" },
    description: {
      en: "Guests specifically searching for the Turkish-night dinner-cruise format should use the dedicated support page before broader dinner, pickup, or private-yacht routing.",
    },
    href: "/turkish-night-dinner-cruise-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus dinner cruise with hotel pickup" },
    title: { en: "Dinner cruise buyers who need pickup logic confirmed before booking" },
    description: {
      en: "Guests looking for hotel pickup support, Kabatas boarding context, and a shared evening flow should use the dedicated pickup support page first.",
    },
    href: "/dinner-cruise-with-hotel-pickup-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "dinner cruise pickup from sultanahmet taksim" },
    title: { en: "Dinner-cruise buyers who need central hotel pickup clarity before booking" },
    description: {
      en: "Guests staying around Sultanahmet, Taksim, Sirkeci, or Karakoy should use the local pickup support page before broader dinner or Kabatas routing.",
    },
    href: "/dinner-cruise-pickup-sultanahmet-taksim",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "private yacht charter istanbul" },
    title: { en: "Private Yacht Charter" },
    description: {
      en: "Private yacht charter is the clearest option for guests planning a full private hire in Istanbul.",
    },
    href: "/yacht-charter-istanbul",
    targetType: "core-product",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "boat rental istanbul" },
    title: { en: "Flexible private-hire demand that is not ready for a fixed package" },
    description: {
      en: "This page serves guests who want flexible private hire before choosing a specific yacht format.",
    },
    href: "/boat-rental-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus cruise prices" },
    title: { en: "Guests comparing Bosphorus cruise prices" },
    description: {
      en: "Guests who want a clear package breakdown often start with a detailed price guide before choosing a cruise.",
    },
    href: "/blog/bosphorus-cruise-prices-2026",
    targetType: "commercial-guide",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "proposal yacht istanbul" },
    title: { en: "Proposal Yacht Experience" },
    description: {
      en: "Proposal guests usually need privacy, setup planning, and precise timing rather than a standard yacht package.",
    },
    href: "/proposal-yacht-rental-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "proposal yacht with photographer istanbul" },
    title: { en: "Proposal buyers who want photographer coverage built into the reveal plan" },
    description: {
      en: "Couples searching for photographer-led proposal support should use the dedicated proposal-photo support page before broader proposal routing.",
    },
    href: "/proposal-yacht-with-photographer-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "corporate yacht event istanbul" },
    title: { en: "Corporate Yacht Events" },
    description: {
      en: "Corporate groups usually look for client hosting, launches, and team evenings on a private boat.",
    },
    href: "/corporate-events",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "team building yacht istanbul" },
    title: { en: "Companies that want a team-building-led Bosphorus yacht format" },
    description: {
      en: "Groups searching for team-building yacht formats should use the dedicated team-building support page before broader corporate routing.",
    },
    href: "/team-building-yacht-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "client hosting yacht istanbul" },
    title: { en: "Companies that want a client-hosting-led Bosphorus yacht format" },
    description: {
      en: "Companies searching for client-hosting yacht formats should use the dedicated hosting support page before broader corporate routing.",
    },
    href: "/client-hosting-yacht-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "product launch yacht istanbul" },
    title: { en: "Companies that want a launch-led Bosphorus yacht format" },
    description: {
      en: "Companies searching for a product-launch yacht format should use the dedicated launch support page before broader corporate routing.",
    },
    href: "/product-launch-yacht-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "corporate yacht dinner istanbul" },
    title: { en: "Corporate dinner buyers who need a private yacht and a dinner-first company brief" },
    description: {
      en: "Companies planning a dinner-led private yacht evening should use the dedicated corporate yacht dinner support page before broader event routing.",
    },
    href: "/corporate-yacht-dinner-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "kabatas dinner cruise istanbul" },
    title: { en: "Dinner-cruise buyers who need Kabatas-side boarding confidence before booking" },
    description: {
      en: "Guests who already want the shared dinner cruise but need clearer Kabatas-side boarding context should use the dedicated Kabatas dinner support page first.",
    },
    href: "/kabatas-dinner-cruise-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "kurucesme marina yacht charter istanbul" },
    title: { en: "Private-yacht buyers who need Kurucesme Marina departure clarity before booking" },
    description: {
      en: "Guests already leaning toward a private charter but needing clearer marina and boarding context should use the dedicated Kurucesme yacht support page first.",
    },
    href: "/kurucesme-marina-yacht-charter",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "private dinner cruise for couples istanbul" },
    title: { en: "Couples who want a quieter private dinner yacht instead of a shared evening cruise" },
    description: {
      en: "Couples searching for a private dinner-led Bosphorus evening should use the dedicated couples dinner support page before broader private dinner or proposal routing.",
    },
    href: "/private-dinner-cruise-for-couples-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "boat rental istanbul hourly" },
    title: { en: "Private-hire buyers who want hourly boat rental logic before a package-led charter" },
    description: {
      en: "Guests searching for hourly private boat rental should use the dedicated hourly support page before broad boat-rental or yacht-charter routing.",
    },
    href: "/boat-rental-hourly-istanbul",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
  {
    keyword: { en: "bosphorus cruise departure points istanbul" },
    title: { en: "Guests who need stable public departure logic before they rely on a generic waterfront guess" },
    description: {
      en: "Users comparing where dinner, sunset, and private yacht products start should use the public departure-points hub before narrowing into the exact owner or support page.",
    },
    href: "/bosphorus-cruise-departure-points",
    targetType: "commercial-guide",
    preserveIndexedUrl: true,
  },
];
