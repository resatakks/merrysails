import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Baby, ShieldCheck, Anchor, Cake } from "lucide-react";
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
 reasons: Array<{ icon: typeof Baby; title: string; desc: string }>;
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
 metaTitle: "İstanbul Boğaz Turu Aile İçin",
 metaDescription:
 "Çocuklu aileler için Boğaz turu — otel transferi dahil, 3 yaş altı ücretsiz, 3-13 yaş %50 indirim, 24 saat ücretsiz iptal. €30/kişi'den, TÜRSAB lisanslı.",
 canonicalPath: "/tr/bosphorus-cruise-for-families",
 eyebrow: "Aile dostu · Otel transferi · Çocuk fiyatı",
 h1: "İstanbul Boğaz Turu Aile İçin",
 intro:
 "4 kişilik ailenin rutini: otel transferi, çocuk dostu seçenekli akşam yemeği, Türk gecesi gösterisi, gece yarısına otele dönüş. 3 yaş altı ücretsiz, 3-13 yaş %50 indirim, 24 saat öncesine kadar ücretsiz iptal. Yetişkin başına €30'dan başlar.",
 capsule:
 "4 kişilik bir aile için (2 yetişkin + 2 çocuk) en çok rezerve edilen seçenek Silver Soft akşam yemekli boğaz turu — yetişkin başına €30, 3-13 yaş için %50 indirim (3 yaş altı ücretsiz), otel transferi dahil, 3,5 saatlik Boğaz rotası + çocuk dostu seçenekli yemek + Türk gecesi gösterisi. Çocuk yaşına göre toplam €100-€130. 24 saat öncesi ücretsiz iptal hasta-çocuk senaryosunu kapsar.",
 reasonsHeading: "Aile için neden bu format çalışır",
 reasons: [
 { icon: Anchor, title: "Akşam yemekli turda otel transferi dahil", desc: "Yorgun çocukla taksi adımı yok. Pickup aracı Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy gibi merkezi Avrupa yakası otellerinizden 20:30 Kabataş kalkışından 30-45 dakika önce alır." },
 { icon: ShieldCheck, title: "2001'den beri TÜRSAB lisanslı", desc: `Meryem Yıldız Travel altında işletilir, TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER}. 50.000+ misafir. Anne-babaların herhangi bir İstanbul ulaşım aracına uyguladığı aynı güvenlik standartları burada da geçerli.` },
 { icon: Baby, title: "3 yaş altı ücretsiz · 3-13 yaş %50 indirim", desc: "3 yaş altı çocuklar tüm paketlerde ücretsiz seyahat eder. 3-13 yaş çocuklara %50 indirim uygulanır (rezervasyonda teyit edilir). Akşam yemeği menüsünde çocuk dostu seçenekler var (ızgara tavuk, pilav, meyve) — 12 yaş altına balık zorlanmaz." },
 { icon: Cake, title: "Doğum günü + Bayram + aile kutlaması hazır", desc: "Pastayı uçakla getirin veya bizden sipariş edin + ekibin sessiz bir anonsu. Özellikle Bayram döneminde (Ramazan + Kurban) aileler akşam yemekli turu bayram akşamı mekanı olarak seçer." },
 ],
 faqHeading: "Aile için SSS",
 faqs: [
 { q: "Boğaz turu çocuklar için güvenli mi?", a: `MerrySails TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} altında işler (2001'den beri) ve T.C. Denizcilik Genel Müdürlüğü güvenlik standartlarını takip eder — kişi başı can yeleği, denizcilik eğitimli mürettebat, saatlik güvenlik kontrolleri. Paylaşımlı akşam yemekli tekne tam Boğaz manzaralı iç oturma alanına sahip; küçük çocuklu aileler açık güvertede vakit geçirmek zorunda kalmaz.` },
 { q: "Boğaz turu paketlerinde çocuk fiyatlandırması nasıl?", a: "3 yaş altı çocuklar tüm paketlerde ücretsiz seyahat eder. 3-13 yaş çocuklar %50 indirimden — aynı paket yetişkin fiyatının %50'si. 13+ yaş yetişkin fiyatı öder. Paket ve tarihinize özel çocuk fiyatı rezervasyonda teyit edilir — WhatsApp'tan çocuk yaşlarını gönderin." },
 { q: "4 kişilik aile için en uygun Boğaz turu formatı?", a: "2 yetişkin + 2 çocuktan oluşan 4 kişilik aileler için en sık rezervasyon Silver Soft akşam yemekli tur (€30/yetişkin). Otel transferi, 3,5 saatlik rota, çocuk dostu seçenekli yemek ve aile dostu Türk gecesi eğlencesini içerir. 8+ kişilik aileler için özel yat (€220+) tüm tekneyi grup için özel zamanlamayla ayırır." },
 { q: "Tur saatleri çocuk dostu mu?", a: "Gün batımı turu sezona göre 18:30-19:30 kalkar, 21:00-21:30'da döner — normal çocuk uyku saatine uyar. Akşam yemekli tur 20:30 kalkar, 00:00 dolaylarında döner — 8+ yaş çocuklar veya geç saate uyanık çocukları olan aileler için daha iyi. Özel yat kiralamalar herhangi bir saate ayarlanabilir, öğle aile yemek kruvazı dahil." },
 { q: "Çocuk hastalanırsa iptal edebilir miyiz?", a: "Kalkıştan 24 saat öncesine kadar ücretsiz iptal. Pay-onboard paylaşımlı turlarda kart hiç çekilmez. Depozit ödenmiş özel yatlarda depozit 24h+ öncesi iptal edilirse tamamen iade edilir. Aynı gün hastalık iptalleri WhatsApp üzerinden duruma göre ele alınır." },
 { q: "Bebek için yüksek sandalye var mı?", a: "Akşam yemekli turda 24 saat öncesi bildirimde yüksek sandalye mevcuttur. WhatsApp rezervasyon mesajında bebek yaşı + yüksek sandalye ihtiyacını belirtin, operasyon kalkıştan önce tekneye yükleyecektir." },
 ],
 ctaHeading: "Aile için Boğaz turu rezervasyonu",
 ctaBody: "Otelinizi + çocuk yaşlarını + tercih ettiğiniz tarihi gönderin. Doğru paket, transfer zamanı ve çocuk fiyatını 24 saat içinde teyit ediyoruz.",
 ctaPrimary: "Akşam yemekli turu gör",
 ctaWhatsapp: "Aile rezervasyonu WhatsApp ile",
 whatsappPrefill: "Merhaba MerrySails! Aile Boğaz turu sorusu. Yetişkin: [N], çocuk yaşları: [yaşlar], otel: [isim], tarih: [tarih].",
 trustLine: `Meryem Yıldız Travel altında işletilir · TÜRSAB A Grubu lisans #${TURSAB_LICENSE_NUMBER} · 2001'den bu yana Boğaz'da 50.000+ misafir.`,
 reserveLabel: "€30'dan rezerve et",
 },
 de: {
 metaTitle: "Bosporus-Kreuzfahrt für Familien Istanbul",
 metaDescription:
 "Familienfreundliche Bosporus-Kreuzfahrt — Hoteltransfer inkl., bis 3 J. kostenlos, 3-13 J. 50% Ermäßigung, 24-h-Stornierung. Ab €30/Erw., TÜRSAB A-lizenziert.",
 canonicalPath: "/de/bosphorus-cruise-for-families",
 eyebrow: "Familienfreundlich · Hoteltransfer · Kindertarif",
 h1: "Bosporus-Kreuzfahrt für Familien Istanbul",
 intro:
 "Familien-Routine: Hoteltransfer, Dinner mit kinderfreundlichen Optionen, Türkische Show, Rückkehr ins Hotel bis Mitternacht. Bis 3 J. kostenlos, 3-13 J. 50% Ermäßigung, kostenlose Stornierung 24 h vorher. Ab €30 pro Erwachsenem.",
 capsule:
 "Für eine 4-köpfige Familie (2 Erwachsene + 2 Kinder) ist die meistgebuchte Option das Silver-Soft-Dinner — €30/Erw., 50% Ermäßigung für 3-13 J. (bis 3 J. gratis), Hoteltransfer inkl., 3,5-h-Bosporus-Route + Dinner mit kinderfreundlichen Optionen + familienfreundliche Türkische Show. Gesamtabend für die Familie meist €100-€130 je nach Kindesalter. Kostenlose Stornierung 24 h vorher deckt kranke-Kind-Szenarien ab.",
 reasonsHeading: "Warum dies für Familien funktioniert",
 reasons: [
 { icon: Anchor, title: "Hoteltransfer beim Dinner inklusive", desc: "Kein Taxi-mit-müden-Kindern-Schritt. Das Pickup-Fahrzeug hält an Ihrem zentralen Europa-Hotel (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) 30-45 Min. vor der 20:30-Abfahrt." },
 { icon: ShieldCheck, title: "TÜRSAB-lizenziert seit 2001", desc: `Betrieben unter Meryem Yıldız Travel, TÜRSAB A Group Lizenz #${TURSAB_LICENSE_NUMBER}. 50.000+ Gäste. Gleiche Sicherheitsstandards, die Eltern an jeden Istanbuler Transport anlegen.` },
 { icon: Baby, title: "Bis 3 J. gratis · 3-13 J. 50% Ermäßigung", desc: "Kinder unter 3 reisen auf allen Paketen kostenlos. 3-13 J. erhalten 50% Ermäßigung (bei Buchung bestätigt). Dinner-Menü hat kinderfreundliche Optionen (gegrilltes Hähnchen, Reis, Obst) — kein Fischgang wird unter 12 J. gedrängt." },
 { icon: Cake, title: "Geburtstag + Eid + Familienfeier", desc: "Onboard-Torte-Service + leise Ankündigung durch die Crew auf Wunsch. Besonders während des Eid (Ramadan + Kurban) buchen Familien das Dinner als Bayram-Abend." },
 ],
 faqHeading: "FAQ Familie",
 faqs: [
 { q: "Ist die Bosporus-Kreuzfahrt für Kinder sicher?", a: `MerrySails betreibt unter TÜRSAB A Group Lizenz #${TURSAB_LICENSE_NUMBER} (seit 2001) und befolgt die Sicherheitsstandards der Türkischen Maritimen Verwaltung — Schwimmwesten pro Passagier, marine-trained crew, stündliche Sicherheitschecks. Das geteilte Dinner-Schiff hat Innensitze mit vollem Bosporus-Blick — Familien mit Kleinkindern müssen nicht auf dem offenen Deck sitzen.` },
 { q: "Wie ist die Kinder-Preisstruktur?", a: "Kinder unter 3 reisen kostenlos. 3-13 J. zahlen 50% — die Hälfte des Erwachsenenpreises für das gleiche Paket. Ab 13 J. Erwachsenenpreis. Exakter Kindertarif wird bei Buchung bestätigt — Kindesalter per WhatsApp senden." },
 { q: "Beste Bosporus-Format für 4-köpfige Familie?", a: "Für Familien zu viert (2 Erw + 2 Kinder) am häufigsten gebucht: Silver Soft Dinner (€30/Erw). Hoteltransfer, 3,5-h-Route, kinderfreundliches Menü, familienfreundliche Türkische Show. Für 8+-köpfige Familien: privater Yacht-Charter (€220+, ganze Yacht mit individuellem Tempo)." },
 { q: "Sind die Kreuzfahrt-Zeiten kinderfreundlich?", a: "Sonnenuntergangs-Fahrt 18:30-19:30 Abfahrt (saisonabhängig), Rückkehr 21:00-21:30 — passt zu normaler Kinder-Schlafenszeit. Dinner-Fahrt 20:30 Abfahrt, Rückkehr ~00:00 — besser für Kinder ab 8 J. oder Familien, in denen Kinder ohnehin länger wach bleiben. Private Yacht-Charter können jede beliebige Zeit." },
 { q: "Können wir stornieren, wenn ein Kind krank wird?", a: "Kostenlos bis 24 h vor Abfahrt. Bei geteilten Kreuzfahrten mit Pay-Onboard wird gar keine Karte belastet. Bei privaten Yacht-Charter wird das Deposit voll erstattet, wenn 24 h+ vorher storniert wird. Same-day-Stornos wegen Krankheit per WhatsApp besprochen." },
 { q: "Gibt es einen Hochstuhl?", a: "Hochstühle auf dem Dinner verfügbar mit 24 h Vorankündigung. Erwähnen Sie das Kindesalter + Hochstuhl-Bedarf in der WhatsApp-Buchung; Operations lädt einen vor der Abfahrt aufs Schiff." },
 ],
 ctaHeading: "Familien-Bosporus-Kreuzfahrt buchen",
 ctaBody: "Hotelname + Kindesalter + Wunschdatum senden. Wir bestätigen Paket, Pickup-Zeit und Kindertarif innerhalb 24 h.",
 ctaPrimary: "Dinner-Kreuzfahrt sehen",
 ctaWhatsapp: "Familien-Anfrage per WhatsApp",
 whatsappPrefill: "Hallo MerrySails! Familien-Bosporus-Anfrage. Erwachsene: [N], Kindesalter: [Alter], Hotel: [Name], Datum: [Datum].",
 trustLine: `Betrieben unter Meryem Yıldız Travel · TÜRSAB-A-Lizenz #${TURSAB_LICENSE_NUMBER} · 50.000+ Gäste auf dem Bosporus seit 2001.`,
 reserveLabel: "Ab €30 buchen",
 },
 fr: {
 metaTitle: "Croisière Bosphore pour Familles Istanbul",
 metaDescription:
 "Croisière Bosphore familiale — transfert hôtel inclus, gratuit pour les moins de 3 ans, tarif enfant 3-13 ans, annulation 24h. Dès €30/adulte, TÜRSAB A licencié.",
 canonicalPath: "/fr/bosphorus-cruise-for-families",
 eyebrow: "Familial · Transfert hôtel · Tarif enfant",
 h1: "Croisière Bosphore pour Familles Istanbul",
 intro:
 "Routine famille : transfert hôtel, dîner avec options enfant, show nuit turque, retour à l'hôtel avant minuit. Gratuit pour les moins de 3 ans, tarif enfant 3-13 ans, annulation gratuite 24h avant. À partir de €30 par adulte.",
 capsule:
 "Pour une famille de 4 (2 adultes + 2 enfants), l'option la plus réservée est le forfait Silver Soft dîner — €30/adulte, tarif enfant pour 3-13 ans (gratuit pour les moins de 3 ans), transfert hôtel inclus, route Bosphore 3 h 30 + dîner avec options enfant + show nuit turque familial. Total soirée famille €100-€130 selon âges. Annulation gratuite 24h avant couvre les scénarios enfant-malade.",
 reasonsHeading: "Pourquoi ce format convient aux familles",
 reasons: [
 { icon: Anchor, title: "Transfert hôtel inclus sur dîner", desc: "Pas d'étape taxi-avec-enfants-fatigués. Le véhicule de pickup s'arrête à votre hôtel central rive européenne (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) 30-45 min avant le départ 20h30." },
 { icon: ShieldCheck, title: "TÜRSAB licencié depuis 2001", desc: `Opéré sous Meryem Yıldız Travel, licence TÜRSAB A #${TURSAB_LICENSE_NUMBER}. 50 000+ voyageurs. Mêmes standards de sécurité que tout transport stambouliote.` },
 { icon: Baby, title: "Moins de 3 ans gratuit · 3-13 ans 50% de réduction", desc: "Enfants de moins de 3 ans naviguent gratuitement sur tous forfaits. 3-13 ans : 50% de réduction (confirmé à la réservation). Menu dîner a options enfant (poulet grillé, riz, fruits) — pas de poisson imposé aux moins de 12 ans." },
 { icon: Cake, title: "Anniversaire + Aïd + célébration familiale", desc: "Livraison de gâteau à bord + annonce discrète par l'équipage sur demande. Spécialement pendant l'Aïd (Ramadan + Kourban), les familles réservent le dîner comme soirée bayram." },
 ],
 faqHeading: "FAQ famille",
 faqs: [
 { q: "La croisière Bosphore est-elle sûre pour les enfants ?", a: `MerrySails opère sous licence TÜRSAB A #${TURSAB_LICENSE_NUMBER} (depuis 2001) et respecte les standards de l'Administration Maritime Turque — gilets de sauvetage par passager, équipage formé, contrôles de sécurité horaires. Le bateau de dîner partagé a des sièges intérieurs avec vue complète sur le Bosphore — les familles avec jeunes enfants ne sont pas obligées de rester sur le pont ouvert.` },
 { q: "Quels sont les tarifs enfant ?", a: "Moins de 3 ans gratuit sur tous forfaits. 3-13 ans payent moitié prix — 50% du prix adulte pour le même forfait. 13+ tarif adulte. Tarif exact confirmé à la réservation — envoyer âges enfants via WhatsApp." },
 { q: "Meilleur format pour une famille de 4 ?", a: "Pour 4 (2 adultes + 2 enfants), la réservation la plus fréquente est le forfait Silver Soft dîner (€30/adulte). Transfert hôtel inclus, route 3 h 30, menu enfant, show nuit turque familial. Pour 8+ : yacht privé (€220+, yacht entier au rythme du groupe)." },
 { q: "Les horaires sont-ils adaptés aux enfants ?", a: "Coucher de soleil départ 18 h 30-19 h 30 (saison), retour 21 h-21 h 30 — colle aux heures de coucher enfant normales. Dîner départ 20 h 30, retour vers minuit — mieux pour enfants 8+ ou familles avec enfants qui restent éveillés. Yachts privés à n'importe quelle heure." },
 { q: "Pouvons-nous annuler si un enfant tombe malade ?", a: "Gratuit jusqu'à 24h avant. Croisières partagées avec pay-onboard : aucune carte débitée. Yachts privés avec acompte : remboursement complet si annulation 24h+ avant. Annulations same-day pour maladie : traitées au cas par cas via WhatsApp." },
 { q: "Chaise haute disponible ?", a: "Chaises hautes sur dîner avec préavis 24h. Mentionnez âge tout-petit + besoin chaise haute dans message WhatsApp de réservation ; l'opérations charge la chaise haute avant le départ." },
 ],
 ctaHeading: "Réservez une croisière famille Bosphore",
 ctaBody: "Envoyez nom de l'hôtel + âges enfants + date préférée. Nous confirmons forfait, heure de pickup et tarif enfant sous 24h.",
 ctaPrimary: "Voir la croisière dîner",
 ctaWhatsapp: "Demande famille par WhatsApp",
 whatsappPrefill: "Bonjour MerrySails ! Demande croisière famille Bosphore. Adultes : [N], âges enfants : [âges], hôtel : [nom], date : [date].",
 trustLine: `Opéré sous Meryem Yıldız Travel · Licence TÜRSAB A #${TURSAB_LICENSE_NUMBER} · 50 000+ voyageurs sur le Bosphore depuis 2001.`,
 reserveLabel: "Réserver dès €30",
 },
 nl: {
 metaTitle: "Bosporus-Cruise voor Gezinnen Istanbul",
 metaDescription:
 "Gezinsvriendelijke Bosporus-cruise — hotel pickup, onder 3 j. gratis, 3-13 j. 50% korting, gratis 24h annulering. Vanaf €30/volwassene, TÜRSAB A.",
 canonicalPath: "/nl/bosphorus-cruise-for-families",
 eyebrow: "Gezinsvriendelijk · Hotel pickup · Kindertarief",
 h1: "Bosporus-Cruise voor Gezinnen Istanbul",
 intro:
 "Gezinsroutine: hotel pickup, diner met kindvriendelijke opties, Turkse avondshow, terug naar hotel voor middernacht. Onder 3 jaar gratis, 3-13 j. 50% korting, gratis annulering 24u vooraf. Vanaf €30 per volwassene.",
 capsule:
 "Voor een gezin van 4 (2 volwassenen + 2 kinderen) is de meest geboekte optie het Silver Soft diner — €30/volwassene, 50% korting voor 3-13 j. (onder 3 j. gratis), hotel pickup inbegrepen, 3,5 uur Bosporus-route + diner met kindvriendelijke opties + gezinsvriendelijke Turkse avondshow. Totale avond gezin €100-€130 afhankelijk van leeftijden. Gratis annulering 24u vooraf dekt zieke-kind-scenario's.",
 reasonsHeading: "Waarom dit voor gezinnen werkt",
 reasons: [
 { icon: Anchor, title: "Hotel pickup inbegrepen op dinercruise", desc: "Geen taxi-met-vermoeide-kinderen-stap. De pickup-auto stopt bij uw centrale Europese hotel (Sultanahmet, Sirkeci, Topkapı, Taksim, Harbiye, Beyoğlu, Karaköy) 30-45 min vóór de 20:30 Kabataş-vertrek." },
 { icon: ShieldCheck, title: "TÜRSAB-licentie sinds 2001", desc: `Geëxploiteerd onder Meryem Yıldız Travel, TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER}. 50.000+ gasten. Zelfde veiligheidsnormen als elk Istanbul-vervoer dat ouders aan hun kinderen toevertrouwen.` },
 { icon: Baby, title: "Onder 3 jaar gratis · 3-13 j. 50% korting", desc: "Kinderen onder 3 reizen gratis op alle pakketten. 3-13 j. krijgen 50% korting (bij boeking bevestigd). Diner-menu heeft kindvriendelijke opties (gegrilde kip, rijst, fruit) — geen vis opgedrongen aan kinderen onder 12." },
 { icon: Cake, title: "Verjaardag + Eid + gezinsfeest", desc: "Taart aan boord + stille aankondiging door crew op verzoek. Vooral tijdens Eid (Ramadan + Kurban) boeken families het diner als bayram-avondlocatie." },
 ],
 faqHeading: "FAQ gezin",
 faqs: [
 { q: "Is de Bosporus-cruise veilig voor kinderen?", a: `MerrySails opereert onder TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER} (sinds 2001) en volgt Turkse Maritieme Autoriteit-veiligheidsnormen — reddingsvest per passagier, marine-getrainde crew, uurlijkse veiligheidscontroles. Het gedeelde dinerschip heeft binnenzitplaatsen met volledig Bosporus-uitzicht — gezinnen met jonge kinderen hoeven niet op het open dek te zitten.` },
 { q: "Wat is het kindertarief?", a: "Kinderen onder 3 jaar reizen gratis op alle pakketten. 3-13 j. krijgen 50% korting — de helft van de volwassen prijs voor hetzelfde pakket. 13+ volwassen prijs. Exact tarief bevestigd bij boeking — kinderleeftijden via WhatsApp sturen." },
 { q: "Beste Bosporus-formaat voor gezin van 4?", a: "Voor 4 (2 volw + 2 kinderen): meest geboekt is Silver Soft diner (€30/volw). Hotel pickup, 3,5 uur route, kindvriendelijk menu, gezinsvriendelijke Turkse avondshow. Voor 8+ gezinnen: privé-jachtcharter (€220+, hele jacht met groepsritme)." },
 { q: "Zijn cruise-tijden kindvriendelijk?", a: "Zonsondergangs-cruise vertrekt 18:30-19:30 (seizoen afhankelijk), terug 21:00-21:30 — past bij normaal kindbedtijd. Dinercruise 20:30 vertrek, terug ~00:00 — beter voor kinderen 8+ of gezinnen waarin kinderen langer wakker blijven. Privé-jachtcharter op elk uur." },
 { q: "Kunnen we annuleren als kind ziek wordt?", a: "Gratis tot 24u vóór vertrek. Gedeelde cruises met pay-onboard: geen kaart belast. Privé-jachtcharter met aanbetaling: volledige terugbetaling als 24u+ vooraf geannuleerd. Same-day annuleringen wegens ziekte: case-by-case via WhatsApp." },
 { q: "Is er een kinderstoel?", a: "Kinderstoelen op de dinercruise beschikbaar met 24u voor­aankondiging. Vermeld kindleeftijd + kinderstoel-behoefte in WhatsApp-boekingbericht; operations laadt vóór vertrek een aan boord." },
 ],
 ctaHeading: "Boek een gezins-Bosporus-cruise",
 ctaBody: "Stuur hotelnaam + kinderleeftijden + voorkeursdatum. Wij bevestigen pakket, pickup-tijd en kindertarief binnen 24u.",
 ctaPrimary: "Bekijk dinercruise",
 ctaWhatsapp: "Gezinsaanvraag per WhatsApp",
 whatsappPrefill: "Hallo MerrySails! Gezins-Bosporus-cruise aanvraag. Volwassenen: [N], kinderleeftijden: [leeftijden], hotel: [naam], datum: [datum].",
 trustLine: `Geëxploiteerd onder Meryem Yıldız Travel · TÜRSAB A-licentie #${TURSAB_LICENSE_NUMBER} · 50.000+ gasten op de Bosporus sinds 2001.`,
 reserveLabel: "Boeken vanaf €30",
 },
 ru: {
 metaTitle: "Круиз по Босфору для Семей Стамбул",
 metaDescription:
 "Семейный круиз по Босфору — отельный трансфер включён, до 3 лет бесплатно, тариф 3-13 лет, отмена 24 ч. От €30/взрослый, TÜRSAB A с 2001.",
 canonicalPath: "/ru/bosphorus-cruise-for-families",
 eyebrow: "Для семей · Отельный трансфер · Детский тариф",
 h1: "Круиз по Босфору для Семей в Стамбуле",
 intro:
 "Семейный распорядок: отельный трансфер, ужин с детским меню, турецкое шоу, возвращение в отель до полуночи. До 3 лет бесплатно, 3-13 лет детский тариф 50%, бесплатная отмена за 24 часа. От €30 за взрослого.",
 capsule:
 "Для семьи из 4 человек (2 взрослых + 2 ребёнка) самый бронируемый вариант — пакет Silver Soft ужин-круиз: €30/взрослый, детский тариф 50% для 3-13 лет (до 3 лет бесплатно), отельный трансфер включён, маршрут по Босфору 3,5 часа + ужин с детским меню + семейное турецкое шоу. Общий вечер для семьи €100-€130 в зависимости от возраста детей. Бесплатная отмена за 24 часа покрывает сценарий с больным ребёнком.",
 reasonsHeading: "Почему этот формат работает для семей",
 reasons: [
 { icon: Anchor, title: "Отельный трансфер на ужин-круизе", desc: "Никакой шаг такси-с-уставшими-детьми. Машина забирает вас из вашего центрального европейского отеля (Султанахмет, Сиркеджи, Топкапы, Таксим, Харбие, Бейоглу, Каракёй) за 30-45 минут до отправления в 20:30 от Кабаташ." },
 { icon: ShieldCheck, title: "Лицензия TÜRSAB с 2001 года", desc: `Управляется под Meryem Yıldız Travel, лицензия TÜRSAB категории A #${TURSAB_LICENSE_NUMBER}. 50 000+ гостей. Те же стандарты безопасности, которые родители применяют к любому стамбульскому транспорту.` },
 { icon: Baby, title: "До 3 лет бесплатно · 3-13 лет детский тариф 50%", desc: "Дети младше 3 лет плавают бесплатно на всех пакетах. 3-13 лет получают скидку 50% (подтверждается при бронировании). В меню ужина есть детские опции (куриный гриль, рис, фрукты) — рыба не навязывается младше 12 лет." },
 { icon: Cake, title: "День рождения + Эйд + семейное торжество", desc: "Доставка торта на борт + тихое объявление экипажем по запросу. Особенно во время Эйд (Рамазан + Курбан-байрам) семьи бронируют ужин-круиз как площадку для байрамного вечера." },
 ],
 faqHeading: "FAQ семья",
 faqs: [
 { q: "Безопасен ли круиз по Босфору для детей?", a: `MerrySails работает по лицензии TÜRSAB категории A #${TURSAB_LICENSE_NUMBER} (с 2001 года) и соблюдает стандарты безопасности Турецкого морского управления — спасжилет на каждого пассажира, обученная команда, ежечасные проверки безопасности. У общего ужин-круиза есть закрытые места с полным видом на Босфор — семьям с маленькими детьми не нужно проводить время на открытой палубе.` },
 { q: "Какие тарифы для детей?", a: "До 3 лет бесплатно на всех пакетах. 3-13 лет — скидка 50% (половина цены взрослого за тот же пакет). 13+ лет — взрослый тариф. Точный детский тариф подтверждается при бронировании — отправьте возраст детей через WhatsApp." },
 { q: "Лучший формат для семьи из 4 человек?", a: "Для семьи из 4 (2 взрослых + 2 детей) самое частое бронирование — Silver Soft ужин-круиз (€30/взрослый). Отельный трансфер, маршрут 3,5 часа, детское меню, семейное турецкое шоу. Для семей 8+ человек: частная яхта (€220+, вся яхта со своим темпом)." },
 { q: "Удобны ли времена круиза для детей?", a: "Закатный круиз отправляется 18:30-19:30 (по сезону), возвращается 21:00-21:30 — соответствует обычному времени отхода ребёнка ко сну. Ужин-круиз отправляется 20:30, возвращается ~00:00 — лучше для детей 8+ или семей, где дети ложатся поздно. Частная яхта — на любой час." },
 { q: "Можно ли отменить, если ребёнок заболел?", a: "Бесплатно до 24 часов до отправления. На общих круизах с pay-onboard карта не списывается. На частной яхте с депозитом полный возврат при отмене за 24 ч+. Same-day отмены из-за болезни — по WhatsApp индивидуально." },
 { q: "Есть ли высокий стул для малыша?", a: "Высокие стулья на ужин-круизе доступны при уведомлении за 24 часа. Укажите возраст малыша + потребность в высоком стуле в WhatsApp-сообщении о бронировании; операции загрузит его перед отправлением." },
 ],
 ctaHeading: "Забронировать семейный круиз по Босфору",
 ctaBody: "Отправьте название отеля + возраст детей + предпочтительную дату. Мы подтвердим пакет, время трансфера и детский тариф в течение 24 часов.",
 ctaPrimary: "Посмотреть ужин-круиз",
 ctaWhatsapp: "Семейный запрос через WhatsApp",
 whatsappPrefill: "Здравствуйте, MerrySails! Семейный запрос круиза по Босфору. Взрослые: [N], возраст детей: [возрасты], отель: [название], дата: [дата].",
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
 alternates: { canonical: canonicalUrl, languages: buildHreflang("/bosphorus-cruise-for-families") },
 openGraph: { title: c.metaTitle, description: c.metaDescription, url: canonicalUrl, type: "article" },
 };
}

export default async function LocaleFamiliesPage({ params }: { params: Promise<{ locale: string }> }) {
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

 <div className="my-8"><ReviewsCarousel productKey="any" locale={locale as SiteLocale} /></div>

 <section className="rounded-2xl border border-[var(--brand-primary)]/20 bg-[linear-gradient(135deg,rgba(230,110,72,0.06),rgba(255,184,0,0.08))] p-6">
 <h2 className="mb-2 text-xl font-bold text-[var(--heading)]">{c.ctaHeading}</h2>
 <p className="mb-4 text-sm leading-relaxed text-[var(--body-text)]">{c.ctaBody}</p>
 <div className="flex flex-col gap-3 sm:flex-row">
 <Link href={`/${locale}/istanbul-dinner-cruise`} className="btn-cta !px-6 !py-3">
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
 <StickyMobileCta reserveHref={`/${locale}/istanbul-dinner-cruise`} reserveLabel={c.reserveLabel} locale={locale as SiteLocale} whatsappLocation={`locale_families_${locale}`} whatsappPrefill={c.whatsappPrefill} />
 </>
 );
}
