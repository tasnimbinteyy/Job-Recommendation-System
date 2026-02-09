import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const stats = [
    { label: "Active Jobs", value: "10K+" },
    { label: "Companies", value: "500+" },
    { label: "Match Accuracy", value: "95%" },
    { label: "Placements", value: "50K+" },
  ];

  return (
    <section className="
      px-6 pt-24 pb-20
      bg-white text-slate-900
      transition-colors duration-300
      dark:bg-[#0B0F19] dark:text-white
    ">
      <div className="mx-auto max-w-6xl text-center">

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <Badge
            className="
              flex items-center gap-2 px-4 py-1
              border border-teal-400/40
              bg-teal-400/10 text-teal-600
              dark:text-teal-300
              shadow-[0_0_20px_rgba(34,211,238,0.2)]
            "
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Job Matching
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="
          mx-auto max-w-4xl
          text-4xl font-bold leading-tight
          sm:text-5xl md:text-6xl tracking-tight
        ">
          Find Your Dream Job with{" "}
          <span className="
            text-transparent bg-clip-text 
            bg-gradient-to-r from-teal-400 to-blue-500
          ">
            AI Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className="
          mx-auto mt-6 max-w-2xl
          text-lg text-slate-600
          dark:text-gray-400
        ">
          Our advanced AI algorithms analyze your skills, experience, and 
          preferences to match you with the perfect career opportunities. 
          Start your journey today.
        </p>

        {/* Buttons */}
        <div className="
          mt-10 mb-20 flex flex-col items-center gap-4
          sm:flex-row sm:justify-center
        ">
          <Button
            size="lg"
            className="
              w-full sm:w-auto px-8 h-12
              bg-teal-400 text-black font-semibold
              hover:bg-teal-300
            "
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="
              w-full sm:w-auto px-8 h-12
              border-slate-300 text-slate-700
              hover:bg-slate-100
              dark:border-gray-800 dark:bg-[#111827]/50 dark:text-gray-300
              dark:hover:bg-[#111827]
            "
          >
            Browse Jobs
          </Button>
        </div>

        {/* NEW: Stats Section (From Picture) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-slate-200 dark:border-gray-800">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-gray-500 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}