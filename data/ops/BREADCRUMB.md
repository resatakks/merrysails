# MerrySails — BREADCRUMB (fresh-session onboarding izi)
**Güncelleme:** 2026-07-17 (mode=daily)

## 📅 2026-07-17 VERİ (bugünkü snapshot)
- **GSC 28g:** 392c / 45.475i / pos7.9 · strike9 (merkezi cache; +15c/+4% vs 07-15). **GSC 7d CANLI = N/A — OAuth token EXPIRED (merkezi + proje).**
- **Index:** Google **341** indexed (A1 FRESH page-indexing-ui, 06-30'dan beri ilk taze) · not-indexed CNI **1720** / disc 64 / 404 36 / noindex 6 / redirect 16(NR-9) → index-rate **15.6%** (<%50, prune darboğazı).
- **Engine sağlığı:** Google ✅ toparlıyor · **Bing ✅ RECOVERED-SUSTAINED** (imp seri 6/21/18/19/42, baseline-üstü) · Yandex searchable 336 · InIndex ~478.
- **AI:** GA4 AI-referral chatgpt **317** / gemini 8 / perplexity 2 = ~327 sess (~%12) — güçlü, chatgpt ezici.
- **Rez (FRESH DB 7g):** 16 total → 10 aktif (3 confirmed + 7 new) + 6 iptal → **cancel-rate %37.5** (carry %16.7'den DOUBLED). Net-aktif ~€1.160. Baskın tur: bosphorus-sunset-cruise (düşük değer €34-150). Sadece 1 gclid (Ads etkisi minimal, organik/direct baskın).
- **Clarity:** /reservation dead-click **6.9%/29 sess** (36→6.9 RESOLVING) · /yacht 6.25%/48 · rage **0%** · JS-err **0%** · home 19.23% · vs-ferry 20%.

## 📈 GEÇMİŞ (7g/30g trend)
- GSC 28g 5 koşuda: 355(07-13)→377(07-15)→**392(07-17)** — istikrarlı toparlanma, strike 6→8→9. R2 soft-watch (07-11 -13.8% WoW) small-N noise'du, çözüldü.
- Bing ~30 gün suppression (06-09→07-08 imp~0) → 07-09 kırıldı → şimdi SUSTAINED recovery (07-13 imp42, pre-supp baseline 15-23 üstünde).
- GA4 sürekli ↑ (2.467→2.607→2.637 sess). AI chatgpt 282→304→307→317 sürekli artıyor.
- index-rate uzun süre ~%16-17 platoda takılı — içerik volümü değil INDEX-RATE portföy darboğazı.

## ✅ NE YAPTIK (bugün + son koşular)
- **Bugün:** auto-submit 15 URL (IndexNow 200/202, Bing batch 200 q77, Yandex 15/15 202). FRESH DB rez pull. FRESH A1 page-indexing-ui (06-30'dan beri ilk). Bing recovery SUSTAINED doğrulandı. Rich-results our-side tam denetim (r28 0-ihlal, 1 H1, itemReviewed live). E7-light temiz.
- **Son koşular:** commit **fd88234** "stop Event Yacht 90 doomed reservation flow" (07-16, canlı) → FV-1 /reservation dead-click 36→6.9 çöküyor. Yacht CRO rival-price bloğu (85b7e2e), CWV defer framer-motion (39b8699), breadcrumb-mute (02a1e47) hepsi deploy. Bing suppression recovery + /yacht FV-9 çözüldü.

## ⏳ BEKLEYEN (açık P0/task + sonraki iş)
1. **GSC OAuth token refresh** (P1 blocker) — A7 inspection + B2 striking + B11 intent-mix bloke. `scripts/gsc-oauth-refresh.mjs`.
2. **A8 crawl-budget audit** (P1, weekly 2 hafta gecikti) — CNI 1720 sınıf-kırılımı + 410-prune + sitemap senkron.
3. **FV-1 teyit + kapat** — /reservation 6.9% holds ederse kapat.
4. **Rez cancel-rate %37.5 izle** — yarın true prev-7d ile karşılaştır (gerçek trend mi, stale-carry artefaktı mı).
5. **Intent-bridge + B4 kanibalizasyon** (carry, token-blocked) — vs-ferry/prices body-bridge + internal-link (title FREEZE).
6. **chrome_queue:** request_index /istanbul-dinner-cruise + validation_restart "Review snippets" (post-sweep Chrome fazı).
7. **Operatör:** Yandex Business kaydı (NOT_IN_SPRAV) + Lumen #86820254 DMCA URL listesi.
- Fix-verify: FV-1 (resolving), FV-5 (Google-side 2 pending recrawl), FV-7/A8 (crawl-budget). Inspect-queue: doğrulanmış-unindexed money page YOK.
