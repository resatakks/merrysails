/**
 * Patch MRY-2026-0046 notes with a structured [MERRYSAILS_META] block so
 * the voucher / invoice / email all show Karaköy as the meeting point
 * (instead of falling back to the tour's default departurePoint).
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
  } catch { return s; }
}

const adapter = new PrismaPg({ connectionString: normalizeUrl(process.env.DATABASE_URL) });
const prisma = new PrismaClient({ adapter });

const RESERVATION_ID = "MRY-2026-0046";

const META = {
  customerNote:
    "Pickup from Karaköy and drop-off at Karaköy (same point). June 19, 19:00-23:00 (4 hours) private dinner yacht cruise. Dinner service included (operator-provided). Payment: €486 EUR cash on board. 2 guests.",
  meetingPointNote:
    "Pickup and drop-off both at Karaköy ferry pier next to the Mimar Sinan statue (by the Marmaray exit, near Balıkçı Kemal). Exact spot will be confirmed by our team one day before.",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
};

const notes = `[MERRYSAILS_META]${JSON.stringify(META)}[/MERRYSAILS_META]`;

const r = await prisma.reservation.update({
  where: { reservationId: RESERVATION_ID },
  data: { notes },
  select: { reservationId: true, notes: true },
});
console.log("Patched", r.reservationId);
console.log("Notes:", r.notes);
await prisma.$disconnect();
