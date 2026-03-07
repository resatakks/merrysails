export const metadata = {
  title: "Privacy Policy — MerrySails Bosphorus Cruises",
  description:
    "MerrySails privacy policy. Learn how we collect, use, and protect your personal data when you book Bosphorus cruises and yacht charters in Istanbul.",
  alternates: { canonical: "https://merrysails.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — MerrySails",
    description: "How we collect, use, and protect your personal data when you book Bosphorus cruises in Istanbul.",
    url: "https://merrysails.com/privacy-policy",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl p-6 md:p-10 prose prose-gray max-w-none">
          <p className="text-[var(--text-muted)]">Last updated: March 2026</p>

          <h2>1. Information We Collect</h2>
          <p>When you book a tour or contact us, we may collect your name, email address, phone number, and payment information. We also collect browsing data through cookies to improve your experience.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your personal information to process bookings, communicate about your reservations, send booking confirmations, and improve our services. We do not sell your information to third parties.</p>

          <h2>3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal data. All payment transactions are processed through secure, encrypted channels.</p>

          <h2>4. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings.</p>

          <h2>5. Third-Party Services</h2>
          <p>We may use third-party services for payment processing, analytics, and communication. These services have their own privacy policies.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at info@merrysails.com for any privacy-related requests.</p>

          <h2>7. Contact</h2>
          <p>For privacy questions, contact us at:<br />
          Email: info@merrysails.com<br />
          Phone: +90 537 040 68 22<br />
          Address: Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul</p>
        </div>
      </div>
    </div>
  );
}
