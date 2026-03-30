"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Check, Building2, Star, Users, MapPin, ExternalLink, Sparkles, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const companiesData = [
  {
    name: "TechCorp Inc.",
    industry: "Technology",
    rating: 4.5,
    location: "San Francisco, CA",
    employees: "1000-5000 employees",
    openPositions: 24,
    description: "Leading technology company specializing in cloud solutions and enterprise software. We believe in...",
    tags: ["Innovation", "Work-Life Balance", "Remote-Friendly"],
  },
  {
    name: "AI Solutions Ltd.",
    industry: "Artificial Intelligence",
    rating: 4.8,
    location: "Remote",
    employees: "200-500 employees",
    openPositions: 12,
    description: "Pioneering AI company focused on machine learning solutions for healthcare and finance...",
    tags: ["Cutting-Edge Tech", "Flexible Hours", "Learning Culture"],
  },
  {
    name: "DesignHub Co.",
    industry: "Design & Creative",
    rating: 4.6,
    location: "New York, NY",
    employees: "100-200 employees",
    openPositions: 8,
    description: "Award-winning design agency creating beautiful digital experiences for global brands. We put...",
    tags: ["Creative Freedom", "Collaborative", "Diverse Team"],
  },
  {
    name: "CloudScale Systems",
    industry: "Cloud Computing",
    rating: 4.3,
    location: "Austin, TX",
    employees: "500-1000 employees",
    openPositions: 18,
    description: "Enterprise cloud solutions provider helping businesses scale their infrastructure. We build...",
    tags: ["Engineering Excellence", "Growth Opportunities", "Team Events"],
  },
  {
    name: "DataInsights Corp.",
    industry: "Data Analytics",
    rating: 4.4,
    location: "Chicago, IL",
    employees: "300-500 employees",
    openPositions: 15,
    description: "Data analytics company transforming raw data into actionable business insights. We help companies...",
    tags: ["Data-Driven", "Continuous Learning", "Inclusive"],
  },
  {
    name: "InfraCloud Inc.",
    industry: "Infrastructure",
    rating: 4.2,
    location: "Seattle, WA",
    employees: "400-800 employees",
    openPositions: 10,
    description: "Modern infrastructure and DevOps solutions for enterprises. We automate and optimize cloud...",
    tags: ["Automation First", "Open Source", "Remote Work"],
  }
];


export default function CompaniesPage() {
  const [sortBy, setSortBy] = useState("Most Open Jobs");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-teal-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 md:pt-48 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Sparkles size={14} className="animate-pulse" /> Verified Workspaces
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Companies</span>
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
            Discover {companiesData.length} industry-leading organizations built on innovation and culture.
          </p>

          <div className="max-w-2xl mx-auto p-3 bg-white/80 dark:bg-slate-900/80 shadow-2xl rounded-[32px] border border-slate-200 dark:border-white/10 backdrop-blur-xl flex flex-col md:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-5 text-slate-400" size={20} />
              <input type="text" placeholder="Search company name..." className="w-full bg-transparent py-4 pl-14 pr-4 focus:outline-none font-bold text-sm" />
            </div>
            <Button className="h-14 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl">Explore</Button>
          </div>
        </motion.div>
      </section>

      {/* --- GRID SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 dark:border-white/5 pb-8">
           <h2 className="text-3xl font-black tracking-tight">Top Picks</h2>
           
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-900/50 font-bold px-6 gap-3">
                {sortBy} <ChevronDown size={18} className="text-teal-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-2 rounded-2xl shadow-2xl">
              {["Most Open Jobs", "Highest Rated", "Name A-Z"].map((option) => (
                <DropdownMenuItem key={option} onClick={() => setSortBy(option)} className="p-4 my-1 rounded-xl cursor-pointer focus:bg-teal-500 focus:text-white font-bold">
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companiesData.map((company) => (
            <motion.div key={company.name} variants={itemVariants} className="group relative">
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500 to-blue-500 rounded-[42px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
              
              <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[40px] p-8 h-full flex flex-col transition-all duration-500 group-hover:translate-y-[-10px]">
                <div className="flex justify-between items-start mb-8">
                  <div className="h-16 w-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:rotate-12 transition-transform duration-500">
                    <Building2 size={32} className="text-teal-500" />
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 font-black bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 text-[10px]">
                    <Star size={12} fill="currentColor" /> {company.rating}
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-1 group-hover:text-teal-500 transition-colors flex items-center gap-2">
                  {company.name} <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </h3>
                <p className="text-teal-500 text-[10px] font-black uppercase tracking-widest mb-6">{company.industry}</p>

                <div className="space-y-4 mb-8 border-y border-slate-50 dark:border-white/5 py-6">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-bold">
                    <MapPin size={18} className="text-teal-500/60" /> {company.location}
                  </div>
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white text-sm font-black">
                    <Zap size={18} className="text-teal-500" fill="currentColor" /> {company.openPositions} Open Positions
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {company.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-xl text-[9px] font-black text-slate-400 border border-white/5 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}