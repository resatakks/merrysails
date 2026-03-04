import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "MerrySails kullanım koşulları, rezervasyon ve iptal politikaları.",
};

export default function TermsPage() {
  return (
    <section className="section-padding pt-32">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="font-heading text-4xl font-bold text-heading">Kullanım Koşulları</h1>
        <p className="text-gray-400 text-sm">Son güncelleme: 1 Mart 2026</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">1. Genel</h2>
        <p className="text-gray-600">Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. MerrySails, Merry Tourism Ltd. Şti. markasıdır.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">2. Rezervasyon Koşulları</h2>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Rezervasyonlar online ödeme ile kesinleşir.</li>
          <li>Tur başlangıcından 24 saat öncesine kadar ücretsiz iptal yapılabilir.</li>
          <li>24 saatten az süre kala yapılan iptallerde %50 iade uygulanır.</li>
          <li>Tura katılmama durumunda iade yapılmaz.</li>
          <li>Hava koşulları nedeniyle iptal edilen turlar için tam iade veya ücretsiz tarih değişikliği sunulur.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">3. Fiyatlandırma</h2>
        <p className="text-gray-600">Fiyatlar KDV dahildir. Euro ve Türk Lirası cinsinden ödeme yapılabilir. Döviz kuru ödeme anındaki güncel kur üzerinden hesaplanır.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">4. Sorumluluk</h2>
        <p className="text-gray-600">MerrySails, turlar sırasında kişisel eşyaların kaybından sorumlu değildir. Tüm misafirler tur süresince güvenlik kurallarına uymakla yükümlüdür. Teknelerimiz tam kasko sigortalıdır.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">5. Fikri Mülkiyet</h2>
        <p className="text-gray-600">Bu web sitesindeki tüm içerikler (metin, görsel, logo, tasarım) MerrySails&apos;e aittir ve izinsiz kullanılamaz.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">6. İletişim</h2>
        <p className="text-gray-600">
          MerrySails — Merry Tourism Ltd. Şti.<br />
          Email: info@merrysails.com<br />
          Tel: +90 532 123 45 67
        </p>
      </div>
    </section>
  );
}
