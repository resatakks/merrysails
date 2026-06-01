# Multi-Engine Visibility Attack Plan — 2026-06-01

Status snapshot (Clarity 7d):
- Google organic: 30 sessions/week
- Bing organic: 8 sessions/week ← clear momentum
- Yandex referral: 2 sessions/week
- Yahoo: 3 sessions/week

Goal: scale non-Google channels to 30-40% of organic traffic by Q4 2026.

---

## Tier 1 — IMMEDIATE WIN: Bing (8 → 30+ sessions/week)

### Why
8 sessions/week unprompted, ZERO investment. Bing AI integration =
ChatGPT + Copilot + Edge sidebar citation surface.

### Action items
- [ ] **Verify Bing Webmaster Tools** — confirm domain ownership
- [ ] **Submit sitemap** at bing.com/webmasters → Submit URLs
- [ ] **IndexNow ping** — already automated via `scripts/indexnow-on-build.mjs`
      (97 URLs auto-ping next deploy)
- [ ] **Bing Places** business listing (Istanbul, Türkiye)
- [ ] **Microsoft Clarity ↔ Bing Webmaster integration** (one-click in Clarity)
- [ ] **AI Performance panel monitoring** (Bing Webmaster → AI Performance) —
      check weekly for Copilot citation count
- [ ] **Bing-friendly schema**: Event + Service + LocalBusiness already deployed

### Expected lift
- 8 → 20 sessions/week within 4 weeks (sitemap + IndexNow speed-up)
- 20 → 30+ within 12 weeks (Bing AI surface adoption growing)

---

## Tier 2 — STRUCTURED ASIA PUSH: Naver (Korea)

### Why
Korean tourists to Türkiye: ~600k/year. Naver = 60% of Korean search market.
Currently zero Korean traffic. Naver crawls .com with proper signals.

### Action items
- [ ] **Naver Search Advisor** verification (https://searchadvisor.naver.com/)
- [ ] **Submit sitemap** via Search Advisor
- [ ] **Naver Place listing** (Korean equivalent of Google My Business)
- [ ] **Naver hreflang** opt-in via Search Advisor settings
- [ ] **Add `Yeti` to robots.txt** (✅ done 2026-06-01)

### Content gap
No Korean (ko) content. Two paths:
- **Path A — Content-light**: Set up Naver verification + Place listing only.
  English content ranks for Korean tourists searching in English. Low cost.
- **Path B — Full Korean locale**: Add /ko/ pages (sunset, dinner, yacht).
  Estimated effort 3-5 hours per top-3 tour. Defer to Q3 2026.

### Expected lift
- Path A: 1-3 sessions/week within 8 weeks
- Path B: 10-30 sessions/week if /ko/ pages launched

---

## Tier 3 — RUSSIA / CIS: Yandex.Travel (already invested)

### Status
- 8 commercial pages now have full /ru/ locale (just shipped)
- 6 RU blog posts indexed
- 2 Yandex referrals/week (organic discovery)

### Action items
- [ ] **Yandex Webmaster** verification (https://webmaster.yandex.com/)
- [ ] **Reindex tool** — submit 150 URLs/day (quota resets 00:00 UTC)
      Daily cron candidate: priority RU URLs from URLS_TO_PING
- [ ] **Yandex.Maps business listing** (Istanbul, Türkiye)
- [ ] **Yandex.Travel** operator onboarding (deferred to Q3 2026 per CLAUDE.md)
- [ ] **Telegram channel** @merrysails — already mentioned in /ru routing,
      verify it's claimed (WhatsApp blocked in Russia from Feb 2026)

### Expected lift
- Yandex Webmaster Reindex 150/day × 30 days = 4,500 URLs forced into index
- 2 → 10-20 sessions/week from Yandex within 90 days

---

## Tier 4 — CHINESE MARKET: Sogou + Klook + Ctrip

### Why
Chinese tourists to Istanbul: ~400k/year. Baidu organic = effectively
locked without ICP licence (.cn domain). Pragmatic path = secondary
engines + booking platforms.

### Engine strategy
- **Baidu** — Allow in robots (✅ done), low ROI without .cn domain.
- **Sogou** — Crawls .com domains. Allow in robots (✅ done).
- **360 Search (Haosou)** — Allow in robots (✅ done).
- **Petal (Huawei)** — Allow in robots (✅ done).

### Platform strategy (HIGHER ROI than Baidu SEO)
- [ ] **Klook (Hong Kong)** operator listing — Bosphorus cruises in Klook's
      Istanbul catalogue. Most-used booking platform by Chinese tourists.
- [ ] **Trip.com / Ctrip** Chinese tourism platform listing
- [ ] **Xiaohongshu (RED) / Little Red Book** — Chinese travel content
      discovery. Travel-blogger UGC > SEO. Defer until brand budget.
- [ ] **Mafengwo** — Chinese travel community guide listing

### Content gap
No Chinese (zh-Hans / zh-Hant) content. Defer until 2027 — focus on
Klook/Ctrip placements first.

---

## Tier 5 — INDEPENDENT SEARCH: DuckDuckGo + Mojeek + Brave

### Why
Privacy-conscious EU + US visitor segment growing. DuckDuckGo pulls
from Bing index — if Bing ranks us, DDG ranks us. Brave Search has
own crawler + uses Goggle (community filter) signals.

### Action items
- [ ] **DuckDuckBot allow** ✅ done in robots.txt 2026-06-01
- [ ] **MojeekBot allow** ✅ done
- [ ] **Brave-Search allow** ✅ already in robots
- [ ] **Marginalia** allow ✅ done
- [ ] **Submit URL to Marginalia search.marginalia.nu** manually (no
      automated submission)
- [ ] **Brave Search Goggle** — community filter for tourism in Istanbul
      (advanced; defer)

---

## Tier 6 — CZECH/SLOVAK: Seznam (small but easy)

Polish/Czech/Slovak tourist segment. Seznam.cz has ~25% market share
in Czech Republic. Allow in robots ✅ done. Submission optional.

---

## Tier 7 — JAPAN: Defer to 2027

Japanese tourists to Istanbul ~120k/year. Yahoo Japan = 30% market
share, uses Google index. Google strategy covers JP without action.

---

## What we shipped 2026-06-01 (immediate)

✅ Robots.txt expansion — explicit Allow for:
   - Yeti (Naver) + Daumoa
   - Sogou web spider + Sogou inst spider
   - Baiduspider, 360Spider, HaosouSpider
   - SeznamBot, DuckDuckBot, MojeekBot, search.marginalia.nu, PetalBot

✅ IndexNow auto-ping expanded — 24 → 97 URLs on next deploy:
   - 25 EN commercial pages
   - 60 locale URLs (12 commercial × 5 active locales: tr/de/fr/nl/ru)
   - 12 featured 2026 blog posts

✅ Speakable schema on 7 commercial FAQPage schemas — voice-AI surfaces
✅ Locale pillar internal linking — TR/DE/FR/NL/RU native blog cross-links

---

## What stays manual (user-side)

1. **Bing Webmaster Tools** — verify domain + submit sitemap
2. **Naver Search Advisor** — register + verify + submit sitemap
3. **Yandex Webmaster** — Reindex tool 150/day quota
4. **Klook operator listing** — Chinese tourist booking channel
5. **Trustpilot review velocity** — third-party trust signal

---

## KPI tracking (weekly)

| Engine | Today (2026-06-01) | 4-week target | 12-week target |
|---|---|---|---|
| Google organic | 30/wk | 50/wk | 100/wk |
| Bing organic | 8/wk | 20/wk | 30/wk |
| Yandex | 2/wk | 8/wk | 20/wk |
| Yahoo | 3/wk | 5/wk | 10/wk |
| DuckDuckGo | 0/wk | 2/wk | 5/wk |
| Naver | 0/wk | 1/wk | 5/wk |
| Sogou/Baidu | 0/wk | 0/wk | 1/wk |

Track via GA4 source-medium breakdown.
