# SEO + GEO + AI Görünürlük + Backlink — 2026 Master Referans

*Solo operatör · ~13 İstanbul markası (cruise / transfer / lokal hizmet) · Next.js + Prisma · DataForSEO + GSC + Clarity sahibi*
*Hazırlık: 2026-06-21 · Bu doküman aylarca yeniden kullanılmak üzere yazıldı. Her iddia araştırmaya dayalı; doğrulanamayan figürler açıkça işaretlendi.*

---

## NEDEN BU DOKÜMAN — ön kabul

Sen şunu **canlı olarak** kanıtladın: ~16.000 satın alınan link rank'a hiçbir şey yapmadı. Bunu üç bağımsız kanaldan teyit ettin — kendi rank takibin, ~30 community vaka, ve kendi Reddit thread'in. Bu doküman o bulguyu bir kez daha "haklıydın" diye tekrarlamak için değil; o bulgunun üstüne **bir daha asla aynı tuzağa düşmemen** ve enerjini gerçekten işe yarayan yere koyman için yazıldı. Aşağıdaki her bölüm "ne yap / ne yapma" + kanıt formatında.

---

## 1. BACKLINK — kesin hüküm + dolandırıcılık-tanıma kılavuzu

### 1.1 Kesin hüküm — link satın almak işe yarar mı?

**Hayır. Senin durumunda (küçük marka, sıfır authority taban) satın alınan link = sıfır değer, hatta net negatif risk.** Bu bir kanı değil, üç ayrı veri katmanının kesişimi:

- **Korelasyon zaten zayıf ve düşüyor.** Ahrefs 1M-SERP çalışması (Ocak 2025): referring domains korelasyonu **0.255**, backlinks **0.248**, DR **0.131** — 2019'daki ~0.27–0.29'dan aşağı. Yani en yüksek link metriği bile rank'ı zar zor açıklıyor, ve trend aşağı. ([ahrefs.com/blog/links-matter-less-but-still-matter](https://ahrefs.com/blog/links-matter-less-but-still-matter/))
- **Google linkleri bilinçli olarak değersizleştirdi.** Gary Illyes: "insanlar linkleri abartıyor, çok az link gerekiyor." SpamBrain satın alınan linkleri **sessizce nötralize ediyor** — ceza bile vermiyor, sadece kredi vermiyor. BuzzStream 2025: 50 link builder'dan 28'i Haziran 2024 güncellemesinde vuruldu. ([searchengineland.com/backlinks-seo-importance-442529](https://searchengineland.com/backlinks-seo-importance-442529), [buzzstream.com/blog/buy-backlinks](https://www.buzzstream.com/blog/buy-backlinks/))
- **2025'te yaptırım genişledi.** 1 Ekim 2025 spam güncellemesi açıkça şunları hedefledi: reciprocal link exchange, AI guest-post çiftlikleri, dizin (directory) spam, lokal link manipülasyonu. Yani satın alınan link artık sadece "değersiz" değil, aktif risk kategorisinde. ([thesmbhub.com](https://www.thesmbhub.com/news/google-october-2025-spam-update-link-manipulation/))

**Senin 16.000 linkin tam olarak ne oldu?** Net ol: bu **kovuşturulabilir bir dolandırıcılık değildi** — sana söz verilen şey ("link koyacağız") teknik olarak teslim edildi; linkler bir yere kondu. Sadece o linkler **değersiz çöptü**: SpamBrain tarafından otomatik nötralize edilen, düşük-otoriteli, alakasız, trafiği sıfır kaynaklardan gelen PageRank-geçirmeyen bağlantılar. Para boşa gitti çünkü ürün baştan değersizdi, satıcı "kaçtığı" için değil. Bu ayrım önemli: bir daha "dolandırıldım mı" diye sormana gerek yok — **satın almadan önce çöp olduğunu anlayabilirsin.** Aşağıdaki checklist tam bunun için.

### 1.2 Link satın almak HİÇ değer mi? — tek istisna ve neden senin için geçerli değil

Teorik istisna: gerçek editoryal bir yayın, gerçek trafiği olan, niş-alakalı bir site, gerçek bir editör kararıyla senin içeriğine link verirse — bu "satın alma" değil, "kazanılmış link"tir (sponsorluksa `rel="sponsored"` ile işaretlenir ve PageRank geçirmez, sadece marka maruziyeti verir). r10/marketplace teklifleri **asla bu kategoride değildir.** Google'ın kendi spam politikası: para/mal/ürün karşılığı link = spam; nofollow/sponsored ile işaretlenince zaten PageRank geçmez. ([developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies))

### 1.3 🚩 RED-FLAG CHECKLIST — herhangi bir r10/marketplace teklifine uygula

Bir teklif geldiğinde bu listeyi geçir. **2+ kırmızı bayrak = çöp, satın alma.** (Kaynak: OutreachMonks link-building-scams + Google spam policy.)

| # | Kırmızı bayrak | Neden çöp sinyali |
|---|---|---|
| 1 | **"Garantili DA/DR X+"** | DA/DR Moz/Ahrefs'in kendi metriği; Google kullanmıyor. Garanti = metrik manipülasyonu (toxic link ile şişirilmiş). |
| 2 | **Hızlı/toplu yerleştirme** ("1 haftada 500 link") | Gerçek editoryal link aylar alır. Hız = otomatik/PBN. |
| 3 | **Ucuz birim fiyat** (link başı birkaç TL/dolar) | Gerçek editoryal yerleştirme pahalıdır. Ucuz = ölçeklenmiş çöp. |
| 4 | **Önizleme/rapor/iade yok** | Hangi sayfaya, hangi anchor ile koyacağını göstermiyorsa — gösterilecek bir şey yok. |
| 5 | **Yüksek DA + sıfır organik trafik** | En net tell. Ahrefs/Semrush'ta domain'in trafiği ~0 ise, DA sayısı satın alınmış demektir. **Bunu sen DataForSEO ile 30 saniyede kontrol edebilirsin.** |
| 6 | **Niş alakasızlığı** | Cruise markana hukuk/kumar/sağlık sitesinden link = footprint + alaka sıfır. |
| 7 | **"Expired domain 301" / "authority redirect"** | r10'da açıkça satılıyor; grey/black-hat. Durduğu an düşer. |
| 8 | **"Sıralama garantili paket"** | Hiçbir meşru SEO sıralama garanti edemez. Garanti = manipülasyon veya yalan. |

**Pratik tek-soru testi:** "Bu link, beni hiç tanımayan bir editörün kendi okuru için koyacağı bir link mi, yoksa para verdiğim için koyulan bir link mi?" İkincisiyse — geç. İstisnasız.

### 1.4 Backlink için tek meşru oyun

Satın alma yerine: **kendi first-party verini yayınla** (örn. "12.400+ cruise gerçekleştirdik", gerçek sezonsal fiyat tablosu, orijinal İstanbul fotoğrafları). Bu, her güvenilir kaynağın (TR ve global) link satın almadan onayladığı tek link taktiğidir — doğal link mıknatısı. Yavaştır, ama kazandığın link gerçektir ve SpamBrain'e takılmaz. **Garantili "X haftada Y link" çerçevesine güvenme** — taktik doğru, garanti süresi upsell dili.

---

## 2. SEO — gerçekten işe yarayan (TR-grounded)

### 2.1 Çerçeve: "Sistem Patent 830%" / R10 vakası = sıfır satın alınan link

Şeffaf olalım: aradığım tam "Sistem Patent ~400→4000 / 3 ay" vakasını **isimli, alıntılanabilir bir kaynak olarak bulamadım** — o spesifik marka+rakam çifti yüzeye çıkmadı, **illüstratif kabul et, kanıt sayma.** AMA tarif ettiği metodoloji (Next.js + CWV + 301 + hreflang + JSON-LD + AI-bots-allowed + internal linking, sıfır satın alınan link) birden çok bağımsız TR kaynağında doğrulanıyor. Doğrulanan vakalar:

- **R10.net** (Yiğit Aksut case study): +%247 organik (1.2M→4.1M oturum), 6 ayda, **sıfır satın alınan link.** Kaldıraçlar: indekslenen sayfaları 2.1M→680K kırpmak (crawl-budget temizliği), LCP 4.8s→1.2s / CLS 0.32→0.04, 3.400+ duplicate title'ı tek otoriteli sayfaya birleştirme, NLP-tabanlı internal linking, 12.000+ toxic link disavow, A/B title testleri (+%35 CTR). ([yigitaksut.com](https://yigitaksut.com/case-study/r10-net-blog-organik-trafik-donusum-stratejisi/))
- **uHealth:** 90 günde +%100 organik — teknik SEO + service sayfalarını "otorite sayfası" olarak konumlandırma + **"öncelikli sayfalara otorite transferi" yapan internal-link haritası** + blog→service topic cluster + meta CTR rewrite. Sıfır satın alınan link. ([uhealth.com.tr](https://www.uhealth.com.tr/90-gunde-organik-trafik-seo-basari-hikayesi/))
- **BusinessUp:** Senin Next.js profiline en yakın doğrulanmış analog. Theme migration siteyi bozmuş; fix = kod şişkinliği temizliği, **tüm JSON-LD'yi `<head>`'e taşıma**, semantik HTML5, async/defer + critical CSS, yükleme 12s→3-4s. Sonuç: %50 kaybı geri + ekstra %20, 3 ayda. Sıfır satın alınan link. ([businessup.com.tr](https://businessup.com.tr/teknik-seo-vaka-calismasi-teknik-seo-ile-trafik-kaybi-3-ayda-nasil-kara-donustu/))

**Uyarı — bu rakamlara güvenme:** +%247, +%100, "400→4000" figürlerinin neredeyse hepsi ajans lead-gen iddiası; GSC-doğrulanmış mutlak baseline yok. **Taktik listesi değerli, rakam değil.**

### 2.2 İşe yarayan beyaz-şapka yığını (TR konsensüsü = senin mevcut duruşun)

Onur Öztürk (~150 proje), Ahmet Abiç, R10 thread'leri ve ajans vakaları neredeyse aynı 6-adımlı yığına yakınsıyor. **Senin zaten yaptığını ve boşluğu işaretliyorum:**

| # | Taktik | Sen | Not |
|---|---|---|---|
| 1 | **Teknik temel önce** — CWV "Good"a (LCP<2.5s / INP<200ms / CLS<0.1), crawl-budget temizliği, thin sayfa de-index, render-blocking fix | ✅ Çoğu hazır (Next.js SSR + Vercel) | **GAP:** 1.258 crawled-not-indexed'i benign `_next` noise olarak teyit et (önceki session benign dedi) |
| 2 | **Topical authority** — pillar-cluster mimarisi + NLP/contextual internal-link haritası, otoriteyi 3 para sayfasına (yacht/sunset/dinner) transfer | ✅ Pillar yapısı var, ✅ internal-linking skill var | **GAP:** blog/guide içi linkleri bilinçli olarak para sayfalarına route et. RED LINE içinde kal: sadece footer + in-content contextual, YENİ nav strip YOK |
| 3 | **İçerik konsolidasyonu** — yakın-duplicate title'ları tek otoriteli URL'de birleştir + 301; cannibalization öldür | ⚠️ Kısmen (DMCA cannibalization olayı yaşandı) | **GAP:** bosphorus/sunset/dinner varyantlarında cannibalization audit; "intent başına tek indekslenebilir URL" kuralını uygula |
| 4 | **JSON-LD schema SSR `<head>`'de** — rich result + AI citation | ✅ Hazır | Koru, genişletme (bkz. §3 schema debunk) |
| 5 | **CTR işi** — pos 4-20 sayfalarda title/meta rewrite + 134-167 kelime self-contained answer block | ⚠️ Kısmen (bazı title rewrite yapıldı) | **EN YÜKSEK ROI BOŞLUĞU.** Aynı rank'tan daha fazla tık çıkarmak — yeni rank gerektirmiyor |
| 6 | **BOFU-first + first-party data** — orijinal veri = link mıknatısı; satın alınan link YOK | ⚠️ Veri var ("12.400+"), yayınlanmış değil | **GAP:** operatör verisini yayınla |

### 2.3 SEO'da yapma listesi (TR community'de açıkça satılıyor ama çöp)

- ❌ **Expired-domain 301 / PBN authority redirect** — r10'da açık satılıyor, grey/black-hat, durduğu an düşer.
- ❌ **BAS/bot "organik hit" fake trafik** — r10 poster'ı bile itiraf ediyor: "kalıcı değil, trafik durunca Google rank'ı sıfırlıyor."
- ❌ **TR "SEO danışmanlığı / GEO hizmeti / sıralama garantili paket" upsell'leri** — her expert makalesi (Onur Öztürk, Ahmet Abiç, ajanslar) "ücretsiz görüşme / WhatsApp" funnel'ında bitiyor. **Değer = halka açık taktik listesi, ödenecek hizmet değil.** Taktikleri al, danışmanlığı alma.
- ❌ **llms.txt / AI-özel makine-okunur dosyaları yeni yatırım olarak** — TR GEO konsensüsü Google'ın kendi pozisyonuyla aynı: "AI'da görünmek çoğu zaman SEO'nun doğru çalışmasıyla olur." Mevcut dosyan zero-harm, kalsın; **otomatik pipeline'a yatırım yapma.**
- ❌ **Bulk-comment / .edu-comment link drop** — düşük değer + footprint riski + content-gate disiplinine aykırı.

---

## 3. GEO / AI GÖRÜNÜRLÜK — 2026 frontier

Bu senin büyüme cephesi. AI trafiği henüz toplam ziyaretlerin ~%1'i (SimilarWeb post-7-Mayıs ChatGPT referral +%150 ile bu yükseliyor) ama **dönüşümü ~4.4x** ve aylık ~%1 büyüyor. Düşük hacim, yüksek niyet. İşte 2026 mekanikleri — her biri sayfa-seviye hamle:

### 3.1 Bing önce — ChatGPT'nin görünmez ön koşulu

**ChatGPT Search Bing indeksine bağımlı.** Seer çalışması: citation'ların ~%87'si Bing top-10 ile eşleşiyor. **Bing'de yoksan, Google rank'ın ne olursa olsun ChatGPT'de yoksun.** İlginç ayrıntı: Bing'de #1 olmak yetmiyor — Bing top-3 gerçek citation'larla sadece %6.8–7.8 eşleşiyor; yani Bing top-10'da **olmak** önemli, #1 olmak değil. ([seerinteractive.com](https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results))

**Hamle:** Her ticari URL'i Bing Webmaster Tools'ta verify + submit et, **indexed** olduğunu teyit et. IndexNow zaten Bing'e gidiyor — günlük push'u sürdür. Bing #1 kovalama (boşa efor).

### 3.2 Marka mention'ı > backlink

Ahrefs 75K-marka çalışması, AI görünürlük korelasyonları:
- YouTube mention'ları **~0.737**
- Web mention'ları **0.664** (backlink'in ~3 katı; backlink **0.218**)
- İçerik hacmi ↔ görünürlük: **neredeyse sıfır ilişki** (hacim işe yaramıyor, hatta "generalist" sinyali verip geri tepebilir). ([ahrefs.com/blog/ai-brand-visibility-correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations/))

**Hamle:** İstanbul seyahat medyasında **linksiz marka mention'ı** kazan. Outreach'i "link" değil **"operatör atıflı markalı mention"** olarak çerçevele (örn. "Captain Ahmet, MerrySails — 50.000+ misafir" şeklinde alıntılanabilir bir cümle ver).

### 3.3 Answer-block yapısı — tek en güçlü sayfa kaldıracı

- **Query-matched H2/H3:** Başlık = müşterinin birebir sorusu ("How much does a Bosphorus dinner cruise cost?"). Direct-answer başlığı **~%41** alıntılanıyor, generic başlık **~%29** — sadece başlık formatından +12 puan. ([notchsolutions.com](https://notchsolutions.com/how-to-rank-in-ai-overviews-the-complete-2026-guide/))
- **130-170 kelime self-contained answer block** her soru başlığı altında: önce direkt cevap, çevre paragraflar kapalıyken bile **tam** olmalı ("Information Island" testi). AIO cevapları ortalama 169–254 kelime.
- **Pillar başına bir temiz karşılaştırma tablosu** (dinner/sunset/yacht: fiyat, süre, pickup, grup büyüklüğü). Tablolar LLM'ler için son derece yüksek-sinyal, çok kolay extract ediliyor.

### 3.4 Schema'yı AI için GENİŞLETME

Ahrefs 1.885 sayfaya JSON-LD ekledi vs 4.000 kontrol: AIO **-%4.6**, AI Mode +%2.4 (anlamsız), ChatGPT +%2.2 (anlamsız). searchVIU: **her AI sistemi sadece görünür HTML çıkarıyor; JSON-LD/Microdata/RDFa yok sayılıyor.** ([ahrefs.com/blog/schema-ai-citations](https://ahrefs.com/blog/schema-ai-citations/))

**Hamle:** Schema'yı **yalnızca Google rich result için** tut (sen zaten böyle yapıyorsun). AI citation için schema ekleme — boşa efor. AI'nın gördüğü şey senin **görünür, SSR HTML'in** — answer block'lar buraya yazılmalı.

### 3.5 Tazelik = retrieval input

AI'nın alıntıladığı içeriğin ~%50'si **13 haftadan taze**; 30 günden taze içerik **~3.2x** daha çok alıntılanıyor; 60-90 günde decay başlıyor. KRİTİK: **sadece `dateModified` bump'ı (tarih-only) güveni ZARARLI** — substantive değişiklik olmadan tarih güncellemek retrieval-trust'ı düşürebilir. ([salespeak.ai](https://salespeak.ai/aeo-news/content-freshness-ai-search))

**Hamle:** Çeyreklik tazeleme — **yeni bir veri/datum ekle + sonra** `dateModified` güncelle. Asla tarih-only refresh yapma.

### 3.6 Reddit ve YouTube

- **Reddit:** ChatGPT sosyal citation'larının %51-76'sı, Perplexity'nin %46.7'si. Otantik operatör katılımı: **ayda max 2**, verified license bio, link drop YOK. Inauthentic/paid posting = ban + Google spam policy hit.
- **YouTube 2026'da Reddit'i geçti:** AI citation'larının ~%29.5'i (Gemini 3 sonrası). **%94 long-form** (Shorts %5.7 — Shorts YOK), %40.83'ü 1000 view'dan az (view sayısı önemli değil), **timestamp'li chapter'lar en güçlü korelasyon** — AIO YouTube citation'larının %73'ü timestamp'li. ([otterly.ai](https://otterly.ai/blog/youtube-ai-citation-study-2026/))

**Hamle:** Marka başına **bir long-form video** — operatör kamera önünde, timestamp'li chapter'lar, transcript on-page. AIO/Perplexity/ChatGPT bu kombinasyonu (mention + multimodal + timestamp) ağırlıklandırıyor.

### 3.7 AI crawler erişimi — teyit edildi ✅

`robots.txt`'in zaten OAI-SearchBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot-Extended, CCBot'a izin veriyor (`src/app/robots.txt/route.ts`'te doğruladım). SSR görünür HTML hazır. **Bu kutu işaretli — koru.**

### 3.8 Native dil answer block'ları

DE/RU/AR answer block'larını **çevrilmiş EN değil, native** yaz. (Önceki session: MS /ru ~%90 native, /zh ~%30 — leak'leri kapat.)

---

## 4. PORTFÖY ÖNCELİĞİ — time-poor solo, 13 marka

### 4.1 En büyük hata (kaçın) ve neden

**Eforu 13 markaya eşit yaymak = hiçbiri "awesome" olamaz = Google'ın cezalandırdığı site-geneli kalite sürüklenmesi.** Mueller (SE Roundtable): "ayrı siteler sorun değil; ama çok sitede çalışırsan hiçbirini gerçekten harika yapacak vaktin olmaz, ve algoritmalar harika-olmayan siteleri yakalar." Helpful Content: yüksek oranda yardımcı-olmayan içerik, yardımcı sayfaları bile aşağı çeker. ([seroundtable.com](https://www.seroundtable.com/google-rankings-dropped-two-websites-37261.html))

**Kalite-taban kapısı (her markaya dokunmadan önce):** "Bu site harika mı, yoksa sadece URL mi ekliyorum?" Harika değilse — yayınlamadan önce düzelt/budama yap.

### 4.2 ROI tahsisi — tek tekrarlanabilir per-marka şablon

Zaman-fakiri, mevcut trafiği olan portföy için en yüksek getiri **daha fazla SEO değil, CRO** — geri ödeme 60-90 gün (SEO ile trafiği ikiye katlamak 12-24 ay). Düşük trafikte bile qualitative yöntemlerle çalışır. ([grow-conversions.com](https://grow-conversions.com/blog/cro-vs-seo/))

| % | Kategori | Hamle |
|---|---|---|
| **40%** | **Conversion / CRO** | Marka başına Clarity recording/heatmap/rage+dead-click; above-fold CTA, trust sinyalleri, fiyat netliği, mobil hız. **ProductHero işin tam doğru öncelik.** |
| **25%** | **GBP / lokal + review** (Pinogare, ErsinTattoo, AcılKaşeNiz, PG Premium, PakBodrum) | Her alanı doldur, doğru primary kategori, haftalık post/foto, **tüm review'lara yanıt**, NAP düzelt. GBP local pack'in %32'si; tam profil %70 daha çok ziyaret, CPL %61 daha düşük, ~13:1 ROI. En büyük GBP hatası: bir kerelik kurulum + duplicate location sayfaları. ([biziq.com](https://biziq.com/blog/local-seo-statistics-2026/)) |
| **20%** | **Striking-distance** (pos 4-20) | Zayıf title'ları 50-60 char'a rewrite + ~10 varied internal link. GSC hedefi seçer. Google zayıf title'ların %61'ini zaten yeniden yazıyor; rewrite + internal link en yüksek-ROI ücretsiz SEO. ([nichepursuits.com](https://www.nichepursuits.com/cyrus-shepard-internal-links-study/)) |
| **10%** | **Teknik hijyen + AI-file fiyat doğruluğu** | llms.txt/faq fiyatları, SSR H1'ler, schema lint, 307 yok. **Sadece bakım seviyesi.** |
| **5%** | **Net-yeni içerik** | Sıkı cap: **marka başına 1 sayfa / 7 gün**, 7-soru gate'ten geçerek. Genişlik değil, derinlik. |

### 4.3 Sürdürülebilir cadence + kurallar

- **De-clone kardeş çiftleri** (MerrySails/GoldenSunset, Vesper/Luma): en az 2 eksende farklılaştır (tier, scope, demographic, geo, voice).
- **A/B test YOK** düşük-trafik markalarda (sayfa başına <2.000 oturum veya <50 conv/ay) — qualitative Clarity CRO kullan.
- **Dönüşmeyen ama trafiği olan sayfalar için daha çok trafik kovalama** — önce dönüşümü düzelt.
- **Lokasyon/service sayfalarını isim değiştirip kopyalama** markalar/şehirler arası — Google her versiyonu iskonto eder.
- **Tek tekrarlanabilir per-marka checklist kur ve rotate et:** (1) Clarity friction, (2) CTA/trust fix, (3) GBP, (4) title/internal-link sweep, (5) AI-file fiyat kontrolü. Gerçek trafiği/geliri olan markalarda yoğunlaş.

---

## 5. 90-GÜN AKSİYON — ROI sıralı, free/paid işaretli

Her madde: **[FREE]** veya **[PAID]** + tahmini efor. ROI azalan sırada.

### Gün 0-30 — En yüksek ROI, çoğu ücretsiz

1. **[FREE]** **Striking-distance CTR sweep** — 13 markada GSC pos 4-20 sayfaları çek, en yüksek imp'li zayıf title'ları 50-60 char'a rewrite + her birine 134-167 kelime answer block ekle. *En yüksek-ROI ücretsiz hamle. Yeni rank gerektirmiyor.*
2. **[FREE]** **Bing-first GEO foundation** — her markanın ticari URL'lerini Bing Webmaster'da verify + submit + indexed teyit; IndexNow günlük push'u sürdür. *ChatGPT görünürlüğünün ön koşulu.*
3. **[FREE]** **CRO — Clarity friction sweep** — gelir markalarında (MerrySails, KWT, lokal yüksek-trafik) rage/dead-click recording incele, above-fold CTA + trust + fiyat netliği düzelt. *60-90 gün geri ödeme.*
4. **[FREE]** **GBP doldurma + review yanıtları** — 5 lokal markada (Pinogare, ErsinTattoo, AcılKaşeNiz, PG Premium, PakBodrum) her alan + doğru kategori + tüm review yanıt + NAP. *~13:1 ROI, lokal pack'in %32'si.*
5. **[FREE]** **Cannibalization audit** — bosphorus/sunset/dinner varyantlarını bul, intent başına tek otoriteli URL'e birleştir + 301. *DMCA-cannibalization tekrarını önler.*

### Gün 30-60 — Topical authority + GEO derinleşme

6. **[FREE]** **Internal-link otorite transferi** — blog/guide içi linkleri 3 para sayfasına (yacht/sunset/dinner) route et, ~10 link/sayfa, RED LINE içinde (footer + in-content). *uHealth + R10'un ana içerik-dışı kaldıracı.*
7. **[FREE/düşük PAID]** **Marka mention outreach** — İstanbul seyahat medyasına "operatör-atıflı markalı mention" pitch'i (link değil). [PAID kısmı: opsiyonel basın/PR aracı.] *Backlink'in 3x'i AI görünürlükte.*
8. **[PAID — düşük]** **Bir long-form YouTube/marka** — operatör kamera önü, timestamp'li chapter, transcript on-page. ~$250 prodüksiyon kit. *YouTube AI citation'larının %94'ü long-form; en güçlü AI sinyali.*
9. **[FREE]** **First-party data sayfası** — "12.400+ cruise", gerçek sezonsal fiyat, orijinal foto. *Tek meşru backlink mıknatısı.*

### Gün 60-90 — Tazelik + sürdürülebilir ritim

10. **[FREE]** **Çeyreklik freshness pass** — pillar'lara yeni datum ekle + sonra dateModified (asla tarih-only). *AI retrieval-trust.*
11. **[FREE]** **Native answer block düzeltme** — DE/RU/AR leak'lerini kapat (çevrilmiş EN değil native).
12. **[FREE]** **Per-marka rotasyon checklist'ini kurumsallaştır** — 5-adımlı şablonu (Clarity / CTA / GBP / title-link / AI-fiyat) haftalık rotate et.

### Açıkça YAPMA (90 gün boyunca)

- ❌ **[PAID]** Hiçbir link paketi / PBN / expired-domain 301 / dizin spam — sıfır değer + risk.
- ❌ **[PAID]** TR "sıralama garantili SEO / GEO danışmanlık" upsell'i — taktik listesi ücretsiz, hizmet değersiz.
- ❌ **[FREE ama zararlı]** BAS/bot fake trafik, bulk-comment, AI-özel schema/llms.txt yeni yatırımı, tarih-only dateModified, YouTube Shorts, programmatic sayfa ölçekleme, düşük-trafik A/B test.

---

### Tek cümlelik özet

Satın alınan link **çöptü, dolandırıcılık değil** — ve red-flag checklist'i (özellikle "yüksek DA + sıfır organik trafik", DataForSEO ile 30 saniyede kontrol) ile bir daha asla satın almadan önce anlarsın. Gerçek büyüme = mevcut rank'lardan CTR çıkarmak + CRO + GBP + Bing-first GEO + first-party data — hepsi ücretsiz veya düşük-maliyet, ve hepsi senin mevcut Next.js + JSON-LD + AI-bots-allowed duruşunun zaten %80'ini doğruluyor. Kalan iş yeni taktik değil, **execution.**

---

İlgili dosyalar (mevcut altyapı, doğrulandı): `/Users/resat/Desktop/merrysails/src/app/robots.txt/route.ts` (AI bot izinleri ✅), `/Users/resat/Desktop/merrysails/CLAUDE.md` (RED LINE internal-linking kuralları), `/Users/resat/Desktop/merrysails/RULES.md` (schema/title/CTR kuralları — bu dokümana referans).