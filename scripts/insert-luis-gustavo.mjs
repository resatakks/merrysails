/**
 * Luis Gustavo Martins — private 2-hour Bosphorus yacht tour.
 * 20.06.2026 · 16:00-18:00 · Karaköy kalkış-bırakış · €220 cash on board.
 * Soft drinks (tea/coffee) + light snacks (nuts) included.
 * No customer email sent — operator will review voucher/invoice first.
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

const year = new Date().getFullYear();
const prefix = `MRY-${year}-`;
const latest = await prisma.reservation.findFirst({
  where: { reservationId: { startsWith: prefix } },
  orderBy: { reservationId: "desc" },
  select: { reservationId: true },
});
const next = latest ? parseInt(latest.reservationId.split("-")[2], 10) + 1 : 1;
const reservationId = `${prefix}${String(next).padStart(4, "0")}`;

const META_START = "[MERRYSAILS_META]";
const META_END = "[/MERRYSAILS_META]";

const meta = {
  packageName: "Private Bosphorus Yacht Tour (2 hours)",
  addOns: [],
  customerNote: [
    "Private 2-hour Bosphorus yacht tour.",
    "Departure & drop-off: Karaköy · 16:00–18:00.",
    "On board: soft drinks (tea, coffee, water) and light snacks (nuts).",
    "Payment: €220 cash on board.",
  ].join(" "),
  additionalGuests: [],
  privateTransferRequested: false,
  meetingPointNote: "Karaköy (kalkış ve bırakış aynı nokta).",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
  internalOperatorNote:
    "Luis Gustavo Martins · 2 pax · private yacht 2 saat · 16:00-18:00 · " +
    "Karaköy kalkış-bırakış · €220 cash. Soft drinks (çay/kahve) + kuruyemiş.",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "bosphorus-sightseeing-yacht-cruise",
    tourName: "Private Bosphorus Yacht Tour",
    date: new Date("2026-06-20T12:00:00.000Z"),
    time: "16:00 - 18:00",
    guests: 2,
    totalPrice: 220,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Luis Gustavo Martins",
    customerEmail: "lgustavomartins@gmail.com",
    customerPhone: "+351962401113",
    customerCountry: "PT",
    notes,
  },
});

console.log(`\n✅ CREATED: ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      2026-06-20 · ${r.time}`);
console.log(`   Tour:      ${r.tourName} (2 saat private)`);
console.log(`   Pickup:    Karaköy kalkış-bırakış`);
console.log(`   Guests:    ${r.guests}`);
console.log(`   Total:     €${r.totalPrice} cash on board`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
