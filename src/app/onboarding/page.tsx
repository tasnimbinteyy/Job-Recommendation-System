"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const roles = [
  {
    id: "STUDENT",
    title: "Job Seeker",
    subtitle: "I'm looking for opportunities",
    icon: GraduationCap,
    perks: ["Browse & apply to jobs", "AI match scoring", "Resume scoring", "Company recommendations"],
    gradient: "from-teal-500/20 to-teal-500/5",
    border: "border-teal-500/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    activeBorder: "border-teal-500",
  },
  {
    id: "EMPLOYER",
    title: "Employer",
    subtitle: "I'm hiring talent",
    icon: Building2,
    perks: ["Post & manage jobs", "View applicants", "Update application status", "Access candidate pool"],
    gradient: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    activeBorder: "border-blue-500",
  },
];

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Already onboarded users should not see this page
  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.onboarded === true) {
      const role = session?.user?.role;
      router.replace(role === "EMPLOYER" ? "/jobs" : "/overview");
    }
  }, [session, status, router]);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selected }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save role");

      // Hard redirect — browser reloads fresh session from server
      window.location.href = selected === "EMPLOYER" ? "/jobs" : "/overview";
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest mb-6">
            Welcome to JobAI
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
            How will you use JobAI?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Choose your role to get a personalized experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <motion.button
                key={role.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(role.id)}
                className={`relative text-left p-8 rounded-3xl border-2 transition-all duration-300 bg-gradient-to-br ${role.gradient} ${
                  isSelected ? role.activeBorder + " shadow-xl" : role.border
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className={`h-14 w-14 rounded-2xl bg-white dark:bg-white/5 border ${role.border} flex items-center justify-center mb-6`}>
                  <Icon size={28} className={role.iconColor} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{role.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">{role.subtitle}</p>
                <ul className="space-y-2">
                  {role.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-lg flex items-center justify-center gap-3 hover:bg-teal-600 dark:hover:bg-teal-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? <Loader2 size={22} className="animate-spin" /> : <>Continue <ArrowRight size={20} /></>}
        </button>
      </motion.div>
    </div>
  );
}
