import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Zap, Shield } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Intelligent algorithms analyze resumes and job requirements to deliver accurate job matches.",
    icon: Brain,
  },
  {
    title: "Personalized Recommendations",
    description:
      "Tailored job and company suggestions based on your skills, goals, and experience.",
    icon: Target,
  },
  {
    title: "Instant Analysis",
    description:
      "Get quick resume scoring, skill-gap insights, and actionable feedback instantly.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description:
      "Your data is handled securely with privacy-focused design and mock-only processing.",
    icon: Shield,
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 bg-white dark:bg-[#0B0F19]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400">
            Everything you need to accelerate your job search
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="
                  group
                  bg-white
                  border border-gray-200
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-cyan-400
                  dark:bg-[#111827]
                  dark:border-transparent
                "
              >
                <CardContent className="p-6">

                  {/* Icon */}
                  <div
                    className="
                      mb-4 flex h-12 w-12 items-center justify-center
                      rounded-lg
                      bg-teal-50 text-teal-600
                      dark:bg-teal-500/10 dark:text-teal-400
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
