/**
 * Patch MRY-2026-0051 (Sam Othman) — pickup = Balat (definitive),
 * engagement add-ons surfaced in voucherExtraNote so the voucher renders them
 * as a nicely-formatted box (not a flat comma-list).
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
    "Departure: Balat · Duration 3 hours during sunset (exact start slot to be confirmed).",
    "Payment: €2,100 EUR total in cash. A partial deposit is collected before the event and the balance is settled on the day.",
  ].join(" "),
  additionalGuests: [],
  privateTransferRequested: false,
  meetingPointNote: "Balat",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
  internalOperatorNote:
    "Sam Othman engagement organization · 29 Jun 2026 · 3-hour sunset cruise from Balat. " +
    "€2,100 cash — partial deposit before event, balance on the day. " +
    "Start slot (18:00 or 19:00) TBC — confirm with Emir.",
  voucherExtraNote: [
    "Included in your engagement package:",
    "• Private yacht charter (3-hour sunset cruise from Balat)",
    "• Catering and food service",
    "• Table decorations",
    "• Music speaker",
    "• Professional photography service",
    "• Engagement cake",
    "• Professional crew, fuel and all operating costs",
    "",
    "Schedule",
    "Duration: 3 hours during sunset.",
    "Start window: 18:00 or 19:00 — exact slot confirmed by our team closer to the date.",
    "",
    "Payment",
    "Total: €2,100 EUR cash.",
    "A partial deposit is collected before the event; the balance is paid on the day.",
  ].join("\n"),
  voucherExtraNoteTitle: "Engagement Package & Schedule",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const updated = await prisma.reservation.update({
  where: { reservationId: "MRY-2026-0051" },
  data: { notes },
});

console.log(`✅ Updated ${updated.reservationId}`);
console.log(`   Pickup: Balat`);
console.log(`   Voucher: https://merrysails.com/reservation/${updated.reservationId}/voucher`);
console.log(`   Invoice: https://merrysails.com/reservation/${updated.reservationId}/invoice`);

await prisma.$disconnect();
