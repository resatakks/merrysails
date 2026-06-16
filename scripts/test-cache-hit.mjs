/**
 * Verify ParseLog 24h cache layer — second identical message should skip LLM.
 *
 * Run: node --env-file=.env.local scripts/test-cache-hit.mjs
 */
import { prisma } from "../src/lib/db";
import { parseAndPersist } from "../src/lib/external-parser/persistence";

const TEST_CHAT = "test-cache-" + Date.now();
const MESSAGE = `Test Cache Test User
test+cachetest@example.com
+90 555 111 22 33
14.07.2026 19:00
200€ nakit
sunset cruise`;

console.log("\n🧪 Cache layer test\n");

console.log("Call 1 — fresh (will hit LLM)...");
const t1 = Date.now();
const r1 = await parseAndPersist(MESSAGE, TEST_CHAT);
const dt1 = Date.now() - t1;
console.log(`  ${r1.ok ? "✅" : "❌"} ${dt1}ms · sessionId=${r1.ok ? r1.result.sessionId.slice(0, 12) : "—"}`);
if (r1.ok) {
  console.log(`  Customer: ${r1.result.data.customerName} · ${r1.result.data.amount} ${r1.result.data.currency}`);
}

console.log();
console.log("Call 2 — same content, different chatId (should hit cache, 0ms)...");
const t2 = Date.now();
const r2 = await parseAndPersist(MESSAGE, TEST_CHAT + "-other");
const dt2 = Date.now() - t2;
console.log(`  ${r2.ok ? "✅" : "❌"} ${dt2}ms · sessionId=${r2.ok ? r2.result.sessionId.slice(0, 12) : "—"}`);
if (r2.ok) {
  console.log(`  Warnings: ${r2.result.warnings.join(" | ")}`);
}

console.log();
console.log("Cleaning up test rows...");
const delLogs = await prisma.parseLog.deleteMany({
  where: { OR: [{ chatId: TEST_CHAT }, { chatId: TEST_CHAT + "-other" }] },
});
const delSessions = await prisma.parseSession.deleteMany({
  where: { OR: [{ chatId: TEST_CHAT }, { chatId: TEST_CHAT + "-other" }] },
});
console.log(`  Deleted ${delLogs.count} logs + ${delSessions.count} sessions`);

await prisma.$disconnect();

console.log();
console.log(`Sonuç: call 1 = ${dt1}ms (LLM), call 2 = ${dt2}ms ${dt2 < 1000 ? "(cache hit ✅)" : "(no cache, why?)"}`);
console.log(`Tasarruf: 1 LLM call = ~$0.005 → 2. operatör için sıfır maliyet`);
