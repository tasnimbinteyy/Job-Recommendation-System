// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { Brain, Target, Zap, Shield } from "lucide-react";

// // // const features = [
// // //   {
// // //     title: "AI-Powered Matching",
// // //     description:
// // //       "Intelligent algorithms analyze resumes and job requirements to deliver accurate job matches.",
// // //     icon: Brain,
// // //   },
// // //   {
// // //     title: "Personalized Recommendations",
// // //     description:
// // //       "Tailored job and company suggestions based on your skills, goals, and experience.",
// // //     icon: Target,
// // //   },
// // //   {
// // //     title: "Instant Analysis",
// // //     description:
// // //       "Get quick resume scoring, skill-gap insights, and actionable feedback instantly.",
// // //     icon: Zap,
// // //   },
// // //   {
// // //     title: "Privacy First",
// // //     description:
// // //       "Your data is handled securely with privacy-focused design and mock-only processing.",
// // //     icon: Shield,
// // //   },
// // // ];

// // // export default function FeaturesSection() {
// // //   return (
// // //     <section className="px-6 py-20 bg-white dark:bg-[#0B0F19]">
// // //       <div className="mx-auto max-w-6xl">

// // //         {/* Header */}
// // //         <div className="mb-14 text-center">
// // //           <h2 className="text-3xl font-bold sm:text-4xl">
// // //             Powerful Features
// // //           </h2>
// // //           <p className="mt-4 text-slate-600 dark:text-gray-400">
// // //             Everything you need to accelerate your job search
// // //           </p>
// // //         </div>

// // //         {/* Grid */}
// // //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
// // //           {features.map((feature) => {
// // //             const Icon = feature.icon;

// // //             return (
// // //               <Card
// // //                 key={feature.title}
// // //                 className="
// // //                   group
// // //                   bg-white
// // //                   border border-gray-200
// // //                   transition-all duration-300
// // //                   hover:-translate-y-1 hover:border-cyan-400
// // //                   dark:bg-[#111827]
// // //                   dark:border-transparent
// // //                 "
// // //               >
// // //                 <CardContent className="p-6">

// // //                   {/* Icon */}
// // //                   <div
// // //                     className="
// // //                       mb-4 flex h-12 w-12 items-center justify-center
// // //                       rounded-lg
// // //                       bg-teal-50 text-teal-600
// // //                       dark:bg-teal-500/10 dark:text-teal-400
// // //                     "
// // //                   >
// // //                     <Icon className="h-6 w-6" />
// // //                   </div>

// // //                   {/* Title */}
// // //                   <h3 className="mb-2 text-lg font-semibold">
// // //                     {feature.title}
// // //                   </h3>

// // //                   {/* Description */}
// // //                   <p className="text-sm text-slate-600 dark:text-gray-400">
// // //                     {feature.description}
// // //                   </p>

// // //                 </CardContent>
// // //               </Card>
// // //             );
// // //           })}
// // //         </div>

// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import { Card, CardContent } from "@/components/ui/card";
// // import { Brain, Target, Zap, Shield, Sparkles } from "lucide-react";

// // const features = [
// //   {
// //     title: "AI-Powered Matching",
// //     description: "Intelligent algorithms analyze resumes and requirements to deliver accurate job matches.",
// //     icon: Brain,
// //     gradient: "from-teal-500/20 to-transparent",
// //   },
// //   {
// //     title: "Personalized Suggestions",
// //     description: "Tailored career paths based on your unique skill set, goals, and professional experience.",
// //     icon: Target,
// //     gradient: "from-blue-500/20 to-transparent",
// //   },
// //   {
// //     title: "Instant Analysis",
// //     description: "Get real-time resume scoring, skill-gap insights, and actionable feedback instantly.",
// //     icon: Zap,
// //     gradient: "from-amber-500/20 to-transparent",
// //   },
// //   {
// //     title: "Privacy First",
// //     description: "Your data is handled securely with high-level encryption and privacy-focused design.",
// //     icon: Shield,
// //     gradient: "from-emerald-500/20 to-transparent",
// //   },
// // ];

// // export default function FeaturesSection() {
// //   return (
// //     <section className="relative px-6 py-32 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      
// //       {/* Background Decorative Element */}
// //       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

// //       <div className="relative z-10 mx-auto max-w-7xl">
        
// //         {/* Modern Header Section */}
// //         <div className="mb-20 space-y-4">
// //           <div className="flex items-center gap-2">
// //             <div className="h-[1px] w-8 bg-teal-500" />
// //             <span className="text-[10px] font-black tracking-[0.3em] text-teal-600 dark:text-teal-400 uppercase">
// //               Core Capabilities
// //             </span>
// //           </div>
// //           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
// //             <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white max-w-2xl leading-[0.9]">
// //               Everything you need to <span className="text-teal-500">accelerate</span> your career.
// //             </h2>
// //             <p className="max-w-xs text-slate-500 dark:text-slate-400 font-medium text-sm md:text-right">
// //               We've built the most advanced AI engine to ensure you never have to "search" for a job again.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Features Grid with Bento-ish Style */}
// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //           {features.map((feature, idx) => {
// //             const Icon = feature.icon;

// //             return (
// //               <Card
// //                 key={feature.title}
// //                 className="
// //                   group relative
// //                   bg-slate-50 dark:bg-white/[0.02]
// //                   border border-slate-200 dark:border-white/5
// //                   transition-all duration-500
// //                   hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10
// //                   overflow-hidden
// //                 "
// //               >
// //                 {/* Spotlight/Glow Effect on Hover */}
// //                 <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" 
// //                      style={{ background: `radial-gradient(circle at top right, var(--tw-gradient-from), transparent 70%)` }} 
// //                 />

// //                 <CardContent className="p-8 relative z-10">
// //                   {/* Icon with animated container */}
// //                   <div className="mb-8 relative">
// //                     <div className="
// //                       flex h-12 w-12 items-center justify-center
// //                       rounded-xl bg-white dark:bg-white/5 
// //                       border border-slate-200 dark:border-white/10
// //                       text-teal-600 dark:text-teal-400
// //                       group-hover:rotate-[10deg] transition-transform duration-500
// //                       shadow-sm
// //                     ">
// //                       <Icon className="h-6 w-6" />
// //                     </div>
// //                     {/* Subtle dot background */}
// //                     <div className="absolute -top-4 -left-4 h-16 w-16 bg-teal-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
// //                   </div>

// //                   {/* Title */}
// //                   <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
// //                     {feature.title}
// //                   </h3>

// //                   {/* Description */}
// //                   <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
// //                     {feature.description}
// //                   </p>

// //                   {/* Decorative Arrow (Visible on hover) */}
// //                   <div className="mt-6 flex items-center gap-2 text-teal-600 dark:text-teal-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
// //                     <span className="text-[10px] font-black uppercase tracking-widest">Learn More</span>
// //                     <Sparkles className="h-3 w-3" />
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Brain, Target, Zap, Shield, Sparkles } from "lucide-react";

// const features = [
//   {
//     title: "AI-Powered Matching",
//     description: "Intelligent algorithms analyze resumes and requirements to deliver accurate job matches.",
//     icon: Brain,
//   },
//   {
//     title: "Personalized Suggestions",
//     description: "Tailored career paths based on your unique skill set, goals, and professional experience.",
//     icon: Target,
//   },
//   {
//     title: "Instant Analysis",
//     description: "Get real-time resume scoring, skill-gap insights, and actionable feedback instantly.",
//     icon: Zap,
//   },
//   {
//     title: "Privacy First",
//     description: "Your data is handled securely with high-level encryption and privacy-focused design.",
//     icon: Shield,
//   },
// ];

// export default function FeaturesSection() {
//   return (
//     <section className="relative px-6 py-32 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-20 space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="h-[1px] w-8 bg-teal-500" />
//             <span className="text-[10px] font-black tracking-[0.3em] text-teal-600 dark:text-teal-400 uppercase">Core Capabilities</span>
//           </div>
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white max-w-2xl leading-[0.9]">
//               Everything you need to <span className="text-teal-500">accelerate</span> your career.
//             </h2>
//             <p className="max-w-xs text-slate-500 dark:text-slate-400 font-medium text-sm md:text-right leading-relaxed">
//               We&apos;ve built the most advanced AI engine to ensure you never have to search for a job again.
//             </p>
//           </div>
//         </div>

//         {/* Grid Section */}
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature) => {
//             const Icon = feature.icon;
//             return (
//               <Card
//                 key={feature.title}
//                 className="group relative bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 overflow-hidden"
//               >
//                 <CardContent className="p-8 relative z-10">
//                   {/* Icon Container - Fixed Hydration Issue by removing extra spaces/newlines */}
//                   <div className="mb-8 relative">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-teal-400 group-hover:rotate-[10deg] transition-transform duration-500 shadow-sm">
//                       <Icon className="h-6 w-6" />
//                     </div>
//                     <div className="absolute -top-4 -left-4 h-16 w-16 bg-teal-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>

//                   <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
//                     {feature.title}
//                   </h3>

//                   <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
//                     {feature.description}
//                   </p>

//                   <div className="mt-6 flex items-center gap-2 text-teal-600 dark:text-teal-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                     <span className="text-[10px] font-black uppercase tracking-widest">Learn More</span>
//                     <Sparkles className="h-3 w-3" />
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, Zap, Shield, Sparkles, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    description: "Our proprietary neural engine decodes your career DNA to find roles where you'll truly excel.",
    icon: Brain,
    accent: "group-hover:text-teal-500",
  },
  {
    title: "Strategic Suggestions",
    description: "Personalized career roadmaps designed to bridge the gap between your skills and goals.",
    icon: Target,
    accent: "group-hover:text-blue-500",
  },
  {
    title: "Instant DNA Analysis",
    description: "Real-time resume scoring and skill-gap audits to keep you ahead of the hiring curve.",
    icon: Zap,
    accent: "group-hover:text-amber-500",
  },
  {
    title: "Stealth Mode Privacy",
    description: "Bank-grade encryption ensures your data remains invisible until you decide to reveal it.",
    icon: Shield,
    accent: "group-hover:text-emerald-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-32 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* --- Background Accents --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* --- Header --- */}
        <div className="mb-24 space-y-6 ml-10 ">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
            <Sparkles size={12} className="text-teal-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 dark:text-teal-400 uppercase ">System Capabilities</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 x-">
            <h2 className="text-5xl md:text-7xl  font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
              Intelligence <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-500">
                Meets Ambition.
              </span>
            </h2>
            <p className="max-w-sm text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed border-l-2 border-teal-500/30 pl-6">
              The only platform that doesn&apos;t just find jobs, but architects your entire career trajectory.
            </p>
          </div>
        </div>

        {/* --- Bento Grid Features --- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="group relative bg-white dark:bg-slate-950/40 backdrop-blur-md border border-slate-200 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(45,212,191,0.2)] overflow-hidden rounded-[32px]"
              >
                {/* Dynamic Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-10 relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-10 relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-400 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-500 shadow-sm">
                      <Icon className={`h-7 w-7 transition-colors duration-500 ${feature.accent}`} />
                    </div>
                    {/* Floating ambient light */}
                    <div className="absolute -top-6 -left-6 h-20 w-20 bg-teal-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>

                  {/* Aesthetic Footer Link */}
                  <div className="mt-auto pt-8 flex items-center gap-2 text-teal-600 dark:text-teal-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explore System</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}