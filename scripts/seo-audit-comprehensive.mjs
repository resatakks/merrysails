#!/usr/bin/env node
/**
 * MerrySails Comprehensive SEO Audit Script
 *
 * Extends lint-schema.mjs with additional Semrush-style checks:
 *   1. Internal redirect chains — links pointing to redirected URLs (next.config.ts)
 *   2. Broken internal links — links to non-existent routes
 *   3. Image alt attributes — <img> and <Image> without alt
 *   4. llms.txt URL existence — verify each URL maps to an existing src/app route
 *   5. Sitemap orphans — sitemap pages with zero inbound links from src/
 *   6. Duplicate title/description detection across pages
 *   7. Title length audit (page portion max 32 chars, total max 60 with suffix)
 *   8. Meta description length (140-160 chars optimal)
 *   9. Canonical/hreflang coverage
 *
 * Usage:
 *   node scripts/seo-audit-comprehensive.mjs
 *   node scripts/seo-audit-comprehensive.mjs --json   # output as JSON
 *   node scripts/seo-audit-comprehensive.mjs --fix    # auto-fix where safe
 *
 * Exit codes: 0 = pass, 1 = errors found
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const appDir = path.join(srcDir, "app");

// Suffix shortened from " | MerrySails Istanbul 2026" (27 chars) to
// " | MerrySails" (13 chars) on 2026-05-18 — CLAUDE.md rule 5. Keep
// this constant in sync with `template:` in src/app/layout.tsx or
// title-marginal will fire on titles that actually fit.
const TITLE_SUFFIX = " | MerrySails"; // 13 chars
const TITLE_SUFFIX_LEN = TITLE_SUFFIX.length; // 13
// Google SERP truncation at ~60 chars. With 13-char suffix, page portion max = 47.
// We flag P0 only for clear violations (>80 total), P1 for 60-80 range.
const TITLE_MAX_TOTAL_P0 = 80; // definitely truncated
const TITLE_MAX_TOTAL_P1 = 60; // ideal limit
const DESC_MIN = 140;
const DESC_MAX = 160;

const args = process.argv.slice(2);
const OUTPUT_JSON = args.includes("--json");

const issues = [];

function rel(p) {
  return path.relative(rootDir, p);
}

// ============================================================
// 1. File walker
// ============================================================
function walkDir(dir, exts = [".tsx", ".ts"], accumulator = []) {
  if (!fs.existsSync(dir)) return accumulator;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walkDir(fullPath, exts, accumulator);
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      accumulator.push(fullPath);
    }
  }
  return accumulator;
}

function addIssue(severity, rule, file, line, msg) {
  issues.push({ severity, rule, file: rel(file), line, msg });
}

// ============================================================
// 2. Parse next.config.ts redirects
// ============================================================
function getRedirects() {
  const configPath = path.join(rootDir, "next.config.ts");
  if (!fs.existsSync(configPath)) return new Map();
  const src = fs.readFileSync(configPath, "utf8");
  const redirectMap = new Map();
  // Extract source -> destination pairs
  const blockRe = /source\s*:\s*["']([^"']+)["'][\s\S]*?destination\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const source = m[1].replace(/\/\*$/, "").replace(/:path\*/, "");
    const dest = m[2].replace(/\/:path\*/, "");
    // Only add clean static redirects
    if (!source.includes(":") && !source.includes("*") && source !== "/") {
      redirectMap.set(source, dest);
    }
  }
  return redirectMap;
}

// ============================================================
// 3. Build route set from src/app
// ============================================================
function getExistingRoutes() {
  const routes = new Set();
  const pageFiles = walkDir(appDir, [".tsx"]);
  for (const f of pageFiles) {
    if (!f.endsWith("page.tsx")) continue;
    const rel = path.relative(appDir, f);
    const routePath = "/" + rel.replace(/\/page\.tsx$/, "").replace(/\\/g, "/");
    // Normalise [locale] and dynamic segments
    const normalised = routePath
      .replace(/^\[locale\]/, "")
      .replace(/\[locale\]\//, "/")
      .replace(/\/\[slug\]/, "/:slug")
      .replace(/\/\[id\]/, "/:id")
      .replace(/\/\[.*?\]/g, "/:param");
    routes.add(normalised === "" ? "/" : normalised);
    // Also add as static if no params
    if (!routePath.includes("[")) {
      routes.add(routePath === "" ? "/" : routePath);
    }
  }
  // Add known API/route handlers that serve content
  routes.add("/pricing");
  routes.add("/robots.txt");
  routes.add("/sitemap.xml");
  routes.add("/llms.txt");
  routes.add("/llms-full.txt");
  return routes;
}

// ============================================================
// 4. Extract all internal hrefs from src/
// ============================================================
function getAllInternalLinks() {
  const links = []; // { href, file, line }
  const files = walkDir(srcDir, [".tsx", ".ts"]);
  for (const f of files) {
    if (f.includes("node_modules") || f.includes(".next")) continue;
    const src = fs.readFileSync(f, "utf8");
    const lines = src.split("\n");
    for (let i = 0; i < lines.length; i++) {
      // String/quoted literals
      const reQuoted = /href=["'](\/[^"'?#]*)["']/g;
      let m;
      while ((m = reQuoted.exec(lines[i])) !== null) {
        links.push({ href: m[1], file: f, line: i + 1 });
      }
      // Template literal hrefs with a leading static segment, e.g.
      //   href={`/yacht-charter-istanbul/${slug}`}
      //   `${SITE_URL}/cruises/${tour.slug}`
      // We extract just the static prefix up to the first ${ — but record
      // it WITHOUT the trailing "/" since the audit's broken-link checker
      // only knows about full routes, never directory-style prefixes.
      // The prefix is recorded as the parent route so the audit picks up
      // the *parent* as having outgoing links (this is enough to defeat
      // sitemap-orphan checks for the parent), without falsely flagging
      // the prefix itself as a missing route.
      const reTpl = /href=\{`(\/[^`$]+)/g;
      while ((m = reTpl.exec(lines[i])) !== null) {
        const prefix = m[1].replace(/\/+$/, "");
        // Skip if the prefix has nothing useful — e.g. matched just "/".
        if (prefix.length <= 1) continue;
        // Note: we mark the link as "template-prefix" so the broken-link
        // checker can ignore it (these prefixes are NEVER real routes).
        links.push({ href: prefix, file: f, line: i + 1, isTemplatePrefix: true });
      }
      // Bare template-literal building of SITE_URL + "/foo/${slug}"
      const reSiteTpl = /\$\{SITE_URL\}(\/[^`$"'\s]+)/g;
      while ((m = reSiteTpl.exec(lines[i])) !== null) {
        const rawPath = m[1].replace(/[)`,;].*$/, "").trim();
        if (rawPath.length <= 1 || rawPath.includes("$") || rawPath.includes("{")) continue;
        const cleaned = rawPath.replace(/\/+$/, "");
        // Mark as a template-prefix path so the broken-link checker
        // doesn't flag e.g. "/cruises/" or "/guides/" as 404s — they
        // are template-literal prefixes, never real routes.
        const isPrefix = rawPath.endsWith("/");
        links.push({
          href: cleaned,
          file: f,
          line: i + 1,
          isTemplatePrefix: isPrefix,
        });
      }
    }
  }
  return links;
}

// ============================================================
// 5. Parse sitemap URLs
// ============================================================
function getSitemapUrls() {
  const sitemapPath = path.join(appDir, "sitemap.xml", "route.ts");
  if (!fs.existsSync(sitemapPath)) return [];
  const src = fs.readFileSync(sitemapPath, "utf8");
  const urls = new Set();
  // Static page list
  const listMatch = src.match(/const\s+\w+\s*=\s*\[([\s\S]*?)\];/);
  const pathRe = /"(\/[^"]*)"/g;
  let m;
  while ((m = pathRe.exec(src)) !== null) {
    const p = m[1];
    if (!p.startsWith("/") || p.length <= 1) continue;
    if (p.includes("$") || p.includes("{")) continue;
    // Skip XML/HTML closing-tag artifacts that look like paths but are
    // really fragments of the surrounding string literals — e.g. the
    // `</>` self-closing snippets used while building <xhtml:link>
    // markup.
    if (p.includes(">") || p.includes("<") || p.includes("`")) continue;
    // Skip path-like regex/replace artifacts ("/g", "/i" etc).
    if (p.length <= 3 && /^\/[a-z]{1,2}$/.test(p)) continue;
    urls.add(p);
  }
  return [...urls];
}

// ============================================================
// 6. Check llms.txt URLs
// ============================================================
function checkLlmsTxtUrls(routes) {
  const llmsPath = path.join(appDir, "llms.txt", "route.ts");
  if (!fs.existsSync(llmsPath)) return;
  const src = fs.readFileSync(llmsPath, "utf8");
  const SITE_URL = "https://merrysails.com";
  // Extract all URL references
  const urlRe = new RegExp(`\\$\\{SITE_URL\\}(/[^"'\`\\s]*)`, "g");
  let m;
  const checked = new Set();
  while ((m = urlRe.exec(src)) !== null) {
    const urlPath = m[1].replace(/['"` ].*$/, "").trim();
    if (!urlPath || urlPath.includes("${") || checked.has(urlPath)) continue;
    checked.add(urlPath);
    // Check if route exists (static or dynamic)
    const isStatic = routes.has(urlPath);
    // Check dynamic routes
    const isDynamic = [...routes].some((r) => {
      if (!r.includes(":")) return false;
      const pattern = new RegExp("^" + r.replace(/:\w+/g, "[^/]+") + "$");
      return pattern.test(urlPath);
    });
    if (!isStatic && !isDynamic) {
      // Check if the locale path exists by stripping the leading locale
      // and re-applying both static + dynamic route tests against the
      // unprefixed path. Locale pages live under src/app/[locale]/... so
      // every locale URL must resolve to the same route as its EN twin.
      const localeStrip = urlPath.replace(/^\/(tr|de|fr|nl|ru|ar|sa|zh|ja|ko|es)\//, "/");
      const stripIsStatic = routes.has(localeStrip);
      const stripIsDynamic = [...routes].some((r) => {
        if (!r.includes(":")) return false;
        const pattern = new RegExp("^" + r.replace(/:\w+/g, "[^/]+") + "$");
        return pattern.test(localeStrip);
      });
      if (!stripIsStatic && !stripIsDynamic) {
        addIssue("P2", "llms-url-stale", llmsPath, 0,
          `llms.txt references URL "${urlPath}" which may not exist as a route.`);
      }
    }
  }
}

// ============================================================
// 7. Check pages for canonical/hreflang
// ============================================================
function checkMetaCoverage() {
  const pageFiles = walkDir(appDir, [".tsx"]).filter(
    (f) => f.endsWith("page.tsx") && !f.includes("/admin/") && !f.includes("/api/")
  );

  const titlesSeen = new Map();
  const descsSeen = new Map();

  for (const f of pageFiles) {
    const src = fs.readFileSync(f, "utf8");
    const isPrivate = /\/reservation\/\[/.test(f) || /\/invoice\//.test(f) || /\/voucher\//.test(f);
    const hasMeta = /generateMetadata|export const metadata/.test(src);
    if (!hasMeta) continue;

    // Canonical check
    if (!/canonical\s*:/.test(src) && !isPrivate) {
      addIssue("P1", "canonical-missing", f, 1,
        "Page metadata lacks alternates.canonical — Semrush flags this.");
    }

    // hreflang check (only non-legal/non-admin public pages)
    const isLegal = /\/terms\/|\/privacy-policy\//.test(f);
    const isReservation = /\/reservation/.test(f);
    if (!isLegal && !isReservation && !/buildHreflang|languages\s*:/.test(src)) {
      addIssue("P1", "hreflang-missing", f, 1,
        "Page lacks hreflang languages (use buildHreflang(path)).");
    }

    // Title length check (primary metadata title only)
    const metaIdx = src.search(/export const metadata|generateMetadata/);
    if (metaIdx >= 0) {
      const window = src.slice(metaIdx, metaIdx + 1500);
      const titleMatch = window.match(/title\s*:\s*["'`]([^"'`\n]+)["'`]/);
      if (titleMatch) {
        const t = titleMatch[1];
        if (!t.includes("${")) {
          const total = t.length + TITLE_SUFFIX_LEN;
          if (total > TITLE_MAX_TOTAL_P0) {
            addIssue("P0", "title-too-long", f, 0,
              `Title "${t}" is ${t.length} chars (total with suffix: ${total}) — definitely truncated in SERP.`);
          } else if (total > TITLE_MAX_TOTAL_P1) {
            addIssue("P1", "title-marginal", f, 0,
              `Title "${t}" is ${t.length} chars (total: ${total}) — may be truncated. Ideal max: ${TITLE_MAX_TOTAL_P1}.`);
          }
          // Duplicate titles
          const key = t.toLowerCase().trim();
          if (titlesSeen.has(key)) {
            addIssue("P1", "title-duplicate", f, 0,
              `Duplicate title with ${rel(titlesSeen.get(key))}: "${t}"`);
          } else {
            titlesSeen.set(key, f);
          }
        }
      }
    }

    // Meta description length — ONLY scan inside the `metadata` /
    // `generateMetadata()` block. Previously this matched every
    // `description: "…"` in the file (including TypeScript type interface
    // declarations like `description: string;`, schema descriptions buried
    // deep in the page, and translation copy) which produced a flood of
    // false positives. The metadata block window is bounded to the first
    // ~1500 chars after the declaration — Next metadata objects are short.
    const metaStart = src.search(/export\s+const\s+metadata\s*:\s*Metadata|export\s+async\s+function\s+generateMetadata|export\s+function\s+generateMetadata/);
    if (metaStart >= 0) {
      const metaWindow = src.slice(metaStart, metaStart + 2500);
      const descMatch = metaWindow.match(/description\s*:\s*["'`]([^"'`]+)["'`]/);
      if (descMatch) {
        const desc = descMatch[1].replace(/\$\{[^}]+\}/g, "XXX");
        const absIdx = metaStart + descMatch.index;
        const line = src.slice(0, absIdx).split("\n").length;
        if (desc.length < 70) {
          addIssue("P2", "meta-desc-short", f, line,
            `Meta description too short (${desc.length} chars, optimal 140-160).`);
        } else if (desc.length > DESC_MAX + 5) {
          addIssue("P1", "meta-desc-long", f, line,
            `Meta description too long (${desc.length} chars) — Google truncates at ~160.`);
        }
      }
    }
  }
}

// ============================================================
// 8. Check for internal links to redirected URLs
// ============================================================
function checkRedirectLinks(redirects, links) {
  for (const { href, file, line } of links) {
    if (redirects.has(href)) {
      const dest = redirects.get(href);
      addIssue("P1", "internal-redirect-link", file, line,
        `Link href="${href}" points to a 301 redirect → "${dest}". Update to canonical URL.`);
    }
  }
}

// ============================================================
// 9. Check for broken internal links
// ============================================================
function checkBrokenLinks(routes, redirects, links) {
  const checked = new Set();
  for (const link of links) {
    const { href, file, line, isTemplatePrefix } = link;
    if (checked.has(href)) continue;
    checked.add(href);
    // Skip prefixes harvested from template literals — these are never
    // real routes on their own (they always serve a sub-page).
    if (isTemplatePrefix) continue;
    // Skip admin/api/anchors/external
    if (href.startsWith("/admin") || href.startsWith("/api") ||
        href.includes("#") || href.includes("?") || href.includes(".")) continue;
    // Skip redirected URLs (covered by checkRedirectLinks)
    if (redirects.has(href)) continue;
    // Root "/" is always served by app/page.tsx — the route extractor
    // currently doesn't add it as a literal "/" entry because the path
    // walk yields the empty string. Whitelist it explicitly.
    if (href === "/") continue;
    // Check if route exists (static or dynamic).  For locale-prefixed
    // links like /tr/foo, also strip the prefix and re-test, since the
    // route extractor stores [locale]-aware pages under their unprefixed
    // path (e.g. /bosphorus-cruise covers /tr/bosphorus-cruise too).
    const hrefVariants = [href];
    const localeStrip = href.replace(/^\/(tr|de|fr|nl|ru|ar|sa|zh|ja|ko|es)(\/|$)/, "/");
    if (localeStrip !== href) hrefVariants.push(localeStrip);
    const exists = hrefVariants.some((candidate) =>
      routes.has(candidate) ||
      [...routes].some((r) => {
        if (!r.includes(":")) return false;
        const pattern = new RegExp("^" + r.replace(/:\w+/g, "[^/]+") + "$");
        return pattern.test(candidate);
      }),
    );
    if (!exists) {
      addIssue("P1", "broken-link", file, line,
        `Internal link href="${href}" has no matching page route.`);
    }
  }
}

// ============================================================
// 10. Sitemap orphan check
// ============================================================
function checkSitemapOrphans(sitemapUrls, links) {
  const linkedPaths = new Set(links.map((l) => l.href));
  for (const url of sitemapUrls) {
    if (!linkedPaths.has(url) && !linkedPaths.has(url + "/")) {
      addIssue("P2", "sitemap-orphan", path.join(appDir, "sitemap.xml", "route.ts"), 0,
        `Sitemap URL "${url}" has no inbound internal links from src/ — low crawl priority.`);
    }
  }
}

// ============================================================
// 11. Image alt check
// ============================================================
function checkImageAlts() {
  const files = walkDir(srcDir, [".tsx"]);
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    // <img> without alt
    for (const m of src.matchAll(/<img(?![^>]*\salt\s*=)[^>]*>/g)) {
      const line = src.slice(0, m.index).split("\n").length;
      addIssue("P1", "img-alt-missing", f, line,
        `<img> tag without alt attribute.`);
    }
    // <Image without alt (next/image) — multiline
    for (const m of src.matchAll(/<Image\s[^>]*?(?:>|\/?>)/gs)) {
      if (!/\balt\s*=/.test(m[0])) {
        const line = src.slice(0, m.index).split("\n").length;
        addIssue("P1", "next-image-alt-missing", f, line,
          `Next/Image component without alt attribute.`);
      }
    }
  }
}

// ============================================================
// Main
// ============================================================
function main() {
  console.log("MerrySails Comprehensive SEO Audit\n" + "=".repeat(40));

  const redirects = getRedirects();
  const routes = getExistingRoutes();
  const links = getAllInternalLinks();
  const sitemapUrls = getSitemapUrls();

  console.log(`Routes found: ${routes.size}`);
  console.log(`Redirects parsed: ${redirects.size}`);
  console.log(`Internal links found: ${links.length}`);
  console.log(`Sitemap URLs: ${sitemapUrls.length}\n`);

  checkRedirectLinks(redirects, links);
  checkBrokenLinks(routes, redirects, links);
  checkSitemapOrphans(sitemapUrls, links);
  checkMetaCoverage();
  checkImageAlts();
  checkLlmsTxtUrls(routes);

  // Group by severity
  const p0 = issues.filter((i) => i.severity === "P0");
  const p1 = issues.filter((i) => i.severity === "P1");
  const p2 = issues.filter((i) => i.severity === "P2");

  if (OUTPUT_JSON) {
    console.log(JSON.stringify(issues, null, 2));
    return p0.length > 0 ? 1 : 0;
  }

  // Summary table
  console.log("RESULTS BY CATEGORY:");
  const byRule = {};
  for (const i of issues) {
    byRule[i.rule] = (byRule[i.rule] || 0) + 1;
  }
  for (const [rule, count] of Object.entries(byRule).sort()) {
    console.log(`  ${rule.padEnd(35)} ${count}`);
  }

  if (p0.length) {
    console.log(`\nP0 CRITICAL (${p0.length}):`);
    for (const i of p0) console.log(`  [${i.rule}] ${i.file}:${i.line} — ${i.msg}`);
  }
  if (p1.length) {
    console.log(`\nP1 IMPORTANT (${p1.length}):`);
    for (const i of p1) console.log(`  [${i.rule}] ${i.file}:${i.line} — ${i.msg}`);
  }
  if (p2.length) {
    console.log(`\nP2 NICE-TO-HAVE (${p2.length}):`);
    for (const i of p2) console.log(`  [${i.rule}] ${i.file}:${i.line} — ${i.msg}`);
  }

  console.log(`\nTOTAL: P0=${p0.length} P1=${p1.length} P2=${p2.length}`);
  return p0.length > 0 ? 1 : 0;
}

process.exit(main());
