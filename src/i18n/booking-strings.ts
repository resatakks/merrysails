// Central per-locale strings for the booking surfaces (BookingSidebar +
// BookingCalendar) used across both English (/cruises/...) and localized
// routes (/tr, /de, /fr, /nl, /ru). Keep this list tight: only strings that
// were leaking English on locale pages.
//
// Add a new locale by adding a key here and wiring it inside the components
// via detectBookingLocale() (BookingCalendar) / the usePathname() match
// inside BookingSidebar.tsx.

export type BookingLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru";

export interface BookingSidebarStrings {
  currentFare: string;
  selectedPackageMeta: string;
  option: string;
  chooseYourPackage: string;
  chooseYourServiceScope: string;
  priceOnRequest: string;
  planYourTailorMadeCruise: string;
  servicePageBriefDescription: string;
  planOnWhatsApp: string;
  planOnTelegram: string;
  emailYourBrief: string;
  needHelpPlanning: string;
  needHelpChoosing: string;
  liveSupportWhatsApp: string;
  liveSupportTelegram: string;
  selectPackage: string;
  from: string;
  tailorMadePlan: string;
  selectPackageMobile: string;
  continueBooking: string;
  continue: string;
  quote: string;
  callNow: string;
  closeBookingModal: string;
  quoteMessageLines: {
    intro: string;
    serviceLabel: string;
    optionLabel: string;
    addOnsLabel: string;
  };
}

export interface BookingCalendarStrings {
  reserveNowPayOnboard: string;
  requestNowConfirm: string;
  privateChartersReviewedAndConfirmed: string;
  selectedDateAndGuestsUpdate: string;
  privateCharterRequest: string;
  sharedCruiseRequest: string;
  booking: string;
  selectYourPreferredDate: string;
  soldOut: string;
  closed: string;
  lastSpots: string;
  departureTime: string;
  departure: string;
  change: string;
  guests: string;
  maxGuestsLine: (max: number) => string;
  privateCharterPrice: string;
  perPersonPriceLine: (price: number, count: number) => string;
  standardDirectFare: string;
  total: string;
  youSaveOnReservation: (savings: number) => string;
  sameDayBookingClosed: string;
  selectDepartureTime: string;
  continueToBooking: string;
  bookViaWhatsApp: string;
  freeCancellation: string;
  weekdayDiscountLine: (label: string) => string;
  whatsappBookingMessage: (tourName: string, date: string, guests: number) => string;
  dayLabels: [string, string, string, string, string, string, string];
  weekdayShort: { tue: string; thu: string; mon: string; wed: string; fri: string; sat: string; sun: string };
  perPerson: string;
  perGroup: string;
}

const SIDEBAR: Record<BookingLocale, BookingSidebarStrings> = {
  en: {
    currentFare: "Current Fare",
    selectedPackageMeta: "Selected package stays prefilled below",
    option: "Option",
    chooseYourPackage: "Choose Your Package",
    chooseYourServiceScope: "Choose Your Service Scope",
    priceOnRequest: "Price on request",
    planYourTailorMadeCruise: "Plan Your Tailor-Made Cruise",
    servicePageBriefDescription:
      "This page now works as a service-led route. We keep the package structure, but pricing is confirmed after the brief.",
    planOnWhatsApp: "Plan on WhatsApp",
    planOnTelegram: "Plan on Telegram",
    emailYourBrief: "Email Your Brief",
    needHelpPlanning: "Need help planning?",
    needHelpChoosing: "Need help choosing?",
    liveSupportWhatsApp: "Live Support on WhatsApp",
    liveSupportTelegram: "Live Support on Telegram",
    selectPackage: "Select Package",
    from: "From",
    tailorMadePlan: "Tailor-made plan",
    selectPackageMobile: "Select package",
    continueBooking: "Continue Booking",
    continue: "Continue",
    quote: "Quote",
    callNow: "Call now",
    closeBookingModal: "Close booking modal",
    quoteMessageLines: {
      intro: "Hi, I'd like a pricing and availability for this Bosphorus service.",
      serviceLabel: "Service",
      optionLabel: "Selected option",
      addOnsLabel: "Requested add-ons",
    },
  },
  tr: {
    currentFare: "Güncel Ücret",
    selectedPackageMeta: "Seçilen paket aşağıda önceden seçilmiş kalır",
    option: "Seçenek",
    chooseYourPackage: "Paketinizi Seçin",
    chooseYourServiceScope: "Hizmet Kapsamınızı Seçin",
    priceOnRequest: "Fiyat talep üzerine",
    planYourTailorMadeCruise: "Size Özel Turunuzu Planlayın",
    servicePageBriefDescription:
      "Bu sayfa hizmet odaklı bir akış olarak çalışıyor. Paket yapısı korunur, fiyat brifing sonrasında teyit edilir.",
    planOnWhatsApp: "WhatsApp ile Planla",
    planOnTelegram: "Telegram ile Planla",
    emailYourBrief: "E-posta ile Brifing Gönder",
    needHelpPlanning: "Planlamaya yardım ister misiniz?",
    needHelpChoosing: "Seçim için yardım ister misiniz?",
    liveSupportWhatsApp: "WhatsApp Canlı Destek",
    liveSupportTelegram: "Telegram Canlı Destek",
    selectPackage: "Paket Seçin",
    from: "Başlangıç",
    tailorMadePlan: "Size özel plan",
    selectPackageMobile: "Paket seçin",
    continueBooking: "Rezervasyona Devam",
    continue: "Devam Et",
    quote: "Fiyat",
    callNow: "Hemen ara",
    closeBookingModal: "Rezervasyon penceresini kapat",
    quoteMessageLines: {
      intro: "Merhaba, bu Boğaz hizmeti için fiyat ve müsaitlik bilgisi rica ediyorum.",
      serviceLabel: "Hizmet",
      optionLabel: "Seçilen seçenek",
      addOnsLabel: "Talep edilen ek hizmetler",
    },
  },
  de: {
    currentFare: "Aktueller Preis",
    selectedPackageMeta: "Das ausgewählte Paket bleibt unten voreingestellt",
    option: "Option",
    chooseYourPackage: "Wählen Sie Ihr Paket",
    chooseYourServiceScope: "Wählen Sie Ihren Leistungsumfang",
    priceOnRequest: "Preis auf Anfrage",
    planYourTailorMadeCruise: "Planen Sie Ihre maßgeschneiderte Fahrt",
    servicePageBriefDescription:
      "Diese Seite arbeitet als servicegeführte Route. Die Paketstruktur bleibt, der Preis wird nach dem Briefing bestätigt.",
    planOnWhatsApp: "Per WhatsApp planen",
    planOnTelegram: "Per Telegram planen",
    emailYourBrief: "Briefing per E-Mail senden",
    needHelpPlanning: "Hilfe bei der Planung?",
    needHelpChoosing: "Hilfe bei der Auswahl?",
    liveSupportWhatsApp: "Live-Support auf WhatsApp",
    liveSupportTelegram: "Live-Support auf Telegram",
    selectPackage: "Paket auswählen",
    from: "Ab",
    tailorMadePlan: "Maßgeschneiderter Plan",
    selectPackageMobile: "Paket auswählen",
    continueBooking: "Buchung fortsetzen",
    continue: "Weiter",
    quote: "Preis",
    callNow: "Jetzt anrufen",
    closeBookingModal: "Buchungsfenster schließen",
    quoteMessageLines: {
      intro: "Hallo, ich möchte Preis und Verfügbarkeit für diese Bosporus-Tour erfragen.",
      serviceLabel: "Service",
      optionLabel: "Gewählte Option",
      addOnsLabel: "Gewünschte Zusatzleistungen",
    },
  },
  fr: {
    currentFare: "Tarif actuel",
    selectedPackageMeta: "L'option sélectionnée reste pré-remplie ci-dessous",
    option: "Option",
    chooseYourPackage: "Choisissez votre formule",
    chooseYourServiceScope: "Choisissez votre étendue de service",
    priceOnRequest: "Prix sur demande",
    planYourTailorMadeCruise: "Planifiez votre croisière sur mesure",
    servicePageBriefDescription:
      "Cette page fonctionne en flux de service. La structure des formules reste, le prix est confirmé après le brief.",
    planOnWhatsApp: "Planifier sur WhatsApp",
    planOnTelegram: "Planifier sur Telegram",
    emailYourBrief: "Envoyer le brief par e-mail",
    needHelpPlanning: "Besoin d'aide pour planifier ?",
    needHelpChoosing: "Besoin d'aide pour choisir ?",
    liveSupportWhatsApp: "Support en direct sur WhatsApp",
    liveSupportTelegram: "Support en direct sur Telegram",
    selectPackage: "Choisir la formule",
    from: "Dès",
    tailorMadePlan: "Plan sur mesure",
    selectPackageMobile: "Choisir la formule",
    continueBooking: "Continuer la réservation",
    continue: "Continuer",
    quote: "Devis",
    callNow: "Appeler",
    closeBookingModal: "Fermer la fenêtre de réservation",
    quoteMessageLines: {
      intro: "Bonjour, je souhaite obtenir un prix et la disponibilité pour cette prestation sur le Bosphore.",
      serviceLabel: "Service",
      optionLabel: "Option sélectionnée",
      addOnsLabel: "Suppléments demandés",
    },
  },
  nl: {
    currentFare: "Huidige prijs",
    selectedPackageMeta: "Het geselecteerde pakket blijft hieronder voorgeselecteerd",
    option: "Optie",
    chooseYourPackage: "Kies uw pakket",
    chooseYourServiceScope: "Kies uw servicebereik",
    priceOnRequest: "Prijs op aanvraag",
    planYourTailorMadeCruise: "Plan uw cruise op maat",
    servicePageBriefDescription:
      "Deze pagina werkt als servicegestuurde route. De pakketstructuur blijft, de prijs wordt na de briefing bevestigd.",
    planOnWhatsApp: "Plannen via WhatsApp",
    planOnTelegram: "Plannen via Telegram",
    emailYourBrief: "Briefing per e-mail",
    needHelpPlanning: "Hulp bij plannen?",
    needHelpChoosing: "Hulp bij kiezen?",
    liveSupportWhatsApp: "Live ondersteuning op WhatsApp",
    liveSupportTelegram: "Live ondersteuning op Telegram",
    selectPackage: "Pakket kiezen",
    from: "Vanaf",
    tailorMadePlan: "Plan op maat",
    selectPackageMobile: "Pakket kiezen",
    continueBooking: "Doorgaan met boeken",
    continue: "Doorgaan",
    quote: "Offerte",
    callNow: "Nu bellen",
    closeBookingModal: "Boekingsvenster sluiten",
    quoteMessageLines: {
      intro: "Hallo, ik wil graag prijs en beschikbaarheid voor deze Bosporus-service.",
      serviceLabel: "Service",
      optionLabel: "Geselecteerde optie",
      addOnsLabel: "Gewenste extra services",
    },
  },
  ru: {
    currentFare: "Текущая цена",
    selectedPackageMeta: "Выбранный пакет остаётся предзаполненным ниже",
    option: "Опция",
    chooseYourPackage: "Выберите свой пакет",
    chooseYourServiceScope: "Выберите объём услуги",
    priceOnRequest: "Цена по запросу",
    planYourTailorMadeCruise: "Спланируйте круиз под себя",
    servicePageBriefDescription:
      "Эта страница работает как сервисный маршрут. Структура пакетов сохраняется, цена подтверждается после брифа.",
    planOnWhatsApp: "Спланировать в WhatsApp",
    planOnTelegram: "Спланировать в Telegram",
    emailYourBrief: "Отправить бриф по e-mail",
    needHelpPlanning: "Нужна помощь с планированием?",
    needHelpChoosing: "Нужна помощь с выбором?",
    liveSupportWhatsApp: "Поддержка в WhatsApp",
    liveSupportTelegram: "Поддержка в Telegram",
    selectPackage: "Выбрать пакет",
    from: "От",
    tailorMadePlan: "Индивидуальный план",
    selectPackageMobile: "Выбрать пакет",
    continueBooking: "Продолжить бронирование",
    continue: "Продолжить",
    quote: "Цена",
    callNow: "Позвонить",
    closeBookingModal: "Закрыть окно бронирования",
    quoteMessageLines: {
      intro: "Здравствуйте, прошу прислать цену и наличие на эту прогулку по Босфору.",
      serviceLabel: "Услуга",
      optionLabel: "Выбранная опция",
      addOnsLabel: "Дополнительные услуги",
    },
  },
};

const CALENDAR: Record<BookingLocale, BookingCalendarStrings> = {
  en: {
    reserveNowPayOnboard: "Reserve now, pay onboard",
    requestNowConfirm: "Request now, confirm with operations",
    privateChartersReviewedAndConfirmed: "Private charters are reviewed and confirmed in writing",
    selectedDateAndGuestsUpdate: "Selected date and guests update the total below",
    privateCharterRequest: "Private charter request",
    sharedCruiseRequest: "Shared cruise request",
    booking: "Booking",
    selectYourPreferredDate: "Select your preferred date",
    soldOut: "Sold Out",
    closed: "Closed",
    lastSpots: "Last spots!",
    departureTime: "Departure Time",
    departure: "Departure",
    change: "Change",
    guests: "Guests",
    maxGuestsLine: (max) => `A maximum of ${max} guests can be added in one booking flow.`,
    privateCharterPrice: "private charter price",
    perPersonPriceLine: (price, count) => `€${price} × ${count} guest${count > 1 ? "s" : ""}`,
    standardDirectFare: "Standard direct fare",
    total: "Total",
    youSaveOnReservation: (savings) => `You save €${savings} on this reservation when you book the current fare.`,
    sameDayBookingClosed: "Same-Day Booking Closed",
    selectDepartureTime: "Select a Departure Time",
    continueToBooking: "Continue to booking",
    bookViaWhatsApp: "Book via WhatsApp",
    freeCancellation: "Free cancellation up to 24h before",
    weekdayDiscountLine: (label) => `${label} discount`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Hi, I'd like to book ${tourName} on ${date} for ${guests} guests.`,
    dayLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekdayShort: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" },
    perPerson: "/person",
    perGroup: "/group",
  },
  tr: {
    reserveNowPayOnboard: "Şimdi rezerve edin, teknede ödeyin",
    requestNowConfirm: "Şimdi talep edin, operasyonla teyit alın",
    privateChartersReviewedAndConfirmed: "Özel kiralamalar yazılı olarak incelenip onaylanır",
    selectedDateAndGuestsUpdate: "Seçilen tarih ve misafir sayısı toplamı aşağıda günceller",
    privateCharterRequest: "Özel kiralama talebi",
    sharedCruiseRequest: "Paylaşımlı tur talebi",
    booking: "Rezervasyon",
    selectYourPreferredDate: "Tercih ettiğiniz tarihi seçin",
    soldOut: "Tükendi",
    closed: "Kapalı",
    lastSpots: "Son yerler!",
    departureTime: "Kalkış Saati",
    departure: "Kalkış",
    change: "Değiştir",
    guests: "Misafirler",
    maxGuestsLine: (max) => `Bir rezervasyonda en fazla ${max} misafir eklenebilir.`,
    privateCharterPrice: "özel kiralama fiyatı",
    perPersonPriceLine: (price, count) => `€${price} × ${count} misafir`,
    standardDirectFare: "Standart doğrudan ücret",
    total: "Toplam",
    youSaveOnReservation: (savings) => `Güncel ücretle rezervasyon yaparak €${savings} tasarruf edersiniz.`,
    sameDayBookingClosed: "Aynı Gün Rezervasyon Kapalı",
    selectDepartureTime: "Kalkış Saati Seçin",
    continueToBooking: "Rezervasyona Devam",
    bookViaWhatsApp: "WhatsApp ile Rezervasyon",
    freeCancellation: "24 saat öncesine kadar ücretsiz iptal",
    weekdayDiscountLine: (label) => `${label} indirimi`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Merhaba, ${date} tarihinde ${guests} kişilik ${tourName} rezervasyonu yapmak istiyorum.`,
    dayLabels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    weekdayShort: { mon: "Pzt", tue: "Sal", wed: "Çar", thu: "Per", fri: "Cum", sat: "Cmt", sun: "Paz" },
    perPerson: "/kişi",
    perGroup: "/grup",
  },
  de: {
    reserveNowPayOnboard: "Jetzt reservieren, an Bord bezahlen",
    requestNowConfirm: "Jetzt anfragen, mit Operations bestätigen",
    privateChartersReviewedAndConfirmed: "Private Charter werden schriftlich geprüft und bestätigt",
    selectedDateAndGuestsUpdate: "Datum und Gästeanzahl aktualisieren die Gesamtsumme unten",
    privateCharterRequest: "Anfrage Private Charter",
    sharedCruiseRequest: "Anfrage Gruppenfahrt",
    booking: "Buchung",
    selectYourPreferredDate: "Wählen Sie Ihr Wunschdatum",
    soldOut: "Ausverkauft",
    closed: "Geschlossen",
    lastSpots: "Letzte Plätze!",
    departureTime: "Abfahrtszeit",
    departure: "Abfahrt",
    change: "Ändern",
    guests: "Gäste",
    maxGuestsLine: (max) => `Pro Buchung können maximal ${max} Gäste hinzugefügt werden.`,
    privateCharterPrice: "Privatcharter-Preis",
    perPersonPriceLine: (price, count) => `€${price} × ${count} Gast${count > 1 ? "e" : ""}`,
    standardDirectFare: "Standard-Direktpreis",
    total: "Gesamt",
    youSaveOnReservation: (savings) => `Sie sparen €${savings} bei dieser Buchung mit dem aktuellen Preis.`,
    sameDayBookingClosed: "Same-Day-Buchung geschlossen",
    selectDepartureTime: "Abfahrtszeit wählen",
    continueToBooking: "Weiter zur Buchung",
    bookViaWhatsApp: "Per WhatsApp buchen",
    freeCancellation: "Kostenlose Stornierung bis 24h vorher",
    weekdayDiscountLine: (label) => `${label}-Rabatt`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Hallo, ich möchte ${tourName} am ${date} für ${guests} Gäste buchen.`,
    dayLabels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    weekdayShort: { mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So" },
    perPerson: "/Person",
    perGroup: "/Gruppe",
  },
  fr: {
    reserveNowPayOnboard: "Réservez maintenant, payez à bord",
    requestNowConfirm: "Demandez maintenant, confirmez avec l'équipe",
    privateChartersReviewedAndConfirmed: "Les locations privées sont vérifiées et confirmées par écrit",
    selectedDateAndGuestsUpdate: "La date et le nombre de passagers mettent à jour le total ci-dessous",
    privateCharterRequest: "Demande de location privée",
    sharedCruiseRequest: "Demande de croisière partagée",
    booking: "Réservation",
    selectYourPreferredDate: "Sélectionnez votre date",
    soldOut: "Complet",
    closed: "Fermé",
    lastSpots: "Dernières places !",
    departureTime: "Heure de départ",
    departure: "Départ",
    change: "Modifier",
    guests: "Passagers",
    maxGuestsLine: (max) => `Un maximum de ${max} passagers peut être ajouté par réservation.`,
    privateCharterPrice: "tarif location privée",
    perPersonPriceLine: (price, count) => `€${price} × ${count} passager${count > 1 ? "s" : ""}`,
    standardDirectFare: "Tarif direct standard",
    total: "Total",
    youSaveOnReservation: (savings) => `Vous économisez €${savings} sur cette réservation au tarif actuel.`,
    sameDayBookingClosed: "Réservation jour J fermée",
    selectDepartureTime: "Sélectionnez une heure de départ",
    continueToBooking: "Continuer la réservation",
    bookViaWhatsApp: "Réserver via WhatsApp",
    freeCancellation: "Annulation gratuite jusqu'à 24h avant",
    weekdayDiscountLine: (label) => `Remise ${label}`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Bonjour, je souhaite réserver ${tourName} le ${date} pour ${guests} passagers.`,
    dayLabels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    weekdayShort: { mon: "Lun", tue: "Mar", wed: "Mer", thu: "Jeu", fri: "Ven", sat: "Sam", sun: "Dim" },
    perPerson: "/personne",
    perGroup: "/groupe",
  },
  nl: {
    reserveNowPayOnboard: "Reserveer nu, betaal aan boord",
    requestNowConfirm: "Vraag nu aan, bevestig met operations",
    privateChartersReviewedAndConfirmed: "Privécharters worden schriftelijk gecontroleerd en bevestigd",
    selectedDateAndGuestsUpdate: "Geselecteerde datum en gasten updaten het totaal hieronder",
    privateCharterRequest: "Privécharter-aanvraag",
    sharedCruiseRequest: "Gedeelde cruise-aanvraag",
    booking: "Boeking",
    selectYourPreferredDate: "Selecteer uw voorkeursdatum",
    soldOut: "Uitverkocht",
    closed: "Gesloten",
    lastSpots: "Laatste plekken!",
    departureTime: "Vertrektijd",
    departure: "Vertrek",
    change: "Wijzigen",
    guests: "Gasten",
    maxGuestsLine: (max) => `Per boeking kunnen maximaal ${max} gasten worden toegevoegd.`,
    privateCharterPrice: "privécharter-prijs",
    perPersonPriceLine: (price, count) => `€${price} × ${count} gast${count > 1 ? "en" : ""}`,
    standardDirectFare: "Standaard directe prijs",
    total: "Totaal",
    youSaveOnReservation: (savings) => `U bespaart €${savings} op deze reservering bij de huidige prijs.`,
    sameDayBookingClosed: "Same-day boeking gesloten",
    selectDepartureTime: "Kies een vertrektijd",
    continueToBooking: "Doorgaan naar boeking",
    bookViaWhatsApp: "Boeken via WhatsApp",
    freeCancellation: "Gratis annulering tot 24 uur van tevoren",
    weekdayDiscountLine: (label) => `${label}-korting`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Hallo, ik wil graag ${tourName} boeken op ${date} voor ${guests} gasten.`,
    dayLabels: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    weekdayShort: { mon: "Ma", tue: "Di", wed: "Wo", thu: "Do", fri: "Vr", sat: "Za", sun: "Zo" },
    perPerson: "/persoon",
    perGroup: "/groep",
  },
  ru: {
    reserveNowPayOnboard: "Забронируйте сейчас, оплатите на борту",
    requestNowConfirm: "Оставьте запрос, подтвердим в переписке",
    privateChartersReviewedAndConfirmed: "Частные чартеры проверяются и подтверждаются письменно",
    selectedDateAndGuestsUpdate: "Дата и количество гостей обновляют итог ниже",
    privateCharterRequest: "Запрос частного чартера",
    sharedCruiseRequest: "Запрос совместного круиза",
    booking: "Бронирование",
    selectYourPreferredDate: "Выберите удобную дату",
    soldOut: "Распродано",
    closed: "Закрыто",
    lastSpots: "Последние места!",
    departureTime: "Время отправления",
    departure: "Отправление",
    change: "Изменить",
    guests: "Гости",
    maxGuestsLine: (max) => `В одной брони можно добавить не более ${max} гостей.`,
    privateCharterPrice: "цена частного чартера",
    perPersonPriceLine: (price, count) => `€${price} × ${count} гост${count > 1 ? "ей" : "ь"}`,
    standardDirectFare: "Стандартный прямой тариф",
    total: "Итого",
    youSaveOnReservation: (savings) => `Бронируя по текущей цене, вы экономите €${savings}.`,
    sameDayBookingClosed: "Бронирование на сегодня закрыто",
    selectDepartureTime: "Выберите время отправления",
    continueToBooking: "Перейти к бронированию",
    bookViaWhatsApp: "Забронировать в Telegram",
    freeCancellation: "Бесплатная отмена за 24 часа",
    weekdayDiscountLine: (label) => `Скидка ${label}`,
    whatsappBookingMessage: (tourName, date, guests) =>
      `Здравствуйте, хочу забронировать ${tourName} на ${date} для ${guests} гостей.`,
    dayLabels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    weekdayShort: { mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Вс" },
    perPerson: "/гость",
    perGroup: "/группа",
  },
};

export function getBookingSidebarStrings(locale: BookingLocale): BookingSidebarStrings {
  return SIDEBAR[locale] ?? SIDEBAR.en;
}

export function getBookingCalendarStrings(locale: BookingLocale): BookingCalendarStrings {
  return CALENDAR[locale] ?? CALENDAR.en;
}

export function detectBookingLocaleFromPathname(pathname: string | null | undefined): BookingLocale {
  if (!pathname) return "en";
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "tr" || first === "de" || first === "fr" || first === "nl" || first === "ru") {
    return first;
  }
  return "en";
}
