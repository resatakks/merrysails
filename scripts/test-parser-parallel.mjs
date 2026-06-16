/**
 * Parallel accuracy test — runs N fixtures concurrently to stress-test the
 * parser and measure per-call cost variance.
 */
import { parseExternalMessage } from "../src/lib/external-parser/parse";

const FIXTURES = [
  {
    label: "Sam — engagement (full WhatsApp thread)",
    expected: { intent: "external", eventType: "engagement", customerName: "Sam Othman", guests: 21, amount: 2100, currency: "EUR" },
    message: `[12.06.2026 19:56:45] Reşat: 29.06.26

Catering and food service
Table decorations
Music speaker
Professional photograph service
Engagement cake
3 hours Tour on Sunset time

2100€ nakit odeme (bir kısmı organizasyon öncesinde alınacak)

Engagement organization

Email is sam.networkzone@gmail.com

Sam Othman
+1 (832) 370-0232
[12.06.2026 19:58:03] Emir Plakay: Balat
[12.06.2026 23:42:42] Emir Plakay: 21 kişi olacaklar`,
  },
  {
    label: "Kakorina — shared sunset (RESERVATION)",
    expected: { intent: "reservation", customerName: "Kakorina Daria", guests: 2, amount: 68, currency: "EUR" },
    message: `[12.06.2026 11:45:46] Emir Merry: 23 June.
Kakorina Daria
+79138384824
dkako82@mail.ru
Sunset alkolsüz
Kişi başı 34€
2pax`,
  },
  {
    label: "Igor — private dinner yacht (RESERVATION)",
    expected: { intent: "reservation", customerName: "Igor Orlov", guests: 2, amount: 486, currency: "EUR" },
    message: `[8.06.2026 16:23:22] Emir: 19.06.26
2pax
19-23
yemekli
Igor Orlov
vp31082021@gmail.com
Karakoy kalkis birakilis
486€ nakit ödeme
+7 928 196-70-56`,
  },
  {
    label: "Kim & Robert — airport transfer (EXTERNAL)",
    expected: { intent: "external", eventType: "transfer", customerName: "Kim & Robert Haddad", amount: 43, currency: "EUR" },
    message: `Good morning 😊
We would like to book car service for two people.
1. Name: Kim & Robert Haddad
2. Flight: TK 65
3. Date: June 9th at 5:10pm
4. Airport: IST airport
5. Hotel: Ayasofya
Kucuk Ayasofya, Demarco Resit Sk. No: 14, Fatih.
43€`,
  },
];

console.log(`\n🧪 Paralel accuracy test — ${FIXTURES.length} fixture\n`);

const start = Date.now();
const results = await Promise.all(
  FIXTURES.map((f) => parseExternalMessage(f.message, "merrysails"))
);
const totalMs = Date.now() - start;

let totalCost = 0;
let passCount = 0;

for (let i = 0; i < FIXTURES.length; i++) {
  const fixture = FIXTURES[i];
  const result = results[i];
  console.log("━".repeat(72));
  console.log(`📨 ${fixture.label}`);
  console.log("━".repeat(72));

  if (!result.ok) {
    console.log(`❌ FAIL: ${result.error}`);
    continue;
  }

  const d = result.data;
  console.log(`  Intent:     ${d.intent}    (expected: ${fixture.expected.intent})`);
  console.log(`  Confidence: ${(d.confidence * 100).toFixed(0)}%`);
  console.log(`  Customer:   ${d.customerName}    (expected: ${fixture.expected.customerName})`);
  console.log(`  Pax:        ${d.guests}` + (fixture.expected.guests ? `    (expected: ${fixture.expected.guests})` : ""));
  console.log(`  Amount:     ${d.amount} ${d.currency}    (expected: ${fixture.expected.amount} ${fixture.expected.currency})`);
  if (d.pickupPoint) console.log(`  Pickup:     ${d.pickupPoint}`);

  // Accuracy check
  const checks = [];
  checks.push({ k: "intent", ok: d.intent === fixture.expected.intent });
  if (fixture.expected.eventType)
    checks.push({ k: "eventType", ok: d.eventType === fixture.expected.eventType });
  checks.push({ k: "customerName", ok: d.customerName.toLowerCase().includes(fixture.expected.customerName.toLowerCase().split(" ")[0]) });
  if (fixture.expected.guests)
    checks.push({ k: "guests", ok: d.guests === fixture.expected.guests });
  checks.push({ k: "amount", ok: Math.abs(d.amount - fixture.expected.amount) < 1 });
  checks.push({ k: "currency", ok: d.currency === fixture.expected.currency });

  const failed = checks.filter((c) => !c.ok);
  if (failed.length === 0) {
    console.log(`  ✅ Accuracy: ${checks.length}/${checks.length}`);
    passCount++;
  } else {
    console.log(`  ⚠️  Accuracy: ${checks.length - failed.length}/${checks.length}  Failed: ${failed.map((f) => f.k).join(", ")}`);
  }

  if (result.usage) {
    const u = result.usage;
    const cost =
      (u.inputTokens * 1.0) / 1_000_000 +
      (u.cacheCreationTokens * 1.25) / 1_000_000 +
      (u.cacheReadTokens * 0.1) / 1_000_000 +
      (u.outputTokens * 5.0) / 1_000_000;
    totalCost += cost;
    console.log(`  💰 ${u.inputTokens} in + ${u.outputTokens} out (cache: ${u.cacheReadTokens || u.cacheCreationTokens || 0})  →  $${cost.toFixed(6)}  ·  ${result.latencyMs}ms`);
  }
  console.log();
}

console.log("━".repeat(72));
console.log(`Total wall time: ${(totalMs / 1000).toFixed(1)}s  (parallel)`);
console.log(`Total cost:      $${totalCost.toFixed(6)}  for ${FIXTURES.length} parses`);
console.log(`Avg cost:        $${(totalCost / FIXTURES.length).toFixed(6)} per parse`);
console.log(`Accuracy:        ${passCount}/${FIXTURES.length}`);
console.log();
console.log(`📊 $5 budget @ avg cost → ${Math.floor(5 / (totalCost / FIXTURES.length))} parse (~${(5 / (totalCost / FIXTURES.length * 10) / 30).toFixed(1)} ay @ 10/gün)`);
