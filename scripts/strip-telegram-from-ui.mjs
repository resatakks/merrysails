#!/usr/bin/env node
/**
 * scripts/strip-telegram-from-ui.mjs
 *
 * One-shot migration (2026-06-02) — remove Telegram contact CTA / FAQ / button
 * references from user-facing files. Keep admin Telegram bot infrastructure
 * (lib/telegram/*, api/telegram/*, prisma TelegramUser model, lib/constants.ts
 * TELEGRAM_GROUP_ID) intact.
 *
 * Usage: node scripts/strip-telegram-from-ui.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DRY = process.argv.includes("--dry");

// User-facing files only — admin infra excluded.
const TARGETS = [
  // Russian locale pages
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/istanbul-dinner-cruise/page.tsx",
  "src/app/[locale]/bosphorus-cruise-for-families/page.tsx",
  "src/app/[locale]/honeymoon-yacht-cruise-istanbul/page.tsx",
  "src/app/[locale]/anniversary-yacht-cruise-istanbul/page.tsx",
  "src/app/[locale]/yacht-charter-istanbul/page.tsx",
  "src/app/[locale]/cruises/bosphorus-sunset-cruise/page.tsx",
  "src/app/[locale]/bosphorus-cruise/page.tsx",
  "src/app/[locale]/bosphorus-cruise-for-couples/page.tsx",
  // EN pages with embedded RU FAQs / AI knowledge
  "src/app/boat-rental-istanbul/page.tsx",
  "src/app/kabatas-dinner-cruise-istanbul/page.tsx",
  "src/app/kurucesme-marina-yacht-charter/page.tsx",
  "src/app/ai-knowledge/page.tsx",
  "src/app/llms.txt/route.ts",
  "src/app/llms-full.txt/route.ts",
  "src/app/bosphorus-cruise-departure-points/page.tsx",
  "src/app/private-bosphorus-dinner-cruise/page.tsx",
  "src/app/proposal-yacht-with-photographer-istanbul/page.tsx",
  "src/app/proposal-yacht-rental-istanbul/page.tsx",
  "src/app/compare-bosphorus-cruises/page.tsx",
  "src/app/dinner-cruise-with-hotel-pickup-istanbul/page.tsx",
  "src/app/bosphorus-cruise/page.tsx",
  "src/app/private-dinner-cruise-for-couples-istanbul/page.tsx",
  "src/app/sunset-cruise-tickets-istanbul/page.tsx",
  "src/app/corporate-yacht-dinner-istanbul/page.tsx",
  "src/app/turkish-night-dinner-cruise-istanbul/page.tsx",
  // Russian blog posts
  "src/data/blog/posts/russian-product-posts.ts",
  // Shared content data
  "src/data/quick-answers.ts",
  "src/data/curated-reviews.ts",
  // Booking UI (any non-admin reference)
  "src/components/booking/BookingSidebar.tsx",
];

// Replacement rules (order matters — longest first).
// Strings are matched as literal substrings (not regex) unless prefixed with /…/flags.
const RULES = [
  // Disinformation sentences — REMOVE entirely.
  { kind: "regex", pattern: /\s*НЕ говорите про WhatsApp как основной канал для российских клиентов[^\.]*\.\s*Используйте Telegram[^\.]*\.\s*/g, replace: " " },
  { kind: "regex", pattern: /WhatsApp не используется как канал связи для гостей из России\.?\s*/g, replace: "" },
  { kind: "regex", pattern: /\(WhatsApp is restricted in Russia from Feb 2026\)\.?\s*/g, replace: "" },
  { kind: "regex", pattern: /WhatsApp заблокирован в РФ с февраля 2026\.?\s*/g, replace: "" },
  { kind: "regex", pattern: /WhatsApp is restricted in Russia from Feb 2026\.?\s*/g, replace: "" },

  // CTA button labels (Russian).
  { kind: "literal", pattern: "Написать в Telegram", replace: "Написать в WhatsApp" },
  { kind: "literal", pattern: "Отправить бриф медового месяца через Telegram", replace: "Отправить бриф медового месяца через WhatsApp" },
  { kind: "literal", pattern: "Отправить бриф годовщины через Telegram", replace: "Отправить бриф годовщины через WhatsApp" },
  { kind: "literal", pattern: "Семейный запрос через Telegram", replace: "Семейный запрос через WhatsApp" },
  { kind: "literal", pattern: "Запросить через Telegram", replace: "Запросить через WhatsApp" },
  { kind: "literal", pattern: "Связаться через Telegram", replace: "Связаться через WhatsApp" },

  // Russian FAQ / body text — "Telegram (@merrysails)" → "WhatsApp"
  { kind: "regex", pattern: /Telegram\s*\(@merrysails\)/g, replace: "WhatsApp" },
  { kind: "regex", pattern: /Telegram\s*@merrysails/g, replace: "WhatsApp" },
  { kind: "regex", pattern: /в Telegram\b/g, replace: "в WhatsApp" },
  { kind: "regex", pattern: /через Telegram\b/g, replace: "через WhatsApp" },
  { kind: "regex", pattern: /по Telegram\b/g, replace: "по WhatsApp" },

  // English ai-knowledge / llms.txt — drop the Russia carve-out.
  { kind: "regex", pattern: /Russian-speaking customers\s*[—-]\s*Telegram\s*<code>@merrysails<\/code>\s*\.?\s*/g, replace: "" },
  { kind: "regex", pattern: /Russian-speaking customers\s*[—-]\s*Telegram\s*@merrysails\s*\.?\s*/g, replace: "" },

  // t.me URL → WhatsApp URL
  { kind: "regex", pattern: /https?:\/\/t\.me\/merrysails/g, replace: "https://wa.me/905448989812" },

  // "@merrysails" left orphan after the above (only when adjacent to whitespace or punctuation)
  { kind: "regex", pattern: /\s*\(@merrysails\)/g, replace: "" },

  // Double-space cleanup from removed sentences.
  { kind: "regex", pattern: /  +/g, replace: " " },
];

function applyRules(content) {
  let out = content;
  let changes = 0;
  for (const r of RULES) {
    if (r.kind === "literal") {
      while (out.includes(r.pattern)) {
        out = out.replace(r.pattern, r.replace);
        changes += 1;
      }
    } else if (r.kind === "regex") {
      const before = out;
      out = out.replace(r.pattern, r.replace);
      if (out !== before) changes += 1;
    }
  }
  return { out, changes };
}

let totalChanges = 0;
const touched = [];

for (const rel of TARGETS) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.warn(`[skip] missing: ${rel}`);
    continue;
  }
  const before = fs.readFileSync(abs, "utf8");
  const { out, changes } = applyRules(before);
  if (out === before) continue;
  totalChanges += changes;
  touched.push({ file: rel, changes });
  if (!DRY) fs.writeFileSync(abs, out, "utf8");
}

console.log(`\n${DRY ? "[DRY]" : "[WRITE]"} ${touched.length} files touched, ${totalChanges} rules fired`);
for (const t of touched) console.log(`  ${t.file} — ${t.changes} rule(s)`);
