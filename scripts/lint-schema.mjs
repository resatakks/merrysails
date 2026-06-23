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

// Shared components that render the page <h1> in SSR. A public page that uses
// one of these is H1-covered even without an inline <h1>. Keep in sync with the
// home/blog/tour/yacht/cluster components (all verified to emit <h1>). This list
// is the safety net for the 2026-05-04 backlink finding: cruise/yacht detail
// pages had H1 rendered ONLY client-side, so Googlebot saw the link-target pages
// H1-less and the backlink anchor never bound to the keyword. The rule below
// (missing-h1) blocks any future regression that drops the SSR <h1> entirely.
const H1_BEARING_COMPONENTS = [
  "HeroSection",
  "BlogIndexClient",
  "TourDetailClient",
  "FleetDetailContent",
  "HotelClusterPage",
];

// Customer-facing Telegram allow-list. MerrySails contacts via WhatsApp ONLY,
// in every locale (CLAUDE.md "Contact channel — WhatsApp ONLY"). The Telegram
// bot + TelegramUser model are INTERNAL ops notifications, unrelated to customer
// contact. The internal-ops plumbing lives under src/lib/telegram/ and the
// server actions import it — those are allow-listed; a customer-facing t.me/
// link or a "use Telegram" CTA is a real regression and must fail the build.
const TELEGRAM_OPS_ALLOWED_RE = /\/src\/lib\/telegram\//;

// ─────────────────────────────────────────────────────────────────────────
// 2026-06-23 recurring-error-class guards (Screaming-Frog / Semrush parity).
// These four classes recurred across the portfolio and now fail the gate so
// we never need an external crawler to catch them again:
//   H1. INVALID hreflang language code — a hreflang attribute must be a valid
//       ISO-639 language (optionally language-REGION). Region-only codes like
//       "sa" (Saudi Arabia) are NOT languages → Google/Semrush "language
//       mismatch". The locale→hreflang map MUST translate sa→ar, zh→zh-Hans.
//   H2. hreflang TARGET that redirects — a slug listed in a hreflang /
//       localized-routes set whose EN canonical ALSO appears as a permanent
//       redirect source in next.config.ts. The EN member returns 3xx, so the
//       whole hreflang set is non-200 → ignored (anniversary/bachelor/… class).
//   H3. hreflang code vs html-lang consistency — a locale must emit exactly
//       ONE hreflang variant (no zh AND zh-hans for the same locale), and the
//       emitted code must agree with the locale's html lang.
//   H4. heuristic hardcoded-English-in-localized-component — a shared component
//       rendered on non-EN locale pages that bakes an English marketing string
//       (Best Seller / Most popular / Save €N / Continue booking) without going
//       through the i18n string table. Conservative + allowlisted.
// ─────────────────────────────────────────────────────────────────────────

// A valid hreflang code is "x-default", a 2-3 letter ISO-639 language,
// optionally followed by a script (Hans/Hant/Latn/Cyrl) and/or a 2-letter or
// 3-digit region. We additionally hard-reject a small set of codes that are
// region-ONLY (look like a language but are a country) — the recurring "sa"
// (Arabic content mislabelled with the Saudi country code) being the canonical
// case. "zh" alone is allowed by BCP-47 but we require the script-qualified
// "zh-Hans" for our Simplified content (H3 catches a bare/duplicate zh).
const BCP47_RE =
  /^(?:x-default|[a-z]{2,3}(?:-(?:Latn|Cyrl|Hans|Hant|Arab|Grek|Cyrl))?(?:-(?:[A-Z]{2}|\d{3}))?)$/;
// Codes that are NOT ISO-639 languages — region/country codes that have been
// mistakenly used as a hreflang language. Keyed by the bad code → correct lang.
const REGION_ONLY_HREFLANG = {
  sa: "ar", // Saudi Arabia (region) → Arabic
  ae: "ar",
  uk: "en", // United Kingdom region code; language is "en" (uk = Ukrainian is
            //   valid ISO-639, so we DON'T list uk as bad — keep it out)
};
delete REGION_ONLY_HREFLANG.uk; // "uk" IS Ukrainian (ISO-639) — never flag it.

// The locale segments used in URL paths (/sa/…, /zh/…) that MUST be mapped to a
// real language code before being emitted as a hreflang attribute. Mirrors the
// HREFLANG_CODE map that the canonical builder should own.
const LOCALE_TO_HREFLANG_REQUIRED = {
  sa: "ar",
  zh: "zh-Hans",
};

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
      // AggregateOffer uses lowPrice/highPrice instead of a single price. If the
      // offers block declares @type AggregateOffer and supplies lowPrice, the
      // `price` requirement is satisfied (Google Event spec accepts either form).
      const isAggregateOffer = /["']?@type["']?\s*:\s*["']AggregateOffer["']/.test(offersMatch[0]);
      const hasLowPrice = /\blowPrice\s*:/.test(offersMatch[0]);
      for (const field of EVENT_OFFER_REQUIRED) {
        if (field === "price" && isAggregateOffer && hasLowPrice) continue;
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
    const titleRegex = /^ {2,4}(?:metaTitle|title)\s*:\s*(["'`])((?:[^\\]|\\.)*?)\1/gm;
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
      // Title length: rendered = source + " | MerrySails" (13-char template
      // suffix). Source > 47 → rendered > 60 → Semrush "long title".
      if (title.length > 47 && !/{.*}/.test(title)) {
        warnings.push({
          file: rel(filePath),
          line: src.slice(0, m5.index).split("\n").length,
          rule: "title-too-long",
          msg: `Title source length ${title.length} > 47 → rendered ${title.length + 13} > 60 (RULES.md).`,
        });
      }
    }
  }

  // Rule 5b: data-file titles (blog posts, guides, tours, content) — these
  // become page <title> via [slug] generateMetadata + the root template, so
  // the same 47-char source budget applies. Match line-anchored title:/metaTitle:
  // at 2-6 space indent (post/guide/tour level); nested expertQuote.title is
  // mid-line and section objects use `heading:`, so neither is caught.
  // quick-answers.ts holds inline display headings used by the QuickAnswer
  // component (rendered as a <p> inside the page body, with intentional
  // "— MerrySails" suffix for visual branding). These are NOT page meta titles
  // and don't go through the root template — skip the 47-char budget for them.
  const isQuickAnswersFile = /\/src\/data\/quick-answers\.ts$/.test(filePath.replace(/\\/g, "/"));
  if (/\/src\/(data|content)\//.test(filePath.replace(/\\/g, "/")) && !isQuickAnswersFile) {
    const dataTitleRegex = /^ {2,6}(?:metaTitle|title)\s*:\s*(["'`])((?:[^\\]|\\.)*?)\1/gm;
    let dt;
    while ((dt = dataTitleRegex.exec(src)) !== null) {
      const title = dt[2];
      if (title.length > 47 && !/\$\{/.test(title)) {
        warnings.push({
          file: rel(filePath),
          line: src.slice(0, dt.index).split("\n").length,
          rule: "title-too-long",
          msg: `Data-file title source length ${title.length} > 47 → rendered ${title.length + 13} > 60 (RULES.md). "${title.slice(0, 50)}"`,
        });
      }
    }
  }

  // Rule 5c (2026-06-22 Semrush audit): "| MerrySails" baked into a `const title`
  // template-literal / string assignment, which is then handed to the metadata
  // `title:` field as a shorthand var. The root layout template "%s | MerrySails"
  // re-appends the suffix → "… | MerrySails | MerrySails" (28 localized cruise
  // detail pages were affected). Rule 5 only catches inline `title: "..."` keys,
  // so variable-built titles slipped past. ERROR — this is a live duplicate-title
  // regression that the build gate must block.
  if (isPage) {
    const titleVarRegex =
      /\b(?:const|let)\s+(?:title|pageTitle|metaTitle)\b[\s\S]{0,400}?[=?:]\s*(["'`])((?:[^\\]|\\.)*?)\1/g;
    let tv;
    while ((tv = titleVarRegex.exec(src)) !== null) {
      const literal = tv[2];
      // Only flag the actual suffix form (pipe/dash + MerrySails), not brand
      // mentions mid-string. Allow the canonical long suffix variant.
      if (/[|\-]\s*MerrySails(?!\s+Istanbul\s+2026)/i.test(literal)) {
        errors.push({
          file: rel(filePath),
          line: src.slice(0, tv.index).split("\n").length,
          rule: "title-var-suffix-duplicate",
          msg: `Title variable contains "| MerrySails" suffix — the root layout template re-appends it → "… | MerrySails | MerrySails". Drop the manual suffix or use { absolute } (CLAUDE.md rule 5). Fragment: "${literal.slice(0, 60)}"`,
        });
      }
    }
  }

  // Rule 5d (2026-06-22 Semrush audit): hreflang builders must only emit
  // alternates for locales that actually render a page, otherwise Google /
  // Semrush report "missing return links". ru + zh do NOT have live
  // /<locale>/cruises/<slug> or most locale variants, so any hreflang/alternate
  // builder that loops the FULL ACTIVE_LOCALES set (which now includes ru+zh)
  // is a return-link landmine. ERROR if a local hreflang builder iterates
  // ACTIVE_LOCALES and writes a `/${locale}/...` languages entry without
  // gating ru/zh. Canonical builder src/lib/hreflang.ts is exempt — it already
  // gates via RU_ENABLED_ROUTES / ZH_ENABLED_ROUTES.
  const isCanonicalHreflang = /\/src\/lib\/hreflang\.ts$/.test(filePath.replace(/\\/g, "/"));
  if (!isCanonicalHreflang) {
    // Find a `for (const X of ACTIVE_LOCALES) { … }` loop whose BODY assigns a
    // hreflang/languages map entry to a `/${X}/…` URL. (We scope to the loop
    // body so generateStaticParams loops that merely build a params array — not
    // a languages map — don't trip the rule.) If that loop body has no ru/zh
    // gate, it emits hreflang for ru+zh pages that don't exist → missing return
    // links. The canonical builder (src/lib/hreflang.ts) is exempt above.
    const loopRe =
      /for\s*\(\s*const\s+(\w+)\s+of\s+ACTIVE_LOCALES\s*\)\s*\{([\s\S]*?)\n\s{0,4}\}/g;
    let lr;
    while ((lr = loopRe.exec(src)) !== null) {
      const loopVar = lr[1];
      const body = lr[2];
      const assignsLangMap = new RegExp(
        `(?:languages|alternates|hreflang|langs)\\s*\\[[^\\]]*\\]\\s*=\\s*\`[^\`]*\\/\\$\\{${loopVar}\\}`,
      ).test(body);
      if (!assignsLangMap) continue;
      const hasRuZhGate =
        /RU_ENABLED|ZH_ENABLED|!==\s*["']ru["']|!==\s*["']zh["']|===\s*["']ru["']|===\s*["']zh["']|continue/.test(
          body,
        );
      if (!hasRuZhGate) {
        errors.push({
          file: rel(filePath),
          line: src.slice(0, lr.index).split("\n").length,
          rule: "hreflang-ungated-ru-zh",
          msg: `hreflang/alternates builder loops ACTIVE_LOCALES (now includes ru+zh) and emits "/\${${loopVar}}/…" without a ru/zh gate → "missing return links" for non-existent locale pages. Use a gated locale list (e.g. ["tr","de","fr","nl"]) or RU_ENABLED/ZH_ENABLED checks like src/lib/hreflang.ts.`,
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
    // Skip JSON-LD schema objects: a Dataset / Service / FAQPage description
    // is structured-data text, not a <meta> page description. Same-object marker
    // is the presence of `"@type":` or `"@context":` siblings before the description.
    if (/["']@(?:type|context)["']\s*:/.test(sameObjCtx)) continue;
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

  // S12 [P0 — 2026-06-05]: Hardcoded hreflang languages dict in /[locale]/ pages.
  // Semrush flagged broken hreflang on /ru/bosphorus-cruise because the dict
  // was literally written `{ "x-default": ..., en: ..., tr: ..., de: ..., fr: ..., nl: ... }`
  // (missing ru + zh). The single source of truth for which locales emit
  // hreflang is src/lib/hreflang.ts buildHreflang(). Any /[locale]/ page that
  // hand-rolls the dict will drift the moment we add a new locale.
  if (filePath.includes("/[locale]/")) {
    const hardcodedHreflang = /alternates\s*:\s*\{[^}]*?languages\s*:\s*\{[^}]*"x-default"/s.exec(src);
    if (hardcodedHreflang) {
      errors.push({
        file: rel(filePath),
        line: src.slice(0, hardcodedHreflang.index).split("\n").length,
        rule: "hardcoded-hreflang-dict",
        msg: `Hardcoded hreflang languages dict — drifts when locales are added. Use \`languages: buildHreflang("/your-path")\` from "@/lib/hreflang" instead (see RULES.md hreflang section, fix from Semrush 2026-06-05).`,
      });
    }
  }

  // S13 [P0 — 2026-06-05]: Multiple <h1> on the same page. CLAUDE.md rule 11:
  // every page must have exactly one <h1>. Conflict comes from a page that
  // adds its own <h1> while also rendering TourDetailClient (which has h1)
  // or another shared component that emits h1. Semrush 2026-06-05 flagged
  // 21 /cruises/[slug] pages and 8 /[locale]/{istanbul-dinner-cruise,cruises/sunset}
  // pages with duplicate h1.
  if (isPage) {
    // Strip /* … */ block comments AND {/* … */} JSX comments before counting
    // — comment text like "removed page-level <h1>" was being matched as a
    // real tag, producing phantom warnings even after the h1 was removed.
    const srcNoComments = src
      .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    const h1Matches = [...srcNoComments.matchAll(/<h1[\s>]/g)];
    if (h1Matches.length > 1) {
      warnings.push({
        file: rel(filePath),
        line: src.slice(0, h1Matches[0].index).split("\n").length,
        rule: "multiple-h1",
        msg: `Page emits ${h1Matches.length} <h1> tags. CLAUDE.md rule 11 requires exactly one. Check if a shared component (TourDetailClient, hero) already renders the h1.`,
      });
    }
    // Soft check: also flag if both a literal <h1> and a known shared component
    // that owns the h1 are present. EXCEPTION: the yacht-charter pillar renders
    // TourDetailClient only when {bookingPrefill && …} and renders its page-level
    // <h1> only when {!bookingPrefill && …} — they are mutually exclusive, so
    // exactly one <h1> ships on any given render. Don't warn on that pattern
    // (re-demoting the page <h1> to <h2> here = the 2026-06-10 regression that
    // left a 590/mo pillar with h1=0 on a normal load).
    const ownsH1Components = ["TourDetailClient"];
    const h1ComponentUse = ownsH1Components.some((c) => new RegExp(`<${c}\\b`).test(srcNoComments));
    const h1GatedByNoPrefill = /\{\s*!bookingPrefill\s*&&[\s\S]{0,80}<h1\b/.test(srcNoComments);
    const tdcGatedByPrefill = /\{\s*bookingPrefill\s*&&[\s\S]{0,120}<TourDetailClient\b/.test(srcNoComments);
    if (h1ComponentUse && h1Matches.length >= 1 && !(h1GatedByNoPrefill && tdcGatedByPrefill)) {
      warnings.push({
        file: rel(filePath),
        line: srcNoComments.slice(0, h1Matches[0].index).split("\n").length,
        rule: "multiple-h1-via-component",
        msg: `Page uses TourDetailClient (which emits its own <h1>) AND has a literal <h1> — almost certainly a duplicate. Remove the page-level <h1> or pass a flag to TourDetailClient.`,
      });
    }
  }

  // S17 [P0 — universal Tier-0]: public indexable page MUST have metadata.
  // Every public page needs generateMetadata() or `export const metadata`
  // (CLAUDE.md "generateMetadata() required on every public page"). The
  // homepage variants (src/app/page.tsx and src/app/[locale]/page.tsx) are
  // allowed to inherit title/description from the root layout template, so
  // they are exempt from this hard gate.
  const isHomepage =
    /\/app\/page\.tsx$/.test(filePath.replace(/\\/g, "/")) ||
    /\/app\/\[locale\]\/page\.tsx$/.test(filePath.replace(/\\/g, "/"));
  const hasMeta =
    /export\s+const\s+metadata\b/.test(src) ||
    /export\s+(?:async\s+)?function\s+generateMetadata\b/.test(src);
  if (!hasMeta && !isHomepage) {
    errors.push({
      file: rel(filePath), line: 1, rule: "missing-metadata",
      msg: `Public page has no \`export const metadata\` / \`generateMetadata()\` (CLAUDE.md: generateMetadata required on every public page). Homepage variants inherit from the layout template; all others must declare their own.`,
    });
  }

  // S18 [P0 — universal Tier-0]: public indexable page MUST ship an SSR <h1>.
  // This is the 2026-05-04 backlink regression guard — cruise/yacht detail
  // pages rendered the <h1> ONLY client-side, so Googlebot saw the backlink
  // target H1-less and the anchor never bound to the keyword. A page is
  // H1-covered if it has an inline <h1> OR renders a known H1-bearing shared
  // component (HeroSection / TourDetailClient / FleetDetailContent /
  // HotelClusterPage / BlogIndexClient). Comments are stripped so a commented
  // "<h1>" reference can't satisfy the check.
  const srcNoCommentsForH1 = src
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
  const hasInlineH1 = /<h1[\s>]/.test(srcNoCommentsForH1);
  const rendersH1Component = H1_BEARING_COMPONENTS.some((c) =>
    new RegExp(`<${c}[\\s/>]`).test(srcNoCommentsForH1)
  );
  if (!hasInlineH1 && !rendersH1Component) {
    errors.push({
      file: rel(filePath), line: 1, rule: "missing-h1",
      msg: `Public page has NO server-rendered <h1> and renders none of the H1-bearing components (${H1_BEARING_COMPONENTS.join(", ")}). Googlebot must see an SSR <h1> (2026-05-04 backlink finding). Add a static <h1> to the page or a covered component.`,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────
// S19 [P0 — universal Tier-0]: no customer-facing Telegram. MerrySails is
// WhatsApp-only in every locale (CLAUDE.md "Contact channel — WhatsApp ONLY").
// The internal Telegram ops bot (src/lib/telegram/, imported by server actions)
// is allow-listed. Any customer-facing `t.me/` link or "use Telegram" CTA
// anywhere else in src is a real regression and must fail the build. This is a
// per-file check but lives outside lintFile's page-only scope (a Telegram CTA
// could appear in a component, layout, or content file, not just a page).
// ─────────────────────────────────────────────────────────────────────────
function lintTelegram(filePath) {
  const unix = filePath.replace(/\\/g, "/");
  // Internal ops plumbing is allow-listed.
  if (TELEGRAM_OPS_ALLOWED_RE.test(unix)) return;
  const src = fs.readFileSync(filePath, "utf8");
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/\bt\.me\/|telegram/i.test(line)) continue;
    // Internal-ops imports/usage from @/lib/telegram are NOT a customer CTA.
    if (
      /@\/lib\/telegram|notifyNewReservation|notifyStatusChange|TelegramUser|telegramErr|Telegram notification|Telegram not set up/i.test(
        line
      )
    ) {
      continue;
    }
    // Negation / explanatory copy ("no Telegram", "not Telegram", internal ops).
    if (
      /no\s+telegram|never\s+telegram|not\s+(?:a\s+)?telegram|without\s+telegram|internal\s+telegram|telegram\s+ops|ops\s+notif|console\.(?:error|log)/i.test(
        line
      )
    ) {
      continue;
    }
    // A bare `t.me/` link is unambiguously a customer CTA → always error.
    const isTmeLink = /t\.me\//.test(line);
    // Otherwise only flag "telegram" when it reads like a contact channel/CTA.
    const looksLikeCta =
      isTmeLink ||
      /(?:contact|message|reach|chat|write|dm|talk).{0,30}telegram|telegram.{0,30}(?:contact|message|chat|channel|cta|button|link|@)/i.test(
        line
      );
    if (looksLikeCta) {
      errors.push({
        file: rel(filePath),
        line: i + 1,
        rule: "customer-facing-telegram",
        msg: `Customer-facing Telegram reference — MerrySails is WhatsApp-only in every locale (CLAUDE.md "Contact channel — WhatsApp ONLY"). Only src/lib/telegram/* (internal ops) may reference Telegram. Line: ${line.trim().slice(0, 100)}`,
      });
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 2026-06-05: Cross-file sanity checks. Run AFTER the per-file pass so we
// have access to aggregated state. Catches the kinds of issues a single-
// file linter can't see — duplicate metadata across locale variants,
// staging-gate drift between hreflang.ts and sitemap.xml/route.ts, and
// /[locale]/ pages whose CONTENT dict is missing keys for the locales they
// claim to serve in generateStaticParams.
// ─────────────────────────────────────────────────────────────────────────
function crossFileChecks(files) {
  // S14: Duplicate title/meta across locales — yacht/[slug] details are the
  // big offender (zh/de/fr/nl/ru all share the same EN string). Group every
  // /[locale]/ page's literal `title` and `description` metadata strings
  // and flag any string used in 3+ locale variants of the same route.
  const titlesByRoute = new Map(); // route → Map<title, Set<locale>>
  const descsByRoute = new Map();
  for (const f of files) {
    const m = f.match(/\/app\/\[locale\]\/(.+)\/page\.tsx$/);
    if (!m) continue;
    const route = m[1];
    const src = fs.readFileSync(f, "utf8");
    // Crude but effective: capture each `title: "..."` and `description: "..."`
    // inside a CONTENT/TRANSLATIONS block. Walk locale keys.
    const localeBlocks = [...src.matchAll(/^\s*(tr|de|fr|nl|ru|zh):\s*\{/gm)];
    for (let i = 0; i < localeBlocks.length; i++) {
      const start = localeBlocks[i].index;
      const end = i + 1 < localeBlocks.length ? localeBlocks[i + 1].index : src.length;
      const block = src.slice(start, end);
      const locale = localeBlocks[i][1];
      const titleM = block.match(/(?:^|\s)title:\s*"([^"]+)"/);
      const descM = block.match(/(?:^|\s)(?:description|metaDescription):\s*"([^"]+)"/);
      if (titleM) {
        if (!titlesByRoute.has(route)) titlesByRoute.set(route, new Map());
        const t = titlesByRoute.get(route);
        if (!t.has(titleM[1])) t.set(titleM[1], new Set());
        t.get(titleM[1]).add(locale);
      }
      if (descM) {
        if (!descsByRoute.has(route)) descsByRoute.set(route, new Map());
        const d = descsByRoute.get(route);
        if (!d.has(descM[1])) d.set(descM[1], new Set());
        d.get(descM[1]).add(locale);
      }
    }
  }
  for (const [route, byTitle] of titlesByRoute) {
    for (const [title, locales] of byTitle) {
      if (locales.size >= 3) {
        warnings.push({
          file: `src/app/[locale]/${route}/page.tsx`,
          line: 0,
          rule: "cross-locale-duplicate-title",
          msg: `${locales.size} locales (${[...locales].join(", ")}) share identical title "${title.slice(0, 50)}…" — Semrush flags duplicate-title cluster. Localize per locale.`,
        });
      }
    }
  }
  for (const [route, byDesc] of descsByRoute) {
    for (const [desc, locales] of byDesc) {
      if (locales.size >= 3) {
        warnings.push({
          file: `src/app/[locale]/${route}/page.tsx`,
          line: 0,
          rule: "cross-locale-duplicate-meta-desc",
          msg: `${locales.size} locales (${[...locales].join(", ")}) share identical meta description — Semrush flags duplicate-meta cluster. Localize per locale.`,
        });
      }
    }
  }

  // S15: Staging-gate drift between hreflang.ts and sitemap.xml/route.ts.
  // Both files declare RU_ENABLED + ZH_ENABLED sets; they MUST mirror each
  // other or we emit hreflang pointing at sitemap-excluded URLs (or vice versa).
  try {
    const hreflangSrc = fs.readFileSync(path.join(rootDir, "src/lib/hreflang.ts"), "utf8");
    const sitemapSrc = fs.readFileSync(path.join(rootDir, "src/app/sitemap.xml/route.ts"), "utf8");
    // Strip line comments before regex match so commented-out paths and
    // explanatory text inside the set definition aren't picked up as members.
    const stripComments = (s) => s.replace(/\/\/[^\n]*/g, "");
    const extract = (text, name) => {
      const cleaned = stripComments(text);
      const m = cleaned.match(new RegExp(`${name}\\s*=\\s*new Set[^\\[]*\\[([^\\]]+)\\]`));
      if (!m) return null;
      return [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
    };
    for (const pair of [["RU_ENABLED_ROUTES", "RU_ENABLED_PATHS"], ["ZH_ENABLED_ROUTES", "ZH_ENABLED_PATHS"]]) {
      const routes = extract(hreflangSrc, pair[0]);
      const paths = extract(sitemapSrc, pair[1]);
      if (!routes || !paths) continue;
      // Sitemap uses "/" for homepage where hreflang uses "" — normalize.
      // Homepage is special-cased in sitemap (always emitted via separate
      // logic, never listed in RU_ENABLED_PATHS), so skip "" / "/" entries
      // from the comparison to avoid a false positive.
      const HOMEPAGE = new Set(["", "/"]);
      const routesNorm = new Set(
        routes.filter((r) => !HOMEPAGE.has(r)).map((r) => r),
      );
      const pathsNorm = new Set(paths.filter((p) => !HOMEPAGE.has(p)));
      for (const p of pathsNorm) if (!routesNorm.has(p)) {
        errors.push({
          file: "src/lib/hreflang.ts",
          line: 0,
          rule: "staging-gate-drift",
          msg: `${pair[1]} has "${p}" but ${pair[0]} doesn't — sitemap will emit a URL that hreflang skips. Add to both sets.`,
        });
      }
      for (const r of routesNorm) if (!pathsNorm.has(r)) {
        errors.push({
          file: "src/app/sitemap.xml/route.ts",
          line: 0,
          rule: "staging-gate-drift",
          msg: `${pair[0]} has "${r === "/" ? "" : r}" but ${pair[1]} doesn't — hreflang will point at a sitemap-excluded URL. Add to both sets.`,
        });
      }
    }
  } catch (_) {
    // hreflang.ts or sitemap.xml/route.ts missing — skip silently
  }

  // S16: /[locale]/ pages whose generateStaticParams returns a locale that
  // isn't a key in CONTENT/TRANSLATIONS dict → 404 at runtime (the bug we
  // just fixed on /ru/bosphorus-cruise). Detect by comparing the static
  // string array literal next to generateStaticParams to the locale keys
  // detected from the dict block.
  for (const f of files) {
    if (!/\/app\/\[locale\]\/.+\/page\.tsx$/.test(f)) continue;
    const src = fs.readFileSync(f, "utf8");
    // Skip pages that don't use a CONTENT/TRANSLATIONS dict pattern — those
    // hardcode their metadata inline (single-locale slug pages like
    // /[locale]/prinzeninseln-istanbul, /[locale]/prens-adalari-istanbul,
    // /[locale]/kabatas-bogaz-turu) and don't need the dict-key check.
    const usesContentDict = /\bconst\s+(?:CONTENT|TRANSLATIONS)\s*:/m.test(src);
    if (!usesContentDict) continue;
    const paramsM = src.match(/generateStaticParams\s*\(\s*\)\s*\{[^}]*?\[([^\]]+)\][^}]*?\}/s);
    if (!paramsM) continue;
    const declared = [...paramsM[1].matchAll(/"(tr|de|fr|nl|ru|zh|en)"/g)].map((x) => x[1]);
    const hasKeys = new Set([...src.matchAll(/^\s*(tr|de|fr|nl|ru|zh):\s*\{/gm)].map((x) => x[1]));
    for (const loc of declared) {
      if (loc === "en") continue;
      if (!hasKeys.has(loc)) {
        errors.push({
          file: rel(f),
          line: src.slice(0, paramsM.index).split("\n").length,
          rule: "locale-content-missing",
          msg: `generateStaticParams returns "${loc}" but CONTENT/TRANSLATIONS dict has no "${loc}: { ... }" block → /${loc}/${f.match(/\/\[locale\]\/(.+)\/page\.tsx$/)[1]} will 404 at runtime.`,
        });
      }
    }
  }

  // S15 (2026-06-22 Semrush audit): hardcoded /<locale>/blog/<slug> or
  // /<locale>/guides/<slug> links pointing at a slug that is NOT registered for
  // that locale → 404. The audit's single biggest bucket (~790 internal 404s)
  // was locale-prefixed links to EN-only blog/guide slugs. The localized blog
  // route only serves slugs from src/data/blog/posts/<locale>-product-posts.ts
  // (via locale-posts.ts); there is NO /<locale>/guides/[slug] route at all.
  // ERROR on any such hardcoded link so a future "localize this CTA" edit can't
  // silently reintroduce the 404 wave.
  const localePostSlugs = {}; // locale -> Set<slug>
  const POST_FILES = {
    tr: "src/data/blog/posts/turkish-product-posts.ts",
    de: "src/data/blog/posts/german-product-posts.ts",
    fr: "src/data/blog/posts/french-product-posts.ts",
    nl: "src/data/blog/posts/dutch-product-posts.ts",
    ru: "src/data/blog/posts/russian-product-posts.ts",
  };
  for (const [loc, rp] of Object.entries(POST_FILES)) {
    const abs = path.join(rootDir, rp);
    localePostSlugs[loc] = new Set();
    if (fs.existsSync(abs)) {
      const t = fs.readFileSync(abs, "utf8");
      for (const mm of t.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
        localePostSlugs[loc].add(mm[1]);
      }
    }
  }
  // There is no /<locale>/guides/[slug] route — any /<locale>/guides/<slug>
  // link is always a 404.
  const LOCALE_LINK_RE = /["'`]\/(tr|de|fr|nl|ru|zh)\/(blog|guides)\/([a-z0-9-]+)["'`]/g;
  for (const f of files) {
    // Only inspect src under app/components/content (where links are authored).
    const unix = f.replace(/\\/g, "/");
    if (!/\/src\/(app|components|content)\//.test(unix)) continue;
    const src = fs.readFileSync(f, "utf8");
    let lm;
    while ((lm = LOCALE_LINK_RE.exec(src)) !== null) {
      const [, loc, section, slug] = lm;
      const line = src.slice(0, lm.index).split("\n").length;
      if (section === "guides") {
        errors.push({
          file: rel(f),
          line,
          rule: "locale-link-404",
          msg: `Link "/${loc}/guides/${slug}" → 404: there is no /[locale]/guides/[slug] route. Link the EN guide ("/guides/${slug}") instead.`,
        });
        continue;
      }
      // blog
      const reg = localePostSlugs[loc];
      if (loc === "zh" || !reg || !reg.has(slug)) {
        errors.push({
          file: rel(f),
          line,
          rule: "locale-link-404",
          msg: `Link "/${loc}/blog/${slug}" → 404: slug not registered in ${POST_FILES[loc] || `(no ${loc} post file)`}. Link an existing /${loc}/blog slug or the EN post "/blog/${slug}".`,
        });
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// H1–H3: hreflang-code + redirect-target integrity (2026-06-23).
// These read src/i18n/config.ts (locale list), src/i18n/localized-routes.ts
// (or src/lib/hreflang.ts), and next.config.ts (redirect sources). They run
// once per full-repo scan (the data is global), pushing ERRORS into `errors`.
// ─────────────────────────────────────────────────────────────────────────
function hreflangIntegrityChecks() {
  const localizedRoutesFile = path.join(rootDir, "src/i18n/localized-routes.ts");
  const hreflangFile = path.join(rootDir, "src/lib/hreflang.ts");
  const configFile = path.join(rootDir, "src/i18n/config.ts");
  const nextConfigFile = path.join(rootDir, "next.config.ts");

  const readIf = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "");
  const stripComments = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

  // The file(s) that declare the hreflang/localized route sets + the code map.
  const routesSrc = readIf(localizedRoutesFile);
  const hreflangSrc = readIf(hreflangFile);
  const configSrc = stripComments(readIf(configFile));
  const nextSrc = stripComments(readIf(nextConfigFile));

  // ── Active locales (from ACTIVE_LOCALES). ────────────────────────────────
  const activeMatch = configSrc.match(/ACTIVE_LOCALES[^=]*=\s*\[([^\]]*)\]/);
  const activeLocales = activeMatch
    ? [...activeMatch[1].matchAll(/"([a-zA-Z-]+)"/g)].map((m) => m[1])
    : [];

  // ── H1: INVALID hreflang language code. ──────────────────────────────────
  // (a) Every active locale that is a region-only/non-ISO-639 code MUST be
  //     remapped (sa→ar, zh→zh-Hans). We assert the code map exists + maps it.
  // (b) Any literal hreflang code emitted in code/config that is region-only
  //     or fails the BCP-47 shape is flagged directly.
  const codeMapSrc = stripComments(hreflangSrc || routesSrc);
  // Collect the locale→code map (HREFLANG_CODE / LOCALE_HREFLANG etc).
  const mappedCodes = {};
  const mapBlock = codeMapSrc.match(
    /(?:HREFLANG_CODE|LOCALE_HREFLANG|HREFLANG_MAP)\s*(?::[^=]*)?=\s*\{([\s\S]*?)\}/,
  );
  if (mapBlock) {
    for (const m of mapBlock[1].matchAll(/([a-zA-Z-]+)\s*:\s*"([a-zA-Z-]+)"/g)) {
      mappedCodes[m[1]] = m[2];
    }
  }
  for (const [loc, want] of Object.entries(LOCALE_TO_HREFLANG_REQUIRED)) {
    if (!activeLocales.includes(loc)) continue; // not shipped → not a concern
    if (mappedCodes[loc] !== want) {
      errors.push({
        file: rel(hreflangFile),
        line: 0,
        rule: "hreflang-invalid-lang-code",
        msg: `Active locale "${loc}" is a region-only/non-language URL segment but the hreflang code map does not translate it to "${want}". A hreflang attribute MUST be an ISO-639 language (sa→ar, zh→zh-Hans) — emitting "${loc}" triggers Semrush/Google "language mismatch". Add ${loc}: "${want}" to the HREFLANG_CODE map and emit hreflangCode(locale).`,
      });
    }
  }
  // Direct literal scan: any `hreflang="xx"` / `hrefLang="xx"` / `languages: { "xx": }`
  // key that is region-only or not BCP-47-shaped. Comment-stripped so an
  // explanatory `// Emitting hreflang="sa" …` doc line is not a false positive.
  const literalHreflangSrc =
    stripComments(hreflangSrc) + "\n" + stripComments(routesSrc) + "\n" + configSrc;
  for (const m of literalHreflangSrc.matchAll(
    /href[Ll]ang\s*[:=]\s*["']([^"']+)["']/g,
  )) {
    const code = m[1];
    if (REGION_ONLY_HREFLANG[code]) {
      errors.push({
        file: rel(hreflangFile),
        line: 0,
        rule: "hreflang-invalid-lang-code",
        msg: `hreflang="${code}" is a region/country code, not a language. Use "${REGION_ONLY_HREFLANG[code]}".`,
      });
    } else if (!BCP47_RE.test(code)) {
      errors.push({
        file: rel(hreflangFile),
        line: 0,
        rule: "hreflang-invalid-lang-code",
        msg: `hreflang="${code}" is not a valid ISO-639 language / language-region code (BCP-47).`,
      });
    }
  }

  // ── H2: hreflang TARGET that redirects. ──────────────────────────────────
  // Collect permanent-redirect SOURCE slugs (bare EN-root `/slug`, no :locale
  // param) from next.config.ts. Then assert none of them is still listed in any
  // hreflang/localized-route set. (Catches anniversary / bachelor / bachelorette
  // / proposal-with-photographer / team-building / client-hosting / product-launch.)
  const redirectSources = new Set();
  for (const m of nextSrc.matchAll(
    /source:\s*"(\/[a-z0-9-]+)"\s*,\s*destination:\s*"([^"]+)"\s*,\s*permanent:\s*true/g,
  )) {
    // Only EN-root, internal-destination redirects (a real "this slug is gone"
    // signal); skip the host-canonical /:path* rule.
    if (m[1].includes(":") || m[1].includes("*")) continue;
    redirectSources.add(m[1]);
  }
  const routeSetSrc = `${routesSrc}\n${hreflangSrc}`;
  // Only look inside the actual Set([...]) literals so a redirect destination
  // mentioned in a comment elsewhere doesn't count.
  const setBodies = [...routeSetSrc.matchAll(/new Set<?[^>]*>?\(\s*\[([\s\S]*?)\]\s*\)/g)]
    .map((m) => m[1])
    .join("\n");
  const setBodiesClean = stripComments(setBodies);
  for (const src of redirectSources) {
    if (new RegExp(`["']${src}["']`).test(setBodiesClean)) {
      errors.push({
        file: fs.existsSync(localizedRoutesFile)
          ? rel(localizedRoutesFile)
          : rel(hreflangFile),
        line: 0,
        rule: "hreflang-target-redirects",
        msg: `Route "${src}" is a permanent (3xx) redirect source in next.config.ts but is still listed in a hreflang/localized-routes Set. The EN canonical returns 3xx, so the entire hreflang set is non-200 → Google ignores it (Screaming Frog "Non-200 hreflang URLs"). Remove "${src}" from the route set(s).`,
      });
    }
  }

  // ── H3: hreflang code vs html-lang consistency. ──────────────────────────
  // A single locale must emit exactly ONE hreflang variant. Catch a code map
  // (or literal emissions) that produce BOTH a bare "zh" and a "zh-hans"/"zh-Hant"
  // for the same base language, or disagree on case. We inspect the union of
  // (a) mapped codes and (b) every literal `languages["xx"] =` / object key.
  const emittedCodes = new Set(Object.values(mappedCodes));
  // Locales that pass through unmapped also emit their own code as-is.
  for (const loc of activeLocales) {
    if (loc === "en") continue;
    emittedCodes.add(mappedCodes[loc] ?? loc);
  }
  // Group by base language (lowercased prefix before "-").
  const byBase = {};
  for (const code of emittedCodes) {
    if (code === "x-default") continue;
    const base = code.toLowerCase().split("-")[0];
    (byBase[base] ||= new Set()).add(code);
  }
  for (const [base, variants] of Object.entries(byBase)) {
    if (variants.size > 1) {
      errors.push({
        file: rel(hreflangFile),
        line: 0,
        rule: "hreflang-code-inconsistent",
        msg: `Base language "${base}" is emitted as ${variants.size} different hreflang variants (${[...variants].join(", ")}). A locale must map to exactly ONE hreflang code (e.g. only "zh-Hans", never also a bare "zh"). Pick one and make the code map + html lang agree.`,
      });
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// H4: heuristic hardcoded-English-in-localized-component (2026-06-23).
// A shared component (src/components/**) that renders on non-EN locale pages
// must not bake an English marketing UI string. Conservative: only the small
// set of phrases that recurred as native-locale leaks (Best Seller / Most
// popular / Save €N / Continue booking), and only when the component does NOT
// receive an i18n string table (no `strings` prop, no `t(`/`locale`-keyed
// lookup, no import from a *-strings table). An allowlist of known-OK
// occurrences keeps the false-positive rate at zero.
// ─────────────────────────────────────────────────────────────────────────
const HARDCODED_EN_PHRASE_RE =
  /\b(?:Best[ -]?Seller|Most[ -]?(?:popular|Popular)|Save\s*(?:€|EUR)\s*\d|Continue\s+[Bb]ooking)\b/;
// Allowlist: file paths (suffix match) whose hardcoded English is a KNOWN,
// separately-tracked concern (the booking-flow UI is English-hardcoded by
// design pending a dedicated i18n pass) or a non-rendered comment. Adding a
// path here is the documented escape hatch when a phrase is intentionally EN.
const HARDCODED_EN_ALLOWLIST = [
  // Booking flow — English-hardcoded UI tracked under the "/reservation
  // conversion fix" task, NOT a marketing-leak regression. The dedicated i18n
  // pass owns these; flagging them here would be noise.
  "src/components/booking/CoreBookingPlanner.tsx",
  "src/components/yacht/YachtReservationFlow.tsx",
  // SalePrice badge default is a fallback string overridden by a localized
  // `badgeText` prop on every locale render (the table-driven path); the bare
  // default only shows on EN.
  "src/components/ui/SalePrice.tsx",
];
function hardcodedEnglishChecks(files) {
  for (const f of files) {
    const unix = f.replace(/\\/g, "/");
    if (!/\/src\/components\//.test(unix)) continue;
    if (HARDCODED_EN_ALLOWLIST.some((a) => unix.endsWith(a))) continue;
    const src = fs.readFileSync(f, "utf8");
    // A component that already accepts an i18n string table is considered
    // localization-aware and is NOT a leak candidate (the strings come from
    // the table; any literal in-file is a fallback/dev artifact).
    const isLocalizationAware =
      /\bstrings\s*[:?,)}]/.test(src) || // `strings` prop in signature/destructure
      /import[^;]*-strings["']/.test(src) || // imports a *-strings table
      /\bt\(\s*["'`]/.test(src) || // a t("key") i18n call
      /SiteLocale|getLocale|useLocale/.test(src);
    if (isLocalizationAware) continue;
    // Strip comments + JSX comments so a phrase in an explanatory comment
    // (e.g. "Clarity flagged dead clicks on 'Continue booking'") never trips.
    const code = src
      .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    const lines = code.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (HARDCODED_EN_PHRASE_RE.test(lines[i])) {
        errors.push({
          file: rel(f),
          line: i + 1,
          rule: "hardcoded-english-localized-component",
          msg: `Shared component bakes English marketing string "${lines[i].trim().slice(0, 60)}" without an i18n string table — it renders un-localized on /tr /de /fr /nl /ru /zh pages (native-locale leak, 2026-06-16 class). Move the copy into a per-locale string table (see weekday-discount-strings.ts) or, if intentionally EN-only, add this file to HARDCODED_EN_ALLOWLIST in lint-schema.mjs.`,
        });
      }
    }
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
    files.push(...walkDir(path.join(rootDir, "src/data")));
    files.push(...walkDir(path.join(rootDir, "src/content")));
  }

  for (const f of files) lintFile(f);

  // 2026-06-05: cross-file post-pass (duplicates across locales, staging-gate
  // drift, locale CONTENT key parity). Only meaningful when scanning the full
  // repo, not single-file mode.
  if (args.length === 0) crossFileChecks(files);

  // 2026-06-23 recurring-error-class guards. Global config/redirect integrity
  // (H1–H3) is only meaningful on a full scan; the hardcoded-English heuristic
  // (H4) can run on whatever set of component files is in scope.
  if (args.length === 0) hreflangIntegrityChecks();
  hardcodedEnglishChecks(files);

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

  // STRICT mode (opt-in via SEO_LINT_STRICT=1, e.g. in the pre-commit path):
  // warnings ALSO fail the run. Default (prebuild build gate) blocks on errors
  // only, so a stray long-title warning never breaks a deploy — but a developer
  // can opt into the stricter bar locally / in CI.
  const strict = process.env.SEO_LINT_STRICT === "1";
  if (strict && warnings.length > 0) {
    console.log(`\n🔒 SEO_LINT_STRICT=1 — ${warnings.length} warning(s) treated as failures.`);
    return 1;
  }
  return errors.length > 0 ? 1 : 0;
}

process.exit(main());
