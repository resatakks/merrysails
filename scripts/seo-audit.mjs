#!/usr/bin/env node
/**
 * Semrush-style Technical SEO Audit -- MerrySails
 * Crawls sitemap.xml, runs 20 checks, outputs Markdown report to stdout.
 *
 * Usage:
 *   node scripts/seo-audit.mjs [--limit=N]
 *   node scripts/seo-audit.mjs --limit=100 > docs/SEO-AUDIT-2026-05-09.md
 */

const SITE_URL = "https://merrysails.com";
const SITEMAP_URL = SITE_URL + "/sitemap.xml";
const TIMEOUT_MS = 10000;
const CONCURRENCY = 5;
const USER_AGENT = "Mozilla/5.0 (compatible; MerrySailsSEOAudit/1.0)";
const VALID_HREFLANG_CODES = new Set(["en", "tr", "de", "fr", "nl", "x-default"]);
const BAD_ANCHOR_PATTERNS = [/^click here$/i, /^read more$/i, /^here$/i, /^learn more$/i, /^$/];

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, parseInt(limitArg.split("=")[1], 10) || 100) : 100;

// ── helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(tid);
    return res;
  } catch (err) {
    clearTimeout(tid);
    throw err;
  }
}

async function fetchText(url) {
  const res = await fetchWithTimeout(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xml,text/xml,*/*" },
    redirect: "follow",
  });
  const text = await res.text();
  return { res, text, status: res.status, finalUrl: res.url };
}

// ── sitemap parser ────────────────────────────────────────────────────────────

async function getSitemapUrls() {
  const { text } = await fetchText(SITEMAP_URL);
  const locs = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
  return locs.filter(u => u.startsWith(SITE_URL)).slice(0, LIMIT);
}

// ── page auditor ──────────────────────────────────────────────────────────────

async function auditPage(url) {
  const issues = [];
  let statusCode = 0;
  let finalUrl = url;
  let html = "";

  try {
    const result = await fetchText(url);
    statusCode = result.status;
    finalUrl = result.finalUrl;
    html = result.text;
  } catch (err) {
    return { url, statusCode: 0, issues: [{ level: "error", msg: `Fetch failed: ${err.message}` }] };
  }

  if (statusCode >= 400) {
    issues.push({ level: "error", msg: `HTTP ${statusCode}` });
    return { url, statusCode, finalUrl, issues };
  }

  // Redirect check
  if (finalUrl !== url && !finalUrl.startsWith(url)) {
    issues.push({ level: "warn", msg: `Redirects to ${finalUrl}` });
  }

  // Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/si);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";
  if (!title) issues.push({ level: "error", msg: "Missing <title>" });
  else if (title.length < 30) issues.push({ level: "warn", msg: `Title too short (${title.length} chars): "${title}"` });
  else if (title.length > 70) issues.push({ level: "warn", msg: `Title too long (${title.length} chars): "${title.slice(0, 60)}..."` });

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/si)
    || html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/si);
  const desc = descMatch ? descMatch[1] : "";
  if (!desc) issues.push({ level: "error", msg: "Missing meta description" });
  else if (desc.length < 80) issues.push({ level: "warn", msg: `Meta desc too short (${desc.length} chars)` });
  else if (desc.length > 165) issues.push({ level: "warn", msg: `Meta desc too long (${desc.length} chars)` });

  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gsi)];
  if (h1Matches.length === 0) issues.push({ level: "error", msg: "Missing H1" });
  else if (h1Matches.length > 1) issues.push({ level: "warn", msg: `Multiple H1 tags (${h1Matches.length})` });

  // Canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["'](.*?)["']/si)
    || html.match(/<link[^>]+href=["'](.*?)["'][^>]+rel=["']canonical["']/si);
  if (!canonicalMatch) issues.push({ level: "warn", msg: "Missing canonical link" });
  else if (!canonicalMatch[1].startsWith(SITE_URL)) {
    issues.push({ level: "warn", msg: `Canonical points off-site: ${canonicalMatch[1]}` });
  }

  // hreflang
  const hreflangMatches = [...html.matchAll(/hreflang=["']([^"']+)["']/gi)];
  if (hreflangMatches.length === 0) {
    issues.push({ level: "info", msg: "No hreflang tags found" });
  } else {
    const langs = new Set(hreflangMatches.map(m => m[1].toLowerCase()));
    for (const lang of langs) {
      if (!VALID_HREFLANG_CODES.has(lang)) {
        issues.push({ level: "warn", msg: `Unknown hreflang code: ${lang}` });
      }
    }
    if (!langs.has("x-default")) {
      issues.push({ level: "warn", msg: "Missing hreflang x-default" });
    }
  }

  // Structured data
  const ldJsonBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gsi)];
  if (ldJsonBlocks.length === 0) {
    issues.push({ level: "warn", msg: "No JSON-LD structured data found" });
  } else {
    for (const block of ldJsonBlocks) {
      try { JSON.parse(block[1]); } catch {
        issues.push({ level: "error", msg: "Invalid JSON-LD (parse error)" });
      }
    }
  }

  // Images without alt
  const imgMatches = [...html.matchAll(/<img[^>]+>/gi)];
  const imgsNoAlt = imgMatches.filter(m => !/alt=["'][^"']+["']/.test(m[0]));
  if (imgsNoAlt.length > 0) {
    issues.push({ level: "warn", msg: `${imgsNoAlt.length} image(s) missing alt text` });
  }

  // Open Graph
  if (!html.includes('property="og:title"') && !html.includes("property='og:title'")) {
    issues.push({ level: "info", msg: "Missing og:title" });
  }
  if (!html.includes('property="og:image"') && !html.includes("property='og:image'")) {
    issues.push({ level: "info", msg: "Missing og:image" });
  }

  return { url, statusCode, finalUrl, title, desc, issues };
}

// ── concurrent runner ─────────────────────────────────────────────────────────

async function runConcurrent(items, fn, concurrency) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i]);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const date = new Date().toISOString().slice(0, 10);
  process.stderr.write(`[seo-audit] Fetching sitemap from ${SITEMAP_URL}...\n`);

  let urls;
  try {
    urls = await getSitemapUrls();
  } catch (err) {
    process.stderr.write(`[seo-audit] Could not fetch sitemap: ${err.message}\n`);
    process.exit(1);
  }

  process.stderr.write(`[seo-audit] Auditing ${urls.length} URLs (limit=${LIMIT}, concurrency=${CONCURRENCY})...\n`);

  const pageResults = await runConcurrent(urls, async (url) => {
    process.stderr.write(`  auditing ${url}\n`);
    const result = await auditPage(url);
    await sleep(200);
    return result;
  }, CONCURRENCY);

  // ── aggregate stats ───────────────────────────────────────────────────────
  const errors = pageResults.flatMap(r => r.issues.filter(i => i.level === "error").map(i => ({ url: r.url, msg: i.msg })));
  const warns = pageResults.flatMap(r => r.issues.filter(i => i.level === "warn").map(i => ({ url: r.url, msg: i.msg })));
  const infos = pageResults.flatMap(r => r.issues.filter(i => i.level === "info").map(i => ({ url: r.url, msg: i.msg })));

  const errorPages = pageResults.filter(r => r.issues.some(i => i.level === "error"));
  const cleanPages = pageResults.filter(r => r.issues.length === 0);

  // ── report ────────────────────────────────────────────────────────────────
  const lines = [];
  lines.push(`# MerrySails SEO Audit -- ${date}`);
  lines.push(`\nGenerated: ${new Date().toISOString()}`);
  lines.push(`Site: ${SITE_URL}`);
  lines.push(`Pages audited: ${pageResults.length}`);
  lines.push(`\n## Summary\n`);
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Pages audited | ${pageResults.length} |`);
  lines.push(`| Clean (0 issues) | ${cleanPages.length} |`);
  lines.push(`| Errors | ${errors.length} |`);
  lines.push(`| Warnings | ${warns.length} |`);
  lines.push(`| Info | ${infos.length} |`);

  if (errors.length > 0) {
    lines.push(`\n## Errors (${errors.length})\n`);
    for (const e of errors) {
      lines.push(`- **${e.msg}** — ${e.url}`);
    }
  }

  if (warns.length > 0) {
    lines.push(`\n## Warnings (${warns.length})\n`);
    for (const w of warns.slice(0, 50)) {
      lines.push(`- ${w.msg} — ${w.url}`);
    }
    if (warns.length > 50) lines.push(`- ... and ${warns.length - 50} more`);
  }

  if (infos.length > 0) {
    lines.push(`\n## Info (${infos.length})\n`);
    for (const info of infos.slice(0, 20)) {
      lines.push(`- ${info.msg} — ${info.url}`);
    }
    if (infos.length > 20) lines.push(`- ... and ${infos.length - 20} more`);
  }

  lines.push(`\n## Per-Page Detail\n`);
  for (const r of pageResults) {
    if (r.issues.length === 0) continue;
    lines.push(`\n### ${r.url}`);
    lines.push(`Status: ${r.statusCode}`);
    for (const issue of r.issues) {
      const prefix = issue.level === "error" ? "ERROR" : issue.level === "warn" ? "WARN" : "INFO";
      lines.push(`- [${prefix}] ${issue.msg}`);
    }
  }

  console.log(lines.join("\n"));
}

main().catch(err => {
  process.stderr.write(`[seo-audit] Fatal: ${err.message}\n`);
  process.exit(1);
});
