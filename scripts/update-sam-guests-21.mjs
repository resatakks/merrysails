/**
 * MRY-2026-0051 (Sam Othman) — pax count 2 → 21.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function normalizeUrl(s) {
  try {
    const u = new URL(s);
    const m = u.searchParams.get("sslmode");
    if (!m || ["prefer", "require", "verify-ca"].includes(m)) {
      u.searchParams.set("sslmode", "verify-full");
      u.searchParams.delete("uselibpqcompat");
    }
    return u.toString();
  } catch {
    return s;
  }
}

const adapter = new PrismaPg({
  connectionString: normalizeUrl(process.env.DATABASE_URL),
});
const prisma = new PrismaClient({ adapter });

const updated = await prisma.reservation.update({
  where: { reservationId: "MRY-2026-0051" },
  data: { guests: 21 },
});

console.log(`✅ Updated ${updated.reservationId} · guests: ${updated.guests}`);
await prisma.$disconnect();
