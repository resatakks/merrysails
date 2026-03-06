import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact MerrySails — Phone, WhatsApp & Email | Istanbul Bosphorus Cruises",
  description: "Contact MerrySails for Bosphorus cruise bookings. Call +90 537 040 68 22, WhatsApp, or email info@merrytourism.com. Office: Alemdar Mah, Fatih/Istanbul. Open every day 09:00-22:00.",
  alternates: { canonical: "https://merrysails.vercel.app/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Have questions? We&apos;re here to help. Reach us anytime via phone, WhatsApp, or email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+90 537 040 68 22", href: "tel:+905370406822" },
              { icon: Phone, label: "Phone 2", value: "+90 536 414 66 05", href: "tel:+905364146605" },
              { icon: Phone, label: "WhatsApp", value: "+90 537 040 68 22", href: "https://wa.me/905370406822" },
              { icon: Mail, label: "Email", value: "info@merrytourism.com", href: "mailto:info@merrytourism.com" },
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
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Subject</label>
                <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]" placeholder="Booking inquiry" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea rows={5} className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)] resize-none" placeholder="Tell us about your plans..." />
              </div>
              <button type="submit" className="btn-cta w-full !py-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
