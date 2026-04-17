import CTASection from "@/components/home/CTASection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturesSection from "@/components/home/features-section";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";


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
