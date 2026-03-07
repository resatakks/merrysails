import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact MerrySails — Phone, WhatsApp & Email",
  description:
    "Contact MerrySails for Bosphorus cruise bookings. Call +90 537 040 68 22, WhatsApp, or email info@merrysails.com. Open daily 09:00–22:00.",
  keywords: [
    "contact merrysails",
    "bosphorus cruise booking",
    "istanbul cruise phone",
    "merrysails whatsapp",
    "book boat tour istanbul",
  ],
  alternates: { canonical: "https://merrysails.com/contact" },
  openGraph: {
    title: "Contact MerrySails — Book Your Bosphorus Cruise",
    description:
      "Call, WhatsApp, or email us to book your Bosphorus cruise. Open daily 09:00–22:00 in Istanbul.",
    url: "https://merrysails.com/contact",
    type: "website" as const,
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MerrySails — Merry Tourism",
  url: "https://merrysails.com",
  telephone: "+905370406822",
  email: "info@merrysails.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "Istanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.0082, longitude: 28.9784 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+905370406822", contactType: "reservations", availableLanguage: ["English", "Turkish"] },
    { "@type": "ContactPoint", telephone: "+905364146605", contactType: "customer support", availableLanguage: ["English", "Turkish"] },
  ],
};

export default function ContactPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact MerrySails — Book Your Bosphorus Cruise</h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Ready to book a boat tour, dinner cruise, or yacht rental in Istanbul?
            Reach us anytime via phone, WhatsApp, or email. We respond within minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+90 537 040 68 22", href: "tel:+905370406822" },
              { icon: Phone, label: "Phone 2", value: "+90 536 414 66 05", href: "tel:+905364146605" },
              { icon: Phone, label: "WhatsApp", value: "+90 537 040 68 22", href: "https://wa.me/905370406822" },
              { icon: Mail, label: "Email", value: "info@merrysails.com", href: "mailto:info@merrysails.com" },
              { icon: MapPin, label: "Address", value: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, 34093 Fatih/İstanbul" },
              { icon: Clock, label: "Hours", value: "Every day 09:00 — 22:00" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--brand-primary)]/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium text-[var(--heading)] hover:text-[var(--brand-primary)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-medium text-[var(--heading)]">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
    </>
  );
}
