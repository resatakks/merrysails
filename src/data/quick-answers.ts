/**
 * QuickAnswer copy registry — 40-60 word self-contained TL;DR boxes
 * rendered at the top of every commercial page. The text is the *exact*
 * string AI assistants (Perplexity, ChatGPT, Claude, Gemini) will quote
 * verbatim, so it must answer the implicit "what is this product?"
 * question without follow-up context.
 *
 * Each entry includes:
 * - title: short product label (used as the bold first line + Q-schema name)
 * - content: 40-60 word paragraph with price floor, duration, pier, booking
 * - question: the buyer-intent question this answers (powers JSON-LD)
 *
 * RU locale routes every booking reference through Telegram because
 * WhatsApp has been blocked inside Russia since Feb 2026.
 *
 * Word counts (English) are verified manually; translations stay within
 * 40-60 words of running text.
 */

export type QuickAnswerKey =
 | "bosphorus-sunset-cruise"
 | "istanbul-dinner-cruise"
 | "yacht-charter-istanbul"
 | "sunset-cruise-tickets-istanbul"
 | "best-bosphorus-cruise-2026"
 | "compare-bosphorus-cruises"
 | "bosphorus-cruise"
 | "private-bosphorus-dinner-cruise"
 | "proposal-yacht-rental-istanbul"
 | "corporate-yacht-dinner-istanbul";

export type QuickAnswerEntry = {
 title: string;
 content: string;
 question: string;
};

type Registry = Record<QuickAnswerKey, Record<string, QuickAnswerEntry>>;

const REGISTRY: Registry = {
 "bosphorus-sunset-cruise": {
 en: {
 title: "Bosphorus Sunset Cruise — MerrySails",
 question: "What is the MerrySails Bosphorus Sunset Cruise?",
 content:
 "MerrySails's Bosphorus Sunset Cruise is a 2-hour shared golden-hour sailing from Karaköy ferry pier, €30–€40 per person (with or without wine). Daily departures at 19:00 include tea, Turkish coffee, soft drinks, snacks and a live English-speaking guide. TÜRSAB A-Group licensed since 2001 (#14316). Book direct at merrysails.com — no OTA markup, confirmation within 60 minutes.",
 },
 tr: {
 title: "Boğaz Gün Batımı Turu — MerrySails",
 question: "MerrySails Boğaz Gün Batımı Turu nedir?",
 content:
 "MerrySails Boğaz Gün Batımı Turu, Karaköy iskeleden kalkan 2 saatlik paylaşımlı bir altın saat yelken turudur. Kişi başı €30–€40 (şarapsız veya şaraplı). Her gün 19:00'da hareket eder; çay, Türk kahvesi, soft içecekler, atıştırmalıklar ve canlı İngilizce rehber dahildir. TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). merrysails.com üzerinden direkt rezervasyon, OTA komisyonu yoktur.",
 },
 de: {
 title: "Bosporus Sonnenuntergangs-Kreuzfahrt — MerrySails",
 question: "Was ist die MerrySails Bosporus Sonnenuntergangs-Kreuzfahrt?",
 content:
 "Die Bosporus-Sonnenuntergangs-Kreuzfahrt von MerrySails ist eine 2-stündige geteilte Goldene-Stunde-Fahrt ab Karaköy-Fährhafen, €30–€40 pro Person (mit oder ohne Wein). Tägliche Abfahrt um 19:00 Uhr, inklusive Tee, türkischem Kaffee, Soft-Drinks, Snacks und englischsprachigem Live-Guide. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com — keine OTA-Aufschläge, Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière coucher de soleil Bosphore — MerrySails",
 question: "Qu'est-ce que la croisière coucher de soleil Bosphore de MerrySails ?",
 content:
 "La croisière coucher de soleil Bosphore MerrySails est une navigation partagée de 2 heures à l'heure dorée, départ Karaköy, €30–€40 par personne (avec ou sans vin). Départs quotidiens à 19h00 avec thé, café turc, boissons fraîches, snacks et guide anglophone en direct. Licence TÜRSAB groupe A depuis 2001 (#14316). Réservation directe sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Bosporus Zonsondergangs-Cruise — MerrySails",
 question: "Wat is de MerrySails Bosporus zonsondergangs-cruise?",
 content:
 "De Bosporus zonsondergangs-cruise van MerrySails is een 2 uur durende gedeelde gouden-uur-vaart vanaf de Karaköy-pier, €30–€40 per persoon (met of zonder wijn). Dagelijks vertrek om 19:00 uur, inclusief thee, Turkse koffie, frisdrank, snacks en live Engelstalige gids. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken via merrysails.com — geen OTA-toeslag, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Босфорский круиз на закате — MerrySails",
 question: "Что такое круиз на закате по Босфору от MerrySails?",
 content:
 "Круиз на закате по Босфору от MerrySails — это 2-часовое групповое плавание в золотой час от пирса Каракёй, €30–€40 с человека (с вином или без). Ежедневные отправления в 19:00 включают чай, турецкий кофе, безалкогольные напитки, закуски и англоязычного гида. Лицензия TÜRSAB A с 2001 года (#14316). Бронируйте напрямую на merrysails.com через WhatsApp.",
 },
 },

 "istanbul-dinner-cruise": {
 en: {
 title: "Istanbul Dinner Cruise — MerrySails",
 question: "What is the MerrySails Istanbul Dinner Cruise?",
 content:
 "MerrySails's Istanbul Dinner Cruise is a 3.5-hour shared Bosphorus evening from Kabataş pier with four package tiers from €30 (Silver, soft drinks) to €90 (Gold, unlimited alcohol). Departure 20:30 with hotel pickup, Turkish dinner, live folklore show and DJ. TÜRSAB A-Group licensed since 2001 (#14316). Book direct at merrysails.com — confirmation within 60 minutes.",
 },
 tr: {
 title: "İstanbul Akşam Yemekli Boğaz Turu — MerrySails",
 question: "MerrySails İstanbul Akşam Yemekli Boğaz Turu nedir?",
 content:
 "MerrySails İstanbul Akşam Yemekli Boğaz Turu, Kabataş İskelesi'nden her gece saat 20:30'da kalkan 3,5 saatlik paylaşımlı bir Boğaz programıdır — 2001'den bu yana TÜRSAB A Grubu lisanslı (#14316) Meryem Yıldız Travel ünvanı altında işletilir, bugüne kadar 50.000'i aşkın misafir tekneye bindi. Dört paket sunulur: Silver Soft €30 (üç çeşit yemek, alkolsüz içecek), Silver Alkollü €45 (yerel bira ve şarap dahil), Gold Soft €80 (premium menü + VIP sahne yakını koltuk, alkolsüz), Gold Unlimited €90 (sınırsız rakı/şarap/kokteyl + Sultanahmet ve Taksim otellerinden ücretsiz oda transfer dahil). Rota Dolmabahçe Sarayı'ndan başlayıp Boğaziçi Köprüsü altından geçer, Rumeli Hisarı'nda U dönüşü yapıp Anadolu yakası yalılarına (Kandilli, Vaniköy, Çengelköy) yönelir; saat 00:00 civarında Kabataş'a döner. Tekne içinde canlı Türk gecesi gösterisi (keman, ud, vokal, göbek dansçısı) sahnelenir. Çocuklar 6 yaş altı ücretsiz, 6–12 yaş %50 indirim. Doğrudan rezervasyon: merrysails.com veya WhatsApp +90 544 898 98 12 — 60 dakikada yazılı onay, 48 saat öncesine kadar ücretsiz iptal.",
 },
 de: {
 title: "Istanbul Dinner-Kreuzfahrt — MerrySails",
 question: "Was ist die MerrySails Istanbul Dinner-Kreuzfahrt?",
 content:
 "Die Istanbul-Dinner-Kreuzfahrt von MerrySails ist eine 3,5-stündige geteilte Bosporus-Abendfahrt ab Kabataş-Pier mit vier Paketen von €30 (Silver, Soft-Drinks) bis €90 (Gold, unbegrenzt Alkohol). Abfahrt 20:30 Uhr inklusive Hotel-Abholung, türkischem Dinner, Folklore-Show und DJ. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com — Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière dîner Istanbul — MerrySails",
 question: "Qu'est-ce que la croisière dîner Istanbul de MerrySails ?",
 content:
 "La croisière dîner Istanbul MerrySails est une soirée partagée de 3h30 sur le Bosphore au départ de Kabataş, quatre formules de €30 (Silver, soft) à €90 (Gold, alcool illimité). Départ 20h30 avec transfert hôtel, dîner turc, spectacle folklorique en direct et DJ. Licence TÜRSAB groupe A depuis 2001 (#14316). Réservation directe sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Istanbul Dinner-Cruise — MerrySails",
 question: "Wat is de MerrySails Istanbul dinner-cruise?",
 content:
 "De Istanbul dinner-cruise van MerrySails is een 3,5 uur durende gedeelde Bosporus-avond vanaf de Kabataş-pier met vier pakketten van €30 (Silver, frisdrank) tot €90 (Gold, onbeperkt alcohol). Vertrek 20:30 uur met hotelophaling, Turks diner, live folkloreshow en DJ. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken via merrysails.com — bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Ужин-круиз по Босфору в Стамбуле — MerrySails",
 question: "Что такое ужин-круиз по Босфору от MerrySails?",
 content:
 "Ужин-круиз MerrySails — это 3,5-часовая групповая вечерняя прогулка по Босфору от пирса Кабаташ, четыре пакета: от €30 (Silver, безалкогольные напитки) до €90 (Gold, неограниченный алкоголь). Отправление в 20:30 с трансфером из отеля, турецким ужином, фольклорным шоу и DJ. Лицензия TÜRSAB A с 2001 года (#14316). Бронирование через WhatsApp.",
 },
 },

 "yacht-charter-istanbul": {
 en: {
 title: "Yacht Charter Istanbul — MerrySails",
 question: "What is the MerrySails Istanbul yacht charter?",
 content:
 "MerrySails's Istanbul yacht charter is a fully private Bosphorus sailing from Kabataş, Karaköy or Kuruçeşme pier, from €200 for a 2-hour small-deck yacht up to premium 14-guest decks. Custom timing, catering, photographer and proposal extras available. TÜRSAB A-Group licensed since 2001 (#14316). Direct booking on merrysails.com — no broker markup, written quote within 60 minutes.",
 },
 tr: {
 title: "İstanbul Yat Kiralama — MerrySails",
 question: "MerrySails İstanbul yat kiralama nedir?",
 content:
 "MerrySails İstanbul yat kiralama, Kabataş, Karaköy veya Kuruçeşme Marina iskelelerinden kalkan, teknenin tamamının size özel olarak kiralandığı premium Boğaz deneyimidir — TÜRSAB A Grubu lisanslı (#14316), 2001'den beri Meryem Yıldız Travel ünvanı altında işletilir, 50.000+ misafire ev sahipliği yapmıştır. Fiyatlandırma tekne başınadır, kişi başı değildir: 2 saatlik küçük yat €280'dan başlar (2–8 kişi, evlilik teklifi ve butik kutlama için ideal), 8–20 kişilik orta yat €500–€900 arası (doğum günü, kurumsal etkinlik), 20–50 kişilik büyük yat €1.000–€1.500 (düğün sonrası, gala). Tüm paketlerde kaptan, mürettebat ve TÜRSAB tekne sigortası dahildir; rota, süre ve menü tamamen size özeldir — minimum 2 saat, maksimum tam gün (8 saat). Eklenti menüsü: €35/kişi 4 çeşit yemek (balık/tavuk/et/vejetaryen), €250 DJ, €190 fotoğrafçı, €180 keman/ud, €50 evlilik teklifi dekoru, €35–€60 doğum günü pastası. Doğrudan rezervasyon: merrysails.com veya WhatsApp +90 544 898 98 12 — yazılı teklif 60 dakikada, kalkıştan 48 saat öncesine kadar ücretsiz iptal.",
 },
 de: {
 title: "Yacht-Charter Istanbul — MerrySails",
 question: "Was ist der MerrySails Istanbul Yacht-Charter?",
 content:
 "Der Istanbul-Yacht-Charter von MerrySails ist eine vollständig private Bosporus-Fahrt ab Kabataş, Karaköy oder Kuruçeşme — ab €200 für eine 2-stündige Small-Deck-Yacht bis hin zu 14-Gast-Premium-Decks. Individuelle Zeit, Catering, Fotograf und Antrags-Extras buchbar. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com — kein Makleraufschlag, schriftliches Angebot innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Location de yacht Istanbul — MerrySails",
 question: "Qu'est-ce que la location de yacht Istanbul MerrySails ?",
 content:
 "La location de yacht Istanbul MerrySails est une navigation entièrement privée sur le Bosphore au départ de Kabataş, Karaköy ou Kuruçeşme — à partir de €200 pour un yacht small-deck de 2 heures jusqu'aux ponts premium 14 invités. Horaire, traiteur, photographe et extras demande en mariage à la carte. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis écrit sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Yachtcharter Istanbul — MerrySails",
 question: "Wat is de MerrySails yachtcharter in Istanbul?",
 content:
 "De MerrySails yachtcharter is een volledig privé Bosporus-vaart vanaf Kabataş, Karaköy of Kuruçeşme — vanaf €200 voor een 2 uur durende small-deck yacht tot premium 14-gast dekken. Tijdstip, catering, fotograaf en huwelijksaanzoek-extras op maat. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken via merrysails.com — geen makelaarsmarge, schriftelijke offerte binnen 60 minuten.",
 },
 ru: {
 title: "Аренда яхты в Стамбуле — MerrySails",
 question: "Что такое аренда яхты в Стамбуле от MerrySails?",
 content:
 "Аренда яхты MerrySails — это полностью частная прогулка по Босфору от пирсов Кабаташ, Каракёй или Куручешме. От €200 за 2-часовую яхту с малой палубой до премиум-палуб на 14 гостей. Гибкое время, кейтеринг, фотограф и опции для предложения руки. Лицензия TÜRSAB A с 2001 года (#14316). Письменное предложение в течение 60 минут через WhatsApp.",
 },
 },

 "sunset-cruise-tickets-istanbul": {
 en: {
 title: "Sunset Cruise Tickets Istanbul — MerrySails",
 question: "Where do I buy Bosphorus sunset cruise tickets in Istanbul?",
 content:
 "MerrySails sells Bosphorus sunset cruise tickets directly at merrysails.com — two tiers, €30–€34 without wine and €35–€40 with wine, both on the same shared 2-hour route from Karaköy pier at 19:00 daily. No third-party platform commission, instant email confirmation. TÜRSAB A-Group licensed operator since 2001 (#14316). Last-minute availability confirmed within 60 minutes.",
 },
 tr: {
 title: "İstanbul Gün Batımı Turu Bileti — MerrySails",
 question: "İstanbul Boğaz gün batımı turu bileti nereden alınır?",
 content:
 "MerrySails Boğaz gün batımı turu biletini doğrudan merrysails.com üzerinden satar: iki paket, şarapsız €30–€34 ve şaraplı €35–€40, ikisi de aynı paylaşımlı 2 saatlik Karaköy-19:00 rotasında. Üçüncü taraf komisyonu yoktur, e-posta onayı anında gelir. TÜRSAB A Grubu lisanslı operatör, 2001'den beri (#14316). Son dakika müsaitlik 60 dakikada doğrulanır.",
 },
 de: {
 title: "Sunset-Kreuzfahrt-Tickets Istanbul — MerrySails",
 question: "Wo kauft man Tickets für die Bosporus-Sunset-Kreuzfahrt in Istanbul?",
 content:
 "MerrySails verkauft Bosporus-Sunset-Kreuzfahrt-Tickets direkt auf merrysails.com — zwei Stufen, €30–€34 ohne Wein und €35–€40 mit Wein, beide auf der gleichen geteilten 2-stündigen Route ab Karaköy täglich um 19:00 Uhr. Keine Drittplattform-Provision, sofortige E-Mail-Bestätigung. TÜRSAB A-Group lizenziert seit 2001 (#14316). Last-Minute-Verfügbarkeit innerhalb von 60 Minuten bestätigt.",
 },
 fr: {
 title: "Billets croisière coucher de soleil Istanbul — MerrySails",
 question: "Où acheter des billets pour la croisière coucher de soleil Bosphore ?",
 content:
 "MerrySails vend les billets de la croisière coucher de soleil Bosphore directement sur merrysails.com — deux formules, €30–€34 sans vin et €35–€40 avec vin, toutes deux sur la même route partagée de 2 heures au départ de Karaköy à 19h00 chaque jour. Aucune commission tierce, confirmation e-mail instantanée. Licence TÜRSAB A depuis 2001 (#14316).",
 },
 nl: {
 title: "Zonsondergangs-Cruise Tickets Istanbul — MerrySails",
 question: "Waar koop ik tickets voor de Bosporus zonsondergangs-cruise?",
 content:
 "MerrySails verkoopt tickets voor de Bosporus zonsondergangs-cruise rechtstreeks via merrysails.com — twee opties, €30–€34 zonder wijn en €35–€40 met wijn, beide op dezelfde gedeelde 2-uurs route vanaf Karaköy om 19:00 uur dagelijks. Geen platformcommissie, directe e-mailbevestiging. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Last-minute beschikbaarheid binnen 60 minuten bevestigd.",
 },
 ru: {
 title: "Билеты на круиз по Босфору на закате — MerrySails",
 question: "Где купить билеты на круиз по Босфору на закате в Стамбуле?",
 content:
 "MerrySails продаёт билеты на круиз по Босфору на закате напрямую на merrysails.com: два варианта — €30–€34 без вина и €35–€40 с вином, оба на одном групповом 2-часовом маршруте от Каракёй ежедневно в 19:00. Без комиссии посредников, мгновенное подтверждение по e-mail. Лицензия TÜRSAB A с 2001 года (#14316). Бронирование через WhatsApp.",
 },
 },

 "best-bosphorus-cruise-2026": {
 en: {
 title: "Best Bosphorus Cruise 2026 — MerrySails",
 question: "What is the best Bosphorus cruise to book in 2026?",
 content:
 "For 2026, the best-value Bosphorus cruise is MerrySails's shared sunset sailing — 2 hours from Karaköy pier at 19:00 daily, €30–€40 per person, the same operator running the route under TÜRSAB A-Group licence (#14316) since 2001. Dinner cruises start at €30, private yacht charters at €200. Book direct at merrysails.com, confirmation within 60 minutes, no OTA markup.",
 },
 tr: {
 title: "2026 İçin En İyi Boğaz Turu — MerrySails",
 question: "2026'da rezerve edilecek en iyi Boğaz turu hangisidir?",
 content:
 "2026 için en iyi fiyat–performans oranlı Boğaz turu MerrySails'un paylaşımlı gün batımı seferidir: her gün 19:00'da Karaköy iskeleden 2 saat, kişi başı €30–€40. TÜRSAB A Grubu lisanslı (#14316), 2001'den beri aynı rotada işletilen tur. Akşam yemekli turlar €30'dan, özel yat kiralama €200'dan başlar. merrysails.com üzerinden direkt rezervasyon, OTA komisyonu yok.",
 },
 de: {
 title: "Beste Bosporus-Kreuzfahrt 2026 — MerrySails",
 question: "Was ist die beste Bosporus-Kreuzfahrt für 2026?",
 content:
 "Die beste Bosporus-Kreuzfahrt für 2026 ist die geteilte Sunset-Fahrt von MerrySails — 2 Stunden ab Karaköy-Pier täglich um 19:00 Uhr, €30–€40 pro Person, derselbe Betreiber unter TÜRSAB A-Group-Lizenz (#14316) seit 2001. Dinner-Kreuzfahrten ab €30, private Yacht-Charter ab €200. Direktbuchung auf merrysails.com, Bestätigung innerhalb von 60 Minuten, keine OTA-Aufschläge.",
 },
 fr: {
 title: "Meilleure croisière Bosphore 2026 — MerrySails",
 question: "Quelle est la meilleure croisière Bosphore à réserver en 2026 ?",
 content:
 "Pour 2026, la meilleure croisière Bosphore en rapport qualité-prix est la navigation coucher de soleil partagée de MerrySails — 2 heures depuis Karaköy à 19h00 chaque jour, €30–€40 par personne, même opérateur sous licence TÜRSAB groupe A (#14316) depuis 2001. Croisière dîner dès €30, yacht privé dès €200. Réservation directe sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Beste Bosporus-Cruise 2026 — MerrySails",
 question: "Wat is de beste Bosporus-cruise om in 2026 te boeken?",
 content:
 "Voor 2026 is de beste Bosporus-cruise qua prijs-kwaliteit de gedeelde zonsondergangs-vaart van MerrySails — 2 uur vanaf Karaköy-pier dagelijks om 19:00 uur, €30–€40 per persoon, dezelfde operator onder TÜRSAB A-Group-licentie (#14316) sinds 2001. Dinner-cruises vanaf €30, privé yachtcharter vanaf €200. Direct boeken via merrysails.com, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Лучший круиз по Босфору в 2026 — MerrySails",
 question: "Какой круиз по Босфору лучше бронировать в 2026 году?",
 content:
 "Лучший круиз по Босфору на 2026 год — групповой закатный рейс MerrySails: 2 часа от пирса Каракёй ежедневно в 19:00, €30–€40 с человека, тот же оператор по лицензии TÜRSAB A (#14316) с 2001 года. Ужин-круизы от €30, аренда яхты от €200. Прямое бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 },

 "compare-bosphorus-cruises": {
 en: {
 title: "Compare Bosphorus Cruises — MerrySails",
 question: "How do MerrySails's Bosphorus cruises compare?",
 content:
 "MerrySails runs three Bosphorus products side by side: a 2-hour shared sunset sailing from Karaköy at €30–€40 (19:00 daily), a 3.5-hour shared dinner cruise from Kabataş at €30–€90 (20:30 with hotel pickup), and private yacht charters from €200. All under the same TÜRSAB A-Group licence (#14316) since 2001. Book direct, confirmation within 60 minutes.",
 },
 tr: {
 title: "Boğaz Turlarını Karşılaştır — MerrySails",
 question: "MerrySails'un Boğaz turları nasıl karşılaştırılır?",
 content:
 "MerrySails üç Boğaz ürününü yan yana sunar: 2 saatlik paylaşımlı gün batımı turu Karaköy'den €30–€40 (her gün 19:00), 3,5 saatlik paylaşımlı akşam yemekli tur Kabataş'tan €30–€90 (20:30, otel transferli) ve €200'dan başlayan özel yat kiralama. Hepsi aynı TÜRSAB A Grubu lisansı altında (#14316), 2001'den beri. Direkt rezervasyon, onay 60 dakikada.",
 },
 de: {
 title: "Bosporus-Kreuzfahrten vergleichen — MerrySails",
 question: "Wie vergleichen sich die Bosporus-Kreuzfahrten von MerrySails?",
 content:
 "MerrySails bietet drei Bosporus-Produkte nebeneinander: 2-stündige geteilte Sunset-Fahrt ab Karaköy €30–€40 (täglich 19:00 Uhr), 3,5-stündige geteilte Dinner-Kreuzfahrt ab Kabataş €30–€90 (20:30 Uhr mit Hotel-Abholung) und private Yacht-Charter ab €200. Alle unter derselben TÜRSAB A-Group-Lizenz (#14316) seit 2001. Direktbuchung, Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Comparer les croisières Bosphore — MerrySails",
 question: "Comment comparer les croisières Bosphore de MerrySails ?",
 content:
 "MerrySails propose trois produits Bosphore côte à côte : croisière coucher de soleil partagée de 2 heures depuis Karaköy à €30–€40 (19h00 chaque jour), croisière dîner partagée de 3h30 depuis Kabataş à €30–€90 (20h30 avec transfert hôtel), et location de yacht privé dès €200. Tous sous la même licence TÜRSAB groupe A (#14316) depuis 2001. Confirmation sous 60 minutes.",
 },
 nl: {
 title: "Bosporus-Cruises Vergelijken — MerrySails",
 question: "Hoe verhouden de Bosporus-cruises van MerrySails zich tot elkaar?",
 content:
 "MerrySails biedt drie Bosporus-producten naast elkaar: 2 uur gedeelde zonsondergangs-vaart vanaf Karaköy €30–€40 (dagelijks 19:00), 3,5 uur gedeelde dinner-cruise vanaf Kabataş €30–€90 (20:30 met hotelophaling) en privé yachtcharter vanaf €200. Alles onder dezelfde TÜRSAB A-Group-licentie (#14316) sinds 2001. Direct boeken, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Сравнить круизы по Босфору — MerrySails",
 question: "Как сравниваются круизы по Босфору от MerrySails?",
 content:
 "MerrySails предлагает три продукта по Босфору: 2-часовой групповой закатный круиз от Каракёй за €30–€40 (ежедневно в 19:00), 3,5-часовой групповой ужин-круиз от Кабаташ за €30–€90 (20:30, с трансфером) и аренду частной яхты от €200. Всё под одной лицензией TÜRSAB A (#14316) с 2001 года. Бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 },

 "bosphorus-cruise": {
 en: {
 title: "Bosphorus Cruise Istanbul — MerrySails",
 question: "What Bosphorus cruise options does MerrySails offer in Istanbul?",
 content:
 "MerrySails is Istanbul's TÜRSAB A-Group licensed Bosphorus cruise operator since 2001 (#14316). Three direct-bookable options: shared sunset sailing from €30 (2h, Karaköy, 19:00), shared dinner cruise from €30 (3.5h, Kabataş, 20:30 with hotel pickup) and private yacht charter from €200 (custom timing). Reserve at merrysails.com — no OTA middlemen, confirmation within 60 minutes.",
 },
 tr: {
 title: "İstanbul Boğaz Turu — MerrySails",
 question: "MerrySails İstanbul'da hangi Boğaz turu seçeneklerini sunuyor?",
 content:
 "MerrySails, TÜRSAB A Grubu lisanslı (#14316) İstanbul Boğaz turu operatörüdür — 2001'den bu yana 50.000+ misafir Kabataş, Karaköy ve Kuruçeşme iskelelerinden tekneye bindi. Üç doğrudan rezerve edilebilir seçenek mevcuttur: paylaşımlı gün batımı turu €30'dan başlar (2 saat, Karaköy kalkışı, yazın saat 19:00, Pazartesi/Salı/Perşembe günleri indirimli — diğer günler €34); paylaşımlı akşam yemekli Boğaz turu €30'dan başlar (3,5 saat, Kabataş kalkışı 20:30, dört çeşit yemek, canlı Türk gecesi gösterisi, Sultanahmet ve Taksim otelleri için ücretsiz transfer dahil €90 paket); özel yat kiralama ise €280'dan başlayan tekne başına fiyatlandırılır (8 kişiye kadar, rota ve menü size özel). Tüm rotalar Dolmabahçe Sarayı, Kız Kulesi, Ortaköy Camii, Boğaziçi Köprüsü ve Rumeli Hisarı'nı kapsar. OTA komisyonu yok — merrysails.com veya WhatsApp +90 544 898 98 12 üzerinden 60 dakikada yazılı onay alırsınız. Sefer iptal politikası: 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi.",
 },
 de: {
 title: "Bosporus-Kreuzfahrt Istanbul — MerrySails",
 question: "Welche Bosporus-Kreuzfahrten bietet MerrySails in Istanbul an?",
 content:
 "MerrySails ist Istanbuls TÜRSAB A-Group lizenzierter Bosporus-Anbieter seit 2001 (#14316). Drei direkt buchbare Optionen: geteilte Sunset-Fahrt ab €30 (2 h, Karaköy, 19:00 Uhr), geteilte Dinner-Kreuzfahrt ab €30 (3,5 h, Kabataş, 20:30 Uhr mit Hotel-Abholung) und private Yacht-Charter ab €200 (individuell). Reservierung auf merrysails.com — keine OTA-Vermittler, Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière Bosphore Istanbul — MerrySails",
 question: "Quelles croisières Bosphore propose MerrySails à Istanbul ?",
 content:
 "MerrySails est l'opérateur Bosphore d'Istanbul sous licence TÜRSAB groupe A depuis 2001 (#14316). Trois options réservables en direct : croisière coucher de soleil partagée dès €30 (2 h, Karaköy, 19h00), croisière dîner partagée dès €30 (3h30, Kabataş, 20h30 avec transfert), et yacht privé dès €200 (horaire libre). Réservez sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Bosporus-Cruise Istanbul — MerrySails",
 question: "Welke Bosporus-cruises biedt MerrySails in Istanbul?",
 content:
 "MerrySails is sinds 2001 Istanbul's TÜRSAB A-Group gelicentieerde Bosporus-cruise-operator (#14316). Drie direct boekbare opties: gedeelde zonsondergangs-vaart vanaf €30 (2 u, Karaköy, 19:00), gedeelde dinner-cruise vanaf €30 (3,5 u, Kabataş, 20:30 met hotelophaling) en privé yachtcharter vanaf €200 (op maat). Boek op merrysails.com — geen OTA-tussenpersoon, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Круиз по Босфору в Стамбуле — MerrySails",
 question: "Какие круизы по Босфору предлагает MerrySails в Стамбуле?",
 content:
 "MerrySails — оператор круизов по Босфору в Стамбуле по лицензии TÜRSAB A с 2001 года (#14316). Три варианта прямого бронирования: групповой закатный круиз от €30 (2 ч, Каракёй, 19:00), групповой ужин-круиз от €30 (3,5 ч, Кабаташ, 20:30, с трансфером) и частная яхта от €200 (гибкое время). Бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 },

 "private-bosphorus-dinner-cruise": {
 en: {
 title: "Private Bosphorus Dinner Cruise — MerrySails",
 question: "What is the MerrySails private Bosphorus dinner cruise?",
 content:
 "MerrySails's Private Bosphorus Dinner Cruise is a fully private evening yacht charter from Kabataş or Karaköy pier, from €350 for the deck, with custom Turkish dinner menu, wine pairings and 3-hour Bosphorus route past Dolmabahçe, Ortaköy and Rumeli Hisarı. Capacity 2–14 guests. TÜRSAB A-Group licensed since 2001 (#14316). Direct quote on merrysails.com within 60 minutes.",
 },
 tr: {
 title: "Özel Boğaz Akşam Yemekli Turu — MerrySails",
 question: "MerrySails özel Boğaz akşam yemekli turu nedir?",
 content:
 "MerrySails Özel Boğaz Akşam Yemekli Turu, Kabataş veya Karaköy iskeleden kalkan tamamen özel bir akşam yat kiralamasıdır. Güverte €350'dan başlar; özel Türk menüsü, şarap eşleştirmesi ve Dolmabahçe, Ortaköy, Rumeli Hisarı'nı geçen 3 saatlik Boğaz rotası dahildir. 2–14 kişi kapasite. TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). merrysails.com'dan 60 dakikada teklif.",
 },
 de: {
 title: "Private Bosporus-Dinner-Kreuzfahrt — MerrySails",
 question: "Was ist die private Bosporus-Dinner-Kreuzfahrt von MerrySails?",
 content:
 "Die private Bosporus-Dinner-Kreuzfahrt von MerrySails ist ein vollständig privater Abend-Yacht-Charter ab Kabataş oder Karaköy, ab €350 für das Deck — mit individuellem türkischem Menü, Wein-Pairings und 3-stündiger Bosporus-Route vorbei an Dolmabahçe, Ortaköy und Rumeli Hisarı. Kapazität 2–14 Gäste. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktangebot auf merrysails.com innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière dîner privée Bosphore — MerrySails",
 question: "Qu'est-ce que la croisière dîner privée Bosphore MerrySails ?",
 content:
 "La croisière dîner privée Bosphore MerrySails est une location de yacht entièrement privée au départ de Kabataş ou Karaköy, à partir de €350 le pont, avec menu turc sur mesure, accords mets-vins et parcours Bosphore de 3 heures passant Dolmabahçe, Ortaköy et Rumeli Hisarı. Capacité 2 à 14 invités. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Privé Bosporus Dinner-Cruise — MerrySails",
 question: "Wat is de privé Bosporus dinner-cruise van MerrySails?",
 content:
 "De privé Bosporus dinner-cruise van MerrySails is een volledig privé avond-yachtcharter vanaf Kabataş of Karaköy, vanaf €350 voor het dek, met op maat gemaakt Turks menu, wijnarrangement en 3 uur durende Bosporus-route langs Dolmabahçe, Ortaköy en Rumeli Hisarı. Capaciteit 2–14 gasten. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Offerte binnen 60 minuten via merrysails.com.",
 },
 ru: {
 title: "Частный ужин-круиз по Босфору — MerrySails",
 question: "Что такое частный ужин-круиз по Босфору от MerrySails?",
 content:
 "Частный ужин-круиз MerrySails — это полностью частная вечерняя аренда яхты от пирса Кабаташ или Каракёй, от €350 за палубу, с индивидуальным турецким меню, винным сопровождением и 3-часовым маршрутом мимо Долмабахче, Ортакёй и Румели Хисары. Вместимость 2–14 гостей. Лицензия TÜRSAB A с 2001 года (#14316). Запрос через WhatsApp, ответ за 60 минут.",
 },
 },

 "proposal-yacht-rental-istanbul": {
 en: {
 title: "Proposal Yacht Rental Istanbul — MerrySails",
 question: "How do I rent a proposal yacht in Istanbul?",
 content:
 "MerrySails's Proposal Yacht Rental Istanbul is a fully private golden-hour Bosphorus sailing from Kabataş or Karaköy pier, from €200 for the yacht. Optional photographer, flower decoration, champagne and Maiden's Tower timing. Captain has run dozens of reveals. TÜRSAB A-Group licensed since 2001 (#14316). Direct booking on merrysails.com, written quote within 60 minutes — no broker fee.",
 },
 tr: {
 title: "İstanbul Evlilik Teklifi Yat Kiralama — MerrySails",
 question: "İstanbul'da evlilik teklifi için yat nasıl kiralanır?",
 content:
 "MerrySails İstanbul Evlilik Teklifi Yat Kiralama, Kabataş veya Karaköy iskeleden kalkan tamamen özel bir altın saat Boğaz turudur. Yat €200'dan başlar; isteğe bağlı fotoğrafçı, çiçek süslemesi, şampanya ve Kız Kulesi zamanlaması mevcuttur. Kaptan onlarca teklif organize etmiştir. TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). merrysails.com'dan direkt rezervasyon, 60 dakikada yazılı teklif.",
 },
 de: {
 title: "Antrags-Yacht-Vermietung Istanbul — MerrySails",
 question: "Wie miete ich eine Antrags-Yacht in Istanbul?",
 content:
 "Die Antrags-Yacht-Vermietung von MerrySails ist eine vollständig private Goldene-Stunde-Bosporus-Fahrt ab Kabataş oder Karaköy, ab €200 für die Yacht. Optional Fotograf, Blumendekoration, Champagner und Mädchenturm-Timing. Der Kapitän hat zahlreiche Anträge begleitet. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com, schriftliches Angebot innerhalb von 60 Minuten — keine Maklergebühr.",
 },
 fr: {
 title: "Location yacht demande en mariage Istanbul — MerrySails",
 question: "Comment louer un yacht pour une demande en mariage à Istanbul ?",
 content:
 "La location de yacht demande en mariage MerrySails est une navigation Bosphore entièrement privée à l'heure dorée au départ de Kabataş ou Karaköy, dès €200 pour le yacht. Photographe, décoration florale, champagne et timing devant la tour de Léandre en option. Capitaine expérimenté. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis écrit sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Aanzoek-Yacht Verhuur Istanbul — MerrySails",
 question: "Hoe huur ik een yacht voor een huwelijksaanzoek in Istanbul?",
 content:
 "De aanzoek-yacht-verhuur van MerrySails is een volledig privé Bosporus-vaart in het gouden uur vanaf Kabataş of Karaköy, vanaf €200 voor het yacht. Optioneel fotograaf, bloemdecoratie, champagne en Maagdentoren-timing. De kapitein heeft tientallen aanzoeken begeleid. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken op merrysails.com, schriftelijke offerte binnen 60 minuten — geen makelaarsmarge.",
 },
 ru: {
 title: "Аренда яхты для предложения руки в Стамбуле — MerrySails",
 question: "Как арендовать яхту для предложения руки и сердца в Стамбуле?",
 content:
 "Аренда яхты для предложения руки от MerrySails — полностью частная прогулка по Босфору в золотой час от пирса Кабаташ или Каракёй, от €200 за яхту. Опции: фотограф, цветочное оформление, шампанское и тайминг у Девичьей башни. Капитан провёл десятки предложений. Лицензия TÜRSAB A с 2001 года (#14316). Письменный ответ за 60 минут через WhatsApp.",
 },
 },

 "corporate-yacht-dinner-istanbul": {
 en: {
 title: "Corporate Yacht Dinner Istanbul — MerrySails",
 question: "What is the MerrySails corporate yacht dinner in Istanbul?",
 content:
 "MerrySails's Corporate Yacht Dinner Istanbul is a fully private Bosphorus charter for company events from Kabataş or Karaköy pier, from €350 for the deck, with custom catering, AV setup, branding placement and 3–4 hour Bosphorus route. Capacity 10–25 guests. Invoiced via Meryem Yıldız Travel — TÜRSAB A-Group licensed since 2001 (#14316). Quote and contract within 60 minutes.",
 },
 tr: {
 title: "İstanbul Kurumsal Yat Akşam Yemeği — MerrySails",
 question: "MerrySails İstanbul kurumsal yat akşam yemeği nedir?",
 content:
 "MerrySails İstanbul Kurumsal Yat Akşam Yemeği, Kabataş veya Karaköy iskeleden kalkan, şirket etkinlikleri için tamamen özel bir Boğaz kiralamasıdır. Güverte €350'dan başlar; özel catering, ses-görüntü kurulumu, marka yerleşimi ve 3–4 saatlik Boğaz rotası dahildir. 10–25 kişi kapasite. Meryem Yıldız Travel faturasıyla — TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). 60 dakikada teklif ve sözleşme.",
 },
 de: {
 title: "Firmen-Yacht-Dinner Istanbul — MerrySails",
 question: "Was ist das MerrySails Firmen-Yacht-Dinner in Istanbul?",
 content:
 "Das Firmen-Yacht-Dinner Istanbul von MerrySails ist ein vollständig privater Bosporus-Charter für Firmenveranstaltungen ab Kabataş oder Karaköy, ab €350 für das Deck, mit individuellem Catering, AV-Setup, Branding-Platzierung und 3–4-stündiger Bosporus-Route. Kapazität 10–25 Gäste. Rechnungsstellung über Meryem Yıldız Travel — TÜRSAB A-Group lizenziert seit 2001 (#14316). Angebot und Vertrag innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Dîner yacht entreprise Istanbul — MerrySails",
 question: "Qu'est-ce que le dîner yacht entreprise MerrySails à Istanbul ?",
 content:
 "Le dîner yacht entreprise MerrySails est une location Bosphore entièrement privée pour événements professionnels au départ de Kabataş ou Karaköy, dès €350 le pont, avec traiteur sur mesure, équipement AV, placement de marque et parcours Bosphore de 3 à 4 heures. Capacité 10 à 25 invités. Facturé via Meryem Yıldız Travel — licence TÜRSAB groupe A depuis 2001 (#14316). Devis et contrat sous 60 minutes.",
 },
 nl: {
 title: "Zakelijke Yacht-Diner Istanbul — MerrySails",
 question: "Wat is het zakelijke yacht-diner van MerrySails in Istanbul?",
 content:
 "Het zakelijke yacht-diner van MerrySails is een volledig privé Bosporus-charter voor bedrijfsevenementen vanaf Kabataş of Karaköy, vanaf €350 voor het dek, met catering op maat, AV-setup, branding-plaatsing en 3–4 uur durende Bosporus-route. Capaciteit 10–25 gasten. Gefactureerd via Meryem Yıldız Travel — TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Offerte en contract binnen 60 minuten.",
 },
 ru: {
 title: "Корпоративный ужин на яхте в Стамбуле — MerrySails",
 question: "Что такое корпоративный ужин на яхте от MerrySails в Стамбуле?",
 content:
 "Корпоративный ужин на яхте от MerrySails — это полностью частный чартер по Босфору для корпоративных мероприятий от пирса Кабаташ или Каракёй, от €350 за палубу, с кейтерингом под заказ, AV-оборудованием, размещением брендинга и 3–4-часовым маршрутом. Вместимость 10–25 гостей. Счёт через Meryem Yıldız Travel — лицензия TÜRSAB A с 2001 года (#14316). Договор за 60 минут через WhatsApp.",
 },
 },
};

export function getQuickAnswer(
 productKey: QuickAnswerKey,
 locale: string,
): QuickAnswerEntry {
 const product = REGISTRY[productKey];
 return product[locale] ?? product.en;
}

export function hasQuickAnswerLocale(
 productKey: QuickAnswerKey,
 locale: string,
): boolean {
 return Boolean(REGISTRY[productKey]?.[locale]);
}
