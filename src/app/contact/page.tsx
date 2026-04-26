import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import TrackedContactLink from "@/components/analytics/TrackedContactLink";
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
  "@type": "ContactPage",
  mainEntity: {
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": "https://merrysails.com/#organization",
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
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merrysails.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://merrysails.com/contact" },
  ],
};

export default function ContactPage() {
  const coreRoutes = [
    {
      href: "/bosphorus-cruise",
      title: "Bosphorus Cruise Hub",
      description: "Use this first if you are still comparing sunset, dinner, and private yacht directions.",
    },
    {
      href: "/cruises/bosphorus-sunset-cruise",
      title: "Sunset Cruise",
      description: "Use this if the booking is specifically for a shared sunset experience.",
    },
    {
      href: "/istanbul-dinner-cruise",
      title: "Dinner Cruise",
      description: "Use this for shared dinner cruise packages, Turkish night, and hotel-pickup led evening intent.",
    },
    {
      href: "/yacht-charter-istanbul",
      title: "Yacht Charter",
      description: "Use this for general private yacht packages and charter-led Bosphorus demand.",
    },
  ];

  const supportRoutes = [
    {
      href: "/sunset-cruise-tickets-istanbul",
      title: "Sunset Ticket Support",
      description: "Use this when the shared sunset route is already right and the real question is ticket fit, shared options, and reserve-direct clarity.",
    },
    {
      href: "/turkish-night-dinner-cruise-istanbul",
      title: "Turkish Night Dinner Support",
      description: "Use this when the shared dinner route is already likely right and the real question is the Turkish-night show format, packages, and evening fit.",
    },
    {
      href: "/dinner-cruise-with-hotel-pickup-istanbul",
      title: "Dinner Pickup Support",
      description: "Use this when hotel location and pickup eligibility are the main questions.",
    },
    {
      href: "/dinner-cruise-pickup-sultanahmet-taksim",
      title: "Sultanahmet & Taksim Pickup",
      description: "Use this when the question is specifically whether a central hotel around Sultanahmet, Taksim, Sirkeci, or Karakoy fits the shared dinner pickup flow.",
    },
    {
      href: "/kabatas-dinner-cruise-istanbul",
      title: "Kabatas Dinner Support",
      description: "Use this when the real question is Kabatas-side boarding confidence and arrival flow.",
    },
    {
      href: "/boat-rental-hourly-istanbul",
      title: "Boat Rental Hourly",
      description: "Use this when the real question is a shorter hour-led private hire before a fuller charter package.",
    },
    {
      href: "/proposal-yacht-with-photographer-istanbul",
      title: "Proposal with Photographer",
      description: "Use this when proposal photography coverage is one of the main buying questions before booking.",
    },
    {
      href: "/private-dinner-cruise-for-couples-istanbul",
      title: "Couples Private Dinner",
      description: "Use this when the brief is specifically a quieter private dinner for two, honeymoon, or anniversary-style evening.",
    },
    {
      href: "/corporate-yacht-dinner-istanbul",
      title: "Corporate Yacht Dinner",
      description: "Use this when the company request is specifically a dinner-led private yacht evening rather than a broader event brief.",
    },
    {
      href: "/client-hosting-yacht-istanbul",
      title: "Client Hosting Yacht",
      description: "Use this when guest hospitality and client impression matter more than a broad company-event setup.",
    },
    {
      href: "/team-building-yacht-istanbul",
      title: "Team Building Yacht",
      description: "Use this when the company brief is specifically team-building-led rather than a broad corporate event or dinner.",
    },
    {
      href: "/kurucesme-marina-yacht-charter",
      title: "Kurucesme Marina Yacht",
      description: "Use this when the real question is private-yacht departure flow and Kurucesme-side boarding confidence.",
    },
    {
      href: "/bosphorus-cruise-departure-points",
      title: "Departure Points Hub",
      description: "Use this when the main question is where dinner, sunset, and private yacht products actually start in Istanbul.",
    },
  ];

  const broaderSupportOwners = [
    { href: "/boat-rental-istanbul", label: "Boat Rental Istanbul" },
    { href: "/proposal-yacht-rental-istanbul", label: "Proposal Yacht Rental" },
    { href: "/private-bosphorus-dinner-cruise", label: "Private Dinner Cruise" },
    { href: "/corporate-events", label: "Corporate Events" },
    { href: "/product-launch-yacht-istanbul", label: "Product Launch Yacht" },
    { href: "/private-events", label: "Private Events" },
  ];

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact MerrySails — Book Your Bosphorus Cruise</h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Ready to book a boat tour, dinner cruise, or yacht rental in Istanbul?
            Reach us anytime via phone, WhatsApp, or email. We respond within minutes.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">Start with the core owner pages first</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
            The fastest way to get the right quote is to start from the correct owner page. If you are still broad, start with the compare hub. If the booking is already narrower, use the secondary support links below or send the date, guest count, and preferred format through the contact form.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {coreRoutes.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
              >
                <h3 className="mb-1 text-base font-semibold text-[var(--heading)]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-5">
            <h3 className="text-lg font-semibold text-[var(--heading)]">Use a narrower support page only when the brief is already specific</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {supportRoutes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-[var(--surface-alt)]"
                >
                  <h4 className="mb-1 text-sm font-semibold text-[var(--heading)]">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
              <h4 className="text-sm font-semibold text-[var(--heading)]">Broader support owners if the brief is not this narrow</h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                These are still valid support owners, but they should usually come after the more exact pages above when the modifier is already clear.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {broaderSupportOwners.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:text-[var(--brand-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-3 text-[var(--heading)]">What helps us reply with the right offer</h2>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li>Date and preferred time</li>
                <li>Guest count</li>
                <li>Shared cruise, yacht charter, boat rental, or support service</li>
                <li>Dinner, proposal, birthday, corporate, or simple sightseeing plan</li>
              </ul>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/bosphorus-cruise"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  Compare core booking paths <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-5 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  See booking FAQs
                </Link>
              </div>
            </div>
            {[
              { icon: Phone, label: "Phone", value: "+90 537 040 68 22", href: "tel:+905370406822" },
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
                    item.href.startsWith("tel:") ? (
                      <TrackedContactLink
                        href={item.href}
                        kind="phone"
                        label={item.value}
                        location="contact_page"
                        className="font-medium text-[var(--heading)] transition-colors hover:text-[var(--brand-primary)]"
                      >
                        {item.value}
                      </TrackedContactLink>
                    ) : item.href.includes("wa.me") ? (
                      <TrackedContactLink
                        href={item.href}
                        kind="whatsapp"
                        label={item.value}
                        location="contact_page"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--heading)] transition-colors hover:text-[var(--brand-primary)]"
                      >
                        {item.value}
                      </TrackedContactLink>
                    ) : (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium text-[var(--heading)] hover:text-[var(--brand-primary)] transition-colors">
                        {item.value}
                      </a>
                    )
                  ) : (
                    <div className="font-medium text-[var(--heading)]">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-[var(--heading)]">Licensed Istanbul operator signals</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                MerrySails works under Merry Tourism with a TURSAB-backed travel-agency identity in Fatih, Istanbul. Use the pages below if you want to verify the company details before sending a reservation or charter request.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/tursab"
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  TURSAB license details
                </Link>
                <Link
                  href="/about"
                  className="rounded-xl border border-gray-200 bg-[var(--surface-alt)] px-4 py-3 text-sm font-semibold text-[var(--heading)] transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  About MerrySails & Merry Tourism
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                Departure points are confirmed with the assigned vessel and product type, so use the booking page first and treat the written confirmation as the final operational source of truth.
              </p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
    </>
  );
}
