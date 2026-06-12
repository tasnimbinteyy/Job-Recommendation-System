"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search, MapPin, Briefcase, DollarSign, Sparkles, Zap,
  Loader2, Bookmark, BookmarkCheck, ExternalLink, Globe,
} from "lucide-react";
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
  return Math.round((intersection / Math.sqrt(u.length * j.length)) * 100);
}

interface ExternalJob {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  category: string;
  redirectUrl: string;
  createdAt: string;
  requiredSkills: string[];
}

type Tab = "internal" | "external";

function BrowseJobsContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("internal");

  // ── Internal jobs state ──
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [internalLoading, setInternalLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // ── External jobs state ──
  const [externalJobs, setExternalJobs] = useState<ExternalJob[]>([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalTotal, setExternalTotal] = useState(0);
  const [externalFetched, setExternalFetched] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");

  // Fetch internal jobs + user data
  useEffect(() => {
    const fetchAll = async () => {
      setInternalLoading(true);
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
        setInternalLoading(false);
      }
    };
    fetchAll();
  }, [session?.user?.id]);

  // Fetch external jobs — only when tab is first opened
  const fetchExternalJobs = async (q = "") => {
    setExternalLoading(true);
    try {
      const query = q.trim() || (userSkills.length > 0 ? userSkills.slice(0, 3).join(" ") : "software developer");
      const res = await fetch(`/api/external-jobs?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setExternalJobs(json.data ?? []);
      setExternalTotal(json.total ?? 0);
      setExternalFetched(true);
    } catch {
      toast.error("Failed to load live jobs");
    } finally {
      setExternalLoading(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "external" && !externalFetched) {
      fetchExternalJobs(searchQuery);
    }
  };

  // Search handler — refetch external on search
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (activeTab === "external") {
      setExternalFetched(false);
      fetchExternalJobs(q);
    }
  };

  // Internal jobs — client-side filter + sort
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

  // External jobs — client-side filter only
  const displayedExternal = useMemo(() => {
    if (!searchQuery.trim()) return externalJobs;
    const q = searchQuery.toLowerCase();
    return externalJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
  }, [externalJobs, searchQuery]);

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

  const loading = activeTab === "internal" ? internalLoading : externalLoading;

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
              : activeTab === "internal"
              ? `Discover ${displayedJobs.length} high-impact opportunities.`
              : `${externalTotal.toLocaleString()}+ live jobs from top companies worldwide.`}
          </p>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-3 p-3 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <div className="relative flex-[2] flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input
                type="text"
                placeholder={activeTab === "internal" ? "Job title, skills, or company..." : "Search live jobs worldwide..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none font-medium"
              />
            </div>
            {activeTab === "external" && (
              <button
                onClick={() => fetchExternalJobs(searchQuery)}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl transition-all text-sm"
              >
                Search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tabs + Listings */}
      <div className="max-w-7xl mx-auto px-6 pb-32">

        {/* Tab switcher */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => handleTabChange("internal")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
              activeTab === "internal"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Briefcase size={15} />
            Platform Jobs
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              activeTab === "internal" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
            }`}>
              {allJobs.length}
            </span>
          </button>

          <button
            onClick={() => handleTabChange("external")}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
              activeTab === "external"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
            }`}
          >
            <Globe size={15} />
            Live Jobs
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              activeTab === "external" ? "bg-white/20 text-white" : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
            }`}>
              LIVE
            </span>
          </button>

          <div className="ml-auto">
            <p className="text-xs text-slate-400 font-medium italic">
              {activeTab === "internal"
                ? `${displayedJobs.length} result${displayedJobs.length !== 1 ? "s" : ""}`
                : externalLoading ? "Fetching..." : `${displayedExternal.length} shown`}
            </p>
          </div>
        </div>

        {/* ── INTERNAL JOBS TAB ── */}
        {activeTab === "internal" && (
          <>
            {internalLoading && (
              <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-teal-500" size={36} />
              </div>
            )}

            {!internalLoading && displayedJobs.length === 0 && (
              <div className="py-24 text-center text-slate-400 dark:text-slate-500 font-medium">
                No jobs found{searchQuery ? ` for "${searchQuery}"` : ""}.
              </div>
            )}

            {!internalLoading && displayedJobs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedJobs.map((job) => {
                  const isApplied = appliedIds.has(job.id);
                  const isApplying = applyingId === job.id;
                  const isSaved = savedIds.has(job.id);
                  const isSaving = savingId === job.id;
                  const matchScore = userSkills.length > 0
                    ? computeMatch(userSkills, job.requiredSkills)
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
                          <span key={skill} className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5">
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
                          {isApplying ? <Loader2 size={18} className="animate-spin" /> : isApplied ? "Already Applied" : "Apply Now"}
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
                            {isSaving ? <Loader2 size={14} className="animate-spin" /> : isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── LIVE JOBS TAB (Adzuna) ── */}
        {activeTab === "external" && (
          <>
            {/* Powered by badge */}
            <div className="flex items-center gap-2 mb-6 p-3 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 w-fit">
              <Globe size={14} className="text-teal-500" />
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400">
                Powered by Adzuna — Real jobs from top companies worldwide
              </p>
            </div>

            {externalLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="animate-spin text-teal-500" size={36} />
                <p className="text-sm text-slate-400 font-medium">Fetching live jobs...</p>
              </div>
            )}

            {!externalLoading && displayedExternal.length === 0 && (
              <div className="py-24 text-center text-slate-400 dark:text-slate-500 font-medium">
                No live jobs found{searchQuery ? ` for "${searchQuery}"` : ""}. Try a different search.
              </div>
            )}

            {!externalLoading && displayedExternal.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedExternal.map((job) => {
                  const matchScore = userSkills.length > 0
                    ? computeMatch(userSkills, job.requiredSkills)
                    : null;

                  const salaryText = job.salaryMin && job.salaryMax
                    ? `£${(job.salaryMin / 1000).toFixed(0)}k – £${(job.salaryMax / 1000).toFixed(0)}k`
                    : job.salaryMin
                    ? `From £${(job.salaryMin / 1000).toFixed(0)}k`
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
                          <div className="text-teal-600 dark:text-teal-400 text-[10px] font-black bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 flex items-center gap-1">
                            <Globe size={9} /> LIVE
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-slate-900 dark:text-white text-xl font-black mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                          {job.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">{job.companyName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 mb-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                          <MapPin size={13} /> {job.location}
                        </div>
                        {salaryText && (
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                            <DollarSign size={13} /> {salaryText}
                          </div>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-5 leading-relaxed font-medium">
                        {job.description}
                      </p>

                      {job.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.requiredSkills.slice(0, 4).map((skill) => (
                            <span key={skill} className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5">
                              {skill}
                            </span>
                          ))}
                          {job.requiredSkills.length > 4 && (
                            <span className="text-[10px] font-bold text-slate-400 px-2 py-1.5">
                              +{job.requiredSkills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-auto pt-5 border-t border-slate-100 dark:border-white/5 space-y-2">
                        <a
                          href={job.redirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          Apply Now <ExternalLink size={14} />
                        </a>
                        <p className="text-center text-[10px] text-slate-400 font-medium">
                          Opens official job listing
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
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
