import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Users, Star } from "lucide-react";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

type KeyFact = { icon: string; label: string; value: string };
type Package = { name: string; price: string; highlight: boolean; items: string[] };
type Section = { heading: string; body: string };
type Faq = { q: string; a: string };

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCruise: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  trustBadge: string;
  keyFacts: KeyFact[];
  whyHeading: string;
  whySections: Section[];
  pickupZonesHeading: string;
  pickupZones: { district: string; landmark: string; pickupTime: string }[];
  packagesHeading: string;
  perPerson: string;
  packages: Package[];
  howItWorksHeading: string;
  howItWorks: { step: string; desc: string }[];
  sections: Section[];
  faqHeading: string;
  faqs: Faq[];
  internalLinkLabel: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaBookLabel: string;
  ctaWhatsappLabel: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "İstanbul Akşam Yemeği Turu Otel Transfer Dahil — €55'dan | MerrySails",
    metaDescription:
      "İstanbul akşam yemeği turu otel transfer dahil: Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli ve Kadıköy'den akşam 18:30–19:15 arası alım. 4 paket €55–€119. TURSAB A Grubu lisanslı.",
    canonicalPath: "/tr/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Otel Transfer Dahil Akşam Yemeği Turu",
    eyebrow: "MerrySails İstanbul • 2001'den Beri",
    heroTitle: "İstanbul Akşam Yemeği Turu Otel Transfer Dahil",
    heroSubtitle: "Otelden tekniye, tekneden otele — €55'dan başlayan paketlerde transfer dahil",
    heroTagline:
      "Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli ve Kadıköy otellerinden kapıdan kapıya transfer hizmetiyle Boğaz akşam yemeği turunuzun keyfini çıkarın. Taksi stresi yok, navigasyon karmaşası yok — sadece siz ve İstanbul'un en büyüleyici manzarası.",
    trustBadge: "TURSAB A Grubu Lisanslı • 50.000+ Misafir • 2001'den Beri",
    keyFacts: [
      { icon: "clock", label: "Alım Saatleri", value: "18:30–19:15" },
      { icon: "map", label: "Transfer Bölgeleri", value: "6 Semt" },
      { icon: "star", label: "Değerlendirme", value: "4.9 / 5" },
      { icon: "users", label: "Tur Süresi", value: "~3.5 Saat" },
    ],
    whyHeading: "Otel Transferi Neden Önemli?",
    whySections: [
      {
        heading: "Taksi Ücreti ve Stresi Ortadan Kalkar",
        body: "İstanbul'da otellerden Kabataş İskelesi'ne ulaşmak akşam trafiğinde 30–50 dakika sürebilir. Taksi ücreti €8–€20 arasında değişirken, yolu bulmak ve doğru iskeleye gitmek zaman kaybettirir. Transfer dahil paketlerimizde bu sorunların hiçbiriyle uğraşmazsınız.",
      },
      {
        heading: "Grup Koordinasyonu Kolaylaşır",
        body: "Birden fazla otelden gelen gruplar için transfer organizasyonu özellikle önemlidir. Servis aracı, tüm konukları belirlenen sırayla alır ve herkesi birlikte iskeleye ulaştırır. Kayıp misafir, gecikme veya koordinasyon sorunu yaşanmaz.",
      },
      {
        heading: "Büyük Gruplar İçin Özel Araçlar",
        body: "8 kişiyi aşan gruplar için özel minibüs veya büyük araç tahsis edilir. Küçük gruplar standart servis aracıyla taşınır. Tüm araçlar klimatlı ve konforludur.",
      },
    ],
    pickupZonesHeading: "Transfer Bölgeleri ve Alım Saatleri",
    pickupZones: [
      { district: "Sultanahmet", landmark: "Hippodrome, Ayasofya, Sultan Ahmet Camii yakını", pickupTime: "18:30" },
      { district: "Sirkeci / Eminönü", landmark: "Sirkeci İstasyonu, Mısır Çarşısı yakını", pickupTime: "18:40" },
      { district: "Karaköy / Galata", landmark: "Galata Kulesi yakını, Karaköy Meydanı", pickupTime: "18:45" },
      { district: "Beyoğlu / Taksim", landmark: "İstiklal Caddesi, büyük oteller", pickupTime: "19:00" },
      { district: "Beşiktaş / Şişli", landmark: "Beşiktaş Meydanı, Şişli iş merkezi", pickupTime: "19:10" },
      { district: "Kadıköy (Asya Yakası)", landmark: "Kadıköy İskelesi yakını, koordinasyon ile", pickupTime: "19:15" },
    ],
    packagesHeading: "Transfer Dahil Paket Seçenekleri",
    perPerson: "kişi başı",
    packages: [
      {
        name: "Standart",
        price: "€55",
        highlight: false,
        items: [
          "Otel transferi dahil",
          "Standart güverte koltuğu",
          "Akşam yemeği menüsü",
          "Türk gecesi gösterisi",
          "Alkolsüz içecekler",
        ],
      },
      {
        name: "Premium",
        price: "€75",
        highlight: true,
        items: [
          "Otel transferi dahil",
          "Öncelikli koltuk seçimi",
          "Genişletilmiş yemek menüsü",
          "Türk gecesi gösterisi + DJ",
          "Yerel içecekler dahil",
        ],
      },
      {
        name: "VIP",
        price: "€95",
        highlight: false,
        items: [
          "Otel transferi dahil",
          "VIP sahne yakını koltuk",
          "Premium yemek menüsü",
          "Türk gecesi + DJ + Canlı Müzik",
          "Sınırsız yerel içecek",
        ],
      },
      {
        name: "Exclusive",
        price: "€119",
        highlight: false,
        items: [
          "Özel araç transferi",
          "VIP güverte — en iyi manzara",
          "Şef özel menüsü",
          "Tam program + sınırsız alkol",
          "Fotoğraf paketi hediye",
        ],
      },
    ],
    howItWorksHeading: "Transfer Nasıl İşler?",
    howItWorks: [
      {
        step: "1. Rezervasyon Yapın",
        desc: "Otel adınızı ve semtinizi belirterek rezervasyon tamamlanır. Ekibimiz alım noktasını 24 saat içinde yazılı olarak teyit eder.",
      },
      {
        step: "2. Alım Onayı Alın",
        desc: "Alım saati, araç tipi ve şoför iletişim bilgileri rezervasyon onayının ardından WhatsApp veya e-posta ile iletilir.",
      },
      {
        step: "3. Otelde Hazır Olun",
        desc: "Belirlenen saatte otel lobisinde veya kapısında hazır olun. Şoför sizi ismiyle karşılar ve doğrudan Kabataş İskelesi'ne götürür.",
      },
      {
        step: "4. Turun Tadını Çıkarın",
        desc: "Yaklaşık 3,5 saatlik Boğaz turunuzun ardından, gece 23:30–00:30 arasında sizi otel bölgenize geri bırakır.",
      },
    ],
    sections: [
      {
        heading: "Boğaz Akşam Yemeği Turu: Ne Beklemelisiniz?",
        body: "MerrySails İstanbul Boğaz akşam yemeği turu, Kabataş İskelesi'nden saat 20:30'da hareket eder. Yaklaşık 3,5 saat süren tur boyunca Boğaz'ın iki yakasındaki tarihi yalıları, köprüleri ve aydınlanmış silüeti izlerken dört farklı paket seçeneğinden birine göre hazırlanmış bir akşam yemeği yersiniz. Türk gecesi gösterisi, canlı müzik ve opsiyonel DJ eşliğinde İstanbul'u denizden keşfedersiniz.",
      },
      {
        heading: "Transfer Olmadan Nasıl Gidilir?",
        body: "Transfer dahil paketi tercih etmiyorsanız, Kabataş İskelesi'ne kendiniz ulaşabilirsiniz. Metro ile T1 Kabataş durağına (Taksim'den yaklaşık 3 dakika), tramvayla ise tarihi yarımada üzerinden erişim sağlayabilirsiniz. Ancak akşam trafiğinde ve yabancı bir şehirde, transfer seçeneği çok daha konforlu ve güvenli bir deneyim sunar.",
      },
      {
        heading: "50.000'den Fazla Mutlu Misafir",
        body: "MerrySails, 2001 yılından bu yana Merry Tourism bünyesinde TURSAB A Grubu lisansıyla faaliyet göstermektedir. 50.000'i aşkın misafiri ağırladık ve her geçen yıl hizmet kalitemizi geliştirmeye devam ediyoruz. Misafir memnuniyeti konusundaki kararlılığımız, her turun başında sizi sağlıklı ve güvende getirmekle başlar.",
      },
      {
        heading: "Güvenli ve Konforlu Transfer",
        body: "Tüm transfer araçlarımız düzenli bakımlı, klimatlı ve profesyonel şoförler tarafından kullanılmaktadır. Şoförlerimiz İngilizce ve Türkçe konuşabilmekte, İstanbul'un tüm semtlerini iyi tanımaktadır. Her transfer, yolculuğunuzu keyifli kılmak için başlangıçtan itibaren planlanır.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Transfer hangi bölgelerden yapılıyor?",
        a: "Sultanahmet, Sirkeci, Eminönü, Karaköy, Galata, Beyoğlu, Taksim, Beşiktaş, Şişli ve Kadıköy bölgelerindeki oteller için transfer sağlanmaktadır. Otel adresinizi belirttiğinizde ekibimiz kesin alım noktasını teyit eder.",
      },
      {
        q: "Transfer her pakete dahil mi?",
        a: "Evet, Standart (€55), Premium (€75), VIP (€95) ve Exclusive (€119) paketlerinin tamamına transfer dahildir. Ek ücret talep edilmez.",
      },
      {
        q: "Alım saatine geç kalırsam ne olur?",
        a: "Şoför, belirlenen alım saatinden önce sizi 15 dakika öncesinde arayarak hatırlatma yapar. Hafif gecikme durumunda koordinasyon sağlanır; ancak tekne belirli bir saatte kalkar ve beklemek mümkün olmayabilir.",
      },
      {
        q: "Asya yakasından alım yapılıyor mu?",
        a: "Kadıköy bölgesi için koordineli transfer yapılmaktadır, ancak Avrupa yakası semtlerine göre daha erken alım gerekir. Diğer Asya yakası semtleri için Kabataş'a doğrudan gelinmesi tavsiye edilir.",
      },
      {
        q: "Geri dönüş transferi de dahil mi?",
        a: "Evet. Tur sona erdikten sonra, gece 23:30–00:30 saatleri arasında sizi otel bölgenize geri bırakan dönüş transferi de pakete dahildir.",
      },
      {
        q: "Büyük grup için ayrı araç tahsis ediliyor mu?",
        a: "8 kişiyi aşan gruplar için minibüs veya büyük araç tahsis edilir. Rezervasyon sırasında grup büyüklüğünüzü bildirmeniz yeterlidir.",
      },
      {
        q: "Transfer için ek belge gerekiyor mu?",
        a: "Hayır. Rezervasyon onayınızı (e-posta veya WhatsApp ekranı) şoföre göstermeniz yeterlidir. Ek belge gerekmez.",
      },
      {
        q: "Tur iptal edilirse transfer ücreti iade ediliyor mu?",
        a: "Kötü hava koşulları veya operasyonel nedenlerle tur iptal edilirse, ödediğiniz tutarın tamamı iade edilir. İptal politikamız hakkında ayrıntılar rezervasyon sırasında iletilir.",
      },
    ],
    internalLinkLabel: "Ana Akşam Yemeği Turu Sayfası →",
    ctaHeading: "Otel Transferli Boğaz Turunuzu Hemen Rezerve Edin",
    ctaSubtitle:
      "€55'dan başlayan fiyatlarla transfer dahil paketi hemen rezerve edin ya da sorularınızı WhatsApp üzerinden bize iletin.",
    ctaBookLabel: "Hemen Rezervasyon",
    ctaWhatsappLabel: "WhatsApp'tan Yazın",
    viewInEnglish: "View in English →",
  },

  de: {
    metaTitle:
      "Istanbul Dinner Kreuzfahrt mit Hotelabholung — Ab €55 | MerrySails",
    metaDescription:
      "Istanbul Dinner Kreuzfahrt Hotelabholung: Abholung ab 18:30–19:15 Uhr aus Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli und Kadıköy. 4 Pakete €55–€119. TURSAB A-Gruppe lizenziert.",
    canonicalPath: "/de/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus-Tour",
    breadcrumbCurrent: "Dinner Cruise mit Hotelabholung",
    eyebrow: "MerrySails Istanbul • Seit 2001",
    heroTitle: "Istanbul Dinner Kreuzfahrt mit Hotelabholung",
    heroSubtitle:
      "Vom Hotel zum Schiff, vom Schiff zum Hotel — Transfer in allen Paketen ab €55 inklusive",
    heroTagline:
      "Genießen Sie Ihre Bosporus-Dinner-Kreuzfahrt mit Tür-zu-Tür-Transfer aus Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli und Kadıköy. Kein Taxistress, kein Navigationswirrwarr — nur Sie und die atemberaubendste Skyline Istanbuls.",
    trustBadge: "TURSAB A-Gruppe lizenziert • 50.000+ Gäste • Seit 2001",
    keyFacts: [
      { icon: "clock", label: "Abholzeiten", value: "18:30–19:15" },
      { icon: "map", label: "Transferzonen", value: "6 Stadtteile" },
      { icon: "star", label: "Bewertung", value: "4,9 / 5" },
      { icon: "users", label: "Tourdauer", value: "ca. 3,5 Std." },
    ],
    whyHeading: "Warum ist der Hoteltransfer so wichtig?",
    whySections: [
      {
        heading: "Kein Taxistress, keine Extrakosten",
        body: "Von einem Istanbuler Hotel zum Kabataş-Anleger kann im Abendverkehr 30–50 Minuten dauern. Ein Taxi kostet zwischen €8 und €20, und den richtigen Anleger zu finden kostet zusätzlich Zeit. Mit unserem Hoteltransfer entfällt all das.",
      },
      {
        heading: "Gruppenkoordination leicht gemacht",
        body: "Für Gruppen aus mehreren Hotels ist der Transfer besonders wertvoll. Das Fahrzeug holt alle Gäste in der geplanten Reihenfolge ab und bringt sie gemeinsam zum Anleger. Keine verlorenen Gäste, keine Verzögerungen.",
      },
      {
        heading: "Eigene Fahrzeuge für große Gruppen",
        body: "Für Gruppen über 8 Personen wird ein Minibus oder größeres Fahrzeug bereitgestellt. Kleinere Gruppen fahren im Standardshuttle. Alle Fahrzeuge sind klimatisiert und komfortabel.",
      },
    ],
    pickupZonesHeading: "Transferzonen und Abholzeiten",
    pickupZones: [
      { district: "Sultanahmet", landmark: "Hippodrom, Hagia Sophia, Blaue Moschee", pickupTime: "18:30" },
      { district: "Sirkeci / Eminönü", landmark: "Bahnhof Sirkeci, Gewürzbasar", pickupTime: "18:40" },
      { district: "Karaköy / Galata", landmark: "Galata-Turm, Karaköy-Platz", pickupTime: "18:45" },
      { district: "Beyoğlu / Taksim", landmark: "İstiklal-Straße, große Hotels", pickupTime: "19:00" },
      { district: "Beşiktaş / Şişli", landmark: "Beşiktaş-Platz, Şişli Geschäftszentrum", pickupTime: "19:10" },
      { district: "Kadıköy (Asiatische Seite)", landmark: "Kadıköy-Fähre, koordiniert", pickupTime: "19:15" },
    ],
    packagesHeading: "Pakete inklusive Transfer",
    perPerson: "pro Person",
    packages: [
      {
        name: "Standard",
        price: "€55",
        highlight: false,
        items: [
          "Hoteltransfer inklusive",
          "Standard-Deckplatz",
          "Abendmenü",
          "Türkische Abendshow",
          "Alkoholfreie Getränke",
        ],
      },
      {
        name: "Premium",
        price: "€75",
        highlight: true,
        items: [
          "Hoteltransfer inklusive",
          "Bevorzugte Sitzwahl",
          "Erweitertes Abendmenü",
          "Türkische Show + DJ",
          "Lokale Getränke inklusive",
        ],
      },
      {
        name: "VIP",
        price: "€95",
        highlight: false,
        items: [
          "Hoteltransfer inklusive",
          "VIP-Platz nahe der Bühne",
          "Premium-Menü",
          "Türkische Show + DJ + Live-Musik",
          "Unbegrenzte lokale Getränke",
        ],
      },
      {
        name: "Exclusive",
        price: "€119",
        highlight: false,
        items: [
          "Privater Fahrzeugtransfer",
          "VIP-Deck — beste Aussicht",
          "Chef-Sondermenü",
          "Vollprogramm + Alkohol unbegrenzt",
          "Fotopaket als Geschenk",
        ],
      },
    ],
    howItWorksHeading: "Wie funktioniert der Transfer?",
    howItWorks: [
      {
        step: "1. Buchen Sie Ihre Tour",
        desc: "Geben Sie bei der Buchung Ihren Hotelnamen und Stadtteil an. Unser Team bestätigt den Abholpunkt innerhalb von 24 Stunden schriftlich.",
      },
      {
        step: "2. Abholbestätigung erhalten",
        desc: "Abholzeit, Fahrzeugtyp und Fahrerkontakt werden nach Buchungsbestätigung per WhatsApp oder E-Mail mitgeteilt.",
      },
      {
        step: "3. Im Hotel bereit sein",
        desc: "Zur festgelegten Zeit im Hotelfoyer oder -eingang warten. Der Fahrer empfängt Sie namentlich und fährt direkt zum Kabataş-Anleger.",
      },
      {
        step: "4. Genießen und zurückfahren",
        desc: "Nach der rund 3,5-stündigen Bosporus-Fahrt bringt Sie das Fahrzeug zwischen 23:30 und 00:30 Uhr zurück zu Ihrer Hotelgegend.",
      },
    ],
    sections: [
      {
        heading: "Was erwartet Sie auf der Dinner-Kreuzfahrt?",
        body: "Die MerrySails Bosporus Dinner Cruise startet um 20:30 Uhr am Kabataş-Anleger. Während der rund 3,5-stündigen Fahrt genießen Sie Abendessen, türkische Live-Show und die beleuchtete Istanbuler Skyline von beiden Bosporus-Ufern aus. Je nach gewähltem Paket erwartet Sie Standard- oder Premium-Bestuhlung, unterschiedliche Menüs und ein abgestimmtes Unterhaltungsprogramm.",
      },
      {
        heading: "Ohne Transfer: Wie komme ich zum Anleger?",
        body: "Ohne Transfer können Sie den Kabataş-Anleger per Metro (Station T1 Kabataş, etwa 3 Minuten ab Taksim) oder per Straßenbahn erreichen. Im abendlichen Berufsverkehr und für Erstbesucher Istanbuls bietet der Hoteltransfer jedoch deutlich mehr Komfort und Sicherheit.",
      },
      {
        heading: "Über 50.000 zufriedene Gäste",
        body: "MerrySails operiert seit 2001 unter Merry Tourism mit TURSAB-A-Gruppe-Lizenz. Wir haben mehr als 50.000 Gäste an Bord begrüßt und entwickeln unsere Servicequalität jedes Jahr weiter. Sicherheit und Komfort beginnen bereits mit dem Transfer vom Hotel.",
      },
      {
        heading: "Sicherer und komfortabler Transfer",
        body: "Alle Transferfahrzeuge werden regelmäßig gewartet, sind klimatisiert und von professionellen Fahrern gelenkt. Unsere Fahrer sprechen Englisch und Türkisch und kennen alle Istanbuler Stadtteile bestens. Jeder Transfer ist von Anfang an auf Ihren Komfort ausgelegt.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Aus welchen Stadtteilen wird abgeholt?",
        a: "Abholungen erfolgen aus Sultanahmet, Sirkeci, Eminönü, Karaköy, Galata, Beyoğlu, Taksim, Beşiktaş, Şişli und Kadıköy. Nach Angabe Ihrer Hoteladresse bestätigt das Team den genauen Abholpunkt.",
      },
      {
        q: "Ist der Transfer in allen Paketen enthalten?",
        a: "Ja, alle vier Pakete — Standard (€55), Premium (€75), VIP (€95) und Exclusive (€119) — beinhalten den Transfer ohne Aufpreis.",
      },
      {
        q: "Was passiert, wenn ich mich verspäte?",
        a: "Der Fahrer ruft 15 Minuten vor der geplanten Abholzeit an. Bei kurzfristigen Verzögerungen wird koordiniert; das Schiff legt jedoch zu einer festen Zeit ab und kann nicht auf einzelne Gäste warten.",
      },
      {
        q: "Gibt es auch Abholung von der asiatischen Seite?",
        a: "Für Kadıköy ist ein koordinierter Transfer möglich, erfordert jedoch eine frühere Abholzeit. Für andere Stadtteile auf der asiatischen Seite empfehlen wir die direkte Anreise nach Kabataş.",
      },
      {
        q: "Ist der Rücktransfer ebenfalls inklusive?",
        a: "Ja. Nach der Tour bringt das Fahrzeug Sie zwischen 23:30 und 00:30 Uhr zurück in Ihre Hotelgegend.",
      },
      {
        q: "Wie wird ein Gruppenfahrzeug reserviert?",
        a: "Gruppen über 8 Personen erhalten automatisch einen Minibus oder ein größeres Fahrzeug. Geben Sie bei der Buchung einfach die Gruppengröße an.",
      },
      {
        q: "Benötige ich Dokumente für den Transfer?",
        a: "Nein. Zeigen Sie dem Fahrer einfach Ihre Buchungsbestätigung (E-Mail oder WhatsApp-Screenshot). Keine weiteren Unterlagen nötig.",
      },
      {
        q: "Was passiert bei Tourabsage wegen schlechten Wetters?",
        a: "Bei wetterbedingter oder operativer Absage wird der volle Betrag erstattet. Details zur Stornierungsrichtlinie erhalten Sie bei der Buchung.",
      },
    ],
    internalLinkLabel: "Zur Hauptseite: Istanbul Dinner Cruise →",
    ctaHeading: "Jetzt Ihre Bosporus-Dinner-Cruise mit Hoteltransfer buchen",
    ctaSubtitle:
      "Sichern Sie sich Ihr Paket ab €55 inklusive Transfer oder schreiben Sie uns per WhatsApp mit Ihrer Hoteladresse.",
    ctaBookLabel: "Jetzt buchen",
    ctaWhatsappLabel: "WhatsApp schreiben",
    viewInEnglish: "View in English →",
  },

  fr: {
    metaTitle:
      "Croisière Dîner Istanbul Transfert Hôtel Inclus — À partir de €55 | MerrySails",
    metaDescription:
      "Croisière dîner Istanbul avec transfert hôtel inclus : prise en charge 18h30–19h15 depuis Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli et Kadıköy. 4 formules €55–€119.",
    canonicalPath: "/fr/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Croisière dîner avec transfert hôtel",
    eyebrow: "MerrySails Istanbul • Depuis 2001",
    heroTitle: "Croisière Dîner Istanbul avec Transfert Hôtel Inclus",
    heroSubtitle:
      "De l'hôtel au bateau, du bateau à l'hôtel — transfert inclus dans toutes les formules à partir de €55",
    heroTagline:
      "Profitez de votre croisière dîner sur le Bosphore avec un transfert porte-à-porte depuis Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli et Kadıköy. Pas de stress taxi, pas de navigation compliquée — seulement vous et la plus belle vue d'Istanbul.",
    trustBadge: "Agréé TURSAB Groupe A • 50 000+ clients • Depuis 2001",
    keyFacts: [
      { icon: "clock", label: "Horaires de prise en charge", value: "18h30–19h15" },
      { icon: "map", label: "Zones de transfert", value: "6 quartiers" },
      { icon: "star", label: "Évaluation", value: "4,9 / 5" },
      { icon: "users", label: "Durée de la croisière", value: "~3h30" },
    ],
    whyHeading: "Pourquoi le transfert hôtel est-il si important ?",
    whySections: [
      {
        heading: "Fini le stress du taxi et les frais supplémentaires",
        body: "Depuis un hôtel d'Istanbul jusqu'à l'embarcadère de Kabataş, le trajet en taxi peut prendre 30 à 50 minutes dans la circulation du soir, pour un coût de €8 à €20. Sans compter la difficulté de trouver le bon débarcadère dans une ville inconnue. Notre transfert hôtel élimine tous ces problèmes.",
      },
      {
        heading: "Coordination de groupe simplifiée",
        body: "Pour les groupes venus de plusieurs hôtels, le transfert est particulièrement précieux. Le véhicule récupère tous les participants dans l'ordre prévu et les amène ensemble à l'embarcadère. Plus de clients perdus ni de retards.",
      },
      {
        heading: "Véhicules dédiés pour les grands groupes",
        body: "Pour les groupes de plus de 8 personnes, un minibus ou un grand véhicule est affecté. Les petits groupes voyagent dans la navette standard, toujours climatisée et confortable.",
      },
    ],
    pickupZonesHeading: "Zones de transfert et horaires de prise en charge",
    pickupZones: [
      { district: "Sultanahmet", landmark: "Hippodrome, Sainte-Sophie, Mosquée Bleue", pickupTime: "18h30" },
      { district: "Sirkeci / Eminönü", landmark: "Gare de Sirkeci, Bazar aux épices", pickupTime: "18h40" },
      { district: "Karaköy / Galata", landmark: "Tour de Galata, Place de Karaköy", pickupTime: "18h45" },
      { district: "Beyoğlu / Taksim", landmark: "Rue İstiklal, grands hôtels", pickupTime: "19h00" },
      { district: "Beşiktaş / Şişli", landmark: "Place de Beşiktaş, centre d'affaires Şişli", pickupTime: "19h10" },
      { district: "Kadıköy (côté asiatique)", landmark: "Ferry de Kadıköy, sur coordination", pickupTime: "19h15" },
    ],
    packagesHeading: "Formules avec transfert inclus",
    perPerson: "par personne",
    packages: [
      {
        name: "Standard",
        price: "€55",
        highlight: false,
        items: [
          "Transfert hôtel inclus",
          "Place standard sur le pont",
          "Menu dîner",
          "Spectacle de nuit turque",
          "Boissons sans alcool",
        ],
      },
      {
        name: "Premium",
        price: "€75",
        highlight: true,
        items: [
          "Transfert hôtel inclus",
          "Choix de place prioritaire",
          "Menu dîner étendu",
          "Spectacle turque + DJ",
          "Boissons locales incluses",
        ],
      },
      {
        name: "VIP",
        price: "€95",
        highlight: false,
        items: [
          "Transfert hôtel inclus",
          "Place VIP proche de la scène",
          "Menu premium",
          "Spectacle turque + DJ + Musique live",
          "Boissons locales à volonté",
        ],
      },
      {
        name: "Exclusive",
        price: "€119",
        highlight: false,
        items: [
          "Transfert en véhicule privé",
          "Pont VIP — meilleure vue",
          "Menu spécial du chef",
          "Programme complet + alcool illimité",
          "Forfait photo offert",
        ],
      },
    ],
    howItWorksHeading: "Comment fonctionne le transfert ?",
    howItWorks: [
      {
        step: "1. Réservez votre croisière",
        desc: "Indiquez le nom de votre hôtel et votre quartier lors de la réservation. Notre équipe confirme le point de prise en charge par écrit dans les 24 heures.",
      },
      {
        step: "2. Recevez la confirmation de prise en charge",
        desc: "Heure de prise en charge, type de véhicule et coordonnées du chauffeur vous sont envoyés par WhatsApp ou e-mail après confirmation.",
      },
      {
        step: "3. Soyez prêt à l'hôtel",
        desc: "Attendez à l'heure convenue dans le hall ou à l'entrée de votre hôtel. Le chauffeur vous accueille par votre nom et vous conduit directement à l'embarcadère de Kabataş.",
      },
      {
        step: "4. Profitez et rentrez",
        desc: "Après environ 3h30 de croisière sur le Bosphore, le véhicule vous dépose entre 23h30 et 00h30 dans le quartier de votre hôtel.",
      },
    ],
    sections: [
      {
        heading: "Que vous réserve la croisière dîner ?",
        body: "La croisière dîner MerrySails sur le Bosphore part à 20h30 de l'embarcadère de Kabataş. Pendant environ 3h30, vous dînez en admirant les yalıs historiques, les ponts et la skyline illuminée d'Istanbul des deux rives du Bosphore. Le spectacle de nuit turque, la musique live et le DJ optionnel vous plongent dans une ambiance unique.",
      },
      {
        heading: "Comment rejoindre l'embarcadère sans transfert ?",
        body: "Sans transfert, vous pouvez rejoindre Kabataş en métro (station T1 Kabataş, environ 3 minutes depuis Taksim) ou en tramway depuis la péninsule historique. Cependant, dans la circulation du soir et pour des visiteurs découvrant Istanbul, le transfert hôtel offre un confort et une sérénité incomparables.",
      },
      {
        heading: "Plus de 50 000 clients satisfaits",
        body: "MerrySails opère depuis 2001 sous Merry Tourism, avec licence TURSAB Groupe A. Nous avons accueilli plus de 50 000 clients à bord et améliorons continuellement notre qualité de service. Notre engagement envers la satisfaction client commence dès la prise en charge à l'hôtel.",
      },
      {
        heading: "Un transfert sûr et confortable",
        body: "Tous nos véhicules sont régulièrement entretenus, climatisés et conduits par des chauffeurs professionnels parlant anglais et turc. Nos chauffeurs connaissent parfaitement tous les quartiers d'Istanbul. Chaque transfert est organisé pour que votre soirée commence dans les meilleures conditions.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Depuis quels quartiers la prise en charge est-elle assurée ?",
        a: "Les prises en charge sont organisées depuis Sultanahmet, Sirkeci, Eminönü, Karaköy, Galata, Beyoğlu, Taksim, Beşiktaş, Şişli et Kadıköy. Après indication de votre adresse d'hôtel, l'équipe confirme le point exact.",
      },
      {
        q: "Le transfert est-il inclus dans toutes les formules ?",
        a: "Oui, les quatre formules — Standard (€55), Premium (€75), VIP (€95) et Exclusive (€119) — incluent le transfert sans supplément.",
      },
      {
        q: "Que se passe-t-il si je suis en retard ?",
        a: "Le chauffeur vous appelle 15 minutes avant l'heure de prise en charge prévue. En cas de léger retard, une coordination est possible, mais le bateau part à heure fixe et ne peut attendre.",
      },
      {
        q: "Y a-t-il une prise en charge depuis la rive asiatique ?",
        a: "Un transfert coordonné est possible depuis Kadıköy, mais il nécessite une prise en charge plus tôt. Pour les autres quartiers de la rive asiatique, nous recommandons de rejoindre directement Kabataş.",
      },
      {
        q: "Le retour à l'hôtel est-il également inclus ?",
        a: "Oui. Après la croisière, le véhicule vous dépose entre 23h30 et 00h30 dans le quartier de votre hôtel.",
      },
      {
        q: "Comment réserver un véhicule pour un grand groupe ?",
        a: "Les groupes de plus de 8 personnes bénéficient automatiquement d'un minibus ou grand véhicule. Il suffit d'indiquer la taille du groupe lors de la réservation.",
      },
      {
        q: "Faut-il des documents pour le transfert ?",
        a: "Non. Il suffit de montrer votre confirmation de réservation (e-mail ou capture d'écran WhatsApp) au chauffeur.",
      },
      {
        q: "Que se passe-t-il si la croisière est annulée pour mauvais temps ?",
        a: "En cas d'annulation pour raisons météorologiques ou opérationnelles, le remboursement intégral est effectué. Les détails de la politique d'annulation vous sont communiqués lors de la réservation.",
      },
    ],
    internalLinkLabel: "Voir la page principale : Croisière Dîner Istanbul →",
    ctaHeading: "Réservez dès maintenant votre croisière dîner avec transfert hôtel",
    ctaSubtitle:
      "Réservez votre formule à partir de €55 avec transfert inclus ou écrivez-nous sur WhatsApp avec votre adresse d'hôtel.",
    ctaBookLabel: "Réserver maintenant",
    ctaWhatsappLabel: "Écrire sur WhatsApp",
    viewInEnglish: "View in English →",
  },

  nl: {
    metaTitle:
      "Istanbul Diner Cruise met Hotelophaal — Vanaf €55 | MerrySails",
    metaDescription:
      "Istanbul diner cruise met hotelophaal: ophaal 18:30–19:15 vanuit Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli en Kadıköy. 4 pakketten €55–€119. TURSAB A-categorie gecertificeerd.",
    canonicalPath: "/nl/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Diner cruise met hotelophaal",
    eyebrow: "MerrySails Istanbul • Sinds 2001",
    heroTitle: "Istanbul Diner Cruise met Hotelophaal Inbegrepen",
    heroSubtitle:
      "Van hotel naar boot, van boot naar hotel — ophaal inbegrepen in alle pakketten vanaf €55",
    heroTagline:
      "Geniet van uw Bosporus diner cruise met deur-tot-deur ophaal vanuit Sultanahmet, Taksim, Beyoğlu, Beşiktaş, Şişli en Kadıköy. Geen taxistress, geen navigatieproblemen — alleen u en het meest indrukwekkende uitzicht van Istanbul.",
    trustBadge: "TURSAB A-categorie gecertificeerd • 50.000+ gasten • Sinds 2001",
    keyFacts: [
      { icon: "clock", label: "Ophaaltijden", value: "18:30–19:15" },
      { icon: "map", label: "Transfergebieden", value: "6 wijken" },
      { icon: "star", label: "Beoordeling", value: "4,9 / 5" },
      { icon: "users", label: "Cruiseduur", value: "ca. 3,5 uur" },
    ],
    whyHeading: "Waarom is hotelophaal zo belangrijk?",
    whySections: [
      {
        heading: "Geen taxikosten en geen stress",
        body: "Vanuit een Istanbul-hotel naar de Kabataş-aanlegsteiger kan in het avondspitsverkeer 30 tot 50 minuten duren. Een taxi kost tussen de €8 en €20, en het vinden van de juiste aanlegsteiger kost extra tijd. Met onze hotelophaal verdwijnen al deze problemen.",
      },
      {
        heading: "Groepscoördinatie eenvoudig gemaakt",
        body: "Voor groepen die uit meerdere hotels komen, is de ophaal bijzonder waardevol. Het voertuig haalt alle gasten op in de geplande volgorde en brengt ze gezamenlijk naar de aanlegsteiger. Geen verloren gasten, geen vertragingen.",
      },
      {
        heading: "Eigen voertuigen voor grote groepen",
        body: "Voor groepen van meer dan 8 personen wordt een minibus of groter voertuig ingezet. Kleinere groepen reizen in de standaard shuttle, altijd voorzien van airconditioning.",
      },
    ],
    pickupZonesHeading: "Transfergebieden en ophaaltijden",
    pickupZones: [
      { district: "Sultanahmet", landmark: "Hippodroom, Hagia Sophia, Blauwe Moskee", pickupTime: "18:30" },
      { district: "Sirkeci / Eminönü", landmark: "Station Sirkeci, Kruidenmarkt", pickupTime: "18:40" },
      { district: "Karaköy / Galata", landmark: "Galatatoren, Karaköy-plein", pickupTime: "18:45" },
      { district: "Beyoğlu / Taksim", landmark: "İstiklalstraat, grote hotels", pickupTime: "19:00" },
      { district: "Beşiktaş / Şişli", landmark: "Beşiktaş-plein, Şişli zakencentrum", pickupTime: "19:10" },
      { district: "Kadıköy (Aziatische kant)", landmark: "Kadıköy-veerboot, op coördinatie", pickupTime: "19:15" },
    ],
    packagesHeading: "Pakketten inclusief ophaal",
    perPerson: "per persoon",
    packages: [
      {
        name: "Standaard",
        price: "€55",
        highlight: false,
        items: [
          "Hotelophaal inbegrepen",
          "Standaard dekstoel",
          "Dinermenu",
          "Turkse avondshow",
          "Frisdranken",
        ],
      },
      {
        name: "Premium",
        price: "€75",
        highlight: true,
        items: [
          "Hotelophaal inbegrepen",
          "Prioritaire stoelkeuze",
          "Uitgebreid dinermenu",
          "Turkse show + DJ",
          "Lokale dranken inbegrepen",
        ],
      },
      {
        name: "VIP",
        price: "€95",
        highlight: false,
        items: [
          "Hotelophaal inbegrepen",
          "VIP-stoel dicht bij het podium",
          "Premium menu",
          "Turkse show + DJ + Live muziek",
          "Onbeperkte lokale dranken",
        ],
      },
      {
        name: "Exclusive",
        price: "€119",
        highlight: false,
        items: [
          "Privé voertuig ophaal",
          "VIP-dek — beste uitzicht",
          "Speciaal chef-menu",
          "Volledig programma + onbeperkt alcohol",
          "Fotopakket cadeau",
        ],
      },
    ],
    howItWorksHeading: "Hoe werkt de ophaal?",
    howItWorks: [
      {
        step: "1. Boek uw cruise",
        desc: "Geef bij de boeking uw hotelnaam en wijk op. Ons team bevestigt het ophaalpunt binnen 24 uur schriftelijk.",
      },
      {
        step: "2. Ontvang bevestiging van ophaal",
        desc: "Ophaaltijd, voertuigtype en chauffeurcontact worden na boekingsbevestiging via WhatsApp of e-mail doorgegeven.",
      },
      {
        step: "3. Wees klaar in het hotel",
        desc: "Wacht op de afgesproken tijd in de lobby of bij de ingang van uw hotel. De chauffeur verwelkomt u bij naam en rijdt direct naar Kabataş.",
      },
      {
        step: "4. Geniet en keer terug",
        desc: "Na de cruise van ca. 3,5 uur brengt het voertuig u tussen 23:30 en 00:30 terug naar de buurt van uw hotel.",
      },
    ],
    sections: [
      {
        heading: "Wat verwacht u op de diner cruise?",
        body: "De MerrySails Bosporus diner cruise vertrekt om 20:30 uur vanaf de Kabataş-aanlegsteiger. Gedurende de ca. 3,5 uur durende tocht dineer u met uitzicht op de historische waterhuizen, bruggen en de verlichte skyline van Istanbul aan beide oevers van de Bosporus. De Turkse avondshow, live muziek en optionele DJ maken de avond onvergetelijk.",
      },
      {
        heading: "Hoe kom ik zonder ophaal naar de aanlegsteiger?",
        body: "Zonder ophaal kunt u Kabataş bereiken via de metro (halte T1 Kabataş, ca. 3 minuten van Taksim) of de tram vanuit het historisch schiereiland. In het avondspitsverkeer en voor bezoekers die Istanbul voor het eerst zien, biedt hotelophaal echter veel meer comfort en gemoedsrust.",
      },
      {
        heading: "Meer dan 50.000 tevreden gasten",
        body: "MerrySails opereert sinds 2001 onder Merry Tourism met TURSAB A-categorie certificering. We hebben meer dan 50.000 gasten aan boord verwelkomd en verbeteren onze servicekwaliteit elk jaar. Onze toewijding aan gasttevredenheid begint bij de ophaal aan de hoteldeur.",
      },
      {
        heading: "Veilige en comfortabele transfer",
        body: "Alle transfervoertuigen worden regelmatig onderhouden, zijn voorzien van airconditioning en worden bestuurd door professionele chauffeurs die Engels en Turks spreken. Onze chauffeurs kennen alle wijken van Istanbul uitstekend. Elke ophaal is van begin tot eind op uw comfort gericht.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Vanuit welke wijken wordt er opgehaald?",
        a: "Ophaal vindt plaats vanuit Sultanahmet, Sirkeci, Eminönü, Karaköy, Galata, Beyoğlu, Taksim, Beşiktaş, Şişli en Kadıköy. Na opgave van uw hotelAdres bevestigt het team het exacte punt.",
      },
      {
        q: "Is ophaal inbegrepen in alle pakketten?",
        a: "Ja, alle vier pakketten — Standaard (€55), Premium (€75), VIP (€95) en Exclusive (€119) — bevatten ophaal zonder bijbetaling.",
      },
      {
        q: "Wat gebeurt er als ik te laat ben?",
        a: "De chauffeur belt u 15 minuten voor de geplande ophaaltijd. Bij korte vertraging wordt gecoördineerd, maar de boot vertrekt op een vaste tijd en kan niet op individuele gasten wachten.",
      },
      {
        q: "Is er ophaal van de Aziatische kant?",
        a: "Voor Kadıköy is gecoördineerde ophaal mogelijk, maar dit vereist een vroegere ophaaltijd. Voor andere wijken aan de Aziatische kant raden we aan direct naar Kabataş te komen.",
      },
      {
        q: "Is ook het terugbrengen inbegrepen?",
        a: "Ja. Na de cruise brengt het voertuig u tussen 23:30 en 00:30 uur terug naar de buurt van uw hotel.",
      },
      {
        q: "Hoe reserveer ik een groepsvoertuig?",
        a: "Groepen van meer dan 8 personen krijgen automatisch een minibus of groter voertuig. Geef gewoon de groepsgrootte op bij de boeking.",
      },
      {
        q: "Zijn er documenten nodig voor de ophaal?",
        a: "Nee. Toon de chauffeur gewoon uw boekingsbevestiging (e-mail of WhatsApp-screenshot). Geen extra documenten nodig.",
      },
      {
        q: "Wat als de cruise wordt geannuleerd wegens slecht weer?",
        a: "Bij weersgebonden of operationele annulering wordt het volledige bedrag terugbetaald. Details over het annuleringsbeleid worden bij boeking meegedeeld.",
      },
    ],
    internalLinkLabel: "Naar de hoofdpagina: Istanbul Dinner Cruise →",
    ctaHeading: "Boek nu uw Bosporus diner cruise met hotelophaal",
    ctaSubtitle:
      "Reserveer uw pakket vanaf €55 inclusief ophaal of schrijf ons via WhatsApp met uw hoteladres.",
    ctaBookLabel: "Nu boeken",
    ctaWhatsappLabel: "WhatsApp schrijven",
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

  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/dinner-cruise-with-hotel-pickup-istanbul");

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
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.heroTitle,
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

function KeyFactIcon({ icon }: { icon: string }) {
  if (icon === "clock") return <Clock className="w-5 h-5 text-[var(--brand-primary)]" />;
  if (icon === "map") return <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />;
  if (icon === "star") return <Star className="w-5 h-5 text-[var(--brand-primary)]" />;
  return <Users className="w-5 h-5 text-[var(--brand-primary)]" />;
}

export default async function LocaleDinnerCruiseHotelPickupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = CONTENT[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    name: t.heroTitle,
    description: t.metaDescription,
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    serviceType: "Bosphorus Dinner Cruise with Hotel Pickup",
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
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
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
        name: t.breadcrumbHome,
        item: `${SITE_URL}/${locale}`,
      },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">

          {/* Breadcrumb */}
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

          {/* Hero */}
          <header className="mb-12">
            <p className="inline-flex rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-4">
              {t.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg font-semibold text-[var(--brand-primary)] mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-base text-[var(--text-muted)] max-w-3xl leading-relaxed mb-6">
              {t.heroTagline}
            </p>
            <p className="text-sm font-medium text-[var(--heading)] mb-6">
              {t.trustBadge}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
              >
                {t.ctaBookLabel} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                {t.ctaWhatsappLabel}
              </a>
            </div>
          </header>

          {/* Key Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {t.keyFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-[var(--line)] bg-white p-5 flex flex-col items-center text-center gap-2"
              >
                <KeyFactIcon icon={fact.icon} />
                <p className="text-xs text-[var(--text-muted)] font-medium">{fact.label}</p>
                <p className="text-lg font-bold text-[var(--heading)]">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* Why Transfer */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.whyHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.whySections.map((item) => (
                <div
                  key={item.heading}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2 text-base">
                    {item.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pickup Zones */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.pickupZonesHeading}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--surface-alt)] border-b border-[var(--line)]">
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Bölge / District</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Landmark</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Alım / Pickup</th>
                  </tr>
                </thead>
                <tbody>
                  {t.pickupZones.map((zone) => (
                    <tr key={zone.district} className="border-b border-[var(--line)] last:border-b-0">
                      <td className="p-3 font-medium text-[var(--heading)]">{zone.district}</td>
                      <td className="p-3 text-[var(--text-muted)]">{zone.landmark}</td>
                      <td className="p-3 font-semibold text-[var(--brand-primary)]">{zone.pickupTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Packages */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.packagesHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-xl border p-5 flex flex-col ${
                    pkg.highlight
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 ring-1 ring-[var(--brand-primary)]"
                      : "border-[var(--line)] bg-[var(--surface-alt)]"
                  }`}
                >
                  {pkg.highlight && (
                    <span className="mb-2 self-start rounded-full bg-[var(--brand-primary)] px-2 py-0.5 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                  <p className="font-bold text-[var(--heading)] text-lg">{pkg.name}</p>
                  <p className="text-2xl font-bold text-[var(--brand-primary)] mb-1">{pkg.price}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{t.perPerson}</p>
                  <ul className="space-y-2 flex-1">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-0.5 text-[var(--brand-primary)] font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.howItWorksHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5"
                >
                  <p className="text-sm font-bold text-[var(--brand-primary)] mb-2">{item.step}</p>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Content Sections */}
          <section className="mb-12 space-y-6">
            {t.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-[var(--heading)] mb-3">{section.heading}</h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{section.body}</p>
              </div>
            ))}
          </section>

          {/* Internal Link */}
          <div className="mb-12 rounded-xl border border-[var(--line)] bg-white p-5">
            <Link
              href="/istanbul-dinner-cruise"
              className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:underline"
            >
              {t.internalLinkLabel}
            </Link>
          </div>

          {/* FAQ */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{t.faqHeading}</h2>
            <div className="space-y-3">
              {t.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-180 shrink-0">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl bg-[var(--brand-primary)] p-8 text-white text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.ctaHeading}</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-white/90"
              >
                {t.ctaBookLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-primary)]"
              >
                {t.ctaWhatsappLabel}
              </a>
            </div>
          </section>

          {/* Phone + View in English */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="text-[var(--brand-primary)] font-semibold hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/dinner-cruise-with-hotel-pickup-istanbul"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {t.viewInEnglish}
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
