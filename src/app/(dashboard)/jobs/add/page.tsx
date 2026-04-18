"use client";

import { useState } from "react";
import JobForm, { type JobFormData } from "@/components/jobs/JobForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Briefcase, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create job");
      toast.success("Job posted successfully!");
      router.push("/jobs");
    } catch (err: any) {
      toast.error(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#04070D] transition-colors duration-500 pt-32 pb-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/jobs"
            className="group inline-flex items-center text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 mb-10 gap-3 transition-all font-semibold text-sm"
          >
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            Back to Dashboard
          </Link>
        </motion.div>

        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6 border border-teal-100 dark:border-teal-500/20"
          >
            <Briefcase size={14} /> Global Talent Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Create a New <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">
              Listing
            </span>
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white dark:bg-[#0B0F19] rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none">
            <JobForm onSubmit={handleCreate} buttonText="Confirm & Post Job" isSubmitting={isSubmitting} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <ShieldCheck size={20} />, label: "Verified Post", desc: "Saved to database" },
            { icon: <Globe size={20} />, label: "Wide Reach", desc: "Available everywhere" },
            { icon: <CheckCircle2 size={20} />, label: "Quick Setup", desc: "Simple and fast" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="text-teal-600 dark:text-teal-400 flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em]">
                {item.icon} {item.label}
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
