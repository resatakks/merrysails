import type { Prisma } from "@prisma/client";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export interface BookingPrefill {
  packageName?: string;
  date?: string;
  guests?: number;
  time?: string;
  source?: string;
  /** Customer locale captured when the prefill was created (en/tr/de/fr/nl/ru).
   * Persisted inside the `payload` JSON (no schema column / migration needed)
   * and read back at email-build time so the confirmation email is localized. */
  languageCode?: string;
}

/** Locales the booking flow + confirmation email support. */
const BOOKING_LOCALES = new Set(["en", "tr", "de", "fr", "nl", "ru"]);

function normalizeLanguageCode(value?: string): string | undefined {
  const candidate = value?.trim().toLowerCase();
  return candidate && BOOKING_LOCALES.has(candidate) ? candidate : undefined;
}

type SearchValue = string | string[] | undefined;

function getFirstValue(value: SearchValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function normalizeBookingPrefill(data: BookingPrefill): BookingPrefill {
  const guests =
    Number.isFinite(data.guests) && (data.guests ?? 0) >= 1
      ? Math.min(Math.trunc(data.guests as number), MAX_BOOKING_GUESTS)
      : undefined;

  return {
    packageName: data.packageName?.trim() || undefined,
    date: data.date?.trim() || undefined,
    guests,
    time: data.time?.trim() || undefined,
    source: data.source?.trim() || undefined,
    languageCode: normalizeLanguageCode(data.languageCode),
  };
}

function parseStoredPayload(payload: Prisma.JsonValue): BookingPrefill {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  const record = payload as Record<string, Prisma.JsonValue>;
  const guestsValue =
    typeof record.guests === "number"
      ? record.guests
      : typeof record.guests === "string"
      ? Number(record.guests)
      : undefined;

  return normalizeBookingPrefill({
    packageName:
      typeof record.packageName === "string" ? record.packageName : undefined,
    date: typeof record.date === "string" ? record.date : undefined,
    guests: guestsValue,
    time: typeof record.time === "string" ? record.time : undefined,
    source: typeof record.source === "string" ? record.source : undefined,
    languageCode:
      typeof record.languageCode === "string" ? record.languageCode : undefined,
  });
}

export function parseBookingPrefill(
  searchParams:
    | Record<string, SearchValue>
    | undefined
): BookingPrefill {
  const packageName = getFirstValue(searchParams?.package);
  const date = getFirstValue(searchParams?.date);
  const time = getFirstValue(searchParams?.time);
  const guestsValue = Number(getFirstValue(searchParams?.guests));
  const source = getFirstValue(searchParams?.source);
  const languageCode =
    getFirstValue(searchParams?.languageCode) ??
    getFirstValue(searchParams?.locale);

  return normalizeBookingPrefill({
    packageName,
    date,
    guests: guestsValue,
    time,
    source,
    languageCode,
  });
}

export async function resolveBookingPrefill(
  searchParams:
    | Record<string, SearchValue>
    | undefined
): Promise<BookingPrefill> {
  const fallback = parseBookingPrefill(searchParams);
  const prefillId = getFirstValue(searchParams?.prefill);

  if (!prefillId) {
    return fallback;
  }

  try {
    const stored = await prisma.bookingPrefill.findUnique({
      where: { id: prefillId },
      select: { payload: true, expiresAt: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return fallback;
    }

    return {
      ...fallback,
      ...parseStoredPayload(stored.payload),
    };
  } catch {
    return fallback;
  }
}

export function createBookingPrefillPayload(input: BookingPrefill): BookingPrefill {
  return normalizeBookingPrefill(input);
}
