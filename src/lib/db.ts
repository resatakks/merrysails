import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function normalizeDatabaseUrl(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslmode = url.searchParams.get("sslmode");

    if (!sslmode || ["prefer", "require", "verify-ca"].includes(sslmode)) {
      url.searchParams.set("sslmode", "verify-full");
      url.searchParams.delete("uselibpqcompat");
    }

    return url.toString();
  } catch {
    return connectionString;
  }
}

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  const adapter = new PrismaPg({
    connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
