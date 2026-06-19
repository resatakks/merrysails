import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";
import LocaleHelpfulResources from "@/components/layout/LocaleHelpfulResources";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import QuickAnswer from "@/components/ai/QuickAnswer";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";

export const revalidate = 3600;

type FaqItem = { q: string; a: string };
type PriceRow = { name: string; price: string; duration: string; included: string };

type LocaleContent = {
 htmlLang: string;
 title: string;
 description: string;
 canonicalPath: string;
 h1: string;
 subtitle: string;
 intro: string;
 trustBadge: string;
 keyFacts: { label: string; value: string }[];
 tourOptions: { slug: string; title: string; price: string; duration: string; tag: string; desc: string }[];
 priceTableTitle: string;
 priceTableCols: [string, string, string, string];
 priceRows: PriceRow[];
 compareSectionTitle: string;
 compareItems: { title: string; desc: string }[];
 whyTitle: string;
 whyItems: { title: string; desc: string }[];
 departureTitle: string;
 departureParagraph: string;
 departurePoints: string[];
 scheduleSection?: {
 title: string;
 intro: string;
 rows: { season: string; sunsetTour: string; dinnerTour: string; note: string }[];
 footnote: string;
 };
 uskudarSection?: {
 title: string;
 intro: string;
 bullets: { label: string; desc: string }[];
 cta: string;
 };
 itinerarySection?: {
 title: string;
 intro: string;
 sunsetSteps: { time: string; landmark: string; desc: string }[];
 dinnerSteps: { time: string; landmark: string; desc: string }[];
 sunsetLabel: string;
 dinnerLabel: string;
 footnote: string;
 };
 operatorQuoteSection?: {
 title: string;
 intro: string;
 quotes: { headline: string; body: string }[];
 attribution: string;
 attributionTitle: string;
 };
 faqTitle: string;
 faqs: FaqItem[];
 homeLabel: string;
 ctaTitle: string;
 ctaSubtitle: string;
 ctaBookLabel: string;
 ctaWhatsappLabel: string;
 aggregateRating: { value: string; count: string };
};

const CONTENT: Record<string, LocaleContent> = {
 tr: {
 htmlLang: "tr-TR",
 title: "Boğaz Turu İstanbul — €30'dan başlayan fiyatlar",
 description: "İstanbul Boğaz turu: yemekli boğaz turu €30'dan, gün batımı turu €30'dan (Sal & Per), Eminönü kalkışlı. TÜRSAB A Grubu lisanslı, 50.000+ misafir. Online rezervasyon.",
 canonicalPath: "/tr/bosphorus-cruise",
 h1: "Boğaz Turu İstanbul",
 subtitle: "MerrySails İstanbul",
 intro: "İstanbul boğaz turu seçeneklerimiz: gün batımı boğaz turu €30'dan (Sal & Per), yemekli boğaz turu €30'dan, özel yat kiralama €220'den. TÜRSAB A Grubu lisanslı, 2001'den bu yana 50.000'i aşkın misafir. Doğrudan rezervasyon, aracısız fiyat.",
 trustBadge: "TÜRSAB A Grubu Lisanslı · 2001'den Bu Yana · 50.000+ Misafir",
 keyFacts: [
 { label: "Gün Batımı Turu", value: "€30'dan (Sal & Per)" },
 { label: "Akşam Yemeği Turu", value: "€30'dan" },
 { label: "Özel Yat", value: "€220'den" },
 { label: "Hizmet", value: "2001'den beri" },
 ],
 tourOptions: [
 { slug: "sunset", title: "Boğaz Gün Batımı Turu", price: "€30", duration: "2 saat", tag: "En çok tercih edilen", desc: "İki seçenek: Şarapsız €30 (Sal & Per) / €34, Şaraplı €35 (Sal & Per) / €40. Altın saat manzarası, canlı rehber ve hafif ikramlar dahil. Günbatımı ışığında Boğaz köprüleri ve tarihi yalılar." },
 { slug: "dinner", title: "İstanbul Akşam Yemeği Turu", price: "€30", duration: "3,5 saat", tag: "4 paket seçeneği", desc: "€30'dan €90'a kadar 4 farklı paket. Türk gecesi gösterisi, akşam yemeği ve Sultanahmet/Taksim'den otel transfer desteği." },
 { slug: "yacht", title: "Özel Yat Kiralama", price: "€220", duration: "2+ saat", tag: "Tam özel deneyim", desc: "Tüm tekne size özel. Evlilik teklifi, doğum günü, aile kutlaması ve kurumsal etkinlikler için ideal. Güzergah ve menüyü siz belirlersiniz." },
 { slug: "boat", title: "Tekne Kiralama İstanbul", price: "Saatlik", duration: "Esnek", tag: "Önce tekne seçin", desc: "Tekne ve güzergahı siz belirleyin, dilediğiniz ekstraları sonra ekleyin. 2 saatten günlük kiralamaya kadar tüm süreler mevcuttur." },
 ],
 priceTableTitle: "İstanbul Boğaz Turu Fiyatları 2026",
 priceTableCols: ["Tur", "Fiyat", "Süre", "Dahil Olanlar"],
 priceRows: [
 { name: "Gün Batımı Turu — Şarapsız", price: "€30 (Sal & Per) / €34 / kişi", duration: "2 saat", included: "Rehber, ikram, köprü altı geçiş" },
 { name: "Gün Batımı Turu — Şaraplı", price: "€40 / kişi", duration: "2 saat", included: "Rehber, 1 bardak şarap, ikram" },
 { name: "Akşam Yemeği — Temel", price: "€30 / kişi", duration: "3,5 saat", included: "Akşam yemeği, müzik, Türk gecesi gösterisi" },
 { name: "Akşam Yemeği — Silver Alkollü", price: "€45 / kişi", duration: "3,5 saat", included: "Standart koltuk, yerel alkol, akşam yemeği, Türk gecesi" },
 { name: "Akşam Yemeği — Gold Alkolsüz", price: "€80 / kişi", duration: "3,5 saat", included: "VIP koltuk (sahne yakını), premium menü, alkolsüz" },
 { name: "Akşam Yemeği — Otel Transfer", price: "€90 / kişi", duration: "~5 saat", included: "Sultanahmet/Taksim transfer dahil" },
 { name: "Özel Yat Kiralama (2 saat)", price: "€220 / tekne", duration: "2 saat", included: "Tüm tekne size özel, 12 kişiye kadar" },
 ],
 compareSectionTitle: "Hangi İstanbul Boğaz Turu Size Uygun?",
 compareItems: [
 { title: "Süre ve bütçe", desc: "2 saatlik hafif bir deneyim için gün batımı turu (€30 Sal & Per, €34 diğer günler), tam akşam programı için yemekli tur (€30–€90), tam özelleştirme için yat kiralama (€220+)." },
 { title: "Özel mi, paylaşımlı mı?", desc: "Gün batımı ve akşam yemeği turları paylaşımlı teknelerdir. Evlilik teklifi, kutlama veya özel grup etkinliği için tüm tekneyi kiralayın." },
 { title: "Rezervasyon zamanlaması", desc: "Yaz sezonunda (Mayıs–Eylül) popüler tarihler 1–2 hafta öncesinden doluyor. Belirli bir tarih varsa erken rezervasyon yapmanızı öneririz." },
 ],
 whyTitle: "Neden MerrySails?",
 whyItems: [
 { title: "TÜRSAB A Grubu Lisansı", desc: "2001'den bu yana Türkiye Seyahat Acentaları Birliği'nin en üst kategorisi olan A Grubu lisansıyla faaliyet gösteriyoruz. Güvenli rezervasyon, yasal güvence." },
 { title: "50.000+ Memnun Misafir", desc: "Yılda 10.000'den fazla misafir ağırlıyoruz. Google, TripAdvisor ve Viator'da 4.8 üzerinde puan almaktayız." },
 { title: "Komisyon Yok — Doğrudan Fiyat", desc: "Üçüncü taraf platformu komisyonu olmadan, doğrudan bizden rezervasyon yapabilirsiniz. Aynı hizmet, daha düşük fiyat." },
 { title: "Ücretsiz İptal", desc: "Sefer tarihinden 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi. Planlarınız değişirse endişelenmeyin." },
 ],
 departureTitle: "Nereden Kalkar?",
 departureParagraph: "İstanbul Boğaz turları Avrupa yakasındaki birkaç iskeleden hareket eder. Kaldığınız otele en yakın kalkış noktasını seçerek kolayca ulaşabilirsiniz.",
 departurePoints: [
 "Kabataş — Dolmabahçe Sarayı karşısı, metro ve tramvay bağlantılı",
 "Beşiktaş — Adalar vapur iskelesi yanı, merkezi konum",
 "Kuruçeşme Marina — Özel yat kiralamalar için lüks marina",
 "Sultanahmet & Taksim — Seçili paketlerde ücretsiz otel transfer",
 ],
 scheduleSection: {
 title: "Boğaz Turu Saatleri 2026 — Hangi Saatte Kalkış Var?",
 intro: "MerrySails boğaz turu saatleri sezona, güneşin batış vaktine ve hava koşullarına göre dinamik olarak güncellenir. Aşağıdaki tablo 2026 sezonu için tipik kalkış saatlerini özetler. Net rezervasyon saatiniz onay e-postanızda ve WhatsApp bildiriminizde yer alır; iskeleye kalkıştan en az 30 dakika önce gelmenizi öneririz.",
 rows: [
 { season: "Mayıs – Haziran", sunsetTour: "19:30 – 21:30", dinnerTour: "20:30 – 24:00", note: "Yoğun sezon — 1 hafta önceden rezervasyon" },
 { season: "Temmuz – Ağustos", sunsetTour: "19:45 – 21:45", dinnerTour: "20:30 – 24:00", note: "En yoğun sezon — 2 hafta önceden rezervasyon" },
 { season: "Eylül – Ekim", sunsetTour: "18:30 – 20:30", dinnerTour: "20:00 – 23:30", note: "İdeal hava — fotoğraf için en güzel ışık" },
 { season: "Kasım – Şubat", sunsetTour: "16:30 – 18:30", dinnerTour: "20:00 – 23:30", note: "Sakin sezon — son dakika rezervasyon mümkün" },
 { season: "Mart – Nisan", sunsetTour: "18:00 – 20:00", dinnerTour: "20:00 – 23:30", note: "Bahar ışığı — turist yoğunluğu düşük" },
 ],
 footnote: "Özel yat kiralama için saat tamamen size özeldir; gündüz, gün batımı veya gece kalkış mümkündür. Eminönü kalkışlı turlar için ek 15 dakika erken hareket bekleyebilirsiniz.",
 },
 uskudarSection: {
 title: "Üsküdar Boğaz Turu — Anadolu Yakasından Nasıl Katılırım?",
 intro: "Üsküdar boğaz turu en sık sorulan sorularımızdan biri: Anadolu yakasında konaklıyorsanız MerrySails turlarına dört kolay yöntemden biriyle ulaşabilirsiniz. Üsküdar, Kadıköy, Kuzguncuk veya Beylerbeyi'nden gelen misafirler için en pratik bağlantıları aşağıda özetledik. Özel yat kiralama paketlerinde Anadolu yakasındaki marinalardan kalkış ayarlanabilir.",
 bullets: [
 { label: "Üsküdar – Kabataş Vapuru (önerilen)", desc: "Şehir Hatları vapuru ile 10 dakikada Kabataş İskelesi'ne ulaşırsınız (₺27 / yetişkin). Vapur seferleri 06:30 – 23:00 arası 15 – 20 dakikada bir hareket eder. Kabataş bizim ana kalkış noktamızdır; turdan sonra aynı vapurla Üsküdar'a dönebilirsiniz." },
 { label: "Üsküdar – Eminönü Vapuru", desc: "Yarımada (Eminönü) tarafı için doğrudan vapur hattı ~12 dakika sürer. Akşam yemeği turlarımızın bir kısmı Eminönü İskelesi'nden hareket eder; rezervasyonunuzdan kalkış iskelesini önceden teyit ediniz." },
 { label: "Marmaray (Üsküdar – Sirkeci)", desc: "Üsküdar'dan Marmaray ile Sirkeci'ye 4 dakikada geçersiniz; oradan 5 dakika yürüyüşle Eminönü İskelesi'ndesiniz. Yağmurlu veya rüzgârlı havalarda vapur yerine tercih edilebilir." },
 { label: "Özel Yat — Anadolu Yakası Kalkışı", desc: "Özel yat kiralama paketlerinde €220'den başlayan tekne başına fiyatlarla Kuzguncuk, Beylerbeyi veya Çengelköy iskelelerinden kalkış ayarlayabiliriz. Üsküdar / Salacak bölgesinde konaklayan grupların kullanmaktan en çok memnun kaldığı seçenektir." },
 ],
 cta: "Anadolu yakası kalkışıyla ilgili WhatsApp üzerinden detay alabilirsiniz — kalkış iskelesini sizin lokasyonunuza göre planlarız.",
 },
 itinerarySection: {
 title: "Boğaz Turu Rotası — Saat Saat Programı",
 intro: "MerrySails boğaz turu güzergahı, Boğaz'ın güney 14 kilometrelik kıyısını — Karaköy / Kabataş'tan Rumeli Hisarı'na kadar — kapsayan sabit bir rotada ilerler. Aşağıdaki tablo gün batımı ve akşam yemekli turlarımızın tipik saat akışını gösterir. Saatler yaz sezonu (Haziran–Ağustos) referansıyla verilmiştir; kış aylarında gün batımı kalkışı yaklaşık 2 saat öne çekilir, akşam yemekli tur saati ise sabit kalır.",
 sunsetLabel: "Gün Batımı Turu (2 saat, Karaköy kalkışı)",
 dinnerLabel: "Akşam Yemekli Tur (3,5 saat, Kabataş kalkışı)",
 sunsetSteps: [
 { time: "18:30", landmark: "Karaköy İskelesi'nde biniş", desc: "Mimar Sinan heykelinin yanı, Marmaray çıkışına 200 m. Bağışlanan İngilizce rehber misafirleri karşılar; ikram tepsisi (kuruyemiş, mevsim meyveleri, su, ev limonatası) servise başlar. Şaraplı pakette iki kadeh yerel şarap sunulur." },
 { time: "19:00", landmark: "Karaköy çıkışı + Galata Kulesi", desc: "Tekne iskeleden ayrılır, Karaköy rıhtımı boyunca kuzeye yönelir. Sağda Galata Kulesi, solda Kız Kulesi'nin Anadolu yakasındaki silueti net görünür. Rehber Boğaz'ın 31 km uzunluğu ve iki kıta arasındaki konumunu anlatır." },
 { time: "19:15", landmark: "Dolmabahçe Sarayı geçişi", desc: "1856 yılında Sultan Abdülmecid için yaptırılan imparatorluk rezidansı. 285 oda, 46 salon, dünyanın en büyük baccarat avizesi (4,5 ton). Cepheye 80 m mesafeden yaklaşırız; fotoğraf için ideal mesafe budur." },
 { time: "19:30", landmark: "Ortaköy Camii + Boğaziçi Köprüsü", desc: "1853 Baroque cephe, birinci Boğaziçi Köprüsü (1973, 1.560 m açıklık) altından geçeriz. Köprü altı geçişi turun en fotoğraflanan anıdır — güverte üst katına geçmek için 5 dakikalık duraklama vardır." },
 { time: "19:50", landmark: "Rumeli Hisarı dönüşü", desc: "1452'de Fatih Sultan Mehmet'in İstanbul'un fethinden önce Boğaz kontrolü için 4 ay içinde inşa ettirdiği kale. Tekne burada U dönüşü yapar; geri dönüşte gökyüzü mavi saate (blue hour) geçer." },
 { time: "20:30", landmark: "Karaköy İskelesi'nde iniş", desc: "Aynı iskeleye dönüş. Karaköy metro istasyonu 150 m, Eminönü tarafı T1 tramvayı 5 dk yürüyüş mesafesindedir. Tur sonunda QR ile dijital fotoğraf paketi opsiyonel satılır (€15)." },
 ],
 dinnerSteps: [
 { time: "20:00", landmark: "Otel transfer (Sultanahmet & Taksim)", desc: "€90 paketinde, Sultanahmet (Ayasofya'ya 300 m içerisi) ve Taksim Meydanı çevresindeki otellerden klimalı VIP araçla pickup. WhatsApp üzerinden tam adres + oda numarası ile koordinasyon yapılır." },
 { time: "20:30", landmark: "Kabataş İskelesi'nden kalkış", desc: "Dolmabahçe Sarayı'nın hemen yanı, T1 tramvayı son durağı + Marmaray bağlantılı merkezi iskele. Tekne kapasitesi 80–120 misafir; oturma planı rezervasyon sırasında (Standart / Silver / Gold / VIP) belirlenir." },
 { time: "20:45", landmark: "Hoşgeldin servisi + meze servisi", desc: "Tekne Boğaz'ın güneyine doğru hareket eder. Üç çeşit meze (humus, sigara böreği, dolma) ve içecek (Silver Soft: alkolsüz / Silver Alkollü: yerel bira-şarap / Gold: premium menü / Gold Unlimited: sınırsız rakı-şarap-kokteyl) sofrada yerini alır." },
 { time: "21:15", landmark: "Boğaziçi Köprüsü altından geçiş", desc: "Tekne köprü altına yaklaşır, ışık şovu (FSM Köprüsü resmi aydınlatma takvimi: günbatımı + 30 dk) güvertede izlenir. Bu nokta turun en çok Instagram'a yansıyan anıdır — fotoğraf için 10 dakikalık güverte molası verilir." },
 { time: "21:30", landmark: "Ana yemek + canlı Türk gecesi gösterisi", desc: "Izgara balık (mevsim) veya tavuk şiş + bulgur pilavı; vejetaryen alternatif (sebze güveç) önceden talep edilmelidir. 4 sanatçı: keman, ud, vokal, göbek dansçısı (Gold Unlimited paketinde 2 dansçı + DJ)." },
 { time: "23:00", landmark: "Rumeli Hisarı + Anadolu kıyısı dönüşü", desc: "Boğaz'ın kuzey ucunda U dönüşü; geri dönüşte Anadolu yakasındaki yalılar (Kandilli, Vaniköy, Çengelköy — 17. yüzyıl Osmanlı yapıları) gece ışıklarıyla görüntülenir. Tatlı servisi: künefe veya baklava + Türk kahvesi." },
 { time: "00:00", landmark: "Kabataş İskelesi'nde iniş", desc: "Tekne Kabataş'a yanaşır. €90 paketinde otel dönüş transferi aynı şoför + araçla otele kadar; diğer paketlerde T1 tramvayı son seferi (00:30) veya taksi (Kabataş–Sultanahmet ortalama ₺250) önerilir." },
 ],
 footnote: "Saatler hava muhalefeti, deniz koşulu veya iskele yoğunluğu nedeniyle ±10 dakika değişebilir. Kesin kalkış saati rezervasyon onay e-postanızda ve tur gününden 24 saat önce gelen WhatsApp hatırlatma mesajınızda yer alır.",
 },
 operatorQuoteSection: {
 title: "Operatör Notu — Captain Ahmet",
 intro: "MerrySails'in operasyonel rotalarını ve hospitality standartlarını 2001'den bu yana planlayan Captain Ahmet'in misafirlerimize doğrudan önerileri:",
 quotes: [
 {
 headline: "Hangi saat ışık için en güzel?",
 body: "\"Boğaz'ın altın saati günbatımından 45 dakika önce başlar ve günbatımından 20 dakika sonra biter — toplam 65 dakikalık bir pencere. Yaz aylarında bu pencere 19:30 – 20:35 arası, kasımdan şubata kadar 16:00 – 17:05 arasıdır. Karaköy'den 19:00 kalkışlı sunset turunda Boğaziçi Köprüsü altından geçişimiz tam altın saatin orta noktasına denk gelir. Fotoğraf için bunu özellikle planlıyoruz; tesadüf değil.\""
 },
 {
 headline: "İlk gelen ne için iyi yer kapıyor?",
 body: "\"Tekneye 18:30'da bindiğinizde sağ taraf güverte (starboard) Dolmabahçe ve Ortaköy fotoğrafları için doğru taraftır; sol taraf Kız Kulesi ve Üsküdar ışıkları için. Akşam yemekli turlarımızda pencere kenarı oturma için 20:00'a kadar iskeleye gelin — bu 30 dakikalık erken biniş, sahne yakını koltukları kapma şansını ikiye katlar. Geç gelirseniz ortada bir yer kalır ki o da kötü değil ama pencere bambaşka bir deneyim.\""
 },
 {
 headline: "Yağmurlu havada ne yapıyoruz?",
 body: "\"İstanbul'da hafif yağmur turu iptal etmemizi gerektirmez — teknelerimizin tamamı kapalı salonlu (klimalı kış / serin yaz). Sadece şiddetli lodos (kuzeydoğu rüzgârı, 25+ knot) veya görüş 500 metre altına düştüğünde turu iptal ederiz; bu durumda kalkıştan 4 saat önce WhatsApp ile bildirim atarız ve %100 iade veya başka tarihe ücretsiz değişim sunarız. 2024 sezonunda 312 günden sadece 7'sinde tur iptal ettik.\""
 },
 {
 headline: "Hangi paket hangi kişiye uygun?",
 body: "\"Çiftler için: gün batımı şaraplı €40 — 2 saatlik kompakt deneyim, fotoğraf ve manzara odaklı. Aileler için: akşam yemekli Silver Soft €30 — çocuk menüsü + Türk gecesi şovu (8 yaş üstü için ideal). Evlilik teklifi: özel yat €220'den — sadece sizin teknenizdir, 2 kişi de 20 kişi de yat başına aynı fiyat. Sürpriz dekor, pasta, DJ ve fotoğrafçı talebe göre ayarlanır — kesin fiyat için WhatsApp. Doğum günü ya da kurumsal: grup yatı €380–€500 (yat başına, gruba göre); 90 ve 150 kişilik etkinlik yatları teklif ile.\""
 },
 ],
 attribution: "Captain Ahmet",
 attributionTitle: "Operasyon Direktörü · MerrySails · TÜRSAB A Grubu Lisanslı 2001'den Bu Yana",
 },
 faqTitle: "Sık Sorulan Sorular",
 faqs: [
 { q: "Boğaz turu ne kadar? Fiyatlar 2026", a: "Boğaz turu fiyatları MerrySails'te kişi başı €30'dan başlar: gün batımı boğaz turu €30 (Salı & Perşembe) / €34 (diğer günler), yemekli boğaz turu €30 – €90 arası 4 paket, özel yat kiralama €220'den başlayan tekne başına fiyat (12 kişiye kadar tek fiyat). Eminönü, Kabataş ve Beşiktaş kalkışları için fiyat farkı yoktur; otel transfer dahil paket €90'dır. Komisyonsuz doğrudan rezervasyon — OTA platformlarına göre %20'ye kadar avantajlıdır." },
 { q: "Boğaz turu ne kadar sürer?", a: "Gün batımı turları 2 saat, akşam yemeği turları yaklaşık 3,5 saattir. Özel yat kiralama için süreyi siz belirlersiniz; minimum 2 saat olup istediğiniz kadar uzatabilirsiniz." },
 { q: "Boğaz turu için en iyi dönem ne zaman?", a: "Yıl boyunca tur düzenlenmektedir. Mayıs–Eylül en yoğun sezon olmakla birlikte, Nisan ve Ekim en ideal hava koşullarını sunar. Kışın Boğaz daha sakin ve fotoğrafik bir atmosfer kazanır." },
 { q: "Tekne turunda çocuk indirimi var mı?", a: "6 yaş altı çocuklar ücretsizdir. 6–12 yaş arası çocuklara %50 indirim uygulanır. Rezervasyon sırasında çocuk sayısını ve yaşlarını belirtmenizi öneririz." },
 { q: "Rezervasyon iptali mümkün mü?", a: "Evet. Sefer tarihinden 48 saat öncesine kadar ücretsiz iptal ve tam para iadesi yapılmaktadır. 48 saatten az kalan iptallerde %50 iade uygulanır." },
 { q: "Yemekli boğaz turu nedir? Ne dahil?", a: "Yemekli boğaz turu (akşam yemeği turu), 3,5 saatlik bir Boğaz deneyimidir. €30'dan €90'a 4 farklı paket mevcuttur: Temel pakette mezeler + ana yemek + Türk gecesi gösterisi dahil; Premium pakette 5 çeşit yemek + açık alkol + VIP oturma dahildir. Ayrıca Sultanahmet ve Taksim bölgesinden otel transfer seçeneği de sunulmaktadır." },
 { q: "Eminönü'den boğaz turu var mı?", a: "Evet, Eminönü en merkezi kalkış noktamızdır. Tarihi yarımada'da yer alır; tramvay (T1 hattı) ve metro (M2) ile kolayca ulaşılır. Hem gün batımı hem akşam yemeği turlarımız Eminönü İskelesi'nden hareket eder. Bunun yanı sıra Kabataş, Beşiktaş ve Üsküdar'dan da kalkış seçeneği mevcuttur; otele en yakın iskeleyi tercih edebilirsiniz." },
 { q: "Boğaz turu saatleri nedir? Hangi saatlerde kalkış var?", a: "Gün batımı turları günbatımından yaklaşık 1 saat önce kalkar; yaz aylarında (Mayıs–Eylül) saat 19:00–19:30, kış aylarında 16:30–17:00 civarındadır. Akşam yemeği turları genellikle saat 20:30'da hareket eder. Sabitlenmiş kalkış saati rezervasyon onayınızda belirtilir; tarihe ve sezona göre hafif değişkenlik gösterebilir." },
 { q: "Üsküdar boğaz turu mevcut mu? Üsküdar'dan nasıl katılırım?", a: "Evet, Üsküdar boğaz turu mümkündür. Üsküdar Anadolu yakasında olduğu için Kabataş veya Eminönü kalkışlı turlarımıza Üsküdar – Kabataş vapur hattıyla (~10 dakika) ya da 15 Temmuz Şehitler Köprüsü üzerinden kolayca katılabilirsiniz. Üsküdar İskelesi'nden Şehir Hatları vapurları 06:30–23:00 arası işler. Özel yat kiralama paketlerinde — €220'den başlayan tekne başına fiyatlarla — Üsküdar veya Anadolu yakasındaki başka noktalardan da kalkış ayarlanabilir." },
 { q: "Beşiktaş boğaz turu nereden kalkar? Beşiktaş'tan tur var mı?", a: "Evet, Beşiktaş boğaz turu seçenekleri mevcuttur. Karaköy ferry piersi, Dolmabahçe Sarayı'nın hemen yanında ve Boğaz turlarımızın merkezi kalkış noktalarından biridir. Akşam yemeği turlarımızın bir kısmı Beşiktaş yakınından, gün batımı turlarımız da bu bölgeye yakın merkezi noktadan kalkar. Beşiktaş, Taksim'den 2 km, Ortaköy'den 1.5 km uzaktadır; otobüs, metrobüs ve füniküler ile ulaşımı kolaydır. Özel yat kiralama için Beşiktaş yakınındaki Kuruçeşme Marina veya Bebek tercih edilir." },
 { q: "Sirkeci'den boğaz turu var mı?", a: "Sirkeci aktif bir Boğaz turu kalkış iskelesi değildir, ancak Sirkeci–Eminönü hattı yürüme mesafesinde (5 dakika) Boğaz turlarımızın merkezi başlangıç noktasıdır. Sirkeci'de kalan misafirler için en yakın ve pratik kalkış Eminönü İskelesi'dir. Marmaray ile Sirkeci'den Üsküdar'a 4 dakikada geçebilir, Anadolu yakasındaki turlara da katılabilirsiniz." },
 { q: "Özel yat kiralama için kaç kişi gerekir?", a: "Özel yat kiralama, kişi sayısına değil tekne başına fiyatlandırılır. 2 kişilik bir çift de tüm tekneyi kiralayabilir. Kapasiteye göre 8–30 kişilik tekne seçenekleri mevcuttur." },
 { q: "Alkol servisi yapılıyor mu?", a: "Gün batımı turlarında şaraplı seçenek vardır (€40/kişi). Akşam yemeği turlarının standart paketinde içecek, premium paketinde ise açık alkol dahildir. Özel yat kiralamada menüyü siz belirlersiniz." },
 ],
 homeLabel: "Ana Sayfa",
 ctaTitle: "Hemen Yerinizi Ayırın",
 ctaSubtitle: "Boğaz'da unutulmaz bir deneyim için online rezervasyon yapın veya WhatsApp üzerinden ulaşın.",
 ctaBookLabel: "Online Rezervasyon →",
 ctaWhatsappLabel: "WhatsApp ile Yaz",
 aggregateRating: { value: "4.9", count: "487" },
 },

 de: {
 htmlLang: "de-DE",
 title: "Bosporus Kreuzfahrt Istanbul — Ab €30",
 description: "Bosporus Kreuzfahrt Istanbul: Sonnenuntergang ab €30 (Di & Do), Dinner-Kreuzfahrt ab €30, Privatjacht ab €220. TÜRSAB-lizenziert seit 2001, 50.000+ Gäste.",
 canonicalPath: "/de/bosphorus-cruise",
 h1: "Bosporus Kreuzfahrt Istanbul",
 subtitle: "MerrySails Istanbul",
 intro: "Der Bosporus ist die 31 Kilometer lange Meerenge, die Europa und Asien trennt — und das Herzstück jedes Istanbulbesuchs. Eine Bosporus Kreuzfahrt führt Sie an osmanischen Palästen, jahrhundertealten Festungen und malerischen Holzvillen (Yalı) vorbei, während zwei Kontinente gleichzeitig am Horizont leuchten. Merry Tourism, TURSAB A-Gruppe lizenziert seit 2001, bietet Ihnen drei Erlebniskategorien: Sonnenuntergangs-Kreuzfahrt ab €30 (Di & Do), Dinner-Kreuzfahrt ab €30 und Privatjacht ab €220. Über 50.000 Gäste haben mit uns die Meerenge zwischen zwei Welten erlebt — buchen Sie direkt beim Anbieter, ohne Aufpreis.",
 trustBadge: "TÜRSAB A-Gruppe lizenziert · seit 2001 · 50.000+ Gäste",
 keyFacts: [
 { label: "Sonnenuntergang-Tour", value: "ab €30 (Di & Do)" },
 { label: "Dinner-Kreuzfahrt", value: "ab €30" },
 { label: "Privat-Jacht", value: "ab €220" },
 { label: "Lizenziert seit", value: "2001" },
 ],
 tourOptions: [
 { slug: "sunset", title: "Bosporus Sonnenuntergang-Kreuzfahrt", price: "€30", duration: "2 Std.", tag: "Beliebteste Option", desc: "Die Sonnenuntergangs-Kreuzfahrt ist die meistgebuchte Erfahrung auf dem Bosporus. Zwei Optionen: Ohne Wein ab €30 (Di & Do) / €34, mit einem Glas türkischem Wein ab €35 (Di & Do) / €40 — jeweils inklusive Guide, Erfrischungen und Brückendurchfahrt." },
 { slug: "dinner", title: "Istanbul Dinner Cruise", price: "€30", duration: "3,5 Std.", tag: "4 Pakete", desc: "Die Dinner-Kreuzfahrt kombiniert ein 3,5-stündiges Fahrerlebnis auf dem Bosporus mit einem mehrgängigen türkischen Abendessen und einer traditionellen Kulturshow. Vier Pakete stehen zur Wahl: Basis (€30), Silver mit Alkohol (€45), Gold ohne Alkohol (€80) und Komfortpaket mit Hoteltransfer ab Sultanahmet oder Taksim (€90). Vegetarische Optionen und Kindermenüs sind auf Anfrage erhältlich." },
 { slug: "yacht", title: "Privatjachtcharter", price: "€220", duration: "2+ Std.", tag: "Vollständig privat", desc: "Beim Privatjachtcharter gehört das gesamte Schiff ausschließlich Ihrer Gruppe — ideal für Heiratsanträge, Geburtstagsfeiern, Familientreffen und Firmenevents. Route, Menü und Zeitplan bestimmen Sie selbst. Unsere Flotte bietet Kapazitäten für 2 bis 30 Personen; Merry Tourism berät Sie kostenlos bei der Auswahl des passenden Schiffs." },
 { slug: "boat", title: "Bootsverleih Istanbul", price: "Stündlich", duration: "Flexibel", tag: "Boot zuerst wählen", desc: "Wählen Sie Ihr Wunschboot aus unserer Flotte, legen Sie Route und Dauer selbst fest und fügen Sie optional Catering, Guide oder besondere Dekoration hinzu. Buchbar von 2 Stunden bis zur ganzen Tagesmiete, ganzjährig verfügbar." },
 ],
 priceTableTitle: "Bosporus Kreuzfahrt Preistabelle 2026",
 priceTableCols: ["Tour", "Preis", "Dauer", "Im Preis enthalten"],
 priceRows: [
 { name: "Sonnenuntergang — ohne Wein", price: "€30 (Di & Do) / €34 / Person", duration: "2 Std.", included: "Guide, Erfrischungen, Brückendurchfahrt" },
 { name: "Sonnenuntergang — mit Wein", price: "€40 / Person", duration: "2 Std.", included: "Guide, 1 Glas Wein, Erfrischungen" },
 { name: "Dinner-Kreuzfahrt — Basis", price: "€30 / Person", duration: "3,5 Std.", included: "Abendessen, Musik, türkische Nachtshow" },
 { name: "Dinner-Kreuzfahrt — Silver Alkohol", price: "€45 / Person", duration: "3,5 Std.", included: "Standardplatz, lokaler Alkohol, Abendmenü, türkische Show" },
 { name: "Dinner-Kreuzfahrt — Gold Softdrinks", price: "€80 / Person", duration: "3,5 Std.", included: "VIP-Platz (Bühnennähe), Premium-Menü, alkoholfreie Getränke" },
 { name: "Dinner — mit Hoteltransfer", price: "€90 / Person", duration: "~5 Std.", included: "Transfer Sultanahmet/Taksim inklusive" },
 { name: "Privat-Jacht (2 Std.)", price: "€220 / Boot", duration: "2 Std.", included: "Ganzes Boot für Sie, bis 12 Personen" },
 ],
 compareSectionTitle: "Welche Bosporus-Tour passt zu Ihnen?",
 compareItems: [
 { title: "Dauer und Budget", desc: "Für ein kompaktes 2-Stunden-Erlebnis bei Sonnenuntergang empfehlen wir die Sonnenuntergangs-Kreuzfahrt ab €30 (Di & Do) bzw. €34 — perfekt für Reisende mit knappem Zeitplan. Wer einen vollständigen Abend mit türkischer Küche und Kulturshow erleben möchte, wählt die Dinner-Kreuzfahrt (€30–€90, 3,5 Stunden). Für maximale Privatsphäre, maßgeschneiderte Route und individuelle Gruppengrößen ab 2 Personen bietet sich die Privatjacht ab €220 an." },
 { title: "Privat oder gemeinsam?", desc: "Sonnenuntergangs- und Dinner-Kreuzfahrten finden auf geteilten Booten mit anderen Gästen statt — gesellig, erschwinglich und ideal für Einzelreisende oder Paare. Möchten Sie einen romantischen Heiratsantrag machen, eine Geburtstagsfeier veranstalten oder mit einer Firmengruppe alleine auf dem Bosporus sein? Dann ist die Privatjacht die richtige Wahl: Das Boot gehört ausschließlich Ihnen, und Sie gestalten das Erlebnis von Anfang bis Ende selbst." },
 { title: "Buchungstiming", desc: "In der Hauptsaison von Mai bis September sind die beliebtesten Abendtermine häufig 1 bis 2 Wochen im Voraus ausgebucht, besonders an Wochenenden und türkischen Feiertagen. Wir empfehlen, bei einem festen Reisedatum frühzeitig online zu reservieren. Außerhalb der Hochsaison (Oktober–April) sind kurzfristige Buchungen meist problemlos möglich, und die Boote sind ruhiger." },
 ],
 whyTitle: "Warum Merry Tourism wählen?",
 whyItems: [
 { title: "TURSAB A-Gruppe Lizenz", desc: "Merry Tourism ist seit 2001 durchgehend mit der TURSAB A-Gruppe lizenziert — der höchsten Zulassungskategorie des türkischen Reisebüroverbands (Türkiye Seyahat Acentaları Birliği). Diese Lizenz belegt, dass wir die strengsten gesetzlichen Anforderungen an Sicherheit, Versicherung und Servicequalität erfüllen. Für Sie bedeutet das: gesicherte Buchung, klare Rückerstattungsregeln und rechtliche Absicherung bei jeder Reservierung." },
 { title: "Über 50.000 zufriedene Gäste", desc: "Seit 2001 haben mehr als 50.000 Gäste aus aller Welt mit uns den Bosporus erlebt — darunter Familien, Paare, Reisegruppen und Unternehmensveranstaltungen. Unsere Bewertungen liegen bei 4,8 von 5 Sternen auf Google, TripAdvisor und Viator. Diese langjährige Erfahrung schlägt sich in reibungslosen Abläufen, zuverlässiger Kommunikation und einem Service nieder, der auf Wiederkommen ausgelegt ist." },
 { title: "Direkt buchen — kein Aufpreis", desc: "Viele Bosporus-Kreuzfahrten werden über OTA-Plattformen wie Viator oder GetYourGuide angeboten, die bis zu 25 % Provision einbehalten. Bei uns buchen Sie direkt beim Anbieter — ohne Zwischenhändler, ohne versteckte Gebühren. Sie erhalten denselben Service zu einem günstigeren Preis und haben bei Fragen oder Änderungen direkten Kontakt zu unserem Team." },
 { title: "Kostenlose Stornierung", desc: "Reisepläne können sich ändern — das wissen wir. Deshalb bieten wir kostenlose Stornierung und vollständige Rückerstattung bis 48 Stunden vor Abfahrt. Bei Stornierung innerhalb von 48 Stunden erstatten wir 50 % des Buchungsbetrags. Keine versteckten Klauseln, keine komplizierten Bedingungen." },
 ],
 departureTitle: "Abfahrtsorte in Istanbul",
 departureParagraph: "Bosporus-Kreuzfahrten starten von mehreren Piers auf der europäischen Seite Istanbuls. Karaköy und Kabataş sind die verkehrsgünstigsten Ausgangspunkte — beide direkt an der Tram-Linie T1 und mit U-Bahn-Anschluss. Eminönü, im Herzen der Altstadt gelegen, ist besonders für Gäste aus dem Sultanahmet-Viertel ideal und in wenigen Minuten zu Fuß vom Großen Basar erreichbar. Beşiktaş bietet eine zentrale Lage zwischen Kabataş und Ortaköy. Für Privatjachten empfehlen wir die Kuruçeşme Marina — eine der exklusivsten Marinas Istanbuls, direkt am Bosporus-Ufer, mit vollständiger Infrastruktur für Charter-Gäste. Gäste aus dem Taksim- oder Beyoğlu-Viertel erreichen Kabataş bequem mit der nostalgischen Tünel-Straßenbahn oder der Fähre. Bei ausgewählten Dinner-Paketen (€90) ist der Hoteltransfer ab Sultanahmet und Taksim bereits inklusive.",
 departurePoints: [
 "Kabataş — gegenüber Dolmabahçe-Palast, direkter Tram-T1- und U-Bahn-Anschluss",
 "Eminönü — historische Altstadt, Fußweg vom Großen Basar, ideal für Sultanahmet-Gäste",
 "Beşiktaş — neben der Fähranlegestelle, zentrale Lage zwischen Taksim und Ortaköy",
 "Karaköy — modernes Kreuzfahrtterminal, 5 Minuten von Galata-Turm und Galataport",
 "Kuruçeşme Marina — Luxusmarina für Privatjachten, exklusiv und ruhig",
 "Sultanahmet & Taksim — kostenloser Hoteltransfer bei ausgewählten Dinner-Paketen (€90)",
 ],
 faqTitle: "Häufig gestellte Fragen — Bosporus Kreuzfahrt Istanbul",
 faqs: [
 { q: "Was kostet eine Bootsfahrt auf dem Bosporus Istanbul?", a: "Eine Bootsfahrt auf dem Bosporus Istanbul kostet ab €30 pro Person (Montag, Dienstag und Donnerstag) bzw. €34 (andere Tage) für die Sonnenuntergangs-Tour (2 Stunden, ohne Wein). Die Dinner-Kreuzfahrt beginnt bei €30 pro Person. Eine vollständig private Jacht gibt es ab €220 pro Boot — egal ob für 2 oder 20 Personen. Alle Preise verstehen sich inklusive Kapitän, Crew und Grundausstattung; keine versteckten Extragebühren." },
 { q: "Wie lange dauert eine Bosporus-Kreuzfahrt?", a: "Die Sonnenuntergangskreuzfahrt dauert genau 2 Stunden, die Dinner-Kreuzfahrt ca. 3,5 Stunden (inklusive Show und Abendessen). Beim Privatjachtcharter bestimmen Sie die Dauer selbst; das Minimum beträgt 2 Stunden, nach oben gibt es keine Grenze." },
 { q: "Was ist der Unterschied zwischen bosporus rundfahrt und bosporus kreuzfahrt?", a: "Im deutschen Sprachgebrauch werden die Begriffe ‚Bosporus Rundfahrt', ‚Bosporus Kreuzfahrt' und ‚Bosporus Bootsfahrt' synonym verwendet — alle meinen dieselbe Erfahrung: eine geführte Bootstour auf der Meerenge zwischen Europa und Asien. Bei MerrySails gibt es drei Varianten: die kurze Rundfahrt bei Sonnenuntergang (2 Std., ab €30 Di & Do / €34), die Abendrundfahrt mit Dinner (3,5 Std., ab €30) und die private Charterfahrt (ab €220 pro Boot)." },
 { q: "Wann ist die beste Reisezeit für eine Bosporus-Kreuzfahrt?", a: "Touren finden ganzjährig statt. Die Hochsaison ist Mai bis September mit längerem Tageslicht und warmem Wetter. April und Oktober bieten ideale Bedingungen: angenehme Temperaturen, weniger Touristenandrang und goldenes Herbst- oder Frühlingslicht. Wintertouren (November–März) sind ruhiger, oft neblig-malerisch und bieten einen einzigartigen Blick auf ein ruhigeres Istanbul." },
 { q: "Welcher Abfahrtsort ist am besten — Kabataş, Eminönü oder Karaköy?", a: "Das hängt von Ihrem Hotel ab. Kabataş ist verkehrstechnisch am besten angebunden (Tram T1 + U-Bahn) und eignet sich für Gäste aus Beşiktaş, Ortaköy oder Cihangir. Eminönü ist ideal für Gäste aus der Altstadt (Sultanahmet, Beyazıt), da der Pier nur wenige Gehminuten vom Großen Basar und der Hagia Sophia entfernt liegt. Karaköy empfiehlt sich für Gäste aus dem Beyoğlu-Viertel oder dem Galataport-Terminal. Wir helfen Ihnen bei der Buchung gerne beim Abfahrtspunkt." },
 { q: "Ist Merry Tourism sicher und offiziell lizenziert?", a: "Ja. Merry Tourism ist seit 2001 durchgehend mit der TURSAB A-Gruppe lizenziert — der höchsten offiziellen Zulassung für türkische Reiseunternehmen. Alle Schiffe erfüllen die Sicherheitsvorschriften der türkischen Küstenwacht; Schwimmwesten und Sicherheitsausrüstung sind an Bord vorgeschrieben. Mit über 50.000 Gästen seit Gründung gehören wir zu den erfahrensten Bosporus-Kreuzfahrtanbietern Istanbuls." },
 { q: "Gibt es Kinderermäßigungen?", a: "Kinder unter 6 Jahren sind kostenlos. Für Kinder von 6 bis 12 Jahren gilt 50 % Ermäßigung auf den regulären Preis. Bitte geben Sie Anzahl und Alter der Kinder bei der Buchung an, damit wir die korrekte Kapazität und das passende Kindermenü (bei Dinner-Touren) vorbereiten können." },
 { q: "Kann ich kostenlos stornieren?", a: "Ja. Kostenlose Stornierung und volle Rückerstattung bis 48 Stunden vor Abfahrt. Bei Stornierung innerhalb von 48 Stunden gilt 50 % Rückerstattung. Im Fall von wetterbedingten Absagen (Sturm, starker Nebel) erstatten wir 100 % oder bieten kostenlose Umbuchung an." },
 { q: "Was wird beim Abendessen serviert?", a: "Je nach Paket: türkische Meze-Vorspeisen (Humus, Dolma, Sigara Böreği), Hauptgericht (gegrillter Fisch oder Fleisch), Dessert und türkischer Tee. Beim Gold- und Transferpaket gibt es ein erweitertes Fünf-Gänge-Menü. Vegetarische Optionen und Berücksichtigung von Allergien sind auf Anfrage möglich — bitte bei der Buchung angeben." },
 { q: "Wie viele Personen für eine Privatjacht?", a: "Privatjachten werden pro Boot berechnet, nicht pro Person. Schon 2 Personen können das gesamte Boot für sich buchen. Je nach gewähltem Schiff beträgt die Kapazität 8 bis 30 Personen. Für größere Gruppen (Firmenevents, Hochzeiten) steht unser Team für individuelle Angebote zur Verfügung." },
 { q: "Wird Alkohol serviert?", a: "Bei der Sonnenuntergangskreuzfahrt gibt es eine Option mit einem Glas türkischem Wein (€40/Person). Beim Standard-Dinner (€30) ist ein Softdrink inklusive, beim Silver-Paket (€45) ist lokaler Alkohol enthalten, beim Premium-Dinner (€80+) ist die Bar offen. Beim Privatjachtcharter gestalten Sie das Getränkeangebot nach Ihren Wünschen." },
 ],
 homeLabel: "Startseite",
 ctaTitle: "Jetzt buchen",
 ctaSubtitle: "Sichern Sie sich Ihren Platz für ein unvergessliches Erlebnis auf dem Bosporus — direkt beim Anbieter, ohne Aufpreis.",
 ctaBookLabel: "Online buchen →",
 ctaWhatsappLabel: "Per WhatsApp anfragen",
 aggregateRating: { value: "4.9", count: "487" },
 },

 fr: {
 htmlLang: "fr-FR",
 title: "Croisière Bosphore Istanbul — À partir de €30",
 description: "Croisière Bosphore Istanbul : coucher de soleil dès €30 (mar & jeu), dîner dès €30, yacht privé dès €220. Agence TÜRSAB groupe A, 50 000+ clients. Réservez en ligne.",
 canonicalPath: "/fr/bosphorus-cruise",
 h1: "Croisière Bosphore Istanbul",
 subtitle: "MerrySails Istanbul",
 intro: "Comparez toutes les options de croisière sur le Bosphore à Istanbul : coucher de soleil dès €30 (mar & jeu), dîner dès €30, yacht privé dès €220. Agence certifiée TÜRSAB depuis 2001, plus de 50 000 clients satisfaits.",
 trustBadge: "Certifié TÜRSAB groupe A · depuis 2001 · 50 000+ clients",
 keyFacts: [
 { label: "Coucher de soleil", value: "dès €30 (mar & jeu)" },
 { label: "Croisière dîner", value: "dès €30" },
 { label: "Yacht privé", value: "dès €220" },
 { label: "En activité depuis", value: "2001" },
 ],
 tourOptions: [
 { slug: "sunset", title: "Croisière Coucher de Soleil Bosphore", price: "€30", duration: "2h", tag: "Option la plus populaire", desc: "Deux formules : sans vin dès €30 (mar & jeu) / €34, avec vin dès €35 (mar & jeu) / €40. Panorama doré, guide en direct et rafraîchissements inclus." },
 { slug: "dinner", title: "Croisière Dîner Istanbul", price: "€30", duration: "3h30", tag: "4 formules", desc: "4 formules de €30 à €90. Spectacle de nuit turc, dîner et transfert hôtel depuis Sultanahmet/Taksim disponible." },
 { slug: "yacht", title: "Charter Yacht Privé", price: "€220", duration: "2h+", tag: "Entièrement privatisé", desc: "Le bateau entier rien que pour vous. Idéal pour demande en mariage, anniversaire, fête familiale et événements d'entreprise. Itinéraire et menu personnalisés." },
 { slug: "boat", title: "Location de Bateau Istanbul", price: "À l'heure", duration: "Flexible", tag: "Choisissez d'abord le bateau", desc: "Choisissez bateau et itinéraire, puis ajoutez les extras souhaités. De 2 heures à la journée complète." },
 ],
 priceTableTitle: "Tableau des Prix — Croisière Bosphore 2026",
 priceTableCols: ["Formule", "Prix", "Durée", "Inclus"],
 priceRows: [
 { name: "Coucher de soleil — sans vin", price: "€30 (mar & jeu) / €34 / pers.", duration: "2h", included: "Guide, rafraîchissements, passage sous les ponts" },
 { name: "Coucher de soleil — avec vin", price: "€40 / pers.", duration: "2h", included: "Guide, 1 verre de vin, rafraîchissements" },
 { name: "Dîner — Formule Essentielle", price: "€30 / pers.", duration: "3h30", included: "Dîner, musique, spectacle de nuit turc" },
 { name: "Dîner — Silver Alcool", price: "€45 / pers.", duration: "3h30", included: "Place standard, alcool local, menu dîner, spectacle turc" },
 { name: "Dîner — Gold Sans Alcool", price: "€80 / pers.", duration: "3h30", included: "Place VIP (près scène), menu premium, boissons sans alcool" },
 { name: "Dîner — Transfert hôtel", price: "€90 / pers.", duration: "~5h", included: "Transfert Sultanahmet/Taksim inclus" },
 { name: "Yacht privé (2h)", price: "€220 / bateau", duration: "2h", included: "Bateau entier, jusqu'à 12 personnes" },
 ],
 compareSectionTitle: "Quelle croisière vous convient ?",
 compareItems: [
 { title: "Durée et budget", desc: "Coucher de soleil (dès €30 mar & jeu, €34 autres jours) pour 2h légères, dîner (€30–€90) pour une soirée complète, yacht privé (€220+) pour une intimité totale." },
 { title: "Privé ou partagé ?", desc: "Les croisières coucher de soleil et dîner sont sur des bateaux partagés. Pour une demande en mariage, une fête ou un groupe privatisé, optez pour le yacht privé." },
 { title: "Quand réserver ?", desc: "En haute saison (mai–septembre), les dates populaires se remplissent 1 à 2 semaines à l'avance. Réservez tôt si vous avez une date précise." },
 ],
 whyTitle: "Pourquoi MerrySails ?",
 whyItems: [
 { title: "Licence TÜRSAB groupe A", desc: "Opérateur certifié TÜRSAB groupe A depuis 2001 — la plus haute catégorie de l'association turque des agences de voyage. Réservation sécurisée, garantie légale." },
 { title: "50 000+ clients satisfaits", desc: "Plus de 10 000 clients par an. Note 4,8+ sur Google, TripAdvisor et Viator." },
 { title: "Réservation directe — sans surcoût", desc: "Pas de commission reversée à des plateformes tierces. Réserver directement chez nous = prix plus bas pour vous." },
 { title: "Annulation gratuite", desc: "Annulation gratuite et remboursement intégral jusqu'à 48 heures avant le départ." },
 ],
 departureTitle: "Points de départ",
 departureParagraph: "Les croisières Bosphore d'Istanbul partent de plusieurs embarcadères sur la rive européenne. Choisissez celui qui est le plus proche de votre hôtel.",
 departurePoints: [
 "Kabataş — en face du palais de Dolmabahçe, accès métro et tramway",
 "Beşiktaş — à côté de l'embarcadère des ferries, position centrale",
 "Marina de Kuruçeşme — marina privée pour yachts de luxe",
 "Sultanahmet & Taksim — transfert hôtel gratuit sur certaines formules",
 ],
 faqTitle: "Questions fréquentes",
 faqs: [
 { q: "Quel est le prix d'une croisière Bosphore Istanbul ?", a: "Une croisière Bosphore Istanbul coûte à partir de €30 par personne (lundi, mardi et jeudi) ou €34 (autres jours) pour la croisière coucher de soleil (2h). La croisière dîner commence à €30/personne. Le charter de yacht privé est disponible à partir de €220 par bateau. Tous les prix incluent le capitaine, l'équipage et les accompagnements de base." },
 { q: "Combien de temps dure une croisière sur le Bosphore ?", a: "La croisière coucher de soleil dure 2 heures, la croisière dîner environ 3h30. Pour le charter de yacht privé, c'est vous qui choisissez la durée ; minimum 2 heures." },
 { q: "Quelle est la meilleure période pour une croisière sur le Bosphore ?", a: "Les croisières ont lieu toute l'année. La haute saison est mai–septembre. Le printemps (avril) et le début de l'automne (octobre) offrent les meilleures conditions. Les croisières d'hiver sont plus calmes et très photogéniques." },
 { q: "Y a-t-il des réductions pour les enfants ?", a: "Les enfants de moins de 6 ans voyagent gratuitement. Les enfants de 6 à 12 ans bénéficient de 50 % de réduction. Merci d'indiquer l'âge des enfants lors de la réservation." },
 { q: "Puis-je annuler gratuitement ?", a: "Oui. Annulation gratuite et remboursement intégral jusqu'à 48 heures avant le départ. Annulation dans les 48 heures : remboursement à 50 %." },
 { q: "Quel est le menu du dîner ?", a: "Selon la formule : mezzés en entrée, plat principal (poisson ou viande), dessert et thé turc. Options végétariennes disponibles ; merci de signaler les allergies lors de la réservation." },
 { q: "Combien de personnes pour louer un yacht privé ?", a: "Le yacht privé est facturé par bateau, pas par personne. Même 2 personnes peuvent privatiser un bateau entier. Capacité selon les bateaux : 8 à 30 personnes." },
 { q: "L'alcool est-il servi à bord ?", a: "La croisière coucher de soleil propose une option avec vin (€40/pers.). Le dîner standard inclut une boisson, le premium propose un bar ouvert. Pour le yacht privé, le menu est entièrement personnalisable." },
 ],
 homeLabel: "Accueil",
 ctaTitle: "Réservez maintenant",
 ctaSubtitle: "Réservez en ligne ou contactez-nous via WhatsApp pour une expérience inoubliable sur le Bosphore.",
 ctaBookLabel: "Réserver en ligne →",
 ctaWhatsappLabel: "Contacter par WhatsApp",
 aggregateRating: { value: "4.9", count: "487" },
 },

 nl: {
 htmlLang: "nl-NL",
 title: "Bosporus Cruise Istanbul — Vanaf €30",
 description: "Bosporus cruise Istanbul: zonsondergang vanaf €30 (di & do), diner cruise vanaf €30, privéjacht vanaf €220. TÜRSAB A-groep, 50.000+ gasten. Direct boeken.",
 canonicalPath: "/nl/bosphorus-cruise",
 h1: "Bosporus Cruise Istanbul",
 subtitle: "MerrySails Istanbul",
 intro: "Vergelijk alle Bosporus cruise-opties in Istanbul: zonsondergang vanaf €30 (di & do), diner vanaf €30, privéjacht vanaf €220. Gecertificeerd door TÜRSAB A-groep sinds 2001 en meer dan 50.000 tevreden gasten.",
 trustBadge: "TÜRSAB A-groep gecertificeerd · sinds 2001 · 50.000+ gasten",
 keyFacts: [
 { label: "Zonsondergang cruise", value: "v.a. €30 (di & do)" },
 { label: "Diner cruise", value: "v.a. €30" },
 { label: "Privéjacht", value: "v.a. €220" },
 { label: "Gecertificeerd sinds", value: "2001" },
 ],
 tourOptions: [
 { slug: "sunset", title: "Bosporus Zonsondergang Cruise", price: "€30", duration: "2 uur", tag: "Meest populair", desc: "Twee opties: zonder wijn v.a. €30 (di & do) / €34, met wijn v.a. €35 (di & do) / €40. Gouden uur panorama, live gids en versnaperingen inbegrepen." },
 { slug: "dinner", title: "Istanbul Diner Cruise", price: "€30", duration: "3,5 uur", tag: "4 pakketten", desc: "4 pakketten van €30 tot €90. Turkse avondshow, diner en hotelophaal vanuit Sultanahmet/Taksim beschikbaar." },
 { slug: "yacht", title: "Privé Jachtcharter", price: "€220", duration: "2+ uur", tag: "Volledig privé", desc: "Het hele schip voor uzelf. Ideaal voor huwelijksaanzoek, verjaardag, familiefeest en bedrijfsevenementen. Route en menu naar wens." },
 { slug: "boat", title: "Boothuur Istanbul", price: "Per uur", duration: "Flexibel", tag: "Boot eerst kiezen", desc: "Kies boot en route, voeg vervolgens extra's toe. Van 2 uur tot een hele dag, alles is mogelijk." },
 ],
 priceTableTitle: "Bosporus Cruise Prijstabel 2026",
 priceTableCols: ["Tour", "Prijs", "Duur", "Inbegrepen"],
 priceRows: [
 { name: "Zonsondergang — zonder wijn", price: "€30 (di & do) / €34 / pers.", duration: "2 uur", included: "Gids, versnaperingen, brugdoorvaart" },
 { name: "Zonsondergang — met wijn", price: "€40 / pers.", duration: "2 uur", included: "Gids, 1 glas wijn, versnaperingen" },
 { name: "Diner Cruise — Basis", price: "€30 / pers.", duration: "3,5 uur", included: "Diner, muziek, Turkse avondshow" },
 { name: "Diner Cruise — Silver Alcohol", price: "€45 / pers.", duration: "3,5 uur", included: "Standaardstoel, lokale alcohol, dinermenu, Turkse show" },
 { name: "Diner Cruise — Gold Frisdrank", price: "€80 / pers.", duration: "3,5 uur", included: "VIP-stoel (podiumzijde), premiummenu, frisdranken" },
 { name: "Diner — met hotelophaal", price: "€90 / pers.", duration: "~5 uur", included: "Transfer Sultanahmet/Taksim inbegrepen" },
 { name: "Privé Jacht (2 uur)", price: "€220 / boot", duration: "2 uur", included: "Hele boot voor u, tot 12 personen" },
 ],
 compareSectionTitle: "Welke cruise past bij u?",
 compareItems: [
 { title: "Duur en budget", desc: "Zonsondergang (v.a. €30 di & do, €34 andere dagen) voor 2 uur lichte ervaring, diner (€30–€90) voor een volledige avond, privéjacht (€220+) voor maximale privacy." },
 { title: "Privé of gedeeld?", desc: "Zonsondergang- en dinercruises zijn op gedeelde boten. Voor huwelijksaanzoeken, feesten of een privégroep raden wij een privéjacht aan." },
 { title: "Wanneer boeken?", desc: "In het hoogseizoen (mei–september) zijn populaire data 1–2 weken van tevoren volgeboekt. Reserveer vroeg als u een vaste datum heeft." },
 ],
 whyTitle: "Waarom MerrySails?",
 whyItems: [
 { title: "TÜRSAB A-groep certificering", desc: "Gecertificeerd door de TÜRSAB A-groep sinds 2001 — de hoogste categorie van de Turkse reisbranchevereniging. Veilig boeken, juridische zekerheid." },
 { title: "50.000+ tevreden gasten", desc: "Meer dan 10.000 gasten per jaar. Beoordeling 4,8+ op Google, TripAdvisor en Viator." },
 { title: "Direct boeken — geen toeslag", desc: "Geen commissie aan derden. Direct boeken bij de aanbieder = lagere prijs voor u." },
 { title: "Gratis annuleren", desc: "Gratis annulering en volledige terugbetaling tot 48 uur voor vertrek." },
 ],
 departureTitle: "Vertrekpunten",
 departureParagraph: "Istanbul Bosporus cruises vertrekken vanuit meerdere aanlegplaatsen op de Europese oever. Kies de pier die het dichtst bij uw hotel ligt.",
 departurePoints: [
 "Kabataş — tegenover het Dolmabahçe Paleis, metro- en tramverbinding",
 "Beşiktaş — naast de veerbootssteiger, centrale ligging",
 "Kuruçeşme Marina — luxe privémarina voor jachten",
 "Sultanahmet & Taksim — gratis hotelophaal bij geselecteerde pakketten",
 ],
 faqTitle: "Veelgestelde vragen",
 faqs: [
 { q: "Hoe lang duurt een Bosporus cruise?", a: "De zonsondergang cruise duurt 2 uur, de diner cruise ongeveer 3,5 uur. Bij privéjachtcharter bepaalt u de duur zelf; minimum 2 uur." },
 { q: "Wanneer is de beste tijd voor een Bosporus cruise?", a: "Cruises vinden het hele jaar plaats. Het hoogseizoen is mei–september. Lente (april) en vroege herfst (oktober) bieden de aangenaamste omstandigheden. Wintercruises zijn rustiger en zeer fotogeniek." },
 { q: "Is er korting voor kinderen?", a: "Kinderen onder 6 jaar zijn gratis. Kinderen van 6–12 jaar krijgen 50% korting. Vermeld de leeftijd van kinderen bij de reservering." },
 { q: "Kan ik gratis annuleren?", a: "Ja. Gratis annulering en volledige terugbetaling tot 48 uur voor vertrek. Bij annulering binnen 48 uur geldt 50% terugbetaling." },
 { q: "Wat wordt er geserveerd bij het diner?", a: "Afhankelijk van het pakket: mezze voorgerechten, hoofdgerecht (vis of vlees), dessert en Turkse thee. Vegetarische opties beschikbaar; vermeld allergieën bij reservering." },
 { q: "Hoeveel personen voor een privéjacht?", a: "Privéjachten worden per boot berekend, niet per persoon. Zelfs 2 personen kunnen een hele boot huren. Capaciteit per boot: 8 tot 30 personen." },
 { q: "Wordt er alcohol geserveerd?", a: "Bij de zonsondergang cruise is er een optie met wijn (€40/pers.). Het standaard diner bevat een drankje, het premium pakket heeft een open bar. Bij privéjachtcharter stelt u het menu zelf samen." },
 ],
 homeLabel: "Startpagina",
 ctaTitle: "Reserveer nu",
 ctaSubtitle: "Reserveer online of neem contact op via WhatsApp voor een onvergetelijke ervaring op de Bosporus.",
 ctaBookLabel: "Online reserveren →",
 ctaWhatsappLabel: "WhatsApp sturen",
 aggregateRating: { value: "4.9", count: "487" },
 },
 ru: {
 htmlLang: "ru-RU",
 title: "Круиз по Босфору в Стамбуле — от €30",
 description:
 "Круиз по Босфору в Стамбуле: круиз на закате от €30 (пн/вт/чт), ужин-круиз от €30, частная аренда яхты от €220. Лицензия TÜRSAB А, 50 000+ гостей с 2001 года. Прямое бронирование.",
 canonicalPath: "/ru/bosphorus-cruise",
 h1: "Круиз по Босфору — Стамбул",
 subtitle: "Эксклюзивный Босфор от MerrySails",
 intro: "Наши варианты круизов по Босфору в Стамбуле: круиз на закате от €30 (пн/вт/чт), ужин-круиз от €30, частная аренда яхты от €220 за судно. Лицензия TÜRSAB А с 2001 года, более 50 000 гостей. Прямое бронирование без наценок OTA.",
 trustBadge: "Лицензия TÜRSAB А · с 2001 года · 50 000+ гостей",
 keyFacts: [
 { label: "Круиз на закате", value: "от €30 (пн/вт/чт)" },
 { label: "Ужин-круиз", value: "от €30" },
 { label: "Частная яхта", value: "от €220 (за судно)" },
 { label: "Опыт работы", value: "с 2001 года" },
 ],
 tourOptions: [
 { slug: "sunset", title: "Круиз по Босфору на закате", price: "€30", duration: "2 часа", tag: "Самый популярный", desc: "Два варианта: без вина €30 (пн/вт/чт) / €34, с вином €35 (пн/вт/чт) / €40. Виды в золотой час, гид на английском, лёгкие закуски." },
 { slug: "dinner", title: "Ужин-круиз по Стамбулу", price: "€30", duration: "3,5 часа", tag: "4 пакета на выбор", desc: "4 пакета от €30 до €90. Турецкая ночь, ужин и поддержка трансфера из Султанахмета/Таксима." },
 { slug: "yacht", title: "Частная аренда яхты", price: "€220", duration: "2+ часа", tag: "Полностью приватно", desc: "Вся яхта только для Вас. Идеально для предложения руки и сердца, дня рождения, семейного праздника, корпоратива." },
 { slug: "boat", title: "Аренда судна в Стамбуле", price: "Почасовая", duration: "Гибко", tag: "Сначала выберите судно", desc: "Вы выбираете судно и маршрут, затем добавляете нужные опции. От 2 часов до полного дня." },
 ],
 priceTableTitle: "Цены круизов по Босфору 2026",
 priceTableCols: ["Тип", "Цена", "Длительность", "Включено"],
 priceRows: [
 { name: "Круиз на закате — без вина", price: "€30 (пн/вт/чт) / €34 / чел.", duration: "2 часа", included: "Гид, закуски, проход под мостами" },
 { name: "Круиз на закате — с вином", price: "€40 / чел.", duration: "2 часа", included: "Гид, 1 бокал вина, закуски" },
 { name: "Ужин-круиз — Silver Soft", price: "€30 / чел.", duration: "3,5 часа", included: "Ужин, музыка, Турецкая ночь" },
 { name: "Ужин-круиз — Silver Alc.", price: "€45 / чел.", duration: "3,5 часа", included: "Стандартное место, местный алкоголь, ужин, Турецкая ночь" },
 { name: "Ужин-круиз — Gold Soft", price: "€80 / чел.", duration: "3,5 часа", included: "VIP-место (близко к сцене), премиум-меню" },
 { name: "Ужин с трансфером", price: "€90 / чел.", duration: "~5 часов", included: "Трансфер из Султанахмета/Таксима включён" },
 { name: "Частная яхта (2 часа)", price: "€220 / яхта", duration: "2 часа", included: "Вся яхта Вам, до 12 гостей" },
 ],
 compareSectionTitle: "Какой круиз по Босфору Вам подходит?",
 compareItems: [
 { title: "Время и бюджет", desc: "Для 2-часового лёгкого опыта — круиз на закате (€30 пн/вт/чт, €34 другие дни). Полный вечер — ужин-круиз (€30–€90). Полная кастомизация — частная яхта (€220+)." },
 { title: "Приватно или совместно?", desc: "Закат и ужин — совместные суда. Для предложения, праздника или закрытой группы рекомендуем частную яхту." },
 { title: "Когда бронировать?", desc: "В сезон (май–сентябрь) популярные даты заполняются за 1–2 недели. Бронируйте заранее, если у Вас фиксированная дата." },
 ],
 whyTitle: "Почему MerrySails?",
 whyItems: [
 { title: "Лицензия TÜRSAB А", desc: "С 2001 года работаем как лицензированное агентство группы А TÜRSAB (лицензия №14316), высшая категория. Безопасное бронирование, юридическая гарантия." },
 { title: "50 000+ довольных гостей", desc: "Принимаем 10 000+ гостей в год. Рейтинг 4,8+ на Google, TripAdvisor и Viator." },
 { title: "Прямая цена — без комиссии", desc: "Без комиссии посредников. Прямое бронирование = более низкая цена для Вас." },
 { title: "Бесплатная отмена", desc: "Бесплатная отмена и полный возврат до 48 часов до отправления." },
 ],
 departureTitle: "Откуда отправление?",
 departureParagraph: "Круизы по Босфору в Стамбуле отправляются от нескольких пирсов на европейской стороне. Выбирайте отправление, удобное от Вашего отеля.",
 departurePoints: [
 "Кабаташ — напротив дворца Долмабахче, метро + трамвай",
 "Карайёй — у Галатского моста, основной пирс закат-круиза",
 "Куручешме Марина — для частных яхт, премиальная локация",
 "Султанахмет и Таксим — трансфер из отеля в избранных пакетах",
 ],
 faqTitle: "Часто задаваемые вопросы",
 faqs: [
 { q: "Сколько стоит круиз по Босфору в 2026?", a: "Цены MerrySails от €30 на человека: круиз на закате €30 (пн/вт/чт) / €34 (другие дни); ужин-круиз €30 – €90 (4 пакета); частная яхта €220 за судно (до 12 гостей единой ценой). Пакет с трансфером €90. Прямое бронирование — выгоднее OTA на 20%." },
 { q: "Сколько длится круиз по Босфору?", a: "Круиз на закате — 2 часа, ужин-круиз — около 3,5 часов. Для частной яхты Вы определяете длительность сами; минимум 2 часа, без ограничения сверху." },
 { q: "Лучшее время для круиза?", a: "Круизы круглый год. Май–сентябрь — пик, апрель и октябрь — идеальная погода. Зимой Босфор спокойнее и фотогеничнее." },
 { q: "Есть ли детская скидка?", a: "0–3 года бесплатно. 3–8 лет — 50% скидка. 9+ — взрослый тариф. Укажите количество и возраст детей при бронировании." },
 { q: "Можно ли отменить бронь?", a: "Да. Бесплатная отмена и полный возврат до 48 часов до отправления. При отмене позднее — возврат 50%." },
 { q: "Что включает ужин-круиз?", a: "3,5-часовой ужин-круиз с 4 пакетами от €30 до €90. Базовый: мезе + основное блюдо + Турецкая ночь. Премиум: 5 блюд + открытый бар + VIP. Трансфер из Султанахмета и Таксима по запросу." },
 { q: "Как связаться из России?", a: "Пишите в WhatsApp +90 544 898 98 12 — отвечаем на русском, подтверждение брони в течение нескольких минут в рабочее время (09:00–22:00 по Стамбулу)." },
 { q: "Сколько человек нужно для частной яхты?", a: "Частная яхта оценивается по судну, не по числу человек. Даже 2 гостя могут забронировать всю яхту. Вместимость: 8–150 гостей в зависимости от судна." },
 { q: "Подаётся ли алкоголь?", a: "На круизе на закате есть вариант с вином (€40). На ужин-круизе: стандартный пакет с напитком, премиум с открытым баром. На частной яхте Вы определяете меню." },
 ],
 homeLabel: "Главная",
 ctaTitle: "Забронируйте сейчас",
 ctaSubtitle: "Незабываемый Босфор — забронируйте онлайн или напишите в WhatsApp.",
 ctaBookLabel: "Онлайн-бронирование →",
 ctaWhatsappLabel: "Написать в WhatsApp",
 aggregateRating: { value: "4.9", count: "487" },
 },
 zh: {
 htmlLang: "zh-CN",
 title: "伊斯坦布尔博斯普鲁斯游船 — €30 起",
 description: "MerrySails 伊斯坦布尔博斯普鲁斯海峡游船:日落游船 €30 起 (周一/二/四),晚宴游船 €30 起,私人游艇 €220 起。TÜRSAB A 类许可,50,000+ 位客人。直接预订,中文 WhatsApp 客服。",
 canonicalPath: "/zh/bosphorus-cruise",
 h1: "博斯普鲁斯海峡游船 — 伊斯坦布尔",
 subtitle: "MerrySails 博斯普鲁斯专家",
 intro: "我们的伊斯坦布尔博斯普鲁斯游船选择:日落游船 €30 起 (周一/二/四),晚宴游船 €30 起,私人游艇包租 €220 起整船。TÜRSAB A 类许可,自 2001 年起接待 50,000+ 位客人。无 OTA 中介加价,直接预订。",
 trustBadge: "TÜRSAB A 类许可 · 自 2001 年 · 50,000+ 位客人",
 keyFacts: [
 { label: "日落游船", value: "€30 起 (周一/二/四)" },
 { label: "晚宴游船", value: "€30 起" },
 { label: "私人游艇", value: "€220 起 (整船)" },
 { label: "运营年限", value: "自 2001 年起" },
 ],
 tourOptions: [
 { slug: "sunset", title: "博斯普鲁斯日落游船", price: "€30", duration: "2 小时", tag: "最受欢迎", desc: "两种套餐:不含酒 €30 (周一/二/四) / €34,含葡萄酒 €35 (周一/二/四) / €40。黄金时刻博斯普鲁斯海峡景观、英文讲解、轻食小吃。日落光线下的博斯普鲁斯大桥与历史建筑。" },
 { slug: "dinner", title: "伊斯坦布尔晚宴游船", price: "€30", duration: "3.5 小时", tag: "4 个套餐可选", desc: "€30 至 €90 共 4 个套餐。土耳其之夜表演、晚餐、可选苏丹艾哈迈德/塔克西姆酒店接送。" },
 { slug: "yacht", title: "私人游艇包租", price: "€220", duration: "2+ 小时", tag: "完全私人体验", desc: "整船仅供您使用。求婚、生日、家庭聚会、企业活动理想之选。航线与餐饮由您决定。" },
 { slug: "boat", title: "伊斯坦布尔船只租赁", price: "按小时", duration: "灵活", tag: "先选船", desc: "您选择船只和航线,后续添加任何额外项目。从 2 小时到全天租赁均可。" },
 ],
 priceTableTitle: "2026 年博斯普鲁斯游船价格表",
 priceTableCols: ["游船类型", "价格", "时长", "包含项目"],
 priceRows: [
 { name: "日落游船 — 不含酒", price: "€30 (周一/二/四) / €34 / 人", duration: "2 小时", included: "英文讲解、小吃、桥下航行" },
 { name: "日落游船 — 含葡萄酒", price: "€40 / 人", duration: "2 小时", included: "英文讲解、1 杯葡萄酒、小吃" },
 { name: "晚宴游船 — 基础套餐", price: "€30 / 人", duration: "3.5 小时", included: "晚餐、音乐、土耳其之夜表演" },
 { name: "晚宴 — Silver 酒水版", price: "€45 / 人", duration: "3.5 小时", included: "标准座位、本地酒水、晚餐、土耳其之夜" },
 { name: "晚宴 — Gold 无酒精", price: "€80 / 人", duration: "3.5 小时", included: "VIP 座位 (近舞台)、高级菜单、无酒精" },
 { name: "晚宴 — 含酒店接送", price: "€90 / 人", duration: "约 5 小时", included: "苏丹艾哈迈德/塔克西姆酒店接送" },
 { name: "私人游艇 (2 小时)", price: "€220 / 整船", duration: "2 小时", included: "整船仅您使用,最多 12 人" },
 ],
 compareSectionTitle: "哪种博斯普鲁斯游船适合您?",
 compareItems: [
 { title: "时长与预算", desc: "想要 2 小时轻松体验选日落游船 (€30 周一/二/四,€34 其他日期),完整晚间体验选晚宴游船 (€30–€90),完全私人定制选私人游艇 (€220+)。" },
 { title: "私人还是共享?", desc: "日落和晚宴游船为共享船。求婚、庆祝、家庭聚会推荐整船租赁的私人游艇。" },
 { title: "预订时机", desc: "夏季 (5–9 月) 热门日期通常提前 1–2 周售罄。如有特定日期请尽早预订。" },
 ],
 whyTitle: "为什么选择 MerrySails?",
 whyItems: [
 { title: "TÜRSAB A 类许可", desc: "自 2001 年起持有土耳其旅行社协会 A 类许可证 (#14316),是土耳其官方旅游执照体系的最高级别。安全预订,法律保障。" },
 { title: "50,000+ 位满意客人", desc: "每年接待 10,000+ 位客人。在 Google、TripAdvisor 和 Viator 上评分 4.8+。" },
 { title: "直接价格 — 无中介费", desc: "无 OTA 平台佣金 (Viator/GetYourGuide 加价 20-30%)。同样的服务,更低的价格。" },
 { title: "免费取消", desc: "出发前 48 小时之前可免费取消并全额退款。计划改变无忧。" },
 ],
 departureTitle: "从哪里出发?",
 departureParagraph: "伊斯坦布尔博斯普鲁斯游船从欧洲一侧的几个码头出发。您可以选择距离您酒店最近的出发地点。",
 departurePoints: [
 "Kabataş — 多尔玛巴赫切宫对面,地铁和电车连接",
 "Karaköy — Galata 大桥附近,日落游船码头",
 "Kurucesme Marina — 私人游艇出发的豪华码头",
 "苏丹艾哈迈德 & 塔克西姆 — 部分套餐含免费酒店接送",
 ],
 // scheduleSection intentionally omitted for zh at v1 — table column headers
 // are hardcoded Turkish in the JSX render path. Will be locale-templated when
 // we add zh deep variants.
 faqTitle: "常见问题",
 faqs: [
 { q: "博斯普鲁斯游船多少钱? 2026 年价格", a: "MerrySails 博斯普鲁斯游船价格每人 €30 起:日落游船 €30 (周一/二/四) / €34 (其他日期);晚宴游船 €30 – €90 共 4 个套餐;私人游艇 €220 起整船 (最多 12 人统一价格)。Karaköy、Kabataş 和 Kurucesme 出发价格相同。含酒店接送套餐 €90。直接预订无 OTA 加价 — 比第三方平台便宜 20%。" },
 { q: "博斯普鲁斯游船持续多久?", a: "日落游船 2 小时,晚宴游船约 3.5 小时。私人游艇时长由您决定;最低 2 小时,可根据需要延长。" },
 { q: "什么时候是最佳游船季节?", a: "全年均可游船。5–9 月最旺,4 月和 10 月天气最佳。冬季博斯普鲁斯更安静,景色更具摄影感。" },
 { q: "游船有儿童折扣吗?", a: "0–3 岁婴儿免费;3–8 岁儿童 50% 折扣;9 岁以上按成人价。预订时请告知儿童数量和年龄。" },
 { q: "可以取消预订吗?", a: "可以。出发前 48 小时之前可免费取消并全额退款。48 小时内取消退款 50%。" },
 { q: "晚宴游船包含什么?", a: "晚宴游船是 3.5 小时的博斯普鲁斯体验。€30 至 €90 共 4 个套餐:基础套餐含开胃菜 + 主菜 + 土耳其之夜表演;高级套餐含 5 道菜 + 无限酒水 + VIP 座位。可选苏丹艾哈迈德和塔克西姆酒店接送。" },
 { q: "中国游客如何支付?", a: "船上支付支持现金 (EUR/USD/TRY) 和国际信用卡 (Visa/Mastercard/AmEx)。中国银联、支付宝、微信支付目前不直接受理 — 建议携带 Visa/Mastercard 或在本地兑换部分欧元/里拉现金。私人游艇预订需要 30% 定金 (银行转账)。" },
 { q: "中文服务可用吗?", a: "我们的 WhatsApp 客服可使用中文 (+90 544 898 98 12),工作时间内 (伊斯坦布尔时间 09:00-22:00) 几分钟回复。船上船长团队主要使用英文。私人游艇可提前 48 小时预约普通话讲解员 (€80 加费)。菜单含中文菜品翻译。" },
 { q: "私人游艇包租需要多少人?", a: "私人游艇按整船定价,不按人数。2 人也可包租整船。船型容量从 8-30 人,大型活动游艇可达 150 人。" },
 { q: "船上提供酒精饮料吗?", a: "日落游船含葡萄酒选项 (€40/人)。晚宴游船标准套餐含一杯饮料,高级套餐含无限酒水。私人游艇餐饮由您指定。" },
 ],
 homeLabel: "首页",
 ctaTitle: "立即预订",
 ctaSubtitle: "在线预订或 WhatsApp 联系我们,获得难忘的博斯普鲁斯体验。中文客服。",
 ctaBookLabel: "在线预订 →",
 ctaWhatsappLabel: "WhatsApp 中文咨询",
 aggregateRating: { value: "4.9", count: "487" },
 },
};

export function generateStaticParams() {
 return ["tr", "de", "fr", "nl", "ru", "zh"].map((locale) => ({ locale }));
}

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
 return {
 title: c.title,
 description: c.description,
 alternates: {
 canonical: canonicalUrl,
 // 2026-06-05: was hardcoded x-default+en+tr+de+fr+nl only — missing ru
 // and zh self-ref despite both being in their ENABLED_ROUTES sets.
 // Switching to buildHreflang() ties this page to the canonical staging
 // gates so all 6 active locales (+ x-default + en) are emitted correctly.
 languages: buildHreflang("/bosphorus-cruise"),
 },
 openGraph: {
 title: c.title,
 description: c.description,
 url: canonicalUrl,
 type: "website",
 images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.h1 }],
 },
 };
}

const ROUTE_MAP: Record<string, Record<string, string>> = {
 sunset: { tr: "/tr/cruises/bosphorus-sunset-cruise", de: "/de/cruises/bosphorus-sunset-cruise", fr: "/fr/cruises/bosphorus-sunset-cruise", nl: "/nl/cruises/bosphorus-sunset-cruise" },
 dinner: { tr: "/tr/istanbul-dinner-cruise", de: "/de/istanbul-dinner-cruise", fr: "/fr/istanbul-dinner-cruise", nl: "/nl/istanbul-dinner-cruise" },
 yacht: { tr: "/tr/yacht-charter-istanbul", de: "/de/yacht-charter-istanbul", fr: "/fr/yacht-charter-istanbul", nl: "/nl/yacht-charter-istanbul" },
 boat: { tr: "/tr/boat-rental-istanbul", de: "/de/boat-rental-istanbul", fr: "/fr/boat-rental-istanbul", nl: "/nl/boat-rental-istanbul" },
};

export default async function LocaleBosphorusCruisePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
 const c = CONTENT[locale];
 if (!c) notFound();

 const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

 const tourProductSchema = {
 "@context": "https://schema.org",
 "@type": ["TouristTrip", "Service"],
 "@id": `${canonicalUrl}#tour`,
 name: c.h1,
 description: c.description,
 url: canonicalUrl,
 provider: {
 "@type": "TouristInformationCenter",
 name: "MerrySails",
 url: SITE_URL,
 // RULES.md rule 2: LocalBusiness/TravelAgency MUST have inline address.
 // (Source: Semrush 2026-05-17 structured_data_markup_errors audit)
 address: {
 "@type": "PostalAddress",
 streetAddress: "Kabataş İskelesi",
 addressLocality: "Beşiktaş",
 addressRegion: "Istanbul",
 postalCode: "34357",
 addressCountry: "TR",
 },
 telephone: "+905448989812",
 email: "info@merrysails.com",
 },
 offers: c.tourOptions.map((opt) => ({
 "@type": "Offer",
 ...OFFER_MERCHANT_DEFAULTS,
 name: opt.title,
 price: opt.price.replace(/[^0-9]/g, "") || opt.price,
 priceCurrency: "EUR",
 url: canonicalUrl,
 availability: "https://schema.org/InStock",
 })),
 touristType: ["FamilyTourist", "CouplesTourist", "LuxuryTourist"],
 };

 // Separate Product schema for Google Review snippet rich result
 // (Service/TouristTrip parent is not supported per Google's spec)
 // Unique @id + suffixed name to avoid Google merging this with the TouristTrip
 // node — the merged parent_node was previously failing review-snippet validation.
 const productSchema = {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": `${canonicalUrl}#product`,
 name: `${c.h1} — Booking`,
 description: c.description,
 image: SITE_URL + "/og-image.jpg",
 brand: { "@type": "Brand", name: "MerrySails" },
 sku: `merrysails-bosphorus-cruise-${locale}`,
 category: "Bosphorus Cruise Istanbul",
 aggregateRating: {
 "@type": "AggregateRating",
 ratingValue: c.aggregateRating.value,
 reviewCount: c.aggregateRating.count,
 bestRating: "5",
 worstRating: "1",
 },
 offers: {
 "@type": "AggregateOffer",
 priceCurrency: "EUR",
 lowPrice: "30",
 highPrice: "90",
 offerCount: c.tourOptions.length,
 availability: "https://schema.org/InStock",
 seller: { "@id": `${SITE_URL}/#organization` },
 },
 };

 const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: c.faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 };

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
 { "@type": "ListItem", position: 1, name: c.homeLabel, item: `${SITE_URL}/${locale}` },
 { "@type": "ListItem", position: 2, name: c.h1, item: canonicalUrl },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourProductSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

 {/* Hero */}
 <div className="pt-28 pb-16 bg-[var(--surface-alt)]">
 <div className="container-main">
 <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
 <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{c.homeLabel}</Link>
 <span>/</span>
 <span className="text-[var(--heading)]">{c.h1}</span>
 </nav>

 <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">{c.subtitle}</p>
 <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">{c.h1}</h1>
 <div className="max-w-2xl">
 <QuickAnswer productKey="bosphorus-cruise" locale={locale} />
 </div>
 <p className="max-w-2xl text-lg text-[var(--body-text)]">{c.intro}</p>
 <p className="mt-3 text-sm font-semibold text-[var(--text-muted)]">{c.trustBadge}</p>

 {/* Locale-aware social-proof row — same component as EN, translated. */}
 <div className="mt-6">
 <SocialProofBadges variant="generic" locale={locale as SiteLocale} />
 <LiveBookingCounter locale={locale as SiteLocale} className="mt-2" />
 </div>

 {/* Key facts bar */}
 <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
 {c.keyFacts.map((f) => (
 <div key={f.label} className="rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-center">
 <p className="text-xl font-bold text-[var(--brand-primary)]">{f.value}</p>
 <p className="mt-0.5 text-xs text-[var(--text-muted)]">{f.label}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Tour cards */}
 <div className="py-16 bg-white">
 <div className="container-main">
 <div className="grid gap-6 md:grid-cols-2">
 {c.tourOptions.map((opt) => (
 <Link
 key={opt.slug}
 href={ROUTE_MAP[opt.slug]?.[locale] ?? `/${locale}/bosphorus-cruise`}
 className="group rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-md"
 >
 <div className="flex items-start justify-between mb-3">
 <div>
 <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--brand-primary)] mb-2">
 {opt.tag}
 </span>
 <h2 className="text-xl font-bold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">{opt.title}</h2>
 </div>
 <div className="text-right shrink-0 ml-4">
 <p className="text-2xl font-bold text-[var(--brand-primary)]">{opt.price}</p>
 <p className="text-xs text-[var(--text-muted)]">{opt.duration}</p>
 </div>
 </div>
 <p className="text-sm leading-relaxed text-[var(--body-text)]">{opt.desc}</p>
 <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">→</p>
 </Link>
 ))}
 </div>
 </div>
 </div>

 {/* Price table */}
 <div className="py-16 bg-[var(--surface-alt)]">
 <div className="container-main">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.priceTableTitle}</h2>
 <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-[var(--line)] bg-[var(--surface-alt)]">
 {c.priceTableCols.map((col) => (
 <th key={col} className="px-4 py-3 text-left font-semibold text-[var(--heading)]">{col}</th>
 ))}
 </tr>
 </thead>
 <tbody>
 {c.priceRows.map((row, i) => (
 <tr key={i} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-alt)]">
 <td className="px-4 py-3 font-medium text-[var(--heading)]">{row.name}</td>
 <td className="px-4 py-3 font-bold text-[var(--brand-primary)]">{row.price}</td>
 <td className="px-4 py-3 text-[var(--body-text)]">{row.duration}</td>
 <td className="px-4 py-3 text-[var(--text-muted)]">{row.included}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>

 {/* Why choose / compare */}
 <div className="py-16 bg-white">
 <div className="container-main grid gap-12 lg:grid-cols-2">
 <section>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.compareSectionTitle}</h2>
 <div className="flex flex-col gap-4">
 {c.compareItems.map((item) => (
 <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
 <p className="text-sm leading-relaxed text-[var(--body-text)]">{item.desc}</p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{c.whyTitle}</h2>
 <div className="flex flex-col gap-4">
 {c.whyItems.map((item) => (
 <div key={item.title} className="flex gap-3">
 <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center">
 <svg className="h-3 w-3 text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 20 20">
 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
 </svg>
 </div>
 <div>
 <p className="font-semibold text-[var(--heading)]">{item.title}</p>
 <p className="mt-0.5 text-sm leading-relaxed text-[var(--body-text)]">{item.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 <LocaleHelpfulResources locale={locale as SiteLocale} omit="hub" />
 </div>
 </div>

 {/* Departure points */}
 <div className="py-16 bg-[var(--surface-alt)]">
 <div className="container-main max-w-3xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.departureTitle}</h2>
 <p className="text-[var(--body-text)] mb-6">{c.departureParagraph}</p>
 <ul className="flex flex-col gap-3">
 {c.departurePoints.map((point) => (
 <li key={point} className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-white px-4 py-3">
 <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
 <span className="text-sm text-[var(--body-text)]">{point}</span>
 </li>
 ))}
 </ul>
 {/* Kabataş-specific cluster link — TR only */}
 {locale === "tr" && (
 <p className="mt-5 text-sm text-[var(--text-muted)]">
 Kabataş kalkışlı turlar hakkında detaylı bilgi için{" "}
 <Link href="/tr/kabatas-bogaz-turu" className="text-[var(--brand-primary)] underline hover:opacity-80">
 Kabataş Boğaz Turu
 </Link>{" "}
 sayfamızı ziyaret edin.
 </p>
 )}
 </div>
 </div>

 {/* Schedule (Boğaz turu saatleri) — high-volume TR keyword section */}
 {c.scheduleSection && (
 <div className="py-16 bg-white">
 <div className="container-main max-w-4xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.scheduleSection.title}</h2>
 <p className="text-[var(--body-text)] mb-6">{c.scheduleSection.intro}</p>
 <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-[var(--line)] bg-[var(--surface-alt)]">
 <th className="px-4 py-3 text-left font-semibold text-[var(--heading)]">Sezon</th>
 <th className="px-4 py-3 text-left font-semibold text-[var(--heading)]">Gün Batımı Turu Kalkış</th>
 <th className="px-4 py-3 text-left font-semibold text-[var(--heading)]">Akşam Yemeği Turu Kalkış</th>
 <th className="px-4 py-3 text-left font-semibold text-[var(--heading)]">Not</th>
 </tr>
 </thead>
 <tbody>
 {c.scheduleSection.rows.map((row) => (
 <tr key={row.season} className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--surface-alt)]">
 <td className="px-4 py-3 font-medium text-[var(--heading)]">{row.season}</td>
 <td className="px-4 py-3 font-semibold text-[var(--brand-primary)]">{row.sunsetTour}</td>
 <td className="px-4 py-3 font-semibold text-[var(--brand-primary)]">{row.dinnerTour}</td>
 <td className="px-4 py-3 text-[var(--text-muted)]">{row.note}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="mt-4 text-sm text-[var(--text-muted)]">{c.scheduleSection.footnote}</p>
 </div>
 </div>
 )}

 {/* Üsküdar / Anatolian side section — 1,300 vol TR keyword */}
 {c.uskudarSection && (
 <div className="py-16 bg-[var(--surface-alt)]">
 <div className="container-main max-w-4xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.uskudarSection.title}</h2>
 <p className="text-[var(--body-text)] mb-6">{c.uskudarSection.intro}</p>
 <div className="grid gap-4 md:grid-cols-2">
 {c.uskudarSection.bullets.map((b) => (
 <div key={b.label} className="rounded-xl border border-[var(--line)] bg-white p-5">
 <h3 className="font-semibold text-[var(--heading)] mb-2">{b.label}</h3>
 <p className="text-sm leading-relaxed text-[var(--body-text)]">{b.desc}</p>
 </div>
 ))}
 </div>
 <p className="mt-6 text-sm text-[var(--text-muted)]">{c.uskudarSection.cta}</p>
 </div>
 </div>
 )}

 {/* Hour-by-hour itinerary — verifiable specificity, AI-grounding signal */}
 {c.itinerarySection && (
 <div className="py-16 bg-white">
 <div className="container-main max-w-4xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.itinerarySection.title}</h2>
 <p className="text-[var(--body-text)] mb-8">{c.itinerarySection.intro}</p>
 <div className="grid gap-8 lg:grid-cols-2">
 <section>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-4">{c.itinerarySection.sunsetLabel}</h3>
 <ol className="flex flex-col gap-4">
 {c.itinerarySection.sunsetSteps.map((step) => (
 <li key={step.time} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <div className="flex items-baseline gap-3 mb-1">
 <span className="text-base font-bold text-[var(--brand-primary)]">{step.time}</span>
 <span className="text-sm font-semibold text-[var(--heading)]">{step.landmark}</span>
 </div>
 <p className="text-sm leading-relaxed text-[var(--body-text)]">{step.desc}</p>
 </li>
 ))}
 </ol>
 </section>
 <section>
 <h3 className="text-lg font-semibold text-[var(--heading)] mb-4">{c.itinerarySection.dinnerLabel}</h3>
 <ol className="flex flex-col gap-4">
 {c.itinerarySection.dinnerSteps.map((step) => (
 <li key={step.time} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
 <div className="flex items-baseline gap-3 mb-1">
 <span className="text-base font-bold text-[var(--brand-primary)]">{step.time}</span>
 <span className="text-sm font-semibold text-[var(--heading)]">{step.landmark}</span>
 </div>
 <p className="text-sm leading-relaxed text-[var(--body-text)]">{step.desc}</p>
 </li>
 ))}
 </ol>
 </section>
 </div>
 <p className="mt-6 text-sm text-[var(--text-muted)]">{c.itinerarySection.footnote}</p>
 </div>
 </div>
 )}

 {/* Operator first-party quote — E-E-A-T signal, AI citation source */}
 {c.operatorQuoteSection && (
 <div className="py-16 bg-[var(--surface-alt)]">
 <div className="container-main max-w-4xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.operatorQuoteSection.title}</h2>
 <p className="text-[var(--body-text)] mb-8">{c.operatorQuoteSection.intro}</p>
 <div className="grid gap-5 md:grid-cols-2">
 {c.operatorQuoteSection.quotes.map((q) => (
 <blockquote key={q.headline} className="rounded-xl border-l-4 border-[var(--brand-primary)] bg-white p-5 shadow-sm">
 <p className="font-semibold text-[var(--heading)] mb-2">{q.headline}</p>
 <p className="text-sm leading-relaxed text-[var(--body-text)] italic">{q.body}</p>
 </blockquote>
 ))}
 </div>
 <footer className="mt-6 border-t border-[var(--line)] pt-4">
 <p className="font-semibold text-[var(--heading)]">— {c.operatorQuoteSection.attribution}</p>
 <p className="mt-0.5 text-sm text-[var(--text-muted)]">{c.operatorQuoteSection.attributionTitle}</p>
 </footer>
 </div>
 </div>
 )}

 {/* FAQ */}
 <div className="py-16 bg-white">
 <div className="container-main max-w-3xl">
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-8">{c.faqTitle}</h2>
 <div className="flex flex-col gap-4">
 {c.faqs.map((faq) => (
 <details key={faq.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] overflow-hidden">
 <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--heading)] list-none">
 <span>{faq.q}</span>
 <svg className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
 </svg>
 </summary>
 <div className="border-t border-[var(--line)] bg-white px-5 py-4 text-sm leading-relaxed text-[var(--body-text)]">
 {faq.a}
 </div>
 </details>
 ))}
 </div>
 </div>
 </div>

 {/* Locale-aware guest reviews — pulls native-language quotes
 when available, falls back to English. */}
 <div className="py-12 bg-white">
 <div className="container-main max-w-5xl">
 <ReviewsCarousel productKey="any" locale={locale as SiteLocale} />
 </div>
 </div>

 {/* Featured reading — locale-aware internal-link surface from pillar to
 native-language blog posts. Each locale gets its own anchor text and
 its own target post slugs (no English titles in localised pages). */}
 <div className="py-16 bg-[var(--surface-alt)]">
 <div className="container-main max-w-4xl">
 {locale === "tr" && (
 <>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">Boğaz turu planlama — 2026 rehberleri</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">İstanbul boğaz turu, akşam yemekli yat ve yat kiralama için operatör tarafından yazılmış güncel rehberler.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li><Link href="/tr/blog/istanbul-bogaz-turu-fiyatlari-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">2026 boğaz turu fiyatları — paket karşılaştırma</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Akşam yemekli, gün batımı ve yat kiralama gerçek fiyatları yan yana.</span></Link></li>
 <li><Link href="/tr/blog/istanbul-bogaz-turu-saatleri-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Boğaz turu saatleri 2026 — mevsime göre kalkış</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Hangi mevsimde hangi saatte hangi iskeleden kalkış var.</span></Link></li>
 <li><Link href="/tr/blog/eminonu-karakoy-kabatas-bogaz-turu-iskele-rehberi" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Eminönü, Karaköy, Kabataş — hangi iskele kimin için</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Üç ana iskelenin avantajları ve hangi gruba uygun olduğu.</span></Link></li>
 <li><Link href="/tr/blog/istanbul-aksam-yemegi-yat-rezervasyon-rehberi-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Akşam yemekli yat rezervasyon rehberi</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Doğru paketi seçmek için yapılması ve kaçınılması gerekenler.</span></Link></li>
 <li><Link href="/tr/blog/istanbul-yat-kiralama-rehberi-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">İstanbul yat kiralama rehberi 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Yat tipi seçimi, fiyatlama, kalkış noktası ve ek hizmetler.</span></Link></li>
 <li><Link href="/tr/blog/istanbul-yat-kiralama-evlilik-teklifi-rehberi-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Evlilik teklifi yat kiralama rehberi</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Sürpriz anının planlanması, en iyi rota ve fotoğraf desteği.</span></Link></li>
 </ul>
 </>
 )}
 {locale === "de" && (
 <>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">Bosporus-Kreuzfahrt planen — 2026 Ratgeber</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">Operatorseitig geschriebene Ratgeber für Dinner-Kreuzfahrt, Sonnenuntergangsfahrt und Yacht-Charter.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li><Link href="/de/blog/bosporus-kreuzfahrt-preise-istanbul" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Bosporus-Kreuzfahrt Preise Istanbul</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Aktuelle Preise für Dinner, Sonnenuntergang und privaten Yacht-Charter.</span></Link></li>
 <li><Link href="/de/blog/bosporus-bootstour-istanbul-2026-ratgeber" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Bosporus-Bootstour 2026 — kompletter Ratgeber</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Welche Tour passt zu welchem Reiseplan und wie wird gebucht.</span></Link></li>
 <li><Link href="/de/blog/yacht-charter-istanbul-ratgeber" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Yacht-Charter Istanbul — Planungsratgeber</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Yacht-Größe, Programm, Catering und Hafenwahl auf einen Blick.</span></Link></li>
 <li><Link href="/de/blog/heiratsantrag-auf-dem-bosporus-istanbul" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Heiratsantrag auf dem Bosporus</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Wie der Überraschungs-Moment auf einer privaten Yacht funktioniert.</span></Link></li>
 <li><Link href="/de/blog/prinzeninseln-istanbul-tagesausflug-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Prinzeninseln — Tagesausflug 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Wann der Inseltag und wann die Bosporus-Fahrt der richtige Plan ist.</span></Link></li>
 </ul>
 </>
 )}
 {locale === "fr" && (
 <>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">Planifier votre croisière Bosphore — guides 2026</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">Guides écrits par l'opérateur pour croisière-dîner, coucher de soleil et location de yacht.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li><Link href="/fr/blog/croisiere-bosphore-prix-istanbul" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Prix de la croisière Bosphore — Istanbul</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Tarifs réels pour dîner, coucher de soleil et yacht privé.</span></Link></li>
 <li><Link href="/fr/blog/guide-croisiere-bosphore-istanbul-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Guide complet croisière Bosphore 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Quel format pour quel voyage et comment réserver directement.</span></Link></li>
 <li><Link href="/fr/blog/location-yacht-istanbul-guide" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Location de yacht à Istanbul — guide</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Choisir la taille, le programme et le port de départ.</span></Link></li>
 <li><Link href="/fr/blog/demande-en-mariage-sur-le-bosphore" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Demande en mariage sur le Bosphore</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Comment organiser le moment surprise sur un yacht privé.</span></Link></li>
 <li><Link href="/fr/blog/iles-des-princes-istanbul-excursion-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Îles des Princes — excursion 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Quand choisir l'excursion aux îles plutôt que la croisière Bosphore.</span></Link></li>
 </ul>
 </>
 )}
 {locale === "nl" && (
 <>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">Bosporus-cruise plannen — 2026 gidsen</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">Operator-zijde gidsen voor dinercruise, zonsondergangscruise en jacht-charter.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li><Link href="/nl/blog/bosporus-cruise-prijzen-istanbul" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Bosporus-cruise prijzen Istanbul</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Actuele tarieven voor diner, zonsondergang en privé-jacht.</span></Link></li>
 <li><Link href="/nl/blog/bosphorus-cruise-prijzen-gids-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Complete prijsgids cruise 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Welke optie past bij welk reisplan en hoe direct te boeken.</span></Link></li>
 <li><Link href="/nl/blog/jacht-huren-istanbul-gids" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Jacht huren Istanbul — gids</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Jachtgrootte, programma en haven van vertrek.</span></Link></li>
 <li><Link href="/nl/blog/huwelijksaanzoek-op-de-bosporus" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Huwelijksaanzoek op de Bosporus</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Hoe het verrassings-moment op een privé-jacht werkt.</span></Link></li>
 <li><Link href="/nl/blog/prinseneilanden-istanbul-dagtocht-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Prinseneilanden — dagtocht 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Wanneer de eilanden en wanneer de Bosporus-cruise de juiste keuze is.</span></Link></li>
 </ul>
 </>
 )}
 {locale === "ru" && (
 <>
 <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">Планирование круиза по Босфору — гиды 2026</h2>
 <p className="text-sm text-[var(--text-muted)] mb-6">Гиды от оператора: круиз с ужином, круиз на закате и аренда яхты.</p>
 <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
 <li><Link href="/ru/blog/stoimost-tura-po-bosforu-stambul-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Стоимость тура по Босфору в 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Реальные цены на ужин, закат и частную яхту.</span></Link></li>
 <li><Link href="/ru/blog/zakatnyy-kruiz-po-bosforu-stambul-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Круиз по Босфору на закате 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Маршрут золотого часа, пакеты и тайминг.</span></Link></li>
 <li><Link href="/ru/blog/uzhin-kruiz-po-bosforu-stambul-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Круиз с ужином по Босфору 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Четыре пакета, программа турецкой ночи и трансфер.</span></Link></li>
 <li><Link href="/ru/blog/arenda-yakhty-stambul-2026" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Аренда яхты в Стамбуле 2026</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Выбор размера яхты, маршрут и дополнительные опции.</span></Link></li>
 <li><Link href="/ru/blog/prichaly-otpravleniya-tura-po-bosforu-stambul" className="block rounded-xl border border-[var(--line)] bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/40"><span className="block font-semibold text-[var(--heading)]">Причалы отправления — какой подходит вам</span><span className="mt-1 block text-sm text-[var(--text-muted)]">Эминёню, Каракёй и Кабаташ — отличия и для каких туров.</span></Link></li>
 </ul>
 </>
 )}
 </div>
 </div>

 {/* CTA */}
 <div className="py-16 bg-[var(--brand-primary)]">
 <div className="container-main text-center">
 <h2 className="text-3xl font-bold text-white mb-3">{c.ctaTitle}</h2>
 <p className="text-white/80 mb-8 max-w-xl mx-auto">{c.ctaSubtitle}</p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/reservation`}
 className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-primary)] shadow hover:bg-white/90 transition-colors"
 >
 {c.ctaBookLabel}
 </Link>
 <a
 href={WHATSAPP_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
 >
 {c.ctaWhatsappLabel}
 </a>
 </div>
 </div>
 </div>

 <div className="py-4 bg-white">
 <div className="container-main flex justify-end">
 <Link href="/bosphorus-cruise" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
 English →
 </Link>
 </div>
 </div>
 </>
 );
}
