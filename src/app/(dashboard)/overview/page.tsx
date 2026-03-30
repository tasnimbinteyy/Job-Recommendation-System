"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  IconBriefcase, 
  IconUsers, 
  IconTarget, 
  IconChartBar,
  IconTrendingUp,
  IconRobot
} from "@tabler/icons-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// ডামি চার্ট ডেটা
const chartData = [
  { name: "Sat", applications: 40, matches: 24 },
  { name: "Sun", applications: 30, matches: 13 },
  { name: "Mon", applications: 20, matches: 98 },
  { name: "Tue", applications: 27, matches: 39 },
  { name: "Wed", applications: 18, matches: 48 },
  { name: "Thu", applications: 23, matches: 38 },
  { name: "Fri", applications: 34, matches: 43 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
          System <span className="text-teal-500">Analytics</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Real-time performance of Every Job Holder
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Active Jobs", value: "04", icon: <IconBriefcase />, color: "text-teal-500" },
          { title: "Total Applicants", value: "142", icon: <IconUsers />, color: "text-blue-500" },
          { title: "Avg. Match", value: "89%", icon: <IconTarget />, color: "text-emerald-500" },
          { title: "AI Efficiency", value: "94%", icon: <IconRobot />, color: "text-purple-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#0B0F19]/60 border-white/5 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  {stat.icon}
                </div>
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

      {/* Charts & Insights Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Area Chart */}
        <Card className="lg:col-span-4 bg-[#0B0F19]/60 border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-teal-500 flex items-center gap-2">
              <IconTrendingUp size={16} /> Application Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0B0F19", border: "1px solid #ffffff10", borderRadius: "12px" }}
                    itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#14b8a6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorApp)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight Card */}
        <Card className="lg:col-span-3 bg-gradient-to-br from-teal-500/10 to-transparent border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <IconRobot size={120} className="text-teal-500" />
          </div>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-white">AI Recruiting Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative h-40 w-40 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="#ffffff05" strokeWidth="12" />
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="#14b8a6" strokeWidth="12" 
                  strokeDasharray="440" strokeDashoffset="66" strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white italic">85%</span>
                <span className="text-[8px] font-bold text-teal-500 uppercase tracking-tighter">Match Accuracy</span>
              </div>
            </div>
            <div className="mt-8 space-y-3 w-full">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Top Skill Match</span>
                <span className="text-[10px] font-black text-teal-500 uppercase">React/Next.js</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Market Demand</span>
                <span className="text-[10px] font-black text-blue-500 uppercase">High</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}