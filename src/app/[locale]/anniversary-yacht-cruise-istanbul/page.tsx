import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart, Calendar, Camera, Cake } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  eyebrow: string;
  h1: string;
  intro: string;
  capsule: string;
  reasonsHeading: string;
  reasons: Array<{ icon: typeof Heart; title: string; desc: string }>;
  faqHeading: string;
  faqs: Array<{ q: string; a: string }>;
  ctaHeading: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaWhatsapp: string;
  whatsappPrefill: string;
  trustLine: string;
  reserveLabel: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Yıldönümü Yat Kiralama — Boğaz",
    metaDescription:
      "Boğaz'da yıldönümü için özel yat kiralama. 2 saat €280'den itibaren, pasta, fotoğrafçı, gün batımı zamanlaması. TÜRSAB A lisanslı 2001'den beri.",
    canonicalPath: "/tr/anniversary-yacht-cruise-istanbul",
    eyebrow: "Yıldönümü · Özel yat · Boğaz",
    h1: "İstanbul Yıldönümü Yat Kiralama",
    intro:
      "Yıldönümü çiftleri için özel Boğaz yat kiralaması — düğün tarihinize özel günlerde, evlilik yılınızı şehrin en fotojenik akşam manzarasında kutlayın. 2 saatlik temel kiralama Essential yat €280'den, geniş güverteli Premium €380'den başlar. Pasta, fotoğrafçı, şampanya servisi opsiyonel.",
    capsule:
      "İstanbul yıldönümü yat kiralaması, evli çiftleri için özel olarak planlanır — sürpriz mekaniği yok, paylaşılan anı ve fotoğraf odaklı. 2 saatlik özel kiralama €280'den başlar; pasta (~€80), profesyonel fotoğrafçı, canlı kemancı eklenir. Rota düğün yılınızı simgeleyecek şekilde — örneğin ilk balayınızda kaldığınız Beşiktaş oteli önünden geçiş — özelleştirilebilir.",
    reasonsHeading: "Yıldönümü için neden bu format?",
    reasons: [
      { icon: Heart, title: "Çiftiniz için özel kurulum", desc: "Yat sadece sizin için; başka misafir yok. Tempo, müzik, akşam yemeği zamanlaması yıldönümü anınıza göre ayarlanır." },
      { icon: Calendar, title: "Yıldönümü tarihinize göre zamanlama", desc: "Gün batımı saati, rota ve biniş zamanı, özel olarak kutladığınız güne göre planlanır. Yaz akşamları 19:30 biniş, kış akşamları 16:00." },
      { icon: Camera, title: "Fotojenik Boğaz silüeti", desc: "Güney Boğaz rotası Dolmabahçe, Ortaköy, 1. Boğaz Köprüsü ve Rumeli Hisarı'nı altın saatte geçer — İstanbul gününün en fotojenik aralığı." },
      { icon: Cake, title: "Pasta, yemek, müzik — ek olarak", desc: "Yıl sayılı kişiye özel pasta, çok aşamalı akşam yemeği, profesyonel fotoğrafçı (7 gün içinde 50+ kare), karşılama anı için canlı kemancı, çiçek buketi, şampanya servisi — talep üzerine eklenir." },
    ],
    faqHeading: "Yıldönümü SSS",
    faqs: [
      { q: "İstanbul'da yıldönümü yat kiralama ne kadar?", a: "Boutique Essential yat 2 saatlik kiralama €280'den, Premium €380'den. Pasta ~€80, fotoğrafçı ~€350-€500, şampanya €60-€120. Toplam akşam €450-€600 aralığında." },
      { q: "Yıldönümü ve evlilik teklifi kruvazı farkı nedir?", a: "Yıldönümü zaten kurulmuş bir çifti kutlar — sürpriz gerekmiyor, akşam yemeği + altın saat fotoğrafı + ilişkinizin önemli yerlerinin geçişi öne çıkar. Evlilik teklifi kruvazı gizli bir anla kurulur. Aynı yat, farklı program." },
      { q: "Yıldönümü tarihimize göre saatleme yapabilir misiniz?", a: "Evet. Yıldönümünüzün tarihine ve o günkü İstanbul'daki güneşin batış saatine göre planlıyoruz. Yaz aylarında biniş 19:30, kış aylarında 16:00. Tarih ve özel istekleri gönderin, biz rota ve zamanı oturtuyoruz." },
      { q: "Pasta + fotoğrafçı + kemancı kombinasyonu mümkün mü?", a: "Evet — en sık talep edilen kombinasyon. Yıldönümü kruvazlarına eklenen yaygın ekler: yıl sayılı kişiye özel pasta, profesyonel fotoğrafçı (7 gün içinde 50+ düzenlenmiş fotoğraf), biniş anı için canlı kemancı, çiçek buketi, şampanya servisi, çok aşamalı akşam yemeği." },
    ],
    ctaHeading: "Yıldönümü akşamını planlayın",
    ctaBody: "Yıldönümü tarihinizi, grup büyüklüğünüzü (çift veya aile) ve en önemli olan eklerinizi (pasta, fotoğrafçı, akşam yemeği, müzik) gönderin. 24 saat içinde tam bir program teklifiyle dönüyoruz.",
    ctaPrimary: "Yat filosunu gör",
    ctaWhatsapp: "Yıldönümü brifini WhatsApp'tan gönder",
    whatsappPrefill: "Merhaba MerrySails! Boğaz'da yıldönümü yat kiralama planlamak istiyoruz. Yıldönümü tarihimiz [tarih] ve [N] kişiyiz. [pasta/akşam yemeği/fotoğrafçı/müzik] istiyoruz.",
    trustLine: `Meryem Yıldız Travel altında işletilir · TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} · 2001'den bu yana Boğaz'da 50.000+ misafir.`,
    reserveLabel: "€280'den teklif al",
  },
  de: {
    metaTitle: "Jubiläums-Yacht Istanbul — Bosporus",
    metaDescription:
      "Private Yacht für Hochzeitstag am Bosporus. 2 Stunden ab €280, Torte, Fotograf, Sonnenuntergangs-Timing. TÜRSAB A-lizenziert seit 2001.",
    canonicalPath: "/de/anniversary-yacht-cruise-istanbul",
    eyebrow: "Hochzeitstag · Private Yacht · Bosporus",
    h1: "Hochzeitstag-Yacht Istanbul",
    intro:
      "Private Bosporus-Yacht-Charter für Hochzeitstag-Paare — feiern Sie Ihre Ehejahre vor Istanbuls fotogenster Abendkulisse. 2-Stunden-Basis-Charter auf der Essential-Yacht ab €280, Premium mit erweitertem Deck ab €380. Torte, Fotograf, Champagner-Service optional.",
    capsule:
      "Hochzeitstag-Yacht-Charter in Istanbul ist auf etablierte Paare zugeschnitten — keine Überraschungsmechanik, sondern gemeinsame Erinnerung + Foto-Fokus. 2-Stunden-Charter ab €280; Torte (~€80), Fotograf, Geiger als Add-ons. Route lässt sich personalisieren — z. B. Vorbeifahrt am Beşiktaş-Hotel Ihrer Flitterwochen.",
    reasonsHeading: "Warum dieses Format zum Hochzeitstag passt",
    reasons: [
      { icon: Heart, title: "Privatsphäre für das Paar", desc: "Yacht nur für Sie. Tempo, Musik, Dinner-Timing werden um Ihren Moment herum geplant — keine fremden Gäste." },
      { icon: Calendar, title: "Timing nach IHREM Hochzeitsdatum", desc: "Sonnenuntergangsstunde, Route, Boarding-Zeit werden um den spezifischen Tag herum geplant. Sommer boarden 19:30, Winter 16:00." },
      { icon: Camera, title: "Fotogene Bosporus-Skyline", desc: "Südliche Bosporus-Route passiert Dolmabahçe, Ortaköy, 1. Bosporus-Brücke, Rumeli Hisarı — die fotogenste Stunde des Istanbul-Tages." },
      { icon: Cake, title: "Torte, Dinner, Musik — Add-ons", desc: "Torte mit Jahreszahl, Mehrgang-Dinner, professioneller Fotograf (50+ Bilder in 7 Tagen), Live-Geiger beim Boarding, frischer Blumenstrauß — auf Anfrage." },
    ],
    faqHeading: "Hochzeitstag-FAQ",
    faqs: [
      { q: "Wie viel kostet eine Hochzeitstag-Yacht in Istanbul?", a: "Essential-Yacht 2-Stunden-Charter ab €280, Premium ab €380. Torte ~€80, Fotograf ~€350-€500, Champagner €60-€120. Gesamtabend meist €450-€600." },
      { q: "Was unterscheidet Hochzeitstag von Heiratsantrag?", a: "Hochzeitstag feiert ein bestehendes Paar — keine Überraschung nötig, mehr Fokus auf Dinner, Goldene-Stunde-Foto, Strecken-Höhepunkte. Heiratsantrag dreht sich um einen verborgenen Moment. Gleiche Yachts, anderes Programm." },
      { q: "Können Sie um unser Hochzeitsdatum herum planen?", a: "Ja. Wir planen den Charter um Ihr spezifisches Datum + die Sonnenuntergangsstunde dieses Tages in Istanbul. Sommer: Boarding 19:30. Winter: 16:00. Schicken Sie Datum + Sonderwünsche, wir planen Route und Timing." },
      { q: "Können wir Torte + Fotograf + Geiger kombinieren?", a: "Ja — die meistgewünschte Kombination. Übliche Add-ons: Torte mit Jahreszahl, professioneller Fotograf (50+ Bilder in 7 Tagen), Geiger beim Boarding, Blumenstrauß, Champagner-Service, Mehrgang-Dinner." },
    ],
    ctaHeading: "Hochzeitstag-Abend planen",
    ctaBody: "Senden Sie Ihr Hochzeitsdatum, Gruppengröße (Paar oder Familie) und Ihre wichtigsten Add-ons (Torte, Fotograf, Dinner, Musik). Wir liefern innerhalb 24 h ein vollständiges Programmangebot.",
    ctaPrimary: "Yacht-Flotte ansehen",
    ctaWhatsapp: "Hochzeitstag-Brief per WhatsApp senden",
    whatsappPrefill: "Hallo MerrySails! Wir möchten eine Hochzeitstag-Yacht auf dem Bosporus buchen. Hochzeitsdatum: [Datum], Gruppengröße [N]. Wir möchten [Torte/Dinner/Fotograf/Musik].",
    trustLine: `Betrieben unter Meryem Yıldız Travel · TÜRSAB-A-Lizenz #${TURSAB_LICENSE_NUMBER} · 50.000+ Gäste auf dem Bosporus seit 2001.`,
    reserveLabel: "Angebot ab €280",
  },
  fr: {
    metaTitle: "Croisière Anniversaire Yacht Istanbul",
    metaDescription:
      "Yacht privé pour anniversaire de mariage sur le Bosphore. Croisière 2 h dès €280, gâteau, photographe, coucher de soleil. TÜRSAB A licencié.",
    canonicalPath: "/fr/anniversary-yacht-cruise-istanbul",
    eyebrow: "Anniversaire · Yacht privé · Bosphore",
    h1: "Croisière Anniversaire de Mariage Yacht Istanbul",
    intro:
      "Location privée de yacht sur le Bosphore pour les couples qui célèbrent leur anniversaire de mariage. Charter 2 h sur notre yacht Essential dès €280, Premium avec pont étendu dès €380. Gâteau, photographe, service de champagne en option.",
    capsule:
      "La croisière anniversaire en yacht à Istanbul est conçue pour les couples installés — pas de mécanique surprise, plutôt souvenir partagé + photos. Charter 2 h dès €280 ; gâteau (~€80), photographe, violoniste en option. Route personnalisable — par ex. passage devant l'hôtel de votre lune de miel à Beşiktaş.",
    reasonsHeading: "Pourquoi ce format convient à un anniversaire",
    reasons: [
      { icon: Heart, title: "Intimité réservée au couple", desc: "Le yacht est réservé pour vous seuls. Rythme, musique, timing du dîner sont calés autour de votre moment — pas d'invités tiers." },
      { icon: Calendar, title: "Timing autour de VOTRE date", desc: "Heure du coucher de soleil, route, embarquement planifiés autour du jour précis que vous célébrez. Été : embarquement 19h30. Hiver : 16h00." },
      { icon: Camera, title: "Skyline photogénique du Bosphore", desc: "La boucle Sud du Bosphore passe Dolmabahçe, Ortaköy, 1er pont, Rumeli Hisarı — l'heure la plus photogénique de la journée à Istanbul." },
      { icon: Cake, title: "Gâteau, dîner, musique — options", desc: "Gâteau avec votre nombre d'années, dîner multi-services, photographe pro (50+ photos retouchées sous 7 jours), violoniste à l'embarquement, bouquet — sur demande." },
    ],
    faqHeading: "FAQ anniversaire",
    faqs: [
      { q: "Combien coûte une croisière anniversaire en yacht à Istanbul ?", a: "Yacht Essential 2 h dès €280, Premium dès €380. Gâteau ~€80, photographe ~€350-€500, champagne €60-€120. Total soirée €450-€600." },
      { q: "Différence entre anniversaire et demande en mariage ?", a: "L'anniversaire célèbre un couple établi — pas de surprise, plus l'accent sur dîner, photo heure dorée, et points marquants du parcours. La demande en mariage est construite autour d'un moment caché. Mêmes yachts, programme différent." },
      { q: "Pouvez-vous synchroniser avec notre date de mariage ?", a: "Oui. Nous calons l'horaire selon votre date + l'heure du coucher de soleil de ce jour à Istanbul. Été : embarquement 19h30. Hiver : 16h00. Envoyez date + demandes spéciales, nous adaptons route et timing." },
      { q: "Pouvons-nous combiner gâteau + photographe + violoniste ?", a: "Oui — combinaison la plus demandée. Options courantes : gâteau personnalisé avec nombre d'années, photographe pro (50+ photos sous 7 jours), violoniste à l'embarquement, bouquet, service champagne, dîner multi-services." },
    ],
    ctaHeading: "Planifiez votre soirée anniversaire",
    ctaBody: "Envoyez votre date de mariage, taille du groupe (couple ou famille) et les options prioritaires (gâteau, photographe, dîner, musique). Devis programme complet sous 24 h.",
    ctaPrimary: "Voir la flotte de yachts",
    ctaWhatsapp: "Envoyer le briefing anniversaire par WhatsApp",
    whatsappPrefill: "Bonjour MerrySails ! Nous voulons réserver un yacht pour un anniversaire de mariage sur le Bosphore. Date du mariage : [date], groupe [N]. Nous voudrions [gâteau/dîner/photographe/musique].",
    trustLine: `Opéré sous Meryem Yıldız Travel · Licence TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ voyageurs sur le Bosphore depuis 2001.`,
    reserveLabel: "Devis dès €280",
  },
  nl: {
    metaTitle: "Trouwdag Jacht Istanbul — Bosporus",
    metaDescription:
      "Privé jacht voor trouwdag op de Bosporus. 2-uurs charter vanaf €280, taart, fotograaf, zonsondergangs-timing. TÜRSAB A-licentie sinds 2001.",
    canonicalPath: "/nl/anniversary-yacht-cruise-istanbul",
    eyebrow: "Trouwdag · Privé-jacht · Bosporus",
    h1: "Trouwdag Jacht Cruise Istanbul",
    intro:
      "Privé jachtcharter op de Bosporus voor stellen die hun trouwdag vieren. 2-uurs basis-charter op onze Essential-jacht vanaf €280, Premium met groter dek vanaf €380. Taart, fotograaf, champagneservice optioneel.",
    capsule:
      "De trouwdag jachtcruise in Istanbul is bedoeld voor gevestigde stellen — geen verrassings-mechaniek, maar gedeelde herinnering + foto-focus. 2-uurs charter vanaf €280; taart (~€80), fotograaf, violist optioneel. Route aanpasbaar — bv. langs uw huwelijksreishotel in Beşiktaş varen.",
    reasonsHeading: "Waarom dit formaat past bij een trouwdag",
    reasons: [
      { icon: Heart, title: "Privacy alleen voor het stel", desc: "Het jacht is alleen voor u. Tempo, muziek, diner-timing worden rond uw moment gepland — geen vreemde gasten." },
      { icon: Calendar, title: "Timing rond UW trouwdatum", desc: "Zonsondergangs-uur, route, instaptijd worden rond de specifieke dag gepland. Zomer: instappen 19:30. Winter: 16:00." },
      { icon: Camera, title: "Fotogenieke Bosporus-skyline", desc: "Zuidelijke Bosporus-route passeert Dolmabahçe, Ortaköy, 1e Bosporusbrug, Rumeli Hisarı — het fotogeniekste uur van de Istanbul-dag." },
      { icon: Cake, title: "Taart, diner, muziek — opties", desc: "Taart met aantal jaren, meergangenmaaltijd, professionele fotograaf (50+ bewerkte foto's in 7 dagen), violist bij boarding, boeket — op verzoek." },
    ],
    faqHeading: "Trouwdag FAQ",
    faqs: [
      { q: "Wat kost een trouwdag-jachtcruise in Istanbul?", a: "Essential jacht 2 uur vanaf €280, Premium vanaf €380. Taart ~€80, fotograaf ~€350-€500, champagne €60-€120. Totale avond €450-€600." },
      { q: "Verschil trouwdag vs huwelijksaanzoek?", a: "Trouwdag viert een bestaand stel — geen verrassing nodig, meer nadruk op diner, gouden-uur-foto, route-hoogtepunten. Huwelijksaanzoek draait om een verborgen moment. Zelfde jachts, ander programma." },
      { q: "Kunnen jullie rond onze trouwdatum plannen?", a: "Ja. We plannen rond uw specifieke datum + de zonsondergangs-tijd van die dag in Istanbul. Zomer: instappen 19:30. Winter: 16:00. Stuur datum + speciale wensen, wij regelen route en timing." },
      { q: "Kunnen we taart + fotograaf + violist combineren?", a: "Ja — de meest gevraagde combinatie. Veelvoorkomende opties: taart met aantal jaren, professionele fotograaf (50+ bewerkte foto's in 7 dagen), violist bij boarding, boeket, champagneservice, meergangenmaaltijd." },
    ],
    ctaHeading: "Plan uw trouwdag-avond",
    ctaBody: "Stuur uw trouwdatum, groepsgrootte (stel of familie) en uw prioriteits-opties (taart, fotograaf, diner, muziek). Compleet programma-aanbod binnen 24 u.",
    ctaPrimary: "Bekijk de jachtvloot",
    ctaWhatsapp: "Stuur trouwdag-briefing via WhatsApp",
    whatsappPrefill: "Hallo MerrySails! We willen een jacht boeken voor onze trouwdag op de Bosporus. Trouwdatum: [datum], groep [N]. We willen [taart/diner/fotograaf/muziek].",
    trustLine: `Geëxploiteerd onder Meryem Yıldız Travel · TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER} · 50.000+ gasten op de Bosporus sinds 2001.`,
    reserveLabel: "Offerte vanaf €280",
  },
  ru: {
    metaTitle: "Годовщина Свадьбы Яхта Стамбул — Босфор",
    metaDescription:
      "Частная яхта для годовщины свадьбы на Босфоре. 2 часа от €280, торт, фотограф, тайминг заката. Лицензия TÜRSAB A с 2001.",
    canonicalPath: "/ru/anniversary-yacht-cruise-istanbul",
    eyebrow: "Годовщина · Частная яхта · Босфор",
    h1: "Круиз на Годовщину Свадьбы — Яхта Стамбул",
    intro:
      "Частная аренда яхты на Босфоре для пар, празднующих годовщину свадьбы. Базовый 2-часовой чартер на нашей яхте Essential от €280, Premium с расширенной палубой от €380. Торт, фотограф, шампанское — опционально.",
    capsule:
      "Аренда яхты на годовщину свадьбы в Стамбуле создана для устоявшихся пар — без механики сюрприза, с акцентом на совместное воспоминание и фото. 2-часовой чартер от €280; торт (~€80), фотограф, скрипач — по желанию. Маршрут персонализируется — например, проход мимо отеля в Бешикташе, где вы жили в медовый месяц.",
    reasonsHeading: "Почему этот формат подходит для годовщины",
    reasons: [
      { icon: Heart, title: "Приватность только для пары", desc: "Яхта зарезервирована только для вас. Темп, музыка, время ужина планируются вокруг вашего момента — без посторонних гостей." },
      { icon: Calendar, title: "Тайминг под ВАШУ дату свадьбы", desc: "Время заката, маршрут, посадка планируются вокруг конкретной даты. Лето: посадка 19:30. Зима: 16:00." },
      { icon: Camera, title: "Фотогеничный силуэт Босфора", desc: "Южный маршрут Босфора проходит Долмабахче, Ортакёй, 1-й Босфорский мост, Румелихисар — самый фотогеничный час дня в Стамбуле." },
      { icon: Cake, title: "Торт, ужин, музыка — опции", desc: "Торт с количеством лет, многокурсовый ужин, профессиональный фотограф (50+ обработанных фото за 7 дней), скрипач при посадке, букет — по запросу." },
    ],
    faqHeading: "FAQ годовщина",
    faqs: [
      { q: "Сколько стоит круиз на годовщину свадьбы в Стамбуле?", a: "Яхта Essential 2 часа от €280, Premium от €380. Торт ~€80, фотограф ~€350-€500, шампанское €60-€120. Общий вечер €450-€600." },
      { q: "Чем годовщина отличается от круиза с предложением руки?", a: "Годовщина празднует уже существующую пару — без сюрприза, акцент на ужин, фото золотого часа, точки маршрута. Круиз с предложением строится вокруг скрытого момента. Те же яхты, разная программа." },
      { q: "Можете ли вы спланировать вокруг даты нашей свадьбы?", a: "Да. Планируем по вашей конкретной дате + времени заката в Стамбуле в этот день. Лето: посадка 19:30. Зима: 16:00. Отправьте дату + особые пожелания — мы настроим маршрут и тайминг." },
      { q: "Можно ли совместить торт + фотограф + скрипач?", a: "Да — самая запрашиваемая комбинация. Обычные опции: торт с количеством лет, профессиональный фотограф (50+ обработанных фото за 7 дней), скрипач при посадке, букет, шампанское, многокурсовый ужин." },
    ],
    ctaHeading: "Спланируйте вечер годовщины",
    ctaBody: "Отправьте дату свадьбы, размер группы (пара или семья) и приоритетные опции (торт, фотограф, ужин, музыка). Полный план в течение 24 часов.",
    ctaPrimary: "Посмотреть флот яхт",
    ctaWhatsapp: "Отправить бриф годовщины через Telegram",
    whatsappPrefill: "Здравствуйте, MerrySails! Хотим заказать яхту на годовщину свадьбы на Босфоре. Дата свадьбы: [дата], группа [N]. Хотим [торт/ужин/фотограф/музыка].",
    trustLine: `Управляется Meryem Yıldız Travel · Лицензия TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ гостей на Босфоре с 2001 года.`,
    reserveLabel: "Запросить от €280",
  },
};

export async function generateStaticParams() {
  return Object.keys(CONTENT).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") return {};
  const c = CONTENT[locale];
  if (!c) return {};
  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: canonicalUrl, languages: buildHreflang("/anniversary-yacht-cruise-istanbul") },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: canonicalUrl, type: "article" },
  };
}

export default async function LocaleAnniversaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const c = CONTENT[locale];
  if (!c) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".answer-capsule"] },
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.h1,
    serviceType: "Private yacht charter for anniversaries",
    description: c.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    offers: { "@type": "Offer", url: `${SITE_URL}${c.canonicalPath}`, price: "280", priceCurrency: "EUR", availability: "https://schema.org/InStock", validFrom: "2026-01-01" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
        <div className="container-main max-w-4xl">
          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">{c.eyebrow}</p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">{c.h1}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">{c.intro}</p>
          </header>

          <SocialProofBadges variant="product" productKey="yacht" locale={locale as SiteLocale} className="mb-6" />
          <LiveBookingCounter locale={locale as SiteLocale} className="mb-4" />

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">{c.capsule}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.reasonsHeading}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {c.reasons.map((r) => (
                <div key={r.title} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <r.icon className="h-5 w-5 text-[var(--brand-primary)]" />
                    <h3 className="text-base font-semibold text-[var(--heading)]">{r.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.faqHeading}</h2>
            <div className="space-y-3">
              {c.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <summary className="cursor-pointer list-none font-semibold text-[var(--heading)]">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="my-8"><ReviewsCarousel productKey="yacht" locale={locale as SiteLocale} /></div>

          <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
            <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">{c.ctaHeading}</h2>
            <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">{c.ctaBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/yacht-charter-istanbul#fleet`} className="btn-cta !px-6 !py-3">
                {c.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappPrefill)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5">
                {c.ctaWhatsapp}
              </a>
            </div>
            <p className="mt-3 text-xs italic text-[var(--text-muted)]">{c.trustLine}</p>
          </section>
        </div>
      </main>
      <StickyMobileCta reserveHref={`/${locale}/yacht-charter-istanbul#fleet`} reserveLabel={c.reserveLabel} locale={locale as SiteLocale} whatsappLocation={`locale_anniversary_${locale}`} whatsappPrefill={c.whatsappPrefill} />
    </>
  );
}
