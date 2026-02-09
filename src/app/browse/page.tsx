"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function BrowseJobsPage() {
  const [sortBy, setSortBy] = useState("Most Relevant");

  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120K - $180K",
      posted: "2 days ago",
      match: "95%",
      isNew: true,
      tags: ["React", "TypeScript", "CSS", "JavaScript", "+1 more"],
      description: "We are looking for an experienced frontend developer to lead our web application..."
    },
    {
      title: "Machine Learning Engineer",
      company: "AI Solutions Ltd.",
      location: "Remote",
      type: "Full-time",
      salary: "$140K - $200K",
      posted: "1 week ago",
      match: "88%",
      isNew: false,
      tags: ["Python", "TensorFlow", "PyTorch", "ML", "+1 more"],
      description: "Join our AI team to build cutting-edge machine learning models for enterprise applications...."
    },
    {
      title: "Product Designer",
      company: "DesignHub Co.",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100K - $150K",
      posted: "3 days ago",
      match: "82%",
      isNew: true,
      tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
      description: "Create beautiful and intuitive user experiences for our B2B SaaS platform. Strong portfolio in produ..."
    },
    {
      title: "Backend Engineer",
      company: "CloudScale Systems",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130K - $170K",
      posted: "5 days ago",
      match: "79%",
      isNew: false,
      tags: ["Node.js", "Go", "AWS", "Docker", "+1 more"],
      description: "Build scalable backend services using Node.js and Go. Experience with microservices architecture..."
    },
    {
      title: "Data Analyst",
      company: "DataInsights Corp.",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$80K - $110K",
      posted: "1 week ago",
      match: "75%",
      isNew: false,
      tags: ["SQL", "Python", "Tableau", "Analytics", "+1 more"],
      description: "Analyze complex datasets to drive business decisions. Strong SQL and Python skills required,..."
    },
    {
      title: "DevOps Engineer",
      company: "InfraCloud Inc.",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$125K - $165K",
      posted: "4 days ago",
      match: "71%",
      isNew: false,
      tags: ["AWS", "Terraform", "Kubernetes", "CI/CD", "+1 more"],
      description: "Manage and improve our CI/CD pipelines and cloud infrastructure. Strong experience with AW..."
    },
    {
      title: "UX Researcher",
      company: "UserFirst Labs",
      location: "Boston, MA",
      type: "Contract",
      salary: "$90K - $120K",
      posted: "2 weeks ago",
      match: "68%",
      isNew: false,
      tags: ["User Research", "Usability Testing", "Analytics", "Surveys"],
      description: "Conduct user research studies to inform product decisions. Experience with qualitative and..."
    },
    {
      title: "Mobile Developer",
      company: "AppWorks Studio",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$110K - $155K",
      posted: "6 days ago",
      match: "85%",
      isNew: true,
      tags: ["React Native", "TypeScript", "iOS", "Android", "+1 more"],
      description: "Develop cross-platform mobile applications using React Native. Strong understanding of mobile UX..."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Find Your Next Role
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-lg mb-8">
          Browse {jobs.length} opportunities from top companies
        </p>
        
        <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-bold mb-10">
          AI-Powered Matching Available
        </div>

        <div className="max-w-3xl mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search jobs, skills, or companies..." 
              className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
          </div>
          
          <Button variant="outline" className="h-[58px] px-6 gap-2 rounded-xl border-slate-200 dark:border-gray-800 dark:text-white hover:bg-amber-500/90 dark:hover:bg-amber-500/90">
            <Filter size={20} /> Filters
          </Button>
        </div>
      </section>

      {/* --- JOB LISTINGS SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-500 text-sm italic">Showing {jobs.length} jobs</p>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 text-slate-600 border-gray-800 dark:bg-gray-900 dark:text-white font-medium">
                {sortBy} <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111827] border-gray-800 text-white w-48">
              <DropdownMenuItem onClick={() => setSortBy("Most Relevant")} className="dark:hover:bg-amber-500/90 hover:text-black cursor-pointer">
                Most Relevant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Most Recent")} className="cursor-pointer dark:hover:bg-amber-500/90">
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Salary: High to Low")} className="cursor-pointer dark:hover:bg-amber-500/90">
                Salary: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Salary: Low to High")} className="cursor-pointer dark:hover:bg-amber-500/90">
                Salary: Low to
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-[#111827]/50 border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-teal-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#1F2937] p-3 rounded-xl border border-gray-700">
                  <Briefcase className="text-teal-400" size={24} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  {job.isNew && (
                    <span className="bg-teal-500/20 text-teal-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">New</span>
                  )}
                  <span className="text-teal-400 text-xs font-semibold bg-teal-500/5 px-2 py-1 rounded-lg border border-teal-500/20">
                    ✨ {job.match} Match
                  </span>
                </div>
              </div>

              <h3 className="text-white text-xl font-bold mb-1 group-hover:text-teal-400 transition-colors">{job.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{job.company}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={16} /> {job.location}
                  <Briefcase size={16} className="ml-2" /> {job.type}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <DollarSign size={16} /> {job.salary}
                  <Clock size={16} className="ml-2" /> {job.posted}
                </div>
              </div>

              <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag, i) => (
                  <span key={i} className="bg-[#1F2937] text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-3">
                <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-[#0B0F19] font-bold rounded-xl h-11">
                  View Details
                </Button>
                <Button variant="outline" className="bg-[#0B0F19] border-gray-800 text-white hover:bg-gray-800 rounded-xl h-11 px-5">
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}