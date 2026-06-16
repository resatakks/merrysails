import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocaleHelpfulResources from "@/components/layout/LocaleHelpfulResources";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, getBcp47, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";
import FleetShowcase from "@/components/yacht/FleetShowcase";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import BookingMomentumBadge from "@/components/ui/BookingMomentumBadge";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import { getProductBookingMomentum } from "@/lib/booking-momentum";
import { getFleetStrings } from "@/components/yacht/fleet-strings";
import QuickAnswer from "@/components/ai/QuickAnswer";
import {
 getCharterFleet,
 getCharterLowestEntryPriceEur,
 getCharterHighestTotalPriceEur,
} from "@/data/fleet";

export const revalidate = 3600;

export function generateStaticParams() {
 return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
 locale,
 }));
}

const yachtTour = getTourBySlug("yacht-charter-in-istanbul");
if (!yachtTour) throw new Error("Yacht charter data is missing.");

const relatedTours: Tour[] = [
 getTourBySlug("bosphorus-sunset-cruise"),
 getTourBySlug("bosphorus-dinner-cruise"),
 getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
 title: string;
 subtitle: string;
 description: string;
 metaTitle: string;
 metaDescription: string;
 canonicalPath: string;
 whyChooseHeading: string;
 reasons: { title: string; desc: string }[];
 howItWorks: { heading: string; steps: string[] };
 faqHeading: string;
 faqs: { question: string; answer: string }[];
 tableHeading: string;
 tableRows: { label: string; value: string }[];
 ctaWhatsapp: string;
 ctaPhone: string;
 breadcrumbHome: string;
 breadcrumbCruise: string;
 breadcrumbCurrent: string;
 viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
 tr: {
 metaTitle: "İstanbul Yat Kiralama Tekne Kiralama €200'den",
 metaDescription:
 "İstanbul yat kiralama €200'den başlıyor. 10-150 kişi kapasiteli 6 yatlık filo, 2 saat minimum, 3 saatten itibaren %10 indirim. Kaptanlı özel Boğaz turu.",
 canonicalPath: "/tr/yacht-charter-istanbul",
 title: "İstanbul Yat Kiralama ve Tekne Kiralama",
 subtitle: "Boğaz sailingi — 6 yat, 10-150 kişi, tüm tekne size özel",
 description:
 "MerrySails ile İstanbul yat ve tekne kiralama tek elden. Filo 10 kişilik küçük güverteli sailing yatından 150 kişilik mega etkinlik teknesine uzanır; her rezervasyon teknenin tamamını grubunuza tahsis eder. Yumuşak içecek, atıştırmalık, kaptan ve mürettebat güverte fiyatına dahildir; üç saat ve üzeri sailingde otomatik düz %10 düşülür. Yemek, alkol, DJ ve etkinlik stillemesi ayrı brief'le fiyatlandırılır. Merry Tourism çatısı altında 2001'den beri TURSAB A Grubu lisanslı operasyon.",
 whyChooseHeading: "İstanbul Özel Yat Kiralama Neden Tercih Edilir?",
 reasons: [
 {
 title: "Tüm tekne size özel",
 desc: "Paylaşımlı turların aksine yat tamamen sizin grubunuza ayrılır. Güzergahı, kalkış saatini ve müziği siz belirlersiniz.",
 },
 {
 title: "Özel anlar için ideal",
 desc: "Evlilik teklifi, doğum günü, yıl dönümü ve kurumsal etkinlikler için en uygun seçenek. Çiçek, pasta, fotoğrafçı ve özel dekor talep edilebilir.",
 },
 {
 title: "Yat başına şeffaf fiyat",
 desc: "Filonun tamamı euro cinsinden yat başına fiyatlandırılır. Küçük güverte 2 saat €200'den, grup yatı 2 saat €280'den; etkinlik yatları programa göre teklif. Üç saat ve üzeri sailingde düz %10 otomatik düşer.",
 },
 ],
 howItWorks: {
 heading: "Rezervasyon Nasıl Yapılır?",
 steps: [
 "WhatsApp veya telefon üzerinden tarih, saat ve katılımcı sayısını paylaşarak müsaitlik kontrolü yaptırın.",
 "Ekibimiz grup büyüklüğünüze en uygun yatı önerir; özel istekleriniz (yemek, alkol, DJ, çiçek, pasta, fotoğrafçı) ayrı teklif olarak iletilir.",
 "Onayın ardından depozito ile rezervasyonunuz garantilenir; tur günü Kabataş veya talep ettiğiniz iskeleden hareket edersiniz.",
 ],
 },
 faqHeading: "Sıkça Sorulan Sorular",
 faqs: [
 {
 question: "İstanbul yat kiralama fiyatları ne kadar?",
 answer:
 "Filo €200'den başlar (10 kişilik küçük güverte, 2 saat) ve 8 saatlik signature grup sailingde €1.070'e kadar çıkar. Üç saat ve üzeri her sailingde düz %10 otomatik düşer. Etkinlik sınıfı yatlar programa göre fiyatlandırılır.",
 },
 {
 question: "Yat kiralama ile tekne kiralama arasındaki fark nedir?",
 answer:
 "Türkiye'de yat kiralama ve tekne kiralama aynı hizmeti tarif eder; her ikisi de Boğaz'da özel deniz aracı tahsisini ifade eder. MerrySails'te yat kiralama veya tekne kiralama olarak ayırt etmiyoruz — filo yapısı, kapasite ve fiyat aynıdır.",
 },
 {
 question: "Yat kiralama ne kadar sürer?",
 answer:
 "Minimum sailing süresi 2 saattir. Filo 2 ile 8 saat arası bloklarla çalışır; üç saat ve üzeri rezervasyonlarda otomatik %10 indirim uygulanır.",
 },
 {
 question: "Yatta kaç kişi konaklayabilir?",
 answer:
 "Filo 10 kişilik küçük güverteli sailing yatından 150 kişilik mega etkinlik teknesine uzanan altı yat içerir. Grup büyüklüğünüze uygun yatı öneririz.",
 },
 {
 question: "Tekne kiralama nereden kalkar?",
 answer:
 "Yat ve tekne kiralama paketlerimiz genellikle Kabataş, Beşiktaş, Bebek veya Kuruçeşme Marina'dan kalkar. Tercih ettiğiniz kalkış noktasını rezervasyon sırasında belirtebilirsiniz.",
 },
 {
 question: "Evlilik teklifi düzenlemesi yapılır mı?",
 answer:
 "Evet. Çiçek süsleme, pasta, romantik müzik listesi ve profesyonel fotoğrafçı her yat için ayrı brief'le fiyatlandırılır. Sürpriz organizasyonu için en az 48 saat öncesinden bilgi vermenizi rica ederiz.",
 },
 {
 question: "Yiyecek ve içecek dahil mi?",
 answer:
 "Yumuşak içecek, su ve hafif atıştırmalık tüm yatlarda güverte fiyatına dahildir. Tam menü, alkol, bar servisi, DJ ve dans gösterisi programa göre ayrı fiyatlandırılır.",
 },
 ],
 tableHeading: "Hızlı Bilgi",
 tableRows: [
 { label: "Süre", value: "2-8 saat (min. 2)" },
 { label: "Kalkış", value: "Kabataş / Beşiktaş / Bebek" },
 { label: "Başlangıç fiyatı", value: "€200 (küçük güverte · 2 saat)" },
 { label: "Filo", value: "6 yat · 10-150 kişi" },
 { label: "İndirim", value: "3 saatten itibaren düz %10" },
 { label: "Lisans", value: "TÜRSAB A Grubu (2001'den beri)" },
 ],
 ctaWhatsapp: "WhatsApp ile Bilgi Al",
 ctaPhone: "Telefonla Ara",
 breadcrumbHome: "Ana Sayfa",
 breadcrumbCruise: "Boğaz Turu",
 breadcrumbCurrent: "Yat Kiralama",
 viewInEnglish: "View in English →",
 },
 de: {
 metaTitle: "Yachtcharter Istanbul ab €200 — Bosporus",
 metaDescription:
 "Yachtcharter Istanbul ab €200. Flotte aus 6 Yachten für 10 bis 150 Gäste, Mindestcharter 2 Stunden, ab 3 Stunden flach 10 % Rabatt. Mit Kapitän und Crew.",
 canonicalPath: "/de/yacht-charter-istanbul",
 title: "Privater Yachtcharter Istanbul",
 subtitle: "Bosporus-Sailing — 6 Yachten, 10 bis 150 Gäste, das ganze Schiff für Sie",
 description:
 "Bei MerrySails reicht die Flotte von der 10-Gäste-Sailing-Yacht (Einsteiger-Deck, ab €280 / 2 Std.) über die 14-Gäste-Sailing-Yacht, die 36-Gäste-Gruppen-Yacht und die 36-Gäste-Signature-Yacht bis zur 44-Gäste-Event-Yacht und zur 150-Gäste-Mega-Event-Yacht (ab €680 / 2 Std.). Jede Buchung sichert das gesamte Schiff exklusiv für Ihre Gruppe – keine Fremden an Bord. Kapitän, Crew, Treibstoff, Softdrinks und Snacks sind im Deckpreis enthalten; ab drei Stunden Sailing wird flach 10 % automatisch abgezogen. Auf Wunsch organisieren wir Hochzeitsanträge, Geburtstagsfeiern, Firmenevents und Jubiläen – inklusive Blumendekoration, Torte, DJ und professionellem Fotografen (separates Briefing). Alle Yachten legen in der Kuruçeşme Marina oder am Anleger Kabataş ab; den bevorzugten Startpunkt geben Sie bei der Buchung an. Betrieben von Merry Tourism, TURSAB-A-Gruppe lizenziert seit 2001.",
 whyChooseHeading: "Warum einen privaten Yachtcharter in Istanbul wählen?",
 reasons: [
 {
 title: "Die ganze Jacht für Sie allein",
 desc: "Anders als bei geteilten Touren steht Ihnen die komplette Jacht exklusiv zur Verfügung. Route, Startzeit und Musik bestimmen Sie selbst.",
 },
 {
 title: "Perfekt für besondere Anlässe",
 desc: "Ideal für Heiratsanträge, Geburtstage, Jubiläen und Firmenevents. Blumen, Torte, Fotograf und individuelle Dekoration sind auf Wunsch buchbar.",
 },
 {
 title: "Pro-Yacht-Preise in EUR",
 desc: "Über die gesamte Flotte gelten klare Pro-Yacht-Preise. Kleines Deck ab €200/2 Std., Gruppen-Deck ab €280/2 Std.; Event-Yachten programmbasiert. Ab drei Stunden Sailing werden flache zehn Prozent automatisch abgezogen.",
 },
 ],
 howItWorks: {
 heading: "So buchen Sie",
 steps: [
 "Senden Sie uns Datum, Uhrzeit und Teilnehmerzahl per WhatsApp oder Telefon, damit wir die Verfügbarkeit prüfen.",
 "Unser Team schlägt die passende Yacht für Ihre Gruppengröße vor; Sonderwünsche wie Catering, Alkohol, DJ, Blumen, Torte oder Fotograf werden separat angeboten.",
 "Nach Bestätigung sichern wir Ihre Buchung mit einer Anzahlung. Am Tourtag legen Sie ab Kabataş oder einem von Ihnen gewünschten Anleger ab.",
 ],
 },
 faqHeading: "Häufig gestellte Fragen",
 faqs: [
 {
 question: "Wie lange dauert ein Yachtcharter?",
 answer:
 "Mindestens zwei Stunden. Buchbar in Blöcken von 2 bis 8 Stunden; ab drei Stunden werden flach zehn Prozent automatisch abgezogen.",
 },
 {
 question: "Wie viele Personen passen an Bord?",
 answer:
 "Unsere Flotte umfasst sechs Yachten — von der 10-Gäste-Sailing-Yacht bis zur 150-Gäste-Event-Yacht. Wir schlagen die passende Yacht für Ihre Gruppengröße vor.",
 },
 {
 question: "Organisieren Sie Heiratsanträge?",
 answer:
 "Ja. Blumendekoration, Torte, romantische Musikliste und ein professioneller Fotograf werden per Briefing separat angeboten. Bitte informieren Sie uns mindestens 48 Stunden im Voraus.",
 },
 {
 question: "Sind Speisen und Getränke inklusive?",
 answer:
 "Softdrinks, Wasser und leichte Snacks gehören auf allen Yachten zum Deckpreis. Vollmenüs, Alkohol, Bar-Service, DJ und Tanz-Acts werden über ein separates Briefing angeboten.",
 },
 {
 question: "Wie groß ist die Yachtflotte von MerrySails?",
 answer:
 "Die Flotte umfasst sechs Yachten: Sailing-Yacht 10 Gäste (ab €280), Sailing-Yacht 14 Gäste, Gruppen-Yacht 36 Gäste, Signature-Yacht 36 Gäste, Event-Yacht 44 Gäste und Mega-Event-Yacht 150 Gäste (ab €680). So finden wir für jede Gruppengröße das passende Schiff.",
 },
 {
 question: "Wo legt die Yacht ab? Welche Marina?",
 answer:
 "Standard-Abfahrt ist die Kuruçeşme Marina auf der europäischen Seite. Auf Wunsch ist auch ein Ablegen vom Anleger Kabataş, Beşiktaş oder Bebek möglich. Den bevorzugten Startpunkt teilen Sie bitte bei der Buchung mit; der genaue Treffpunkt wird nach der Buchungsbestätigung zugesandt.",
 },
 {
 question: "Ist der Yachtcharter familienfreundlich?",
 answer:
 "Ja, alle Yachten sind familienfreundlich. Kinder sind herzlich willkommen; die ruhige Fahrt auf dem Bosporus ist auch für kleine Gäste gut geeignet. Bitte geben Sie die Anzahl der Kinder bei der Buchung an, damit wir die passende Yacht und Sitzplätze sicherstellen.",
 },
 {
 question: "Was ist im Yacht-Preis inbegriffen?",
 answer:
 "Im Deckpreis enthalten sind: Kapitän und Crew, Treibstoff, Softdrinks (Wasser, Limonade, Cola), leichte Snacks und die Nutzung des gesamten Schiffes exklusiv für Ihre Gruppe. Alkohol, Vollmenü, Bar-Service, DJ, Blumendekoration, Torte und Fotografen sind als Add-ons separat buchbar. Ab drei Stunden Charter wird automatisch 10 % Rabatt abgezogen.",
 },
 ],
 tableHeading: "Auf einen Blick",
 tableRows: [
 { label: "Dauer", value: "2–8 Stunden (Min. 2)" },
 { label: "Abfahrt", value: "Kabataş / Beşiktaş / Bebek" },
 { label: "Ab-Preis", value: "€200 (kleines Deck · 2 Std.)" },
 { label: "Flotte", value: "6 Yachten · 10–150 Gäste" },
 { label: "Rabatt", value: "Ab 3 Std. flach 10 %" },
 { label: "Lizenz", value: "TÜRSAB A-Gruppe (seit 2001)" },
 ],
 ctaWhatsapp: "Per WhatsApp anfragen",
 ctaPhone: "Jetzt anrufen",
 breadcrumbHome: "Startseite",
 breadcrumbCruise: "Bosporus-Tour",
 breadcrumbCurrent: "Yachtcharter",
 viewInEnglish: "View in English →",
 },
 fr: {
 metaTitle: "Location Yacht Istanbul — À partir de €200",
 metaDescription:
 "Location yacht Istanbul à partir de €200. Flotte de 6 yachts pour 10 à 150 invités, 2 heures minimum, dix pour cent en moins dès 3 heures. Avec capitaine.",
 canonicalPath: "/fr/yacht-charter-istanbul",
 title: "Location de Yacht Privé à Istanbul",
 subtitle: "Voile privée sur le Bosphore — 6 yachts, 10 à 150 invités, bateau entier",
 description:
 "La flotte MerrySails va du petit voilier 10 invités au méga-yacht événementiel 150 invités. Chaque réservation retient le bateau entier pour votre groupe. Capitaine, équipage, carburant, boissons sans alcool et collations accompagnent le prix du pont ; à partir de trois heures, dix pour cent partent automatiquement à plat. Restauration, service bar, DJ et stylisme événementiel passent par un brief séparé. Opéré par Merry Tourism, agréé TÜRSAB Groupe A depuis 2001.",
 whyChooseHeading: "Pourquoi choisir un yacht privé à Istanbul ?",
 reasons: [
 {
 title: "Le yacht entièrement pour vous",
 desc: "Contrairement aux croisières partagées, le bateau est exclusivement réservé à votre groupe. Vous décidez de l'itinéraire, de l'heure et de la musique.",
 },
 {
 title: "Parfait pour les grandes occasions",
 desc: "Idéal pour une demande en fiançailles, un anniversaire, un mariage ou un événement d'entreprise. Fleurs, gâteau, photographe et décoration sur mesure disponibles.",
 },
 {
 title: "Tarification par yacht en EUR",
 desc: "Toute la flotte est tarifée par yacht en euros. Petit pont à partir de €200/2 h, pont de groupe à partir de €200/2 h ; yachts événement chiffrés au programme. Dès trois heures, dix pour cent partent automatiquement à plat.",
 },
 ],
 howItWorks: {
 heading: "Comment réserver",
 steps: [
 "Envoyez-nous date, horaire et nombre de participants par WhatsApp ou par téléphone afin que nous vérifiions la disponibilité.",
 "Notre équipe propose le yacht adapté à la taille du groupe ; les demandes spéciales (restauration, alcool, DJ, fleurs, gâteau, photographe) sont chiffrées séparément.",
 "Après confirmation, votre réservation est garantie par un acompte. Le jour J, vous embarquez à Kabataş ou à l'embarcadère de votre choix.",
 ],
 },
 faqHeading: "Questions fréquentes",
 faqs: [
 {
 question: "Combien de temps dure une location de yacht ?",
 answer:
 "Deux heures minimum. La flotte fonctionne par blocs de 2 à 8 heures ; à partir de trois heures, dix pour cent partent automatiquement à plat.",
 },
 {
 question: "Combien de personnes peuvent monter à bord ?",
 answer:
 "Notre flotte comprend six yachts — du petit voilier 10 invités au méga-yacht événementiel 150 invités. Nous proposons le yacht adapté à la taille de votre groupe.",
 },
 {
 question: "Organisez-vous les demandes en fiançailles ?",
 answer:
 "Oui. Décoration florale, gâteau, playlist romantique et photographe professionnel sont chiffrés séparément par brief. Merci de nous prévenir au moins 48 heures à l'avance pour une organisation surprise.",
 },
 {
 question: "Le repas et les boissons sont-ils inclus ?",
 answer:
 "Boissons sans alcool, eau et collations légères font partie du prix du pont sur tous les yachts. Menus complets, alcool, service bar, DJ et numéros de danse passent par un brief séparé.",
 },
 ],
 tableHeading: "En un coup d'œil",
 tableRows: [
 { label: "Durée", value: "2 à 8 heures (min. 2)" },
 { label: "Départ", value: "Kabataş / Beşiktaş / Bebek" },
 { label: "Prix de départ", value: "€200 (petit pont · 2 h)" },
 { label: "Flotte", value: "6 yachts · 10 à 150 invités" },
 { label: "Remise", value: "Dès 3 h : dix pour cent à plat" },
 { label: "Licence", value: "TÜRSAB Groupe A (depuis 2001)" },
 ],
 ctaWhatsapp: "Contacter via WhatsApp",
 ctaPhone: "Appeler maintenant",
 breadcrumbHome: "Accueil",
 breadcrumbCruise: "Croisière Bosphore",
 breadcrumbCurrent: "Location de Yacht",
 viewInEnglish: "View in English →",
 },
 nl: {
 metaTitle: "Jachthuur Istanbul — Vanaf €200",
 metaDescription:
 "Jachthuur Istanbul vanaf €200. Vloot van 6 jachten voor 10 tot 150 gasten, 2 uur minimum, tien procent korting vanaf 3 uur. Met kapitein en bemanning.",
 canonicalPath: "/nl/yacht-charter-istanbul",
 title: "Privé Jachtcharter Istanbul",
 subtitle: "Bosporus-zeilen — 6 jachten, 10 tot 150 gasten, hele boot voor u",
 description:
 "De MerrySails-vloot loopt van het 10-gasten zeiljacht met klein dek tot het 150-gasten mega-eventjacht. Elke boeking houdt het hele schip voor uw gezelschap vast. Kapitein, bemanning, brandstof, frisdrank en snacks zitten in de dekprijs; vanaf drie uur vaart wordt tien procent automatisch en vlak afgetrokken. Eten, barservice, DJ en eventstyling lopen via een aparte briefing. Geëxploiteerd door Merry Tourism, TÜRSAB A-categorie gecertificeerd sinds 2001.",
 whyChooseHeading: "Waarom kiezen voor een privé jachtcharter in Istanbul?",
 reasons: [
 {
 title: "Het hele jacht voor u alleen",
 desc: "Anders dan bij gedeelde tochten is het jacht volledig voorbehouden aan uw gezelschap. U bepaalt route, vertrektijd en muziek.",
 },
 {
 title: "Perfect voor bijzondere momenten",
 desc: "Ideaal voor een huwelijksaanzoek, verjaardag, jubileum of bedrijfsevenement. Bloemen, taart, fotograaf en decoratie zijn op verzoek mogelijk.",
 },
 {
 title: "Prijs per jacht in EUR",
 desc: "De hele vloot wordt per jacht in euro's geprijsd. Klein dek vanaf €200/2 u, groepsdek vanaf €280/2 u; eventjachten programma-gebaseerd. Vanaf drie uur wordt tien procent automatisch en vlak afgetrokken.",
 },
 ],
 howItWorks: {
 heading: "Zo boekt u",
 steps: [
 "Stuur ons datum, tijdstip en groepsgrootte via WhatsApp of telefoon zodat wij de beschikbaarheid kunnen controleren.",
 "Ons team adviseert het juiste jacht voor uw groepsgrootte; speciale wensen (catering, alcohol, DJ, bloemen, taart, fotograaf) worden apart geprijsd.",
 "Na bevestiging wordt uw boeking gegarandeerd met een aanbetaling. Op de dag zelf vertrekt u vanaf Kabataş of een door u gekozen aanlegsteiger.",
 ],
 },
 faqHeading: "Veelgestelde vragen",
 faqs: [
 {
 question: "Hoe lang duurt een jachtcharter?",
 answer:
 "Minimaal twee uur. De vloot werkt in blokken van 2 tot 8 uur; vanaf drie uur wordt tien procent automatisch en vlak afgetrokken.",
 },
 {
 question: "Hoeveel personen kunnen aan boord?",
 answer:
 "Onze vloot omvat zes jachten — van het 10-gasten zeiljacht tot het 150-gasten eventjacht. Wij dragen het passende jacht aan op basis van uw groepsgrootte.",
 },
 {
 question: "Organiseert u huwelijksaanzoeken?",
 answer:
 "Ja. Bloemversiering, taart, een romantische muzieklijst en een professionele fotograaf worden per briefing apart geprijsd. Voor een verrassing vragen wij minimaal 48 uur vooraf bericht.",
 },
 {
 question: "Zijn eten en drinken inbegrepen?",
 answer:
 "Frisdrank, water en lichte snacks horen bij de dekprijs op alle jachten. Volledige menu's, alcohol, barservice, DJ en dansoptredens lopen via een aparte briefing.",
 },
 ],
 tableHeading: "In één oogopslag",
 tableRows: [
 { label: "Duur", value: "2–8 uur (min. 2)" },
 { label: "Vertrek", value: "Kabataş / Beşiktaş / Bebek" },
 { label: "Vanaf-prijs", value: "€200 (klein dek · 2 uur)" },
 { label: "Vloot", value: "6 jachten · 10–150 gasten" },
 { label: "Korting", value: "Vanaf 3 uur tien procent vlak" },
 { label: "Licentie", value: "TÜRSAB A-categorie (sinds 2001)" },
 ],
 ctaWhatsapp: "Contact via WhatsApp",
 ctaPhone: "Bel nu",
 breadcrumbHome: "Home",
 breadcrumbCruise: "Bosporus Cruise",
 breadcrumbCurrent: "Jachtcharter",
 viewInEnglish: "View in English →",
 },
 ru: {
 metaTitle: "Аренда яхты в Стамбуле — от €200 за 2 часа",
 metaDescription:
 "Аренда яхты в Стамбуле от €200. Флот из 6 яхт на 10–150 гостей, минимум 2 часа, фикс. скидка 10% от 3 часов. Капитан и команда включены. Лицензия TÜRSAB.",
 canonicalPath: "/ru/yacht-charter-istanbul",
 title: "Частная аренда яхты в Стамбуле",
 subtitle: "Босфорский сейлинг — 6 яхт, от 10 до 150 гостей, всё судно — для Вас",
 description:
 "MerrySails объединяет аренду яхт и лодок в Стамбуле в одном окне. Флот варьируется от 10-местной яхты для небольших групп до мега-яхты для мероприятий на 150 человек; каждое бронирование закрепляет всё судно за Вашей группой. В цену включены безалкогольные напитки, лёгкие закуски, капитан и команда; при сейлинге от 3 часов автоматически применяется плоская скидка 10%. Питание, алкоголь, DJ и оформление мероприятия оцениваются отдельным бриф-расчётом. Операция под брендом Merry Tourism, лицензия группы А TÜRSAB (№14316) с 2001 года.",
 whyChooseHeading: "Почему стоит выбрать частную аренду яхты в Стамбуле?",
 reasons: [
 {
 title: "Всё судно — Вам",
 desc: "В отличие от совместных круизов, яхта полностью закрепляется за Вашей группой. Вы выбираете маршрут, время отправления и музыку.",
 },
 {
 title: "Идеально для особых поводов",
 desc: "Лучший формат для предложений руки и сердца, дней рождения, юбилеев и корпоративных мероприятий. По запросу — цветочное оформление, торт, фотограф и индивидуальный декор.",
 },
 {
 title: "Прозрачная цена за яхту",
 desc: "Весь флот оценивается за яхту в евро. Малая палуба от €200 за 2 часа, групповая яхта от €280 за 2 часа; яхты для мероприятий — по программе. От 3 часов сейлинга автоматически минус 10%.",
 },
 ],
 howItWorks: {
 heading: "Как бронировать",
 steps: [
 "Напишите нам в WhatsApp или по телефону +90 544 898 98 12 — укажите дату, время и количество гостей для проверки доступности.",
 "Команда подберёт яхту под размер Вашей группы; особые пожелания (питание, алкоголь, DJ, цветы, торт, фотограф) оцениваются отдельной сметой.",
 "После подтверждения и депозита Ваше бронирование закрепляется; в день тура Вы отправляетесь от Кабаташа или запрошенного Вами пирса.",
 ],
 },
 faqHeading: "Часто задаваемые вопросы",
 faqs: [
 {
 question: "Сколько стоит аренда яхты в Стамбуле?",
 answer:
 "Флот начинается от €200 (малая палуба на 10 гостей, 2 часа) и доходит до €1 070 за 8-часовой signature-сейлинг групповой яхты. От 3 часов автоматически применяется плоская скидка 10%. Яхты для мероприятий оцениваются по программе.",
 },
 {
 question: "Чем отличается аренда яхты от аренды лодки?",
 answer:
 "В Турции «аренда яхты» и «аренда лодки» обозначают одну и ту же услугу — частное закрепление судна на Босфоре. В MerrySails мы не разделяем эти понятия: структура флота, вместимость и цена идентичны.",
 },
 {
 question: "Сколько длится аренда яхты?",
 answer:
 "Минимальное время сейлинга — 2 часа. Флот работает блоками от 2 до 8 часов; при бронировании от 3 часов автоматически применяется скидка 10%.",
 },
 {
 question: "Сколько человек поместится на яхте?",
 answer:
 "Флот включает шесть яхт — от 10-местной малой палубы до мега-яхты для мероприятий на 150 человек. Мы подберём яхту под размер Вашей группы.",
 },
 {
 question: "Откуда отправляется яхта?",
 answer:
 "Наши пакеты аренды обычно отправляются от Кабаташа, Бешикташа, Бебека или марины Куручешме. Предпочтительную точку отправления Вы указываете при бронировании.",
 },
 {
 question: "Возможно ли организовать предложение руки и сердца?",
 answer:
 "Да. Цветочное оформление, торт, романтический плейлист и профессиональный фотограф рассчитываются отдельным бриф-расчётом для каждой яхты. Просим сообщать о сюрпризной организации минимум за 48 часов.",
 },
 {
 question: "Как связаться из России?",
 answer:
 "WhatsApp — основной канал связи для гостей из России: переписка на русском, подтверждение брони за несколько минут в рабочее время. Доступен также телефон +90 544 898 98 12. WhatsApp в качестве канала связи для гостей из России мы не используем.",
 },
 ],
 tableHeading: "Краткая информация",
 tableRows: [
 { label: "Длительность", value: "2–8 часов (мин. 2)" },
 { label: "Отправление", value: "Кабаташ / Бешикташ / Бебек" },
 { label: "Стартовая цена", value: "€200 (малая палуба · 2 часа)" },
 { label: "Флот", value: "6 яхт · 10–150 гостей" },
 { label: "Скидка", value: "От 3 часов — плоские 10%" },
 { label: "Лицензия", value: "TÜRSAB группа А (с 2001 года)" },
 ],
 ctaWhatsapp: "Написать в WhatsApp",
 ctaPhone: "Позвонить",
 breadcrumbHome: "Главная",
 breadcrumbCruise: "Круиз по Босфору",
 breadcrumbCurrent: "Аренда яхты",
 viewInEnglish: "View in English →",
 },
 zh: {
 metaTitle: "伊斯坦布尔私人游艇包租 — €200 起 (2 小时)",
 metaDescription:
 "伊斯坦布尔游艇包租 €200 起。6 艘船队 10-150 人,2 小时起,3 小时以上自动 10% 折扣。船长和船员包含。TÜRSAB 许可。中文 WhatsApp。",
 canonicalPath: "/zh/yacht-charter-istanbul",
 title: "伊斯坦布尔私人游艇包租",
 subtitle: "博斯普鲁斯航行 — 6 艘游艇,10 至 150 人,整船仅供您使用",
 description:
 "MerrySails 将伊斯坦布尔游艇和船只租赁整合为一站式服务。船队包括 10 人小型游艇到 150 人活动巨型游艇;每次预订都将整船锁定给您的团队。价格含无酒精饮料、轻食、船长和船员;航行 3 小时以上自动应用 10% 固定折扣。餐饮、酒水、DJ 和活动装饰按单独询价计算。由 Merry Tourism 运营,持有 TÜRSAB A 类许可 (#14316),自 2001 年起。",
 whyChooseHeading: "为什么选择伊斯坦布尔私人游艇包租?",
 reasons: [
 {
 title: "整船仅供您使用",
 desc: "与共享游船不同,游艇完全为您的团队保留。您选择航线、出发时间和音乐 — 适合中国家庭团聚、企业奖励或私密小群。",
 },
 {
 title: "特殊场合的最佳选择",
 desc: "求婚、生日、周年纪念和企业活动的最佳格式。可应要求提供鲜花装饰、生日蛋糕、专业摄影师和个性化布置 — 中国客户最受欢迎的是日落前求婚 + 玫瑰花瓣 + 摄影师套餐。",
 },
 {
 title: "整船透明定价",
 desc: "所有船只均以欧元整船定价。小型甲板 €200 起 2 小时,集团游艇 €280 起 2 小时;活动游艇按项目询价。3 小时以上航行自动减 10%。无人均费用 — 6 人和 8 人价格相同。",
 },
 ],
 howItWorks: {
 heading: "如何预订",
 steps: [
 "通过 WhatsApp +90 544 898 98 12 联系我们 (中文/英文/土耳其语) — 提供日期、时间和客人数量以检查可用性。",
 "团队根据您的团队规模匹配游艇;特殊要求 (餐饮、酒水、DJ、鲜花、蛋糕、摄影师) 按单独清单报价。",
 "确认和定金后 (30% 银行转账),您的预订被锁定;旅游当天您从 Kabataş 或您要求的码头出发。",
 ],
 },
 faqHeading: "常见问题",
 faqs: [
 {
 question: "伊斯坦布尔游艇包租多少钱?",
 answer:
 "船队从 €200 起 (10 人小型甲板,2 小时) 至 €1,070 (8 小时集团游艇签名套餐)。3 小时以上自动应用 10% 固定折扣。活动游艇按项目询价。150 人活动巨型游艇适合大型婚礼或公司活动 — 询价 €5,000+。",
 },
 {
 question: "中国游客如何支付定金?",
 answer:
 "私人游艇包租需要 30% 定金 (银行转账或国际信用卡 Visa/Mastercard)。余款船上支付,接受现金 (EUR/USD/TRY) 或国际信用卡。中国银联、支付宝、微信支付目前不直接受理 — 请使用 Visa/Mastercard 或预先准备欧元现金。WhatsApp 客服可指导付款流程。",
 },
 {
 question: "游艇包租和船只租赁有什么区别?",
 answer:
 "在土耳其,'游艇包租'和'船只租赁'指同一服务 — 在博斯普鲁斯私人锁定船只。MerrySails 不区分这两个概念:船队结构、容量和价格相同。",
 },
 {
 question: "游艇包租持续多久?",
 answer:
 "最低航行时间 2 小时。船队按 2 至 8 小时区块运作;3 小时以上预订自动应用 10% 折扣。日间、日落、夜间出发均可。",
 },
 {
 question: "游艇能容纳多少人?",
 answer:
 "船队包括 6 艘游艇 — 从 10 人小型甲板到 150 人活动巨型游艇。我们根据您的团队规模匹配游艇。30 人以下推荐 Boutique Yacht 10 (€200 起) 或 Group Yacht 36 (€200 起)。",
 },
 {
 question: "游艇从哪里出发?",
 answer:
 "我们的包租套餐通常从 Kabataş、Beşiktaş、Bebek 或 Kuruçeşme Marina 出发。您在预订时指定首选出发地点。Kuruçeşme Marina 通常用于豪华游艇出发,Kabataş 用于标准包租。",
 },
 {
 question: "可以组织求婚吗?",
 answer:
 "可以。鲜花装饰、生日蛋糕、浪漫播放列表和专业摄影师按单独清单为每艘游艇报价。请至少提前 48 小时通知惊喜安排。中国客户最受欢迎的求婚套餐:日落游船 + 玫瑰花瓣 + 香槟 + 摄影师 (1 小时,50+ 张精修照片 7 天内交付) 约 €450-600 加费。",
 },
 {
 question: "船上有中文服务吗?",
 answer:
 "私人游艇可应要求 (提前 48 小时通知,€80 加费) 提供普通话讲解员。船长团队主要使用英文和土耳其语,但许多基本博斯普鲁斯景点知识通过 WhatsApp 提前以中文发送,以便您和您的客人在船上自行了解。",
 },
 ],
 tableHeading: "简要信息",
 tableRows: [
 { label: "时长", value: "2–8 小时 (最低 2)" },
 { label: "出发", value: "Kabataş / Beşiktaş / Bebek / Kuruçeşme" },
 { label: "起价", value: "€200 (小型甲板 · 2 小时)" },
 { label: "船队", value: "6 艘游艇 · 10–150 客人" },
 { label: "折扣", value: "3 小时以上自动 10%" },
 { label: "定金", value: "30% (Visa/MC 或银行转账)" },
 { label: "许可", value: "TÜRSAB A 类 (自 2001 年起)" },
 ],
 ctaWhatsapp: "WhatsApp 中文咨询",
 ctaPhone: "电话联系",
 breadcrumbHome: "首页",
 breadcrumbCruise: "博斯普鲁斯游船",
 breadcrumbCurrent: "游艇包租",
 viewInEnglish: "View in English →",
 },
};

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!yachtTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
 const languages = buildHreflang("/yacht-charter-istanbul");

 return {
 title: t.metaTitle,
 description: t.metaDescription,
 alternates: {
 canonical: canonicalUrl,
 languages,
 },
 openGraph: {
 title: t.metaTitle,
 description: t.metaDescription,
 url: canonicalUrl,
 type: "website",
 images: [{ url: yachtTour.image, width: 1200, height: 630, alt: t.title }],
 },
 twitter: {
 card: "summary_large_image",
 title: t.metaTitle,
 description: t.metaDescription,
 images: [yachtTour.image],
 },
 };
}

export default async function LocaleYachtCharterPage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!yachtTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

 const momentum = await getProductBookingMomentum("yacht-charter-in-istanbul");
 const productLabelByLocale: Record<string, string> = {
 en: "private yacht",
 tr: "özel yat",
 de: "private Yacht",
 fr: "yacht privé",
 nl: "privéjacht",
 ru: "частная яхта",
 zh: "私人游艇",
 };
 const reserveLabelByLocale: Record<string, string> = {
 en: "Quote from €200",
 tr: "€200'den teklif al",
 de: "Angebot ab €200",
 fr: "Devis dès €200",
 nl: "Offerte vanaf €200",
 ru: "Запросить от €200",
 zh: "€280 起报价",
 };
 const whatsappPrefillByLocale: Record<string, string> = {
 en: "Hi MerrySails! I'd like a private yacht charter quote for the Bosphorus. Group size + date if known?",
 tr: "Merhaba MerrySails! Boğaz için özel yat kiralama teklifi istiyorum. Grup büyüklüğü ve tarih (varsa) nedir?",
 de: "Hallo MerrySails! Ich hätte gerne ein Angebot für einen privaten Yacht-Charter auf dem Bosporus. Gruppengröße + Datum (falls bekannt)?",
 fr: "Bonjour MerrySails ! Je souhaite un devis pour la location d'un yacht privé sur le Bosphore. Taille du groupe + date (si connue) ?",
 nl: "Hallo MerrySails! Ik wil een offerte voor privé jachtcharter op de Bosporus. Groepsgrootte + datum (indien bekend)?",
 ru: "Здравствуйте, MerrySails! Прошу прислать смету частной аренды яхты по Босфору. Размер группы и дата (если известно)?",
 zh: "您好,MerrySails!我想咨询博斯普鲁斯私人游艇包租报价。人数和日期(如已确定)?",
 };
 const productLabel = productLabelByLocale[locale] ?? productLabelByLocale.en;
 const reserveLabel = reserveLabelByLocale[locale] ?? reserveLabelByLocale.en;
 const whatsappPrefill = whatsappPrefillByLocale[locale] ?? whatsappPrefillByLocale.en;

 const serviceSchema = {
 "@context": "https://schema.org",
 "@type": ["TouristTrip", "Service"],
 "@id": `${canonicalUrl}#tour`,
 name: t.title,
 alternateName: [
 "İstanbul Yat Kiralama",
 "Özel Yat Turu İstanbul",
 "Boğaz Özel Yat",
 "Istanbul Yacht Charter",
 ],
 description: t.description,
 inLanguage: getBcp47(locale),
 url: canonicalUrl,
 image: yachtTour.image,
 provider: { "@id": `${SITE_URL}/#organization` },
 areaServed: { "@type": "City", name: "İstanbul" },
 offers: {
 "@type": "AggregateOffer",
 lowPrice: getCharterLowestEntryPriceEur(),
 highPrice: getCharterHighestTotalPriceEur(),
 priceCurrency: "EUR",
 offerCount: getCharterFleet().filter((b) => b.bookable).length,
 availability: "https://schema.org/InStock",
 },
 };

 // Separate Product schema for Google Review snippet rich result
 // (Service/TouristTrip parent is not supported per Google's spec)
 const productSchema = {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": `${canonicalUrl}#product`,
 name: t.title,
 description: t.description,
 image: yachtTour.image,
 brand: { "@type": "Brand", name: "MerrySails" },
 sku: `merrysails-yacht-charter-istanbul-${locale}`,
 category: "Private Yacht Charter Istanbul",
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: yachtTour.rating,
 reviewCount: yachtTour.reviewCount,
 bestRating: 5,
 worstRating: 1,
 },
 offers: {
 "@type": "AggregateOffer",
 priceCurrency: "EUR",
 lowPrice: getCharterLowestEntryPriceEur(),
 highPrice: getCharterHighestTotalPriceEur(),
 offerCount: getCharterFleet().filter((b) => b.bookable).length,
 availability: "https://schema.org/InStock",
 seller: { "@id": `${SITE_URL}/#organization` },
 },
 };

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
 {
 "@type": "ListItem",
 position: 2,
 name: t.breadcrumbCruise,
 item: `${SITE_URL}/${locale}/bosphorus-cruise`,
 },
 {
 "@type": "ListItem",
 position: 3,
 name: t.breadcrumbCurrent,
 item: canonicalUrl,
 },
 ],
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 inLanguage: getBcp47(locale),
 mainEntity: t.faqs.map((faq) => ({
 "@type": "Question",
 name: faq.question,
 acceptedAnswer: {
 "@type": "Answer",
 text: faq.answer,
 },
 })),
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
 />
<script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />

 <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
 <div className="container-main">
 <nav
 aria-label="Breadcrumb"
 className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
 >
 <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
 {t.breadcrumbHome}
 </Link>
 <span>/</span>
 <Link
 href={`/${locale}/bosphorus-cruise`}
 className="hover:text-[var(--brand-primary)]"
 >
 {t.breadcrumbCruise}
 </Link>
 <span>/</span>
 <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
 </nav>

 <header className="mb-3 md:mb-4">
 <h1 className="text-2xl md:text-3xl font-bold text-[var(--heading)] mb-1 leading-tight">
 {t.title}
 </h1>
 <p className="text-sm md:text-base text-[var(--text-muted)] line-clamp-2 md:line-clamp-none max-w-3xl">{t.subtitle}</p>
 <QuickAnswer productKey="yacht-charter-istanbul" locale={locale} />
 </header>

 {/* Locale conversion stack */}
 <SocialProofBadges
 variant="product"
 productKey="yacht"
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

 <FleetShowcase
 locale={locale as SiteLocale}
 strings={getFleetStrings(locale as SiteLocale)}
 reservationBasePath={`/${locale}/reservation`}
 yachtTourSlug={yachtTour.slug}
 fleetDetailBasePath={`/${locale}/yacht-charter-istanbul`}
 />

 <div className="my-8">
 <ReviewsCarousel productKey="yacht" locale={locale as SiteLocale} />
 </div>

 <LocaleHelpfulResources locale={locale as SiteLocale} omit="yacht" />

 <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <div className="grid gap-6 md:grid-cols-2">
 <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
 <p>{t.description}</p>
 <p className="text-[var(--heading)] font-medium">
 {locale === "tr"
 ? "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism tarafından sunulmaktadır. 50.000'den fazla misafir ağırlandı."
 : locale === "de"
 ? "Veranstalter Merry Tourism – seit 2001 TÜRSAB-A-Gruppe lizenziert. Über 50.000 Gäste begrüßt."
 : locale === "fr"
 ? "Croisière opérée par Merry Tourism, agréée TÜRSAB Groupe A depuis 2001. Plus de 50 000 clients accueillis."
 : "Aangeboden door Merry Tourism — TÜRSAB A-categorie gecertificeerd sinds 2001. Meer dan 50.000 gasten verwelkomd."}
 </p>
 </div>
 <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
 <div className="bg-[var(--surface-alt)] px-4 py-3 border-b border-[var(--line)]">
 <h2 className="text-sm font-bold text-[var(--heading)]">
 {t.tableHeading}
 </h2>
 </div>
 <table className="w-full border-collapse text-left text-sm">
 <tbody>
 {t.tableRows.map((row) => (
 <tr
 key={row.label}
 className="border-b border-[var(--line)] last:border-b-0"
 >
 <th className="w-44 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">
 {row.label}
 </th>
 <td className="p-3 text-[var(--text-muted)]">{row.value}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>

 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
 {t.whyChooseHeading}
 </h2>
 <div className="grid gap-4 md:grid-cols-3">
 {t.reasons.map((item) => (
 <div
 key={item.title}
 className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
 >
 <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">
 {item.desc}
 </p>
 </div>
 ))}
 </div>

 <div className="mt-6 flex flex-wrap gap-3">
 <a
 href={WHATSAPP_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-primary"
 >
 {t.ctaWhatsapp}
 </a>
 <a
 href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
 className="btn-secondary"
 >
 {t.ctaPhone} — {PHONE_DISPLAY}
 </a>
 </div>
 </section>

 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
 {t.howItWorks.heading}
 </h2>
 <ol className="space-y-3">
 {t.howItWorks.steps.map((step, idx) => (
 <li
 key={idx}
 className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
 >
 <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
 {idx + 1}
 </span>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">{step}</p>
 </li>
 ))}
 </ol>
 </section>

 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.faqHeading}</h2>
 <div className="space-y-4">
 {t.faqs.map((faq) => (
 <details
 key={faq.question}
 className="rounded-xl border border-[var(--line)] p-4"
 >
 <summary className="cursor-pointer font-semibold text-[var(--heading)]">
 {faq.question}
 </summary>
 <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
 {faq.answer}
 </p>
 </details>
 ))}
 </div>
 </section>

 {/* Locale-aware related-guide section. For TR locale, surfaces the
 new yat-kiralama-fiyat-rehberi-2026 pillar (3,800 vol/mo target,
 published 2026-05-10). Without this inbound link the pillar stays
 "Discovered, not indexed" in Google. */}
 {locale === "tr" && (
 <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6">
 <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 Detaylı rehber
 </p>
 <h2 className="mt-2 text-xl font-bold text-[var(--heading)]">
 Yat Kiralama İstanbul Fiyat Rehberi 2026
 </h2>
 <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
 Yat kiralama ile tekne kiralama farkı, paket karşılaştırması, doğum günü ve evlilik teklifi senaryoları,
 kalkış noktaları ve gerçek 2026 fiyatları — hepsi tek rehberde.
 </p>
 <Link
 href="/tr/blog/yat-kiralama-istanbul-fiyat-rehberi-2026"
 className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:underline"
 >
 Rehberi oku
 <span aria-hidden>→</span>
 </Link>
 </div>
 )}

 <div className="mt-8 flex justify-end">
 <Link
 href="/yacht-charter-istanbul"
 className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
 >
 {t.viewInEnglish}
 </Link>
 </div>
 </div>
 </div>
 <StickyMobileCta
 reserveHref={`/${locale}/yacht-charter-istanbul#fleet`}
 reserveLabel={reserveLabel}
 locale={locale as SiteLocale}
 whatsappLocation={`locale_yacht_${locale}`}
 whatsappPrefill={whatsappPrefill}
 />
 </>
 );
}
