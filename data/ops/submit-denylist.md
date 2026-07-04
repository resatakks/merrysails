# SUBMIT DENYLIST — MerrySails (auto-submit'e girmesi YASAK URL'ler)
**Oluşturma:** 2026-07-02 · **Kapsam:** IndexNow / Bing SubmitUrlBatch / Yandex Reindex / `bulk-submit-engine.mjs` / her türlü auto-submit

> **KURAL (mutlak):** DMCA/telif şikayetine konu olmuş URL'ler otomatik submit pipeline'larına ASLA girmez. Delisted bir URL'yi arama motoruna yeniden push etmek = repeat-infringer sinyali + şikayetçiye yeni takedown gerekçesi. Auto-submit script'leri her koşuda bu dosyayı okumalı; listedeki URL'ler filtrelenmeli.

## DMCA bağlamı (bilinen gerçekler)
- **Notice:** Lumen **#86820254** · **Şikayetçi:** bosphorussunset.com (AST Tourism, TÜRSAB A-805) · **Tarih:** ~2026-05-25
- Kaynaklar: `data/cruise-deep/2026-06-16/COMPETITOR-INTEL.md:29`, `data/cruise-deep/TREND.md:14-21`, `docs/ads/MERRYSAILS-YACHT-COMPETITOR-LONGTAIL-2026-06-20.md:30`
- Etki değerlendirmesi (TREND.md): "DMCA was a blip, not a wall" — pozisyon şikayet sonrası da iyileşti; cannibalization-resolution tamamlandı.
- 2026-07-02 Inspection API taramasında kuyruktan geçen 10 URL'nin hiçbirinde legal-removal coverage state YOK (hepsi normal). Aktif money page'ler etkilenmemiş görünüyor.

## 🚫 Denylist (şikayete konu URL'ler)

| URL | Kaynak | Durum |
|---|---|---|
| _(tam liste bekleniyor — aşağıdaki operatör aksiyonu)_ | Lumen #86820254 | ⏳ doldurulacak |

## ⏳ Operatör aksiyonu (tam listeyi doldurmak için — ~5 dk, browser)
1. https://lumendatabase.org/notices/86820254 adresini **browser'dan** aç (API/curl ile ÇEKİLEMİYOR — Anubis bot-challenge; tam URL listesi için Lumen'de e-posta ile erişim istemek gerekebilir).
2. GSC UI → `sc-domain:merrysails.com` → **Kaldırmalar → "Yasal sorunlar nedeniyle kaldırıldı"** panelini kontrol et; listelenen URL'leri buraya ekle.
3. Bulunan her URL'yi yukarıdaki tabloya ekle → o URL'ler `auto-submit-log.jsonl` pipeline'ından ve `bulk-submit-engine.mjs` girdilerinden çıkarılır.

## Not
- Denylist SADECE submit engellemesi — sayfalar canlı kalabilir (deindex/410 kararı ayrı değerlendirme).
- Bing suppression (week-3) devam ederken bu markada title/meta/h1 değişikliği YOK; denylist bunun yerini tutmaz, ayrı kural.
