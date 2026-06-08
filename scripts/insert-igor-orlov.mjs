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
    tourSlug: "private-bosphorus-dinner-yacht-cruise",
    tourName: "Private Bosphorus Dinner Yacht Cruise",
    date: new Date("2026-06-19T00:00:00.000Z"),
    time: "19:00 - 23:00",
    guests: 2,
    totalPrice: 486,
    currency: "EUR",
    status: "new",
    customerName: "Igor Orlov",
    customerEmail: "vp31082021@gmail.com",
    customerPhone: "+7 928 196 70 56",
    customerCountry: "RU",
    notes: `[MERRYSAILS_META]${JSON.stringify({
      customerNote:
        "Pickup from Karaköy and drop-off at Karaköy (same point). June 19, 19:00-23:00 (4 hours) private dinner yacht cruise. Dinner service included (operator-provided). Payment: €486 EUR cash on board. 2 guests.",
      meetingPointNote:
        "Pickup and drop-off both at Karaköy ferry pier next to the Mimar Sinan statue (by the Marmaray exit, near Balıkçı Kemal). Exact spot will be confirmed by our team one day before.",
      paymentMethod: "cash_on_board",
      emailTemplate: "custom-booking",
    })}[/MERRYSAILS_META]`,
  },
});
console.log("CREATED reservationId:", r.reservationId, "(internal id:", r.id + ")");
console.log("  Voucher URL: https://merrysails.com/reservation/" + r.reservationId + "/voucher");
console.log("  Invoice URL: https://merrysails.com/reservation/" + r.reservationId + "/invoice");
await prisma.$disconnect();
