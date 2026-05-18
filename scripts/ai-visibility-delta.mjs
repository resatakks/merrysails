#!/usr/bin/env node
/**
 * Delta AI visibility scan — only NEW prompts in TR/DE/other markets per brand.
 * Same machinery as ai-visibility-scan.mjs, but prompts defined inline.
 * Writes results to data/multi-brand-monitoring/ai-visibility-delta-latest.md
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const REPORT_PATH = path.join(ROOT, "data/multi-brand-monitoring/ai-visibility-delta-latest.md");

const key = process.env.OPENROUTER_API_KEY;
if (!key) { console.error("OPENROUTER_API_KEY missing"); process.exit(1); }

const MODELS_TIER_A = [
  { id: "openai/gpt-4o-mini", cost_in: 0.00015, cost_out: 0.00060, web: false },
  { id: "anthropic/claude-haiku-4.5", cost_in: 0.00100, cost_out: 0.00500, web: false },
  { id: "perplexity/sonar", cost_in: 0.00100, cost_out: 0.00100, web: true, search: 0.005 },
];
const MODELS_TIER_B = MODELS_TIER_A.slice(0, 2); // gpt + claude only

const BRANDS = [
  {
    id: "merrysails", brand: "merrysails", aliases: ["merry sails"], tier: "A", vertical: "cruise",
    deltaPrompts: [
      { lang: "tr", text: "en iyi boğaz turu istanbul hangi firma" },
      { lang: "tr", text: "akşam yemekli boğaz turu fiyat tavsiye" },
      { lang: "tr", text: "istanbul yat kiralama lüks tursab" },
      { lang: "tr", text: "özel boğaz turu tekne kiralama istanbul" },
    ],
  },
  {
    id: "goldensunsettour", brand: "goldensunsettour", aliases: ["golden sunset tour"], tier: "A", vertical: "cruise",
    deltaPrompts: [
      { lang: "tr", text: "ucuz boğaz turu istanbul rezervasyon" },
      { lang: "tr", text: "yat turu istanbul fiyat karşılaştırma" },
      { lang: "tr", text: "sunset boğaz turu istanbul önerileri" },
      { lang: "tr", text: "dinner cruise istanbul yorumlar firmalar" },
    ],
  },
  {
    id: "kingsworldtransfer", brand: "kingsworldtransfer", aliases: ["kings world transfer"], tier: "A", vertical: "transfer",
    deltaPrompts: [
      { lang: "de", text: "antalya flughafen transfer empfehlung mercedes vito" },
      { lang: "de", text: "istanbul flughafen transfer gurbetci tursab" },
      { lang: "de", text: "dalaman flughafen transfer fethiye mercedes" },
      { lang: "de", text: "günstig privater transfer antalya türkei" },
    ],
  },
  {
    id: "merryturizm", brand: "merryturizm", aliases: ["merry turizm"], tier: "A", vertical: "transfer",
    deltaPrompts: [
      { lang: "de", text: "istanbul flughafen transfer gurbetci empfehlung" },
      { lang: "de", text: "antalya privater transfer empfehlung tursab" },
      { lang: "de", text: "bodrum flughafen transfer mercedes" },
      { lang: "de", text: "türkei privater fahrer airport transfer" },
    ],
  },
  {
    id: "pinogareroofrestaurant", brand: "pinogare", aliases: ["pinogare rooftop", "pino gare"], tier: "A", vertical: "restaurant",
    deltaPrompts: [
      { lang: "tr", text: "sirkeci rooftop restaurant tavsiye boğaz manzaralı" },
      { lang: "tr", text: "sultanahmet rooftop restoran 2026 öneri" },
      { lang: "tr", text: "eminönü manzaralı restoran akşam yemeği" },
      { lang: "tr", text: "boğaz manzaralı romantik restoran istanbul tarihi yarımada" },
    ],
  },
  {
    id: "rentacarsaw", brand: "rentacarsaw", aliases: ["rent a car saw"], tier: "A", vertical: "car-rental",
    deltaPrompts: [
      { lang: "de", text: "türkei mietwagen vergleich günstig" },
      { lang: "de", text: "mietwagen istanbul empfehlung gurbetci ohne kaution" },
      { lang: "tr", text: "istanbul araç kiralama gurbetçi tavsiye almanca" },
      { lang: "tr", text: "türk pasaport araç kiralama istanbul karşılaştırma" },
    ],
  },
  {
    id: "sawrentacar", brand: "sawrentacar", aliases: ["saw rent a car"], tier: "B", vertical: "car-rental",
    deltaPrompts: [
      { lang: "tr", text: "saw rent a car istanbul yorumlar" },
      { lang: "tr", text: "sabiha gökçen araç kiralama tavsiye firma" },
    ],
  },
  {
    id: "ersintattoo", brand: "ersintattoo", aliases: ["ersin tattoo", "ersin dövme"], tier: "B", vertical: "tattoo",
    deltaPrompts: [
      { lang: "tr", text: "en iyi dövmeci bakırköy 2026 tavsiye" },
      { lang: "tr", text: "bakırköy kalıcı dövme stüdyosu fine line minimal" },
    ],
  },
  {
    id: "acilkaseniz", brand: "acilkaseniz", aliases: ["acılı kaşe", "acıl kase"], tier: "B", vertical: "food",
    deltaPrompts: [
      { lang: "tr", text: "bahçeşehir kaşe yaptırma aynı gün acil" },
      { lang: "tr", text: "avcılar kaşe sipariş hızlı bahçeşehir" },
    ],
  },
];

async function ask(model, prompt) {
  const start = Date.now();
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "HTTP-Referer": "https://merrysails.com", "X-Title": "Delta Scan" },
      body: JSON.stringify({ model: model.id, messages: [{ role: "user", content: prompt }], max_tokens: 800 }),
    });
    const data = await res.json();
    if (!res.ok) return { model: model.id, error: data.error?.message ?? `HTTP ${res.status}`, ms: Date.now() - start };
    return { model: model.id, text: data.choices?.[0]?.message?.content ?? "", usage: data.usage ?? {}, ms: Date.now() - start };
  } catch (e) { return { model: model.id, error: String(e), ms: Date.now() - start }; }
}

const URL_RE = /https?:\/\/[^\s\]\)\(>"']+/g;
function extractUrls(t) { return Array.from(new Set([...(t??"").matchAll(URL_RE)].map(m => m[0].replace(/[.,;:]+$/, "")))); }
function domainOf(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return null; } }

function mentioned(text, brand, aliases) {
  if (!text) return { hit: false, rank: null };
  const lower = text.toLowerCase();
  const needles = [brand.toLowerCase(), ...aliases.map(a => a.toLowerCase())];
  let idx = -1, needle = null;
  for (const n of needles) {
    const i = lower.indexOf(n);
    if (i >= 0 && (idx < 0 || i < idx)) { idx = i; needle = n; }
  }
  if (idx < 0) return { hit: false, rank: null };
  const numbered = [...text.matchAll(/^\s*(\d+)[\.\)]\s+\*?\*?([^*\n:]{3,80})/gm)];
  for (const m of numbered) if (m[2].toLowerCase().includes(needle)) return { hit: true, rank: parseInt(m[1], 10) };
  return { hit: true, rank: null };
}

const reports = [];
let totalCost = 0, totalQ = 0;

for (const b of BRANDS) {
  const models = b.tier === "A" ? MODELS_TIER_A : MODELS_TIER_B;
  console.log(`\n━━━ ${b.brand} (${b.tier}) ━━━`);
  const br = { brand: b.brand, vertical: b.vertical, perPrompt: [], hits: 0, total: 0, citedDomains: {}, cost: 0 };

  for (const dp of b.deltaPrompts) {
    console.log(`  ❓ [${dp.lang}] "${dp.text}"`);
    const results = await Promise.all(models.map(m => ask(m, dp.text)));
    const pr = { prompt: dp.text, lang: dp.lang, results: [] };
    for (let i = 0; i < results.length; i++) {
      const r = results[i], m = models[i];
      if (r.error) { console.log(`    ❌ ${r.model}: ${r.error}`); pr.results.push({ model: r.model, error: r.error }); continue; }
      const inK = (r.usage.prompt_tokens ?? 0) / 1000, outK = (r.usage.completion_tokens ?? 0) / 1000;
      let cost = inK * m.cost_in + outK * m.cost_out;
      if (m.web) cost += m.search ?? 0;
      totalCost += cost; totalQ++; br.cost += cost; br.total++;
      const men = mentioned(r.text, b.brand, b.aliases);
      const urls = extractUrls(r.text), doms = urls.map(domainOf).filter(Boolean);
      for (const d of doms) {
        if (d.includes(b.brand.toLowerCase())) continue;
        br.citedDomains[d] = (br.citedDomains[d] ?? 0) + 1;
      }
      if (men.hit) br.hits++;
      const status = men.hit ? `✅${men.rank ? `#${men.rank}` : ""}` : "❌";
      console.log(`    ${m.id.padEnd(34)} ${status}  $${cost.toFixed(4)}`);
      pr.results.push({ model: r.model, hit: men.hit, rank: men.rank, urls });
    }
    br.perPrompt.push(pr);
  }
  br.pct = ((br.hits / Math.max(1, br.total)) * 100).toFixed(1);
  console.log(`  📊 ${br.hits}/${br.total} = ${br.pct}%   $${br.cost.toFixed(4)}`);
  reports.push(br);
}

const allDom = {};
for (const r of reports) for (const [d, c] of Object.entries(r.citedDomains)) allDom[d] = (allDom[d] ?? 0) + c;
const topDom = Object.entries(allDom).sort((a, b) => b[1] - a[1]).slice(0, 25);

console.log(`\n══════ DELTA SUMMARY ══════`);
console.log(`Queries: ${totalQ}  Cost: ~$${totalCost.toFixed(4)}`);
console.log(`Brand visibility (TR/DE-language prompts):`);
for (const r of [...reports].sort((a, b) => parseFloat(b.pct) - parseFloat(a.pct))) {
  console.log(`  ${r.brand.padEnd(25)} ${r.pct.padStart(5)}% (${r.hits}/${r.total})`);
}
console.log(`\nTop cited domains in delta (TR/DE markets):`);
for (const [d, c] of topDom.slice(0, 15)) console.log(`  ${c.toString().padStart(3)}×  ${d}`);

// Markdown
const lines = [
  `# AI Visibility Delta Scan — ${new Date().toISOString().split("T")[0]}`,
  ``,
  `**Focus**: TR + DE language prompts (markets not covered in initial EN scan).`,
  `**Queries**: ${totalQ}   **Cost**: ~$${totalCost.toFixed(4)}`,
  ``,
  `## Visibility scoreboard (locale-specific)`,
  ``,
  `| Brand | Vertical | Locale focus | Visibility | Hits | Cost |`,
  `|---|---|---|---:|---|---:|`,
];
for (const r of [...reports].sort((a, b) => parseFloat(b.pct) - parseFloat(a.pct))) {
  const langs = [...new Set(BRANDS.find(b => b.brand === r.brand).deltaPrompts.map(p => p.lang))].join("/");
  lines.push(`| ${r.brand} | ${r.vertical} | ${langs.toUpperCase()} | ${r.pct}% | ${r.hits}/${r.total} | $${r.cost.toFixed(4)} |`);
}
lines.push(``, `## Top cited domains (delta only)`, ``, `| Domain | Mentions |`, `|---|---:|`);
for (const [d, c] of topDom.slice(0, 20)) lines.push(`| ${d} | ${c} |`);
lines.push(``, `## Per-brand breakdown`, ``);
for (const r of reports) {
  lines.push(`### ${r.brand}`, ``);
  for (const p of r.perPrompt) {
    lines.push(`**${p.lang.toUpperCase()}**: "${p.prompt}"`);
    const cells = p.results.map(x => x.error ? `❌ err` : x.hit ? `✅${x.rank ? `#${x.rank}` : ""}` : `❌`);
    lines.push(`- Results: ${cells.join(" | ")}`);
  }
  const top = Object.entries(r.citedDomains).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (top.length) lines.push(``, `Cited (this brand's prompts): ` + top.map(([d, c]) => `${c}× ${d}`).join(", "));
  lines.push(``);
}

await fs.writeFile(REPORT_PATH, lines.join("\n"));
console.log(`\n📝 Report: ${REPORT_PATH}`);
console.log(`💸 Total: ~$${totalCost.toFixed(4)}`);
