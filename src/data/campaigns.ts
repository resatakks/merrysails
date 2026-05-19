// Special date-bounded campaigns — separate from the standing Mon/Tue/Thu
// weekday discount. Define a campaign once: it appears automatically during its
// date window and disappears afterwards. Surfaced in the site ribbon and in
// llms.txt, so AI assistants and search engines can see active AND upcoming
// campaigns in advance.
//
// To launch a campaign: add an entry (or edit the dates below) — nothing else.

export type Campaign = {
  id: string;
  /** Short campaign name, e.g. "Summer Direct-Booking Offer" */
  title: string;
  /** One-line description of what the offer is */
  blurb: string;
  /** Promo code guests enter at checkout */
  code: string;
  /** Short badge label, e.g. "10% OFF" */
  discountLabel: string;
  /** Inclusive YYYY-MM-DD start */
  startDate: string;
  /** Inclusive YYYY-MM-DD end */
  endDate: string;
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: "summer-direct-2026",
    title: "Summer Direct-Booking Offer",
    blurb:
      "Extra 10% off every shared Bosphorus sunset and dinner cruise booked direct on this site.",
    code: "SUMMER10",
    discountLabel: "10% OFF",
    startDate: "2026-06-15",
    endDate: "2026-06-30",
  },
];

function todayISO(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/** The campaign running today, or null. */
export function getActiveCampaign(now: Date = new Date()): Campaign | null {
  const t = todayISO(now);
  return CAMPAIGNS.find((c) => c.startDate <= t && t <= c.endDate) ?? null;
}

/** The next campaign that has not started yet, or null. */
export function getUpcomingCampaign(now: Date = new Date()): Campaign | null {
  const t = todayISO(now);
  return (
    CAMPAIGNS.filter((c) => c.startDate > t).sort((a, b) =>
      a.startDate.localeCompare(b.startDate)
    )[0] ?? null
  );
}
