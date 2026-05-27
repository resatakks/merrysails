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

const updated = await prisma.reservation.update({
  where: { reservationId: "MRY-2026-0032" },
  data: {
    notes: "Private booking arranged by phone — pickup from Karaköy, time flexible. Payment: $1,200 USD cash.",
  },
});

console.log("Updated MRY-2026-0032 notes:", updated.notes);
await prisma.$disconnect();
