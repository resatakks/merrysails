# MerrySails — CAPSULE (yarınki ajanın İLK okuduğu dosya)
**Tarih:** 2026-07-17 (mode=daily) · Domain: merrysails.com · Vertical: Bosphorus cruise + yacht charter · Ads: 🔒 operatör (pasif oku)

## 📊 Snapshot mini-tablo
| Metrik | Bugün 07-17 | Önceki 07-15 | Trend |
|---|---|---|---|
| GSC 28g (merkezi cache) | **392c / 45.475i / pos7.9 · strike9** | 377c/44.390i/strike8 | ✅ +15c (+4.0%) devam-toparlıyor |
| GSC 7d (CANLI) | **N/A(gsc-token-EXPIRED)** | 137c WoW+3% | ⚠️ merkezi+proje token expired |
| Google indexed (A1 **FRESH** page-indexing-ui) | **341** | 342 carry | ↔ ilk taze veri (06-30'dan beri) |
| A1 not-indexed (FRESH) | CNI **1720** · disc 64 · 404 36 · noindex 6 · redirect 16(NR-9) | carry 1553 | BASELINE (method değişti, R5 YOK) |
| index-rate | **15.6%** (<%50) | 16.9% | ⚠️ A8 prune P1 (fresh sayı daha büyük) |
| Bing suppression | ✅ **RECOVERED-SUSTAINED** (07-13 imp42, seri 6/21/18/19/42) | recovered | 🟢 baseline-ÜSTÜ, watch KAPALI |
| Yandex searchable / Bing InIndex | 336 / ~478 (carry) | aynı | ↔ |
| Rich-results money (our-side) | **CLEAN** (r28 0-ihlal, 1 H1, itemReviewed live) | 2 fail | ✅ Google-side 2 recrawl bekliyor (token-blocked) |
| **/reservation dead-click** | **6.9% (29 sess)** ✅ | %36.36 (4/11) | 🟢 **FV-1 RESOLVING 36→6.9** |
| /yacht dead-click | 6.25% (48 sess) ✅ | 3.7% (1/27) | ✅ band-içi holds |
| boutique-yacht-12 | **temizlendi (N=1 noise'du)** | %22 (2/9) | ✅ sinyal düştü |
| GA4 (~28g) | 2.637 sess / 2.259 users / 1.491 keyEvents | 2.607/2.242/1.453 | ✅ ↑ |
| AI-referral (GA4 28g) | chatgpt **317**↑, gemini 8, perplexity 2 = ~327 | 307/6/2 | ✅ güçlü |
| Rez 7g (**FRESH DB**) | **16** (10 aktif · 6 iptal · **cancel %37.5**) | 18 carry (15akt/€2709) | ⚠️ cancel-rate DOUBLED (soft-watch) |
| Net-aktif gelir 7g | ~€1.160 (10 aktif; 7 "new" pipeline'da) | €2.709 stale-carry | ⚠️ true-prev7d baseline yarın |
| Core-SEO scorecard | 12 pass / 2 fail / 22 na = %85.7 | %85.7 | fail: index-rate + rich Google-side×2 |

## 🟢 Bugün olumlu
- **FV-1 /reservation dead-click ÇÖZÜLÜYOR** — %36.36(11 sess) → **%6.9(29 sess)**. Muhtemel sebep: yeni commit **fd88234** "stop Event Yacht 90 doomed reservation flow" + önceki CRO fix'ler (breadcrumb mute + package-card). Sağlam N (29). Yarın teyit → FV-1 KAPAT.
- **Bing suppression RECOVERED-SUSTAINED** — seri 6/21/18/19/**42** (07-13). Artık pre-suppression baseline (15-23/gün) ÜSTÜNDE. Sadece flicker değil, gerçek toparlanma.
- **GSC 28g +4%** (377→392c), strike 8→9, pos stabil 7.9. R2 tamamen temiz.
- **boutique-yacht-12 %22 sinyali temizlendi** — N=1 noise'du, taze veride sinyal yok.
- Rich-results our-side tam temiz (r28 0-ihlal, tüm money 1 H1, itemReviewed @id live).

## 🔴 Açık P0/P1 (yaş etiketli)
1. **[P1 · AÇIK-8g] A8 crawl-budget audit** — FRESH A1: CNI **1720** (carry 1553'ten büyük — gerçek sayı), index-rate **15.6%**. Weekly 07-12+07-13 KAÇTI. Sınıf-kırılımı + 0-imp 410-prune + sitemap senkron. **Portföy darboğazı = index-RATE.**
2. **[P1 · YENİ] GSC OAuth token EXPIRED** (hem merkezi /Users/resat/mcp-gsc/token.json hem proje .env.local) — A7 inspection, B2 striking, B11 intent-mix, B4-lite delta HEPSİ bloke. Operatör: `node scripts/gsc-oauth-refresh.mjs` veya re-auth. 28g merkezi cache çalışıyor (B1 kurtardı).
3. **[P1 · İZLE-YENİ] Rez cancel-rate %37.5** (6/16, önceki carry %16.7). 3 yacht iptali (€297/€220/€320) hepsi 07-14 CRO-block'tan ÖNCE = price-block DEĞİL. Net-aktif €1.160 vs €2.709 stale-carry ama 7 "new" pipeline'da + baseline stale. Yarın TRUE prev-7d ile karşılaştır.
4. **[P1] B13/B11 intent-bridge** (carry) — vs-ferry + prices-2026 yüksek-impr ~0-click, para kazandırmıyor. Body-only bridge (134-167 answer-block + CTA + BlogToPillarCta). Title FREEZE. (fresh B11 token-blocked)
5. **[P1] B4 kanibalizasyon** (carry) — blog prices-2026 vs commercial prices pillar; TR kabatas-dinner vs TR dinner pillar. Internal-link yönü (title DOKUNMA).
6. **[P1] B5 rich Google-side ×2** — /dinner (stale) + /tr/bosphorus (locale). chrome_queue: request_index /dinner + validation_restart. Recrawl bekliyor (token expired = Inspection verify bugün yapılamadı).
7. **[P2] Home 19.23% + vs-ferry 20% dead-click** — CRO: home entry-point'te non-interactive element tıklanıyor → teşhis + affordance fix.
8. **[P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.
9. **[P2 · İZLE] /yacht quickback 18.5%** (07-15) — price-shock mı, izle.

## 🔒 Freeze / doktrin
- **E4 FREEZE AKTİF** — Bing recovery sustained AMA temkinen title/meta/h1/body/schema/layout toplu mutasyon YASAK. Targeted schema fix + body intent-bridge (tek sayfa) OK; toplu churn YOK. (recovery 07-09'dan, ~1 hafta daha koru)
- Ads = 🔒 operatör alanı (pasif GA4 oku, öneri YOK).
- Schema: `["TouristTrip","Service"]`, ASLA Product. Captain Ahmet byline SADECE burada.
- Deploy: deploy-gap 0 (origin senkron, prod güncel curl-doğrulandı). Yeni commit fd88234 canlı. GA4 SA (534226524) CANLI. **GSC token EXPIRED → refresh gerek.**
- A12 canonical +14g recheck: **2026-07-22** (henüz DEĞİL — DMCA/301 URL'lerine dokunma).

## 🌅 Yarın ilk iş
1. **GSC token refresh** (P1 blocker) — sonra B2 striking + B11 intent-mix + A7 inspection taze çek.
2. **FV-1 TEYİT + KAPAT** — /reservation dead-click 6.9% holds mu? Evetse fix-verify'da kapat (kazanım).
3. **Rez cancel-rate TRUE prev-7d karşılaştır** — %37.5 gerçek trend mi, stale-carry artefaktı mı.
4. A8 dead-inventory audit (weekly, 2 hafta gecikti) — CNI 1720 sınıf-kırılımı.
5. Bing recovery izle (imp>0 sürüyor mu; 0'a düşerse WATCH yeniden aç).
