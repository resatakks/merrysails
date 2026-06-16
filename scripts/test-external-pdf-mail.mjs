/**
 * Verify external job → PDF generation + email payload (no real send).
 * Creates a throwaway external job, generates both PDFs, then deletes it.
 *
 * Run: node --env-file=.env.local scripts/test-external-pdf-mail.mjs
 */
import { prisma } from "../src/lib/db";
import { getExternalJobDocumentPayload } from "../src/lib/external-job-documents";
import {
  generateReservationVoucherPdf,
  generateReservationInvoicePdf,
} from "../src/lib/reservation-pdf";

const jobId = "EXT-TEST-" + Date.now();

const job = await prisma.externalJob.create({
  data: {
    jobId,
    eventType: "birthday",
    customerName: "TESTPDF Maria Silva",
    customerEmail: "testpdf@example.com",
    customerPhone: "+34 612 345 678",
    customerCountry: "ES",
    serviceTitle: "Birthday Dinner on Private Yacht",
    jobDate: new Date("2026-07-22T12:00:00.000Z"),
    jobTime: "19:00",
    durationHours: 3,
    guests: 6,
    pickupPoint: "Çırağan",
    inclusions: ["Fish menu", "Birthday cake", "Music speaker", "Soft drinks"],
    voucherExtraTitle: "Birthday Package & Schedule",
    amount: 1800,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    paymentNotes: "Deposit before event, balance on the day.",
    status: "confirmed",
    confirmedAt: new Date(),
    notes: "Birthday Dinner on Private Yacht",
    internalNote: "Test job — delete after.",
  },
});

console.log(`\n✅ Test external job: ${job.jobId}`);

const payload = await getExternalJobDocumentPayload(jobId);
if (!payload) {
  console.log("❌ Document payload null");
} else {
  console.log(`   tourName:    ${payload.documentInput.tourName}`);
  console.log(`   time:        ${payload.documentInput.time}`);
  console.log(`   pickup:      ${payload.documentInput.meetingPointOverride}`);
  console.log(`   isCustom:    ${payload.documentInput.isCustomBooking}`);
  console.log(`   extraTitle:  ${payload.documentInput.voucherExtraNoteTitle}`);
  console.log(`   extraNote:`);
  for (const line of (payload.documentInput.voucherExtraNote ?? "").split("\n")) {
    console.log(`     ${line}`);
  }

  const voucher = await generateReservationVoucherPdf(payload.documentInput);
  const invoice = await generateReservationInvoicePdf(payload.documentInput);
  console.log(`\n   🎫 Voucher PDF: ${voucher.length} bytes`);
  console.log(`   📄 Invoice PDF: ${invoice.length} bytes`);
  console.log(`   ${voucher.length > 50000 && invoice.length > 50000 ? "✅ Both PDFs generated" : "⚠️ PDF too small"}`);
}

await prisma.externalJob.delete({ where: { jobId } });
console.log(`\n🧹 Test job deleted.\n`);
await prisma.$disconnect();
