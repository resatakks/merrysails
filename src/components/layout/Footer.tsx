import Link from "next/link";
import { Anchor, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { ADDRESS, EMAIL, PHONE_DISPLAY } from "@/lib/constants";

const coreLinks = [
  { label: "Bosphorus Sunset Cruise", href: "/cruises/bosphorus-sunset-cruise" },
  { label: "Bosphorus Dinner Cruise", href: "/istanbul-dinner-cruise" },
  { label: "Yacht Charter Istanbul", href: "/yacht-charter-istanbul" },
];

const serviceLinks = [
  { label: "Boat Rental Istanbul", href: "/boat-rental-istanbul" },
  { label: "Proposal Yacht Rental", href: "/proposal-yacht-rental-istanbul" },
  { label: "Private Dinner Cruise", href: "/private-bosphorus-dinner-cruise" },
  { label: "Corporate Events", href: "/corporate-events" },
  { label: "Private Events", href: "/private-events" },
];

const companyLinks = [
  { label: "All Cruises", href: "/cruises" },
  { label: "Private Tours", href: "/private-tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Istanbul Guides", href: "/guides" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const blogLinks = [
  { label: "Best Bosphorus Cruise Guide", href: "/blog/best-bosphorus-cruise-istanbul-guide" },
  { label: "Dinner Cruise Guide", href: "/blog/bosphorus-dinner-cruise-what-to-expect" },
  { label: "Sunset Cruise Experience", href: "/blog/istanbul-sunset-cruise-experience" },
  { label: "Private Yacht Charter Guide", href: "/blog/private-yacht-charter-istanbul-guide" },
];

const guideLinks = [
  { label: "Bosphorus Strait", href: "/guides/bosphorus-strait" },
  { label: "Maiden's Tower", href: "/guides/maidens-tower" },
  { label: "Dolmabahce Palace", href: "/guides/dolmabahce-palace" },
  { label: "Rumeli Fortress", href: "/guides/rumeli-fortress" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[var(--brand-dark)] text-white/90 pb-28 lg:pb-10">
      <div className="container-main pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.85fr]">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Anchor className="h-5 w-5 text-[var(--brand-gold)]" />
              </div>
              <span className="text-xl font-bold tracking-wide">
                Merry<span className="text-[var(--brand-gold)]">Sails</span>
              </span>
            </Link>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/60">
              Direct Bosphorus bookings for sunset cruise, dinner cruise, and private yacht charter
              in Istanbul.
            </p>
            <div className="mb-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-2.5">
              <a
                href="tel:+905370406822"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[var(--brand-gold)]"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:info@merrysails.com"
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[var(--brand-gold)]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {ADDRESS}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Core Products
            </h4>
            <ul className="space-y-2.5">
              {coreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Service Pages
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Blog Highlights
            </h4>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--brand-gold)]">
              Guide Topics
            </h4>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--brand-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
          <p className="text-sm text-white/70">
            © 2026 MerrySails — Merry Tourism. TURSAB licensed. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/70 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/70 transition-colors hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
