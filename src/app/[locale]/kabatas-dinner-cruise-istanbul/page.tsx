import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

// ─── Types ────────────────────────────────────────────────────────────────────

type KeyFact = { icon: string; label: string; value: string };
type Section = { heading: string; body: string[] };
type Faq = { q: string; a: string };
type Package = { name: string; price: string; highlight: boolean; items: string[] };
type TransportItem = { mode: string; detail: string };

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbDinner: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  trustSignal: string;
  keyFacts: KeyFact[];
  sections: Section[];
  packagesHeading: string;
  perPerson: string;
  packages: Package[];
  transportHeading: string;
  transportIntro: string;
  transportItems: TransportItem[];
  faqHeading: string;
  faqs: Faq[];
  relatedHeading: string;
  ctaHeading: string;
  ctaSubtitle: string;
  bookLabel: string;
  whatsappLabel: string;
  mainPageNote: string;
};

// ─── Translations ─────────────────────────────────────────────────────────────

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "Kabataş Akşam Yemeği Turu — €55'dan İtibaren | İstanbul Boğaz Teknesi | MerrySails",
    metaDescription:
      "Kabataş iskelesinden kalkan Boğaz akşam yemeği turu: €55'dan başlayan paketler, Türk gecesi eğlencesi, Dolmabahçe manzarası. TÜRSAB A Grubu lisanslı, 50.000+ misafir. Hemen rezervasyon.",
    canonicalPath: "/tr/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbDinner: "Akşam Yemeği Turu",
    breadcrumbCurrent: "Kabataş Kalkışlı Tur",
    eyebrow: "MerrySails İstanbul — Kabataş İskelesi",
    heroTitle: "Kabataş Akşam Yemeği Turu İstanbul",
    heroSubtitle: "€55'dan başlayan fiyatlar · Dolmabahçe önünden kalkış",
    heroDescription:
      "Kabataş akşam yemeği turu, Boğaz'ın en işlek kesiminden — Dolmabahçe Sarayı'nın hemen önünden — hareket eder. Metro ve tramvayla ulaşımı son derece kolay olan bu iskele, İstanbul'daki Boğaz akşam yemeği turlarının en gözde kalkış noktasıdır. Türk gecesi eğlencesi, açık büfe akşam yemeği ve 3,5 saatlik Boğaz rotasıyla €55'dan başlayan paketler sunarız. 2001'den bu yana 50.000'den fazla misafiri ağırladık.",
    trustSignal: "TÜRSAB A Grubu lisanslı Merry Tourism — 2001'den bu yana İstanbul'da 50.000+ misafir",
    keyFacts: [
      { icon: "⏱", label: "Süre", value: "~3,5 saat" },
      { icon: "📍", label: "Kalkış", value: "Kabataş İskelesi, 20:30" },
      { icon: "💶", label: "Fiyat", value: "€55'dan itibaren" },
      { icon: "🎭", label: "Dahil", value: "Türk gecesi + akşam yemeği" },
    ],
    sections: [
      {
        heading: "Kabataş İskelesi: İstanbul'un Boğaz Kapısı",
        body: [
          "Kabataş İskelesi, Dolmabahçe Sarayı'nın hemen yanı başında, Boğaz ile Haliç'in kesiştiği stratejik noktada yer alır. Bu konum, teknelerin Boğaz'ın en güzel manzaralarına anında ulaşmasını sağlar: seyahat başlar başlamaz Çırağan Sarayı, Ortaköy Camii ve Boğaz köprülerinin silueti görünür hale gelir.",
          "İstanbul'un farklı semtlerinden Kabataş'a ulaşmak son derece kolaydır. Taksim'den metro ile 5 dakika, Eminönü'nden T1 tramvayıyla yaklaşık 20 dakika sürer. Sultanahmet, Beyoğlu veya Beşiktaş'tan taksiye binmek de makul süreler içinde sizi iskeleye ulaştırır.",
          "Akşam saatlerinde iskele çevresinde canlı bir atmosfer hakimdir. Dolmabahçe Sarayı'nın aydınlatması ve Boğaz üzerindeki günbatımı renkleri, tekne kalkışından çok önce unutulmaz bir deneyim sunmaya başlar.",
        ],
      },
      {
        heading: "Kabataş Kalkışlı Akşam Yemeği Turu Neden Tercih Edilir?",
        body: [
          "Kabataş kalkışlı Boğaz akşam yemeği turu, özellikle Taksim, Beşiktaş, Nişantaşı veya Kabataş yakınındaki otellerde konaklayan misafirler için mükemmel bir seçimdir. Avrupa yakasının trafik yoğun noktalarında araç kiralamak yerine rahatça toplu taşımayla ulaşabilirsiniz.",
          "Kalkış noktası aynı zamanda Boğaz rotası açısından avantajlıdır: tekne Kabataş'tan ayrılır ayrılmaz geniş sulara açılır, kalabalık rıhtım manevralarından kaçınılır. Bu sayede turdaki sürenin büyük bölümü açık Boğaz manzarasıyla geçer.",
          "Otel transfer hizmetimiz Kabataş çevresindeki ve Avrupa yakasının merkezi semtlerindeki otellerin büyük bölümünü kapsar. Transfer saatiniz rezervasyon onayıyla birlikte yazılı olarak bildirilir. Transfer talep etmek için rezervasyon formundaki ilgili alanı doldurmanız yeterlidir.",
        ],
      },
      {
        heading: "Menü ve Türk Gecesi Eğlence Programı",
        body: [
          "Her akşam yemeği turu paketi, aynı eğlence programını içerir: canlı Türk müziği, halk oyunları gösterisi, davul zurna performansı ve interaktif dans figürleri. Pakete bağlı olarak masada servis veya açık büfe akşam yemeği sunulur.",
          "Menüde Türk mutfağının klasikleri yer alır: zeytinyağlı mezelerin ardından ızgara etler (tavuk, kuzu, köfte), pilav ve Türk tatlıları gelir. Vejeteryan seçenekler mevcuttur; önceden bildirilmesi halinde glutensiz düzenlemeler yapılabilir.",
          "Gold paket sahipleri VIP sahne yakını koltukta Premium menü ve sınırsız içecek hizmetinden yararlanır. Gece boyunca DJ seti de programa eklenir. Silver pakette standart koltuk ile standart akşam yemeği menüsü verilir; Türk gecesi eğlencesi her iki pakete de dahildir.",
        ],
      },
      {
        heading: "Paket Seçenekleri ve Fiyatlar",
        body: [
          "Kabataş akşam yemeği turunda dört farklı paket mevcuttur. Tüm paketlerde rota ve süre aynıdır; fark koltuk tipi, yemek menüsü seviyesi ve içecek kapsamındadır.",
          "Silver Soft Drinks (€55): Standart koltuk, sınırsız alkolsüz içecek, akşam yemeği menüsü ve Türk gecesi eğlencesi dahildir. En popüler başlangıç paketidir.",
          "Silver Alcoholic (€75): Standart koltuk, yerel alkollü içecekler (bira, şarap, rakı), akşam yemeği menüsü ve Türk gecesi dahildir. Bir üst seçenek arayanlar için idealdir.",
          "Gold Soft Drinks (€95): VIP sahne yakını koltuk, sınırsız alkolsüz içecek, Premium menü ve Türk gecesi + DJ dahildir. Daha sessiz bir deneyim arayanlar için uygundur.",
          "Gold Unlimited Alcohol (€119): VIP sahne yakını koltuk, sınırsız alkol dahil, Premium menü ve Türk gecesi + DJ. En kapsamlı pakettir.",
        ],
      },
      {
        heading: "Kabataş'a Ulaşım Rehberi",
        body: [
          "İstanbul'un her köşesinden Kabataş'a ulaşmak için çeşitli toplu taşıma seçenekleri mevcuttur. En hızlı yol Metro M2 hattıdır: Taksim istasyonundan Kabataş'a tek duraktır ve yalnızca 5 dakika sürer.",
          "T1 tramvayı Eminönü, Kapalıçarşı ve Beyazıt'tan kalkar, Kabataş'ta son durak yapar. Sultanahmet bölgesinden tramvayla yaklaşık 20 dakika sürer ve oldukça konforludur. Kartlı ödeme ve İstanbulkart ile geçiş yapılabilir.",
          "Taksi tercih edenler için Taksim'den Kabataş yaklaşık 10 dakika, Sultanahmet'ten ise 15-20 dakikadır. Akşam saatlerinde trafik yoğunluğuna dikkat edin; toplu taşımayı tercih etmenizi öneririz. Tekne kalkışından en az 20 dakika önce iskelede olmanızı tavsiye ederiz.",
        ],
      },
      {
        heading: "Güvenlik, Lisans ve Rezervasyon",
        body: [
          "MerrySails, TÜRSAB A Grubu lisansına sahip Merry Tourism bünyesinde 2001'den bu yana faaliyet göstermektedir. Tüm tekne seyahatlerimiz Türk denizcilik mevzuatına uygun olarak yürütülür; gemi personeli deneyimli ve sertifikalıdır.",
          "Rezervasyonlarınız 48 saat öncesine kadar ücretsiz iptal politikasıyla güvence altındadır. Yaz sezonu (Mayıs–Eylül) boyunca turlarımız yoğun olduğundan en az 3–5 gün öncesinden rezervasyon yapmanızı öneririz.",
          "Bu turun tüm paket detayları, rota bilgisi ve müşteri yorumları için İstanbul Akşam Yemeği Turu ana sayfamızı ziyaret edin. Sorularınız için WhatsApp hattımız 7/24 hizmetinizdedir.",
        ],
      },
    ],
    packagesHeading: "Paket Seçenekleri",
    perPerson: "kişi başı",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€55",
        highlight: false,
        items: ["Standart koltuk", "Sınırsız alkolsüz içecek", "Akşam yemeği menüsü", "Türk gecesi eğlencesi"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standart koltuk", "Yerel alkollü içecekler", "Akşam yemeği menüsü", "Türk gecesi eğlencesi"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["VIP sahne yakını koltuk", "Sınırsız alkolsüz içecek", "Premium yemek menüsü", "Türk gecesi + DJ"],
      },
      {
        name: "Gold Unlimited Alkol",
        price: "€119",
        highlight: false,
        items: ["VIP sahne yakını koltuk", "Sınırsız alkol dahil", "Premium yemek menüsü", "Türk gecesi + DJ"],
      },
    ],
    transportHeading: "Kabataş'a Ulaşım",
    transportIntro: "Kabataş İskelesi'ne toplu taşımayla rahatlıkla ulaşabilirsiniz:",
    transportItems: [
      { mode: "Metro M2", detail: "Taksim'den 5 dakika — tek durak" },
      { mode: "Tramvay T1", detail: "Eminönü / Sultanahmet'ten ~20 dakika" },
      { mode: "Otobüs", detail: "Beşiktaş ve Kadıköy bağlantılı hatlar" },
      { mode: "Taksi", detail: "Taksim'den ~10 dk, Sultanahmet'ten ~15 dk" },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Kabataş akşam yemeği turu ne zaman kalkar?",
        a: "Kalkış saati 20:30'dur. Check-in için en az 20 dakika önce iskelede bulunmanız önerilir. Kesin biniş zamanı rezervasyon onayınızda belirtilir.",
      },
      {
        q: "Kabataş'a nasıl ulaşabilirim?",
        a: "Taksim'den Metro M2 ile 5 dakikada, Sultanahmet'ten T1 tramvayıyla yaklaşık 20 dakikada ulaşırsınız. Taksiyle de gelmeniz mümkündür ancak akşam trafiğine dikkat edin.",
      },
      {
        q: "Otel transferi mevcut mu?",
        a: "Evet, Avrupa yakasının merkezi semtlerindeki seçili otellerden transfer desteği sunulmaktadır. Transfer talep etmek için rezervasyon sırasında ilgili seçeneği işaretlemeniz yeterlidir.",
      },
      {
        q: "Hangi paket en çok tercih ediliyor?",
        a: "Silver Soft Drinks (€55) en popüler başlangıç paketidir. Türk gecesi eğlencesi ve akşam yemeği dahil olan bu paket, ilk kez katılanlar için idealdir. Alkol dahil seçenekler için Silver Alcoholic (€75) tercih edilir.",
      },
      {
        q: "Vejetaryen veya glutensiz menü var mı?",
        a: "Evet, vejeteryan menü mevcuttur. Glutensiz taleplerini rezervasyon sırasında belirtmenizi öneririz; ekibimiz gerekli düzenlemeyi önceden yapar.",
      },
      {
        q: "Türk gecesi gösterisi ne zaman başlar?",
        a: "Gemi Kabataş'tan ayrıldıktan yaklaşık 30-45 dakika sonra eğlence programı başlar. Program halk oyunları, canlı müzik, davul zurna ve interaktif dans figürlerini kapsar.",
      },
      {
        q: "Çocuklar için fiyat avantajı var mı?",
        a: "Evet, 0-5 yaş ücretsizdir. 6-12 yaş için indirimli fiyat uygulanır. Kesin çocuk fiyatı için rezervasyon sırasında veya WhatsApp hattımızdan bilgi alabilirsiniz.",
      },
      {
        q: "İptal politikası nedir?",
        a: "Kalkıştan 48 saat öncesine kadar yapılan iptallerde tam para iadesi yapılır. Olumsuz hava koşulları durumunda tur ertelenir veya iade yapılır.",
      },
    ],
    relatedHeading: "Diğer Tur Seçenekleri",
    ctaHeading: "Kabataş Akşam Yemeği Turu Rezervasyonu",
    ctaSubtitle: "Tarih ve kişi sayısını belirtin, anında yanıt alalım.",
    bookLabel: "Rezervasyon Yap",
    whatsappLabel: "WhatsApp ile Yazın",
    mainPageNote:
      "Bu turun tüm paket detayları, fotoğraflar ve müşteri yorumları için",
  },

  de: {
    metaTitle: "Kabatas Dinner Kreuzfahrt Istanbul — Ab €55 | Bosporus Abendessen | MerrySails",
    metaDescription:
      "Dinner Kreuzfahrt ab Kabatas-Pier in Istanbul: Pakete ab €55, Türkische Abendshow, Blick auf den Dolmabahce-Palast. TÜRSAB-lizenziert seit 2001, über 50.000 Gäste. Jetzt buchen.",
    canonicalPath: "/de/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbDinner: "Dinner Kreuzfahrt",
    breadcrumbCurrent: "Kabatas Abfahrt",
    eyebrow: "MerrySails Istanbul — Kabatas-Pier",
    heroTitle: "Kabatas Dinner Kreuzfahrt Istanbul",
    heroSubtitle: "Ab €55 pro Person · Abfahrt direkt am Dolmabahce-Palast",
    heroDescription:
      "Die Kabatas Dinner Kreuzfahrt startet am belebtesten Punkt des Bosporus — direkt vor dem Dolmabahce-Palast. Der Pier ist bequem mit Metro und Straßenbahn erreichbar und gilt als beliebtester Abfahrtspunkt für Bosporus-Dinner-Kreuzfahrten in Istanbul. Mit türkischer Abendshow, Buffet-Abendessen und einer 3,5-stündigen Bosporus-Route bieten wir Pakete ab €55. Seit 2001 haben wir über 50.000 Gäste begrüßt.",
    trustSignal: "TÜRSAB Gruppe A lizenziert — Merry Tourism Istanbul seit 2001, 50.000+ Gäste",
    keyFacts: [
      { icon: "⏱", label: "Dauer", value: "ca. 3,5 Stunden" },
      { icon: "📍", label: "Abfahrt", value: "Kabatas-Pier, 20:30 Uhr" },
      { icon: "💶", label: "Preis", value: "Ab €55 pro Person" },
      { icon: "🎭", label: "Inklusive", value: "Türkische Show + Abendessen" },
    ],
    sections: [
      {
        heading: "Kabatas-Pier: Das Bosporus-Tor Istanbuls",
        body: [
          "Der Kabatas-Pier liegt direkt neben dem Dolmabahce-Palast, an der strategisch günstigsten Stelle zwischen Bosporus und Goldenem Horn. Diese Lage ermöglicht es den Schiffen, sofort die schönsten Panoramen des Bosporus zu erreichen: Schon kurz nach dem Ablegen werden der Ciragan-Palast, die Ortakoy-Moschee und die Silhouette der Bosporus-Brücken sichtbar.",
          "Der Pier ist aus allen Teilen Istanbuls gut erreichbar. Von Taksim dauert die Fahrt mit der Metro M2 nur 5 Minuten, vom Eminönü mit der Straßenbahn T1 ca. 20 Minuten. Aus Sultanahmet, Beyoglu oder Besiktas ist auch ein Taxi eine bequeme Option.",
          "Am Abend herrscht rund um den Pier eine lebhafte Atmosphäre. Die Beleuchtung des Dolmabahce-Palastes und die Sonnenuntergangsfarben über dem Bosporus sorgen schon vor dem Ablegen für unvergessliche Eindrücke.",
        ],
      },
      {
        heading: "Warum die Kabatas Dinner Kreuzfahrt wählen?",
        body: [
          "Die Kabatas Dinner Kreuzfahrt ist besonders für Gäste geeignet, die in Hotels in Taksim, Besiktas, Nisantasi oder in der Nähe von Kabatas übernachten. Statt Staus auf der europäischen Seite zu umfahren, erreichen Sie den Pier bequem mit öffentlichen Verkehrsmitteln.",
          "Der Abfahrtspunkt bietet auch nautische Vorteile: Das Schiff gelangt sofort nach dem Ablegen auf offenes Wasser, ohne aufwändige Hafenmanöver. Dadurch verbringen Sie den Großteil der Tour mit freiem Blick auf den Bosporus.",
          "Unser Hoteltransfer-Service deckt viele Hotels in Kabatas-Nähe und in den zentralen Vierteln der europäischen Seite ab. Ihre Abholzeit wird Ihnen schriftlich mit der Buchungsbestätigung mitgeteilt. Die Transferoption wählen Sie direkt im Buchungsformular aus.",
        ],
      },
      {
        heading: "Abendmenü und Türkisches Abendprogramm",
        body: [
          "Jedes Dinner-Kreuzfahrt-Paket enthält dasselbe Unterhaltungsprogramm: Live-Türkische Musik, Folkloretänze, Davul-Zurna-Auftritte und interaktive Tanzshows. Je nach Paket wird ein Tischmenü oder ein Abendbuffet serviert.",
          "Auf der Speisekarte stehen Klassiker der türkischen Küche: Olivenöl-Vorspeisen, gefolgt von Grillgerichten (Hähnchen, Lamm, Köfte), Reis und türkischen Desserts. Vegetarische Optionen sind vorhanden; glutenfreie Anpassungen können auf Anfrage vorbereitet werden.",
          "Gäste im Gold-Paket genießen VIP-Sitzplätze nahe der Bühne, ein Premium-Menü und unbegrenzte Getränke. Außerdem ist ein DJ-Set im Programm. Das Silver-Paket umfasst Standard-Sitzplatz, Standard-Abendmenü und die Türkische Abendshow.",
        ],
      },
      {
        heading: "Pakete und Preise im Überblick",
        body: [
          "Für die Kabatas Dinner Kreuzfahrt stehen vier Pakete zur Auswahl. Route und Dauer sind bei allen Paketen identisch; der Unterschied liegt in Sitzplatzkategorie, Menüstufe und Getränkeumfang.",
          "Silver Soft Drinks (€55): Standard-Sitzplatz, alkoholfreie Getränke unbegrenzt, Abendmenü und Türkische Abendshow inklusive. Das beliebteste Einstiegspaket.",
          "Silver Alcoholic (€75): Standard-Sitzplatz, lokale alkoholische Getränke (Bier, Wein, Raki), Abendmenü und Türkische Abendshow inklusive.",
          "Gold Soft Drinks (€95): VIP-Platz nahe der Bühne, alkoholfreie Getränke unbegrenzt, Premium-Menü und Türkische Show + DJ.",
          "Gold Unlimited Alcohol (€119): VIP-Platz nahe der Bühne, Alkohol unbegrenzt inklusive, Premium-Menü und Türkische Show + DJ. Das umfangreichste Paket.",
        ],
      },
      {
        heading: "Anreise zum Kabatas-Pier",
        body: [
          "Für die Anreise zum Kabatas-Pier stehen mehrere bequeme Optionen zur Verfügung. Der schnellste Weg ist die Metro M2 von Taksim: nur eine Station, nur 5 Minuten.",
          "Die Straßenbahn T1 fährt von Eminönü, Kapalıçarşı und Beyazıt direkt bis Kabatas als Endstation — ideal von Sultanahmet aus, ca. 20 Minuten Fahrtzeit. Die Zahlung erfolgt mit der Istanbul-Karte oder per Einzelticket.",
          "Wer ein Taxi bevorzugt: Von Taksim ca. 10 Minuten, von Sultanahmet ca. 15–20 Minuten. Beachten Sie das abendliche Verkehrsaufkommen und planen Sie ausreichend Zeit ein. Wir empfehlen, mindestens 20 Minuten vor Abfahrt am Pier zu sein.",
        ],
      },
      {
        heading: "Sicherheit, Lizenz und Buchung",
        body: [
          "MerrySails gehört zur Merry Tourism, die seit 2001 mit TÜRSAB-Gruppe-A-Lizenz in Istanbul tätig ist. Alle unsere Fahrten entsprechen den türkischen Schifffahrtsvorschriften; das Schiffspersonal ist erfahren und zertifiziert.",
          "Buchungen sind bis 48 Stunden vor Abfahrt kostenfrei stornierbar. In der Hochsaison (Mai bis September) empfehlen wir eine Buchung mindestens 3 bis 5 Tage im Voraus, da die Touren häufig ausgebucht sind.",
          "Alle Paketdetails, Routen-Informationen und Gästebewertungen finden Sie auf unserer Hauptseite der Istanbul Dinner Cruise. Für Fragen steht unser WhatsApp-Kanal rund um die Uhr zur Verfügung.",
        ],
      },
    ],
    packagesHeading: "Paketoptionen",
    perPerson: "pro Person",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€55",
        highlight: false,
        items: ["Standard-Sitzplatz", "Alkoholfreie Getränke unbegrenzt", "Abendmenü", "Türkische Abendshow"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standard-Sitzplatz", "Lokale alkoholische Getränke", "Abendmenü", "Türkische Abendshow"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["VIP nahe der Bühne", "Alkoholfreie Getränke unbegrenzt", "Premium-Menü", "Türkische Show + DJ"],
      },
      {
        name: "Gold Unlimited Alcohol",
        price: "€119",
        highlight: false,
        items: ["VIP nahe der Bühne", "Alkohol unbegrenzt inklusive", "Premium-Menü", "Türkische Show + DJ"],
      },
    ],
    transportHeading: "Anreise zum Pier",
    transportIntro: "So erreichen Sie den Kabatas-Pier:",
    transportItems: [
      { mode: "Metro M2", detail: "Von Taksim — nur 5 Minuten, 1 Station" },
      { mode: "Straßenbahn T1", detail: "Von Eminönü / Sultanahmet — ca. 20 Minuten" },
      { mode: "Bus", detail: "Linien via Besiktas und Kadikoy" },
      { mode: "Taxi", detail: "Von Taksim ~10 Min, von Sultanahmet ~15 Min" },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Wann fährt die Kabatas Dinner Kreuzfahrt ab?",
        a: "Abfahrt ist um 20:30 Uhr. Bitte erscheinen Sie mindestens 20 Minuten vorher am Pier zum Einchecken. Die genaue Einschiffungszeit finden Sie in Ihrer Buchungsbestätigung.",
      },
      {
        q: "Wie komme ich zum Kabatas-Pier?",
        a: "Von Taksim mit der Metro M2 in 5 Minuten, von Sultanahmet mit der Straßenbahn T1 in ca. 20 Minuten. Auch mit dem Taxi erreichbar — achten Sie auf den Abendverkehr.",
      },
      {
        q: "Gibt es einen Hoteltransfer-Service?",
        a: "Ja, für ausgewählte Hotels in zentralen Vierteln der europäischen Seite wird ein Shuttle-Service angeboten. Wählen Sie diese Option beim Buchen aus; die genaue Abholzeit erhalten Sie schriftlich.",
      },
      {
        q: "Welches Paket ist am beliebtesten?",
        a: "Silver Soft Drinks (€55) ist das meistgebuchte Einstiegspaket. Türkische Abendshow und Abendessen sind bereits inklusive — ideal für Erstbesucher. Wer Alkohol bevorzugt, wählt Silver Alcoholic (€75).",
      },
      {
        q: "Gibt es vegetarische oder glutenfreie Optionen?",
        a: "Vegetarische Speisen sind im Angebot enthalten. Glutenfreie Anpassungen können auf Anfrage bei der Buchung vorbereitet werden.",
      },
      {
        q: "Wann beginnt das Unterhaltungsprogramm?",
        a: "Das Showprogramm startet ca. 30 bis 45 Minuten nach dem Ablegen. Es umfasst Folkloretänze, Live-Musik, Davul-Zurna und interaktive Tanzshows.",
      },
      {
        q: "Gibt es Rabatte für Kinder?",
        a: "Kinder von 0 bis 5 Jahren sind kostenlos. Für Kinder von 6 bis 12 Jahren gilt ein ermäßigter Preis. Details erfragen Sie beim Buchen oder über unseren WhatsApp-Kanal.",
      },
      {
        q: "Was ist die Stornierungspolitik?",
        a: "Bis 48 Stunden vor Abfahrt ist eine kostenlose Stornierung möglich. Bei schlechtem Wetter wird die Tour verschoben oder erstattet.",
      },
    ],
    relatedHeading: "Weitere Optionen",
    ctaHeading: "Kabatas Dinner Kreuzfahrt buchen",
    ctaSubtitle: "Datum und Personenzahl angeben — schnelle Antwort garantiert.",
    bookLabel: "Jetzt buchen",
    whatsappLabel: "Per WhatsApp schreiben",
    mainPageNote:
      "Alle Paketdetails, Fotos und Bewertungen finden Sie auf der",
  },

  fr: {
    metaTitle: "Croisière Dîner Kabataş Istanbul — À partir de €55 | Bosphore | MerrySails",
    metaDescription:
      "Croisière dîner au départ de Kabataş à Istanbul : formules dès €55, spectacle de nuit turque, vue sur le Palais Dolmabahçe. Agréé TÜRSAB depuis 2001, plus de 50 000 clients. Réservez maintenant.",
    canonicalPath: "/fr/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbDinner: "Croisière Dîner",
    breadcrumbCurrent: "Départ Kabataş",
    eyebrow: "MerrySails Istanbul — Pier de Kabataş",
    heroTitle: "Croisière Dîner Kabataş Istanbul",
    heroSubtitle: "À partir de €55 par personne · Départ devant le Palais Dolmabahçe",
    heroDescription:
      "La croisière dîner Kabataş part du point le plus animé du Bosphore — juste devant le Palais de Dolmabahçe. Ce pier, facilement accessible en métro et en tramway, est le point de départ favori des croisières dîner sur le Bosphore à Istanbul. Avec un spectacle de nuit turque, un dîner et une route de 3h30, nous proposons des formules à partir de €55. Depuis 2001, nous avons accueilli plus de 50 000 clients.",
    trustSignal: "Agréé TÜRSAB Groupe A — Merry Tourism Istanbul depuis 2001, plus de 50 000 clients",
    keyFacts: [
      { icon: "⏱", label: "Durée", value: "environ 3h30" },
      { icon: "📍", label: "Départ", value: "Pier de Kabataş, 20h30" },
      { icon: "💶", label: "Prix", value: "À partir de €55 par personne" },
      { icon: "🎭", label: "Inclus", value: "Spectacle turc + dîner" },
    ],
    sections: [
      {
        heading: "Le Pier de Kabataş : La porte du Bosphore à Istanbul",
        body: [
          "Le pier de Kabataş est situé juste à côté du Palais de Dolmabahçe, à l'endroit stratégique où le Bosphore rencontre la Corne d'Or. Cette position permet aux bateaux d'accéder immédiatement aux plus beaux panoramas du Bosphore : dès le départ, le Palais de Çırağan, la Mosquée d'Ortaköy et la silhouette des ponts du Bosphore deviennent visibles.",
          "Le pier est facilement accessible depuis tous les quartiers d'Istanbul. De Taksim, la ligne de métro M2 y mène en seulement 5 minutes ; depuis Eminönü, le tramway T1 met environ 20 minutes. En taxi depuis Sultanahmet, Beyoglu ou Besiktas, le trajet reste raisonnable.",
          "En soirée, le pier et ses environs vibrent d'une atmosphère animée. L'illumination du Palais de Dolmabahçe et les couleurs du coucher de soleil sur le Bosphore offrent déjà une expérience inoubliable avant même le départ.",
        ],
      },
      {
        heading: "Pourquoi choisir la croisière dîner au départ de Kabataş ?",
        body: [
          "La croisière dîner Kabataş est particulièrement adaptée aux visiteurs qui séjournent dans des hôtels à Taksim, Besiktas, Nisantasi ou à proximité de Kabataş. Plutôt que de naviguer dans la circulation dense de la rive européenne, vous rejoignez le pier confortablement en transports en commun.",
          "Le point de départ présente également un avantage nautique : le bateau accède immédiatement aux eaux ouvertes après le départ, évitant ainsi les manœuvres portuaires encombrées. La majeure partie de la croisière se passe donc avec une vue dégagée sur le Bosphore.",
          "Notre service de navette depuis les hôtels couvre la plupart des établissements situés près de Kabataş et dans les quartiers centraux de la rive européenne. L'heure de prise en charge est communiquée par écrit avec la confirmation de réservation.",
        ],
      },
      {
        heading: "Menu Dîner et Spectacle de Nuit Turque",
        body: [
          "Chaque formule de croisière dîner comprend le même programme de spectacle : musique turque live, danses folkloriques, performances de davul-zurna et shows de danse interactifs. Selon la formule choisie, un dîner servi à table ou un buffet est proposé.",
          "La carte propose des classiques de la cuisine turque : des entrées à l'huile d'olive, suivies de grillades (poulet, agneau, köfte), de riz et de desserts turcs. Des options végétariennes sont disponibles ; les adaptations sans gluten peuvent être préparées sur demande.",
          "Les titulaires du forfait Gold bénéficient de places VIP proches de la scène, d'un menu Premium et de boissons à volonté, ainsi que d'un set DJ. La formule Silver comprend une place standard, un menu dîner standard et le spectacle de nuit turque.",
        ],
      },
      {
        heading: "Formules et tarifs",
        body: [
          "La croisière dîner Kabataş propose quatre formules. La route et la durée sont identiques pour toutes ; la différence porte sur la catégorie de place, le niveau du menu et l'offre de boissons.",
          "Silver Soft Drinks (€55) : Place standard, boissons sans alcool à volonté, menu dîner et spectacle de nuit turque inclus. La formule d'entrée de gamme la plus populaire.",
          "Silver Alcoholic (€75) : Place standard, boissons alcoolisées locales (bière, vin, raki), menu dîner et spectacle de nuit turque inclus.",
          "Gold Soft Drinks (€95) : Place VIP proche de la scène, boissons sans alcool à volonté, menu Premium et spectacle turc + DJ.",
          "Gold Alcool Illimité (€119) : Place VIP proche de la scène, alcool à volonté inclus, menu Premium et spectacle turc + DJ. La formule la plus complète.",
        ],
      },
      {
        heading: "Comment rejoindre le pier de Kabataş",
        body: [
          "Plusieurs options de transport en commun permettent d'atteindre facilement le pier de Kabataş depuis tous les quartiers d'Istanbul. Le chemin le plus rapide est la ligne de métro M2 depuis Taksim : un seul arrêt, seulement 5 minutes.",
          "Le tramway T1 part d'Eminönü, du Grand Bazar et de Beyazıt pour se terminer à Kabataş — idéal depuis Sultanahmet, environ 20 minutes de trajet. Le paiement s'effectue avec la carte Istanbul ou un ticket individuel.",
          "Pour ceux qui préfèrent le taxi : depuis Taksim, comptez environ 10 minutes ; depuis Sultanahmet, 15 à 20 minutes. Tenez compte de la circulation en soirée. Nous recommandons d'être au pier au moins 20 minutes avant le départ.",
        ],
      },
      {
        heading: "Sécurité, agrément et réservation",
        body: [
          "MerrySails opère sous Merry Tourism, agréée TÜRSAB Groupe A depuis 2001 à Istanbul. Toutes nos croisières respectent la réglementation maritime turque ; le personnel de bord est expérimenté et certifié.",
          "Les réservations sont annulables gratuitement jusqu'à 48 heures avant le départ. En haute saison (mai à septembre), nous recommandons de réserver au moins 3 à 5 jours à l'avance car les croisières affichent souvent complet.",
          "Tous les détails des formules, l'itinéraire et les avis clients sont disponibles sur la page principale de notre Croisière Dîner Istanbul. Notre WhatsApp est disponible 24h/24 pour répondre à vos questions.",
        ],
      },
    ],
    packagesHeading: "Formules disponibles",
    perPerson: "par personne",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€55",
        highlight: false,
        items: ["Place standard", "Boissons sans alcool à volonté", "Menu dîner", "Spectacle de nuit turque"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Place standard", "Boissons alcoolisées locales", "Menu dîner", "Spectacle de nuit turque"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["Place VIP proche scène", "Boissons sans alcool à volonté", "Menu Premium", "Spectacle turc + DJ"],
      },
      {
        name: "Gold Alcool Illimité",
        price: "€119",
        highlight: false,
        items: ["Place VIP proche scène", "Alcool à volonté inclus", "Menu Premium", "Spectacle turc + DJ"],
      },
    ],
    transportHeading: "Comment y aller",
    transportIntro: "Pour rejoindre le pier de Kabataş :",
    transportItems: [
      { mode: "Métro M2", detail: "Depuis Taksim — seulement 5 minutes, 1 arrêt" },
      { mode: "Tramway T1", detail: "Depuis Eminönü / Sultanahmet — environ 20 minutes" },
      { mode: "Bus", detail: "Lignes via Besiktas et Kadikoy" },
      { mode: "Taxi", detail: "Depuis Taksim ~10 min, depuis Sultanahmet ~15 min" },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "À quelle heure part la croisière dîner de Kabataş ?",
        a: "Le départ est à 20h30. Présentez-vous au pier au moins 20 minutes avant pour l'embarquement. L'heure exacte figure dans votre confirmation de réservation.",
      },
      {
        q: "Comment rejoindre le pier de Kabataş ?",
        a: "Depuis Taksim, métro M2 en 5 minutes. Depuis Sultanahmet, tramway T1 en environ 20 minutes. En taxi, comptez 10 à 15 minutes depuis le centre.",
      },
      {
        q: "Y a-t-il un service de navette depuis l'hôtel ?",
        a: "Oui, un service de navette est disponible pour des hôtels sélectionnés dans les quartiers centraux de la rive européenne. Choisissez cette option lors de la réservation.",
      },
      {
        q: "Quelle formule est la plus populaire ?",
        a: "Silver Soft Drinks (€55) est la formule d'entrée la plus choisie. Spectacle de nuit turque et dîner inclus — idéale pour une première expérience. Pour les boissons alcoolisées, Silver Alcoholic (€75) est recommandée.",
      },
      {
        q: "Des options végétariennes ou sans gluten sont-elles disponibles ?",
        a: "Oui, des plats végétariens sont au menu. Pour les adaptations sans gluten, merci de le préciser lors de la réservation afin que notre équipe puisse préparer à l'avance.",
      },
      {
        q: "Quand commence le spectacle ?",
        a: "Le programme de spectacle commence environ 30 à 45 minutes après le départ. Il inclut danses folkloriques, musique live, davul-zurna et shows de danse interactifs.",
      },
      {
        q: "Y a-t-il des réductions pour les enfants ?",
        a: "Les enfants de 0 à 5 ans sont gratuits. Un tarif réduit s'applique aux enfants de 6 à 12 ans. Contactez-nous via WhatsApp pour les détails.",
      },
      {
        q: "Quelle est la politique d'annulation ?",
        a: "Annulation gratuite jusqu'à 48 heures avant le départ. En cas de mauvais temps, la croisière est reportée ou remboursée.",
      },
    ],
    relatedHeading: "Autres options",
    ctaHeading: "Réserver la croisière dîner de Kabataş",
    ctaSubtitle: "Indiquez la date et le nombre de personnes — réponse rapide garantie.",
    bookLabel: "Réserver maintenant",
    whatsappLabel: "Écrire sur WhatsApp",
    mainPageNote:
      "Tous les détails des formules, photos et avis sont disponibles sur la",
  },

  nl: {
    metaTitle: "Kabataş Dinercruise Istanbul — Vanaf €55 | Bosporus Avondeten | MerrySails",
    metaDescription:
      "Dinercruise vertrek Kabataş Istanbul: pakketten vanaf €55, Turkse avondshow, uitzicht op Dolmabahçe Paleis. TÜRSAB-gecertificeerd sinds 2001, meer dan 50.000 gasten. Boek nu.",
    canonicalPath: "/nl/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Home",
    breadcrumbDinner: "Dinercruise",
    breadcrumbCurrent: "Vertrek Kabataş",
    eyebrow: "MerrySails Istanbul — Kabataş Pier",
    heroTitle: "Kabataş Dinercruise Istanbul",
    heroSubtitle: "Vanaf €55 per persoon · Vertrek voor het Dolmabahçe Paleis",
    heroDescription:
      "De Kabataş dinercruise vertrekt vanaf het drukste punt van de Bosporus — vlak voor het Dolmabahçe Paleis. De pier is gemakkelijk bereikbaar met metro en tram en geldt als het meest populaire vertrekpunt voor Bosporus-dinercruises in Istanbul. Met een Turkse avondshow, diner en een route van 3,5 uur bieden we pakketten vanaf €55. Sinds 2001 hebben we meer dan 50.000 gasten verwelkomd.",
    trustSignal: "TÜRSAB A-categorie gecertificeerd — Merry Tourism Istanbul sinds 2001, 50.000+ gasten",
    keyFacts: [
      { icon: "⏱", label: "Duur", value: "ca. 3,5 uur" },
      { icon: "📍", label: "Vertrek", value: "Kabataş Pier, 20:30" },
      { icon: "💶", label: "Prijs", value: "Vanaf €55 per persoon" },
      { icon: "🎭", label: "Inbegrepen", value: "Turkse show + diner" },
    ],
    sections: [
      {
        heading: "Kabataş Pier: De Bosporus-toegang van Istanbul",
        body: [
          "De Kabataş Pier ligt direct naast het Dolmabahçe Paleis, op het strategisch gelegen punt waar de Bosporus en de Gouden Hoorn samenkomen. Deze ligging stelt schepen in staat om direct de mooiste panorama's van de Bosporus te bereiken: al snel na het vertrek worden het Çırağan Paleis, de Ortaköy Moskee en de silhouetten van de Bosporus-bruggen zichtbaar.",
          "De pier is vanuit alle delen van Istanbul goed bereikbaar. Vanuit Taksim duurt de metro M2-rit slechts 5 minuten; vanuit Eminönü rijdt tram T1 in ongeveer 20 minuten naar Kabataş. Vanuit Sultanahmet, Beyoglu of Besiktas is een taxi ook een comfortabele optie.",
          "Op de avond heerst er een levendige sfeer rondom de pier. De verlichting van het Dolmabahçe Paleis en de zonsondergangskleuren boven de Bosporus zorgen al vóór het vertrek voor onvergetelijke indrukken.",
        ],
      },
      {
        heading: "Waarom kiezen voor de dinercruise vanaf Kabataş?",
        body: [
          "De Kabataş dinercruise is bijzonder geschikt voor gasten die verblijven in hotels in Taksim, Besiktas, Nisantasi of in de buurt van Kabataş. In plaats van door het drukke verkeer op de Europese oever te rijden, bereikt u de pier comfortabel met het openbaar vervoer.",
          "Het vertrekpunt biedt ook nautische voordelen: het schip bereikt direct open water na het vertrek, zonder complexe havenmanoeuvres. Hierdoor brengt u het grootste deel van de cruise door met een onbelemmerd zicht op de Bosporus.",
          "Onze hotelshuttle-service dekt de meeste hotels in de buurt van Kabataş en in de centrale wijken van de Europese oever. Uw ophaaltijd wordt schriftelijk doorgegeven met de boekingsbevestiging.",
        ],
      },
      {
        heading: "Dinermenu en Turkse avondshow",
        body: [
          "Elk dinercruise-pakket bevat hetzelfde entertainmentprogramma: live Turkse muziek, folkloredansen, davul-zurna-optredens en interactieve dansshows. Afhankelijk van het pakket wordt een tafelservice of een avondbuffet geserveerd.",
          "Het menu biedt klassiekers uit de Turkse keuken: olijfolie-hapjes gevolgd door gegrild vlees (kip, lam, köfte), rijst en Turkse desserts. Vegetarische opties zijn beschikbaar; glutenvrije aanpassingen kunnen op verzoek worden bereid.",
          "Gasten met het Gold-pakket genieten van VIP-stoelen vlak bij het podium, een Premium menu en onbeperkte dranken, plus een DJ-set. Het Silver-pakket omvat een standaard stoel, standaard dinermenu en de Turkse avondshow.",
        ],
      },
      {
        heading: "Pakketten en prijzen",
        body: [
          "De Kabataş dinercruise heeft vier pakketten. De route en duur zijn voor alle pakketten gelijk; het verschil zit in stoeltype, menuniveau en drankenaanbod.",
          "Silver Soft Drinks (€55): Standaard stoel, onbeperkt frisdrank, dinermenu en Turkse avondshow inbegrepen. Het populairste instappakket.",
          "Silver Alcoholic (€75): Standaard stoel, lokale alcoholische dranken (bier, wijn, raki), dinermenu en Turkse avondshow inbegrepen.",
          "Gold Soft Drinks (€95): VIP-stoel bij het podium, onbeperkt frisdrank, Premium menu en Turkse show + DJ.",
          "Gold Onbeperkt Alcohol (€119): VIP-stoel bij het podium, onbeperkt alcohol inbegrepen, Premium menu en Turkse show + DJ. Het meest complete pakket.",
        ],
      },
      {
        heading: "Hoe bereikt u de Kabataş Pier",
        body: [
          "Meerdere opties voor openbaar vervoer maken de Kabataş Pier gemakkelijk bereikbaar vanuit alle delen van Istanbul. De snelste route is metro M2 vanaf Taksim: slechts één halte, slechts 5 minuten.",
          "Tram T1 vertrekt vanuit Eminönü, de Grote Bazaar en Beyazıt, met Kabataş als eindhalte — ideaal vanuit Sultanahmet, ongeveer 20 minuten reistijd. Betaling via de Istanbul-kaart of een los kaartje.",
          "Voor taxigebruikers: vanuit Taksim ongeveer 10 minuten, vanuit Sultanahmet 15 tot 20 minuten. Let op het avondverkeer. Wij adviseren om ten minste 20 minuten vóór vertrek aanwezig te zijn bij de pier.",
        ],
      },
      {
        heading: "Veiligheid, certificering en boeking",
        body: [
          "MerrySails opereert onder Merry Tourism, TÜRSAB A-categorie gecertificeerd in Istanbul sinds 2001. Alle onze tochten voldoen aan de Turkse scheepvaartregelgeving; het scheepspersoneel is ervaren en gecertificeerd.",
          "Boekingen zijn gratis annuleerbaar tot 48 uur vóór vertrek. In het hoogseizoen (mei tot september) raden we aan om minimaal 3 tot 5 dagen van tevoren te boeken, omdat de cruises vaak volgeboekt zijn.",
          "Alle pakketdetails, route-informatie en gastenbeoordelingen zijn beschikbaar op onze hoofdpagina van de Istanbul Dinercruise. Onze WhatsApp staat 24/7 klaar voor uw vragen.",
        ],
      },
    ],
    packagesHeading: "Pakketopties",
    perPerson: "per persoon",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€55",
        highlight: false,
        items: ["Standaard stoel", "Onbeperkt frisdrank", "Dinermenu", "Turkse avondshow"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standaard stoel", "Lokale alcoholische dranken", "Dinermenu", "Turkse avondshow"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["VIP-stoel bij podium", "Onbeperkt frisdrank", "Premium menu", "Turkse show + DJ"],
      },
      {
        name: "Gold Onbeperkt Alcohol",
        price: "€119",
        highlight: false,
        items: ["VIP-stoel bij podium", "Onbeperkt alcohol inbegrepen", "Premium menu", "Turkse show + DJ"],
      },
    ],
    transportHeading: "Hoe te bereiken",
    transportIntro: "Zo bereikt u de Kabataş Pier:",
    transportItems: [
      { mode: "Metro M2", detail: "Vanuit Taksim — slechts 5 minuten, 1 halte" },
      { mode: "Tram T1", detail: "Vanuit Eminönü / Sultanahmet — ca. 20 minuten" },
      { mode: "Bus", detail: "Lijnen via Besiktas en Kadikoy" },
      { mode: "Taxi", detail: "Vanuit Taksim ~10 min, vanuit Sultanahmet ~15 min" },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe laat vertrekt de Kabataş dinercruise?",
        a: "Vertrek is om 20:30. Wees minstens 20 minuten eerder aanwezig bij de pier voor het inchecken. De exacte instaptijd staat in uw boekingsbevestiging.",
      },
      {
        q: "Hoe kom ik bij de Kabataş Pier?",
        a: "Vanuit Taksim met metro M2 in 5 minuten, vanuit Sultanahmet met tram T1 in circa 20 minuten. Met taxi ca. 10 tot 15 minuten vanuit het centrum.",
      },
      {
        q: "Is er een hotelshuttle beschikbaar?",
        a: "Ja, voor geselecteerde hotels in centrale wijken van de Europese oever is een shuttle beschikbaar. Selecteer deze optie bij het boeken; de ophaaltijd ontvangt u schriftelijk.",
      },
      {
        q: "Welk pakket is het populairst?",
        a: "Silver Soft Drinks (€55) is het meest geboekte instappakket. Turkse avondshow en diner zijn al inbegrepen — ideaal voor een eerste ervaring. Voor alcohol kiest u Silver Alcoholic (€75).",
      },
      {
        q: "Zijn er vegetarische of glutenvrije opties?",
        a: "Ja, vegetarische gerechten zijn beschikbaar. Voor glutenvrije aanpassingen verzoeken wij u dit bij boeking te vermelden zodat we dit vooraf kunnen regelen.",
      },
      {
        q: "Wanneer begint de show?",
        a: "Het showprogramma start ongeveer 30 tot 45 minuten na vertrek. Het omvat folkloredansen, livemuziek, davul-zurna en interactieve dansshows.",
      },
      {
        q: "Is er korting voor kinderen?",
        a: "Kinderen van 0 tot 5 jaar zijn gratis. Voor kinderen van 6 tot 12 jaar geldt een gereduceerde prijs. Neem contact op via WhatsApp voor de exacte tarieven.",
      },
      {
        q: "Wat is het annuleringsbeleid?",
        a: "Gratis annulering tot 48 uur vóór vertrek. Bij slecht weer wordt de cruise uitgesteld of terugbetaald.",
      },
    ],
    relatedHeading: "Andere opties",
    ctaHeading: "Kabataş dinercruise boeken",
    ctaSubtitle: "Geef datum en aantal personen op — snel antwoord gegarandeerd.",
    bookLabel: "Nu boeken",
    whatsappLabel: "Stuur een WhatsApp",
    mainPageNote:
      "Alle pakketdetails, foto's en beoordelingen vindt u op de",
  },
};

// ─── Related links per locale ─────────────────────────────────────────────────

const RELATED_LINKS: Record<string, { href: string; title: string; desc: string }[]> = {
  tr: [
    { href: "/istanbul-dinner-cruise", title: "İstanbul Akşam Yemeği Turu", desc: "Ana tur sayfası — tüm paketler ve fiyatlar" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Gün Batımı Turu", desc: "€34'ten başlayan 2 saatlik altın saat turu" },
    { href: "/private-bosphorus-dinner-cruise", title: "Özel Akşam Yemeği Turu", desc: "Sadece sizin grubunuz için özel yat deneyimi" },
  ],
  de: [
    { href: "/istanbul-dinner-cruise", title: "Istanbul Dinner Cruise", desc: "Hauptseite — alle Pakete und Preise" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Sonnenuntergang-Tour", desc: "2-stündige Tour ab €34" },
    { href: "/private-bosphorus-dinner-cruise", title: "Private Dinner Kreuzfahrt", desc: "Exklusive Yacht nur für Ihre Gruppe" },
  ],
  fr: [
    { href: "/istanbul-dinner-cruise", title: "Croisière Dîner Istanbul", desc: "Page principale — toutes les formules et tarifs" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Croisière Coucher de Soleil", desc: "Croisière de 2h à partir de €34" },
    { href: "/private-bosphorus-dinner-cruise", title: "Dîner Privé en Yacht", desc: "Yacht exclusif pour votre groupe uniquement" },
  ],
  nl: [
    { href: "/istanbul-dinner-cruise", title: "Istanbul Dinercruise", desc: "Hoofdpagina — alle pakketten en prijzen" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Zonsondergang Cruise", desc: "Cruise van 2 uur vanaf €34" },
    { href: "/private-bosphorus-dinner-cruise", title: "Privé Dinercruise", desc: "Exclusieve jacht alleen voor uw groep" },
  ],
};

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/kabatas-dinner-cruise-istanbul");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: languages ?? {
        "x-default": `${SITE_URL}/kabatas-dinner-cruise-istanbul`,
        en: `${SITE_URL}/kabatas-dinner-cruise-istanbul`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function KabatasDinnerCruiseLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const relatedLinks = RELATED_LINKS[locale] ?? [];

  // ── Schemas ────────────────────────────────────────────────────────────────

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    name: t.heroTitle,
    description: t.metaDescription,
    url: canonicalUrl,
    image: `${SITE_URL}/og-image.jpg`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    touristType: "Cultural Tourism",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 55,
      highPrice: 119,
      priceCurrency: "EUR",
      offerCount: 4,
      availability: "https://schema.org/InStock",
    },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumbDinner,
        item: `${SITE_URL}/${locale}/istanbul-dinner-cruise`,
      },
      { "@type": "ListItem", position: 3, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/istanbul-dinner-cruise`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbDinner}</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          {/* Hero */}
          <section className="mb-10">
            <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
              {t.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-3 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg font-medium text-[var(--brand-primary)] mb-4">{t.heroSubtitle}</p>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-5 max-w-3xl">
              {t.heroDescription}
            </p>
            <p className="text-sm font-medium text-[var(--heading)] mb-6">{t.trustSignal}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/reservation`}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                {t.bookLabel}
              </Link>
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5"
              >
                {t.whatsappLabel}
              </a>
            </div>
          </section>

          {/* Key Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {t.keyFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-[var(--line)] bg-white p-4 text-center">
                <span className="text-2xl mb-2 block">{fact.icon}</span>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1">{fact.label}</p>
                <p className="font-bold text-[var(--heading)] text-sm">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* Sections */}
          {t.sections.map((section, idx) => (
            <section key={idx} className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* Packages */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-6">{t.packagesHeading}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-xl border p-4 ${
                    pkg.highlight
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 ring-1 ring-[var(--brand-primary)]/20"
                      : "border-[var(--line)] bg-[var(--surface-alt)]"
                  }`}
                >
                  {pkg.highlight && (
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand-primary)] mb-2">
                      ★ Popular
                    </p>
                  )}
                  <p className="font-bold text-[var(--heading)]">{pkg.name}</p>
                  <p className="text-2xl font-bold text-[var(--brand-primary)] mt-1">{pkg.price}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{t.perPerson}</p>
                  <ul className="space-y-1">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-0.5 text-[var(--brand-primary)] shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Transport */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-3">{t.transportHeading}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-4">{t.transportIntro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {t.transportItems.map((item) => (
                <div key={item.mode} className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-3">
                  <span className="text-[var(--brand-primary)] font-bold text-sm shrink-0">{item.mode}</span>
                  <span className="text-sm text-[var(--text-muted)]">{item.detail}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-5">{t.faqHeading}</h2>
            <div className="space-y-3">
              {t.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180 shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          {relatedLinks.length > 0 && (
            <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-[var(--heading)] mb-4">{t.relatedHeading}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href.startsWith("/istanbul-dinner-cruise") ? link.href : `/${locale}${link.href}`}
                    className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                  >
                    <h3 className="font-semibold text-[var(--heading)] mb-1">{link.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Internal link note */}
          <p className="text-sm text-[var(--text-muted)] mb-8 text-center">
            {t.mainPageNote}{" "}
            <Link href={`/${locale}/istanbul-dinner-cruise`} className="text-[var(--brand-primary)] underline hover:opacity-80">
              İstanbul Dinner Cruise
            </Link>{" "}
            →
          </p>

          {/* CTA */}
          <div className="rounded-2xl bg-[var(--brand-primary)] p-8 md:p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.ctaHeading}</h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">{t.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/reservation`}
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
              >
                {t.bookLabel}
              </Link>
              <a
                href="https://wa.me/905370406822"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {t.whatsappLabel}
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
