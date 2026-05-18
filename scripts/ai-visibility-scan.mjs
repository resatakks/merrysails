#!/usr/bin/env node
/**
 * Multi-brand AI visibility scan.
 * Reads brands+prompts from data/multi-brand-monitoring/brands.json
 * Hits 3 LLMs (gpt-4o-mini, claude-haiku-4.5, perplexity/sonar) per prompt
 * Extracts: brand mention, position in list, competitor names, citation URLs
 * Aggregates: per-brand visibility, competitor leaderboard, cited-domain leaderboard
 * Outputs: console summary + markdown report at data/multi-brand-monitoring/ai-visibility-latest.md
 *
 * Usage:
 *   node --env-file=.env.local scripts/ai-visibility-scan.mjs               # all brands
 *   node --env-file=.env.local scripts/ai-visibility-scan.mjs merrysails    # single brand
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data/multi-brand-monitoring/brands.json");
const REPORT_PATH = path.join(ROOT, "data/multi-brand-monitoring/ai-visibility-latest.md");

const key = process.env.OPENROUTER_API_KEY;
if (!key) {
  console.error("OPENROUTER_API_KEY missing in .env.local");
  process.exit(1);
}

const config = JSON.parse(await fs.readFile(CONFIG_PATH, "utf-8"));
const onlyBrand = process.argv[2];
const brands = onlyBrand
  ? config.brands.filter((b) => b.id === onlyBrand)
  : config.brands;

if (brands.length === 0) {
  console.error(`No brand matched id "${onlyBrand}"`);
  process.exit(1);
}

const MODELS = config.models;

async function ask(model, prompt) {
  const start = Date.now();
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://merrysails.com",
        "X-Title": "MerrySails AI Visibility Multi-Brand Scan",
      },
      body: JSON.stringify({
        model: model.id,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 900,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { model: model.id, error: data.error?.message ?? `HTTP ${res.status}`, ms: Date.now() - start };
    }
    return {
      model: model.id,
      text: data.choices?.[0]?.message?.content ?? "",
      usage: data.usage ?? {},
      ms: Date.now() - start,
    };
  } catch (e) {
    return { model: model.id, error: String(e), ms: Date.now() - start };
  }
}

// ─── Extraction helpers ─────────────────────────────────────────

const URL_RE = /https?:\/\/[^\s\]\)\(>"']+/g;
const BOLD_RE = /\*\*([^*\n]{2,80})\*\*/g;
const NUMBERED_RE = /^\s*(\d+)[\.\)]\s+\*?\*?([^*\n:]{3,80})/gm;

function extractUrls(text) {
  if (!text) return [];
  return Array.from(new Set([...text.matchAll(URL_RE)].map((m) => m[0].replace(/[.,;:]+$/, ""))));
}
function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
function extractBoldEntities(text) {
  if (!text) return [];
  return [...text.matchAll(BOLD_RE)].map((m) => m[1].trim());
}
function extractNumberedItems(text) {
  if (!text) return [];
  return [...text.matchAll(NUMBERED_RE)].map((m) => ({ rank: parseInt(m[1], 10), name: m[2].trim() }));
}

function brandMentioned(text, brand, aliases) {
  if (!text) return { mentioned: false, position: null, rank: null };
  const lower = text.toLowerCase();
  const needles = [brand.toLowerCase(), ...aliases.map((a) => a.toLowerCase())];
  let firstIdx = -1;
  let matchedNeedle = null;
  for (const n of needles) {
    const idx = lower.indexOf(n);
    if (idx >= 0 && (firstIdx < 0 || idx < firstIdx)) {
      firstIdx = idx;
      matchedNeedle = n;
    }
  }
  if (firstIdx < 0) return { mentioned: false, position: null, rank: null };
  // determine list rank if mention is inside a numbered list
  const numbered = extractNumberedItems(text);
  let rank = null;
  for (const item of numbered) {
    if (item.name.toLowerCase().includes(matchedNeedle)) {
      rank = item.rank;
      break;
    }
  }
  return { mentioned: true, position: firstIdx, rank };
}

function estimateCost(usage, model) {
  const inK = (usage.prompt_tokens ?? 0) / 1000;
  const outK = (usage.completion_tokens ?? 0) / 1000;
  let cost = inK * model.cost_per_1k_in + outK * model.cost_per_1k_out;
  if (model.web_search) cost += model.search_cost ?? 0;
  return cost;
}

// ─── Main loop ──────────────────────────────────────────────────

const reports = [];
let totalCost = 0;
let totalQueries = 0;

for (const b of brands) {
  console.log(`\n${"━".repeat(70)}\n🏷  ${b.brand} (${b.tier}) — ${b.vertical} — ${b.domain}\n`);
  const brandReport = {
    brand: b.brand,
    tier: b.tier,
    vertical: b.vertical,
    domain: b.domain,
    perPrompt: [],
    competitors: {}, // name → count
    citedDomains: {}, // domain → count
    visibilityScore: 0, // # mentions / # queries
    cost: 0,
  };

  for (const prompt of b.prompts) {
    console.log(`  ❓ "${prompt}"`);
    const results = await Promise.all(MODELS.map((m) => ask(m, prompt)));
    const promptReport = { prompt, results: [] };
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const m = MODELS[i];
      if (r.error) {
        console.log(`    ❌ ${r.model}: ${r.error}`);
        promptReport.results.push({ model: r.model, error: r.error });
        continue;
      }
      const cost = estimateCost(r.usage, m);
      totalCost += cost;
      totalQueries++;
      brandReport.cost += cost;
      const mention = brandMentioned(r.text, b.brand, b.aliases);
      const urls = extractUrls(r.text);
      const domains = urls.map(domainOf).filter(Boolean);
      const bolds = extractBoldEntities(r.text);
      const numbered = extractNumberedItems(r.text);

      // track domains cited (exclude own)
      for (const d of domains) {
        if (d.includes(b.domain.replace(/\.com.*/, ""))) continue;
        brandReport.citedDomains[d] = (brandReport.citedDomains[d] ?? 0) + 1;
      }
      // track competitor names from numbered/bold (exclude own)
      const candidates = [...numbered.map((x) => x.name), ...bolds]
        .map((s) => s.replace(/^https?:\/\//, "").trim())
        .filter((s) => s.length >= 3 && s.length <= 60)
        .filter((s) => !s.toLowerCase().includes(b.brand.toLowerCase()))
        .filter((s) => !b.aliases.some((a) => s.toLowerCase().includes(a.toLowerCase())));
      for (const name of candidates) {
        brandReport.competitors[name] = (brandReport.competitors[name] ?? 0) + 1;
      }

      const status = mention.mentioned
        ? `✅ MENTIONED${mention.rank ? ` (#${mention.rank})` : ""}`
        : "❌ absent";
      console.log(`    ${m.id.padEnd(34)} ${status}  cost ~$${cost.toFixed(4)}`);
      promptReport.results.push({
        model: r.model,
        mentioned: mention.mentioned,
        rank: mention.rank,
        urls,
        text: r.text,
        cost,
      });
      if (mention.mentioned) brandReport.visibilityScore++;
    }
    brandReport.perPrompt.push(promptReport);
  }

  const denominator = b.prompts.length * MODELS.length;
  brandReport.visibilityPct = ((brandReport.visibilityScore / denominator) * 100).toFixed(1);
  console.log(
    `  📊 Visibility: ${brandReport.visibilityScore}/${denominator} = ${brandReport.visibilityPct}%   spend ~$${brandReport.cost.toFixed(4)}`
  );
  reports.push(brandReport);
}

// ─── Aggregate cross-brand ──────────────────────────────────────

const globalCompetitors = {};
const globalDomains = {};
for (const r of reports) {
  for (const [name, c] of Object.entries(r.competitors)) {
    globalCompetitors[name] = (globalCompetitors[name] ?? 0) + c;
  }
  for (const [d, c] of Object.entries(r.citedDomains)) {
    globalDomains[d] = (globalDomains[d] ?? 0) + c;
  }
}

const topCompetitors = Object.entries(globalCompetitors)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);
const topDomains = Object.entries(globalDomains)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

console.log(`\n${"═".repeat(70)}\n📊 GLOBAL SUMMARY\n`);
console.log(`Queries: ${totalQueries}   Total cost: ~$${totalCost.toFixed(4)}`);
console.log(`\nBrands ranked by visibility %:`);
for (const r of [...reports].sort((a, b) => parseFloat(b.visibilityPct) - parseFloat(a.visibilityPct))) {
  console.log(`  ${r.brand.padEnd(25)} ${r.visibilityPct.padStart(5)}%  (${r.visibilityScore}/${r.perPrompt.length * MODELS.length})`);
}

console.log(`\nTop cited domains (across all brands):`);
for (const [d, c] of topDomains.slice(0, 15)) {
  console.log(`  ${c.toString().padStart(3)}×  ${d}`);
}

console.log(`\nTop competitor names mentioned (across all brands):`);
for (const [name, c] of topCompetitors.slice(0, 15)) {
  console.log(`  ${c.toString().padStart(3)}×  ${name}`);
}

// ─── Markdown report ────────────────────────────────────────────

const now = new Date();
const isoDate = now.toISOString().split("T")[0];
const lines = [];
lines.push(`# AI Visibility Scan — ${isoDate}`);
lines.push("");
lines.push(`**Scanned**: ${brands.length} brands, ${totalQueries} queries (~$${totalCost.toFixed(4)})`);
lines.push(`**Models**: ${MODELS.map((m) => m.id).join(", ")}`);
lines.push("");
lines.push(`## Brand visibility scoreboard`);
lines.push("");
lines.push(`| Brand | Tier | Vertical | Visibility | Queries | Cost |`);
lines.push(`|---|---|---|---:|---|---:|`);
for (const r of [...reports].sort((a, b) => parseFloat(b.visibilityPct) - parseFloat(a.visibilityPct))) {
  const denom = r.perPrompt.length * MODELS.length;
  lines.push(`| ${r.brand} | ${r.tier} | ${r.vertical} | ${r.visibilityPct}% | ${r.visibilityScore}/${denom} | $${r.cost.toFixed(4)} |`);
}
lines.push("");

lines.push(`## Top cited domains (15)`);
lines.push("");
lines.push(`| Domain | Mentions |`);
lines.push(`|---|---:|`);
for (const [d, c] of topDomains.slice(0, 15)) lines.push(`| ${d} | ${c} |`);
lines.push("");

lines.push(`## Top competitor brand names (15)`);
lines.push("");
lines.push(`| Name | Mentions |`);
lines.push(`|---|---:|`);
for (const [name, c] of topCompetitors.slice(0, 15)) lines.push(`| ${name} | ${c} |`);
lines.push("");

lines.push(`## Per-brand details`);
lines.push("");
for (const r of reports) {
  lines.push(`### ${r.brand} — ${r.visibilityPct}% (${r.visibilityScore}/${r.perPrompt.length * MODELS.length})`);
  lines.push("");
  lines.push(`Top cited domains for this brand:`);
  const top5 = Object.entries(r.citedDomains).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (top5.length === 0) lines.push("- (none)");
  for (const [d, c] of top5) lines.push(`- ${c}× ${d}`);
  lines.push("");
  lines.push(`Per-prompt status:`);
  lines.push("");
  lines.push(`| Prompt | gpt-4o-mini | claude-haiku-4.5 | perplexity/sonar |`);
  lines.push(`|---|---|---|---|`);
  for (const p of r.perPrompt) {
    const cells = MODELS.map((m) => {
      const hit = p.results.find((x) => x.model === m.id);
      if (!hit) return "—";
      if (hit.error) return `❌ ${hit.error.slice(0, 30)}`;
      return hit.mentioned ? `✅${hit.rank ? `#${hit.rank}` : ""}` : "❌";
    });
    lines.push(`| ${p.prompt} | ${cells.join(" | ")} |`);
  }
  lines.push("");
}

await fs.writeFile(REPORT_PATH, lines.join("\n"));
console.log(`\n📝 Report: ${REPORT_PATH}`);
console.log(`\n💸 Total cost this scan: ~$${totalCost.toFixed(4)}`);
