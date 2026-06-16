/**
 * Migrate Sam Othman (was MRY-2026-0051, now cancelled) into the External
 * Work table as EXT-MRY-2026-0001. Hard-delete the cancelled reservation so
 * it no longer appears in any list.
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

// 1. Generate external job id
const year = new Date().getFullYear();
const prefix = `EXT-MRY-${year}-`;
const latest = await prisma.externalJob.findFirst({
  where: { jobId: { startsWith: prefix } },
  orderBy: { jobId: "desc" },
  select: { jobId: true },
});
const next = latest ? parseInt(latest.jobId.split("-")[3], 10) + 1 : 1;
const jobId = `${prefix}${String(next).padStart(4, "0")}`;

// 2. Create external job
const job = await prisma.externalJob.create({
  data: {
    jobId,
    eventType: "engagement",
    customerName: "Sam Othman",
    customerEmail: "sam.networkzone@gmail.com",
    customerPhone: "+1 (832) 370-0232",
    customerCountry: "US",
    serviceTitle: "Engagement Organization on Private Yacht",
    serviceDescription:
      "Private 3-hour sunset cruise from Balat with full engagement organization.",
    jobDate: new Date("2026-06-29T12:00:00.000Z"),
    jobTime: "Sunset — start slot TBC (18:00 or 19:00)",
    durationHours: 3,
    guests: 21,
    pickupPoint: "Balat",
    inclusions: [
      "Private yacht charter (3-hour sunset cruise from Balat)",
      "Catering & food service",
      "Table decorations",
      "Music speaker",
      "Professional photography service",
      "Engagement cake",
      "Professional crew, fuel and all operating costs",
    ],
    voucherExtraTitle: "Engagement Package & Schedule",
    amount: 2100,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    paymentStatus: "pending",
    paymentNotes:
      "Total: €2,100 EUR cash. A partial deposit is collected before the event; the balance is paid on the day.",
    status: "confirmed",
    confirmedAt: new Date(),
    notes:
      "3-hour private sunset cruise from Balat. Engagement organization with catering, decorations, music, professional photography and engagement cake.",
    internalNote:
      "Sam Othman engagement organization. €2,100 cash — partial deposit before event, balance on the day. Start slot (18:00 or 19:00) confirmed by Emir closer to the date.",
  },
});

// 3. Hard-delete the old cancelled reservation so reports stay clean
await prisma.reservation.delete({
  where: { reservationId: "MRY-2026-0051" },
});

console.log(`\n✅ Migrated to External Work table`);
console.log(`   New: ${job.jobId} (event: engagement, 21 pax, €2,100)`);
console.log(`   Old: MRY-2026-0051 hard-deleted from reservations\n`);
console.log(`   Voucher: https://merrysails.com/external/${job.jobId}/voucher`);
console.log(`   Invoice: https://merrysails.com/external/${job.jobId}/invoice`);
console.log(`   Admin:   https://merrysails.com/admin/external\n`);

await prisma.$disconnect();
