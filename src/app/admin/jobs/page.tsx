"use client";

import { useEffect, useState } from "react";
import { Briefcase, Loader2, MapPin, Users, Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salaryRange: string | null;
  requiredSkills: string[];
  createdAt: string;
  employer: { name: string | null; image: string | null };
  _count: { applications: number };
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setJobs(json.data ?? []);
      })
      .catch((err) => toast.error(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.companyName.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Briefcase size={24} className="text-rose-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            All <span className="text-rose-500">Jobs</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {loading ? "Loading..." : `${jobs.length} total jobs across all employers`}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex items-center bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden h-12">
        <div className="flex items-center justify-center px-4 text-slate-400">
          <Search size={18} />
        </div>
        <Input
          placeholder="Search by title, company, or location..."
          className="border-none bg-transparent focus-visible:ring-0 h-full w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-rose-500" size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
          {search ? `No jobs found for "${search}".` : "No jobs in the system yet."}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Job</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider hidden lg:table-cell">Skills</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Applicants</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider hidden md:table-cell">Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filtered.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{job.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{job.companyName}</p>
                    {job.salaryRange && (
                      <p className="text-xs text-teal-500 font-semibold mt-0.5">{job.salaryRange}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin size={12} className="text-rose-400" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-md border border-rose-100 dark:border-rose-500/20">
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold px-1">+{job.requiredSkills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <Users size={14} className="text-rose-400" />
                      {job._count.applications}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-xs text-slate-400">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
