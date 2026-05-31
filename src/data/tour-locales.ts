/**
 * Per-locale overrides for Tour content.
 *
 * Why this exists (2026-05-30 audit):
 *   /tr/cruises/bosphorus-sunset-cruise still rendered ~50% English content
 *   because tours.ts is single-locale (EN).  Locale pages share the same
 *   tour data → mixed-language pages → confused Yandex/Google language
 *   classifiers + bad UX for Turkish/German/French/Dutch/Russian visitors.
 *
 * Design:
 *   - Keep tours.ts as the single source of truth for EN + all
 *     structural data (prices, capacities, schedules, slugs).
 *   - This file contains PARTIAL overrides per locale.  Only fields that
 *     differ from EN need to be filled in — empty/missing locale falls
 *     back to EN automatically.
 *   - Translations are written by humans / Claude with native voice,
 *     NOT machine-translated.  Each locale block is reviewed for tone,
 *     terminology consistency (Boğaz Turu, Bosporus Kreuzfahrt, etc.),
 *     and SEO keyword match against KEYWORDS.md.
 *
 * Rollout order (impact-weighted from booking data):
 *   1. bosphorus-sunset-cruise — 11/17 May bookings = 65% of monthly volume
 *   2. bosphorus-dinner-cruise — 3 May bookings + €6,600/mo "boğaz turu"
 *   3. yacht-charter-in-istanbul — premium tier, low volume but high AOV
 *   4. remaining 18 tours — lower priority
 *
 * Each tour × locale is roughly 800-1,500 words of native content covering
 * longDescription, route, departurePoint, importantNotes, highlights,
 * includes, notIncluded.
 */

import type { Tour } from "@/data/tours";

/** Subset of Tour fields we localise — text fields that show up to users. */
export type LocalisedTourFields = Partial<
  Pick<
    Tour,
    | "name"
    | "description"
    | "longDescription"
    | "duration"
    | "capacity"
    | "route"
    | "departureTime"
    | "departurePoint"
    | "includes"
    | "notIncluded"
    | "highlights"
    | "importantNotes"
    | "bestFor"
    | "availability"
    | "enquiryLabel"
  >
>;

/** Locale code → tour-slug → localised fields. */
export type TourLocaleOverrides = Record<string, Record<string, LocalisedTourFields>>;

const overrides: TourLocaleOverrides = {
  tr: {
    "bosphorus-sunset-cruise": {
      name: "Boğaz Gün Batımı Turu",
      description:
        "İstanbul Boğaz gün batımı turu — Pazartesi, Salı ve Perşembe günleri €30'dan başlıyor (diğer günler €34). Karaköy iskelesinden 2 saatlik altın saat yelken keyfi, canlı rehber, hafif ikram. Şarapsız ve şaraplı iki seçenek var.",
      longDescription:
        "MerrySails'in paylaşımlı Boğaz gün batımı turu, akşam yemekli programa girmeden Boğaz'da altın saat keyfi yaşamak isteyen misafirler için tasarlandı. Karaköy iskelesinden — Galata Köprüsü'nün hemen kuzeyinden — 18:30 itibarıyla biniş başlar, yat 19:00'da yelken açar ve güney Boğaz hattında yaklaşık 2 saatlik bir rota izler.\n\nBoğaz, Avrupa ile Asya'yı birbirinden ayıran 31 kilometre uzunluğunda dar bir su yolu olup Karadeniz'i Marmara Denizi'ne bağlar. İstanbul iki yakaya da yayılmıştır ve Boğaz'ın güney kesimi — eski şehirden Rumeli Hisarı'na kadar — Türkiye'deki en yoğun Osmanlı dönemi sahil mirasını barındırır. Yat güvertesinden Dolmabahçe Sarayı (1856 yılında Sultan Abdülmecid I için yapılan son imparatorluk sarayı), Asya kıyısından yaklaşık 200 metre açıkta küçük adasıyla Kız Kulesi, ilk Boğaz Köprüsü'nün önündeki 1853 Barok cepheli Ortaköy Camii ve son olarak — Fatih Sultan Mehmed'in fethinden önce Boğaz'ı kontrol altına almak için dört ayda yaptırdığı 1452 yapımı Rumeli Hisarı geçilir. Yat burada dönüş yapar ve gökyüzü mavi saate geçerken güneye doğru ilerler.\n\nAynı rota üzerinde iki paket sunuyoruz. Şarapsız temel ücret €34 (Pazartesi, Salı ve Perşembe seferlerinde €30), Şaraplı paket €40 (aynı üç gün için €35). Hafta içi indirimi rezervasyon sırasında otomatik uygulanır — kupon kodu gerekmez ve yıl boyunca sabit kalır.\n\nGemideki ikram üç küçük kategoriye bölünmüştür. Sıcak içecekler: taze demlenmiş çay ve Türk kahvesi. Soğuk içecekler: ev yapımı buzlu çay, ev limonatası, mevsim meyve suyu ve şişe su. Atıştırmalık tabağında karışık kuruyemiş, tuzlu kraker ve mevsim meyve tabağı. Şaraplı paket alan misafirler iki bardak şarap ile karşılanır. Canlı İngilizce konuşan rehber, geçilen her önemli noktayı tarihçesiyle birlikte aktarır.\n\nMerrySails, 2001 yılından beri Boğaz'da 50.000'i aşkın misafir ağırlayan TURSAB A Grubu lisanslı Meryem Yıldız Travel çatısı altında faaliyet göstermektedir.",
      duration: "2 saat",
      capacity: "Paylaşımlı gün batımı yatı oturma düzeni",
      route:
        "Karaköy iskelesi (Galata Köprüsü kuzeyi) → Dolmabahçe & Ortaköy → İlk Boğaz Köprüsü → Rumeli Hisarı dönüşü → mavi saatte geri dönüş",
      departureTime: "19:00 (biniş 18:30'da başlar)",
      departurePoint:
        "Karaköy iskelesi — Galata Köprüsü'nün hemen kuzeyi. Tam buluşma yeri ve iskele numarası, rezervasyon sonrası WhatsApp ile gönderilir.",
      includes: [
        "2 saatlik paylaşımlı gün batımı yelkeni, lüks bir yatta",
        "Tüm rota boyunca canlı İngilizce rehber",
        "Sıcak içecekler — çay ve Türk kahvesi",
        "Soğuk içecekler — buzlu çay, limonata, meyve suyu ve şişe su",
        "Atıştırmalık tabağı — karışık kuruyemiş, kraker ve mevsim meyve tabağı",
        "Şaraplı paket: kişi başı 2 bardak şarap dahil",
      ],
      notIncluded: [
        "Seçilen gün batımı paketinin dışında ek şarap servisi",
        "Otel transferi (gün batımı turu için standart değildir)",
        "Akşam yemeği — gün batımı turu yemekli programa girmez",
      ],
      highlights: [
        "Kız Kulesi",
        "Dolmabahçe Sarayı",
        "Ortaköy Camii",
        "Rumeli Hisarı",
        "Boğaz Köprüsü",
      ],
      importantNotes: [
        "Paylaşımlı gün batımı turu hafta içi indirimiyle €30'dan başlar (Pazartesi, Salı ve Perşembe) — diğer günler €34. Şaraplı paket hafta içi €35, diğer günler €40.",
        "Paylaşımlı format küçük gruplu lüks yat üzerinde yapılır; günlük doluluk sefere göre değişir.",
        "Tam buluşma yeri ve saat, rezervasyon sonrası WhatsApp ile paylaşılır — genel iskele tabelalarını takip etmek yerine bu mesaja güvenin.",
      ],
      bestFor: [
        "Çiftler",
        "Çift dostları",
        "Fotoğraf tutkunları",
        "İlk kez İstanbul'a gelen ziyaretçiler",
      ],
      availability: "Tüm yıl",
      enquiryLabel: "WhatsApp ile sorgu yap",
    },
    "bosphorus-dinner-cruise": {
      name: "Boğaz Akşam Yemekli Turu",
      description:
        "İstanbul Boğaz akşam yemekli turu — Silver paket €30'dan, Gold Sınırsız Alkol €90'dan başlıyor. Kabataş iskelesinden 3,5 saatlik paylaşımlı tekne turu, çok tabaklı Türk akşam yemeği, içecek paketi seçenekleri ve canlı Türk gecesi eğlencesi.",
      longDescription:
        "Boğaz akşam yemekli turu aynı gece rotasında dört genel paket etrafında kurgulanmış paylaşımlı bir program: Silver Soft Drinks €30, Silver Alkollü €45, Gold Soft Drinks €80 ve Gold Sınırsız Alkol €90. Tüm paketler aynı yatta aynı rotayı izler — paket farkı masa kalitesi, içecek dahili ve menü zenginliğindedir.\n\nTur yaklaşık 3,5 saat sürer, paylaşımlı bir akşam yemekli tekne ile yapılır ve Kabataş iskelesi biniş akışını kullanır. Avrupa yakası merkezi otellerin büyük çoğunluğu için pickup ve drop-off, paylaşımlı akşam yemekli operasyonunun bir parçasıdır — biniş öncesi onaylanır. Canlı takvim şu anda 20:30 kalkışlarını gösteriyor.\n\nPaket farkına bakıldığında akşam, akşam yemeği servisi, sahne gösterisi, DJ ve aydınlatılmış Boğaz manzaralarının birleşiminden oluşur. Asıl farklar rota üzerinde değil, masa kademesi, içecek dahili ve akşam yemeği menüsü seviyesindedir. Silver paketleri operasyon tarafından düzenlenen standart oturma düzenini kullanır; Gold paketleri ise sahneye yakın garantili VIP masalara, daha geniş menüye ve daha premium servise geçer.\n\nAkşam yemeği menüsü klasik bir Türk gecesi banket yapısını izler. Silver ve Gold paketleri karşılama kokteyli ve yaklaşık 10 soğuk meze ile başlar — tipik olarak fasulye piyazı, yaprak sarması, humus, tarama, çoban salatası, közlenmiş kırmızı biber, cacık, patlıcan salatası, beyaz peynir ve mevsim turşuları. Taze mevsim salatası ve sıcak başlangıç ana yemekten önce servis edilir. Ana yemek masada canlı seçim formatında sunulur: misafirler balık, tavuk veya et seçeneklerinden birini seçer. Vejetaryen misafirler için biniş sırasında bilgi verirseniz ızgara sebze tabağı veya makarna alternatifi hazırlanır. Yemek baklava (fıstıklı, ballı, yufkalı) ve mevsim meyve tabağıyla kapatılır, Türk kahvesi veya çay eşliğinde.\n\nGold paketleri menüyü VIP seviyesine taşır — ek başlangıç seçenekleri, şef eşliğinde ana yemek servisi ve garantili sahneye yakın masa yerleşimi. Gold Sınırsız Alkol seçeneği VIP yemek menüsünün üstüne sınırsız yerli ve ithal alkollü içecek (rakı, şarap, bira, sert içkiler) ekler.\n\nÇocuklar tüm paketlerde memnuniyetle karşılanır. Çocuk dostu ortam, gösteri programı, aydınlatılmış Boğaz yelkeni ve aynı akşam yemeği menüsünü içerir. 3 yaş altı çocuklar ücretsizdir; 4-10 yaş arası için çocuk indirimi mevcuttur — rezervasyon sırasında doğrulayın. Aileler genellikle karma yaş grupları için en uygun format olarak Silver Soft Drinks paketini tercih eder.\n\nEğlence programı 3,5 saat içinde üç bölüm halinde akar: açılışta Türk folkloru ve oryantal dans, ortada Türk ve uluslararası hitlerden canlı müzik geçişi, finalde DJ liderliğinde dans. Sahne ana salonun merkezinde konumlanır — Gold masaları sahneye 5 metre içinde yerleştirilir. Program akşam yemeği servisiyle paralel yürür, böylece misafirler şovu izlemek için yemek molasına girmek zorunda kalmaz.\n\nİstanbul akşam yemekli boğaz turu Kabataş iskelesinden 20:30'da hareket eder. Avrupa yakası merkezi semtlerden (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) pickup tüm paketlere dahildir. Asya yakası misafirleri Kabataş'a kendi imkanlarıyla ulaşmalı — dönüş saati genellikle gece yarısı civarı olduğu için bu saatte ferry bağlantısı çalışmaz. 2001'den beri TURSAB A Grubu lisansıyla 50.000+ misafir ağırlamış olan Meryem Yıldız Travel, bu rotayı İstanbul'un en tutarlı puan alan paylaşımlı akşam yemekli tur ürünlerinden biri olarak işletmektedir.",
      duration: "3,5 saat",
      capacity: "Paylaşımlı akşam yemekli tekne (Silver standart / Gold sahneye yakın VIP)",
      route:
        "Kabataş iskelesi → Dolmabahçe önü → Boğaz Köprüsü kuzeyi → Rumeli Hisarı dönüşü → aydınlatılmış kıyı şeridi → Kabataş'a dönüş",
      departureTime: "20:30 kalkış (biniş 20:00'da başlar)",
      departurePoint:
        "Kabataş iskelesi (Dolmabahçe Sarayı'nın hemen güneyi). Avrupa yakası merkezi otellerinden ücretsiz pickup tüm paketlere dahildir — biniş öncesi WhatsApp ile saat ve nokta onaylanır.",
      includes: [
        "3,5 saatlik paylaşımlı akşam yemekli Boğaz turu",
        "Çok tabaklı Türk akşam yemeği (10 soğuk meze, salata, sıcak başlangıç, balık/tavuk/et ana yemek seçimi, baklava, meyve tabağı)",
        "Türk kahvesi veya çay",
        "Avrupa yakası merkezi otellerden ücretsiz pickup",
        "Türk gecesi eğlencesi — folklor, oryantal dans, canlı müzik, DJ",
        "Aydınlatılmış Boğaz yelken rotası",
        "Silver Alkollü: 2 bardak yerli alkollü içecek (şarap veya bira)",
        "Gold paketleri: sahneye yakın garantili VIP masa + daha geniş menü",
        "Gold Sınırsız Alkol: sınırsız yerli ve ithal alkollü içecek",
      ],
      notIncluded: [
        "Asya yakası pickup (sadece Avrupa yakası merkezi otellerden)",
        "Seçilen paketin dışında ek alkollü içecek",
        "Bahşiş (isteğe bağlı)",
      ],
      highlights: [
        "Dolmabahçe Sarayı (gece aydınlatması)",
        "Boğaz Köprüsü (renk şovu)",
        "Ortaköy Camii (Barok cephe)",
        "Kız Kulesi (uzaktan)",
        "Türk gecesi eğlencesi",
      ],
      importantNotes: [
        "Paketler: Silver Soft €30, Silver Alkollü €45, Gold Soft Drinks €80, Gold Sınırsız Alkol €90 — paket farkı içecek dahili ve masa kademesidir, rota aynıdır.",
        "Biniş Kabataş'tan 20:00'da başlar, tekne 20:30'da hareket eder. Pickup saati otelinize göre 19:00-19:45 arasında değişir, biniş öncesi WhatsApp ile onaylanır.",
        "Asya yakası misafirleri Kabataş'a kendi imkanlarıyla gelmeli — dönüş saati gece yarısı civarıdır, normal ferry hattı kapalıdır.",
      ],
      bestFor: [
        "Grup yemekleri",
        "Tam akşam eğlencesi arayanlar",
        "Yemek sevenler",
        "İstanbul'a ilk gelen turistler",
      ],
      availability: "Tüm yıl, 20:30 kalkış",
      enquiryLabel: "WhatsApp ile akşam yemekli tur sorgusu",
    },
    "yacht-charter-in-istanbul": {
      name: "İstanbul Özel Yat Kiralama",
      description:
        "İstanbul Boğaz'ında özel yat kiralama — €200'den başlıyor. Altı yatlık filo, 10-150 misafir kapasite aralığı, 2 saatlik minimum kiralama, 3 saatten itibaren %10 indirim. Kaptan ve mürettebat dahil.",
      longDescription:
        "MerrySails'in özel yat kiralama hizmeti, paylaşımlı turun aksine tüm tekneyi sadece sizin grubunuza ayırır. Filomuz altı farklı tekneden oluşur: çiftler ve küçük gruplar için butik yelken yatları (10-14 misafir), aile ve arkadaş buluşmaları için orta boy gruplar (15-40 misafir) ve düğün, kurumsal akşam yemekleri, marka açılışları gibi etkinlikler için event-yatları (40-150 misafir).\n\nTüm yat kiralamaları aynı temel formülü kullanır: tüm tekne özel olarak sizin için ayrılır, kaptan ve mürettebat hizmeti dahildir, alkolsüz içecekler ve atıştırmalıklar deck fiyatına dahildir, yakıt ve operasyon ücreti dahildir. Catering, alkol, DJ, canlı müzik, fotoğrafçı, evlilik teklifi süslemesi ve otel transferi ayrı tekliftedir — deck fiyatı temiz kalır, programı esnek tutarsınız.\n\nMinimum kiralama 2 saattir; 3 saatten itibaren toplam tutar üzerinden sabit %10 indirim uygulanır. Tipik kullanım senaryoları: 2 saatlik gün batımı veya Boğaz manzara turu, 3-4 saatlik kurumsal akşam yemeği veya doğum günü, 4-6 saatlik düğün veya tam etkinlik programı. Yat sınırı genelde 6 saattir, daha uzun program için özel teklif gerekir.\n\nRotayı siz seçersiniz. Kaptan size güncel hava ve trafik koşullarına göre öneride bulunur. En popüler rotalar: güney Boğaz hattı (Dolmabahçe → Ortaköy → Bebek → İlk Köprü → Rumeli Hisarı dönüşü, 2 saat), Kuruçeşme açıkları yüzme molası (yaz aylarında 3-4 saat), Karadeniz ağzına kadar uzun tur (5-6 saat, sadece düz havada). Tüm rotalar Kuruçeşme Marina kalkışlıdır — marina kapısı ve iskele numarası rezervasyon onayında bildirilir.\n\nFilodaki her yat Türk Denizcilik İdaresi güvenlik standartlarını karşılar ve maksimum yolcu sayısı operasyonel olarak kontrollüdür. Tüm yatlarda klimalı iç salon, ortak deck alanı ve özel banyo bulunur. Event-yatları (40+ kapasite) için ek hizmet alanları, DJ kurulumu için elektrik bağlantısı, garantili sahne alanı ve servis personeli için ayrı sıkça mevcuttur.\n\nMerrySails 2001'den beri TURSAB A Grubu lisansıyla faaliyet gösteren Meryem Yıldız Travel çatısı altındadır — 50.000+ misafir Boğaz'da ağırlanmıştır. Yat kiralama, evlilik teklifi, kurumsal kutlama, doğum günü ve düğün gibi yaşam dönüm noktalarınız için en sık tercih edilen format olmuştur.",
      duration: "2 saat (minimum) — 6 saate kadar uzatılabilir",
      capacity: "10-150 misafir (yatına bağlı olarak)",
      route:
        "Kuruçeşme Marina kalkışlı, rotayı siz belirlersiniz: güney Boğaz manzara, Kuruçeşme yüzme molası, Karadeniz ağzı uzun tur — kaptan hava ve trafik koşullarına göre önerir.",
      departureTime: "Esnek (sizin programınıza göre)",
      departurePoint:
        "Kuruçeşme Marina — marina kapısı ve iskele numarası, rezervasyon onayında WhatsApp ile gönderilir.",
      includes: [
        "Tüm tekne özel olarak grubunuza ayrılır (paylaşım yok)",
        "Kaptan ve mürettebat hizmeti",
        "Yakıt ve operasyon ücreti",
        "Alkolsüz içecekler — su, gazoz, çay, kahve",
        "Atıştırmalıklar — kuruyemiş, kraker, meyve tabağı",
        "Klimalı iç salon ve özel banyo",
        "Esnek rota — Boğaz manzara, yüzme molası veya uzun tur",
        "2 saat minimum, 3 saatten itibaren sabit %10 indirim",
      ],
      notIncluded: [
        "Catering (chef menü, alkol) — ayrı teklifte özelleştirilir",
        "DJ ve canlı müzik — ayrı tekliftedir",
        "Profesyonel fotoğrafçı — ayrı tekliftedir",
        "Evlilik teklifi süslemesi (çiçek, balon, mum) — ayrı tekliftedir",
        "Otel transferi (talep üzerine eklenir)",
      ],
      highlights: [
        "Kuruçeşme Marina'dan kalkış",
        "Dolmabahçe Sarayı",
        "Ortaköy Camii ve Boğaz Köprüsü",
        "Rumeli Hisarı",
        "Yüzme molası (yaz aylarında)",
        "Kız Kulesi",
      ],
      importantNotes: [
        "Fiyatlar yat tipine göre değişir: butik (€200-280/2sa), orta grup (€380-450/2sa), event-yatı (€680+/2sa). Tam fiyat WhatsApp talebinde grup büyüklüğü ve program detayına göre verilir.",
        "3 saatten itibaren toplam tutar üzerinden sabit %10 indirim otomatik uygulanır.",
        "Catering, alkol, DJ, fotoğrafçı gibi ekstralar deck fiyatına dahil değildir — istek doğrultusunda ayrı tekliftedir.",
        "Düğün, evlilik teklifi veya kurumsal etkinlik için 2-3 hafta önceden rezervasyon önerilir (sezon yaz aylarında dolar).",
      ],
      bestFor: [
        "Evlilik teklifi",
        "Doğum günü",
        "Yıldönümü",
        "Kurumsal etkinlik",
        "Düğün",
        "Bekarlığa veda",
        "Aile veya arkadaş grubu",
      ],
      availability: "Tüm yıl (yaz aylarında peak sezon)",
      enquiryLabel: "WhatsApp ile özel yat sorgu",
    },
  },
  de: {
    "bosphorus-sunset-cruise": {
      name: "Bosporus-Sonnenuntergangsfahrt",
      description:
        "Bosporus-Sonnenuntergangsfahrt in Istanbul — Mo, Di & Do ab €30 (andere Tage €34). 2-stündige Golden-Hour-Fahrt ab Karaköy mit Live-Guide auf Englisch und leichter Verpflegung. Zwei Optionen: ohne Wein und mit Wein.",
      longDescription:
        "Die gemeinsame Bosporus-Sonnenuntergangsfahrt von MerrySails wurde für Gäste konzipiert, die das Golden-Hour-Erlebnis auf der Meerenge genießen möchten, ohne ein komplettes Abendessenprogramm zu absolvieren. Das Einsteigen beginnt gegen 18:30 Uhr an der Promenade von Karaköy — wenige Schritte nördlich der Galata-Brücke — und die Yacht legt um 19:00 Uhr für eine ca. 2-stündige Schleife entlang des südlichen Bosporus ab.\n\nDer Bosporus ist eine 31 Kilometer lange Meerenge, die Europa von Asien trennt und das Schwarze Meer mit dem Marmarameer verbindet. Istanbul erstreckt sich über beide Ufer, und der südliche Teil der Meerenge — von der Altstadt bis Rumeli Hisarı — birgt die dichteste Konzentration osmanischen Uferer­bes im Land. Vom Deck aus passieren Sie den Dolmabahçe Sarayı (1856 von Sultan Abdülmecid I. erbauter Residenzpalast), den Mädchenturm auf seiner kleinen Insel etwa 200 Meter vor der asiatischen Küste, die Barockfassade der Ortaköy Camii vor der ersten Bosporus-Brücke und schließlich Rumeli Hisarı — die 1452 von Mehmed II. in nur vier Monaten errichtete Festung zur Kontrolle der Meerenge vor der Eroberung Konstantinopels. Die Yacht wendet dort und kehrt zurück, während der Himmel in die blaue Stunde übergeht.\n\nWir bieten zwei Preisstufen auf derselben Route. Der Grundtarif ohne Wein beträgt €34 (Mo/Di/Do €30), mit Wein €40 (gleiche drei Wochentage €35). Der Wochenrabatt wird automatisch beim Checkout angewendet — kein Gutscheincode erforderlich.\n\nDie Bewirtung an Bord ist in drei Kategorien aufgeteilt. Heißgetränke: frisch gebrühter Tee und türkischer Kaffee. Kaltgetränke: Eistee, hausgemachte Limonade, saisonaler Fruchtsaft und Mineralwasser in Flaschen. Snackteller mit gemischten Nüssen, gesalzenen Crackern und einer frischen Obstplatte wird ab Einstieg serviert. Gäste mit Wein-Option erhalten zusätzlich zwei Gläser Wein pro Person. Ein englischsprachiger Live-Guide kommentiert jeden Wahrzeichen.\n\nMerrySails operiert unter Meryem Yıldız Travel — TURSAB-A-lizenziert seit 2001, mit über 50.000 Gästen auf dem Bosporus.",
      route:
        "Karaköy-Promenade (nördlich der Galata-Brücke) → Dolmabahçe & Ortaköy → Erste Bosporus-Brücke → Rumeli Hisarı Wendepunkt → Rückkehr zur blauen Stunde",
      departureTime: "19:00 (Einsteigen ab 18:30)",
      departurePoint:
        "Karaköy-Promenade unmittelbar nördlich der Galata-Brücke — der genaue Anlegeplatz wird nach der Buchung per WhatsApp bestätigt.",
    },
    "bosphorus-dinner-cruise": {
      name: "Bosporus-Dinner-Kreuzfahrt",
      description:
        "Bosporus-Dinner-Kreuzfahrt in Istanbul — Silver-Paket ab €30, Gold Unlimited Alcohol ab €90. 3,5-stündige gemeinsame Fahrt ab Kabataş mit mehrgängigem türkischen Abendessen, Getränkepaket-Optionen und Live-Türkischer-Abend-Show.",
      longDescription:
        "Die gemeinsame Bosporus-Dinner-Kreuzfahrt von MerrySails führt auf derselben abendlichen Route durch vier öffentliche Pakete: Silver Soft Drinks €30, Silver Alcoholic €45, Gold Soft Drinks €80 und Gold Unlimited Alcohol €90. Alle Pakete fahren auf demselben Schiff dieselbe Route — der Paketunterschied liegt in Tischklasse, Getränkeangebot und Menüvielfalt.\n\nDie Kreuzfahrt dauert etwa 3,5 Stunden, läuft auf einem gemeinsamen Dinner-Schiff und folgt dem Kabataş-Einsteigeflow. Für die meisten zentralen Hotels auf der europäischen Seite ist der Hin- und Rücktransfer Teil der gemeinsamen Dinner-Operation. Der aktuelle Kalender zeigt Abfahrten um 20:30 Uhr.\n\nDer Abend kombiniert Abendessen-Service, Bühnenshow, DJ-Musik und beleuchtete Bosporus-Aussichten. Silver-Pakete bieten die operativ arrangierte Standardbestuhlung; Gold-Pakete bringen garantierte bühnennahe VIP-Tische, ein erweitertes Menü und einen premium-orientierten Service.\n\nDas Abendessen folgt der klassischen Türkischen-Abend-Bankettstruktur. Beide Stufen öffnen mit einem Begrüßungscocktail und einem Spread aus 10 kalten Mezes — typisch Bohnensalat, gefüllte Weinblätter (Yaprak Sarması), Hummus, Tarama, Hirtensalat, geröstete rote Paprika, Cacık (Joghurt mit Gurken und Minze), Auberginensalat, Weißkäse und saisonale Pickles. Ein frischer Saisonsalat und eine warme Vorspeise gehen dem Hauptgang voraus. Der Hauptgang wird als Live-Auswahl am Tisch serviert: Fisch, Hähnchen oder Fleisch. Vegetarier können auf Anfrage einen gegrillten Gemüseteller oder Pasta erhalten. Der Abend endet mit Baklava und einem frischen Obstteller, begleitet von türkischem Kaffee oder Tee.\n\nGold-Pakete heben das Erlebnis: erweiterte Vorspeisenoptionen, chef-betreuter Hauptgang-Service und garantierte bühnennahe Tischplatzierung. Gold Unlimited Alcohol erweitert das VIP-Menü um unbegrenzte lokale und importierte alkoholische Getränke (Rakı, Wein, Bier, Spirituosen).\n\nKinder sind auf allen Paketen willkommen. Das familienfreundliche Umfeld umfasst das Show-Programm, die beleuchtete Bosporus-Fahrt und dasselbe Abendessen-Menü. Kinder unter 3 fahren kostenlos; 4-10-Jährige erhalten Kinderrabatt — bei der Buchung bestätigen. Familien wählen oft Silver Soft Drinks als das komfortabelste Format für gemischte Altersgruppen.\n\nDas Unterhaltungsprogramm läuft in drei Akten über 3,5 Stunden: eine Eröffnung mit Türkischer Folklore und Bauchtanz, ein Live-Musik-Zwischenspiel mit türkischen und internationalen Hits, ein DJ-geführtes Finale. Die Bühne liegt zentral im Hauptsalon — Gold-Tische sind in 5 Metern Bühnenabstand positioniert.\n\nDie Istanbul-Dinner-Kreuzfahrt fährt um 20:30 Uhr vom Kabataş-Pier ab. Pickup aus zentralen europäischen Bezirken (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) ist in allen Paketen enthalten. Gäste auf der asiatischen Seite reisen eigenständig nach Kabataş — die Rückfahrt liegt typischerweise nach Mitternacht, wenn die regulären Fähren nicht mehr fahren. Mit 50.000+ Gästen seit 2001 unter TURSAB-A-Lizenz betreibt Meryem Yıldız Travel diese Route als eines der konstant am besten bewerteten gemeinsamen Dinner-Produkte in Istanbul.",
      route:
        "Kabataş-Pier → Dolmabahçe-Palast → Bosporus-Brücke (Nordkurs) → Rumeli-Hisarı-Wendepunkt → beleuchtete Küstenlinie → Rückkehr Kabataş",
      departureTime: "20:30 (Einsteigen ab 20:00)",
      departurePoint:
        "Kabataş-Pier (südlich des Dolmabahçe-Palasts). Pickup aus europäischen zentralen Hotels ist in allen Paketen inklusive — Zeit und Treffpunkt werden vor dem Einsteigen per WhatsApp bestätigt.",
    },
    "yacht-charter-in-istanbul": {
      name: "Privater Yachtcharter Istanbul",
      description:
        "Privater Yachtcharter auf dem Bosporus in Istanbul — ab €200. Sechs-Yacht-Flotte mit 10-150 Gäste-Kapazität, 2-Stunden-Mindestcharter, 10% Rabatt ab 3 Stunden. Kapitän und Crew inklusive.",
      longDescription:
        "Privater Yachtcharter mit MerrySails reserviert das gesamte Schiff exklusiv für Ihre Gruppe. Unsere Flotte umfasst sechs verschiedene Yachten: Boutique-Segelyachten für Paare und kleine Gruppen (10-14 Gäste), mittelgroße Schiffe für Familien- und Freundestreffen (15-40 Gäste) und Event-Yachten für Hochzeiten, Firmen-Dinner und Markenabende (40-150 Gäste).\n\nAlle Yachtcharter folgen derselben Grundformel: das gesamte Schiff wird privat für Sie reserviert, Kapitän und Crew sind inklusive, alkoholfreie Getränke und Snacks sind im Deckpreis enthalten, Kraftstoff und Betriebskosten ebenfalls. Catering, Alkohol, DJ, Live-Musik, Fotograf, Antrag-Styling und Hoteltransfer sind separat angebbar — der Deckpreis bleibt sauber, das Programm flexibel.\n\nMindestcharter sind 2 Stunden; ab 3 Stunden gilt ein fester 10%-Rabatt auf den Gesamtbetrag. Typische Anwendungen: 2-stündige Sonnenuntergangsfahrt oder Bosporus-Sightseeing, 3-4-stündiges Firmenabendessen oder Geburtstag, 4-6-stündige Hochzeit oder vollständiges Event-Programm. Die Yacht-Grenze liegt normalerweise bei 6 Stunden; längere Programme erfordern ein individuelles Angebot.\n\nSie wählen die Route. Der Kapitän schlägt nach Wetter- und Verkehrslage Optionen vor. Die beliebtesten Routen: südliche Bosporus-Linie (Dolmabahçe → Ortaköy → Bebek → Erste Brücke → Rumeli-Hisarı-Wende, 2 Stunden), Kuruçeşme-Ankerstopp zum Schwimmen (Sommer, 3-4 Stunden), Schwarzmeer-Mündung als Langroute (5-6 Stunden, nur bei ruhigem Wetter). Alle Routen starten in der Kuruçeşme Marina — Tor- und Berthnummer werden in der Buchungsbestätigung mitgeteilt.\n\nJede Yacht der Flotte erfüllt die Sicherheitsstandards der Türkischen Maritimen Verwaltung und die Maximalkapazität wird operativ kontrolliert. Alle Yachten verfügen über klimatisierte Innensalons, gemeinsame Decks und private Bäder. Event-Yachten (40+ Kapazität) bieten zusätzlich Service-Bereiche, DJ-Stromanschlüsse, garantierte Bühnenflächen und separate Crew-Räume.\n\nMerrySails arbeitet unter Meryem Yıldız Travel mit TURSAB-A-Gruppen-Lizenz seit 2001 — 50.000+ Gäste wurden auf dem Bosporus betreut. Yachtcharter ist das meistgewählte Format für Heiratsanträge, Firmenfeiern, Geburtstage und Hochzeiten geworden.",
      route:
        "Abfahrt Kuruçeşme Marina — Route nach Wunsch: südliche Bosporus-Linie, Kuruçeşme-Schwimmstopp oder Schwarzmeer-Langroute. Der Kapitän empfiehlt nach Wetter und Verkehr.",
      departureTime: "Flexibel (nach Ihrem Programm)",
      departurePoint:
        "Kuruçeşme Marina — Tor- und Berthnummer in der Buchungsbestätigung per WhatsApp.",
    },
  },
  fr: {
    "bosphorus-sunset-cruise": {
      name: "Croisière au Coucher du Soleil sur le Bosphore",
      description:
        "Croisière au coucher du soleil sur le Bosphore à Istanbul — à partir de €30 le lundi, mardi et jeudi (€34 autres jours). 2 heures de navigation à l'heure dorée depuis Karaköy, guide en direct, rafraîchissements légers. Deux options : sans vin et avec vin.",
      longDescription:
        "La croisière au coucher du soleil sur le Bosphore de MerrySails est conçue pour les voyageurs qui souhaitent vivre l'expérience de l'heure dorée sur le détroit sans s'engager dans un programme complet de dîner. L'embarquement commence vers 18h30 sur le quai de Karaköy — quelques minutes au nord du pont de Galata — et le yacht quitte le port à 19h00 pour une boucle d'environ 2 heures le long du Bosphore sud.\n\nLe Bosphore est un détroit de 31 kilomètres séparant l'Europe de l'Asie et reliant la mer Noire à la mer de Marmara. Istanbul s'étend sur les deux rives, et la partie sud du détroit — de la vieille ville jusqu'à Rumeli Hisarı — abrite la plus dense concentration de patrimoine ottoman riverain du pays. Depuis le pont vous longerez le palais Dolmabahçe Sarayı (résidence impériale construite en 1856 pour le sultan Abdülmecid Ier), la Tour de Léandre sur son petit îlot à environ 200 mètres de la rive asiatique, la façade baroque de 1853 de la mosquée Ortaköy Camii devant le premier pont du Bosphore, et enfin Rumeli Hisarı — la forteresse érigée en quatre mois par Mehmed II en 1452 pour contrôler le détroit avant la conquête de Constantinople. Le yacht fait demi-tour à cet endroit et revient vers le sud à l'heure bleue.\n\nNous proposons deux niveaux tarifaires sur la même route. Le tarif de base Sans Vin est de €34 (€30 le lundi, mardi et jeudi) et le tarif Avec Vin est de €40 (€35 ces trois mêmes jours). La remise de semaine s'applique automatiquement au moment du paiement — aucun code promo nécessaire.\n\nLa restauration à bord est répartie en trois petites catégories. Boissons chaudes : thé infusé et café turc. Boissons fraîches : thé glacé, limonade maison, jus de fruits de saison et eau en bouteille. Une assiette d'amuse-bouche avec noix mélangées, biscuits salés et plateau de fruits frais est servie dès l'embarquement. Les voyageurs avec l'option Avec Vin reçoivent en plus deux verres de vin par personne. Un guide anglophone en direct commente chaque point d'intérêt.\n\nMerrySails opère sous Meryem Yıldız Travel — licence TURSAB A-Group depuis 2001, avec plus de 50 000 voyageurs accueillis sur le Bosphore.",
      route:
        "Quai de Karaköy (nord du pont de Galata) → Dolmabahçe & Ortaköy → Premier pont du Bosphore → Demi-tour à Rumeli Hisarı → retour à l'heure bleue",
      departureTime: "19h00 (embarquement à partir de 18h30)",
      departurePoint:
        "Quai de Karaköy juste au nord du pont de Galata — l'emplacement exact d'embarquement vous sera communiqué par WhatsApp après la réservation.",
    },
    "bosphorus-dinner-cruise": {
      name: "Croisière-Dîner sur le Bosphore",
      description:
        "Croisière-dîner sur le Bosphore à Istanbul — formule Silver Soft à partir de €30, Gold Unlimited Alcohol à €90. 3h30 de navigation partagée depuis Kabataş avec dîner turc complet, options de boissons et spectacle live de soirée turque.",
      longDescription:
        "La croisière-dîner partagée du Bosphore de MerrySails propose quatre formules publiques sur la même route nocturne : Silver Soft Drinks €30, Silver Alcoholic €45, Gold Soft Drinks €80 et Gold Unlimited Alcohol €90. Les quatre formules naviguent sur le même bateau, suivent le même itinéraire et bénéficient du même service de dîner — la différence porte sur la catégorie de table, l'offre de boissons et l'étendue du menu.\n\nLa croisière dure environ 3h30 et part chaque soir à 20h30 depuis le pier de Kabataş, sur la rive européenne, juste au sud du palais Dolmabahçe. Le transfert hôtel aller-retour est inclus dans toutes les formules pour les hôtels centraux de la rive européenne : Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu et Karaköy. Les voyageurs côté asiatique rejoignent Kabataş par leurs propres moyens, car les ferries publics ne fonctionnent plus au retour après minuit.\n\nLe dîner suit la structure du traditionnel banquet de soirée turque. L'ouverture combine un cocktail de bienvenue et un assortiment de 10 mezze froids — typiquement salade de haricots, feuilles de vigne farcies (yaprak sarması), houmous, tarama, salade berger, poivrons rouges grillés, cacık (yaourt au concombre et à la menthe), salade d'aubergines, fromage blanc et pickles de saison. Une salade fraîche et une entrée chaude précèdent le plat principal. Le plat principal est sélectionné à table : poisson, poulet ou viande. Une option végétarienne (légumes grillés ou pâtes) est disponible sur demande. La soirée se termine par baklava et plateau de fruits frais, accompagnés de café turc ou thé.\n\nLes formules Gold élèvent l'expérience : choix de mezze élargi, service du plat principal assuré par le chef et placement de table proche de la scène garanti. Gold Unlimited Alcohol ajoute en plus un open-bar illimité de boissons alcoolisées locales et importées — rakı, vin, bière et spiritueux.\n\nLe programme de divertissement se déploie en trois actes sur les 3h30. Acte 1 : folklore turc et danse du ventre. Acte 2 : musique live avec un répertoire de standards turcs et internationaux. Acte 3 : DJ. La scène est centrale dans le salon principal et les tables Gold sont positionnées à environ 5 mètres de la scène.\n\nLes enfants sont les bienvenus sur toutes les formules. Les moins de 3 ans naviguent gratuitement ; les 4-10 ans bénéficient d'un tarif enfant — à confirmer au moment de la réservation. Les familles choisissent souvent Silver Soft Drinks comme le format le plus confortable pour les groupes intergénérationnels.\n\nMerrySails opère sous Meryem Yıldız Travel avec licence TURSAB-A depuis 2001 et a accueilli plus de 50 000 voyageurs sur le Bosphore. La croisière-dîner reste l'un des produits partagés les mieux notés à Istanbul.",
      route:
        "Pier de Kabataş → Palais de Dolmabahçe → Pont du Bosphore (cap nord) → Demi-tour Rumeli Hisarı → côte illuminée → retour à Kabataş",
      departureTime: "20h30 (embarquement à partir de 20h00)",
      departurePoint:
        "Pier de Kabataş (juste au sud du palais Dolmabahçe). Le transfert depuis les hôtels centraux européens est inclus dans toutes les formules — l'heure et le point de prise en charge sont confirmés par WhatsApp avant l'embarquement.",
    },
    "yacht-charter-in-istanbul": {
      name: "Location Privée de Yacht à Istanbul",
      description:
        "Location privée de yacht sur le Bosphore à Istanbul — à partir de €200. Flotte de six yachts pour 10 à 150 invités, durée minimale 2 heures, remise de 10% à partir de 3 heures. Capitaine et équipage inclus.",
      longDescription:
        "La location privée de yacht avec MerrySails vous réserve l'intégralité du bateau en exclusivité pour votre groupe. Notre flotte compte six yachts différents : voiliers boutique pour couples et petits groupes (10-14 invités), bateaux de taille moyenne pour réunions de famille ou d'amis (15-40 invités), et yachts événementiels pour mariages, dîners d'entreprise et soirées de marque (40-150 invités).\n\nChaque location suit la même formule de base : le bateau entier est réservé en privé pour votre groupe, le capitaine et l'équipage sont inclus, les boissons non alcoolisées et amuse-bouches sont compris dans le tarif de pont, et le carburant ainsi que les frais opérationnels sont également couverts. Le traiteur, l'alcool, le DJ, la musique live, le photographe, la décoration pour demande en mariage et les transferts hôtel sont des options ajoutables séparément — le prix de base reste net, le programme reste flexible.\n\nLa durée minimale de location est de 2 heures ; à partir de 3 heures une remise fixe de 10 % est appliquée sur le total. Cas d'usage typiques : coucher de soleil ou sightseeing Bosphore en 2 heures, dîner d'entreprise ou anniversaire en 3-4 heures, mariage ou programme événementiel complet en 4-6 heures. La durée pratique se situe normalement autour de 6 heures ; au-delà, un devis personnalisé est nécessaire.\n\nVous choisissez l'itinéraire ; le capitaine propose des options selon la météo et le trafic. Les itinéraires les plus demandés : ligne sud du Bosphore (Dolmabahçe → Ortaköy → Bebek → Premier pont → demi-tour à Rumeli Hisarı, 2 heures), arrêt baignade à Kuruçeşme (été, 3-4 heures), embouchure de la mer Noire en programme long (5-6 heures, météo calme uniquement). Toutes les locations partent de la marina de Kuruçeşme ; le numéro de porte et de poste d'amarrage est communiqué dans la confirmation de réservation.\n\nChaque yacht de la flotte respecte les standards de sécurité de l'Administration Maritime Turque et la capacité maximale est contrôlée opérationnellement. Tous les yachts disposent de salons intérieurs climatisés, de ponts partagés et de salles de bain privées. Les yachts événementiels (40+ capacité) ajoutent des zones de service, des branchements DJ, des surfaces de scène garanties et des espaces équipage séparés.\n\nMerrySails opère sous Meryem Yıldız Travel avec licence TURSAB-A depuis 2001 — plus de 50 000 voyageurs accueillis sur le Bosphore. La location privée de yacht est devenue le format le plus choisi pour les demandes en mariage, les fêtes d'entreprise, les anniversaires et les mariages.",
      route:
        "Départ marina de Kuruçeşme — itinéraire au choix : ligne sud du Bosphore, arrêt baignade à Kuruçeşme ou programme long mer Noire. Le capitaine recommande selon la météo et le trafic.",
      departureTime: "Flexible (selon votre programme)",
      departurePoint:
        "Marina de Kuruçeşme — numéro de porte et de poste d'amarrage envoyés dans la confirmation de réservation par WhatsApp.",
    },
  },
  nl: {
    "bosphorus-sunset-cruise": {
      name: "Bosporus-Zonsondergangscruise",
      description:
        "Bosporus-zonsondergangscruise in Istanbul — vanaf €30 op maandag, dinsdag en donderdag (€34 op andere dagen). 2 uur varen tijdens het gouden uur vanaf Karaköy, live Engelstalige gids, lichte verfrissingen. Twee opties: zonder wijn en met wijn.",
      longDescription:
        "De gedeelde Bosporus-zonsondergangscruise van MerrySails is bedoeld voor reizigers die de gouden-uur-ervaring op de straat willen meemaken zonder zich vast te leggen op een volledig dinerprogramma. Inschepen begint rond 18:30 uur op de kade van Karaköy — een paar minuten ten noorden van de Galatabrug — en het jacht vertrekt om 19:00 uur voor een lus van ongeveer 2 uur langs de zuidelijke Bosporus.\n\nDe Bosporus is een 31 kilometer lange zeestraat die Europa van Azië scheidt en de Zwarte Zee met de Zee van Marmara verbindt. Istanbul strekt zich uit over beide oevers, en het zuidelijke deel van de straat — van de oude binnenstad tot Rumeli Hisarı — herbergt de dichtste concentratie Ottomaans waterfront-erfgoed van het land. Vanaf het dek passeert u het paleis Dolmabahçe Sarayı (residentiepaleis gebouwd in 1856 voor sultan Abdülmecid I), de Maagdentoren op zijn kleine eilandje op ongeveer 200 meter van de Aziatische kust, de barokgevel uit 1853 van de Ortaköy-moskee voor de eerste Bosporusbrug, en tot slot Rumeli Hisarı — de vesting die Mehmed II in vier maanden liet bouwen in 1452 om de straat te beheersen voor de verovering van Constantinopel. Hier maakt het jacht rechtsomkeert en vaart zuidwaarts terug terwijl de lucht overgaat naar het blauwe uur.\n\nWij bieden twee prijscategorieën op dezelfde route. Het basistarief Zonder Wijn is €34 (€30 op maandag, dinsdag en donderdag) en het tarief Met Wijn is €40 (€35 op diezelfde drie weekdagen). De doordeweekse korting wordt automatisch toegepast bij het afrekenen — er is geen kortingscode nodig en de prijs blijft het hele jaar stabiel.\n\nDe verfrissingen aan boord zijn in drie kleine categorieën verdeeld. Warme dranken: verse thee en Turkse koffie. Koude dranken: ijsthee, huisgemaakte limonade, seizoensvruchtensap en flessenwater. Een hapjesschaal met gemengde noten, gezouten crackers en een vers fruitschotel wordt direct na het inschepen geserveerd. Reizigers met de optie Met Wijn ontvangen daarbij twee glazen wijn per persoon. Een Engelstalige live gids becommentarieert elk bezienswaardigheidspunt.\n\nMerrySails opereert onder Meryem Yıldız Travel — TURSAB A-Group gelicentieerd sinds 2001, met meer dan 50.000 gasten ontvangen op de Bosporus.",
      route:
        "Kade van Karaköy (ten noorden van de Galatabrug) → Dolmabahçe en Ortaköy → Eerste Bosporusbrug → Rumeli Hisarı keerpunt → terug tijdens het blauwe uur",
      departureTime: "19:00 (inschepen vanaf 18:30)",
      departurePoint:
        "Kade van Karaköy direct ten noorden van de Galatabrug — de exacte aanlegplek wordt na de boeking via WhatsApp bevestigd.",
    },
    "bosphorus-dinner-cruise": {
      name: "Bosporus-Dinercruise",
      description:
        "Bosporus-dinercruise in Istanbul — Silver Soft-pakket vanaf €30, Gold Unlimited Alcohol €90. 3,5 uur gedeelde avondvaart vanaf Kabataş met meergangs Turks diner, drankenpakket-opties en live Turkse avondshow.",
      longDescription:
        "De gedeelde Bosporus-dinercruise van MerrySails biedt vier publieke pakketten op dezelfde avondroute: Silver Soft Drinks €30, Silver Alcoholic €45, Gold Soft Drinks €80 en Gold Unlimited Alcohol €90. Alle pakketten varen op hetzelfde schip, volgen dezelfde route en krijgen dezelfde dinerservice — het verschil zit in de tafelklasse, het drankenaanbod en de menubreedte.\n\nDe cruise duurt ongeveer 3,5 uur en vertrekt elke avond om 20:30 vanaf de Kabataş-pier op de Europese kant, net ten zuiden van het paleis Dolmabahçe. De heen- en terugtransfer is bij alle pakketten inbegrepen voor centrale Europese hotels: Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu en Karaköy. Reizigers aan de Aziatische kant reizen op eigen gelegenheid naar Kabataş, omdat de openbare veerboten na middernacht niet meer terugvaren.\n\nHet diner volgt de klassieke Turkse-avondbanketstructuur. De opening combineert een welkomstcocktail en een assortiment van 10 koude mezzes — typisch een bonensalade, gevulde wijnbladeren (yaprak sarması), hummus, tarama, herderssalade, geroosterde rode paprika's, cacık (yoghurt met komkommer en munt), auberginesalade, witte kaas en seizoenspickles. Een verse seizoenssalade en een warm voorgerecht gaan vooraf aan het hoofdgerecht. Het hoofdgerecht wordt aan tafel gekozen: vis, kip of vlees. Een vegetarisch alternatief (gegrilde groente of pasta) is op verzoek beschikbaar. De avond eindigt met baklava en een vers fruitschotel, vergezeld van Turkse koffie of thee.\n\nGold-pakketten heffen de ervaring op een hoger niveau: uitgebreidere mezze-keuze, hoofdgerechtservice door de chef en gegarandeerde tafelplaatsing dicht bij het podium. Gold Unlimited Alcohol voegt daar onbeperkte lokale en geïmporteerde alcoholische dranken aan toe — rakı, wijn, bier en sterke drank.\n\nHet entertainmentprogramma loopt in drie aktes over de volle 3,5 uur. Akte 1: Turkse folklore en buikdans. Akte 2: live muziek met een repertoire van Turkse en internationale klassiekers. Akte 3: DJ-finale. Het podium staat centraal in de hoofdsalon en Gold-tafels zijn ongeveer 5 meter van het podium geplaatst.\n\nKinderen zijn welkom op alle pakketten. Onder de 3 jaar varen gratis; 4-10 jaar krijgen kindertarief — bij het boeken te bevestigen. Gezinnen kiezen vaak Silver Soft Drinks als het comfortabelste format voor gemengde leeftijdsgroepen.\n\nMerrySails opereert onder Meryem Yıldız Travel met TURSAB-A-licentie sinds 2001 en heeft meer dan 50.000 reizigers ontvangen op de Bosporus. De dinercruise blijft een van de best beoordeelde gedeelde producten in Istanbul.",
      route:
        "Kabataş-pier → Dolmabahçe-paleis → Bosporusbrug (noordkoers) → Rumeli Hisarı keerpunt → verlichte kustlijn → terug naar Kabataş",
      departureTime: "20:30 (inschepen vanaf 20:00)",
      departurePoint:
        "Kabataş-pier (net ten zuiden van het Dolmabahçe-paleis). Transfer vanuit centrale Europese hotels is bij alle pakketten inbegrepen — tijd en ontmoetingspunt worden vóór het inschepen via WhatsApp bevestigd.",
    },
    "yacht-charter-in-istanbul": {
      name: "Privé Jachtcharter Istanbul",
      description:
        "Privé jachtcharter op de Bosporus in Istanbul — vanaf €200. Vloot van zes jachten voor 10 tot 150 gasten, minimumduur 2 uur, 10% korting vanaf 3 uur. Kapitein en bemanning inbegrepen.",
      longDescription:
        "Privé jachtcharter met MerrySails reserveert het volledige schip exclusief voor uw groep. Onze vloot bestaat uit zes verschillende jachten: boutique zeiljachten voor stellen en kleine groepen (10-14 gasten), middelgrote schepen voor familie- en vriendenbijeenkomsten (15-40 gasten) en eventjachten voor bruiloften, bedrijfsdiners en merkavonden (40-150 gasten).\n\nElke jachtcharter volgt dezelfde basisformule: het volledige schip wordt privé gereserveerd voor uw groep, de kapitein en de bemanning zijn inbegrepen, niet-alcoholische dranken en hapjes zitten bij de dekprijs in, en brandstof en bedrijfskosten zijn eveneens gedekt. Catering, alcohol, DJ, live muziek, fotograaf, huwelijksaanzoek-styling en hoteltransfer zijn losse opties — de basisprijs blijft schoon, het programma blijft flexibel.\n\nMinimumcharterduur is 2 uur; vanaf 3 uur geldt een vaste korting van 10% op het totaalbedrag. Typische toepassingen: zonsondergang of Bosporus-sightseeing in 2 uur, bedrijfsdiner of verjaardag in 3-4 uur, bruiloft of volledig eventprogramma in 4-6 uur. De praktische grens ligt rond 6 uur; langere programma's vereisen een persoonlijke offerte.\n\nU kiest de route. De kapitein adviseert opties afhankelijk van weer en verkeer. De meest gevraagde routes: zuidelijke Bosporus-lijn (Dolmabahçe → Ortaköy → Bebek → Eerste brug → Rumeli Hisarı keerpunt, 2 uur), Kuruçeşme-ankerstop voor zwemmen (zomer, 3-4 uur), Zwarte Zee-monding als lange route (5-6 uur, alleen bij rustig weer). Alle charters vertrekken vanaf de Kuruçeşme Marina; poort- en steigernummer worden in de boekingsbevestiging meegestuurd.\n\nElk jacht in de vloot voldoet aan de veiligheidsnormen van de Turkse Maritieme Administratie en de maximale capaciteit wordt operationeel gecontroleerd. Alle jachten beschikken over geklimatiseerde binnenruimtes, gedeelde dekken en privé badkamers. Eventjachten (40+ capaciteit) bieden bovendien serviceruimtes, DJ-stroomaansluitingen, gegarandeerde podiumoppervlaktes en aparte bemanningsruimtes.\n\nMerrySails opereert onder Meryem Yıldız Travel met TURSAB-A-licentie sinds 2001 — meer dan 50.000 reizigers ontvangen op de Bosporus. Privé jachtcharter is het meest gekozen format geworden voor huwelijksaanzoeken, bedrijfsfeesten, verjaardagen en bruiloften.",
      route:
        "Vertrek Kuruçeşme Marina — route naar keuze: zuidelijke Bosporus-lijn, Kuruçeşme-zwemstop of Zwarte Zee-lange route. De kapitein adviseert op basis van weer en verkeer.",
      departureTime: "Flexibel (volgens uw programma)",
      departurePoint:
        "Kuruçeşme Marina — poort- en steigernummer worden in de boekingsbevestiging via WhatsApp meegedeeld.",
    },
  },
  ru: {
    "bosphorus-sunset-cruise": {
      name: "Круиз по Босфору на закате",
      description:
        "Круиз по Босфору на закате в Стамбуле — от €30 по понедельникам, вторникам и четвергам (€34 в остальные дни). 2-часовая прогулка в золотой час от Каракёй, англоязычный гид в реальном времени, лёгкие закуски. Два варианта: без вина и с вином.",
      longDescription:
        "Совместный круиз по Босфору на закате от MerrySails создан для путешественников, которые хотят увидеть Босфор в час золотого света, не связывая себя полноценной программой с ужином. Посадка начинается около 18:30 на пирсе Каракёй — в нескольких минутах к северу от Галатского моста — и яхта отчаливает в 19:00 в примерно 2-часовой круг вдоль южного Босфора.\n\nБосфор — это пролив длиной 31 километр, отделяющий Европу от Азии и соединяющий Чёрное море с Мраморным. Стамбул раскинут на обоих берегах, и южная часть пролива — от исторического центра до Румели Хисары — содержит самую плотную в стране концентрацию османского прибрежного наследия. С палубы вы пройдёте мимо дворца Долмабахче (имперской резиденции, построенной в 1856 году для султана Абдул-Меджида I), Девичьей башни на маленьком островке примерно в 200 метрах от азиатского берега, барочного фасада 1853 года мечети Ортакёй перед первым Босфорским мостом и, наконец, крепости Румели Хисары — построенной за четыре месяца Мехмедом II в 1452 году для контроля над проливом перед взятием Константинополя. Яхта разворачивается здесь и идёт обратно на юг, пока небо переходит в синий час.\n\nМы предлагаем два уровня цены на одном и том же маршруте. Базовый тариф без вина — €34 (€30 по понедельникам, вторникам и четвергам), тариф с вином — €40 (€35 в те же три будних дня). Будничная скидка применяется автоматически при оформлении заказа — промокод не нужен, и цена остаётся стабильной круглый год.\n\nЗакуски на борту разделены на три небольшие категории. Горячие напитки: свежезаваренный чай и турецкий кофе. Холодные напитки: ледяной чай, домашний лимонад, сезонный фруктовый сок и бутилированная вода. Тарелка закусок с орехами, солёными крекерами и свежим фруктовым ассорти подаётся сразу после посадки. Гости с опцией «с вином» дополнительно получают два бокала вина на человека. Англоязычный гид в реальном времени комментирует каждую достопримечательность.\n\nMerrySails работает под Meryem Yıldız Travel — лицензия TURSAB A-Group с 2001 года, более 50 000 гостей приняты на Босфоре.",
      route:
        "Пирс Каракёй (к северу от Галатского моста) → Долмабахче и Ортакёй → Первый Босфорский мост → Разворот у Румели Хисары → возвращение в синий час",
      departureTime: "19:00 (посадка с 18:30)",
      departurePoint:
        "Пирс Каракёй сразу к северу от Галатского моста — точное место посадки подтверждается по WhatsApp после бронирования.",
    },
    "bosphorus-dinner-cruise": {
      name: "Круиз по Босфору с ужином",
      description:
        "Круиз по Босфору с ужином в Стамбуле — пакет Silver Soft от €30, Gold Unlimited Alcohol €90. 3,5 часа совместного вечернего плавания от Кабаташ с многослойным турецким ужином, вариантами напитков и живым шоу «Турецкая ночь».",
      longDescription:
        "Совместный круиз по Босфору с ужином от MerrySails предлагает четыре публичных пакета на одном и том же вечернем маршруте: Silver Soft Drinks €30, Silver Alcoholic €45, Gold Soft Drinks €80 и Gold Unlimited Alcohol €90. Все четыре пакета плывут на одном и том же судне, следуют по одному и тому же маршруту и получают одинаковый сервис ужина — различия касаются только класса столика, перечня напитков и широты меню.\n\nКруиз длится примерно 3,5 часа и отправляется каждый вечер в 20:30 от пирса Кабаташ на европейской стороне, чуть южнее дворца Долмабахче. Трансфер из отеля туда и обратно включён во все пакеты для центральных европейских отелей: Султанахмет, Сиркеджи, Топкапы, Таксим, Харбие, Бейоглу и Каракёй. Гости с азиатской стороны добираются до Кабаташ самостоятельно — обратные рейсы общественных паромов после полуночи не работают.\n\nУжин следует классической структуре банкета «Турецкая ночь». Открытие — приветственный коктейль и набор из 10 холодных мезе: типично салат из фасоли, фаршированные виноградные листья (япрак сармасы), хумус, тарама, пастуший салат, печёный красный перец, джаджик (йогурт с огурцом и мятой), баклажанный салат, белый сыр и сезонные пикули. Свежий сезонный салат и горячая закуска предшествуют основному блюду. Основное блюдо выбирается за столом: рыба, курица или мясо. По запросу доступно вегетарианское блюдо (овощи на гриле или паста). Вечер завершается баклавой и тарелкой свежих фруктов с турецким кофе или чаем.\n\nGold-пакеты поднимают опыт на уровень выше: расширенный выбор мезе, обслуживание основного блюда шеф-поваром и гарантированное размещение столика близко к сцене. Gold Unlimited Alcohol дополнительно включает безлимитный местный и импортный алкоголь — ракы, вино, пиво и крепкие напитки.\n\nПрограмма развлечений идёт в трёх актах на протяжении 3,5 часов. Акт 1 — турецкий фольклор и танец живота. Акт 2 — живая музыка с репертуаром турецкой и международной классики. Акт 3 — финальный DJ-сет. Сцена расположена по центру главного салона, столики Gold находятся примерно в 5 метрах от сцены.\n\nДети приветствуются на всех пакетах. Дети до 3 лет плавают бесплатно; для возраста 4-10 лет действует детский тариф — уточняется при бронировании. Семьи часто выбирают Silver Soft Drinks как наиболее удобный формат для смешанных возрастных групп.\n\nMerrySails работает под Meryem Yıldız Travel с лицензией TURSAB-A с 2001 года и принял более 50 000 гостей на Босфоре. Круиз с ужином остаётся одним из наиболее высоко оценённых совместных продуктов в Стамбуле.",
      route:
        "Пирс Кабаташ → дворец Долмабахче → Босфорский мост (северный курс) → разворот у Румели Хисары → подсвеченное побережье → возвращение в Кабаташ",
      departureTime: "20:30 (посадка с 20:00)",
      departurePoint:
        "Пирс Кабаташ (сразу южнее дворца Долмабахче). Трансфер из центральных европейских отелей включён во все пакеты — время и точка встречи подтверждаются по WhatsApp перед посадкой.",
    },
    "yacht-charter-in-istanbul": {
      name: "Частная аренда яхты в Стамбуле",
      description:
        "Частная аренда яхты на Босфоре в Стамбуле — от €200. Флот из шести яхт от 10 до 150 гостей, минимум 2 часа аренды, скидка 10% от 3 часов. Капитан и команда включены.",
      longDescription:
        "Частная аренда яхты с MerrySails резервирует всё судно эксклюзивно для вашей группы. Наш флот состоит из шести разных яхт: бутиковые парусные яхты для пар и небольших групп (10-14 гостей), суда среднего размера для семейных и дружеских встреч (15-40 гостей) и event-яхты для свадеб, корпоративных ужинов и брендовых вечеров (40-150 гостей).\n\nКаждая аренда следует одной и той же базовой формуле: всё судно резервируется приватно для вашей группы, капитан и команда включены, безалкогольные напитки и закуски входят в палубную стоимость, топливо и операционные расходы также покрыты. Кейтеринг, алкоголь, DJ, живая музыка, фотограф, стайлинг для предложения руки и сердца и трансфер из отеля — отдельные опции. Базовая цена остаётся чистой, программа — гибкой.\n\nМинимальный срок аренды — 2 часа; начиная с 3 часов действует фиксированная скидка 10% на общую сумму. Типичные сценарии: 2-часовой круиз на закат или осмотр Босфора, 3-4-часовой корпоративный ужин или день рождения, 4-6-часовая свадьба или полноценная событийная программа. Практическая граница — около 6 часов; более длинные программы требуют индивидуального расчёта.\n\nВы выбираете маршрут; капитан предлагает варианты в зависимости от погоды и трафика. Самые востребованные маршруты: южная линия Босфора (Долмабахче → Ортакёй → Бебек → Первый мост → разворот у Румели Хисары, 2 часа), якорная стоянка для купания в Куручешме (лето, 3-4 часа), устье Чёрного моря как длинная программа (5-6 часов, только в спокойную погоду). Все аренды стартуют от Куручешме Марина; номер ворот и причала отправляется в подтверждении бронирования.\n\nКаждая яхта во флоте соответствует стандартам безопасности Турецкой морской администрации, а максимальная вместимость контролируется операционно. Все яхты имеют кондиционируемые внутренние салоны, общие палубы и приватные ванные комнаты. Event-яхты (вместимость 40+) дополнительно предлагают сервисные зоны, точки подключения DJ, гарантированные сценические площадки и отдельные помещения для экипажа.\n\nMerrySails работает под Meryem Yıldız Travel с лицензией TURSAB-A с 2001 года — более 50 000 путешественников приняты на Босфоре. Частная аренда яхты стала самым выбираемым форматом для предложений руки и сердца, корпоративных праздников, дней рождения и свадеб.",
      route:
        "Отправление от Куручешме Марина — маршрут на выбор: южная линия Босфора, стоянка для купания в Куручешме или длинная программа к Чёрному морю. Капитан рекомендует исходя из погоды и трафика.",
      departureTime: "Гибко (по вашей программе)",
      departurePoint:
        "Куручешме Марина — номер ворот и причала отправляется в подтверждении бронирования через WhatsApp.",
    },
  },
};

/** Apply locale overrides to a tour. Empty fields fall back to EN. */
export function applyTourLocale(tour: Tour, locale: string | undefined): Tour {
  if (!locale || locale === "en") return tour;
  const localeBlock = overrides[locale];
  if (!localeBlock) return tour;
  const slugOverride = localeBlock[tour.slug];
  if (!slugOverride) return tour;
  // Spread tour first, then override — only filled-in fields replace EN.
  return { ...tour, ...slugOverride };
}
