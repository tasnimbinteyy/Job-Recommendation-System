"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Fingerprint, Bot, Loader2 } from "lucide-react";
import AIAgentModal from "@/components/home/AIAgentModal";

function computeMatch(userSkills: string[], jobSkills: string[]): number {
  if (!userSkills.length || !jobSkills.length) return 0;
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  return Math.round((u.filter((s) => j.includes(s)).length / Math.sqrt(u.length * j.length)) * 100);
}

type CardItem = { label: string; match: string; value: number; color: string };

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardItems, setCardItems] = useState<CardItem[]>([]);
  const [cardLoading, setCardLoading] = useState(true);
  const [cardTitle, setCardTitle] = useState("Matching DNA");
  const [cardSubtitle, setCardSubtitle] = useState("Scanning...");
  const { data: session, status } = useSession();

  const role = session?.user?.role;
  const loggedIn = !!session?.user;
  const [modalOpen, setModalOpen] = useState(false);

  const secondaryHref = !loggedIn
    ? "/how-it-works"
    : role === "EMPLOYER"
    ? "/jobs"
    : role === "ADMIN"
    ? "/admin"
    : "/overview";

  const secondaryLabel = !loggedIn
    ? "How it Works"
    : role === "EMPLOYER"
    ? "My Jobs"
    : role === "ADMIN"
    ? "Admin Panel"
    : "My Dashboard";

  useEffect(() => {
    if (status === "loading") return;

    const fetchCardData = async () => {
      setIsLoaded(false);
      setCardLoading(true);
      try {
        if (role === "ADMIN") {
          const res = await fetch("/api/stats");
          const json = await res.json();
          const d = json.data;
          setCardTitle("System Overview");
          setCardSubtitle("Live DB stats");
          setCardItems([
            { label: "Total Jobs", match: `${d.totalJobs}`, value: Math.min(d.totalJobs * 5, 100), color: "bg-teal-600" },
            { label: "Total Candidates", match: `${d.totalCandidates}`, value: Math.min(d.totalCandidates * 3, 100), color: "bg-blue-600" },
          ]);
        } else if (role === "EMPLOYER") {
          const res = await fetch("/api/jobs?employerOnly=true");
          const json = await res.json();
          const jobs: any[] = json.data ?? [];
          const sorted = [...jobs]
            .sort((a, b) => (b._count?.applications ?? 0) - (a._count?.applications ?? 0))
            .slice(0, 2);
          const maxApps = Math.max(sorted[0]?._count?.applications ?? 1, 1);
          setCardTitle("Your Top Jobs");
          setCardSubtitle(`${jobs.length} active posting${jobs.length !== 1 ? "s" : ""}`);
          if (sorted.length === 0) {
            setCardItems([
              { label: "No jobs posted yet", match: "0", value: 0, color: "bg-teal-600" },
              { label: "Post a job to start", match: "—", value: 0, color: "bg-blue-600" },
            ]);
          } else {
            setCardItems(
              sorted.map((job, i) => ({
                label: job.title,
                match: `${job._count?.applications ?? 0} applicants`,
                value: Math.round(((job._count?.applications ?? 0) / maxApps) * 100),
                color: i === 0 ? "bg-teal-600" : "bg-blue-600",
              }))
            );
          }
        } else {
          // Guest or Student — fetch public jobs
          const jobsRes = await fetch("/api/jobs");
          const jobsJson = await jobsRes.json();
          const jobs: any[] = jobsJson.data ?? [];

          let userSkills: string[] = [];
          if (session?.user?.id) {
            const profileRes = await fetch(`/api/candidates/${session.user.id}`);
            const profileJson = await profileRes.json();
            userSkills = profileJson.data?.skills ?? [];
          }

          if (userSkills.length > 0) {
            // Student with skills — show real AI match scores
            const scored = jobs
              .map((job) => ({ ...job, score: computeMatch(userSkills, job.requiredSkills) }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 2);
            setCardTitle("Your Top Matches");
            setCardSubtitle("AI-powered match");
            setCardItems(
              scored.map((job, i) => ({
                label: job.title,
                match: `${job.score}%`,
                value: job.score,
                color: i === 0 ? "bg-teal-600" : "bg-blue-600",
              }))
            );
          } else {
            // Guest or student with no skills — show top jobs by applicant demand
            const top = [...jobs]
              .sort((a, b) => (b._count?.applications ?? 0) - (a._count?.applications ?? 0))
              .slice(0, 2);
            const totalApps = jobs.reduce((sum, j) => sum + (j._count?.applications ?? 0), 0);
            const companies = new Set(jobs.map((j) => j.companyName)).size;
            setCardTitle("Market Snapshot");
            setCardSubtitle(`${jobs.length} open position${jobs.length !== 1 ? "s" : ""} · live`);
            setCardItems(
              top.map((job, i) => ({
                label: job.title,
                match: job.companyName,
                value: Math.min(60 + i * 15, 100),
                color: i === 0 ? "bg-teal-600" : "bg-blue-600",
              }))
            );
          }
        }
      } catch {
        // keep card empty on error rather than crash
      } finally {
        setCardLoading(false);
        // Trigger bar animation after data is ready
        requestAnimationFrame(() => requestAnimationFrame(() => setIsLoaded(true)));
      }
    };

    fetchCardData();
  }, [status, role, session?.user?.id]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 md:px-5 overflow-hidden bg-white dark:bg-[#020617] pt-32 md:pt-40">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')" }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md">
              <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
              <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
                AI Matching Engine v2.0
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
                Stop hunting. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                  Start being hunted.
                </span>
              </h1>
              <p className="max-w-lg text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                JobAI builds a high-fidelity{" "}
                <span className="text-slate-900 dark:text-white font-bold italic underline decoration-teal-500/50">
                  Digital Twin
                </span>{" "}
                of your career DNA. Get discovered by elite teams instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Button
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="h-16 px-10 bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-400 rounded-2xl font-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] gap-3 border-none"
                >
                  <Bot className="h-5 w-5" />
                  Activate AI Agent
                  <ArrowRight className="h-5 w-5" />
                </Button>

              <Link
                href={secondaryHref}
                className="px-10 py-5 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                {secondaryLabel}
              </Link>
            </div>

            <AIAgentModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              isLoggedIn={loggedIn}
              userId={session?.user?.id}
            />

            {loggedIn && (
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {role === "EMPLOYER"
                  ? "Signed in as Employer — post jobs and find top candidates."
                  : role === "ADMIN"
                  ? "Signed in as Admin — manage the full system."
                  : "Signed in as Job Seeker — browse jobs and track your applications."}
              </p>
            )}
          </div>

          {/* Right: Identity Card */}
          <div className="lg:col-span-5 hidden lg:block animate-in fade-in zoom-in duration-1000">
            <div className="relative p-[1px] rounded-[40px] bg-gradient-to-b from-slate-200 to-transparent dark:from-white/20 dark:to-transparent">
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[39px] p-10 shadow-xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="h-14 w-14 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <Fingerprint className="text-teal-700 dark:text-teal-400 h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-white/60 font-black tracking-widest uppercase mb-1">
                      {cardTitle}
                    </p>
                    <p className="text-teal-600 dark:text-teal-400 font-bold text-xs uppercase animate-pulse">
                      {cardSubtitle}
                    </p>
                  </div>
                </div>

                {cardLoading ? (
                  <div className="flex items-center justify-center h-[120px]">
                    <Loader2 className="animate-spin text-teal-500" size={28} />
                  </div>
                ) : cardItems.length === 0 ? (
                  <div className="flex items-center justify-center h-[120px]">
                    <p className="text-sm text-slate-400 italic">No data available yet.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cardItems.map((item, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-extrabold text-slate-900 dark:text-white truncate max-w-[180px]">{item.label}</span>
                          <span className="text-teal-700 dark:text-teal-400 font-black text-sm flex-shrink-0 ml-2">{item.match}</span>
                        </div>
                        <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-[2000ms] ease-out`}
                            style={{ width: isLoaded ? `${item.value}%` : "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/5">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {role === "ADMIN" ? (
                      <>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Live</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">DB Status</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-teal-500">Admin</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Access</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Full</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Control</p>
                        </div>
                      </>
                    ) : role === "EMPLOYER" ? (
                      <>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Live</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Postings</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-teal-500">AI</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Matching</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Real</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Applicants</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-xs font-black text-teal-500">AI</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Powered</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Real</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Jobs</p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white">Live</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Data</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar — real data instead of fake logos */}
        <div className="mt-20 py-8 border-t border-slate-200 dark:border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "AI-Powered Matching", value: "Cosine Similarity" },
              { label: "Auth Providers", value: "Google & GitHub" },
              { label: "Deployment", value: "Vercel + Neon" },
              { label: "Data Privacy", value: "JWT · No Passwords" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-black text-slate-900 dark:text-white">{item.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
