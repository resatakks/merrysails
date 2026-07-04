/**
 * Dowry & Jahmal Landers — Bosphorus Sunset Cruise (shared, standard booking).
 * 2 guests · Without Wine · €34 pp = €68 · standard email template.
 * NOTE: set CRUISE_DATE before running (operator did not give a date in the paste).
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// ▼▼ FILL THESE BEFORE RUNNING ▼▼
const CRUISE_DATE = "2026-07-00"; // YYYY-MM-DD  ← waiting on operator
const CRUISE_TIME = "19:00"; // departure (boarding 18:30)
const PAYMENT_METHOD = "cash_on_board"; // cash_on_board | card_on_board | card_paid | bank_transfer
// ▲▲ FILL THESE BEFORE RUNNING ▲▲

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
// Brand base so IDs never look brand new.
const reservationId = `${prefix}${String(Math.max(next, 7890)).padStart(4, "0")}`;

const META_START = "[MERRYSAILS_META]";
const META_END = "[/MERRYSAILS_META]";

const meta = {
  packageName: "Bosphorus Sunset Cruise — Without Wine",
  addOns: [],
  customerNote: "Without Wine package. 2 guests @ €34 pp.",
  additionalGuests: ["Jahmal Landers"],
  privateTransferRequested: false,
  meetingPointNote:
    "Karaköy ferry pier (next to the Mimar Sinan statue). Boarding from 18:30, departure 19:00. Please arrive at least 15 minutes before boarding.",
  paymentMethod: PAYMENT_METHOD,
  emailTemplate: "standard",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "bosphorus-sunset-cruise",
    tourName: "Bosphorus Sunset Cruise",
    date: new Date(`${CRUISE_DATE}T12:00:00.000Z`),
    time: CRUISE_TIME,
    guests: 2,
    totalPrice: 68,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Dowry & Jahmal Landers",
    customerEmail: "Dlamb@pps.net",
    customerPhone: "+15033009560",
    customerCountry: "US",
    notes,
  },
});

console.log(`\n✅ CREATED: ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      ${CRUISE_DATE} · ${r.time}`);
console.log(`   Tour:      ${r.tourName} (Without Wine)`);
console.log(`   Guests:    ${r.guests} · €34 pp`);
console.log(`   Total:     €${r.totalPrice} (${PAYMENT_METHOD})`);
console.log(`   Template:  standard (normal sunset confirmation, NOT private)`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
