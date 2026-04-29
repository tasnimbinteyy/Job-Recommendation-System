"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, FileText, TrendingUp, ShieldCheck, Loader2 } from "lucide-react";

type Stats = {
  totalJobs: number;
  totalApplications: number;
  totalCandidates: number;
  avgMatchScore: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((res) => {
        if (res.error) throw new Error(res.error);
        setStats(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Total Applications", value: stats.totalApplications, icon: FileText, color: "text-teal-500", bg: "bg-teal-500/10" },
        { label: "Total Candidates", value: stats.totalCandidates, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Avg Match Score", value: `${stats.avgMatchScore}%`, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Full system overview</p>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-teal-500" size={36} /></div>
      ) : error ? (
        <div className="py-16 text-center text-red-400 font-semibold">Failed to load stats. Please refresh.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl p-6">
                <div className={`h-11 w-11 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={card.color} />
                </div>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{card.value}</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl p-6">
          <h2 className="font-black text-slate-900 dark:text-white mb-2">User Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">View all users and change their roles.</p>
          <a href="/admin/users" className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:underline">
            Manage Users →
          </a>
        </div>
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl p-6">
          <h2 className="font-black text-slate-900 dark:text-white mb-2">Skills Library</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Add, edit, or delete skills from the system.</p>
          <a href="/admin/skills" className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:underline">
            Manage Skills →
          </a>
        </div>
      </div>
    </div>
  );
}
