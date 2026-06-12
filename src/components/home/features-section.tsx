"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Zap, Shield, Sparkles, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    description: "Cosine Similarity algorithm calculates a precise match score between your skills and every job's requirements — the same technique used by search engines.",
    icon: Brain,
    accent: "group-hover:text-teal-500",
    href: (role: string | undefined, loggedIn: boolean) => {
      if (!loggedIn) return "/browse";
      if (role === "EMPLOYER") return "/jobs";
      if (role === "ADMIN") return "/admin";
      return "/browse";
    },
  },
  {
    title: "Company Recommendations",
    description: "Companies are ranked by average skill match score across all their job postings — personalized to your unique skill set in real time.",
    icon: Target,
    accent: "group-hover:text-blue-500",
    href: (role: string | undefined, loggedIn: boolean) => {
      if (!loggedIn) return "/companies";
      if (role === "EMPLOYER") return "/candidates";
      if (role === "ADMIN") return "/admin/users";
      return "/recommendations";
    },
  },
  {
    title: "Resume Score & Skill Gap",
    description: "Get a 0–100 resume score based on skill count, market demand, and experience. See exactly which skills you're missing for each job you apply to.",
    icon: Zap,
    accent: "group-hover:text-amber-500",
    href: (role: string | undefined, loggedIn: boolean) => {
      if (!loggedIn) return "/how-it-works#resume";
      if (role === "EMPLOYER") return "/how-it-works#cosine";
      if (role === "ADMIN") return "/admin/applications";
      return "/profile";
    },
  },
  {
    title: "Secure by Design",
    description: "OAuth-only authentication via Google and GitHub — no passwords stored. Role-based access control enforced at the middleware level on every route.",
    icon: Shield,
    accent: "group-hover:text-emerald-500",
    href: (_role: string | undefined, _loggedIn: boolean) => "/how-it-works",
  },
];

export default function FeaturesSection() {
  const { data: session } = useSession();
  const loggedIn = !!session?.user;
  const role = session?.user?.role;

  return (
    <section className="relative px-6 py-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* --- Background Accents --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* --- Header --- */}
        <div className="mb-24 space-y-6 ml-10 ">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <Sparkles size={12} className="text-teal-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 dark:text-teal-400 uppercase ">System Capabilities</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 x-">
            <h2 className="text-5xl md:text-7xl  font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
              Intelligence <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-500">
                Meets Ambition.
              </span>
            </h2>
            <p className="max-w-sm text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed border-l-2 border-teal-500/30 pl-6">
              The only platform that doesn&apos;t just find jobs, but architects your entire career trajectory.
            </p>
          </div>
        </div>

        {/* --- Bento Grid Features --- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const destination = feature.href(role, loggedIn);
            return (
              <Card
                key={idx}
                className="group relative bg-white dark:bg-slate-950/40 backdrop-blur-md border border-slate-200 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(45,212,191,0.2)] overflow-hidden rounded-[32px]"
              >
                {/* Dynamic Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-10 relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-10 relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-400 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-500 shadow-sm">
                      <Icon className={`h-7 w-7 transition-colors duration-500 ${feature.accent}`} />
                    </div>
                    <div className="absolute -top-6 -left-6 h-20 w-20 bg-teal-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>

                  {/* Explore System Link — now a real navigation link */}
                  <div className="mt-auto pt-8">
                    <Link
                      href={destination}
                      className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:gap-3"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore System</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}