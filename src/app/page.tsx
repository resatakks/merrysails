import HeroSection from "@/components/home/HeroSection";
import TourGrid from "@/components/home/TourGrid";
import FeaturedTour from "@/components/home/FeaturedTour";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { tours } from "@/data/tours";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TourGrid />
      <section className="section bg-white">
        <div className="max-w-[1290px] mx-auto space-y-10">
          <FeaturedTour tour={tours[0]} />
          <FeaturedTour tour={tours[1]} reverse />
          <FeaturedTour tour={tours[4]} />
        </div>
      </section>
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
