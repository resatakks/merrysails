import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import LocaleHelpfulResources from "@/components/layout/LocaleHelpfulResources";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import BookingMomentumBadge from "@/components/ui/BookingMomentumBadge";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import { getProductBookingMomentum } from "@/lib/booking-momentum";
import WeekdayDiscountBanner from "@/components/promo/WeekdayDiscountBanner";
import { getWeekdayDiscountStrings } from "@/components/promo/weekday-discount-strings";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import QuickAnswer from "@/components/ai/QuickAnswer";
import RelatedTours from "@/components/ui/RelatedTours";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";

export const revalidate = 3600;

// Module-level EN baseline for fields that don't differ by locale (image,
// schedule, capacity). Per-request locale-aware copy is fetched inside
// the render via getTourBySlug(slug, locale) so the override block in
// src/data/tour-locales.ts can replace longDescription / route /
// departurePoint / includes / etc.
const sunsetTour = getTourBySlug("bosphorus-sunset-cruise");
if (!sunsetTour) throw new Error("Sunset cruise data is missing.");

const relatedTours: Tour[] = [
 getTourBySlug("bosphorus-dinner-cruise"),
 getTourBySlug("yacht-charter-in-istanbul"),
 getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
 title: string;
 description: string;
 h1: string;
 canonicalPath: string;
 breadcrumbHome: string;
 breadcrumbCruise: string;
 breadcrumbCurrent: string;
 aboutTitle: string;
 aboutBody: string[];
 trustSignal: string;
 tableRows: [string, string][];
 faqTitle: string;
 faqs: { q: string; a: string }[];
 otherOptionsTitle: string;
 otherOptions: { href: string; title: string; desc: string }[];
 ctaTitle: string;
 ctaSubtitle: string;
 ctaBookLabel: string;
 ctaWhatsappLabel: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
 tr: {
 title: "Boğaz Gün Batımı Turu İstanbul — €30'dan",
 description:
 "Boğaz gün batımı turu €30'dan (Sal & Per). 2 saatlik lüks yat, canlı rehber, ikramlar ve şarap seçeneği. TÜRSAB lisanslı. Hemen rezervasyon.",
 h1: "Boğaz Gün Batımı Turu Istanbul — Özel Yat",
 canonicalPath: "/tr/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "Ana Sayfa",
 breadcrumbCruise: "Boğaz Turu",
 breadcrumbCurrent: "Gün Batımı Turu",
 aboutTitle: "Boğaz Gün Batımı Turu Hakkında",
 aboutBody: [
 "MerrySails Boğaz Gün Batımı Turu, İstanbul'un en ikonik manzaralarını altın saat ışığında izlemek isteyen misafirler için tasarlanmış 2 saatlik paylaşımlı lüks yat deneyimidir. Tur iki net seçenek sunar: Şarapsız €30 (Sal & Per) / €34 (diğer günler), Şaraplı €35 (Sal & Per) / €40 (diğer günler). Pazartesi, Salı ve Perşembe rezervasyonu yapan misafirler kişi başı €4 tasarruf eder.",
 "Yola çıkış Karaköy iskelesinden yapılır; gün batımından 30 dakika önce hareket ederek en güçlü altın saat ışığını yakalamayı garanti eder. Fotoğraf meraklıları için güneş Boğaz ekseni boyunca Marmara'ya doğru alçalır ve köprü silüetlerini ateş tonlarında boyar. Bu ışık penceresi yaklaşık 40 dakika sürer.",
 "Güzergah Boğaz'ın güney kesimini kapsar: Dolmabahçe Sarayı cephesinden geçilir, Kız Kulesi önünde yavaşlanır, Ortaköy Camii ile Boğaz Köprüsü yan yana çerçevelenir, ardından Rumeli Hisarı görüntülenerek geri dönülür. Canlı İngilizce rehber eşliğinde sıcak içecekler (çay, Türk kahvesi), soğuk içecekler (buzlu çay, limonata, meyve suyu, su) ve atıştırmalık tabağı (kuruyemiş, kraker, mevsim meyveleri) tüm biletlere dahildir. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir.",
 ],
 trustSignal:
 "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism, 50.000'den fazla misafiri ağırlamış deneyimiyle güvenilir hizmet sunmaktadır. Kalkış noktası Kabataş bölgesindedir; tam adres rezervasyon onayından sonra paylaşılır.",
 tableRows: [
 ["Süre", "~2 saat"],
 ["Tekne tipi", "Paylaşımlı lüks yat"],
 ["Şarapsız", "€34 / kişi"],
 ["Şaraplı", "€40 / kişi (2 kadeh)"],
 ["Rehber", "Canlı İngilizce rehber"],
 ["İkramlar", "Sıcak/soğuk içecekler + atıştırmalık tabağı"],
 ],
 faqTitle: "Sıkça Sorulan Sorular",
 faqs: [
 {
 q: "Gün batımı turu kaç saat sürer?",
 a: "Tur yaklaşık 2 saat sürer. Güzergah Boğaz'ın güney kesimini kapsar; Dolmabahçe Sarayı, Ortaköy Camii ve köprüleri geçerek geri döner.",
 },
 {
 q: "Şaraplı ve şarapsız seçenek arasındaki fark nedir?",
 a: "İki seçenek de aynı 2 saatlik güzergahı, canlı rehberi ve standart ikramları kapsar. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir; şarapsız €30 (Sal & Per) / €34, şaraplı €35 (Sal & Per) / €40.",
 },
 {
 q: "Tur nereden başlıyor?",
 a: "Kalkış Kabataş bölgesinden yapılır. Tam buluşma noktası ve saat, rezervasyon onayından sonra yazılı olarak iletilir.",
 },
 {
 q: "Akşam yemeği turu yerine gün batımı turu ne zaman tercih edilmeli?",
 a: "Türk gecesi eğlencesi ve uzun yemekli program yerine daha kısa, sakin ve hafif bir deneyim isteyenler için gün batımı turu idealdir. Çiftler, fotoğraf meraklıları ve İstanbul'a ilk kez gelenler için önerilir.",
 },
 {
 q: "Gün batımı turu için en iyi mevsim hangisi?",
 a: "İlkbahar (Nisan–Mayıs) ve sonbahar (Eylül–Ekim) en dramatik gün batımı renklerini sunar. Yaz aylarında gün batımı daha geç olup turun hareket saati de buna göre ayarlanır. Kış aylarında tur seyrek katılımla daha sakin geçer; ışık kısa ama güçlüdür.",
 },
 {
 q: "Şaraplı seçeneğin standart ikramdan farkı nedir?",
 a: "Her iki pakette çay, Türk kahvesi, limonata, su, atıştırmalık ve meyve tabağı yer alır. Şaraplı seçenekte (€35 Sal&Per / €40) bu ikramlara ek olarak kişi başı seçkin 2 kadeh şarap eklenir. Alkol tercih etmeyenler şarapsız paketi seçerek aynı güzergah ve hizmetten yararlanır.",
 },
 {
 q: "Turun rotasında hangi tarihi yerler yer alıyor?",
 a: "Tur Dolmabahçe Sarayı cephesinden başlar, Kız Kulesi'ni soldan geçer, Ortaköy Camii ile 1. Boğaz Köprüsü'nü iç içe çerçeveler ve Rumeli Hisarı görüntülenerek Karaköy'e geri döner. Canlı rehber her yapı hakkında tarih ve mimari bilgi aktarır.",
 },
 ],
 otherOptionsTitle: "Diğer Seçenekler",
 otherOptions: [
 {
 href: "/tr/istanbul-dinner-cruise",
 title: "Akşam Yemeği Turu",
 desc: "€30'dan başlayan 3,5 saatlik Türk gecesi yemekli turu.",
 },
 {
 href: "/tr/yacht-charter-istanbul",
 title: "Özel Yat Kiralama",
 desc: "€280'den başlayan tam özel yat deneyimi.",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "Hemen Yerinizi Ayırın",
 ctaSubtitle: "Boğaz'da altın saat manzarası için online rezervasyon yapın.",
 ctaBookLabel: "Online Rezervasyon →",
 ctaWhatsappLabel: "WhatsApp ile Yaz",
 },
 de: {
 title: "Bosporus Sonnenuntergang Istanbul — Ab €30",
 description:
 "Bosporus Sonnenuntergang Kreuzfahrt Istanbul ab €30 (Di & Do). 2h Luxusjacht, Live-Guide, Erfrischungen. Mit Wein ab €35. TÜRSAB-lizenziert.",
 h1: "Bosporus Sonnenuntergangs-Kreuzfahrt Istanbul — Privatyacht",
 canonicalPath: "/de/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "Startseite",
 breadcrumbCruise: "Bosporus Kreuzfahrt",
 breadcrumbCurrent: "Sonnenuntergang Kreuzfahrt",
 aboutTitle: "Über die Bosporus Sonnenuntergang Kreuzfahrt",
 aboutBody: [
 "Die MerrySails Bosporus Sonnenuntergang Kreuzfahrt ist ein zweistündiges Erlebnis auf einer geteilten Luxusjacht – ideal für Gäste, die Istanbuls berühmte Skyline im goldenen Licht der Abendstunde erleben möchten. Sie wählen zwischen zwei klaren Paketen: Ohne Wein ab €30 (Di & Do) / €34 (übrige Tage), oder mit zwei Gläsern Wein ab €35 (Di & Do) / €40 pro Person. Montag, Dienstag und Donnerstag bieten die günstigste Buchungsmöglichkeit – bis zu €4 Ersparnis pro Person.",
 "Die Abfahrt erfolgt am Karaköy-Anleger, rund 30 Minuten vor dem eigentlichen Sonnenuntergang. So ist garantiert, dass das Boot die optimale Goldene Stunde auf dem Wasser erlebt: Das Sonnenlicht fällt in einem flachen Winkel entlang der Bosporus-Achse und taucht die Brückensilhouetten in Orange- und Rottöne. Dieses Lichtfenster dauert etwa 40 Minuten – ideal für unvergessliche Fotos.",
 "Die Route umfasst den südlichen Bosporus: Vorbei an der Fassade des Dolmabahçe-Palastes, mit Blick auf den Mädchenturm (Kız Kulesi), der Ortaköy-Moschee im Gegenlicht der Bosporus-Brücke und schließlich einem Blick auf die Rumeli-Festung, bevor die Jacht nach Karaköy zurückkehrt. An Bord stehen Ihnen ein Live-Guide, ein sowie Tee, türkischer Kaffee, Limonade, Wasser, Snacks und ein Obstteller zur Verfügung.",
 ],
 trustSignal:
 "Merry Tourism ist seit 2001 TÜRSAB-A-lizenziert und hat über 50.000 Gäste begrüßt – Sie buchen also bei einem geprüften, erfahrenen Anbieter. Abfahrt ist im Bereich Kabataş; die genaue Adresse erhalten Sie nach der Buchungsbestätigung.",
 tableRows: [
 ["Dauer", "ca. 2 Stunden"],
 ["Bootstyp", "Geteilte Luxusjacht"],
 ["Ohne Wein", "€34 / Person"],
 ["Mit Wein", "€40 / Person (2 Gläser)"],
 ["Reiseleitung", "Live-Guide + 12-Sprachen-Audio"],
 ["Erfrischungen", "Tee, Kaffee, Limonade, Snacks, Obst"],
 ],
 faqTitle: "Häufig gestellte Fragen",
 faqs: [
 {
 q: "Wie lange dauert die Sonnenuntergang Kreuzfahrt?",
 a: "Die Tour dauert etwa 2 Stunden. Die Route umfasst den südlichen Bosporus, vorbei am Dolmabahçe-Palast, der Ortaköy-Moschee und unter den Brücken hindurch.",
 },
 {
 q: "Was ist der Unterschied zwischen Option mit und ohne Wein?",
 a: "Beide Optionen beinhalten dieselbe 2-stündige Route, denselben Live-Guide und dieselben Standard-Erfrischungen. Die Option mit Wein enthält zusätzlich 2 Gläser Wein pro Person; Ohne Wein ab €30 (Di & Do) / €34, Mit Wein ab €35 (Di & Do) / €40.",
 },
 {
 q: "Wo startet die Tour?",
 a: "Die Abfahrt erfolgt im Bereich Kabataş auf der europäischen Seite. Den genauen Treffpunkt und die Uhrzeit erhalten Sie schriftlich nach der Buchungsbestätigung.",
 },
 {
 q: "Sonnenuntergang oder Dinner-Kreuzfahrt – was passt besser?",
 a: "Wenn Sie ein kürzeres, ruhigeres Erlebnis ohne Show- und Dinner-Programm bevorzugen, ist die Sonnenuntergangstour ideal. Besonders empfohlen für Paare, Fotofans und Istanbul-Erstbesucher.",
 },
 {
 q: "Welche Jahreszeit eignet sich am besten für die Sonnenuntergang Kreuzfahrt?",
 a: "Frühling (April–Mai) und Herbst (September–Oktober) bieten die farbenprächtigsten Sonnenuntergänge mit warmen Orange- und Rottönen über dem Bosporus. Im Sommer verschiebt sich die Abfahrtszeit entsprechend des späteren Sonnenuntergangs. Im Winter ist die Tour ruhiger, aber das Licht ist kurz und intensiv.",
 },
 {
 q: "Was unterscheidet die Wein-Option von der Standard-Option?",
 a: "Beide Pakete beinhalten Tee, türkischen Kaffee, Limonade, Wasser, Snacks und einen Obstteller. Die Wein-Option (€35 Di&Do / €40) ergänzt dieses Angebot um 2 Gläser ausgewählten Wein pro Person. Gäste, die keinen Alkohol trinken, wählen einfach die Standard-Option und genießen denselben Ausblick und Service.",
 },
 {
 q: "Welche Sehenswürdigkeiten sind auf der Route zu sehen?",
 a: "Die Kreuzfahrt führt an der Fassade des Dolmabahçe-Palastes vorbei, am Mädchenturm (Kız Kulesi), rahmt die Ortaköy-Moschee vor der beleuchteten Bosporus-Brücke ein und bietet einen Blick auf die Rumeli-Festung, bevor die Jacht nach Karaköy zurückkehrt. Ein Live-Guide erläutert die Geschichte jedes Bauwerks.",
 },
 ],
 otherOptionsTitle: "Weitere Optionen",
 otherOptions: [
 {
 href: "/de/istanbul-dinner-cruise",
 title: "Dinner-Kreuzfahrt",
 desc: "3,5-stündige Türkische-Nacht-Dinner-Tour ab €30.",
 },
 {
 href: "/de/yacht-charter-istanbul",
 title: "Private Yachtcharter",
 desc: "Komplett private Yacht-Erlebnisse ab €280.",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "Jetzt buchen",
 ctaSubtitle: "Sichern Sie sich Ihren Platz für die Bosporus Sonnenuntergang-Kreuzfahrt.",
 ctaBookLabel: "Online buchen →",
 ctaWhatsappLabel: "Per WhatsApp anfragen",
 },
 fr: {
 title: "Croisière Coucher Soleil Bosphore Istanbul €30",
 description:
 "Croisière coucher de soleil Bosphore Istanbul dès €30 (mar & jeu). 2h yacht de luxe, guide live, rafraîchissements. Avec vin dès €35. Réservez en ligne.",
 h1: "Croisière Coucher de Soleil Bosphore Istanbul — Yacht Privé",
 canonicalPath: "/fr/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "Accueil",
 breadcrumbCruise: "Croisière Bosphore",
 breadcrumbCurrent: "Croisière Coucher de Soleil",
 aboutTitle: "À propos de la Croisière Coucher de Soleil",
 aboutBody: [
 "La Croisière Coucher de Soleil sur le Bosphore de MerrySails est une expérience de 2 heures à bord d'un yacht de luxe partagé, conçue pour admirer les panoramas iconiques d'Istanbul à l'heure dorée. Deux formules claires : sans vin dès €30 (mar & jeu) / €34, avec vin dès €35 (mar & jeu) / €40 (2 verres par personne).",
 "L'itinéraire couvre la partie sud du Bosphore et passe devant le palais de Dolmabahçe, la mosquée d'Ortaköy et les ponts illuminés. À bord, vous bénéficiez d'un guide en direct, d'un guide anglophone en direct, ainsi que de thé, café turc, citronnade, eau, encas salés et plateau de fruits.",
 ],
 trustSignal:
 "Merry Tourism est licencié TÜRSAB Groupe A depuis 2001 et a accueilli plus de 50 000 voyageurs – vous réservez auprès d'un prestataire reconnu et expérimenté. Le départ se fait dans le quartier de Kabataş ; l'adresse exacte est communiquée après la confirmation de réservation.",
 tableRows: [
 ["Durée", "~2 heures"],
 ["Type de bateau", "Yacht de luxe partagé"],
 ["Sans vin", "€34 / personne"],
 ["Avec vin", "€40 / personne (2 verres)"],
 ["Guide", "Guide anglophone en direct"],
 ["Rafraîchissements", "Thé, café, citronnade, encas, fruits"],
 ],
 faqTitle: "Questions fréquentes",
 faqs: [
 {
 q: "Combien de temps dure la croisière au coucher du soleil ?",
 a: "La croisière dure environ 2 heures. L'itinéraire couvre la partie sud du Bosphore : palais de Dolmabahçe, mosquée d'Ortaköy et passage sous les ponts.",
 },
 {
 q: "Quelle est la différence entre l'option avec et sans vin ?",
 a: "Les deux formules incluent le même itinéraire de 2 heures, le même guide live et les mêmes rafraîchissements standards. L'option avec vin ajoute 2 verres de vin par personne ; sans vin dès €30 (mar & jeu) / €34, avec vin dès €35 (mar & jeu) / €40.",
 },
 {
 q: "D'où part la croisière ?",
 a: "Le départ a lieu dans le quartier de Kabataş, sur la rive européenne. Le point de rendez-vous précis et l'horaire vous sont envoyés par écrit après confirmation de la réservation.",
 },
 {
 q: "Coucher de soleil ou croisière dîner – laquelle choisir ?",
 a: "Si vous préférez une expérience plus courte et plus calme, sans programme de spectacle et de dîner, la croisière au coucher du soleil est idéale. Particulièrement recommandée aux couples, aux passionnés de photo et aux primo-visiteurs d'Istanbul.",
 },
 ],
 otherOptionsTitle: "Autres options",
 otherOptions: [
 {
 href: "/fr/istanbul-dinner-cruise",
 title: "Croisière Dîner",
 desc: "Soirée turque de 3h30 avec dîner à partir de €30.",
 },
 {
 href: "/fr/yacht-charter-istanbul",
 title: "Yacht Privé",
 desc: "Expérience entièrement privée à partir de €200.",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "Réservez maintenant",
 ctaSubtitle: "Réservez votre place pour la croisière coucher de soleil sur le Bosphore.",
 ctaBookLabel: "Réserver en ligne →",
 ctaWhatsappLabel: "Contacter par WhatsApp",
 },
 nl: {
 title: "Bosporus Zonsondergang Cruise Istanbul — €30",
 description:
 "Bosporus zonsondergang cruise Istanbul v.a. €30 (di & do). 2u luxe jacht, live gids, hapjes. Wijnoptie v.a. €35. TÜRSAB-gecertificeerd, direct boeken.",
 h1: "Bosporus Zonsondergang Cruise Istanbul — Privé Jacht",
 canonicalPath: "/nl/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "Home",
 breadcrumbCruise: "Bosporus Cruise",
 breadcrumbCurrent: "Zonsondergang Cruise",
 aboutTitle: "Over de Bosporus Zonsondergang Cruise",
 aboutBody: [
 "De MerrySails Bosporus Zonsondergang Cruise is een 2 uur durende ervaring op een gedeeld luxe jacht, perfect voor wie Istanbul tijdens het gouden uur wil zien. U kiest tussen twee duidelijke opties: zonder wijn v.a. €30 (di & do) / €34, met wijn v.a. €35 (di & do) / €40 (2 glazen per persoon).",
 "De route volgt het zuidelijke deel van de Bosporus en vaart langs het Dolmabahçe-paleis, de Ortaköy-moskee en de verlichte bruggen. Aan boord zijn een live gids, een audiogids in 12 talen en versnaperingen inbegrepen: thee, Turkse koffie, limonade, water, hapjes en een fruitschaal.",
 ],
 trustSignal:
 "Merry Tourism is sinds 2001 TÜRSAB A-gelicenseerd en heeft meer dan 50.000 gasten verwelkomd – u boekt dus bij een bewezen en ervaren aanbieder. Vertrek is bij Kabataş; het exacte adres ontvangt u na bevestiging van de boeking.",
 tableRows: [
 ["Duur", "~2 uur"],
 ["Type boot", "Gedeeld luxe jacht"],
 ["Zonder wijn", "€34 / persoon"],
 ["Met wijn", "€40 / persoon (2 glazen)"],
 ["Gids", "Live gids + audio in 12 talen"],
 ["Versnaperingen", "Thee, koffie, limonade, hapjes, fruit"],
 ],
 faqTitle: "Veelgestelde vragen",
 faqs: [
 {
 q: "Hoe lang duurt de zonsondergang cruise?",
 a: "De cruise duurt ongeveer 2 uur. De route omvat het zuidelijke deel van de Bosporus: Dolmabahçe-paleis, Ortaköy-moskee en onder de bruggen door.",
 },
 {
 q: "Wat is het verschil tussen de optie met en zonder wijn?",
 a: "Beide opties hebben dezelfde route van 2 uur, dezelfde live gids en dezelfde standaardversnaperingen. De optie met wijn voegt 2 glazen wijn per persoon toe; zonder wijn v.a. €30 (di & do) / €34, met wijn v.a. €35 (di & do) / €40.",
 },
 {
 q: "Waar vertrekt de cruise?",
 a: "Vertrek is in de wijk Kabataş aan de Europese kant. Het exacte verzamelpunt en tijdstip krijgt u schriftelijk na bevestiging van de boeking.",
 },
 {
 q: "Zonsondergang of dinercruise – wat past beter?",
 a: "Wilt u een kortere, rustigere ervaring zonder lang dinerprogramma en show, dan is de zonsondergang cruise ideaal. Vooral aanbevolen voor stellen, fotografieliefhebbers en eerste bezoekers van Istanbul.",
 },
 ],
 otherOptionsTitle: "Andere opties",
 otherOptions: [
 {
 href: "/nl/istanbul-dinner-cruise",
 title: "Dinercruise",
 desc: "3,5 uur Turkse avond met diner vanaf €30.",
 },
 {
 href: "/nl/yacht-charter-istanbul",
 title: "Privé Jachtcharter",
 desc: "Volledig privé jachtervaring vanaf €280.",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "Reserveer nu",
 ctaSubtitle: "Boek uw plek voor de Bosporus zonsondergang cruise.",
 ctaBookLabel: "Online reserveren →",
 ctaWhatsappLabel: "WhatsApp sturen",
 },
 ru: {
 title: "Круиз по Босфору на закате в Стамбуле — от €30",
 description:
 "Круиз по Босфору на закате от €30 (вт и чт). 2 часа на люксовой яхте, живой гид, угощения и опция с вином. Лицензия TÜRSAB. Прямое бронирование.",
 h1: "Круиз по Босфору на закате — Sunset Cruise Istanbul",
 canonicalPath: "/ru/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "Главная",
 breadcrumbCruise: "Круиз по Босфору",
 breadcrumbCurrent: "Круиз на закате",
 aboutTitle: "О круизе по Босфору на закате",
 aboutBody: [
 "Круиз по Босфору на закате от MerrySails — это 2-часовое совместное плавание на люксовой яхте, созданное для гостей, которые хотят увидеть иконические виды Стамбула в свете золотого часа. Вы выбираете между двумя понятными пакетами: без вина от €30 (вт и чт) / €34 в другие дни, или с двумя бокалами вина на персону от €35 (вт и чт) / €40. Понедельник, вторник и четверг — самые выгодные дни для бронирования: экономия до €4 с человека.",
 "Отправление выполняется от пирса Карайёй приблизительно за 30 минут до фактического заката. Это гарантирует, что яхта поймает оптимальный золотой час уже на воде: солнечный свет падает под низким углом вдоль оси Босфора и окрашивает силуэты мостов в оранжевые и красные тона. Это световое окно длится около 40 минут — идеально для незабываемых фотографий.",
 "Маршрут охватывает южный Босфор: проход вдоль фасада дворца Долмабахче, замедление у Девичьей башни (Кыз Кулеси), кадрирование мечети Ортакёй на фоне Босфорского моста и обзорный проход у крепости Румели Хисары перед возвращением в Карайёй. На борту работает живой англоязычный гид; в стоимость билета входят чай, турецкий кофе, лимонад, вода, набор закусок и тарелка фруктов. В пакете с вином дополнительно подаются 2 бокала вина на персону.",
 ],
 trustSignal:
 "Merry Tourism — лицензированное агентство группы А TÜRSAB (лицензия №14316) с 2001 года, обслужившее более 50 000 гостей. Точка отправления — пирс Карайёй рядом с памятником Мимару Синану (выход Мармарай, рядом с Балыкчы Кемаль); точный адрес высылается после подтверждения бронирования.",
 tableRows: [
 ["Длительность", "≈ 2 часа"],
 ["Тип судна", "Совместная люксовая яхта"],
 ["Без вина", "€34 / персона"],
 ["С вином", "€40 / персона (2 бокала)"],
 ["Гид", "Живой англоязычный гид"],
 ["Угощения", "Чай, кофе, лимонад, закуски, фрукты"],
 ],
 faqTitle: "Часто задаваемые вопросы",
 faqs: [
 {
 q: "Сколько длится круиз на закате?",
 a: "Круиз длится приблизительно 2 часа. Маршрут охватывает южный Босфор: дворец Долмабахче, мечеть Ортакёй и проход под мостами с возвращением в Карайёй.",
 },
 {
 q: "В чём разница между опциями с вином и без?",
 a: "Оба варианта включают один и тот же 2-часовой маршрут, одного живого гида и одинаковый стандартный набор угощений. Опция с вином дополнительно включает 2 бокала вина на персону: без вина от €30 (вт и чт) / €34, с вином от €35 (вт и чт) / €40.",
 },
 {
 q: "Откуда отправляется круиз?",
 a: "Отправление от пирса Карайёй (европейская сторона), рядом с памятником Мимару Синану — в нескольких минутах ходьбы от Галатского моста и Кабаташа. Точная точка встречи и время высылаются Вам письменно через WhatsApp после подтверждения бронирования.",
 },
 {
 q: "Закат или ужин-круиз — что выбрать?",
 a: "Если Вы предпочитаете более короткий и спокойный формат без программы ужина и шоу, круиз на закате — идеальный выбор. Особенно рекомендуем парам, любителям фотографии и тем, кто впервые приехал в Стамбул.",
 },
 {
 q: "Когда лучший сезон для круиза на закате?",
 a: "Весна (апрель–май) и осень (сентябрь–октябрь) дают самые насыщенные закатные краски — тёплые оранжево-красные тона над Босфором. Летом время отправления смещается на более поздний закат. Зимой круиз спокойнее, свет короче, но интенсивнее.",
 },
 {
 q: "Какие достопримечательности видно с маршрута?",
 a: "Круиз проходит вдоль фасада дворца Долмабахче, мимо Девичьей башни (Кыз Кулеси), рамкирует мечеть Ортакёй на фоне подсвеченного Босфорского моста и предлагает обзор крепости Румели Хисары перед возвращением в Карайёй. Живой гид рассказывает об истории каждого сооружения.",
 },
 {
 q: "Как связаться из России для бронирования?",
 a: "Удобнее всего написать нам в WhatsApp +90 544 898 98 12 — отвечаем на русском, бронирование подтверждается за несколько минут в рабочее время.",
 },
 ],
 otherOptionsTitle: "Другие варианты",
 otherOptions: [
 {
 href: "/ru/istanbul-dinner-cruise",
 title: "Ужин-круиз",
 desc: "3,5-часовой совместный ужин с турецкой ночью от €30.",
 },
 {
 href: "/ru/yacht-charter-istanbul",
 title: "Частная аренда яхты",
 desc: "Полностью приватные пакеты яхты от €200.",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "Забронируйте сейчас",
 ctaSubtitle: "Закрепите Ваше место на круизе по Босфору в золотой час.",
 ctaBookLabel: "Онлайн-бронирование →",
 ctaWhatsappLabel: "Написать в WhatsApp",
 },
 zh: {
 title: "博斯普鲁斯日落游船 — €30 起",
 description:
 "博斯普鲁斯日落游船 €30 起 (周一/二/四)。2 小时豪华游艇,英文讲解,小吃饮品,可选葡萄酒。TÜRSAB 许可,中文 WhatsApp 客服,直接预订。",
 h1: "博斯普鲁斯日落游船 — 共享豪华游艇",
 canonicalPath: "/zh/cruises/bosphorus-sunset-cruise",
 breadcrumbHome: "首页",
 breadcrumbCruise: "博斯普鲁斯游船",
 breadcrumbCurrent: "日落游船",
 aboutTitle: "关于博斯普鲁斯日落游船",
 aboutBody: [
 "MerrySails 博斯普鲁斯日落游船是 2 小时的共享豪华游艇体验,专为希望在黄金时刻欣赏伊斯坦布尔最具标志性景观的客人设计。提供两种清晰选择:不含酒 €30 (周一/二/四) / €34 (其他日期),含葡萄酒 €35 (周一/二/四) / €40 (其他日期)。周一、周二、周四预订的客人每人节省 €4。",
 "出发地点为 Karaköy 码头;日落前 30 分钟出航,确保捕捉最强烈的黄金时刻光线。对摄影爱好者而言,太阳沿博斯普鲁斯轴线落入马尔马拉海,将大桥剪影染上火焰般的色彩。这个光线窗口大约持续 40 分钟。",
 "航线覆盖博斯普鲁斯南段:经过多尔玛巴赫切宫立面,在少女塔前减速,奥塔科伊清真寺与博斯普鲁斯大桥并列入镜,然后经过鲁梅利堡返航。所有票价均含英文实时讲解,以及热饮 (茶、土耳其咖啡)、冷饮 (冰茶、柠檬水、果汁、水) 和小吃拼盘 (坚果、饼干、时令水果)。含葡萄酒套餐每人增加 2 杯葡萄酒。",
 ],
 trustSignal:
 "自 2001 年起持有 TÜRSAB A 类许可的 Merry Tourism,以接待过 50,000+ 位客人的经验提供可靠服务。出发点位于 Kabataş/Karaköy 地区;确切地址在预订确认后通过 WhatsApp 提供。",
 tableRows: [
 ["时长", "约 2 小时"],
 ["船型", "共享豪华游艇"],
 ["不含酒", "€34 / 人 (周一/二/四 €30)"],
 ["含葡萄酒", "€40 / 人 (2 杯) — 周一/二/四 €35"],
 ["讲解", "英文实时讲解"],
 ["饮食", "热饮/冷饮 + 小吃拼盘"],
 ],
 faqTitle: "常见问题",
 faqs: [
 {
 q: "日落游船持续多久?",
 a: "约 2 小时。航线覆盖博斯普鲁斯南段:经过多尔玛巴赫切宫、奥塔科伊清真寺和大桥后返航。",
 },
 {
 q: "含葡萄酒与不含酒套餐有什么区别?",
 a: "两种套餐都包含相同的 2 小时航线、英文讲解和标准餐饮。含葡萄酒套餐每人额外提供 2 杯葡萄酒:不含酒 €30 (周一/二/四) / €34,含葡萄酒 €35 (周一/二/四) / €40。",
 },
 {
 q: "从哪里出发?",
 a: "从 Karaköy 码头出发。确切集合地点和时间将在预订确认后以书面形式通知。",
 },
 {
 q: "中国游客如何支付? 接受微信/支付宝吗?",
 a: "船上支付支持现金 (EUR/USD/TRY) 和国际信用卡 (Visa/Mastercard/AmEx)。中国银联、支付宝、微信支付目前不直接受理 — 请携带 Visa/Mastercard 或在本地兑换部分欧元/里拉。预订无需预付定金,直接船上结账。",
 },
 {
 q: "日落游船和晚宴游船哪个更适合?",
 a: "想要更短、安静、轻松体验的客人推荐日落游船 (2 小时,€30 起)。喜欢土耳其文化表演和正式晚餐的客人推荐晚宴游船 (3.5 小时,€30-90 共 4 个套餐)。情侣、摄影爱好者和初次到访伊斯坦布尔的客人更适合日落。",
 },
 {
 q: "哪个季节最适合日落游船?",
 a: "春季 (4–5 月) 和秋季 (9–10 月) 提供最戏剧性的日落色彩。夏季日落较晚,游船出发时间相应调整。冬季出席人数较少,旅程更加安静;光线短促但强烈。",
 },
 {
 q: "船上提供中文讲解吗?",
 a: "标准日落游船配备英文实时讲解。如果您团队 6 人以上,可以提前 48 小时预约普通话讲解员 (€80 加费,与私人游艇包租结合)。或者预订时告知我们,船长会准备中文菜单和重要景点的中文标识卡片。",
 },
 {
 q: "航线包含哪些历史景点?",
 a: "从多尔玛巴赫切宫立面开始,左侧经过少女塔,奥塔科伊清真寺与博斯普鲁斯第一大桥并列入镜,经过鲁梅利堡后返回 Karaköy。英文讲解员逐一介绍每座建筑的历史和建筑细节。",
 },
 ],
 otherOptionsTitle: "其他选择",
 otherOptions: [
 {
 href: "/zh/istanbul-dinner-cruise",
 title: "晚宴游船",
 desc: "€30 起的 3.5 小时土耳其之夜晚宴游船。",
 },
 {
 href: "/zh/yacht-charter-istanbul",
 title: "私人游艇包租",
 desc: "€280 起的完全私人游艇体验。",
 },
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 ctaTitle: "立即预订",
 ctaSubtitle: "在线预订博斯普鲁斯黄金时刻日落游船。中文 WhatsApp 客服。",
 ctaBookLabel: "在线预订 →",
 ctaWhatsappLabel: "WhatsApp 中文咨询",
 },
};

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!sunsetTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

 return {
 title: t.title,
 description: t.description,
 alternates: {
 canonical: canonicalUrl,
 languages: {
 "x-default": `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
 en: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
 tr: `${SITE_URL}/tr/cruises/bosphorus-sunset-cruise`,
 de: `${SITE_URL}/de/cruises/bosphorus-sunset-cruise`,
 fr: `${SITE_URL}/fr/cruises/bosphorus-sunset-cruise`,
 nl: `${SITE_URL}/nl/cruises/bosphorus-sunset-cruise`,
 ru: `${SITE_URL}/ru/cruises/bosphorus-sunset-cruise`,
 },
 },
 openGraph: {
 title: t.title,
 description: t.description,
 url: canonicalUrl,
 type: "website",
 images: [{ url: sunsetTour.image, width: 1200, height: 630, alt: t.h1 }],
 },
 twitter: {
 card: "summary_large_image",
 title: t.title,
 description: t.description,
 images: [sunsetTour.image],
 },
 };
}

export default async function LocaleSunsetCruisePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!sunsetTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

 // Locale-aware booking momentum + label translations
 const momentum = await getProductBookingMomentum("bosphorus-sunset-cruise");
 const productLabelByLocale: Record<string, string> = {
 en: "sunset cruise",
 tr: "gün batımı turu",
 de: "Sonnenuntergangsfahrt",
 fr: "croisière coucher de soleil",
 nl: "zonsondergangs-cruise",
 ru: "закатный круиз",
 };
 const reserveLabelByLocale: Record<string, string> = {
 en: "Reserve from €30",
 tr: "€30'dan rezerve et",
 de: "Ab €30 buchen",
 fr: "Réserver dès €30",
 nl: "Boeken vanaf €30",
 ru: "Забронировать от €30",
 };
 const whatsappPrefillByLocale: Record<string, string> = {
 en: "Hi MerrySails! I'm interested in the Bosphorus Sunset Cruise (from €30). What dates are available?",
 tr: "Merhaba MerrySails! Boğaz Gün Batımı Turu (€30'dan başlayan) için fiyat ve müsait tarihler hakkında bilgi alabilir miyim?",
 de: "Hallo MerrySails! Ich interessiere mich für die Bosporus-Sonnenuntergangsfahrt (ab €30). Welche Termine sind verfügbar?",
 fr: "Bonjour MerrySails ! Je suis intéressé(e) par la Croisière Coucher de Soleil sur le Bosphore (à partir de €30). Quelles dates sont disponibles ?",
 nl: "Hallo MerrySails! Ik ben geïnteresseerd in de Bosporus Zonsondergangs-Cruise (vanaf €30). Welke data zijn beschikbaar?",
 ru: "Здравствуйте, MerrySails! Меня интересует Закатный круиз по Босфору (от €30). Какие даты свободны?",
 };
 const productLabel = productLabelByLocale[locale] ?? productLabelByLocale.en;
 const reserveLabel = reserveLabelByLocale[locale] ?? reserveLabelByLocale.en;
 const whatsappPrefill = whatsappPrefillByLocale[locale] ?? whatsappPrefillByLocale.en;

 const serviceSchema = {
 "@context": "https://schema.org",
 "@type": ["TouristTrip", "Service"],
 name: t.h1,
 alternateName: ["Bosphorus Sunset Cruise", "Boğaz Gün Batımı Turu", "Bosporus Sonnenuntergang Kreuzfahrt", "Croisière Coucher de Soleil Bosphore"],
 description: sunsetTour.description,
 touristType: "Cultural Tourism",
 url: canonicalUrl,
 image: sunsetTour.image,
 provider: { "@id": `${SITE_URL}/#organization` },
 areaServed: { "@type": "City", name: "Istanbul" },
 offers: {
 "@type": "AggregateOffer",
 lowPrice: Math.min(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
 highPrice: Math.max(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
 priceCurrency: "EUR",
 offerCount: sunsetTour.packages?.length ?? 1,
 availability: "https://schema.org/InStock",
 },
 };

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
 { "@type": "ListItem", position: 2, name: t.breadcrumbCruise, item: `${SITE_URL}/${locale}/bosphorus-cruise` },
 { "@type": "ListItem", position: 3, name: t.breadcrumbCurrent, item: canonicalUrl },
 ],
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: t.faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };

 // Event schema — recurring sunset cruise (golden hour, daily, year-round)
 const eventSchema = {
 "@context": "https://schema.org",
 "@type": "Event",
 name: t.h1,
 description: sunsetTour.description,
 image: sunsetTour.image,
 startDate: "2026-01-01T18:00:00+03:00",
 endDate: "2026-12-31T20:00:00+03:00",
 eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
 eventStatus: "https://schema.org/EventScheduled",
 location: {
 "@type": "Place",
 name: "Kabataş Pier, Istanbul",
 address: {
 "@type": "PostalAddress",
 streetAddress: "Kabataş Mah., Meclis-i Mebusan Cad.",
 addressLocality: "Istanbul",
 addressRegion: "Beyoğlu",
 postalCode: "34433",
 addressCountry: "TR",
 },
 geo: { "@type": "GeoCoordinates", latitude: 41.0344, longitude: 28.9919 },
 },
 organizer: {
 "@type": "Organization",
 "@id": `${SITE_URL}/#organization`,
 name: "MerrySails",
 url: SITE_URL,
 },
 performer: {
 "@type": "Organization",
 "@id": `${SITE_URL}/#organization`,
 name: "MerrySails",
 url: SITE_URL,
 },
 eventSchedule: {
 "@type": "Schedule",
 repeatFrequency: "P1D",
 byDay: [
 "https://schema.org/Monday",
 "https://schema.org/Tuesday",
 "https://schema.org/Wednesday",
 "https://schema.org/Thursday",
 "https://schema.org/Friday",
 "https://schema.org/Saturday",
 "https://schema.org/Sunday",
 ],
 startDate: "2026-01-01",
 endDate: "2026-12-31",
 scheduleTimezone: "Europe/Istanbul",
 },
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 url: canonicalUrl,
 price: sunsetTour.priceEur,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 validFrom: "2026-01-01",
 },
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: sunsetTour.rating,
 reviewCount: sunsetTour.reviewCount,
 bestRating: 5,
 worstRating: 1,
 },
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

 <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
 <div className="container-main">
 <h1 className="sr-only">{t.h1}</h1>
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
 <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
 <span>/</span>
 <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbCruise}</Link>
 <span>/</span>
 <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
 </nav>

 {sunsetTour.packages?.some((p) => p.weekdayDiscount) && (
 <WeekdayDiscountBanner
 packages={sunsetTour.packages}
 productName={sunsetTour.nameEn}
 strings={getWeekdayDiscountStrings(locale as SiteLocale)}
 />
 )}

 <QuickAnswer productKey="bosphorus-sunset-cruise" locale={locale} />

 {/* Locale-aware conversion stack */}
 <SocialProofBadges
 variant="product"
 productKey="sunset"
 locale={locale as SiteLocale}
 className="mb-6"
 />
 <LiveBookingCounter locale={locale as SiteLocale} className="mb-4" />
 <BookingMomentumBadge
 momentum={momentum}
 productLabel={productLabel}
 locale={locale as SiteLocale}
 className="mb-6"
 />

 <TourDetailClient
 tour={getTourBySlug("bosphorus-sunset-cruise", locale) ?? sunsetTour}
 related={relatedTours}
 locale={locale as SiteLocale}
 />

 <div className="my-8">
 <ReviewsCarousel productKey="sunset" locale={locale as SiteLocale} />
 </div>

 <LocaleHelpfulResources locale={locale as SiteLocale} omit="sunset" />

 <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
 {t.aboutTitle}
 </h2>
 <div className="grid gap-6 md:grid-cols-2">
 <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
 {t.aboutBody.map((paragraph, idx) => (
 <p key={idx}>{paragraph}</p>
 ))}
 <p>
 <strong>{t.trustSignal}</strong>
 </p>
 </div>
 <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
 <table className="w-full border-collapse text-left text-sm">
 <tbody>
 {t.tableRows.map(([label, value]) => (
 <tr key={label} className="border-b border-[var(--line)] last:border-b-0">
 <th className="w-44 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">{label}</th>
 <td className="p-3 text-[var(--text-muted)]">{value}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>

 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.faqTitle}</h2>
 <div className="space-y-4">
 {t.faqs.map(({ q, a }) => (
 <details key={q} className="rounded-xl border border-[var(--line)] p-4">
 <summary className="cursor-pointer font-semibold text-[var(--heading)]">{q}</summary>
 <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{a}</p>
 </details>
 ))}
 </div>
 </section>

 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.otherOptionsTitle}</h2>
 <div className="grid gap-4 md:grid-cols-3">
 {t.otherOptions.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
 >
 <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
 <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
 </Link>
 ))}
 </div>
 </section>
 </div>
 </div>

 {/* CTA */}
 <div className="py-16 bg-[var(--brand-primary)]">
 <div className="container-main text-center">
 <h2 className="text-3xl font-bold text-white mb-3">{t.ctaTitle}</h2>
 <p className="text-white/80 mb-8 max-w-xl mx-auto">{t.ctaSubtitle}</p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/reservation`}
 className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-primary)] shadow hover:bg-white/90 transition-colors"
 >
 {t.ctaBookLabel}
 </Link>
 <a
 href={WHATSAPP_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
 >
 {t.ctaWhatsappLabel}
 </a>
 </div>
 </div>
 </div>

 <div className="container-main pb-12">
 <RelatedTours exclude="sunset" locale={locale as SiteLocale} />
 </div>
 <StickyMobileCta
 reserveHref={`/${locale}/reservation?tour=bosphorus-sunset-cruise#core-booking-planner`}
 reserveLabel={reserveLabel}
 locale={locale as SiteLocale}
 whatsappLocation={`locale_sunset_${locale}`}
 whatsappPrefill={whatsappPrefill}
 />
 </>
 );
}
