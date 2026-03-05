import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Anchor,
} from "lucide-react";

const cruiseLinks = [
  { label: "Sunset Cruise", href: "/cruises/sunset-cruise" },
  { label: "Dinner Cruise", href: "/cruises/dinner-cruise" },
  { label: "Short Cruise", href: "/cruises/short-cruise" },
  { label: "Private Yacht", href: "/cruises/private-yacht" },
  { label: "Princes' Islands", href: "/cruises/princes-islands" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/merrysails", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/merrysails", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/merrysails", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white pb-20 lg:pb-0">
      <div className="max-w-[1290px] mx-auto px-4 lg:px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-white">
                  Merry<span className="text-secondary">Sails</span>
                </span>
                <span className="text-[10px] leading-tight text-white/50">
                  Merry Tourism
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed">
              Premium Bosphorus cruise experiences in Istanbul. Discover the
              beauty of the strait on our luxury yachts and boats.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Cruises */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
              Cruises
            </h4>
            <ul className="space-y-3">
              {cruiseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905524638498"
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  +90 552 463 84 98
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@merrysails.com"
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  info@merrysails.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  Eminönü, Fatih Istanbul
                </div>
              </li>
            </ul>

            {/* TURSAB Badge */}
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/40 uppercase tracking-wide mb-1">
                TURSAB
              </p>
              <p className="text-sm text-white/70">License No: 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2026 MerrySails. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
