"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock, ArrowRight, Building2 } from "lucide-react";

// জব ডেটা ইন্টারফেস
interface Job {
  id: number;
  title: string;
  company: string;
  match: number;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  isNew?: boolean;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    match: 95,
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120K - $180K",
    posted: "2 days ago",
    description: "Build cutting-edge web apps with React and TypeScript using modern AI tools.",
    skills: ["React", "TypeScript", "Tailwind"],
    isNew: true,
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "AI Solutions Ltd.",
    match: 88,
    location: "Remote",
    type: "Full-time",
    salary: "$140K - $200K",
    posted: "1 week ago",
    description: "Join our AI team to build cutting-edge machine learning models.",
    skills: ["Python", "PyTorch", "ML"],
    isNew: false,
  },
  {
    id: 3,
    title: "Product Designer",
    company: "DesignHub Co.",
    match: 82,
    location: "New York, NY",
    type: "Full-time",
    salary: "$100K - $150K",
    posted: "3 days ago",
    description: "Create beautiful and intuitive user experiences for our B2B SaaS platform.",
    skills: ["Figma", "UI/UX", "Design Systems"],
    isNew: true,
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Jobs</h2>
            <p className="text-slate-600 dark:text-gray-400 mt-1">Top opportunities from leading companies</p>
          </div>
          <Button variant="outline" className="w-fit border-slate-200 dark:border-gray-800 dark:text-white dark:hover:bg-white/5">
            View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id} className="border border-slate-200 dark:border-none bg-white dark:bg-[#111827] overflow-hidden group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                
               {/*Match and New Badge Section*/}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{job.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400">{job.company}</p>
                    </div>
                  </div>
                  
                  {/* Match and New Badge Section*/}
                  <div className="flex flex-col items-end gap-2">
                    {job.isNew && (
                      <Badge className="bg-teal-400 text-black hover:bg-teal-400 border-none text-[10px] font-bold py-0.5">NEW</Badge>
                    )}
                    <div className="text-center">
                      <p className="text-xs font-bold text-teal-500 dark:text-teal-400 leading-none">{job.match}%</p>
                      <p className="text-[8px] text-slate-400 uppercase">Match</p>
                    </div>
                  </div>
                </div>

                {/* Metadeta */}
                <div className="grid grid-cols-2 gap-y-3 mb-6 text-[12px] text-slate-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {job.type}</div>
                  <div className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</div>
                  <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.posted}</div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed">
                  {job.description}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-gray-300">+1 more</span>
                </div>

                {/* Action Button*/}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-teal-400 hover:bg-teal-300 text-black font-bold h-10 transition-colors">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 dark:border-gray-800 dark:bg-transparent dark:text-white dark:hover:bg-white/5 h-10">
                    Save
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}