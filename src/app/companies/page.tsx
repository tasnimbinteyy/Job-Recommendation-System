"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Building2,
  MapPin,
  Zap,
  Sparkles,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Company = {
  companyName: string;
  location: string;
  openPositions: number;
  topSkills: string[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Most Open Jobs");

  useEffect(() => {
    fetch("/api/companies")
      .then((r) => r.json())
      .then((res) => setCompanies(res.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = companies.filter((c) =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "Most Open Jobs") list = [...list].sort((a, b) => b.openPositions - a.openPositions);
    else if (sortBy === "Name A-Z") list = [...list].sort((a, b) => a.companyName.localeCompare(b.companyName));

    return list;
  }, [companies, search, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-teal-500/30">

      {/* HERO */}
      <section className="pt-32 md:pt-48 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Sparkles size={14} className="animate-pulse" /> Verified Workspaces
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
              Companies
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
            {loading ? "Loading companies..." : `Discover ${companies.length} industry-leading organizations actively hiring.`}
          </p>

          <div className="max-w-2xl mx-auto p-3 bg-white/80 dark:bg-slate-900/80 shadow-2xl rounded-[32px] border border-slate-200 dark:border-white/10 backdrop-blur-xl flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-5 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search company or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-4 pl-14 pr-4 focus:outline-none font-bold text-sm"
              />
            </div>
            <Button className="h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl">
              Explore
            </Button>
          </div>
        </motion.div>
      </section>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 dark:border-white/5 pb-8">
          <h2 className="text-3xl font-black tracking-tight">
            Top Picks{" "}
            {!loading && (
              <span className="text-base font-semibold text-slate-400 dark:text-slate-500">
                ({filtered.length})
              </span>
            )}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-900/50 font-bold px-6 gap-3">
                {sortBy} <ChevronDown size={18} className="text-teal-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-2 rounded-2xl shadow-2xl">
              {["Most Open Jobs", "Name A-Z"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="p-4 my-1 rounded-xl cursor-pointer focus:bg-teal-500 focus:text-white font-bold"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-teal-500" size={40} />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-32 text-slate-400 dark:text-slate-500">
            <Building2 size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">No companies found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Cards */}
        {!loading && filtered.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((company) => (
              <motion.div key={company.companyName} variants={itemVariants} className="group relative">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500 to-blue-500 rounded-[42px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />

                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[40px] p-8 h-full flex flex-col transition-all duration-500 group-hover:translate-y-[-10px]">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:rotate-12 transition-transform duration-500">
                      <Building2 size={32} className="text-teal-500" />
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-black bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/20 text-[10px]">
                      <Zap size={12} fill="currentColor" /> {company.openPositions} Jobs
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-1 group-hover:text-teal-500 transition-colors flex items-center gap-2">
                    {company.companyName}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </h3>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-bold mb-6">
                    <MapPin size={14} className="text-teal-500/60" /> {company.location}
                  </div>

                  {/* Top Skills */}
                  {company.topSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {company.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-xl text-[9px] font-black text-slate-400 border border-white/5 uppercase"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Jobs link */}
                  <Link
                    href={`/browse?search=${encodeURIComponent(company.companyName)}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-black text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    View Open Jobs <ArrowUpRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
