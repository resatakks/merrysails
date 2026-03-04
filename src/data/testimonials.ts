export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  tour: string;
  date: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emily & James",
    country: "United Kingdom",
    rating: 5,
    text: "The sunset cruise was absolutely magical! The views of the Bosphorus were breathtaking and the staff made everything perfect. Highly recommend for couples!",
    tour: "Sunset Cruise",
    date: "2026-02-15",
    avatar: "EJ",
  },
  {
    id: "2",
    name: "Müller Familie",
    country: "Deutschland",
    rating: 5,
    text: "Wunderbare Erfahrung! Das Dinner war ausgezeichnet und die Live-Musik hat den Abend perfekt gemacht. Istanbul vom Wasser aus zu sehen ist ein Muss!",
    tour: "Dinner Cruise",
    date: "2026-02-10",
    avatar: "MF",
  },
  {
    id: "3",
    name: "Ahmet & Zeynep",
    country: "Türkiye",
    rating: 5,
    text: "Evlilik teklifimiz için harika bir organizasyon yaptılar. Her detay mükemmeldi - dekorasyon, pasta, müzik... Hayatımızın en güzel anını yaşadık!",
    tour: "Evlilik Teklifi Paketi",
    date: "2026-01-28",
    avatar: "AZ",
  },
  {
    id: "4",
    name: "Sarah Williams",
    country: "United States",
    rating: 5,
    text: "Best experience in Istanbul! The VIP dinner cruise exceeded all expectations. The fine dining was on par with top restaurants, and the views were unmatched.",
    tour: "VIP Dinner Cruise",
    date: "2026-02-20",
    avatar: "SW",
  },
  {
    id: "5",
    name: "محمد الرشيدي",
    country: "Saudi Arabia",
    rating: 5,
    text: "خدمة ممتازة وتجربة لا تُنسى. الطاقم كان محترفاً للغاية والطعام كان لذيذاً. أنصح الجميع بتجربة رحلة العشاء.",
    tour: "Dinner Cruise",
    date: "2026-01-15",
    avatar: "MR",
  },
  {
    id: "6",
    name: "Pierre & Marie",
    country: "France",
    rating: 5,
    text: "Une croisière magnifique au coucher du soleil. Le service était impeccable et la vue sur le Bosphore était à couper le souffle. Merci MerrySails!",
    tour: "Sunset Cruise",
    date: "2026-02-05",
    avatar: "PM",
  },
];
