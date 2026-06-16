/**
 * Sandu Ciprian — private 2-hour Bosphorus dinner yacht cruise (birthday).
 * 15.06.2026 · 19:00-21:00 · Çırağan pickup · €460 cash on board.
 * Fish menu + birthday cake included.
 * No customer email sent — operator reviews voucher/invoice first.
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
  packageName: "Private Bosphorus Dinner Yacht Cruise (2 hours)",
  addOns: [],
  customerNote: [
    "Private 2-hour Bosphorus dinner yacht cruise.",
    "Departure & drop-off: Çırağan · 19:00–21:00.",
    "On board: fish menu and a birthday cake.",
    "Payment: €460 cash on board.",
  ].join(" "),
  additionalGuests: [],
  privateTransferRequested: false,
  meetingPointNote: "Çırağan",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
  internalOperatorNote:
    "Sandu Ciprian · 2 pax · private dinner yacht 2 saat · 19:00-21:00 · " +
    "Çırağan kalkış-bırakış · €460 cash. Balık menü + doğum günü pastası.",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "private-bosphorus-dinner-yacht-cruise",
    tourName: "Private Bosphorus Dinner Yacht Cruise",
    date: new Date("2026-06-15T12:00:00.000Z"),
    time: "19:00 - 21:00",
    guests: 2,
    totalPrice: 460,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Sandu Ciprian",
    customerEmail: "ciprian.sandu@biograintrading.ro",
    customerPhone: "+40725214288",
    customerCountry: "RO",
    notes,
  },
});

console.log(`\n✅ CREATED: ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      2026-06-15 · ${r.time}`);
console.log(`   Tour:      ${r.tourName} (2 saat private)`);
console.log(`   Pickup:    Çırağan`);
console.log(`   Guests:    ${r.guests}`);
console.log(`   Total:     €${r.totalPrice} cash on board`);
console.log(`   Extras:    Balık menü + doğum günü pastası`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
