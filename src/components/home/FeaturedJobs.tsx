"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Building2, Sparkles, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salaryRange: string | null;
  description: string;
  requiredSkills: string[];
  createdAt: string;
  _count: { applications: number };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

function JobCard({ job }: { job: Job }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-[32px] p-px transition-all duration-500 hover:-translate-y-2"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
        }}
      />

      <Card className="relative h-full border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 backdrop-blur-md overflow-hidden rounded-[32px] z-10">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-teal-500 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.companyName}</p>
              </div>
            </div>

            {/* Real applicant count */}
            <div className="flex flex-col items-end">
              <span className="text-xl font-black text-slate-700 dark:text-slate-300">
                {job._count.applications}
              </span>
              <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1">
                <Users className="h-2.5 w-2.5" /> Applied
              </span>
            </div>
          </div>

          {/* Meta — all real */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-teal-500/70" /> {job.location}
            </div>
            {job.salaryRange ? (
              <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                <DollarSign className="h-3.5 w-3.5 text-teal-500/70" /> {job.salaryRange}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                <DollarSign className="h-3.5 w-3.5 text-teal-500/70" /> Competitive
              </div>
            )}
            <div className="col-span-2 flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500/60 inline-block" />
              Posted {timeAgo(job.createdAt)}
            </div>
          </div>

          {/* Description — real */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
            {job.description}
          </p>

          {/* Skills — real */}
          <div className="flex flex-wrap gap-2 mb-8">
            {job.requiredSkills.slice(0, 3).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-lg text-[10px] font-bold"
              >
                {skill}
              </Badge>
            ))}
            {job.requiredSkills.length > 3 && (
              <Badge
                variant="outline"
                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 px-2.5 py-0.5 rounded-lg text-[10px] font-bold"
              >
                +{job.requiredSkills.length - 3} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild className="flex-[2] bg-gradient-to-r from-teal-600 to-blue-600 hover:shadow-lg hover:shadow-teal-500/20 text-white font-bold h-11 rounded-xl transition-all border-none text-xs">
              <Link href={`/browse/${job.id}`}>View & Apply</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group/save flex-1 border-slate-200 dark:border-white/10 dark:text-white dark:hover:bg-teal-500/10 dark:hover:border-teal-500/50 hover:border-teal-500 hover:text-teal-600 h-11 rounded-xl text-xs transition-all duration-300 active:scale-90"
            >
              <Link href={`/browse/${job.id}`}>
                <Bookmark className="h-4 w-4 mr-1 transition-transform group-hover/save:-translate-y-0.5" />
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[32px] border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 p-8 space-y-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/5 flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-100 dark:bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded" />
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded" />
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded col-span-2" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded" />
        <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-4/5" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-slate-100 dark:bg-white/5 rounded-lg" />
        <div className="h-6 w-16 bg-slate-100 dark:bg-white/5 rounded-lg" />
        <div className="h-6 w-16 bg-slate-100 dark:bg-white/5 rounded-lg" />
      </div>
      <div className="flex gap-3">
        <div className="h-11 flex-[2] bg-slate-100 dark:bg-white/5 rounded-xl" />
        <div className="h-11 flex-1 bg-slate-100 dark:bg-white/5 rounded-xl" />
      </div>
    </div>
  );
}

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((json) => {
        if (json.data) {
          // Show newest 3 jobs first
          const sorted = [...json.data].sort(
            (a: Job, b: Job) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setJobs(sorted.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative px-6 py-16 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 space-y-6 ml-0 md:ml-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <Sparkles size={12} className="text-teal-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 dark:text-teal-400 uppercase">Neural Engine Analysis</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-500">
                Perfect Path.
              </span>
            </h2>
            <p className="max-w-sm text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed border-l-2 border-teal-500/30 pl-6">
              High-affinity opportunities tailored specifically to your professional DNA.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>{[0, 1, 2].map((i) => <SkeletonCard key={i} />)}</>
          ) : jobs.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
              No jobs posted yet.{" "}
              <Link href="/browse" className="text-teal-500 hover:underline font-bold">
                Browse all jobs →
              </Link>
            </div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>

        {!loading && jobs.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="h-12 px-8 rounded-2xl border-slate-200 dark:border-white/10 font-bold text-sm hover:border-teal-500 hover:text-teal-600 dark:hover:border-teal-500/50 dark:text-white transition-all gap-2"
            >
              <Link href="/browse">
                View All Jobs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
