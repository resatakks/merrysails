# GSC İndeksleme URL Listeleri

Bu klasördeki dosyalar **Google Search Console → İndekslemeyi iste** için kullanılır.

| Dosya | Açıklama |
|-------|----------|
| `urls-to-index.json` | Sitemap’ten alınan tüm URL’ler (113 adet). |
| `urls-to-index-today.txt` | Bugün GSC’de “İndekslemeyi iste” ile göndereceğin 15 URL. |

**Güncellemek için:** Proje kökünde `node scripts/generate-urls-to-index.js` çalıştır.

**GSC’de yapman gerekenler (otomatik yapılamaz — senin girişin gerekir):**

1. https://search.google.com/search-console → merrysails.com mülkü
2. **Sayfalar** → indexlenmeyenleri filtrele
3. **URL’yi incele** kutusuna `urls-to-index-today.txt` içinden URL yapıştır → **İndekslemeyi iste**
4. Günde 10–15 URL; ertesi gün script’i tekrar çalıştırıp yeni listeyle devam et

Detay: `docs/GSC-INDEXLEME-REHBERI.md`
