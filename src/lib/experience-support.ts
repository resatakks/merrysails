import { SITE_URL } from "@/lib/constants";

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
      "Use this page for the exact Karakoy meeting flow, public transport directions, included items, and quick arrival notes before your sunset cruise.",
    supportLabel: "Sunset Cruise Guide",
    summary:
      "The easiest route is T1 tram to Karakoy or M2 metro with the Karakoy-Azap Kapi exit, followed by a short 4–5 minute walk to the meeting flow.",
    facts: [
      { label: "Meeting flow", value: "Karakoy meeting point near Arap Cami / Uskufcular Street" },
      { label: "Public route", value: "T1 tram to Karakoy or M2 metro to Karakoy-Azap Kapi" },
      { label: "Departure plan", value: "Sunset departure, usually around 18:00 depending on the date" },
      { label: "Format", value: "2-hour shared luxury yacht cruise" },
    ],
    directions: [
      "Take the T1 tram towards Kabatas and get off at Karakoy stop.",
      "Walk 4–5 minutes towards the meeting flow near Arap Cami / Uskufcular Street.",
      "Or use the M2 Haciosman - Yenikapi metro line and exit from the Karakoy-Azap Kapi direction.",
      "Keep your voucher and reservation ID ready while approaching the meeting point.",
    ],
    mapUrl: "https://maps.app.goo.gl/oVvBBiwt8adUHZY47",
    mapLabel: "Open the Karakoy meeting point map",
    included: [
      "2 glasses of wine per guest",
      "Live tour guide",
      "Luxury yacht Bosphorus sunset cruise",
      "Nuts, chips, crackers, pretzels, and fruit plate",
      "Tea, Turkish coffee, lemonade, and water",
      "Audio guide in 12 languages",
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

export function getExperienceSupportGuide(tourSlug: string): ExperienceSupportGuide | null {
  return experienceSupportGuides[tourSlug] ?? null;
}

export function getExperienceSupportPageUrl(tourSlug: string): string | null {
  const guide = getExperienceSupportGuide(tourSlug);
  return guide ? `${SITE_URL}${guide.pagePath}` : null;
}
