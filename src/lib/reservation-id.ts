import { prisma } from "./db";

/**
 * Generates a unique reservation ID in format: MRY-2026-0001
 * Prefix + Year + 4-digit auto-increment
 */
export async function generateReservationId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `MRY-${year}-`;

  // Find the latest reservation for this year
  const latest = await prisma.reservation.findFirst({
    where: { reservationId: { startsWith: prefix } },
    orderBy: { reservationId: "desc" },
    select: { reservationId: true },
  });

  let nextNumber = 1;
  if (latest) {
    const lastNumber = parseInt(latest.reservationId.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  return `${prefix}${String(nextNumber).padStart(4, "0")}`;
}
