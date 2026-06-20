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
    planOnTelegram: "Спланировать в WhatsApp",
    emailYourBrief: "Отправить бриф по e-mail",
    needHelpPlanning: "Нужна помощь с планированием?",
    needHelpChoosing: "Нужна помощь с выбором?",
    liveSupportWhatsApp: "Поддержка в WhatsApp",
    liveSupportTelegram: "Поддержка в WhatsApp",
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

export interface BookingModalStrings {
  // Header
  headerTitleForm: string;
  headerTitleSuccess: string;
  headerTitleError: string;
  closeModalAria: string;
  // Steps
  stepDetails: string;
  stepContact: string;
  stepConfirm: string;
  // Summary
  guestsLabel: (count: number) => string;
  perPerson: string;
  perGroup: string;
  addOnsLabel: string;
  subtotal: string;
  groupDiscount: string;
  total: string;
  weekdayDiscountFallback: string;
  weekdayDiscountSavingsLine: (label: string, savings: number) => string;
  freeCancellation: string;
  payOnboard: string;
  // Mixed packages
  mixedPackagesTitle: string;
  mixedPackagesHelp: string;
  package1: string;
  package2: string;
  guestsHeader: string;
  guestsOnPackage2: string;
  decreaseAria: string;
  increaseAria: string;
  mixedSummaryLine: (
    primaryGuests: number,
    primaryName: string,
    secondaryGuests: number,
    secondaryName: string,
  ) => string;
  // Form fields
  fullNameLabel: string;
  fullNamePlaceholder: string;
  fullNameError: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailError: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneError: string;
  specialRequestsLabel: string;
  specialRequestsPlaceholder: string;
  // Validation banner
  validationNameMissing: string;
  validationEmailInvalid: string;
  validationPhoneMissing: string;
  // Transfer
  transferTitle: string;
  transferNoExtraFee: string;
  transferAria: string;
  transferDinnerCruiseBody: string;
  transferSunsetCruiseBody: string;
  transferDinnerCruiseExpanded: string;
  transferSunsetCruiseExpanded: string;
  // Additional guests
  additionalGuestsTitle: string;
  additionalGuestsHelp: (count: number) => string;
  additionalGuestsPlaceholder: string;
  // Submit buttons
  confirmBookingCta: (total: number) => string;
  orBookViaContact: (label: string) => string;
  // Mobile trust
  mobileTrustLine: string;
  mobileNeedHelpLine: (phone: string) => string;
  // Loading
  loadingTitle: string;
  loadingSubtitle: string;
  // Error
  errorTitle: string;
  errorBody: string;
  tryAgainCta: string;
  bookViaContactInstead: (label: string) => string;
  // Success
  thankYouHeading: (name: string) => string;
  successBody: string;
  reservationIdLabel: string;
  confirmationSentLine: (email: string) => string;
  yourBookingLabel: string;
  meetingPointTitle: string;
  arriveEarlyNote: string;
  goodToKnowTitle: string;
  goodToKnowPaymentLine: string;
  goodToKnowCameraLine: string;
  goodToKnowCancellationLine: string;
  trackReservationCta: string;
  openInvoiceCta: string;
  openVoucherCta: string;
  addToCalendarCta: string;
  confirmViaContactCta: (label: string) => string;
  closeCta: string;
  confirmReservationMessage: (reservationId: string) => string;
  // WhatsApp/Telegram booking message lines
  whatsappBookingMessage: {
    intro: string;
    tour: string;
    date: string;
    time: string;
    guests: string;
    package: string;
    price: string;
    addOns: string;
    privateTransferNote: string;
    additionalGuests: string;
    total: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  // Notes (server-bound)
  transferSummaryNoteDinner: string;
  transferSummaryNoteSunset: string;
  transferSummaryNoteDefault: string;
  additionalGuestsNotePrefix: string;
  // Errors
  fallbackError: string;
}

const MODAL: Record<BookingLocale, BookingModalStrings> = {
  en: {
    headerTitleForm: "Complete Your Booking",
    headerTitleSuccess: "Booking Confirmed!",
    headerTitleError: "Booking Failed",
    closeModalAria: "Close booking modal",
    stepDetails: "Details",
    stepContact: "Contact",
    stepConfirm: "Confirm",
    guestsLabel: (count) => `${count} guest${count > 1 ? "s" : ""}`,
    perPerson: "/person",
    perGroup: "/group",
    addOnsLabel: "Add-ons:",
    subtotal: "Subtotal",
    groupDiscount: "Group discount",
    total: "Total",
    weekdayDiscountFallback: "Mon, Tue & Thu discount",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — €${savings}/person saved`,
    freeCancellation: "Free cancellation up to 24h before",
    payOnboard: "Pay onboard — no prepayment",
    mixedPackagesTitle: "Mixed packages",
    mixedPackagesHelp:
      "Some guests want a different package? Split the booking across two (e.g. alcohol + soft drinks).",
    package1: "Package 1",
    package2: "Package 2",
    guestsHeader: "Guests",
    guestsOnPackage2: "Guests on Package 2",
    decreaseAria: "Decrease",
    increaseAria: "Increase",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} guest${pg > 1 ? "s" : ""} on ${pn}, ${sg} guest${sg > 1 ? "s" : ""} on ${sn}.`,
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "John Doe",
    fullNameError: "Please enter your full name (at least 2 characters)",
    emailLabel: "Email *",
    emailPlaceholder: "john@example.com",
    emailError: "Please enter a valid email address",
    phoneLabel: "Phone *",
    phonePlaceholder: "+90 5xx xxx xx xx",
    phoneError: "Please enter a valid phone number",
    specialRequestsLabel: "Special Requests",
    specialRequestsPlaceholder: "Any special requests or requirements...",
    validationNameMissing: "Please enter your full name first.",
    validationEmailInvalid: "Please enter a valid email address.",
    validationPhoneMissing: "Please add a reachable phone number to continue.",
    transferTitle: "I want private transfer support",
    transferNoExtraFee:
      "(no extra fee at this step — we'll coordinate pickup details over WhatsApp)",
    transferAria: "Show private transfer details",
    transferDinnerCruiseBody:
      "Dinner cruise reservations already use the central hotel shuttle flow when the route includes it.",
    transferSunsetCruiseBody:
      "Sunset cruise guests can request hotel pickup and drop-off as an extra service.",
    transferDinnerCruiseExpanded:
      "The shared dinner cruise already works with the operational shuttle flow for central areas. If you want a private transfer instead, tick this option and our team will quote it separately.",
    transferSunsetCruiseExpanded:
      "The sunset cruise does not include a free hotel shuttle by default. If you want hotel pickup, drop-off, or a private transfer, tick this option and our team will quote it separately.",
    additionalGuestsTitle: "Add other passenger names",
    additionalGuestsHelp: (count) =>
      `Optional. You can add the names of the other ${count} guest${count > 1 ? "s" : ""} for smoother follow-up.`,
    additionalGuestsPlaceholder: "One passenger per line\nJane Doe\nMichael Doe",
    confirmBookingCta: (total) => `Confirm Booking — €${total}`,
    orBookViaContact: (label) => `Or Book via ${label}`,
    mobileTrustLine: "Free cancellation up to 24h before the tour • Pay onboard",
    mobileNeedHelpLine: (phone) => `Need help first? Call or WhatsApp ${phone}`,
    loadingTitle: "Creating your reservation...",
    loadingSubtitle: "This will only take a moment",
    errorTitle: "Something went wrong",
    errorBody:
      "Don't worry — no charges have been made. You can try again or reach us directly on WhatsApp for immediate assistance.",
    tryAgainCta: "Try Again",
    bookViaContactInstead: (label) => `Book via ${label} Instead`,
    thankYouHeading: (name) => `Thank you, ${name}!`,
    successBody:
      "Your reservation has been received. Our team will contact you shortly to confirm your booking.",
    reservationIdLabel: "Reservation ID",
    confirmationSentLine: (email) => `Confirmation sent to ${email}`,
    yourBookingLabel: "Your Booking",
    meetingPointTitle: "Meeting Point",
    arriveEarlyNote: "Please arrive 15 minutes before departure",
    goodToKnowTitle: "Good to Know",
    goodToKnowPaymentLine: "Payment is collected onboard — no prepayment needed",
    goodToKnowCameraLine: "Bring your camera — the views are spectacular!",
    goodToKnowCancellationLine: "Free cancellation up to 24 hours before departure",
    trackReservationCta: "Track Your Reservation",
    openInvoiceCta: "Open Reservation Invoice",
    openVoucherCta: "Open Travel Voucher",
    addToCalendarCta: "Add to Google Calendar",
    confirmViaContactCta: (label) => `Confirm via ${label}`,
    closeCta: "Close",
    confirmReservationMessage: (rid) =>
      `Hi! My reservation ID is ${rid}. I'd like to confirm my booking.`,
    whatsappBookingMessage: {
      intro: "Hi, I'd like to book:",
      tour: "Tour",
      date: "Date",
      time: "Time",
      guests: "Guests",
      package: "Package",
      price: "Price",
      addOns: "Add-ons",
      privateTransferNote: "Extra service: Private transfer requested (to be quoted separately)",
      additionalGuests: "Additional guests",
      total: "Total",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
    },
    transferSummaryNoteDinner:
      "Private transfer requested in addition to the standard dinner-cruise hotel shuttle flow. Quote separately and confirm after contact.",
    transferSummaryNoteSunset:
      "Extra hotel pickup / private transfer requested for the sunset cruise. Quote separately and confirm after contact.",
    transferSummaryNoteDefault:
      "Private transfer requested. Quote separately and confirm after contact.",
    additionalGuestsNotePrefix: "Additional guests",
    fallbackError: "Something went wrong",
  },
  tr: {
    headerTitleForm: "Rezervasyonunuzu Tamamlayın",
    headerTitleSuccess: "Rezervasyon Onaylandı!",
    headerTitleError: "Rezervasyon Başarısız",
    closeModalAria: "Rezervasyon penceresini kapat",
    stepDetails: "Detaylar",
    stepContact: "İletişim",
    stepConfirm: "Onay",
    guestsLabel: (count) => `${count} misafir`,
    perPerson: "/kişi",
    perGroup: "/grup",
    addOnsLabel: "Ek hizmetler:",
    subtotal: "Ara toplam",
    groupDiscount: "Grup indirimi",
    total: "Toplam",
    weekdayDiscountFallback: "Pzt, Sal ve Per indirimi",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — kişi başı €${savings} tasarruf`,
    freeCancellation: "24 saat öncesine kadar ücretsiz iptal",
    payOnboard: "Teknede ödeme — ön ödeme yok",
    mixedPackagesTitle: "Karma paketler",
    mixedPackagesHelp:
      "Bazı misafirler farklı paket mi istiyor? Rezervasyonu iki paket arasında bölün (örn. alkollü + alkolsüz).",
    package1: "Paket 1",
    package2: "Paket 2",
    guestsHeader: "Misafirler",
    guestsOnPackage2: "Paket 2 misafir sayısı",
    decreaseAria: "Azalt",
    increaseAria: "Arttır",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} misafir ${pn}, ${sg} misafir ${sn} paketinde.`,
    fullNameLabel: "Ad Soyad *",
    fullNamePlaceholder: "Ad Soyad",
    fullNameError: "Lütfen ad ve soyadınızı girin (en az 2 karakter)",
    emailLabel: "E-posta *",
    emailPlaceholder: "ornek@eposta.com",
    emailError: "Lütfen geçerli bir e-posta adresi girin",
    phoneLabel: "Telefon *",
    phonePlaceholder: "+90 5xx xxx xx xx",
    phoneError: "Lütfen geçerli bir telefon numarası girin",
    specialRequestsLabel: "Özel İstekler",
    specialRequestsPlaceholder: "Özel istek veya gereksinimleriniz...",
    validationNameMissing: "Lütfen önce ad ve soyadınızı girin.",
    validationEmailInvalid: "Lütfen geçerli bir e-posta adresi girin.",
    validationPhoneMissing: "Devam etmek için ulaşılabilir bir telefon numarası ekleyin.",
    transferTitle: "Özel transfer desteği istiyorum",
    transferNoExtraFee:
      "(bu adımda ek ücret yok — alış noktasını WhatsApp üzerinden ayarlayacağız)",
    transferAria: "Özel transfer detaylarını göster",
    transferDinnerCruiseBody:
      "Akşam yemekli tekne rezervasyonları, güzergâh uygunsa merkez otel shuttle akışını kullanır.",
    transferSunsetCruiseBody:
      "Gün batımı turu misafirleri ek hizmet olarak otel transferi talep edebilir.",
    transferDinnerCruiseExpanded:
      "Paylaşımlı akşam yemekli tur, merkez bölgeler için operasyonel shuttle akışıyla çalışır. Özel transfer isterseniz bu seçeneği işaretleyin, ekibimiz ayrı fiyatlandırır.",
    transferSunsetCruiseExpanded:
      "Gün batımı turu varsayılan olarak ücretsiz otel transferi içermez. Otel alış, bırakma veya özel transfer için bu seçeneği işaretleyin, ekibimiz ayrı fiyatlandırır.",
    additionalGuestsTitle: "Diğer misafir isimlerini ekleyin",
    additionalGuestsHelp: (count) =>
      `Opsiyonel. Süreci hızlandırmak için diğer ${count} misafirin ismini ekleyebilirsiniz.`,
    additionalGuestsPlaceholder: "Her satıra bir misafir\nAyşe Yılmaz\nMehmet Yılmaz",
    confirmBookingCta: (total) => `Rezervasyonu Onayla — €${total}`,
    orBookViaContact: (label) => `Veya ${label} ile Rezervasyon`,
    mobileTrustLine: "24 saat öncesine kadar ücretsiz iptal • Teknede ödeme",
    mobileNeedHelpLine: (phone) => `Önce yardım ister misiniz? Arayın veya WhatsApp: ${phone}`,
    loadingTitle: "Rezervasyonunuz oluşturuluyor...",
    loadingSubtitle: "Yalnızca birkaç saniye sürer",
    errorTitle: "Bir şeyler ters gitti",
    errorBody:
      "Endişelenmeyin — herhangi bir tahsilat yapılmadı. Tekrar deneyebilir veya anında yardım için doğrudan WhatsApp üzerinden bize ulaşabilirsiniz.",
    tryAgainCta: "Tekrar Dene",
    bookViaContactInstead: (label) => `${label} ile Rezervasyon Yap`,
    thankYouHeading: (name) => `Teşekkürler, ${name}!`,
    successBody:
      "Rezervasyonunuz alındı. Ekibimiz kısa süre içinde rezervasyonunuzu onaylamak için sizinle iletişime geçecek.",
    reservationIdLabel: "Rezervasyon Numarası",
    confirmationSentLine: (email) => `Onay ${email} adresine gönderildi`,
    yourBookingLabel: "Rezervasyonunuz",
    meetingPointTitle: "Buluşma Noktası",
    arriveEarlyNote: "Lütfen kalkıştan 15 dakika önce hazır olun",
    goodToKnowTitle: "Bilinmesi Gerekenler",
    goodToKnowPaymentLine: "Ödeme teknede alınır — ön ödeme gerekmez",
    goodToKnowCameraLine: "Fotoğraf makinenizi getirin — manzara muhteşem!",
    goodToKnowCancellationLine: "Kalkıştan 24 saat öncesine kadar ücretsiz iptal",
    trackReservationCta: "Rezervasyonunuzu Takip Edin",
    openInvoiceCta: "Rezervasyon Faturasını Aç",
    openVoucherCta: "Seyahat Voucher'ını Aç",
    addToCalendarCta: "Google Takvime Ekle",
    confirmViaContactCta: (label) => `${label} ile Onayla`,
    closeCta: "Kapat",
    confirmReservationMessage: (rid) =>
      `Merhaba! Rezervasyon numaram ${rid}. Rezervasyonumu onaylamak istiyorum.`,
    whatsappBookingMessage: {
      intro: "Merhaba, rezervasyon yapmak istiyorum:",
      tour: "Tur",
      date: "Tarih",
      time: "Saat",
      guests: "Misafirler",
      package: "Paket",
      price: "Fiyat",
      addOns: "Ek hizmetler",
      privateTransferNote: "Ek hizmet: Özel transfer talep edildi (ayrı fiyatlandırılacak)",
      additionalGuests: "Diğer misafirler",
      total: "Toplam",
      name: "İsim",
      email: "E-posta",
      phone: "Telefon",
      message: "Mesaj",
    },
    transferSummaryNoteDinner:
      "Standart akşam yemekli tur otel shuttle akışına ek olarak özel transfer talep edildi. Ayrı fiyatlandırın ve iletişimden sonra teyit edin.",
    transferSummaryNoteSunset:
      "Gün batımı turu için ek otel transferi / özel transfer talep edildi. Ayrı fiyatlandırın ve iletişimden sonra teyit edin.",
    transferSummaryNoteDefault:
      "Özel transfer talep edildi. Ayrı fiyatlandırın ve iletişimden sonra teyit edin.",
    additionalGuestsNotePrefix: "Diğer misafirler",
    fallbackError: "Bir şeyler ters gitti",
  },
  de: {
    headerTitleForm: "Buchung abschließen",
    headerTitleSuccess: "Buchung bestätigt!",
    headerTitleError: "Buchung fehlgeschlagen",
    closeModalAria: "Buchungsfenster schließen",
    stepDetails: "Details",
    stepContact: "Kontakt",
    stepConfirm: "Bestätigen",
    guestsLabel: (count) => `${count} Gast${count > 1 ? "e" : ""}`,
    perPerson: "/Person",
    perGroup: "/Gruppe",
    addOnsLabel: "Zusatzleistungen:",
    subtotal: "Zwischensumme",
    groupDiscount: "Gruppenrabatt",
    total: "Gesamt",
    weekdayDiscountFallback: "Mo-, Di- und Do-Rabatt",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — €${savings} pro Person gespart`,
    freeCancellation: "Kostenlose Stornierung bis 24h vorher",
    payOnboard: "Zahlung an Bord — keine Vorauszahlung",
    mixedPackagesTitle: "Gemischte Pakete",
    mixedPackagesHelp:
      "Möchten einige Gäste ein anderes Paket? Teilen Sie die Buchung auf zwei Pakete auf (z. B. Alkohol + alkoholfrei).",
    package1: "Paket 1",
    package2: "Paket 2",
    guestsHeader: "Gäste",
    guestsOnPackage2: "Gäste in Paket 2",
    decreaseAria: "Verringern",
    increaseAria: "Erhöhen",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} Gast${pg > 1 ? "e" : ""} bei ${pn}, ${sg} Gast${sg > 1 ? "e" : ""} bei ${sn}.`,
    fullNameLabel: "Vor- und Nachname *",
    fullNamePlaceholder: "Max Mustermann",
    fullNameError: "Bitte geben Sie Ihren vollständigen Namen ein (mindestens 2 Zeichen)",
    emailLabel: "E-Mail *",
    emailPlaceholder: "max@beispiel.de",
    emailError: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    phoneLabel: "Telefon *",
    phonePlaceholder: "+49 1xx xxx xx xx",
    phoneError: "Bitte geben Sie eine gültige Telefonnummer ein",
    specialRequestsLabel: "Besondere Wünsche",
    specialRequestsPlaceholder: "Besondere Wünsche oder Anforderungen...",
    validationNameMissing: "Bitte geben Sie zunächst Ihren vollständigen Namen ein.",
    validationEmailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    validationPhoneMissing: "Bitte geben Sie eine erreichbare Telefonnummer ein, um fortzufahren.",
    transferTitle: "Ich wünsche einen privaten Transfer",
    transferNoExtraFee:
      "(in diesem Schritt fallen keine zusätzlichen Kosten an — wir stimmen die Abholdetails per WhatsApp ab)",
    transferAria: "Details zum privaten Transfer anzeigen",
    transferDinnerCruiseBody:
      "Reservierungen für die Dinner-Tour nutzen bereits den zentralen Hotel-Shuttle, sofern die Route ihn vorsieht.",
    transferSunsetCruiseBody:
      "Gäste der Sunset-Tour können den Hoteltransfer als Zusatzleistung anfragen.",
    transferDinnerCruiseExpanded:
      "Die Shared-Dinner-Tour arbeitet bereits mit dem operativen Shuttle für zentrale Bereiche. Wenn Sie stattdessen einen privaten Transfer wünschen, aktivieren Sie diese Option und unser Team erstellt ein separates Angebot.",
    transferSunsetCruiseExpanded:
      "Die Sunset-Tour enthält standardmäßig keinen kostenlosen Hotel-Shuttle. Wenn Sie Hotelabholung, -rückfahrt oder einen privaten Transfer wünschen, aktivieren Sie diese Option und unser Team erstellt ein separates Angebot.",
    additionalGuestsTitle: "Weitere Gastnamen hinzufügen",
    additionalGuestsHelp: (count) =>
      `Optional. Sie können die Namen der weiteren ${count} Gäste angeben, damit die Abwicklung reibungslos läuft.`,
    additionalGuestsPlaceholder: "Ein Gast pro Zeile\nAnna Mustermann\nLukas Mustermann",
    confirmBookingCta: (total) => `Buchung bestätigen — €${total}`,
    orBookViaContact: (label) => `Oder per ${label} buchen`,
    mobileTrustLine: "Kostenlose Stornierung bis 24h vor der Tour • Zahlung an Bord",
    mobileNeedHelpLine: (phone) => `Zuerst Hilfe nötig? Rufen Sie an oder schreiben Sie auf WhatsApp ${phone}`,
    loadingTitle: "Ihre Reservierung wird erstellt...",
    loadingSubtitle: "Das dauert nur einen Moment",
    errorTitle: "Etwas ist schiefgelaufen",
    errorBody:
      "Keine Sorge — es wurde nichts abgebucht. Sie können es erneut versuchen oder uns für sofortige Unterstützung direkt auf WhatsApp erreichen.",
    tryAgainCta: "Erneut versuchen",
    bookViaContactInstead: (label) => `Stattdessen per ${label} buchen`,
    thankYouHeading: (name) => `Danke, ${name}!`,
    successBody:
      "Ihre Reservierung ist eingegangen. Unser Team wird sich in Kürze bei Ihnen melden, um die Buchung zu bestätigen.",
    reservationIdLabel: "Reservierungsnummer",
    confirmationSentLine: (email) => `Bestätigung gesendet an ${email}`,
    yourBookingLabel: "Ihre Buchung",
    meetingPointTitle: "Treffpunkt",
    arriveEarlyNote: "Bitte 15 Minuten vor Abfahrt eintreffen",
    goodToKnowTitle: "Gut zu wissen",
    goodToKnowPaymentLine: "Die Zahlung erfolgt an Bord — keine Vorauszahlung nötig",
    goodToKnowCameraLine: "Bringen Sie Ihre Kamera mit — die Aussicht ist atemberaubend!",
    goodToKnowCancellationLine: "Kostenlose Stornierung bis 24 Stunden vor Abfahrt",
    trackReservationCta: "Reservierung verfolgen",
    openInvoiceCta: "Reservierungsrechnung öffnen",
    openVoucherCta: "Reisevoucher öffnen",
    addToCalendarCta: "Zu Google Kalender hinzufügen",
    confirmViaContactCta: (label) => `Per ${label} bestätigen`,
    closeCta: "Schließen",
    confirmReservationMessage: (rid) =>
      `Hallo! Meine Reservierungsnummer ist ${rid}. Ich möchte meine Buchung bestätigen.`,
    whatsappBookingMessage: {
      intro: "Hallo, ich möchte buchen:",
      tour: "Tour",
      date: "Datum",
      time: "Uhrzeit",
      guests: "Gäste",
      package: "Paket",
      price: "Preis",
      addOns: "Zusatzleistungen",
      privateTransferNote: "Zusatzleistung: Privater Transfer angefragt (separates Angebot folgt)",
      additionalGuests: "Weitere Gäste",
      total: "Gesamt",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      message: "Nachricht",
    },
    transferSummaryNoteDinner:
      "Privater Transfer zusätzlich zum Standard-Hotel-Shuttle der Dinner-Tour angefragt. Separat anbieten und nach Kontakt bestätigen.",
    transferSummaryNoteSunset:
      "Zusätzliche Hotelabholung / privater Transfer für die Sunset-Tour angefragt. Separat anbieten und nach Kontakt bestätigen.",
    transferSummaryNoteDefault:
      "Privater Transfer angefragt. Separat anbieten und nach Kontakt bestätigen.",
    additionalGuestsNotePrefix: "Weitere Gäste",
    fallbackError: "Etwas ist schiefgelaufen",
  },
  fr: {
    headerTitleForm: "Finaliser votre réservation",
    headerTitleSuccess: "Réservation confirmée !",
    headerTitleError: "Échec de la réservation",
    closeModalAria: "Fermer la fenêtre de réservation",
    stepDetails: "Détails",
    stepContact: "Contact",
    stepConfirm: "Confirmation",
    guestsLabel: (count) => `${count} passager${count > 1 ? "s" : ""}`,
    perPerson: "/personne",
    perGroup: "/groupe",
    addOnsLabel: "Suppléments :",
    subtotal: "Sous-total",
    groupDiscount: "Remise groupe",
    total: "Total",
    weekdayDiscountFallback: "Remise lun., mar. et jeu.",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — €${savings} économisés par personne`,
    freeCancellation: "Annulation gratuite jusqu'à 24h avant",
    payOnboard: "Paiement à bord — sans prépaiement",
    mixedPackagesTitle: "Formules mixtes",
    mixedPackagesHelp:
      "Certains passagers souhaitent une autre formule ? Répartissez la réservation sur deux formules (ex. avec alcool + sans alcool).",
    package1: "Formule 1",
    package2: "Formule 2",
    guestsHeader: "Passagers",
    guestsOnPackage2: "Passagers en Formule 2",
    decreaseAria: "Diminuer",
    increaseAria: "Augmenter",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} passager${pg > 1 ? "s" : ""} sur ${pn}, ${sg} passager${sg > 1 ? "s" : ""} sur ${sn}.`,
    fullNameLabel: "Nom complet *",
    fullNamePlaceholder: "Jean Dupont",
    fullNameError: "Veuillez saisir votre nom complet (au moins 2 caractères)",
    emailLabel: "E-mail *",
    emailPlaceholder: "jean@exemple.fr",
    emailError: "Veuillez saisir une adresse e-mail valide",
    phoneLabel: "Téléphone *",
    phonePlaceholder: "+33 6 xx xx xx xx",
    phoneError: "Veuillez saisir un numéro de téléphone valide",
    specialRequestsLabel: "Demandes particulières",
    specialRequestsPlaceholder: "Demandes ou exigences particulières...",
    validationNameMissing: "Veuillez d'abord saisir votre nom complet.",
    validationEmailInvalid: "Veuillez saisir une adresse e-mail valide.",
    validationPhoneMissing: "Veuillez ajouter un numéro de téléphone joignable pour continuer.",
    transferTitle: "Je souhaite un transfert privé",
    transferNoExtraFee:
      "(aucun frais supplémentaire à cette étape — nous coordonnerons les détails de prise en charge via WhatsApp)",
    transferAria: "Afficher les détails du transfert privé",
    transferDinnerCruiseBody:
      "Les réservations du dîner-croisière utilisent déjà la navette hôtelière centrale lorsque l'itinéraire l'inclut.",
    transferSunsetCruiseBody:
      "Les passagers de la croisière au coucher du soleil peuvent demander le transfert hôtelier en supplément.",
    transferDinnerCruiseExpanded:
      "Le dîner-croisière partagé fonctionne déjà avec la navette opérationnelle pour les zones centrales. Si vous souhaitez un transfert privé à la place, cochez cette option et notre équipe vous fera un devis séparé.",
    transferSunsetCruiseExpanded:
      "La croisière au coucher du soleil n'inclut pas de navette hôtelière gratuite par défaut. Pour une prise en charge à l'hôtel, un retour ou un transfert privé, cochez cette option et notre équipe vous fera un devis séparé.",
    additionalGuestsTitle: "Ajouter les noms des autres passagers",
    additionalGuestsHelp: (count) =>
      `Optionnel. Vous pouvez ajouter les noms des ${count} autre${count > 1 ? "s" : ""} passager${count > 1 ? "s" : ""} pour faciliter le suivi.`,
    additionalGuestsPlaceholder: "Un passager par ligne\nMarie Dupont\nPaul Dupont",
    confirmBookingCta: (total) => `Confirmer la réservation — €${total}`,
    orBookViaContact: (label) => `Ou réserver via ${label}`,
    mobileTrustLine: "Annulation gratuite jusqu'à 24h avant la sortie • Paiement à bord",
    mobileNeedHelpLine: (phone) => `Besoin d'aide d'abord ? Appelez ou WhatsApp ${phone}`,
    loadingTitle: "Création de votre réservation...",
    loadingSubtitle: "Cela ne prendra qu'un instant",
    errorTitle: "Une erreur s'est produite",
    errorBody:
      "Pas d'inquiétude — aucun débit n'a été effectué. Vous pouvez réessayer ou nous joindre directement sur WhatsApp pour une assistance immédiate.",
    tryAgainCta: "Réessayer",
    bookViaContactInstead: (label) => `Réserver via ${label} à la place`,
    thankYouHeading: (name) => `Merci, ${name} !`,
    successBody:
      "Votre réservation a bien été reçue. Notre équipe vous contactera sous peu pour confirmer votre réservation.",
    reservationIdLabel: "Numéro de réservation",
    confirmationSentLine: (email) => `Confirmation envoyée à ${email}`,
    yourBookingLabel: "Votre réservation",
    meetingPointTitle: "Point de rendez-vous",
    arriveEarlyNote: "Merci d'arriver 15 minutes avant le départ",
    goodToKnowTitle: "Bon à savoir",
    goodToKnowPaymentLine: "Le paiement se fait à bord — aucun acompte requis",
    goodToKnowCameraLine: "Apportez votre appareil photo — les vues sont spectaculaires !",
    goodToKnowCancellationLine: "Annulation gratuite jusqu'à 24 heures avant le départ",
    trackReservationCta: "Suivre votre réservation",
    openInvoiceCta: "Ouvrir la facture de réservation",
    openVoucherCta: "Ouvrir le voucher de voyage",
    addToCalendarCta: "Ajouter à Google Agenda",
    confirmViaContactCta: (label) => `Confirmer via ${label}`,
    closeCta: "Fermer",
    confirmReservationMessage: (rid) =>
      `Bonjour ! Mon numéro de réservation est ${rid}. Je souhaite confirmer ma réservation.`,
    whatsappBookingMessage: {
      intro: "Bonjour, je souhaite réserver :",
      tour: "Tour",
      date: "Date",
      time: "Heure",
      guests: "Passagers",
      package: "Formule",
      price: "Prix",
      addOns: "Suppléments",
      privateTransferNote: "Service supplémentaire : transfert privé demandé (à devis séparé)",
      additionalGuests: "Autres passagers",
      total: "Total",
      name: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      message: "Message",
    },
    transferSummaryNoteDinner:
      "Transfert privé demandé en complément de la navette hôtelière standard du dîner-croisière. À devis séparé et à confirmer après contact.",
    transferSummaryNoteSunset:
      "Prise en charge hôtelière / transfert privé demandé pour la croisière au coucher du soleil. À devis séparé et à confirmer après contact.",
    transferSummaryNoteDefault:
      "Transfert privé demandé. À devis séparé et à confirmer après contact.",
    additionalGuestsNotePrefix: "Autres passagers",
    fallbackError: "Une erreur s'est produite",
  },
  nl: {
    headerTitleForm: "Voltooi uw boeking",
    headerTitleSuccess: "Boeking bevestigd!",
    headerTitleError: "Boeking mislukt",
    closeModalAria: "Boekingsvenster sluiten",
    stepDetails: "Details",
    stepContact: "Contact",
    stepConfirm: "Bevestigen",
    guestsLabel: (count) => `${count} gast${count > 1 ? "en" : ""}`,
    perPerson: "/persoon",
    perGroup: "/groep",
    addOnsLabel: "Extra services:",
    subtotal: "Subtotaal",
    groupDiscount: "Groepskorting",
    total: "Totaal",
    weekdayDiscountFallback: "Ma-, di- en do-korting",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — €${savings} per persoon bespaard`,
    freeCancellation: "Gratis annulering tot 24 uur van tevoren",
    payOnboard: "Aan boord betalen — geen vooruitbetaling",
    mixedPackagesTitle: "Gemengde pakketten",
    mixedPackagesHelp:
      "Willen sommige gasten een ander pakket? Verdeel de boeking over twee pakketten (bijv. met alcohol + zonder alcohol).",
    package1: "Pakket 1",
    package2: "Pakket 2",
    guestsHeader: "Gasten",
    guestsOnPackage2: "Gasten in Pakket 2",
    decreaseAria: "Verlagen",
    increaseAria: "Verhogen",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} gast${pg > 1 ? "en" : ""} bij ${pn}, ${sg} gast${sg > 1 ? "en" : ""} bij ${sn}.`,
    fullNameLabel: "Volledige naam *",
    fullNamePlaceholder: "Jan Jansen",
    fullNameError: "Voer uw volledige naam in (minimaal 2 tekens)",
    emailLabel: "E-mail *",
    emailPlaceholder: "jan@voorbeeld.nl",
    emailError: "Voer een geldig e-mailadres in",
    phoneLabel: "Telefoon *",
    phonePlaceholder: "+31 6 xxxx xxxx",
    phoneError: "Voer een geldig telefoonnummer in",
    specialRequestsLabel: "Speciale verzoeken",
    specialRequestsPlaceholder: "Speciale verzoeken of vereisten...",
    validationNameMissing: "Voer eerst uw volledige naam in.",
    validationEmailInvalid: "Voer een geldig e-mailadres in.",
    validationPhoneMissing: "Voeg een bereikbaar telefoonnummer toe om door te gaan.",
    transferTitle: "Ik wil ondersteuning bij privétransfer",
    transferNoExtraFee:
      "(geen extra kosten in deze stap — we stemmen de ophaaldetails af via WhatsApp)",
    transferAria: "Privétransfer-details tonen",
    transferDinnerCruiseBody:
      "Reserveringen voor de dinercruise gebruiken al de centrale hotelshuttle als de route dat ondersteunt.",
    transferSunsetCruiseBody:
      "Gasten van de zonsondergangcruise kunnen hoteltransfer als extra service aanvragen.",
    transferDinnerCruiseExpanded:
      "De gedeelde dinercruise werkt al met de operationele shuttle voor centrale gebieden. Wilt u in plaats daarvan een privétransfer? Vink deze optie aan en ons team maakt een aparte offerte.",
    transferSunsetCruiseExpanded:
      "De zonsondergangcruise omvat standaard geen gratis hotelshuttle. Wilt u hotelophaal, -afzet of een privétransfer? Vink deze optie aan en ons team maakt een aparte offerte.",
    additionalGuestsTitle: "Namen van overige passagiers toevoegen",
    additionalGuestsHelp: (count) =>
      `Optioneel. U kunt de namen van de overige ${count} gast${count > 1 ? "en" : ""} toevoegen voor een soepelere follow-up.`,
    additionalGuestsPlaceholder: "Eén passagier per regel\nAnna Jansen\nPiet Jansen",
    confirmBookingCta: (total) => `Boeking bevestigen — €${total}`,
    orBookViaContact: (label) => `Of boeken via ${label}`,
    mobileTrustLine: "Gratis annulering tot 24u voor de tour • Aan boord betalen",
    mobileNeedHelpLine: (phone) => `Eerst hulp nodig? Bel of WhatsApp ${phone}`,
    loadingTitle: "Uw reservering wordt gemaakt...",
    loadingSubtitle: "Dit duurt maar even",
    errorTitle: "Er is iets misgegaan",
    errorBody:
      "Geen zorgen — er is niets afgeschreven. U kunt het opnieuw proberen of ons direct via WhatsApp bereiken voor onmiddellijke hulp.",
    tryAgainCta: "Opnieuw proberen",
    bookViaContactInstead: (label) => `In plaats daarvan boeken via ${label}`,
    thankYouHeading: (name) => `Bedankt, ${name}!`,
    successBody:
      "Uw reservering is ontvangen. Ons team neemt binnenkort contact met u op om uw boeking te bevestigen.",
    reservationIdLabel: "Reserveringsnummer",
    confirmationSentLine: (email) => `Bevestiging verstuurd naar ${email}`,
    yourBookingLabel: "Uw boeking",
    meetingPointTitle: "Ontmoetingspunt",
    arriveEarlyNote: "Wees 15 minuten voor vertrek aanwezig",
    goodToKnowTitle: "Goed om te weten",
    goodToKnowPaymentLine: "Betaling vindt plaats aan boord — geen vooruitbetaling nodig",
    goodToKnowCameraLine: "Neem uw camera mee — de uitzichten zijn spectaculair!",
    goodToKnowCancellationLine: "Gratis annulering tot 24 uur voor vertrek",
    trackReservationCta: "Reservering volgen",
    openInvoiceCta: "Reserveringsfactuur openen",
    openVoucherCta: "Reisvoucher openen",
    addToCalendarCta: "Toevoegen aan Google Agenda",
    confirmViaContactCta: (label) => `Bevestigen via ${label}`,
    closeCta: "Sluiten",
    confirmReservationMessage: (rid) =>
      `Hallo! Mijn reserveringsnummer is ${rid}. Ik wil mijn boeking bevestigen.`,
    whatsappBookingMessage: {
      intro: "Hallo, ik wil graag boeken:",
      tour: "Tour",
      date: "Datum",
      time: "Tijd",
      guests: "Gasten",
      package: "Pakket",
      price: "Prijs",
      addOns: "Extra services",
      privateTransferNote: "Extra service: privétransfer aangevraagd (apart te offreren)",
      additionalGuests: "Overige gasten",
      total: "Totaal",
      name: "Naam",
      email: "E-mail",
      phone: "Telefoon",
      message: "Bericht",
    },
    transferSummaryNoteDinner:
      "Privétransfer aangevraagd naast de standaard hotelshuttle van de dinercruise. Apart offreren en na contact bevestigen.",
    transferSummaryNoteSunset:
      "Extra hotelophaal / privétransfer aangevraagd voor de zonsondergangcruise. Apart offreren en na contact bevestigen.",
    transferSummaryNoteDefault:
      "Privétransfer aangevraagd. Apart offreren en na contact bevestigen.",
    additionalGuestsNotePrefix: "Overige gasten",
    fallbackError: "Er is iets misgegaan",
  },
  ru: {
    headerTitleForm: "Завершите бронирование",
    headerTitleSuccess: "Бронирование подтверждено!",
    headerTitleError: "Ошибка бронирования",
    closeModalAria: "Закрыть окно бронирования",
    stepDetails: "Детали",
    stepContact: "Контакты",
    stepConfirm: "Подтверждение",
    guestsLabel: (count) => `${count} гост${count > 1 ? "ей" : "ь"}`,
    perPerson: "/гость",
    perGroup: "/группа",
    addOnsLabel: "Доп. услуги:",
    subtotal: "Промежуточный итог",
    groupDiscount: "Групповая скидка",
    total: "Итого",
    weekdayDiscountFallback: "Скидка пн., вт. и чт.",
    weekdayDiscountSavingsLine: (label, savings) => `${label} — экономия €${savings} с человека`,
    freeCancellation: "Бесплатная отмена за 24 часа",
    payOnboard: "Оплата на борту — без предоплаты",
    mixedPackagesTitle: "Смешанные пакеты",
    mixedPackagesHelp:
      "Кому-то из гостей нужен другой пакет? Разделите бронь между двумя пакетами (например, с алкоголем + без алкоголя).",
    package1: "Пакет 1",
    package2: "Пакет 2",
    guestsHeader: "Гости",
    guestsOnPackage2: "Гости на Пакете 2",
    decreaseAria: "Уменьшить",
    increaseAria: "Увеличить",
    mixedSummaryLine: (pg, pn, sg, sn) =>
      `${pg} гост${pg > 1 ? "ей" : "ь"} на ${pn}, ${sg} гост${sg > 1 ? "ей" : "ь"} на ${sn}.`,
    fullNameLabel: "ФИО *",
    fullNamePlaceholder: "Иван Иванов",
    fullNameError: "Введите полное имя (минимум 2 символа)",
    emailLabel: "E-mail *",
    emailPlaceholder: "ivan@example.ru",
    emailError: "Введите корректный e-mail",
    phoneLabel: "Телефон *",
    phonePlaceholder: "+7 9xx xxx xx xx",
    phoneError: "Введите корректный номер телефона",
    specialRequestsLabel: "Особые пожелания",
    specialRequestsPlaceholder: "Особые пожелания или требования...",
    validationNameMissing: "Пожалуйста, сначала укажите ваше полное имя.",
    validationEmailInvalid: "Пожалуйста, укажите корректный e-mail.",
    validationPhoneMissing: "Добавьте действующий номер телефона, чтобы продолжить.",
    transferTitle: "Хочу частный трансфер",
    transferNoExtraFee:
      "(на этом шаге без доплат — детали подачи согласуем в Telegram)",
    transferAria: "Показать детали частного трансфера",
    transferDinnerCruiseBody:
      "Бронирования ужина-круиза уже используют центральный отельный шаттл, если маршрут это позволяет.",
    transferSunsetCruiseBody:
      "Гости круиза на закате могут заказать трансфер от отеля как дополнительную услугу.",
    transferDinnerCruiseExpanded:
      "Совместный ужин-круиз уже работает по операционной схеме шаттла для центральных районов. Если нужен частный трансфер, отметьте опцию — команда выставит отдельный счёт.",
    transferSunsetCruiseExpanded:
      "Круиз на закате по умолчанию не включает бесплатный отельный шаттл. Если нужны трансфер от отеля, в отель или частный трансфер, отметьте опцию — команда выставит отдельный счёт.",
    additionalGuestsTitle: "Добавить имена остальных гостей",
    additionalGuestsHelp: (count) =>
      `По желанию. Можно указать имена остальных ${count} гостей для удобства связи.`,
    additionalGuestsPlaceholder: "По одному гостю в строке\nАнна Иванова\nПётр Иванов",
    confirmBookingCta: (total) => `Подтвердить бронирование — €${total}`,
    orBookViaContact: (label) => `Или забронировать через ${label}`,
    mobileTrustLine: "Бесплатная отмена за 24 часа до тура • Оплата на борту",
    mobileNeedHelpLine: (phone) => `Нужна помощь? Позвоните или напишите в Telegram ${phone}`,
    loadingTitle: "Создаём ваше бронирование...",
    loadingSubtitle: "Это займёт всего мгновение",
    errorTitle: "Что-то пошло не так",
    errorBody:
      "Не беспокойтесь — никаких списаний не было. Попробуйте ещё раз или напишите нам в Telegram для немедленной помощи.",
    tryAgainCta: "Попробовать снова",
    bookViaContactInstead: (label) => `Забронировать через ${label}`,
    thankYouHeading: (name) => `Спасибо, ${name}!`,
    successBody:
      "Ваша заявка получена. Команда свяжется с вами в ближайшее время для подтверждения брони.",
    reservationIdLabel: "Номер бронирования",
    confirmationSentLine: (email) => `Подтверждение отправлено на ${email}`,
    yourBookingLabel: "Ваше бронирование",
    meetingPointTitle: "Место встречи",
    arriveEarlyNote: "Пожалуйста, приходите за 15 минут до отправления",
    goodToKnowTitle: "Полезно знать",
    goodToKnowPaymentLine: "Оплата производится на борту — предоплата не требуется",
    goodToKnowCameraLine: "Возьмите камеру — виды потрясающие!",
    goodToKnowCancellationLine: "Бесплатная отмена за 24 часа до отправления",
    trackReservationCta: "Отследить бронирование",
    openInvoiceCta: "Открыть счёт бронирования",
    openVoucherCta: "Открыть туристический ваучер",
    addToCalendarCta: "Добавить в Google Календарь",
    confirmViaContactCta: (label) => `Подтвердить через ${label}`,
    closeCta: "Закрыть",
    confirmReservationMessage: (rid) =>
      `Здравствуйте! Мой номер бронирования ${rid}. Хочу подтвердить бронь.`,
    whatsappBookingMessage: {
      intro: "Здравствуйте, хочу забронировать:",
      tour: "Тур",
      date: "Дата",
      time: "Время",
      guests: "Гости",
      package: "Пакет",
      price: "Цена",
      addOns: "Доп. услуги",
      privateTransferNote: "Доп. услуга: запрошен частный трансфер (стоимость отдельно)",
      additionalGuests: "Другие гости",
      total: "Итого",
      name: "Имя",
      email: "E-mail",
      phone: "Телефон",
      message: "Сообщение",
    },
    transferSummaryNoteDinner:
      "Запрошен частный трансфер в дополнение к стандартному отельному шаттлу ужина-круиза. Оценить отдельно и подтвердить после связи.",
    transferSummaryNoteSunset:
      "Запрошена дополнительная подача / частный трансфер для круиза на закате. Оценить отдельно и подтвердить после связи.",
    transferSummaryNoteDefault:
      "Запрошен частный трансфер. Оценить отдельно и подтвердить после связи.",
    additionalGuestsNotePrefix: "Другие гости",
    fallbackError: "Что-то пошло не так",
  },
};

export function getBookingSidebarStrings(locale: BookingLocale): BookingSidebarStrings {
  return SIDEBAR[locale] ?? SIDEBAR.en;
}

export function getBookingCalendarStrings(locale: BookingLocale): BookingCalendarStrings {
  return CALENDAR[locale] ?? CALENDAR.en;
}

export function getBookingModalStrings(locale: BookingLocale): BookingModalStrings {
  return MODAL[locale] ?? MODAL.en;
}

export function detectBookingLocaleFromPathname(pathname: string | null | undefined): BookingLocale {
  if (!pathname) return "en";
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "tr" || first === "de" || first === "fr" || first === "nl" || first === "ru") {
    return first;
  }
  return "en";
}

// CoreBookingPlanner — the product-first planner shown in the hero + on the
// reservation page. Display strings only; all state/handlers stay in the
// component.
export interface BookingPlannerStrings {
  eyebrow: string;
  plannerSubtitle: string;
  chooseProductFirstSetDate: string;
  chooseProductFirstContinue: string;
  selected: string;
  selectedPlan: string;
  selectPackage: string;
  from: string;
  save: (n: number) => string;
  upToGuests: (n: number) => string;
  optionsCount: (n: number) => string;
  guests: string;
  guest: string;
  decreaseGuests: string;
  increaseGuests: string;
  openingBooking: string;
  continueBooking: string;
  packageLabel: (name: string) => string;
  changePackage: (name: string) => string;
  bookingChoices: (n: number) => string;
  packageSectionLabel: string;
  tapToChange: string;
  secureBookingPath: string;
  departureArrangedAfter: string;
  groupDiscountApplied: string;
  autoApplied: string;
  forGuests: (n: number) => string;
  addMoreGuestsForDiscount: (needed: number) => string;
}

const PLANNER: Record<BookingLocale, BookingPlannerStrings> = {
  en: {
    eyebrow: "Core Booking Planner",
    plannerSubtitle: "Cleaner product selection, the same date validations, and a shorter booking path.",
    chooseProductFirstSetDate: "Choose the product first, then set date and guests",
    chooseProductFirstContinue: "Choose the product first, then continue to booking",
    selected: "Selected",
    selectedPlan: "Selected Plan",
    selectPackage: "Select package",
    from: "From",
    save: (n) => `Save €${n}`,
    upToGuests: (n) => `Up to ${n} guests`,
    optionsCount: (n) => `${n} options`,
    guests: "Guests",
    guest: "Guest",
    decreaseGuests: "Decrease guests",
    increaseGuests: "Increase guests",
    openingBooking: "Opening booking…",
    continueBooking: "Continue booking",
    packageLabel: (name) => `${name} package`,
    changePackage: (name) => `Change package — currently ${name}`,
    bookingChoices: (n) => `${n} booking choice${n === 1 ? "" : "s"}`,
    packageSectionLabel: "Package",
    tapToChange: "tap to change",
    secureBookingPath: "Fast secure checkout",
    departureArrangedAfter: "Departure time is arranged with you after booking",
    groupDiscountApplied: "Group discount applied",
    autoApplied: "auto-applied",
    forGuests: (n) => `for ${n} guests`,
    addMoreGuestsForDiscount: (needed) =>
      `Add ${needed} more guest${needed === 1 ? "" : "s"} to save 10% — sunset & dinner cruises only.`,
  },
  tr: {
    eyebrow: "Rezervasyon Planlayıcı",
    plannerSubtitle: "Daha sade ürün seçimi, aynı tarih kontrolleri ve daha kısa rezervasyon yolu.",
    chooseProductFirstSetDate: "Önce ürünü seçin, sonra tarih ve kişi sayısını belirleyin",
    chooseProductFirstContinue: "Önce ürünü seçin, sonra rezervasyona geçin",
    selected: "Seçildi",
    selectedPlan: "Seçili Paket",
    selectPackage: "Paket seçin",
    from: "Başlangıç",
    save: (n) => `€${n} tasarruf`,
    upToGuests: (n) => `${n} kişiye kadar`,
    optionsCount: (n) => `${n} seçenek`,
    guests: "Kişi",
    guest: "Kişi",
    decreaseGuests: "Kişi sayısını azalt",
    increaseGuests: "Kişi sayısını artır",
    openingBooking: "Rezervasyon açılıyor…",
    continueBooking: "Rezervasyona devam et",
    packageLabel: (name) => `${name} paketi`,
    changePackage: (name) => `Paketi değiştir — şu an ${name}`,
    bookingChoices: (n) => `${n} rezervasyon seçeneği`,
    packageSectionLabel: "Paket",
    tapToChange: "değiştirmek için dokunun",
    secureBookingPath: "Hızlı güvenli ödeme",
    departureArrangedAfter: "Kalkış saati rezervasyon sonrası sizinle birlikte ayarlanır",
    groupDiscountApplied: "Grup indirimi uygulandı",
    autoApplied: "otomatik uygulandı",
    forGuests: (n) => `${n} kişi için`,
    addMoreGuestsForDiscount: (needed) =>
      `%10 indirim için ${needed} kişi daha ekleyin — yalnızca gün batımı ve akşam yemekli turlar.`,
  },
  de: {
    eyebrow: "Buchungsplaner",
    plannerSubtitle: "Übersichtlichere Produktauswahl, dieselben Datumsprüfungen und ein kürzerer Buchungsweg.",
    chooseProductFirstSetDate: "Zuerst das Produkt wählen, dann Datum und Gäste festlegen",
    chooseProductFirstContinue: "Zuerst das Produkt wählen, dann zur Buchung",
    selected: "Ausgewählt",
    selectedPlan: "Gewähltes Paket",
    selectPackage: "Paket wählen",
    from: "Ab",
    save: (n) => `€${n} sparen`,
    upToGuests: (n) => `Bis zu ${n} Gäste`,
    optionsCount: (n) => `${n} Optionen`,
    guests: "Gäste",
    guest: "Gast",
    decreaseGuests: "Gäste verringern",
    increaseGuests: "Gäste erhöhen",
    openingBooking: "Buchung wird geöffnet…",
    continueBooking: "Weiter zur Buchung",
    packageLabel: (name) => `${name} Paket`,
    changePackage: (name) => `Paket ändern — aktuell ${name}`,
    bookingChoices: (n) => `${n} Buchungsoption${n === 1 ? "" : "en"}`,
    packageSectionLabel: "Paket",
    tapToChange: "zum Ändern tippen",
    secureBookingPath: "Schnelle sichere Buchung",
    departureArrangedAfter: "Die Abfahrtszeit wird nach der Buchung mit Ihnen abgestimmt",
    groupDiscountApplied: "Gruppenrabatt angewendet",
    autoApplied: "automatisch angewendet",
    forGuests: (n) => `für ${n} Gäste`,
    addMoreGuestsForDiscount: (needed) =>
      `Fügen Sie ${needed} weitere${needed === 1 ? "n" : ""} Gast${needed === 1 ? "" : "e"} hinzu, um 10% zu sparen — nur Sunset- und Dinner-Touren.`,
  },
  fr: {
    eyebrow: "Planificateur de réservation",
    plannerSubtitle: "Sélection de produit plus claire, les mêmes validations de date et un parcours de réservation plus court.",
    chooseProductFirstSetDate: "Choisissez d'abord le produit, puis la date et les invités",
    chooseProductFirstContinue: "Choisissez d'abord le produit, puis continuez la réservation",
    selected: "Sélectionné",
    selectedPlan: "Forfait sélectionné",
    selectPackage: "Choisir un forfait",
    from: "À partir de",
    save: (n) => `Économisez €${n}`,
    upToGuests: (n) => `Jusqu'à ${n} invités`,
    optionsCount: (n) => `${n} options`,
    guests: "Invités",
    guest: "Invité",
    decreaseGuests: "Diminuer les invités",
    increaseGuests: "Augmenter les invités",
    openingBooking: "Ouverture de la réservation…",
    continueBooking: "Continuer la réservation",
    packageLabel: (name) => `Forfait ${name}`,
    changePackage: (name) => `Changer de forfait — actuellement ${name}`,
    bookingChoices: (n) => `${n} choix de réservation`,
    packageSectionLabel: "Formule",
    tapToChange: "toucher pour changer",
    secureBookingPath: "Réservation sécurisée rapide",
    departureArrangedAfter: "L'heure de départ est convenue avec vous après la réservation",
    groupDiscountApplied: "Remise de groupe appliquée",
    autoApplied: "appliquée automatiquement",
    forGuests: (n) => `pour ${n} invités`,
    addMoreGuestsForDiscount: (needed) =>
      `Ajoutez ${needed} invité${needed === 1 ? "" : "s"} de plus pour économiser 10% — croisières coucher de soleil et dîner uniquement.`,
  },
  nl: {
    eyebrow: "Boekingsplanner",
    plannerSubtitle: "Overzichtelijkere productkeuze, dezelfde datumcontroles en een korter boekingstraject.",
    chooseProductFirstSetDate: "Kies eerst het product, stel daarna datum en gasten in",
    chooseProductFirstContinue: "Kies eerst het product, ga daarna verder met boeken",
    selected: "Geselecteerd",
    selectedPlan: "Geselecteerd pakket",
    selectPackage: "Pakket kiezen",
    from: "Vanaf",
    save: (n) => `Bespaar €${n}`,
    upToGuests: (n) => `Tot ${n} gasten`,
    optionsCount: (n) => `${n} opties`,
    guests: "Gasten",
    guest: "Gast",
    decreaseGuests: "Gasten verlagen",
    increaseGuests: "Gasten verhogen",
    openingBooking: "Boeking openen…",
    continueBooking: "Doorgaan met boeken",
    packageLabel: (name) => `${name} pakket`,
    changePackage: (name) => `Pakket wijzigen — momenteel ${name}`,
    bookingChoices: (n) => `${n} boekingsoptie${n === 1 ? "" : "s"}`,
    packageSectionLabel: "Pakket",
    tapToChange: "tik om te wijzigen",
    secureBookingPath: "Snel veilig afrekenen",
    departureArrangedAfter: "De vertrektijd wordt na de boeking met u afgestemd",
    groupDiscountApplied: "Groepskorting toegepast",
    autoApplied: "automatisch toegepast",
    forGuests: (n) => `voor ${n} gasten`,
    addMoreGuestsForDiscount: (needed) =>
      `Voeg ${needed} gast${needed === 1 ? "" : "en"} meer toe om 10% te besparen — alleen zonsondergang- en dinercruises.`,
  },
  ru: {
    eyebrow: "Планировщик бронирования",
    plannerSubtitle: "Более понятный выбор услуги, те же проверки даты и более короткий путь бронирования.",
    chooseProductFirstSetDate: "Сначала выберите услугу, затем дату и число гостей",
    chooseProductFirstContinue: "Сначала выберите услугу, затем перейдите к бронированию",
    selected: "Выбрано",
    selectedPlan: "Выбранный пакет",
    selectPackage: "Выбрать пакет",
    from: "от",
    save: (n) => `Скидка €${n}`,
    upToGuests: (n) => `До ${n} гостей`,
    optionsCount: (n) => `${n} варианта`,
    guests: "Гости",
    guest: "Гость",
    decreaseGuests: "Уменьшить число гостей",
    increaseGuests: "Увеличить число гостей",
    openingBooking: "Открываем бронирование…",
    continueBooking: "Продолжить бронирование",
    packageLabel: (name) => `Пакет ${name}`,
    changePackage: (name) => `Изменить пакет — сейчас ${name}`,
    bookingChoices: (n) => `${n} вариант${n % 10 === 1 && n % 100 !== 11 ? "" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "а" : "ов"} бронирования`,
    packageSectionLabel: "Пакет",
    tapToChange: "нажмите, чтобы изменить",
    secureBookingPath: "Быстрое безопасное оформление",
    departureArrangedAfter: "Время отправления согласуется с вами после бронирования",
    groupDiscountApplied: "Групповая скидка применена",
    autoApplied: "применена автоматически",
    forGuests: (n) => `для ${n} гостей`,
    addMoreGuestsForDiscount: (needed) =>
      `Добавьте ещё ${needed} гост${needed % 10 === 1 && needed % 100 !== 11 ? "я" : "ей"}, чтобы получить скидку 10% — только закатные и ужинные круизы.`,
  },
};

export function getBookingPlannerStrings(locale: BookingLocale): BookingPlannerStrings {
  return PLANNER[locale] ?? PLANNER.en;
}
