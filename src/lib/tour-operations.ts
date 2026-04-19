import { format } from "date-fns";
import { prisma } from "@/lib/db";
import { getTourBySlug } from "@/data/tours";

export interface TourOperationSnapshot {
  id: string;
  tourSlug: string;
  date: string;
  isSoldOut: boolean;
  departureTimeOverride: string | null;
  note: string | null;
}

export function normalizeOperationDate(dateInput: string | Date): Date {
  const date =
    typeof dateInput === "string" ? new Date(`${dateInput}T00:00:00.000Z`) : dateInput;

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid operation date.");
  }

  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

export function getOperationDateKey(dateInput: string | Date): string {
  const date = normalizeOperationDate(dateInput);
  return format(date, "yyyy-MM-dd");
}

export function isValidDepartureTimeOverride(value?: string | null): boolean {
  if (!value) {
    return true;
  }

  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value.trim());
}

export async function listUpcomingTourOperations(
  tourSlug?: string
): Promise<TourOperationSnapshot[]> {
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const operations = await prisma.tourOperationDay.findMany({
    where: {
      date: { gte: today },
      ...(tourSlug ? { tourSlug } : {}),
    },
    orderBy: [{ date: "asc" }, { tourSlug: "asc" }],
  });

  return operations.map((operation) => ({
    id: operation.id,
    tourSlug: operation.tourSlug,
    date: getOperationDateKey(operation.date),
    isSoldOut: operation.isSoldOut,
    departureTimeOverride: operation.departureTimeOverride,
    note: operation.note,
  }));
}

export async function getPublicTourOperationSnapshot(
  tourSlug: string
): Promise<TourOperationSnapshot[]> {
  if (!getTourBySlug(tourSlug)) {
    return [];
  }

  const allOperations = await listUpcomingTourOperations(tourSlug);

  return allOperations.filter(
    (operation) =>
      operation.isSoldOut ||
      Boolean(operation.departureTimeOverride) ||
      Boolean(operation.note)
  );
}
