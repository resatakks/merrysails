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

const year = new Date().getFullYear();
const prefix = `MRY-${year}-`;
const latest = await prisma.reservation.findFirst({
  where: { reservationId: { startsWith: prefix } },
  orderBy: { reservationId: "desc" },
  select: { reservationId: true },
});
const next = latest ? parseInt(latest.reservationId.split("-")[2], 10) + 1 : 1;
const reservationId = `${prefix}${String(next).padStart(4, "0")}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "bosphorus-sightseeing-yacht-cruise",
    tourName: "Bosphorus Tour",
    date: new Date("2026-05-29T00:00:00.000Z"),
    time: "12:00 - 14:00",
    guests: 2,
    totalPrice: 200,
    currency: "EUR",
    status: "new",
    customerName: "Nathan Furr",
    customerEmail: "nathan.furr@insead.edu",
    customerPhone: "",
    customerCountry: "",
    notes: "Custom private booking arranged by phone with operations team (Emir). Pickup from Karaköy on May 29, 12:00-14:00 private yacht tour. Payment: €200 EUR cash on board. 2 guests.",
  },
});
console.log("✅ CREATED reservationId:", r.reservationId, "(internal id:", r.id + ")");
console.log("   Voucher URL: https://merrysails.com/reservation/" + r.reservationId + "/voucher");
console.log("   Invoice URL: https://merrysails.com/reservation/" + r.reservationId + "/invoice");
await prisma.$disconnect();
