# SAW Rent a Car — Session Brief (2026-05-17)

## Current state
- **Domain**: sawrentacar.com (operator brand)
- **Sister**: rentacarsaw.com (broker — Kolaycar panel)
- **AI visibility**: 22-50% (brand-direct sorgularda gpt+claude tanıyor, perplexity yok)
- **Tier**: B (light attention)

## 🔥 TR Market (en güçlü)

### Pillar (live)
- antalya araç kiralama 14,800 ✅
- aylık araç kiralama 14,800 ✅
- ankara araç kiralama 9,900 ✅
- izmir araç kiralama 8,100 ✅
- sabiha gökçen araç kiralama 5,400 ✅
- trabzon araç kiralama 3,600 ✅
- vip araç kiralama 1,200 ✅

### Backlog (yüksek vol, deploy bekleyenler)
- türkiye araç kiralama 22,000 ⏳
- istanbul araç kiralama 14,800 ⏳
- istanbul havalimanı araç kiralama 5,400 ⏳
- bodrum araç kiralama 4,400 ⏳
- antalya havalimanı araç kiralama 6,600 ⏳
- dalaman araç kiralama 2,900 ⏳

## 🏆 Priority THIS WEEK
1. `/turkiye-arac-kiralama` HUB — 22,000 vol (en büyük backlog)
2. `/istanbul-arac-kiralama` — 14,800 vol
3. `/istanbul-havalimani-arac-kiralama` — 5,400 vol
4. `/bodrum-arac-kiralama` — 4,400 vol
5. `/antalya-havalimani-arac-kiralama` — 6,600 vol

---

## ⭐ COPY-PASTE PROMPT for sawrentacar session

```
SESSION CONTEXT (2026-05-17): 9-brand monitoring tarandı. SAW (operator) için bulgular:

📊 BUGÜNKÜ BULGULAR
- AI visibility: 22-50% (gpt+claude marka adını tanıyor — brand-direct sorgularda 50% hit)
- Perplexity (web search) henüz cite etmiyor
- Mevcut keyword listesi: KEYWORD-STRATEJISI-100PLUS-2026-05-11.md
- 65 KW arasından 7'si deploy, 58'i bekliyor
- Tier B — light attention (sister rentacarsaw broker'a öncelik)

🎯 BU HAFTA YAPILACAKLAR (mevcut backlog)

1. **`/turkiye-arac-kiralama` HUB PILLAR** (en büyük tek fırsat — 22,000 vol/ay)
   - 2,500-3,000 kelime
   - H1: "Türkiye Araç Kiralama 2026 — Tüm Şehirlere Hızlı, Güvenli"
   - Hub layout: Antalya, Istanbul, Ankara, Izmir, Trabzon, Bodrum, Dalaman cards
   - Geographic coverage map
   - Pricing tier table
   - FAQ 10+ soru
   - Schema: Service + LocalBusiness + Offer

2. **`/istanbul-arac-kiralama` pillar** (14,800 vol)
   - 2,000 kelime
   - Istanbul-specific: trafik, otopark, köprü ücreti, otoyol etiketi
   - Sabiha + Istanbul Airport pickup
   - District-by-district price guide
   - FAQ 8+

3. **`/istanbul-havalimani-arac-kiralama`** (5,400 vol)
   - 1,800 kelime
   - IST airport-specific pickup procedure
   - Pickup hours, döner kapı, parking levels
   - Counter location detail

4. **`/bodrum-arac-kiralama`** (4,400 vol)
   - 1,800 kelime
   - Bodrum tatil mood + araç kiralama logistics
   - Marina pickup, ferry transfers
   - Gümbet, Turgutreis, Yalıkavak coverage

5. **`/antalya-havalimani-arac-kiralama`** (6,600 vol)
   - 1,800 kelime
   - Same template as Istanbul airport

📝 HER PILLAR GEREKSİNİMLERİ
- 1,800-3,000 kelime
- H1 primary kw + "2026" + value prop
- 8+ FAQ + FAQPage schema
- Service + LocalBusiness + Offer + AggregateRating schema
- Internal links 5+ (city hub'a)
- WhatsApp + telefon CTA
- TL trafik kuralları + sigorta açıklama
- AI-friendly TL;DR başta

🔗 OFF-SITE BU HAFTA
- Trustpilot TR profile (eğer yoksa)
- GBP optimize — multi-city (Antalya, Istanbul, Ankara şubeler varsa)
- Bing Places

🤖 AI VISIBILITY için
- Brand-direct (Saw, sawrentacar) sorgularda görünür — bu iyi
- Generic sorgularda invisible — comparison listicle ile yakala:
  - /blog/sixt-vs-saw-premium-2026
  - /blog/yolcu360-vs-saw-2026
  - /blog/enuygun-vs-direkt-2026
  (Bu blog draft'ları zaten hazır — KEYWORD-STRATEJISI-100PLUS dosyasında not var)

🔗 YAYIN SONRASI
- IndexNow ping
- GSC URL inspect
- llms.txt update

DEPLOY
- Max 1/gün
- Lokal build önce

Başla #1 (Türkiye Araç Kiralama hub). Bitince haber ver.
```
