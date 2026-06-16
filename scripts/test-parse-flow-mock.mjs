/**
 * End-to-end flow test WITHOUT calling Anthropic — uses a hand-crafted
 * ParsedExternalJob to verify the persistence → finalize chain works.
 *
 * Verifies:
 *  1. ParseSession + ParseLog rows persist correctly
 *  2. recordOutcome marks the session as confirmed
 *  3. finalize creates the right row (Reservation or ExternalJob)
 *  4. Voucher / invoice URLs round-trip
 *
 * Run: node --env-file=.env.local scripts/test-parse-flow-mock.mjs
 */
import { prisma } from "../src/lib/db";
import { recordOutcome, applyOverrides } from "../src/lib/external-parser/persistence";
import { finalize } from "../src/lib/external-parser/finalize";

const TEST_CHAT_ID = "test-chat-" + Date.now();

function buildEngagementParsed() {
  return {
    confidence: 0.9,
    uncertainties: ["Slot 18:00 or 19:00 TBC"],
    intent: "external",
    referenceId: null,
    eventType: "engagement",
    serviceTitle: "Engagement Organization on Private Yacht",
    customerName: "FLOWTEST Sam Othman",
    customerEmail: "flowtest+sam@example.com",
    customerPhone: "+1 (832) 370-0232",
    customerCountry: "US",
    jobDate: "2026-06-29",
    jobTime: "Sunset",
    durationHours: 3,
    guests: 21,
    pickupPoint: "Balat",
    dropoffPoint: null,
    inclusions: [
      "Private yacht charter",
      "Catering & food service",
      "Table decorations",
      "Music speaker",
      "Professional photographer",
      "Engagement cake",
    ],
    amount: 2100,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    paymentNotes: "Partial deposit before event, balance on day.",
    internalNote: "Confirmed by Emir from Balat.",
  };
}

function buildReservationParsed() {
  return {
    confidence: 0.85,
    uncertainties: [],
    intent: "reservation",
    referenceId: null,
    eventType: "cruise",
    serviceTitle: "Bosphorus Dinner Cruise",
    customerName: "FLOWTEST Graziella Orsida",
    customerEmail: "flowtest+graziella@example.com",
    customerPhone: "+353838651127",
    customerCountry: "Ireland",
    jobDate: "2026-06-12",
    jobTime: "20:30",
    durationHours: null,
    guests: 2,
    pickupPoint: "Kabataş",
    dropoffPoint: null,
    inclusions: ["Silver Dinner Cruise - Soft Drinks"],
    amount: 60,
    currency: "EUR",
    paymentMethod: "cash_on_board",
    paymentNotes: null,
    internalNote: null,
  };
}

async function testEngagementFlow() {
  console.log("\n━━━ Test 1: Engagement → ExternalJob ━━━");
  const parsed = buildEngagementParsed();

  const session = await prisma.parseSession.create({
    data: {
      chatId: TEST_CHAT_ID,
      brand: "merrysails",
      originalMessage: "[mock] engagement test",
      messageHash: "mock-engagement-" + Date.now(),
      parsedData: parsed,
      intent: parsed.intent,
      referenceId: parsed.referenceId,
      state: "pending",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  console.log("  Session created:", session.id);

  const log = await prisma.parseLog.create({
    data: {
      chatId: TEST_CHAT_ID,
      brand: "merrysails",
      messageHash: session.messageHash,
      messageText: "[mock] engagement test",
      model: "claude-haiku-4-5-20251001",
      latencyMs: 5000,
      confidence: parsed.confidence,
      parsedJson: parsed,
      outcome: "pending",
    },
  });
  console.log("  ParseLog created:", log.id);

  const result = await finalize(parsed, "external");
  if (!result.ok) {
    console.log("  ❌ finalize failed:", result.error);
    return;
  }
  console.log(`  ✅ Created: ${result.jobId}`);
  console.log(`     Voucher: ${result.voucherUrl}`);
  console.log(`     Invoice: ${result.invoiceUrl}`);

  await recordOutcome(session.id, "confirmed", {
    createdRecordId: result.jobId,
    createdRecordType: "external",
  });
  console.log("  ✅ Outcome recorded");

  const updated = await prisma.parseSession.findUnique({
    where: { id: session.id },
  });
  console.log(
    `  Session state: ${updated?.state}, createdRecordId: ${updated?.createdRecordId}`
  );

  const externalRow = await prisma.externalJob.findUnique({
    where: { jobId: result.jobId },
  });
  console.log(
    `  ExternalJob row: ${externalRow?.serviceTitle} · ${externalRow?.guests} pax · €${externalRow?.amount}`
  );
  console.log(`  Inclusions: ${externalRow?.inclusions.length} items`);
  console.log(`  Pickup: ${externalRow?.pickupPoint}`);
}

async function testReservationFlow() {
  console.log("\n━━━ Test 2: Reservation → Reservation table ━━━");
  const parsed = buildReservationParsed();

  const result = await finalize(parsed, "reservation");
  if (!result.ok) {
    console.log("  ❌ finalize failed:", result.error);
    return;
  }
  console.log(`  ✅ Created: ${result.reservationId}`);
  console.log(`     Voucher: ${result.voucherUrl}`);
  console.log(`     Invoice: ${result.invoiceUrl}`);

  const resRow = await prisma.reservation.findUnique({
    where: { reservationId: result.reservationId },
  });
  console.log(
    `  Reservation row: ${resRow?.tourName} · ${resRow?.guests} pax · €${resRow?.totalPrice}`
  );
  console.log(`  Tour slug: ${resRow?.tourSlug}`);
  console.log(`  Date: ${resRow?.date.toISOString().slice(0, 10)} ${resRow?.time}`);
}

async function testOverrides() {
  console.log("\n━━━ Test 3: applyOverrides — operator edits ━━━");
  const base = buildEngagementParsed();
  const merged = applyOverrides(base, {
    guests: 25,
    amount: 2500,
    jobTime: "18:00",
  });
  console.log(
    `  guests: ${base.guests} → ${merged.guests}, amount: ${base.amount} → ${merged.amount}, time: "${base.jobTime}" → "${merged.jobTime}"`
  );
  if (merged.guests === 25 && merged.amount === 2500 && merged.jobTime === "18:00") {
    console.log("  ✅ Overrides apply correctly");
  } else {
    console.log("  ❌ Override mismatch");
  }
}

async function cleanup() {
  console.log("\n━━━ Cleanup ━━━");
  const delLogs = await prisma.parseLog.deleteMany({
    where: { chatId: TEST_CHAT_ID },
  });
  const delSessions = await prisma.parseSession.deleteMany({
    where: { chatId: TEST_CHAT_ID },
  });
  const delJobs = await prisma.externalJob.deleteMany({
    where: { customerName: { startsWith: "FLOWTEST " } },
  });
  const delRes = await prisma.reservation.deleteMany({
    where: { customerName: { startsWith: "FLOWTEST " } },
  });
  console.log(
    `  Deleted: ${delLogs.count} logs, ${delSessions.count} sessions, ${delJobs.count} external jobs, ${delRes.count} reservations`
  );
}

async function main() {
  try {
    await testEngagementFlow();
    await testReservationFlow();
    await testOverrides();
  } finally {
    await cleanup();
    await prisma.$disconnect();
  }
}

main().catch(async (err) => {
  console.error("❌ Test failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
