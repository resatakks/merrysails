# MerrySails — SEO & Faydalı İçerik Denetimi

**Tarih:** 10 Mart 2026  
**Kapsam:** Blog (72 yazı), sayfalar (cruises, guides, statik), Google faydalı içerik / E-E-A-T uyumu.

---

## 1. ÖZET — Uyumluluk

| Alan | Durum | Not |
|------|--------|-----|
| **Meta title** | ✅ İyi | Çoğu 40–59 karakter; birkaçı 60’a yakın veya biraz kısa |
| **Meta description** | ✅ İyi | Her blog/sayfada var, CTA/vaat içeriyor |
| **Canonical** | ✅ | Tüm sayfalarda `alternates.canonical` |
| **Schema** | ✅ | Blog: Article + FAQ + BreadcrumbList; Ana sayfa: WebSite + TravelAgency; Cruises/guides: Breadcrumb |
| **H1 / başlık hiyerarşisi** | ✅ | Blog’da tek H1 (title), H2/H3 sections ile tutarlı |
| **İçerik derinliği** | ✅ | Uzun, detaylı rehberler; tablo, liste, FAQ, key takeaways |
| **E-E-A-T sinyalleri** | ✅ | Yazar (captain-ahmet), TURSAB, 24 yıl deneyim, gerçek fiyat/rote bilgisi |
| **Internal linking** | ✅ | relatedTours, relatedPosts, CTA’lar; cruise/guide sayfalarında ilgili turlar |
| **Faydalı içerik (Google)** | ✅ | Kullanıcı niyeti karşılanıyor: fiyat, süre, rota, ne beklenir; reklam değil bilgi ön planda |

---

## 2. TEKNİK SEO (Skill kurallarına göre)

### 2.1 Title / Description
- **Kural:** Title 50–60 karakter, primary keyword başta; description 150–160 karakter, CTA.
- **Blog:** Örnekler 34–59 karakter; çoğu 40–50 aralığında. “Best Bosphorus Cruise in Istanbul — Complete Guide for 2026” (59) sınırda, kabul edilebilir.
- **Ana sayfa:** “Bosphorus Cruise Istanbul — Sunset & Dinner Cruises from €40” — keyword başta, uzunluk uygun.
- **Öneri:** Yeni eklenen bloglarda title’ı 50–60 karakter tut; mevcutlar için zorunlu değişiklik yok.

### 2.2 URL / Sitemap / Robots
- URL’ler küçük harf, tire; anlamlı slug (örn. `/blog/best-bosphorus-cruise-istanbul-guide`).
- `sitemap.xml` statik sayfalar + tüm cruise + blog + guide URL’lerini içeriyor.
- `robots.txt` sadece `/api/` ve `/reservation/` disallow; blog ve sayfalar index’e açık.

### 2.3 Schema
- **Blog:** Article (headline, datePublished, dateModified, author, publisher), FAQPage, BreadcrumbList.
- **Ana sayfa:** WebSite + SearchAction, layout’ta TravelAgency (Organization).
- **Cruises/Guides:** BreadcrumbList. İsterseniz cruise sayfalarına Service + FAQ schema eklenebilir (opsiyonel).

---

## 3. FAYDALI İÇERİK (Google Helpful Content)

Google’ın “helpful content” beklentileriyle uyum:

| Kriter | Durum | Açıklama |
|--------|--------|----------|
| **Birincil odak** | ✅ | Sayfa amacı net: rehber / karar verme / rezervasyon; önce bilgi, sonra CTA |
| **Birinci elden deneyim** | ✅ | “24 years”, “MerrySails”, TURSAB, gerçek fiyat/süre/rota; “we” ile anlatım |
| **Uzmanlık** | ✅ | Teknik doğruluk (süre, km, tarih), yazar credential (captain-ahmet), operatör bilgisi |
| **Orijinallik** | ✅ | Kendi metinleri; tablo, FAQ, pro tip, callout ile farklılaşma |
| **Kullanıcı niyeti** | ✅ | “Fiyat ne?”, “Ne beklenir?”, “Ne zaman gidilir?” sorularına doğrudan cevap |
| **İnce içerik yok** | ✅ | Bloglar uzun (binlerce kelime), bölümler (H2/H3), tablo, liste, FAQ |
| **SEO için yazılmış ama insan için** | ✅ | Keyword doğal; başlıklar bilgi veriyor, tıklama tuzağı değil |

**Öneri:** Bu yapıyı koruyun. Yeni yazılarda da: net direct answer (ilk 100–150 kelime), key takeaways, FAQ, internal link (turlar + ilgili bloglar).

---

## 4. BLOG YAPISI (SEO Blog skill’e göre)

- **H1:** Sayfada tek; blog title = H1. ✅  
- **H2/H3:** sections[].heading ile hiyerarşi; atlama yok. ✅  
- **Key takeaways:** Çoğu blogda 3–5 maddelik liste. ✅  
- **FAQ:** Her blogda 4+ soru-cevap; schema ile eşleşiyor. ✅  
- **Internal link:** relatedTours, relatedPosts; CTA (Book, WhatsApp). ✅  
- **Tarih:** date + dateModified (örn. 2026-03-08). ✅  
- **Görsel:** image + imageAlt; Unsplash kullanımı var — ileride kendi fotoğraflar tercih edilebilir (E-E-A-T için).

---

## 5. EKSİK / İYİLEŞTİRME (Küçük)

| Konu | Öneri | Öncelik |
|------|--------|---------|
| **Blog title uzunluğu** | Yeni yazılarda 50–60 karakter hedefle; 34 karakterlik başlıkları (örn. “What to Wear…”) 45+ yapmak için alt başlık eklenebilir | Düşük |
| **Cruise/Guide schema** | Önemli cruise sayfalarına Service + FAQ (varsa) JSON-LD eklenebilir | Opsiyonel |
| **Görsel kaynağı** | Unsplash yerine kendi tekne/Bosphorus fotoğrafları E-E-A-T’ı güçlendirir | Orta |
| **Indexleme** | GSC’de indexlenmeyen URL’leri “İndekslemeyi iste” ile gönderin; liste: `data/urls-to-index-today.txt` | Yüksek |

---

## 6. SONUÇ

- **Blog ve sayfalar** SEO skill kurallarına ve Google’ın faydalı içerik beklentisine **uygun**.
- Teknik meta, schema, internal link ve içerik derinliği yerinde; E-E-A-T sinyalleri (TURSAB, deneyim, yazar) mevcut.
- Yapılacaklar: GSC’de indexlenmeyenleri tespit edip “İndekslemeyi iste” kullanmak; görsel ve schema iyileştirmeleri isteğe bağlı.

GSC adımları ve günlük URL listesi için: **`docs/GSC-INDEXLEME-REHBERI.md`** ve **`data/urls-to-index-today.txt`**.
