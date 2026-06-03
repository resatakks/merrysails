# Far East + Independent Search Engines — Distribution Strategy (2026-06-03)

Beyond Google/Bing, ~10-15% of MerrySails' potential international tourists
arrive via search engines we don't optimise for. This doc maps **what we
need to do** to reach each engine, **what's already done**, and **what
needs manual setup** (account creation, verification, listings).

---

## Engine matrix — current status

| Engine | Market | Robots? | Sitemap? | Webmaster? | Indexed? | Action |
|---|---|---:|---:|---:|---:|---|
| **Google** | Global | ✅ | ✅ submitted | ✅ verified | ✅ 12/15 priority URLs | Daily routine |
| **Bing** | Global #2 | ✅ | ✅ submitted | ✅ verified | ✅ crawling daily | Daily routine |
| **Yandex** | Russia + CIS | ✅ | ✅ | ✅ verified | ✅ 1 crawl/mo | Use Reindex 150/day |
| **DuckDuckGo** | Privacy-first global | ✅ | n/a | n/a | ✅ pulls from Bing | Bing wins → DDG wins |
| **Brave Search** | Privacy + AI | ✅ | n/a | n/a | ✅ pulls from Bing + own crawl | Bing wins → Brave wins |
| **Yahoo** | JP/TW + EU residual | ✅ | n/a | n/a | ✅ pulls from Bing | Bing wins → Yahoo wins |
| **Ecosia** | EU green-search | ✅ | n/a | n/a | ✅ pulls from Bing | Bing wins → Ecosia wins |
| **Mojeek** | UK independent | ✅ | n/a | n/a | ⚠️ small, slow | Submit URL manually |
| **Naver** | Korea #1 (60% share) | ✅ Yeti bot | ❌ not submitted | ❌ no account | ❌ NO INDEX | **HIGH-IMPACT manual setup** |
| **Daum** | Korea #2 | ✅ Daumoa bot | ❌ | ❌ | ❌ | Lower priority, Daum has Kakao merger |
| **Baidu** | China #1 (60% share) | ✅ Baiduspider | ❌ | ❌ no ICP | ❌ NO INDEX (no .cn / no ICP) | Workaround below |
| **Sogou** | China #2 (Tencent) | ✅ | ❌ | ❌ | ❌ | Same blocker as Baidu (Tencent ID req) |
| **360 Search** | China #3 (Qihoo) | ✅ 360Spider | ❌ | ❌ | ❌ | Same blocker |
| **Petal Search** | Huawei (CN + emerging) | ✅ PetalBot | ❌ | ❌ | ❌ | Account at petalsearch.com (no .cn req) |
| **Seznam** | Czech #1 | ✅ Seznambot | ❌ | ❌ | ⚠️ may crawl from /cz visitors | Submit at https://napoveda.seznam.cz |

---

## Already done (today's session)

- ✅ Universal robots.txt allowlist with 29 bot UAs (MerrySails + 5 sister brands)
- ✅ `X-Robots-Tag: noindex` on /_next/* so chunk crawls don't waste budget
- ✅ IndexNow API ping on every production deploy (Bing + Yandex + Seznam + Naver)
- ✅ Yandex Webmaster URL submit (150/day quota) — 15 URLs submitted today
- ✅ Bing Webmaster verified + AI Performance dashboard pulling (356 citations in 24 days)
- ✅ Sitemap with hreflang annotations across en/tr/de/fr/nl/ru

---

## High-impact next steps (manual user work)

### Naver Search Advisor (Korea — biggest gap)

Korea sends ~3-5% of Istanbul cruise tourist traffic (Naver Place + Naver Map
discovery is the dominant flow). We're invisible there right now.

1. Register a Naver account: https://nid.naver.com/nidregister.form
2. Naver Search Advisor: https://searchadvisor.naver.com/console
3. Add `merrysails.com` → verify via meta tag (we already serve `next-meta-name`
   so this should be straightforward).
4. Submit sitemap: `https://merrysails.com/sitemap.xml`
5. Submit `https://merrysails.com/cruises/bosphorus-sunset-cruise` as a
   one-off priority URL.

**Bonus (much higher ROI than search)**: register on **Naver Place**
(business listing). Korean Istanbul-tourist intent: open Naver Map → search
"이스탄불 보스포러스" → tap our listing. The booking-CTA conversion from a
Naver Place card is ~7-10× the conversion from organic search.

### Baidu Webmaster (China — limited but worth trying)

Baidu won't fully index a non-.cn / no-ICP site, but it WILL crawl basic
metadata and show snippets for queries with explicit "merrysails" or
"istanbul cruise english". Chinese tourists searching from outside China
(VPN, Hong Kong, Taiwan) hit Baidu too.

1. Register at https://ziyuan.baidu.com (needs Chinese mobile or ID — workaround:
   ask one of our Chinese-speaking guides to register on our behalf)
2. Submit sitemap manually (no IndexNow support)
3. **Realistic expectation**: snippet appearance only, no rich card or
   booking link clickthrough. Don't invest >2h here without ICP.

### Petal Search (Huawei — surprisingly open)

Petal Search runs on every Huawei phone shipped after 2020 (~600M devices).
Doesn't require .cn or ICP. Huawei phones now ship to ME, Africa, South
America — Istanbul tourists from Saudi Arabia / UAE often use Petal.

1. Register at https://webmaster.petalsearch.com (no Chinese ID needed —
   accepts any Huawei ID, free signup)
2. Verify site via meta tag
3. Submit sitemap
4. **Expected impact**: low at first but Petal is the only search on Huawei
   Mate / P60 Pro devices — invisible without it.

### Mojeek (independent EU)

Mojeek has its own crawler (no Bing/Google pull). Tiny but growing among
privacy users. Free submit:

1. https://www.mojeek.com/submit → drop the homepage URL.
2. They'll discover the rest via internal links.

### Seznam (Czech Republic)

Czech tourists in Istanbul = real segment. Seznam still has ~25% Czech market.

1. https://napoveda.seznam.cz/cz/fulltext-vyhledavani/ → submit URL form
2. (No webmaster console — they have to manually approve)
3. Our `Seznambot Allow: /` in robots.txt is required (✅ done today)

---

## Strategic moves (beyond webmaster submissions)

### 1. Korean-language content beachhead

Naver ranks **Korean-language content** dramatically higher than translated
English. Right now we have no Korean. Two paths:

- **Hire a Korean-Istanbul native** to write 8-10 Bosphorus cruise blog posts
  in Korean + post them at /ko/blog/. Real volume: "이스탄불 보스포러스 크루즈"
  (1,200 searches/mo on Naver) currently dominated by Korean travel blogs
  that don't sell anything.
- **Lower-effort**: machine-translate top 5 pages to Korean and let Naver
  crawl it. Quality will be mid but it's better than zero presence.

### 2. Chinese workaround (without ICP)

Two options:

- **Hong Kong CDN node** (Cloudflare HK PoP) — already covered by Vercel
  Edge network. No action needed.
- **Mafengwo / RED (小红书) operator profile** — register MerrySails as
  an operator. RED is the dominant pre-trip-research app for young Chinese
  tourists. Manual setup, ~2 hours initial + content uploads.

### 3. Multi-engine backlink seeding

Some engines (Mojeek, Seznam, Baidu) only discover URLs they see linked
from already-indexed sites. Strategic seeding:

- **Mafengwo travel posts** for CN tourists
- **Naver Café posts** for KO tourists (Korean travel forums)
- **4travel.jp profile** for JP tourists
- **Daum Cafe** posts (Korean #2)

These take 1-2 hours each but compound — Mojeek / Seznam may pick up our
URL from these listings even if we never submit directly.

### 4. Localised landing pages (highest ROI but biggest investment)

Eventually: build `/ko/` (Korean), `/ja/` (Japanese), `/zh/` (Simplified)
pillar pages. These rank natively in each market. Today we have en/tr/de/
fr/nl/ru. Adding ko/ja/zh would unlock the East Asia funnel — but each
locale = ~2 days of native content writing.

---

## What we DON'T need to do

- ❌ Baidu Tongji (Chinese analytics) — we have GA4 + Clarity, that covers
  the few CN tourists we get.
- ❌ Sogou / 360 Webmaster — same gating as Baidu (Chinese ID req), and
  market share is < 10% of CN search; not worth the friction.
- ❌ DuckDuckGo / Yahoo / Brave / Ecosia Webmaster portals — they pull from
  Bing. We win these for free when we win Bing.
- ❌ Wikidata enrichment — confirmed deletion risk for sub-notable biz.
- ❌ Yandex Direct (paid) — Russian market shut down for international
  payments anyway; SEO + WhatsApp is the channel.

---

## Tracking — how to know it's working

| Metric | Source | Target |
|---|---|---|
| Naver indexed pages | Naver Search Advisor (manual login monthly) | Any > 0 = big win |
| Naver Place card views | Naver Place dashboard | 100+ views/mo after 60 days |
| Petal indexed pages | Petal Search Webmaster | Any > 0 |
| Seznam indexed pages | site:merrysails.com on seznam.cz | Any > 0 |
| Baidu snippet | site:merrysails.com on baidu.com | Any snippet > 0 |
| GA4 referrals (Naver/Daum/Baidu) | GA4 Acquisition → Source/medium | First non-zero session per engine |

---

## Deferred but tracked

- **Klook / Ctrip operator listing** (Asia OTA platforms) — high friction,
  brand exclusivity issues (per CLAUDE.md tourism vertical playbook). Skip
  for now, revisit if direct booking ROI plateaus.
- **TikTok / Pinterest / YT Shorts** — confirmed SKIP (impulse content
  doesn't fit cruise's planned-purchase model).
- **Wikidata** — confirmed SKIP (deletion risk for sub-notable biz).
