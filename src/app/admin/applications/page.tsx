"use client";

import { useEffect, useState } from "react";
import { Briefcase, Loader2, ChevronDown, Users } from "lucide-react";
import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  IN_REVIEW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  ACCEPTED: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  IN_REVIEW: "In Review",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const VALID_STATUSES = ["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"];

interface AdminApplication {
  id: string;
  status: string;
  matchScore: number | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string | null; image: string | null; skills: string[] };
  job: { id: string; title: string; companyName: string; requiredSkills: string[] };
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setApplications(json.data ?? []);
      })
      .catch((err) => toast.error(err instanceof Error ? err.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update status");
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: json.data.status } : a))
      );
      toast.success(`Status updated to ${STATUS_LABEL[status]}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-rose-500" size={32} />
      </div>
    );
  }

  // Group by job
  const grouped = applications.reduce<Record<string, AdminApplication[]>>((acc, app) => {
    const key = app.job.id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(app);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Briefcase size={24} className="text-rose-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            All <span className="text-rose-500">Applications</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {applications.length} total application{applications.length !== 1 ? "s" : ""} across all jobs
          </p>
        </div>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
          No applications in the system yet.
        </div>
      )}

      {Object.entries(grouped).map(([jobId, apps]) => (
        <div key={jobId} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
          {/* Job header */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase size={16} className="text-rose-500" />
              <div>
                <span className="font-black text-slate-900 dark:text-white text-sm">{apps[0].job.title}</span>
                <span className="text-slate-400 text-xs ml-2">@ {apps[0].job.companyName}</span>
              </div>
            </div>
            <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
              {apps.length} applicant{apps.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Applicants */}
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {apps.map((app) => {
              const gap = app.job.requiredSkills.filter(
                (s) => !app.user.skills.map((sk) => sk.toLowerCase()).includes(s.toLowerCase())
              );
              return (
                <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 p-[1.5px] flex-shrink-0">
                      <div className="h-full w-full rounded-full bg-white dark:bg-[#020617] overflow-hidden flex items-center justify-center">
                        {app.user.image ? (
                          <img src={app.user.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Users size={14} className="text-rose-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{app.user.name ?? "Anonymous"}</p>
                      <p className="text-xs text-slate-400">{app.user.email}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {app.matchScore != null && (
                          <span className="text-[10px] font-black text-teal-500">{Math.round(app.matchScore)}% match</span>
                        )}
                        {gap.length > 0 && (
                          <span className="text-[10px] text-red-400 font-bold">
                            Missing: {gap.slice(0, 3).join(", ")}{gap.length > 3 ? ` +${gap.length - 3}` : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="relative">
                      <select
                        value={app.status}
                        disabled={updatingId === app.id}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-black border cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 ${STATUS_STYLES[app.status] ?? STATUS_STYLES.PENDING}`}
                      >
                        {VALID_STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                            {STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      {updatingId === app.id && (
                        <Loader2 size={12} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
