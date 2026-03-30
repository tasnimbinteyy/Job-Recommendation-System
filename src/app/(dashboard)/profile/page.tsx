// src/app/(dashboard)/profile/page.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer 
} from "recharts";
import { IconUserCircle, IconChartBar, IconDna } from "@tabler/icons-react";

const skillData = [
  { subject: 'Frontend', A: 120, fullMark: 150 },
  { subject: 'Backend', A: 98, fullMark: 150 },
  { subject: 'UI/UX', A: 86, fullMark: 150 },
  { subject: 'DevOps', A: 70, fullMark: 150 },
  { subject: 'Soft Skills', A: 110, fullMark: 150 },
];

export default function CareerDNAPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          Career <span className="text-teal-500">DNA</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium">Your professional identity verified by AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 p-1 mb-4">
              <div className="h-full w-full rounded-full bg-white dark:bg-[#0B0F19] flex items-center justify-center overflow-hidden">
                <IconUserCircle size={60} className="text-slate-300" />
              </div>
            </div>
            <h2 className="text-xl font-bold dark:text-white">Tasnim Bintey N...</h2>
            <Badge className="mt-2 bg-teal-500/10 text-teal-500 border-none uppercase text-[10px] tracking-widest font-bold">
              DNA Verified
            </Badge>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Full-stack developer passionate about building scalable AI-driven applications.
            </p>
          </CardContent>
        </Card>

        {/* Skill Visualization */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <IconChartBar className="text-teal-500" size={18} /> Skill Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}