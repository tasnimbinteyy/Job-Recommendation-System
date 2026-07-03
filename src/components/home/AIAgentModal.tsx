"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  X, Bot, Loader2, Zap, Building2, MapPin,
  TrendingUp, AlertCircle, CheckCircle, ArrowRight,
  Sparkles, UserCircle, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function computeMatch(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0;
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  return Math.round((u.filter((s) => j.includes(s)).length / Math.sqrt(u.length * j.length)) * 100);
}

interface ResumeScore {
  score: number;
  skillCount: number;
  demandedSkillCount: number;
  missingSkills: string[];
  feedback: { type: "success" | "warning" | "info"; message: string }[];
}

interface MatchedJob {
  id: string;
  title: string;
  companyName: string;
  location: string;
  matchScore: number;
  requiredSkills: string[];
}

interface TopCompany {
  companyName: string;
  location: string;
  avgMatchScore: number;
  openPositions: number;
}

interface ScanResult {
  resumeScore: ResumeScore;
  topJobs: MatchedJob[];
  topCompany: TopCompany | null;
  userSkillCount: number;
}

type Step = "scanning" | "results" | "no-skills" | "unauthenticated";

const SCAN_STEPS = [
  "Initializing AI engine...",
  "Loading your career profile...",
  "Analyzing skill vectors...",
  "Running cosine similarity...",
  "Scoring resume against market...",
  "Ranking top job matches...",
  "Generating recommendations...",
  "Finalizing results...",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userId?: string;
}

export default function AIAgentModal({ isOpen, onClose, isLoggedIn, userId }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("scanning");
  const [scanIndex, setScanIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset state every time modal opens
  useEffect(() => {
    if (!isOpen) return;
    setStep("scanning");
    setScanIndex(0);
    setScanProgress(0);
    setResult(null);
    setError(null);

    if (!isLoggedIn) {
      setStep("unauthenticated");
      return;
    }

    runScan();
  }, [isOpen, isLoggedIn]);

  // Animate scan steps
  useEffect(() => {
    if (step !== "scanning") return;
    if (scanIndex >= SCAN_STEPS.length) return;

    const interval = setInterval(() => {
      setScanIndex((prev) => {
        const next = prev + 1;
        setScanProgress(Math.round((next / SCAN_STEPS.length) * 100));
        return next;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [step, scanIndex]);

  const runScan = async () => {
    try {
      // Fetch all data in parallel
      const [scoreRes, jobsRes, candidateRes, recsRes] = await Promise.all([
        fetch("/api/resume-score").then((r) => r.json()),
        fetch("/api/jobs").then((r) => r.json()),
        userId ? fetch(`/api/candidates/${userId}`).then((r) => r.json()) : Promise.resolve(null),
        fetch("/api/recommendations").then((r) => r.json()),
      ]);

      const userSkills: string[] = candidateRes?.data?.skills ?? [];

      // No skills → show prompt
      if (userSkills.length === 0) {
        // Wait for scan animation to finish
        await new Promise((res) => setTimeout(res, SCAN_STEPS.length * 350 + 300));
        setStep("no-skills");
        return;
      }

      // Compute top 3 matched jobs using ML model
      const allJobs = jobsRes?.data ?? [];
      const jobsWithScores = await Promise.all(
        allJobs.map(async (job: any) => {
          try {
            const res = await fetch("/api/match-score", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_skills: userSkills,
                job_skills: job.requiredSkills,
                job_title: job.title,
              }),
            });
            const json = await res.json();
            return {
              id: job.id,
              title: job.title,
              companyName: job.companyName,
              location: job.location,
              matchScore: json.data?.matchScore ?? computeMatch(userSkills, job.requiredSkills),
              requiredSkills: job.requiredSkills,
            };
          } catch {
            return {
              id: job.id,
              title: job.title,
              companyName: job.companyName,
              location: job.location,
              matchScore: computeMatch(userSkills, job.requiredSkills),
              requiredSkills: job.requiredSkills,
            };
          }
        })
      );
      const topJobs: MatchedJob[] = jobsWithScores
        .filter((j: MatchedJob) => j.matchScore > 0)
        .sort((a: MatchedJob, b: MatchedJob) => b.matchScore - a.matchScore)
        .slice(0, 3);

      const topCompany = recsRes?.data?.[0] ?? null;

      // Wait for scan animation to finish
      await new Promise((res) => setTimeout(res, SCAN_STEPS.length * 350 + 300));

      setResult({
        resumeScore: scoreRes.data,
        topJobs,
        topCompany,
        userSkillCount: userSkills.length,
      });
      setStep("results");
    } catch {
      setError("Failed to run AI scan. Please try again.");
      setStep("results");
    }
  };

  if (!isOpen) return null;

  const scoreColor = (score: number) =>
    score >= 80 ? "text-teal-500" : score >= 60 ? "text-blue-500" : score >= 40 ? "text-amber-500" : "text-red-400";

  const scoreLabel = (score: number) =>
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Average" : "Needs Work";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B0F19] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Bot size={20} className="text-teal-500" />
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-sm">AI Career Agent</p>
              <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">
                {step === "scanning" ? "Scanning..." : step === "results" ? "Scan Complete" : "Action Required"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── UNAUTHENTICATED ── */}
        {step === "unauthenticated" && (
          <div className="px-8 py-10 flex flex-col items-center text-center gap-6">
            <div className="h-20 w-20 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <UserCircle size={40} className="text-teal-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Sign in to Activate</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
                The AI Agent needs your career profile to run a personalized job match scan.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => signIn()}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl gap-2"
              >
                <Sparkles size={16} /> Sign in with Google or GitHub
              </Button>
              <button
                onClick={onClose}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        )}

        {/* ── SCANNING ── */}
        {step === "scanning" && (
          <div className="px-8 py-10 flex flex-col gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot size={28} className="text-teal-500" />
                </div>
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white text-lg">Running AI Scan</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 h-5 transition-all">
                  {SCAN_STEPS[Math.min(scanIndex, SCAN_STEPS.length - 1)]}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span>Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>

            {/* Scan steps list */}
            <div className="space-y-2">
              {SCAN_STEPS.slice(0, 5).map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i < scanIndex ? (
                    <CheckCircle size={14} className="text-teal-500 flex-shrink-0" />
                  ) : i === scanIndex ? (
                    <Loader2 size={14} className="text-teal-500 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-slate-200 dark:border-white/10 flex-shrink-0" />
                  )}
                  <span className={`text-xs font-semibold transition-colors ${i < scanIndex ? "text-teal-500" : i === scanIndex ? "text-slate-900 dark:text-white" : "text-slate-300 dark:text-slate-600"}`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── NO SKILLS ── */}
        {step === "no-skills" && (
          <div className="px-8 py-10 flex flex-col items-center text-center gap-6">
            <div className="h-20 w-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <AlertCircle size={40} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Profile Incomplete</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto">
                The AI Agent needs your skills to calculate match scores. Add your skills to your profile first.
              </p>
            </div>
            <div className="w-full p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 text-left">
                💡 Tip: Add at least 5–8 skills to get accurate AI job matches and a resume score.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => { onClose(); router.push("/profile"); }}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl gap-2"
              >
                Update Profile <ArrowRight size={16} />
              </Button>
              <button
                onClick={onClose}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "results" && result && (
          <div className="px-8 py-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">

            {/* Resume Score */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <div className="relative h-16 w-16 flex-shrink-0">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="transparent" stroke="#e2e8f0" strokeWidth="6" className="dark:[stroke:#ffffff08]" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="transparent"
                    stroke="#14b8a6"
                    strokeWidth="6"
                    strokeDasharray="163"
                    strokeDashoffset={163 - (163 * result.resumeScore.score) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-slate-900 dark:text-white">{result.resumeScore.score}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-slate-900 dark:text-white text-sm">Resume Score</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 ${scoreColor(result.resumeScore.score)}`}>
                    {scoreLabel(result.resumeScore.score)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {result.resumeScore.skillCount} skills · {result.resumeScore.demandedSkillCount} in-demand
                </p>
                {result.resumeScore.missingSkills.length > 0 && (
                  <p className="text-[10px] text-red-400 font-bold mt-1">
                    Missing: {result.resumeScore.missingSkills.slice(0, 3).join(", ")}
                    {result.resumeScore.missingSkills.length > 3 && ` +${result.resumeScore.missingSkills.length - 3}`}
                  </p>
                )}
              </div>
            </div>

            {/* Top Matched Jobs */}
            {result.topJobs.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Matches For You</p>
                {result.topJobs.map((job, i) => (
                  <Link
                    key={job.id}
                    href={`/browse/${job.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-teal-500/30 hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-black text-teal-600 dark:text-teal-400">#{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {job.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mt-0.5">
                          <Building2 size={10} /> {job.companyName}
                          <MapPin size={10} /> {job.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-[11px] font-black bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                        <Zap size={10} fill="currentColor" /> {job.matchScore}%
                      </div>
                      <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-teal-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No matches */}
            {result.topJobs.length === 0 && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center">
                <p className="text-sm text-slate-400 font-medium">No strong matches found yet.</p>
                <p className="text-xs text-slate-400 mt-1">Add more skills to improve your matches.</p>
              </div>
            )}

            {/* Top Company */}
            {result.topCompany && result.topCompany.avgMatchScore > 0 && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-500/5 to-blue-500/5 border border-teal-500/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Best Company Match</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <Building2 size={18} className="text-teal-500" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white text-sm">{result.topCompany.companyName}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-0.5">
                        <MapPin size={10} /> {result.topCompany.location} · {result.topCompany.openPositions} open roles
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-xs font-black bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
                    <TrendingUp size={12} /> {result.topCompany.avgMatchScore}%
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 dark:border-white/5">
              <Button
                onClick={() => { onClose(); router.push("/browse"); }}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl gap-2"
              >
                <Zap size={16} /> View All AI-Matched Jobs
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => { onClose(); router.push("/profile"); }}
                  className="h-11 rounded-2xl font-bold text-sm border-slate-200 dark:border-white/10 hover:border-teal-500/30"
                >
                  Update Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { onClose(); router.push("/recommendations"); }}
                  className="h-11 rounded-2xl font-bold text-sm border-slate-200 dark:border-white/10 hover:border-teal-500/30"
                >
                  Companies
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {step === "results" && error && (
          <div className="px-8 py-10 flex flex-col items-center text-center gap-4">
            <AlertCircle size={40} className="text-red-400" />
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{error}</p>
            <Button onClick={() => { setStep("scanning"); setScanIndex(0); setScanProgress(0); runScan(); }}
              className="bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl px-8">
              Retry
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
