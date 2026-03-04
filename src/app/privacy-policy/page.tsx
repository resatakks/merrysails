import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "MerrySails gizlilik politikası ve KVKK aydınlatma metni.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-padding pt-32">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="font-heading text-4xl font-bold text-heading">Gizlilik Politikası</h1>
        <p className="text-gray-400 text-sm">Son güncelleme: 1 Mart 2026</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">1. Veri Sorumlusu</h2>
        <p className="text-gray-600">MerrySails — Merry Tourism Ltd. Şti. olarak kişisel verilerinizin güvenliğine önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında aşağıdaki aydınlatma metnini bilginize sunuyoruz.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">2. Toplanan Veriler</h2>
        <p className="text-gray-600">Rezervasyon ve iletişim süreçlerinde aşağıdaki kişisel veriler toplanmaktadır:</p>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Ad, soyad</li>
          <li>E-posta adresi</li>
          <li>Telefon numarası</li>
          <li>Ödeme bilgileri (Stripe/iyzico üzerinden işlenir, tarafımızca saklanmaz)</li>
          <li>IP adresi ve tarayıcı bilgileri (çerezler aracılığıyla)</li>
          <li>Otel ve transfer bilgileri (opsiyonel)</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">3. Verilerin Kullanım Amacı</h2>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Rezervasyon işlemlerinin gerçekleştirilmesi</li>
          <li>Hizmet kalitesinin artırılması</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Pazarlama ve iletişim (onay halinde)</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">4. Çerez Politikası</h2>
        <p className="text-gray-600">Web sitemizde gerekli çerezler, analitik çerezler ve pazarlama çerezleri kullanılmaktadır. Çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">5. Haklarınız</h2>
        <p className="text-gray-600">KVKK m.11 kapsamında kişisel verilerinize erişim, düzeltme, silme ve itiraz haklarınız bulunmaktadır. Başvurularınız için info@merrysails.com adresine yazabilirsiniz.</p>

        <h2 className="font-heading text-2xl font-bold text-heading mt-8">6. İletişim</h2>
        <p className="text-gray-600">
          MerrySails — Merry Tourism Ltd. Şti.<br />
          Email: info@merrysails.com<br />
          Tel: +90 532 123 45 67<br />
          Adres: Eminönü İskelesi, Fatih, İstanbul
        </p>
      </div>
    </section>
  );
}
