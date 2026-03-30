// "use client";

// import { useState } from "react";
// import { Search, Filter, ChevronDown, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";

// export default function BrowseJobsPage() {
//   const [sortBy, setSortBy] = useState("Most Relevant");

//   const jobs = [
//     {
//       title: "Senior Frontend Developer",
//       company: "TechCorp Inc.",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       salary: "$120K - $180K",
//       posted: "2 days ago",
//       match: "95%",
//       isNew: true,
//       tags: ["React", "TypeScript", "CSS", "JavaScript", "+1 more"],
//       description: "We are looking for an experienced frontend developer to lead our web application..."
//     },
//     {
//       title: "Machine Learning Engineer",
//       company: "AI Solutions Ltd.",
//       location: "Remote",
//       type: "Full-time",
//       salary: "$140K - $200K",
//       posted: "1 week ago",
//       match: "88%",
//       isNew: false,
//       tags: ["Python", "TensorFlow", "PyTorch", "ML", "+1 more"],
//       description: "Join our AI team to build cutting-edge machine learning models for enterprise applications...."
//     },
//     {
//       title: "Product Designer",
//       company: "DesignHub Co.",
//       location: "New York, NY",
//       type: "Full-time",
//       salary: "$100K - $150K",
//       posted: "3 days ago",
//       match: "82%",
//       isNew: true,
//       tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
//       description: "Create beautiful and intuitive user experiences for our B2B SaaS platform. Strong portfolio in produ..."
//     },
//     {
//       title: "Backend Engineer",
//       company: "CloudScale Systems",
//       location: "Austin, TX",
//       type: "Full-time",
//       salary: "$130K - $170K",
//       posted: "5 days ago",
//       match: "79%",
//       isNew: false,
//       tags: ["Node.js", "Go", "AWS", "Docker", "+1 more"],
//       description: "Build scalable backend services using Node.js and Go. Experience with microservices architecture..."
//     },
//     {
//       title: "Data Analyst",
//       company: "DataInsights Corp.",
//       location: "Chicago, IL",
//       type: "Full-time",
//       salary: "$80K - $110K",
//       posted: "1 week ago",
//       match: "75%",
//       isNew: false,
//       tags: ["SQL", "Python", "Tableau", "Analytics", "+1 more"],
//       description: "Analyze complex datasets to drive business decisions. Strong SQL and Python skills required,..."
//     },
//     {
//       title: "DevOps Engineer",
//       company: "InfraCloud Inc.",
//       location: "Seattle, WA",
//       type: "Full-time",
//       salary: "$125K - $165K",
//       posted: "4 days ago",
//       match: "71%",
//       isNew: false,
//       tags: ["AWS", "Terraform", "Kubernetes", "CI/CD", "+1 more"],
//       description: "Manage and improve our CI/CD pipelines and cloud infrastructure. Strong experience with AW..."
//     },
//     {
//       title: "UX Researcher",
//       company: "UserFirst Labs",
//       location: "Boston, MA",
//       type: "Contract",
//       salary: "$90K - $120K",
//       posted: "2 weeks ago",
//       match: "68%",
//       isNew: false,
//       tags: ["User Research", "Usability Testing", "Analytics", "Surveys"],
//       description: "Conduct user research studies to inform product decisions. Experience with qualitative and..."
//     },
//     {
//       title: "Mobile Developer",
//       company: "AppWorks Studio",
//       location: "Los Angeles, CA",
//       type: "Full-time",
//       salary: "$110K - $155K",
//       posted: "6 days ago",
//       match: "85%",
//       isNew: true,
//       tags: ["React Native", "TypeScript", "iOS", "Android", "+1 more"],
//       description: "Develop cross-platform mobile applications using React Native. Strong understanding of mobile UX..."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#0B0F19] transition-colors duration-300">
      
//       {/* --- HERO SECTION --- */}
//       <section className="py-20 px-6 text-center">
//         <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
//           Find Your Next Role
//         </h1>
//         <p className="text-slate-600 dark:text-gray-400 text-lg mb-8">
//           Browse {jobs.length} opportunities from top companies
//         </p>
        
//         <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-xs font-bold mb-10">
//           AI-Powered Matching Available
//         </div>

//         <div className="max-w-3xl mx-auto flex gap-3">
//           <div className="relative flex-1">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//             <input 
//               type="text" 
//               placeholder="Search jobs, skills, or companies..." 
//               className="w-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
//             />
//           </div>
          
//           <Button variant="outline" className="h-[58px] px-6 gap-2 rounded-xl border-slate-200 dark:border-gray-800 dark:text-white hover:bg-amber-500/90 dark:hover:bg-amber-500/90">
//             <Filter size={20} /> Filters
//           </Button>
//         </div>
//       </section>

//       {/* --- JOB LISTINGS SECTION --- */}
//       <div className="max-w-7xl mx-auto px-6 pb-20">
//         <div className="flex justify-between items-center mb-8">
//           <p className="text-slate-500 text-sm italic">Showing {jobs.length} jobs</p>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button className="gap-2 text-slate-600 border-gray-800 dark:bg-gray-900 dark:text-white font-medium">
//                 {sortBy} <ChevronDown size={16} />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-[#111827] border-gray-800 text-white w-48">
//               <DropdownMenuItem onClick={() => setSortBy("Most Relevant")} className="dark:hover:bg-amber-500/90 hover:text-black cursor-pointer">
//                 Most Relevant
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setSortBy("Most Recent")} className="cursor-pointer dark:hover:bg-amber-500/90">
//                 Most Recent
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setSortBy("Salary: High to Low")} className="cursor-pointer dark:hover:bg-amber-500/90">
//                 Salary: High to Low
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setSortBy("Salary: Low to High")} className="cursor-pointer dark:hover:bg-amber-500/90">
//                 Salary: Low to
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
        
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job, index) => (
//             <div key={index} className="bg-[#111827]/50 border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-teal-500/50 transition-all group">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="bg-[#1F2937] p-3 rounded-xl border border-gray-700">
//                   <Briefcase className="text-teal-400" size={24} />
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   {job.isNew && (
//                     <span className="bg-teal-500/20 text-teal-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">New</span>
//                   )}
//                   <span className="text-teal-400 text-xs font-semibold bg-teal-500/5 px-2 py-1 rounded-lg border border-teal-500/20">
//                     ✨ {job.match} Match
//                   </span>
//                 </div>
//               </div>

//               <h3 className="text-white text-xl font-bold mb-1 group-hover:text-teal-400 transition-colors">{job.title}</h3>
//               <p className="text-gray-400 text-sm mb-4">{job.company}</p>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center gap-2 text-gray-500 text-sm">
//                   <MapPin size={16} /> {job.location}
//                   <Briefcase size={16} className="ml-2" /> {job.type}
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-500 text-sm">
//                   <DollarSign size={16} /> {job.salary}
//                   <Clock size={16} className="ml-2" /> {job.posted}
//                 </div>
//               </div>

//               <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
//                 {job.description}
//               </p>

//               <div className="flex flex-wrap gap-2 mb-8">
//                 {job.tags.map((tag, i) => (
//                   <span key={i} className="bg-[#1F2937] text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700">
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               <div className="mt-auto flex gap-3">
//                 <Button className="flex-1 bg-teal-500 hover:bg-teal-400 text-[#0B0F19] font-bold rounded-xl h-11">
//                   View Details
//                 </Button>
//                 <Button variant="outline" className="bg-[#0B0F19] border-gray-800 text-white hover:bg-gray-800 rounded-xl h-11 px-5">
//                   Save
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, MapPin, Briefcase, DollarSign, Clock, Sparkles, Bookmark, Zap } from "lucide-react";
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
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 md:pt-48 pb-20 px-6 text-center relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} /> AI-Powered Career Matching
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">Next Role</span>
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
            Discover {jobs.length} high-impact opportunities from global industry leaders.
          </p>

          {/* Search Bar Container */}
          <div className="flex flex-col md:flex-row gap-3 p-3 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <div className="relative flex-[2] flex items-center">
              <Search className="absolute left-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Job title, skills, or keywords..." 
                className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none font-medium"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-white/10 self-center" />
            <div className="relative flex-1 flex items-center">
              <MapPin className="absolute left-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Remote / City" 
                className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none font-medium"
              />
            </div>
            <Button className="h-14 px-10 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-teal-500/20">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* --- JOB LISTINGS SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Open Positions</h2>
            <p className="text-slate-500 font-medium italic">Showing {jobs.length} curated opportunities</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-900/50 dark:text-white font-bold px-6">
              <Filter size={18} className="mr-2" /> Filters
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-xl border-slate-200 dark:border-white/10 dark:bg-slate-900/50 dark:text-white font-bold min-w-[180px]">
                  {sortBy} <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 dark:text-white w-56 p-2 rounded-xl">
                {["Most Relevant", "Most Recent", "Salary: High to Low"].map((item) => (
                   <DropdownMenuItem key={item} onClick={() => setSortBy(item)} className="rounded-lg cursor-pointer focus:bg-teal-500 focus:text-white font-bold">
                     {item}
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="group bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[32px] p-7 hover:border-teal-500/40 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-teal-500/5 hover:-translate-y-1">
              
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10">
                  <Briefcase className="text-teal-600 dark:text-teal-400" size={26} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  {job.isNew && (
                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black px-2 py-1 rounded-md uppercase border border-amber-500/10">New</span>
                  )}
                  <div className="text-teal-600 dark:text-teal-400 text-[11px] font-black bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 flex items-center gap-1">
                    <Zap size={12} fill="currentColor" /> {job.match} Match
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-slate-900 dark:text-white text-xl font-black mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{job.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide">{job.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 mb-6">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                  <MapPin size={14} /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                  <DollarSign size={14} /> {job.salary}
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                  <Clock size={14} /> {job.posted}
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
                  <Briefcase size={14} /> {job.type}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.slice(0, 4).map((tag, i) => (
                  <span key={i} className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
                <Button className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 font-black rounded-xl h-12 transition-all">
                  Apply Now
                </Button>
                <Button variant="outline" className="aspect-square h-12 p-0 rounded-xl border-slate-200 dark:border-white/10 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <Bookmark size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}