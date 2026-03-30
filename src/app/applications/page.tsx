"use client";

import React from "react";
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import { Application } from "@/types";

// Mock Data - ভবিষ্যতে এটি API থেকে আসবে
const MOCK_APPLICATIONS: Application[] = [
  { id: "1", role: "AI Engineer", company: "Google", status: "In Review", date: "2026-02-25" },
  { id: "2", role: "Full Stack Developer", company: "Vercel", status: "Accepted", date: "2026-02-20" },
  { id: "3", role: "UI Designer", company: "Figma", status: "Rejected", date: "2026-02-15" },
];

const StatusBadge = ({ status }: { status: Application["status"] }) => {
  const styles = {
    "In Review": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Accepted": "bg-teal-500/10 text-teal-500 border-teal-500/20",
    "Rejected": "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
          My <span className="text-teal-500">Applications</span>
        </h1>
        <p className="text-slate-500 mt-1">Track and manage your sent proposals.</p>
      </header>

      <div className="grid gap-4">
        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="p-5 rounded-2xl border border-white/10 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-xl flex items-center justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{app.role}</h3>
                <p className="text-sm text-slate-500">{app.company} • Applied on {app.date}</p>
              </div>
            </div>
            <StatusBadge status={app.status} />
          </div>
        ))}
      </div>
    </div>
  );
}