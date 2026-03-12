# MerrySails — GSC ile İndeksleme Rehberi

**Site:** merrysails.com (tekne / Bosphorus cruise)

Bu rehber: Google Search Console’a bağlanıp **indexlenen / indexlenmeyen** sayfaları kontrol edip, **indexlenmeyenleri** “İndekslemeyi iste” ile index’e aldırmak için.

---

## 0. Önce: Indexlenenlere ve indexlenmeyenlere bak

1. **GSC’e gir:** https://search.google.com/search-console → mülk **merrysails.com** seç.
2. **Sol menü → Sayfalar** (İngilizce arayüzde: **Index** → **Pages**).
3. **Indexlenenlere bak:** “Why pages are indexed” veya tab’larda **Indexed** sayısını görürsün; hangi sayfaların index’te olduğu özetlenir.
4. **Indexlenmeyenlere bak:** Aynı sayfada **“Not indexed”** / **“Discovered – currently not indexed”** / **“Crawled – currently not indexed”** gibi durumları filtrele veya tıkla. Listelenen URL’ler Google’da henüz çıkmıyordur — **önce bunlar için “İndekslemeyi iste” yap**.
5. **Öncelik:** Önce GSC’de gördüğün indexlenmeyen URL’leri tek tek “URL’yi incele” → “İndekslemeyi iste” ile gönder. Sonra `data/urls-to-index-today.txt` içindeki sırayla günde 10–15 URL daha ekleyebilirsin.

---

## 1. GSC kotası

- Google **“İndekslemeyi iste”** için günde **yaklaşık 10–20 URL** kabul eder (resmi limit yayınlamıyor).
- Daha fazla gönderirseniz o gün ek istekler kabul edilmez; ertesi gün tekrar deneyebilirsiniz.
- **Öneri:** Günde **10–15 URL** ile ilerleyin. Script varsayılanı 15; `URLS_PER_DAY=10` veya `20` ile değiştirebilirsiniz.

---

## 2. Indexlenecek URL listesini üretme

Proje kökünde:

```bash
node scripts/generate-urls-to-index.js
```

- Script **sitemap’i** (https://merrysails.com/sitemap.xml) indirir.
- **Çıktılar:**
  - `data/urls-to-index.json` — Sitemap’teki tüm URL’ler
  - `data/urls-to-index-today.txt` — Bugün GSC’de göndereceğiniz 15 URL (veya `URLS_PER_DAY` kadar)

Günlük kotayı değiştirmek için:

```bash
URLS_PER_DAY=10 node scripts/generate-urls-to-index.js
```

---

## 3. GSC’de indexlenmeyenleri indexletme

1. **GSC’e gir:** https://search.google.com/search-console  
2. **Mülk:** merrysails.com (URL öneki veya alan adı mülkü) seçin.
3. **Sitemap:** Zaten ekli değilse “Sitemaps” bölümüne `https://merrysails.com/sitemap.xml` ekleyin.
4. **Indexlenmeyen sayfaları bulun:**
   - Sol menü → **Sayfalar** (veya “Coverage” / “Kapsam”).
   - “Indexlenmedi”, “Discovered – currently not indexed” gibi durumlara filtreleyin.
   - Hangi URL’lerin index’te olmadığını listeleyin.
5. **İndekslemeyi iste:**
   - Üstteki **“URL’yi incele”** (Inspect URL) kutusuna tam URL yapıştırın (örn. `https://merrysails.com/cruises/bosphorus-dinner-cruise`).
   - Enter → sayfa analiz edilir.
   - “İndekslemeyi iste” / “Request indexing” butonuna tıklayın.
   - Günde 10–15 URL için bu adımı tekrarlayın; ertesi gün `urls-to-index-today.txt` için script’i tekrar çalıştırıp kalan URL’lerle devam edin.

---

## 4. Özet

| Ne | Nerede |
|----|--------|
| Tüm URL’ler | `data/urls-to-index.json` |
| Bugün gönderilecek 15 URL | `data/urls-to-index-today.txt` |
| Script | `scripts/generate-urls-to-index.js` |
| GSC kota | ~10–20 istek/gün; 10–15 önerilir |

Kings World Transfer veya MerryTurizm ile ilgili değildir; sadece **MerrySails (tekne sitesi)** içindir.
