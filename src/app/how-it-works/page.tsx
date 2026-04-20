import Link from "next/link";
import {
  UserCircle,
  Brain,
  BarChart3,
  Target,
  GitCompare,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
} from "lucide-react";

export const metadata = {
  title: "How It Works — JobAI",
  description:
    "Learn how JobAI uses Cosine Similarity, Skill Gap Analysis, and Resume Scoring to match you with the perfect job.",
};

const sections = [
  {
    id: "profile",
    step: "01",
    icon: UserCircle,
    color: "teal",
    title: "Build Your Career Profile",
    summary:
      "Everything starts with your profile. Add your skills and experience — this becomes your Career DNA that the AI uses for all matching.",
    details: [
      "Sign in with Google or GitHub — no password needed",
      "Add your skills (e.g. React, Python, Docker) from the Skills Library",
      "Write your experience summary in the Profile page",
      "Your data is stored securely in PostgreSQL via Prisma ORM",
    ],
  },
  {
    id: "cosine",
    step: "02",
    icon: Brain,
    color: "blue",
    title: "Cosine Similarity — The Matching Engine",
    summary:
      "When you browse or apply to a job, the system calculates a match score using Cosine Similarity — the same algorithm used by search engines and recommendation systems.",
    details: [
      "Your skills and job's required skills are treated as sets",
      "The intersection (common skills) is calculated",
      "Score = intersection ÷ √(yourSkills × jobSkills) × 100",
      "Result: a 0–100% match score shown on every job card",
    ],
    code: `userSkills = ["React", "TypeScript", "Node.js"]
jobSkills  = ["React", "TypeScript", "PostgreSQL", "Docker"]

intersection = ["React", "TypeScript"] → 2
matchScore   = (2 / √(3 × 4)) × 100 = 57.7%`,
  },
  {
    id: "gap",
    step: "03",
    icon: GitCompare,
    color: "purple",
    title: "Skill Gap Analysis",
    summary:
      "After applying, the system automatically identifies which skills you're missing for each job. This helps you know exactly what to learn next.",
    details: [
      "Gap = Job's required skills − Your current skills",
      "Shown per application in the Candidates & Applications pages",
      "Helps you prioritize learning for specific roles",
      "Updates in real-time as you add new skills to your profile",
    ],
    code: `gap = jobSkills - userSkills
    = ["PostgreSQL", "Docker"]

→ These are the skills you need to learn
  to become a 100% match for this role.`,
  },
  {
    id: "resume",
    step: "04",
    icon: BarChart3,
    color: "orange",
    title: "Resume Scoring (0–100)",
    summary:
      "Your Profile page shows a Resume Score — an AI-calculated number that reflects how strong your profile is in the current job market.",
    details: [
      "Skill Count: up to 40 points (more relevant skills = higher score)",
      "Market Demand: up to 40 points (how in-demand your skills are)",
      "Experience: up to 20 points (having an experience section filled)",
      "Feedback cards show exactly what to improve",
    ],
    code: `score = skillCountScore     // max 40 pts
      + marketDemandScore   // max 40 pts
      + experienceScore     // max 20 pts

// Example: 6 skills + high demand + experience
// = 30 + 35 + 20 = 85/100`,
  },
  {
    id: "recommendations",
    step: "05",
    icon: Building2,
    color: "green",
    title: "Company Recommendations",
    summary:
      "The Recommendations page ranks companies by how well their job postings match your skills — personalized just for you.",
    details: [
      "All jobs are grouped by company",
      "Average Cosine Similarity is calculated per company across all their jobs",
      "Companies are sorted from highest to lowest match",
      "Shows open positions, top required skills, and a direct link to apply",
    ],
  },
  {
    id: "apply",
    step: "06",
    icon: Target,
    color: "red",
    title: "Apply & Track Applications",
    summary:
      "Apply to jobs directly from the Browse page. Track your application status in real-time from the Applications dashboard.",
    details: [
      "One-click apply from Browse Jobs page",
      "Match score is saved permanently with your application",
      "Status updates: PENDING → IN_REVIEW → ACCEPTED / REJECTED",
      "Employers can manage applicants and update statuses from their dashboard",
    ],
  },
];

const colorMap: Record<string, string> = {
  teal: "bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400",
  green: "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400",
  red: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
};

const stepBgMap: Record<string, string> = {
  teal: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  orange: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  green: "bg-green-500/10 text-green-700 dark:text-green-300",
  red: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617]">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
            <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
              System Documentation
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
              JobAI
            </span>{" "}
            Works
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            A complete walkthrough of the AI-powered matching system — from
            profile creation to job recommendations. Built on real algorithms,
            not buzzwords.
          </p>

          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200 dark:border-white/10 transition-all"
              >
                {s.step}. {s.title.split(" ").slice(0, 2).join(" ")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 pb-24 max-w-4xl mx-auto space-y-20">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          const iconClass = colorMap[section.color];
          const stepClass = stepBgMap[section.color];
          const isEven = idx % 2 === 0;

          return (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 group"
            >
              {/* Divider */}
              {idx > 0 && (
                <div className="mb-20 h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />
              )}

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left: Icon + Step */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${iconClass}`}
                  >
                    <Icon size={28} />
                  </div>
                  <span
                    className={`text-xs font-black tracking-widest px-2 py-0.5 rounded-md ${stepClass}`}
                  >
                    STEP {section.step}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="flex-1 space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {section.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium">
                    {section.summary}
                  </p>

                  {/* Detail bullets */}
                  <ul className="space-y-2">
                    {section.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-teal-500"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Code block */}
                  {section.code && (
                    <div className="rounded-2xl bg-slate-950 dark:bg-black/40 border border-white/5 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                        <Code2 size={12} className="text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                          Algorithm
                        </span>
                      </div>
                      <pre className="px-5 py-4 text-sm text-teal-300 font-mono leading-relaxed overflow-x-auto">
                        {section.code}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center space-y-6 p-12 rounded-3xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/20">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Ready to find your perfect match?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Sign in, build your profile, and let the AI do the work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:bg-teal-600 dark:hover:bg-teal-400 transition-all hover:scale-105"
            >
              Browse Jobs <ArrowRight size={16} />
            </Link>
            <Link
              href="/overview"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-white/5 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
