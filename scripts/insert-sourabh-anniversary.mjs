/**
 * Sourabh Agarwal — anniversary private yacht + transfer (EXTERNAL WORK).
 * 28 Nov 2026 · boutique yacht 16:00-18:00 · pickup 15:30 from Ritz Carlton.
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

const year = new Date().getFullYear();
const prefix = `EXT-MRY-${year}-`;
const latest = await prisma.externalJob.findFirst({
  where: { jobId: { startsWith: prefix } },
  orderBy: { jobId: "desc" },
  select: { jobId: true },
});
const next = latest ? parseInt(latest.jobId.split("-")[3], 10) + 1 : 1;
const jobId = `${prefix}${String(next).padStart(4, "0")}`;

const job = await prisma.externalJob.create({
  data: {
    jobId,
    eventType: "custom", // anniversary
    customerName: "Sourabh Agarwal",
    customerEmail: "sourab13@gmail.com",
    customerPhone: "+447864660741",
    serviceTitle: "Anniversary Private Yacht Cruise (Boutique Yacht, 2 hours)",
    jobDate: new Date("2026-11-28T12:00:00.000Z"),
    jobTime: "16:00 – 18:00 (pickup 15:30 from Ritz Carlton)",
    durationHours: 2,
    guests: 2,
    pickupPoint: "Ritz Carlton — 15:30 private transfer (Mercedes Vito van)",
    inclusions: [
      "2-hour private boutique yacht cruise",
      "Anniversary cake — chocolate, for 2 guests",
      "A small bottle of champagne",
      "Private transfer: pick-up & drop-off from Ritz Carlton (Mercedes Vito van)",
      "Complimentary snacks & drinks on board",
    ],
    voucherExtraTitle: "Anniversary Package & Schedule",
    amount: 350,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    paymentNotes:
      "Total €350 cash on board. (List price €370 — €20 discount applied.)",
    status: "confirmed",
    confirmedAt: new Date(),
    notes: "Anniversary celebration — boutique yacht + transfer from Ritz Carlton.",
    internalNote:
      "Fiyat kırılımı: Boutique yacht 2h €220 · Anniversary cake (chocolate, 2pax) €40 · " +
      "Champagne (small) €50 · Private transfer Ritz Carlton (Mercedes Vito) €60 · " +
      "Complimentary snacks & drinks dahil. Toplam €370 → indirim €20 → €350 cash.",
  },
});

console.log(`\n✅ EXTERNAL WORK CREATED: ${job.jobId}`);
console.log(`   Customer:  ${job.customerName} · ${job.customerEmail} · ${job.customerPhone}`);
console.log(`   Date:      2026-11-28 · ${job.jobTime}`);
console.log(`   Pickup:    Ritz Carlton (15:30, Mercedes Vito)`);
console.log(`   Guests:    ${job.guests}`);
console.log(`   Total:     €${job.amount} cash (€370 list, €20 discount)`);
console.log(`   Includes:  ${job.inclusions.length} items (yacht, cake, champagne, transfer, snacks)`);
console.log(`\n   🎫 Voucher: https://merrysails.com/external/${job.jobId}/voucher`);
console.log(`   📄 Invoice: https://merrysails.com/external/${job.jobId}/invoice\n`);

await prisma.$disconnect();
