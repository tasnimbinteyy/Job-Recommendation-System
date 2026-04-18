"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBriefcase, IconUsers, IconTarget, IconTrendingUp, IconRobot } from "@tabler/icons-react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, YAxis } from "recharts";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Stats {
  totalJobs: number;
  totalApplications: number;
  totalCandidates: number;
  avgMatchScore: number;
  topSkills: { skill: string; count: number }[];
}

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setStats(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-teal-500" size={32} />
      </div>
    );
  }

  const statCards = [
    { title: "Active Jobs", value: stats?.totalJobs ?? 0, icon: <IconBriefcase />, color: "text-teal-500" },
    { title: "Total Applicants", value: stats?.totalApplications ?? 0, icon: <IconUsers />, color: "text-blue-500" },
    { title: "Candidates", value: stats?.totalCandidates ?? 0, icon: <IconTarget />, color: "text-emerald-500" },
    { title: "Avg. Match Score", value: `${stats?.avgMatchScore ?? 0}%`, icon: <IconRobot />, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
          System <span className="text-teal-500">Analytics</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Live data from database
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="bg-[#0B0F19]/60 border-white/5 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>{stat.icon}</div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Top Skills Bar Chart */}
        <Card className="lg:col-span-4 bg-[#0B0F19]/60 border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-teal-500 flex items-center gap-2">
              <IconTrendingUp size={16} /> Top Demanded Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.topSkills && stats.topSkills.length > 0 ? (
              <div className="h-[260px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.topSkills} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                    <XAxis type="number" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="skill"
                      stroke="#475569"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                      tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0B0F19", border: "1px solid #ffffff10", borderRadius: "12px" }}
                      itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                    <Bar dataKey="count" fill="#14b8a6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-slate-500 text-sm">
                No skill data yet. Post jobs with required skills.
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Score Card */}
        <Card className="lg:col-span-3 bg-gradient-to-br from-teal-500/10 to-transparent border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <IconRobot size={120} className="text-teal-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-white">
              AI Recruiting Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative h-40 w-40 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="#ffffff05" strokeWidth="12" />
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="#14b8a6"
                  strokeWidth="12"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * (stats?.avgMatchScore ?? 0)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white italic">{stats?.avgMatchScore ?? 0}%</span>
                <span className="text-[8px] font-bold text-teal-500 uppercase tracking-tighter">Match Accuracy</span>
              </div>
            </div>

            <div className="mt-8 space-y-3 w-full">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Total Applications</span>
                <span className="text-[10px] font-black text-teal-500 uppercase">{stats?.totalApplications ?? 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Active Candidates</span>
                <span className="text-[10px] font-black text-blue-500 uppercase">{stats?.totalCandidates ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
