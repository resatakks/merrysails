import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { tours } from "@/data/tours";

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
