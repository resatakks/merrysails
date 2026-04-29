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
type PickupPoint = { name: string; detail: string; time: string };
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
  sultanahmetHeading: string;
  sultanahmetDesc: string;
  sultanahmetPoints: PickupPoint[];
  taksimHeading: string;
  taksimDesc: string;
  taksimPoints: PickupPoint[];
  combinedRouteHeading: string;
  combinedRouteDesc: string;
  combinedSteps: { time: string; location: string; note: string }[];
  whyPopularHeading: string;
  whyPopularItems: Section[];
  sections: Section[];
  faqHeading: string;
  faqs: Faq[];
  otherZonesLabel: string;
  mainPageLabel: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaBookLabel: string;
  ctaWhatsappLabel: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "Sultanahmet Taksim Akşam Yemeği Turu Transfer — €55'dan | MerrySails",
    metaDescription:
      "Sultanahmet ve Taksim'den Boğaz akşam yemeği turu için transfer: Hipodrom, Ayasofya, İstiklal Caddesi ve büyük oteller yakınından alım. Combine rota: Sultanahmet 18:30 → Taksim 19:00 → iskele 19:20.",
    canonicalPath: "/tr/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCruise: "Boğaz Turu",
    breadcrumbCurrent: "Sultanahmet ve Taksim'den Transfer",
    eyebrow: "MerrySails İstanbul • 2001'den Beri",
    heroTitle: "Sultanahmet ve Taksim'den Akşam Yemeği Turu Transferi",
    heroSubtitle:
      "İstanbul'un en yoğun turistik bölgelerinden combine transfer — €55'dan başlayan paketlerde dahil",
    heroTagline:
      "Sultanahmet'teki tarihi oteller veya Taksim'deki büyük konaklama tesislerinden Boğaz akşam yemeği turunuza kolayca katılın. Combine transfer rotamızla Sultanahmet'ten kalkan araç önce Taksim'e uğrar, ardından tüm grubu birlikte iskeleye getirir.",
    trustBadge: "TURSAB A Grubu Lisanslı • 50.000+ Misafir • 2001'den Beri",
    keyFacts: [
      { icon: "map", label: "Sultanahmet Alım", value: "18:30" },
      { icon: "clock", label: "Taksim Alım", value: "19:00" },
      { icon: "star", label: "Değerlendirme", value: "4.9 / 5" },
      { icon: "users", label: "İskeleye Varış", value: "19:20" },
    ],
    sultanahmetHeading: "Sultanahmet'ten Akşam Yemeği Turu Transferi",
    sultanahmetDesc:
      "Sultanahmet, İstanbul'un en yoğun turist bölgesidir. Hipodrom, Ayasofya ve Sultanahmet Camii etrafındaki oteller ile pansiyonlar yüksek yoğunluklu turistik alanların merkezindedir. Bu bölgeden transfer sağlanması, hem misafirlerimizin günü rahat geçirmesine hem de akşam tura vaktinde katılmasına imkân tanır.",
    sultanahmetPoints: [
      {
        name: "Hipodrom / Sultanahmet Meydanı",
        detail: "Ayasofya ve Sultanahmet Camii'ne yakın oteller — standart alım noktası",
        time: "18:30",
      },
      {
        name: "Küçükayasofya / Cankurtaran",
        detail: "Tarihi yarımadanın güney kıyısındaki oteller için koordineli alım",
        time: "18:32",
      },
      {
        name: "Sirkeci / Eminönü",
        detail: "Sirkeci İstasyonu ve Mısır Çarşısı yakınındaki konaklamalar",
        time: "18:40",
      },
      {
        name: "Karaköy / Galata",
        detail: "Galata Kulesi ve Karaköy rıhtımı çevresindeki oteller",
        time: "18:45",
      },
    ],
    taksimHeading: "Taksim Bölgesinden Akşam Yemeği Turu Transferi",
    taksimDesc:
      "Taksim ve Beyoğlu, İstanbul'un modern turistik merkezi olup çok sayıda büyük otel, butik pansiyon ve kiralık daire barındırır. İstiklal Caddesi boyunca ve çevresindeki konuklar, combine transfer hattımıza kolayca dahil olabilir. Taksim'den yapılan alım, Sultanahmet alımından sonra gerçekleşir ve araç doğrudan iskeleye hareket eder.",
    taksimPoints: [
      {
        name: "Taksim Meydanı / Gezi Parkı",
        detail: "Büyük uluslararası oteller ve meydana yakın konaklamalar",
        time: "19:00",
      },
      {
        name: "İstiklal Caddesi",
        detail: "Caddede veya ara sokaklardaki butik oteller — yakın buluşma noktasıyla",
        time: "19:03",
      },
      {
        name: "Beyoğlu / Asmalımescit",
        detail: "Tunel ve Asmalımescit civarındaki boutique konaklamalar",
        time: "19:05",
      },
      {
        name: "Cihangir / Kabataş Üstü",
        detail: "Kabataş'a en yakın Beyoğlu bölgesi — kısa transfer",
        time: "19:10",
      },
    ],
    combinedRouteHeading: "Combine Transfer Rotası",
    combinedRouteDesc:
      "Sultanahmet ve Taksim'deki misafirler tek bir araçla, belirlenen sırayla alınır ve birlikte iskeleye getirilir. Bu yöntem hem zaman hem de koordinasyon açısından en verimli çözümdür.",
    combinedSteps: [
      { time: "18:30", location: "Sultanahmet alımı başlar", note: "Sultanahmet, Sirkeci, Karaköy sırası" },
      { time: "19:00", location: "Taksim / Beyoğlu alımı", note: "İstiklal, Cihangir, Beyoğlu bölgesi" },
      { time: "19:20", location: "Kabataş İskelesi varış", note: "Tüm grup tekneye biner" },
      { time: "20:30", location: "Tur başlangıcı", note: "Boğaz'a açılış" },
    ],
    whyPopularHeading: "Bu İki Bölge Neden Bu Kadar Popüler?",
    whyPopularItems: [
      {
        heading: "Turist Yoğunluğu Açısından Birincil Bölgeler",
        body: "İstanbul'a gelen turistlerin büyük çoğunluğu Sultanahmet veya Taksim-Beyoğlu bölgelerinde konaklar. Bu iki merkez, şehrin en çok ziyaret edilen noktalarını barındırır ve oteller açısından en yüksek kapasiteye sahiptir.",
      },
      {
        heading: "Otel Konsantrasyonu En Yüksek Alanlar",
        body: "Her iki bölge de farklı bütçe seçeneklerine hitap eden yüzlerce otele ev sahipliği yapar. Sultanahmet'te tarihi konaklama seçenekleri, Taksim'de ise uluslararası zincir oteller ve butik tesisler öne çıkar.",
      },
      {
        heading: "Kısıtlı Sokak Erişimi — Buluşma Noktası Çözümü",
        body: "Bazı tarihi Sultanahmet sokaklarında araç durması kısıtlıdır. Bu durumlarda otele 50–100 metre yakın bir buluşma noktası belirlenerek transfer kesintisiz sürdürülür. Misafirler bu bilgiyi rezervasyon onayıyla birlikte alır.",
      },
    ],
    sections: [
      {
        heading: "Sultanahmet'ten Kabataş'a Ulaşım",
        body: "Sultanahmet'ten Kabataş'a tramvay (T1 hattı) ile 3 durak, yaklaşık 8–10 dakika sürer. Ancak akşam saatlerinde tramvay kalabalık olabilir, büyük valiz veya grupla kullanmak zorlu olabilir. Transfer hizmetimiz bu sorunu tamamen ortadan kaldırır ve kapıdan kapıya rahatlık sağlar.",
      },
      {
        heading: "Taksim'den Kabataş'a Ulaşım",
        body: "Taksim'den Kabataş'a metro veya teleferik ile 3–5 dakika sürer. Görünürde kolay olsa da akşam yoğunluğunda treni kaçırmak, yolları bulmak veya iskeleyi tanımak zaman kaybına yol açabilir. Combine transferimizle bu adımlar tek bir düzenli hizmete dönüşür.",
      },
      {
        heading: "TURSAB A Grubu Güvencesi",
        body: "MerrySails, 2001 yılından bu yana Merry Tourism bünyesinde TURSAB A Grubu lisansıyla faaliyet göstermektedir. 50.000'i aşkın misafiri ağırladık. Her turda misafir güvenliği, zamanında hizmet ve net iletişim önceliğimizdir.",
      },
      {
        heading: "Büyük Gruplar İçin Özel Koordinasyon",
        body: "10 veya daha fazla kişilik gruplar için ayrı minibüs ve özel koordinatör atanır. Sultanahmet ile Taksim'deki alt gruplar, aynı anda veya sıralı biçimde alınarak grubun tamamı birlikte iskeleye ulaşır. Bu hizmet rezervasyon aşamasında talep edilmelidir.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Sultanahmet'ten akşam yemeği turu için transfer alabilir miyim?",
        a: "Evet. Sultanahmet, Hipodrom ve Ayasofya çevresindeki oteller için akşam 18:30'da transfer planlanmaktadır. Alım noktası, otel adresine göre belirlenir ve rezervasyon onayıyla bildirilir.",
      },
      {
        q: "Taksim'deki otelimden de alınır mıyım?",
        a: "Evet. Taksim Meydanı, İstiklal Caddesi ve Beyoğlu'ndaki oteller için combine transfer hattında saat 19:00 alım planlanmaktadır. Otel adresinizi belirttiğinizde tam alım noktası teyit edilir.",
      },
      {
        q: "İki bölgeden misafirler aynı araçla mı gelir?",
        a: "Evet. Combine transfer rotasında araç önce Sultanahmet bölgesinden alım yapar, ardından Taksim/Beyoğlu'ndan devam eder ve 19:20'de Kabataş İskelesi'ne ulaşır.",
      },
      {
        q: "Bazı Sultanahmet sokaklarında araç durması mümkün mü?",
        a: "Bazı dar ve tarihi sokaklarda araç durması kısıtlanmıştır. Bu durumda yakın bir buluşma noktası belirlenir; misafirler bu bilgiyi rezervasyon onayıyla alır.",
      },
      {
        q: "Transfer kaç kişi kapasiteli araçlarla yapılır?",
        a: "Standart transferlerde 7–8 kişilik araçlar kullanılır. Daha büyük gruplar için minibüs tahsis edilir. Grup büyüklüğünü rezervasyon sırasında belirtmeniz yeterlidir.",
      },
      {
        q: "Geri dönüş transferi de Sultanahmet ve Taksim'e mi?",
        a: "Evet. Tur bitiminde (23:30–00:30 arası) araç sizi Sultanahmet veya Taksim bölgesindeki otel çevrenize geri bırakır.",
      },
      {
        q: "Diğer bölgelerden de transfer var mı?",
        a: "Evet. Beşiktaş, Şişli, Karaköy, Galata ve Kadıköy dahil pek çok bölgeden transfer sağlanmaktadır. Tam bölge listesi için otel transferi dahil akşam yemeği turu sayfamıza bakınız.",
      },
      {
        q: "Transfer ücret karşılığında mı, paket içinde mi?",
        a: "Transfer, €55'dan başlayan tüm paketlere dahildir. Ayrıca ücret talep edilmez.",
      },
    ],
    otherZonesLabel: "Diğer Bölgelerden Transfer →",
    mainPageLabel: "Ana Akşam Yemeği Turu Sayfası →",
    ctaHeading: "Sultanahmet veya Taksim'den Turunuzu Hemen Rezerve Edin",
    ctaSubtitle:
      "Otel adresinizi belirtin, biz transfer planını hazırlayalım. €55'dan başlayan paketlerde transfer dahil.",
    ctaBookLabel: "Hemen Rezervasyon",
    ctaWhatsappLabel: "WhatsApp'tan Yazın",
    viewInEnglish: "View in English →",
  },

  de: {
    metaTitle:
      "Sultanahmet Taksim Dinner Cruise Abholung — Ab €55 | MerrySails",
    metaDescription:
      "Bosporus Dinner Kreuzfahrt Transfer von Sultanahmet und Taksim: Hippodrom, Hagia Sophia, İstiklal-Straße und große Hotels. Kombinierte Route: Sultanahmet 18:30 → Taksim 19:00 → Anleger 19:20.",
    canonicalPath: "/de/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Startseite",
    breadcrumbCruise: "Bosporus-Tour",
    breadcrumbCurrent: "Transfer ab Sultanahmet und Taksim",
    eyebrow: "MerrySails Istanbul • Seit 2001",
    heroTitle: "Dinner Cruise Transfer ab Sultanahmet und Taksim",
    heroSubtitle:
      "Kombinierter Transfer aus Istanbuls beliebtesten Touristenvierteln — in allen Paketen ab €55 inklusive",
    heroTagline:
      "Vom historischen Hotel in Sultanahmet oder vom Großhotel am Taksim-Platz zur Bosporus-Dinner-Cruise. Unser kombinierter Transfer holt Sie zuerst in Sultanahmet ab, fährt dann nach Taksim und bringt die ganze Gruppe gemeinsam zum Anleger.",
    trustBadge: "TURSAB A-Gruppe lizenziert • 50.000+ Gäste • Seit 2001",
    keyFacts: [
      { icon: "map", label: "Sultanahmet Abholung", value: "18:30" },
      { icon: "clock", label: "Taksim Abholung", value: "19:00" },
      { icon: "star", label: "Bewertung", value: "4,9 / 5" },
      { icon: "users", label: "Ankunft Anleger", value: "19:20" },
    ],
    sultanahmetHeading: "Transfer ab Sultanahmet",
    sultanahmetDesc:
      "Sultanahmet ist das historische Herz Istanbuls. Hotels rund um Hippodrom, Hagia Sophia und Blaue Moschee befinden sich im dichtesten Touristenviertel der Stadt. Unser Transfer aus dieser Zone ermöglicht einen stressfreien Start in Ihren Abend auf dem Bosporus.",
    sultanahmetPoints: [
      {
        name: "Hippodrom / Sultanahmet-Platz",
        detail: "Hotels nahe Hagia Sophia und Blauer Moschee — Standard-Abholpunkt",
        time: "18:30",
      },
      {
        name: "Küçükayasofya / Cankurtaran",
        detail: "Hotels an der Südküste der historischen Halbinsel — koordinierte Abholung",
        time: "18:32",
      },
      {
        name: "Sirkeci / Eminönü",
        detail: "Hotels nahe Bahnhof Sirkeci und Gewürzbasar",
        time: "18:40",
      },
      {
        name: "Karaköy / Galata",
        detail: "Hotels um den Galata-Turm und die Karaköy-Uferpromenade",
        time: "18:45",
      },
    ],
    taksimHeading: "Transfer ab Taksim",
    taksimDesc:
      "Taksim und Beyoğlu bilden das moderne touristische Zentrum Istanbuls. Entlang der İstiklal-Straße und rund um den Taksim-Platz konzentrieren sich zahlreiche internationale Hotels, Boutique-Pensionen und Ferienwohnungen. Unsere kombinierte Route holt Taksim-Gäste nach dem Sultanahmet-Stopp ab.",
    taksimPoints: [
      {
        name: "Taksim-Platz / Gezi-Park",
        detail: "Große internationale Hotels und Unterkünfte am Platz",
        time: "19:00",
      },
      {
        name: "İstiklal-Straße",
        detail: "Boutique-Hotels auf der Straße oder in Seitenstraßen — naher Treffpunkt",
        time: "19:03",
      },
      {
        name: "Beyoğlu / Asmalımescit",
        detail: "Boutique-Unterkünfte bei Tünel und Asmalımescit",
        time: "19:05",
      },
      {
        name: "Cihangir / Kabataş-Oberstadt",
        detail: "Dem Anleger nächstgelegener Beyoğlu-Bereich — kurzer Transfer",
        time: "19:10",
      },
    ],
    combinedRouteHeading: "Kombinierte Transferroute",
    combinedRouteDesc:
      "Gäste aus Sultanahmet und Taksim werden mit einem Fahrzeug in festgelegter Reihenfolge abgeholt und gemeinsam zum Anleger gebracht. Diese Methode ist die effizienteste Lösung für Zeit und Koordination.",
    combinedSteps: [
      { time: "18:30", location: "Sultanahmet-Abholung beginnt", note: "Sultanahmet, Sirkeci, Karaköy" },
      { time: "19:00", location: "Taksim / Beyoğlu-Abholung", note: "İstiklal, Cihangir, Beyoğlu" },
      { time: "19:20", location: "Ankunft Kabataş-Anleger", note: "Gruppe besteigt das Schiff" },
      { time: "20:30", location: "Tourstart", note: "Ausfahrt auf den Bosporus" },
    ],
    whyPopularHeading: "Warum sind diese zwei Viertel so beliebt?",
    whyPopularItems: [
      {
        heading: "Erstrangige Touristenzonen",
        body: "Die meisten Istanbul-Besucher übernachten entweder in Sultanahmet oder in Taksim-Beyoğlu. Diese beiden Zentren beherbergen die meist besuchten Sehenswürdigkeiten und haben die höchste Hotelkapazität der Stadt.",
      },
      {
        heading: "Höchste Hotelkonzentration",
        body: "Beide Viertel bieten Hunderte von Hotels für verschiedene Budgets — von historischen Boutique-Pensionen in Sultanahmet bis zu internationalen Kettenhotels am Taksim-Platz.",
      },
      {
        heading: "Enge Gassen — Treffpunkt-Lösung",
        body: "In einigen historischen Gassen Sultanahmets ist das Halten von Fahrzeugen eingeschränkt. In solchen Fällen wird ein Treffpunkt in 50–100 m Entfernung festgelegt. Gäste erhalten diese Information mit ihrer Buchungsbestätigung.",
      },
    ],
    sections: [
      {
        heading: "Von Sultanahmet nach Kabataş ohne Transfer",
        body: "Mit der Straßenbahn (Linie T1) sind es 3 Haltestellen und etwa 8–10 Minuten von Sultanahmet nach Kabataş. Abends kann die Bahn aber überfüllt sein — mit großem Gepäck oder in einer Gruppe ist das weniger angenehm. Unser Transfer macht diesen Schritt überflüssig.",
      },
      {
        heading: "Von Taksim nach Kabataş ohne Transfer",
        body: "Per Metro oder Seilbahn sind es 3–5 Minuten von Taksim nach Kabataş. Auch wenn es einfach klingt — im Abendtrubel, ohne genaue Ortskenntnisse, kann das Finden des richtigen Anlegers Zeit kosten. Unser Shuttle bringt Sie direkt dorthin.",
      },
      {
        heading: "TURSAB A-Gruppe Qualitätsgarantie",
        body: "MerrySails operiert seit 2001 unter Merry Tourism mit TURSAB-A-Gruppe-Lizenz. Über 50.000 Gäste haben unsere Tours gebucht. Pünktlichkeit, Sicherheit und klare Kommunikation sind unser Standard bei jedem Transfer.",
      },
      {
        heading: "Sonderkoordination für große Gruppen",
        body: "Für Gruppen ab 10 Personen wird ein separater Minibus und ein eigener Koordinator eingesetzt. Teilgruppen aus Sultanahmet und Taksim werden gleichzeitig oder hintereinander abgeholt und gemeinsam zum Anleger gebracht. Bitte bei der Buchung angeben.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Kann ich aus Sultanahmet zur Dinner Cruise abgeholt werden?",
        a: "Ja. Für Hotels rund um Hippodrom und Hagia Sophia ist die Abholung um 18:30 Uhr geplant. Der genaue Abholpunkt wird nach Hoteladresse festgelegt und mit der Buchungsbestätigung mitgeteilt.",
      },
      {
        q: "Gilt das auch für mein Hotel in Taksim?",
        a: "Ja. Für Hotels am Taksim-Platz, an der İstiklal-Straße und in Beyoğlu ist 19:00 Uhr als Abholzeit eingeplant. Nach Angabe Ihrer Hoteladresse wird der Abholpunkt bestätigt.",
      },
      {
        q: "Reisen Gäste aus beiden Vierteln im selben Fahrzeug?",
        a: "Ja. Die kombinierte Route holt zuerst in Sultanahmet ab, dann in Taksim/Beyoğlu, und trifft um 19:20 Uhr am Kabataş-Anleger ein.",
      },
      {
        q: "Ist in engen Sultanahmet-Gassen eine Türabholung möglich?",
        a: "In einigen schmalen historischen Gassen ist das Halten eingeschränkt. In diesen Fällen wird ein nahegelegener Treffpunkt festgelegt. Diese Information erhalten Sie mit der Buchungsbestätigung.",
      },
      {
        q: "Welche Fahrzeugkapazität hat der Transfer?",
        a: "Standardmäßig werden Fahrzeuge für 7–8 Personen eingesetzt. Für größere Gruppen wird ein Minibus bereitgestellt. Bitte Gruppengröße bei Buchung angeben.",
      },
      {
        q: "Bringt mich der Rücktransfer auch nach Sultanahmet oder Taksim?",
        a: "Ja. Nach der Tour (23:30–00:30 Uhr) werden Sie in Ihre Hotelgegend in Sultanahmet oder Taksim zurückgebracht.",
      },
      {
        q: "Gibt es auch Abholung aus anderen Stadtteilen?",
        a: "Ja. Transfers sind auch aus Beşiktaş, Şişli, Karaköy, Galata und Kadıköy möglich. Die vollständige Zonen-Liste finden Sie auf unserer Seite zur Dinner Cruise mit Hotelabholung.",
      },
      {
        q: "Ist der Transfer im Paketpreis enthalten?",
        a: "Ja, der Transfer ist in allen Paketen ab €55 enthalten — ohne Aufpreis.",
      },
    ],
    otherZonesLabel: "Transfer aus anderen Stadtteilen →",
    mainPageLabel: "Zur Hauptseite: Istanbul Dinner Cruise →",
    ctaHeading: "Jetzt ab Sultanahmet oder Taksim zur Dinner Cruise buchen",
    ctaSubtitle:
      "Nennen Sie uns Ihre Hoteladresse, wir planen Ihren Transfer. In allen Paketen ab €55 inklusive.",
    ctaBookLabel: "Jetzt buchen",
    ctaWhatsappLabel: "WhatsApp schreiben",
    viewInEnglish: "View in English →",
  },

  fr: {
    metaTitle:
      "Navette Croisière Dîner Sultanahmet Taksim — À partir de €55 | MerrySails",
    metaDescription:
      "Navette croisière dîner Bosphore depuis Sultanahmet et Taksim : Hippodrome, Sainte-Sophie, rue İstiklal et grands hôtels. Route combinée : Sultanahmet 18h30 → Taksim 19h00 → embarcadère 19h20.",
    canonicalPath: "/fr/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Accueil",
    breadcrumbCruise: "Croisière Bosphore",
    breadcrumbCurrent: "Navette depuis Sultanahmet et Taksim",
    eyebrow: "MerrySails Istanbul • Depuis 2001",
    heroTitle: "Navette Croisière Dîner depuis Sultanahmet et Taksim",
    heroSubtitle:
      "Transfert combiné depuis les quartiers touristiques les plus populaires d'Istanbul — inclus dans toutes les formules à partir de €55",
    heroTagline:
      "De votre hôtel historique à Sultanahmet ou de votre grand hôtel à Taksim à la croisière dîner sur le Bosphore. Notre navette combinée passe d'abord à Sultanahmet, puis à Taksim, et amène tout le groupe ensemble à l'embarcadère.",
    trustBadge: "Agréé TURSAB Groupe A • 50 000+ clients • Depuis 2001",
    keyFacts: [
      { icon: "map", label: "Prise en charge Sultanahmet", value: "18h30" },
      { icon: "clock", label: "Prise en charge Taksim", value: "19h00" },
      { icon: "star", label: "Évaluation", value: "4,9 / 5" },
      { icon: "users", label: "Arrivée embarcadère", value: "19h20" },
    ],
    sultanahmetHeading: "Prise en charge depuis Sultanahmet",
    sultanahmetDesc:
      "Sultanahmet est le cœur historique d'Istanbul. Les hôtels autour de l'Hippodrome, de Sainte-Sophie et de la Mosquée Bleue se trouvent dans la zone la plus touristique de la ville. Notre service de navette depuis cette zone vous permet de commencer votre soirée sans stress.",
    sultanahmetPoints: [
      {
        name: "Hippodrome / Place Sultanahmet",
        detail: "Hôtels proches de Sainte-Sophie et de la Mosquée Bleue — point de prise en charge standard",
        time: "18h30",
      },
      {
        name: "Küçükayasofya / Cankurtaran",
        detail: "Hôtels sur la côte sud de la péninsule historique — prise en charge coordonnée",
        time: "18h32",
      },
      {
        name: "Sirkeci / Eminönü",
        detail: "Hôtels près de la gare de Sirkeci et du bazar aux épices",
        time: "18h40",
      },
      {
        name: "Karaköy / Galata",
        detail: "Hôtels autour de la Tour de Galata et du quai de Karaköy",
        time: "18h45",
      },
    ],
    taksimHeading: "Prise en charge depuis Taksim",
    taksimDesc:
      "Taksim et Beyoğlu forment le centre touristique moderne d'Istanbul. Le long de la rue İstiklal et autour de la place Taksim se concentrent de nombreux grands hôtels, pensions de charme et appartements de vacances. Notre route combinée dessert Taksim après l'arrêt à Sultanahmet.",
    taksimPoints: [
      {
        name: "Place Taksim / Parc Gezi",
        detail: "Grands hôtels internationaux et hébergements près de la place",
        time: "19h00",
      },
      {
        name: "Rue İstiklal",
        detail: "Hôtels boutique sur la rue ou dans les ruelles — point de rencontre proche",
        time: "19h03",
      },
      {
        name: "Beyoğlu / Asmalımescit",
        detail: "Hébergements boutique près de Tünel et d'Asmalımescit",
        time: "19h05",
      },
      {
        name: "Cihangir / Dessus de Kabataş",
        detail: "Partie de Beyoğlu la plus proche de l'embarcadère — court transfert",
        time: "19h10",
      },
    ],
    combinedRouteHeading: "Itinéraire combiné de la navette",
    combinedRouteDesc:
      "Les clients de Sultanahmet et de Taksim sont récupérés avec un seul véhicule dans un ordre défini et amenés ensemble à l'embarcadère. C'est la solution la plus efficace en termes de temps et de coordination.",
    combinedSteps: [
      { time: "18h30", location: "Départ prise en charge Sultanahmet", note: "Sultanahmet, Sirkeci, Karaköy" },
      { time: "19h00", location: "Prise en charge Taksim / Beyoğlu", note: "İstiklal, Cihangir, Beyoğlu" },
      { time: "19h20", location: "Arrivée embarcadère Kabataş", note: "Tout le groupe monte à bord" },
      { time: "20h30", location: "Départ de la croisière", note: "Cap sur le Bosphore" },
    ],
    whyPopularHeading: "Pourquoi ces deux quartiers sont-ils si populaires ?",
    whyPopularItems: [
      {
        heading: "Zones touristiques de premier rang",
        body: "La grande majorité des visiteurs d'Istanbul séjourne à Sultanahmet ou à Taksim-Beyoğlu. Ces deux centres abritent les sites les plus visités et ont la plus forte concentration hôtelière de la ville.",
      },
      {
        heading: "Concentration hôtelière maximale",
        body: "Les deux quartiers accueillent des centaines d'hôtels pour tous les budgets — des hébergements historiques à Sultanahmet aux chaînes internationales et aux boutiques-hôtels à Taksim.",
      },
      {
        heading: "Rues étroites — solution point de rencontre",
        body: "Certaines ruelles historiques de Sultanahmet n'autorisent pas l'arrêt de véhicules. Dans ce cas, un point de rencontre à 50–100 m de l'hôtel est défini. Les clients reçoivent cette information avec leur confirmation de réservation.",
      },
    ],
    sections: [
      {
        heading: "De Sultanahmet à Kabataş sans navette",
        body: "En tramway (ligne T1), 3 arrêts séparent Sultanahmet de Kabataş, soit environ 8 à 10 minutes. Mais le soir, le tramway peut être bondé — avec des bagages ou en groupe, le trajet est moins confortable. Notre navette supprime cette étape.",
      },
      {
        heading: "De Taksim à Kabataş sans navette",
        body: "Par métro ou téléphérique, le trajet de Taksim à Kabataş dure 3 à 5 minutes. Malgré la proximité, trouver le bon quai dans l'agitation du soir peut prendre du temps. Notre service vous conduit directement à l'embarcadère.",
      },
      {
        heading: "Garantie qualité TURSAB Groupe A",
        body: "MerrySails opère depuis 2001 sous Merry Tourism, avec licence TURSAB Groupe A. Plus de 50 000 clients ont embarqué à bord de nos croisières. Ponctualité, sécurité et communication claire sont nos standards à chaque transfert.",
      },
      {
        heading: "Coordination spéciale pour les grands groupes",
        body: "Pour les groupes de 10 personnes et plus, un minibus séparé et un coordinateur dédié sont affectés. Les sous-groupes de Sultanahmet et Taksim sont récupérés simultanément ou successivement, puis réunis à l'embarcadère. À préciser lors de la réservation.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Puis-je être pris en charge depuis Sultanahmet ?",
        a: "Oui. Pour les hôtels autour de l'Hippodrome et de Sainte-Sophie, la prise en charge est prévue à 18h30. Le point exact est déterminé selon l'adresse de l'hôtel et communiqué avec la confirmation.",
      },
      {
        q: "Et depuis mon hôtel à Taksim ?",
        a: "Oui. Pour les hôtels à la place Taksim, rue İstiklal et à Beyoğlu, l'heure de prise en charge est 19h00. Après indication de votre adresse, le point de prise en charge est confirmé.",
      },
      {
        q: "Les clients des deux quartiers voyagent-ils dans le même véhicule ?",
        a: "Oui. La route combinée passe d'abord à Sultanahmet, puis à Taksim/Beyoğlu, et arrive à l'embarcadère de Kabataş à 19h20.",
      },
      {
        q: "Une prise en charge à la porte est-elle possible dans les ruelles de Sultanahmet ?",
        a: "Dans certaines ruelles étroites, l'arrêt de véhicules est limité. Dans ce cas, un point de rencontre proche est fixé. Vous recevez cette information avec votre confirmation de réservation.",
      },
      {
        q: "Quelle est la capacité des véhicules de transfert ?",
        a: "Les transferts standard utilisent des véhicules de 7 à 8 places. Pour les groupes plus importants, un minibus est mis à disposition. Indiquez la taille du groupe lors de la réservation.",
      },
      {
        q: "Le retour se fait-il aussi vers Sultanahmet ou Taksim ?",
        a: "Oui. Après la croisière (23h30–00h30), vous êtes ramené dans le quartier de votre hôtel à Sultanahmet ou à Taksim.",
      },
      {
        q: "Y a-t-il des navettes depuis d'autres quartiers ?",
        a: "Oui. Des transferts sont disponibles depuis Beşiktaş, Şişli, Karaköy, Galata et Kadıköy. Consultez notre page croisière dîner avec prise en charge à l'hôtel pour la liste complète des zones.",
      },
      {
        q: "Le transfert est-il compris dans le prix du forfait ?",
        a: "Oui, le transfert est inclus dans tous les forfaits à partir de €55, sans supplément.",
      },
    ],
    otherZonesLabel: "Navette depuis d'autres quartiers →",
    mainPageLabel: "Page principale : Croisière Dîner Istanbul →",
    ctaHeading: "Réservez votre croisière dîner depuis Sultanahmet ou Taksim",
    ctaSubtitle:
      "Indiquez-nous votre adresse d'hôtel, nous organisons le transfert. Inclus dans toutes les formules à partir de €55.",
    ctaBookLabel: "Réserver maintenant",
    ctaWhatsappLabel: "Écrire sur WhatsApp",
    viewInEnglish: "View in English →",
  },

  nl: {
    metaTitle:
      "Sultanahmet Taksim Diner Cruise Shuttle — Vanaf €55 | MerrySails",
    metaDescription:
      "Bosporus diner cruise shuttle vanuit Sultanahmet en Taksim: Hippodroom, Hagia Sophia, İstiklalstraat en grote hotels. Gecombineerde route: Sultanahmet 18:30 → Taksim 19:00 → aanlegsteiger 19:20.",
    canonicalPath: "/nl/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Home",
    breadcrumbCruise: "Bosporus Cruise",
    breadcrumbCurrent: "Shuttle vanuit Sultanahmet en Taksim",
    eyebrow: "MerrySails Istanbul • Sinds 2001",
    heroTitle: "Diner Cruise Shuttle vanuit Sultanahmet en Taksim",
    heroSubtitle:
      "Gecombineerde ophaal vanuit Istanbuls populairste toeristenwijken — inbegrepen in alle pakketten vanaf €55",
    heroTagline:
      "Van uw historisch hotel in Sultanahmet of van uw groot hotel bij Taksim naar de Bosporus diner cruise. Onze gecombineerde shuttle haalt u eerst op in Sultanahmet, rijdt dan naar Taksim, en brengt de hele groep samen naar de aanlegsteiger.",
    trustBadge: "TURSAB A-categorie gecertificeerd • 50.000+ gasten • Sinds 2001",
    keyFacts: [
      { icon: "map", label: "Ophaal Sultanahmet", value: "18:30" },
      { icon: "clock", label: "Ophaal Taksim", value: "19:00" },
      { icon: "star", label: "Beoordeling", value: "4,9 / 5" },
      { icon: "users", label: "Aankomst steiger", value: "19:20" },
    ],
    sultanahmetHeading: "Ophaal vanuit Sultanahmet",
    sultanahmetDesc:
      "Sultanahmet is het historische hart van Istanbul. Hotels rondom het Hippodroom, Hagia Sophia en de Blauwe Moskee bevinden zich in het drukste toeristengebied van de stad. Onze shuttleservice vanuit deze wijk zorgt voor een stressloze start van uw Bosporusavond.",
    sultanahmetPoints: [
      {
        name: "Hippodroom / Sultanahmetplein",
        detail: "Hotels dicht bij Hagia Sophia en Blauwe Moskee — standaard ophaalpunt",
        time: "18:30",
      },
      {
        name: "Küçükayasofya / Cankurtaran",
        detail: "Hotels aan de zuidkust van het historisch schiereiland — gecoördineerde ophaal",
        time: "18:32",
      },
      {
        name: "Sirkeci / Eminönü",
        detail: "Hotels nabij station Sirkeci en de Kruidenmarkt",
        time: "18:40",
      },
      {
        name: "Karaköy / Galata",
        detail: "Hotels rondom de Galatatoren en de Karaköy-kade",
        time: "18:45",
      },
    ],
    taksimHeading: "Ophaal vanuit Taksim",
    taksimDesc:
      "Taksim en Beyoğlu vormen het moderne toeristische centrum van Istanbul. Langs de İstiklalstraat en rondom het Taksimplein zijn talrijke grote hotels, boutique-pensions en vakantieappartementen te vinden. Onze gecombineerde route pikt Taksim-gasten op na de stop in Sultanahmet.",
    taksimPoints: [
      {
        name: "Taksimplein / Gezipark",
        detail: "Grote internationale hotels en accommodaties bij het plein",
        time: "19:00",
      },
      {
        name: "İstiklalstraat",
        detail: "Boutique-hotels op de straat of in zijstraatjes — nabijgelegen ontmoetingspunt",
        time: "19:03",
      },
      {
        name: "Beyoğlu / Asmalımescit",
        detail: "Boutique-accommodaties bij Tünel en Asmalımescit",
        time: "19:05",
      },
      {
        name: "Cihangir / Boven Kabataş",
        detail: "Dichtstbijzijnde Beyoğlu-deel bij de aanlegsteiger — korte transfer",
        time: "19:10",
      },
    ],
    combinedRouteHeading: "Gecombineerde shuttle-route",
    combinedRouteDesc:
      "Gasten uit Sultanahmet en Taksim worden met één voertuig in een vaste volgorde opgehaald en samen naar de aanlegsteiger gebracht. Dit is de meest efficiënte oplossing voor tijd en coördinatie.",
    combinedSteps: [
      { time: "18:30", location: "Start ophaal Sultanahmet", note: "Sultanahmet, Sirkeci, Karaköy" },
      { time: "19:00", location: "Ophaal Taksim / Beyoğlu", note: "İstiklal, Cihangir, Beyoğlu" },
      { time: "19:20", location: "Aankomst Kabataş-steiger", note: "Hele groep stapt aan boord" },
      { time: "20:30", location: "Cruise vertrekt", note: "Koers gezet op de Bosporus" },
    ],
    whyPopularHeading: "Waarom zijn deze twee wijken zo populair?",
    whyPopularItems: [
      {
        heading: "Primaire toeristische zones",
        body: "De meeste Istanbul-bezoekers verblijven in Sultanahmet of in Taksim-Beyoğlu. Deze twee centra herbergen de meest bezochte bezienswaardigheden en hebben de hoogste hotelcapaciteit van de stad.",
      },
      {
        heading: "Hoogste hotelconcentratie",
        body: "Beide wijken bieden honderden hotels voor elk budget — van historische boutique-pensions in Sultanahmet tot internationale ketens en boutique-hotels bij Taksim.",
      },
      {
        heading: "Smalle straten — ontmoetingspunt als oplossing",
        body: "In sommige historische steegjes van Sultanahmet is stoppen voor voertuigen beperkt. In dat geval wordt een ontmoetingspunt op 50–100 meter van het hotel vastgesteld. Gasten ontvangen deze informatie bij hun boekingsbevestiging.",
      },
    ],
    sections: [
      {
        heading: "Van Sultanahmet naar Kabataş zonder shuttle",
        body: "Met de tram (lijn T1) zijn het 3 haltes en ongeveer 8 tot 10 minuten van Sultanahmet naar Kabataş. 's Avonds kan de tram druk zijn — met bagage of als groep is dat minder prettig. Onze shuttle neemt deze stap volledig weg.",
      },
      {
        heading: "Van Taksim naar Kabataş zonder shuttle",
        body: "Per metro of kabelbaan duurt het 3 tot 5 minuten van Taksim naar Kabataş. Hoewel het eenvoudig lijkt, kan het in de avondspits tijdrovend zijn om de juiste aanlegsteiger te vinden. Onze shuttle brengt u er rechtstreeks naartoe.",
      },
      {
        heading: "TURSAB A-categorie kwaliteitsgarantie",
        body: "MerrySails opereert sinds 2001 onder Merry Tourism met TURSAB A-categorie certificering. Meer dan 50.000 gasten hebben onze cruises geboekt. Stiptheid, veiligheid en heldere communicatie zijn onze standaard bij elke ophaal.",
      },
      {
        heading: "Speciale coördinatie voor grote groepen",
        body: "Voor groepen van 10 personen of meer wordt een aparte minibus en een eigen coördinator ingezet. Subgroepen uit Sultanahmet en Taksim worden gelijktijdig of na elkaar opgehaald en samen naar de aanlegsteiger gebracht. Graag opgeven bij boeking.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Kan ik opgehaald worden vanuit Sultanahmet?",
        a: "Ja. Voor hotels rondom het Hippodroom en Hagia Sophia is ophaal gepland om 18:30. Het exacte ophaalpunt wordt bepaald op basis van het hoteladres en meegedeeld bij de boekingsbevestiging.",
      },
      {
        q: "Geldt dit ook voor mijn hotel in Taksim?",
        a: "Ja. Voor hotels bij het Taksimplein, de İstiklalstraat en in Beyoğlu is 19:00 als ophaaltijd gepland. Na opgave van uw hoteladres wordt het ophaalpunt bevestigd.",
      },
      {
        q: "Reizen gasten uit beide wijken in hetzelfde voertuig?",
        a: "Ja. De gecombineerde route haalt eerst op in Sultanahmet, daarna in Taksim/Beyoğlu, en arriveert om 19:20 bij de Kabataş-aanlegsteiger.",
      },
      {
        q: "Is deurophaal mogelijk in de smalle steegjes van Sultanahmet?",
        a: "In sommige historische steegjes is stoppen beperkt. In dat geval wordt een nabijgelegen ontmoetingspunt vastgesteld. U ontvangt deze informatie bij uw boekingsbevestiging.",
      },
      {
        q: "Wat is de capaciteit van de transfervoertuigen?",
        a: "Standaard worden voertuigen voor 7 tot 8 personen ingezet. Voor grotere groepen wordt een minibus ingezet. Geef de groepsgrootte op bij de boeking.",
      },
      {
        q: "Brengt de retourshuttle mij ook terug naar Sultanahmet of Taksim?",
        a: "Ja. Na de cruise (23:30–00:30) wordt u teruggebracht naar de buurt van uw hotel in Sultanahmet of Taksim.",
      },
      {
        q: "Zijn er shuttles vanuit andere wijken?",
        a: "Ja. Ophaal is ook mogelijk vanuit Beşiktaş, Şişli, Karaköy, Galata en Kadıköy. Zie onze pagina diner cruise met hotelophaal voor de volledige zoneslijst.",
      },
      {
        q: "Is de shuttle inbegrepen in de pakketprijs?",
        a: "Ja, de shuttle is inbegrepen in alle pakketten vanaf €55 — zonder bijbetaling.",
      },
    ],
    otherZonesLabel: "Shuttle vanuit andere wijken →",
    mainPageLabel: "Hoofdpagina: Istanbul Dinner Cruise →",
    ctaHeading: "Boek nu uw diner cruise vanuit Sultanahmet of Taksim",
    ctaSubtitle:
      "Geef uw hoteladres op, wij regelen de shuttle. Inbegrepen in alle pakketten vanaf €55.",
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
  const languages = buildHreflang("/dinner-cruise-pickup-sultanahmet-taksim");

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

export default async function LocaleDinnerCruisePickupSultanahmetTaksimPage({
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
    areaServed: [
      { "@type": "Place", name: "Sultanahmet, Istanbul" },
      { "@type": "Place", name: "Taksim, Istanbul" },
    ],
    serviceType: "Bosphorus Dinner Cruise Pickup — Sultanahmet & Taksim",
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

          {/* Combined Route Timeline */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">
              {t.combinedRouteHeading}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">{t.combinedRouteDesc}</p>
            <div className="grid gap-3 md:grid-cols-4">
              {t.combinedSteps.map((step, idx) => (
                <div
                  key={step.time}
                  className="relative rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-[var(--brand-primary)] font-bold text-lg mt-1">{step.time}</p>
                  <p className="text-[var(--heading)] font-semibold text-sm mt-1">{step.location}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-1">{step.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sultanahmet Section */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">
              {t.sultanahmetHeading}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              {t.sultanahmetDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--surface-alt)] border-b border-[var(--line)]">
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Alım Noktası</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Detay</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Saat</th>
                  </tr>
                </thead>
                <tbody>
                  {t.sultanahmetPoints.map((point) => (
                    <tr key={point.name} className="border-b border-[var(--line)] last:border-b-0">
                      <td className="p-3 font-medium text-[var(--heading)]">{point.name}</td>
                      <td className="p-3 text-[var(--text-muted)]">{point.detail}</td>
                      <td className="p-3 font-semibold text-[var(--brand-primary)]">{point.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Taksim Section */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">
              {t.taksimHeading}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
              {t.taksimDesc}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--surface-alt)] border-b border-[var(--line)]">
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Alım Noktası</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Detay</th>
                    <th className="p-3 text-left font-semibold text-[var(--heading)]">Saat</th>
                  </tr>
                </thead>
                <tbody>
                  {t.taksimPoints.map((point) => (
                    <tr key={point.name} className="border-b border-[var(--line)] last:border-b-0">
                      <td className="p-3 font-medium text-[var(--heading)]">{point.name}</td>
                      <td className="p-3 text-[var(--text-muted)]">{point.detail}</td>
                      <td className="p-3 font-semibold text-[var(--brand-primary)]">{point.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Popular */}
          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.whyPopularHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.whyPopularItems.map((item) => (
                <div
                  key={item.heading}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-5"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.heading}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
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

          {/* Internal Links */}
          <div className="mb-12 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--line)] bg-white p-5">
              <Link
                href={`/${locale}/dinner-cruise-with-hotel-pickup-istanbul`}
                className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:underline"
              >
                {t.otherZonesLabel}
              </Link>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Beşiktaş, Şişli, Kadıköy ve diğer bölgeler
              </p>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-white p-5">
              <Link
                href="/istanbul-dinner-cruise"
                className="inline-flex items-center gap-2 text-[var(--brand-primary)] font-semibold hover:underline"
              >
                {t.mainPageLabel}
              </Link>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Paketler, fiyatlar ve tüm detaylar
              </p>
            </div>
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
              href="/dinner-cruise-pickup-sultanahmet-taksim"
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
