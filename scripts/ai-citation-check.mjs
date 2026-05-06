#!/usr/bin/env node
/**
 * AI Citation Weekly Check (manual + scaffold)
 *
 * Tracks MerrySails mentions across:
 *   - Perplexity AI (manual: paste search URL list, log result)
 *   - ChatGPT (login required — manual via Brave + computer-use)
 *   - Claude.ai (manual)
 *   - Google AI Overview (organic SERP — manual or via SERPAPI)
 *
 * Usage:
 *   node scripts/ai-citation-check.mjs                # log latest results to data/ai-citation/
 *   node scripts/ai-citation-check.mjs --report       # generate trend report
 *
 * Manual workflow (until full automation):
 *   1. Open Brave/Chrome
 *   2. For each TEST_QUERIES, search on each PROVIDER
 *   3. Note: brand mention count, SERP position, citation context
 *   4. Append to data/ai-citation/YYYY-MM-DD.md
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "data/ai-citation");

const TEST_QUERIES = [
  // EN
  "best bosphorus sunset cruise istanbul",
  "best bosphorus dinner cruise istanbul",
  "best yacht charter istanbul",
  "bosphorus cruise istanbul price",
  "private bosphorus cruise istanbul",
  // TR
  "en iyi boğaz turu istanbul",
  "yemekli boğaz turu fiyat",
  "boğaz gün batımı turu",
  // DE
  "beste bosporus kreuzfahrt istanbul",
  "bosporus dinner kreuzfahrt",
];

const PROVIDERS = [
  { name: "Perplexity", url: "https://www.perplexity.ai/?q=" },
  { name: "ChatGPT", url: "https://chatgpt.com/?q=" },
  { name: "Claude", url: "https://claude.ai/new?q=" },
  { name: "Google_AI_Overview", url: "https://www.google.com/search?q=" },
  { name: "Bing_Copilot", url: "https://www.bing.com/search?q=" },
];

const TODAY = new Date().toISOString().slice(0, 10);

function ensureDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

function generateTemplate() {
  ensureDir();
  const file = path.join(OUT_DIR, `ai-citation-${TODAY}.md`);
  if (fs.existsSync(file)) {
    console.log(`Already exists: ${file}`);
    return;
  }
  const lines = [
    `# AI Citation Check — ${TODAY}`,
    ``,
    `## Method`,
    `For each query × provider, paste URL into Brave, screenshot result, note:`,
    `- **Mentioned**: yes/no/partial`,
    `- **Position**: top pick / cited / footnote / not mentioned`,
    `- **Citation context**: what was said about MerrySails`,
    ``,
    `## Results`,
    ``,
    `| Query | Provider | Mentioned | Position | URL Cited | Notes |`,
    `|---|---|:-:|---|---|---|`,
  ];
  for (const query of TEST_QUERIES) {
    for (const provider of PROVIDERS) {
      const queryUrl = `${provider.url}${encodeURIComponent(query)}`;
      lines.push(`| ${query} | [${provider.name}](${queryUrl}) | ❓ | - | - | - |`);
    }
  }
  lines.push(``);
  lines.push(`## Action items`);
  lines.push(``);
  lines.push(`Based on misses, identify:`);
  lines.push(`- Which queries should we be cited on?`);
  lines.push(`- What's the cited competitor doing differently? (TripAdvisor reviews, Reddit, schema)`);
  lines.push(`- Content gap to close`);

  fs.writeFileSync(file, lines.join("\n") + "\n");
  console.log(`Created template: ${file}`);
  console.log(`Open in editor and fill manually after Brave inspection.`);
}

function generateTrendReport() {
  ensureDir();
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.startsWith("ai-citation-") && f.endsWith(".md"));
  if (files.length === 0) {
    console.log("No citation logs found. Run without --report first.");
    return;
  }
  console.log(`Found ${files.length} log file(s):`);
  for (const f of files) console.log(`  - ${f}`);
  console.log(`\n(Trend report aggregation: implement after 4+ data points collected)`);
}

const args = process.argv.slice(2);
if (args.includes("--report")) {
  generateTrendReport();
} else {
  generateTemplate();
}
