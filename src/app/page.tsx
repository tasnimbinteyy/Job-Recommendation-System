import CTASection from "@/components/home/CTASection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturesSection from "@/components/home/features-section";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/layout/Navbar";


export default function Home() {
  return (
    
    <div>
      <Hero />
      <HowItWorks />
      <FeaturesSection />
      <FeaturedJobs />
      <CTASection />
    </div>
  );
}
