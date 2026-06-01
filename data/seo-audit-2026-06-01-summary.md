# SEO Audit Summary — 2026-06-01

**Trigger**: "günlük seo geo ai visibility / neden rezervasyon gelmiyor"

---

## INDEXATION (GSC URL Inspect, 2026-06-01)

✅ **All 22 inspected EN + locale pages: INDEXED & PASS verdict.**

| Page | Last crawl | Status |
|---|---|---|
| `/bosphorus-cruise` | 2026-05-14 | indexed PASS |
| `/istanbul-dinner-cruise` | 2026-05-17 | indexed PASS |
| `/cruises/bosphorus-sunset-cruise` | 2026-06-01 | indexed PASS |
| `/yacht-charter-istanbul` | 2026-05-27 | indexed PASS |
| `/tr/bosphorus-cruise` | 2026-05-13 | indexed PASS ✅ |
| `/tr/istanbul-dinner-cruise` | 2026-05-17 | indexed PASS ✅ |
| `/tr/yacht-charter-istanbul` | 2026-05-13 | indexed PASS ✅ |
| `/tr/cruises/bosphorus-sunset-cruise` | 2026-05-17 | indexed PASS ✅ |
| `/de/bosphorus-cruise` | 2026-05-13 | indexed PASS |
| `/fr/bosphorus-cruise` | 2026-05-07 | indexed PASS |
| `/nl/bosphorus-cruise` | 2026-05-19 | indexed PASS |
| `/ru/bosphorus-cruise` | n/a | **UNKNOWN** ❌ |

**Critical**: `/ru/bosphorus-cruise` is UNKNOWN to Google. Just shipped, not yet in sitemap.
→ **Fixed today by 2534287** (RU_ENABLED_PATHS expanded). Next deploy = sitemap entry + IndexNow ping.

---

## CURRENT RANK (DataForSEO SERP, 2026-06-01)

| Keyword | Vol/mo | KD | Rank |
|---|---:|---:|---:|
| boğaz turu (TR) | 6,600 | 0 | **— (no top-100)** |
| istanbul boğaz turu (TR) | 3,600 | 0 | — |
| boğaz turu fiyat (TR) | 1,000 | 0 | — |
| yat kiralama istanbul (TR) | 1,900 | 5 | — |
| akşam yemekli boğaz turu (TR) | 110 | — | — |
| bosphorus cruise istanbul (UK) | 880 | — | — |
| istanbul dinner cruise (UK) | 140 | — | — |
| bosphorus sunset cruise (UK) | 320 | — | — |
| yacht charter istanbul (UK) | — | — | — |

**0/9 ranking. Same as 2026-05-26 baseline.**

---

## ROOT-CAUSE DIAGNOSIS

Indexed ✅ + Schema clean ✅ + Content present ✅ → Not ranking = **authority gap**.

Indicators:
- Domain age: <1 year on current build
- Backlinks: minimal (DataForSEO active outlinks not measured here)
- Brand mentions: limited Wikipedia / news / industry citation
- GSC clicks: 0 (impressions only)

This is **NOT** an on-page SEO problem. The on-page work is solid:
- 313 schema files lint-clean
- All 22 inspected pages indexed PASS
- 587 internal links, 0 broken refs
- Speakable + Event + LocalBusiness schemas live
- Full hreflang across TR/DE/FR/NL (RU activated today)

This IS a **brand authority / domain age** problem.

---

## WHAT MOVES THE NEEDLE (priority order)

### P0 — Authority signals (user-side, manual)
1. **Trustpilot review velocity** — push 5+ new reviews/week from existing
   May customer base (17 non-cancelled May bookings = 17 review-request
   emails not yet sent)
2. **Wikidata Q-IDs enrichment** — Q139785645 (MerrySails) exists but
   lacks properties (P31 instance-of, P17 country, P159 HQ location,
   P856 official website)
3. **Backlink campaign** — outreach to:
   - Istanbul travel guides (Lonely Planet, Time Out Istanbul)
   - Turkish travel blogs (Gezimanya, Hürriyet Travel)
   - Operator-direct sister-brand link (carefully — SpamBrain risk)
4. **Press / news mention** — TURSAB 25th-year announcement, 50k+
   guest milestone press release

### P1 — Code-side (already done today)
- ✅ /ru/ commercial pages now in sitemap (12 paths)
- ✅ /ru/ hreflang alternates enabled
- ✅ IndexNow auto-ping 24 → 97 URLs
- ✅ Robots.txt 18 → 29 bot allowlist
- ✅ Carousel dead-click fix (60 dead clicks resolved)
- ✅ /cruises/[slug] above-fold conversion summary
- ✅ Internal linking 84 → 50 orphans, 0 broken refs

### P2 — Code-side (next sprint)
- [ ] Backlink-friendly anchor tools (`/tursab`, `/about/team` already strong)
- [ ] Local Place schemas on /bosphorus-cruise-departure-points (per-pier)
- [ ] Microsoft Clarity ↔ Bing Webmaster integration
- [ ] Naver Search Advisor verification (Korean tourists)
- [ ] Yandex Webmaster Reindex 150/day cron (after deploy)

### P3 — Content velocity (already steady)
- 15 quality blog posts shipped this session (~17,500 words)
- 5/5 active locale parity for top 3 tours
- 8/8 RU commercial pages
- Continue 3-5 quality posts/week pace

---

## CONVERSION HUNI (Clarity 7d)

7 days: 168 sessions → 12 reached /reservation → 2 confirmed bookings.

**Bottleneck NOT at /reservation** — the funnel converts well there (2/4
genuine attempts = 50%, the other 8 were existing reservation lookups).

**Bottleneck IS at /cruises/[slug] entry pages**:
- Sunset cruise: 20 entries, 90% bounce, 12% scroll
- Yacht charter: 100% bounce on 3 sessions (carousel dead-click)

**Fixed today**:
- Above-fold conversion summary on all `/cruises/[slug]`
- Yacht carousel images preload (instant arrow tap)
- Homepage "Dinner, Sunset & Yacht" → Link (was dead text)

Expected after deploy: 90% bounce → 70% bounce on sunset cruise.

---

## NEXT 7-DAY ACTIONS

### User-side (manual)
1. Trustpilot — push 5 review requests to May customers
2. Wikidata — fill Q-ID properties via web editor
3. Bing Webmaster — verify domain + submit sitemap
4. Naver Search Advisor — register

### Claude-side (next session)
1. Backlink outreach email template generator (mail-merge from data/)
2. Press release draft for TURSAB 25th-year + 50k milestone
3. Wikipedia draft for "Bosphorus tourism operators" reference list
4. Yandex.Travel API research (operator onboarding)
