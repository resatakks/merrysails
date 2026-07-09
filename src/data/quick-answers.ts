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
 * All locales (including RU and ZH) route booking references through
 * WhatsApp — it is the single customer contact channel for this brand.
 *
 * Word counts (English) are verified manually; translations stay within
 * 40-60 words of running text.
 */

export type QuickAnswerKey =
 | "bosphorus-sunset-cruise"
 | "istanbul-dinner-cruise"
 | "yacht-charter-istanbul"
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
 "MerrySails's Bosphorus Sunset Cruise is a 2-hour shared golden-hour sailing from Karaköy ferry pier (next to the Mimar Sinan statue, beside Marmaray), boarding from 18:30 with the yacht leaving at 19:00. Two tiers on the same route: Without Wine €34 (€30 on Mon, Tue & Thu) and With Wine €40 (€35 same weekdays) — midweek discount applies automatically, no code needed. Onboard hospitality groups into hot drinks (tea, Turkish coffee), cold drinks (iced tea, house lemonade, seasonal fruit juice, bottled water) and a snack platter (mixed nuts, salted crackers, fresh-fruit plate); the With-Wine tier adds two glasses of wine per guest. Route passes Dolmabahçe Palace, Maiden's Tower, Ortaköy Mosque and Rumeli Hisarı with a live English-speaking guide. Operated by Meryem Yıldız Travel — TÜRSAB A-Group licensed since 2001 (#14316), 50,000+ guests hosted; rated 4.93 across 621 verified reviews, with free cancellation up to 48 hours before departure. Book direct from €30 at merrysails.com or WhatsApp +90 544 898 98 12 — written confirmation within 60 minutes, no OTA commission.",
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
 "Die Bosporus-Sonnenuntergangs-Kreuzfahrt von MerrySails ist eine 2-stündige geteilte Goldene-Stunde-Fahrt ab Karaköy-Fährpier (neben der Mimar-Sinan-Statue, an der Marmaray-Station). Boarding ab 18:30 Uhr, Abfahrt um 19:00 Uhr. Zwei Preisstufen auf derselben Route: Ohne Wein €34 (€30 montags, dienstags und donnerstags) und Mit Wein €40 (€35 an denselben Wochentagen) — der Wochentagsrabatt wird automatisch angewendet, kein Code erforderlich. An Bord: Heißgetränke (Tee, türkischer Kaffee), Kaltgetränke (Eistee, hausgemachte Limonade, saisonaler Fruchtsaft, Wasser) und eine Snack-Platte (gemischte Nüsse, salzige Cracker, frisches Obst); das Mit-Wein-Paket enthält zusätzlich zwei Gläser Wein pro Gast. Die Route führt vorbei am Dolmabahçe-Palast, am Mädchenturm, an der Ortaköy-Moschee und an der Rumeli-Hisarı-Festung mit englischsprachigem Live-Guide. Betrieben von Meryem Yıldız Travel — TÜRSAB A-Group lizenziert seit 2001 (#14316), über 50.000 Gäste an Bord, Bewertung 4,93 aus 621 verifizierten Rezensionen. Direktbuchung auf merrysails.com, Bestätigung innerhalb von 60 Minuten.",
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
 zh: {
 title: "博斯普鲁斯日落游船 — MerrySails",
 question: "MerrySails 博斯普鲁斯日落游船是什么?",
 content:
 "MerrySails 博斯普鲁斯日落游船是从卡拉科伊码头出发的 2 小时共享黄金时刻航程,每人 €30–€40(含酒或不含酒)。每天 19:00 出航,含茶、土耳其咖啡、软饮、小吃及英文实时讲解。周一、周二、周四预订享优惠价 €30。自 2001 年起持有 TÜRSAB A 类许可(#14316),已接待 50,000+ 位客人。在 merrysails.com 直接预订,60 分钟内确认。",
 },
 },

 "istanbul-dinner-cruise": {
 en: {
 title: "Istanbul Dinner Cruise — MerrySails",
 question: "What is the MerrySails Istanbul Dinner Cruise?",
 content:
 "MerrySails's Istanbul Dinner Cruise is a 3.5-hour shared Bosphorus evening from Kabataş Pier, departure 20:30. Four published package tiers on the same night route: Silver Soft Drinks €30, Silver Alcoholic €45 (€40 Mon/Tue/Thu — 2 glasses local wine or beer), Gold Soft Drinks €80 (€75 Mon/Tue/Thu — VIP stage-close table, expanded menu), Gold Unlimited Alcohol €90 (€85 Mon/Tue/Thu — unlimited local and imported drinks). Dinner is a classic Turkish-night banquet: welcome cocktail, 10 cold mezes (yaprak sarma, hummus, tarama, shepherd's salad, cacık, white cheese), seasonal salad, hot starter, live-selection main course (fish/chicken/meat or vegetarian on request), baklava and fruit with Turkish coffee or tea. Entertainment runs in three acts — folklore and belly-dance, live music, DJ-led finale — with stage visible across the saloon. Hotel pickup included from Sultanahmet, Sirkeci, Taksim, Harbiye, Beyoğlu and Karaköy; kids 0-3 dine free and 3-13 are 50% off on the soft-drinks tier. TÜRSAB A-Group licensed since 2001 (#14316), 50,000+ guests hosted; rated 4.88 across 312 verified reviews. Book direct from €30 at merrysails.com or WhatsApp +90 544 898 98 12 — confirmation within 60 minutes, free cancellation up to 48h before departure.",
 },
 tr: {
 title: "İstanbul Akşam Yemekli Boğaz Turu — MerrySails",
 question: "MerrySails İstanbul Akşam Yemekli Boğaz Turu nedir?",
 content:
 "MerrySails İstanbul Akşam Yemekli Boğaz Turu, Kabataş İskelesi'nden her gece saat 20:30'da kalkan 3,5 saatlik paylaşımlı bir Boğaz programıdır — 2001'den bu yana TÜRSAB A Grubu lisanslı (#14316) Meryem Yıldız Travel ünvanı altında işletilir, bugüne kadar 50.000'i aşkın misafir tekneye bindi. Dört paket sunulur: Silver Soft €30 (üç çeşit yemek, alkolsüz içecek), Silver Alkollü €45 (yerel bira ve şarap dahil), Gold Soft €80 (premium menü + VIP sahne yakını koltuk, alkolsüz), Gold Unlimited €90 (sınırsız rakı/şarap/kokteyl + Sultanahmet ve Taksim otellerinden ücretsiz oda transfer dahil). Rota Dolmabahçe Sarayı'ndan başlayıp Boğaziçi Köprüsü altından geçer, Rumeli Hisarı'nda U dönüşü yapıp Anadolu yakası yalılarına (Kandilli, Vaniköy, Çengelköy) yönelir; saat 00:00 civarında Kabataş'a döner. Tekne içinde canlı Türk gecesi gösterisi (keman, ud, vokal, göbek dansçısı) sahnelenir. Çocuklar 3 yaş altı ücretsiz, 3–13 yaş %50 indirim. Doğrudan rezervasyon: merrysails.com veya WhatsApp +90 544 898 98 12 — 60 dakikada yazılı onay, 48 saat öncesine kadar ücretsiz iptal.",
 },
 de: {
 title: "Istanbul Dinner-Kreuzfahrt — MerrySails",
 question: "Was ist die MerrySails Istanbul Dinner-Kreuzfahrt?",
 content:
 "Die Istanbul-Dinner-Kreuzfahrt von MerrySails ist eine 3,5-stündige geteilte Bosporus-Abendfahrt ab Kabataş-Pier, Abfahrt um 20:30 Uhr. Vier veröffentlichte Pakete auf derselben Abendroute: Silver Soft Drinks €30, Silver Alcoholic €45 (€40 Mo/Di/Do — 2 Gläser lokaler Wein oder Bier), Gold Soft Drinks €80 (€75 Mo/Di/Do — VIP-Tisch nahe der Bühne, erweitertes Menü), Gold Unlimited Alcohol €90 (€85 Mo/Di/Do — unbegrenzt lokale und importierte Getränke). Das Dinner ist ein klassisches türkisches Bankett: Willkommens-Cocktail, 10 kalte Mezes (Yaprak Sarma, Hummus, Tarama, Hirtensalat, Cacık, Schafskäse), saisonaler Salat, warme Vorspeise, Hauptgang nach Wahl am Tisch (Fisch, Hähnchen, Fleisch oder vegetarisch auf Anfrage), Baklava und Obst mit türkischem Kaffee oder Tee. Unterhaltung in drei Akten — Folklore und Bauchtanz, Live-Musik, DJ-Finale — Bühne im Hauptsalon sichtbar. Hotelabholung von Sultanahmet, Sirkeci, Taksim, Harbiye, Beyoğlu und Karaköy inklusive. TÜRSAB A-Group lizenziert seit 2001 (#14316), über 50.000 Gäste, Bewertung 4,88 aus 312 verifizierten Rezensionen. Direktbuchung auf merrysails.com, Bestätigung innerhalb von 60 Minuten.",
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
 zh: {
 title: "伊斯坦布尔晚宴游船 — MerrySails",
 question: "MerrySails 伊斯坦布尔晚宴游船是什么?",
 content:
 "MerrySails 伊斯坦布尔晚宴游船是从卡巴塔什码头出发的 3.5 小时共享博斯普鲁斯夜游,共四个套餐:从 €30(Silver,软饮)到 €90(Gold,无限畅饮)。20:30 出发,含酒店接送、土耳其晚宴、现场民俗表演和 DJ。自 2001 年起持有 TÜRSAB A 类许可(#14316),已接待 50,000+ 位客人。在 merrysails.com 直接预订,60 分钟内确认。",
 },
 },

 "yacht-charter-istanbul": {
 en: {
 title: "Yacht Charter Istanbul — MerrySails",
 question: "What is the MerrySails Istanbul yacht charter?",
 content:
 "MerrySails's Istanbul yacht charter is a fully private Bosphorus sailing from Kabataş, Karaköy or Kuruçeşme Marina — TÜRSAB A-Group licensed (#14316), operated under Meryem Yıldız Travel since 2001 with 50,000+ guests hosted. Pricing is per yacht, not per person, and each vessel is a 2-hour entry rate with an hourly step-up: the boutique 12-guest yacht is from €220 (ideal for proposals and intimate couples evenings), the premium 15-guest yacht €320, the 40-guest group yacht €380 in Standard trim or €500 in Signature trim (milestone birthdays, corporate evenings), with the 90-guest event yacht and the 150-guest mega event yacht by bespoke quote (gala dinners, large receptions). A flat 10% discount applies automatically from 3 hours. Captain, crew and TÜRSAB boat insurance included on every vessel; route, duration and menu are fully customisable — minimum 2 hours, maximum full day (8 hours). Add-on menu: €35/guest 4-course meal (fish/chicken/meat/vegetarian), €250 DJ, €190 photographer, €180 live violin/oud, €50 proposal decor, €35–€60 birthday cake. Free cancellation up to 48 hours before departure. Reserve at merrysails.com or WhatsApp +90 544 898 98 12 — written quote within 60 minutes, no broker markup.",
 },
 tr: {
 title: "İstanbul Yat Kiralama — MerrySails",
 question: "MerrySails İstanbul yat kiralama nedir?",
 content:
 "MerrySails İstanbul yat kiralama, Kabataş, Karaköy veya Kuruçeşme Marina iskelelerinden kalkan, teknenin tamamının size özel olarak kiralandığı premium Boğaz deneyimidir — TÜRSAB A Grubu lisanslı (#14316), 2001'den beri Meryem Yıldız Travel ünvanı altında işletilir, 50.000+ misafire ev sahipliği yapmıştır. Fiyatlandırma tekne başınadır, kişi başı değildir; her tekne 2 saatlik bir baz fiyat ve saatlik artışla sunulur: 12 kişilik butik yat €220'den başlar (evlilik teklifi ve çift kutlamaları için ideal), 15 kişilik premium yat €320, 40 kişilik grup yatı Standart tarifede €380 veya Signature tarifede €500 (doğum günü, kurumsal akşam), 90 kişilik etkinlik yatı ve 150 kişilik mega etkinlik yatı ise özel teklifle (gala, büyük resepsiyon). 3 saatten itibaren otomatik %10 indirim uygulanır. Her teknede kaptan, mürettebat ve TÜRSAB tekne sigortası dahildir; rota, süre ve menü tamamen size özeldir — minimum 2 saat, maksimum tam gün (8 saat). Eklenti menüsü: €35/kişi 4 çeşit yemek (balık/tavuk/et/vejetaryen), €250 DJ, €190 fotoğrafçı, €180 keman/ud, €50 evlilik teklifi dekoru, €35–€60 doğum günü pastası. Doğrudan rezervasyon: merrysails.com veya WhatsApp +90 544 898 98 12 — yazılı teklif 60 dakikada, kalkıştan 48 saat öncesine kadar ücretsiz iptal.",
 },
 de: {
 title: "Yacht-Charter Istanbul — MerrySails",
 question: "Was ist der MerrySails Istanbul Yacht-Charter?",
 content:
 "Der Istanbul-Yacht-Charter von MerrySails ist eine vollständig private Bosporus-Fahrt ab Kabataş, Karaköy oder Kuruçeşme — pro Yacht berechnet, nicht pro Person, ab €220 für die 2-stündige 12-Gäste-Boutique-Yacht, €320 für die 15-Gäste-Premium-Yacht und €380 für die 40-Gäste-Gruppenyacht; Event-Yachten für 90 und 150 Gäste auf Angebotsbasis. 10% Rabatt automatisch ab 3 Stunden. Individuelle Zeit, Catering, Fotograf und Antrags-Extras buchbar. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com — kein Makleraufschlag, schriftliches Angebot innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Location de yacht Istanbul — MerrySails",
 question: "Qu'est-ce que la location de yacht Istanbul MerrySails ?",
 content:
 "La location de yacht Istanbul MerrySails est une navigation entièrement privée sur le Bosphore au départ de Kabataş, Karaköy ou Kuruçeşme — tarif par yacht, pas par personne : à partir de €220 pour le yacht boutique 12 invités (2 heures), €320 pour le yacht premium 15 invités et €380 pour le yacht de groupe 40 invités ; yachts événementiels 90 et 150 invités sur devis. Remise de 10% automatique dès 3 heures. Horaire, traiteur, photographe et extras demande en mariage à la carte. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis écrit sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Yachtcharter Istanbul — MerrySails",
 question: "Wat is de MerrySails yachtcharter in Istanbul?",
 content:
 "De MerrySails yachtcharter is een volledig privé Bosporus-vaart vanaf Kabataş, Karaköy of Kuruçeşme — prijs per jacht, niet per persoon: vanaf €220 voor het boutique-jacht voor 12 gasten (2 uur), €320 voor het premium-jacht voor 15 gasten en €380 voor het groepsjacht voor 40 gasten; event-jachten voor 90 en 150 gasten op offertebasis. 10% korting automatisch vanaf 3 uur. Tijdstip, catering, fotograaf en huwelijksaanzoek-extras op maat. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken via merrysails.com — geen makelaarsmarge, schriftelijke offerte binnen 60 minuten.",
 },
 ru: {
 title: "Аренда яхты в Стамбуле — MerrySails",
 question: "Что такое аренда яхты в Стамбуле от MerrySails?",
 content:
 "Аренда яхты MerrySails — это полностью частная прогулка по Босфору от пирсов Кабаташ, Каракёй или Куручешме. Цена за яхту, а не за человека: от €220 за бутик-яхту на 12 гостей (2 часа), €320 за премиум-яхту на 15 гостей и €380 за групповую яхту на 40 гостей; яхты для мероприятий на 90 и 150 гостей — по индивидуальному предложению. Скидка 10% автоматически от 3 часов. Гибкое время, кейтеринг, фотограф и опции для предложения руки. Лицензия TÜRSAB A с 2001 года (#14316). Письменное предложение в течение 60 минут через WhatsApp.",
 },
 zh: {
 title: "伊斯坦布尔私人游艇包租 — MerrySails",
 question: "MerrySails 伊斯坦布尔私人游艇包租是什么?",
 content:
 "MerrySails 私人游艇包租是从卡巴塔什、卡拉科伊或库鲁切什梅码头出发的完全私人博斯普鲁斯航程。按整艘游艇计价(非按人),每艘均为 2 小时基础价加每小时加价:12 人精品游艇 €220 起,15 人高级游艇 €320,40 人团体游艇标准款 €380、Signature 款 €500;90 人活动游艇和 150 人超大型活动游艇均按定制报价。3 小时起自动享受 10% 折扣。船长、船员及 TÜRSAB 船只保险均含;航线、时长与菜单可完全定制。自 2001 年起持有 TÜRSAB A 类许可(#14316)。通过 WhatsApp 60 分钟内出具书面报价。",
 },
 },

 // 2026-07-09: "sunset-cruise-tickets-istanbul" QuickAnswer entry removed —
 // that page 301s to /cruises/bosphorus-sunset-cruise now (DMCA-named-twin
 // consolidation), which has its own "bosphorus-sunset-cruise" QuickAnswer
 // entry above. See next.config.ts for the redirect.

 "best-bosphorus-cruise-2026": {
 en: {
 title: "Best Bosphorus Cruise 2026 — MerrySails",
 question: "What is the best Bosphorus cruise to book in 2026?",
 content:
 "For 2026, the best-value Bosphorus cruise is MerrySails's shared sunset sailing — 2 hours from Karaköy pier at 19:00 daily, €30–€40 per person, the same operator running the route under TÜRSAB A-Group licence (#14316) since 2001. Dinner cruises start at €30, private yacht charters at €220. Book direct at merrysails.com, confirmation within 60 minutes, no OTA markup.",
 },
 tr: {
 title: "2026 İçin En İyi Boğaz Turu — MerrySails",
 question: "2026'da rezerve edilecek en iyi Boğaz turu hangisidir?",
 content:
 "2026 için en iyi fiyat–performans oranlı Boğaz turu MerrySails'un paylaşımlı gün batımı seferidir: her gün 19:00'da Karaköy iskeleden 2 saat, kişi başı €30–€40. TÜRSAB A Grubu lisanslı (#14316), 2001'den beri aynı rotada işletilen tur. Akşam yemekli turlar €30'dan, özel yat kiralama €220'dan başlar. merrysails.com üzerinden direkt rezervasyon, OTA komisyonu yok.",
 },
 de: {
 title: "Beste Bosporus-Kreuzfahrt 2026 — MerrySails",
 question: "Was ist die beste Bosporus-Kreuzfahrt für 2026?",
 content:
 "Die beste Bosporus-Kreuzfahrt für 2026 ist die geteilte Sunset-Fahrt von MerrySails — 2 Stunden ab Karaköy-Pier täglich um 19:00 Uhr, €30–€40 pro Person, derselbe Betreiber unter TÜRSAB A-Group-Lizenz (#14316) seit 2001. Dinner-Kreuzfahrten ab €30, private Yacht-Charter ab €220. Direktbuchung auf merrysails.com, Bestätigung innerhalb von 60 Minuten, keine OTA-Aufschläge.",
 },
 fr: {
 title: "Meilleure croisière Bosphore 2026 — MerrySails",
 question: "Quelle est la meilleure croisière Bosphore à réserver en 2026 ?",
 content:
 "Pour 2026, la meilleure croisière Bosphore en rapport qualité-prix est la navigation coucher de soleil partagée de MerrySails — 2 heures depuis Karaköy à 19h00 chaque jour, €30–€40 par personne, même opérateur sous licence TÜRSAB groupe A (#14316) depuis 2001. Croisière dîner dès €30, yacht privé dès €220. Réservation directe sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Beste Bosporus-Cruise 2026 — MerrySails",
 question: "Wat is de beste Bosporus-cruise om in 2026 te boeken?",
 content:
 "Voor 2026 is de beste Bosporus-cruise qua prijs-kwaliteit de gedeelde zonsondergangs-vaart van MerrySails — 2 uur vanaf Karaköy-pier dagelijks om 19:00 uur, €30–€40 per persoon, dezelfde operator onder TÜRSAB A-Group-licentie (#14316) sinds 2001. Dinner-cruises vanaf €30, privé yachtcharter vanaf €220. Direct boeken via merrysails.com, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Лучший круиз по Босфору в 2026 — MerrySails",
 question: "Какой круиз по Босфору лучше бронировать в 2026 году?",
 content:
 "Лучший круиз по Босфору на 2026 год — групповой закатный рейс MerrySails: 2 часа от пирса Каракёй ежедневно в 19:00, €30–€40 с человека, тот же оператор по лицензии TÜRSAB A (#14316) с 2001 года. Ужин-круизы от €30, аренда яхты от €220. Прямое бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 },

 "compare-bosphorus-cruises": {
 en: {
 title: "Compare Bosphorus Cruises — MerrySails",
 question: "How do MerrySails's Bosphorus cruises compare?",
 content:
 "MerrySails runs three Bosphorus products side by side: a 2-hour shared sunset sailing from Karaköy at €30–€40 (19:00 daily), a 3.5-hour shared dinner cruise from Kabataş at €30–€90 (20:30 with hotel pickup), and private yacht charters from €220. All under the same TÜRSAB A-Group licence (#14316) since 2001. Book direct, confirmation within 60 minutes.",
 },
 tr: {
 title: "Boğaz Turlarını Karşılaştır — MerrySails",
 question: "MerrySails'un Boğaz turları nasıl karşılaştırılır?",
 content:
 "MerrySails üç Boğaz ürününü yan yana sunar: 2 saatlik paylaşımlı gün batımı turu Karaköy'den €30–€40 (her gün 19:00), 3,5 saatlik paylaşımlı akşam yemekli tur Kabataş'tan €30–€90 (20:30, otel transferli) ve €220'dan başlayan özel yat kiralama. Hepsi aynı TÜRSAB A Grubu lisansı altında (#14316), 2001'den beri. Direkt rezervasyon, onay 60 dakikada.",
 },
 de: {
 title: "Bosporus-Kreuzfahrten vergleichen — MerrySails",
 question: "Wie vergleichen sich die Bosporus-Kreuzfahrten von MerrySails?",
 content:
 "MerrySails bietet drei Bosporus-Produkte nebeneinander: 2-stündige geteilte Sunset-Fahrt ab Karaköy €30–€40 (täglich 19:00 Uhr), 3,5-stündige geteilte Dinner-Kreuzfahrt ab Kabataş €30–€90 (20:30 Uhr mit Hotel-Abholung) und private Yacht-Charter ab €220. Alle unter derselben TÜRSAB A-Group-Lizenz (#14316) seit 2001. Direktbuchung, Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Comparer les croisières Bosphore — MerrySails",
 question: "Comment comparer les croisières Bosphore de MerrySails ?",
 content:
 "MerrySails propose trois produits Bosphore côte à côte : croisière coucher de soleil partagée de 2 heures depuis Karaköy à €30–€40 (19h00 chaque jour), croisière dîner partagée de 3h30 depuis Kabataş à €30–€90 (20h30 avec transfert hôtel), et location de yacht privé dès €220. Tous sous la même licence TÜRSAB groupe A (#14316) depuis 2001. Confirmation sous 60 minutes.",
 },
 nl: {
 title: "Bosporus-Cruises Vergelijken — MerrySails",
 question: "Hoe verhouden de Bosporus-cruises van MerrySails zich tot elkaar?",
 content:
 "MerrySails biedt drie Bosporus-producten naast elkaar: 2 uur gedeelde zonsondergangs-vaart vanaf Karaköy €30–€40 (dagelijks 19:00), 3,5 uur gedeelde dinner-cruise vanaf Kabataş €30–€90 (20:30 met hotelophaling) en privé yachtcharter vanaf €220. Alles onder dezelfde TÜRSAB A-Group-licentie (#14316) sinds 2001. Direct boeken, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Сравнить круизы по Босфору — MerrySails",
 question: "Как сравниваются круизы по Босфору от MerrySails?",
 content:
 "MerrySails предлагает три продукта по Босфору: 2-часовой групповой закатный круиз от Каракёй за €30–€40 (ежедневно в 19:00), 3,5-часовой групповой ужин-круиз от Кабаташ за €30–€90 (20:30, с трансфером) и аренду частной яхты от €220. Всё под одной лицензией TÜRSAB A (#14316) с 2001 года. Бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 },

 "bosphorus-cruise": {
 en: {
 title: "Bosphorus Cruise Istanbul — MerrySails",
 question: "What Bosphorus cruise options does MerrySails offer in Istanbul?",
 content:
 "MerrySails is Istanbul's TÜRSAB A-Group licensed Bosphorus cruise operator (#14316) — trading as Meryem Yıldız Travel since 2001, with 50,000+ guests hosted from Karaköy, Kabataş and Kuruçeşme piers. Three direct-bookable options on published rates: shared sunset sailing €30 (Mon/Tue/Thu) or €34 other days — 2-hour Karaköy route with 19:00 departure, English-speaking guide, tea/Turkish coffee and snack platter; shared dinner cruise €30–€90 across four packages (Silver Soft €30, Silver Alcoholic €45, Gold Soft €80, Gold Unlimited €90) — 3.5 hours from Kabataş 20:30 with 10 cold mezes, live Turkish-night show, hotel pickup from Sultanahmet/Taksim; private yacht charter from €220 per yacht (not per person), 10–150 guest capacity, captain and TÜRSAB insurance included, fully custom route, menu and timing. All routes pass Dolmabahçe Palace, Maiden's Tower, Ortaköy Mosque, Bosphorus Bridge and Rumeli Hisarı. Free cancellation up to 48 hours before departure. Reserve at merrysails.com or WhatsApp +90 544 898 98 12 — written confirmation within 60 minutes, no OTA commission.",
 },
 tr: {
 title: "İstanbul Boğaz Turu — MerrySails",
 question: "MerrySails İstanbul'da hangi Boğaz turu seçeneklerini sunuyor?",
 content:
 "MerrySails, TÜRSAB A Grubu lisanslı (#14316) İstanbul Boğaz turu operatörüdür — 2001'den bu yana 50.000+ misafir Kabataş, Karaköy ve Kuruçeşme iskelelerinden tekneye bindi. Üç doğrudan rezerve edilebilir seçenek mevcuttur: paylaşımlı gün batımı turu €30'dan başlar (2 saat, Karaköy kalkışı, yazın saat 19:00, Pazartesi/Salı/Perşembe günleri indirimli — diğer günler €34); paylaşımlı akşam yemekli Boğaz turu €30'dan başlar (3,5 saat, Kabataş kalkışı 20:30, dört çeşit yemek, canlı Türk gecesi gösterisi, Sultanahmet ve Taksim otelleri için ücretsiz transfer dahil €90 paket); özel yat kiralama ise €220'dan başlayan tekne başına fiyatlandırılır (10–150 kişi, rota ve menü size özel). Tüm rotalar Dolmabahçe Sarayı, Kız Kulesi, Ortaköy Camii, Boğaziçi Köprüsü ve Rumeli Hisarı'nı kapsar. OTA komisyonu yok — merrysails.com veya WhatsApp +90 544 898 98 12 üzerinden 60 dakikada yazılı onay alırsınız. Sefer iptal politikası: 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi.",
 },
 de: {
 title: "Bosporus-Kreuzfahrt Istanbul — MerrySails",
 question: "Welche Bosporus-Kreuzfahrten bietet MerrySails in Istanbul an?",
 content:
 "MerrySails ist Istanbuls TÜRSAB A-Group lizenzierter Bosporus-Anbieter seit 2001 (#14316). Drei direkt buchbare Optionen: geteilte Sunset-Fahrt ab €30 (2 h, Karaköy, 19:00 Uhr), geteilte Dinner-Kreuzfahrt ab €30 (3,5 h, Kabataş, 20:30 Uhr mit Hotel-Abholung) und private Yacht-Charter ab €220 (individuell). Reservierung auf merrysails.com — keine OTA-Vermittler, Bestätigung innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière Bosphore Istanbul — MerrySails",
 question: "Quelles croisières Bosphore propose MerrySails à Istanbul ?",
 content:
 "MerrySails est l'opérateur Bosphore d'Istanbul sous licence TÜRSAB groupe A depuis 2001 (#14316). Trois options réservables en direct : croisière coucher de soleil partagée dès €30 (2 h, Karaköy, 19h00), croisière dîner partagée dès €30 (3h30, Kabataş, 20h30 avec transfert), et yacht privé dès €220 (horaire libre). Réservez sur merrysails.com, confirmation sous 60 minutes.",
 },
 nl: {
 title: "Bosporus-Cruise Istanbul — MerrySails",
 question: "Welke Bosporus-cruises biedt MerrySails in Istanbul?",
 content:
 "MerrySails is sinds 2001 Istanbul's TÜRSAB A-Group gelicentieerde Bosporus-cruise-operator (#14316). Drie direct boekbare opties: gedeelde zonsondergangs-vaart vanaf €30 (2 u, Karaköy, 19:00), gedeelde dinner-cruise vanaf €30 (3,5 u, Kabataş, 20:30 met hotelophaling) en privé yachtcharter vanaf €220 (op maat). Boek op merrysails.com — geen OTA-tussenpersoon, bevestiging binnen 60 minuten.",
 },
 ru: {
 title: "Круиз по Босфору в Стамбуле — MerrySails",
 question: "Какие круизы по Босфору предлагает MerrySails в Стамбуле?",
 content:
 "MerrySails — оператор круизов по Босфору в Стамбуле по лицензии TÜRSAB A с 2001 года (#14316). Три варианта прямого бронирования: групповой закатный круиз от €30 (2 ч, Каракёй, 19:00), групповой ужин-круиз от €30 (3,5 ч, Кабаташ, 20:30, с трансфером) и частная яхта от €220 (гибкое время). Бронирование через WhatsApp, подтверждение за 60 минут.",
 },
 zh: {
 title: "伊斯坦布尔博斯普鲁斯游船 — MerrySails",
 question: "MerrySails 在伊斯坦布尔提供哪些博斯普鲁斯游船选择?",
 content:
 "MerrySails 是伊斯坦布尔持有 TÜRSAB A 类许可(#14316)的博斯普鲁斯游船运营商,自 2001 年起已接待 50,000+ 位客人。三种直接预订选择:共享日落游船 €30 起(2 小时,卡拉科伊,19:00 出发);共享晚宴游船 €30–€90 共四个套餐(3.5 小时,卡巴塔什,20:30 出发,含酒店接送);私人游艇包租 €220 起(按整艘计价,10–150 人,含船长与 TÜRSAB 保险,航线菜单可定制)。所有航线均经过多尔玛巴赫切宫、少女塔、奥塔科伊清真寺与鲁梅利堡。在 merrysails.com 直接预订,60 分钟内确认。",
 },
 },

 "private-bosphorus-dinner-cruise": {
 en: {
 title: "Private Bosphorus Dinner Cruise — MerrySails",
 question: "What is the MerrySails private Bosphorus dinner cruise?",
 content:
 "MerrySails's Private Bosphorus Dinner Cruise is a fully private evening yacht charter from Kabataş or Karaköy pier, from €320 for the deck, with custom Turkish dinner menu, wine pairings and 3-hour Bosphorus route past Dolmabahçe, Ortaköy and Rumeli Hisarı. Capacity 2–14 guests. TÜRSAB A-Group licensed since 2001 (#14316). Direct quote on merrysails.com within 60 minutes.",
 },
 tr: {
 title: "Özel Boğaz Akşam Yemekli Turu — MerrySails",
 question: "MerrySails özel Boğaz akşam yemekli turu nedir?",
 content:
 "MerrySails Özel Boğaz Akşam Yemekli Turu, Kabataş veya Karaköy iskeleden kalkan tamamen özel bir akşam yat kiralamasıdır. Güverte €320'dan başlar; özel Türk menüsü, şarap eşleştirmesi ve Dolmabahçe, Ortaköy, Rumeli Hisarı'nı geçen 3 saatlik Boğaz rotası dahildir. 2–14 kişi kapasite. TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). merrysails.com'dan 60 dakikada teklif.",
 },
 de: {
 title: "Private Bosporus-Dinner-Kreuzfahrt — MerrySails",
 question: "Was ist die private Bosporus-Dinner-Kreuzfahrt von MerrySails?",
 content:
 "Die private Bosporus-Dinner-Kreuzfahrt von MerrySails ist ein vollständig privater Abend-Yacht-Charter ab Kabataş oder Karaköy, ab €320 für das Deck — mit individuellem türkischem Menü, Wein-Pairings und 3-stündiger Bosporus-Route vorbei an Dolmabahçe, Ortaköy und Rumeli Hisarı. Kapazität 2–14 Gäste. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktangebot auf merrysails.com innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Croisière dîner privée Bosphore — MerrySails",
 question: "Qu'est-ce que la croisière dîner privée Bosphore MerrySails ?",
 content:
 "La croisière dîner privée Bosphore MerrySails est une location de yacht entièrement privée au départ de Kabataş ou Karaköy, à partir de €320 le pont, avec menu turc sur mesure, accords mets-vins et parcours Bosphore de 3 heures passant Dolmabahçe, Ortaköy et Rumeli Hisarı. Capacité 2 à 14 invités. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Privé Bosporus Dinner-Cruise — MerrySails",
 question: "Wat is de privé Bosporus dinner-cruise van MerrySails?",
 content:
 "De privé Bosporus dinner-cruise van MerrySails is een volledig privé avond-yachtcharter vanaf Kabataş of Karaköy, vanaf €320 voor het dek, met op maat gemaakt Turks menu, wijnarrangement en 3 uur durende Bosporus-route langs Dolmabahçe, Ortaköy en Rumeli Hisarı. Capaciteit 2–14 gasten. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Offerte binnen 60 minuten via merrysails.com.",
 },
 ru: {
 title: "Частный ужин-круиз по Босфору — MerrySails",
 question: "Что такое частный ужин-круиз по Босфору от MerrySails?",
 content:
 "Частный ужин-круиз MerrySails — это полностью частная вечерняя аренда яхты от пирса Кабаташ или Каракёй, от €320 за палубу, с индивидуальным турецким меню, винным сопровождением и 3-часовым маршрутом мимо Долмабахче, Ортакёй и Румели Хисары. Вместимость 2–14 гостей. Лицензия TÜRSAB A с 2001 года (#14316). Запрос через WhatsApp, ответ за 60 минут.",
 },
 },

 "proposal-yacht-rental-istanbul": {
 en: {
 title: "Proposal Yacht Rental Istanbul — MerrySails",
 question: "How do I rent a proposal yacht in Istanbul?",
 content:
 "MerrySails's Proposal Yacht Rental Istanbul is a fully private golden-hour Bosphorus sailing from Kabataş or Karaköy pier, from €220 for the yacht. Optional photographer, flower decoration, champagne and Maiden's Tower timing. Captain has run dozens of reveals. TÜRSAB A-Group licensed since 2001 (#14316). Direct booking on merrysails.com, written quote within 60 minutes — no broker fee.",
 },
 tr: {
 title: "İstanbul Evlilik Teklifi Yat Kiralama — MerrySails",
 question: "İstanbul'da evlilik teklifi için yat nasıl kiralanır?",
 content:
 "MerrySails İstanbul Evlilik Teklifi Yat Kiralama, Kabataş veya Karaköy iskeleden kalkan tamamen özel bir altın saat Boğaz turudur. Yat €220'dan başlar; isteğe bağlı fotoğrafçı, çiçek süslemesi, şampanya ve Kız Kulesi zamanlaması mevcuttur. Kaptan onlarca teklif organize etmiştir. TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). merrysails.com'dan direkt rezervasyon, 60 dakikada yazılı teklif.",
 },
 de: {
 title: "Antrags-Yacht-Vermietung Istanbul — MerrySails",
 question: "Wie miete ich eine Antrags-Yacht in Istanbul?",
 content:
 "Die Antrags-Yacht-Vermietung von MerrySails ist eine vollständig private Goldene-Stunde-Bosporus-Fahrt ab Kabataş oder Karaköy, ab €220 für die Yacht. Optional Fotograf, Blumendekoration, Champagner und Mädchenturm-Timing. Der Kapitän hat zahlreiche Anträge begleitet. TÜRSAB A-Group lizenziert seit 2001 (#14316). Direktbuchung auf merrysails.com, schriftliches Angebot innerhalb von 60 Minuten — keine Maklergebühr.",
 },
 fr: {
 title: "Location yacht demande en mariage Istanbul — MerrySails",
 question: "Comment louer un yacht pour une demande en mariage à Istanbul ?",
 content:
 "La location de yacht demande en mariage MerrySails est une navigation Bosphore entièrement privée à l'heure dorée au départ de Kabataş ou Karaköy, dès €220 pour le yacht. Photographe, décoration florale, champagne et timing devant la tour de Léandre en option. Capitaine expérimenté. Licence TÜRSAB groupe A depuis 2001 (#14316). Devis écrit sous 60 minutes sur merrysails.com.",
 },
 nl: {
 title: "Aanzoek-Yacht Verhuur Istanbul — MerrySails",
 question: "Hoe huur ik een yacht voor een huwelijksaanzoek in Istanbul?",
 content:
 "De aanzoek-yacht-verhuur van MerrySails is een volledig privé Bosporus-vaart in het gouden uur vanaf Kabataş of Karaköy, vanaf €220 voor het yacht. Optioneel fotograaf, bloemdecoratie, champagne en Maagdentoren-timing. De kapitein heeft tientallen aanzoeken begeleid. TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Direct boeken op merrysails.com, schriftelijke offerte binnen 60 minuten — geen makelaarsmarge.",
 },
 ru: {
 title: "Аренда яхты для предложения руки в Стамбуле — MerrySails",
 question: "Как арендовать яхту для предложения руки и сердца в Стамбуле?",
 content:
 "Аренда яхты для предложения руки от MerrySails — полностью частная прогулка по Босфору в золотой час от пирса Кабаташ или Каракёй, от €220 за яхту. Опции: фотограф, цветочное оформление, шампанское и тайминг у Девичьей башни. Капитан провёл десятки предложений. Лицензия TÜRSAB A с 2001 года (#14316). Письменный ответ за 60 минут через WhatsApp.",
 },
 },

 "corporate-yacht-dinner-istanbul": {
 en: {
 title: "Corporate Yacht Dinner Istanbul — MerrySails",
 question: "What is the MerrySails corporate yacht dinner in Istanbul?",
 content:
 "MerrySails's Corporate Yacht Dinner Istanbul is a fully private Bosphorus charter for company events from Kabataş or Karaköy pier, from €320 for the deck, with custom catering, AV setup, branding placement and 3–4 hour Bosphorus route. Capacity 10–25 guests. Invoiced via Meryem Yıldız Travel — TÜRSAB A-Group licensed since 2001 (#14316). Quote and contract within 60 minutes.",
 },
 tr: {
 title: "İstanbul Kurumsal Yat Akşam Yemeği — MerrySails",
 question: "MerrySails İstanbul kurumsal yat akşam yemeği nedir?",
 content:
 "MerrySails İstanbul Kurumsal Yat Akşam Yemeği, Kabataş veya Karaköy iskeleden kalkan, şirket etkinlikleri için tamamen özel bir Boğaz kiralamasıdır. Güverte €320'dan başlar; özel catering, ses-görüntü kurulumu, marka yerleşimi ve 3–4 saatlik Boğaz rotası dahildir. 10–25 kişi kapasite. Meryem Yıldız Travel faturasıyla — TÜRSAB A Grubu lisanslı, 2001'den beri (#14316). 60 dakikada teklif ve sözleşme.",
 },
 de: {
 title: "Firmen-Yacht-Dinner Istanbul — MerrySails",
 question: "Was ist das MerrySails Firmen-Yacht-Dinner in Istanbul?",
 content:
 "Das Firmen-Yacht-Dinner Istanbul von MerrySails ist ein vollständig privater Bosporus-Charter für Firmenveranstaltungen ab Kabataş oder Karaköy, ab €320 für das Deck, mit individuellem Catering, AV-Setup, Branding-Platzierung und 3–4-stündiger Bosporus-Route. Kapazität 10–25 Gäste. Rechnungsstellung über Meryem Yıldız Travel — TÜRSAB A-Group lizenziert seit 2001 (#14316). Angebot und Vertrag innerhalb von 60 Minuten.",
 },
 fr: {
 title: "Dîner yacht entreprise Istanbul — MerrySails",
 question: "Qu'est-ce que le dîner yacht entreprise MerrySails à Istanbul ?",
 content:
 "Le dîner yacht entreprise MerrySails est une location Bosphore entièrement privée pour événements professionnels au départ de Kabataş ou Karaköy, dès €320 le pont, avec traiteur sur mesure, équipement AV, placement de marque et parcours Bosphore de 3 à 4 heures. Capacité 10 à 25 invités. Facturé via Meryem Yıldız Travel — licence TÜRSAB groupe A depuis 2001 (#14316). Devis et contrat sous 60 minutes.",
 },
 nl: {
 title: "Zakelijke Yacht-Diner Istanbul — MerrySails",
 question: "Wat is het zakelijke yacht-diner van MerrySails in Istanbul?",
 content:
 "Het zakelijke yacht-diner van MerrySails is een volledig privé Bosporus-charter voor bedrijfsevenementen vanaf Kabataş of Karaköy, vanaf €320 voor het dek, met catering op maat, AV-setup, branding-plaatsing en 3–4 uur durende Bosporus-route. Capaciteit 10–25 gasten. Gefactureerd via Meryem Yıldız Travel — TÜRSAB A-Group gelicentieerd sinds 2001 (#14316). Offerte en contract binnen 60 minuten.",
 },
 ru: {
 title: "Корпоративный ужин на яхте в Стамбуле — MerrySails",
 question: "Что такое корпоративный ужин на яхте от MerrySails в Стамбуле?",
 content:
 "Корпоративный ужин на яхте от MerrySails — это полностью частный чартер по Босфору для корпоративных мероприятий от пирса Кабаташ или Каракёй, от €320 за палубу, с кейтерингом под заказ, AV-оборудованием, размещением брендинга и 3–4-часовым маршрутом. Вместимость 10–25 гостей. Счёт через Meryem Yıldız Travel — лицензия TÜRSAB A с 2001 года (#14316). Договор за 60 минут через WhatsApp.",
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
