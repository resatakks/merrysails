import HeroSection from "@/components/home/HeroSection";
import PopularTours from "@/components/home/PopularTours";
import WhyUs from "@/components/home/WhyUs";
import FleetShowcase from "@/components/home/FleetShowcase";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularTours />
      <WhyUs />
      <FleetShowcase />
      <Testimonials />
      <CTASection />
    </>
  );
}
