"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBriefcase, IconUsers, IconTarget, IconTrendingUp, IconRobot, IconFileText } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const BarChart = lazy(() => import("recharts").then(m => ({ default: m.BarChart })));
const Bar = lazy(() => import("recharts").then(m => ({ default: m.Bar })));
const XAxis = lazy(() => import("recharts").then(m => ({ default: m.XAxis })));
const YAxis = lazy(() => import("recharts").then(m => ({ default: m.YAxis })));
const CartesianGrid = lazy(() => import("recharts").then(m => ({ default: m.CartesianGrid })));
const Tooltip = lazy(() => import("recharts").then(m => ({ default: m.Tooltip })));
const ResponsiveContainer = lazy(() => import("recharts").then(m => ({ default: m.ResponsiveContainer })));

interface Stats {
  totalJobs: number;
  totalApplications: number;
  totalCandidates: number;
  avgMatchScore: number;
  topSkills: { skill: string; count: number }[];
}

export default function OverviewPage() {
  const { data: session } = useSession();
  const role = session?.user?.role ?? "STUDENT";

  const [stats, setStats] = useState<Stats | null>(null);
  const [myStats, setMyStats] = useState<{ applications: number; savedJobs: number; matchScore: number } | null>(null);
  const [employerStats, setEmployerStats] = useState<{ myJobs: number; myApplicants: number; avgMatch: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = [fetch("/api/stats").then((r) => r.json())];
        if (role === "STUDENT" && session?.user?.id) {
          promises.push(
            Promise.all([
              fetch("/api/applications").then((r) => r.json()),
              fetch("/api/saved-jobs").then((r) => r.json()),
            ])
          );
        }
        if (role === "EMPLOYER") {
          promises.push(
            Promise.all([
              fetch("/api/jobs?employerOnly=true").then((r) => r.json()),
              fetch("/api/applications").then((r) => r.json()),
            ])
          );
        }
        const [statsRes, roleData] = await Promise.all(promises);
        if (statsRes.error) throw new Error(statsRes.error);
        setStats(statsRes.data);

        if (role === "STUDENT" && roleData) {
          const [appsRes, savedRes] = roleData;
          const apps = appsRes?.data ?? [];
          const avgMatch = apps.length > 0
            ? apps.reduce((sum: number, a: any) => sum + (a.matchScore ?? 0), 0) / apps.length
            : 0;
          setMyStats({
            applications: apps.length,
            savedJobs: savedRes?.data?.length ?? 0,
            matchScore: Math.round(avgMatch),
          });
        }

        if (role === "EMPLOYER" && roleData) {
          const [jobsRes, appsRes] = roleData;
          const myJobs = jobsRes?.data ?? [];
          const myApps = appsRes?.data ?? [];
          const avgMatch = myApps.length > 0
            ? myApps.reduce((sum: number, a: any) => sum + (a.matchScore ?? 0), 0) / myApps.length
            : 0;
          setEmployerStats({
            myJobs: myJobs.length,
            myApplicants: myApps.length,
            avgMatch: Math.round(avgMatch),
          });
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [role, session?.user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-teal-500" size={32} />
      </div>
    );
  }

  // Role-based stat cards
  const studentCards = [
    { title: "My Applications", value: myStats?.applications ?? 0, icon: <IconFileText />, color: "text-teal-500", bg: "bg-teal-500/10", href: "/applications" },
    { title: "Saved Jobs", value: myStats?.savedJobs ?? 0, icon: <IconBriefcase />, color: "text-blue-500", bg: "bg-blue-500/10", href: "/saved" },
    { title: "Avg Match Score", value: `${myStats?.matchScore ?? 0}%`, icon: <IconRobot />, color: "text-purple-500", bg: "bg-purple-500/10", href: "/applications" },
    { title: "Open Positions", value: stats?.totalJobs ?? 0, icon: <IconTarget />, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/browse" },
  ];

  const employerCards = [
    { title: "My Job Postings", value: employerStats?.myJobs ?? 0, icon: <IconBriefcase />, color: "text-teal-500", bg: "bg-teal-500/10", href: "/jobs" },
    { title: "My Applicants", value: employerStats?.myApplicants ?? 0, icon: <IconFileText />, color: "text-blue-500", bg: "bg-blue-500/10", href: "/applications" },
    { title: "Candidates Pool", value: stats?.totalCandidates ?? 0, icon: <IconUsers />, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/candidates" },
    { title: "Avg Match Score", value: `${employerStats?.avgMatch ?? 0}%`, icon: <IconRobot />, color: "text-purple-500", bg: "bg-purple-500/10", href: "/candidates" },
  ];

  const statCards = role === "EMPLOYER" ? employerCards : studentCards;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">
          {role === "EMPLOYER" ? "Hiring" : "My"} <span className="text-teal-500">{role === "EMPLOYER" ? "Dashboard" : "Overview"}</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Live data from database
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Link key={i} href={stat.href}>
            <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Top Skills Bar Chart */}
        <Card className="lg:col-span-4 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-teal-500 flex items-center gap-2">
              <IconTrendingUp size={16} /> Top Demanded Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.topSkills && stats.topSkills.length > 0 ? (
              <div className="h-[240px] w-full pt-2">
                <Suspense fallback={<div className="h-[240px] flex items-center justify-center"><Loader2 className="animate-spin text-teal-500" size={24} /></div>}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.topSkills} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#94a3b820" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="skill"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                      tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar dataKey="count" fill="#14b8a6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                </Suspense>
              </div>
            ) : (
              <div className="h-[240px] flex items-center justify-center text-slate-400 text-sm">
                No skill data yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Score Card */}
        <Card className="lg:col-span-3 bg-gradient-to-br from-teal-500/10 to-transparent border-slate-200 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
            <IconRobot size={120} className="text-teal-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
              AI Match Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <div className="relative h-36 w-36 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle cx="72" cy="72" r="62" fill="transparent" stroke="#e2e8f0" strokeWidth="10" className="dark:[stroke:#ffffff08]" />
                <circle
                  cx="72" cy="72" r="62"
                  fill="transparent"
                  stroke="#14b8a6"
                  strokeWidth="10"
                  strokeDasharray="390"
                  strokeDashoffset={390 - (390 * (stats?.avgMatchScore ?? 0)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white italic">{stats?.avgMatchScore ?? 0}%</span>
                <span className="text-[8px] font-bold text-teal-500 uppercase tracking-tighter">Avg Match</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 w-full">
              {[
                { label: role === "EMPLOYER" ? "My Applicants" : "My Applications", value: role === "EMPLOYER" ? employerStats?.myApplicants ?? 0 : myStats?.applications ?? 0, color: "text-teal-500" },
                { label: role === "EMPLOYER" ? "Active Candidates" : "Saved Jobs", value: role === "EMPLOYER" ? stats?.totalCandidates ?? 0 : myStats?.savedJobs ?? 0, color: "text-blue-500" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                  <span className="text-[10px] font-bold uppercase text-slate-500">{item.label}</span>
                  <span className={`text-[10px] font-black uppercase ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {role === "STUDENT" ? (
          <>
            <Link href="/browse" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconBriefcase className="mx-auto mb-2 text-teal-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Browse Jobs</p>
            </Link>
            <Link href="/profile" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconTarget className="mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Career DNA</p>
            </Link>
            <Link href="/recommendations" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconTrendingUp className="mx-auto mb-2 text-purple-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Companies</p>
            </Link>
            <Link href="/saved" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconFileText className="mx-auto mb-2 text-emerald-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Saved Jobs</p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/jobs/add" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconBriefcase className="mx-auto mb-2 text-teal-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Post Job</p>
            </Link>
            <Link href="/applications" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconFileText className="mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Applicants</p>
            </Link>
            <Link href="/candidates" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconUsers className="mx-auto mb-2 text-purple-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Candidates</p>
            </Link>
            <Link href="/skills" className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-teal-500/30 transition-all text-center group">
              <IconTarget className="mx-auto mb-2 text-emerald-500 group-hover:scale-110 transition-transform" size={22} />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Skills</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
