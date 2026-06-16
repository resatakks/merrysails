#!/usr/bin/env node
/**
 * Bing NOARCHIVE Lint — Copilot grounding eligibility guard
 *
 * Why: Bing Feb 27 2026 verbatim — *"Pages with NOARCHIVE in meta robots
 * are excluded from Bing's cache, and therefore cannot be used by Copilot
 * for grounding."* — i.e. `noarchive | nocache | nosnippet` on a commercial
 * page makes that page invisible to Bing Copilot answers.
 *
 * What it checks (commercial routes only — allowlist excludes admin/api/checkout):
 *   1. <meta name="robots" content="...noarchive..."> in any page.tsx/layout.tsx
 *   2. <meta name="bingbot" content="...noarchive..."> same
 *   3. `metadata.robots` Next.js Metadata API objects containing `noArchive: true`
 *      or string with `noarchive`/`nocache`/`nosnippet`
 *   4. `X-Robots-Tag` headers in next.config.ts / middleware.ts with same
 *
 * Usage:
 *   node scripts/bing-noarchive-lint.mjs          # scan src/app + middleware + next.config
 *   node scripts/bing-noarchive-lint.mjs --fix    # not implemented; manual review
 *
 * Exit code: 0 if clean, 1 if any commercial route flagged.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const BAD_DIRECTIVES = /\b(noarchive|nocache|nosnippet)\b/i;

// Routes that SHOULD be noindex/noarchive — exempt from the check
const ALLOWLIST_PATTERNS = [
  /\/admin(\/|$)/,
  /\/api(\/|$)/,
  /\/reservation(\/|$)/,
  /\/checkout(\/|$)/,
  /\/account(\/|$)/,
  /\/login(\/|$)/,
  /\/logout(\/|$)/,
  /\/dashboard(\/|$)/,
  /\/preview(\/|$)/,
];

function isAllowlisted(relPath) {
  return ALLOWLIST_PATTERNS.some((re) => re.test(relPath));
}

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;
      walk(full, results);
    } else if (
      e.name === "page.tsx" ||
      e.name === "page.ts" ||
      e.name === "layout.tsx" ||
      e.name === "layout.ts" ||
      e.name === "middleware.ts" ||
      e.name === "next.config.ts" ||
      e.name === "next.config.js" ||
      e.name === "next.config.mjs"
    ) {
      results.push(full);
    }
  }
  return results;
}

function checkFile(filePath) {
  const rel = path.relative(rootDir, filePath);
  if (isAllowlisted(rel)) return null;

  const src = fs.readFileSync(filePath, "utf8");

  // 1. Direct <meta name="robots|bingbot" content="...noarchive..."> in JSX
  const metaTagRe = /<meta\s+name=["'](?:robots|bingbot|googlebot)["'][^>]*content=["']([^"']*)["']/gi;
  let m;
  while ((m = metaTagRe.exec(src)) !== null) {
    if (BAD_DIRECTIVES.test(m[1])) {
      return { file: rel, kind: "meta-tag", value: m[1] };
    }
  }

  // 2. Next.js metadata.robots object literal: noArchive: true | nocache: true | nosnippet: true
  if (/\b(noArchive|noCache|noSnippet)\s*:\s*true\b/.test(src)) {
    const match = src.match(/\b(noArchive|noCache|noSnippet)\s*:\s*true\b/);
    return { file: rel, kind: "metadata-object", value: match[0] };
  }

  // 3. Next.js metadata.robots string with bad directive
  const robotsStringRe = /robots\s*:\s*["']([^"']*)["']/g;
  while ((m = robotsStringRe.exec(src)) !== null) {
    if (BAD_DIRECTIVES.test(m[1])) {
      return { file: rel, kind: "metadata-string", value: m[1] };
    }
  }

  // 4. X-Robots-Tag header in next.config / middleware
  const xRobotsRe = /["']X-Robots-Tag["'][^}]*value\s*:\s*["']([^"']*)["']/gi;
  while ((m = xRobotsRe.exec(src)) !== null) {
    if (BAD_DIRECTIVES.test(m[1])) {
      return { file: rel, kind: "x-robots-header", value: m[1] };
    }
  }

  return null;
}

function main() {
  const srcAppDir = path.join(rootDir, "src", "app");
  const middlewarePath = path.join(rootDir, "middleware.ts");
  const middlewareSrcPath = path.join(rootDir, "src", "middleware.ts");
  const nextConfigPaths = [
    path.join(rootDir, "next.config.ts"),
    path.join(rootDir, "next.config.js"),
    path.join(rootDir, "next.config.mjs"),
  ];

  const targets = [
    ...walk(srcAppDir),
    ...[middlewarePath, middlewareSrcPath, ...nextConfigPaths].filter((p) =>
      fs.existsSync(p)
    ),
  ];

  const issues = [];
  for (const t of targets) {
    const issue = checkFile(t);
    if (issue) issues.push(issue);
  }

  console.log(`\n[bing-noarchive-lint] Scanned ${targets.length} file(s).\n`);

  if (issues.length === 0) {
    console.log("OK — no NOARCHIVE / NOCACHE / NOSNIPPET found on commercial routes.");
    console.log("All pages eligible for Bing Copilot grounding.\n");
    process.exit(0);
  }

  console.error(`FAIL — ${issues.length} NOARCHIVE issue(s) on commercial route(s):\n`);
  for (const i of issues) {
    console.error(`  [${i.kind}] ${i.file}`);
    console.error(`    => ${i.value}`);
  }
  console.error(
    "\nBing Feb 27 2026: NOARCHIVE prevents Copilot grounding. Remove or move route to an allowlisted path."
  );
  console.error("Allowlist: /admin, /api, /reservation, /checkout, /account, /login, /dashboard, /preview\n");
  process.exit(1);
}

main();
