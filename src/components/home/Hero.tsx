// // // "use client";

// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   ArrowRight,
// // //   Sparkles,
// // //   Fingerprint,
// // //   ArrowUpRight
// // // } from "lucide-react";

// // // export default function HeroSection() {
// // //   return (
// // //     // 'h-screen' ensures no extra scrolling space, 'transform-gpu' for smoother theme switching
// // //     <section className="relative h-screen w-full flex flex-col items-center justify-start bg-slate-50 dark:bg-[#020617] transition-colors duration-300 px-6 overflow-hidden transform-gpu">

// // //       {/* --- Optimized Background (Less Blur = More Speed) --- */}
// // //       <div className="absolute inset-0 z-0 pointer-events-none select-none">
// // //         {/* Teal Glow */}
// // //         <div className="absolute top-[-5%] left-[-2%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/20 blur-[80px] rounded-full will-change-[opacity]" />

// // //         {/* Blue Glow */}
// // //         <div className="absolute bottom-[15%] right-[-2%] w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 blur-[80px] rounded-full will-change-[opacity]" />

// // //         {/* Pattern - Using CSS opacity instead of heavy blending */}
// // //         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:40px_40px]" />
// // //       </div>

// // //       {/* Main Container - Adjusted padding for perfect fit */}
// // //       <div className="relative z-10 w-full max-w-7xl pt-24 md:pt-35 pb-8 lg:pl-12 flex-grow flex flex-col justify-center">
// // //         <div className="grid lg:grid-cols-12 gap-12 items-center">

// // //           {/* --- Left Side: Content --- */}
// // //           <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">

// // //             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
// // //               <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
// // //               <span className="text-[9px] font-bold tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
// // //                 AI Matching Engine v2.0
// // //               </span>
// // //             </div>

// // //             <div className="space-y-4">
// // //               <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
// // //                 Stop hunting. <br />
// // //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-500">
// // //                   Start being hunted.
// // //                 </span>
// // //               </h1>
// // //               <p className="max-w-md text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
// // //                 JobAI builds a high-fidelity <span className="text-slate-900 dark:text-white italic">Digital Twin</span> of your career DNA. Get discovered by elite teams.
// // //               </p>
// // //             </div>

// // //             <div className="flex flex-wrap items-center gap-6 pt-2">
// // //               <Button
// // //                 size="lg"
// // //                 className="h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-[#020617] hover:bg-teal-600 dark:hover:bg-teal-400 rounded-full font-bold transition-all transform-gpu hover:scale-105 active:scale-95 shadow-lg"
// // //               >
// // //                 Activate AI Agent
// // //                 <ArrowRight className="ml-2 h-4 w-4" />
// // //               </Button>

// // //               <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-teal-600 dark:hover:text-white transition-colors group">
// // //                 Review Tech Stack
// // //                 <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* --- Right Side: Identity Card (Optimized shadows/filters) --- */}
// // //           <div className="lg:col-span-5 relative transform-gpu transition-transform duration-500 hover:scale-[1.02]">
// // //             <div className="relative z-10 overflow-hidden p-[1px] rounded-[32px] bg-gradient-to-b from-slate-200 to-transparent dark:from-white/10 dark:to-transparent border border-slate-200/50 dark:border-white/5">
// // //               <div className="bg-white/90 dark:bg-slate-950/50 backdrop-blur-xl rounded-[31px] p-8">

// // //                 <div className="flex items-center justify-between mb-6">
// // //                   <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
// // //                     <Fingerprint className="text-teal-600 dark:text-teal-400 h-5 w-5" />
// // //                   </div>
// // //                   <div className="text-right">
// // //                     <p className="text-[8px] text-slate-400 dark:text-slate-500 font-black tracking-widest uppercase">Matching DNA</p>
// // //                     <p className="text-teal-600 dark:text-teal-500 font-bold text-[10px] uppercase">Active Scan</p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="space-y-4">
// // //                   {[
// // //                     { label: "Frontend Architect", match: "98%", color: "bg-teal-500" },
// // //                     { label: "Product Lead", match: "94%", color: "bg-blue-500" },
// // //                   ].map((item, i) => (
// // //                     <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group transition-colors">
// // //                       <div className="flex justify-between items-center mb-2">
// // //                         <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
// // //                         <span className="text-teal-600 dark:text-teal-400 font-black text-[10px]">{item.match}</span>
// // //                       </div>
// // //                       <div className="h-1 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
// // //                         <div className={`h-full ${item.color} rounded-full`} style={{ width: item.match }} />
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>

// // //                 <div className="mt-8 flex justify-center">
// // //                     <div className="px-4 py-1 rounded-full border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/5 text-[8px] font-black text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase">
// // //                        Secured by JobAI Protocol
// // //                     </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* --- Social Proof (Bottom fixed) --- */}
// // //         <div className="mt-auto py-8 border-t border-slate-200 dark:border-white/5">
// // //           <div className="flex justify-between items-center opacity-40 dark:opacity-20 grayscale">
// // //              {["VERCEL", "STRIPE", "LINEAR", "OPENAI", "META"].map((logo) => (
// // //                <span key={logo} className="text-[9px] font-black tracking-[0.4em] text-slate-900 dark:text-white">
// // //                  {logo}
// // //                </span>
// // //              ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { ArrowRight, Sparkles, Fingerprint, Play } from "lucide-react";

// // export default function HeroSection() {
// //   return (
// //     // mt-[20px] adds the specific top space you requested
// //     // h-[calc(100vh-110px)] keeps everything perfectly in one view
// //     <section className="relative h-[calc(100vh-110px)] min-h-[550px] w-full flex items-center justify-center px-4 md:px-5 overflow-hidden rounded-[40px] mt-[43px] mx-auto max-w-[99%] shadow-2xl transition-all duration-500 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5">
// //       {/* --- BACKGROUND IMAGE (CLEAR & VISIBLE) --- */}
// //       <div className="absolute inset-0 z-0">
// //         <div
// //           className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[15s] hover:scale-105"
// //           style={{
// //             backgroundImage:
// //               // "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')",
// //               "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')",
// //           }}
// //         />

// //         {/* Adaptive Overlays for Light/Dark mode */}
// //         <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/30" />

// //         {/* Gradient Mesh: Strong on left for text readability, disappears on right for picture clarity */}
// //         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent pointer-events-none" />
// //       </div>

// //       {/* Main Container - Adjusted pt-12 for better balance */}
// //       <div className="relative z-10 w-full max-w-7xl flex flex-col justify-between h-full pt-12 pb-10 lg:pl-16">
// //         <div className="grid lg:grid-cols-12 gap-8 items-center flex-grow">
// //           {/* --- Left Side: Content --- */}
// //           <div className="lg:col-span-7 space-y-6">
// //             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md transition-transform hover:scale-105">
// //               <Sparkles
// //                 size={12}
// //                 className="text-teal-600 dark:text-teal-400"
// //               />
// //               <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
// //                 AI Matching Engine v2.0
// //               </span>
// //             </div>

// //             <div className="space-y-4">
// //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05] drop-shadow-sm">
// //                 Stop hunting. <br />
// //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
// //                   Start being hunted.
// //                 </span>
// //               </h1>

// //               <p className="max-w-md text-sm md:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
// //                 JobAI builds a high-fidelity{" "}
// //                 <span className="text-slate-900 dark:text-white font-bold italic underline decoration-teal-500/50">
// //                   Digital Twin
// //                 </span>{" "}
// //                 of your career DNA. Get discovered by elite teams instantly.
// //               </p>
// //             </div>

// //             <div className="flex flex-wrap items-center gap-4 pt-4">
// //               <Button
// //                 size="lg"
// //                 className="h-14 px-8 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
// //               >
// //                 Activate AI Agent
// //                 <ArrowRight className="ml-2 h-5 w-5" />
// //               </Button>

// //               <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/20 transition-all backdrop-blur-md group">
// //                 <Play
// //                   size={16}
// //                   className="fill-slate-900 dark:fill-white mr-1 transition-transform group-hover:scale-110"
// //                 />
// //                 Watch Demo
// //               </button>
// //             </div>
// //           </div>

// //           {/* --- Right Side: Identity Card --- */}
// //           <div className="lg:col-span-5 hidden lg:block">
// //             <div className="relative p-[1px] rounded-[32px] bg-slate-200 dark:bg-white/10 transition-transform duration-500 hover:-translate-y-2">
// //               <div className="bg-white/30 dark:bg-slate-900/10 backdrop-blur-md rounded-[31px] p-10 border border-white/20 shadow-2xl">
// //                 <div className="flex items-center justify-between mb-8">
// //                   <div className="h-12 w-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
// //                     <Fingerprint className="text-teal-600 dark:text-teal-400 h-6 w-6" />
// //                   </div>
// //                   <div className="text-right">
// //                     <p className="text-[8px] text-slate-600 dark:text-white/70 font-black tracking-widest uppercase mb-1">
// //                       Matching DNA
// //                     </p>
// //                     <p className="text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase animate-pulse">
// //                       Scanning...
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4">
// //                   {[
// //                     {
// //                       label: "Frontend Architect",
// //                       match: "98%",
// //                       color: "bg-teal-500",
// //                     },
// //                     {
// //                       label: "Product Lead",
// //                       match: "94%",
// //                       color: "bg-blue-500",
// //                     },
// //                   ].map((item, i) => (
// //                     <div
// //                       key={i}
// //                       className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20"
// //                     >
// //                       <div className="flex justify-between items-center mb-2">
// //                         <span className="text-xs font-bold text-slate-900 dark:text-white">
// //                           {item.label}
// //                         </span>
// //                         <span className="text-teal-600 dark:text-teal-400 font-black text-[10px]">
// //                           {item.match}
// //                         </span>
// //                       </div>
// //                       <div className="h-1 w-full bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden">
// //                         <div
// //                           className={`h-full ${item.color} rounded-full`}
// //                           style={{ width: item.match }}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* --- Social Proof --- */}
// //         <div className="pt-8 border-t border-slate-200 dark:border-white/10">
// //           <div className="flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all">
// //             {["VERCEL", "STRIPE", "LINEAR", "OPENAI", "META"].map((logo) => (
// //               <span
// //                 key={logo}
// //                 className="text-[10px] font-black tracking-[0.4em] text-slate-900 dark:text-white"
// //               >
// //                 {logo}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Sparkles,
//   Fingerprint,
//   Play
// } from "lucide-react";

// export default function HeroSection() {
//   // Animation state for progress bars
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Starts the animation shortly after page load
//     const timer = setTimeout(() => setIsLoaded(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     // mt-[60px] ensures enough space from the navbar
//     // h-[calc(100vh-160px)] keeps the section centered without vertical scroll
//     <section className="relative h-[calc(100vh-160px)] min-h-[580px] w-full flex items-center justify-center px-4 md:px-5 overflow-hidden rounded-[48px] mt-[60px] mx-auto max-w-[98%] shadow-2xl transition-all duration-500 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5">

//       {/* --- BACKGROUND IMAGE (CLEAR & PROFESSIONAL) --- */}
//       <div className="absolute inset-0 z-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')",
//           }}
//         />
//         {/* Light overlay for airy vibe */}
//         <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40" />
//         {/* Subtle gradient for text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent pointer-events-none" />
//       </div>

//       {/* Main Container - lg:pl-10 reduces space from the left side */}
//       <div className="relative z-10 w-full max-w-7xl flex flex-col justify-between h-full pt-12 pb-10 lg:pl-10">
//         <div className="grid lg:grid-cols-12 gap-8 items-center flex-grow">

//           {/* --- Left Side: Content --- */}
//           <div className="lg:col-span-7 space-y-6">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md">
//               <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
//               <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
//                 AI Matching Engine v2.0
//               </span>
//             </div>

//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
//                 Stop hunting. <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
//                   Start being hunted.
//                 </span>
//               </h1>

//               <p className="max-w-md text-sm md:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
//                 JobAI builds a high-fidelity{" "}
//                 <span className="text-slate-900 dark:text-white font-bold italic underline decoration-teal-500/50">
//                   Digital Twin
//                 </span>{" "}
//                 of your career DNA. Get discovered by elite teams instantly.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-4 pt-4">
//               <Button size="lg" className="h-14 px-8 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg">
//                 Activate AI Agent
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>

//               <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold text-sm hover:bg-white/80 dark:hover:bg-white/20 transition-all backdrop-blur-md group shadow-sm">

//                 How it Works
//               </button>
//             </div>
//           </div>

//           {/* --- Right Side: Identity Card with High Text Visibility --- */}
//           <div className="lg:col-span-5 hidden lg:block">
//             <div className="relative p-[1px] rounded-[32px] bg-slate-200 dark:bg-white/10 transition-transform duration-500 hover:-translate-y-2">
//               {/* Glassmorphism with higher contrast background */}
//               <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[31px] p-10 border border-white/50 shadow-2xl">

//                 <div className="flex items-center justify-between mb-8">
//                   <div className="h-12 w-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
//                     <Fingerprint className="text-teal-700 dark:text-teal-400 h-6 w-6" />
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[9px] text-slate-800 dark:text-white/80 font-black tracking-widest uppercase mb-1">Matching DNA</p>
//                     <p className="text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase animate-pulse">Scanning...</p>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   {[
//                     { label: "Frontend Architect", match: "98%", color: "bg-teal-600" },
//                     { label: "Product Lead", match: "94%", color: "bg-blue-600" },
//                   ].map((item, i) => (
//                     <div key={i} className="p-4 rounded-2xl bg-white/80 dark:bg-white/10 border border-white/40 shadow-sm">
//                       <div className="flex justify-between items-center mb-3">
//                         {/* High visibility bold text */}
//                         <span className="text-sm font-extrabold text-slate-900 dark:text-white">{item.label}</span>
//                         <span className="text-teal-700 dark:text-teal-400 font-black text-xs">{item.match}</span>
//                       </div>
//                       <div className="h-2 w-full bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden">
//                         {/* Animated Width */}
//                         <div
//                           className={`h-full ${item.color} rounded-full transition-all duration-[1500ms] ease-out`}
//                           style={{ width: isLoaded ? item.match : "0%" }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- Social Proof --- */}
//         <div className="pt-8 border-t border-slate-200 dark:border-white/10">
//           <div className="flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
//             {["VERCEL", "STRIPE", "LINEAR", "OPENAI", "META"].map((logo) => (
//               <span key={logo} className="text-[10px] font-black tracking-[0.4em] text-slate-900 dark:text-white">{logo}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Fingerprint } from "lucide-react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    // 'pt-32' adds space from the top for navbar transparency
    // Removed 'border' and 'shadow-2xl' from the main container
    <section className="relative min-h-screen w-full flex flex-col items-center justify-start px-4 md:px-5 overflow-hidden bg-white dark:bg-[#020617] pt-32 md:pt-40">
      {/* --- BACKGROUND ELEMENTS (No Border) --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070')",
          }}
        />
        {/* Subtle Gradients for Depth */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* --- Left Side: Content --- */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-md">
              <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
              <span className="text-[10px] font-black tracking-[0.2em] text-teal-600 dark:text-teal-400 uppercase">
                AI Matching Engine v2.0
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
                Stop hunting. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                  Start being hunted.
                </span>
              </h1>

              <p className="max-w-lg text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                JobAI builds a high-fidelity{" "}
                <span className="text-slate-900 dark:text-white font-bold italic underline decoration-teal-500/50">
                  Digital Twin
                </span>{" "}
                of your career DNA. Get discovered by elite teams instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Button
                size="lg"
                className="h-16 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 rounded-2xl font-black transition-all hover:scale-105 active:scale-95"
              >
                Activate AI Agent
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link
                href="/how-it-works"
                className="px-10 py-5 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                How it Works
              </Link>
            </div>
          </div>

          {/* --- Right Side: Identity Card --- */}
          <div className="lg:col-span-5 hidden lg:block animate-in fade-in zoom-in duration-1000">
            <div className="relative p-[1px] rounded-[40px] bg-gradient-to-b from-slate-200 to-transparent dark:from-white/20 dark:to-transparent">
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[39px] p-10 shadow-xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="h-14 w-14 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <Fingerprint className="text-teal-700 dark:text-teal-400 h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 dark:text-white/60 font-black tracking-widest uppercase mb-1">
                      Matching DNA
                    </p>
                    <p className="text-teal-600 dark:text-teal-400 font-bold text-xs uppercase animate-pulse">
                      Scanning...
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      label: "Frontend Architect",
                      match: "98%",
                      color: "bg-teal-600",
                    },
                    {
                      label: "Product Lead",
                      match: "94%",
                      color: "bg-blue-600",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className="text-teal-700 dark:text-teal-400 font-black text-sm">
                          {item.match}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-[2000ms] ease-out`}
                          style={{ width: isLoaded ? item.match : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase">
                    Verified AI Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Social Proof (Logo Strip) --- */}
        <div className="mt-20 py-10 border-t border-slate-200 dark:border-white/5">
          <div className="flex justify-between items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            {["VERCEL", "STRIPE", "LINEAR", "OPENAI", "META"].map((logo) => (
              <span
                key={logo}
                className="text-xs font-black tracking-[0.5em] text-slate-900 dark:text-white"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
