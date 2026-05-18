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

  // Rule 3: Event schema required fields.
  // Extract the FULL Event object via brace-matching (regex lookahead breaks on the
  // first nested object close — e.g. an eventSchedule {} — and truncates the block
  // before location/organizer, causing false "missing field" reports).
  const eventTypeRegex = /"@type"\s*:\s*"Event"/g;
  let m3;
  while ((m3 = eventTypeRegex.exec(src)) !== null) {
    // Walk back to the object's opening brace, then forward counting braces.
    let openIdx = src.lastIndexOf("{", m3.index);
    if (openIdx === -1) continue;
    let depth = 0, closeIdx = -1;
    for (let i = openIdx; i < src.length; i++) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}") { depth--; if (depth === 0) { closeIdx = i; break; } }
    }
    const block = closeIdx === -1 ? src.slice(openIdx) : src.slice(openIdx, closeIdx + 1);
    const blockStart = openIdx;
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
    // Check Event offers required fields. Strip `${...}` template expressions first
    // so their `}` does not prematurely terminate the lazy offers-block capture.
    const blockNoTpl = block.replace(/\$\{[^}]*\}/g, "XXX");
    const offersMatch = blockNoTpl.match(/offers\s*:\s*\{[\s\S]*?\}/);
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

  // Rule 5: title suffix — match ONLY metadata-level `title:` (line-anchored, 2-4 space indent).
  // Excludes nested object titles (tourOptions[].title, faqs[].title @ 6+ spaces) AND
  // prefixed variants (metaTitle/subtitle/ctaTitle/priceTableTitle) since the leading
  // spaces in `^ {2,4}title:` cannot match a letter-prefixed key.
  if (isPage) {
    // Quote-matching capture (dm[1]=quote, dm[2]=content) so Turkish apostrophes
    // inside double-quoted titles ("€30'dan") do not truncate the capture.
    const titleRegex = /^ {2,4}title\s*:\s*(["'`])((?:[^\\]|\\.)*?)\1/gm;
    let m5;
    while ((m5 = titleRegex.exec(src)) !== null) {
      const title = m5[2];
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

  // S1. Meta description length 140-160 — match metadata-level `description:`
  // (line-anchored, 2-4 space indent). Excludes nested schema/MenuItem/service
  // descriptions (6+ spaces). Pages using a separate `metaDescription:` field for
  // the <meta> tag are checked via that exact field name instead.
  // The capture group matches the OPENING quote char and reads until the matching
  // close quote — so Turkish apostrophes inside double-quoted strings ("€200'den")
  // do not prematurely terminate the capture.
  const descField = /^ {2,4}metaDescription\s*:/m.test(src) ? "metaDescription" : "description";
  const descRegex = new RegExp(`^ {2,4}${descField}\\s*:\\s*(["'\`])((?:[^\\\\]|\\\\.)*?)\\1`, "gm");
  let dm;
  let foundDesc = false;
  while ((dm = descRegex.exec(src)) !== null) {
    // Skip link-card objects: a `{ href, title, description }` internal-link card
    // is not a page meta description. Take the text from the object's opening `{`
    // up to this match — if it contains an `href:` sibling, it is a link card.
    const objOpen = src.lastIndexOf("{", dm.index);
    const sameObjCtx = objOpen === -1 ? "" : src.slice(objOpen, dm.index);
    if (/\bhref\s*:/.test(sameObjCtx)) continue;
    foundDesc = true;
    const desc = dm[2].replace(/\$\{[^}]+\}/g, "XXX"); // dm[1]=quote char, dm[2]=content
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

  // Noindex pages (robots index:false) are excluded from canonical/hreflang checks —
  // Google never indexes them, so those signals are irrelevant.
  const isNoindex = /robots\s*:\s*\{[^}]*index\s*:\s*false/.test(src);

  // S3. canonical URL check — accepts ES6 shorthand `{ canonical }` (no colon).
  if (!isNoindex && /export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(src)) {
    if (!/canonical\s*[:,}]/.test(src)) {
      warnings.push({
        file: rel(filePath), line: 1, rule: "canonical-missing",
        msg: `Page metadata lacks canonical URL (alternates.canonical).`,
      });
    }
  }

  // S4. hreflang languages check.
  // Intentionally EN-only pages (legal docs, AI-knowledge endpoint, internal team
  // page) have no locale variants — hreflang would be meaningless. Exempt them.
  const HREFLANG_EXEMPT = [
    "/privacy-policy/", "/terms/", "/ai-knowledge/", "/about/team/",
  ];
  const isHreflangExempt = HREFLANG_EXEMPT.some((p) => filePath.includes(p));
  if (!isNoindex && !isHreflangExempt && /export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(src)) {
    if (!/buildHreflang|languages\s*:/.test(src)) {
      warnings.push({
        file: rel(filePath), line: 1, rule: "hreflang-missing",
        msg: `Page lacks hreflang setup (use buildHreflang(path)).`,
      });
    }
  }

  // S5. Multiple H1 detection (within JSX returns) — strip comments first to avoid false-positives
  const srcNoComments = src
    .replace(/\/\*[\s\S]*?\*\//g, "")  // /* ... */
    .replace(/\/\/[^\n]*/g, "")        // // ...
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ""); // JSX {/* ... */}
  const h1Matches = [...srcNoComments.matchAll(/<h1[\s>]/g)];
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

  // S8 [P0]: Nested Offer schema must have `price` field
  // Semrush 2026-05-17 audit: ~80 locale pages emit Offer without price → Google Merchant + Product snippet rejected.
  // Match Offer object literals (not arrays/spreads) and require price within.
  const offerBlocks = [...src.matchAll(/\{\s*[^{}]*?"@type"\s*:\s*"Offer"[^{}]*?\}/g)];
  for (const m of offerBlocks) {
    const block = m[0];
    if (!/\bprice\s*:/.test(block) && !/priceSpecification/.test(block)) {
      errors.push({
        file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
        rule: "offer-missing-price",
        msg: `Offer schema missing "price" field — Google rejects Merchant listing + Product snippet (RULES.md P0 rule 1).`,
      });
    }
    // Also catch price: "€30" or "€ 30" — currency must be in priceCurrency
    const priceMatch = block.match(/\bprice\s*:\s*["']([^"']+)["']/);
    if (priceMatch && /[€$£¥]/.test(priceMatch[1])) {
      errors.push({
        file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
        rule: "offer-price-currency-in-string",
        msg: `Offer price contains currency symbol "${priceMatch[1]}" — use numeric string + priceCurrency field.`,
      });
    }
  }

  // S9 [P0]: LocalBusiness/Restaurant/TouristInformationCenter must NOT have inLanguage
  // Google validator: "The property inLanguage is not recognized by Schema.org vocabulary"
  // Even though Schema.org allows it, Google's LocalBusiness parser rejects it.
  // The window stops at the object boundary (`\n};` — top-level schema const close)
  // so an inLanguage on a SEPARATE sibling schema (e.g. a Menu const below a
  // Restaurant const) is not mis-attributed to the LocalBusiness object.
  const lbWithInLang = /"@type"\s*:\s*(?:"(?:LocalBusiness|TravelAgency|Restaurant|FoodEstablishment|TouristInformationCenter|TouristAttraction|Hotel)"|\[[^\]]*?"(?:LocalBusiness|TravelAgency|Restaurant|FoodEstablishment|TouristInformationCenter)"[^\]]*?\])(?:(?!\n\};)[\s\S]){0,2000}?inLanguage\s*:/g;
  let lbMatch;
  while ((lbMatch = lbWithInLang.exec(src)) !== null) {
    errors.push({
      file: rel(filePath), line: src.slice(0, lbMatch.index).split("\n").length,
      rule: "localbusiness-inlanguage",
      msg: `LocalBusiness/Restaurant has inLanguage — Google validator rejects this property on LocalBusiness subclasses (RULES.md P0 rule 2).`,
    });
  }

  // S10 [P0]: LocalBusiness/TravelAgency/TouristInformationCenter must have inline address
  // (Schema.org allows @id reference but Google validator can't dereference)
  // Window stops at object boundary (`\n};`) so the block does not get truncated
  // before the `address:` field by an unrelated nested `}` (e.g. a PropertyValue).
  const lbBlocks = [...src.matchAll(/\{[^{}]*?"@type"\s*:\s*(?:"(?:LocalBusiness|TravelAgency|TouristInformationCenter|Restaurant|FoodEstablishment)"|\[[^\]]*?"(?:LocalBusiness|TravelAgency|TouristInformationCenter)"[^\]]*?\])(?:(?!\n\};)[\s\S]){0,4000}?\n\};/g)];
  for (const m of lbBlocks) {
    const block = m[0];
    // Check for inline PostalAddress (not just an @id reference)
    const hasInlineAddress = /address\s*:\s*\{[\s\S]*?"@type"\s*:\s*"PostalAddress"/.test(block);
    if (!hasInlineAddress) {
      errors.push({
        file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
        rule: "localbusiness-no-address",
        msg: `LocalBusiness/TravelAgency/TouristInformationCenter without inline PostalAddress — Google validator rejects (RULES.md P0 rule 3).`,
      });
    }
  }

  // S11 [P0]: Unsplash URLs with double ?w= param (Next/Image breaks these → 404)
  const doubleParamUnsplash = [...src.matchAll(/images\.unsplash\.com[^"'\s)]+\?w=\d+[^"'\s)]*[?&]w=\d+/g)];
  for (const m of doubleParamUnsplash) {
    errors.push({
      file: rel(filePath), line: src.slice(0, m.index).split("\n").length,
      rule: "unsplash-double-w-param",
      msg: `Unsplash URL has double ?w= param — Next/Image breaks these (RULES.md P0 rule 7). Use single base URL like "?w=1200&q=80".`,
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
