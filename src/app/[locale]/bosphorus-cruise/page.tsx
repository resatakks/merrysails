import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import LocaleHelpfulResources from "@/components/layout/LocaleHelpfulResources";

export const revalidate = 3600;

type FaqItem = { q: string; a: string };
type PriceRow = { name: string; price: string; duration: string; included: string };

type LocaleContent = {
  htmlLang: string;
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  subtitle: string;
  intro: string;
  trustBadge: string;
  keyFacts: { label: string; value: string }[];
  tourOptions: { slug: string; title: string; price: string; duration: string; tag: string; desc: string }[];
  priceTableTitle: string;
  priceTableCols: [string, string, string, string];
  priceRows: PriceRow[];
  compareSectionTitle: string;
  compareItems: { title: string; desc: string }[];
  whyTitle: string;
  whyItems: { title: string; desc: string }[];
  departureTitle: string;
  departureParagraph: string;
  departurePoints: string[];
  faqTitle: string;
  faqs: FaqItem[];
  homeLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBookLabel: string;
  ctaWhatsappLabel: string;
  aggregateRating: { value: string; count: string };
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    htmlLang: "tr-TR",
    title: "Boğaz Turu İstanbul — €34'dan başlayan fiyatlar",
    description: "İstanbul Boğaz turu: yemekli boğaz turu €30'dan, gün batımı turu €34'ten, Eminönü kalkışlı. TÜRSAB A Grubu lisanslı, 50.000+ misafir. Online rezervasyon.",
    canonicalPath: "/tr/bosphorus-cruise",
    h1: "Boğaz Turu İstanbul",
    subtitle: "MerrySails İstanbul",
    intro: "İstanbul boğaz turu seçeneklerimiz: gün batımı boğaz turu €34'ten, yemekli boğaz turu €30'dan, özel yat kiralama €280'den. TÜRSAB A Grubu lisanslı, 2001'den bu yana 50.000'i aşkın misafir. Doğrudan rezervasyon, aracısız fiyat.",
    trustBadge: "TÜRSAB A Grubu Lisanslı · 2001'den Bu Yana · 50.000+ Misafir",
    keyFacts: [
      { label: "Gün Batımı Turu", value: "€34'ten" },
      { label: "Akşam Yemeği Turu", value: "€30'dan" },
      { label: "Özel Yat", value: "€280'den" },
      { label: "Hizmet", value: "2001'den beri" },
    ],
    tourOptions: [
      { slug: "sunset", title: "Boğaz Gün Batımı Turu", price: "€34", duration: "2 saat", tag: "En çok tercih edilen", desc: "İki seçenek: Şarapsız €34, Şaraplı €40. Altın saat manzarası, canlı rehber ve hafif ikramlar dahil. Günbatımı ışığında Boğaz köprüleri ve tarihi yalılar." },
      { slug: "dinner", title: "İstanbul Akşam Yemeği Turu", price: "€30", duration: "3,5 saat", tag: "4 paket seçeneği", desc: "€30'dan €90'a kadar 4 farklı paket. Türk gecesi gösterisi, akşam yemeği ve Sultanahmet/Taksim'den otel transfer desteği." },
      { slug: "yacht", title: "Özel Yat Kiralama", price: "€200", duration: "2+ saat", tag: "Tam özel deneyim", desc: "Tüm tekne size özel. Evlilik teklifi, doğum günü, aile kutlaması ve kurumsal etkinlikler için ideal. Güzergah ve menüyü siz belirlersiniz." },
      { slug: "boat", title: "Tekne Kiralama İstanbul", price: "Saatlik", duration: "Esnek", tag: "Önce tekne seçin", desc: "Tekne ve güzergahı siz belirleyin, dilediğiniz ekstraları sonra ekleyin. 2 saatten günlük kiralamaya kadar tüm süreler mevcuttur." },
    ],
    priceTableTitle: "İstanbul Boğaz Turu Fiyatları 2026",
    priceTableCols: ["Tur", "Fiyat", "Süre", "Dahil Olanlar"],
    priceRows: [
      { name: "Gün Batımı Turu — Şarapsız", price: "€34 / kişi", duration: "2 saat", included: "Rehber, ikram, köprü altı geçiş" },
      { name: "Gün Batımı Turu — Şaraplı", price: "€40 / kişi", duration: "2 saat", included: "Rehber, 1 bardak şarap, ikram" },
      { name: "Akşam Yemeği — Temel", price: "€30 / kişi", duration: "3,5 saat", included: "Akşam yemeği, müzik, Türk gecesi gösterisi" },
      { name: "Akşam Yemeği — Silver Alkollü", price: "€45 / kişi", duration: "3,5 saat", included: "Standart koltuk, yerel alkol, akşam yemeği, Türk gecesi" },
      { name: "Akşam Yemeği — Gold Alkolsüz", price: "€80 / kişi", duration: "3,5 saat", included: "VIP koltuk (sahne yakını), premium menü, alkolsüz" },
      { name: "Akşam Yemeği — Otel Transfer", price: "€90 / kişi", duration: "~5 saat", included: "Sultanahmet/Taksim transfer dahil" },
      { name: "Özel Yat Kiralama (2 saat)", price: "€280 / tekne", duration: "2 saat", included: "Tüm tekne size özel, 8 kişiye kadar" },
    ],
    compareSectionTitle: "Hangi İstanbul Boğaz Turu Size Uygun?",
    compareItems: [
      { title: "Süre ve bütçe", desc: "2 saatlik hafif bir deneyim için gün batımı turu (€34), tam akşam programı için yemekli tur (€30–€90), tam özelleştirme için yat kiralama (€280+)." },
      { title: "Özel mi, paylaşımlı mı?", desc: "Gün batımı ve akşam yemeği turları paylaşımlı teknelerdir. Evlilik teklifi, kutlama veya özel grup etkinliği için tüm tekneyi kiralayın." },
      { title: "Rezervasyon zamanlaması", desc: "Yaz sezonunda (Mayıs–Eylül) popüler tarihler 1–2 hafta öncesinden doluyor. Belirli bir tarih varsa erken rezervasyon yapmanızı öneririz." },
    ],
    whyTitle: "Neden MerrySails?",
    whyItems: [
      { title: "TÜRSAB A Grubu Lisansı", desc: "2001'den bu yana Türkiye Seyahat Acentaları Birliği'nin en üst kategorisi olan A Grubu lisansıyla faaliyet gösteriyoruz. Güvenli rezervasyon, yasal güvence." },
      { title: "50.000+ Memnun Misafir", desc: "Yılda 10.000'den fazla misafir ağırlıyoruz. Google, TripAdvisor ve Viator'da 4.8 üzerinde puan almaktayız." },
      { title: "Komisyon Yok — Doğrudan Fiyat", desc: "Üçüncü taraf platformu komisyonu olmadan, doğrudan bizden rezervasyon yapabilirsiniz. Aynı hizmet, daha düşük fiyat." },
      { title: "Ücretsiz İptal", desc: "Sefer tarihinden 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi. Planlarınız değişirse endişelenmeyin." },
    ],
    departureTitle: "Nereden Kalkar?",
    departureParagraph: "İstanbul Boğaz turları Avrupa yakasındaki birkaç iskeleden hareket eder. Kaldığınız otele en yakın kalkış noktasını seçerek kolayca ulaşabilirsiniz.",
    departurePoints: [
      "Kabataş — Dolmabahçe Sarayı karşısı, metro ve tramvay bağlantılı",
      "Beşiktaş — Adalar vapur iskelesi yanı, merkezi konum",
      "Kuruçeşme Marina — Özel yat kiralamalar için lüks marina",
      "Sultanahmet & Taksim — Seçili paketlerde ücretsiz otel transfer",
    ],
    faqTitle: "Sık Sorulan Sorular",
    faqs: [
      { q: "Boğaz turu ne kadar sürer?", a: "Gün batımı turları 2 saat, akşam yemeği turları yaklaşık 3,5 saattir. Özel yat kiralama için süreyi siz belirlersiniz; minimum 2 saat olup istediğiniz kadar uzatabilirsiniz." },
      { q: "Boğaz turu için en iyi dönem ne zaman?", a: "Yıl boyunca tur düzenlenmektedir. Mayıs–Eylül en yoğun sezon olmakla birlikte, Nisan ve Ekim en ideal hava koşullarını sunar. Kışın Boğaz daha sakin ve fotoğrafik bir atmosfer kazanır." },
      { q: "Tekne turunda çocuk indirimi var mı?", a: "6 yaş altı çocuklar ücretsizdir. 6–12 yaş arası çocuklara %50 indirim uygulanır. Rezervasyon sırasında çocuk sayısını ve yaşlarını belirtmenizi öneririz." },
      { q: "Rezervasyon iptali mümkün mü?", a: "Evet. Sefer tarihinden 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi yapılmaktadır. 48 saatten az kalan iptallerde %50 iade uygulanır." },
      { q: "Yemekli boğaz turu nedir? Ne dahil?", a: "Yemekli boğaz turu (akşam yemeği turu), 3,5 saatlik bir Boğaz deneyimidir. €30'dan €90'a 4 farklı paket mevcuttur: Temel pakette mezeler + ana yemek + Türk gecesi gösterisi dahil; Premium pakette 5 çeşit yemek + açık alkol + VIP oturma dahildir. Ayrıca Sultanahmet ve Taksim bölgesinden otel transfer seçeneği de sunulmaktadır." },
      { q: "Eminönü'den boğaz turu var mı?", a: "Evet, Eminönü en merkezi kalkış noktamızdır. Tarihi yarımada'da yer alır; tramvay (T1 hattı) ve metro (M2) ile kolayca ulaşılır. Hem gün batımı hem akşam yemeği turlarımız Eminönü İskelesi'nden hareket eder. Bunun yanı sıra Kabataş, Beşiktaş ve Üsküdar'dan da kalkış seçeneği mevcuttur; otele en yakın iskeleyi tercih edebilirsiniz." },
      { q: "Boğaz turu saatleri nedir? Hangi saatlerde kalkış var?", a: "Gün batımı turları günbatımından yaklaşık 1 saat önce kalkar; yaz aylarında (Mayıs–Eylül) saat 19:00–19:30, kış aylarında 16:30–17:00 civarındadır. Akşam yemeği turları genellikle saat 20:30'da hareket eder. Sabitlenmiş kalkış saati rezervasyon onayınızda belirtilir; tarihe ve sezona göre hafif değişkenlik gösterebilir." },
      { q: "Üsküdar'dan boğaz turu var mı?", a: "Evet. Üsküdar Anadolu yakasında olduğu için Kabataş veya Eminönü bağlantısıyla ulaşım kolaydır; Üsküdar – Kabataş vapur hattı ~10 dakika sürer. Kabataş ve Eminönü kalkışlı turlarımıza Üsküdar'dan ferriyle ya da köprüden geçerek kolayca katılabilirsiniz. Ayrıca bazı özel yat kiralama ve büyük grup paketleri için Anadolu yakasından kalkış da ayarlanabilir." },
      { q: "Özel yat kiralama için kaç kişi gerekir?", a: "Özel yat kiralama, kişi sayısına değil tekne başına fiyatlandırılır. 2 kişilik bir çift de tüm tekneyi kiralayabilir. Kapasiteye göre 8–30 kişilik tekne seçenekleri mevcuttur." },
      { q: "Alkol servisi yapılıyor mu?", a: "Gün batımı turlarında şaraplı seçenek vardır (€40/kişi). Akşam yemeği turlarının standart paketinde içecek, premium paketinde ise açık alkol dahildir. Özel yat kiralamada menüyü siz belirlersiniz." },
    ],
    homeLabel: "Ana Sayfa",
    ctaTitle: "Hemen Yerinizi Ayırın",
    ctaSubtitle: "Boğaz'da unutulmaz bir deneyim için online rezervasyon yapın veya WhatsApp üzerinden ulaşın.",
    ctaBookLabel: "Online Rezervasyon →",
    ctaWhatsappLabel: "WhatsApp ile Yaz",
    aggregateRating: { value: "4.9", count: "487" },
  },

  de: {
    htmlLang: "de-DE",
    title: "Bosporus Kreuzfahrt Istanbul — Ab €34",
    description: "Bosporus Kreuzfahrt Istanbul: Sonnenuntergang ab €34, Dinner-Kreuzfahrt ab €30, Privatjacht ab €200. TÜRSAB-lizenziert seit 2001, 50.000+ Gäste.",
    canonicalPath: "/de/bosphorus-cruise",
    h1: "Bosporus Kreuzfahrt Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Der Bosporus ist die 31 Kilometer lange Meerenge, die Europa und Asien trennt — und das Herzstück jedes Istanbulbesuchs. Eine Bosporus Kreuzfahrt führt Sie an osmanischen Palästen, jahrhundertealten Festungen und malerischen Holzvillen (Yalı) vorbei, während zwei Kontinente gleichzeitig am Horizont leuchten. Merry Tourism, TURSAB A-Gruppe lizenziert seit 2001, bietet Ihnen drei Erlebniskategorien: Sonnenuntergangs-Kreuzfahrt ab €34, Dinner-Kreuzfahrt ab €30 und Privatjacht ab €200. Über 50.000 Gäste haben mit uns die Meerenge zwischen zwei Welten erlebt — buchen Sie direkt beim Anbieter, ohne Aufpreis.",
    trustBadge: "TÜRSAB A-Gruppe lizenziert · seit 2001 · 50.000+ Gäste",
    keyFacts: [
      { label: "Sonnenuntergang-Tour", value: "ab €34" },
      { label: "Dinner-Kreuzfahrt", value: "ab €30" },
      { label: "Privat-Jacht", value: "ab €280" },
      { label: "Lizenziert seit", value: "2001" },
    ],
    tourOptions: [
      { slug: "sunset", title: "Bosporus Sonnenuntergang-Kreuzfahrt", price: "€34", duration: "2 Std.", tag: "Beliebteste Option", desc: "Die Sonnenuntergangs-Kreuzfahrt ist die meistgebuchte Erfahrung auf dem Bosporus. Zwei Optionen: Ohne Wein €34, mit einem Glas türkischem Wein €40 — jeweils inklusive Guide, Erfrischungen und Brückendurchfahrt. Die Route führt am Dolmabahçe-Palast, der Rumeli Hisarı-Festung und den Herrenhäusern am Ufer entlang, während das goldene Abendlicht die Silhouette des europäischen und asiatischen Ufers in sanftes Orange taucht." },
      { slug: "dinner", title: "Istanbul Dinner Cruise", price: "€30", duration: "3,5 Std.", tag: "4 Pakete", desc: "Die Dinner-Kreuzfahrt kombiniert ein 3,5-stündiges Fahrerlebnis auf dem Bosporus mit einem mehrgängigen türkischen Abendessen und einer traditionellen Kulturshow. Vier Pakete stehen zur Wahl: Basis (€30), Silver mit Alkohol (€45), Gold ohne Alkohol (€80) und Komfortpaket mit Hoteltransfer ab Sultanahmet oder Taksim (€90). Vegetarische Optionen und Kindermenüs sind auf Anfrage erhältlich." },
      { slug: "yacht", title: "Privatjachtcharter", price: "€200", duration: "2+ Std.", tag: "Vollständig privat", desc: "Beim Privatjachtcharter gehört das gesamte Schiff ausschließlich Ihrer Gruppe — ideal für Heiratsanträge, Geburtstagsfeiern, Familientreffen und Firmenevents. Route, Menü und Zeitplan bestimmen Sie selbst. Unsere Flotte bietet Kapazitäten für 2 bis 30 Personen; Merry Tourism berät Sie kostenlos bei der Auswahl des passenden Schiffs." },
      { slug: "boat", title: "Bootsverleih Istanbul", price: "Stündlich", duration: "Flexibel", tag: "Boot zuerst wählen", desc: "Wählen Sie Ihr Wunschboot aus unserer Flotte, legen Sie Route und Dauer selbst fest und fügen Sie optional Catering, Guide oder besondere Dekoration hinzu. Buchbar von 2 Stunden bis zur ganzen Tagesmiete, ganzjährig verfügbar." },
    ],
    priceTableTitle: "Bosporus Kreuzfahrt Preistabelle 2026",
    priceTableCols: ["Tour", "Preis", "Dauer", "Im Preis enthalten"],
    priceRows: [
      { name: "Sonnenuntergang — ohne Wein", price: "€34 / Person", duration: "2 Std.", included: "Guide, Erfrischungen, Brückendurchfahrt" },
      { name: "Sonnenuntergang — mit Wein", price: "€40 / Person", duration: "2 Std.", included: "Guide, 1 Glas Wein, Erfrischungen" },
      { name: "Dinner-Kreuzfahrt — Basis", price: "€30 / Person", duration: "3,5 Std.", included: "Abendessen, Musik, türkische Nachtshow" },
      { name: "Dinner-Kreuzfahrt — Silver Alkohol", price: "€45 / Person", duration: "3,5 Std.", included: "Standardplatz, lokaler Alkohol, Abendmenü, türkische Show" },
      { name: "Dinner-Kreuzfahrt — Gold Softdrinks", price: "€80 / Person", duration: "3,5 Std.", included: "VIP-Platz (Bühnennähe), Premium-Menü, alkoholfreie Getränke" },
      { name: "Dinner — mit Hoteltransfer", price: "€90 / Person", duration: "~5 Std.", included: "Transfer Sultanahmet/Taksim inklusive" },
      { name: "Privat-Jacht (2 Std.)", price: "€280 / Boot", duration: "2 Std.", included: "Ganzes Boot für Sie, bis 8 Personen" },
    ],
    compareSectionTitle: "Welche Bosporus-Tour passt zu Ihnen?",
    compareItems: [
      { title: "Dauer und Budget", desc: "Für ein kompaktes 2-Stunden-Erlebnis bei Sonnenuntergang empfehlen wir die Sonnenuntergangs-Kreuzfahrt ab €34 — perfekt für Reisende mit knappem Zeitplan. Wer einen vollständigen Abend mit türkischer Küche und Kulturshow erleben möchte, wählt die Dinner-Kreuzfahrt (€30–€90, 3,5 Stunden). Für maximale Privatsphäre, maßgeschneiderte Route und individuelle Gruppengrößen ab 2 Personen bietet sich die Privatjacht ab €200 an." },
      { title: "Privat oder gemeinsam?", desc: "Sonnenuntergangs- und Dinner-Kreuzfahrten finden auf geteilten Booten mit anderen Gästen statt — gesellig, erschwinglich und ideal für Einzelreisende oder Paare. Möchten Sie einen romantischen Heiratsantrag machen, eine Geburtstagsfeier veranstalten oder mit einer Firmengruppe alleine auf dem Bosporus sein? Dann ist die Privatjacht die richtige Wahl: Das Boot gehört ausschließlich Ihnen, und Sie gestalten das Erlebnis von Anfang bis Ende selbst." },
      { title: "Buchungstiming", desc: "In der Hauptsaison von Mai bis September sind die beliebtesten Abendtermine häufig 1 bis 2 Wochen im Voraus ausgebucht, besonders an Wochenenden und türkischen Feiertagen. Wir empfehlen, bei einem festen Reisedatum frühzeitig online zu reservieren. Außerhalb der Hochsaison (Oktober–April) sind kurzfristige Buchungen meist problemlos möglich, und die Boote sind ruhiger." },
    ],
    whyTitle: "Warum Merry Tourism wählen?",
    whyItems: [
      { title: "TURSAB A-Gruppe Lizenz", desc: "Merry Tourism ist seit 2001 durchgehend mit der TURSAB A-Gruppe lizenziert — der höchsten Zulassungskategorie des türkischen Reisebüroverbands (Türkiye Seyahat Acentaları Birliği). Diese Lizenz belegt, dass wir die strengsten gesetzlichen Anforderungen an Sicherheit, Versicherung und Servicequalität erfüllen. Für Sie bedeutet das: gesicherte Buchung, klare Rückerstattungsregeln und rechtliche Absicherung bei jeder Reservierung." },
      { title: "Über 50.000 zufriedene Gäste", desc: "Seit 2001 haben mehr als 50.000 Gäste aus aller Welt mit uns den Bosporus erlebt — darunter Familien, Paare, Reisegruppen und Unternehmensveranstaltungen. Unsere Bewertungen liegen bei 4,8 von 5 Sternen auf Google, TripAdvisor und Viator. Diese langjährige Erfahrung schlägt sich in reibungslosen Abläufen, zuverlässiger Kommunikation und einem Service nieder, der auf Wiederkommen ausgelegt ist." },
      { title: "Direkt buchen — kein Aufpreis", desc: "Viele Bosporus-Kreuzfahrten werden über OTA-Plattformen wie Viator oder GetYourGuide angeboten, die bis zu 25 % Provision einbehalten. Bei uns buchen Sie direkt beim Anbieter — ohne Zwischenhändler, ohne versteckte Gebühren. Sie erhalten denselben Service zu einem günstigeren Preis und haben bei Fragen oder Änderungen direkten Kontakt zu unserem Team." },
      { title: "Kostenlose Stornierung", desc: "Reisepläne können sich ändern — das wissen wir. Deshalb bieten wir kostenlose Stornierung und vollständige Rückerstattung bis 48 Stunden vor Abfahrt. Bei Stornierung innerhalb von 48 Stunden erstatten wir 50 % des Buchungsbetrags. Keine versteckten Klauseln, keine komplizierten Bedingungen." },
    ],
    departureTitle: "Abfahrtsorte in Istanbul",
    departureParagraph: "Bosporus-Kreuzfahrten starten von mehreren Piers auf der europäischen Seite Istanbuls. Karaköy und Kabataş sind die verkehrsgünstigsten Ausgangspunkte — beide direkt an der Tram-Linie T1 und mit U-Bahn-Anschluss. Eminönü, im Herzen der Altstadt gelegen, ist besonders für Gäste aus dem Sultanahmet-Viertel ideal und in wenigen Minuten zu Fuß vom Großen Basar erreichbar. Beşiktaş bietet eine zentrale Lage zwischen Kabataş und Ortaköy. Für Privatjachten empfehlen wir die Kuruçeşme Marina — eine der exklusivsten Marinas Istanbuls, direkt am Bosporus-Ufer, mit vollständiger Infrastruktur für Charter-Gäste. Gäste aus dem Taksim- oder Beyoğlu-Viertel erreichen Kabataş bequem mit der nostalgischen Tünel-Straßenbahn oder der Fähre. Bei ausgewählten Dinner-Paketen (€90) ist der Hoteltransfer ab Sultanahmet und Taksim bereits inklusive.",
    departurePoints: [
      "Kabataş — gegenüber Dolmabahçe-Palast, direkter Tram-T1- und U-Bahn-Anschluss",
      "Eminönü — historische Altstadt, Fußweg vom Großen Basar, ideal für Sultanahmet-Gäste",
      "Beşiktaş — neben der Fähranlegestelle, zentrale Lage zwischen Taksim und Ortaköy",
      "Karaköy — modernes Kreuzfahrtterminal, 5 Minuten von Galata-Turm und Galataport",
      "Kuruçeşme Marina — Luxusmarina für Privatjachten, exklusiv und ruhig",
      "Sultanahmet & Taksim — kostenloser Hoteltransfer bei ausgewählten Dinner-Paketen (€90)",
    ],
    faqTitle: "Häufig gestellte Fragen — Bosporus Kreuzfahrt Istanbul",
    faqs: [
      { q: "Was kostet eine Bootsfahrt auf dem Bosporus Istanbul?", a: "Eine Bootsfahrt auf dem Bosporus Istanbul kostet ab €34 pro Person (Sonnenuntergangs-Tour, 2 Stunden, ohne Wein). Die Dinner-Kreuzfahrt beginnt bei €30 pro Person. Eine vollständig private Jacht gibt es ab €280 pro Boot — egal ob für 2 oder 20 Personen. Alle Preise verstehen sich inklusive Kapitän, Crew und Grundausstattung; keine versteckten Extragebühren." },
      { q: "Wie lange dauert eine Bosporus-Kreuzfahrt?", a: "Die Sonnenuntergangskreuzfahrt dauert genau 2 Stunden, die Dinner-Kreuzfahrt ca. 3,5 Stunden (inklusive Show und Abendessen). Beim Privatjachtcharter bestimmen Sie die Dauer selbst; das Minimum beträgt 2 Stunden, nach oben gibt es keine Grenze." },
      { q: "Was ist der Unterschied zwischen bosporus rundfahrt und bosporus kreuzfahrt?", a: "Im deutschen Sprachgebrauch werden die Begriffe ‚Bosporus Rundfahrt', ‚Bosporus Kreuzfahrt' und ‚Bosporus Bootsfahrt' synonym verwendet — alle meinen dieselbe Erfahrung: eine geführte Bootstour auf der Meerenge zwischen Europa und Asien. Bei MerrySails gibt es drei Varianten: die kurze Rundfahrt bei Sonnenuntergang (2 Std., ab €34), die Abendrundfahrt mit Dinner (3,5 Std., ab €30) und die private Charterfahrt (ab €280 pro Boot)." },
      { q: "Wann ist die beste Reisezeit für eine Bosporus-Kreuzfahrt?", a: "Touren finden ganzjährig statt. Die Hochsaison ist Mai bis September mit längerem Tageslicht und warmem Wetter. April und Oktober bieten ideale Bedingungen: angenehme Temperaturen, weniger Touristenandrang und goldenes Herbst- oder Frühlingslicht. Wintertouren (November–März) sind ruhiger, oft neblig-malerisch und bieten einen einzigartigen Blick auf ein ruhigeres Istanbul." },
      { q: "Welcher Abfahrtsort ist am besten — Kabataş, Eminönü oder Karaköy?", a: "Das hängt von Ihrem Hotel ab. Kabataş ist verkehrstechnisch am besten angebunden (Tram T1 + U-Bahn) und eignet sich für Gäste aus Beşiktaş, Ortaköy oder Cihangir. Eminönü ist ideal für Gäste aus der Altstadt (Sultanahmet, Beyazıt), da der Pier nur wenige Gehminuten vom Großen Basar und der Hagia Sophia entfernt liegt. Karaköy empfiehlt sich für Gäste aus dem Beyoğlu-Viertel oder dem Galataport-Terminal. Wir helfen Ihnen bei der Buchung gerne beim Abfahrtspunkt." },
      { q: "Ist Merry Tourism sicher und offiziell lizenziert?", a: "Ja. Merry Tourism ist seit 2001 durchgehend mit der TURSAB A-Gruppe lizenziert — der höchsten offiziellen Zulassung für türkische Reiseunternehmen. Alle Schiffe erfüllen die Sicherheitsvorschriften der türkischen Küstenwacht; Schwimmwesten und Sicherheitsausrüstung sind an Bord vorgeschrieben. Mit über 50.000 Gästen seit Gründung gehören wir zu den erfahrensten Bosporus-Kreuzfahrtanbietern Istanbuls." },
      { q: "Gibt es Kinderermäßigungen?", a: "Kinder unter 6 Jahren sind kostenlos. Für Kinder von 6 bis 12 Jahren gilt 50 % Ermäßigung auf den regulären Preis. Bitte geben Sie Anzahl und Alter der Kinder bei der Buchung an, damit wir die korrekte Kapazität und das passende Kindermenü (bei Dinner-Touren) vorbereiten können." },
      { q: "Kann ich kostenlos stornieren?", a: "Ja. Kostenlose Stornierung und volle Rückerstattung bis 48 Stunden vor Abfahrt. Bei Stornierung innerhalb von 48 Stunden gilt 50 % Rückerstattung. Im Fall von wetterbedingten Absagen (Sturm, starker Nebel) erstatten wir 100 % oder bieten kostenlose Umbuchung an." },
      { q: "Was wird beim Abendessen serviert?", a: "Je nach Paket: türkische Meze-Vorspeisen (Humus, Dolma, Sigara Böreği), Hauptgericht (gegrillter Fisch oder Fleisch), Dessert und türkischer Tee. Beim Gold- und Transferpaket gibt es ein erweitertes Fünf-Gänge-Menü. Vegetarische Optionen und Berücksichtigung von Allergien sind auf Anfrage möglich — bitte bei der Buchung angeben." },
      { q: "Wie viele Personen für eine Privatjacht?", a: "Privatjachten werden pro Boot berechnet, nicht pro Person. Schon 2 Personen können das gesamte Boot für sich buchen. Je nach gewähltem Schiff beträgt die Kapazität 8 bis 30 Personen. Für größere Gruppen (Firmenevents, Hochzeiten) steht unser Team für individuelle Angebote zur Verfügung." },
      { q: "Wird Alkohol serviert?", a: "Bei der Sonnenuntergangskreuzfahrt gibt es eine Option mit einem Glas türkischem Wein (€40/Person). Beim Standard-Dinner (€30) ist ein Softdrink inklusive, beim Silver-Paket (€45) ist lokaler Alkohol enthalten, beim Premium-Dinner (€80+) ist die Bar offen. Beim Privatjachtcharter gestalten Sie das Getränkeangebot nach Ihren Wünschen." },
    ],
    homeLabel: "Startseite",
    ctaTitle: "Jetzt buchen",
    ctaSubtitle: "Sichern Sie sich Ihren Platz für ein unvergessliches Erlebnis auf dem Bosporus — direkt beim Anbieter, ohne Aufpreis.",
    ctaBookLabel: "Online buchen →",
    ctaWhatsappLabel: "Per WhatsApp anfragen",
    aggregateRating: { value: "4.9", count: "487" },
  },

  fr: {
    htmlLang: "fr-FR",
    title: "Croisière Bosphore Istanbul — À partir de €34",
    description: "Croisière Bosphore Istanbul : coucher de soleil dès €34, dîner dès €30, yacht privé dès €200. Agence TÜRSAB groupe A, 50 000+ clients. Réservez en ligne.",
    canonicalPath: "/fr/bosphorus-cruise",
    h1: "Croisière Bosphore Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Comparez toutes les options de croisière sur le Bosphore à Istanbul : coucher de soleil dès €34, dîner dès €30, yacht privé dès €200. Agence certifiée TÜRSAB depuis 2001, plus de 50 000 clients satisfaits.",
    trustBadge: "Certifié TÜRSAB groupe A · depuis 2001 · 50 000+ clients",
    keyFacts: [
      { label: "Coucher de soleil", value: "dès €34" },
      { label: "Croisière dîner", value: "dès €30" },
      { label: "Yacht privé", value: "dès €280" },
      { label: "En activité depuis", value: "2001" },
    ],
    tourOptions: [
      { slug: "sunset", title: "Croisière Coucher de Soleil Bosphore", price: "€34", duration: "2h", tag: "Option la plus populaire", desc: "Deux formules : sans vin €34, avec vin €40. Panorama doré, guide en direct et rafraîchissements inclus. Passage sous les ponts et villas ottomanes." },
      { slug: "dinner", title: "Croisière Dîner Istanbul", price: "€30", duration: "3h30", tag: "4 formules", desc: "4 formules de €30 à €90. Spectacle de nuit turc, dîner et transfert hôtel depuis Sultanahmet/Taksim disponible." },
      { slug: "yacht", title: "Charter Yacht Privé", price: "€200", duration: "2h+", tag: "Entièrement privatisé", desc: "Le bateau entier rien que pour vous. Idéal pour demande en mariage, anniversaire, fête familiale et événements d'entreprise. Itinéraire et menu personnalisés." },
      { slug: "boat", title: "Location de Bateau Istanbul", price: "À l'heure", duration: "Flexible", tag: "Choisissez d'abord le bateau", desc: "Choisissez bateau et itinéraire, puis ajoutez les extras souhaités. De 2 heures à la journée complète." },
    ],
    priceTableTitle: "Tableau des Prix — Croisière Bosphore 2026",
    priceTableCols: ["Formule", "Prix", "Durée", "Inclus"],
    priceRows: [
      { name: "Coucher de soleil — sans vin", price: "€34 / pers.", duration: "2h", included: "Guide, rafraîchissements, passage sous les ponts" },
      { name: "Coucher de soleil — avec vin", price: "€40 / pers.", duration: "2h", included: "Guide, 1 verre de vin, rafraîchissements" },
      { name: "Dîner — Formule Essentielle", price: "€30 / pers.", duration: "3h30", included: "Dîner, musique, spectacle de nuit turc" },
      { name: "Dîner — Silver Alcool", price: "€45 / pers.", duration: "3h30", included: "Place standard, alcool local, menu dîner, spectacle turc" },
      { name: "Dîner — Gold Sans Alcool", price: "€80 / pers.", duration: "3h30", included: "Place VIP (près scène), menu premium, boissons sans alcool" },
      { name: "Dîner — Transfert hôtel", price: "€90 / pers.", duration: "~5h", included: "Transfert Sultanahmet/Taksim inclus" },
      { name: "Yacht privé (2h)", price: "€280 / bateau", duration: "2h", included: "Bateau entier, jusqu'à 8 personnes" },
    ],
    compareSectionTitle: "Quelle croisière vous convient ?",
    compareItems: [
      { title: "Durée et budget", desc: "Coucher de soleil (€34) pour 2h légères, dîner (€30–€90) pour une soirée complète, yacht privé (€200+) pour une intimité totale." },
      { title: "Privé ou partagé ?", desc: "Les croisières coucher de soleil et dîner sont sur des bateaux partagés. Pour une demande en mariage, une fête ou un groupe privatisé, optez pour le yacht privé." },
      { title: "Quand réserver ?", desc: "En haute saison (mai–septembre), les dates populaires se remplissent 1 à 2 semaines à l'avance. Réservez tôt si vous avez une date précise." },
    ],
    whyTitle: "Pourquoi MerrySails ?",
    whyItems: [
      { title: "Licence TÜRSAB groupe A", desc: "Opérateur certifié TÜRSAB groupe A depuis 2001 — la plus haute catégorie de l'association turque des agences de voyage. Réservation sécurisée, garantie légale." },
      { title: "50 000+ clients satisfaits", desc: "Plus de 10 000 clients par an. Note 4,8+ sur Google, TripAdvisor et Viator." },
      { title: "Réservation directe — sans surcoût", desc: "Pas de commission reversée à des plateformes tierces. Réserver directement chez nous = prix plus bas pour vous." },
      { title: "Annulation gratuite", desc: "Annulation gratuite et remboursement intégral jusqu'à 48 heures avant le départ." },
    ],
    departureTitle: "Points de départ",
    departureParagraph: "Les croisières Bosphore d'Istanbul partent de plusieurs embarcadères sur la rive européenne. Choisissez celui qui est le plus proche de votre hôtel.",
    departurePoints: [
      "Kabataş — en face du palais de Dolmabahçe, accès métro et tramway",
      "Beşiktaş — à côté de l'embarcadère des ferries, position centrale",
      "Marina de Kuruçeşme — marina privée pour yachts de luxe",
      "Sultanahmet & Taksim — transfert hôtel gratuit sur certaines formules",
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Quel est le prix d'une croisière Bosphore Istanbul ?", a: "Une croisière Bosphore Istanbul coûte à partir de €34 par personne pour la croisière coucher de soleil (2h). La croisière dîner commence à €30/personne. Le charter de yacht privé est disponible à partir de €200 par bateau. Tous les prix incluent le capitaine, l'équipage et les accompagnements de base." },
      { q: "Combien de temps dure une croisière sur le Bosphore ?", a: "La croisière coucher de soleil dure 2 heures, la croisière dîner environ 3h30. Pour le charter de yacht privé, c'est vous qui choisissez la durée ; minimum 2 heures." },
      { q: "Quelle est la meilleure période pour une croisière sur le Bosphore ?", a: "Les croisières ont lieu toute l'année. La haute saison est mai–septembre. Le printemps (avril) et le début de l'automne (octobre) offrent les meilleures conditions. Les croisières d'hiver sont plus calmes et très photogéniques." },
      { q: "Y a-t-il des réductions pour les enfants ?", a: "Les enfants de moins de 6 ans voyagent gratuitement. Les enfants de 6 à 12 ans bénéficient de 50 % de réduction. Merci d'indiquer l'âge des enfants lors de la réservation." },
      { q: "Puis-je annuler gratuitement ?", a: "Oui. Annulation gratuite et remboursement intégral jusqu'à 48 heures avant le départ. Annulation dans les 48 heures : remboursement à 50 %." },
      { q: "Quel est le menu du dîner ?", a: "Selon la formule : mezzés en entrée, plat principal (poisson ou viande), dessert et thé turc. Options végétariennes disponibles ; merci de signaler les allergies lors de la réservation." },
      { q: "Combien de personnes pour louer un yacht privé ?", a: "Le yacht privé est facturé par bateau, pas par personne. Même 2 personnes peuvent privatiser un bateau entier. Capacité selon les bateaux : 8 à 30 personnes." },
      { q: "L'alcool est-il servi à bord ?", a: "La croisière coucher de soleil propose une option avec vin (€40/pers.). Le dîner standard inclut une boisson, le premium propose un bar ouvert. Pour le yacht privé, le menu est entièrement personnalisable." },
    ],
    homeLabel: "Accueil",
    ctaTitle: "Réservez maintenant",
    ctaSubtitle: "Réservez en ligne ou contactez-nous via WhatsApp pour une expérience inoubliable sur le Bosphore.",
    ctaBookLabel: "Réserver en ligne →",
    ctaWhatsappLabel: "Contacter par WhatsApp",
    aggregateRating: { value: "4.9", count: "487" },
  },

  nl: {
    htmlLang: "nl-NL",
    title: "Bosporus Cruise Istanbul — Vanaf €34",
    description: "Bosporus cruise Istanbul: zonsondergang vanaf €34, diner cruise vanaf €30, privéjacht vanaf €280. TÜRSAB A-groep, 50.000+ gasten. Direct boeken.",
    canonicalPath: "/nl/bosphorus-cruise",
    h1: "Bosporus Cruise Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Vergelijk alle Bosporus cruise-opties in Istanbul: zonsondergang vanaf €34, diner vanaf €30, privéjacht vanaf €280. Gecertificeerd door TÜRSAB A-groep sinds 2001 en meer dan 50.000 tevreden gasten.",
    trustBadge: "TÜRSAB A-groep gecertificeerd · sinds 2001 · 50.000+ gasten",
    keyFacts: [
      { label: "Zonsondergang cruise", value: "v.a. €34" },
      { label: "Diner cruise", value: "v.a. €30" },
      { label: "Privéjacht", value: "v.a. €280" },
      { label: "Gecertificeerd sinds", value: "2001" },
    ],
    tourOptions: [
      { slug: "sunset", title: "Bosporus Zonsondergang Cruise", price: "€34", duration: "2 uur", tag: "Meest populair", desc: "Twee opties: zonder wijn €34, met wijn €40. Gouden uur panorama, live gids en versnaperingen inbegrepen. Doorvaart onder de bruggen en historische villa's." },
      { slug: "dinner", title: "Istanbul Diner Cruise", price: "€30", duration: "3,5 uur", tag: "4 pakketten", desc: "4 pakketten van €30 tot €90. Turkse avondshow, diner en hotelophaal vanuit Sultanahmet/Taksim beschikbaar." },
      { slug: "yacht", title: "Privé Jachtcharter", price: "€200", duration: "2+ uur", tag: "Volledig privé", desc: "Het hele schip voor uzelf. Ideaal voor huwelijksaanzoek, verjaardag, familiefeest en bedrijfsevenementen. Route en menu naar wens." },
      { slug: "boat", title: "Boothuur Istanbul", price: "Per uur", duration: "Flexibel", tag: "Boot eerst kiezen", desc: "Kies boot en route, voeg vervolgens extra's toe. Van 2 uur tot een hele dag, alles is mogelijk." },
    ],
    priceTableTitle: "Bosporus Cruise Prijstabel 2026",
    priceTableCols: ["Tour", "Prijs", "Duur", "Inbegrepen"],
    priceRows: [
      { name: "Zonsondergang — zonder wijn", price: "€34 / pers.", duration: "2 uur", included: "Gids, versnaperingen, brugdoorvaart" },
      { name: "Zonsondergang — met wijn", price: "€40 / pers.", duration: "2 uur", included: "Gids, 1 glas wijn, versnaperingen" },
      { name: "Diner Cruise — Basis", price: "€30 / pers.", duration: "3,5 uur", included: "Diner, muziek, Turkse avondshow" },
      { name: "Diner Cruise — Silver Alcohol", price: "€45 / pers.", duration: "3,5 uur", included: "Standaardstoel, lokale alcohol, dinermenu, Turkse show" },
      { name: "Diner Cruise — Gold Frisdrank", price: "€80 / pers.", duration: "3,5 uur", included: "VIP-stoel (podiumzijde), premiummenu, frisdranken" },
      { name: "Diner — met hotelophaal", price: "€90 / pers.", duration: "~5 uur", included: "Transfer Sultanahmet/Taksim inbegrepen" },
      { name: "Privé Jacht (2 uur)", price: "€280 / boot", duration: "2 uur", included: "Hele boot voor u, tot 8 personen" },
    ],
    compareSectionTitle: "Welke cruise past bij u?",
    compareItems: [
      { title: "Duur en budget", desc: "Zonsondergang (€34) voor 2 uur lichte ervaring, diner (€30–€90) voor een volledige avond, privéjacht (€280+) voor maximale privacy." },
      { title: "Privé of gedeeld?", desc: "Zonsondergang- en dinercruises zijn op gedeelde boten. Voor huwelijksaanzoeken, feesten of een privégroep raden wij een privéjacht aan." },
      { title: "Wanneer boeken?", desc: "In het hoogseizoen (mei–september) zijn populaire data 1–2 weken van tevoren volgeboekt. Reserveer vroeg als u een vaste datum heeft." },
    ],
    whyTitle: "Waarom MerrySails?",
    whyItems: [
      { title: "TÜRSAB A-groep certificering", desc: "Gecertificeerd door de TÜRSAB A-groep sinds 2001 — de hoogste categorie van de Turkse reisbranchevereniging. Veilig boeken, juridische zekerheid." },
      { title: "50.000+ tevreden gasten", desc: "Meer dan 10.000 gasten per jaar. Beoordeling 4,8+ op Google, TripAdvisor en Viator." },
      { title: "Direct boeken — geen toeslag", desc: "Geen commissie aan derden. Direct boeken bij de aanbieder = lagere prijs voor u." },
      { title: "Gratis annuleren", desc: "Gratis annulering en volledige terugbetaling tot 48 uur voor vertrek." },
    ],
    departureTitle: "Vertrekpunten",
    departureParagraph: "Istanbul Bosporus cruises vertrekken vanuit meerdere aanlegplaatsen op de Europese oever. Kies de pier die het dichtst bij uw hotel ligt.",
    departurePoints: [
      "Kabataş — tegenover het Dolmabahçe Paleis, metro- en tramverbinding",
      "Beşiktaş — naast de veerbootssteiger, centrale ligging",
      "Kuruçeşme Marina — luxe privémarina voor jachten",
      "Sultanahmet & Taksim — gratis hotelophaal bij geselecteerde pakketten",
    ],
    faqTitle: "Veelgestelde vragen",
    faqs: [
      { q: "Hoe lang duurt een Bosporus cruise?", a: "De zonsondergang cruise duurt 2 uur, de diner cruise ongeveer 3,5 uur. Bij privéjachtcharter bepaalt u de duur zelf; minimum 2 uur." },
      { q: "Wanneer is de beste tijd voor een Bosporus cruise?", a: "Cruises vinden het hele jaar plaats. Het hoogseizoen is mei–september. Lente (april) en vroege herfst (oktober) bieden de aangenaamste omstandigheden. Wintercruises zijn rustiger en zeer fotogeniek." },
      { q: "Is er korting voor kinderen?", a: "Kinderen onder 6 jaar zijn gratis. Kinderen van 6–12 jaar krijgen 50% korting. Vermeld de leeftijd van kinderen bij de reservering." },
      { q: "Kan ik gratis annuleren?", a: "Ja. Gratis annulering en volledige terugbetaling tot 48 uur voor vertrek. Bij annulering binnen 48 uur geldt 50% terugbetaling." },
      { q: "Wat wordt er geserveerd bij het diner?", a: "Afhankelijk van het pakket: mezze voorgerechten, hoofdgerecht (vis of vlees), dessert en Turkse thee. Vegetarische opties beschikbaar; vermeld allergieën bij reservering." },
      { q: "Hoeveel personen voor een privéjacht?", a: "Privéjachten worden per boot berekend, niet per persoon. Zelfs 2 personen kunnen een hele boot huren. Capaciteit per boot: 8 tot 30 personen." },
      { q: "Wordt er alcohol geserveerd?", a: "Bij de zonsondergang cruise is er een optie met wijn (€40/pers.). Het standaard diner bevat een drankje, het premium pakket heeft een open bar. Bij privéjachtcharter stelt u het menu zelf samen." },
    ],
    homeLabel: "Startpagina",
    ctaTitle: "Reserveer nu",
    ctaSubtitle: "Reserveer online of neem contact op via WhatsApp voor een onvergetelijke ervaring op de Bosporus.",
    ctaBookLabel: "Online reserveren →",
    ctaWhatsappLabel: "WhatsApp sturen",
    aggregateRating: { value: "4.9", count: "487" },
  },
};

export function generateStaticParams() {
  return ["tr", "de", "fr", "nl"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/bosphorus-cruise`,
        en: `${SITE_URL}/bosphorus-cruise`,
        tr: `${SITE_URL}/tr/bosphorus-cruise`,
        de: `${SITE_URL}/de/bosphorus-cruise`,
        fr: `${SITE_URL}/fr/bosphorus-cruise`,
        nl: `${SITE_URL}/nl/bosphorus-cruise`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.h1 }],
    },
  };
}

const ROUTE_MAP: Record<string, Record<string, string>> = {
  sunset: { tr: "/tr/cruises/bosphorus-sunset-cruise", de: "/de/cruises/bosphorus-sunset-cruise", fr: "/fr/cruises/bosphorus-sunset-cruise", nl: "/nl/cruises/bosphorus-sunset-cruise" },
  dinner: { tr: "/tr/istanbul-dinner-cruise", de: "/de/istanbul-dinner-cruise", fr: "/fr/istanbul-dinner-cruise", nl: "/nl/istanbul-dinner-cruise" },
  yacht: { tr: "/tr/yacht-charter-istanbul", de: "/de/yacht-charter-istanbul", fr: "/fr/yacht-charter-istanbul", nl: "/nl/yacht-charter-istanbul" },
  boat:  { tr: "/tr/boat-rental-istanbul", de: "/de/boat-rental-istanbul", fr: "/fr/boat-rental-istanbul", nl: "/nl/boat-rental-istanbul" },
};

export default async function LocaleBosphorusCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

  const tourProductSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    "@id": `${canonicalUrl}#tour`,
    name: c.h1,
    description: c.description,
    url: canonicalUrl,
    provider: {
      "@type": "TouristInformationCenter",
      name: "MerrySails",
      url: SITE_URL,
    },
    offers: c.tourOptions.map((opt) => ({
      "@type": "Offer",
      name: opt.title,
      price: opt.price.replace(/[^0-9]/g, "") || opt.price,
      priceCurrency: "EUR",
      url: canonicalUrl,
      availability: "https://schema.org/InStock",
    })),
    touristType: ["FamilyTourist", "CouplesTourist", "LuxuryTourist"],
  };

  // Separate Product schema for Google Review snippet rich result
  // (Service/TouristTrip parent is not supported per Google's spec)
  // Unique @id + suffixed name to avoid Google merging this with the TouristTrip
  // node — the merged parent_node was previously failing review-snippet validation.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: `${c.h1} — Booking`,
    description: c.description,
    image: SITE_URL + "/og-image.jpg",
    brand: { "@type": "Brand", name: "MerrySails" },
    sku: `merrysails-bosphorus-cruise-${locale}`,
    category: "Bosphorus Cruise Istanbul",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: c.aggregateRating.value,
      reviewCount: c.aggregateRating.count,
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "34",
      highPrice: "90",
      offerCount: c.tourOptions.length,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.homeLabel, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.h1, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="pt-28 pb-16 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{c.homeLabel}</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.h1}</span>
          </nav>

          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">{c.subtitle}</p>
          <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">{c.h1}</h1>
          <p className="max-w-2xl text-lg text-[var(--body-text)]">{c.intro}</p>
          <p className="mt-3 text-sm font-semibold text-[var(--text-muted)]">{c.trustBadge}</p>

          {/* Key facts bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {c.keyFacts.map((f) => (
              <div key={f.label} className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-center">
                <p className="text-xl font-bold text-[var(--brand-primary)]">{f.value}</p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tour cards */}
      <div className="py-16 bg-white">
        <div className="container-main">
          <div className="grid gap-6 md:grid-cols-2">
            {c.tourOptions.map((opt) => (
              <Link
                key={opt.slug}
                href={ROUTE_MAP[opt.slug]?.[locale] ?? `/${locale}/bosphorus-cruise`}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--brand-primary)] mb-2">
                      {opt.tag}
                    </span>
                    <h2 className="text-xl font-bold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">{opt.title}</h2>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-2xl font-bold text-[var(--brand-primary)]">{opt.price}</p>
                    <p className="text-xs text-[var(--text-muted)]">{opt.duration}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--body-text)]">{opt.desc}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">→</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Price table */}
      <div className="py-16 bg-[var(--surface-alt)]">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.priceTableTitle}</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface-alt)]">
                  {c.priceTableCols.map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-semibold text-[var(--heading)]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.priceRows.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-alt)]">
                    <td className="px-4 py-3 font-medium text-[var(--heading)]">{row.name}</td>
                    <td className="px-4 py-3 font-bold text-[var(--brand-primary)]">{row.price}</td>
                    <td className="px-4 py-3 text-[var(--body-text)]">{row.duration}</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">{row.included}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Why choose / compare */}
      <div className="py-16 bg-white">
        <div className="container-main grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.compareSectionTitle}</h2>
            <div className="flex flex-col gap-4">
              {c.compareItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--body-text)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.whyTitle}</h2>
            <div className="flex flex-col gap-4">
              {c.whyItems.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center">
                    <svg className="h-3 w-3 text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--heading)]">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--body-text)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <LocaleHelpfulResources locale={locale as SiteLocale} omit="hub" />
        </div>
      </div>

      {/* Departure points */}
      <div className="py-16 bg-[var(--surface-alt)]">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.departureTitle}</h2>
          <p className="text-[var(--body-text)] mb-6">{c.departureParagraph}</p>
          <ul className="flex flex-col gap-3">
            {c.departurePoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-[var(--body-text)]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-8">{c.faqTitle}</h2>
          <div className="flex flex-col gap-4">
            {c.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--heading)] list-none">
                  <span>{faq.q}</span>
                  <svg className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-[var(--line)] bg-white px-5 py-4 text-sm leading-relaxed text-[var(--body-text)]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-[var(--brand-primary)]">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{c.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/reservation`}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-primary)] shadow hover:bg-white/90 transition-colors"
            >
              {c.ctaBookLabel}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {c.ctaWhatsappLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="py-4 bg-white">
        <div className="container-main flex justify-end">
          <Link href="/bosphorus-cruise" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
            English →
          </Link>
        </div>
      </div>
    </>
  );
}
