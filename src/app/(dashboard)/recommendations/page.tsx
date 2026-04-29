"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Briefcase, Zap, Loader2, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface CompanyRec {
  companyName: string;
  location: string;
  openPositions: number;
  totalApplications: number;
  avgMatchScore: number;
  topSkills: string[];
}

export default function RecommendationsPage() {
  const [companies, setCompanies] = useState<CompanyRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setCompanies(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

        {/* Header */}
        <div className="mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
            Company <span className="text-teal-600 dark:text-teal-400 font-light">Recommendations</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-[0.1em] mt-3">
            AI-RANKED COMPANIES BASED ON YOUR SKILL MATCH
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-8 p-4 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-start gap-3">
          <TrendingUp size={18} className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-teal-700 dark:text-teal-300 font-medium">
            Companies are ranked by average skill match score across all their job postings.
            Update your skills in <Link href="/profile" className="font-black underline">Profile</Link> for better recommendations.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-teal-500" size={36} />
          </div>
        ) : companies.length === 0 ? (
          <div className="py-24 text-center text-slate-400 dark:text-slate-500 font-medium">
            No companies found. Jobs need to be posted first.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <div
                key={company.companyName}
                className="group bg-white dark:bg-[#0B0F19]/40 border border-slate-200 dark:border-white/5 rounded-[28px] p-7 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 flex flex-col"
              >
                {/* Rank + Match */}
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:scale-110 transition-transform">
                    <Building2 className="text-teal-600 dark:text-teal-400" size={26} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      #{index + 1} Ranked
                    </span>
                    {company.avgMatchScore > 0 ? (
                      <div className="text-teal-600 dark:text-teal-400 text-[11px] font-black bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 flex items-center gap-1">
                        <Zap size={11} fill="currentColor" /> {company.avgMatchScore}% Match
                      </div>
                    ) : (
                      <div className="text-slate-400 text-[11px] font-black bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                        Add skills to match
                      </div>
                    )}
                  </div>
                </div>

                {/* Company info */}
                <h3 className="text-slate-900 dark:text-white text-xl font-black mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {company.companyName}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold mb-5">
                  <MapPin size={13} /> {company.location}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white">{company.openPositions}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Open Jobs</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-center">
                    <p className="text-xl font-black text-slate-900 dark:text-white">{company.totalApplications}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Applicants</p>
                  </div>
                </div>

                {/* Top skills */}
                {company.topSkills.length > 0 && (
                  <div className="mt-auto">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Top Skills Required:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.topSkills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-md border border-teal-100 dark:border-teal-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`/browse?search=${encodeURIComponent(company.companyName)}`}
                  className="mt-6 block w-full text-center py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black text-sm transition-all"
                >
                  View Jobs
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
