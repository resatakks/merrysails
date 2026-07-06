import {
  GBP_REVIEW_URL,
  PHONE_DISPLAY,
  SITE_URL,
} from "@/lib/constants";
import { emailHead, emailLegalFooter, escapeHtml } from "./helpers";

/**
 * Post-trip review + returning-guest cross-sell EMAIL (MerrySails / boat).
 *
 * Sent ~6h after the cruise/tour ends. Goal: a single, well-designed message —
 * satisfaction line + review buttons (Google now; Trustpilot when a profile
 * exists) + a returning-guest 10% discount (WELCOMEBACK10, honored MANUALLY by
 * the operator over WhatsApp) + own-cruise cross-sell + one tasteful sister-brand
 * (Merry Tourism) card + WhatsApp & Call buttons.
 *
 * Channel = EMAIL ONLY. The discount-card WhatsApp button carries a pre-filled
 * message so a returning guest can claim WELCOMEBACK10 in one tap; the
 * bottom "Get in touch" contact button stays text-free (bare wa.me) so the
 * customer writes their own message — the operator matches them by WhatsApp
 * number (= customerPhone).
 */

export const DISCOUNT_CODE = "WELCOMEBACK10";

/**
 * Locales the post-trip review email is translated into. These mirror the
 * project's SUPPORTED_LOCALES (src/i18n/config.ts). The cron derives a locale
 * from customerCountry and resolves it to one of these keys — anything we do
 * NOT translate here falls back to `en` (the guaranteed fallback). `en` MUST
 * always be present.
 *
 * `sa` = Arabic (rendered right-to-left). `zh` = Simplified Chinese.
 */
export type ReviewLocale =
  | "en"
  | "tr"
  | "de"
  | "es"
  | "fr"
  | "it"
  | "pt"
  | "ru"
  | "hu"
  | "nl"
  | "sa"
  | "el"
  | "zh";

/**
 * Every locale the email has a translation for. The cron uses this to decide
 * whether a derived locale is supported (else it falls back to `en`).
 * Kept in sync with the COPY keys below — `en` MUST always be included.
 */
export const REVIEW_LOCALES: readonly ReviewLocale[] = [
  "en",
  "tr",
  "de",
  "es",
  "fr",
  "it",
  "pt",
  "ru",
  "hu",
  "nl",
  "sa",
  "el",
  "zh",
];

/** Narrowing guard: does the email have a translation for `value`? */
export function isReviewLocale(value: string): value is ReviewLocale {
  return (REVIEW_LOCALES as readonly string[]).includes(value);
}

/** Locales whose copy renders right-to-left (Arabic). */
const RTL_REVIEW_LOCALES: ReadonlySet<ReviewLocale> = new Set(["sa"]);

/**
 * ───────────────────────── LINK-LOCALE RESOLUTION ─────────────────────────
 * The email COPY is translated into all REVIEW_LOCALES, but the HREF locale
 * must be one that actually resolves 200 on the live site — otherwise the
 * cross-sell buttons 404/410 and we ship dead links to a returning guest.
 *
 * OWN SITE (merrysails.com): the [locale] layout `notFound()`s any locale not
 * in ACTIVE_LOCALES (en,tr,de,fr,nl,ru,zh) and EN is served at the bare root.
 * BUT the cross-sell buttons include the `/cruises` index route, which on the
 * CURRENT production build is only present for en,tr,de,fr,nl — `/ru/cruises`
 * and `/zh/cruises` 404 today (route built before ru/zh went active; other
 * ru/zh routes are 200). Verified 2026-06-25 by curl against www.merrysails.com.
 * So we gate own-site links to the locales verified-live across EVERY linked
 * path. This is intentionally a subset of ACTIVE_LOCALES; when ru/zh `/cruises`
 * deploys, add them here. Everything else (es,it,pt,hu,sa,el + ru,zh for now)
 * falls back to `en` (served at root, guaranteed 200).
 */
const OWN_ROUTABLE_LOCALES: ReadonlySet<ReviewLocale> = new Set([
  "en",
  "tr",
  "de",
  "fr",
  "nl",
]);

/** Own-site href locale: keep the customer locale only if it is routable, else en. */
function ownLinkLocale(locale: ReviewLocale): ReviewLocale {
  return OWN_ROUTABLE_LOCALES.has(locale) ? locale : "en";
}

/**
 * SISTER SITE (Merry Tourism, merrytourism.com): MT uses next-intl
 * `localePrefix:'always'` and serves tr/en/de/es/fr/ru/zh (it,pt,nl,hu,sa,el
 * are 410 Gone there). MT's default `tr` is at /tr (NOT root). We mirror
 * GoldenSunset's conservative mapping: TR guests → /tr, DE guests → /de,
 * everyone else → /en. All three verified live below.
 */
function merryTourismUrlFor(locale: ReviewLocale): string {
  if (locale === "tr") return "https://www.merrytourism.com/tr";
  if (locale === "de") return "https://www.merrytourism.com/de";
  return "https://www.merrytourism.com/en";
}

/**
 * Appends the post-trip-review UTM set to an OWN-site or SISTER-BRAND
 * pageview link so GA4/Clarity can attribute sessions/conversions back to
 * this email. `contentSlug` should be a short, distinct identifier per link
 * (e.g. "own_cruises", "sister_merrytourism") so each button is individually
 * attributable in GA4 landing-page + UTM reports.
 *
 * Deliberately NOT applied to Trustpilot/Google review links — those are
 * third-party sites our own analytics never sees, so a UTM there is dead
 * weight (see reviewButtonsRow, unchanged).
 *
 * Defensive `?`/`&` handling: every URL fed into this today (own routes +
 * merryTourismUrlFor) is a clean path with no existing query string, but this
 * checks for one anyway so a future URL with its own `?param=` doesn't break.
 */
function withUtm(url: string, contentSlug: string): string {
  const separator = url.includes("?") ? "&" : "?";
  const utm =
    "utm_source=email&utm_medium=post_trip_review&utm_campaign=welcomeback10" +
    `&utm_content=${encodeURIComponent(contentSlug)}`;
  return `${url}${separator}${utm}`;
}

export interface PostTripReviewData {
  customerName: string;
  tourName: string;
  /** Localised, human-readable trip date (already formatted). */
  date: string;
  time: string;
  locale: ReviewLocale;
  /** Google Business Profile write-review URL. */
  googleReviewUrl?: string;
  /** Trustpilot write-review URL — omitted (button hidden) until a profile exists. */
  trustpilotUrl?: string;
}

interface Copy {
  subject: string;
  preheader: string;
  tagline: string;
  badge: string;
  greeting: (name: string) => string;
  tripLine: (tour: string) => string;
  reviewHeading: string;
  reviewSub: string;
  googleBtn: string;
  trustpilotBtn: string;
  discountTitle: string;
  discountBody: string;
  whatsappBtn: string;
  whatsappHelper: string;
  /** Pre-filled WhatsApp message for the discount-card claim button. */
  discountWhatsappText: string;
  crossSellHeading: string;
  crossSellBody: string;
  cruisesBtn: string;
  sunsetBtn: string;
  dinnerBtn: string;
  privateYachtBtn: string;
  sisterHeading: string;
  sisterBody: string;
  sisterBtn: string;
  contactHeading: string;
  callBtn: string;
}

const COPY: Record<ReviewLocale, Copy> = {
  en: {
    subject: "How was your trip? A little thank-you inside 🌊",
    preheader:
      "Tell us how it went — and enjoy 10% off your next booking with code WELCOMEBACK10.",
    tagline: "Bosphorus Cruises & Yacht Charter",
    badge: "Welcome back ashore",
    greeting: (name) => `Hi ${name},`,
    tripLine: (tour) =>
      `We hope you had a wonderful time on your <strong>${tour}</strong>. It was a pleasure to have you aboard.`,
    reviewHeading: "How was your experience with us?",
    reviewSub:
      "A quick review helps other travellers find us — and means the world to our small crew.",
    googleBtn: "Review on Google",
    trustpilotBtn: "Review on Trustpilot",
    discountTitle: "10% off your next booking",
    discountBody:
      "As a returning guest, here is a little thank-you for your next cruise or charter with us:",
    whatsappBtn: "Message us on WhatsApp",
    whatsappHelper:
      "Just mention code WELCOMEBACK10 in your message — our team will apply your 10%.",
    discountWhatsappText:
      "Hi! I'd like to use my WELCOMEBACK10 code for 10% off my next booking.",
    crossSellHeading: "Sail with us again",
    crossSellBody:
      "Loved being on the water? Here are a couple of guest favourites — your 10% applies to both.",
    cruisesBtn: "Browse all cruises",
    sunsetBtn: "Bosphorus Sunset Cruise",
    dinnerBtn: "Bosphorus Dinner Cruise",
    privateYachtBtn: "Browse private yacht",
    sisterHeading: "Need an airport transfer or a private tour?",
    sisterBody:
      "Our sister brand Merry Tourism handles VIP airport transfers, private car tours and group tours in Istanbul — and your WELCOMEBACK10 works there too for 10% off.",
    sisterBtn: "Visit Merry Tourism",
    contactHeading: "We are here whenever you need us",
    callBtn: "Call us",
  },
  tr: {
    subject: "Geziniz nasıldı? İçeride küçük bir teşekkür var 🌊",
    preheader:
      "Nasıl geçtiğini bize anlatın — bir sonraki rezervasyonunuzda WELCOMEBACK10 ile %10 indirim sizi bekliyor.",
    tagline: "Boğaz Turları & Yat Kiralama",
    badge: "Tekrar görüşmek üzere",
    greeting: (name) => `Merhaba ${name},`,
    tripLine: (tour) =>
      `<strong>${tour}</strong> deneyiminizden keyif aldığınızı umuyoruz. Sizi aramızda görmek bizim için bir zevkti.`,
    reviewHeading: "Bizimle deneyiminiz nasıldı?",
    reviewSub:
      "Kısa bir yorum, diğer misafirlerin bizi bulmasına yardımcı olur — ve küçük ekibimiz için çok değerli.",
    googleBtn: "Google'da yorum yap",
    trustpilotBtn: "Trustpilot'ta yorum yap",
    discountTitle: "Bir sonraki rezervasyonunuzda %10 indirim",
    discountBody:
      "Geri dönen misafirimiz olarak, bir sonraki tur veya kiralamanız için küçük bir teşekkür:",
    whatsappBtn: "WhatsApp'tan bize yazın",
    whatsappHelper:
      "Mesajınızda sadece WELCOMEBACK10 kodunu belirtmeniz yeterli — ekibimiz %10 indiriminizi uygular.",
    discountWhatsappText:
      "Merhaba! Bir sonraki rezervasyonumda %10 indirim için WELCOMEBACK10 kodumu kullanmak istiyorum.",
    crossSellHeading: "Tekrar denize açılın",
    crossSellBody:
      "Denizde olmayı sevdiniz mi? İşte misafirlerimizin favorilerinden birkaçı — %10 indiriminiz ikisinde de geçerli.",
    cruisesBtn: "Tüm turlara göz atın",
    sunsetBtn: "Boğaz Gün Batımı Turu",
    dinnerBtn: "Boğaz Akşam Yemeği Turu",
    privateYachtBtn: "Özel yata göz atın",
    sisterHeading: "Havalimanı transferi veya özel tur mu lazım?",
    sisterBody:
      "Kardeş markamız Merry Tourism, İstanbul'da VIP havalimanı transferleri, özel araç turları ve grup turları sunuyor — WELCOMEBACK10 kodunuz orada da %10 indirim için geçerli.",
    sisterBtn: "Merry Tourism'i ziyaret et",
    contactHeading: "İhtiyacınız olduğunda buradayız",
    callBtn: "Bizi arayın",
  },
  de: {
    subject: "Wie war Ihr Ausflug? Ein kleines Dankeschön wartet 🌊",
    preheader:
      "Erzählen Sie uns, wie es war — und sichern Sie sich 10% Rabatt auf Ihre nächste Buchung mit dem Code WELCOMEBACK10.",
    tagline: "Bosporus-Fahrten & Yachtcharter",
    badge: "Willkommen zurück an Land",
    greeting: (name) => `Hallo ${name},`,
    tripLine: (tour) =>
      `Wir hoffen, Sie hatten eine wundervolle Zeit bei Ihrer <strong>${tour}</strong>. Es war uns eine Freude, Sie an Bord zu haben.`,
    reviewHeading: "Wie war Ihr Erlebnis bei uns?",
    reviewSub:
      "Eine kurze Bewertung hilft anderen Reisenden, uns zu finden — und bedeutet unserer kleinen Crew die Welt.",
    googleBtn: "Auf Google bewerten",
    trustpilotBtn: "Auf Trustpilot bewerten",
    discountTitle: "10% Rabatt auf Ihre nächste Buchung",
    discountBody:
      "Als wiederkehrender Gast erhalten Sie ein kleines Dankeschön für Ihre nächste Fahrt oder Charter bei uns:",
    whatsappBtn: "Schreiben Sie uns auf WhatsApp",
    whatsappHelper:
      "Nennen Sie einfach den Code WELCOMEBACK10 in Ihrer Nachricht — unser Team gewährt Ihnen die 10%.",
    discountWhatsappText:
      "Hallo! Ich möchte meinen Code WELCOMEBACK10 für 10% Rabatt auf meine nächste Buchung nutzen.",
    crossSellHeading: "Stechen Sie wieder mit uns in See",
    crossSellBody:
      "Hat Ihnen die Zeit auf dem Wasser gefallen? Hier sind ein paar Favoriten unserer Gäste — Ihre 10% gelten für beide.",
    cruisesBtn: "Alle Fahrten ansehen",
    sunsetBtn: "Bosporus Sonnenuntergang",
    dinnerBtn: "Bosporus Dinnerfahrt",
    privateYachtBtn: "Private Yacht ansehen",
    sisterHeading: "Brauchen Sie einen Flughafentransfer oder eine Privattour?",
    sisterBody:
      "Unsere Schwestermarke Merry Tourism bietet VIP-Flughafentransfers, private Autotouren und Gruppentouren in Istanbul — und Ihr WELCOMEBACK10 gilt dort ebenfalls für 10% Rabatt.",
    sisterBtn: "Merry Tourism besuchen",
    contactHeading: "Wir sind für Sie da, wann immer Sie uns brauchen",
    callBtn: "Rufen Sie uns an",
  },
  es: {
    subject: "¿Qué tal tu experiencia? Un pequeño agradecimiento dentro 🌊",
    preheader:
      "Cuéntanos cómo fue — y disfruta de un 10% de descuento en tu próxima reserva con el código WELCOMEBACK10.",
    tagline: "Cruceros por el Bósforo y alquiler de yates",
    badge: "Bienvenido de nuevo a tierra",
    greeting: (name) => `Hola ${name},`,
    tripLine: (tour) =>
      `Esperamos que hayas pasado un momento maravilloso en tu <strong>${tour}</strong>. Fue un placer tenerte a bordo.`,
    reviewHeading: "¿Qué tal tu experiencia con nosotros?",
    reviewSub:
      "Una reseña rápida ayuda a otros viajeros a encontrarnos — y significa mucho para nuestra pequeña tripulación.",
    googleBtn: "Reseñar en Google",
    trustpilotBtn: "Reseñar en Trustpilot",
    discountTitle: "10% de descuento en tu próxima reserva",
    discountBody:
      "Como cliente que regresa, aquí tienes un pequeño agradecimiento para tu próximo crucero o alquiler con nosotros:",
    whatsappBtn: "Escríbenos por WhatsApp",
    whatsappHelper:
      "Solo menciona el código WELCOMEBACK10 en tu mensaje — nuestro equipo aplicará tu 10%.",
    discountWhatsappText:
      "¡Hola! Me gustaría usar mi código WELCOMEBACK10 para un 10% de descuento en mi próxima reserva.",
    crossSellHeading: "Navega con nosotros otra vez",
    crossSellBody:
      "¿Te encantó estar en el agua? Aquí tienes un par de favoritos de nuestros clientes — tu 10% aplica a ambos.",
    cruisesBtn: "Ver todos los cruceros",
    sunsetBtn: "Crucero al atardecer",
    dinnerBtn: "Crucero con cena",
    privateYachtBtn: "Ver yate privado",
    sisterHeading: "¿Necesitas un traslado al aeropuerto o un tour privado?",
    sisterBody:
      "Nuestra marca hermana Merry Tourism ofrece traslados VIP al aeropuerto, tours privados en coche y tours en grupo en Estambul — y tu WELCOMEBACK10 también sirve allí para un 10% de descuento.",
    sisterBtn: "Visitar Merry Tourism",
    contactHeading: "Estamos aquí siempre que nos necesites",
    callBtn: "Llámanos",
  },
  fr: {
    subject: "Comment était votre sortie ? Un petit merci à l'intérieur 🌊",
    preheader:
      "Dites-nous comment ça s'est passé — et profitez de 10% de réduction sur votre prochaine réservation avec le code WELCOMEBACK10.",
    tagline: "Croisières sur le Bosphore & location de yachts",
    badge: "Bon retour à terre",
    greeting: (name) => `Bonjour ${name},`,
    tripLine: (tour) =>
      `Nous espérons que vous avez passé un moment merveilleux lors de votre <strong>${tour}</strong>. Ce fut un plaisir de vous avoir à bord.`,
    reviewHeading: "Comment s'est passée votre expérience avec nous ?",
    reviewSub:
      "Un court avis aide d'autres voyageurs à nous trouver — et compte énormément pour notre petite équipe.",
    googleBtn: "Donner un avis sur Google",
    trustpilotBtn: "Donner un avis sur Trustpilot",
    discountTitle: "10% de réduction sur votre prochaine réservation",
    discountBody:
      "En tant que client fidèle, voici un petit merci pour votre prochaine croisière ou location avec nous :",
    whatsappBtn: "Écrivez-nous sur WhatsApp",
    whatsappHelper:
      "Mentionnez simplement le code WELCOMEBACK10 dans votre message — notre équipe appliquera vos 10%.",
    discountWhatsappText:
      "Bonjour ! Je souhaite utiliser mon code WELCOMEBACK10 pour 10% de réduction sur ma prochaine réservation.",
    crossSellHeading: "Reprenez la mer avec nous",
    crossSellBody:
      "Vous avez aimé être sur l'eau ? Voici quelques favoris de nos clients — vos 10% s'appliquent aux deux.",
    cruisesBtn: "Voir toutes les croisières",
    sunsetBtn: "Croisière au coucher du soleil",
    dinnerBtn: "Croisière dîner",
    privateYachtBtn: "Voir le yacht privé",
    sisterHeading: "Besoin d'un transfert aéroport ou d'un tour privé ?",
    sisterBody:
      "Notre marque sœur Merry Tourism propose des transferts aéroport VIP, des tours privés en voiture et des tours en groupe à Istanbul — et votre WELCOMEBACK10 y donne aussi droit à 10% de réduction.",
    sisterBtn: "Visiter Merry Tourism",
    contactHeading: "Nous sommes là dès que vous avez besoin de nous",
    callBtn: "Appelez-nous",
  },
  it: {
    subject: "Com'è andata la tua esperienza? Un piccolo grazie all'interno 🌊",
    preheader:
      "Raccontaci com'è andata — e goditi il 10% di sconto sulla tua prossima prenotazione con il codice WELCOMEBACK10.",
    tagline: "Crociere sul Bosforo e noleggio yacht",
    badge: "Bentornato a terra",
    greeting: (name) => `Ciao ${name},`,
    tripLine: (tour) =>
      `Speriamo tu abbia trascorso un momento meraviglioso durante la tua <strong>${tour}</strong>. È stato un piacere averti a bordo.`,
    reviewHeading: "Com'è stata la tua esperienza con noi?",
    reviewSub:
      "Una breve recensione aiuta altri viaggiatori a trovarci — e significa moltissimo per il nostro piccolo equipaggio.",
    googleBtn: "Recensisci su Google",
    trustpilotBtn: "Recensisci su Trustpilot",
    discountTitle: "10% di sconto sulla tua prossima prenotazione",
    discountBody:
      "Come cliente di ritorno, ecco un piccolo grazie per la tua prossima crociera o noleggio con noi:",
    whatsappBtn: "Scrivici su WhatsApp",
    whatsappHelper:
      "Basta menzionare il codice WELCOMEBACK10 nel tuo messaggio — il nostro team applicherà il tuo 10%.",
    discountWhatsappText:
      "Ciao! Vorrei usare il mio codice WELCOMEBACK10 per il 10% di sconto sulla mia prossima prenotazione.",
    crossSellHeading: "Torna a navigare con noi",
    crossSellBody:
      "Ti è piaciuto stare sull'acqua? Ecco un paio di preferiti dei nostri clienti — il tuo 10% vale per entrambi.",
    cruisesBtn: "Sfoglia tutte le crociere",
    sunsetBtn: "Crociera al tramonto",
    dinnerBtn: "Crociera con cena",
    privateYachtBtn: "Sfoglia yacht privato",
    sisterHeading: "Ti serve un transfer aeroportuale o un tour privato?",
    sisterBody:
      "Il nostro marchio gemello Merry Tourism offre transfer aeroportuali VIP, tour privati in auto e tour di gruppo a Istanbul — e il tuo WELCOMEBACK10 vale anche lì per il 10% di sconto.",
    sisterBtn: "Visita Merry Tourism",
    contactHeading: "Siamo qui ogni volta che hai bisogno di noi",
    callBtn: "Chiamaci",
  },
  pt: {
    subject: "Como foi a sua experiência? Um pequeno agradecimento por dentro 🌊",
    preheader:
      "Conte-nos como foi — e aproveite 10% de desconto na sua próxima reserva com o código WELCOMEBACK10.",
    tagline: "Cruzeiros pelo Bósforo e aluguel de iates",
    badge: "Bem-vindo de volta a terra",
    greeting: (name) => `Olá ${name},`,
    tripLine: (tour) =>
      `Esperamos que você tenha tido um momento maravilhoso no seu <strong>${tour}</strong>. Foi um prazer tê-lo a bordo.`,
    reviewHeading: "Como foi a sua experiência conosco?",
    reviewSub:
      "Uma avaliação rápida ajuda outros viajantes a nos encontrar — e significa muito para a nossa pequena tripulação.",
    googleBtn: "Avaliar no Google",
    trustpilotBtn: "Avaliar no Trustpilot",
    discountTitle: "10% de desconto na sua próxima reserva",
    discountBody:
      "Como cliente que retorna, aqui está um pequeno agradecimento para o seu próximo cruzeiro ou aluguel conosco:",
    whatsappBtn: "Fale conosco no WhatsApp",
    whatsappHelper:
      "Basta mencionar o código WELCOMEBACK10 na sua mensagem — nossa equipe aplicará os seus 10%.",
    discountWhatsappText:
      "Olá! Gostaria de usar o meu código WELCOMEBACK10 para 10% de desconto na minha próxima reserva.",
    crossSellHeading: "Navegue conosco novamente",
    crossSellBody:
      "Gostou de estar na água? Aqui estão alguns favoritos dos nossos clientes — os seus 10% valem para ambos.",
    cruisesBtn: "Ver todos os cruzeiros",
    sunsetBtn: "Cruzeiro ao pôr do sol",
    dinnerBtn: "Cruzeiro com jantar",
    privateYachtBtn: "Ver iate privado",
    sisterHeading: "Precisa de um traslado de aeroporto ou um tour privado?",
    sisterBody:
      "Nossa marca irmã Merry Tourism oferece traslados VIP de aeroporto, tours privados de carro e tours em grupo em Istambul — e o seu WELCOMEBACK10 também vale lá para 10% de desconto.",
    sisterBtn: "Visitar Merry Tourism",
    contactHeading: "Estamos aqui sempre que você precisar de nós",
    callBtn: "Ligue para nós",
  },
  ru: {
    subject: "Как прошла ваша поездка? Внутри небольшая благодарность 🌊",
    preheader:
      "Расскажите, как всё прошло — и получите скидку 10% на следующее бронирование по коду WELCOMEBACK10.",
    tagline: "Круизы по Босфору и аренда яхт",
    badge: "С возвращением на берег",
    greeting: (name) => `Здравствуйте, ${name},`,
    tripLine: (tour) =>
      `Надеемся, вы прекрасно провели время на <strong>${tour}</strong>. Нам было приятно видеть вас на борту.`,
    reviewHeading: "Как вам понравилось с нами?",
    reviewSub:
      "Короткий отзыв поможет другим путешественникам найти нас — и очень много значит для нашей небольшой команды.",
    googleBtn: "Оставить отзыв в Google",
    trustpilotBtn: "Оставить отзыв на Trustpilot",
    discountTitle: "Скидка 10% на следующее бронирование",
    discountBody:
      "Как нашему постоянному гостю, вот небольшая благодарность для вашего следующего круиза или аренды с нами:",
    whatsappBtn: "Напишите нам в WhatsApp",
    whatsappHelper:
      "Просто укажите код WELCOMEBACK10 в сообщении — наша команда применит вашу скидку 10%.",
    discountWhatsappText:
      "Здравствуйте! Я хотел бы воспользоваться кодом WELCOMEBACK10 для скидки 10% на следующее бронирование.",
    crossSellHeading: "Выйдите в море с нами снова",
    crossSellBody:
      "Понравилось быть на воде? Вот несколько фаворитов наших гостей — ваши 10% действуют на оба.",
    cruisesBtn: "Все круизы",
    sunsetBtn: "Круиз на закате",
    dinnerBtn: "Круиз с ужином",
    privateYachtBtn: "Частная яхта",
    sisterHeading: "Нужен трансфер из аэропорта или частный тур?",
    sisterBody:
      "Наш дочерний бренд Merry Tourism предлагает VIP-трансферы из аэропорта, частные авто-туры и групповые туры в Стамбуле — и ваш код WELCOMEBACK10 там тоже даёт скидку 10%.",
    sisterBtn: "Перейти на Merry Tourism",
    contactHeading: "Мы всегда рядом, когда мы вам нужны",
    callBtn: "Позвоните нам",
  },
  hu: {
    subject: "Milyen volt az élményed? Egy kis köszönet vár odabent 🌊",
    preheader:
      "Mondd el, milyen volt — és élvezz 10% kedvezményt a következő foglalásodra a WELCOMEBACK10 kóddal.",
    tagline: "Boszporusz-hajózás és jachtbérlés",
    badge: "Üdv újra a szárazföldön",
    greeting: (name) => `Szia ${name},`,
    tripLine: (tour) =>
      `Reméljük, csodálatos időt töltöttél a <strong>${tour}</strong> során. Öröm volt, hogy a fedélzeten üdvözölhettünk.`,
    reviewHeading: "Milyen volt nálunk a tapasztalatod?",
    reviewSub:
      "Egy gyors értékelés segít más utazóknak megtalálni minket — és sokat jelent kis csapatunknak.",
    googleBtn: "Értékelés a Google-on",
    trustpilotBtn: "Értékelés a Trustpiloton",
    discountTitle: "10% kedvezmény a következő foglalásodra",
    discountBody:
      "Visszatérő vendégként íme egy kis köszönet a következő hajóutadhoz vagy bérlésedhez nálunk:",
    whatsappBtn: "Írj nekünk WhatsApp-on",
    whatsappHelper:
      "Csak említsd meg a WELCOMEBACK10 kódot az üzenetedben — csapatunk érvényesíti a 10%-odat.",
    discountWhatsappText:
      "Üdv! Szeretném felhasználni a WELCOMEBACK10 kódomat 10% kedvezményre a következő foglalásomnál.",
    crossSellHeading: "Hajózz velünk újra",
    crossSellBody:
      "Tetszett a vízen lenni? Íme néhány vendégkedvenc — a 10%-od mindkettőre érvényes.",
    cruisesBtn: "Összes hajóút",
    sunsetBtn: "Naplemente hajóút",
    dinnerBtn: "Vacsorás hajóút",
    privateYachtBtn: "Privát jacht",
    sisterHeading: "Reptéri transzferre vagy privát túrára van szükséged?",
    sisterBody:
      "Testvérmárkánk, a Merry Tourism VIP reptéri transzfereket, privát autós túrákat és csoportos túrákat kínál Isztambulban — és a WELCOMEBACK10 kódod ott is 10% kedvezményt ad.",
    sisterBtn: "Merry Tourism megtekintése",
    contactHeading: "Itt vagyunk, amikor csak szükséged van ránk",
    callBtn: "Hívj minket",
  },
  nl: {
    subject: "Hoe was je uitje? Een klein bedankje binnenin 🌊",
    preheader:
      "Vertel ons hoe het ging — en geniet van 10% korting op je volgende boeking met de code WELCOMEBACK10.",
    tagline: "Bosporus-cruises & jachtverhuur",
    badge: "Welkom terug aan wal",
    greeting: (name) => `Hallo ${name},`,
    tripLine: (tour) =>
      `We hopen dat je een geweldige tijd hebt gehad tijdens je <strong>${tour}</strong>. Het was een genoegen je aan boord te hebben.`,
    reviewHeading: "Hoe was je ervaring bij ons?",
    reviewSub:
      "Een korte review helpt andere reizigers ons te vinden — en betekent de wereld voor onze kleine bemanning.",
    googleBtn: "Beoordeel op Google",
    trustpilotBtn: "Beoordeel op Trustpilot",
    discountTitle: "10% korting op je volgende boeking",
    discountBody:
      "Als terugkerende gast krijg je een klein bedankje voor je volgende cruise of charter bij ons:",
    whatsappBtn: "Stuur ons een bericht op WhatsApp",
    whatsappHelper:
      "Vermeld gewoon de code WELCOMEBACK10 in je bericht — ons team past je 10% toe.",
    discountWhatsappText:
      "Hallo! Ik wil graag mijn code WELCOMEBACK10 gebruiken voor 10% korting op mijn volgende boeking.",
    crossSellHeading: "Vaar weer met ons mee",
    crossSellBody:
      "Genoten van het water? Hier zijn een paar favorieten van onze gasten — je 10% geldt voor beide.",
    cruisesBtn: "Bekijk alle cruises",
    sunsetBtn: "Zonsondergangcruise",
    dinnerBtn: "Dinercruise",
    privateYachtBtn: "Bekijk privéjacht",
    sisterHeading: "Een luchthaventransfer of privétour nodig?",
    sisterBody:
      "Ons zustermerk Merry Tourism verzorgt VIP-luchthaventransfers, privé-autotours en groepstours in Istanbul — en je WELCOMEBACK10 geldt daar ook voor 10% korting.",
    sisterBtn: "Bezoek Merry Tourism",
    contactHeading: "We zijn er wanneer je ons nodig hebt",
    callBtn: "Bel ons",
  },
  sa: {
    subject: "كيف كانت تجربتك؟ هدية صغيرة بالداخل 🌊",
    preheader:
      "أخبرنا كيف كانت — واستمتع بخصم 10% على حجزك القادم برمز WELCOMEBACK10.",
    tagline: "رحلات البوسفور وتأجير اليخوت",
    badge: "أهلاً بعودتك إلى البر",
    greeting: (name) => `مرحباً ${name}،`,
    tripLine: (tour) =>
      `نأمل أن تكون قد قضيت وقتاً رائعاً في <strong>${tour}</strong>. كان من دواعي سرورنا استضافتك معنا.`,
    reviewHeading: "كيف كانت تجربتك معنا؟",
    reviewSub:
      "تقييم سريع يساعد المسافرين الآخرين على إيجادنا — ويعني الكثير لفريقنا الصغير.",
    googleBtn: "قيّمنا على Google",
    trustpilotBtn: "قيّمنا على Trustpilot",
    discountTitle: "خصم 10% على حجزك القادم",
    discountBody:
      "بصفتك ضيفاً عائداً، إليك هدية صغيرة لرحلتك أو تأجيرك القادم معنا:",
    whatsappBtn: "راسلنا عبر WhatsApp",
    whatsappHelper:
      "فقط اذكر الرمز WELCOMEBACK10 في رسالتك — وسيطبّق فريقنا خصم الـ 10%.",
    discountWhatsappText:
      "مرحباً! أرغب في استخدام رمز WELCOMEBACK10 للحصول على خصم 10% على حجزي القادم.",
    crossSellHeading: "أبحر معنا من جديد",
    crossSellBody:
      "أحببت التواجد على الماء؟ إليك بعضاً من مفضلات ضيوفنا — خصم الـ 10% يسري على كليهما.",
    cruisesBtn: "تصفّح كل الرحلات",
    sunsetBtn: "رحلة غروب الشمس",
    dinnerBtn: "رحلة العشاء",
    privateYachtBtn: "تصفّح اليخوت الخاصة",
    sisterHeading: "هل تحتاج إلى نقل من المطار أو جولة خاصة؟",
    sisterBody:
      "علامتنا الشقيقة Merry Tourism توفّر خدمات النقل VIP من المطار والجولات الخاصة بالسيارة والجولات الجماعية في إسطنبول — ورمزك WELCOMEBACK10 يمنحك هناك أيضاً خصم 10%.",
    sisterBtn: "زيارة Merry Tourism",
    contactHeading: "نحن هنا متى احتجت إلينا",
    callBtn: "اتصل بنا",
  },
  el: {
    subject: "Πώς ήταν η εμπειρία σας; Ένα μικρό ευχαριστώ μέσα 🌊",
    preheader:
      "Πείτε μας πώς πήγε — και απολαύστε 10% έκπτωση στην επόμενη κράτησή σας με τον κωδικό WELCOMEBACK10.",
    tagline: "Κρουαζιέρες στον Βόσπορο & ενοικίαση σκαφών",
    badge: "Καλώς ορίσατε ξανά στη στεριά",
    greeting: (name) => `Γεια σας ${name},`,
    tripLine: (tour) =>
      `Ελπίζουμε να περάσατε υπέροχα στην <strong>${tour}</strong>. Ήταν χαρά μας που σας είχαμε μαζί μας.`,
    reviewHeading: "Πώς ήταν η εμπειρία σας μαζί μας;",
    reviewSub:
      "Μια γρήγορη αξιολόγηση βοηθά άλλους ταξιδιώτες να μας βρουν — και σημαίνει πολλά για το μικρό μας πλήρωμα.",
    googleBtn: "Αξιολόγηση στο Google",
    trustpilotBtn: "Αξιολόγηση στο Trustpilot",
    discountTitle: "10% έκπτωση στην επόμενη κράτησή σας",
    discountBody:
      "Ως επισκέπτης που επιστρέφει, ορίστε ένα μικρό ευχαριστώ για την επόμενη κρουαζιέρα ή ναύλωσή σας μαζί μας:",
    whatsappBtn: "Στείλτε μας μήνυμα στο WhatsApp",
    whatsappHelper:
      "Απλώς αναφέρετε τον κωδικό WELCOMEBACK10 στο μήνυμά σας — η ομάδα μας θα εφαρμόσει την έκπτωση 10%.",
    discountWhatsappText:
      "Γεια σας! Θα ήθελα να χρησιμοποιήσω τον κωδικό WELCOMEBACK10 για 10% έκπτωση στην επόμενη κράτησή μου.",
    crossSellHeading: "Ταξιδέψτε ξανά μαζί μας",
    crossSellBody:
      "Σας άρεσε να είστε στο νερό; Ορίστε μερικά αγαπημένα των επισκεπτών μας — η έκπτωση 10% ισχύει και για τα δύο.",
    cruisesBtn: "Δείτε όλες τις κρουαζιέρες",
    sunsetBtn: "Κρουαζιέρα ηλιοβασιλέματος",
    dinnerBtn: "Κρουαζιέρα με δείπνο",
    privateYachtBtn: "Δείτε ιδιωτικό σκάφος",
    sisterHeading: "Χρειάζεστε μεταφορά από το αεροδρόμιο ή ιδιωτική ξενάγηση;",
    sisterBody:
      "Η αδελφή μας μάρκα Merry Tourism προσφέρει VIP μεταφορές αεροδρομίου, ιδιωτικές ξεναγήσεις με αυτοκίνητο και ομαδικές εκδρομές στην Κωνσταντινούπολη — και ο κωδικός WELCOMEBACK10 ισχύει κι εκεί για 10% έκπτωση.",
    sisterBtn: "Επισκεφθείτε το Merry Tourism",
    contactHeading: "Είμαστε εδώ όποτε μας χρειαστείτε",
    callBtn: "Καλέστε μας",
  },
  zh: {
    subject: "您的旅程怎么样？里面有一份小心意 🌊",
    preheader: "告诉我们体验如何——并使用优惠码 WELCOMEBACK10 享受下次预订 9 折优惠。",
    tagline: "博斯普鲁斯海峡游船与游艇租赁",
    badge: "欢迎回到岸上",
    greeting: (name) => `您好 ${name}，`,
    tripLine: (tour) =>
      `希望您在 <strong>${tour}</strong> 中度过了美好的时光。很高兴有您同行。`,
    reviewHeading: "您与我们的体验如何？",
    reviewSub:
      "一条简短的评价能帮助其他旅客找到我们——对我们这支小团队意义非凡。",
    googleBtn: "在 Google 上评价",
    trustpilotBtn: "在 Trustpilot 上评价",
    discountTitle: "下次预订享 9 折优惠",
    discountBody:
      "作为回头客，这是我们为您下次游船或租赁准备的一份小心意：",
    whatsappBtn: "通过 WhatsApp 联系我们",
    whatsappHelper:
      "只需在消息中注明优惠码 WELCOMEBACK10——我们的团队将为您享受 9 折优惠。",
    discountWhatsappText:
      "您好！我想使用我的 WELCOMEBACK10 优惠码，为下次预订享受 9 折优惠。",
    crossSellHeading: "再次与我们出海",
    crossSellBody:
      "喜欢在水上的时光吗？这里有几款客人最爱——您的 9 折优惠两者皆可使用。",
    cruisesBtn: "浏览所有游船",
    sunsetBtn: "日落游船",
    dinnerBtn: "晚餐游船",
    privateYachtBtn: "浏览私人游艇",
    sisterHeading: "需要机场接送或私人导览吗？",
    sisterBody:
      "我们的姊妹品牌 Merry Tourism 在伊斯坦布尔提供 VIP 机场接送、私人包车游览和团体游览——您的 WELCOMEBACK10 在那里同样享 9 折优惠。",
    sisterBtn: "访问 Merry Tourism",
    contactHeading: "随时为您服务",
    callBtn: "致电我们",
  },
};

/**
 * Single source of truth accessor for the pre-filled discount-claim WhatsApp
 * message, per locale. Both this email builder AND the /track/review-click
 * tracker page (src/lib/review-email-constants.ts) resolve the message
 * through this function so the two can never drift out of sync — the tracker
 * page imports it instead of hardcoding its own copy of the strings.
 */
export function getDiscountWhatsappText(locale: ReviewLocale): string {
  return COPY[locale].discountWhatsappText;
}

function reviewButtonsRow(c: Copy, googleUrl?: string, trustpilotUrl?: string): string {
  const buttons: string[] = [];
  if (trustpilotUrl) {
    buttons.push(
      `<a href="${escapeHtml(trustpilotUrl)}" style="display:inline-block;background:#00b67a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 10px;">${escapeHtml(c.trustpilotBtn)}</a>`
    );
  }
  if (googleUrl) {
    buttons.push(
      `<a href="${escapeHtml(googleUrl)}" style="display:inline-block;background:#4285F4;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700;font-size:14px;margin:0 6px 10px;">${escapeHtml(c.googleBtn)}</a>`
    );
  }
  return buttons.join("");
}

export function postTripReviewEmail(data: PostTripReviewData): {
  subject: string;
  html: string;
} {
  const c = COPY[data.locale];
  const firstName = (data.customerName?.trim().split(/\s+/)[0] || "there").trim();
  const googleUrl = data.googleReviewUrl ?? GBP_REVIEW_URL;
  const trustpilotUrl = data.trustpilotUrl;
  // EN is served at the SITE ROOT with NO /en/ prefix — the [locale] layout
  // excludes 'en' and notFound()s it. Building /en/... here 404s for every
  // non-TR recipient (the majority). Prefix only the locales that actually
  // render under /<locale>/ (tr). Each path below is verified to resolve to a
  // live page (no notFound, no redirect) for BOTH en-root and the tr prefix:
  //   /cruises                         → src/app/cruises/page.tsx
  //                                      + src/app/[locale]/cruises/page.tsx
  //   /cruises/bosphorus-sunset-cruise → root src/app/cruises/[slug]/page.tsx
  //                                      (in tours, not an OWNER_REDIRECT)
  //                                      + static src/app/[locale]/cruises/
  //                                        bosphorus-sunset-cruise/page.tsx
  //                                        (shadows [slug])
  //   /istanbul-dinner-cruise          → canonical dinner page (NOT
  //                                      /cruises/bosphorus-dinner-cruise,
  //                                      which is an OWNER_REDIRECT → 301 hop);
  //                                      src/app/istanbul-dinner-cruise/page.tsx
  //                                      + src/app/[locale]/istanbul-dinner-cruise/page.tsx
  // COPY stays in the customer locale (data.locale); only the HREF locale is
  // resolved to a routable one. EN is served at the SITE ROOT with NO /en/
  // prefix; every other routable locale renders under /<locale>/.
  const linkLocale = ownLinkLocale(data.locale);
  const url = (path: string) =>
    linkLocale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${linkLocale}${path}`;
  // UTM (Part A): own-site + sister-brand pageview links get
  // utm_source=email&utm_medium=post_trip_review&utm_campaign=welcomeback10
  // + a distinct utm_content slug per link, so GA4/Clarity can attribute
  // sessions/conversions back to this email. Trustpilot/Google review links
  // (reviewButtonsRow, above) are deliberately left untagged — third-party
  // sites our own analytics never sees.
  const cruisesUrl = withUtm(url("/cruises"), "own_cruises");
  const sunsetUrl = withUtm(url("/cruises/bosphorus-sunset-cruise"), "own_sunset_cruise");
  const dinnerUrl = withUtm(url("/istanbul-dinner-cruise"), "own_dinner_cruise");
  // Private yacht charter — verified live for BOTH en-root and the tr prefix:
  //   /yacht-charter-istanbul → src/app/yacht-charter-istanbul/page.tsx
  //                            + src/app/[locale]/yacht-charter-istanbul/page.tsx
  const privateYachtUrl = withUtm(url("/yacht-charter-istanbul"), "own_private_yacht");
  const merryTourismUrl = withUtm(merryTourismUrlFor(data.locale), "sister_merrytourism");
  // WhatsApp/Call buttons (Part B): these do not load a webpage themselves,
  // so route them through the /track/review-click interstitial, which fires
  // trackReviewEmailClick() then redirects to the real wa.me/tel destination
  // (built server-side from hardcoded constants — see review-email-constants.ts).
  // Discount-card WhatsApp button carries a pre-filled claim message (locale-
  // aware via ?locale=). The bottom contact-row button stays text-free.
  const discountWhatsappUrl = `${SITE_URL}/track/review-click?to=discount&locale=${encodeURIComponent(data.locale)}`;
  const contactWhatsappUrl = `${SITE_URL}/track/review-click?to=contact`;
  const callUrl = `${SITE_URL}/track/review-click?to=call`;

  // Right-to-left rendering for Arabic. Setting dir="rtl" on <html> and the
  // <body> flips text alignment/flow for the whole message; the centred blocks
  // (review/discount/cross-sell) stay centred, while left-aligned paragraphs
  // (greeting, trip line, helper text) become right-aligned as they should.
  const isRtl = RTL_REVIEW_LOCALES.has(data.locale);
  const dirAttr = isRtl ? ' dir="rtl"' : "";

  const html = `<!DOCTYPE html>
<html lang="${data.locale}"${dirAttr}>
${emailHead()}
<body${dirAttr} style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(c.preheader)}</div>
  <div style="max-width:600px;margin:0 auto;padding:20px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1b3160 55%,#15284f 100%);border-radius:18px 18px 0 0;padding:26px 22px;">
      <span style="display:block;font-size:24px;font-weight:800;letter-spacing:-0.4px;line-height:1;color:#ffffff;">Merry<span style="color:#7da6ff;">Sails</span></span>
      <span style="display:block;margin-top:6px;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#94a3b8;font-weight:600;">${escapeHtml(c.tagline)} &middot; TÜRSAB 14316</span>
      <div style="margin-top:18px;display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(247,181,44,0.14);border:1px solid rgba(247,181,44,0.24);color:#f7b52c;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
        ${escapeHtml(c.badge)}
      </div>
    </div>

    <div style="background:#fff;padding:24px 22px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 18px 18px;">

      <!-- Greeting + trip line -->
      <p style="color:#0f172a;margin:0 0 6px;font-size:16px;font-weight:700;">${escapeHtml(c.greeting(firstName))}</p>
      <p style="color:#334155;margin:0 0 22px;font-size:15px;line-height:1.7;">${c.tripLine(escapeHtml(data.tourName))}</p>

      <!-- Review block -->
      <div style="text-align:center;border-top:1px solid #eef2f7;padding-top:22px;margin-bottom:8px;">
        <p style="color:#0f172a;margin:0 0 6px;font-size:17px;font-weight:800;">${escapeHtml(c.reviewHeading)}</p>
        <p style="color:#64748b;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.reviewSub)}</p>
        <div>${reviewButtonsRow(c, googleUrl, trustpilotUrl)}</div>
      </div>

      <!-- Returning-guest discount card -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:16px;padding:22px;margin:22px 0;text-align:center;">
        <p style="color:#92400e;margin:0 0 6px;font-size:18px;font-weight:800;">${escapeHtml(c.discountTitle)}</p>
        <p style="color:#92400e;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.discountBody)}</p>
        <div style="display:inline-block;background:#ffffff;border:2px dashed #f59e0b;border-radius:12px;padding:12px 26px;margin:0 0 18px;font-family:'Courier New',Courier,monospace;font-size:22px;font-weight:800;letter-spacing:3px;color:#b45309;">${DISCOUNT_CODE}</div>
        <div>
          <a href="${discountWhatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:999px;font-weight:700;font-size:14px;">${escapeHtml(c.whatsappBtn)}</a>
        </div>
        <p style="color:#92400e;margin:12px 0 0;font-size:12.5px;line-height:1.6;">${escapeHtml(c.whatsappHelper)}</p>
      </div>

      <!-- Cross-sell: own cruise products -->
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:16px;padding:20px 22px;margin:22px 0;">
        <p style="color:#0c4a6e;margin:0 0 6px;font-size:16px;font-weight:800;">${escapeHtml(c.crossSellHeading)}</p>
        <p style="color:#0369a1;margin:0 0 16px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.crossSellBody)}</p>
        <div style="text-align:center;">
          <a href="${sunsetUrl}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.sunsetBtn)}</a>
          <a href="${dinnerUrl}" style="display:inline-block;background:#0ea5e9;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.dinnerBtn)}</a>
          <a href="${cruisesUrl}" style="display:inline-block;background:#0369a1;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.cruisesBtn)}</a>
          <a href="${privateYachtUrl}" style="display:inline-block;background:#0369a1;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 9px;">${escapeHtml(c.privateYachtBtn)}</a>
        </div>
      </div>

      <!-- Sister-brand card (single tasteful private-email cross-brand mention) -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin:22px 0;">
        <p style="color:#0f172a;margin:0 0 6px;font-size:15px;font-weight:800;">${escapeHtml(c.sisterHeading)}</p>
        <p style="color:#64748b;margin:0 0 14px;font-size:13.5px;line-height:1.7;">${escapeHtml(c.sisterBody)}</p>
        <a href="${merryTourismUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;">${escapeHtml(c.sisterBtn)}</a>
      </div>

      <!-- Contact row -->
      <div style="border-top:1px solid #eef2f7;padding-top:20px;text-align:center;">
        <p style="color:#0f172a;margin:0 0 14px;font-size:14px;font-weight:700;">${escapeHtml(c.contactHeading)}</p>
        <a href="${contactWhatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 8px;">${escapeHtml(c.whatsappBtn)}</a>
        <a href="${callUrl}" style="display:inline-block;background:#ffffff;color:#0f172a;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:13px;margin:0 5px 8px;border:1px solid #cbd5e1;">${escapeHtml(c.callBtn)} ${escapeHtml(PHONE_DISPLAY)}</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px;text-align:center;">
      ${emailLegalFooter()}
      <p style="color:#94a3b8;font-size:10.5px;margin:8px 0 0;">merrysails.com &middot; info@merrysails.com</p>
    </div>
  </div>
</body>
</html>`;

  return { subject: c.subject, html };
}
