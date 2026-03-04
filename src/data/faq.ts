export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Turlar hangi saatlerde kalkıyor?",
    answer: "Gün batımı turlarımız mevsime göre 17:00 veya 18:00'de, yemekli akşam turları 20:00'de, sabah turları 09:00'da, keşif turları ise 10:00, 14:00 ve 16:00'da kalkmaktadır. Özel yat kiralama ve etkinliklerde saat tamamen size bağlıdır.",
    category: "Genel",
  },
  {
    question: "Rezervasyon nasıl yapılır?",
    answer: "Web sitemiz üzerinden online rezervasyon yapabilir, anında onay alabilirsiniz. Alternatif olarak WhatsApp hattımızdan (+90 532 XXX XX XX) veya email ile de rezervasyon oluşturabilirsiniz. Online ödemeler Stripe ve iyzico üzerinden güvenle işlenir.",
    category: "Rezervasyon",
  },
  {
    question: "İptal ve iade politikanız nedir?",
    answer: "Tur başlangıcından 24 saat öncesine kadar ücretsiz iptal ve tam iade yapılmaktadır. 24 saatten az süre kala yapılan iptallerde %50 iade uygulanır. Hava koşulları nedeniyle iptal edilen turlar için tam iade veya ücretsiz tarih değişikliği sunuyoruz.",
    category: "Rezervasyon",
  },
  {
    question: "Çocuklar için indirim var mı?",
    answer: "0-5 yaş arası çocuklar ücretsizdir. 6-12 yaş arası çocuklara %50 indirim uygulanır. 12 yaş üstü yetişkin fiyatı geçerlidir. Aile paketlerimiz için bize ulaşın.",
    category: "Fiyatlandırma",
  },
  {
    question: "Grup indirimi var mı?",
    answer: "10 kişi ve üzeri gruplara otomatik %10 indirim uygulanır. 20+ kişilik gruplar ve kurumsal organizasyonlar için özel fiyatlandırma sunuyoruz. Detaylar için B2B ekibimizle iletişime geçin.",
    category: "Fiyatlandırma",
  },
  {
    question: "Teknelerde yiyecek ve içecek var mı?",
    answer: "Evet, tüm turlarımızda tur tipine göre değişen yiyecek ve içecek servisi bulunmaktadır. Gün batımı turunda kanape ve meşrubat, yemekli turda 4-5 çeşit yemek, kahvaltı turunda açık büfe servisi yapılmaktadır. Alkollü içecek paketleri ayrıca satın alınabilir.",
    category: "Tur Detayları",
  },
  {
    question: "Kötü hava koşullarında turlar yapılıyor mu?",
    answer: "Misafirlerimizin güvenliği önceliğimizdir. Şiddetli rüzgar, yağmur veya fırtına durumunda turlar iptal edilir ve tam iade veya ücretsiz tarih değişikliği sunulur. Hafif yağmur ve normal rüzgar koşullarında turlarımız kapalı alanlarda devam eder.",
    category: "Genel",
  },
  {
    question: "Teknelerde engelli erişimi var mı?",
    answer: "Filomuzun büyük bölümü engelli erişimine uygundur. Tekerlekli sandalye rampası ve engelli tuvaleti bulunan teknelerimiz mevcuttur. Rezervasyon sırasında engelli erişim ihtiyacınızı belirtmenizi rica ederiz.",
    category: "Genel",
  },
  {
    question: "Otel transferi sunuyor musunuz?",
    answer: "Evet, İstanbul'un merkezi bölgelerinden (Sultanahmet, Taksim, Beşiktaş, Kadıköy) otel transferi hizmeti sunuyoruz. Transfer ücreti konuma göre kişi başı €5-€15 arasındadır. VIP ve özel yat paketlerinde transfer dahildir.",
    category: "Ulaşım",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Kredi kartı (Visa, Mastercard, AmEx), banka kartı, Apple Pay, Google Pay ve havale/EFT ile ödeme yapabilirsiniz. Online ödemeler Stripe (uluslararası) ve iyzico (Türk kartları) üzerinden 256-bit SSL şifreleme ile güvenle işlenir.",
    category: "Ödeme",
  },
];
