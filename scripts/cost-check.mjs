/**
 * Step-by-step cost verification — ONE parse, full breakdown, then stop.
 *
 *   node --env-file=.env.local scripts/cost-check.mjs       # Sam fixture
 *   node --env-file=.env.local scripts/cost-check.mjs "your text"
 */
import { parseExternalMessage } from "../src/lib/external-parser/parse";

const SAM_FIXTURE = `[12.06.2026 19:56:45] Reşat: 29.06.26

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
[12.06.2026 23:42:42] Emir Plakay: 21 kişi olacaklar`;

const message = process.argv.slice(2).join(" ").trim() || SAM_FIXTURE;

console.log(`\n🔬 Tek çağrı maliyet ölçümü\n`);
console.log(`Mesaj uzunluğu: ${message.length} karakter (~${Math.ceil(message.length / 4)} tahmini token)\n`);

const result = await parseExternalMessage(message, "merrysails");

if (!result.ok) {
  console.log(`❌ FAIL (${result.latencyMs}ms): ${result.error}\n`);
  process.exit(1);
}

const d = result.data;
console.log(`✅ Parse başarılı — ${result.latencyMs}ms`);
console.log();
console.log(`Sonuç özeti:`);
console.log(`  Intent:     ${d.intent}`);
console.log(`  Confidence: ${(d.confidence * 100).toFixed(0)}%`);
console.log(`  Customer:   ${d.customerName}`);
console.log(`  Date:       ${d.jobDate ?? "—"}${d.jobTime ? ` ${d.jobTime}` : ""}`);
console.log(`  Pickup:     ${d.pickupPoint ?? "—"}`);
console.log(`  Pax:        ${d.guests}`);
console.log(`  Amount:     ${d.amount} ${d.currency}`);
console.log(`  Inclusions: ${d.inclusions.length} adet`);

if (result.usage) {
  const u = result.usage;
  const PRICING = {
    "claude-3-5-haiku-20241022": { in: 0.8, out: 4.0 },
    "claude-3-haiku-20240307": { in: 0.25, out: 1.25 },
    "claude-haiku-4-5-20251001": { in: 1.0, out: 5.0 },
  };
  const model = process.env.ANTHROPIC_PARSER_MODEL || "claude-3-5-haiku-20241022";
  const p = PRICING[model] || PRICING["claude-3-5-haiku-20241022"];
  const inputCost = (u.inputTokens * p.in) / 1_000_000;
  const cacheWriteCost = (u.cacheCreationTokens * p.in * 1.25) / 1_000_000;
  const cacheReadCost = (u.cacheReadTokens * p.in * 0.1) / 1_000_000;
  const outputCost = (u.outputTokens * p.out) / 1_000_000;
  console.log(`Model: ${model}`);
  const total = inputCost + cacheWriteCost + cacheReadCost + outputCost;
  const cachedPortion = u.cacheReadTokens > 0 ? "♻️ CACHE HIT" : u.cacheCreationTokens > 0 ? "🆕 cache yazıldı" : "⚠️ cache yok";
  console.log();
  console.log(`💰 GERÇEK MALİYET (Anthropic raporladı): ${cachedPortion}`);
  console.log(`  Input (fresh):    ${u.inputTokens.toLocaleString()} token × $1/M = $${inputCost.toFixed(6)}`);
  if (u.cacheCreationTokens > 0)
    console.log(`  Cache yazma:      ${u.cacheCreationTokens.toLocaleString()} token × $1.25/M = $${cacheWriteCost.toFixed(6)}`);
  if (u.cacheReadTokens > 0)
    console.log(`  Cache okuma:      ${u.cacheReadTokens.toLocaleString()} token × $0.10/M = $${cacheReadCost.toFixed(6)}`);
  console.log(`  Output:           ${u.outputTokens.toLocaleString()} token × $5/M = $${outputCost.toFixed(6)}`);
  console.log(`  Toplam: $${total.toFixed(6)}`);
  console.log();
  console.log(`📊 Tahminler:`);
  console.log(`  $5 budget bu hızla ≈ ${Math.floor(5 / total).toLocaleString()} parse eder`);
  console.log(`  Günde 10 parse × 30 = $${(total * 300).toFixed(3)}/ay`);
  console.log(`  Günde 20 parse × 30 = $${(total * 600).toFixed(3)}/ay`);
  console.log(`  $5 budget @ 10/gün ≈ ${(5 / (total * 10)).toFixed(0)} gün (≈ ${(5 / (total * 10 * 30)).toFixed(1)} ay)`);
}
