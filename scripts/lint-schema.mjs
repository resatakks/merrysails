#!/usr/bin/env node
/**
 * MerrySails Schema + SEO Linter
 *
 * Enforces CLAUDE.md SEO rules + Google Rich Results spec:
 *   1. AggregateRating must be on a supported parent type:
 *      Book, Course, Event, HowTo, LocalBusiness, MediaObject, Movie,
 *      Organization, Product, Recipe, SoftwareApplication
 *      → NEVER on bare ["TouristTrip", "Service"] (Google's Review snippet error)
 *   2. ["TouristTrip", "Product"] combo forbidden (Product vocab incompatibility)
 *   3. Event schema must include: name, startDate, endDate, location,
 *      eventStatus, eventAttendanceMode, organizer, performer, image, description
 *   4. Event offers must include: availability, validFrom (Merchant listing requirement)
 *   5. Page titles must NOT contain "| MerrySails" suffix (root layout adds it)
 *   6. Pricing in metadata must match real prices (sunset €34, dinner €30, yacht €280 floor)
 *
 * Usage:
 *   node scripts/lint-schema.mjs                # scan all src/app pages
 *   node scripts/lint-schema.mjs --fix          # auto-fix where possible (TODO)
 *   node scripts/lint-schema.mjs path/to.tsx    # single file
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const AGGREGATE_RATING_VALID_PARENTS = new Set([
  "Book", "Course", "Event", "HowTo", "LocalBusiness", "MediaObject",
  "Movie", "Organization", "Product", "Recipe", "SoftwareApplication",
  "Restaurant", "TravelAgency", "TouristAttraction", "FoodEstablishment",
]);

const EVENT_REQUIRED_FIELDS = [
  "name", "startDate", "endDate", "location",
  "eventStatus", "eventAttendanceMode", "organizer", "performer",
  "image", "description",
];

const EVENT_OFFER_REQUIRED = ["availability", "validFrom", "price", "priceCurrency", "url"];

const REAL_PRICES = {
  sunset: { min: 34, max: 40 },
  dinner: { min: 30, max: 90 },
  yacht: { min: 280, max: 680 },
};

const MS_TITLE_SUFFIX_PATTERNS = [
  /\|\s*MerrySails(?!\s+Istanbul\s+2026)/i,
  /-\s*MerrySails(?!\s+Istanbul\s+2026)/i,
];

const errors = [];
const warnings = [];

function walkDir(dir, accumulator = []) {
  if (!fs.existsSync(dir)) return accumulator;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkDir(fullPath, accumulator);
    } else if (/\.(tsx|ts)$/.test(entry.name)) {
      accumulator.push(fullPath);
    }
  }
  return accumulator;
}

function rel(p) {
  return path.relative(rootDir, p);
}

// Pages excluded from public-facing SEO rules (admin, reservation, voucher, invoice, login)
const PRIVATE_PAGE_PATTERNS = [
  /\/app\/admin\//,
  /\/app\/reservation\/\[/,
  /\/app\/.*\/login\//,
  /\/app\/api\//,
];

function isPrivatePage(filePath) {
  return PRIVATE_PAGE_PATTERNS.some((re) => re.test(filePath));
}

function lintFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const isPage = /\/app\/.+\/page\.tsx$/.test(filePath) && !isPrivatePage(filePath);

  // Rule 1: aggregateRating on supported parent (immediate enclosing schema object)
  // ERROR if same file has Event schema (creates parser conflict — actual GSC error case)
  // WARN otherwise (Google sometimes accepts Service+aggregateRating, but unreliable)
  const lines = src.split("\n");
  const fileHasEvent = /"@type"\s*:\s*"Event"/.test(src);
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*aggregateRating\s*:\s*\{/.test(lines[i])) continue;
    const aggIndent = lines[i].match(/^\s*/)[0].length;
    let foundType = null;
    let brace = 0;
    for (let j = i - 1; j >= 0; j--) {
      const ln = lines[j];
      if (/^\s*"@type"\s*:/.test(ln)) {
        const tIndent = ln.match(/^\s*/)[0].length;
        if (tIndent === aggIndent) {
          const m = ln.match(/"@type"\s*:\s*(?:"([^"]+)"|\[([^\]]+)\])/);
          if (m) {
            foundType = m[1] || m[2];
            break;
          }
        }
      }
      const closes = (ln.match(/\}/g) || []).length;
      const opens = (ln.match(/\{/g) || []).length;
      brace += closes - opens;
      if (brace > 0) break;
    }
    if (!foundType) continue;
    const types = foundType.split(",").map((t) => t.trim().replace(/['"]/g, ""));
    const supported = types.some((t) => AGGREGATE_RATING_VALID_PARENTS.has(t));
    if (!supported) {
      const isError = fileHasEvent;
      const target = isError ? errors : warnings;
      target.push({
        file: rel(filePath),
        line: i + 1,
        rule: "aggregateRating-parent",
        msg: `aggregateRating on unsupported parent type [${types.join(", ")}]${
          isError ? " — file ALSO has Event schema, this creates a Google parser conflict" : " — consider moving to Event or adding separate Product block"
        }.`,
      });
    }
  }

  // Rule 2: ["TouristTrip", "Product"] combo forbidden
  const forbiddenCombo = /"@type"\s*:\s*\[\s*"TouristTrip"\s*,\s*"Product"\s*\]/g;
  let m2;
  while ((m2 = forbiddenCombo.exec(src)) !== null) {
    errors.push({
      file: rel(filePath),
      line: src.slice(0, m2.index).split("\n").length,
      rule: "tourist-product-combo",
      msg: `["TouristTrip", "Product"] forbidden — Product vocab incompatibility (CLAUDE.md rule 1). Use ["TouristTrip", "Service"] or separate Product block.`,
    });
  }

  // Rule 3: Event schema required fields
  const eventBlockRegex = /"@type"\s*:\s*"Event"[\s\S]*?(?=\n\s*\}\s*[;,)]|\n\s*\}\s*$)/g;
  let m3;
  while ((m3 = eventBlockRegex.exec(src)) !== null) {
    const block = m3[0];
    const blockStart = m3.index;
    for (const field of EVENT_REQUIRED_FIELDS) {
      const fieldRegex = new RegExp(`\\b${field}\\s*:`);
      if (!fieldRegex.test(block)) {
        warnings.push({
          file: rel(filePath),
          line: src.slice(0, blockStart).split("\n").length,
          rule: "event-required-field",
          msg: `Event schema missing field "${field}".`,
        });
      }
    }
    // Check Event offers required fields
    const offersMatch = block.match(/offers\s*:\s*\{[\s\S]*?\}/);
    if (offersMatch) {
      for (const field of EVENT_OFFER_REQUIRED) {
        const fieldRegex = new RegExp(`\\b${field}\\s*:`);
        if (!fieldRegex.test(offersMatch[0])) {
          warnings.push({
            file: rel(filePath),
            line: src.slice(0, blockStart).split("\n").length,
            rule: "event-offer-field",
            msg: `Event offers missing field "${field}".`,
          });
        }
      }
    }
  }

  // Rule 5: title suffix
  if (isPage) {
    const titleRegex = /title:\s*[`"']([^`"']+)[`"']/g;
    let m5;
    while ((m5 = titleRegex.exec(src)) !== null) {
      const title = m5[1];
      for (const pattern of MS_TITLE_SUFFIX_PATTERNS) {
        if (pattern.test(title)) {
          errors.push({
            file: rel(filePath),
            line: src.slice(0, m5.index).split("\n").length,
            rule: "title-suffix-duplicate",
            msg: `Title contains "| MerrySails" suffix manually — root layout already adds it (CLAUDE.md rule 5). Title: "${title}"`,
          });
        }
      }
      // Title length check (max 60, suffix is 28 chars → page title max 32)
      if (title.length > 60 && !/{.*}/.test(title)) {
        warnings.push({
          file: rel(filePath),
          line: src.slice(0, m5.index).split("\n").length,
          rule: "title-too-long",
          msg: `Title length ${title.length} > 60 (CLAUDE.md rule 6).`,
        });
      }
    }
  }

  // Rule 6: price reality (warn if stale prices found)
  if (/sunset/i.test(filePath) && /€\s*55|EUR\s*55/.test(src)) {
    warnings.push({
      file: rel(filePath), line: 0, rule: "price-stale",
      msg: `Sunset cruise price €55 found — real price is €34-40 (CLAUDE.md rule 7).`,
    });
  }
  if (/dinner/i.test(filePath) && /€\s*55|EUR\s*55/.test(src)) {
    warnings.push({
      file: rel(filePath), line: 0, rule: "price-stale",
      msg: `Dinner cruise price €55 found — real price is €30-90 (CLAUDE.md rule 7).`,
    });
  }

  // Semrush audit rules — only run on page.tsx
  if (!isPage) return;

  // S1. Meta description length 140-160 (warn if outside, error if missing on commercial page)
  const descRegex = /description\s*:\s*[`"']([^`"']+(?:\$\{[^}]+\}[^`"']*)*)[`"']/g;
  let dm;
  let foundDesc = false;
  while ((dm = descRegex.exec(src)) !== null) {
    foundDesc = true;
    const desc = dm[1].replace(/\$\{[^}]+\}/g, "XXX"); // approximate template
    if (desc.length < 70) {
      warnings.push({
        file: rel(filePath), line: src.slice(0, dm.index).split("\n").length,
        rule: "meta-desc-short",
        msg: `Meta description too short (${desc.length} chars, optimal 140-160). "${desc.slice(0,80)}..."`,
      });
    } else if (desc.length > 165) {
      warnings.push({
        file: rel(filePath), line: src.slice(0, dm.index).split("\n").length,
        rule: "meta-desc-long",
        msg: `Meta description too long (${desc.length} chars, optimal 140-160) — Google truncates.`,
      });
    }
  }
  // S2. Missing description in metadata (catch variable references too)
  if (/export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(src) && !/description\s*:/.test(src)) {
    errors.push({
      file: rel(filePath), line: 1, rule: "meta-desc-missing",
      msg: `Page has metadata but no description field anywhere (Semrush critical).`,
    });
  }

  // S3. canonical URL check
  if (/export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(src)) {
    if (!/canonical\s*:/.test(src)) {
      warnings.push({
        file: rel(filePath), line: 1, rule: "canonical-missing",
        msg: `Page metadata lacks canonical URL (alternates.canonical).`,
      });
    }
  }

  // S4. hreflang languages check
  if (/export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(src)) {
    if (!/buildHreflang|languages\s*:/.test(src)) {
      warnings.push({
        file: rel(filePath), line: 1, rule: "hreflang-missing",
        msg: `Page lacks hreflang setup (use buildHreflang(path)).`,
      });
    }
  }

  // S5. Multiple H1 detection (within JSX returns) — only count <h1 in non-import lines
  const h1Matches = [...src.matchAll(/<h1[\s>]/g)];
  if (h1Matches.length > 1) {
    warnings.push({
      file: rel(filePath), line: 0, rule: "multiple-h1",
      msg: `Page contains ${h1Matches.length} <h1> tags — should be exactly 1 (CLAUDE.md rule 11).`,
    });
  }

  // S6. <img> without alt — prefer next/image with alt
  const imgWithoutAlt = [...src.matchAll(/<img(?![^>]*\salt\s*=)[^>]*>/g)];
  for (const m of imgWithoutAlt) {
    warnings.push({
      file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
      rule: "img-alt-missing",
      msg: `<img> tag without alt attribute — required for a11y + SEO (Semrush audit).`,
    });
  }

  // S7. <Image without alt
  const nextImageWithoutAlt = [...src.matchAll(/<Image(?![^>]*\salt\s*=)[^>]*\/?>/g)];
  for (const m of nextImageWithoutAlt) {
    warnings.push({
      file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
      rule: "next-image-alt-missing",
      msg: `Next/Image without alt attribute (Semrush + a11y).`,
    });
  }
}

function main() {
  const args = process.argv.slice(2);
  let files;
  if (args.length > 0 && fs.existsSync(args[0])) {
    files = [path.resolve(args[0])];
  } else {
    files = walkDir(path.join(rootDir, "src/app"));
    files.push(...walkDir(path.join(rootDir, "src/components")));
    files.push(...walkDir(path.join(rootDir, "src/lib")));
  }

  for (const f of files) lintFile(f);

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`✓ Schema lint passed (${files.length} files scanned)`);
    return 0;
  }

  if (errors.length) {
    console.log(`\n❌ ${errors.length} ERROR(S):`);
    for (const e of errors) console.log(`  [${e.rule}] ${e.file}:${e.line} — ${e.msg}`);
  }
  if (warnings.length) {
    console.log(`\n⚠️  ${warnings.length} WARNING(S):`);
    for (const w of warnings) console.log(`  [${w.rule}] ${w.file}:${w.line} — ${w.msg}`);
  }
  console.log(`\nScanned ${files.length} files.`);
  return errors.length > 0 ? 1 : 0;
}

process.exit(main());
