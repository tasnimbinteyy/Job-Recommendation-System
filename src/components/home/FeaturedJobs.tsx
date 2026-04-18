"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock, ArrowRight, Building2, Sparkles, Bookmark } from "lucide-react";
import Link from "next/link";

function JobCard({ job }: { job: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const skills = Array.isArray(job?.skills) ? job.skills : [];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-[32px] p-px transition-all duration-500 hover:-translate-y-2"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(20, 184, 166, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <Card className="relative h-full border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/40 backdrop-blur-md overflow-hidden rounded-[32px] z-10">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-teal-500 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {job?.title || "Position Title"}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job?.company || "Company Name"}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-2xl font-black bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                  {job?.match || 0}%
                </span>
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
                { icon: MapPin, val: job?.location },
                { icon: Briefcase, val: job?.type },
                { icon: DollarSign, val: job?.salary },
                { icon: Clock, val: job?.posted }
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                    <item.icon className="h-3.5 w-3.5 text-teal-500/70" /> {item.val || "N/A"}
                </div>
            ))}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
            {job?.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {skills.slice(0, 3).map((skill: string, sIdx: number) => (
              <Badge 
                key={sIdx} 
                variant="outline"
                className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded-lg text-[10px] font-bold"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button className="flex-[2] bg-gradient-to-r from-teal-600 to-blue-600 hover:shadow-lg hover:shadow-teal-500/20 text-white font-bold h-11 rounded-xl transition-all border-none text-xs">
              Apply Now
            </Button>
            
            <Button 
              variant="outline" 
              className="group/save flex-1 border-slate-200 dark:border-white/10 dark:text-white dark:hover:bg-teal-500/10 dark:hover:border-teal-500/50 hover:border-teal-500 hover:text-teal-600 h-11 rounded-xl text-xs transition-all duration-300 active:scale-90"
            >
              <Bookmark className="h-4 w-4 mr-1 transition-transform group-hover/save:-translate-y-0.5" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FeaturedJobs() {
  const [displayJobs, setDisplayJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setDisplayJobs(json.data.slice(0, 3).map((j: any) => ({
            id: j.id,
            title: j.title,
            company: j.companyName,
            location: j.location,
            salary: j.salaryRange || "Competitive",
            type: "Full-time",
            posted: new Date(j.createdAt).toLocaleDateString(),
            description: j.description,
            skills: j.requiredSkills,
            match: 0,
          })));
        } else {
          setDisplayJobs([
            { id: "def-1", title: "Principal Frontend Engineer", company: "MetaStream Pro", match: 98, location: "Remote", type: "Full-time", salary: "$140K", posted: "1h ago", description: "Spearheading UI architecture for next-gen platforms.", skills: ["React", "Next.js", "WebAssembly"] },
            { id: "def-2", title: "Senior AI Researcher", company: "DeepLogic AI", match: 94, location: "New York", type: "Full-time", salary: "$160K", posted: "4h ago", description: "Applying cutting-edge LLM techniques.", skills: ["Python", "PyTorch", "NLP"] },
            { id: "def-3", title: "Product Strategist", company: "GrowthX", match: 87, location: "London", type: "Hybrid", salary: "$110K", posted: "1d ago", description: "Defining global product-led growth strategy.", skills: ["Strategy", "Analytics", "UX"] },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative px-6 py-16 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* নিচের কন্টেইনার থেকে ডেকোরেটিভ লাইট এবং ব্লু গ্লো সরিয়ে দেওয়া হয়েছে।
          এখন এটি একদম সলিড ডার্ক বা লাইট ব্যাকগ্রাউন্ড দেখাবে। 
      */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 space-y-6 ml-0 md:ml-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <Sparkles size={12} className="text-teal-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 dark:text-teal-400 uppercase">Neural Engine Analysis</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
              Discover Your <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-500">
                Perfect Path.
              </span>
            </h2>
            <p className="max-w-sm text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed border-l-2 border-teal-500/30 pl-6">
              High-affinity opportunities tailored specifically to your professional DNA.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}