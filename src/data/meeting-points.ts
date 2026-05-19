// Boarding / meeting-point data for the "How to Get There" section.
// Keyed by tour slug. Used by <HowToGetThere />.

export type TravelOption = {
  mode: string; // "Tram", "Funicular", "Taxi", ...
  detail: string;
};

export type MeetingPoint = {
  /** Short display name of the boarding area */
  name: string;
  /** District line shown under the name */
  district: string;
  /** Printable address lines */
  addressLines: string[];
  /** Coordinates for the map pin */
  geo: { lat: number; lng: number };
  /** A short, human label for the maps query */
  mapQuery: string;
  /** Public-transport and taxi options */
  travelOptions: TravelOption[];
  /** Short arrival tip */
  arriveTip: string;
};

export const MEETING_POINTS: Record<string, MeetingPoint> = {
  "bosphorus-sunset-cruise": {
    name: "Karaköy boarding point",
    district: "Arap Camii · Karaköy, Beyoğlu",
    addressLines: [
      "Arap Camii Mahallesi, Üsküfçüler Sokak",
      "Karaköy / Beyoğlu, 34421 İstanbul",
    ],
    geo: { lat: 41.0237, lng: 28.9744 },
    mapQuery: "Karaköy Arap Camii, Beyoğlu, Istanbul",
    travelOptions: [
      {
        mode: "Tram (T1)",
        detail: "Get off at the Karaköy stop — about a 4-minute walk to the meeting point.",
      },
      {
        mode: "Funicular (Tünel / F2)",
        detail: "From İstiklal Caddesi / Beyoğlu, the historic Tünel funicular comes straight down to Karaköy.",
      },
      {
        mode: "Metro (M2)",
        detail: "Şişhane station, then a short walk down or one stop on the Tünel funicular to Karaköy.",
      },
      {
        mode: "Taxi",
        detail: "Tell the driver \"Karaköy, Arap Camii\" — the boarding area is on Üsküfçüler Sokak.",
      },
    ],
    arriveTip: "Arrive at least 15 minutes before departure — the boarding flow starts 15 minutes early.",
  },
  "bosphorus-dinner-cruise": {
    name: "Kabataş Pier",
    district: "Kabataş, Beşiktaş",
    addressLines: [
      "Kabataş İskelesi (Kabataş Pier)",
      "Kabataş / Beşiktaş, 34357 İstanbul",
    ],
    geo: { lat: 41.0378, lng: 28.9978 },
    mapQuery: "Kabataş İskelesi, Beşiktaş, Istanbul",
    travelOptions: [
      {
        mode: "Tram (T1)",
        detail: "Kabataş is the last stop on the T1 line — the pier is right at the tram terminus.",
      },
      {
        mode: "Funicular (F1)",
        detail: "From Taksim Square, the F1 funicular reaches Kabataş in about 2 minutes.",
      },
      {
        mode: "Ferry",
        detail: "Kabataş has its own ferry terminal, next to the cruise boarding pier.",
      },
      {
        mode: "Taxi",
        detail: "Tell the driver \"Kabataş İskelesi\" — drop-off is right by the pier.",
      },
    ],
    arriveTip: "Arrive at least 15 minutes before the 20:30 departure — central European-side hotel pickup is also available.",
  },
};
