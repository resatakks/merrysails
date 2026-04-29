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
type ShowItem = { time: string; event: string };

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
  showHeading: string;
  showIntro: string;
  showItems: ShowItem[];
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
    metaTitle: "Türk Gecesi Akşam Yemeği Turu İstanbul — €55'dan İtibaren | MerrySails",
    metaDescription:
      "İstanbul Türk gecesi akşam yemeği turu: Boğaz'da canlı halk oyunları, davul zurna, zeybek dansı ve Türk mutfağı büfesi. €55'dan başlayan paketler, TÜRSAB A Grubu lisanslı. Hemen rezervasyon.",
    canonicalPath: "/tr/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbDinner: "Akşam Yemeği Turu",
    breadcrumbCurrent: "Türk Gecesi Turu",
    eyebrow: "MerrySails İstanbul — Türk Gecesi Deneyimi",
    heroTitle: "Türk Gecesi Akşam Yemeği Turu İstanbul",
    heroSubtitle: "€55'dan başlayan fiyatlar · Zeybek, davul zurna ve Boğaz manzarası",
    heroDescription:
      "Türk gecesi akşam yemeği turu, Boğaz sularında eşsiz bir kültürel deneyim sunar: zeybek dansları, davul zurna performansı, kına gecesi figürleri ve Türk mutfağının en güzel örneklerini bir araya getirir. 2001'den bu yana TÜRSAB A Grubu lisansıyla faaliyet gösteren MerrySails, 50.000'den fazla uluslararası misafiri bu benzersiz gece deneyimiyle buluşturmuştur. Kabataş'tan kalkan teknemiz, 3,5 saat boyunca İstanbul siluetini ve Boğaz'ı bir sergi gibi sunar.",
    trustSignal: "TÜRSAB A Grubu lisanslı Merry Tourism — 2001'den bu yana 50.000+ misafir",
    keyFacts: [
      { icon: "⏱", label: "Süre", value: "~3,5 saat" },
      { icon: "📍", label: "Kalkış", value: "Kabataş İskelesi, 20:30" },
      { icon: "💶", label: "Fiyat", value: "€55'dan itibaren" },
      { icon: "🎭", label: "Show", value: "Halk oyunları + davul zurna" },
    ],
    sections: [
      {
        heading: "Türk Gecesi Nedir? Kültürel Arka Plan",
        body: [
          "Türk gecesi, yüzyıllık Anadolu folklorunun sahne performansına dönüştürülmüş biçimidir. Zeybek dansları, Ege bölgesinin güçlü erkek figürlerini yansıtır. Halay, doğu ve güneydoğu kökenli toplu ritim danslarını temsil eder. Kına gecesi figürleri ise geleneksel Türk düğün törenlerinden ilham alır.",
          "Davul zurna ikilisi, Türk folklorunun en eski çalgı birleşimidir. Derin davul sesi ve zurnanın keskin melodisi, izleyicileri sıradan bir gece aktivitesinden ziyade gerçek bir kültürel yolculuğa taşır. MerrySails'in profesyonel sanatçıları, her performansta otantik kostümler ve koreografi ile sahne alır.",
          "Bu kültürel zenginliği Boğaz manzarası eşliğinde deneyimlemek, İstanbul ziyaretinin en akılda kalıcı anlarından birini oluşturur. Dil bariyeri yoktur — dans, müzik ve renkli kostümler evrensel bir dil konuşur.",
        ],
      },
      {
        heading: "Gösteri Programı: Ne Zaman, Ne Olur?",
        body: [
          "Tekne Kabataş'tan 20:30'da hareket eder. İlk 30-45 dakika karşılama içeceği ve açık büfe servisiyle geçer; misafirler yerleşir ve İstanbul siluetinin gün batımı renklerini izler.",
          "Gösteriler yaklaşık 21:00-21:15 civarında başlar. İlk bölümde zeybek ve halay dansları sahne alır, ardından davul zurna performansı ve kına gecesi figürleri izlenir. Orta bölümde interaktif dans sesi güçlenir ve misafirler sahneye davet edilir.",
          "21:30-22:00 arasında tekne Boğaz'ın en güzel bölümünden — köprüler altından — geçer. Bu süre hem Boğaz seyri hem de fotoğraf için mükemmeldir. 22:30-23:00 civarında son müzik seti ve dans performansları tamamlanır; 23:30 gibi Kabataş'a dönülür.",
        ],
      },
      {
        heading: "Türk Mutfağı Büfesi: Menüde Neler Var?",
        body: [
          "Türk gecesi akşam yemeği turu, geleneksel Türk mutfağının en iyi temsilcilerini büfe biçiminde sunar. Mezelerde zeytinyağlı yaprak sarma, haydari, humus, patlıcan salatası ve tarama yer alır. Bunlar soğuk ve sıcak çeşitler olarak düzenlenir.",
          "Ana yemek bölümünde ızgara tavuk şiş, kuzu köfte ve pirzola seçenekleri sunulur. Pilav, fırın sebzeler ve taze salata eşliğinde servis edilir. Silver pakette standart menü, Gold pakette Premium menü tercih edilir; Premium menüde deniz ürünleri ve özel izmarit çeşitleri de yer alır.",
          "Tatlı bölümünde Türk baklavası, sütlaç, künefe ve lokum yer alır. İçecek seçenekleri pakete göre değişir: alkolsüz meşrubat, yerel alkollü içecekler (bira, şarap, rakı) veya sınırsız alkol. Vejeteryan misafirler için menü önceden düzenlenebilir.",
        ],
      },
      {
        heading: "Fotoğraf ve Kültürel Deneyim Fırsatları",
        body: [
          "Türk gecesi turu, fotoğraf tutkunları için eşsiz kareler sunar. Folklorik kostümler (kırmızı zeybek kıyafetleri, işlemeli yöresel giysiler), gece ışığında parlayan Boğaz köprüleri ve Dolmabahçe Sarayı'nın aydınlatması arka plan olarak mükemmeldir.",
          "Tekne güvertesinde altın saat fotoğrafları çekmek için ideal zaman kalkıştan hemen sonra — Kabataş ve Beşiktaş arasından geçerken günbatımı renkleri ve siluetleri yakalanabilir. Göstericilerle fotoğraf çektirme fırsatı da program içinde yer alır.",
          "Uluslararası misafirler için Türk gecesi, folkloru yaşayarak öğrenmek anlamına gelir. Dans figürlerini öğrenmek, davul ritminde hareket etmek ve zurnayı canlı dinlemek, bir müze ya da rehberli tur gezisinden çok daha etkileyici bir kültürel deneyim yaratır.",
        ],
      },
      {
        heading: "Paket Seçenekleri ve Fiyatlar",
        body: [
          "Türk gecesi akşam yemeği turunda dört paket sunulmaktadır. Tüm paketlerde Türk gecesi eğlencesi ve temel menü dahildir; fark koltuk tipi, içecek kapsamı ve menü seviyesindedir.",
          "Silver Soft Drinks (€55): Standart koltuk, sınırsız alkolsüz içecek, akşam yemeği menüsü ve tam Türk gecesi programı dahil. Popüler başlangıç seçeneği.",
          "Silver Alcoholic (€75): Standart koltuk, yerel alkollü içecekler (bira, şarap, rakı), akşam yemeği menüsü ve Türk gecesi programı dahil.",
          "Gold Soft Drinks (€95): VIP sahne yakını koltuk, sınırsız alkolsüz içecek, Premium menü, Türk gecesi + DJ seti.",
          "Gold Unlimited Alcohol (€119): VIP sahne yakını koltuk, sınırsız alkol dahil, Premium menü, Türk gecesi + DJ seti. En kapsamlı paket.",
        ],
      },
      {
        heading: "Neden MerrySails ile Türk Gecesi?",
        body: [
          "MerrySails, TÜRSAB A Grubu lisansıyla 2001'den bu yana faaliyet gösteren Merry Tourism çatısı altında çalışır. Bu, hem yasal güvenceli bir tur hem de deneyimli bir denizcilik altyapısı anlamına gelir. Tekne güvenliği Türk denizcilik mevzuatına uygun şekilde düzenlenir.",
          "Sanatçı kadromuz düzenli olarak yenilenen koreografi ve kostüm kütüphanesiyle çalışır. Her gece aynı mekanik performans yerine, misafirlerin enerjisine göre şekillenen canlı bir program sunulur. Türkiye'nin farklı bölgelerinden halk dansı ustalarını sahnede görmek mümkündür.",
          "Sadece Boğaz turu yapmak isteyenler için Gün Batımı Turu sayfamıza bakın. Türk gecesi olmaksızın sade bir Boğaz deneyimi arayanlar için idealdir. Özel grup organizasyonları için lütfen WhatsApp hattımızdan iletişime geçin.",
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
        items: ["Standart koltuk", "Sınırsız alkolsüz içecek", "Akşam yemeği menüsü", "Türk gecesi tam programı"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standart koltuk", "Yerel alkollü içecekler", "Akşam yemeği menüsü", "Türk gecesi tam programı"],
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
    showHeading: "Gece Programı",
    showIntro: "Türk gecesi turu yaklaşık akışı:",
    showItems: [
      { time: "20:30", event: "Kabataş'tan kalkış, karşılama içeceği" },
      { time: "21:00", event: "Zeybek ve halay gösterileri başlar" },
      { time: "21:15", event: "Davul zurna performansı ve kına figürleri" },
      { time: "21:30", event: "Boğaz köprülerinden geçiş — fotoğraf fırsatı" },
      { time: "22:00", event: "Misafir dansı ve interaktif bölüm" },
      { time: "22:30", event: "Son müzik seti ve DJ" },
      { time: "23:30", event: "Kabataş'a dönüş" },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Türk gecesi akşam yemeği turu ne içerir?",
        a: "Zeybek, halay ve kına gecesi dansları, davul zurna performansı, Türk mutfağı büfesi veya menüsü, karşılama içeceği ve Boğaz turu tüm paketlere dahildir. Gold paketlerde DJ seti ve VIP koltuk eklenir.",
      },
      {
        q: "Gösteriyi anlamak için Türkçe bilmek gerekiyor mu?",
        a: "Hayır. Halk dansları, müzik ve kostümler evrensel bir dil konuşur. Dil bariyeri olmadan keyifle izlenebilir ve katılınabilir.",
      },
      {
        q: "Hangi paket Türk gecesi gösterisini içerir?",
        a: "Tüm paketler — Silver ve Gold — Türk gecesi tam programını içerir. Paketler arasındaki fark yemek menüsü seviyesi, içecek kapsamı ve koltuk tipidir.",
      },
      {
        q: "Gösteriler ne zaman başlar?",
        a: "Tekne 20:30'da hareket eder. Gösteriler yaklaşık 30-45 dakika sonra, yani 21:00-21:15 civarında başlar. İlk bölüm yemek ve karşılama içeceğiyle geçer.",
      },
      {
        q: "Vejetaryen misafirler için seçenek var mı?",
        a: "Evet, vejeteryan menü mevcuttur. Önceden bildirilmesi halinde glutensiz düzenlemeler de yapılabilir.",
      },
      {
        q: "Sanatçılarla fotoğraf çektirmek mümkün mü?",
        a: "Evet, program içinde sanatçılarla fotoğraf çektirme fırsatı yer alır. Geleneksel Türk kostümleri ile fotoğraf çektirmek de mümkündür.",
      },
      {
        q: "İptal koşulları nelerdir?",
        a: "Kalkıştan 48 saat öncesine kadar iptalde tam para iadesi yapılır. Olumsuz hava koşullarında tur ertelenir veya iade yapılır.",
      },
      {
        q: "Çocuklar katılabilir mi?",
        a: "Evet, aile dostu bir turdur. 0-5 yaş ücretsiz, 6-12 yaş indirimlidir. Türk gecesi eğlencesi çocuklar için de ilgi çekici bir deneyim sunar.",
      },
    ],
    relatedHeading: "Diğer Tur Seçenekleri",
    ctaHeading: "Türk Gecesi Akşam Yemeği Turu Rezervasyonu",
    ctaSubtitle: "Tarih ve kişi sayısını belirtin, anında yanıt alalım.",
    bookLabel: "Rezervasyon Yap",
    whatsappLabel: "WhatsApp ile Yazın",
    mainPageNote:
      "Türk gecesi olmayan sade Boğaz turu için",
  },

  de: {
    metaTitle: "Türkischer Abend Dinner Kreuzfahrt Istanbul — Ab €55 | MerrySails",
    metaDescription:
      "Türkischer Abend Dinner Kreuzfahrt Istanbul: Zeybek-Tänze, Davul-Zurna, türkisches Buffet auf dem Bosporus. Pakete ab €55, TÜRSAB-lizenziert seit 2001, 50.000+ Gäste. Jetzt buchen.",
    canonicalPath: "/de/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbDinner: "Dinner Kreuzfahrt",
    breadcrumbCurrent: "Türkische Nacht",
    eyebrow: "MerrySails Istanbul — Türkische Nacht Erlebnis",
    heroTitle: "Türkischer Abend Dinner Kreuzfahrt Istanbul",
    heroSubtitle: "Ab €55 pro Person · Zeybek, Davul-Zurna und Bosporus-Panorama",
    heroDescription:
      "Die Türkische Abend Dinner Kreuzfahrt bietet ein einzigartiges Kulturerlebnis auf dem Bosporus: Zeybek-Tänze, Davul-Zurna-Auftritte, Henna-Nacht-Figuren und die besten Gerichte der türkischen Küche in einem. Seit 2001 – TÜRSAB Gruppe A lizenziert – hat MerrySails über 50.000 internationale Gäste mit diesem unvergesslichen Abenderlebnis begeistert. Unser Schiff legt um 20:30 Uhr in Kabataş ab und präsentiert 3,5 Stunden lang die Silhouette Istanbuls und den Bosporus.",
    trustSignal: "TÜRSAB Gruppe A lizenziert — Merry Tourism Istanbul seit 2001, 50.000+ Gäste",
    keyFacts: [
      { icon: "⏱", label: "Dauer", value: "ca. 3,5 Stunden" },
      { icon: "📍", label: "Abfahrt", value: "Kabataş-Pier, 20:30 Uhr" },
      { icon: "💶", label: "Preis", value: "Ab €55 pro Person" },
      { icon: "🎭", label: "Show", value: "Folkloretänze + Davul-Zurna" },
    ],
    sections: [
      {
        heading: "Was ist eine Türkische Nacht? Kultureller Hintergrund",
        body: [
          "Die Türkische Nacht ist die Bühnenumsetzung jahrhundertealter anatolischer Folklore. Der Zeybek-Tanz spiegelt die kraftvollen männlichen Figuren aus der Ägäisregion wider. Der Halay repräsentiert kollektive Rhythmustänze aus dem Osten und Südosten. Die Henna-Nacht-Figuren lehnen sich an traditionelle türkische Hochzeitszeremonien an.",
          "Das Davul-Zurna-Duo ist die älteste Instrumentenverbindung der türkischen Folklore. Der tiefe Klang der Davul-Trommel und die schroffe Melodie der Zurna entführen die Zuschauer auf eine echte Kulturreise – weit mehr als eine gewöhnliche Abendshow. Die professionellen Künstler von MerrySails treten bei jeder Vorstellung in authentischen Kostümen und Choreografien auf.",
          "Diesen kulturellen Reichtum mit Blick auf den Bosporus zu erleben, gehört zu den unvergesslichsten Momenten eines Istanbul-Besuchs. Es gibt keine Sprachbarriere – Tanz, Musik und bunte Kostüme sprechen eine universelle Sprache.",
        ],
      },
      {
        heading: "Show-Programm: Was passiert wann?",
        body: [
          "Das Schiff legt um 20:30 Uhr in Kabataş ab. Die ersten 30–45 Minuten werden mit Willkommensgetränk und Buffet-Service verbracht; die Gäste setzen sich und beobachten die Sonnenuntergangsfarben über der Istanbuler Silhouette.",
          "Die Vorstellungen beginnen gegen 21:00–21:15 Uhr. Im ersten Teil treten Zeybek- und Halay-Tänzer auf, gefolgt von Davul-Zurna-Darbietungen und Henna-Nacht-Figuren. Im mittleren Teil wird die Tanzmusik lebhafter und die Gäste werden auf die Bühne eingeladen.",
          "Zwischen 21:30 und 22:00 Uhr passiert das Schiff den schönsten Abschnitt des Bosporus – unter den Brücken hindurch. Diese Zeit ist ideal für Fotos und Panoramablicke. Gegen 22:30–23:00 Uhr sind die letzten Musik-Sets und Tanzvorführungen abgeschlossen; die Rückkehr nach Kabataş erfolgt gegen 23:30 Uhr.",
        ],
      },
      {
        heading: "Türkisches Buffet: Was steht auf dem Menü?",
        body: [
          "Die Türkische Abend Dinner Kreuzfahrt serviert die besten Vertreter der türkischen Küche in Buffet-Form. Zu den Vorspeisen gehören Yaprak-Sarma mit Olivenöl, Haydari, Hummus, Auberginensalat und Tarama – kalt und warm angerichtet.",
          "Im Hauptgang werden gegrillte Hähnchenpieße, Lammköfte und Lamm-Koteletts serviert, begleitet von Reis, gebackenem Gemüse und frischem Salat. Das Standard-Menü ist im Silver-Paket enthalten; das Premium-Menü im Gold-Paket umfasst zusätzlich Meeresfrüchte und Spezialitäten.",
          "Beim Dessert gibt es türkisches Baklava, Sütlaç (Reispudding), Künefe und Lokum. Die Getränke variieren je nach Paket: alkoholfreie Getränke, lokale alkoholische Getränke (Bier, Wein, Raki) oder Alkohol unbegrenzt. Für vegetarische Gäste kann das Menü auf Anfrage angepasst werden.",
        ],
      },
      {
        heading: "Foto- und Kulturerlebnis-Möglichkeiten",
        body: [
          "Die Türkische Abend Tour bietet Fotoliebhabern einzigartige Aufnahmen. Die folkloristischen Kostüme (rote Zeybek-Gewänder, bestickte Volkstrachten), die in der Nacht leuchtenden Bosporus-Brücken und die Beleuchtung des Dolmabahçe-Palastes bilden perfekte Hintergründe.",
          "Auf dem Schiffsdeck sind Fotos zur goldenen Stunde direkt nach dem Ablegen besonders lohnend – zwischen Kabataş und Besiktas lassen sich Sonnenuntergangsfarben und Silhouetten festhalten. Eine Fotomöglichkeit mit den Tänzern in Kostümen ist ebenfalls im Programm vorgesehen.",
          "Für internationale Gäste bedeutet die Türkische Nacht, Folklore durch Erleben zu begreifen. Tanzfiguren nachzuahmen, im Davul-Rhythmus mitzuwirken und die Zurna live zu hören, schafft ein weit eindrucksvolleres Kulturerlebnis als ein Museumsbesuch oder eine geführte Tour.",
        ],
      },
      {
        heading: "Pakete und Preise",
        body: [
          "Für die Türkische Abend Dinner Kreuzfahrt stehen vier Pakete zur Wahl. In allen Paketen ist die türkische Abendshow und ein Grundmenü enthalten; der Unterschied liegt in Sitzplatzkategorie, Getränkeumfang und Menüstufe.",
          "Silver Soft Drinks (€55): Standard-Sitzplatz, alkoholfreie Getränke unbegrenzt, Abendmenü und volles Türkische Nacht Programm inklusive. Die populärste Einstiegsoption.",
          "Silver Alcoholic (€75): Standard-Sitzplatz, lokale alkoholische Getränke (Bier, Wein, Raki), Abendmenü und Türkische Nacht Programm.",
          "Gold Soft Drinks (€95): VIP-Platz nahe der Bühne, alkoholfreie Getränke unbegrenzt, Premium-Menü, Türkische Nacht + DJ-Set.",
          "Gold Unlimited Alcohol (€119): VIP-Platz nahe der Bühne, Alkohol unbegrenzt inklusive, Premium-Menü, Türkische Nacht + DJ-Set. Das umfangreichste Paket.",
        ],
      },
      {
        heading: "Warum mit MerrySails die Türkische Nacht erleben?",
        body: [
          "MerrySails operiert unter Merry Tourism, seit 2001 mit TÜRSAB-Gruppe-A-Lizenz in Istanbul tätig. Das bedeutet sowohl eine rechtlich gesicherte Tour als auch eine erfahrene Schifffahrtsinfrastruktur. Die Bordsicherheit entspricht den türkischen Schifffahrtsvorschriften.",
          "Unser Künstlerteam arbeitet mit regelmäßig erneuerten Choreografien und Kostümen. Statt einer mechanischen Wiederholung bieten wir jede Nacht ein lebendiges Programm, das sich an der Energie der Gäste orientiert. Volkstanzmeister aus verschiedenen Regionen der Türkei treten auf.",
          "Wer nur eine Bosporus-Kreuzfahrt ohne türkische Abendshow möchte, findet auf unserer Sonnenuntergang-Tour-Seite das passende Angebot. Für Gruppenorganisationen steht unser WhatsApp-Kanal bereit.",
        ],
      },
    ],
    packagesHeading: "Pakete",
    perPerson: "pro Person",
    packages: [
      {
        name: "Silver Soft Drinks",
        price: "€55",
        highlight: false,
        items: ["Standard-Sitzplatz", "Alkoholfreie Getränke unbegrenzt", "Abendmenü", "Türkische Nacht Vollprogramm"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standard-Sitzplatz", "Lokale alkoholische Getränke", "Abendmenü", "Türkische Nacht Vollprogramm"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["VIP nahe der Bühne", "Alkoholfreie Getränke unbegrenzt", "Premium-Menü", "Türkische Nacht + DJ"],
      },
      {
        name: "Gold Unlimited Alcohol",
        price: "€119",
        highlight: false,
        items: ["VIP nahe der Bühne", "Alkohol unbegrenzt inklusive", "Premium-Menü", "Türkische Nacht + DJ"],
      },
    ],
    showHeading: "Abendprogramm",
    showIntro: "Ungefährer Ablauf der Türkischen Abend Dinner Kreuzfahrt:",
    showItems: [
      { time: "20:30", event: "Abfahrt in Kabataş, Willkommensgetränk" },
      { time: "21:00", event: "Zeybek- und Halay-Tänze beginnen" },
      { time: "21:15", event: "Davul-Zurna-Auftritt und Henna-Nacht-Figuren" },
      { time: "21:30", event: "Passage unter den Bosporus-Brücken — Fotomoment" },
      { time: "22:00", event: "Gästetanz und interaktiver Abschnitt" },
      { time: "22:30", event: "Letztes Musik-Set und DJ" },
      { time: "23:30", event: "Rückkehr nach Kabataş" },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Was ist in der Türkischen Abend Dinner Kreuzfahrt enthalten?",
        a: "Zeybek-, Halay- und Henna-Nacht-Tänze, Davul-Zurna-Auftritt, türkisches Buffet oder Menü, Willkommensgetränk und Bosporus-Tour sind in allen Paketen enthalten. Gold-Pakete beinhalten zusätzlich DJ-Set und VIP-Platz.",
      },
      {
        q: "Brauche ich Türkischkenntnisse, um die Show zu genießen?",
        a: "Nein. Volkstänze, Musik und Kostüme sprechen eine universelle Sprache. Keine Sprachkenntnisse erforderlich — mitmachen und genießen ohne Barrieren.",
      },
      {
        q: "Welches Paket enthält die türkische Abendshow?",
        a: "Alle Pakete — Silver und Gold — enthalten das vollständige Türkische Nacht Programm. Der Unterschied liegt in Menüstufe, Getränkeumfang und Sitzplatzkategorie.",
      },
      {
        q: "Wann beginnt das Showprogramm?",
        a: "Das Schiff legt um 20:30 Uhr ab. Die Shows beginnen etwa 30–45 Minuten später, also gegen 21:00–21:15 Uhr. Die erste Phase ist dem Essen und Willkommensgetränk gewidmet.",
      },
      {
        q: "Gibt es vegetarische oder glutenfreie Optionen?",
        a: "Ja, vegetarische Gerichte sind vorhanden. Glutenfreie Anpassungen können auf Anfrage bei der Buchung vorbereitet werden.",
      },
      {
        q: "Kann ich mit den Tänzern Fotos machen?",
        a: "Ja, das Programm enthält Fotomöglichkeiten mit den Künstlern in traditionellen Kostümen.",
      },
      {
        q: "Was ist die Stornierungspolitik?",
        a: "Kostenlose Stornierung bis 48 Stunden vor Abfahrt. Bei schlechtem Wetter wird die Tour verschoben oder erstattet.",
      },
      {
        q: "Können Kinder teilnehmen?",
        a: "Ja, die Tour ist familienfreundlich. Kinder 0–5 Jahre kostenlos, 6–12 Jahre ermäßigt. Die Türkische Nacht-Show ist auch für Kinder ein attraktives Erlebnis.",
      },
    ],
    relatedHeading: "Weitere Optionen",
    ctaHeading: "Türkische Abend Dinner Kreuzfahrt buchen",
    ctaSubtitle: "Datum und Personenzahl angeben — schnelle Antwort garantiert.",
    bookLabel: "Jetzt buchen",
    whatsappLabel: "Per WhatsApp schreiben",
    mainPageNote:
      "Für eine einfache Bosporus-Tour ohne Abendshow besuchen Sie die",
  },

  fr: {
    metaTitle: "Soirée Turque Croisière Dîner Istanbul — À partir de €55 | MerrySails",
    metaDescription:
      "Soirée turque croisière dîner à Istanbul : danses Zeybek, Davul-Zurna, buffet turc sur le Bosphore. Formules dès €55, agréé TÜRSAB depuis 2001, plus de 50 000 clients. Réservez maintenant.",
    canonicalPath: "/fr/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbDinner: "Croisière Dîner",
    breadcrumbCurrent: "Soirée Turque",
    eyebrow: "MerrySails Istanbul — Expérience Soirée Turque",
    heroTitle: "Soirée Turque Croisière Dîner Istanbul",
    heroSubtitle: "À partir de €55 par personne · Zeybek, Davul-Zurna et panorama du Bosphore",
    heroDescription:
      "La croisière dîner soirée turque offre une expérience culturelle unique sur le Bosphore : danses Zeybek, performances de Davul-Zurna, figures de nuit de henné et le meilleur de la cuisine turque réunis en une seule soirée. Depuis 2001 – agréé TÜRSAB Groupe A – MerrySails a enchanté plus de 50 000 visiteurs internationaux avec cette expérience nocturne inoubliable. Notre bateau quitte Kabataş à 20h30 et révèle pendant 3h30 la silhouette d'Istanbul et le Bosphore.",
    trustSignal: "Agréé TÜRSAB Groupe A — Merry Tourism Istanbul depuis 2001, plus de 50 000 clients",
    keyFacts: [
      { icon: "⏱", label: "Durée", value: "environ 3h30" },
      { icon: "📍", label: "Départ", value: "Pier de Kabataş, 20h30" },
      { icon: "💶", label: "Prix", value: "À partir de €55 par personne" },
      { icon: "🎭", label: "Spectacle", value: "Danses folkloriques + Davul-Zurna" },
    ],
    sections: [
      {
        heading: "Qu'est-ce qu'une soirée turque ? Contexte culturel",
        body: [
          "La soirée turque est la mise en scène du folklore anatolien séculaire. La danse Zeybek reflète les figures masculines puissantes de la région égéenne. Le Halay représente les danses rythmiques collectives originaires de l'Est et du Sud-Est. Les figures de nuit de henné s'inspirent des cérémonies de mariage traditionnelles turques.",
          "Le duo Davul-Zurna est la plus ancienne combinaison instrumentale du folklore turc. Le son profond du tambour Davul et la mélodie vive de la Zurna transportent les spectateurs dans un véritable voyage culturel — bien plus qu'un simple spectacle du soir. Les artistes professionnels de MerrySails se produisent à chaque représentation dans des costumes authentiques et des chorégraphies soignées.",
          "Vivre cette richesse culturelle avec le panorama du Bosphore en toile de fond constitue l'un des moments les plus mémorables d'une visite à Istanbul. Il n'y a pas de barrière linguistique — la danse, la musique et les costumes colorés parlent un langage universel.",
        ],
      },
      {
        heading: "Programme du Spectacle : Que se passe-t-il et quand ?",
        body: [
          "Le bateau quitte Kabataş à 20h30. Les 30 à 45 premières minutes sont consacrées à la boisson de bienvenue et au service du buffet ; les invités s'installent et observent les couleurs du coucher de soleil sur la silhouette d'Istanbul.",
          "Les spectacles débutent vers 21h00–21h15. La première partie présente les danses Zeybek et Halay, suivies des performances Davul-Zurna et des figures de nuit de henné. Dans la partie centrale, la musique de danse s'intensifie et les invités sont invités à rejoindre la scène.",
          "Entre 21h30 et 22h00, le bateau passe par la plus belle section du Bosphore — sous les ponts. Cette période est idéale pour les photos et les panoramas. Vers 22h30–23h00, les derniers sets musicaux et les dernières danses sont terminés ; le retour à Kabataş s'effectue vers 23h30.",
        ],
      },
      {
        heading: "Buffet de Cuisine Turque : Qu'y a-t-il au menu ?",
        body: [
          "La croisière dîner soirée turque présente les meilleurs représentants de la cuisine turque sous forme de buffet. Parmi les entrées : Yaprak Sarma à l'huile d'olive, Haydari, houmous, salade d'aubergines et Tarama — servis froids et chauds.",
          "Au plat principal, des brochettes de poulet grillées, des köfte d'agneau et des côtelettes d'agneau sont proposés, accompagnés de riz, légumes rôtis et salade fraîche. Le menu standard est inclus dans le forfait Silver ; le menu Premium du forfait Gold comprend également des fruits de mer et des spécialités.",
          "En dessert : baklava turc, Sütlaç (riz au lait), Künefe et Lokum. Les boissons varient selon le forfait : sans alcool, boissons alcoolisées locales (bière, vin, raki) ou alcool à volonté. Pour les invités végétariens, le menu peut être adapté sur demande.",
        ],
      },
      {
        heading: "Opportunités Photos et Expériences Culturelles",
        body: [
          "La soirée turque offre aux amateurs de photographie des clichés uniques. Les costumes folkloriques (tenues Zeybek rouges, habits régionaux brodés), les ponts du Bosphore illuminés la nuit et l'éclairage du Palais de Dolmabahçe constituent des arrière-plans parfaits.",
          "Sur le pont du bateau, les photos à l'heure dorée sont idéales juste après le départ — entre Kabataş et Besiktas, les couleurs du coucher de soleil et les silhouettes se capturent à merveille. Une session photo avec les artistes en costume est également prévue au programme.",
          "Pour les visiteurs internationaux, la soirée turque signifie apprendre le folklore en le vivant. Reproduire des figures de danse, bouger au rythme de la Davul et écouter la Zurna en direct crée une expérience culturelle bien plus marquante qu'une visite de musée ou une visite guidée.",
        ],
      },
      {
        heading: "Formules et Tarifs",
        body: [
          "La croisière dîner soirée turque propose quatre formules. Le spectacle de nuit turque et un menu de base sont inclus dans toutes ; la différence porte sur la catégorie de place, l'offre de boissons et le niveau du menu.",
          "Silver Soft Drinks (€55) : Place standard, boissons sans alcool à volonté, menu dîner et programme complet de nuit turque inclus. L'option d'entrée de gamme la plus populaire.",
          "Silver Alcoholic (€75) : Place standard, boissons alcoolisées locales (bière, vin, raki), menu dîner et programme de nuit turque.",
          "Gold Soft Drinks (€95) : Place VIP proche de la scène, boissons sans alcool à volonté, menu Premium, nuit turque + set DJ.",
          "Gold Alcool Illimité (€119) : Place VIP proche de la scène, alcool à volonté inclus, menu Premium, nuit turque + set DJ. La formule la plus complète.",
        ],
      },
      {
        heading: "Pourquoi choisir MerrySails pour la Soirée Turque ?",
        body: [
          "MerrySails opère sous Merry Tourism, agréée TÜRSAB Groupe A depuis 2001 à Istanbul. Cela garantit à la fois une croisière juridiquement sécurisée et une infrastructure maritime expérimentée. La sécurité à bord est conforme à la réglementation maritime turque.",
          "Notre équipe d'artistes travaille avec des chorégraphies et des costumes régulièrement renouvelés. Plutôt qu'une répétition mécanique, nous offrons chaque nuit un programme vivant qui s'adapte à l'énergie des invités. Des maîtres de danse folklorique de différentes régions de Turquie se produisent sur scène.",
          "Pour ceux qui souhaitent une simple croisière sur le Bosphore sans spectacle de nuit turque, notre page de Croisière au Coucher de Soleil est idéale. Pour les groupes, notre WhatsApp est disponible.",
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
        items: ["Place standard", "Boissons sans alcool à volonté", "Menu dîner", "Programme complet nuit turque"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Place standard", "Boissons alcoolisées locales", "Menu dîner", "Programme complet nuit turque"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["Place VIP proche scène", "Boissons sans alcool à volonté", "Menu Premium", "Nuit turque + DJ"],
      },
      {
        name: "Gold Alcool Illimité",
        price: "€119",
        highlight: false,
        items: ["Place VIP proche scène", "Alcool à volonté inclus", "Menu Premium", "Nuit turque + DJ"],
      },
    ],
    showHeading: "Programme de la Soirée",
    showIntro: "Déroulement approximatif de la croisière dîner soirée turque :",
    showItems: [
      { time: "20h30", event: "Départ de Kabataş, boisson de bienvenue" },
      { time: "21h00", event: "Danses Zeybek et Halay débutent" },
      { time: "21h15", event: "Performance Davul-Zurna et figures de henné" },
      { time: "21h30", event: "Passage sous les ponts du Bosphore — moment photo" },
      { time: "22h00", event: "Danse des invités et section interactive" },
      { time: "22h30", event: "Dernier set musical et DJ" },
      { time: "23h30", event: "Retour à Kabataş" },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Que comprend la croisière dîner soirée turque ?",
        a: "Danses Zeybek, Halay et Henna-Nacht, performance Davul-Zurna, buffet ou menu turc, boisson de bienvenue et croisière sur le Bosphore sont inclus dans toutes les formules. Les formules Gold ajoutent un set DJ et des places VIP.",
      },
      {
        q: "Faut-il parler turc pour apprécier le spectacle ?",
        a: "Non. Les danses folkloriques, la musique et les costumes parlent un langage universel. Aucune connaissance linguistique requise — profitez et participez sans barrières.",
      },
      {
        q: "Quelle formule inclut le spectacle de nuit turque ?",
        a: "Toutes les formules — Silver et Gold — incluent le programme complet de nuit turque. La différence porte sur le niveau du menu, les boissons et la catégorie de place.",
      },
      {
        q: "Quand commence le programme de spectacle ?",
        a: "Le bateau quitte Kabataş à 20h30. Les spectacles commencent environ 30 à 45 minutes plus tard, vers 21h00–21h15. La première phase est dédiée au dîner et à la boisson de bienvenue.",
      },
      {
        q: "Des options végétariennes ou sans gluten sont-elles disponibles ?",
        a: "Oui, des plats végétariens sont proposés. Les adaptations sans gluten peuvent être préparées sur demande lors de la réservation.",
      },
      {
        q: "Peut-on prendre des photos avec les danseurs ?",
        a: "Oui, le programme prévoit des sessions photos avec les artistes en costumes traditionnels.",
      },
      {
        q: "Quelle est la politique d'annulation ?",
        a: "Annulation gratuite jusqu'à 48 heures avant le départ. En cas de mauvais temps, la croisière est reportée ou remboursée.",
      },
      {
        q: "Les enfants peuvent-ils participer ?",
        a: "Oui, la croisière est adaptée aux familles. Enfants 0–5 ans gratuits, 6–12 ans tarif réduit. Le spectacle de nuit turque est aussi captivant pour les enfants.",
      },
    ],
    relatedHeading: "Autres options",
    ctaHeading: "Réserver la croisière dîner soirée turque",
    ctaSubtitle: "Indiquez la date et le nombre de personnes — réponse rapide garantie.",
    bookLabel: "Réserver maintenant",
    whatsappLabel: "Écrire sur WhatsApp",
    mainPageNote:
      "Pour une simple croisière sur le Bosphore sans spectacle, consultez la",
  },

  nl: {
    metaTitle: "Turkse Avond Dinercruise Istanbul — Vanaf €55 | MerrySails",
    metaDescription:
      "Turkse avond dinercruise Istanbul: Zeybek-dansen, Davul-Zurna, Turks buffet op de Bosporus. Pakketten vanaf €55, TÜRSAB-gecertificeerd sinds 2001, 50.000+ gasten. Boek nu.",
    canonicalPath: "/nl/turkish-night-dinner-cruise-istanbul",
    breadcrumbHome: "Home",
    breadcrumbDinner: "Dinercruise",
    breadcrumbCurrent: "Turkse Avond",
    eyebrow: "MerrySails Istanbul — Turkse Avond Ervaring",
    heroTitle: "Turkse Avond Dinercruise Istanbul",
    heroSubtitle: "Vanaf €55 per persoon · Zeybek, Davul-Zurna en Bosporus-panorama",
    heroDescription:
      "De Turkse avond dinercruise biedt een unieke culturele ervaring op de Bosporus: Zeybek-dansen, Davul-Zurna-optredens, henna-nacht-figuren en het beste van de Turkse keuken in één avond. Sinds 2001 — TÜRSAB A-categorie gecertificeerd — heeft MerrySails meer dan 50.000 internationale gasten betoverd met deze onvergetelijke avondervaring. Ons schip vertrekt om 20:30 vanuit Kabataş en toont 3,5 uur lang de silhouetten van Istanbul en de Bosporus.",
    trustSignal: "TÜRSAB A-categorie gecertificeerd — Merry Tourism Istanbul sinds 2001, 50.000+ gasten",
    keyFacts: [
      { icon: "⏱", label: "Duur", value: "ca. 3,5 uur" },
      { icon: "📍", label: "Vertrek", value: "Kabataş Pier, 20:30" },
      { icon: "💶", label: "Prijs", value: "Vanaf €55 per persoon" },
      { icon: "🎭", label: "Show", value: "Folkloredansen + Davul-Zurna" },
    ],
    sections: [
      {
        heading: "Wat is een Turkse avond? Culturele achtergrond",
        body: [
          "De Turkse avond is de podiumversie van eeuwenoude Anatolische folklore. De Zeybek-dans weerspiegelt de krachtige mannelijke figuren uit de Egeïsche regio. De Halay vertegenwoordigt collectieve ritmische dansen uit het oosten en zuidoosten. De henna-nacht-figuren zijn geïnspireerd op traditionele Turkse huwelijksceremoniën.",
          "Het Davul-Zurna-duo is de oudste instrumentencombinatie in de Turkse folklore. Het diepe geluid van de Davul-trom en de scherpe melodie van de Zurna brengen toeschouwers op een echte culturele reis — veel meer dan een gewone avondshow. De professionele artiesten van MerrySails treden elke avond op in authentieke kostuums met doordachte choreografieën.",
          "Deze culturele rijkdom beleven met het Bosporus-panorama op de achtergrond behoort tot de meest onvergetelijke momenten van een Istanbul-bezoek. Er is geen taalbarrière — dans, muziek en kleurrijke kostuums spreken een universele taal.",
        ],
      },
      {
        heading: "Showprogramma: wat gebeurt er wanneer?",
        body: [
          "Het schip vertrekt om 20:30 vanuit Kabataş. De eerste 30 tot 45 minuten worden besteed aan het welkomstdrankje en het buffet; gasten zitten neer en observeren de zonsondergangskleuren boven de silhouet van Istanbul.",
          "De shows beginnen rond 21:00–21:15. In het eerste deel treden Zeybek- en Halay-dansers op, gevolgd door Davul-Zurna-performances en henna-nacht-figuren. In het middendeel wordt de dansmuziek levendiger en worden gasten uitgenodigd op het podium.",
          "Tussen 21:30 en 22:00 passeert het schip het mooiste deel van de Bosporus — onder de bruggen. Dit is de ideale periode voor foto's en panoramische uitzichten. Rond 22:30–23:00 zijn de laatste muzieksets en dansoptredens afgerond; terugkeer naar Kabataş volgt rond 23:30.",
        ],
      },
      {
        heading: "Turks Buffet: Wat staat er op het menu?",
        body: [
          "De Turkse avond dinercruise presenteert de beste vertegenwoordigers van de Turkse keuken in buffet-vorm. Bij de voorgerechten: Yaprak Sarma met olijfolie, Haydari, hummus, auberginesalade en Tarama — koud en warm geserveerd.",
          "Bij het hoofdgerecht: gegrilde kippenspiezen, lamsköfte en lamskoteletten, geserveerd met rijst, gebakken groenten en verse salade. Het standaardmenu is inbegrepen in het Silver-pakket; het Premium menu van het Gold-pakket omvat ook zeevruchten en specialiteiten.",
          "Als dessert: Turks baklava, Sütlaç (rijstpap), Künefe en Lokum. De dranken variëren per pakket: frisdrank, lokale alcoholische dranken (bier, wijn, raki) of onbeperkt alcohol. Voor vegetarische gasten kan het menu op verzoek worden aangepast.",
        ],
      },
      {
        heading: "Foto- en Cultuurbeleving Mogelijkheden",
        body: [
          "De Turkse avond biedt fotoliefhebbers unieke opnamen. De folkloristische kostuums (rode Zeybek-gewaden, geborduurde regionale kledij), de 's nachts verlichte Bosporus-bruggen en de verlichting van het Dolmabahçe Paleis vormen perfecte achtergronden.",
          "Op het scheepsdek zijn foto's tijdens het gouden uur ideaal direct na vertrek — tussen Kabataş en Besiktas laten zonsondergangskleuren en silhouetten zich prachtig vastleggen. Een fotosessie met de artiesten in kostuum is eveneens opgenomen in het programma.",
          "Voor internationale bezoekers betekent de Turkse avond folklore beleven door te doen. Dansfiguren nadoen, meebewegen op het Davul-ritme en de Zurna live horen, creëert een veel indrukwekkendere culturele ervaring dan een museumbezoek of rondleiding.",
        ],
      },
      {
        heading: "Pakketten en prijzen",
        body: [
          "De Turkse avond dinercruise biedt vier pakketten. De Turkse avondshow en een basismenu zijn in alle pakketten inbegrepen; het verschil zit in stoeltype, drankenaanbod en menuniveau.",
          "Silver Soft Drinks (€55): Standaard stoel, onbeperkt frisdrank, dinermenu en volledig Turks avondprogramma inbegrepen. De populairste instapoptie.",
          "Silver Alcoholic (€75): Standaard stoel, lokale alcoholische dranken (bier, wijn, raki), dinermenu en Turks avondprogramma.",
          "Gold Soft Drinks (€95): VIP-stoel bij het podium, onbeperkt frisdrank, Premium menu, Turkse avond + DJ-set.",
          "Gold Onbeperkt Alcohol (€119): VIP-stoel bij het podium, onbeperkt alcohol inbegrepen, Premium menu, Turkse avond + DJ-set. Het meest uitgebreide pakket.",
        ],
      },
      {
        heading: "Waarom de Turkse Avond bij MerrySails?",
        body: [
          "MerrySails opereert onder Merry Tourism, TÜRSAB A-categorie gecertificeerd in Istanbul sinds 2001. Dit garandeert zowel een juridisch veilige cruise als een ervaren maritieme infrastructuur. De boordveiligheid voldoet aan de Turkse scheepvaartregelgeving.",
          "Ons artiesten-team werkt met regelmatig vernieuwde choreografieën en kostuums. In plaats van een mechanische herhaling bieden we elke avond een levendig programma dat zich aanpast aan de energie van de gasten. Volksdansmeesters uit verschillende regio's van Turkije treden op.",
          "Voor wie alleen een Bosporus-cruise wil zonder Turkse avondshow, is onze Zonsondergang Cruise-pagina ideaal. Voor groepsorganisaties staat ons WhatsApp-kanaal klaar.",
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
        items: ["Standaard stoel", "Onbeperkt frisdrank", "Dinermenu", "Volledig Turks avondprogramma"],
      },
      {
        name: "Silver Alcoholic",
        price: "€75",
        highlight: false,
        items: ["Standaard stoel", "Lokale alcoholische dranken", "Dinermenu", "Volledig Turks avondprogramma"],
      },
      {
        name: "Gold Soft Drinks",
        price: "€95",
        highlight: true,
        items: ["VIP-stoel bij podium", "Onbeperkt frisdrank", "Premium menu", "Turkse avond + DJ"],
      },
      {
        name: "Gold Onbeperkt Alcohol",
        price: "€119",
        highlight: false,
        items: ["VIP-stoel bij podium", "Onbeperkt alcohol inbegrepen", "Premium menu", "Turkse avond + DJ"],
      },
    ],
    showHeading: "Avondprogramma",
    showIntro: "Globaal verloop van de Turkse avond dinercruise:",
    showItems: [
      { time: "20:30", event: "Vertrek vanuit Kabataş, welkomstdrankje" },
      { time: "21:00", event: "Zeybek- en Halay-dansen beginnen" },
      { time: "21:15", event: "Davul-Zurna-optreden en henna-nacht-figuren" },
      { time: "21:30", event: "Passage onder Bosporus-bruggen — fotomoment" },
      { time: "22:00", event: "Gastendans en interactief gedeelte" },
      { time: "22:30", event: "Laatste muziekset en DJ" },
      { time: "23:30", event: "Terugkeer naar Kabataş" },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Wat is inbegrepen in de Turkse avond dinercruise?",
        a: "Zeybek-, Halay- en henna-nacht-dansen, Davul-Zurna-optreden, Turks buffet of menu, welkomstdrankje en Bosporus-cruise zijn in alle pakketten inbegrepen. Gold-pakketten voegen een DJ-set en VIP-stoelen toe.",
      },
      {
        q: "Moet ik Turks spreken om de show te begrijpen?",
        a: "Nee. Volksdansen, muziek en kostuums spreken een universele taal. Geen taalkennis vereist — geniet en doe mee zonder barrières.",
      },
      {
        q: "Welk pakket bevat de Turkse avondshow?",
        a: "Alle pakketten — Silver en Gold — bevatten het volledige Turkse avondprogramma. Het verschil zit in menuniveau, drankenaanbod en stoelcategorie.",
      },
      {
        q: "Wanneer begint het showprogramma?",
        a: "Het schip vertrekt om 20:30. De shows beginnen ongeveer 30 tot 45 minuten later, rond 21:00–21:15. De eerste fase is gewijd aan het diner en het welkomstdrankje.",
      },
      {
        q: "Zijn er vegetarische of glutenvrije opties?",
        a: "Ja, vegetarische gerechten zijn beschikbaar. Glutenvrije aanpassingen kunnen op verzoek worden bereid bij boeking.",
      },
      {
        q: "Kan ik foto's maken met de dansers?",
        a: "Ja, het programma omvat fotosessies met de artiesten in traditionele kostuums.",
      },
      {
        q: "Wat is het annuleringsbeleid?",
        a: "Gratis annulering tot 48 uur vóór vertrek. Bij slecht weer wordt de cruise uitgesteld of terugbetaald.",
      },
      {
        q: "Kunnen kinderen deelnemen?",
        a: "Ja, de cruise is gezinsvriendelijk. Kinderen 0–5 jaar gratis, 6–12 jaar gereduceerd tarief. De Turkse avondshow is ook voor kinderen aantrekkelijk.",
      },
    ],
    relatedHeading: "Andere opties",
    ctaHeading: "Turkse avond dinercruise boeken",
    ctaSubtitle: "Geef datum en aantal personen op — snel antwoord gegarandeerd.",
    bookLabel: "Nu boeken",
    whatsappLabel: "Stuur een WhatsApp",
    mainPageNote:
      "Voor een eenvoudige Bosporus-cruise zonder avondshow, zie de",
  },
};

// ─── Related links per locale ─────────────────────────────────────────────────

const RELATED_LINKS: Record<string, { href: string; title: string; desc: string }[]> = {
  tr: [
    { href: "/istanbul-dinner-cruise", title: "İstanbul Akşam Yemeği Turu", desc: "Ana tur sayfası — tüm paketler ve fiyatlar" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Gün Batımı Turu", desc: "Türk gecesi olmayan 2 saatlik Boğaz turu, €34'ten" },
    { href: "/private-bosphorus-dinner-cruise", title: "Özel Akşam Yemeği Turu", desc: "Sadece sizin grubunuz için özel yat deneyimi" },
  ],
  de: [
    { href: "/istanbul-dinner-cruise", title: "Istanbul Dinner Cruise", desc: "Hauptseite — alle Pakete und Preise" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Sonnenuntergang-Tour", desc: "2-stündige Tour ohne Abendshow ab €34" },
    { href: "/private-bosphorus-dinner-cruise", title: "Private Dinner Kreuzfahrt", desc: "Exklusive Yacht nur für Ihre Gruppe" },
  ],
  fr: [
    { href: "/istanbul-dinner-cruise", title: "Croisière Dîner Istanbul", desc: "Page principale — toutes les formules et tarifs" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Croisière Coucher de Soleil", desc: "Croisière de 2h sans spectacle à partir de €34" },
    { href: "/private-bosphorus-dinner-cruise", title: "Dîner Privé en Yacht", desc: "Yacht exclusif pour votre groupe uniquement" },
  ],
  nl: [
    { href: "/istanbul-dinner-cruise", title: "Istanbul Dinercruise", desc: "Hoofdpagina — alle pakketten en prijzen" },
    { href: "/cruises/bosphorus-sunset-cruise", title: "Zonsondergang Cruise", desc: "Cruise van 2 uur zonder avondshow vanaf €34" },
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
  const languages = buildHreflang("/turkish-night-dinner-cruise-istanbul");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: languages ?? {
        "x-default": `${SITE_URL}/turkish-night-dinner-cruise-istanbul`,
        en: `${SITE_URL}/turkish-night-dinner-cruise-istanbul`,
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

export default async function TurkishNightDinnerCruiseLocalePage({
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

          {/* Show Timeline */}
          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-3">{t.showHeading}</h2>
            <p className="text-sm text-[var(--text-muted)] mb-5">{t.showIntro}</p>
            <div className="relative pl-4 border-l-2 border-[var(--brand-primary)]/30 space-y-4">
              {t.showItems.map((item) => (
                <div key={item.time} className="flex items-start gap-4">
                  <span className="text-xs font-bold text-[var(--brand-primary)] w-14 shrink-0 pt-0.5">{item.time}</span>
                  <span className="text-sm text-[var(--text-muted)] leading-relaxed">{item.event}</span>
                </div>
              ))}
            </div>
          </section>

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
            <Link href={`/${locale}/cruises/bosphorus-sunset-cruise`} className="text-[var(--brand-primary)] underline hover:opacity-80">
              Bosphorus Sunset Cruise
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
