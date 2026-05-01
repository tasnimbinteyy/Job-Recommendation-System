"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Fingerprint, Bot } from "lucide-react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const role = session?.user?.role;
  const loggedIn = !!session?.user;

  // Secondary CTA — role-aware dashboard shortcut
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

              {/* Activate AI Agent — placeholder for future AI model integration */}
              <div className="relative">
                <span className="absolute -top-3 -right-3 z-10 px-2 py-0.5 rounded-full bg-teal-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                  Coming Soon
                </span>
                <Button
                  size="lg"
                  asChild
                  className="h-16 px-10 bg-teal-600 dark:bg-teal-500 text-white hover:bg-teal-700 dark:hover:bg-teal-400 rounded-2xl font-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] gap-3 border-none"
                >
                  {/* TODO: replace href with AI agent route when model is ready */}
                  <Link href={!loggedIn ? "/api/auth/signin" : "/overview"}>
                    <Bot className="h-5 w-5" />
                    Activate AI Agent
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Secondary CTA — role-aware */}
              <Link
                href={secondaryHref}
                className="px-10 py-5 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                {secondaryLabel}
              </Link>
            </div>

            {/* Role context hint — only shown when logged in */}
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
                      Matching DNA
                    </p>
                    <p className="text-teal-600 dark:text-teal-400 font-bold text-xs uppercase animate-pulse">
                      Scanning...
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    { label: "Frontend Architect", match: "98%", color: "bg-teal-600" },
                    { label: "Product Lead", match: "94%", color: "bg-blue-600" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">{item.label}</span>
                        <span className="text-teal-700 dark:text-teal-400 font-black text-sm">{item.match}</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-[2000ms] ease-out`}
                          style={{ width: isLoaded ? item.match : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase">
                    Verified AI Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 py-10 border-t border-slate-200 dark:border-white/5">
          <div className="flex justify-between items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            {["VERCEL", "STRIPE", "LINEAR", "OPENAI", "META"].map((logo) => (
              <span key={logo} className="text-xs font-black tracking-[0.5em] text-slate-900 dark:text-white">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
