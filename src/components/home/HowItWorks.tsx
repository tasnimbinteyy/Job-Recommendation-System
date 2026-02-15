// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { FileText, Brain, Briefcase, Sparkles } from "lucide-react";

// const steps = [
//   {
//     step: "01",
//     title: "Create Your Profile",
//     description: "Upload your resume and let our AI analyze your skills and experience.",
//     icon: <FileText className="w-6 h-6" />,
//   },
//   {
//     step: "02",
//     title: "Get AI Recommendations",
//     description: "Receive personalized job matches based on your unique profile.",
//     icon: <Brain className="w-6 h-6" />,
//   },
//   {
//     step: "03",
//     title: "Apply & Track",
//     description: "Apply with one click and track your applications in real-time.",
//     icon: <Briefcase className="w-6 h-6" />,
//   },
// ];

// export default function HowItWorksSection() {
//   return (
//     <section className="relative px-6 py-24 bg-white dark:bg-[#020617] transition-colors duration-300 overflow-hidden">

//       {/* --- Sublte Background Elements --- */}
//       <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100">
//         <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 blur-[120px] rounded-full" />
//         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:30px_30px]" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-6xl">

//         {/* Section Header */}
//         <div className="mb-20 text-center space-y-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
//             <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
//             <span className="text-[10px] font-bold tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">Process</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
//             How It <span className="text-teal-600 dark:text-teal-400">Works</span>
//           </h2>
//           <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400 font-medium">
//             Our AI-powered platform makes job searching effortless by building your digital career DNA.
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-8 md:grid-cols-3">
//           {steps.map((item) => (
//             <Card
//               key={item.step}
//               className="group relative border border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:-translate-y-2 dark:border-white/5 dark:bg-[#0B1224]/50 dark:hover:bg-[#111827] overflow-hidden"
//             >
//               {/* Card Hover Glow */}
//               <div className="absolute -right-10 -top-10 h-32 w-32 bg-teal-500/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />

//               <CardContent className="flex flex-col items-center p-10 text-center relative z-10">

//                 {/* Icon & Step Circle Combined */}
//                 <div className="relative mb-8">
//                   <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white dark:bg-white/5 dark:text-teal-400 dark:group-hover:bg-teal-500 dark:group-hover:text-[#020617] shadow-sm">
//                     {item.icon}
//                   </div>
//                   <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-[10px] font-black text-slate-400 dark:bg-[#020617] dark:border-white/10 dark:text-slate-500 group-hover:border-teal-500/50 transition-colors">
//                     {item.step}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
//                   {item.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="leading-relaxed text-slate-600 dark:text-slate-400 text-sm font-medium">
//                   {item.description}
//                 </p>

//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Brain,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Genetic Upload",
    description:
      "Drop your CV. Our AI dissects your skills, patents, and hidden potential to build your twin.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-teal-500/20",
  },
  {
    step: "02",
    title: "Neural Synthesis",
    description:
      "Our engine cross-references 10k+ elite roles to find matches where you'll actually thrive.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-blue-500/20",
  },
  {
    step: "03",
    title: "Autonomous Hunt",
    description:
      "Sit back. Your AI Twin pitches you to recruiters 24/7. Only accept the best interviews.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-purple-500/20",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative px-6 py-32 bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Modern Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-widest text-slate-500 dark:text-teal-400 uppercase">
              Engine Lifecycle
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            How JobAI <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-500 dark:from-teal-400 dark:to-blue-400">
              Automates Your Career
            </span>
          </h2>
        </div>

        {/* Dynamic Grid */}
        <div className="grid gap-12 md:grid-cols-3 relative">
          {/* Connecting Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 dark:bg-white/5 -z-10" />

          {steps.map((item, idx) => (
            <div key={item.step} className="relative group">
              <Card className="h-full border-none bg-transparent shadow-none ">
                <CardContent className="flex flex-col items-start p-0">
                  {/* Step Icon with Gradient Glow */}
                  <div
                    className={`mb-8 relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br ${item.color} to-transparent border border-slate-200 dark:border-white/10 group-hover:border-teal-500/50 transition-all duration-500 shadow-sm`}
                  >
                    <div className="text-slate-800 dark:text-white group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>

                    {/* Floating Step Badge */}
                    <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-[10px] font-black shadow-lg">
                      {item.step}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <CheckCircle2 size={16} className="text-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      System Ready
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Unique Number Backdrop (Subtle) */}
              <span className="absolute -top-12 -left-4 text-8xl font-black text-slate-900/[0.03] dark:text-white/[0.02] select-none pointer-events-none group-hover:text-teal-500/5 transition-colors">
                {item.step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
