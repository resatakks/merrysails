import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Plane, Camera, Wine, MapPin } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";

/**
 * /[locale]/honeymoon-yacht-cruise-istanbul
 *
 * Native locale variants of the honeymoon yacht cruise landing page.
 * Five locales: tr, de, fr, nl, ru. Each gets its own metaTitle,
 * metaDescription, body copy, FAQ, and sample programme.
 *
 * Distinct intent from /[locale]/proposal-yacht-rental-istanbul
 * (pre-engagement) and /[locale]/anniversary-yacht-cruise-istanbul
 * (existing couple, anniversary date). Honeymoon = just-married,
 * multi-stop Türkiye itinerary.
 */

type LocaleContent = {
 metaTitle: string;
 metaDescription: string;
 canonicalPath: string;
 eyebrow: string;
 h1: string;
 intro: string;
 capsule: string;
 reasonsHeading: string;
 reasons: Array<{ icon: typeof Plane; title: string; desc: string }>;
 programmeHeading: string;
 programmeIntro: string;
 programmeSteps: Array<{ time: string; title: string; desc: string }>;
 faqHeading: string;
 faqs: Array<{ q: string; a: string }>;
 ctaHeading: string;
 ctaBody: string;
 ctaPrimary: string;
 ctaWhatsapp: string;
 whatsappPrefill: string;
 trustLine: string;
 reserveLabel: string;
};

const CONTENT: Record<string, LocaleContent> = {
 tr: {
 metaTitle: "İstanbul Balayı Yat Kiralama — Boğaz",
 metaDescription:
 "Boğaz'da balayı için özel yat — 2 saat €220'den, pasta, şampanya, fotoğrafçı, gün batımı. TÜRSAB A lisanslı, 2001'den beri.",
 canonicalPath: "/tr/honeymoon-yacht-cruise-istanbul",
 eyebrow: "Balayı · Yeni evli · Özel yat",
 h1: "İstanbul Balayı Yat Kiralama",
 intro:
 "Balayı çiftlerine özel Boğaz yat kiralaması — genellikle Kapadokya, Antalya veya Bodrum'u kapsayan 7-10 günlük bir Türkiye turuyla birlikte planlanır. 2 saatlik temel kiralama Boutique butik yatımızda €220'den, geniş güverteli ve özel oturma düzenli Premium €320'den başlar. Çoğu çift pasta + şampanya + fotoğrafçıyı ekler — bu eklentiler talebe göre ayarlanır — kesin fiyat için WhatsApp.",
 capsule:
 "İstanbul'da balayı yat kiralama, yeni evli çiftler için özel olarak hazırlanmış bir Boğaz yat deneyimidir. 2 saatlik özel kiralama €220'den başlar; şampanyalı karşılama, kişiye özel düğün tarihli pasta, profesyonel fotoğrafçı (7 gün içinde 50+ düzenlenmiş fotoğraf), canlı kemancı ve gün batımı zamanlaması istek üzerine eklenir. Kalkış Kabataş veya Kuruçeşme Marina'dan; tam iskele bilgisi rezervasyon sonrası WhatsApp ile teyit edilir. Türkiye gezisinin son İstanbul akşamı için en iyi tercih.",
 reasonsHeading: "Balayı için neden bu format?",
 reasons: [
 {
 icon: Plane,
 title: "Türkiye gezisinin diğer adımlarıyla uyumlu",
 desc: "Çoğu çift İstanbul (3-4 gün) + Kapadokya veya Antalya kombinasyonu seçiyor. Yat akşamını son İstanbul gecesine planlayın — şehri bavul toplama telaşı yerine Boğaz'da bitirin.",
 },
 {
 icon: Camera,
 title: "Sürpriz baskısı olmadan fotojenik",
 desc: "Aynı güney Boğaz rotası — Dolmabahçe Sarayı, Ortaköy Camii, 1. Boğaz Köprüsü, Rumeli Hisarı — ama daha sakin tempo. Kendi telefonunuz veya profesyonel fotoğrafçı (7 gün içinde 50+ düzenlenmiş kare).",
 },
 {
 icon: Wine,
 title: "Şampanya, pasta, özel menü — opsiyonel",
 desc: "Şampanya karşılaması, düğün tarihinizi ve mekanınızı içeren kişiye özel pasta, çok aşamalı akşam yemeği (balık/tavuk/vejetaryen), karşılama anı için canlı kemancı — isteğe bağlı eklenir.",
 },
 {
 icon: MapPin,
 title: "Otelinize göre uyarlanan rota",
 desc: "Sultanahmet, Beşiktaş, Karaköy veya Cihangir'de kalıyorsanız iskeleyi size en yakın noktaya ayarlıyoruz. Beşiktaş için Kuruçeşme Marina, Beyoğlu için Karaköy, Sultanahmet için Kabataş.",
 },
 ],
 programmeHeading: "Örnek 2,5 saatlik balayı programı",
 programmeIntro: "",
 programmeSteps: [
 { time: "19:00", title: "Şampanya karşılamasıyla biniş", desc: "İsteğe bağlı kemancı iskelede karşılıyor. Yat beyaz çiçeklerle ve düğün tarihinizi içeren özel tabela ile dekore." },
 { time: "19:15", title: "Kalkış + Dolmabahçe geçişi", desc: "Aydınlatılmış sarayın arka planında ilk fotoğraf seti." },
 { time: "19:40", title: "Ortaköy Camii + 1. Boğaz Köprüsü", desc: "İstanbul siluetinin imza karesi. Akşam yemeği üst güvertede servisedilir." },
 { time: "20:15", title: "Rumeli Hisarı dönüş noktası", desc: "Düğün tarihinizi ve mekanınızı içeren pasta servisi. Kaptan isterseniz hazırlanan özel mesajı okur." },
 { time: "21:00", title: "Mavi saatte Kabataş'a dönüş", desc: "Köprü ışıklarının altında final fotoğraf seti. Düzenlenmiş fotoğraflar 7 gün içinde teslim edilir; ham dosyalar USB ile iniş anında verilir." },
 ],
 faqHeading: "Balayı SSS",
 faqs: [
 {
 q: "İstanbul'da balayı yat kiralama ne kadar?",
 a: "Boutique yat 2 saatlik kiralama €220'den başlar (12 kişiye kadar). Geniş güverteli Premium €320. Çoğu balayı çifti şampanya servisi (€60-€120), düğün tarihli kişiye özel pasta (~€80) ve fotoğrafçı ekler — bu eklentiler talebe göre ayarlanır — kesin fiyat için WhatsApp.",
 },
 {
 q: "Balayı kruvazı evlilik teklifi kruvazından nasıl farklı?",
 a: "Evlilik teklifi kruvazı gizli bir an etrafında planlanır — sıkı zamanlama, gizli fotoğrafçı, sürpriz açılış. Balayı kruvazı ise bir anı etrafında planlanır — rahat tempo, rotayı boyunca fotoğraf fırsatları, sürpriz mekaniği yok. Aynı yat filosu, aynı rota, farklı program.",
 },
 {
 q: "Yıldönümü kruvazından nasıl farklı?",
 a: "Yıldönümü kruvazları genellikle belirli bir tarihe (düğün yıldönümü) bağlıdır. Balayı kruvazları gezi sırasında — genelde düğünden 1-4 hafta sonra — ve çoğunlukla çok duraklı bir Türkiye programına uyar. Onboard deneyim benzer olabilir ama balayı planlaması Kapadokya/Antalya/Bodrum etaplarıyla entegre olur.",
 },
 {
 q: "Balayı kruvazını İstanbul programının neresine yerleştirmeliyim?",
 a: "En güçlü kalıp: Kapadokya veya Antalya'ya uçuştan önceki son İstanbul akşamı. Şehri bavul toplama yerine Boğaz'da kapatırsınız. Alternatif: ilk İstanbul akşamı taze-varış kutlaması olarak. Uçuşunuzla aynı geceye denk getirmekten kaçının — jetlag + feribot zamanlaması nadiren uyar.",
 },
 {
 q: "Gün batımı + akşam yemeği + fotoğrafçı kombinasyonu mümkün mü?",
 a: "Evet — en talep edilen balayı kombinasyonu. Yat gün batımından 30-45 dakika önce biniyor, şampanya karşılaması, altın saatte güney Boğaz rotası, fotoğrafçı köprü + Ortaköy + Rumeli geçişlerini çekiyor ve akşam yemeği mavi saat dönüşünde servisediliyor. Toplam suda kalma süresi: 2,5-3 saat.",
 },
 {
 q: "Kapadokya önce, İstanbul sonra programımız için en iyi rota?",
 a: "Kapadokya 1-3 gün, İstanbul 4-6 gün ise yat kruvazını 5. gün akşamına bookleyin (ikinci İstanbul geceniz). 4. gün varış ve şehir oryantasyonu için; 5. gün akşamı kruvazı gezinizin finali yapar — ya 6. gün eve uçun ya da Bodrum/Antalya'ya plaj haftası için uzatın.",
 },
 ],
 ctaHeading: "Balayı akşamını planlayın",
 ctaBody: "Düğün tarihinizi + gezi tarihlerinizi + ek tercihlerinizi (pasta, şampanya, fotoğrafçı, kemancı) gönderin. 24 saat içinde yat önerisi, iskele bilgisi ve zamanlama ile tam bir plan dönüyoruz.",
 ctaPrimary: "Yat filosunu gör",
 ctaWhatsapp: "Balayı brifini WhatsApp'tan gönder",
 whatsappPrefill: "Merhaba MerrySails! Balayımız için Boğaz'da özel yat kiralamak istiyoruz. Düğün tarihi: [tarih], İstanbul gezisi: [tarihler]. Pasta / şampanya / fotoğrafçı istiyoruz.",
 trustLine: `Meryem Yıldız Travel altında işletilir · TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} · 2001'den bu yana Boğaz'da 50.000+ misafir.`,
 reserveLabel: "€220'den teklif al",
 },
 de: {
 metaTitle: "Hochzeitsreise-Yacht Istanbul — Bosporus",
 metaDescription:
 "Privat-Yacht für Flitterwochen am Bosporus. 2-h-Charter ab €220, Torte, Champagner, Fotograf, Sonnenuntergang. TÜRSAB A-lizenziert.",
 canonicalPath: "/de/honeymoon-yacht-cruise-istanbul",
 eyebrow: "Hochzeitsreise · Frisch verheiratet · Private Yacht",
 h1: "Hochzeitsreise-Yacht Istanbul",
 intro:
 "Private Yacht-Charter für Hochzeitsreisende — typischerweise kombiniert mit einer 7-10-tägigen Türkei-Reise inklusive Kappadokien, Antalya oder Bodrum. Basis-Charter für 2 Stunden auf unserer Boutique-Yacht ab €220; Premium mit erweitertem Deck und stilisiertem Setup ab €320. Die meisten Flitterwöchner fügen Torte, Champagner und Fotograf hinzu — diese Extras werden auf Anfrage arrangiert – genauen Preis per WhatsApp.",
 capsule:
 "Hochzeitsreise-Yacht-Charter auf dem Bosporus bietet frisch verheirateten Paaren eine private Yacht für 2-3 Stunden ab €220. Champagner-Empfang, individuelle Hochzeitsdatums-Torte, professioneller Fotograf (50+ bearbeitete Bilder in 7 Tagen), Live-Geiger und Sonnenuntergangs-Timing sind optional. Abfahrt von Kabataş oder Kuruçeşme Marina; der genaue Anleger wird nach der Buchung per WhatsApp bestätigt. Ideal für den letzten Istanbul-Abend vor dem Weiterflug nach Kappadokien oder Antalya.",
 reasonsHeading: "Warum dieses Format für Flitterwochen passt",
 reasons: [
 {
 icon: Plane,
 title: "Passt in den Türkei-Reiseplan",
 desc: "Die meisten Hochzeitsreisen kombinieren Istanbul (3-4 Tage) mit Kappadokien oder Antalya. Den Yacht-Abend auf den letzten Istanbul-Abend legen — so endet der Stadt-Teil am Bosporus, nicht beim Kofferpacken.",
 },
 {
 icon: Camera,
 title: "Fotogen ohne Verlobungsdruck",
 desc: "Gleiche Route entlang des südlichen Bosporus — Dolmabahçe-Palast, Ortaköy-Moschee, 1. Bosporus-Brücke, Rumeli Hisarı — aber entspannter getaktet. Eigenes Handy oder professioneller Fotograf (50+ bearbeitete Fotos in 7 Tagen).",
 },
 {
 icon: Wine,
 title: "Champagner, Torte, Menü — Add-ons",
 desc: "Champagner-Empfang beim Einsteigen, Torte mit Hochzeitsdatum + Veranstaltungsort, Mehrgang-Dinner (Fisch/Hähnchen/vegetarisch), Live-Geiger beim Boarding — alles auf Wunsch.",
 },
 {
 icon: MapPin,
 title: "Route an Ihr Hotelviertel angepasst",
 desc: "Wenn Sie in Sultanahmet, Beşiktaş, Karaköy oder Cihangir wohnen, passen wir Anlegestelle und Route an. Kuruçeşme Marina für Beşiktaş, Karaköy-Pier für Beyoğlu, Kabataş für Sultanahmet.",
 },
 ],
 programmeHeading: "Beispielprogramm einer 2,5-stündigen Hochzeitsreise-Fahrt",
 programmeIntro: "",
 programmeSteps: [
 { time: "19:00", title: "Einsteigen mit Champagner-Empfang", desc: "Optionaler Live-Geiger am Anleger. Yacht mit weißen Blumen + individueller Beschilderung mit Hochzeitsdatum dekoriert." },
 { time: "19:15", title: "Abfahrt + Dolmabahçe-Passage", desc: "Erste Fotoserie mit beleuchtetem Palast im Hintergrund." },
 { time: "19:40", title: "Ortaköy-Moschee + 1. Bosporus-Brücke", desc: "Klassische Istanbul-Skyline-Komposition. Erster Gang des Dinners auf dem Oberdeck serviert." },
 { time: "20:15", title: "Rumeli Hisarı Wendepunkt", desc: "Torte mit Hochzeitsdatum + Veranstaltungsort als Zuckerguss. Kapitän liest auf Wunsch eine vorbereitete Botschaft vor." },
 { time: "21:00", title: "Blaue Stunde, Rückkehr nach Kabataş", desc: "Letzte Foto-Session unter den Brückenlichtern. Bearbeitete Fotos in 7 Tagen; Rohdateien bei Ausstieg auf USB-Stick." },
 ],
 faqHeading: "Hochzeitsreise-FAQ",
 faqs: [
 {
 q: "Wie viel kostet eine Hochzeitsreise-Yacht in Istanbul?",
 a: "Private Yacht-Charter für Hochzeitsreisen beginnt bei €220 für 2 Stunden auf unserer Boutique-Yacht (bis 12 Gäste). Premium mit erweitertem Deck und stilisiertem Setup ab €320. Die meisten Paare fügen Champagner (€60-€120), Torte (~€80) und Fotograf hinzu — diese Extras werden auf Anfrage arrangiert – genauen Preis per WhatsApp.",
 },
 {
 q: "Wie unterscheidet sich Hochzeitsreise-Fahrt von Heiratsantrag-Fahrt?",
 a: "Antragsfahrten basieren auf einem versteckten Moment — strenges Timing, versteckter Fotograf, Überraschungseffekt. Hochzeitsreise-Fahrten basieren auf einer Erinnerung — entspanntes Tempo, Fotos während der ganzen Route, keine Überraschungsmechanik. Gleiche Yacht-Flotte, gleiche Route, anderes Programm.",
 },
 {
 q: "Wie unterscheidet sich Hochzeitsreise von Jubiläumsfahrt?",
 a: "Jubiläumsfahrten sind oft an ein bestimmtes Datum gebunden (Hochzeitstag). Hochzeitsreise-Fahrten finden während der Reise statt — meist 1-4 Wochen nach der Hochzeit — und passen oft in eine mehrstöckige Türkei-Route. Onboard-Erlebnis ähnlich, aber Hochzeitsreise-Planung integriert Kappadokien/Antalya/Bodrum-Etappen.",
 },
 {
 q: "Wann in den Istanbul-Aufenthalt einplanen?",
 a: "Stärkstes Muster: der letzte Istanbul-Abend vor dem Weiterflug nach Kappadokien oder Antalya. Sie beenden den Stadt-Teil auf dem Wasser, nicht beim Packen. Alternative: der erste Istanbul-Abend als Ankunftsfeier. Den Flugankunfts-Tag selbst meiden (Jetlag + Fähren-Timing passen selten).",
 },
 {
 q: "Können wir Sonnenuntergang + Dinner + Fotograf kombinieren?",
 a: "Ja — die meistgewünschte Hochzeitsreise-Kombination. Yacht legt 30-45 Min. vor Sonnenuntergang ab, Champagner-Empfang, Goldene Stunde auf der südlichen Bosporus-Route, Fotograf deckt Brücke + Ortaköy + Rumeli ab, Dinner serviert auf der Blue-Hour-Rückfahrt. Gesamtzeit auf dem Wasser: 2,5-3 Stunden.",
 },
 {
 q: "Beste Reihenfolge bei Kappadokien zuerst + Istanbul danach?",
 a: "Wenn Kappadokien Tag 1-3 und Istanbul Tag 4-6 ist, buchen Sie die Yacht für Tag 5 Abend (Ihre zweite Istanbul-Nacht). Tag 4 dient der Ankunft und Stadtorientierung; Tag 5 Abend macht die Fahrt zum Reisefinale — entweder Tag 6 Heimflug oder Verlängerung Richtung Bodrum/Antalya für eine Strandwoche.",
 },
 ],
 ctaHeading: "Hochzeitsreise-Abend planen",
 ctaBody: "Senden Sie Hochzeitsdatum + Reisedaten + Add-on-Wünsche (Torte, Champagner, Fotograf, Geiger). Wir liefern innerhalb von 24 h einen vollständigen Plan mit Yacht-Empfehlung, Anleger und Timing.",
 ctaPrimary: "Yacht-Flotte ansehen",
 ctaWhatsapp: "Hochzeitsreise-Brief per WhatsApp senden",
 whatsappPrefill: "Hallo MerrySails! Wir möchten eine private Yacht für unseren Hochzeitsreise-Abend auf dem Bosporus buchen. Hochzeitsdatum: [Datum], Istanbul-Reise: [Daten]. Wir möchten Torte / Champagner / Fotograf.",
 trustLine: `Betrieben unter Meryem Yıldız Travel · TÜRSAB-A-Lizenz #${TURSAB_LICENSE_NUMBER} · 50.000+ Gäste auf dem Bosporus seit 2001.`,
 reserveLabel: "Angebot ab €220",
 },
 fr: {
 metaTitle: "Croisière Lune de Miel Yacht Istanbul",
 metaDescription:
 "Yacht privé pour lune de miel sur le Bosphore. Croisière 2 h dès €220, gâteau, champagne, photographe, coucher de soleil. TÜRSAB A licencié.",
 canonicalPath: "/fr/honeymoon-yacht-cruise-istanbul",
 eyebrow: "Lune de miel · Jeunes mariés · Yacht privé",
 h1: "Croisière Lune de Miel sur Yacht à Istanbul",
 intro:
 "Location privée de yacht pour les jeunes mariés — combinée généralement avec un séjour de 7-10 jours en Turquie incluant la Cappadoce, Antalya ou Bodrum. Charter de base 2 heures sur notre yacht Boutique à partir de €220 ; Premium avec pont étendu et décor stylé à partir de €320. La plupart des couples ajoutent gâteau + champagne + photographe — ces extras sont arrangés sur demande — devis précis par WhatsApp.",
 capsule:
 "La croisière de lune de miel en yacht à Istanbul offre aux jeunes mariés un yacht privé pour 2-3 heures à partir de €220. Champagne d'accueil, gâteau personnalisé avec votre date de mariage, photographe professionnel (50+ photos retouchées sous 7 jours), violoniste en direct et timing au coucher de soleil sont en option. Embarquement à Kabataş ou Kuruçeşme Marina ; le quai exact est confirmé par WhatsApp après réservation. Idéal pour la dernière soirée à Istanbul avant la Cappadoce ou Antalya.",
 reasonsHeading: "Pourquoi ce format fonctionne pour une lune de miel",
 reasons: [
 {
 icon: Plane,
 title: "S'intègre au reste de l'itinéraire Turquie",
 desc: "La plupart des lunes de miel combinent Istanbul (3-4 jours) avec la Cappadoce ou Antalya. Programmer la soirée yacht pour la dernière nuit à Istanbul — vous terminez le séjour citadin sur le Bosphore plutôt que dans une valise.",
 },
 {
 icon: Camera,
 title: "Photogénique sans pression de demande",
 desc: "Même boucle Bosphore Sud — Palais de Dolmabahçe, Mosquée d'Ortaköy, 1er pont du Bosphore, Rumeli Hisarı — mais à un rythme détendu. Votre téléphone ou un photographe pro (50+ photos retouchées sous 7 jours).",
 },
 {
 icon: Wine,
 title: "Champagne, gâteau, dîner — en options",
 desc: "Toast au champagne à l'embarquement, gâteau avec votre date de mariage + lieu de cérémonie, dîner multi-services (poisson / volaille / végétarien), violoniste à l'embarquement — sur demande.",
 },
 {
 icon: MapPin,
 title: "Itinéraire adapté à votre hôtel",
 desc: "Si vous séjournez à Sultanahmet, Beşiktaş, Karaköy ou Cihangir, le quai d'embarquement et la route sont adaptés. Kuruçeşme Marina pour Beşiktaş, Karaköy pour Beyoğlu, Kabataş pour Sultanahmet.",
 },
 ],
 programmeHeading: "Exemple de programme lune de miel (2 h 30)",
 programmeIntro: "",
 programmeSteps: [
 { time: "19:00", title: "Embarquement avec coupe de champagne", desc: "Violoniste sur le quai (option). Yacht décoré de fleurs blanches + signalétique personnalisée avec votre date de mariage." },
 { time: "19:15", title: "Départ + passage devant Dolmabahçe", desc: "Premier set photo avec le palais illuminé en arrière-plan." },
 { time: "19:40", title: "Mosquée d'Ortaköy + 1er pont du Bosphore", desc: "Composition signature de la skyline d'Istanbul. Premier service du dîner sur le pont supérieur." },
 { time: "20:15", title: "Demi-tour à Rumeli Hisarı", desc: "Service du gâteau avec votre date de mariage + lieu écrits en glaçage. Le capitaine lit, si demandé, un message personnalisé." },
 { time: "21:00", title: "Retour à l'heure bleue vers Kabataş", desc: "Dernière séance photo sous les lumières du pont. Photos retouchées livrées sous 7 jours ; fichiers RAW sur clé USB à la descente." },
 ],
 faqHeading: "FAQ lune de miel",
 faqs: [
 {
 q: "Combien coûte une croisière de lune de miel en yacht à Istanbul ?",
 a: "Le charter privé démarre à €220 pour 2 heures sur notre yacht Boutique (jusqu'à 12 invités). Premium avec pont étendu et décor stylé à partir de €320. La plupart des couples ajoutent champagne (€60-€120) + gâteau personnalisé (~€80) + photographe — ces extras sont arrangés sur demande — devis précis par WhatsApp.",
 },
 {
 q: "Différence avec une croisière demande en mariage ?",
 a: "Les croisières demande en mariage sont construites autour d'un moment caché — timing strict, photographe dissimulé, surprise. Les croisières lune de miel sont construites autour d'un souvenir — rythme détendu, opportunités photo tout au long de la route, pas de mécanique surprise. Même flotte, même route, programme différent.",
 },
 {
 q: "Différence avec une croisière anniversaire ?",
 a: "Les croisières anniversaire sont liées à une date précise (anniversaire de mariage). Les croisières lune de miel ont lieu pendant le voyage lui-même — généralement 1-4 semaines après le mariage — et s'intègrent à un itinéraire turc multi-étapes (Cappadoce / Antalya / Bodrum).",
 },
 {
 q: "Quand placer la croisière dans le séjour Istanbul ?",
 a: "Le pattern le plus fort : la dernière soirée à Istanbul avant le vol pour la Cappadoce ou Antalya. Vous finissez la partie citadine sur l'eau plutôt qu'en faisant les valises. Alternative : la première soirée comme célébration d'arrivée. Évitez la nuit du vol d'arrivée (jet lag + horaires de ferry rarement alignés).",
 },
 {
 q: "Peut-on combiner coucher de soleil + dîner + photographe ?",
 a: "Oui — combinaison lune de miel la plus demandée. Embarquement 30-45 min avant le coucher du soleil, champagne d'accueil, navigation de l'heure dorée sur la boucle sud du Bosphore, photographe couvrant pont + Ortaköy + Rumeli, dîner servi pendant l'heure bleue du retour. Total sur l'eau : 2 h 30-3 h.",
 },
 {
 q: "Meilleur ordre si Cappadoce avant Istanbul ?",
 a: "Si Cappadoce jours 1-3 et Istanbul jours 4-6, réservez le yacht pour le soir du jour 5 (votre 2e nuit à Istanbul). Jour 4 pour l'arrivée et l'orientation ville ; jour 5 soir = finale du voyage — vol retour jour 6 ou extension vers Bodrum/Antalya pour la semaine plage.",
 },
 ],
 ctaHeading: "Planifiez votre soirée de lune de miel",
 ctaBody: "Envoyez votre date de mariage + dates de voyage + préférences d'options (gâteau, champagne, photographe, violoniste). Nous revenons sous 24 h avec un plan complet : recommandation de yacht, quai, et timing.",
 ctaPrimary: "Voir la flotte de yachts",
 ctaWhatsapp: "Envoyer le briefing lune de miel par WhatsApp",
 whatsappPrefill: "Bonjour MerrySails ! Nous voulons réserver un yacht privé pour notre soirée de lune de miel sur le Bosphore. Date de mariage : [date], séjour Istanbul : [dates]. Nous voudrions gâteau / champagne / photographe.",
 trustLine: `Opéré sous Meryem Yıldız Travel · Licence TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ voyageurs sur le Bosphore depuis 2001.`,
 reserveLabel: "Devis dès €220",
 },
 nl: {
 metaTitle: "Huwelijksreis Jacht Istanbul — Bosporus",
 metaDescription:
 "Privé jachtcharter voor huwelijksreis op de Bosporus. 2-uurs charter vanaf €220, taart, champagne, fotograaf, zonsondergangs-timing. TÜRSAB A-licentie sinds 2001.",
 canonicalPath: "/nl/honeymoon-yacht-cruise-istanbul",
 eyebrow: "Huwelijksreis · Net getrouwd · Privé-jacht",
 h1: "Huwelijksreis Jacht Cruise Istanbul",
 intro:
 "Privé jachtcharter voor net-getrouwde stellen — meestal gecombineerd met een 7-10-daagse Turkije-reis inclusief Cappadocië, Antalya of Bodrum. Basis 2-uurs charter op onze Boutique-jacht vanaf €220; Premium met groter dek en gestileerde inrichting vanaf €320. De meeste paren voegen taart + champagne + fotograaf toe — deze extra's worden op aanvraag geregeld — exacte prijs via WhatsApp.",
 capsule:
 "De huwelijksreis-jachtcruise in Istanbul biedt net-getrouwde stellen een privé-jacht voor 2-3 uur vanaf €220. Champagneontvangst, gepersonaliseerde taart met uw trouwdatum, professionele fotograaf (50+ bewerkte foto's binnen 7 dagen), live violist en zonsondergangs-timing zijn optioneel. Vertrek vanuit Kabataş of Kuruçeşme Marina; de exacte steiger wordt na boeking per WhatsApp bevestigd. Ideaal voor de laatste Istanbul-avond voor uw vlucht naar Cappadocië of Antalya.",
 reasonsHeading: "Waarom dit formaat past bij een huwelijksreis",
 reasons: [
 {
 icon: Plane,
 title: "Past in uw Turkije-reisplan",
 desc: "De meeste huwelijksreizen combineren Istanbul (3-4 dagen) met Cappadocië of Antalya. Plan de jachtavond voor uw laatste Istanbul-nacht — eindig het stadsdeel op de Bosporus in plaats van met koffers pakken.",
 },
 {
 icon: Camera,
 title: "Fotogenisch zonder verlovingsdruk",
 desc: "Dezelfde zuidelijke Bosporus-route — Dolmabahçe-paleis, Ortaköy-moskee, 1e Bosporusbrug, Rumeli Hisarı — maar in rustig tempo. Uw eigen telefoon of professionele fotograaf (50+ bewerkte foto's binnen 7 dagen).",
 },
 {
 icon: Wine,
 title: "Champagne, taart, menu — optioneel",
 desc: "Champagne-ontvangst bij inschepen, taart met uw trouwdatum + ceremonielocatie, meergangenmaaltijd (vis / kip / vegetarisch), live violist bij boarding — op verzoek.",
 },
 {
 icon: MapPin,
 title: "Route afgestemd op uw hotel",
 desc: "Verblijft u in Sultanahmet, Beşiktaş, Karaköy of Cihangir, dan stemmen wij de steiger en route af. Kuruçeşme Marina voor Beşiktaş, Karaköy-pier voor Beyoğlu, Kabataş voor Sultanahmet.",
 },
 ],
 programmeHeading: "Voorbeeld 2,5-uurs huwelijksreis-programma",
 programmeIntro: "",
 programmeSteps: [
 { time: "19:00", title: "Inschepen met champagne-toast", desc: "Optionele live violist op de steiger. Jacht versierd met witte bloemen + gepersonaliseerde bordjes met uw trouwdatum." },
 { time: "19:15", title: "Vertrek + Dolmabahçe-passage", desc: "Eerste fotoshoot met het verlichte paleis als achtergrond." },
 { time: "19:40", title: "Ortaköy-moskee + 1e Bosporusbrug", desc: "De signatuur Istanbul-skyline compositie. Eerste gang van het diner op het bovendek geserveerd." },
 { time: "20:15", title: "Rumeli Hisarı keerpunt", desc: "Taartservice met uw trouwdatum + locatie in suikerglazuur. Kapitein leest op verzoek een vooraf voorbereid bericht voor." },
 { time: "21:00", title: "Blauwe uur terug naar Kabataş", desc: "Laatste foto-set onder de bruglichten. Bewerkte foto's geleverd binnen 7 dagen; ruwe bestanden op USB bij ontschepen." },
 ],
 faqHeading: "Huwelijksreis FAQ",
 faqs: [
 {
 q: "Wat kost een huwelijksreis-jachtcruise in Istanbul?",
 a: "Privé jachtcharter voor huwelijksreizen begint vanaf €220 voor 2 uur op onze Boutique-jacht (tot 12 gasten). Premium met groter dek en gestileerde inrichting vanaf €320. De meeste paren voegen champagne (€60-€120), taart (~€80) en fotograaf toe — deze extra's worden op aanvraag geregeld — exacte prijs via WhatsApp.",
 },
 {
 q: "Verschil tussen huwelijksreis- en huwelijksaanzoek-cruise?",
 a: "Aanzoek-cruises zijn opgebouwd rond een verborgen moment — strikt timing, verborgen fotograaf, verrassingsmoment. Huwelijksreis-cruises zijn opgebouwd rond een herinnering — rustig tempo, fotomomenten langs de hele route, geen verrassingsmechaniek. Zelfde jachtvloot, zelfde route, ander programma.",
 },
 {
 q: "Verschil met jubileumcruise?",
 a: "Jubileumcruises zijn meestal gekoppeld aan een specifieke datum (trouwdag). Huwelijksreis-cruises vinden plaats tijdens de reis zelf — meestal 1-4 weken na de bruiloft — en passen vaak in een meerstops Turkije-route (Cappadocië / Antalya / Bodrum).",
 },
 {
 q: "Wanneer in het Istanbul-verblijf inplannen?",
 a: "Sterkste patroon: de laatste Istanbul-avond voor uw vlucht naar Cappadocië of Antalya. U sluit het stadsdeel af op het water in plaats van met inpakken. Alternatief: de eerste Istanbul-avond als verfrissingsfeestje. Vermijd de vluchtaankomst-nacht zelf (jetlag + ferrytiming komen zelden uit).",
 },
 {
 q: "Kunnen we zonsondergang + diner + fotograaf combineren?",
 a: "Ja — de meest gevraagde huwelijksreis-combinatie. Jacht vertrekt 30-45 minuten vóór zonsondergang, champagne-ontvangst, gouden uur op de zuidelijke Bosporus-route, fotograaf dekt brug + Ortaköy + Rumeli passages, diner geserveerd tijdens het blauwe uur terug. Totaal op het water: 2,5-3 uur.",
 },
 {
 q: "Beste volgorde bij Cappadocië eerst, Istanbul daarna?",
 a: "Bij Cappadocië dag 1-3 en Istanbul dag 4-6 boekt u de jacht voor de avond van dag 5 (uw 2e Istanbul-nacht). Dag 4 voor aankomst en stadsoriëntatie; dag 5 avond maakt de cruise het reisfinale — dag 6 vlucht naar huis of verlenging richting Bodrum/Antalya voor strandweek.",
 },
 ],
 ctaHeading: "Plan uw huwelijksreis-avond",
 ctaBody: "Stuur uw trouwdatum + reisdata + add-on voorkeuren (taart, champagne, fotograaf, violist). Wij komen binnen 24 u terug met een compleet plan: jachtaanbeveling, steiger, en timing.",
 ctaPrimary: "Bekijk de jachtvloot",
 ctaWhatsapp: "Stuur huwelijksreis-briefing via WhatsApp",
 whatsappPrefill: "Hallo MerrySails! We willen een privé-jacht boeken voor onze huwelijksreis-avond op de Bosporus. Trouwdatum: [datum], Istanbul-reis: [data]. Wij willen taart / champagne / fotograaf.",
 trustLine: `Geëxploiteerd onder Meryem Yıldız Travel · TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER} · 50.000+ gasten op de Bosporus sinds 2001.`,
 reserveLabel: "Offerte vanaf €220",
 },
 ru: {
 metaTitle: "Свадебное Путешествие Яхта Стамбул",
 metaDescription:
 "Частная аренда яхты для медового месяца на Босфоре. Чартер на 2 часа от €220, торт, шампанское, фотограф, тайминг заката. Лицензия TÜRSAB A с 2001 года.",
 canonicalPath: "/ru/honeymoon-yacht-cruise-istanbul",
 eyebrow: "Медовый месяц · Молодожёны · Частная яхта",
 h1: "Свадебное Путешествие Яхта Босфор Стамбул",
 intro:
 "Частная аренда яхты для молодожёнов — обычно сочетается с 7-10-дневной поездкой по Турции, включая Каппадокию, Анталию или Бодрум. Базовый 2-часовой чартер на нашей яхте Boutique от €220; Premium с расширенной палубой и стилизованной обстановкой от €320. Большинство пар добавляют торт, шампанское и фотографа — эти дополнения организуются по запросу — точная цена в WhatsApp.",
 capsule:
 "Свадебное путешествие на яхте по Босфору даёт молодожёнам частную яхту на 2-3 часа от €220. Встреча с шампанским, индивидуальный торт с датой вашей свадьбы, профессиональный фотограф (50+ обработанных фото за 7 дней), живой скрипач и тайминг заката — по запросу. Отправление от Кабаташ или марины Куручешме; точный причал подтверждается по WhatsApp/WhatsApp после бронирования. Идеально для последнего вечера в Стамбуле перед перелётом в Каппадокию или Анталию.",
 reasonsHeading: "Почему этот формат подходит для медового месяца",
 reasons: [
 {
 icon: Plane,
 title: "Сочетается с другими этапами поездки",
 desc: "Большинство свадебных путешествий совмещают Стамбул (3-4 дня) с Каппадокией или Анталией. Планируйте яхту на последний вечер в Стамбуле — закончите городскую часть на Босфоре, а не за сборами чемоданов.",
 },
 {
 icon: Camera,
 title: "Фотогенично без давления предложения",
 desc: "Тот же маршрут по южному Босфору — дворец Долмабахче, мечеть Ортакёй, 1-й Босфорский мост, Румелихисар — но в спокойном ритме. Ваш телефон или профессиональный фотограф (50+ обработанных фото за 7 дней).",
 },
 {
 icon: Wine,
 title: "Шампанское, торт, ужин — опции",
 desc: "Шампанское при посадке, торт с вашей датой свадьбы и местом церемонии, многокурсовый ужин (рыба / курица / вегетарианское), живая скрипка при посадке — по запросу.",
 },
 {
 icon: MapPin,
 title: "Маршрут с учётом вашего отеля",
 desc: "Если вы остановились в Султанахмете, Бешикташе, Каракёй или Джихангире — мы настраиваем причал и маршрут. Марина Куручешме для Бешикташа, причал Каракёй для Бейоглу, Кабаташ для Султанахмета.",
 },
 ],
 programmeHeading: "Пример 2,5-часовой программы медового месяца",
 programmeIntro: "",
 programmeSteps: [
 { time: "19:00", title: "Посадка с тостом шампанского", desc: "Опциональный живой скрипач на причале. Яхта украшена белыми цветами + персонализированные таблички с вашей датой свадьбы." },
 { time: "19:15", title: "Отправление + проход у Долмабахче", desc: "Первая фотосерия на фоне освещённого дворца." },
 { time: "19:40", title: "Мечеть Ортакёй + 1-й Босфорский мост", desc: "Фирменный кадр стамбульского силуэта. Первое блюдо ужина подаётся на верхней палубе." },
 { time: "20:15", title: "Разворот у Румелихисары", desc: "Подача торта с вашей датой свадьбы и местом церемонии, написанными глазурью. Капитан по желанию читает заранее подготовленное послание." },
 { time: "21:00", title: "Синий час, возвращение в Кабаташ", desc: "Финальная фотосессия под огнями моста. Обработанные фото доставляются за 7 дней; необработанные файлы на USB при сходе." },
 ],
 faqHeading: "FAQ медовый месяц",
 faqs: [
 {
 q: "Сколько стоит свадебное путешествие на яхте в Стамбуле?",
 a: "Частная аренда яхты для медового месяца начинается от €220 за 2 часа на нашей бутиковой яхте Boutique (до 12 гостей). Premium с расширенной палубой и стилизованным оформлением от €320. Большинство пар добавляют шампанское (€60-€120), торт (~€80) и фотографа — эти дополнения организуются по запросу — точная цена в WhatsApp.",
 },
 {
 q: "Чем отличается от круиза с предложением руки?",
 a: "Круизы для предложения строятся вокруг скрытого момента — строгий тайминг, скрытый фотограф, эффект сюрприза. Круизы для медового месяца строятся вокруг воспоминания — спокойный ритм, фотовозможности по всему маршруту, без механики сюрприза. Та же флотилия, тот же маршрут, разная программа.",
 },
 {
 q: "Чем отличается от круиза на годовщину?",
 a: "Юбилейные круизы обычно привязаны к конкретной дате (годовщина свадьбы). Круизы для медового месяца проходят во время самого путешествия — обычно через 1-4 недели после свадьбы — и часто вписываются в многоэтапный турецкий маршрут (Каппадокия / Анталия / Бодрум).",
 },
 {
 q: "Когда планировать круиз в стамбульской программе?",
 a: "Сильнейший паттерн — последний стамбульский вечер перед перелётом в Каппадокию или Анталию. Вы заканчиваете городскую часть на воде, а не за сборами. Альтернатива: первый стамбульский вечер как праздник прибытия. Избегайте ночи прилёта (джетлаг + расписание паромов редко совпадают).",
 },
 {
 q: "Можно ли совместить закат + ужин + фотографа?",
 a: "Да — самая запрашиваемая комбинация медового месяца. Яхта отправляется за 30-45 минут до заката, встреча с шампанским, золотой час на южном маршруте Босфора, фотограф снимает мост + Ортакёй + Румелихисар, ужин подаётся в синий час на обратном пути. Общее время на воде: 2,5-3 часа.",
 },
 {
 q: "Лучший порядок если Каппадокия раньше, Стамбул позже?",
 a: "Если Каппадокия дни 1-3 и Стамбул дни 4-6, бронируйте яхту на вечер 5-го дня (ваша 2-я стамбульская ночь). День 4 — прилёт и ориентация в городе; вечер 5-го дня делает круиз финалом поездки — день 6 рейс домой или продление в Бодрум/Анталию на пляжную неделю.",
 },
 ],
 ctaHeading: "Спланируйте вечер медового месяца",
 ctaBody: "Отправьте дату свадьбы + даты поездки + предпочтения по дополнениям (торт, шампанское, фотограф, скрипач). В течение 24 часов мы вернёмся с полным планом: рекомендация яхты, причал, тайминг.",
 ctaPrimary: "Посмотреть флот яхт",
 ctaWhatsapp: "Отправить бриф медового месяца через WhatsApp",
 whatsappPrefill: "Здравствуйте, MerrySails! Хотим забронировать частную яхту для вечера медового месяца на Босфоре. Дата свадьбы: [дата], поездка в Стамбул: [даты]. Нам нужны торт / шампанское / фотограф.",
 trustLine: `Управляется Meryem Yıldız Travel · Лицензия TÜRSAB A #${TURSAB_LICENSE_NUMBER} · Более 50 000 гостей на Босфоре с 2001 года.`,
 reserveLabel: "Запросить от €220",
 },
};

export async function generateStaticParams() {
 return Object.keys(CONTENT).map((locale) => ({ locale }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") return {};
 const c = CONTENT[locale];
 if (!c) return {};
 const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
 return {
 title: c.metaTitle,
 description: c.metaDescription,
 alternates: {
 canonical: canonicalUrl,
 languages: buildHreflang("/honeymoon-yacht-cruise-istanbul"),
 },
 openGraph: {
 title: c.metaTitle,
 description: c.metaDescription,
 url: canonicalUrl,
 type: "article",
 },
 };
}

export default async function LocaleHoneymoonPage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 const c = CONTENT[locale];
 if (!c) notFound();

 const reviewProductKey = "yacht" as const;

 const faqJsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 speakable: {
 "@type": "SpeakableSpecification",
 cssSelector: ["h1", "h2", ".answer-capsule"],
 },
 mainEntity: c.faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };

 const serviceJsonLd = {
 "@context": "https://schema.org",
 "@type": "Service",
 name: c.h1,
 serviceType: "Private yacht charter for honeymoons",
 description: c.metaDescription,
 provider: { "@id": `${SITE_URL}/#organization` },
 areaServed: { "@type": "City", name: "Istanbul" },
 offers: {
 "@type": "Offer",
 url: `${SITE_URL}${c.canonicalPath}`,
 price: "220",
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 validFrom: "2026-01-01",
 },
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
 />
 <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
 <div className="container-main max-w-4xl">
 <header className="mb-8">
 <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">
 {c.eyebrow}
 </p>
 <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">
 {c.h1}
 </h1>
 <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
 {c.intro}
 </p>
 </header>

 <SocialProofBadges variant="product" productKey="yacht" locale={locale as SiteLocale} className="mb-6" />
 <LiveBookingCounter locale={locale as SiteLocale} className="mb-4" />

 <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
 <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">
 {c.capsule}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.reasonsHeading}</h2>
 <div className="grid gap-3 sm:grid-cols-2">
 {c.reasons.map((r) => (
 <div key={r.title} className="rounded-2xl border border-[var(--line)] bg-white p-5">
 <div className="mb-2 flex items-center gap-2">
 <r.icon className="h-5 w-5 text-[var(--brand-primary)]" />
 <h3 className="text-base font-semibold text-[var(--heading)]">{r.title}</h3>
 </div>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
 </div>
 ))}
 </div>
 </section>

 <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
 <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.programmeHeading}</h2>
 <ol className="space-y-3 text-sm leading-relaxed text-[var(--body-text)]">
 {c.programmeSteps.map((step) => (
 <li key={step.time} className="flex gap-3">
 <span className="font-semibold text-[var(--brand-primary)]">{step.time} —</span>
 <span>
 <strong>{step.title}.</strong> {step.desc}
 </span>
 </li>
 ))}
 </ol>
 </section>

 <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
 <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.faqHeading}</h2>
 <div className="space-y-3">
 {c.faqs.map((f) => (
 <details key={f.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">{f.q}</summary>
 <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">{f.a}</p>
 </details>
 ))}
 </div>
 </section>

 <div className="my-8">
 <ReviewsCarousel productKey={reviewProductKey} locale={locale as SiteLocale} />
 </div>

 <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
 <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">{c.ctaHeading}</h2>
 <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">{c.ctaBody}</p>
 <div className="flex flex-col gap-3 sm:flex-row">
 <Link href={`/${locale}/yacht-charter-istanbul#fleet`} className="btn-cta !px-6 !py-3">
 {c.ctaPrimary}
 <ArrowRight className="h-4 w-4" />
 </Link>
 <a
 href={`${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappPrefill)}`}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
 >
 {c.ctaWhatsapp}
 </a>
 </div>
 <p className="mt-3 text-xs italic text-[var(--text-muted)]">{c.trustLine}</p>
 </section>
 </div>
 </main>
 <StickyMobileCta
 reserveHref={`/${locale}/yacht-charter-istanbul#fleet`}
 reserveLabel={c.reserveLabel}
 locale={locale as SiteLocale}
 whatsappLocation={`locale_honeymoon_${locale}`}
 whatsappPrefill={c.whatsappPrefill}
 />
 </>
 );
}
