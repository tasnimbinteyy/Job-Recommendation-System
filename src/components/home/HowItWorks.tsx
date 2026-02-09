import { Card, CardContent } from "@/components/ui/card";
import { FileText, Brain, Briefcase } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Upload your resume and let our AI analyze your skills and experience.",
  },
  {
    step: "02",
    title: "Get AI Recommendations",
    description: "Receive personalized job matches based on your unique profile.",
  },
  {
    step: "03",
    title: "Apply & Track",
    description: "Apply with one click and track your applications in real-time.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-24 bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-gray-400">
            Our AI-powered platform makes job searching effortless and effective
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <Card
              key={item.step}
              className="relative border border-slate-200 bg-white transition-all hover:border-teal-500/50 dark:border-none dark:bg-[#111827] dark:hover:bg-[#161e2d]"
            >
              <CardContent className="flex flex-col items-center p-10 text-center">
                
                {/* Step Indicator: Adapts colors based on mode */}
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-teal-500/30 bg-teal-50 text-xl font-bold text-teal-600 shadow-sm dark:bg-teal-500/10 dark:text-teal-400 dark:shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-slate-600 dark:text-gray-400">
                  {item.description}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}