"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search, Briefcase, MapPin, Zap, Globe, Target, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Job } from "@/types";
import { toast } from "sonner";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchJobs = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs${search ? `?search=${encodeURIComponent(search)}` : ""}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setJobs(json.data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // debounced search
  useEffect(() => {
    const timer = setTimeout(() => fetchJobs(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchJobs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job? This will also remove all applications.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete");
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success("Job deleted successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans">
      <div className="container mx-auto px-6 max-w-7xl pt-10 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Hiring <span className="text-teal-600 dark:text-teal-400 font-light">Hub</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-[0.1em] mt-2">
              OVERVIEW: {jobs.length} ACTIVE POSITIONS
            </p>
          </div>
          <Link href="/jobs/add">
            <Button className="bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white dark:text-[#020617] font-black px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-[1.05] active:scale-95 gap-2 border-none uppercase text-xs tracking-widest">
              <Plus size={18} strokeWidth={4} /> Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-10 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-[#0B0F19]/50 shadow-sm">
          {[
            { label: "Total Openings", value: jobs.length, icon: <Briefcase size={16} /> },
            { label: "Total Applicants", value: jobs.reduce((a, j) => a + (j._count?.applications ?? 0), 0), icon: <Zap size={16} /> },
            { label: "Locations", value: new Set(jobs.map((j) => j.location)).size, icon: <Globe size={16} /> },
            { label: "System Health", value: "Optimal", icon: <Target size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 border-r border-b md:border-b-0 border-slate-200 dark:border-white/5 last:border-r-0 hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-teal-600 dark:text-teal-500">{stat.icon}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              </div>
              <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-10 group">
          <div className="relative flex items-center bg-white dark:bg-[#0B0F19]/50 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden transition-all group-focus-within:border-teal-500/50 h-16">
            <div className="flex items-center justify-center px-6 text-slate-400 dark:text-slate-500">
              <Search size={20} />
            </div>
            <Input
              placeholder="Search by job title, company, or location..."
              className="border-none bg-transparent focus-visible:ring-0 text-base h-full w-full text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#0B0F19]/30 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Position</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Company & Location</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] hidden lg:table-cell">Skills</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-center hidden md:table-cell">Applicants</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <Loader2 className="mx-auto animate-spin text-teal-500" size={28} />
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
                    No jobs found. <Link href="/jobs/add" className="text-teal-500 hover:underline">Post the first one.</Link>
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {jobs.map((job) => (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-all"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {job.title}
                        </div>
                        {job.salaryRange && (
                          <div className="text-[11px] text-slate-400 mt-1">{job.salaryRange}</div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-semibold text-slate-700 dark:text-slate-300">{job.companyName}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin size={11} className="text-teal-500/60" /> {job.location}
                        </div>
                      </td>
                      <td className="px-8 py-6 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {job.requiredSkills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-md border border-teal-100 dark:border-teal-500/20">
                              {skill}
                            </span>
                          ))}
                          {job.requiredSkills.length > 3 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 rounded-md">
                              +{job.requiredSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center hidden md:table-cell">
                        <span className="text-lg font-black text-slate-700 dark:text-slate-300">
                          {job._count?.applications ?? 0}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-30 group-hover:opacity-100 transition-all">
                          <Link href={`/jobs/${job.id}/edit`}>
                            <button title="Edit" className="p-2.5 rounded-lg text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:bg-white dark:hover:bg-white/5">
                              <Edit size={16} />
                            </button>
                          </Link>
                          <button
                            title="Delete"
                            disabled={deletingId === job.id}
                            onClick={() => handleDelete(job.id)}
                            className="p-2.5 rounded-lg text-slate-500 hover:text-red-600 transition-all hover:bg-white dark:hover:bg-white/5 disabled:opacity-40"
                          >
                            {deletingId === job.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
