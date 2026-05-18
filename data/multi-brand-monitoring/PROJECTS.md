# Multi-Brand Monitoring — Master Tracking

**Owner**: resatakkus10@gmail.com
**Created**: 2026-05-17
**Purpose**: 10 brands across cruise, transfer, rental, restaurant, tattoo, food verticals — single source of truth for commercial intent, prompt sets, DataForSEO spend, and AI visibility findings.

---

## 🎯 The 10 Brands

### TIER A — High priority (bi-weekly attention)

| # | Brand | Domain | Vertical | Commercial intent | Geo target | Lang |
|---|---|---|---|---|---|---|
| 1 | **merrysails** | merrysails.com | Cruise / yacht | Sunset cruise, dinner cruise, private yacht | International (UK/DE/US/FR) | EN primary, TR/DE/FR/NL active |
| 2 | **goldensunsettour** | goldensunsettour.com | Cruise / yacht (sister) | Sunset, dinner, yacht charter — white-label | International | EN |
| 3 | **kingsworldtransfer** | kingsworldtransfer.com | VIP airport transfer | **Foreign tourists** — Istanbul / Antalya / Muğla / Dalaman airport transfers. **NOT** Havabus / Havaist / Taksim taksi. Vito/Mercedes VIP. | International tourists | EN |
| 4 | **merryturizm** | merryturizm.com | VIP airport transfer | Same intent as kings — yabancı turist airport, TURSAB licensed | International tourists | EN |
| 5 | **pinogareroofrestaurant** | pinogareroofrestaurant.com | Restaurant (Sirkeci rooftop) | Tourists in Sultanahmet/Sirkeci, Bosphorus view, romantic dinner | Istanbul foreign visitors | EN |
| 6 | **rentacarsaw** | rentacarsaw.com | Car rental (broker, **NEW priority**) | **Gurbetçi** (Turkish expats from Germany) flying back home | DE (Germany) | DE primary, EN secondary |

### TIER B — Light attention (monthly)

| # | Brand | Domain | Vertical | Commercial intent | Geo | Lang |
|---|---|---|---|---|---|---|
| 7 | **sawrentacar** | sawrentacar.com | Car rental (operator) | Istanbul SAW (Sabiha Gökçen) airport rentals | International | EN |
| 8 | **ersintattoo** | (assumed: ersintattoo.com) | Tattoo studio | Türk müşteri, Bakırköy local, minimal/fine line | Turkey | TR |
| 9 | **acılkaseniz** | (assumed: acilkaseniz.com) | Food / acılı kaşe delivery | Already ranking Bahçeşehir — expand Istanbul-wide | Turkey | TR |

**Total**: 9 active brands (merrysails sister project goldensunsettour same data shape).

> Note: User mentioned 10 brands but enumeration yields 9. Will add 10th when clarified.

---

## ❌ What this monitoring is NOT for

- **Kings/Merry**: NOT Havabus, NOT Havaist, NOT Taksim taksi, NOT domestic public transport
- **Cruise brands**: NOT party boats, NOT cheap booze cruise (positioning is premium licensed)
- **Restaurant**: NOT delivery, NOT fast food
- **Rentals**: NOT motorcycle, NOT van rental

---

## 📊 DataForSEO Spend Log

**API balance start (2026-05-17)**: $50.60
**Monthly budget cap**: $5-10 (defined by user 2026-05-17)
**Cache TTL**: 10 days (skip pulls within 10 days of last result)

| Date | Brand | Endpoint | Keywords / Queries | Cost | Finding (1-line) |
|---|---|---|---|---|---|
| 2026-05-01 | merrysails | Keyword Suggestions | TR/EN/DE/FR | ~$5 | TR `boğaz turu` 6,600/mo KD=0 = pillar #1 |
| 2026-05-07 | merrysails | Google Ads Volume | TR + EN cruise/yacht | ~$0.10 | DE realised much lower than estimates (10-70 vol) |
| 2026-05-17 | kings + merry | Google Ads Volume (UK 2826) | 15 airport transfer kw | $0.075 | UK pazarı 6,450 vol/mo — **Antalya 2,900 > Istanbul 1,000** (strateji değişimi) |
| 2026-05-17 | kings + merry + rentacarsaw | Google Ads Volume (DE 2276) | 15 transfer + mietwagen kw | $0.075 | **DE Antalya 4,400 vol > UK 2,900** — gurbetçi pazar baskın. Dalaman/Bodrum DE comp LOW (18, 32) — easy wins |
| 2026-05-17 | 9 brands | OpenRouter AI visibility scan | 93 queries × 3 LLM | $0.228 | merrysails+kings+merry+golden+pinogare+rentacarsaw+ersintattoo = **0% AI visibility**. acilkaseniz 50%. sawrentacar 22%. |
| 2026-05-17 | 9 brands | OpenRouter DELTA scan (TR+DE prompts) | 84 queries | $0.206 | **Pinogare Perplexity #2 TR Sirkeci** (ilk gerçek win!) — sawrentacar TR brand-direct %50 — merrysails/golden TR'de bile invisible (yapısal sorun) |
| 2026-05-17 | kings + merry | Google Ads Volume (US 2840) | 10 transfer kw | $0.075 | US Antalya 210 vol **LOW comp 7** — Bodrum 70 LOW comp 25 — cheap wins. Total transfer market 3 markets: Antalya 7,510 vol/mo |

**Running total today** (updated): $1.83 (DataForSEO $1.40 + OpenRouter $0.43). $49.20 DataForSEO + ~$9.34 OpenRouter. Cap $5-10 — 18% used.

### Additional pulls 2026-05-17 (afternoon)
| Time | Target | Cost | Top finding |
|---|---|---:|---|
| Rank baseline (65 KW × 9 brands) | $0.80 | 9 brands rank initialized — acilkaseniz 4/4 top-10, merrysails 0/9, pinogare 2/8 quick win |
| acilkaseniz TR comprehensive | $0.075 | **kaşe yaptırma 6,600 vol** — STRATEGIC PIVOT (acılı kaşe 0 vol brand trap) |
| kings/merry UK sub-destinations | $0.075 | Çoğu 0 vol — sub-page açma, sadece section |
| pinogare DE tourist | $0.075 | **istanbul restaurant 18,100 DE LOW comp 4** — MEGA fırsat |
| ersintattoo EN UK tourist | $0.075 | istanbul tattoo 90 LOW comp 15 — small but easy EN niche |
| merrysails/golden TR niches | $0.075 | kabataş boğaz turu 210, evlilik teklifi 0 vol (existing page audit) |

---

## 📁 Per-brand work briefs (copy-paste prompts ready)

Each brief contains a self-contained prompt user can paste into that brand's Claude Code session:
- [kingsworldtransfer.md](project-prompts/kingsworldtransfer.md)
- [merryturizm.md](project-prompts/merryturizm.md)
- [merrysails.md](project-prompts/merrysails.md)
- [goldensunsettour.md](project-prompts/goldensunsettour.md)
- [pinogareroofrestaurant.md](project-prompts/pinogareroofrestaurant.md)
- [rentacarsaw.md](project-prompts/rentacarsaw.md)
- [sawrentacar.md](project-prompts/sawrentacar.md)
- [ersintattoo.md](project-prompts/ersintattoo.md)
- [acilkaseniz.md](project-prompts/acilkaseniz.md)

---

## 🔍 Finding 2026-05-17 — Kings/Merry UK Airport Transfer Market

| Keyword | Vol/mo (UK) | CPC | Comp | Page target |
|---|---:|---:|---|---|
| **antalya airport transfer** | **2,900** | $2.65 | HIGH 68 | **NEW pillar — `/antalya-airport-transfer`** |
| **dalaman airport transfer** | **1,300** | $2.55 | MED 55 | **NEW pillar — `/dalaman-airport-transfer`** |
| **istanbul airport transfer** | **1,000** | $4.21 | MED 61 | Existing — boost authority |
| **bodrum airport transfer** | **590** | $1.77 | **MED 36** | **NEW pillar — winnable low-comp** |
| antalya airport private transfer | 480 | $2.90 | MED 61 | Subsection of antalya pillar |
| dalaman → fethiye | 70 | $2.86 | HIGH 71 | Subsection |
| istanbul airport private transfer | 50 | $2.64 | MED 37 | Existing |
| istanbul airport pickup | 40 | $5.23 | HIGH 81 | Skip (high comp) |
| istanbul airport vip transfer | 10 | $3.49 | HIGH 90 | Skip (low vol) |
| istanbul airport mercedes vito | 0 | — | — | **Skip — 0 vol, not searched** |
| antalya to cappadocia transfer | 0 | — | — | Skip |
| mugla airport transfer | 0 | — | — | **Skip — "Muğla" is not searched, use "Dalaman" / "Bodrum"** |

### 🎯 Actionable conclusions
1. **Reorder content priority**: Antalya > Dalaman > Istanbul > Bodrum. Previous assumption (Istanbul first) was wrong.
2. **Bodrum 590 vol with MED comp 36** = easiest winnable keyword in the set. Open new page.
3. **"Muğla airport"** has zero search volume — don't use this term. Use **"Dalaman"** (cluster keyword for Mugla region airport) or **"Bodrum"**.
4. **"Istanbul airport mercedes vito"** = 0 vol → drop this from LBM prompt set.
5. UK CPC range $1.77-5.23 — Google Ads ROI calculation: at 5% CTR + 2% conversion = need EUR 50+ booking margin to break even on Antalya HIGH comp keywords.

### ⏭️ Next pull suggestions (DO NOT auto-run, wait for user)
- DE location (2276) airport transfer — gurbetçi traffic for rentacarsaw + kings
- US location (2840) — US tourists searching same kw
- TR location (2792) — domestic Antalya/Dalaman searchers (turist transfer iç pazar)
- 2-3 longtail variants: "private transfer antalya to alanya", "antalya airport mercedes", etc

---

## 🤖 AI Visibility Status

**LBM (cancelled 2026-05-17)** — refund requested via WhatsApp support. 24 credits burned on failed scan, transcript null on all 3 models.

**Replacement strategy** — under evaluation:
- DataForSEO `ai_optimization/llm_mentions/search/live` endpoint (lib already wired in `src/lib/dataforseo.ts:197`)
- Test pending: 1 query @ ~$0.005 to verify endpoint actually returns useful AI mention data

**Custom OpenRouter script** — fallback if DataForSEO LLM mentions endpoint is insufficient. Estimated $20-30/mo for 10 brands × 150 prompts × weekly.

---

## 📋 Prompt Sets (frozen — used for both LBM-era and any future scanner)

### merrysails / goldensunsettour (EN)
1. best sunset cruise istanbul
2. istanbul dinner cruise with turkish show
3. private yacht rental bosphorus istanbul
4. bosphorus cruise small group tour

### kingsworldtransfer (EN, foreign tourist)
1. istanbul airport vip transfer service
2. antalya airport private transfer mercedes
3. dalaman airport transfer to fethiye
4. mugla bodrum airport luxury transfer

### merryturizm (EN, foreign tourist)
1. istanbul airport transfer tursab licensed
2. antalya private transfer vito
3. dalaman private transfer service
4. mugla airport vip transfer

### pinogareroofrestaurant (EN, tourist Sirkeci)
1. best rooftop restaurant istanbul sirkeci
2. istanbul restaurant with bosphorus view
3. romantic dinner restaurant sultanahmet
4. rooftop bar istanbul old city

### rentacarsaw (DE primary, gurbetçi)
1. mietwagen istanbul flughafen sabiha
2. auto mieten istanbul gurbetci günstig
3. günstig auto mieten istanbul ohne kaution
4. cheap car rental istanbul airport (EN catch)

### sawrentacar (EN)
1. saw rent a car istanbul reviews
2. istanbul car rental sabiha gokcen
3. rent suv istanbul long term

### ersintattoo (TR)
1. bakırköy dövmeci tavsiye
2. istanbul minimal dövme stüdyosu

### acılkaseniz (TR)
1. istanbul acılı kaşe sipariş
2. online acıl kaşe en yakın

---

## 🔑 Decisions made 2026-05-17

1. **LBM cancelled** — 200 check/mo budget insufficient for 150 prompt × 10 brand scale ($1,755/mo would be needed)
2. **Serpstat cancelled** — Pro plan didn't include API access (32011 error), refund via WhatsApp support
3. **DataForSEO chosen as primary** — $50 balance, $5-10/mo cap
4. **Cache TTL 10 days** — same data within 10 days not re-pulled
5. **Semrush** — shared Guru account, MANUAL audit only, NOT via MCP (ban risk)

## 🚨 Semrush audit priorities (apply to ALL 10 brands)

### P0 — Fix this week
- Structured data invalid (rich results blocker)
- Hreflang conflicts (locale routing broken)
- 4xx errors (crawl budget waste)
- Broken internal links (link juice loss)
- Duplicate title tags
- Duplicate meta descriptions

### P1 — Fix this month
- Title length > 60 char
- Orphaned sitemap pages
- Deep pages (3+ clicks to reach)

### P2 — Ignore
- Low text-HTML ratio (modern sites normal)
- Large JS/CSS warning (use Lighthouse instead)
- Blocked from crawling (admin routes — correct)
- Permanent redirects (correct SEO hygiene)
