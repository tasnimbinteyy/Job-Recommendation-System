import AboutHero from "./AboutHero";
import OurMission from "./ourMission";
import OurValues from "./OurValues";

export default function AboutPage() {
  return (
    <main className="bg-[#0B0F19] min-h-screen">
      <AboutHero />
      <OurMission />
      <OurValues />
    </main>
  );
}