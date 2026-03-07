export const metadata = {
  title: "Terms & Conditions — MerrySails Bosphorus Cruises",
  description:
    "MerrySails booking terms and conditions. Cancellation policy, pricing, safety guidelines, and private charter terms for Bosphorus cruises in Istanbul.",
  alternates: { canonical: "https://merrysails.com/terms" },
  openGraph: {
    title: "Terms & Conditions — MerrySails",
    description: "Booking terms, cancellation policy, pricing, and safety guidelines for Bosphorus cruises in Istanbul.",
    url: "https://merrysails.com/terms",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="bg-white rounded-2xl p-6 md:p-10 prose prose-gray max-w-none">
          <p className="text-[var(--text-muted)]">Last updated: March 2026</p>

          <h2>1. Booking & Reservations</h2>
          <p>All bookings are subject to availability. A booking is confirmed once you receive a confirmation email with your reservation details. We recommend booking at least 24 hours in advance.</p>

          <h2>2. Pricing</h2>
          <p>All prices are listed in Euros (EUR) and include applicable taxes unless otherwise stated. Prices are subject to change without notice, but confirmed bookings will be honored at the quoted price.</p>

          <h2>3. Cancellation Policy</h2>
          <p>Free cancellation is available up to 24 hours before the scheduled departure time. Cancellations within 24 hours may be subject to a 50% fee. No-shows will be charged the full amount.</p>

          <h2>4. Weather Conditions</h2>
          <p>In case of adverse weather conditions that make sailing unsafe, we reserve the right to reschedule or cancel tours. Full refunds or alternative dates will be offered in such cases.</p>

          <h2>5. Safety</h2>
          <p>All passengers must follow safety instructions provided by the crew. Life jackets are available on all vessels. Passengers board at their own risk and must disclose any medical conditions.</p>

          <h2>6. Liability</h2>
          <p>MerrySails (Merry Tourism) is not liable for personal belongings lost during tours. Our liability is limited to the tour price paid.</p>

          <h2>7. Private Charters</h2>
          <p>Private charter prices are based on the vessel and duration selected. Additional hours and add-on services are charged separately. The captain has final authority on route and safety decisions.</p>

          <h2>8. Contact</h2>
          <p>For questions about these terms:<br />
          Email: info@merrysails.com<br />
          Phone: +90 537 040 68 22</p>
        </div>
      </div>
    </div>
  );
}
