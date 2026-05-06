# Keyword Opportunities — 2026-05-06

**Source**: data/KEYWORDS.md (last DataForSEO 2026-04-30) + GSC 28d (2026-04-26) + Clarity 7d (2026-05-06)

## Snapshot
- 28d: 878 impressions, 0 clicks, avg pos 59.1 (sandbox phase, expected)
- 7d: 206 impressions, 0 clicks, avg pos 55.0
- 30 tracked keywords across en/tr/de/fr/nl — **NONE in top 100 yet**

---

## TIER 1 — Highest priority (volume × intent × winnable)

### EN (Turkey loc + intl)
| KW | Vol/mo | KD | Target URL | Status |
|---|---:|---:|---|---|
| **bosphorus cruise** | 6,600 | 46 | /bosphorus-cruise | not in top 100 — **needs aggressive backlink + content** |
| **istanbul boat trip** | 2,400 | 38 | /bosphorus-cruise | wide intent, blog pillar opportunity |
| **istanbul dinner cruise** | 1,600 | 40 | /istanbul-dinner-cruise | top commercial — schema fix today helps |
| **bosphorus dinner cruise** | 1,300 | 29 | /istanbul-dinner-cruise | KD 29, easier win |
| **boat tour istanbul** | 1,300 | 32 | /bosphorus-cruise | secondary content needed |
| **bosphorus cruise istanbul** | 590 | 38 | /bosphorus-cruise | exact intent |
| **bosphorus boat tour** | 590 | 32 | /bosphorus-cruise | bundle with above |
| **sunset cruise istanbul** | 480 | 27 | /cruises/bosphorus-sunset-cruise | LOW KD, top win candidate |
| **bosphorus sunset cruise** | 320 | 25 | /cruises/bosphorus-sunset-cruise | LOW KD |
| **yacht charter istanbul** | 210 | 35 | /yacht-charter-istanbul | ChatGPT already cites (6 ses/7d!) |

**Quick wins**: Sunset (KD 25-27) — already schema fix done, just needs traction + 100+ TripAdvisor reviews.

### TR (in-market organic)
| KW | Vol/mo | Target URL |
|---|---:|---|
| **yemekli boğaz turu** | 480 | /tr/istanbul-dinner-cruise |
| **istanbul vapur turu** | 320 | /tr/bosphorus-cruise |
| **boğaz turu istanbul** | 260 | /tr/bosphorus-cruise |
| **istanbul tekne turu** | 210 | /tr/bosphorus-cruise |

⚠️ Per memory: GSC 28d shows TR locale URLs **NOT INDEXED** (33 URLs not-indexed). Today's IndexNow push should kick this — monitor.

### DE (Germany)
- Volume düşük ama 0 paid competitor — bütün keywordler "bosporus kreuzfahrt", "istanbul bootstour" etc. fırsat penceresi açık.
- Schema fix (Event + AggregateRating) DE locale'de Review snippet rich result açacak.

---

## CANNIBALIZATION — Acil fix

GSC 7d cannibalization findings:

| Query | Wrong page | Should be | Action |
|---|---|---|---|
| bosphorus cruise | /blog/best-bosphorus-cruise-istanbul-guide (pos 48) | /bosphorus-cruise | Blog → pillar internal link rich up; canonical to /bosphorus-cruise considered |
| private yacht charter istanbul | /cruises/yacht-charter-in-istanbul (pos 32) | /yacht-charter-istanbul | This URL is in OWNER_REDIRECTS already → permanent 301 set, verify |

---

## Content Gap Analysis (vs competitors)

**Cited by ChatGPT/Perplexity but not us**:
1. "X price 2026" pages — we have `/blog/bosphorus-cruise-price-istanbul-2026` ✅ (3 ChatGPT ses/7d!)
   - Replicate pattern: `/blog/sunset-cruise-price-istanbul-2026`, `/blog/yacht-charter-price-istanbul-2026`
2. "Best X tours" comparison content — we have `/compare-bosphorus-cruises` ✅ (deep)
3. "Cruise vs Ferry" guides — pillar planned (per CONTENT-BRIEF.md)
4. Boarding point guides — `/blog/bosphorus-cruise-boarding-points-guide-2026` ✅
5. Year-specific updates ("2026 update") — opportunity to title-stamp existing pillars

**Missing content (commercial intent)**:
- "How long is a Bosphorus cruise" → answer-engine optimization
- "What to wear on dinner cruise" → user intent + brand affinity
- "Bosphorus cruise weather" → seasonality content (year-round bookings)
- "Bosphorus cruise with kids" → family segment (already started: /blog/bosphorus-cruise-with-kids — top 10 by Clarity!)

---

## Brand defense

ChatGPT pulling user search "MerrySails" should land on:
- / (homepage)
- /tursab (license verification)
- /about (E-E-A-T)

Brand awareness signals to monitor:
- TripAdvisor Q&A
- Reddit mentions
- Google Knowledge Graph appearance

---

## Action priority (next 2 weeks)

| Priority | Action | Owner |
|---|---|---|
| P0 | Deploy schema fix (cd72ff7) → GSC Validate Fix → 28-day monitoring | User onay |
| P0 | TripAdvisor business claim + review sprint | User |
| P1 | Locale variant 12 file Product schema (Review snippet stars locale'de açar) | Next session |
| P1 | "X price 2026" content for sunset + yacht (proven pattern) | Opus session |
| P2 | Sunset cruise targeted backlinks (KD 25-27, easiest win) | Next session |
| P2 | TR locale indexation — monitor IndexNow effect (24-48h) | Auto |
| P3 | Bing/Yandex Webmaster verify (5 dk) | User |
| P3 | DataForSEO live rank pull — extend cron to Bing | Next session |

---

## Success metrics (4-week target post-deploy)

- 0 → 5+ keyword in top 50 (any locale)
- 1,170 impressions/3m → 3,000+/3m
- 0 clicks → 50+ clicks (sandbox exit)
- ChatGPT referrals: 56/7d → 100+/7d
- Locale URLs indexed: 19/56 → 50+/56
