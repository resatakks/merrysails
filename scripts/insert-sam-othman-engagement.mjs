/**
 * Sam Othman — engagement organization on yacht.
 * 29 Jun 2026 · 3-hour sunset cruise · departure pier TBC.
 * €2,100 EUR cash (partial deposit before event, balance on the day).
 * No customer email sent.
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
const next = latest
  ? parseInt(latest.reservationId.split("-")[2], 10) + 1
  : 1;
const reservationId = `${prefix}${String(next).padStart(4, "0")}`;

const META_START = "[MERRYSAILS_META]";
const META_END = "[/MERRYSAILS_META]";

const meta = {
  packageName: "Engagement Organization on Yacht (3-hour sunset cruise)",
  addOns: [
    "Catering & food service",
    "Table decorations",
    "Music speaker",
    "Professional photographer",
    "Engagement cake",
  ],
  customerNote: [
    "Engagement organization on a private yacht — 3-hour sunset cruise.",
    "Duration: 3 hours during sunset on 29 June 2026.",
    "Departure pier: to be confirmed (TBC) — our team will share the exact meeting point closer to the date.",
    "Payment: €2,100 EUR total in cash. A partial deposit is collected before the event and the balance is settled on the day.",
  ].join(" "),
  additionalGuests: [],
  privateTransferRequested: false,
  meetingPointNote:
    "Departure pier to be confirmed (TBC). Our team will share the exact meeting point and final start time closer to the event date.",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
  internalOperatorNote:
    "Sam Othman engagement organization · 29 Jun 2026 · 3-hour sunset cruise. " +
    "€2,100 cash — partial deposit before event, balance on the day. " +
    "Departure pier + start slot (18:00 or 19:00) TBC — confirm with Emir.",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "romantic-marriage-proposal",
    tourName: "Engagement Organization — Private Yacht (3-hour Sunset Cruise)",
    date: new Date("2026-06-29T12:00:00.000Z"),
    time: "Sunset — 3 hours (start slot TBC)",
    guests: 2,
    totalPrice: 2100,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Sam Othman",
    customerEmail: "sam.networkzone@gmail.com",
    customerPhone: "+1 (832) 370-0232",
    customerCountry: "US",
    notes,
  },
});

console.log(`\n✅ CREATED: ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      2026-06-29 · ${r.time}`);
console.log(`   Departure: TBC`);
console.log(`   Tour:      ${r.tourName}`);
console.log(`   Guests:    ${r.guests}`);
console.log(`   Total:     €${r.totalPrice} EUR cash (partial deposit + balance on day)`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
