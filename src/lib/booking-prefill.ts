import type { Prisma } from "@prisma/client";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export interface BookingPrefill {
  packageName?: string;
  date?: string;
  guests?: number;
  time?: string;
  source?: string;
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

  return normalizeBookingPrefill({
    packageName,
    date,
    guests: guestsValue,
    time,
    source,
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
