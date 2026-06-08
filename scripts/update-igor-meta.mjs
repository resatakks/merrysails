/**
 * Tighten MRY-2026-0046 (Igor Orlov) meta — shorter meeting-point text,
 * drop the redundant "and drop-off" prefix.
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

const META = {
  customerNote:
    "Pickup from Karaköy. June 19, 19:00-23:00 (4 hours) private dinner yacht cruise. Dinner service included. Payment: €486 EUR cash on board. 2 guests.",
  meetingPointNote:
    "Karaköy ferry pier next to the Mimar Sinan statue (by the Marmaray exit, near Balıkçı Kemal). Exact spot will be confirmed by our team one day before.",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
};

const notes = `[MERRYSAILS_META]${JSON.stringify(META)}[/MERRYSAILS_META]`;

const r = await prisma.reservation.update({
  where: { reservationId: "MRY-2026-0046" },
  data: { notes },
  select: { reservationId: true, notes: true },
});
console.log("Updated", r.reservationId);
await prisma.$disconnect();
