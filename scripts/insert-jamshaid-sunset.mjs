/**
 * Jamshaid Iqbal — Bosphorus Sunset Cruise (shared, site booking).
 * 09 Jul 2026 · 19:00 · 2 guests · Without Wine · €60 cash.
 * Additional guest: Robina Jamshaid. Request: side seats if possible.
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
  packageName: "Bosphorus Sunset Cruise — Without Wine",
  addOns: [],
  customerNote:
    "Without Wine package. Special request: side seats if possible.",
  additionalGuests: ["Robina Jamshaid"],
  privateTransferRequested: false,
  meetingPointNote:
    "Karaköy ferry pier (next to the Mimar Sinan statue). Boarding from 18:30, departure 19:00. Please arrive at least 15 minutes before boarding.",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "bosphorus-sunset-cruise",
    tourName: "Bosphorus Sunset Cruise",
    date: new Date("2026-07-09T12:00:00.000Z"),
    time: "19:00",
    guests: 2,
    totalPrice: 60,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Jamshaid Iqbal",
    customerEmail: "jamshaid.rafique@ku.edu.kw",
    customerPhone: "+96566844785",
    customerCountry: "KW",
    notes,
  },
});

console.log(`\n✅ CREATED: ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      2026-07-09 · ${r.time}`);
console.log(`   Tour:      ${r.tourName} (Without Wine)`);
console.log(`   Pickup:    Karaköy ferry pier`);
console.log(`   Guests:    ${r.guests} (+ Robina Jamshaid)`);
console.log(`   Total:     €${r.totalPrice} cash`);
console.log(`   Note:      side seats if possible`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
