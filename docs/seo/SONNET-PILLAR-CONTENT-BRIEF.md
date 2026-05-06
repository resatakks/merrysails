# Sonnet Pillar Content Brief — MerrySails 3 Pillar Posts

**For**: Claude Sonnet (or any LLM) writing 3 pillar blog posts that match Opus quality.
**Output target**: 3 BlogPost TypeScript objects appended to `src/data/blog/posts/foundational-cruise-guides.ts`.
**Tone**: Native English, expert-led, no AI feel. Match Opus benchmark.
**Length**: 2000-2500 words per post. 6-8 sections + 4-6 FAQs.

---

## A. EXACT BlogPost type schema (must match)

```typescript
{
  slug: string;                    // kebab-case, no year
  title: string;                   // 50-60 chars, include year (2026), main keyword
  metaDescription: string;         // 140-160 chars, action verb + price + benefit
  excerpt: string;                 // 1 sentence, position vs main pillar
  category: "cruise-guide" | "planning";
  date: string;                    // "2026-05-06" (today)
  dateModified?: string;
  readTime: string;                // "12 min read"
  image: string;                   // unsplash with ?w=1200&q=80
  imageAlt: string;                // descriptive, no keyword stuffing
  keywords: string[];              // 6-8 LSI variants
  author: "captain-ahmet" | "editorial";  // captain for cruise/yacht, editorial for city/tips
  keyTakeaways: string[];          // 4 bullet, 1 should link [TURSAB](https://www.tursab.org.tr/en)
  sections: Array<{
    heading: string;               // Question form, keyword-rich H2
    answerCapsule?: string;        // 1-2 sentence direct answer (AI/featured snippet bait)
    content: string;               // 2-4 paragraphs, each <80 words (Semrush rule 21)
    table?: { headers: string[], rows: string[][] };  // optional, comparison
    expertQuote?: { text: string, author: string, title: string };  // 1-2 quotes per post (Turkish OK for E-E-A-T)
    callout?: { type: "price" | "tip" | "warning", text: string };
    proTip?: string;
  }>;
  faqs: Array<{ q: string, a: string }>;  // 4-6 FAQs, schema-friendly
  relatedTours: string[];          // tour slugs
  relatedPosts: string[];          // blog post slugs
}
```

---

## B. CRITICAL price truth (NEVER fake)

Source: `public/llms.txt` (machine-readable). Use these **EXACT** prices:

```
Sunset Cruise:
- Without Wine: €34/person
- With Wine: €40/person

Dinner Cruise:
- Silver Soft Drinks: €30/person
- Silver Alcoholic: €45/person
- Gold Soft Drinks: €80/person
- Gold Unlimited Alcohol: €90/person

Yacht Charter:
- Essential Basic: €280/group
- Premium Luxury: €380/group
- VIP Luxury: €680/group
```

⚠️ DO NOT write €15, €25, €50, €55, €100 — these are fake competitor prices. Use only the above.

---

## C. Internal link MUST list (each post = 5-8 internal links)

| Tag | URL | Use when |
|---|---|---|
| Bosphorus Cruise hub | `/bosphorus-cruise` | comparison, intro |
| Sunset Cruise | `/cruises/bosphorus-sunset-cruise` | sunset-specific |
| Dinner Cruise | `/istanbul-dinner-cruise` | dinner-specific |
| Yacht Charter | `/yacht-charter-istanbul` | private/VIP |
| Pricing | `/pricing` | machine-readable price page |
| Compare | `/compare-bosphorus-cruises` | cross-product |
| FAQ | `/istanbul-cruise-faq` | answer-engine |
| TURSAB | `/tursab` | E-E-A-T trust |
| TripAdvisor (external) | `https://www.tripadvisor.com/...` | review proof |
| Wikipedia Bosphorus | `https://en.wikipedia.org/wiki/Bosphorus` | authoritative |

---

## D. Voice + tone rules (NO AI feel)

✅ DO:
- "MerrySails has hosted 50,000+ guests since 2001"
- "TURSAB-licensed agency #14316"
- Captain Mehmet/Ahmet quote (Turkish original + EN translation OR EN only)
- Direct, second-person ("you can," "we recommend")
- Specific numbers (31 km strait, 1973 bridge year, 285 rooms Dolmabahçe)
- Honest comparison (mention Tolerance Travel, Mega Lüfer if relevant — competitor ack builds trust)

❌ AVOID:
- "Whether you're a couple or a group..."
- "In conclusion..."
- "It's important to note..."
- "Furthermore," "Moreover," "Additionally"
- "Welcome aboard," "step aboard," "embark on"
- Generic adjectives stacked: "stunning, breathtaking, magical, unforgettable"
- Em-dashes everywhere
- Bullet-point dumps without intro paragraph

---

## E. Three pillar outlines

### Pillar 1: "Best Bosphorus Sunset Cruise Istanbul 2026 — Honest Comparison"

**Slug**: `best-bosphorus-sunset-cruise-istanbul-2026`
**Target keyword**: "best bosphorus sunset cruise istanbul" (480 vol/mo, KD 27 — winnable)
**Word target**: 2200-2500
**Why this beats current SERP**: Top 5 dominated by GetYourGuide/TripAdvisor/AwayGoWe — they list 7-10 options without operator depth. We can win with **operator-first transparency** (TURSAB license, captain bio, exact route, real prices).

**Outline (8 H2 sections)**:
1. **What makes the "best" sunset cruise in Istanbul?** (criteria framework: small group, golden hour timing, route, captain experience)
2. **Top sunset cruise option compared (5 operators)**: MerrySails, Tolerance Travel, Mega Lüfer Yachts, Bosphorus Sunset Cruise (operator brand), GetYourGuide (aggregator). With table: Operator / Duration / Price / Reviews / Best for.
3. **What's the actual sunset timing on the Bosphorus by month?** (table: month → sunset time → recommended boarding time → temp)
4. **Boarding points: Kabataş vs Karaköy vs Eminönü** (geographic + traffic considerations)
5. **What should you wear and bring?** (practical checklist + photo tips)
6. **What does a 2-hour sunset cruise actually look like?** (minute-by-minute, for AI answer engines)
7. **Why book direct vs aggregator?** (TURSAB protection, no commission, +Captain Ahmet quote)
8. **How to book MerrySails sunset cruise** (CTA + WhatsApp)

**FAQs (5)**:
- "What time does the sunset cruise start?"
- "Can I take a sunset cruise in winter?"
- "Is the price per person or per group?"
- "How is MerrySails different from GetYourGuide listings?"
- "Can I bring my own wine?"

### Pillar 2: "Bosphorus Cruise vs Ferry — Tourist Decision Guide 2026"

**Slug**: `bosphorus-cruise-vs-ferry-istanbul-2026`
**Target keyword**: "bosphorus cruise vs ferry" / "istanbul boat trip" (1,300 + 2,400 vol)
**Word target**: 2000-2300
**Why this wins**: Existing post `/blog/istanbul-boat-tour-vs-ferry` exists but is short. Need depth.

**Outline (7 H2)**:
1. **Bosphorus cruise vs ferry: which is right for tourists?** (decision matrix)
2. **City ferry (Şehir Hatları) — what you actually get** (route, cost ₺40-80, language, no commentary)
3. **Tourist cruise — what changes** (route, language, narration, price, included F&B)
4. **Cost comparison: full breakdown** (table)
5. **Which is best for first-time visitors?** (most tourists pick wrong — explain)
6. **Hidden costs of "free" or "cheap" options** (carpet shop trips, rebook scams)
7. **Booking the right tourist cruise** (CTA)

**FAQs (5)**:
- "Is the city ferry safe for tourists?"
- "Does the ferry cover the same route as a tourist cruise?"
- "Can I take a ferry at sunset?"
- "Why are ferries 10x cheaper than cruises?"
- "What's the most authentic experience?"

### Pillar 3: "Istanbul Dinner Cruise Etiquette & What to Expect 2026"

**Slug**: `istanbul-dinner-cruise-etiquette-2026`
**Target keyword**: "istanbul dinner cruise" / "what to wear dinner cruise" (1,600 + LSI)
**Word target**: 1800-2200
**Why this wins**: Currently no dedicated etiquette content. UGC seed: people Google this nervously before booking.

**Outline (6 H2)**:
1. **What to expect on an Istanbul dinner cruise** (timeline 20:30 boarding → 00:00 disembark)
2. **Dress code: what to wear (and what NOT to)** (smart casual, no flip-flops, dressier for Gold)
3. **Turkish night entertainment program — what it includes** (folk dance, belly dance, live music)
4. **Drinks etiquette: alcoholic vs soft tier, BYOB rules** (€30 vs €45 difference, no outside drinks allowed)
5. **Tipping, language, photography rules** (10% common, English staff, photo restrictions)
6. **Special occasions: anniversaries, birthdays** (request flow, decorations)

**FAQs (4)**:
- "Is the food on an Istanbul dinner cruise good?"
- "Can vegetarians/halal/vegan diners be accommodated?"
- "What if I'm seasick?"
- "Are dinner cruises kid-friendly?"

---

## F. Schema requirements per post

Every post automatically gets `Article` schema via the blog renderer. **Just match the BlogPost type fields correctly** and rendering handles JSON-LD.

For FAQs to show as Rich Result, **each Q must be unique across the site** (no duplicates from `faq.ts`).

---

## G. Output instructions for Sonnet

1. Read this brief in full.
2. Read 1 existing post for tone reference: `src/data/blog/posts/foundational-cruise-guides.ts:36` (best-bosphorus-cruise-istanbul-guide).
3. Write 3 BlogPost objects matching the type EXACTLY.
4. Append to `src/data/blog/posts/foundational-cruise-guides.ts` (before the closing `]`).
5. Run `npx tsc --noEmit` to verify TS valid.
6. Run `npm run lint:schema` to verify rules.
7. Test 1 internal link manually.
8. Hand back to user for review.

**Anti-checklist** (Sonnet self-check before submit):
- [ ] No prices outside the official list (Section B)
- [ ] At least 1 expert quote per post
- [ ] At least 5 internal links per post
- [ ] No "Whether you...", "In conclusion", "It's worth noting"
- [ ] Each section has answerCapsule (for AI snippets) when factual
- [ ] All FAQs unique vs existing site FAQs
- [ ] keyTakeaways: 4 items, 1 with TURSAB external link
- [ ] Title 50-60 chars including " | MerrySails Istanbul 2026" suffix (auto-added)
- [ ] metaDescription 140-160 chars

If any checkbox fails, fix before submitting.

---

## H. Ready-to-use prompt for Sonnet

```
You are writing 3 pillar blog posts for MerrySails (Bosphorus cruise operator,
Istanbul, TURSAB licensed since 2001). Read docs/seo/SONNET-PILLAR-CONTENT-BRIEF.md
in full. Then read src/data/blog/posts/foundational-cruise-guides.ts for tone
reference (post slug "best-bosphorus-cruise-istanbul-guide").

Write 3 BlogPost TypeScript objects matching the exact type, following the
3 outlines (Best Sunset 2026 / Cruise vs Ferry / Dinner Etiquette). Append
to foundational-cruise-guides.ts before the closing array bracket.

Verify with: npx tsc --noEmit && npm run lint:schema

Do NOT use prices outside the official list. Do NOT use AI clichés
(Section D anti-checklist). Each post 2000-2500 words, 6-8 sections, 4-6 FAQs.
```
