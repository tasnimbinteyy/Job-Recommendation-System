"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, DollarSign, Sparkles, Zap, Loader2, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import type { Job } from "@/types";

function computeMatch(userSkills: string[], jobSkills: string[]): number {
  if (userSkills.length === 0 || jobSkills.length === 0) return 0;
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  const intersection = u.filter((s) => j.includes(s)).length;
  return (intersection / Math.sqrt(u.length * j.length)) * 100;
}

function BrowseJobsContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");

  // Fetch everything once in parallel
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const promises: Promise<any>[] = [fetch("/api/jobs").then((r) => r.json())];

        if (session?.user?.id) {
          promises.push(
            fetch(`/api/candidates/${session.user.id}`).then((r) => r.json()),
            fetch("/api/applications").then((r) => r.json()),
            fetch("/api/saved-jobs").then((r) => r.json()),
          );
        }

        const [jobsRes, candidateRes, appsRes, savedRes] = await Promise.all(promises);

        setAllJobs(jobsRes?.data ?? []);
        if (candidateRes?.data) setUserSkills(candidateRes.data.skills ?? []);
        if (appsRes?.data) setAppliedIds(new Set(appsRes.data.map((a: any) => a.jobId)));
        if (savedRes?.data) setSavedIds(new Set(savedRes.data.map((s: any) => s.jobId)));
      } catch {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [session?.user?.id]); // runs once when session resolves

  // All filtering + sorting is client-side — no re-fetch
  const displayedJobs = useMemo(() => {
    let list = allJobs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.companyName.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (userSkills.length > 0) {
      list = [...list].sort(
        (a, b) => computeMatch(userSkills, b.requiredSkills) - computeMatch(userSkills, a.requiredSkills)
      );
    }

    return list;
  }, [allJobs, searchQuery, userSkills]);

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
      if (!res.ok) throw new Error(json.error || "Failed to apply");
      setAppliedIds((prev) => new Set(prev).add(jobId));
      const score = json.data?.matchScore;
      toast.success(
        score != null && score > 0
          ? `Applied! Your match score: ${score.toFixed(1)}%`
          : "Application submitted successfully!"
      );
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setApplyingId(null);
    }
  };

  const handleSave = async (jobId: string) => {
    if (!session?.user) { signIn(); return; }
    setSavingId(jobId);
    try {
      const res = await fetch("/api/saved-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      const json = await res.json();
      setSavedIds((prev) => {
        const next = new Set(prev);
        json.saved ? next.add(jobId) : next.delete(jobId);
        return next;
      });
      toast.success(json.saved ? "Job saved!" : "Removed from saved");
    } catch {
      toast.error("Failed to save job");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-20 px-6 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} /> AI-Powered Career Matching
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
              Next Role
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
            {loading
              ? "Loading opportunities..."
              : `Discover ${displayedJobs.length} high-impact opportunities.`}
          </p>

          <div className="flex flex-col md:flex-row gap-3 p-3 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <div className="relative flex-[2] flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Open Positions</h2>
            <p className="text-slate-500 font-medium italic">
              {loading ? "Fetching..." : `Showing ${displayedJobs.length} opportunities`}
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-teal-500" size={36} />
          </div>
        )}

        {!loading && displayedJobs.length === 0 && (
          <div className="py-24 text-center text-slate-400 dark:text-slate-500 font-medium">
            No jobs found{searchQuery ? ` for "${searchQuery}"` : ""}.
          </div>
        )}

        {!loading && displayedJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.map((job) => {
              const isApplied = appliedIds.has(job.id);
              const isApplying = applyingId === job.id;
              const isSaved = savedIds.has(job.id);
              const isSaving = savingId === job.id;
              const matchScore = userSkills.length > 0
                ? Math.round(computeMatch(userSkills, job.requiredSkills))
                : null;

              return (
                <div
                  key={job.id}
                  className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[32px] p-7 hover:border-teal-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-teal-500/5 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10">
                      <Briefcase className="text-teal-600 dark:text-teal-400" size={26} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {matchScore !== null && matchScore > 0 && (
                        <div className="text-teal-600 dark:text-teal-400 text-[11px] font-black bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 flex items-center gap-1">
                          <Zap size={12} fill="currentColor" /> {matchScore}% Match
                        </div>
                      )}
                      {isApplied && (
                        <div className="text-slate-500 text-[11px] font-black bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                          Applied
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-slate-900 dark:text-white text-xl font-black mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">{job.companyName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                      <MapPin size={13} /> {job.location}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                        <DollarSign size={13} /> {job.salaryRange}
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-5 leading-relaxed font-medium">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.requiredSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <span className="text-[10px] font-bold text-slate-400 px-2 py-1.5">
                        +{job.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/5 space-y-2">
                    <Button
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied || isApplying}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black rounded-xl h-12 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isApplying ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : isApplied ? (
                        "Already Applied"
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                    <div className="flex gap-2">
                      <Link
                        href={`/browse/${job.id}`}
                        className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ExternalLink size={13} /> View Details
                      </Link>
                      <button
                        onClick={() => handleSave(job.id)}
                        disabled={isSaving}
                        className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${
                          isSaved
                            ? "bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400"
                            : "border-slate-200 dark:border-white/10 text-slate-400 hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400"
                        }`}
                      >
                        {isSaving ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : isSaved ? (
                          <BookmarkCheck size={14} />
                        ) : (
                          <Bookmark size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseJobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-teal-500" size={36} />
      </div>
    }>
      <BrowseJobsContent />
    </Suspense>
  );
}
