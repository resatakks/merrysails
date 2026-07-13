# MerrySails — CAPSULE (yarınki ajanın İLK okuduğu dosya)
**Tarih:** 2026-07-13 (mode=daily) · Domain: merrysails.com · Vertical: Bosphorus cruise + yacht charter · Ads: 🔒 operatör (pasif oku)

## 📊 Snapshot mini-tablo
| Metrik | Bugün 07-13 | Önceki | Trend |
|---|---|---|---|
| GSC 28g (merkezi cache) | **355c / 42.723i / pos8.0** | 359c/43.343i (07-11) | strike:6 · ↔ hafif yumuşama |
| Google indexed | 342 (carry) | 342 | A1 **cache-miss** yine → carry 06-30 |
| index-rate | 16.9% (<%50) | 16.9% | ⚠️ prune P1 (1.553 CNI) |
| **Bing impressions** | 🎉 **07-09 imp6/clk1 · 07-10 imp21/clk2 = RECOVERY** | ~0 (30g suppression) | 🟢 sıfır-seri KIRILDI, WATCH kapandı |
| Yandex searchable | 336 | 336 | ↔ |
| Rich-results money FAIL | 2 (dinner stale + tr/bosphorus locale) | 2 | ↔ yacht+sunset PASS |
| Clarity dead/rage/JS (3g) | 11.63% / 0% / 0% | 12.39/1.09/0 | ↓ iyileşti |
| /reservation dead-click | **7/9sess** (FV-1 tentative ↓) | 88/32sess | 🟢 per-sess 2.75→0.78 |
| /yacht dead-click | **1/39sess** (FV-9 çözüldü) | 55/414sess | ✅ |
| Rez 7g (DB carry) | 18 (15 aktif €2.709 net) | 18 | ↔ güçlü |
| AI-referral (GA4 28g) | chatgpt 304↑, gemini 6, perplexity 2 | 282/6/2 | ✅ güçlü |
| Core-SEO scorecard | 12 pass / 2 fail / 22 na-weekly = %85.7 | – | fail: index-rate + rich×2 |

## 🎉 Bugün kapanan
- **R1 BING SUPPRESSION → RECOVERED.** Canlı API: 07-09 imp6/clk1 + 07-10 imp21/clk2 → kapatma eşiği (imp>5 VE clk>0) 2g aşıldı, ~30g sıfır-seri bitti. SUPPRESSION-WATCH satırı KAPATILDI. (Not: merrytourism de aynı gün recovery başladı.)
- **FV-9 /yacht dead-click ÇÖZÜLDÜ** (55→1/39sess).

## 🔴 Açık P0/P1 (yaş etiketli)
1. **[P1 · AÇIK-4g] A8 crawl-budget audit** — 1.553 CNI (%82 not-indexed, index-rate 16.9%). Weekly, **07-12 Pazar kaçtı** → bu hafta. Sınıf-kırılımı + noindex/410/sitemap-prune. Portföy darboğazı = index-RATE.
2. **[P1 · İZLE] FV-1 /reservation dead-click** — 88→7/9sess iyileşti ama N=9 küçük (hafta sonu). 1 koşu daha izle, düzelmezse session-recording.
3. **[P1] B13 REVENUE-RELEVANCE / INTENT-BRIDGE** — commercial-trafik %16.4 (<%50). vs-ferry 1.652i/9c, prices 908i/2c ~0-click, para kazandırmıyor. Body-only bridge (CTA + 134-167 answer block + BlogToPillarCta). Title FREEZE.
4. **[P1] B4 KONSOLİDASYON** — 2 commercial kanibalizasyon: (a) TR dinner pillar+kabatas, (b) boat-rental-hourly+istanbul.
5. **[P1] B5 rich-results ×2** — /dinner (stale-crawl) + /tr/bosphorus-cruise (locale-remainder). chrome_queue: request_index /dinner + validation_restart "Review snippets". Recrawl bekliyor.
6. **[P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.

## 🔒 Freeze / doktrin
- **E4 FREEZE hâlâ AKTİF** — Bing recovery başladı AMA 2 günlük; title/meta/h1/body/schema/layout toplu mutasyon YASAK, 1-2 hafta daha koru (premature churn = re-trigger). Targeted schema fix OK.
- Ads = 🔒 operatör alanı (pasif GA4 oku, öneri YOK).
- Schema: `["TouristTrip","Service"]`, ASLA Product. Captain Ahmet byline SADECE burada.
- Deploy-gap 0 (git rev-list origin/main..HEAD = 0). Merkezi GSC token + GA4 SA (534226524) CANLI.

## 🌅 Yarın ilk iş
1. A8 dead-inventory audit (1.553 CNI kırılımı) — index-RATE darboğazı, weekly gecikti.
2. Bing recovery izle (imp serisi büyüyor mu? tekrar 0'a düşerse WATCH yeniden aç).
3. /reservation dead-click 1 koşu daha izle (FV-1 low-N teyit).
4. chrome_queue işle: request_index /dinner + validation_restart "Review snippets".
5. A1 cache tazeyse R5 delta hesapla (bugün yine cache-miss'ti).
