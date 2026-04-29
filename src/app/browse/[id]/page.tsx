"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  MapPin, DollarSign, Briefcase, ArrowLeft, Zap,
  Bookmark, BookmarkCheck, Loader2, Building2, Calendar,
  CheckCircle2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Job } from "@/types";

function computeMatch(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0;
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  return (u.filter((s) => j.includes(s)).length / Math.sqrt(u.length * j.length)) * 100;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();

  const [job, setJob] = useState<Job | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises: Promise<any>[] = [
          fetch(`/api/jobs/${id}`).then((r) => r.json()),
        ];
        if (session?.user?.id) {
          promises.push(
            fetch(`/api/candidates/${session.user.id}`).then((r) => r.json()),
            fetch("/api/applications").then((r) => r.json()),
            fetch("/api/saved-jobs").then((r) => r.json()),
          );
        }
        const [jobRes, candidateRes, appsRes, savedRes] = await Promise.all(promises);
        if (!jobRes?.data) { router.push("/browse"); return; }
        setJob(jobRes.data);
        if (candidateRes?.data) setUserSkills(candidateRes.data.skills ?? []);
        if (appsRes?.data) setIsApplied(appsRes.data.some((a: any) => a.jobId === id));
        if (savedRes?.data) setIsSaved(savedRes.data.some((s: any) => s.jobId === id));
      } catch {
        toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id, session?.user?.id]);

  const handleApply = async () => {
    if (!session?.user) { signIn(); return; }
    setApplying(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setIsApplied(true);
      const score = json.data?.matchScore;
      toast.success(score > 0 ? `Applied! Match score: ${score.toFixed(1)}%` : "Application submitted!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    if (!session?.user) { signIn(); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/saved-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id }),
      });
      const json = await res.json();
      setIsSaved(json.saved);
      toast.success(json.saved ? "Job saved!" : "Job removed from saved");
    } catch {
      toast.error("Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-teal-500" size={36} />
      </div>
    );
  }

  if (!job) return null;

  const matchScore = userSkills.length > 0 ? Math.round(computeMatch(userSkills, job.requiredSkills)) : null;
  const skillGap = job.requiredSkills.filter(
    (s) => !userSkills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
  );
  const matchedSkills = job.requiredSkills.filter(
    (s) => userSkills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">

        {/* Back */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={28} className="text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex items-center gap-2">
                  {matchScore !== null && matchScore > 0 && (
                    <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-xs font-black bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
                      <Zap size={12} fill="currentColor" /> {matchScore}% Match
                    </div>
                  )}
                  {isApplied && (
                    <div className="text-xs font-black bg-slate-100 dark:bg-white/5 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
                      Applied
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500 dark:text-slate-400 mt-4">
                <div className="flex items-center gap-1.5">
                  <Building2 size={15} className="text-teal-500" /> {job.companyName}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-teal-500" /> {job.location}
                </div>
                {job.salaryRange && (
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={15} className="text-teal-500" /> {job.salaryRange}
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-teal-500" />
                  {new Date(job.createdAt!).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Job Description</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {job.description}
              </p>
            </div>

            {/* Required Skills */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => {
                  const matched = userSkills.map((u) => u.toLowerCase()).includes(skill.toLowerCase());
                  return (
                    <span
                      key={skill}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        matched
                          ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-500/20"
                          : "bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10"
                      }`}
                    >
                      {matched
                        ? <CheckCircle2 size={11} className="text-teal-500" />
                        : <XCircle size={11} className="text-slate-400" />
                      }
                      {skill}
                    </span>
                  );
                })}
              </div>
              {userSkills.length > 0 && (
                <p className="text-xs text-slate-400 mt-4">
                  <span className="text-teal-500 font-bold">{matchedSkills.length}</span> matched ·{" "}
                  <span className="text-red-400 font-bold">{skillGap.length}</span> missing
                </p>
              )}
            </div>

            {/* Skill Gap */}
            {userSkills.length > 0 && skillGap.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-3xl p-8">
                <h2 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">
                  Skills to Learn
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillGap.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Action Panel */}
          <div className="space-y-5">
            <div className="sticky top-6 space-y-4">

              {/* Apply Card */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Quick Apply</h3>

                {matchScore !== null && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
                    <span className="text-xs font-bold text-slate-500">Your Match</span>
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400">{matchScore}%</span>
                  </div>
                )}

                <Button
                  onClick={handleApply}
                  disabled={isApplied || applying}
                  className="w-full h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black rounded-xl transition-all disabled:opacity-60"
                >
                  {applying ? <Loader2 size={18} className="animate-spin" /> : isApplied ? "Already Applied" : "Apply Now"}
                </Button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`w-full h-11 rounded-xl border font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isSaved
                      ? "bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400"
                      : "border-slate-200 dark:border-white/10 text-slate-500 hover:border-teal-500/30 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
                >
                  {saving ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : isSaved ? (
                    <><BookmarkCheck size={15} /> Saved</>
                  ) : (
                    <><Bookmark size={15} /> Save Job</>
                  )}
                </button>
              </div>

              {/* Job Summary */}
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Job Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: "Company", value: job.companyName, icon: Building2 },
                    { label: "Location", value: job.location, icon: MapPin },
                    { label: "Skills Required", value: `${job.requiredSkills.length} skills`, icon: Zap },
                    ...(job.salaryRange ? [{ label: "Salary", value: job.salaryRange, icon: DollarSign }] : []),
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                          <Icon size={13} className="text-teal-500" /> {item.label}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
