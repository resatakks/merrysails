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
    keyword: { en: "bosphorus dinner cruise with hotel pickup" },
    title: { en: "Dinner cruise buyers who want pickup and an all-in-one evening" },
    description: {
      en: "Guests looking for hotel pickup and an all-in-one evening usually compare the main dinner cruise page first.",
    },
    href: "/istanbul-dinner-cruise",
    targetType: "core-product",
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
    keyword: { en: "corporate yacht event istanbul" },
    title: { en: "Corporate Yacht Events" },
    description: {
      en: "Corporate groups usually look for client hosting, launches, and team evenings on a private boat.",
    },
    href: "/corporate-events",
    targetType: "service-page",
    preserveIndexedUrl: true,
  },
];
