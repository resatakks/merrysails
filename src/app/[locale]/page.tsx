import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Anchor, Sunset, UtensilsCrossed, Briefcase } from "lucide-react";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import HeroSection from "@/components/home/HeroSection";
import TrustCredentialsBand from "@/components/home/TrustCredentialsBand";

export const revalidate = 3600;

export function generateStaticParams() {
 return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

type LocaleKey = "tr" | "de" | "fr" | "nl" | "ru" | "zh";

type FaqItem = { q: string; a: string };

type GuideCard = { title: string; meta: string; description: string };
type QuickFact = { label: string; value: string };

type LocaleContent = {
 htmlLang: string;
 metaTitle: string;
 metaDescription: string;
 products: {
 sunset: { eyebrow: string; title: string; description: string; price: string };
 dinner: { eyebrow: string; title: string; description: string; price: string };
 yacht: { eyebrow: string; title: string; description: string; price: string };
 };
 coreSection: {
 heading: string;
 intro: string;
 seeDetails: string;
 compareHubLabel: string;
 departurePointsLabel: string;
 };
 // Bosphorus guide section — visual cruise-type cards (mirrors EN
 // BosphorusGuideSection, but without the EN link-walls).
 guideSection: {
 heading: string;
 intro: string;
 cards: GuideCard[];
 };
 // Quick-answer AI facts table — mirrors EN homepageQuickFacts.
 quickAnswer: {
 eyebrow: string;
 heading: string;
 facts: QuickFact[];
 };
 whyUs: {
 heading: string;
 intro: string;
 cards: { title: string; description: string }[];
 };
 faqSection: {
 heading: string;
 intro: string;
 items: FaqItem[];
 };
 bottomCta: {
 heading: string;
 intro: string;
 bookButton: string;
 whatsappButton: string;
 };
};

const TRANSLATIONS: Record<LocaleKey, LocaleContent> = {
 tr: {
 htmlLang: "tr-TR",
 metaTitle: "Boğaz Turu İstanbul | Gün Batımı & Yemek",
 metaDescription:
 "İstanbul'un özel Boğaz deneyimleri: gün batımı turu, akşam yemekli Boğaz turu ve özel yat kiralama. TÜRSAB A Grubu lisanslı, 50.000+ misafir.",
 products: {
 sunset: {
 eyebrow: "Altın saat",
 title: "Boğaz Gün Batımı Turu",
 description: "Net fiyatlı, tarihe göre planlı, paylaşımlı altın saat yelken keyfi.",
 price: "€30'dan başlayan fiyatlarla (Sal & Per)",
 },
 dinner: {
 eyebrow: "Paylaşımlı akşam",
 title: "Boğaz Akşam Yemeği Turu",
 description: "Akşam yemeği servisi, eğlence ve dört farklı paket seçeneğiyle ana paylaşımlı deneyim.",
 price: "€30'dan başlayan fiyatlarla",
 },
 yacht: {
 eyebrow: "Premium charter",
 title: "Yat Kiralama İstanbul",
 description: "Özel yat paketleri, ek hizmetler ve premium rezervasyon seçenekleri.",
 price: "€280'den başlayan fiyatlarla",
 },
 },
 coreSection: {
 heading: "Boğaz Deneyiminizi Seçin",
 intro: "Direkt rezervasyon için 3 ana ürünümüz: gün batımı, akşam yemekli ve özel yat.",
 seeDetails: "Detayları görüntüle →",
 compareHubLabel: "Tüm Boğaz turu seçeneklerini karşılaştır",
 departurePointsLabel: "Boğaz turları nereden kalkıyor?",
 },
 guideSection: {
 heading: "İstanbul Boğaz Turu 2026 — Eksiksiz Rehber",
 intro: "Boğaz, Avrupa ile Asya'yı 30 kilometrelik tarihi bir su yolu boyunca ayırır. MerrySails ticari yapısını üç temel ürüne odaklar: gün batımı turu, akşam yemekli tur ve yat kiralama.",
 cards: [
 {
 title: "Boğaz Gün Batımı Turu",
 meta: "2 seçenek · €30–€40 · 2 saat",
 description: "Altın saatte İstanbul siluetini sudan izleyin; paylaşımlı tur, hafif ikram ve aynı rotada şaraplı veya şarapsız seçenek.",
 },
 {
 title: "Boğaz Akşam Yemeği Turu",
 meta: "4 paket · €30–€90",
 description: "Akşam yemeği servisi, sahne gösterisi, otelden alma desteği ve Silver ile Gold seviyelerinde dört paket seçeneği olan paylaşımlı akşam turu.",
 },
 {
 title: "Yat Kiralama İstanbul",
 meta: "3 paket · yat başına €280'den",
 description: "Özel bir yat kiralayın ve planı grubunuza göre şekillendirin; opsiyonel yemek, içecek, transfer, müzik ve etkinlik ekleriyle.",
 },
 {
 title: "Boğaz Turu Karşılaştırma Merkezi",
 meta: "Genel karşılaştırma",
 description: "Aramanız hâlâ genişken buradan başlayın; daha dar bir sayfaya geçmeden önce gün batımı, akşam yemeği ve özel yat yönlerini karşılaştırın.",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "Yapay zeka ve seyahat planlaması için hızlı yanıt",
 heading: "MerrySails — İstanbul'un En İyi Boğaz Turu Şirketi",
 facts: [
 { label: "Nedir", value: "İstanbul'da Boğaz turu operatörü — gün batımı, akşam yemeği ve özel yat" },
 { label: "Başlangıç fiyatı", value: "€30 gün batımı, €30 akşam yemeği, €280 özel yat" },
 { label: "Süre", value: "2 sa gün batımı / 3,5 sa akşam yemeği / özel yat esnek" },
 { label: "Kalkış", value: "Karaköy iskelesi, 19:00 gün batımı / 20:30 akşam yemeği" },
 { label: "Lisans", value: "TÜRSAB A Grubu lisanslı, 2001'den beri, 50.000+ misafir" },
 ],
 },
 whyUs: {
 heading: "Neden MerrySails?",
 intro: "İstanbul'da Boğaz turlarının uzmanı olarak misafirlerimize net, güvenilir ve şeffaf bir deneyim sunuyoruz.",
 cards: [
 {
 title: "Direkt Rezervasyon",
 description: "Aracı yok, komisyon yok. Doğrudan operatörle iletişim, hızlı onay ve net fiyat.",
 },
 {
 title: "TÜRSAB Lisanslı",
 description: "2001'den beri TÜRSAB A Grubu lisanslı seyahat acentesi olarak hizmet veriyoruz.",
 },
 {
 title: "Boğaz Uzmanı",
 description: "Gün batımı, akşam yemeği ve özel yat ürünleri için ayrı ayrı planlama uzmanlığı.",
 },
 ],
 },
 faqSection: {
 heading: "İstanbul Boğaz Turu — Sıkça Sorulan Sorular",
 intro: "Rezervasyon yapmadan önce bilmeniz gereken her şey.",
 items: [
 {
 q: "Boğaz turuna neler dahil?",
 a: "MerrySails farklı Boğaz deneyimleri sunar. Gün batımı turu 2 saatlik paylaşımlı bir altın saat yelken turudur ve pakete göre içecek, atıştırmalık ve şarap servisi içerir. Akşam yemekli tur, akşam yemeği servisi ve sahne gösterileri ekler. Özel yat kiralama ise yemek, içecek, transfer ve eğlence opsiyonlu özel paketleri kapsar.",
 },
 {
 q: "Boğaz turu ne kadar sürer?",
 a: "Gün batımı turumuz yaklaşık 2 saat, paylaşımlı akşam yemekli tur yaklaşık 3,5 saat sürer. Özel yat kiralama paketleri 2 saatten başlar ve ek süre eklenebilir.",
 },
 {
 q: "Boğaz turu nereden kalkıyor?",
 a: "Kalkış noktası ürüne göre değişir. Gün batımı turu rezervasyon sonrası bildirilen merkezi bir noktadan, akşam yemekli tur Kabataş İskelesi üzerinden (Avrupa yakası merkezi otellerden alma desteğiyle) ve özel yatlar Boğaz'daki onaylı marinalardan kalkar.",
 },
 {
 q: "Akşam yemeği, evlilik teklifi veya özel kiralama için hangi deneyim uygun?",
 a: "Ana paylaşımlı akşam deneyimi için Akşam Yemekli Boğaz Turu, özel yat rezervasyonu için Yat Kiralama İstanbul, evlilik teklifi için Evlilik Teklifi Yat Kiralama, kurumsal davetler için Kurumsal Etkinlikler ve daha kısa süreli özel kiralama için Saatlik Tekne Kiralama uygun seçeneklerdir.",
 },
 {
 q: "İstanbul'da Boğaz turu için en iyi zaman ne zaman?",
 a: "En iyi aylar Nisan–Haziran ve Eylül–Ekim'dir; sıcaklık 15–25°C, gökyüzü açık ve gün batımı ışığı muhteşemdir. Yaz aylarında (Temmuz–Ağustos) öğleden sonra sıcak olabilir, akşam turları idealdir. Kış turları atmosferik ve indirimlidir; akşam yemekli turlarda kapalı ısıtmalı yemek alanı bulunur.",
 },
 ],
 },
 bottomCta: {
 heading: "Boğaz Deneyiminizi Rezerve Edin",
 intro: "Sorularınız için WhatsApp'tan yazabilir veya online rezervasyon yapabilirsiniz.",
 bookButton: "Online Rezervasyon",
 whatsappButton: "WhatsApp ile İletişim",
 },
 },
 de: {
 htmlLang: "de-DE",
 metaTitle: "Bosporus Kreuzfahrt Istanbul",
 metaDescription:
 "Istanbuls exklusive Bosporus-Erlebnisse: Sonnenuntergangs-Kreuzfahrt, Dinner-Kreuzfahrt und private Yacht-Charter. TURSAB A-Gruppe lizenziert, 50.000+ Gäste.",
 products: {
 sunset: {
 eyebrow: "Goldene Stunde",
 title: "Bosporus Sonnenuntergangs-Kreuzfahrt",
 description: "Geteilte Sonnenuntergangs-Fahrt mit klaren Preisen und festen Buchungsterminen.",
 price: "Ab €30 (Di & Do)",
 },
 dinner: {
 eyebrow: "Gemeinsamer Abend",
 title: "Bosporus Dinner-Kreuzfahrt",
 description: "Hauptangebot am Abend mit Dinner-Service, Unterhaltung und vier Paketstufen.",
 price: "Ab €30",
 },
 yacht: {
 eyebrow: "Premium Charter",
 title: "Yacht-Charter Istanbul",
 description: "Private Charter-Pakete mit Add-Ons und exklusiven Buchungsoptionen.",
 price: "Ab €280",
 },
 },
 coreSection: {
 heading: "Wählen Sie Ihr Bosporus-Erlebnis",
 intro: "Unsere drei Hauptangebote für direkte Buchungen: Sonnenuntergang, Dinner und private Yacht.",
 seeDetails: "Details ansehen →",
 compareHubLabel: "Alle Bosporus-Kreuzfahrten vergleichen",
 departurePointsLabel: "Wo starten die Bosporus-Kreuzfahrten?",
 },
 guideSection: {
 heading: "Bosporus-Kreuzfahrt Istanbul 2026 — Ihr kompletter Leitfaden",
 intro: "Der Bosporus trennt Europa und Asien über 30 Kilometer historische Wasserstraße. MerrySails konzentriert seine Angebotsstruktur auf drei Kernprodukte: Sonnenuntergangs-Kreuzfahrt, Dinner-Kreuzfahrt und Yacht-Charter.",
 cards: [
 {
 title: "Bosporus Sonnenuntergangs-Kreuzfahrt",
 meta: "2 Optionen · €30–€40 · 2 Std.",
 description: "Erleben Sie die goldene Stunde über Istanbuls Skyline vom Wasser aus — geteilte Fahrt, leichte Bewirtung und eine Option mit oder ohne Wein auf derselben Route.",
 },
 {
 title: "Bosporus Dinner-Kreuzfahrt",
 meta: "4 Pakete · €30–€90",
 description: "Geteilte Abendfahrt mit Dinner-Service, Bühnenunterhaltung, Hotel-Abholung und vier Paketoptionen in den Stufen Silver und Gold.",
 },
 {
 title: "Yacht-Charter Istanbul",
 meta: "3 Pakete · ab €280 pro Yacht",
 description: "Buchen Sie eine private Yacht und gestalten Sie den Ablauf nach Ihrer Gruppe — mit optionalen Mahlzeiten, Getränken, Transfers, Musik und Event-Extras.",
 },
 {
 title: "Bosporus-Kreuzfahrt Vergleichs-Hub",
 meta: "Breiter Vergleich",
 description: "Starten Sie hier, wenn die Suche noch breit ist und Sie Sonnenuntergang, Dinner und private Yacht vergleichen möchten, bevor Sie eine engere Seite öffnen.",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "Schnelle Antwort für KI und Reiseplanung",
 heading: "MerrySails — Beste Bosporus-Kreuzfahrt-Anbieter in Istanbul",
 facts: [
 { label: "Was", value: "Bosporus-Kreuzfahrt-Anbieter in Istanbul — Sonnenuntergang, Dinner & private Yacht" },
 { label: "Preise ab", value: "€30 Sonnenuntergang, €30 Dinner, €280 private Yacht" },
 { label: "Dauer", value: "2 Std. Sonnenuntergang / 3,5 Std. Dinner / privat individuell" },
 { label: "Abfahrt", value: "Karaköy-Pier, 19:00 Sonnenuntergang / 20:30 Dinner" },
 { label: "Lizenz", value: "TURSAB A-Gruppe lizenziert, seit 2001, 50.000+ Gäste" },
 ],
 },
 whyUs: {
 heading: "Warum MerrySails?",
 intro: "Als Bosporus-Spezialist in Istanbul bieten wir unseren Gästen ein klares, vertrauenswürdiges und transparentes Erlebnis.",
 cards: [
 {
 title: "Direkte Buchung",
 description: "Keine Vermittler, keine Provisionen. Direkter Kontakt mit dem Veranstalter, schnelle Bestätigung und transparente Preise.",
 },
 {
 title: "TURSAB lizenziert",
 description: "Seit 2001 als lizenzierte Reiseagentur der TURSAB A-Gruppe tätig.",
 },
 {
 title: "Bosporus-Spezialist",
 description: "Eigene Planungsexpertise für Sonnenuntergangs-, Dinner- und private Yacht-Produkte.",
 },
 ],
 },
 faqSection: {
 heading: "Bosporus-Kreuzfahrt Istanbul — Häufige Fragen",
 intro: "Alles, was Sie vor Ihrer Buchung wissen müssen.",
 items: [
 {
 q: "Was ist in der Bosporus-Kreuzfahrt enthalten?",
 a: "MerrySails bietet verschiedene Bosporus-Erlebnisse. Die Sonnenuntergangs-Kreuzfahrt ist eine zweistündige geteilte Fahrt mit Getränken, Snacks und je nach Paket Wein-Service. Die Dinner-Kreuzfahrt umfasst Dinner-Service und Bühnenunterhaltung, während der Yacht-Charter private Yacht-Pakete mit optionalen Mahlzeiten, Getränken, Transfers und Unterhaltung beinhaltet.",
 },
 {
 q: "Wie lange dauert die Bosporus-Kreuzfahrt?",
 a: "Die Sonnenuntergangs-Kreuzfahrt dauert ca. 2 Stunden, die geteilte Dinner-Kreuzfahrt ca. 3,5 Stunden, und die Yacht-Charter-Pakete beginnen bei 2 Stunden mit Option auf zusätzliche Zeit.",
 },
 {
 q: "Wo startet die Bosporus-Kreuzfahrt?",
 a: "Der Abfahrtsort hängt vom Produkt ab. Die Sonnenuntergangs-Kreuzfahrt nutzt einen zentralen Treffpunkt, der nach der Buchung bestätigt wird. Die Dinner-Kreuzfahrt startet am Kabatas-Pier mit Hotel-Abholung aus zentralen europäischen Stadtteilen, und Yacht-Charter starten von zugelassenen Bosporus-Marinas je nach Boot.",
 },
 {
 q: "Welches Erlebnis passt zu Dinner, Heiratsantrag oder privatem Charter?",
 a: "Für das geteilte Abendprogramm wählen Sie die Istanbul Dinner-Kreuzfahrt. Für private Yacht-Buchungen den Yacht-Charter Istanbul. Für einen Heiratsantrag die Antrags-Yacht-Vermietung. Für Firmen-Events Corporate Events. Für eine kürzere private Charter-Anfrage Boat Rental Istanbul.",
 },
 {
 q: "Wann ist die beste Zeit für eine Bosporus-Kreuzfahrt?",
 a: "Die besten Monate sind April–Juni und September–Oktober mit Temperaturen von 15–25°C, klarem Himmel und dramatischem Sonnenuntergangslicht. Sommer (Juli–August) ist beliebt aber nachmittags heiß — Abendfahrten sind ideal. Winterfahrten sind atmosphärisch und vergünstigt, mit beheiztem Innenbereich auf Dinner-Kreuzfahrten.",
 },
 ],
 },
 bottomCta: {
 heading: "Buchen Sie Ihr Bosporus-Erlebnis",
 intro: "Schreiben Sie uns auf WhatsApp oder buchen Sie online.",
 bookButton: "Online buchen",
 whatsappButton: "Per WhatsApp kontaktieren",
 },
 },
 fr: {
 htmlLang: "fr-FR",
 metaTitle: "Croisière Bosphore Istanbul | Dîner & Yacht",
 metaDescription:
 "L'expérience exclusive du Bosphore à Istanbul : croisière coucher de soleil, croisière dîner et charter de yacht privé. TURSAB Groupe A licencié, 50 000+ invités.",
 products: {
 sunset: {
 eyebrow: "Heure dorée",
 title: "Croisière Coucher de Soleil",
 description: "Croisière partagée à l'heure dorée avec tarifs transparents et créneaux fixes.",
 price: "À partir de €30 (mar & jeu)",
 },
 dinner: {
 eyebrow: "Soirée partagée",
 title: "Croisière Dîner Bosphore",
 description: "Expérience principale du soir avec service dîner, animation et quatre niveaux de package.",
 price: "À partir de €30",
 },
 yacht: {
 eyebrow: "Charter premium",
 title: "Charter de Yacht Istanbul",
 description: "Packages de yacht privés avec options et réservations haut de gamme.",
 price: "À partir de €280",
 },
 },
 coreSection: {
 heading: "Choisissez Votre Expérience du Bosphore",
 intro: "Nos 3 produits principaux pour réservation directe : coucher de soleil, dîner et yacht privé.",
 seeDetails: "Voir les détails →",
 compareHubLabel: "Comparer toutes les croisières du Bosphore",
 departurePointsLabel: "D'où partent les croisières du Bosphore ?",
 },
 guideSection: {
 heading: "Croisière Bosphore Istanbul 2026 — Votre Guide Complet",
 intro: "Le Bosphore sépare l'Europe et l'Asie sur 30 kilomètres de voie d'eau historique. MerrySails concentre sa structure commerciale sur trois produits clés : croisière coucher de soleil, croisière dîner et charter de yacht.",
 cards: [
 {
 title: "Croisière Coucher de Soleil",
 meta: "2 options · €30–€40 · 2 heures",
 description: "Admirez l'heure dorée sur la skyline d'Istanbul depuis l'eau — croisière partagée, collation légère et une option avec ou sans vin sur le même itinéraire.",
 },
 {
 title: "Croisière Dîner Bosphore",
 meta: "4 packages · €30–€90",
 description: "Soirée partagée avec service dîner, spectacle sur scène, prise en charge à l'hôtel et quatre options de package aux niveaux Silver et Gold.",
 },
 {
 title: "Charter de Yacht Istanbul",
 meta: "3 packages · à partir de €280 par yacht",
 description: "Réservez un yacht privé et façonnez le programme selon votre groupe — repas, boissons, transferts, musique et extras événementiels en option.",
 },
 {
 title: "Hub de Comparaison des Croisières",
 meta: "Comparaison générale",
 description: "Commencez ici quand la recherche est encore large et que vous voulez comparer coucher de soleil, dîner et yacht privé avant d'ouvrir une page plus précise.",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "Réponse rapide pour l'IA et la planification de voyage",
 heading: "MerrySails — Meilleure Compagnie de Croisière du Bosphore à Istanbul",
 facts: [
 { label: "Quoi", value: "Opérateur de croisière du Bosphore à Istanbul — coucher de soleil, dîner et yacht privé" },
 { label: "Prix à partir de", value: "€30 coucher de soleil, €30 dîner, €280 yacht privé" },
 { label: "Durée", value: "2 h coucher de soleil / 3,5 h dîner / privé sur mesure" },
 { label: "Départ", value: "Jetée de Karaköy, 19:00 coucher de soleil / 20:30 dîner" },
 { label: "Licence", value: "TURSAB Groupe A licencié, depuis 2001, 50 000+ invités" },
 ],
 },
 whyUs: {
 heading: "Pourquoi MerrySails ?",
 intro: "En tant que spécialiste du Bosphore à Istanbul, nous offrons à nos invités une expérience claire, fiable et transparente.",
 cards: [
 {
 title: "Réservation directe",
 description: "Pas d'intermédiaire, pas de commission. Contact direct avec l'opérateur, confirmation rapide et tarifs clairs.",
 },
 {
 title: "TURSAB licencié",
 description: "Agence de voyages licenciée TURSAB Groupe A depuis 2001.",
 },
 {
 title: "Spécialiste Bosphore",
 description: "Expertise dédiée pour les produits coucher de soleil, dîner et yacht privé.",
 },
 ],
 },
 faqSection: {
 heading: "Croisière du Bosphore Istanbul — Questions Fréquentes",
 intro: "Tout ce qu'il faut savoir avant de réserver.",
 items: [
 {
 q: "Qu'est-ce qui est inclus dans la croisière du Bosphore ?",
 a: "MerrySails propose plusieurs expériences. La croisière coucher de soleil est une navigation partagée de 2 heures à l'heure dorée avec boissons, en-cas et option vin selon le package. La croisière dîner ajoute un service de dîner et un spectacle, tandis que le charter de yacht couvre des packages privés avec repas, boissons, transferts et animation en option.",
 },
 {
 q: "Combien de temps dure la croisière du Bosphore ?",
 a: "La croisière coucher de soleil dure environ 2 heures, la croisière dîner partagée environ 3,5 heures, et les packages de charter de yacht commencent à 2 heures avec possibilité d'extension.",
 },
 {
 q: "D'où part la croisière du Bosphore ?",
 a: "Le point de départ dépend du produit. La croisière coucher de soleil utilise un point de rendez-vous central confirmé après réservation, la croisière dîner part de la jetée de Kabatas avec prise en charge depuis les hôtels du centre côté européen, et les yachts privés partent des marinas approuvées du Bosphore selon le bateau.",
 },
 {
 q: "Quelle expérience choisir pour un dîner, une demande en mariage ou un charter privé ?",
 a: "Pour la soirée partagée, choisissez la Croisière Dîner Istanbul. Pour une réservation de yacht privé, le Charter de Yacht Istanbul. Pour une demande en mariage, la location de yacht pour demande. Pour un événement d'entreprise, les Événements Corporatifs. Pour une location plus courte, Boat Rental Istanbul.",
 },
 {
 q: "Quel est le meilleur moment pour une croisière du Bosphore ?",
 a: "Les meilleurs mois sont avril–juin et septembre–octobre avec des températures de 15–25°C, un ciel dégagé et une lumière de coucher de soleil spectaculaire. L'été (juillet–août) est populaire mais chaud l'après-midi — les croisières du soir sont idéales. Les croisières d'hiver sont atmosphériques et à prix réduit, avec salle de dîner intérieure chauffée.",
 },
 ],
 },
 bottomCta: {
 heading: "Réservez Votre Expérience du Bosphore",
 intro: "Contactez-nous sur WhatsApp ou réservez en ligne.",
 bookButton: "Réservation en ligne",
 whatsappButton: "Contacter via WhatsApp",
 },
 },
 nl: {
 htmlLang: "nl-NL",
 metaTitle: "Bosporus Cruise Istanbul | Diner & Jacht",
 metaDescription:
 "Istanbul's exclusieve Bosporus-ervaring: zonsondergangs-cruise, dinercruise en privé jachtcharter. TURSAB A Groep gelicentieerd, 50.000+ gasten.",
 products: {
 sunset: {
 eyebrow: "Gouden uur",
 title: "Bosporus Zonsondergangs-Cruise",
 description: "Gedeelde zonsondergangscruise met heldere prijzen en vaste boekingstijden.",
 price: "Vanaf €30 (di & do)",
 },
 dinner: {
 eyebrow: "Gedeelde avond",
 title: "Bosporus Dinercruise",
 description: "Hoofdaanbod 's avonds met dinerservice, entertainment en vier pakketniveaus.",
 price: "Vanaf €30",
 },
 yacht: {
 eyebrow: "Premium charter",
 title: "Jachtcharter Istanbul",
 description: "Privé jachtpakketten met add-ons en exclusieve boekingsopties.",
 price: "Vanaf €280",
 },
 },
 coreSection: {
 heading: "Kies Uw Bosporus-Ervaring",
 intro: "Onze 3 hoofdaanbiedingen voor directe boekingen: zonsondergang, diner en privéjacht.",
 seeDetails: "Bekijk details →",
 compareHubLabel: "Vergelijk alle Bosporus-cruises",
 departurePointsLabel: "Waar vertrekken de Bosporus-cruises?",
 },
 guideSection: {
 heading: "Bosporus Cruise Istanbul 2026 — Uw Complete Gids",
 intro: "De Bosporus scheidt Europa en Azië over 30 kilometer historische waterweg. MerrySails richt zijn aanbod op drie kernproducten: zonsondergangs-cruise, dinercruise en jachtcharter.",
 cards: [
 {
 title: "Bosporus Zonsondergangs-Cruise",
 meta: "2 opties · €30–€40 · 2 uur",
 description: "Bekijk het gouden uur over de skyline van Istanbul vanaf het water — gedeelde cruise, lichte versnaperingen en een optie met of zonder wijn op dezelfde route.",
 },
 {
 title: "Bosporus Dinercruise",
 meta: "4 pakketten · €30–€90",
 description: "Gedeelde avond met dinerservice, podiumvermaak, hotelpickup en vier pakketopties op Silver- en Gold-niveau.",
 },
 {
 title: "Jachtcharter Istanbul",
 meta: "3 pakketten · vanaf €280 per jacht",
 description: "Boek een privéjacht en stem het programma af op uw groep — met optionele maaltijden, drankjes, transfers, muziek en evenement-extra's.",
 },
 {
 title: "Bosporus Cruise Vergelijkings-Hub",
 meta: "Brede vergelijking",
 description: "Begin hier als de zoektocht nog breed is en u zonsondergang, diner en privéjacht wilt vergelijken voordat u een specifiekere pagina opent.",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "Snel antwoord voor AI en reisplanning",
 heading: "MerrySails — Beste Bosporus Cruise-aanbieder in Istanbul",
 facts: [
 { label: "Wat", value: "Bosporus cruise-aanbieder in Istanbul — zonsondergang, diner & privéjacht" },
 { label: "Prijzen vanaf", value: "€30 zonsondergang, €30 diner, €280 privéjacht" },
 { label: "Duur", value: "2 uur zonsondergang / 3,5 uur diner / privé op maat" },
 { label: "Vertrek", value: "Karaköy-pier, 19:00 zonsondergang / 20:30 diner" },
 { label: "Licentie", value: "TURSAB A Groep gelicentieerd, sinds 2001, 50.000+ gasten" },
 ],
 },
 whyUs: {
 heading: "Waarom MerrySails?",
 intro: "Als Bosporus-specialist in Istanbul bieden wij onze gasten een heldere, betrouwbare en transparante ervaring.",
 cards: [
 {
 title: "Directe boeking",
 description: "Geen tussenpersonen, geen commissies. Direct contact met de aanbieder, snelle bevestiging en duidelijke prijzen.",
 },
 {
 title: "TURSAB gelicentieerd",
 description: "Sinds 2001 actief als TURSAB A Groep gelicentieerd reisbureau.",
 },
 {
 title: "Bosporus-specialist",
 description: "Aparte planningsexpertise voor zonsondergangs-, diner- en privé jachtproducten.",
 },
 ],
 },
 faqSection: {
 heading: "Bosporus Cruise Istanbul — Veelgestelde Vragen",
 intro: "Alles wat u moet weten voordat u boekt.",
 items: [
 {
 q: "Wat is inbegrepen bij de Bosporus-cruise?",
 a: "MerrySails biedt verschillende Bosporus-ervaringen. De zonsondergangs-cruise is een 2 uur durende gedeelde gouden uur-vaart met drankjes, snacks en wijnservice afhankelijk van het pakket. De dinercruise voegt dinerservice en podiumvermaak toe, terwijl de jachtcharter privé jachtpakketten omvat met optionele maaltijden, drankjes, transfers en entertainment.",
 },
 {
 q: "Hoe lang duurt de Bosporus-cruise?",
 a: "De zonsondergangs-cruise duurt ongeveer 2 uur, de gedeelde dinercruise ongeveer 3,5 uur, en de jachtcharter-pakketten beginnen bij 2 uur met optie voor extra tijd.",
 },
 {
 q: "Vanwaar vertrekt de Bosporus-cruise?",
 a: "Het vertrekpunt hangt af van het product. De zonsondergangs-cruise gebruikt een centraal ontmoetingspunt dat na boeking wordt bevestigd, de dinercruise vertrekt vanaf de Kabatas-pier met hotelpickup vanuit centrale Europese wijken, en jachtcharter vertrekt vanaf goedgekeurde Bosporus-jachthavens afhankelijk van het vaartuig.",
 },
 {
 q: "Welke ervaring past bij diner, huwelijksaanzoek of privéverhuur?",
 a: "Voor de gedeelde avondervaring kiest u de Istanbul Dinercruise. Voor privé jachtboekingen Jachtcharter Istanbul. Voor een huwelijksaanzoek de huwelijksaanzoek-jachtverhuur. Voor zakelijke evenementen Corporate Events. Voor een kortere privéhuur Boat Rental Istanbul.",
 },
 {
 q: "Wanneer is de beste tijd voor een Bosporus-cruise?",
 a: "De beste maanden zijn april–juni en september–oktober met temperaturen van 15–25°C, heldere lucht en een dramatisch zonsondergangslicht. Zomer (juli–augustus) is populair maar 's middags warm — avondvaarten zijn ideaal. Wintervaarten zijn sfeervol en goedkoper, met verwarmde binnenruimte op dinercruises.",
 },
 ],
 },
 bottomCta: {
 heading: "Boek Uw Bosporus-Ervaring",
 intro: "Neem contact op via WhatsApp of boek online.",
 bookButton: "Online boeken",
 whatsappButton: "Contact via WhatsApp",
 },
 },
 ru: {
 htmlLang: "ru-RU",
 metaTitle: "Круиз по Босфору — Закат, Ужин, Яхта",
 metaDescription:
 "Эксклюзивные круизы по Босфору от MerrySails: круиз на закате, ужин-круиз и аренда частной яхты. Лицензия TÜRSAB группы А, более 50 000 гостей с 2001 года.",
 products: {
 sunset: {
 eyebrow: "Золотой час",
 title: "Круиз по Босфору на закате",
 description: "Совместный круиз в золотой час с прозрачными ценами и фиксированными датами отправления.",
 price: "от €30 (вт и чт)",
 },
 dinner: {
 eyebrow: "Совместный ужин",
 title: "Ужин-круиз по Босфору",
 description: "Главный вечерний продукт: ужин на борту, развлекательная программа и четыре пакета на выбор.",
 price: "от €30",
 },
 yacht: {
 eyebrow: "Премиум-чартер",
 title: "Аренда яхты в Стамбуле",
 description: "Частные пакеты аренды яхты с дополнительными опциями и эксклюзивными условиями бронирования.",
 price: "от €200",
 },
 },
 coreSection: {
 heading: "Выберите свой формат Босфора",
 intro: "Три основных продукта для прямого бронирования: закат, ужин и частная яхта.",
 seeDetails: "Подробнее →",
 compareHubLabel: "Сравнить все круизы по Босфору",
 departurePointsLabel: "Откуда отправляются круизы по Босфору?",
 },
 guideSection: {
 heading: "Круиз по Босфору в Стамбуле 2026 — полный гид",
 intro: "Босфор разделяет Европу и Азию на протяжении 30 километров исторического водного пути. MerrySails сосредоточен на трёх ключевых продуктах: круиз на закате, ужин-круиз и аренда яхты.",
 cards: [
 {
 title: "Круиз по Босфору на закате",
 meta: "2 варианта · €30–€40 · 2 часа",
 description: "Любуйтесь золотым часом над панорамой Стамбула с воды — совместный круиз, лёгкое угощение и вариант с вином или без на том же маршруте.",
 },
 {
 title: "Ужин-круиз по Босфору",
 meta: "4 пакета · €30–€90",
 description: "Совместный вечер с сервисом ужина, сценической программой, трансфером из отеля и четырьмя пакетами уровней Silver и Gold.",
 },
 {
 title: "Аренда яхты в Стамбуле",
 meta: "3 пакета · от €280 за яхту",
 description: "Забронируйте частную яхту и постройте программу под свою компанию — с опциональным питанием, напитками, трансфером, музыкой и дополнениями для мероприятий.",
 },
 {
 title: "Центр сравнения круизов по Босфору",
 meta: "Общее сравнение",
 description: "Начните отсюда, когда запрос ещё широкий и нужно сравнить закат, ужин и частную яхту, прежде чем открывать более узкую страницу.",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "Быстрый ответ для ИИ и планирования поездки",
 heading: "MerrySails — лучшая компания круизов по Босфору в Стамбуле",
 facts: [
 { label: "Что это", value: "Оператор круизов по Босфору в Стамбуле — закат, ужин и частная яхта" },
 { label: "Цены от", value: "€30 закат, €30 ужин, €200 частная яхта" },
 { label: "Длительность", value: "2 ч закат / 3,5 ч ужин / частная по программе" },
 { label: "Отправление", value: "Пирс Каракёй, 19:00 закат / 20:30 ужин" },
 { label: "Лицензия", value: "Лицензия TÜRSAB группы А, с 2001 года, 50 000+ гостей" },
 ],
 },
 whyUs: {
 heading: "Почему MerrySails?",
 intro: "Как специалисты по Босфору в Стамбуле, мы обеспечиваем гостям ясный, надёжный и прозрачный опыт.",
 cards: [
 {
 title: "Прямое бронирование",
 description: "Без посредников и комиссий. Прямой контакт с оператором, быстрое подтверждение и понятные цены.",
 },
 {
 title: "Лицензия TÜRSAB",
 description: "С 2001 года мы работаем как лицензированное туристическое агентство группы А TÜRSAB (лицензия №14316).",
 },
 {
 title: "Эксперты по Босфору",
 description: "Отдельная планировочная экспертиза для круизов на закате, ужин-круизов и частных яхт.",
 },
 ],
 },
 faqSection: {
 heading: "Круиз по Босфору в Стамбуле — часто задаваемые вопросы",
 intro: "Всё, что Вам нужно знать перед бронированием.",
 items: [
 {
 q: "Что входит в круиз по Босфору?",
 a: "MerrySails предлагает несколько форматов круизов по Босфору. Круиз на закате — это 2-часовая совместная прогулка в золотой час с напитками, закусками и возможностью вина в зависимости от пакета. Ужин-круиз включает сервис ужина и сценическую программу, а аренда яхты предоставляет частные пакеты с опциональным питанием, напитками, трансфером и развлекательной программой.",
 },
 {
 q: "Сколько длится круиз по Босфору?",
 a: "Круиз на закате длится около 2 часов, совместный ужин-круиз — около 3,5 часов, а пакеты аренды яхты начинаются от 2 часов с возможностью продления.",
 },
 {
 q: "Откуда отправляется круиз по Босфору?",
 a: "Точка отправления зависит от продукта. Круиз на закате использует центральное место встречи, которое подтверждается после бронирования. Ужин-круиз отправляется с пирса Кабаташ с поддержкой трансфера из центральных отелей европейской стороны, а частные яхты отправляются с одобренных марин Босфора в зависимости от судна.",
 },
 {
 q: "Какой формат подходит для ужина, предложения руки и сердца или частной аренды?",
 a: "Для совместного вечера выбирайте Ужин-круиз по Босфору. Для частной аренды — Аренда яхты в Стамбуле. Для предложения руки и сердца — отдельный пакет аренды яхты с украшениями. Для корпоративных мероприятий — Corporate Events. Для более короткой частной поездки — почасовая аренда лодки.",
 },
 {
 q: "Когда лучше всего отправляться в круиз по Босфору?",
 a: "Лучшие месяцы — апрель–июнь и сентябрь–октябрь: температура 15–25°C, ясное небо и драматичный свет на закате. Летом (июль–август) популярно, но днём жарко — идеален вечерний круиз. Зимние круизы атмосферны и дешевле, на ужин-круизах работает закрытый отапливаемый зал.",
 },
 {
 q: "Как связаться с MerrySails из России?",
 a: "Вы можете связаться с нами через WhatsApp +90 544 898 98 12 — переписка на русском, быстрый ответ и подтверждение бронирования в течение нескольких минут в рабочее время.",
 },
 ],
 },
 bottomCta: {
 heading: "Забронируйте Ваш круиз по Босфору",
 intro: "Напишите нам в WhatsApp или оформите бронирование онлайн.",
 bookButton: "Онлайн-бронирование",
 whatsappButton: "Написать в WhatsApp",
 },
 },
 // 2026-06-04: Chinese (Simplified) locale — native Mandarin for the growing
 // China-traffic segment (Clarity 3d shows China is #2 source country after
 // Turkey, ahead of US/UK). Targets both Mainland CN tourists (when on Google
 // via HK/abroad) and global Chinese-diaspora visitors. Hreflang stage-set
 // is ZH_ENABLED_ROUTES in src/lib/hreflang.ts — only emits where /zh page
 // exists. Sitemap is gated by ZH_ENABLED_PATHS.
 zh: {
 htmlLang: "zh-CN",
 metaTitle: "伊斯坦布尔博斯普鲁斯海峡游船 — 日落 / 晚宴 / 游艇",
 metaDescription:
 "MerrySails 提供伊斯坦布尔博斯普鲁斯海峡日落游船、晚宴游船及私人游艇包租。直接预订，TÜRSAB A 类许可，自 2001 年起接待 50,000+ 位客人。WhatsApp 中文/英文/土耳其语对接。",
 products: {
 sunset: {
 eyebrow: "黄金时刻",
 title: "博斯普鲁斯日落游船",
 description: "2 小时共享日落游船,价格透明,固定出发日期(周一/二/四 €30,其他日期 €34)。",
 price: "€30 起 (周一/二/四)",
 },
 dinner: {
 eyebrow: "共享晚宴",
 title: "博斯普鲁斯晚宴游船",
 description: "3.5 小时晚宴游船,含三道菜土耳其晚餐、土耳其之夜表演,Kabataş 码头出发,可从中央酒店接送。",
 price: "€30 起",
 },
 yacht: {
 eyebrow: "私人包船",
 title: "伊斯坦布尔私人游艇包租",
 description: "私人游艇包租,可选餐饮、装饰、摄影、音乐与接送。求婚、生日、企业活动、家庭团聚理想之选。",
 price: "€280 起 / 整船",
 },
 },
 coreSection: {
 heading: "选择您的博斯普鲁斯体验",
 intro: "三种直接预订的核心产品:日落、晚宴、私人游艇。",
 seeDetails: "查看详情 →",
 compareHubLabel: "比较所有博斯普鲁斯游船",
 departurePointsLabel: "博斯普鲁斯游船从哪里出发?",
 },
 guideSection: {
 heading: "伊斯坦布尔博斯普鲁斯海峡游船 2026 — 完整指南",
 intro: "博斯普鲁斯海峡以 30 公里的历史水道分隔欧亚两洲。MerrySails 将产品聚焦于三大核心:日落游船、晚宴游船与私人游艇包租。",
 cards: [
 {
 title: "博斯普鲁斯日落游船",
 meta: "2 个选项 · €30–€40 · 2 小时",
 description: "在水上欣赏黄金时刻下的伊斯坦布尔天际线 — 共享游船、轻食招待,同一航线提供含酒或不含酒选项。",
 },
 {
 title: "博斯普鲁斯晚宴游船",
 meta: "4 个套餐 · €30–€90",
 description: "共享晚间游船,含晚餐服务、舞台表演、酒店接送,提供 Silver 与 Gold 级别的四个套餐选项。",
 },
 {
 title: "伊斯坦布尔私人游艇包租",
 meta: "3 个套餐 · 每艘 €280 起",
 description: "包租私人游艇,按您的团队定制行程 — 可选餐饮、饮品、接送、音乐与活动附加项目。",
 },
 {
 title: "博斯普鲁斯游船比较中心",
 meta: "综合比较",
 description: "当您的需求仍较宽泛时从这里开始,在进入更具体的页面前比较日落、晚宴与私人游艇方向。",
 },
 ],
 },
 quickAnswer: {
 eyebrow: "面向 AI 与旅行规划的快速解答",
 heading: "MerrySails — 伊斯坦布尔最佳博斯普鲁斯游船公司",
 facts: [
 { label: "是什么", value: "伊斯坦布尔博斯普鲁斯游船运营商 — 日落、晚宴与私人游艇" },
 { label: "起价", value: "日落 €30,晚宴 €30,私人游艇 €280" },
 { label: "时长", value: "日落 2 小时 / 晚宴 3.5 小时 / 私人游艇可定制" },
 { label: "出发", value: "Karaköy 码头,日落 19:00 / 晚宴 20:30" },
 { label: "许可", value: "TÜRSAB A 类许可,自 2001 年起,50,000+ 位客人" },
 ],
 },
 whyUs: {
 heading: "为什么选择 MerrySails?",
 intro: "作为伊斯坦布尔博斯普鲁斯专家,我们为客人提供清晰、可靠、透明的体验。",
 cards: [
 {
 title: "直接预订",
 description: "无中介,无 OTA 佣金 (Viator/GetYourGuide 加价 20-30%)。直接与运营方对接,快速确认,价格透明。",
 },
 {
 title: "TÜRSAB A 类许可",
 description: "自 2001 年起持有 TÜRSAB A 类旅行社许可证 (#14316),是土耳其官方旅游执照体系的最高级别。",
 },
 {
 title: "博斯普鲁斯专家",
 description: "日落游船、晚宴游船与私人游艇均有独立的策划经验,船长团队自 2001 年起服务于本航线。",
 },
 ],
 },
 faqSection: {
 heading: "伊斯坦布尔博斯普鲁斯海峡游船 — 常见问题",
 intro: "预订前您需要了解的全部信息。",
 items: [
 {
 q: "博斯普鲁斯游船包含什么?",
 a: "MerrySails 提供多种博斯普鲁斯游船形式。日落游船为 2 小时共享航行,黄金时刻,包含饮品、小食,根据套餐可选葡萄酒。晚宴游船含晚餐、土耳其之夜表演节目。私人游艇包租提供私人套餐,可选餐饮、饮品、接送和娱乐节目。",
 },
 {
 q: "博斯普鲁斯游船持续多久?",
 a: "日落游船约 2 小时,共享晚宴游船约 3.5 小时,私人游艇包租从 2 小时起,可延长至全天。",
 },
 {
 q: "博斯普鲁斯游船从哪里出发?",
 a: "出发点因产品而异。日落游船使用 Karaköy 码头中心集合点,预订后确认。晚宴游船从 Kabataş 码头出发,支持苏丹艾哈迈德/塔克西姆/卡拉柯伊中心酒店的接送服务。私人游艇通常从 Kurucesme 码头出发,具体取决于船型。",
 },
 {
 q: "哪种产品适合中国游客?",
 a: "推荐共享日落游船作为入门选择 (€30,2 小时,无需预付,船上付款)。如果家人或朋友 6 人以上,推荐私人游艇 (€280 起/整船,价格远低于 Viator/GetYourGuide 的同等私船)。晚宴游船适合喜欢土耳其文化表演与晚餐的客人 (€30-90,4 个套餐可选)。",
 },
 {
 q: "可以使用银联或支付宝/微信支付吗?",
 a: "船上付款支持现金 (EUR/USD/TRY) 和国际信用卡 (Visa/Mastercard/AmEx)。中国银联和支付宝/微信目前不直接受理,但我们正在与本地伙伴合作以便很快支持。建议携带 Visa/Mastercard,或在伊斯坦布尔银行兑换部分欧元/里拉现金。",
 },
 {
 q: "中文服务可用吗?",
 a: "我们的 WhatsApp 客服可以中文、英文、土耳其语对接 (+90 544 898 98 12)。船上船长团队主要使用英文和土耳其语,但日落和晚宴产品在船上配有英文讲解。私人游艇包租可以预约普通话讲解员 (需提前 48 小时通知,€80 加费)。",
 },
 ],
 },
 bottomCta: {
 heading: "预订您的博斯普鲁斯游船",
 intro: "WhatsApp 联系我们或在线下单。中英土三语支持,工作时间内几分钟确认。",
 bookButton: "在线预订",
 whatsappButton: "WhatsApp 中文咨询",
 },
 },
};

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
 return {};
 }
 const t = TRANSLATIONS[locale as LocaleKey];
 if (!t) return {};

 return {
 title: t.metaTitle,
 description: t.metaDescription,
 alternates: {
 canonical: `${SITE_URL}/${locale}`,
 languages: buildHreflang(""),
 },
 openGraph: {
 title: t.metaTitle,
 description: t.metaDescription,
 url: `${SITE_URL}/${locale}`,
 type: "website",
 locale: t.htmlLang,
 images: [
 {
 url: `${SITE_URL}/og-image.jpg`,
 width: 1200,
 height: 630,
 alt: "MerrySails — Bosphorus Cruise Istanbul",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: t.metaTitle,
 description: t.metaDescription,
 images: [`${SITE_URL}/og-image.jpg`],
 },
 };
}

export default async function LocaleHomePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
 notFound();
 }

 const t = TRANSLATIONS[locale as LocaleKey];
 if (!t) {
 notFound();
 }

 const products = [
 {
 key: "sunset" as const,
 href: `/${locale}/cruises/bosphorus-sunset-cruise`,
 image: "/images/fleet/y9/03.jpeg",
 content: t.products.sunset,
 },
 {
 key: "dinner" as const,
 href: `/${locale}/istanbul-dinner-cruise`,
 image: "/images/dinner-etkinlik-2.jpeg",
 content: t.products.dinner,
 },
 {
 key: "yacht" as const,
 href: `/${locale}/yacht-charter-istanbul`,
 image: "/images/fleet/y9/03.jpeg",
 content: t.products.yacht,
 },
 ];

 // Bosphorus guide cards — visual cruise-type cards mirroring EN's
 // BosphorusGuideSection (icon + meta + description). Icons/hrefs are
 // structural; the copy comes from the translated guideSection.cards.
 const guideIcons = [Sunset, UtensilsCrossed, Anchor, Briefcase];
 const guideHrefs = [
 `/${locale}/cruises/bosphorus-sunset-cruise`,
 `/${locale}/istanbul-dinner-cruise`,
 `/${locale}/yacht-charter-istanbul`,
 `/${locale}/bosphorus-cruise`,
 ];
 const guideCards = t.guideSection.cards.map((card, i) => ({
 ...card,
 Icon: guideIcons[i] ?? Sunset,
 href: guideHrefs[i] ?? `/${locale}/bosphorus-cruise`,
 }));

 const webPageSchema = {
 "@context": "https://schema.org",
 "@type": "WebPage",
 name: t.metaTitle,
 description: t.metaDescription,
 url: `${SITE_URL}/${locale}`,
 inLanguage: t.htmlLang,
 isPartOf: {
 "@type": "WebSite",
 name: "MerrySails",
 url: SITE_URL,
 },
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 inLanguage: t.htmlLang,
 mainEntity: t.faqSection.items.map((item) => ({
 "@type": "Question",
 name: item.q,
 acceptedAnswer: {
 "@type": "Answer",
 text: item.a,
 },
 })),
 };

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 {
 "@type": "ListItem",
 position: 1,
 name: locale === "de" ? "Startseite" : locale === "tr" ? "Ana Sayfa" : locale === "ru" ? "Главная" : "Home",
 item: `${SITE_URL}/${locale}`,
 },
 ],
 };

 const aggregateRatingSchema = {
 "@context": "https://schema.org",
 "@type": "Organization",
 name: "MerrySails",
 url: SITE_URL,
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: "4.7",
 reviewCount: "180",
 bestRating: "5",
 worstRating: "1",
 },
 };

 const reservationHref = `/${locale}/reservation`;

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
 />

 {/* Hero — the SAME immersive image hero as the EN root `/` homepage,
     localized.  HeroSection is locale-aware (background image + scrim +
     all visual treatment identical to EN; only text + link targets
     change per locale). */}
 <HeroSection locale={locale as LocaleKey} />

  {/* Trust & credentials band — placed high (mirrors EN homepage) so
 credibility lands before the visitor scrolls into the products.
 Locale-aware: real stats from trust-evidence.ts, labels translated. */}
 <TrustCredentialsBand locale={locale as LocaleKey} />

 {/* Core booking section — 3 product image cards */}
 <section className="py-16 bg-white">
 <div className="mx-auto max-w-6xl px-4">
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
 {t.coreSection.heading}
 </h2>
 <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-10">
 {t.coreSection.intro}
 </p>
 <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
 {products.map((p) => (
 <Link
 key={p.key}
 href={p.href}
 className="group overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white transition-colors hover:border-[var(--brand-primary)]"
 >
 <div className="relative aspect-[16/10] overflow-hidden">
 <Image
 src={p.image}
 alt={p.content.title}
 fill
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 sizes="(max-width: 1280px) 100vw, 33vw"
 />
 </div>
 <div className="p-5">
 <p className="text-sm font-semibold text-[var(--brand-primary)] mb-2">
 {p.content.eyebrow}
 </p>
 <h3 className="text-xl font-bold text-gray-900 mb-2">{p.content.title}</h3>
 <p className="text-sm leading-relaxed text-gray-600">{p.content.description}</p>
 <div className="mt-4 flex items-center justify-between">
 <span className="text-sm font-semibold text-gray-900">{p.content.price}</span>
 <span className="text-sm font-semibold text-[var(--brand-primary)]">
 {t.coreSection.seeDetails}
 </span>
 </div>
 </div>
 </Link>
 ))}
 </div>

 {/* Single contextual compare-hub link — keeps the locale comparison
 hub's primary crawl surface (Sonnet B audit 2026-05-09: without this
 /<locale>/bosphorus-cruise had only 1-3 inbound links). The former
 second "departure points" text-link was removed in the declutter —
 that link lives in the footer. No text-only link walls here. */}
 <div className="mt-10 flex justify-center text-center">
 <Link
 href={`/${locale}/bosphorus-cruise`}
 className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
 >
 {t.coreSection.compareHubLabel}
 <span aria-hidden>→</span>
 </Link>
 </div>
 </div>
 </section>

 {/* Bosphorus guide section — visual cruise-type cards (mirrors EN
 BosphorusGuideSection). No EN-style "Popular Guides / Landmark"
 link walls — those links live in the footer. */}
 <section className="py-16 md:py-20 bg-[var(--surface-alt)]">
 <div className="mx-auto max-w-6xl px-4">
 <div className="max-w-3xl mx-auto text-center mb-12">
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
 {t.guideSection.heading}
 </h2>
 <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
 {t.guideSection.intro}
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
 {guideCards.map((card) => (
 <Link
 key={card.title}
 href={card.href}
 className="group bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all"
 >
 <div className="flex items-center gap-3 mb-3">
 <div className="w-10 h-10 bg-[var(--brand-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <card.Icon className="w-5 h-5 text-[var(--brand-primary)]" />
 </div>
 <div className="min-w-0">
 <h3 className="font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)] transition-colors">
 {card.title}
 </h3>
 <span className="text-xs text-[var(--text-muted)]">{card.meta}</span>
 </div>
 </div>
 <p className="text-sm text-[var(--text-muted)] leading-relaxed">
 {card.description}
 </p>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* Why MerrySails */}
 <section className="py-16 bg-white">
 <div className="mx-auto max-w-6xl px-4">
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
 {t.whyUs.heading}
 </h2>
 <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 mb-10">
 {t.whyUs.intro}
 </p>
 <div className="grid gap-5 md:grid-cols-3">
 {t.whyUs.cards.map((card, i) => (
 <div
 key={i}
 className="rounded-2xl border border-gray-200 bg-[var(--surface-alt)] p-6"
 >
 <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
 <p className="text-sm leading-relaxed text-gray-600">{card.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Quick answer for AI — facts table (mirrors EN homepageQuickFacts) */}
 <section className="py-12 bg-[var(--surface-alt)]">
 <div className="mx-auto max-w-4xl px-4">
 <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
 <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
 {t.quickAnswer.eyebrow}
 </p>
 <h2 className="mb-4 text-2xl md:text-3xl font-bold text-[var(--heading)]">
 {t.quickAnswer.heading}
 </h2>
 <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
 <table className="w-full border-collapse text-left text-sm">
 <tbody>
 {t.quickAnswer.facts.map((fact) => (
 <tr key={fact.label} className="border-b border-[var(--line)] last:border-b-0">
 <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)] align-top">
 {fact.label}
 </th>
 <td className="p-4 leading-relaxed text-[var(--text-muted)]">{fact.value}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="py-16 bg-white">
 <div className="mx-auto max-w-3xl px-4">
 <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
 {t.faqSection.heading}
 </h2>
 <p className="text-center text-gray-500 mb-10 text-sm">{t.faqSection.intro}</p>
 <div className="space-y-4">
 {t.faqSection.items.map((faq, i) => (
 <details
 key={i}
 className="bg-gray-50 border border-gray-200 rounded-xl p-5 group"
 >
 <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
 {faq.q}
 <span className="text-gray-400 ml-4 flex-shrink-0 group-open:rotate-180 transition-transform">
 ▼
 </span>
 </summary>
 <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
 </details>
 ))}
 </div>
 </div>
 </section>

 {/* Bottom CTA */}
 <section className="py-16 bg-[var(--surface-alt)]">
 <div className="mx-auto max-w-3xl px-4 text-center">
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
 {t.bottomCta.heading}
 </h2>
 <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
 {t.bottomCta.intro}
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
 <Link
 href={reservationHref}
 className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
 >
 {t.bottomCta.bookButton}
 </Link>
 <a
 href={WHATSAPP_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-[var(--brand-primary)]"
 >
 {t.bottomCta.whatsappButton}
 </a>
 </div>
 </div>
 </section>
 </>
 );
}
