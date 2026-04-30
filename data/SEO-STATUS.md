# MerrySails — SEO / ADS / AI Visibility Durum Raporu

**Tarih:** 2026-04-30
**Kaynak:** GSC (canlı), DataForSEO (canlı), .claude/state.json

---

## 1. SEO — Neredeyiz?

### Site Genel Durum
Site **aktif sandbox/indexasyon döneminde.** Teknik altyapı hazır, içerik var, ama domain otoritesi çok düşük.

| Metrik | Değer | Yorum |
|--------|------:|-------|
| Toplam klik (all-time) | **32** | Neredeyse tamamı brand |
| Toplam impression (all-time) | **6,798** | Site indekslendi, görünüyor |
| Ortalama pozisyon | **18.3** | Sayfa 2'de ortalama |
| CTR | **0.47%** | Çok düşük — title/meta sorunu |
| Referring domains | **35** | Çok az backlink |
| Domain rank | **0** | (DataForSEO — çok yeni) |

### Ana Sorun
**Commercial sayfalarda sıfır impression.** Bütün görünürlük blog ve bilgi içeriklerinden geliyor. `/bosphorus-cruise`, `/istanbul-dinner-cruise`, `/yacht-charter-istanbul` sayfaları top 100'de yok.

Tek istisna: `yacht charter istanbul` → rank **78** (/cruises/yacht-charter-in-istanbul)

### En Büyük GSC Fırsatı

| URL | Imp | Pos | Neden Önemli |
|-----|----:|----:|--------------|
| /blog/bosphorus-cruise-departure-points | **1,097** | 6.0 | 1 tık — başlık optimize edilirse 50+ tık/gün potansiyel |
| /blog/bosphorus-dinner-cruise-what-to-expect | 496 | 8.0 | Sayfa 1'in eşiğinde |
| /blog/best-bosphorus-cruise-istanbul-guide | 337 | 11.0 | 0 tık — CTR kırık |
| /cruises/yacht-charter-in-istanbul | 252 | 50.7 | Tek commercial görünürlük |
| /blog/bosphorus-cruise-with-kids | 246 | 5.4 | 2 tık — büyüme var |
| / (homepage) | 164 | **4.8** | 19 tık — brand aramaları |

**Aksiyon:** `/blog/bosphorus-cruise-departure-points` title/meta'sını düzelt → tek başına haftada 200+ tık potansiyeli var.

---

## 2. ADS — Ne Duruyor?

### GTM / Tag Durumu (GTM-MWVS696K, Sürüm 3)
| Tag | Durum |
|-----|-------|
| MS - Google Tag (GA4, G-9B3Q7FM7X8) | ✅ Tüm sayfalar |
| MS - Conversion Linker | ✅ Tüm sayfalar |
| MS - DataLayer Tracking Router | ✅ Tüm sayfalar |
| MS - GAds Soft Conversions | ✅ phone/whatsapp/contact/abandonment |
| MS Purchase - Reservation (server-side) | ✅ /api/google-ads/conversion |

### Conversion Events
| Event | Tetikleyen | GTM | gAds |
|-------|-----------|-----|------|
| purchase (reservation) | /api checkout | server-side | ✅ |
| phone_click | DataLayer push | ✅ | ✅ soft |
| whatsapp_click | DataLayer push | ✅ | ✅ soft |
| contact_submit_success | DataLayer push | ✅ | ✅ soft |
| booking_abandonment | DataLayer push | ✅ | ✅ soft |

### Google Ads Kampanyaları
- PMax aktif (muhtemelen) — müşteri ID bulunamadı .env'de
- Budget: günlük ~1,000 TL (PMax ≤100 TL olmalı, %10 kural)
- **TODO:** GOOGLE_ADS_CUSTOMER_ID .env'e ekle → PMax conversion goal kontrol et

---

## 3. AI Visibility

### Teknik Altyapı
| Özellik | Durum |
|---------|-------|
| robots.txt — AI bot izinleri | ✅ GPTBot, ClaudeBot, Perplexity, OAI-SearchBot, Google-Extended, Meta-ExternalAgent |
| /llms.txt | ✅ Mevcut |
| /llms-full.txt | ✅ Mevcut |
| IndexNow | ✅ Aktif |
| Structured data (schema) | ✅ Organization, TouristTrip, FAQPage, AggregateRating |
| BotVisit tracking | ✅ DB'de kaydediliyor |

### LLM Mentions (DataForSEO)
- Trial aktif (14.05.2026'ya kadar)
- **Henüz test edilmedi** — `/api/seo/rankings` çalıştırıldığında Perplexity'de 5 sorgu test edecek
- Beklenti: yeni site olduğu için LLM'lerde henüz yer almıyor

### AI Ziyaretleri (BotVisit tablosu)
- DB'de kayıt var mı kontrol edilmedi — `/admin/bot-visits` varsa oradan bak

---

## 4. GEO — Çok Dilli Durum

| Locale | Durum | Öncelik | Hedef Pazar |
|--------|-------|---------|-------------|
| EN | ✅ AKTİF | — | Global (birincil) |
| TR | ⏳ Planlandı | 4. | Lokal SEO |
| DE | ⏳ Planlandı | 1. | Alman turistler (#2 kaynak) |
| RU | ⏳ Planlandı | 2. | Rus turistler (yüksek hacim) |
| AR | ⏳ Planlandı | 3. | Körfez turistleri |
| FR | ⏳ Planlandı | 5. | Orta |
| NL | ⏳ Planlandı | 6. | Orta |

Mevcut: EN + TR + DE + FR + NL hreflang tag'leri var (5 dil için `/bosphorus-cruise` vd.)
Eksik: Gerçek TR/DE/FR/NL içerik sayfaları yok

---

## 5. Öncelikli Aksiyonlar

### 🔴 Acil (Bu Hafta)

1. **`/blog/bosphorus-cruise-departure-points` title/meta optimize**
   - 1,097 imp, pos 6, 1 tık → başlık click-bait değil, sadece net ve intent'e uygun
   - Potansiyel: pos 3-4'e çıkınca 50-100 tık/gün

2. **`/blog/bosphorus-dinner-cruise-what-to-expect` title/meta**
   - 496 imp, pos 8 → sayfa 1 eşiğinde

3. **GOOGLE_ADS_CUSTOMER_ID bul + .env'e ekle**
   - PMax conversion goal override tamamlanamıyor

### 🟡 Bu Ay

4. **Backlink kampanyası başlat**
   - 35 referring domain çok az — tur blogları, istanbul rehber siteleri outreach
   - Hedef: 6 ayda 150+ referring domain

5. **LLM Mentions ilk test**
   - Deploy sonrası `/api/seo/rankings` çalıştır → Perplexity'de MerrySails var mı?

6. **DE locale** — Alman turist profili en yüksek 2. kaynak
   - `/de/bosphorus-cruise`, `/de/istanbul-dinner-cruise` vb.

7. **Homepage H1 ekle** (şu an H1 yok — inventory'de flag'lendi)
   - `/yacht-charter-istanbul` H1 da eksik

### 🟢 Orta Vadeli

8. **TR locale** — Lokal rakiplere karşı yerel keyword ownership
9. **Rich results genişlet** — HowTo, FAQ schema ek sayfalara
10. **GSC günlük cron'u koru** — Pazartesi DataForSEO + her gün GSC

---

## 6. Monitoring Kurulumu

| Araç | Frekans | Endpoint |
|------|---------|----------|
| GSC snapshot | Her gün 07:00 UTC | /api/gsc/snapshot (cron) |
| DataForSEO SERP + Backlinks + LLM | Her Pazartesi 07:30 UTC | /api/seo/rankings (cron) |
| Google Ads safety check | 2 saatte bir | /api/google-ads/safety-check |
| Telegram günlük rapor | Her gün 20:00 | /api/telegram/daily-stats |

Manuel test: `/api/seo/test?token=mry_cron_c7ca6c3866c6ed36bd5b222ef82456f1`
(Balance + SERP 3kw + Backlinks + LLM 1 query)

---

## 7. Bütçe & Maliyet

### DataForSEO
| İşlem | Adet/hafta | Birim maliyet | Haftalık |
|-------|-----------|--------------|---------|
| SERP live (20 kw) | 20 | ~$0.006 | ~$0.12 |
| Backlinks summary | 1 | ~$0.005 | ~$0.005 |
| LLM Mentions (Perplexity) | 5 | ~$0.03 | ~$0.15 |
| **Toplam/hafta** | | | **~$0.28** |
| **Toplam/ay** | | | **~$1.10** |

Bakiye: $50 yüklü → ~45 ay sürer (MerrySails tek proje için)
6 proje için: ~$6-8/ay → hâlâ rahat

### Google Ads
- Günlük bütçe: ~1,000 TL
- PMax: ≤100 TL/gün (hedef)
- Soft conversion değerleri: phone/whatsapp 300 TL, contact 350 TL, abandonment 250 TL
