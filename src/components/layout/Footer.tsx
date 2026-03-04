import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Anchor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pb-20 lg:pb-0">
      <div className="max-w-[1290px] mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center"><Anchor className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold">Merry<span className="text-gold">Sails</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">Premium Bosphorus cruise experiences by Merry Tourism. TURSAB licensed, trusted local operator since day one.</p>
            <div className="flex gap-3 mt-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"><Icon className="w-4 h-4" /></a>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[15px]">Cruises</h4>
            <ul className="space-y-2">
              {["Sunset Cruise","Dinner Cruise","Sightseeing Tour","Breakfast Cruise","Private Yacht","VIP Dinner"].map((n) => <li key={n}><Link href="/cruises" className="text-white/50 hover:text-gold text-sm transition-colors">{n}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[15px]">Company</h4>
            <ul className="space-y-2">
              {[{n:"About",h:"/about"},{n:"Fleet",h:"/fleet"},{n:"Gallery",h:"/gallery"},{n:"Blog",h:"/blog"},{n:"FAQ",h:"/faq"},{n:"Contact",h:"/contact"}].map((l) => <li key={l.n}><Link href={l.h} className="text-white/50 hover:text-gold text-sm transition-colors">{l.n}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[15px]">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="tel:+905321234567" className="flex items-start gap-2 text-white/50 hover:text-gold transition-colors"><Phone className="w-4 h-4 mt-0.5" />+90 532 123 45 67</a></li>
              <li><a href="mailto:info@merrysails.com" className="flex items-start gap-2 text-white/50 hover:text-gold transition-colors"><Mail className="w-4 h-4 mt-0.5" />info@merrysails.com</a></li>
              <li><div className="flex items-start gap-2 text-white/50"><MapPin className="w-4 h-4 mt-0.5" /><span>Eminönü, Fatih<br/>Istanbul, Turkey</span></div></li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/40">TURSAB Licensed</p>
              <p className="text-sm font-semibold text-gold">License No: 12345</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1290px] mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">&copy; 2026 MerrySails — Merry Tourism</p>
          <div className="flex gap-5"><Link href="/privacy-policy" className="text-white/30 hover:text-white/60 text-xs">Privacy</Link><Link href="/terms" className="text-white/30 hover:text-white/60 text-xs">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
