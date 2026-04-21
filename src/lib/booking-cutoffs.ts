const ISTANBUL_TIMEZONE = "Europe/Istanbul";

type CutoffConfig = {
  hour: number;
  minute: number;
  label: string;
};

const SAME_DAY_CUTOFFS: Record<string, CutoffConfig> = {
  "bosphorus-sunset-cruise": {
    hour: 17,
    minute: 55,
    label: "17:55",
  },
  "bosphorus-dinner-cruise": {
    hour: 20,
    minute: 25,
    label: "20:25",
  },
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
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0"
  );

  return { hour, minute };
}

export function getSameDayBookingCutoff(tourSlug: string): CutoffConfig | null {
  return SAME_DAY_CUTOFFS[tourSlug] ?? null;
}

export function isSameDayBookingClosed(
  tourSlug: string,
  reservationDate: Date,
  now: Date = new Date()
): boolean {
  const cutoff = getSameDayBookingCutoff(tourSlug);

  if (!cutoff) {
    return false;
  }

  if (getDateKeyInIstanbul(reservationDate) !== getDateKeyInIstanbul(now)) {
    return false;
  }

  const { hour, minute } = getClockInIstanbul(now);
  const currentMinutes = hour * 60 + minute;
  const cutoffMinutes = cutoff.hour * 60 + cutoff.minute;

  return currentMinutes >= cutoffMinutes;
}

export function getSameDayBookingClosedMessage(tourSlug: string): string | null {
  const cutoff = getSameDayBookingCutoff(tourSlug);

  if (!cutoff) {
    return null;
  }

  if (tourSlug === "bosphorus-sunset-cruise") {
    return `Online booking for the Bosphorus Sunset Cruise closes at ${cutoff.label} on the sailing day. Please contact us on WhatsApp for last-minute requests.`;
  }

  if (tourSlug === "bosphorus-dinner-cruise") {
    return `Online booking for the Bosphorus Dinner Cruise closes at ${cutoff.label} on the sailing day. Please contact us on WhatsApp for last-minute requests.`;
  }

  return `Online booking for this service closes at ${cutoff.label} on the service day. Please contact us directly for last-minute requests.`;
}
