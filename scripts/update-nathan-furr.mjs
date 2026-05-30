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
  where: { reservationId: "MRY-2026-0039" },
  data: {
    time: "12:00 - 14:00",
    notes: "Custom private booking arranged by phone with operations team (Emir). Pickup from Karaköy Pier. Confirmed departure 12:00, return 14:00 on Friday May 29, 2026. Private yacht Bosphorus tour for 2 guests. Payment: €200 EUR cash on board.",
  },
});

console.log("✅ UPDATED", r.reservationId);
console.log("   time:", JSON.stringify(r.time));
console.log("   notes:", r.notes);

await prisma.$disconnect();
