import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Istanbul — Sunset & Dinner Cruises from €20",
  description:
    "Book the best Bosphorus cruise in Istanbul. Sunset cruises from €20, dinner cruises with Turkish night show, private yacht charter. TURSAB licensed since 2001. Best price guaranteed.",
  keywords: [
    "bosphorus cruise",
    "istanbul cruise",
    "bosphorus sunset cruise",
    "istanbul dinner cruise",
    "yacht charter istanbul",
    "boat tour istanbul",
    "bosphorus boat tour",
    "istanbul boat trip",
  ],
  openGraph: {
    title: "Bosphorus Cruise Istanbul — Sunset & Dinner Cruises from €20",
    description:
      "Sunset cruises from €20, dinner cruises with Turkish night show, private yacht charter. Since 2001.",
    url: "https://merrysails.vercel.app",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TourGrid />
      <FeaturedTour tour={tours[0]} />
      <FeaturedTour tour={tours[1]} reverse />
      <FeaturedTour tour={tours[2]} />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
