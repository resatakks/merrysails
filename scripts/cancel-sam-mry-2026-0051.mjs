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
  } catch { return s; }
}
const adapter = new PrismaPg({ connectionString: normalizeUrl(process.env.DATABASE_URL) });
const prisma = new PrismaClient({ adapter });
const r = await prisma.reservation.update({
  where: { reservationId: "MRY-2026-0051" },
  data: { status: "cancelled" },
});
console.log(`Cancelled ${r.reservationId} (will be re-entered as external work)`);
await prisma.$disconnect();
