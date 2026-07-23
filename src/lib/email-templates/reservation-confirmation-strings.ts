/**
 * Per-locale copy for the customer reservation confirmation email.
 *
 * The confirmation email used to be hardcoded English for every customer —
 * a DE/RU/FR/NL/TR customer who booked still received an all-English email
 * (and on 2026-06-20 an EN template even leaked a Turkish departure string).
 * This module localizes every customer-facing label/sentence in the email.
 *
 * English ("en") is the safe default. `getReservationEmailStrings()` never
 * throws on an unknown/missing locale — it falls back to "en". All dynamic
 * values (prices, dates, IDs, the clean departure clock) stay outside this
 * module and are interpolated by the template unchanged.
 */

export type ReservationEmailLocale =
  | "en"
  | "tr"
  | "de"
  | "fr"
  | "nl"
  | "ru";

const BRAND = "MerrySails";

export interface ReservationEmailStrings {
  /** <title> + hero badges */
  documentTitle: string;
  badgeReceived: string;
  badgeConfirmed: string;
  /** Hero greeting body */
  greetingReceived: string;
  greetingConfirmed: string;
  /** "Dear {name}," — name interpolated by template */
  dear: (name: string) => string;
  /** "Reservation ID <b>X</b> is now connected to your booking record." */
  idConnectedPrefix: string;
  idConnectedSuffix: string;
  /** Reservation ID card */
  reservationIdLabel: string;
  noteSaveReference: string;
  noteBookingSecured: string;
  /** Booking Details table */
  bookingDetails: string;
  tour: string;
  date: string;
  departure: string;
  meetingPoint: string;
  guests: string;
  subtotal: string;
  groupDiscount: string;
  total: string;
  /** Guest count + age tiers */
  guest: (n: number) => string;
  adults: (n: number) => string;
  children: (n: number) => string;
  infants: (n: number) => string;
  childDiscountLabel: string;
  /** Selected option block */
  selectedOption: string;
  packagesLabel: string;
  packageLabel: string;
  addOnsLabel: string;
  otherPassengersLabel: string;
  packageGuests: (n: number) => string;
  privateTransferInline: string;
  privateTransferInlineBody: string;
  /** Special requests */
  specialRequests: string;
  /** What's next */
  whatsNext: string;
  nextReceived1: string;
  nextReceivedConfirmYacht: string;
  nextReceivedConfirm: string;
  nextReceived3: string;
  nextConfirmed1: string;
  nextConfirmedPayYacht: string;
  nextConfirmedPay: string;
  nextConfirmedBoardYacht: string;
  nextConfirmedBoard: string;
  /** Good to know */
  goodToKnow: string;
  cancellation24: string;
  cancellation48: string;
  paymentYacht: string;
  paymentOnboard: string;
  drinksNote: string;
  photographyNote: string;
  /** CTA buttons */
  trackReservation: string;
  openInvoice: string;
  openVoucher: string;
  meetingDetails: string;
  experiencePage: string;
  /** Support section (confirmed variant only) */
  supportLocation: string;
  supportTransportTime: string;
  supportHowToReach: string;
  supportIncluded: string;
  supportExcluded: string;
  supportPrivateTransfer: string;
  supportViewDetails: string;
  /** Footer */
  needHelp: string;
  whatsapp: string;
  callUs: string;
  email: string;
  footerSent: (domain: string) => string;
  footerNotYou: string;
  footerContactUs: string;
}

const en: ReservationEmailStrings = {
  documentTitle: `Booking Confirmation - ${BRAND}`,
  badgeReceived: "Reservation Received",
  badgeConfirmed: "Reservation Confirmed",
  greetingReceived: `Thank you for choosing ${BRAND}. Your reservation has been received and our team will review the booking details shortly.`,
  greetingConfirmed:
    "Great news — your reservation is now confirmed. Your selected departure is secured, and two separate PDF files are attached for quick access: your invoice and your voucher.",
  dear: (name) => `Dear ${name},`,
  idConnectedPrefix: "Reservation ID ",
  idConnectedSuffix: " is now connected to your booking record.",
  reservationIdLabel: "Reservation ID",
  noteSaveReference: "Please save this reference",
  noteBookingSecured: "Your booking is now secured",
  bookingDetails: "Booking Details",
  tour: "Tour",
  date: "Date",
  departure: "Departure",
  meetingPoint: "Meeting Point",
  guests: "Guests",
  subtotal: "Subtotal",
  groupDiscount: "Group discount",
  total: "Total",
  guest: (n) => `${n} ${n === 1 ? "guest" : "guests"}`,
  adults: (n) => `${n} adult${n > 1 ? "s" : ""}`,
  children: (n) => `${n} child${n > 1 ? "ren" : ""} (3-13)`,
  infants: (n) => `${n} infant${n > 1 ? "s" : ""} (0-3)`,
  childDiscountLabel: "Child discount (ages 3-13 save 50%, ages 0-3 free)",
  selectedOption: "Selected Booking Option",
  packagesLabel: "Packages:",
  packageLabel: "Package:",
  addOnsLabel: "Add-ons:",
  otherPassengersLabel: "Other passengers:",
  packageGuests: (n) => `${n} guest${n > 1 ? "s" : ""}`,
  privateTransferInline: "Private transfer:",
  privateTransferInlineBody:
    "Requested separately. Our team will contact you before departure.",
  specialRequests: "Your Special Requests",
  whatsNext: "What's next",
  nextReceived1: "Our team will review your booking and confirm availability.",
  nextReceivedConfirmYacht:
    "You will receive the charter follow-up and confirmation steps by email or WhatsApp.",
  nextReceivedConfirm:
    "You will receive a confirmation message via email or WhatsApp.",
  nextReceived3: "Keep this reservation ID ready for support and follow-up.",
  nextConfirmed1: "Your date and selected option are now confirmed.",
  nextConfirmedPayYacht:
    "Our operations team will confirm the payment schedule in writing.",
  nextConfirmedPay: "Payment will be collected on board by cash or card.",
  nextConfirmedBoardYacht:
    "The final marina pin and boarding contact will be shared before departure.",
  nextConfirmedBoard:
    "Arrive 15 minutes before departure and keep your voucher open on your phone.",
  goodToKnow: "Good to know",
  cancellation24: "Free cancellation up to 24 hours before departure",
  cancellation48: "Free cancellation up to 48 hours before departure",
  paymentYacht: "Payment timing is confirmed in writing for your charter.",
  paymentOnboard: "Payment is collected on board by cash or card.",
  drinksNote:
    "Drinks and inclusions depend on the package selected on your booked experience page.",
  photographyNote:
    "Professional photography may be available on board depending on the experience.",
  trackReservation: "Track Reservation",
  openInvoice: "Open Invoice",
  openVoucher: "Open Voucher",
  meetingDetails: "Meeting Details",
  experiencePage: "Experience Page",
  supportLocation: "Location",
  supportTransportTime: "Transportation time",
  supportHowToReach: "How to reach the meeting point",
  supportIncluded: "Included",
  supportExcluded: "Excluded",
  supportPrivateTransfer: "Private transfer requested",
  supportViewDetails: "View Meeting & Boarding Details",
  needHelp: "Need help? We are here for you.",
  whatsapp: "WhatsApp",
  callUs: "Call Us",
  email: "Email",
  footerSent: (domain) => `This email was sent because a booking was made on ${domain}.`,
  footerNotYou: "If you did not make this reservation, please",
  footerContactUs: "contact us",
};

const tr: ReservationEmailStrings = {
  documentTitle: `Rezervasyon Onayı - ${BRAND}`,
  badgeReceived: "Rezervasyon Alındı",
  badgeConfirmed: "Rezervasyon Onaylandı",
  greetingReceived: `${BRAND} markasını tercih ettiğiniz için teşekkür ederiz. Rezervasyonunuz alındı ve ekibimiz kısa süre içinde rezervasyon ayrıntılarını inceleyecek.`,
  greetingConfirmed:
    "Harika haber — rezervasyonunuz artık onaylandı. Seçtiğiniz kalkış garanti altına alındı ve hızlı erişim için iki ayrı PDF eklenmiştir: faturanız ve voucher'ınız.",
  dear: (name) => `Sayın ${name},`,
  idConnectedPrefix: "Rezervasyon No ",
  idConnectedSuffix: " artık rezervasyon kaydınıza bağlandı.",
  reservationIdLabel: "Rezervasyon No",
  noteSaveReference: "Lütfen bu referansı saklayın",
  noteBookingSecured: "Rezervasyonunuz artık güvence altında",
  bookingDetails: "Rezervasyon Ayrıntıları",
  tour: "Tur",
  date: "Tarih",
  departure: "Kalkış",
  meetingPoint: "Buluşma Noktası",
  guests: "Misafirler",
  subtotal: "Ara toplam",
  groupDiscount: "Grup indirimi",
  total: "Toplam",
  guest: (n) => `${n} misafir`,
  adults: (n) => `${n} yetişkin`,
  children: (n) => `${n} çocuk (3-13 yaş)`,
  infants: (n) => `${n} bebek (0-3 yaş)`,
  childDiscountLabel: "Çocuk indirimi (3-13 yaş %50, 0-3 yaş ücretsiz)",
  selectedOption: "Seçilen Rezervasyon Seçeneği",
  packagesLabel: "Paketler:",
  packageLabel: "Paket:",
  addOnsLabel: "Ek hizmetler:",
  otherPassengersLabel: "Diğer yolcular:",
  packageGuests: (n) => `${n} misafir`,
  privateTransferInline: "Özel transfer:",
  privateTransferInlineBody:
    "Ayrıca talep edildi. Ekibimiz kalkıştan önce sizinle iletişime geçecek.",
  specialRequests: "Özel İstekleriniz",
  whatsNext: "Sıradaki adımlar",
  nextReceived1: "Ekibimiz rezervasyonunuzu inceleyip uygunluğu onaylayacak.",
  nextReceivedConfirmYacht:
    "Yat kiralama takibi ve onay adımlarını e-posta veya WhatsApp ile alacaksınız.",
  nextReceivedConfirm:
    "Onay mesajını e-posta veya WhatsApp üzerinden alacaksınız.",
  nextReceived3: "Destek ve takip için bu rezervasyon numarasını hazır bulundurun.",
  nextConfirmed1: "Tarihiniz ve seçtiğiniz seçenek artık onaylandı.",
  nextConfirmedPayYacht:
    "Operasyon ekibimiz ödeme planını yazılı olarak teyit edecek.",
  nextConfirmedPay: "Ödeme teknede nakit veya kart ile alınacaktır.",
  nextConfirmedBoardYacht:
    "Kesin marina konumu ve biniş iletişimi kalkıştan önce paylaşılacaktır.",
  nextConfirmedBoard:
    "Kalkıştan 15 dakika önce gelin ve voucher'ınızı telefonunuzda açık tutun.",
  goodToKnow: "Bilmeniz gerekenler",
  cancellation24: "Kalkıştan 24 saat öncesine kadar ücretsiz iptal",
  cancellation48: "Kalkıştan 48 saat öncesine kadar ücretsiz iptal",
  paymentYacht: "Yat kiralama için ödeme zamanlaması yazılı olarak teyit edilir.",
  paymentOnboard: "Ödeme teknede nakit veya kart ile alınır.",
  drinksNote:
    "İçecekler ve dahil olanlar, rezerve ettiğiniz deneyim sayfasında seçilen pakete bağlıdır.",
  photographyNote:
    "Deneyime bağlı olarak teknede profesyonel fotoğraf çekimi mevcut olabilir.",
  trackReservation: "Rezervasyonu Takip Et",
  openInvoice: "Faturayı Aç",
  openVoucher: "Voucher'ı Aç",
  meetingDetails: "Buluşma Ayrıntıları",
  experiencePage: "Deneyim Sayfası",
  supportLocation: "Konum",
  supportTransportTime: "Ulaşım süresi",
  supportHowToReach: "Buluşma noktasına nasıl ulaşılır",
  supportIncluded: "Dahil",
  supportExcluded: "Hariç",
  supportPrivateTransfer: "Özel transfer talep edildi",
  supportViewDetails: "Buluşma ve Biniş Ayrıntılarını Gör",
  needHelp: "Yardıma mı ihtiyacınız var? Buradayız.",
  whatsapp: "WhatsApp",
  callUs: "Bizi Arayın",
  email: "E-posta",
  footerSent: (domain) =>
    `Bu e-posta, ${domain} üzerinde bir rezervasyon yapıldığı için gönderildi.`,
  footerNotYou: "Bu rezervasyonu siz yapmadıysanız, lütfen",
  footerContactUs: "bizimle iletişime geçin",
};

const de: ReservationEmailStrings = {
  documentTitle: `Buchungsbestätigung - ${BRAND}`,
  badgeReceived: "Reservierung eingegangen",
  badgeConfirmed: "Reservierung bestätigt",
  greetingReceived: `Vielen Dank, dass Sie sich für ${BRAND} entschieden haben. Ihre Reservierung ist eingegangen und unser Team prüft die Buchungsdetails in Kürze.`,
  greetingConfirmed:
    "Gute Nachrichten — Ihre Reservierung ist jetzt bestätigt. Ihre gewählte Abfahrt ist gesichert, und zwei separate PDF-Dateien sind zum schnellen Zugriff angehängt: Ihre Rechnung und Ihr Voucher.",
  dear: (name) => `Sehr geehrte/r ${name},`,
  idConnectedPrefix: "Reservierungs-ID ",
  idConnectedSuffix: " ist jetzt mit Ihrem Buchungsdatensatz verknüpft.",
  reservationIdLabel: "Reservierungs-ID",
  noteSaveReference: "Bitte bewahren Sie diese Referenz auf",
  noteBookingSecured: "Ihre Buchung ist jetzt gesichert",
  bookingDetails: "Buchungsdetails",
  tour: "Tour",
  date: "Datum",
  departure: "Abfahrt",
  meetingPoint: "Treffpunkt",
  guests: "Gäste",
  subtotal: "Zwischensumme",
  groupDiscount: "Gruppenrabatt",
  total: "Gesamt",
  guest: (n) => `${n} ${n === 1 ? "Gast" : "Gäste"}`,
  adults: (n) => `${n} ${n === 1 ? "Erwachsener" : "Erwachsene"}`,
  children: (n) => `${n} ${n === 1 ? "Kind" : "Kinder"} (3-13)`,
  infants: (n) => `${n} ${n === 1 ? "Kleinkind" : "Kleinkinder"} (0-3)`,
  childDiscountLabel: "Kinderrabatt (3-13 Jahre 50% Rabatt, 0-3 Jahre kostenlos)",
  selectedOption: "Gewählte Buchungsoption",
  packagesLabel: "Pakete:",
  packageLabel: "Paket:",
  addOnsLabel: "Zusatzleistungen:",
  otherPassengersLabel: "Weitere Gäste:",
  packageGuests: (n) => `${n} ${n === 1 ? "Gast" : "Gäste"}`,
  privateTransferInline: "Privattransfer:",
  privateTransferInlineBody:
    "Separat angefragt. Unser Team kontaktiert Sie vor der Abfahrt.",
  specialRequests: "Ihre besonderen Wünsche",
  whatsNext: "Wie geht es weiter",
  nextReceived1:
    "Unser Team prüft Ihre Buchung und bestätigt die Verfügbarkeit.",
  nextReceivedConfirmYacht:
    "Sie erhalten die Charter-Nachverfolgung und Bestätigungsschritte per E-Mail oder WhatsApp.",
  nextReceivedConfirm:
    "Sie erhalten eine Bestätigung per E-Mail oder WhatsApp.",
  nextReceived3:
    "Halten Sie diese Reservierungs-ID für Support und Nachverfolgung bereit.",
  nextConfirmed1: "Ihr Datum und Ihre gewählte Option sind jetzt bestätigt.",
  nextConfirmedPayYacht:
    "Unser Operations-Team bestätigt den Zahlungsplan schriftlich.",
  nextConfirmedPay: "Die Zahlung erfolgt an Bord in bar oder per Karte.",
  nextConfirmedBoardYacht:
    "Der genaue Marina-Standort und der Boarding-Kontakt werden vor der Abfahrt mitgeteilt.",
  nextConfirmedBoard:
    "Kommen Sie 15 Minuten vor der Abfahrt und halten Sie Ihren Voucher auf dem Handy bereit.",
  goodToKnow: "Gut zu wissen",
  cancellation24: "Kostenlose Stornierung bis 24 Stunden vor der Abfahrt",
  cancellation48: "Kostenlose Stornierung bis 48 Stunden vor der Abfahrt",
  paymentYacht:
    "Der Zahlungszeitpunkt für Ihre Charter wird schriftlich bestätigt.",
  paymentOnboard: "Die Zahlung erfolgt an Bord in bar oder per Karte.",
  drinksNote:
    "Getränke und Leistungen hängen vom auf Ihrer gebuchten Erlebnisseite gewählten Paket ab.",
  photographyNote:
    "Je nach Erlebnis kann an Bord professionelle Fotografie verfügbar sein.",
  trackReservation: "Reservierung verfolgen",
  openInvoice: "Rechnung öffnen",
  openVoucher: "Voucher öffnen",
  meetingDetails: "Treffpunkt-Details",
  experiencePage: "Erlebnisseite",
  supportLocation: "Standort",
  supportTransportTime: "Transportzeit",
  supportHowToReach: "So erreichen Sie den Treffpunkt",
  supportIncluded: "Inbegriffen",
  supportExcluded: "Nicht inbegriffen",
  supportPrivateTransfer: "Privattransfer angefragt",
  supportViewDetails: "Treffpunkt- und Boarding-Details ansehen",
  needHelp: "Brauchen Sie Hilfe? Wir sind für Sie da.",
  whatsapp: "WhatsApp",
  callUs: "Anrufen",
  email: "E-Mail",
  footerSent: (domain) =>
    `Diese E-Mail wurde gesendet, weil auf ${domain} eine Buchung vorgenommen wurde.`,
  footerNotYou: "Wenn Sie diese Reservierung nicht vorgenommen haben,",
  footerContactUs: "kontaktieren Sie uns",
};

const fr: ReservationEmailStrings = {
  documentTitle: `Confirmation de réservation - ${BRAND}`,
  badgeReceived: "Réservation reçue",
  badgeConfirmed: "Réservation confirmée",
  greetingReceived: `Merci d'avoir choisi ${BRAND}. Votre réservation a été reçue et notre équipe examinera les détails de la réservation sous peu.`,
  greetingConfirmed:
    "Bonne nouvelle — votre réservation est désormais confirmée. Votre départ sélectionné est garanti, et deux fichiers PDF distincts sont joints pour un accès rapide : votre facture et votre bon.",
  dear: (name) => `Cher/Chère ${name},`,
  idConnectedPrefix: "Numéro de réservation ",
  idConnectedSuffix: " est désormais lié à votre dossier de réservation.",
  reservationIdLabel: "Numéro de réservation",
  noteSaveReference: "Veuillez conserver cette référence",
  noteBookingSecured: "Votre réservation est désormais garantie",
  bookingDetails: "Détails de la réservation",
  tour: "Excursion",
  date: "Date",
  departure: "Départ",
  meetingPoint: "Point de rendez-vous",
  guests: "Invités",
  subtotal: "Sous-total",
  groupDiscount: "Remise de groupe",
  total: "Total",
  guest: (n) => `${n} ${n === 1 ? "invité" : "invités"}`,
  adults: (n) => `${n} adulte${n > 1 ? "s" : ""}`,
  children: (n) => `${n} enfant${n > 1 ? "s" : ""} (3-13)`,
  infants: (n) => `${n} bébé${n > 1 ? "s" : ""} (0-3)`,
  childDiscountLabel:
    "Remise enfant (3-13 ans 50% de réduction, 0-3 ans gratuit)",
  selectedOption: "Option de réservation sélectionnée",
  packagesLabel: "Forfaits :",
  packageLabel: "Forfait :",
  addOnsLabel: "Options :",
  otherPassengersLabel: "Autres passagers :",
  packageGuests: (n) => `${n} ${n === 1 ? "invité" : "invités"}`,
  privateTransferInline: "Transfert privé :",
  privateTransferInlineBody:
    "Demandé séparément. Notre équipe vous contactera avant le départ.",
  specialRequests: "Vos demandes spéciales",
  whatsNext: "Prochaines étapes",
  nextReceived1:
    "Notre équipe examinera votre réservation et confirmera la disponibilité.",
  nextReceivedConfirmYacht:
    "Vous recevrez le suivi de la location et les étapes de confirmation par e-mail ou WhatsApp.",
  nextReceivedConfirm:
    "Vous recevrez un message de confirmation par e-mail ou WhatsApp.",
  nextReceived3:
    "Gardez ce numéro de réservation à portée pour le support et le suivi.",
  nextConfirmed1: "Votre date et votre option sélectionnée sont maintenant confirmées.",
  nextConfirmedPayYacht:
    "Notre équipe des opérations confirmera l'échéancier de paiement par écrit.",
  nextConfirmedPay: "Le paiement sera collecté à bord en espèces ou par carte.",
  nextConfirmedBoardYacht:
    "L'emplacement final de la marina et le contact d'embarquement seront partagés avant le départ.",
  nextConfirmedBoard:
    "Arrivez 15 minutes avant le départ et gardez votre bon ouvert sur votre téléphone.",
  goodToKnow: "Bon à savoir",
  cancellation24: "Annulation gratuite jusqu'à 24 heures avant le départ",
  cancellation48: "Annulation gratuite jusqu'à 48 heures avant le départ",
  paymentYacht:
    "Le calendrier de paiement est confirmé par écrit pour votre location.",
  paymentOnboard: "Le paiement est collecté à bord en espèces ou par carte.",
  drinksNote:
    "Les boissons et les prestations incluses dépendent du forfait sélectionné sur la page de l'expérience réservée.",
  photographyNote:
    "Une photographie professionnelle peut être disponible à bord selon l'expérience.",
  trackReservation: "Suivre la réservation",
  openInvoice: "Ouvrir la facture",
  openVoucher: "Ouvrir le bon",
  meetingDetails: "Détails du point de rencontre",
  experiencePage: "Page de l'expérience",
  supportLocation: "Lieu",
  supportTransportTime: "Temps de transport",
  supportHowToReach: "Comment rejoindre le point de rencontre",
  supportIncluded: "Inclus",
  supportExcluded: "Non inclus",
  supportPrivateTransfer: "Transfert privé demandé",
  supportViewDetails: "Voir les détails de rencontre et d'embarquement",
  needHelp: "Besoin d'aide ? Nous sommes là pour vous.",
  whatsapp: "WhatsApp",
  callUs: "Appelez-nous",
  email: "E-mail",
  footerSent: (domain) =>
    `Cet e-mail a été envoyé car une réservation a été effectuée sur ${domain}.`,
  footerNotYou: "Si vous n'avez pas effectué cette réservation, veuillez",
  footerContactUs: "nous contacter",
};

const nl: ReservationEmailStrings = {
  documentTitle: `Boekingsbevestiging - ${BRAND}`,
  badgeReceived: "Reservering ontvangen",
  badgeConfirmed: "Reservering bevestigd",
  greetingReceived: `Bedankt dat u voor ${BRAND} hebt gekozen. Uw reservering is ontvangen en ons team beoordeelt de boekingsgegevens binnenkort.`,
  greetingConfirmed:
    "Goed nieuws — uw reservering is nu bevestigd. Uw geselecteerde vertrek is gegarandeerd, en twee aparte PDF-bestanden zijn bijgevoegd voor snelle toegang: uw factuur en uw voucher.",
  dear: (name) => `Beste ${name},`,
  idConnectedPrefix: "Reserveringsnummer ",
  idConnectedSuffix: " is nu gekoppeld aan uw boekingsdossier.",
  reservationIdLabel: "Reserveringsnummer",
  noteSaveReference: "Bewaar deze referentie",
  noteBookingSecured: "Uw boeking is nu gegarandeerd",
  bookingDetails: "Boekingsgegevens",
  tour: "Tour",
  date: "Datum",
  departure: "Vertrek",
  meetingPoint: "Ontmoetingspunt",
  guests: "Gasten",
  subtotal: "Subtotaal",
  groupDiscount: "Groepskorting",
  total: "Totaal",
  guest: (n) => `${n} ${n === 1 ? "gast" : "gasten"}`,
  adults: (n) => `${n} ${n === 1 ? "volwassene" : "volwassenen"}`,
  children: (n) => `${n} ${n === 1 ? "kind" : "kinderen"} (3-13)`,
  infants: (n) => `${n} ${n === 1 ? "baby" : "baby's"} (0-3)`,
  childDiscountLabel: "Kinderkorting (3-13 jaar 50% korting, 0-3 jaar gratis)",
  selectedOption: "Geselecteerde boekingsoptie",
  packagesLabel: "Pakketten:",
  packageLabel: "Pakket:",
  addOnsLabel: "Extra's:",
  otherPassengersLabel: "Andere passagiers:",
  packageGuests: (n) => `${n} ${n === 1 ? "gast" : "gasten"}`,
  privateTransferInline: "Privétransfer:",
  privateTransferInlineBody:
    "Apart aangevraagd. Ons team neemt vóór vertrek contact met u op.",
  specialRequests: "Uw speciale verzoeken",
  whatsNext: "Wat nu",
  nextReceived1:
    "Ons team beoordeelt uw boeking en bevestigt de beschikbaarheid.",
  nextReceivedConfirmYacht:
    "U ontvangt de charter-opvolging en bevestigingsstappen per e-mail of WhatsApp.",
  nextReceivedConfirm:
    "U ontvangt een bevestigingsbericht per e-mail of WhatsApp.",
  nextReceived3:
    "Houd dit reserveringsnummer bij de hand voor support en opvolging.",
  nextConfirmed1: "Uw datum en geselecteerde optie zijn nu bevestigd.",
  nextConfirmedPayYacht:
    "Ons operationele team bevestigt het betalingsschema schriftelijk.",
  nextConfirmedPay: "Betaling wordt aan boord contant of met kaart geïnd.",
  nextConfirmedBoardYacht:
    "De definitieve marinalocatie en boardingcontact worden vóór vertrek gedeeld.",
  nextConfirmedBoard:
    "Kom 15 minuten vóór vertrek en houd uw voucher open op uw telefoon.",
  goodToKnow: "Goed om te weten",
  cancellation24: "Gratis annulering tot 24 uur vóór vertrek",
  cancellation48: "Gratis annulering tot 48 uur vóór vertrek",
  paymentYacht: "De betalingstiming wordt schriftelijk bevestigd voor uw charter.",
  paymentOnboard: "Betaling wordt aan boord contant of met kaart geïnd.",
  drinksNote:
    "Drankjes en inbegrepen items hangen af van het pakket dat is geselecteerd op uw geboekte ervaringspagina.",
  photographyNote:
    "Professionele fotografie kan aan boord beschikbaar zijn, afhankelijk van de ervaring.",
  trackReservation: "Reservering volgen",
  openInvoice: "Factuur openen",
  openVoucher: "Voucher openen",
  meetingDetails: "Ontmoetingsdetails",
  experiencePage: "Ervaringspagina",
  supportLocation: "Locatie",
  supportTransportTime: "Reistijd",
  supportHowToReach: "Hoe u het ontmoetingspunt bereikt",
  supportIncluded: "Inbegrepen",
  supportExcluded: "Niet inbegrepen",
  supportPrivateTransfer: "Privétransfer aangevraagd",
  supportViewDetails: "Ontmoetings- en boardingdetails bekijken",
  needHelp: "Hulp nodig? Wij staan voor u klaar.",
  whatsapp: "WhatsApp",
  callUs: "Bel ons",
  email: "E-mail",
  footerSent: (domain) =>
    `Deze e-mail is verzonden omdat er een boeking is gemaakt op ${domain}.`,
  footerNotYou: "Als u deze reservering niet hebt gemaakt,",
  footerContactUs: "neem dan contact met ons op",
};

const ru: ReservationEmailStrings = {
  documentTitle: `Подтверждение бронирования - ${BRAND}`,
  badgeReceived: "Бронирование получено",
  badgeConfirmed: "Бронирование подтверждено",
  greetingReceived: `Спасибо, что выбрали ${BRAND}. Ваше бронирование получено, и наша команда вскоре проверит детали бронирования.`,
  greetingConfirmed:
    "Отличные новости — ваше бронирование подтверждено. Выбранное отправление зарезервировано, и для быстрого доступа прикреплены два отдельных PDF-файла: ваш счёт и ваш ваучер.",
  dear: (name) => `Уважаемый(ая) ${name},`,
  idConnectedPrefix: "Номер бронирования ",
  idConnectedSuffix: " теперь связан с вашей записью бронирования.",
  reservationIdLabel: "Номер бронирования",
  noteSaveReference: "Пожалуйста, сохраните этот номер",
  noteBookingSecured: "Ваше бронирование теперь зарезервировано",
  bookingDetails: "Детали бронирования",
  tour: "Тур",
  date: "Дата",
  departure: "Отправление",
  meetingPoint: "Место встречи",
  guests: "Гости",
  subtotal: "Промежуточный итог",
  groupDiscount: "Групповая скидка",
  total: "Итого",
  guest: (n) => `${n} ${n === 1 ? "гость" : "гостей"}`,
  adults: (n) => `${n} взр.`,
  children: (n) => `${n} реб. (3-13)`,
  infants: (n) => `${n} млад. (0-3)`,
  childDiscountLabel: "Детская скидка (3-13 лет скидка 50%, 0-3 года бесплатно)",
  selectedOption: "Выбранный вариант бронирования",
  packagesLabel: "Пакеты:",
  packageLabel: "Пакет:",
  addOnsLabel: "Дополнительно:",
  otherPassengersLabel: "Другие пассажиры:",
  packageGuests: (n) => `${n} ${n === 1 ? "гость" : "гостей"}`,
  privateTransferInline: "Индивидуальный трансфер:",
  privateTransferInlineBody:
    "Запрошен отдельно. Наша команда свяжется с вами перед отправлением.",
  specialRequests: "Ваши особые пожелания",
  whatsNext: "Что дальше",
  nextReceived1:
    "Наша команда проверит ваше бронирование и подтвердит наличие мест.",
  nextReceivedConfirmYacht:
    "Вы получите дальнейшие шаги и подтверждение аренды по электронной почте или WhatsApp.",
  nextReceivedConfirm:
    "Вы получите подтверждение по электронной почте или WhatsApp.",
  nextReceived3:
    "Держите этот номер бронирования под рукой для поддержки и связи.",
  nextConfirmed1: "Ваша дата и выбранный вариант теперь подтверждены.",
  nextConfirmedPayYacht:
    "Наша операционная команда подтвердит график оплаты в письменном виде.",
  nextConfirmedPay: "Оплата производится на борту наличными или картой.",
  nextConfirmedBoardYacht:
    "Точное местоположение марины и контакт для посадки будут переданы перед отправлением.",
  nextConfirmedBoard:
    "Приходите за 15 минут до отправления и держите ваучер открытым на телефоне.",
  goodToKnow: "Полезно знать",
  cancellation24: "Бесплатная отмена за 24 часа до отправления",
  cancellation48: "Бесплатная отмена за 48 часов до отправления",
  paymentYacht: "Сроки оплаты для вашей аренды подтверждаются в письменном виде.",
  paymentOnboard: "Оплата производится на борту наличными или картой.",
  drinksNote:
    "Напитки и включённые услуги зависят от пакета, выбранного на странице забронированного тура.",
  photographyNote:
    "В зависимости от тура на борту может быть доступна профессиональная фотосъёмка.",
  trackReservation: "Отследить бронирование",
  openInvoice: "Открыть счёт",
  openVoucher: "Открыть ваучер",
  meetingDetails: "Детали встречи",
  experiencePage: "Страница тура",
  supportLocation: "Место",
  supportTransportTime: "Время в пути",
  supportHowToReach: "Как добраться до места встречи",
  supportIncluded: "Включено",
  supportExcluded: "Не включено",
  supportPrivateTransfer: "Запрошен индивидуальный трансфер",
  supportViewDetails: "Посмотреть детали встречи и посадки",
  needHelp: "Нужна помощь? Мы всегда на связи.",
  whatsapp: "WhatsApp",
  callUs: "Позвонить",
  email: "Эл. почта",
  footerSent: (domain) =>
    `Это письмо отправлено, потому что на ${domain} было сделано бронирование.`,
  footerNotYou: "Если вы не делали это бронирование, пожалуйста,",
  footerContactUs: "свяжитесь с нами",
};

const STRINGS: Record<ReservationEmailLocale, ReservationEmailStrings> = {
  en,
  tr,
  de,
  fr,
  nl,
  ru,
};

/**
 * Resolve the per-locale email copy. Never throws — falls back to English
 * for any unknown/missing locale so the revenue-critical confirmation email
 * always renders.
 */
export function getReservationEmailStrings(
  locale: string | null | undefined
): ReservationEmailStrings {
  if (locale && Object.prototype.hasOwnProperty.call(STRINGS, locale)) {
    return STRINGS[locale as ReservationEmailLocale];
  }
  return en;
}
