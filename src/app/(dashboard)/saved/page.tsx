"use client";

import { useEffect, useState } from "react";
import { Bookmark, MapPin, DollarSign, Briefcase, Loader2, Zap, ExternalLink, BookmarkX } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type SavedJob = {
  id: string;
  jobId: string;
  job: {
    id: string;
    title: string;
    companyName: string;
    location: string;
    salaryRange: string | null;
    requiredSkills: string[];
    description: string;
  };
};

function computeMatch(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0;
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  return (u.filter((s) => j.includes(s)).length / Math.sqrt(u.length * j.length)) * 100;
}

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = [fetch("/api/saved-jobs").then((r) => r.json())];
        if (session?.user?.id) {
          promises.push(
            fetch(`/api/candidates/${session.user.id}`).then((r) => r.json()),
            fetch("/api/applications").then((r) => r.json()),
          );
        }
        const [savedRes, candidateRes, appsRes] = await Promise.all(promises);
        setSavedJobs(savedRes?.data ?? []);
        if (candidateRes?.data) setUserSkills(candidateRes.data.skills ?? []);
        if (appsRes?.data) setAppliedIds(new Set(appsRes.data.map((a: any) => a.jobId)));
      } catch {
        toast.error("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [session?.user?.id]);

  const handleRemove = async (jobId: string) => {
    setRemovingId(jobId);
    try {
      await fetch("/api/saved-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      setSavedJobs((prev) => prev.filter((s) => s.jobId !== jobId));
      toast.success("Removed from saved jobs");
    } catch {
      toast.error("Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  const handleApply = async (jobId: string) => {
    if (!session?.user) { signIn(); return; }
    setApplyingId(jobId);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setAppliedIds((prev) => new Set(prev).add(jobId));
      const score = json.data?.matchScore;
      toast.success(score > 0 ? `Applied! Match: ${score.toFixed(1)}%` : "Application submitted!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          Saved <span className="text-teal-500">Jobs</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {loading ? "Loading..." : `${savedJobs.length} saved job${savedJobs.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-teal-500" size={36} />
        </div>
      )}

      {!loading && savedJobs.length === 0 && (
        <div className="py-24 text-center space-y-4">
          <Bookmark size={48} className="mx-auto text-slate-300 dark:text-slate-600" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">No saved jobs yet.</p>
          <Link href="/browse">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold mt-2">
              Browse Jobs
            </Button>
          </Link>
        </div>
      )}

      {!loading && savedJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(({ jobId, job }) => {
            const isApplied = appliedIds.has(jobId);
            const isApplying = applyingId === jobId;
            const isRemoving = removingId === jobId;
            const matchScore = userSkills.length > 0
              ? Math.round(computeMatch(userSkills, job.requiredSkills))
              : null;

            return (
              <div
                key={jobId}
                className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[32px] p-7 hover:border-teal-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-teal-500/5 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10">
                    <Briefcase className="text-teal-600 dark:text-teal-400" size={26} />
                  </div>
                  <div className="flex items-center gap-2">
                    {matchScore !== null && matchScore > 0 && (
                      <div className="text-teal-600 dark:text-teal-400 text-[11px] font-black bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 flex items-center gap-1">
                        <Zap size={12} fill="currentColor" /> {matchScore}%
                      </div>
                    )}
                    <button
                      onClick={() => handleRemove(jobId)}
                      disabled={isRemoving}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                      title="Remove from saved"
                    >
                      {isRemoving ? <Loader2 size={14} className="animate-spin" /> : <BookmarkX size={14} />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-slate-900 dark:text-white text-xl font-black mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">{job.companyName}</p>
                </div>

                <div className="flex flex-wrap gap-3 mb-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5"><MapPin size={12} /> {job.location}</div>
                  {job.salaryRange && <div className="flex items-center gap-1.5"><DollarSign size={12} /> {job.salaryRange}</div>}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requiredSkills.slice(0, 4).map((skill) => (
                    <span key={skill} className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5">
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="text-[10px] font-bold text-slate-400 px-2 py-1.5">+{job.requiredSkills.length - 4}</span>
                  )}
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/5 space-y-2">
                  <Button
                    onClick={() => handleApply(jobId)}
                    disabled={isApplied || isApplying}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black rounded-xl h-12 transition-all disabled:opacity-60"
                  >
                    {isApplying ? <Loader2 size={18} className="animate-spin" /> : isApplied ? "Already Applied" : "Apply Now"}
                  </Button>
                  <Link
                    href={`/browse/${jobId}`}
                    className="flex items-center justify-center gap-1.5 h-10 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs transition-all"
                  >
                    <ExternalLink size={13} /> View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
