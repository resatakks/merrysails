import { prisma } from "@/lib/db";

/**
 * Booking-momentum helpers — power the urgency/social-proof badges on
 * product pages. All numbers come from the live Reservation DB (Neon
 * PostgreSQL), are NEVER faked, and degrade gracefully (return zeros
 * on DB error so the badge silently hides).
 *
 * Why this exists (2026-06-01):
 *   Static "27+ bookings since April 15" is good baseline social proof
 *   but it doesn't differ by product. Live per-product counts let us
 *   show "5 sunset bookings this week" on the sunset page and "2
 *   private yacht charters this month" on the yacht page — more
 *   credible than blanket numbers, and the urgency lift is well-
 *   documented in conversion research (Cialdini social proof + scarcity).
 */

export type BookingMomentum = {
  /** Confirmed bookings for this product in the last 7 days. */
  last7days: number;
  /** Confirmed bookings for this product in the upcoming 14 days. */
  next14days: number;
  /** Total confirmed bookings for this product since direct-booking launch. */
  allTime: number;
  /** Next upcoming sold-out date for this product (or null). */
  nextSoldOutDate: string | null;
  /** True when today's departure has NOT been marked sold out in
   *  TourOperationDay AND the local time is still before a reasonable
   *  booking cutoff (15:00 Istanbul time). Drives the "Tonight ✓
   *  Available — book now" badge. */
  tonightAvailable: boolean;
  /** True when tomorrow's departure has NOT been marked sold out. */
  tomorrowAvailable: boolean;
};

const EMPTY_MOMENTUM: BookingMomentum = {
  last7days: 0,
  next14days: 0,
  allTime: 0,
  nextSoldOutDate: null,
  tonightAvailable: false,
  tomorrowAvailable: false,
};

/**
 * Pulls real booking counts for a given tour slug. Cached for 5 minutes
 * via Next.js fetch cache wouldn't apply (this hits Prisma not fetch),
 * so we accept the per-request DB hit — count queries are indexed on
 * (status, tourSlug, date) and return in single-digit ms.
 *
 * Returns zeros on any error so the badge silently hides rather than
 * showing wrong numbers.
 */
export async function getProductBookingMomentum(
  tourSlug: string,
): Promise<BookingMomentum> {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAhead = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    // ALSO match canonical-path siblings — e.g., proposal-yacht has multiple
    // input slugs (romantic-marriage-proposal, yacht-birthday-party etc.)
    // all hitting the same canonical page. Use prefix-and-exact match.
    const matchingSlugs = expandTourSlugAliases(tourSlug);

    // Day boundaries — use UTC for consistent DB comparison. The badge
    // displays Istanbul-local but the comparison itself just needs
    // calendar-day alignment which UTC gets right ±3 h.
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const [last7, next14, allTime, nextSoldOut, todaySoldOut, tomorrowSoldOut] = await Promise.all([
      prisma.reservation.count({
        where: {
          tourSlug: { in: matchingSlugs },
          status: { in: ["confirmed", "completed"] },
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.reservation.count({
        where: {
          tourSlug: { in: matchingSlugs },
          status: { in: ["confirmed", "completed", "new"] },
          date: { gte: now, lte: fourteenDaysAhead },
        },
      }),
      prisma.reservation.count({
        where: {
          tourSlug: { in: matchingSlugs },
          status: { in: ["confirmed", "completed"] },
        },
      }),
      prisma.tourOperationDay
        .findFirst({
          where: {
            tourSlug: { in: matchingSlugs },
            isSoldOut: true,
            date: { gte: now },
          },
          orderBy: { date: "asc" },
          select: { date: true },
        })
        .then((d) => (d ? d.date.toISOString().slice(0, 10) : null)),
      // Check whether today is marked sold-out
      prisma.tourOperationDay.findFirst({
        where: {
          tourSlug: { in: matchingSlugs },
          isSoldOut: true,
          date: { gte: today, lt: tomorrow },
        },
        select: { id: true },
      }),
      // Check whether tomorrow is marked sold-out
      prisma.tourOperationDay.findFirst({
        where: {
          tourSlug: { in: matchingSlugs },
          isSoldOut: true,
          date: { gte: tomorrow, lt: dayAfterTomorrow },
        },
        select: { id: true },
      }),
    ]);

    // Tonight available = NOT sold-out AND current Istanbul hour < 15
    // (the operational cutoff for tonight bookings). Istanbul is UTC+3.
    const istanbulHour = (now.getUTCHours() + 3) % 24;
    const beforeCutoff = istanbulHour < 15;

    return {
      last7days: last7,
      next14days: next14,
      allTime,
      nextSoldOutDate: nextSoldOut,
      tonightAvailable: !todaySoldOut && beforeCutoff,
      tomorrowAvailable: !tomorrowSoldOut,
    };
  } catch (error) {
    // Silent failure — the badge just doesn't render if the DB query fails.
    // Worst case: a quiet page; never a broken page or a fake number.
    console.error("[booking-momentum] query failed:", error);
    return EMPTY_MOMENTUM;
  }
}

/**
 * Maps a tour slug to all its booking-aliases. Some products are bookable
 * under multiple slug entries (yacht has 6 fleet variations all rolling
 * up to "yacht-charter-in-istanbul" intent). Keeping the count honest
 * means counting all of them.
 */
function expandTourSlugAliases(slug: string): string[] {
  const aliases: Record<string, string[]> = {
    "yacht-charter-in-istanbul": [
      "yacht-charter-in-istanbul",
      "boutique-yacht-12",
      "premium-yacht-15",
      "group-yacht-40-standard",
      "group-yacht-40-signature",
      "event-yacht-90",
      "mega-event-yacht-150",
    ],
    "bosphorus-sunset-cruise": ["bosphorus-sunset-cruise"],
    "bosphorus-dinner-cruise": ["bosphorus-dinner-cruise"],
  };
  return aliases[slug] ?? [slug];
}
