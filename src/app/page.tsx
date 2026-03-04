import HeroSection from "@/components/home/HeroSection";
import PopularTours from "@/components/home/PopularTours";
import FeaturedTours from "@/components/home/FeaturedTours";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularTours />
      <FeaturedTours />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
