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
