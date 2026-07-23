import { SITE_URL } from "@/lib/constants";
import { isAlcoholicPackageName } from "@/lib/reservation-pricing";
import { getMeetingPointMapUrl } from "@/lib/meeting-points";

export interface ExperienceSupportFact {
  label: string;
  value: string;
}

export interface ExperienceSupportRow {
  location: string;
  time: string;
}

export interface ExperienceSupportGuide {
  slug: string;
  title: string;
  pagePath: string;
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroBody: string;
  supportLabel: string;
  summary: string;
  facts: ExperienceSupportFact[];
  directions?: string[];
  mapUrl?: string;
  mapLabel?: string;
  shuttleRows?: ExperienceSupportRow[];
  shuttleNote?: string;
  shuttleExtraNote?: string;
  included?: string[];
  excluded?: string[];
  beforeArrival: string[];
  privateTransferNote: string;
}

const experienceSupportGuides: Record<string, ExperienceSupportGuide> = {
  "bosphorus-sunset-cruise": {
    slug: "bosphorus-sunset-cruise",
    title: "Sunset Cruise Meeting Point",
    pagePath: "/meeting-points/bosphorus-sunset-cruise",
    pageTitle: "Bosphorus Sunset Cruise Meeting Point & Inclusions | MerrySails",
    pageDescription:
      "Meeting point directions, included items, exclusions, and arrival tips for the MerrySails Bosphorus Sunset Cruise.",
    heroTitle: "Bosphorus Sunset Cruise meeting point and boarding guide",
    heroBody:
      "Use this page for the exact Karaköy ferry pier meeting point (next to Balıkçı Kemal, by the Marmaray exit), public transport directions, included items, and quick arrival notes before your sunset cruise.",
    supportLabel: "Sunset Cruise Guide",
    summary:
      "The easiest route is the T1 tram to Karaköy stop, then a 1-minute walk to the ferry pier next to Balıkçı Kemal (near the Marmaray exit).",
    facts: [
      { label: "Meeting flow", value: "Karaköy ferry pier next to Balıkçı Kemal (by Marmaray)" },
      { label: "Public route", value: "T1 tram to Karaköy or Marmaray to Karaköy, then walk to the ferry pier next to Balıkçı Kemal" },
      { label: "Departure plan", value: "Sunset departure, usually around 19:00 depending on the date" },
      { label: "Format", value: "2-hour shared luxury yacht cruise" },
    ],
    directions: [
      "Take the T1 tram and get off at Karaköy; the ferry pier is right next to Balıkçı Kemal.",
      "Walk to Karaköy ferry pier, next to Balıkçı Kemal; the boarding berth is 1 minute away.",
      "Or use the Marmaray and exit at Karaköy — Balıkçı Kemal is right at the pier.",
      "Keep your voucher and reservation ID ready while approaching the Karaköy ferry pier meeting point.",
    ],
    mapUrl: getMeetingPointMapUrl("Karaköy Pier"),
    mapLabel: "Open the Karaköy ferry pier meeting point map",
    included: [
      "2 glasses of wine per guest (With-Wine option only)",
      "Live English-speaking guide on board",
      "Luxury yacht Bosphorus sunset sailing",
      "Hot drinks (tea, Turkish coffee) and cold drinks (iced tea, lemonade, juice, water)",
      "Snack platter (mixed nuts, crackers, fresh fruit)",
    ],
    excluded: [
      "Other alcoholic drinks",
      "Tips",
      "Hotel pickup and drop-off unless arranged separately with extra charge",
    ],
    beforeArrival: [
      "Arrive at least 15 minutes before departure for a smooth check-in flow.",
      "Bring a light layer because it can feel cooler on the water after sunset.",
      "If you need hotel pickup or a private transfer, ask in advance because it is handled separately.",
    ],
    privateTransferNote:
      "You requested hotel pickup / private transfer support for the sunset cruise. Our team will contact you to confirm availability, routing, and any extra transfer charge before departure.",
  },
  "bosphorus-dinner-cruise": {
    slug: "bosphorus-dinner-cruise",
    title: "Dinner Cruise Shuttle & Boarding",
    pagePath: "/meeting-points/bosphorus-dinner-cruise",
    pageTitle: "Bosphorus Dinner Cruise Shuttle & Boarding Details | MerrySails",
    pageDescription:
      "Shared shuttle windows, Kabatas boarding timing, and arrival guidance for the MerrySails Bosphorus Dinner Cruise.",
    heroTitle: "Bosphorus Dinner Cruise shuttle and boarding guide",
    heroBody:
      "Use this page for the shared hotel shuttle windows, Kabatas boarding timing, and the main arrival notes before your dinner cruise.",
    supportLabel: "Dinner Cruise Boarding Guide",
    summary:
      "Free shared shuttle is available only from the listed central locations. Traffic can cause delays, so please stay ready during your pickup window.",
    facts: [
      { label: "Port", value: "Kabatas Port" },
      { label: "Boarding time", value: "Please be ready from 19:45" },
      { label: "Cruise departure", value: "The dinner cruise route starts at 20:30" },
      { label: "Pickup scope", value: "Shared shuttle from selected central European-side areas" },
    ],
    shuttleRows: [
      { location: "Topkapi - Findikzade - Aksaray", time: "Between 19:00 - 19:30" },
      { location: "Laleli - Beyazit", time: "Between 19:15 - 19:45" },
      { location: "Sultanahmet", time: "Between 19:15 - 19:45" },
      { location: "Sisli - Nisantasi", time: "Between 19:15 - 19:45" },
      { location: "Tepebasi - Sishane", time: "Between 19:15 - 19:45" },
      { location: "Taksim - Talimhane - Macka", time: "Between 19:30 - 20:00" },
      { location: "Sirkeci - Karakoy", time: "Between 19:30 - 20:00" },
    ],
    shuttleNote:
      "Free pick-up and drop-off service is available only from the locations listed above. Due to traffic conditions, pickups may be delayed.",
    shuttleExtraNote:
      "Please ask us about pickup possibility from other locations. Transportation from areas outside the listed zones may require an extra charge.",
    beforeArrival: [
      "Stay ready at your hotel entrance or the agreed pickup spot throughout your window.",
      "If you are not using the shuttle, come directly to Kabatas Port and aim to arrive by 19:45.",
      "Keep your phone reachable because the operations team may call or message for final coordination.",
    ],
    privateTransferNote:
      "You requested private transfer support for the dinner cruise. Our team will contact you to confirm the pickup plan, routing, and any extra transportation charge before departure.",
  },
};

/**
 * @param packageName When known (a specific reservation's booked package),
 * any "included" line mentioning wine is dropped unless that package is
 * itself alcoholic (e.g. "With Wine"). This is what stops a "Without Wine"
 * confirmation email from claiming wine is included. Omit packageName for
 * generic, not-booking-specific contexts (e.g. the public /meeting-points
 * page), where the included line keeps its "(With-Wine option only)"
 * qualifier so it's never a false claim either way.
 */
export function getExperienceSupportGuide(
  tourSlug: string,
  packageName?: string
): ExperienceSupportGuide | null {
  const guide = experienceSupportGuides[tourSlug] ?? null;
  if (!guide || !guide.included || !packageName) {
    return guide;
  }

  if (isAlcoholicPackageName(packageName)) {
    return guide;
  }

  const included = guide.included.filter((line) => !line.toLowerCase().includes("wine"));
  if (included.length === guide.included.length) {
    return guide;
  }

  return { ...guide, included };
}

export function getExperienceSupportPageUrl(tourSlug: string): string | null {
  const guide = getExperienceSupportGuide(tourSlug);
  return guide ? `${SITE_URL}${guide.pagePath}` : null;
}
