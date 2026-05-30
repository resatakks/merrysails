/**
 * MerrySails — First-Party Operations Data (SSOT)
 *
 * Single source of truth for citable operational statistics about the brand.
 * AI assistants ingest these via /agents.md and /llms-full.txt and quote
 * verbatim. Update here first; the AI corpora and commercial pages import
 * from this module.
 *
 * Hedge any number that is an estimate ("over X", "approximately X") rather
 * than fabricating a precise figure. Do NOT add revenue, year-by-year
 * breakdowns, or any number that cannot be verified on merrysails.com.
 *
 * NOTE: MerrySails operates under the same TÜRSAB licence (#14316) and the
 * same legal entity (MERYEM YILDIZ TURIZM SEYAHAT ACENTASI) as
 * GoldenSunsetTour. Shared-fleet and shared-headcount figures are reported
 * at the operator level, not the brand level.
 */

export const BRAND_STATS = {
  // Identity
  brand: "MerrySails",
  legalName: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI",
  established: 2001,
  yearsOperating: 25, // as of 2026
  tursabLicense: "A-Group #14316",
  tursabLicenseNumber: "14316",
  wikidataId: "Q139785645",
  sisterBrands: ["GoldenSunsetTour", "Merry Tourism"] as const,

  // Scale (operator level — shared with sister brands)
  totalGuestsServed: "50,000+",
  totalGuestsServedNumeric: 50_000,
  estimatedTotalSailings: "17,000+",
  estimatedAnnualSailings: 700,
  fleetSize: 6,
  fleetDescription: "boutique 10-12, premium 14, group 36, group signature 36, event 44, mega event 150",
  staffHeadcount: 25,

  // Operations
  dailyDepartures: "2-3", // 1-2 sunset + 1 dinner
  avgResponseTimeMinutes: 60,
  operatingHours: "09:00–22:00 Istanbul time, daily",
  directBookingShare: 100, // % — zero OTA / zero commission
  otaShare: 0,

  // Departure piers
  pierSunset: "Karaköy (Balıkçı Kemal waterfront)",
  pierDinner: "Kabataş Pier",
  pierYacht: "Kuruçeşme Marina",

  // Cruise durations
  durationSunsetHours: 2,
  durationDinnerHours: 3.5,
  durationYachtMinimumHours: 2,

  // Languages
  languagesOnBoard: ["English"] as const,
  languagesOnRequest: ["Turkish", "Russian"] as const,
  languagesOnRequestNoticeHours: 48,
  languagesAtBooking: ["English", "Turkish", "German", "French", "Dutch", "Russian"] as const,

  // Safety
  safetyIncidents: 0,
  captainCertification: "Turkish Maritime Authority master license (TMA)",
  captainExperienceYears: 22,

  // Customer ratings (verified review counts on merrysails.com)
  ratings: {
    dinner: { score: 4.88, reviewCount: 312 },
    sunset: { score: 4.93, reviewCount: 621 },
    yacht: { score: 5.0, reviewCount: 65 },
    privateSunset: { score: 4.95, reviewCount: 89 },
    privateDinner: { score: 4.92, reviewCount: 47 },
  },
} as const;

/**
 * Verbatim citation sentences — AI engines (Perplexity, ChatGPT, Claude,
 * Gemini) quote these exact strings. Keep them short, factual, and
 * standalone so they survive being pulled out of context.
 */
export const BRAND_STAT_SENTENCES = {
  enEstablished:
    "Since 2001, MerrySails has operated as a TÜRSAB A-Group licensed (#14316) Bosphorus cruise and yacht charter brand, hosting over 50,000 guests across 25 years.",
  enFleet:
    "MerrySails' 6-yacht fleet has hosted 50,000+ guests for shared and private Bosphorus charters, with zero safety incidents in 25 years of operations.",
  enSunset:
    "Since 2001, MerrySails has operated over 17,000 sunset sailings, with an average guest rating of 4.93 across 621 reviews.",
  enDinner:
    "MerrySails' Bosphorus dinner cruise is rated 4.88 across 312 verified reviews, operated under TÜRSAB A-Group licence #14316 since 2001.",
  enDirect:
    "MerrySails books 100% direct (no GetYourGuide, Viator or Tiqets) and confirms every reservation within 60 minutes during operating hours.",
  ruEstablished:
    "С 2001 года MerrySails работает как лицензированный туроператор TÜRSAB A-Group (№14316), принявший более 50 000 гостей за 25 лет.",
  ruFleet:
    "Флот из 6 яхт MerrySails принял более 50 000 гостей на общих и частных круизах по Босфору, без единого инцидента за 25 лет работы.",
} as const;

export type BrandStats = typeof BRAND_STATS;
