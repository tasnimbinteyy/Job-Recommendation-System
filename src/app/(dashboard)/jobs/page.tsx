"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Plus, Edit, Trash2, Search, Briefcase,
  MapPin, Zap, Globe, Target,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    if (savedJobs.length === 0) {
      const defaultJobs = [
        { id: "JOB-101", title: "Marketing Executive", location: "Remote", match: "98%" },
        { id: "JOB-102", title: "Sales Manager", location: "Dhaka", match: "85%" },
        { id: "JOB-103", title: "Office Administrator", location: "Hybrid", match: "90%" },
        { id: "JOB-104", title: "Customer Support", location: "Remote", match: "88%" },
      ];
      setJobs(defaultJobs);
      localStorage.setItem("jobs", JSON.stringify(defaultJobs));
    } else {
      setJobs(savedJobs);
    }
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    // ব্যাকগ্রাউন্ড কালার সাইডবারের সাথে মিলিয়ে আপডেট করা হয়েছে
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans">
      <div className="container mx-auto px-6 max-w-7xl pt-10 pb-20">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Hiring <span className="text-teal-600 dark:text-teal-400 font-light">Hub</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-[0.1em] mt-2">
              OVERVIEW: {filteredJobs.length} ACTIVE POSITIONS
            </p>
          </div>

          <div className="flex items-center">
            <Link href="/jobs/add">
              <Button className="bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white dark:text-[#020617] font-black px-8 py-6 rounded-xl shadow-lg dark:shadow-teal-500/20 transition-all hover:scale-[1.05] active:scale-95 gap-2 border-none uppercase text-xs tracking-widest">
                <Plus size={18} strokeWidth={4} /> Post New Job
              </Button>
            </Link>
          </div>
        </div>

        {/* --- Stats: ডার্ক মোডে বর্ডার এবং ব্যাকগ্রাউন্ড রিফাইন করা হয়েছে --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-10 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-[#0B0F19]/50 shadow-sm transition-colors">
          {[
            { label: "Total Openings", value: jobs.length, icon: <Briefcase size={16} /> },
            { label: "Avg. Compatibility", value: "89.4%", icon: <Zap size={16} /> },
            { label: "Applicants", value: "142", icon: <Globe size={16} /> },
            { label: "System Health", value: "Optimal", icon: <Target size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 border-r border-b md:border-b-0 border-slate-200 dark:border-white/5 last:border-r-0 hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-teal-600 dark:text-teal-500 group-hover:scale-110 transition-transform">{stat.icon}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              </div>
              <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* --- Search Interface --- */}
        <div className="relative mb-10 group">
          <div className="relative flex items-center bg-white dark:bg-[#0B0F19]/50 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden transition-all group-focus-within:border-teal-500/50 h-16">
            <div className="flex items-center justify-center px-6 text-slate-400 dark:text-slate-500">
              <Search size={20} />
            </div>
            <Input
              placeholder="Search by job title or reference number..."
              className="border-none bg-transparent focus-visible:ring-0 text-base h-full w-full text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- Job List Table --- */}
        <div className="bg-white dark:bg-[#0B0F19]/30 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Ref. Code</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Position & Location</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-center hidden lg:table-cell">Candidate Match</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <AnimatePresence>
                {filteredJobs.map((job) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-all"
                  >
                    <td className="px-8 py-10 font-mono text-[13px] text-teal-600 dark:text-teal-400 font-bold tracking-wider">{job.id}</td>
                    <td className="px-8 py-10">
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-lg group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{job.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-500 font-bold flex items-center gap-2 mt-1.5 uppercase tracking-wide">
                        <MapPin size={12} className="text-teal-600/40 dark:text-teal-500/40" /> {job.location}
                      </div>
                    </td>
                    <td className="px-8 py-10 hidden lg:table-cell">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-40 h-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: job.match }}
                            className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                          />
                        </div>
                        <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest">{job.match} Score</span>
                      </div>
                    </td>
                    <td className="px-8 py-10 text-right">
                      <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-all">
                        <button title="Edit" className="p-3 rounded-lg text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:bg-white dark:hover:bg-white/5 shadow-sm"><Edit size={18} /></button>
                        <button title="Delete" className="p-3 rounded-lg text-slate-500 hover:text-red-600 transition-all hover:bg-white dark:hover:bg-white/5 shadow-sm"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}