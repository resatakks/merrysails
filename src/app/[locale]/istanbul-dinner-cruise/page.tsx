import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import LocaleHelpfulResources from "@/components/layout/LocaleHelpfulResources";
import WeekdayDiscountBanner from "@/components/promo/WeekdayDiscountBanner";
import { getWeekdayDiscountStrings } from "@/components/promo/weekday-discount-strings";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, getBcp47, type SiteLocale } from "@/i18n/config";
import QuickAnswer from "@/components/ai/QuickAnswer";
import { buildHreflang } from "@/lib/hreflang";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import BookingMomentumBadge from "@/components/ui/BookingMomentumBadge";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import { getProductBookingMomentum } from "@/lib/booking-momentum";

export const revalidate = 3600;

const dinnerTour = getTourBySlug("bosphorus-dinner-cruise");
if (!dinnerTour) throw new Error("Dinner cruise data is missing.");

const relatedTours: Tour[] = [
 getTourBySlug("bosphorus-sunset-cruise"),
 getTourBySlug("yacht-charter-in-istanbul"),
 getTourBySlug("private-bosphorus-dinner-yacht-cruise"),
].filter((t): t is Tour => Boolean(t));

type LocaleContent = {
 title: string;
 description: string;
 h1: string;
 breadcrumb: string;
 canonicalPath: string;
 homeLabel: string;
 bosphorusLabel: string;
 aboutTitle: string;
 aboutBody: string[];
 trustSignal: string;
 tableRows: [string, string][];
 packageSectionTitle: string;
 perPerson: string;
 packages: { name: string; price: string; items: string[] }[];
 faqTitle: string;
 faqs: { q: string; a: string }[];
 otherOptionsTitle: string;
 otherOptions: { href: string; title: string; desc: string }[];
 menuDetailSection?: {
 title: string;
 intro: string;
 sections: { heading: string; items: string; note?: string }[];
 };
 /** TR-only: operator-voice answer block (direct booking vs acente/OTA). */
 operatorNote?: { title: string; body: string[] };
 /** TR-only: how to reach Kabataş İskelesi by domestic transit. */
 localTransitGuide?: {
 title: string;
 intro: string;
 rows: { mode: string; detail: string }[];
 tip: string;
 };
};

const TRANSLATIONS: Record<string, LocaleContent> = {
 tr: {
 title: "Akşam Yemekli Boğaz Turu — €30'dan Başlıyor",
 description:
 "Akşam yemekli Boğaz turu €30'dan: Türk gecesi eğlencesi, otel transfer desteği ve 4 farklı paket. TÜRSAB lisanslı. Hemen rezervasyon yapın.",
 h1: "İstanbul Akşam Yemekli Boğaz Turu — Tekneli Yemekli Tur",
 breadcrumb: "Akşam Yemeği Turu",
 canonicalPath: "/tr/istanbul-dinner-cruise",
 homeLabel: "Ana Sayfa",
 bosphorusLabel: "Boğaz Turu",
 aboutTitle: "İstanbul Boğaz Akşam Yemeği Turu Nedir?",
 aboutBody: [
 "MerrySails İstanbul Akşam Yemeği Turu, Boğaz'ın eşsiz manzaralarını izlerken otantik Türk mutfağı ve canlı Türk gecesi eğlencesinin bir arada sunulduğu paylaşımlı tekne deneyimidir. Tur yaklaşık 3,5 saat sürer, Kabataş İskelesi'nden saat 20:30'da hareket eder ve dört farklı paket seçeneği sunar: €30, €45, €80 ve €90.",
 "Silver paketlerde standart oturma düzeni, tam akşam yemeği servisi ve Türk gecesi gösterisi yer alır. Gold paketlerde sahneye yakın VIP masa garantisi, genişletilmiş menü ve sınırsız alkol seçeneği mevcuttur. Tüm paketlerde yemek menüsü aynı rotada; mezelerin yanında sıcak başlangıç, ana yemek ve tatlı servisi yapılır.",
 "Akşam yemeği menüsü yaklaşık 10 çeşit soğuk meze ile başlar: yaprak sarma, humus, tarama, cacık, çoban salatası, beyaz peynir, patlıcan salatası, salatalık turşusu ve mevsime göre değişen ek mezeler. Ardından sıcak başlangıç ve ana yemek gelir — balık, tavuk veya et seçenekleri; istek üzerine vejetaryen ızgara sebze tabağı veya makarna da sunulmaktadır. Tatlı olarak fıstıklı baklava, meyve tabağı ve Türk kahvesi ikram edilir.",
 "3 perdelik Türk gecesi gösterisi boyunca sahne Türkiye'nin farklı bölgelerini yansıtan halk danslarını, Oryantal performansları ve sürpriz seyirci katılım oyunlarını kapsar. Gösteriler tekne hareket halindeyken yürütülür; böylece ışıklı Boğaz silüeti eşliğinde unutulmaz bir gece geçirirsiniz.",
 "Çocuk politikası: 3 yaş altı ücretsiz, 3–13 yaş arası çocuklar için %50 indirimli fiyat uygulanır. Vejetaryen misafirler için özel tabak önceden talep edilebilir. Merkezi Avrupa yakasındaki pek çok otel için otel transfer servisi mevcuttur; kesin alım saatleri rezervasyon onayından sonra yazılı bildirilir.",
 ],
 trustSignal: "2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism tarafından sunulmaktadır.",
 tableRows: [
 ["Süre", "~3,5 saat"],
 ["Kalkış", "Kabataş (20:30)"],
 ["En düşük fiyat", "€30 (Silver Soft Drinks)"],
 ["En yüksek fiyat", "€90 (Gold Unlimited Alkol)"],
 ["Paket sayısı", "4 farklı paket"],
 ["Transfer desteği", "Uygun oteller için mevcut"],
 ],
 packageSectionTitle: "Paket Karşılaştırması",
 perPerson: "kişi başı",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: ["Standart koltuk", "Sınırsız alkolsüz içecek", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
 },
 {
 name: "Silver Alcoholic",
 price: "€45",
 items: ["Standart koltuk", "Yerel alkollü içecekler", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: ["VIP sahne yakını koltuk", "Sınırsız alkolsüz içecek", "Premium yemek menüsü", "Türk gecesi + DJ"],
 },
 {
 name: "Gold Unlimited Alkol",
 price: "€90",
 items: ["VIP sahne yakını koltuk", "Sınırsız alkol dahil", "Premium yemek menüsü", "Türk gecesi + DJ"],
 },
 ],
 faqTitle: "Sıkça Sorulan Sorular",
 faqs: [
 {
 q: "Akşam yemeği turu ne kadar sürer?",
 a: "Tur yaklaşık 3,5 saat sürer. Kabataş'tan saat 20:30'da hareket eder.",
 },
 {
 q: "Otel transferi dahil mi?",
 a: "Merkezi Avrupa yakası otellerinin büyük bölümü için servis transferi mevcuttur. Kesin transfer detayları rezervasyon onayından sonra yazılı olarak iletilir.",
 },
 {
 q: "Paketler arasındaki fark nedir?",
 a: "Farklar koltuk tipi (standart / VIP sahne yakını), içecek kapsamı ve yemek menüsü düzeyidir. Güzergah ve tur süresi tüm paketlerde aynıdır.",
 },
 {
 q: "Ne zaman rezervasyon yapmalıyım?",
 a: "Yaz sezonunda (Mayıs–Eylül) en az 3–5 gün öncesinden rezervasyon yapmanızı öneririz. Turlar çoğunlukla dolup taşmaktadır.",
 },
 {
 q: "Akşam yemekli boğaz turu menüsü vejetaryen mi?",
 a: "Standart menü balık, tavuk veya et içermektedir. Vejetaryen misafirler için ızgara sebze tabağı veya makarna reservasyon sırasında önceden talep edilebilir. Taleplerin rezervasyon onayından önce bildirilmesi gerekmektedir.",
 },
 {
 q: "Çocuklar akşam yemekli boğaz turuna katılabilir mi?",
 a: "Evet, tüm yaş grupları kabul edilmektedir. 3 yaş altı çocuklar ücretsizdir. 3–13 yaş arası çocuklar için %50 indirimli çocuk fiyatı uygulanır; rezervasyon sırasında kaç çocuk katıldığını belirtmeniz yeterlidir.",
 },
 {
 q: "Sultanahmet'ten otel transferi dahil mi?",
 a: "Sultanahmet ve diğer merkezi Avrupa yakası otelleri için servis transfer imkânı mevcuttur. Kesin alım saatleri ve güzergah detayları rezervasyon onayının ardından yazılı olarak bildirilir. Anadolu yakası otellerinden bireysel ulaşım gerekmektedir.",
 },
 {
 q: "Akşam yemekli boğaz turu için kıyafet kuralı var mı?",
 a: "Zorunlu bir kıyafet kuralı bulunmamaktadır. Smart casual tercih edilmekle birlikte rahat kıyafetler de kabul edilir. Tekne üstünde akşam saatlerinde hava serinleyebileceği için hafif bir üst giysisi almanız önerilir.",
 },
 {
 q: "Akşam yemekli boğaz turunda kaç tabak yemek servisi yapılır?",
 a: "Menü 4 aşamalıdır: soğuk meze tabağı (yaklaşık 10 çeşit — yaprak sarma, humus, tarama, cacık, çoban salatası, beyaz peynir vb.), sıcak başlangıç, ana yemek (balık/tavuk/et seçenekli) ve tatlı (fıstıklı baklava, meyve tabağı, Türk kahvesi). Tüm Silver ve Gold paketlerde bu 4 aşama eksiksiz sunulmaktadır.",
 },
 {
 q: "Akşam yemekli boğaz turunda hangi yemekler servis edilir?",
 a: "Menü dört bölümden oluşur. Mezeler: Humus, Babagannuş, Patlıcan Salatası, Sigara Böreği, Dolma. Ara sıcak: Karides Güveç (Silver paket), Levrek Buğulama (Gold/premium). Ana yemek: Izgara Levrek, Köfte, Tavuk Şiş veya Tavuklu Pilav. Tatlı: Baklava, Sütlaç, Türk Lokumu ve Meyve Tabağı. Tüm Silver ve Gold paketlerde bu tabaklar eksiksiz servis edilir.",
 },
 {
 q: "Vejetaryen menü seçeneği var mı?",
 a: "Evet. Standart menüde balık, tavuk veya et yer alır; ancak vejetaryen misafirler için ızgara sebze tabağı veya makarna rezervasyon sırasında önceden talep edilebilir. Diyetinizi rezervasyon formunda belirtmeniz yeterlidir.",
 },
 {
 q: "Çocuk menüsü mevcut mu?",
 a: "3 yaş altı çocuklar için ayrı bir ücret alınmaz ve menü paylaşılabilir. 3–13 yaş arası çocuklar için %50 indirimli fiyat uygulanır; bu yaş grubuna Tavuklu Pilav gibi daha hafif seçenekler sunulabilir. Çocuk sayısını ve yaşlarını rezervasyon sırasında belirtmeniz yeterlidir.",
 },
 {
 q: "Türk gecesi gösterisi neleri içerir?",
 a: "3 perdelik Türk gecesi gösterisi; Türkiye'nin farklı bölgelerinden halk danslarını, Oryantal performansları ve seyirci katılım bölümlerini kapsar. Gold paketlerde gösteriye ek olarak DJ müziği eşliğinde dans pisti de açılmaktadır. Gösteriler seyir halindeyken yürütülür, böylece Boğaz manzarasını eş zamanlı izleyebilirsiniz.",
 },
 ],
 otherOptionsTitle: "Diğer Seçenekler",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Boğaz Gün Batımı Turu",
 desc: "€30'dan başlayan 2 saatlik altın saat gün batımı turu (Sal & Per).",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "Özel Yat Kiralama",
 desc: "€220'den başlayan tam özel yat deneyimi.",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 menuDetailSection: {
 title: "Akşam Yemekli Boğaz Turunda Ne Yenir? Menü Detayı",
 intro:
 "MerrySails akşam yemekli boğaz turunda Türk mutfağının en seçkin lezzetleri 4 aşamalı olarak sunulmaktadır. Menü tüm Silver ve Gold paketlerde aynıdır; paketler arası fark içecek kapsamı ve oturma önceliğidir.",
 sections: [
 {
 heading: "Mezeler",
 items:
 "Humus, Babagannuş, Patlıcan Salatası, Sigara Böreği, Dolma (yaprak sarma), Cacık, Çoban Salatası, Beyaz Peynir ve mevsime göre ek soğuk mezeler.",
 note:
 "Yaklaşık 10 çeşit soğuk meze tabak ortasına konur; masada paylaşılarak yenir.",
 },
 {
 heading: "Ara Sıcak",
 items:
 "Silver paketlerde Karides Güveç; Gold/premium paketlerde Levrek Buğulama.",
 },
 {
 heading: "Ana Yemek",
 items:
 "Izgara Levrek, Köfte, Tavuk Şiş veya Tavuklu Pilav (çocuklar ve balık yemeyenler için idealdir). Vejetaryen seçenek: ızgara sebze tabağı veya makarna (rezervasyon sırasında talep edin).",
 },
 {
 heading: "Tatlı",
 items:
 "Baklava, Sütlaç, Türk Lokumu ve Meyve Tabağı. Türk kahvesi veya çay ikram edilir.",
 },
 {
 heading: "İçecek",
 items:
 "Temel (Silver Soft Drinks €30): Sınırsız alkolsüz içecek. Silver Alcoholic (€45): Yerel bira ve rakı dahil. Gold Soft Drinks (€80): Sınırsız alkolsüz içecek + VIP masa. Gold Unlimited Alkol (€90): Sınırsız yerel ve ithal alkol + VIP masa + DJ.",
 },
 ],
 },
 operatorNote: {
 title: "Kaptan'dan not: neden acente yerine doğrudan rezervasyon?",
 body: [
 "Ben Kaptan Ahmet — 2001'den beri bu teknede misafir ağırlıyoruz. Aynı akşam yemekli turu Viator, GetYourGuide gibi platformlarda da görürsünüz; ama oralarda gördüğünüz fiyatın içinde acente komisyonu vardır. Bizden doğrudan rezervasyon yaptığınızda Silver Soft paket gerçek fiyatıyla €30 kalır, arada komisyon yoktur.",
 "Doğrudan rezervasyonun bir başka avantajı: masanızı, çocuk sayınızı, vejetaryen tabağınızı ve otel alım noktanızı WhatsApp üzerinden bizzat bizimle netleştirirsiniz. Platform üzerinden gelen taleplerde bu detaylar çoğu zaman bize geç ulaşır. Bizde onay 60 dakika içinde, yazılı gelir; iptal 48 saat öncesine kadar ücretsizdir.",
 "Bir uyarı: yaz aylarında (Mayıs–Eylül) Cuma ve Cumartesi geceleri Gold masalar erken doluyor. Sahneye yakın oturmak istiyorsanız Gold paketi en az 3–4 gün önceden tutmanızı öneririm. Hafta içi (Pazartesi–Perşembe) hem daha sakin hem de Silver Alkollü pakette indirimli oluyor.",
 ],
 },
 localTransitGuide: {
 title: "Kabataş İskelesi'ne nasıl gidilir?",
 intro:
 "Tekne Kabataş İskelesi'nden kalkar. İstanbul içinden geliyorsanız toplu taşıma ile kapıya kadar gelmek mümkün; aşağıda en pratik yollar var. Otelden transfer hizmetimiz Avrupa yakası merkez otelleri için zaten mevcut, ama kendiniz gelmek isterseniz:",
 rows: [
 {
 mode: "Tramvay (T1)",
 detail:
 "T1 Kabataş-Bağcılar hattının son durağı Kabataş'tır. Sultanahmet, Eminönü, Karaköy'den biniyorsanız direkt aktarmasız gelirsiniz; durak iskelenin tam yanındadır.",
 },
 {
 mode: "Füniküler (F1)",
 detail:
 "Taksim Meydanı'ndan F1 füniküleri ile Kabataş'a yaklaşık 2 dakikada inersiniz. Taksim çevresi otellerinde kalanlar için en hızlı seçenektir.",
 },
 {
 mode: "Marmaray + yürüyüş",
 detail:
 "Anadolu yakasından gelenler Marmaray ile Sirkeci'ye, oradan T1 tramvayına aktarıp Kabataş'a ulaşır. Sirkeci-Kabataş tramvayla yaklaşık 12 dakikadır.",
 },
 {
 mode: "Vapur",
 detail:
 "Kabataş'ın kendi vapur iskelesi vardır (Üsküdar–Kabataş, Kadıköy–Kabataş hatları). Vapurdan inince tekne biniş noktası birkaç adım ötededir.",
 },
 {
 mode: "Özel araç / taksi",
 detail:
 "Taksi şoförüne \"Kabataş İskelesi\" deyin. Kendi aracınızla geliyorsanız akşam saatlerinde sahil yolu (Meclis-i Mebusan Cad.) park için sınırlıdır; toplu taşımayı öneririz.",
 },
 ],
 tip: "Saat 20:30 kalkışından en az 15 dakika önce iskelede olun. Yaz akşamları T1 tramvayı yoğun olabilir, biraz erken çıkın.",
 },
 },
 de: {
 title: "Istanbul Dinner-Kreuzfahrt ab €30",
 description:
 "Bosporus Dinner Cruise Istanbul ab €30. Türkische Abendunterhaltung, 4 Pakete bis €90, Hoteltransfer möglich. TÜRSAB-lizenziert seit 2001. Jetzt buchen.",
 h1: "Istanbul Dinner Cruise — Bosporus Abendfahrt",
 breadcrumb: "Dinner-Kreuzfahrt",
 canonicalPath: "/de/istanbul-dinner-cruise",
 homeLabel: "Startseite",
 bosphorusLabel: "Bosporus-Tour",
 aboutTitle: "Was ist die Istanbul Dinner Cruise auf dem Bosporus?",
 aboutBody: [
 "Die MerrySails Dinner Cruise ist eine geteilte Bootsfahrt auf dem Bosporus, die ein authentisches türkisches Abendessen, türkische Live-Show und einen unvergleichlichen Blick auf das beleuchtete Istanbul kombiniert. Die Fahrt dauert rund 3,5 Stunden, startet um 20:30 Uhr am Anleger Kabataş und bietet vier Pakete zur Auswahl: €30, €45, €80 und €90.",
 "Die Silver-Pakete umfassen einen Standard-Sitzplatz, ein vollständiges Abendmenü sowie die türkische Abendshow. Die Gold-Pakete bieten einen garantierten VIP-Tisch in Bühnennähe, ein erweitertes Menü und wahlweise unbegrenzte alkoholische Getränke. Route und Fahrtdauer sind in allen Paketen identisch.",
 "Das Abendmenü beginnt mit einer kalten Meze-Platte mit rund 10 Spezialitäten: Yaprak Sarma (gefüllte Weinblätter), Hummus, Tarama (Fischroggencreme), Cacık (türkischer Joghurt-Dip), Hirtensalat, weißer Käse, Auberginensalat, eingelegte Gurken sowie weitere saisonale Beilagen. Darauf folgen ein warmer Starter und ein Hauptgericht zur Auswahl – Fisch, Hühnchen oder Fleisch. Auf Anfrage ist auch ein vegetarisches Gericht (gegrilltes Gemüse oder Pasta) erhältlich.",
 "Zum Abschluss werden Baklava mit Pistazie, eine Obstplatte und türkischer Kaffee serviert. Während der gesamten Fahrt läuft eine dreiaktige türkische Abendshow mit Volkstänzen aus verschiedenen Regionen der Türkei, Orientalischem Tanz und Gäste-Einlagen.",
 "Kinderpolitik: Kinder unter 3 Jahren fahren kostenlos mit. Für Kinder zwischen 4 und 10 Jahren gilt ein ermäßigter Kinderpreis – bitte bei der Buchung angeben. Für die meisten zentralen Hotels auf der europäischen Seite steht ein kostenloser Shuttle bereit; die genauen Abholzeiten werden schriftlich nach Buchungsbestätigung mitgeteilt.",
 ],
 trustSignal: "Veranstalter Merry Tourism – seit 2001 TÜRSAB-A-Gruppe lizenziert.",
 tableRows: [
 ["Dauer", "ca. 3,5 Stunden"],
 ["Abfahrt", "Kabataş (20:30 Uhr)"],
 ["Niedrigster Preis", "€30 (Silver Soft Drinks)"],
 ["Höchster Preis", "€90 (Gold Unlimited Alkohol)"],
 ["Pakete", "4 verschiedene Optionen"],
 ["Hoteltransfer", "Für ausgewählte Hotels verfügbar"],
 ],
 packageSectionTitle: "Paketvergleich",
 perPerson: "pro Person",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: [
 "Standard-Sitzplatz",
 "Alkoholfreie Getränke unbegrenzt",
 "Abendmenü",
 "Türkische Abendshow",
 ],
 },
 {
 name: "Silver Alcoholic",
 price: "€45",
 items: [
 "Standard-Sitzplatz",
 "Lokale alkoholische Getränke",
 "Abendmenü",
 "Türkische Abendshow",
 ],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: [
 "VIP-Sitzplatz nahe der Bühne",
 "Alkoholfreie Getränke unbegrenzt",
 "Premium-Menü",
 "Türkische Show + DJ",
 ],
 },
 {
 name: "Gold Unlimited Alkohol",
 price: "€90",
 items: [
 "VIP-Sitzplatz nahe der Bühne",
 "Alkohol unbegrenzt inklusive",
 "Premium-Menü",
 "Türkische Show + DJ",
 ],
 },
 ],
 faqTitle: "Häufig gestellte Fragen",
 faqs: [
 {
 q: "Wie lange dauert die Dinner Cruise?",
 a: "Die Tour dauert rund 3,5 Stunden und startet um 20:30 Uhr am Anleger Kabataş.",
 },
 {
 q: "Ist der Hoteltransfer inklusive?",
 a: "Für die meisten zentralen Hotels auf der europäischen Seite bieten wir einen kostenlosen Shuttle-Service. Die genauen Abholzeiten erhalten Sie schriftlich nach der Buchungsbestätigung.",
 },
 {
 q: "Worin unterscheiden sich die Pakete?",
 a: "Die Pakete unterscheiden sich in der Sitzplatzkategorie (Standard oder VIP nahe der Bühne), beim Getränkeumfang und beim Menü. Route und Dauer sind in allen Paketen identisch.",
 },
 {
 q: "Wann sollte ich buchen?",
 a: "In der Hochsaison (Mai bis September) empfehlen wir eine Buchung mindestens 3–5 Tage im Voraus. Die Touren sind häufig ausgebucht.",
 },
 {
 q: "Ist das Menü bei der Dinner Cruise vegetarisch?",
 a: "Das Standardmenü enthält Fisch, Hühnchen oder Fleisch als Hauptgericht. Vegetarier können bei der Buchung ein vegetarisches Gericht (gegrilltes Gemüse oder Pasta) vorab anfragen. Bitte geben Sie dies bei der Reservierung an, damit wir es vorbereiten können.",
 },
 {
 q: "Sind Kinder bei der Dinner Cruise willkommen?",
 a: "Ja, alle Altersgruppen sind herzlich willkommen. Kinder unter 3 Jahren fahren kostenlos mit. Für Kinder zwischen 4 und 10 Jahren gilt ein ermäßigter Kinderpreis. Bitte geben Sie die Anzahl der Kinder bei der Buchung an.",
 },
 {
 q: "Ist ein Hoteltransfer ab Sultanahmet inklusive?",
 a: "Für viele zentrale Hotels auf der europäischen Seite – darunter Sultanahmet, Taksim und Beyoğlu – steht ein kostenloser Shuttle-Service zur Verfügung. Die genauen Abholzeiten und der Treffpunkt werden schriftlich nach Buchungsbestätigung mitgeteilt. Gäste von der asiatischen Seite reisen eigenständig an.",
 },
 {
 q: "Gibt es einen Dresscode für die Dinner Cruise?",
 a: "Es gibt keinen verbindlichen Dresscode. Smart Casual wird empfohlen, bequeme Alltagskleidung ist jedoch ebenfalls willkommen. Da es auf dem Bosporus abends kühler werden kann, empfehlen wir eine leichte Jacke mitzunehmen.",
 },
 {
 q: "Wie viele Gänge werden bei der Dinner Cruise serviert?",
 a: "Das Menü besteht aus 4 Gängen: kalte Meze-Platte (ca. 10 Spezialitäten, darunter Yaprak Sarma, Hummus, Tarama, Cacık, Hirtensalat, weißer Käse), warmer Starter, Hauptgericht (Fisch, Hühnchen oder Fleisch) sowie Dessert (Baklava, Obstplatte und türkischer Kaffee). Alle vier Gänge sind sowohl in den Silver- als auch in den Gold-Paketen enthalten.",
 },
 ],
 otherOptionsTitle: "Weitere Optionen",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Bosporus Sonnenuntergang-Tour",
 desc: "2-stündige Tour zur goldenen Stunde ab €30 (Di & Do).",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "Privater Yacht-Charter",
 desc: "Komplett private Yacht-Erlebnisse ab €220.",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 },
 fr: {
 title: "Croisière Dîner Istanbul — À partir de €30",
 description:
 "Croisière dîner sur le Bosphore à Istanbul à partir de €30. 4 formules jusqu'à €90, spectacle de nuit turque, transfert hôtel disponible. Réservez maintenant.",
 h1: "Istanbul Dinner Cruise — Croisière Dîner Bosphore",
 breadcrumb: "Croisière Dîner",
 canonicalPath: "/fr/istanbul-dinner-cruise",
 homeLabel: "Accueil",
 bosphorusLabel: "Croisière Bosphore",
 aboutTitle: "Qu'est-ce que la croisière dîner sur le Bosphore ?",
 aboutBody: [
 "La croisière dîner MerrySails est une expérience partagée à bord d'un bateau qui réunit dîner, spectacle de nuit turque et vue panoramique sur Istanbul illuminé. La croisière dure environ 3h30, part de l'embarcadère de Kabataş et propose quatre formules au choix : €30, €45, €80 et €90.",
 "Chaque formule se distingue clairement par la catégorie de place, l'offre de boissons et le niveau du menu. Nous avons accueilli plus de 50 000 clients à bord.",
 "Un service de navette est proposé pour de nombreux hôtels du centre rive européenne. Les détails du transfert vous sont communiqués par écrit après la confirmation de réservation.",
 ],
 trustSignal: "Croisière opérée par Merry Tourism, agréée TÜRSAB Groupe A depuis 2001.",
 tableRows: [
 ["Durée", "environ 3h30"],
 ["Départ", "Kabataş (20h30)"],
 ["Prix minimum", "€30 (Silver Soft Drinks)"],
 ["Prix maximum", "€90 (Gold Alcool Illimité)"],
 ["Formules", "4 options disponibles"],
 ["Transfert hôtel", "Disponible pour hôtels éligibles"],
 ],
 packageSectionTitle: "Comparatif des formules",
 perPerson: "par personne",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: [
 "Place standard",
 "Boissons sans alcool à volonté",
 "Menu dîner",
 "Spectacle de nuit turque",
 ],
 },
 {
 name: "Silver Alcoholic",
 price: "€45",
 items: [
 "Place standard",
 "Boissons alcoolisées locales",
 "Menu dîner",
 "Spectacle de nuit turque",
 ],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: [
 "Place VIP proche de la scène",
 "Boissons sans alcool à volonté",
 "Menu premium",
 "Spectacle turque + DJ",
 ],
 },
 {
 name: "Gold Alcool Illimité",
 price: "€90",
 items: [
 "Place VIP proche de la scène",
 "Alcool à volonté inclus",
 "Menu premium",
 "Spectacle turque + DJ",
 ],
 },
 ],
 faqTitle: "Questions fréquentes",
 faqs: [
 {
 q: "Combien de temps dure la croisière dîner ?",
 a: "La croisière dure environ 3h30 et part de Kabataş à 20h30.",
 },
 {
 q: "Le transfert depuis l'hôtel est-il inclus ?",
 a: "Une navette est disponible pour la plupart des hôtels centraux de la rive européenne. Les horaires précis vous sont envoyés par écrit après confirmation de réservation.",
 },
 {
 q: "Quelle est la différence entre les formules ?",
 a: "Les formules diffèrent par la catégorie de place (standard ou VIP proche de la scène), l'offre de boissons et le niveau du menu. L'itinéraire et la durée sont identiques pour toutes les formules.",
 },
 {
 q: "Quand faut-il réserver ?",
 a: "En haute saison (mai à septembre), nous recommandons de réserver au moins 3 à 5 jours à l'avance. Les croisières affichent souvent complet.",
 },
 ],
 otherOptionsTitle: "Autres options",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Croisière Coucher de Soleil",
 desc: "Croisière de 2 heures à l'heure dorée à partir de €30 (mar & jeu).",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "Location de Yacht Privé",
 desc: "Expérience yacht 100 % privée à partir de €220.",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 },
 nl: {
 title: "Istanbul Dinner Cruise — Vanaf €30",
 description:
 "Bosporus diner cruise Istanbul vanaf €30. Turkse avondshow, 4 pakketten tot €90, hotelophaal mogelijk. Boek direct bij TÜRSAB-gecertificeerd bedrijf.",
 h1: "Istanbul Dinner Cruise — Bosphorus Yacht with Dinner",
 breadcrumb: "Dinner Cruise",
 canonicalPath: "/nl/istanbul-dinner-cruise",
 homeLabel: "Home",
 bosphorusLabel: "Bosporus Cruise",
 aboutTitle: "Wat is de Istanbul Dinner Cruise?",
 aboutBody: [
 "De MerrySails Dinner Cruise is een gedeelde boottocht over de Bosporus met diner, een Turkse avondshow en uitzicht op het verlichte Istanbul. De tocht duurt ongeveer 3,5 uur, vertrekt vanaf Kabataş en heeft vier pakketten: €30, €45, €80 en €90.",
 "Elk pakket heeft een duidelijk verschil in stoeltype, drankenaanbod en menu. We hebben inmiddels meer dan 50.000 gasten aan boord verwelkomd.",
 "Voor veel centrale hotels aan de Europese kant is een gratis shuttle beschikbaar. De exacte ophaaltijd ontvangt u schriftelijk na bevestiging van uw boeking.",
 ],
 trustSignal: "Aangeboden door Merry Tourism – TÜRSAB A-categorie gecertificeerd sinds 2001.",
 tableRows: [
 ["Duur", "ca. 3,5 uur"],
 ["Vertrek", "Kabataş (20:30)"],
 ["Vanaf-prijs", "€30 (Silver Soft Drinks)"],
 ["Hoogste prijs", "€90 (Gold Onbeperkt Alcohol)"],
 ["Pakketten", "4 opties"],
 ["Hotelophaal", "Beschikbaar voor geschikte hotels"],
 ],
 packageSectionTitle: "Pakketvergelijking",
 perPerson: "per persoon",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: [
 "Standaard zitplaats",
 "Onbeperkt frisdrank",
 "Dinermenu",
 "Turkse avondshow",
 ],
 },
 {
 name: "Silver Alcoholic",
 price: "€45",
 items: [
 "Standaard zitplaats",
 "Lokale alcoholische dranken",
 "Dinermenu",
 "Turkse avondshow",
 ],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: [
 "VIP-stoel dicht bij het podium",
 "Onbeperkt frisdrank",
 "Premium menu",
 "Turkse show + DJ",
 ],
 },
 {
 name: "Gold Onbeperkt Alcohol",
 price: "€90",
 items: [
 "VIP-stoel dicht bij het podium",
 "Onbeperkt alcohol inbegrepen",
 "Premium menu",
 "Turkse show + DJ",
 ],
 },
 ],
 faqTitle: "Veelgestelde vragen",
 faqs: [
 {
 q: "Hoe lang duurt de dinner cruise?",
 a: "De cruise duurt ongeveer 3,5 uur en vertrekt om 20:30 vanaf Kabataş.",
 },
 {
 q: "Is hotelophaal inbegrepen?",
 a: "Voor de meeste centrale hotels aan de Europese kant is een shuttle beschikbaar. De exacte ophaaltijd krijgt u schriftelijk na bevestiging van uw boeking.",
 },
 {
 q: "Wat is het verschil tussen de pakketten?",
 a: "De pakketten verschillen in stoeltype (standaard of VIP dicht bij het podium), drankenaanbod en menuniveau. De route en duur zijn voor alle pakketten gelijk.",
 },
 {
 q: "Wanneer moet ik boeken?",
 a: "In het hoogseizoen (mei tot september) raden we aan om minstens 3 tot 5 dagen vooraf te boeken. De cruises zitten regelmatig vol.",
 },
 ],
 otherOptionsTitle: "Andere opties",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Bosporus Zonsondergang Cruise",
 desc: "Cruise van 2 uur tijdens het gouden uur vanaf €30 (di & do).",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "Privé Jachtcharter",
 desc: "Volledig private jachtervaring vanaf €220.",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 },
 ru: {
 title: "Ужин-круиз по Босфору в Стамбуле — от €30",
 description:
 "Ужин-круиз по Босфору от €30: турецкая ночь, поддержка трансфера из отелей и 4 пакета на выбор. Лицензия TÜRSAB. Прямое бронирование.",
 h1: "Ужин-круиз по Босфору в Стамбуле — Istanbul Dinner Cruise",
 breadcrumb: "Ужин-круиз",
 canonicalPath: "/ru/istanbul-dinner-cruise",
 homeLabel: "Главная",
 bosphorusLabel: "Круиз по Босфору",
 aboutTitle: "Что такое ужин-круиз по Босфору?",
 aboutBody: [
 "Ужин-круиз по Босфору от MerrySails — это совместное плавание на яхте, где Вы наслаждаетесь панорамой Босфора, аутентичной турецкой кухней и живым шоу «Турецкая ночь» одновременно. Круиз длится около 3,5 часов, отправляется от пирса Кабаташ в 20:30 и предлагает четыре пакета на выбор: €30, €45, €80 и €90 на человека.",
 "Пакеты Silver включают стандартное место за столом, полный ужин и шоу «Турецкая ночь». Пакеты Gold добавляют VIP-места ближе к сцене, расширенное меню и опцию безлимитного алкоголя. Меню одинаковое во всех пакетах — разница в категории напитков и приоритете рассадки.",
 "Меню ужина начинается с 10 видов холодных мезе: долма, хумус, тарама, джаджик, салат пастуха, белый сыр, баклажанный салат, маринованные огурцы и сезонные дополнения. Далее подаётся горячая закуска и основное блюдо: рыба, курица или мясо; по запросу доступен вегетарианский гриль из овощей или паста. На десерт — фисташковая пахлава, тарелка фруктов и турецкий кофе.",
 "Шоу «Турецкая ночь» состоит из трёх актов: народные танцы регионов Турции, восточные танцы и сегменты с участием зала. Шоу идёт во время движения яхты — так Вы одновременно наблюдаете подсвеченный силуэт Босфора и сценическую программу.",
 "Политика по детям: бесплатно для детей до 3 лет, скидка 50% для 3–13 лет. Вегетарианское блюдо доступно по предварительному запросу. Поддержка трансфера действует для большинства центральных отелей европейской стороны; точное время сбора подтверждается письменно после бронирования.",
 ],
 trustSignal:
 "Предоставляется компанией Merry Tourism, лицензированной по группе А TÜRSAB (лицензия №14316) с 2001 года.",
 tableRows: [
 ["Длительность", "≈ 3,5 часа"],
 ["Отправление", "Кабаташ (20:30)"],
 ["Минимальная цена", "€30 (Silver Soft Drinks)"],
 ["Максимальная цена", "€90 (Gold Unlimited Alcohol)"],
 ["Количество пакетов", "4 варианта"],
 ["Трансфер", "Доступен для подходящих отелей"],
 ],
 packageSectionTitle: "Сравнение пакетов",
 perPerson: "за персону",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: ["Стандартное место", "Безлимитные безалкогольные напитки", "Меню ужина", "Шоу «Турецкая ночь»"],
 },
 {
 name: "Silver Alcoholic",
 price: "€45",
 items: ["Стандартное место", "Местный алкоголь", "Меню ужина", "Шоу «Турецкая ночь»"],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: ["VIP-место у сцены", "Безлимитные безалкогольные напитки", "Премиум-меню", "Турецкая ночь + DJ"],
 },
 {
 name: "Gold Unlimited Alcohol",
 price: "€90",
 items: ["VIP-место у сцены", "Безлимитный алкоголь", "Премиум-меню", "Турецкая ночь + DJ"],
 },
 ],
 faqTitle: "Часто задаваемые вопросы",
 faqs: [
 {
 q: "Сколько длится ужин-круиз?",
 a: "Круиз длится приблизительно 3,5 часа. Отправление от пирса Кабаташ в 20:30.",
 },
 {
 q: "Включён ли трансфер из отеля?",
 a: "Поддержка трансфера действует для большинства центральных отелей европейской стороны Стамбула. Точное время сбора и маршрут подтверждаются письменно после бронирования.",
 },
 {
 q: "В чём разница между пакетами?",
 a: "Разница в типе места (стандартное / VIP у сцены), категории напитков и уровне меню. Маршрут и длительность круиза одинаковы во всех пакетах.",
 },
 {
 q: "Когда лучше бронировать?",
 a: "В высокий сезон (май–сентябрь) рекомендуем бронировать минимум за 3–5 дней. Места заполняются быстро, особенно для VIP-пакетов.",
 },
 {
 q: "Есть ли вегетарианское меню?",
 a: "Да. Стандартное меню включает рыбу, курицу или мясо, однако для вегетарианцев доступны гриль из овощей или паста — укажите пожелание при бронировании. Запрос лучше отправить заранее, до подтверждения брони.",
 },
 {
 q: "Могут ли участвовать дети?",
 a: "Да, мы принимаем гостей всех возрастов. Дети до 3 лет — бесплатно. Для детей 3–13 лет действует детский тариф со скидкой 50%; достаточно указать количество и возраст детей при бронировании.",
 },
 {
 q: "Какой дресс-код?",
 a: "Обязательного дресс-кода нет. Рекомендуем smart casual, удобная одежда также принимается. Вечером на воде может быть прохладнее — советуем взять лёгкую верхнюю одежду.",
 },
 {
 q: "Как связаться из России?",
 a: "Пишите нам в WhatsApp — отвечаем на русском, подтверждение брони в течение нескольких минут в рабочее время. Доступен также телефон +90 544 898 98 12. ",
 },
 ],
 otherOptionsTitle: "Другие варианты",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "Круиз на закате",
 desc: "2-часовой круиз в золотой час от €30 (вт и чт).",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "Частная аренда яхты",
 desc: "Полностью приватная аренда яхты от €220.",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 },
 zh: {
 title: "伊斯坦布尔博斯普鲁斯晚宴游船 — €30 起",
 description:
 "博斯普鲁斯晚宴游船 €30 起:土耳其之夜表演、酒店接送支持、4 个套餐可选。TÜRSAB 许可。中文 WhatsApp 客服,直接预订。",
 h1: "伊斯坦布尔博斯普鲁斯晚宴游船",
 breadcrumb: "晚宴游船",
 canonicalPath: "/zh/istanbul-dinner-cruise",
 homeLabel: "首页",
 bosphorusLabel: "博斯普鲁斯游船",
 aboutTitle: "什么是博斯普鲁斯晚宴游船?",
 aboutBody: [
 "MerrySails 博斯普鲁斯晚宴游船是一种共享游艇巡航,您可以同时享受博斯普鲁斯全景、地道的土耳其料理和现场土耳其之夜表演。航程约 3.5 小时,20:30 从 Kabataş 码头出发,提供 4 个套餐:每人 €30、€45、€80 和 €90。",
 "Silver 套餐含标准座位、完整晚餐和土耳其之夜表演。Gold 套餐增加靠近舞台的 VIP 座位、升级菜单和无限酒水选项。所有套餐菜单相同 — 差异在于饮品类别和座位优先级。",
 "晚餐菜单从 10 种冷开胃菜开始:酿葡萄叶 (dolma)、鹰嘴豆泥 (hummus)、鱼籽酱 (tarama)、土耳其酸奶黄瓜酱 (cacık)、牧羊人沙拉、白奶酪、茄子沙拉、腌黄瓜及时令配菜。然后是热开胃菜和主菜:鱼、鸡肉或牛肉;可应要求提供烤蔬菜或意大利面素食选项。甜点为开心果巴克拉瓦、水果拼盘和土耳其咖啡。",
 "土耳其之夜表演分三幕:土耳其各地区民族舞蹈、东方舞蹈和观众参与节目。表演在游艇航行时进行 — 您可以同时欣赏灯光照亮的博斯普鲁斯轮廓和舞台节目。",
 "儿童政策:0–3 岁免费,3–13 岁 50% 折扣,13 岁以上按成人价。素食菜单可应要求提供 — 预订时请告知。欧洲一侧大多数中央酒店均可享受接送服务支持;具体接送时间在预订确认后通过 WhatsApp 书面提供。",
 ],
 trustSignal:
 "由 Merry Tourism 提供,自 2001 年起持有 TÜRSAB A 类许可证 (#14316)。中文 WhatsApp 客服可用。",
 tableRows: [
 ["时长", "约 3.5 小时"],
 ["出发", "Kabataş 码头 (20:30)"],
 ["最低价", "€30 (Silver Soft Drinks)"],
 ["最高价", "€90 (Gold 无限酒水)"],
 ["套餐数量", "4 个"],
 ["酒店接送", "符合条件的酒店可用"],
 ],
 packageSectionTitle: "套餐比较",
 perPerson: "每人",
 packages: [
 {
 name: "Silver Soft Drinks",
 price: "€30",
 items: ["标准座位", "无限非酒精饮料", "晚餐菜单", "土耳其之夜表演"],
 },
 {
 name: "Silver 酒水版",
 price: "€45",
 items: ["标准座位", "本地酒水", "晚餐菜单", "土耳其之夜表演"],
 },
 {
 name: "Gold Soft Drinks",
 price: "€80",
 items: ["VIP 舞台座位", "无限非酒精饮料", "升级菜单", "土耳其之夜 + DJ"],
 },
 {
 name: "Gold 无限酒水",
 price: "€90",
 items: ["VIP 舞台座位", "无限酒水", "升级菜单", "土耳其之夜 + DJ"],
 },
 ],
 faqTitle: "常见问题",
 faqs: [
 {
 q: "晚宴游船持续多久?",
 a: "约 3.5 小时。从 Kabataş 码头 20:30 出发。",
 },
 {
 q: "中国游客如何支付? 接受微信/支付宝吗?",
 a: "船上支付支持现金 (EUR/USD/TRY) 和国际信用卡 (Visa/Mastercard/AmEx)。中国银联、支付宝、微信支付目前不直接受理 — 请携带 Visa/Mastercard 或在本地兑换部分欧元/里拉。预订无需预付定金,直接船上结账。",
 },
 {
 q: "酒店接送费用包含吗?",
 a: "接送支持包含在 Gold Unlimited Alcohol 套餐 (€90) 和带接送的 Silver 套餐中。涵盖伊斯坦布尔欧洲一侧大多数中央酒店 (苏丹艾哈迈德、塔克西姆、卡拉柯伊)。具体接送时间和路线在预订确认后通过 WhatsApp 书面提供。",
 },
 {
 q: "套餐之间有什么区别?",
 a: "差异在于座位类型 (标准 / VIP 近舞台)、饮品类别和菜单等级。航线和持续时间在所有套餐中相同。",
 },
 {
 q: "什么时候预订最佳?",
 a: "旺季 (5–9 月) 建议至少提前 3–5 天预订。座位填满速度快,尤其是 VIP 套餐。",
 },
 {
 q: "有素食或清真选项吗?",
 a: "标准菜单含鱼、鸡肉或牛肉。素食客人可选烤蔬菜或意大利面 — 预订时请告知。我们的鸡肉为符合伊斯兰教法的清真供应,牛肉为本地土耳其供应。中东穆斯林客人请注意:酒精饮料在 Silver Alcohol 和 Gold Unlimited Alcohol 套餐中提供,如需完全清真餐请选择 Silver Soft Drinks 或 Gold Soft Drinks。",
 },
 {
 q: "孩子可以参加吗?",
 a: "可以,我们接待所有年龄段的客人。0–3 岁婴儿免费,3–13 岁儿童 50% 折扣,13 岁以上按成人价。预订时告知儿童人数和年龄即可。",
 },
 {
 q: "有着装要求吗?",
 a: "没有强制着装要求。推荐 smart casual,舒适装也可接受。水上夜晚可能较凉 — 建议携带轻便外套。",
 },
 {
 q: "中文服务可用吗?",
 a: "我们的 WhatsApp 客服可使用中文 (+90 544 898 98 12),工作时间内 (伊斯坦布尔时间 09:00-22:00) 几分钟回复。船上服务员主要使用英文和土耳其语,但菜单含中文菜品翻译。",
 },
 ],
 otherOptionsTitle: "其他选择",
 otherOptions: [
 {
 href: "/cruises/bosphorus-sunset-cruise",
 title: "日落游船",
 desc: "€30 起的 2 小时黄金时刻游船 (周一/二/四)。",
 },
 {
 href: "/yacht-charter-istanbul",
 title: "私人游艇包租",
 desc: "€220 起的完全私人游艇包租。",
 },
 {
 href: "/istanbul-dinner-cruise",
 title: "English Page",
 desc: "View this tour in English.",
 },
 ],
 },
};

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!dinnerTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

 return {
 title: t.title,
 description: t.description,
 alternates: {
 canonical: canonicalUrl,
 languages: buildHreflang("/istanbul-dinner-cruise"),
 },
 openGraph: {
 title: t.title,
 description: t.description,
 url: canonicalUrl,
 type: "website",
 images: [{ url: dinnerTour.image, width: 1200, height: 630, alt: t.h1 }],
 },
 twitter: {
 card: "summary_large_image",
 title: t.title,
 description: t.description,
 images: [dinnerTour.image],
 },
 };
}

export default async function LocaleDinnerCruisePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 if (!dinnerTour) notFound();

 const t = TRANSLATIONS[locale];
 if (!t) notFound();

 const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

 const momentum = await getProductBookingMomentum("bosphorus-dinner-cruise");
 const productLabelByLocale: Record<string, string> = {
 en: "dinner cruise",
 tr: "akşam yemekli tur",
 de: "Dinner-Kreuzfahrt",
 fr: "croisière dîner",
 nl: "dinercruise",
 ru: "ужин-круиз",
 zh: "晚宴游船",
 };
 const reserveLabelByLocale: Record<string, string> = {
 en: "Reserve from €30",
 tr: "€30'dan rezerve et",
 de: "Ab €30 buchen",
 fr: "Réserver dès €30",
 nl: "Boeken vanaf €30",
 ru: "Забронировать от €30",
 zh: "€30 起预订",
 };
 const whatsappPrefillByLocale: Record<string, string> = {
 en: "Hi MerrySails! I'm interested in the Bosphorus Dinner Cruise (from €30). What package fits us?",
 tr: "Merhaba MerrySails! Akşam Yemekli Boğaz Turu (€30'dan başlayan) için bize hangi paket uygun olur?",
 de: "Hallo MerrySails! Wir interessieren uns für die Bosporus-Dinner-Kreuzfahrt (ab €30). Welches Paket passt zu uns?",
 fr: "Bonjour MerrySails ! Nous sommes intéressés par la Croisière Dîner Bosphore (à partir de €30). Quelle formule nous convient ?",
 nl: "Hallo MerrySails! Wij zijn geïnteresseerd in de Bosporus Dinercruise (vanaf €30). Welk pakket past bij ons?",
 ru: "Здравствуйте, MerrySails! Нас интересует Ужин-круиз по Босфору (от €30). Какой пакет нам подойдёт?",
 zh: "您好,MerrySails!我对博斯普鲁斯晚宴游船(€30 起)感兴趣。哪个套餐适合我们?",
 };
 const productLabel = productLabelByLocale[locale] ?? productLabelByLocale.en;
 const reserveLabel = reserveLabelByLocale[locale] ?? reserveLabelByLocale.en;
 const whatsappPrefill = whatsappPrefillByLocale[locale] ?? whatsappPrefillByLocale.en;

 const serviceSchema = {
 "@context": "https://schema.org",
 "@type": ["TouristTrip", "Service"],
 "@id": `${canonicalUrl}#tour`,
 name: t.h1,
 alternateName: ["Istanbul Dinner Cruise", "Bosphorus Dinner Cruise", "İstanbul Akşam Yemeği Turu", "Bosporus Dinner Kreuzfahrt"],
 description: dinnerTour.description,
 touristType: "Cultural Tourism",
 url: canonicalUrl,
 image: dinnerTour.image,
 provider: { "@id": `${SITE_URL}/#organization` },
 areaServed: { "@type": "City", name: "Istanbul" },
 offers: {
 "@type": "AggregateOffer",
 lowPrice: Math.min(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
 highPrice: Math.max(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
 priceCurrency: "EUR",
 offerCount: dinnerTour.packages?.length ?? 1,
 availability: "https://schema.org/InStock",
 },
 };

 // Separate Product schema to surface AggregateRating as Google Review snippet
 // (Service/TouristTrip parent type is not supported by Google for Review snippet rich result)
 const productSchema = {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": `${canonicalUrl}#product`,
 name: t.h1,
 description: dinnerTour.description,
 image: dinnerTour.image,
 brand: { "@type": "Brand", name: "MerrySails" },
 sku: `merrysails-istanbul-dinner-cruise-${locale}`,
 category: "Bosphorus Dinner Cruise",
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: dinnerTour.rating,
 reviewCount: dinnerTour.reviewCount,
 bestRating: 5,
 worstRating: 1,
 },
 offers: {
 "@type": "AggregateOffer",
 priceCurrency: "EUR",
 lowPrice: Math.min(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
 highPrice: Math.max(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
 offerCount: dinnerTour.packages?.length ?? 1,
 availability: "https://schema.org/InStock",
 seller: { "@id": `${SITE_URL}/#organization` },
 },
 };

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: t.homeLabel, item: SITE_URL },
 { "@type": "ListItem", position: 2, name: t.bosphorusLabel, item: `${SITE_URL}/${locale}/bosphorus-cruise` },
 { "@type": "ListItem", position: 3, name: t.breadcrumb, item: canonicalUrl },
 ],
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 inLanguage: getBcp47(locale),
 mainEntity: t.faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };

 const restaurantSchema = {
 "@context": "https://schema.org",
 "@type": ["Restaurant", "FoodEstablishment"],
 "@id": `${canonicalUrl}#restaurant`,
 name: t.h1,
 url: canonicalUrl,
 image: dinnerTour.image,
 telephone: "+905448989812",
 email: "info@merrysails.com",
 address: {
 "@type": "PostalAddress",
 streetAddress: "Kabataş İskelesi",
 addressLocality: "Kabataş, Beşiktaş",
 addressRegion: "Istanbul",
 postalCode: "34357",
 addressCountry: "TR",
 },
 geo: {
 "@type": "GeoCoordinates",
 latitude: 41.0378,
 longitude: 28.9978,
 },
 servesCuisine: ["Turkish", "Mediterranean"],
 priceRange: "€€–€€€",
 acceptsReservations: true,
 hasMenu: `${canonicalUrl}#menu`,
 openingHoursSpecification: [
 {
 "@type": "OpeningHoursSpecification",
 dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
 opens: "20:30",
 closes: "00:00",
 },
 ],
 areaServed: {
 "@type": "City",
 name: "Istanbul",
 },
 // 2026-06-11: aggregateRating removed from Restaurant — kept on Product only.
 // Rule #4a: same page with multiple AR parents (Restaurant + Product) =
 // Google parser conflict. Product is the canonical AR parent for the locale dinner-cruise page.
 currenciesAccepted: "EUR",
 // NOTE: inLanguage removed — Google's LocalBusiness/Restaurant validator does not
 // recognize this property on LocalBusiness subclasses. (Source: Semrush audit 2026-05-17)
 };

 const trMenuSections =
 locale === "tr"
 ? [
 {
 "@type": "MenuSection",
 name: "Silver Soft Drinks — €30",
 description: "Standart koltuk, sınırsız alkolsüz içecek, tam akşam yemeği servisi ve Türk gecesi gösterisi.",
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 price: 30,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: canonicalUrl,
 },
 hasMenuItem: [
 { "@type": "MenuItem", name: "Karışık Meze Tabağı", description: "Humus, Babagannuş, Patlıcan Salatası, Sigara Böreği, Dolma, Cacık, Çoban Salatası, Beyaz Peynir" },
 { "@type": "MenuItem", name: "Karides Güveç", description: "Ara sıcak" },
 { "@type": "MenuItem", name: "Ana Yemek Seçeneği", description: "Izgara Levrek, Köfte, Tavuk Şiş veya Tavuklu Pilav" },
 { "@type": "MenuItem", name: "Baklava", description: "Fıstıklı baklava" },
 { "@type": "MenuItem", name: "Sütlaç" },
 { "@type": "MenuItem", name: "Türk Lokumu" },
 { "@type": "MenuItem", name: "Meyve Tabağı ve Türk Kahvesi" },
 { "@type": "MenuItem", name: "Sınırsız Alkolsüz İçecek", description: "Meşrubat ve çay dahil" },
 ],
 },
 {
 "@type": "MenuSection",
 name: "Silver Alcoholic — €45",
 description: "Standart koltuk, yerel alkollü içecekler dahil, tam akşam yemeği servisi ve Türk gecesi gösterisi.",
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 price: 45,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: canonicalUrl,
 },
 hasMenuItem: [
 { "@type": "MenuItem", name: "Silver Menüsü (Tam)", description: "Silver Soft Drinks ile aynı 4 aşamalı yemek menüsü" },
 { "@type": "MenuItem", name: "Yerel Bira ve Rakı", description: "Yerel alkollü içecekler dahil; ithal içecekler ek ücretlidir" },
 ],
 },
 {
 "@type": "MenuSection",
 name: "Gold Soft Drinks — €80",
 description: "VIP sahne yakını koltuk garantisi, genişletilmiş premium menü, sınırsız alkolsüz içecek ve Türk gecesi + DJ.",
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 price: 80,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: canonicalUrl,
 },
 hasMenuItem: [
 { "@type": "MenuItem", name: "Karışık Meze Tabağı (Genişletilmiş)", description: "Humus, Babagannuş, Patlıcan Salatası, Sigara Böreği, Dolma ve ek mezeler" },
 { "@type": "MenuItem", name: "Levrek Buğulama", description: "Premium ara sıcak" },
 { "@type": "MenuItem", name: "Premium Ana Yemek", description: "Izgara Levrek, Köfte, Tavuk Şiş veya Tavuklu Pilav; şef servisi" },
 { "@type": "MenuItem", name: "Baklava, Sütlaç, Türk Lokumu, Meyve Tabağı" },
 { "@type": "MenuItem", name: "VIP Sahne Yakını Koltuk Garantisi" },
 { "@type": "MenuItem", name: "Sınırsız Alkolsüz İçecek" },
 ],
 },
 {
 "@type": "MenuSection",
 name: "Gold Unlimited Alkol — €90",
 description: "En iyi VIP koltuk, premium menü, sınırsız yerel ve ithal alkol dahil, Türk gecesi + DJ.",
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 price: 90,
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: canonicalUrl,
 },
 hasMenuItem: [
 { "@type": "MenuItem", name: "Gold Premium Menüsü", description: "Gold Soft Drinks ile aynı genişletilmiş 4 aşamalı yemek menüsü" },
 { "@type": "MenuItem", name: "Sınırsız Yerel ve İthal Alkol", description: "Rakı, şarap, bira ve diğer alkollü içecekler dahil" },
 { "@type": "MenuItem", name: "VIP Öncelikli Masa", description: "Sahneye en yakın masalar" },
 ],
 },
 ]
 : t.packages.map((pkg) => ({
 "@type": "MenuSection",
 name: pkg.name,
 description: pkg.items.join("; "),
 offers: {
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 price: parseInt(pkg.price.replace("€", ""), 10),
 priceCurrency: "EUR",
 availability: "https://schema.org/InStock",
 url: canonicalUrl,
 },
 }));

 const menuSchema = {
 "@context": "https://schema.org",
 "@type": "Menu",
 "@id": `${canonicalUrl}#menu`,
 name: t.packageSectionTitle,
 url: canonicalUrl,
 inLanguage: getBcp47(locale),
 hasMenuSection: trMenuSections,
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />

 <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
 <div className="container-main">
 {/* 2026-06-05: removed page-level sr-only <h1> — TourDetailClient renders
     the canonical visible <h1>. Duplicate flagged by Semrush. */}
 <QuickAnswer productKey="istanbul-dinner-cruise" locale={locale} />
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
 <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.homeLabel}</Link>
 <span>/</span>
 <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">{t.bosphorusLabel}</Link>
 <span>/</span>
 <span
   aria-current="page"
   className="text-[var(--text-muted)] truncate">{t.breadcrumb}</span>
 </nav>

 {dinnerTour.packages?.some((p) => p.weekdayDiscount) && (
 <WeekdayDiscountBanner
 packages={dinnerTour.packages}
 productName={dinnerTour.nameEn}
 strings={getWeekdayDiscountStrings(locale as SiteLocale)}
 />
 )}

 {/* Locale conversion stack */}
 <SocialProofBadges
 variant="product"
 productKey="dinner"
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
 tour={getTourBySlug("bosphorus-dinner-cruise", locale) ?? dinnerTour}
 related={relatedTours}
 locale={locale as SiteLocale}
 />

 <div className="my-8">
 <ReviewsCarousel productKey="dinner" locale={locale as SiteLocale} mainEntityId={`${canonicalUrl}#product`} />
 </div>

 <LocaleHelpfulResources locale={locale as SiteLocale} omit="dinner" />

 <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.aboutTitle}</h2>
 <div className="grid gap-6 md:grid-cols-2">
 <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
 {t.aboutBody.map((paragraph, idx) => (
 <p key={idx}>{paragraph}</p>
 ))}
 <p className="text-[var(--heading)] font-medium">{t.trustSignal}</p>
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
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.packageSectionTitle}</h2>
 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
 {t.packages.map((pkg) => (
 <div key={pkg.name} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <div className="mb-3">
 <p className="font-bold text-[var(--heading)]">{pkg.name}</p>
 <p className="text-xl font-bold text-[var(--brand-primary)]">{pkg.price}</p>
 <p className="text-xs text-[var(--text-muted)]">{t.perPerson}</p>
 </div>
 <ul className="space-y-1">
 {pkg.items.map((item) => (
 <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
 <span className="mt-0.5 text-[var(--brand-primary)]">✓</span>
 {item}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </section>

 {t.menuDetailSection && (
 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{t.menuDetailSection.title}</h2>
 <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">{t.menuDetailSection.intro}</p>
 <div className="grid gap-4 md:grid-cols-2">
 {t.menuDetailSection.sections.map((sec) => (
 <div key={sec.heading} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <h3 className="font-semibold text-[var(--heading)] mb-2">{sec.heading}</h3>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">{sec.items}</p>
 {sec.note && (
 <p className="mt-2 text-xs text-[var(--text-muted)] italic">{sec.note}</p>
 )}
 </div>
 ))}
 </div>
 </section>
 )}

 {t.operatorNote && (
 <section className="mt-8 rounded-2xl border border-[var(--brand-primary)]/25 bg-[var(--surface-alt)] p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{t.operatorNote.title}</h2>
 <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
 {t.operatorNote.body.map((paragraph, idx) => (
 <p key={idx}>{paragraph}</p>
 ))}
 </div>
 <div className="mt-5">
 <Link
 href={`/${locale}/reservation?tour=bosphorus-dinner-cruise#core-booking-planner`}
 className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
 >
 €30&apos;dan doğrudan rezervasyon yap
 </Link>
 </div>
 </section>
 )}

 {t.localTransitGuide && (
 <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{t.localTransitGuide.title}</h2>
 <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">{t.localTransitGuide.intro}</p>
 <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
 <table className="w-full border-collapse text-left text-sm">
 <tbody>
 {t.localTransitGuide.rows.map((row) => (
 <tr key={row.mode} className="border-b border-[var(--line)] last:border-b-0 align-top">
 <th className="w-40 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">{row.mode}</th>
 <td className="p-3 text-[var(--text-muted)] leading-relaxed">{row.detail}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="mt-4 text-sm font-medium text-[var(--heading)]">{t.localTransitGuide.tip}</p>
 </section>
 )}

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
 {t.otherOptions.map((item) => {
 // The "English Page" link points at the EN root (no locale prefix).
 // For every other option, prefix with the current locale — but strip any
 // locale prefix the data already carries so we never double-prefix
 // (e.g. /ru/ru/... or /zh/zh/...).
 const bare = item.href.replace(
 /^\/(en|tr|de|fr|nl|ru|zh)(?=\/)/,
 ""
 );
 const href = item.href.startsWith("/istanbul-dinner-cruise")
 ? item.href
 : `/${locale}${bare}`;
 return (
 <Link
 key={item.href}
 href={href}
 className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
 >
 <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
 <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
 </Link>
 );
 })}
 </div>
 </section>
 </div>
 </div>
 <StickyMobileCta
 reserveHref={`/${locale}/reservation?tour=bosphorus-dinner-cruise#core-booking-planner`}
 reserveLabel={reserveLabel}
 locale={locale as SiteLocale}
 whatsappLocation={`locale_dinner_${locale}`}
 whatsappPrefill={whatsappPrefill}
 />
 </>
 );
}
