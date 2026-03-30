"use client";

import { useState } from "react";
import JobForm from "@/components/jobs/JobForm";
import { useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AddJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = (data: any) => {
    setIsSubmitting(true);

    // ইউজার এক্সপেরিয়েন্সের জন্য একটি ছোট ডিলে
    setTimeout(() => {
      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

      const newJob = {
        ...data,
        id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
        match: `${Math.floor(Math.random() * 20) + 75}%`, 
        createdAt: new Date().toISOString(),
      };

      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      setIsSubmitting(false);
      router.push("/jobs");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#04070D] transition-colors duration-500 pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        
        {/* Navigation Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
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

        {/* Header Section */}
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
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 mt-5 text-xl font-medium max-w-lg leading-relaxed"
          >
            Find the perfect candidate by providing clear details about the position.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-white dark:bg-[#0B0F19] rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none">
            
            {isSubmitting ? (
              <div className="py-24 text-center space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                   <div className="absolute inset-0 border-4 border-teal-500/20 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-900 dark:text-white font-black text-lg tracking-tight">Updating System...</p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">Your job post is being processed.</p>
                </div>
              </div>
            ) : (
              <JobForm onSubmit={handleCreate} buttonText="Confirm & Post Job" />
            )}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <ShieldCheck size={20} />, label: "Verified Post", desc: "Trusted by users" },
            { icon: <Globe size={20} />, label: "Wide Reach", desc: "Available everywhere" },
            { icon: <CheckCircle2 size={20} />, label: "Quick Setup", desc: "Simple and fast" }
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