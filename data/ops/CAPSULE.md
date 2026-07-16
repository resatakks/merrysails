# MerrySails — CAPSULE (yarınki ajanın İLK okuduğu dosya)
**Tarih:** 2026-07-15 (mode=daily) · Domain: merrysails.com · Vertical: Bosphorus cruise + yacht charter · Ads: 🔒 operatör (pasif oku)

## 📊 Snapshot mini-tablo
| Metrik | Bugün 07-15 | Önceki | Trend |
|---|---|---|---|
| GSC 28g (merkezi cache) | **377c / 44.390i / pos7.9** | 355c/42.723i (07-13) | strike:8 · ↑ toparlıyor |
| GSC 7d (CANLI) | **137c / 16.038i / pos7.39** | 133c prev-7d | ✅ WoW clicks **+3.0%**, impr +13.6% |
| Google indexed | 342 (carry 06-30) | 342 | A1 **cache-miss** yine → carry |
| index-rate | 16.9% (<%50) | 16.9% | ⚠️ A8 prune P1 (1.553 CNI) |
| Bing suppression | ✅ **RECOVERED** (watch KAPALI) | 07-10 imp21/clk2 | 🟢 |
| Yandex searchable / Bing InIndex | 336 / ~478 (carry) | aynı | ↔ |
| Rich-results money FAIL | 2 (/dinner stale + /tr/bosphorus locale) | 2 | ↔ yacht+sunset PASS |
| **/reservation dead-click** | **%36.36 (4/11) — AÇIK** ⚠️ | 7/9 (07-13) | 🔴 FV-1 çözülmedi |
| /yacht dead-click | 3.7% (1/27) ✅ | 1/39 | ✅ FV-9 holds (quickback 18.5% izle) |
| YENİ /yacht.../boutique-yacht-12 | **%22 (2/9)** | – | ⚠️ kart-clickability |
| GA4 (~28g) | 2.607 sess / 2.242 users / 1.453 keyEvents | 2.467/2.115/1.388 | ✅ ↑ |
| AI-referral (GA4 28g) | chatgpt 307↑, gemini 6, perplexity 2 | 304/6/2 | ✅ güçlü |
| Rez 7g (DB carry) | 18 (15 aktif €2.709 net) | 18 | ↔ (fresh pull yok) |
| Core-SEO scorecard | 12 pass / 2 fail / 22 na = %85.7 | %85.7 | fail: index-rate + rich×2 |

## 🟢 Bugün olumlu
- **R2 soft-watch RESOLVED** — GSC 7d WoW clicks +3.0% (137 vs 133); 07-11'in -13.8%'i small-N noise'du. 28g 355→377 toparlıyor.
- Bing suppression RECOVERED (watch kapalı, IndexNow/SubmitUrlBatch günlük sürüyor).
- Yacht CRO rival-price bloğu (07-14 commit 85b7e2e) prod'da CANLI (curl doğrulandı).

## 🔴 Açık P0/P1 (yaş etiketli)
1. **[P1 · AÇIK-6g] A8 crawl-budget audit** — 1.553 CNI, index-rate 16.9%. Weekly 07-12 KAÇTI. Sınıf-kırılımı + 410-prune + sitemap senkron. **Portföy darboğazı = index-RATE.**
2. **[P1 · AÇIK] FV-1 /reservation dead-click ÇÖZÜLMEDİ** — %36 (4/11), rage 0. Kart/masked-price click yutuyor. Session-recording + package kart full-clickable `<label>` + masked-price pointer-events:none. Kod-session.
3. **[P1 · YENİ] /yacht.../boutique-yacht-12 %22 dead-click** — muhtemelen FV-1 ile aynı pattern → tek kod-session.
4. **[P1] B13/B11 intent-bridge** — vs-ferry 2.215i/10c + prices-2026 1.400i/5c ~0-click, para kazandırmıyor. Body-only bridge (134-167 answer-block + CTA + BlogToPillarCta). Title FREEZE.
5. **[P1] B4 kanibalizasyon** — (a) blog prices-2026 vs commercial prices-istanbul pillar; (b) TR kabatas-dinner + TR dinner pillar. Internal-link yönü (title DOKUNMA).
6. **[P1] B5 rich-results ×2** — /dinner (stale) + /tr/bosphorus (locale). chrome_queue: request_index /dinner + validation_restart. Recrawl bekliyor.
7. **[P2] B2 striking** — /bosphorus-cruise pos4.6 top-3'e çok yakın → internal-link push (title DEĞİL).
8. **[P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.

## 🔒 Freeze / doktrin
- **E4 FREEZE AKTİF** — Bing recovery henüz taze; title/meta/h1/body/schema/layout toplu mutasyon YASAK. Targeted schema fix + body intent-bridge (tek sayfa) OK; toplu churn YOK.
- Ads = 🔒 operatör alanı (pasif GA4 oku, öneri YOK).
- Schema: `["TouristTrip","Service"]`, ASLA Product. Captain Ahmet byline SADECE burada.
- Deploy: git push-gap 3 commit (07-14 CRO/CWV) AMA prod güncel (vercel --prod, curl doğrulandı). Merkezi GSC token + GA4 SA (534226524) CANLI.

## 🌅 Yarın ilk iş
1. A8 dead-inventory audit (1.553 CNI kırılımı) — weekly gecikti, index-RATE darboğazı.
2. FV-1 /reservation session-recording teşhis (%36 hâlâ) + boutique-yacht-12 aynı kod-session.
3. chrome_queue işle: request_index /dinner + validation_restart "Review snippets".
4. Bing recovery izle (imp serisi büyüyor mu? 0'a düşerse WATCH yeniden aç).
5. A1 cache tazeyse R5 delta hesapla (bugün yine cache-miss).
