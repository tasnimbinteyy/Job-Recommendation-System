import CTASection from "@/components/CTASection";
import FeaturedJobs from "@/components/FeaturedJobs";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturesSection />
      <FeaturedJobs />
      <CTASection />
      <Footer />
    </div>
  );
}
