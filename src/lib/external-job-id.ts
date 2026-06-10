import { prisma } from "./db";

/**
 * Generates a unique external-job ID in format: EXT-MRY-2026-0001
 * Prefix + Year + 4-digit auto-increment, scoped to merrysails.
 */
export async function generateExternalJobId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `EXT-MRY-${year}-`;

  const latest = await prisma.externalJob.findFirst({
    where: { jobId: { startsWith: prefix } },
    orderBy: { jobId: "desc" },
    select: { jobId: true },
  });

  let nextNumber = 1;
  if (latest) {
    const lastNumber = parseInt(latest.jobId.split("-")[3], 10);
    nextNumber = lastNumber + 1;
  }

  return `${prefix}${String(nextNumber).padStart(4, "0")}`;
}
