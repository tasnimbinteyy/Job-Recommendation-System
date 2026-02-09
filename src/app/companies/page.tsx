"use client";

import { useState } from "react";
import { Search, ChevronDown, Check, Building2, Star, Users, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data matching the companies in your images (image_6b0238.jpg & image_6b0239.jpg)
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

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-teal-500/30">
      
      {/* --- HERO SECTION (image_6b0236.png) --- */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Explore Companies</h1>
        <p className="text-slate-400 text-lg mb-10 font-medium">Discover 6+ companies hiring now</p>

        {/* --- SEARCH & FILTERS BAR --- */}
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          <div className="relative flex-[2] min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full bg-[#111827] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all placeholder:text-slate-600"
            />
          </div>
          
          <Button variant="outline" className="h-[60px] px-6 gap-2 rounded-2xl border-gray-800 bg-[#111827] hover:border-teal-500/30 font-semibold">
            All Industries <ChevronDown size={18} className="text-slate-500" />
          </Button>
          
          <Button variant="outline" className="h-[60px] px-6 gap-2 rounded-2xl border-gray-800 bg-[#111827] hover:border-teal-500/30 font-semibold">
            All Sizes <ChevronDown size={18} className="text-slate-500" />
          </Button>
        </div>
      </section>

      {/* --- RESULTS HEADER (image_6b05a1.jpg) --- */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-8">
          <div className="text-slate-500 text-sm font-medium">
            Showing <span className="text-teal-400 font-bold text-base">6</span> companies
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="group gap-4 bg-[#111827] border-gray-800 px-6 py-7 rounded-2xl border-2 hover:border-teal-500/50 transition-all shadow-xl"
              >
                <span className="font-bold text-base">{sortBy}</span>
                <ChevronDown size={20} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="bg-[#111827] border-gray-800 text-white w-64 p-2 rounded-2xl shadow-2xl border-2">
              {["Most Open Jobs", "Highest Rated", "Name A-Z"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`flex items-center gap-3 p-4 my-1 rounded-xl cursor-pointer transition-all ${
                    sortBy === option 
                      ? "bg-[#F59E0B] text-black font-bold border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                      : "hover:bg-teal-500/10 hover:text-teal-400"
                  }`}
                >
                  {sortBy === option && <Check size={18} strokeWidth={3} />}
                  <span className="text-base">{option}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* --- COMPANY CARDS GRID (image_6b0238.jpg) --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companiesData.map((company) => (
          <div key={company.name} className="bg-[#111827] border border-gray-800 rounded-[32px] p-8 hover:border-teal-500/40 transition-all group flex flex-col h-full shadow-lg">
            
            {/* Top Bar: Icon & Rating */}
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 bg-teal-500/10 rounded-2xl text-teal-400 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-black transition-all duration-300">
                <Building2 size={32} />
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/5 px-3 py-1 rounded-full border border-amber-400/10">
                <Star size={16} fill="currentColor" /> {company.rating}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-1 group-hover:text-teal-400 transition-colors">{company.name}</h3>
            <p className="text-teal-500/80 text-sm font-bold mb-6 uppercase tracking-wider">{company.industry}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-teal-500/60" /> {company.location}
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Users size={18} className="text-teal-500/60" /> {company.employees}
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-sm font-semibold">
                <Building2 size={18} className="text-teal-400" /> {company.openPositions} open positions
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">{company.description}</p>

            {/* Tags (image_6b0238.jpg style) */}
            <div className="flex flex-wrap gap-2 mb-10 mt-auto">
              {company.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-800/40 rounded-xl text-[11px] font-bold text-slate-400 border border-white/5 uppercase tracking-tighter">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions (Teal Buttons with Hover Glow) */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-[1.2] rounded-2xl border-gray-800 bg-transparent text-white hover:bg-white/5 gap-2 h-14 font-bold transition-all">
                View Profile <ExternalLink size={14} />
              </Button>
              <Button className="flex-1 rounded-2xl bg-teal-500 text-black font-black hover:bg-teal-400 shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1 transition-all duration-300 h-14">
                {company.openPositions} Jobs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}