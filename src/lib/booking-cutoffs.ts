import { getTourBySlug } from "@/data/tours";

const ISTANBUL_TIMEZONE = "Europe/Istanbul";
const SAME_DAY_BOOKING_BUFFER_MINUTES = 30;
const DEFAULT_REMINDER_LEAD_MINUTES = 120;

type CutoffConfig = {
  hour: number;
  minute: number;
  label: string;
};

function getDateKeyInIstanbul(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ISTANBUL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getClockInIstanbul(date: Date): { hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: ISTANBUL_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return { hour, minute };
}

function parseExactClockTimes(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split("/")
    .map((part) => part.replace(/\(.*?\)/g, "").trim())
    .filter((part) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(part));
}

function formatClockLabel(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (normalized % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function buildCutoffFromTime(clockTime: string): CutoffConfig {
  const [hour, minute] = clockTime.split(":").map(Number);
  const cutoffTotalMinutes =
    hour * 60 + minute - SAME_DAY_BOOKING_BUFFER_MINUTES;

  return {
    hour: Math.floor((((cutoffTotalMinutes % 1440) + 1440) % 1440) / 60),
    minute: (((cutoffTotalMinutes % 1440) + 1440) % 1440) % 60,
    label: formatClockLabel(cutoffTotalMinutes),
  };
}

function getTourClockTimes(
  tourSlug: string,
  departureTime?: string | null
): string[] {
  const explicitTimes = parseExactClockTimes(departureTime);

  if (explicitTimes.length > 0) {
    return explicitTimes;
  }

  return parseExactClockTimes(getTourBySlug(tourSlug)?.departureTime);
}

function getReminderLeadMinutes(tourSlug: string): number {
  switch (tourSlug) {
    case "bosphorus-sunset-cruise":
    case "bosphorus-dinner-cruise":
    case "yacht-charter-in-istanbul":
      return DEFAULT_REMINDER_LEAD_MINUTES;
    default:
      return DEFAULT_REMINDER_LEAD_MINUTES;
  }
}

function getReservationDateTimeInIstanbul(
  reservationDate: Date,
  reservationTime: string
): Date {
  const [year, month, day] = getDateKeyInIstanbul(reservationDate)
    .split("-")
    .map(Number);
  const [hour, minute] = reservationTime.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour - 3, minute, 0, 0));
}

export function getSameDayBookingCutoff(
  tourSlug: string,
  departureTime?: string | null
): CutoffConfig | null {
  const cutoffs = getTourClockTimes(tourSlug, departureTime).map(buildCutoffFromTime);
  return cutoffs[0] ?? null;
}

export function isSameDayBookingClosed(
  tourSlug: string,
  reservationDate: Date,
  now: Date = new Date(),
  departureTime?: string | null
): boolean {
  if (getDateKeyInIstanbul(reservationDate) !== getDateKeyInIstanbul(now)) {
    return false;
  }

  const cutoffs = getTourClockTimes(tourSlug, departureTime).map(buildCutoffFromTime);

  if (cutoffs.length === 0) {
    return false;
  }

  const { hour, minute } = getClockInIstanbul(now);
  const currentMinutes = hour * 60 + minute;

  return cutoffs.every(
    (cutoff) => currentMinutes >= cutoff.hour * 60 + cutoff.minute
  );
}

export function getSameDayBookingClosedMessage(
  tourSlug: string,
  departureTime?: string | null
): string | null {
  const cutoffs = getTourClockTimes(tourSlug, departureTime).map(buildCutoffFromTime);
  const tourName = getTourBySlug(tourSlug)?.nameEn ?? "this service";

  if (cutoffs.length === 0) {
    return null;
  }

  if (cutoffs.length > 1) {
    return `Online booking for ${tourName} closes 30 minutes before the selected sailing time. Please choose a later departure or contact us on WhatsApp for last-minute requests.`;
  }

  return `Online booking for ${tourName} closes at ${cutoffs[0].label} on the sailing day. Please contact us on WhatsApp for last-minute requests.`;
}

export function isReservationReminderDue(
  tourSlug: string,
  reservationDate: Date,
  reservationTime: string,
  now: Date = new Date(),
  windowMinutes = 30
): boolean {
  const exactTimes = parseExactClockTimes(reservationTime);

  if (exactTimes.length !== 1) {
    return false;
  }

  const serviceDateTime = getReservationDateTimeInIstanbul(
    reservationDate,
    exactTimes[0]
  );
  const reminderAt = new Date(
    serviceDateTime.getTime() - getReminderLeadMinutes(tourSlug) * 60 * 1000
  );
  const windowEnd = new Date(now.getTime() + windowMinutes * 60 * 1000);

  return reminderAt >= now && reminderAt < windowEnd;
}
