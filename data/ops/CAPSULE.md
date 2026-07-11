# MerrySails — CAPSULE (yarınki ajanın İLK okuduğu dosya)
**Tarih:** 2026-07-11 (mode=daily) · Domain: merrysails.com · Vertical: Bosphorus cruise + yacht charter · Ads: 🔒 operatör (pasif oku)

## 📊 Snapshot mini-tablo
| Metrik | Bugün 07-11 | Önceki | Trend |
|---|---|---|---|
| GSC clicks 7g (07-03→07-09) | **112** | 130 (prev-7g) | ↓ -13.8% WoW (SOFT-WATCH, small-N; impr +9.9%, pos 7.21 iyileşti) |
| GSC 28g (merkezi cache) | 359c/43.343i/pos7.9 | – | strike:6 |
| Google indexed | 342 (carry) | 342 | A1 **cache-miss** bugün → carry 06-30 |
| Bing impressions | ~0 (07-07 imp=1 tek flicker) | 0 | 🟡 suppression **~gün 33/week 5**, recovery YOK |
| Yandex searchable | 336 | 336 | ↔ |
| Rich-results money FAIL | **2** (dinner+tr/bosphorus) | 4 | ✅ /yacht+/sunset PASS (FV-5 validated) |
| Clarity dead/rage/JS (3g) | 12.39% / 1.09% / 0% | 12.52/1.09/0 | ↔ band içi |
| Rez 7g (DB) | **18** (15 aktif €2.709 net) | 18 | ↔ güçlü |
| AI-referral (GA4 ~28g) | chatgpt 282, gemini 6, perplexity 2 | – | ✅ güçlü |

## 🔴 Açık P0/P1 (yaş etiketli)
1. **[P1 · ESKALE] /reservation 88 dead-click** — FV-1 fix (`c98ca49`+`b169c81`) deploy edildi AMA verify BAŞARISIZ (07-10'da 80, düşmedi). Session-recording ile YENİDEN teşhis. (kod-session)
2. **[P1 · AÇIK-2g] A8 crawl-budget audit** — 1.553 CNI (%82 not-indexed, index-rate ~16.9%). next_due **07-12 yarın weekly**. Sınıf-kırılımı + noindex/410/sitemap-prune.
3. **[P1 · YENİ] /yacht-charter-istanbul 55 dead-click** — post yacht-redesign (FV-9). Element-fix. (kod-session)
4. **[P1] INTENT-BRIDGE** — vs-ferry 1.652i/9c, prices-istanbul 908i/2c ~0-click. Body-only bridge (CTA + 134-167 kelime answer block + BlogToPillarCta). Title FREEZE.
5. **[P1] B4 KONSOLİDASYON** (Pazar) — 2 commercial kanibalizasyon: (a) TR dinner pillar+kabatas, (b) YENİ boat-rental-hourly+boat-rental-istanbul.
6. **[P2] Bing suppression week 5 gün 33** — FREEZE + submit + sabır. Week 6 eskalasyon eşiği çok yakın (Pazar A11).
7. **[P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.

## ✅ Bugün kapanan
- **FV-5 → 2/4 VALIDATED** (/yacht + /sunset rich=PASS Google-side, Inspection API 07-10).
- **FV-8 → ÇÖZÜLDÜ** (/tr/bosphorus-cruise "Submitted and indexed"e döndü).
- FV-5 locale-remainder fix (`4897c8f` deploy azhej7kg6) + r33 lint kuralı (başka session).

## 🔒 Freeze / doktrin
- **E4 FREEZE aktif** (Bing suppression): title/meta/h1/body/schema/layout toplu mutasyon YASAK. Targeted schema fix (bugünkü 4897c8f) OK.
- Ads = 🔒 operatör alanı (pasif GA4 oku, öneri YOK).
- Schema: `["TouristTrip","Service"]`, ASLA Product. Captain Ahmet byline SADECE burada.
- Deploy-gap 0 (prod senkron). Merkezi GSC token + GA4 SA (534226524) CANLI.

## 🌅 Yarın ilk iş
1. A8 dead-inventory audit (weekly, 1.553 CNI kırılımı) — portföy darboğazı index-RATE.
2. chrome_queue işle: request_index /istanbul-dinner-cruise + validation_restart "Review snippets".
3. /reservation dead-click session-recording (FV-1 yeniden teşhis).
4. A1 cache tazeyse R5 delta hesapla (bugün cache-miss'ti).
