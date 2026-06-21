/**
 * Sourabh Agarwal — anniversary private yacht (NORMAL reservation).
 * Replaces the mistaken EXT-MRY-2026-0003 external job.
 * 28 Nov 2026 · boutique yacht 16:00-18:00 · pickup 15:30 Ritz Carlton.
 * €350 cash on board (€370 list, €20 discount). No customer email sent.
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

// 1. Remove the mistaken external job
await prisma.externalJob
  .delete({ where: { jobId: "EXT-MRY-2026-0003" } })
  .then(() => console.log("🗑  EXT-MRY-2026-0003 (external) silindi"))
  .catch(() => console.log("ℹ  EXT-MRY-2026-0003 zaten yok"));

// 2. Create normal reservation
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
  packageName: "Anniversary Private Yacht Cruise (Boutique Yacht, 2 hours)",
  addOns: [
    "2-hour private boutique yacht cruise",
    "Anniversary cake — chocolate, for 2 guests",
    "A small bottle of champagne",
    "Private transfer: pick-up & drop-off from Ritz Carlton (Mercedes Vito van)",
    "Complimentary snacks & drinks on board",
  ],
  customerNote: [
    "Anniversary private boutique yacht cruise.",
    "Cruise 16:00–18:00 · Pick-up 15:30 from Ritz Carlton (Mercedes Vito van).",
    "Total €350 cash on board (list €370, €20 discount applied).",
  ].join(" "),
  additionalGuests: [],
  privateTransferRequested: true,
  meetingPointNote: "Ritz Carlton — 15:30 private transfer (Mercedes Vito van)",
  paymentMethod: "cash_on_board",
  emailTemplate: "custom-booking",
  voucherExtraTitle: "Anniversary Package & Schedule",
  voucherExtraNote: [
    "Included:",
    "• 2-hour private boutique yacht cruise",
    "• Anniversary cake — chocolate, for 2 guests",
    "• A small bottle of champagne",
    "• Private transfer: pick-up & drop-off from Ritz Carlton (Mercedes Vito van)",
    "• Complimentary snacks & drinks on board",
    "",
    "Schedule",
    "Cruise: 16:00 – 18:00 · Pick-up: 15:30 from Ritz Carlton.",
    "",
    "Payment",
    "Total €350 cash on board (list €370, €20 discount applied).",
  ].join("\n"),
  internalOperatorNote:
    "Fiyat kırılımı: Boutique yacht 2h €220 · Anniversary cake (chocolate, 2pax) €40 · " +
    "Champagne (small) €50 · Private transfer Ritz Carlton (Mercedes Vito) €60 · " +
    "Complimentary snacks & drinks dahil. Toplam €370 → indirim €20 → €350 cash.",
};

const notes = `${META_START}${JSON.stringify(meta)}${META_END}`;

const r = await prisma.reservation.create({
  data: {
    reservationId,
    tourSlug: "bosphorus-sightseeing-yacht-cruise",
    tourName: "Anniversary Private Yacht Cruise",
    date: new Date("2026-11-28T12:00:00.000Z"),
    time: "16:00 - 18:00",
    guests: 2,
    totalPrice: 350,
    currency: "EUR",
    status: "confirmed",
    confirmedAt: new Date(),
    customerName: "Sourabh Agarwal",
    customerEmail: "sourab13@gmail.com",
    customerPhone: "+447864660741",
    customerCountry: "GB",
    notes,
  },
});

console.log(`\n✅ CREATED (normal): ${r.reservationId}`);
console.log(`   Customer:  ${r.customerName} · ${r.customerEmail} · ${r.customerPhone}`);
console.log(`   Date:      2026-11-28 · ${r.time} (pickup 15:30)`);
console.log(`   Pickup:    Ritz Carlton (Mercedes Vito)`);
console.log(`   Guests:    ${r.guests}`);
console.log(`   Total:     €${r.totalPrice} cash (€370 list, €20 discount)`);
console.log(`\n   🎫 Voucher: https://merrysails.com/reservation/${r.reservationId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/reservation/${r.reservationId}/invoice\n`);

await prisma.$disconnect();
