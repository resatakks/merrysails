import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart, Camera, Wine, Music } from "lucide-react";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL, WHATSAPP_URL, TURSAB_LICENSE_NUMBER } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";

type Product = { title: string; desc: string; href: string; icon: typeof Heart; badge?: string };
type LocaleContent = {
 metaTitle: string;
 metaDescription: string;
 canonicalPath: string;
 eyebrow: string;
 h1: string;
 intro: string;
 capsule: string;
 productsHeading: string;
 products: Product[];
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
 metaTitle: "İstanbul Boğaz Turu Çiftler İçin",
 metaDescription:
 "Çiftler için Boğaz turu: gün batımı €30 (Pzt/Sal/Per), özel akşam yemeği €280, evlilik teklifi yatı. Aracısız doğrudan rezervasyon.",
 canonicalPath: "/tr/bosphorus-cruise-for-couples",
 eyebrow: "Romantizm · İki kişilik",
 h1: "İstanbul Boğaz Turu Çiftler İçin",
 intro: "Üç format çiftler için farklı çalışır. Paylaşımlı gün batımı en hafifi — çift için 2 saat altın saat €30-€40. Paylaşımlı akşam yemeği bütün akşamı kapsar — €60-€180. Özel yat tüm tekneyi €280'den ayırır — yıldönümü ve evlilik teklifi için en uygunu.",
 capsule: "İstanbul'da çiftler için Boğaz turu üç biçimde işler: paylaşımlı gün batımı €30 (Pzt/Sal/Per), paylaşımlı akşam yemeği €30-€90 (otel transferi dahil), özel yat €280'den (sadece çift için tüm tekne). Kişi başı yat değil, tekne başı fiyat. Yıldönümü veya evlilik teklifi sürprizi planlıyorsanız, yat formatı sürpriz mekanizmasını destekler — paylaşımlı format etmez.",
 productsHeading: "Çiftler için üç format — hangisi sizin akşamınıza uygun?",
 products: [
 { icon: Camera, title: "Paylaşımlı gün batımı (€30-€40)", desc: "En hafif format — 2 saat altın saat. Karada akşam yemeği planı varsa ideal. Salı & Perşembe €30, diğer günler €34. Şaraplı seçenek €35-€40.", href: "/tr/cruises/bosphorus-sunset-cruise", badge: "Popüler" },
 { icon: Wine, title: "Paylaşımlı akşam yemeği (€30-€90)", desc: "Tam akşam: yemek + Türk gecesi + 3,5 saatlik rota. Otel transferi dahil. Çiftlerin çoğu Silver Alkollü €45'ı seçer.", href: "/tr/istanbul-dinner-cruise" },
 { icon: Heart, title: "Yatta özel akşam yemeği (€280+)", desc: "Sadece ikiniz (veya size en yakınlarınız). Tüm yat sizindir, özel zamanlama, menü rezervasyonda seçilir. Yıldönümü için en iyi.", href: "/tr/private-bosphorus-dinner-cruise", badge: "Premium" },
 { icon: Music, title: "Evlilik teklifi yatı (€280+)", desc: "Kruvazın evlilik teklifi anı olduğu durumda — sürpriz dekoru, fotoğrafçı, kemancı, gün batımına göre rota.", href: "/tr/proposal-yacht-rental-istanbul" },
 ],
 faqHeading: "Çiftler için SSS",
 faqs: [
 { q: "Çiftler için en uygun Boğaz turu hangisidir?", a: "Hafif ilk gece için paylaşımlı gün batımı (€30 Pzt/Sal/Per). Tam akşam için paylaşımlı akşam yemeği (€30-€90 dört paket). Yıldönümü veya teklif için özel yat (€280+, tüm tekne)." },
 { q: "Paylaşımlı akşam yemeği çift için kalabalık değil mi?", a: "Bağlıdır. Paylaşımlı tekne festive — başka çiftler ve küçük gruplar var, canlı Türk gecesi eğlencesi, restoran sessizliği değil. Sadece-ikiniz isteği için özel yatta akşam yemeği (€280+) — aynı Boğaz rotası, paylaşımlı oturma yok." },
 { q: "İki kişi için paylaşımlı ve özel arasındaki fiyat farkı?", a: "2 kişi için: paylaşımlı gün batımı = €60-€68. Paylaşımlı dinner Silver Soft = €60. Özel 2-saat yat = €280 (tüm tekne, grup büyüklüğüne bakılmaz). Özele geçiş paylaşımlının 4-5 katı ama tüm tekne, özel zamanlama, başka misafir yok." },
 { q: "Paylaşımlı kruvazda evlilik teklifi ekleyebilir miyiz?", a: "Hayır. Sürpriz teklif kurgusu (dekor, gizli fotoğrafçı, yüzük sunum zamanlaması) sadece özel yat kiralamada çalışır — tekne sadece çift için ayrıldığında. Paylaşımlı format sürpriz mekanizmasını destekleyemez." },
 ],
 ctaHeading: "Boğaz akşamını planlayın",
 ctaBody: "Düşündüğünüz akşamı + format tercihinizi gönderin — 24 saat içinde tam plan dönüyoruz.",
 ctaPrimary: "Tüm seçenekleri gör",
 ctaWhatsapp: "Planlama ekibine WhatsApp gönder",
 whatsappPrefill: "Merhaba MerrySails! Çift olarak Boğaz turu planlıyoruz — gün batımı, akşam yemeği ve özel yat arasında [tarih] için bize hangisi uyar?",
 trustLine: `Meryem Yıldız Travel altında işletilir · TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} · 2001'den bu yana Boğaz'da 50.000+ misafir.`,
 reserveLabel: "€30'dan rezerve et",
 },
 de: {
 metaTitle: "Bosporus-Kreuzfahrt für Paare Istanbul",
 metaDescription:
 "Bosporus-Kreuzfahrt für Paare: Sonnenuntergang €30 (Mo/Di/Do), privates Dinner €280, Antrags-Yacht. Direktbuchung ohne OTA-Aufschlag.",
 canonicalPath: "/de/bosphorus-cruise-for-couples",
 eyebrow: "Romantik · Zu zweit",
 h1: "Bosporus-Kreuzfahrt für Paare Istanbul",
 intro: "Drei Formate funktionieren unterschiedlich für Paare. Geteilter Sonnenuntergang ist die leichteste Option — 2 Stunden Goldene Stunde für €30-€40 pro Paar. Geteiltes Dinner deckt einen ganzen Abend ab — €60-€180. Private Yacht reserviert das ganze Schiff ab €280 — ideal für Hochzeitstag oder Antrag.",
 capsule: "Bosporus-Kreuzfahrt für Paare in Istanbul gibt es in drei Formaten: geteilter Sonnenuntergang €30 (Mo/Di/Do), geteiltes Dinner €30-€90 (Hoteltransfer inkl.), private Yacht ab €280 (ganzes Schiff nur für das Paar). Pro-Yacht, nicht pro Person. Wenn Sie eine Überraschung zum Antrag planen, unterstützt das Privat-Yacht-Format die Mechanik — geteiltes Format nicht.",
 productsHeading: "Drei Formate für Paare — welches passt zu Ihrem Abend?",
 products: [
 { icon: Camera, title: "Geteilter Sonnenuntergang (€30-€40)", desc: "Leichtestes Format — 2 Stunden Goldene Stunde. Ideal wenn Sie noch ein Land-Dinner geplant haben. Di & Do €30, andere Tage €34. Mit-Wein-Option €35-€40.", href: "/de/cruises/bosphorus-sunset-cruise", badge: "Beliebt" },
 { icon: Wine, title: "Geteiltes Dinner (€30-€90)", desc: "Voller Abend: Essen + Türkische Show + 3,5-Std.-Route. Hoteltransfer inklusive. Paare wählen meist Silver Alcoholic €45.", href: "/de/istanbul-dinner-cruise" },
 { icon: Heart, title: "Privates Dinner auf der Yacht (€280+)", desc: "Nur Sie zwei (oder Ihre engsten Liebsten). Die ganze Yacht ist Ihre, individuelles Timing, Menü bei Buchung. Ideal für Hochzeitstag.", href: "/de/private-bosphorus-dinner-cruise", badge: "Premium" },
 { icon: Music, title: "Antrags-Yacht (€280+)", desc: "Wenn die Fahrt der Antrags-Moment selbst ist — Überraschungs-Styling, Fotograf, Geiger, auf Sonnenuntergang getimt.", href: "/de/proposal-yacht-rental-istanbul" },
 ],
 faqHeading: "FAQ für Paare",
 faqs: [
 { q: "Welche Bosporus-Kreuzfahrt passt für Paare?", a: "Leichter erster Abend: geteilter Sonnenuntergang (€30 Mo/Di/Do). Voller Abend: geteiltes Dinner (€30-€90, vier Pakete). Für Hochzeitstag oder Antrag: private Yacht (€280+, ganze Yacht)." },
 { q: "Ist das geteilte Dinner zu voll für ein romantisches Paar?", a: "Hängt vom gewünschten Format ab. Geteiltes Dinner = festlich (Türkische Show, andere Paare und kleine Gruppen, kein Restaurant-Stille). Für nur-zu-zweit-Setting: privates Dinner auf Yacht (€280+) — gleiche Route, kein geteiltes Sitzen." },
 { q: "Preisunterschied zwischen geteilt und privat für 2 Personen?", a: "Für 2 Gäste: geteilter Sonnenuntergang = €60-€68 gesamt. Geteiltes Dinner Silver Soft = €60. Private 2-h-Yacht = €280 (ganze Yacht, unabhängig von Gruppengröße). Privat-Upgrade ist 4-5× geteilt, aber Sie haben ganze Yacht, individuelles Timing, keine fremden Gäste." },
 { q: "Können wir auf einer geteilten Fahrt einen Antrag einplanen?", a: "Nein. Überraschungs-Mechanik (Styling, versteckter Fotograf, Ring-Timing) funktioniert nur auf privater Yacht — wenn das Boot exklusiv für das Paar reserviert ist. Geteiltes Format kann die Überraschung nicht aufnehmen." },
 ],
 ctaHeading: "Planen Sie Ihren Bosporus-Abend",
 ctaBody: "Senden Sie den geplanten Abend + Format-Präferenz — wir liefern innerhalb 24 h einen vollständigen Plan.",
 ctaPrimary: "Alle Optionen sehen",
 ctaWhatsapp: "Planungs-Team per WhatsApp",
 whatsappPrefill: "Hallo MerrySails! Wir sind ein Paar und planen eine Bosporus-Kreuzfahrt — können Sie uns für [Datum] zwischen geteiltem Sonnenuntergang, geteiltem Dinner und privater Yacht beraten?",
 trustLine: `Betrieben unter Meryem Yıldız Travel · TÜRSAB-A-Lizenz #${TURSAB_LICENSE_NUMBER} · 50.000+ Gäste auf dem Bosporus seit 2001.`,
 reserveLabel: "Ab €30 buchen",
 },
 fr: {
 metaTitle: "Croisière Bosphore pour Couples Istanbul",
 metaDescription:
 "Croisière Bosphore pour couples : coucher de soleil €30 (lun/mar/jeu), dîner privé €280, demande en mariage. Réservation directe sans commission OTA.",
 canonicalPath: "/fr/bosphorus-cruise-for-couples",
 eyebrow: "Romance · À deux",
 h1: "Croisière Bosphore pour Couples à Istanbul",
 intro: "Trois formats fonctionnent différemment pour les couples. Coucher de soleil partagé = le plus léger — 2 h d'heure dorée pour €30-€40 le couple. Dîner partagé couvre toute la soirée — €60-€180. Yacht privé réserve l'embarcation entière dès €280 — idéal pour anniversaire ou demande en mariage.",
 capsule: "La croisière Bosphore pour couples à Istanbul existe en trois formats : coucher de soleil partagé €30 (lun/mar/jeu), dîner partagé €30-€90 (transfert hôtel inclus), yacht privé dès €280 (yacht entier réservé pour le couple). Tarif au yacht, pas par personne. Pour une surprise de demande en mariage, seul le format yacht privé permet la mécanique surprise — le format partagé non.",
 productsHeading: "Trois formats pour couples — lequel correspond à votre soirée ?",
 products: [
 { icon: Camera, title: "Coucher de soleil partagé (€30-€40)", desc: "Format le plus léger — 2 h d'heure dorée. Idéal si vous avez déjà un dîner à terre prévu. Mar & jeu €30, autres jours €34. Option vin €35-€40.", href: "/fr/cruises/bosphorus-sunset-cruise", badge: "Populaire" },
 { icon: Wine, title: "Dîner partagé (€30-€90)", desc: "Soirée complète : repas + show nuit turque + route 3 h 30. Transfert hôtel inclus. Les couples choisissent souvent Silver Alcoholic €45.", href: "/fr/istanbul-dinner-cruise" },
 { icon: Heart, title: "Dîner privé sur yacht (€280+)", desc: "Seulement vous deux (ou vos proches). Yacht entier réservé, timing custom, menu choisi à la réservation. Idéal pour anniversaire.", href: "/fr/private-bosphorus-dinner-cruise", badge: "Premium" },
 { icon: Music, title: "Yacht de demande en mariage (€280+)", desc: "Quand la croisière EST le moment de la demande — styling surprise, photographe, violoniste, route au coucher du soleil.", href: "/fr/proposal-yacht-rental-istanbul" },
 ],
 faqHeading: "FAQ couples",
 faqs: [
 { q: "Quelle croisière Bosphore convient aux couples ?", a: "Soirée légère : coucher de soleil partagé (€30 lun/mar/jeu). Soirée complète : dîner partagé (€30-€90 quatre forfaits). Pour anniversaire ou demande : yacht privé (€280+, yacht entier)." },
 { q: "Le dîner partagé est-il trop chargé pour un couple ?", a: "Dépend du format souhaité. Dîner partagé = ambiance festive (autres couples, show nuit turque, pas le silence d'un restaurant). Pour ambiance vous-deux-seulement : dîner privé sur yacht (€280+) — même route, pas d'assises partagées." },
 { q: "Écart de prix partagé vs privé pour 2 personnes ?", a: "Pour 2 : coucher de soleil partagé = €60-€68 total. Dîner Silver Soft = €60. Yacht privé 2 h = €280 (yacht entier, peu importe la taille du groupe). Le privé = 4-5× le partagé mais yacht complet, timing custom, aucun invité tiers." },
 { q: "Peut-on ajouter une demande sur une croisière partagée ?", a: "Non. La mécanique surprise (décor, photographe caché, timing de la bague) ne fonctionne que sur un yacht privé — réservé exclusivement au couple. Le format partagé ne peut pas accommoder la surprise." },
 ],
 ctaHeading: "Planifiez votre soirée Bosphore",
 ctaBody: "Envoyez la soirée envisagée + préférence de format — nous revenons sous 24 h avec un plan complet.",
 ctaPrimary: "Voir toutes les options",
 ctaWhatsapp: "Contactez l'équipe de planification",
 whatsappPrefill: "Bonjour MerrySails ! Nous sommes un couple et planifions une croisière Bosphore — pouvez-vous nous aider à choisir entre coucher de soleil, dîner partagé et yacht privé pour [date] ?",
 trustLine: `Opéré sous Meryem Yıldız Travel · Licence TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ voyageurs sur le Bosphore depuis 2001.`,
 reserveLabel: "Réserver dès €30",
 },
 nl: {
 metaTitle: "Bosporus-Cruise voor Stellen Istanbul",
 metaDescription:
 "Bosporus-cruise voor stellen: zonsondergang €30 (ma/di/do), privé-diner €280, huwelijksaanzoek-jacht. Direct boeken, geen OTA-opslag.",
 canonicalPath: "/nl/bosphorus-cruise-for-couples",
 eyebrow: "Romantiek · Met z'n tweeën",
 h1: "Bosporus-Cruise voor Stellen Istanbul",
 intro: "Drie formaten werken verschillend voor stellen. Gedeelde zonsondergang = het lichtste — 2 uur gouden uur voor €30-€40 voor het stel. Gedeeld diner dekt de hele avond — €60-€180. Privé-jacht reserveert de hele boot vanaf €280 — ideaal voor trouwdag of huwelijksaanzoek.",
 capsule: "De Bosporus-cruise voor stellen in Istanbul bestaat in drie formaten: gedeelde zonsondergang €30 (ma/di/do), gedeeld diner €30-€90 (hotel pickup inbegrepen), privé-jacht vanaf €280 (hele jacht voor het stel). Per jacht, niet per persoon. Voor een huwelijksaanzoek-verrassing werkt alleen het privé-formaat — gedeeld kan de verrassings-mechaniek niet ondersteunen.",
 productsHeading: "Drie formaten voor stellen — welke past bij uw avond?",
 products: [
 { icon: Camera, title: "Gedeelde zonsondergang (€30-€40)", desc: "Lichtste formaat — 2 uur gouden uur. Ideaal als u al een diner aan wal hebt gepland. Di & do €30, andere dagen €34. Wijnoptie €35-€40.", href: "/nl/cruises/bosphorus-sunset-cruise", badge: "Populair" },
 { icon: Wine, title: "Gedeeld diner (€30-€90)", desc: "Volle avond: diner + Turkse avondshow + 3,5-uurs route. Hotel pickup inbegrepen. Stellen kiezen vaak Silver Alcoholic €45.", href: "/nl/istanbul-dinner-cruise" },
 { icon: Heart, title: "Privé-diner op een jacht (€280+)", desc: "Alleen u beiden (of uw naasten). Hele jacht gereserveerd, custom timing, menu gekozen bij boeking. Ideaal voor trouwdag.", href: "/nl/private-bosphorus-dinner-cruise", badge: "Premium" },
 { icon: Music, title: "Huwelijksaanzoek-jacht (€280+)", desc: "Wanneer de cruise HET aanzoek-moment is — verrassings-styling, fotograaf, violist, route op zonsondergang.", href: "/nl/proposal-yacht-rental-istanbul" },
 ],
 faqHeading: "FAQ voor stellen",
 faqs: [
 { q: "Welke Bosporus-cruise is het beste voor stellen?", a: "Lichte eerste avond: gedeelde zonsondergang (€30 ma/di/do). Volle avond: gedeeld diner (€30-€90, vier pakketten). Voor trouwdag of aanzoek: privé-jacht (€280+, hele jacht)." },
 { q: "Is gedeeld diner te druk voor een romantisch stel?", a: "Hangt van het gewenste formaat af. Gedeeld diner = feestelijke sfeer (andere stellen, Turkse avondshow, geen restaurant-stilte). Voor alleen-u-tweeën-instelling: privé-diner op een jacht (€280+) — zelfde route, geen gedeelde zitplaatsen." },
 { q: "Prijsverschil gedeeld vs privé voor 2 personen?", a: "Voor 2: gedeelde zonsondergang = €60-€68 totaal. Gedeeld diner Silver Soft = €60. Privé 2-uurs jacht = €280 (hele jacht, ongeacht groep). Privé-upgrade is 4-5× gedeeld, maar u krijgt hele jacht, custom timing, geen andere gasten." },
 { q: "Kunnen we een aanzoek toevoegen aan een gedeelde cruise?", a: "Nee. Verrassings-aanzoek-mechaniek (decor, verborgen fotograaf, ring-timing) werkt alleen op een privé-jacht — boot exclusief voor het stel gereserveerd. Gedeelde formaten kunnen de verrassing niet ondersteunen." },
 ],
 ctaHeading: "Plan uw Bosporus-avond",
 ctaBody: "Stuur de geplande avond + formaat-voorkeur — wij komen binnen 24 u met een compleet plan.",
 ctaPrimary: "Bekijk alle opties",
 ctaWhatsapp: "WhatsApp het planning-team",
 whatsappPrefill: "Hallo MerrySails! Wij zijn een stel en plannen een Bosporus-cruise — kunt u ons helpen kiezen tussen gedeelde zonsondergang, gedeeld diner en privé-jacht voor [datum]?",
 trustLine: `Geëxploiteerd onder Meryem Yıldız Travel · TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER} · 50.000+ gasten op de Bosporus sinds 2001.`,
 reserveLabel: "Boeken vanaf €30",
 },
 ru: {
 metaTitle: "Круиз по Босфору для Пар — Стамбул",
 metaDescription:
 "Круиз по Босфору для пар: закат €30 (пн/вт/чт), приватный ужин €280, яхта для предложения руки. Прямое бронирование без комиссий OTA.",
 canonicalPath: "/ru/bosphorus-cruise-for-couples",
 eyebrow: "Романтика · Для двоих",
 h1: "Круиз по Босфору для Пар в Стамбуле",
 intro: "Три формата работают по-разному для пар. Общий закатный круиз — самый лёгкий — 2 часа золотого часа за €30-€40 на пару. Общий ужин-круиз покрывает весь вечер — €60-€180. Частная яхта резервирует всё судно от €280 — идеально для годовщины или предложения руки.",
 capsule: "Круиз по Босфору для пар в Стамбуле бывает трёх форматов: общий закат €30 (пн/вт/чт), общий ужин €30-€90 (с отельным трансфером), частная яхта от €280 (вся яхта для пары). Цена за яхту, не за человека. Для сюрприза с предложением руки подходит только формат частной яхты — общий формат не позволяет реализовать механику сюрприза.",
 productsHeading: "Три формата для пар — какой подходит для вашего вечера?",
 products: [
 { icon: Camera, title: "Общий закатный круиз (€30-€40)", desc: "Самый лёгкий формат — 2 часа золотого часа. Идеально если ужин запланирован на берегу. Вт и чт €30, остальные дни €34. С вином €35-€40.", href: "/ru/cruises/bosphorus-sunset-cruise", badge: "Популярно" },
 { icon: Wine, title: "Общий ужин-круиз (€30-€90)", desc: "Полный вечер: ужин + турецкое шоу + маршрут 3,5 часа. Отельный трансфер включён. Пары часто выбирают Silver Alcoholic €45.", href: "/ru/istanbul-dinner-cruise" },
 { icon: Heart, title: "Частный ужин на яхте (€280+)", desc: "Только вы вдвоём (или ваши близкие). Вся яхта зарезервирована, индивидуальный тайминг, меню выбирается при бронировании. Идеально для годовщины.", href: "/ru/private-bosphorus-dinner-cruise", badge: "Премиум" },
 { icon: Music, title: "Яхта для предложения руки (€280+)", desc: "Когда круиз и есть момент предложения — оформление-сюрприз, фотограф, скрипач, маршрут к закату.", href: "/ru/proposal-yacht-rental-istanbul" },
 ],
 faqHeading: "FAQ для пар",
 faqs: [
 { q: "Какой круиз по Босфору лучше для пар?", a: "Лёгкий первый вечер: общий закатный (€30 пн/вт/чт). Полный вечер: общий ужин (€30-€90, четыре пакета). Для годовщины или предложения: частная яхта (€280+, вся яхта)." },
 { q: "Не слишком ли многолюдно на общем ужине для романтической пары?", a: "Зависит от желаемого формата. Общий ужин = праздничная атмосфера (другие пары, турецкое шоу, не ресторанная тишина). Для только-вы-вдвоём: частный ужин на яхте (€280+) — тот же маршрут, без общих посадок." },
 { q: "Разница в цене общий vs частный для двоих?", a: "Для 2 человек: общий закат = €60-€68. Общий ужин Silver Soft = €60. Частная 2-час. яхта = €280 (вся яхта, неважно сколько человек). Апгрейд до частного — 4-5× общий, но вся яхта, индивидуальный тайминг, никаких других гостей." },
 { q: "Можно ли добавить предложение руки к общему круизу?", a: "Нет. Механика сюрприза (оформление, скрытый фотограф, тайминг кольца) работает только на частной яхте — когда лодка зарезервирована эксклюзивно для пары. Общий формат не может поддержать сюрприз." },
 ],
 ctaHeading: "Спланируйте вечер на Босфоре",
 ctaBody: "Отправьте планируемый вечер + предпочтения по формату — в течение 24 часов мы возвращаемся с полным планом.",
 ctaPrimary: "Посмотреть все варианты",
 ctaWhatsapp: "Написать в команду планирования",
 whatsappPrefill: "Здравствуйте, MerrySails! Мы пара, планируем круиз по Босфору — помогите выбрать между закатным, ужин-круизом и частной яхтой на [дата]?",
 trustLine: `Управляется Meryem Yıldız Travel · Лицензия TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ гостей на Босфоре с 2001 года.`,
 reserveLabel: "Забронировать от €30",
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
 alternates: { canonical: canonicalUrl, languages: buildHreflang("/bosphorus-cruise-for-couples") },
 openGraph: { title: c.metaTitle, description: c.metaDescription, url: canonicalUrl, type: "article" },
 };
}

export default async function LocaleCouplesPage({ params }: { params: Promise<{ locale: string }> }) {
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

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-20">
 <div className="container-main max-w-4xl">
 <header className="mb-8">
 <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)]">{c.eyebrow}</p>
 <h1 className="mt-1 text-3xl font-bold leading-tight text-[var(--heading)] sm:text-4xl">{c.h1}</h1>
 <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">{c.intro}</p>
 </header>

 <SocialProofBadges variant="generic" locale={locale as SiteLocale} className="mb-6" />
 <LiveBookingCounter locale={locale as SiteLocale} className="mb-4" />

 <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6">
 <p className="answer-capsule text-sm leading-relaxed text-[var(--body-text)] md:text-base">{c.capsule}</p>
 </section>

 <section className="mb-8">
 <h2 className="mb-4 text-xl font-bold text-[var(--heading)]">{c.productsHeading}</h2>
 <div className="grid gap-4 sm:grid-cols-2">
 {c.products.map((p) => (
 <Link key={p.href} href={p.href} className="block rounded-2xl border border-[var(--line)] bg-white p-5 transition-colors hover:border-[var(--brand-primary)]/40">
 <div className="mb-2 flex items-center gap-2">
 <p.icon className="h-5 w-5 text-[var(--brand-primary)]" />
 <h3 className="text-base font-semibold text-[var(--heading)]">{p.title}</h3>
 {p.badge && <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white">{p.badge}</span>}
 </div>
 <p className="text-sm leading-relaxed text-[var(--text-muted)]">{p.desc}</p>
 <span className="mt-3 inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]">
 →
 </span>
 </Link>
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

 <div className="my-8"><ReviewsCarousel productKey="any" locale={locale as SiteLocale} /></div>

 <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
 <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">{c.ctaHeading}</h2>
 <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">{c.ctaBody}</p>
 <div className="flex flex-col gap-3 sm:flex-row">
 <Link href={`/${locale}/bosphorus-cruise`} className="btn-cta !px-6 !py-3">
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
 <StickyMobileCta reserveHref={`/${locale}/cruises/bosphorus-sunset-cruise`} reserveLabel={c.reserveLabel} locale={locale as SiteLocale} whatsappLocation={`locale_couples_${locale}`} whatsappPrefill={c.whatsappPrefill} />
 </>
 );
}
