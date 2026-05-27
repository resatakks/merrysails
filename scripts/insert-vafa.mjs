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
    tourSlug: "private-yacht-swimming-tour",
    tourName: "Private Princes' Island Swimming Tour",
    date: new Date("2026-07-03T00:00:00.000Z"),
    time: "",
    guests: 1,
    totalPrice: 1200,
    currency: "USD",
    status: "new",
    customerName: "Vafa Askarova",
    customerEmail: "vaskarova@gmail.com",
    customerPhone: "+18473619907",
    customerCountry: "United States",
    notes: "Custom private booking arranged by phone with operations team. Pickup from Karaköy on July 3 — planned time 09:00 but FLEXIBLE; confirm slot with guest. Payment: $1,200 USD collected on board (cash or card preferred). NO confirmation email sent yet — awaiting internal review.",
  },
});
console.log("✅ CREATED reservationId:", r.reservationId, "(internal id:", r.id + ")");
console.log("   Voucher URL: https://merrysails.com/reservation/" + r.reservationId + "/voucher");
console.log("   Invoice URL: https://merrysails.com/reservation/" + r.reservationId + "/invoice");
await prisma.$disconnect();
