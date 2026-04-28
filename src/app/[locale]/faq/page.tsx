import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

type FAQItem = { q: string; a: string };

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  viewInEnglish: string;
  faqs: FAQItem[];
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "SSS — İstanbul Boğaz Turu Sıkça Sorulan Sorular | MerrySails",
    description:
      "İstanbul Boğaz turu hakkında sıkça sorulan sorular: rezervasyon, iptal politikası, fiyatlar, dahil olanlar, kalkış noktaları ve grup indirimleri.",
    canonicalPath: "/tr/faq",
    pageTitle: "İstanbul Boğaz Turu — Sıkça Sorulan Sorular",
    pageDescription:
      "İstanbul'da tekne turu, akşam yemeği turu ve yat kiralama rezervasyonu hakkında bilmeniz gereken her şey.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "SSS",
    viewInEnglish: "English →",
    faqs: [
      {
        q: "İstanbul'da Boğaz turu fiyatı ne kadar?",
        a: "Fiyatlar seçtiğiniz deneyime göre değişir. Boğaz Gün Batımı Turu şarapsız seçenekte EUR 34, şarap servisli seçenekte EUR 40'tan başlar. Boğaz Akşam Yemeği Turu, dört paylaşımlı paket arasında EUR 30 ile EUR 90 arasında değişir ve İstanbul Yat Kiralama yat başına EUR 280'den başlar. Evlilik teklifi, özel akşam yemeği, tekne kiralama ve kurumsal etkinlikler talep ettiğiniz kuruluma göre fiyatlandırılır.",
      },
      {
        q: "Boğaz tekne turu nasıl rezerve edilir?",
        a: "Web sitemizden, WhatsApp (+90 537 040 68 22) üzerinden veya telefonla rezervasyon talebi gönderebilirsiniz. Bir rezervasyon kimliği oluşturup rezervasyon detaylarını e-posta ile iletiyoruz.",
      },
      {
        q: "Ücretsiz iptal politikası var mı?",
        a: "Evet. Kalkıştan 24 saat öncesine kadar ücretsiz iptal edebilirsiniz. Son 24 saat içerisindeki değişiklik veya iptaller ekibimizin manuel incelemesini gerektirir.",
      },
      {
        q: "İstanbul akşam yemeği turuna neler dahil?",
        a: "Boğaz akşam yemeği turu dört paylaşımlı akşam paketinde sunulur: Silver Alkolsüz İçecekler, Silver Alkollü İçecekler, Gold Alkolsüz İçecekler ve Gold Sınırsız Alkol. Deneyim akşam yemeği servisi, 3,5 saatlik paylaşımlı akşam seyri, sahne eğlencesi ve merkezi Avrupa yakası bölgelerinden otelden alış desteğini içerir.",
      },
      {
        q: "Boğaz gün batımı turu kaçta kalkıyor?",
        a: "Gün batımı turu, mevsimsel gün batımı saatine göre kalkar. Mevcut yapı 2 saatlik paylaşımlı altın saat seyiridir; nihai kalkış saati rezervasyonla onaylanır.",
      },
      {
        q: "Boğaz'da özel yat kiralayabilir miyim?",
        a: "Evet. İstanbul Yat Kiralama üç özel yat paketi sunar; düzenlemek istediğiniz etkinliğin türüne göre yemek, içecek, transfer, dekorasyon veya eğlence ekleyebilirsiniz.",
      },
      {
        q: "Tekneler nereden kalkıyor?",
        a: "Kalkış detayları ürüne göre değişir. Gün batımı turu, rezervasyon sonrası onaylanan merkezi bir buluşma noktasını kullanır. Akşam yemeği turu Kabataş İskelesi biniş planına bağlıdır ve özel yat kalkışları seçilen tekneye ve marinaya göre belirlenir.",
      },
      {
        q: "Tekne turları çocuklar için uygun mu?",
        a: "Evet, Boğaz tekne turlarımızın çoğu aile dostudur. 6 yaş altı çocuklar paylaşımlı turlarda ücretsiz seyahat eder. Özel yat kiralamalarında yaş kısıtlaması yoktur.",
      },
      {
        q: "Tura ne getirmeliyim?",
        a: "Hafif bir mont (deniz üzerinde rüzgar olabilir), rahat ayakkabı, güneş gözlüğü ve fotoğraf makinesi getirmenizi öneriyoruz. Gündüz Boğaz turlarında güneş kremi de tavsiye edilir.",
      },
      {
        q: "Yat üzerinde doğum günü partisi veya evlilik teklifi düzenleyebilir miyim?",
        a: "Kesinlikle! İstanbul'da yat etkinliklerinde uzmanız — evlilik teklifleri, doğum günü partileri, bekarlığa veda partileri, evlilik yıldönümleri ve kurumsal etkinlikler. Yat paketi ve etkinlik planına göre dekorasyon, fotoğrafçı, müzisyen, catering ve özel pasta eklenebilir.",
      },
      {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Mevcut paylaşımlı tur rezervasyon akışında ödeme, tekne üzerinde nakit veya kart ile alınır. Özel etkinlik veya özel kiralama farklı bir onay yöntemi gerektiriyorsa ekibimiz bunu planlama sürecinde doğrudan açıklar.",
      },
      {
        q: "Akşam yemeği turunda otel transferi sağlıyor musunuz?",
        a: "Evet. Paylaşımlı akşam yemeği paketleri merkezi Avrupa yakası bölgeleri için otelden alış ve bırakışı içerir; bazı sokaklar kapı önü alış yerine yakın bir buluşma noktası gerektirebilir. Diğer turlar için detaylı buluşma talimatları sağlanır ve gerektiğinde isteğe bağlı transfer düzenlenebilir.",
      },
      {
        q: "MerrySails lisanslı bir şirket mi?",
        a: "Evet, MerrySails 2001'den bu yana faaliyet gösteren TÜRSAB A Grubu lisanslı bir İstanbul seyahat acentesi olan Merry Tourism tarafından işletilmektedir. Ana güven sinyalleri Merry Tourism'in lisans ve operasyon geçmişidir.",
      },
    ],
  },
  de: {
    title: "FAQ — Bosporus-Kreuzfahrt Häufige Fragen | MerrySails",
    description:
      "Häufig gestellte Fragen zu Istanbul Bosporus-Kreuzfahrten: Buchung, Stornierungsbedingungen, Preise, Leistungen, Abfahrtsorte und Gruppenrabatte.",
    canonicalPath: "/de/faq",
    pageTitle: "Istanbul Bosporus-Kreuzfahrt — Häufige Fragen",
    pageDescription:
      "Alles, was Sie über die Buchung einer Bootstour, Dinner-Kreuzfahrt oder eines Jachtcharters in Istanbul wissen müssen.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "FAQ",
    viewInEnglish: "English →",
    faqs: [
      {
        q: "Wie viel kostet eine Bosporus-Kreuzfahrt in Istanbul?",
        a: "Die Preise hängen vom gewählten Erlebnis ab. Die Bosporus-Sonnenuntergangs-Kreuzfahrt beginnt derzeit bei EUR 34 für die Variante ohne Wein und EUR 40 für die Variante mit Weinservice. Die Bosporus-Dinner-Kreuzfahrt liegt zwischen EUR 30 und EUR 90 in vier geteilten Paketen, und der Jachtcharter Istanbul beginnt bei EUR 280 pro Jacht. Heiratsanträge, private Dinner, Bootsverleih und Firmenevents werden je nach gewünschtem Setup individuell kalkuliert.",
      },
      {
        q: "Wie buche ich eine Bosporus-Bootstour?",
        a: "Sie können eine Reservierungsanfrage über unsere Website, per WhatsApp (+90 537 040 68 22) oder telefonisch senden. Wir erstellen eine Buchungs-ID und senden Ihnen die Buchungsdetails per E-Mail zu.",
      },
      {
        q: "Gibt es eine kostenlose Stornierungsrichtlinie?",
        a: "Ja. Sie können bis zu 24 Stunden vor Abfahrt kostenfrei stornieren. Innerhalb der letzten 24 Stunden müssen Änderungen oder Stornierungen manuell durch unser Team geprüft werden.",
      },
      {
        q: "Was ist in der Istanbul-Dinner-Kreuzfahrt enthalten?",
        a: "Die Bosporus-Dinner-Kreuzfahrt wird in vier geteilten Abendpaketen angeboten: Silver Soft Drinks, Silver Alkoholische Getränke, Gold Soft Drinks und Gold Unbegrenzt Alkohol. Das Erlebnis umfasst den Dinner-Service, eine geteilte 3,5-stündige Abendfahrt, Bühnenunterhaltung und Hotelabholung aus zentralen Bereichen der europäischen Seite.",
      },
      {
        q: "Wann startet die Bosporus-Sonnenuntergangs-Kreuzfahrt?",
        a: "Die Sonnenuntergangs-Kreuzfahrt startet rund um den saisonalen Sonnenuntergang. Aktuell handelt es sich um eine geteilte 2-stündige Goldstunden-Kreuzfahrt, die genaue Abfahrtszeit wird mit der Buchung bestätigt.",
      },
      {
        q: "Kann ich eine private Jacht auf dem Bosporus mieten?",
        a: "Ja. Jachtcharter Istanbul bietet drei private Jachtpakete, und Sie können je nach gewünschter Veranstaltung Mahlzeiten, Getränke, Transfer, Dekoration oder Unterhaltung hinzufügen.",
      },
      {
        q: "Wo starten die Boote?",
        a: "Die Abfahrtsdetails hängen vom Produkt ab. Die Sonnenuntergangs-Kreuzfahrt nutzt einen zentralen Treffpunkt, der nach der Buchung bestätigt wird, die Dinner-Kreuzfahrt ist an den Boarding-Plan am Kabatas-Pier gebunden, und private Jachtabfahrten hängen vom gewählten Schiff und Hafen ab.",
      },
      {
        q: "Sind die Bootstouren für Kinder geeignet?",
        a: "Ja, die meisten unserer Bosporus-Bootstouren sind familienfreundlich. Kinder unter 6 Jahren reisen auf geteilten Kreuzfahrten kostenlos. Bei privaten Jachtcharter gibt es keine Altersbeschränkungen.",
      },
      {
        q: "Was sollte ich auf die Kreuzfahrt mitnehmen?",
        a: "Wir empfehlen eine leichte Jacke (auf dem Wasser kann es windig werden), bequeme Schuhe, eine Sonnenbrille und eine Kamera. Bei Tageskreuzfahrten auf dem Bosporus ist Sonnencreme empfehlenswert.",
      },
      {
        q: "Kann ich eine Geburtstagsfeier oder einen Heiratsantrag auf einer Jacht organisieren?",
        a: "Auf jeden Fall! Wir sind auf Jachtveranstaltungen in Istanbul spezialisiert — Heiratsanträge, Geburtstagsfeiern, Junggesellinnenabschiede, Hochzeitstage und Firmenevents. Dekoration, Fotografen, Musiker, Catering und individuelle Torten können je nach Jachtpaket und Eventplan hinzugefügt werden.",
      },
      {
        q: "Welche Zahlungsmethoden akzeptieren Sie?",
        a: "Im aktuellen geteilten Buchungsprozess wird die Zahlung an Bord in bar oder per Karte entgegengenommen. Wenn ein privates Event oder ein individueller Charter eine andere Bestätigungsmethode benötigt, erläutert unser Team dies direkt während der Planung.",
      },
      {
        q: "Bieten Sie Hotelabholung für die Dinner-Kreuzfahrt an?",
        a: "Ja. Geteilte Dinner-Pakete beinhalten Hotelabholung und -rückbringung für zentrale Bereiche der europäischen Seite, einige Straßen erfordern jedoch einen nahegelegenen Treffpunkt anstelle einer Tür-zu-Tür-Abholung. Für andere Kreuzfahrten geben wir detaillierte Anweisungen zum Treffpunkt, optionale Transfers können bei Bedarf arrangiert werden.",
      },
      {
        q: "Ist MerrySails ein lizenziertes Unternehmen?",
        a: "Ja, MerrySails wird von Merry Tourism betrieben, einer TÜRSAB-lizenzierten A-Gruppe-Reiseagentur mit Sitz in Istanbul. Die Website nutzt die Lizenz und Betriebsgeschichte seit 2001 von Merry Tourism als wichtigste Vertrauenssignale.",
      },
    ],
  },
  fr: {
    title: "FAQ — Croisière Bosphore Questions Fréquentes | MerrySails",
    description:
      "Questions fréquemment posées sur les croisières du Bosphore à Istanbul : réservation, politique d'annulation, prix, services inclus, points de départ et réductions de groupe.",
    canonicalPath: "/fr/faq",
    pageTitle: "Croisière Bosphore Istanbul — Questions Fréquentes",
    pageDescription:
      "Tout ce que vous devez savoir pour réserver une excursion en bateau, une croisière dîner ou un yacht à Istanbul.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "FAQ",
    viewInEnglish: "English →",
    faqs: [
      {
        q: "Combien coûte une croisière sur le Bosphore à Istanbul ?",
        a: "Les prix dépendent de l'expérience choisie. La croisière coucher de soleil sur le Bosphore commence actuellement à EUR 34 pour l'option sans vin et EUR 40 pour l'option avec vin. La croisière dîner sur le Bosphore varie de EUR 30 à EUR 90 sur quatre formules partagées, et le charter de yacht à Istanbul commence à EUR 280 par yacht. Les demandes en mariage, dîners privés, locations de bateau et événements d'entreprise sont tarifés selon la configuration demandée.",
      },
      {
        q: "Comment réserver une excursion en bateau sur le Bosphore ?",
        a: "Vous pouvez envoyer une demande de réservation via notre site web, par WhatsApp (+90 537 040 68 22) ou par téléphone. Nous créons un identifiant de réservation et envoyons les détails par e-mail.",
      },
      {
        q: "Y a-t-il une politique d'annulation gratuite ?",
        a: "Oui. Vous pouvez annuler gratuitement jusqu'à 24 heures avant le départ. Dans les dernières 24 heures, les modifications ou annulations nécessitent un examen manuel par notre équipe.",
      },
      {
        q: "Qu'est-ce qui est inclus dans la croisière dîner d'Istanbul ?",
        a: "La croisière dîner sur le Bosphore est proposée en quatre formules partagées : Silver Soft Drinks, Silver Boissons Alcoolisées, Gold Soft Drinks et Gold Alcool Illimité. L'expérience comprend le service de dîner, une croisière partagée de 3h30, des animations sur scène et la prise en charge à l'hôtel depuis les zones centrales du côté européen.",
      },
      {
        q: "À quelle heure part la croisière coucher de soleil ?",
        a: "La croisière coucher de soleil part autour de l'heure du coucher du soleil saisonnier. La structure actuelle est une croisière partagée de 2 heures pendant l'heure dorée ; l'horaire final est confirmé lors de la réservation.",
      },
      {
        q: "Puis-je louer un yacht privé sur le Bosphore ?",
        a: "Oui. Le charter de yacht à Istanbul propose trois formules privées, et vous pouvez ajouter repas, boissons, transfert, décoration ou animations selon le type d'événement souhaité.",
      },
      {
        q: "D'où partent les bateaux ?",
        a: "Les détails de départ dépendent du produit. La croisière coucher de soleil utilise un point de rendez-vous central confirmé après réservation, la croisière dîner est liée au plan d'embarquement du quai de Kabatas, et les départs des yachts privés dépendent du navire et du port choisis.",
      },
      {
        q: "Les excursions en bateau sont-elles adaptées aux enfants ?",
        a: "Oui, la plupart de nos excursions sur le Bosphore sont adaptées aux familles. Les enfants de moins de 6 ans voyagent gratuitement sur les croisières partagées. Pour les charters privés, il n'y a aucune restriction d'âge.",
      },
      {
        q: "Que dois-je apporter pour la croisière ?",
        a: "Nous recommandons d'apporter une veste légère (il peut faire frais sur l'eau), des chaussures confortables, des lunettes de soleil et un appareil photo. La crème solaire est recommandée pour les croisières de jour sur le Bosphore.",
      },
      {
        q: "Puis-je organiser une fête d'anniversaire ou une demande en mariage sur un yacht ?",
        a: "Absolument ! Nous sommes spécialisés dans les événements sur yacht à Istanbul — demandes en mariage, anniversaires, enterrements de vie de jeune fille, anniversaires de mariage et événements d'entreprise. Décorations, photographes, musiciens, traiteur et gâteaux personnalisés peuvent être ajoutés selon la formule de yacht et le plan de l'événement.",
      },
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Pour le flux de réservation actuel des croisières partagées, le paiement est encaissé à bord en espèces ou par carte. Si un événement privé ou un charter sur mesure nécessite une méthode de confirmation différente, notre équipe l'explique directement lors de la planification.",
      },
      {
        q: "Proposez-vous la prise en charge à l'hôtel pour la croisière dîner ?",
        a: "Oui. Les formules de dîner partagées incluent la prise en charge et le retour à l'hôtel pour les zones centrales du côté européen, mais certaines rues nécessitent un point de rendez-vous proche plutôt qu'une prise en charge devant la porte. Pour les autres croisières, nous fournissons des instructions détaillées de rendez-vous et un transfert optionnel peut être organisé sur demande.",
      },
      {
        q: "MerrySails est-elle une entreprise agréée ?",
        a: "Oui, MerrySails est exploitée par Merry Tourism, une agence de voyages du groupe A licenciée TÜRSAB basée à Istanbul. Le site utilise la licence et l'historique d'exploitation depuis 2001 de Merry Tourism comme principaux signaux de confiance.",
      },
    ],
  },
  nl: {
    title: "FAQ — Bosporus Cruise Veelgestelde Vragen | MerrySails",
    description:
      "Veelgestelde vragen over Bosporus cruises in Istanbul: boeking, annuleringsbeleid, prijzen, inbegrepen diensten, vertrekpunten en groepskortingen.",
    canonicalPath: "/nl/faq",
    pageTitle: "Istanbul Bosporus Cruise — Veelgestelde Vragen",
    pageDescription:
      "Alles wat u moet weten over het boeken van een boottocht, dinercruise of jachtverhuur in Istanbul.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "FAQ",
    viewInEnglish: "English →",
    faqs: [
      {
        q: "Hoeveel kost een Bosporus cruise in Istanbul?",
        a: "Prijzen zijn afhankelijk van de gekozen ervaring. De Bosporus Zonsondergang Cruise begint vanaf EUR 34 voor de optie zonder wijn en EUR 40 voor de optie met wijnservice. De Bosporus Diner Cruise loopt van EUR 30 tot EUR 90 in vier gedeelde pakketten, en Jachtcharter Istanbul begint vanaf EUR 280 per jacht. Huwelijksaanzoeken, privédiners, boothuur en bedrijfsevenementen worden geprijsd volgens de gewenste opzet.",
      },
      {
        q: "Hoe boek ik een Bosporus boottocht?",
        a: "U kunt een reserveringsverzoek versturen via onze website, via WhatsApp (+90 537 040 68 22) of telefonisch. We maken een reservering aan en sturen de boekingsdetails per e-mail.",
      },
      {
        q: "Is er een gratis annuleringsbeleid?",
        a: "Ja. U kunt tot 24 uur voor vertrek kosteloos annuleren. Binnen de laatste 24 uur worden wijzigingen of annuleringen handmatig beoordeeld door ons team.",
      },
      {
        q: "Wat is inbegrepen in de Istanbul diner cruise?",
        a: "De Bosporus diner cruise wordt aangeboden in vier gedeelde avondpakketten: Silver Frisdrank, Silver Alcoholische Dranken, Gold Frisdrank en Gold Onbeperkt Alcohol. De ervaring omvat dinerservice, een gedeelde 3,5 uur durende avondtocht, podiumvermaak en hotelophaalservice vanuit centrale gebieden aan de Europese kant.",
      },
      {
        q: "Hoe laat vertrekt de Bosporus zonsondergang cruise?",
        a: "De zonsondergang cruise vertrekt rond de seizoensgebonden zonsondergang. De huidige opzet is een gedeelde 2-uur durende gouden uur cruise; de definitieve vertrektijd wordt bevestigd bij de boeking.",
      },
      {
        q: "Kan ik een privéjacht huren op de Bosporus?",
        a: "Ja. Jachtcharter Istanbul biedt drie privéjachtpakketten en u kunt maaltijden, dranken, transfer, decoratie of vermaak toevoegen, afhankelijk van het type evenement dat u wilt organiseren.",
      },
      {
        q: "Waar vertrekken de boten?",
        a: "Vertrekdetails zijn afhankelijk van het product. De zonsondergang cruise gebruikt een centraal ontmoetingspunt dat na de boeking wordt bevestigd, de diner cruise is gekoppeld aan het Kabatas-pier instapplan en privéjacht vertrekken zijn afhankelijk van het gekozen schip en de marina.",
      },
      {
        q: "Zijn de boottochten geschikt voor kinderen?",
        a: "Ja, de meeste van onze Bosporus boottochten zijn gezinsvriendelijk. Kinderen onder de 6 jaar reizen gratis op gedeelde cruises. Voor privéjachtcharters gelden geen leeftijdsbeperkingen.",
      },
      {
        q: "Wat moet ik meenemen op de cruise?",
        a: "We raden een lichte jas aan (op het water kan het winderig zijn), comfortabele schoenen, een zonnebril en een camera. Zonnebrandcrème wordt aanbevolen voor Bosporus cruises overdag.",
      },
      {
        q: "Kan ik een verjaardagsfeest of huwelijksaanzoek organiseren op een jacht?",
        a: "Absoluut! We zijn gespecialiseerd in jachtevenementen in Istanbul — huwelijksaanzoeken, verjaardagen, vrijgezellenfeesten, trouwdagen en bedrijfsevenementen. Decoraties, fotografen, muzikanten, catering en taarten op maat kunnen worden toegevoegd, afhankelijk van het jachtpakket en het evenementenplan.",
      },
      {
        q: "Welke betaalmethoden accepteren jullie?",
        a: "Voor de huidige gedeelde cruise boekingsstroom wordt betaling aan boord geïnd, contant of met kaart. Als een privé-evenement of aangepast charter een andere bevestigingsmethode nodig heeft, legt ons team dit direct uit tijdens het planningsproces.",
      },
      {
        q: "Bieden jullie hotelophaalservice voor de diner cruise?",
        a: "Ja. Gedeelde dinerpakketten omvatten hotelophaal- en afzetservice voor centrale gebieden aan de Europese kant, hoewel sommige straten een nabijgelegen ontmoetingspunt vereisen in plaats van ophalen aan de deur. Voor andere cruises geven we gedetailleerde ontmoetingsinstructies en kan optioneel transfer op verzoek worden geregeld.",
      },
      {
        q: "Is MerrySails een gelicentieerd bedrijf?",
        a: "Ja, MerrySails wordt geëxploiteerd door Merry Tourism, een TÜRSAB-gelicentieerd A-groep reisbureau gevestigd in Istanbul. De site gebruikt de licentie en operationele geschiedenis van Merry Tourism sinds 2001 als belangrijkste vertrouwenssignalen.",
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

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
  const languages = buildHreflang("/faq") ?? {
    "x-default": `${SITE_URL}/faq`,
    en: `${SITE_URL}/faq`,
    [locale]: canonicalUrl,
  };

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.pageTitle }],
    },
  };
}

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export default async function LocaleFAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((faq) => ({
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
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {c.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.breadcrumbCurrent}</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--heading)]">{c.pageTitle}</h1>
            <p className="text-[var(--text-muted)]">{c.pageDescription}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8">
            <div className="space-y-2">
              {c.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border-b border-[var(--line)] last:border-0 py-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)] hover:text-[var(--brand-primary)] flex items-start justify-between gap-4">
                    <span>{faq.q}</span>
                    <span className="text-[var(--brand-primary)] transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--body-text)] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/faq" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              {c.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
