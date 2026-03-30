// "use client";

// import { motion } from "framer-motion";

// export default function AboutHero() {
//   return (
//     <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-start px-6 overflow-hidden bg-[#0B0F19] pt-56 pb-44">
      
//       {/* --- Aceternity UI Inspired Background Layer --- */}
//       <div className="absolute inset-0 z-0 h-full w-full bg-[#0B0F19]">
//         {/* 1. Dot Pattern Mask */}
//         <div className="absolute h-full w-full bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
//         {/* 2. Moving Spotlight / Glow Effect */}
//         <motion.div 
//           animate={{
//             opacity: [0.3, 0.5, 0.3],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" 
//         />
//       </div>

//       <div className="relative z-10 max-w-5xl mx-auto text-center">
//         {/* Capability Badge */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10"
//         >
//           <span className="px-5 py-2 rounded-full bg-[#111827] border border-white/5 text-teal-400 text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(20,184,166,0.1)]">
//             Our Protocol
//           </span>
//         </motion.div>

//         {/* Short & Punchy Header */}
//         <motion.h1 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="text-4xl md:text-7xl font-black mb-12 leading-tight tracking-tighter"
//         >
//           Decoding the <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-blue-600">
//             Next-Gen Career.
//           </span>
//         </motion.h1>

//         {/* Narrative Description with optimized spacing */}
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium"
//         >
//           JobAI acts as a neural bridge between exceptional talent and visionary companies. 
//           We eliminate structural friction to build a world where potential meets opportunity instantly.
//         </motion.p>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { MessageSquarePlus, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const users = [
  { id: 1, name: "Alex Rivera", designation: "Senior Engineer", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "Sarah Chen", designation: "Product Designer", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "David Park", designation: "AI Researcher", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
];

export default function AboutHero() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-start px-6 overflow-hidden transition-colors duration-700 bg-[#FAFAFA] dark:bg-[#0B0F19] pt-40 pb-20">
      
      {/* --- Advanced Background Layering --- */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        
        {/* 1. The "Chemical Burn" Light Leaks - Light Mode optimized */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] bg-teal-200/40 dark:bg-teal-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[50%] bg-blue-200/30 dark:bg-blue-600/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>

        {/* 2. Precision Dot/Grid Reveal */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-50 dark:opacity-30" />

        {/* 3. The Aurora Flow (Your custom animation) */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-20 animate-aurora"
          style={{
            background: `radial-gradient(circle at 50% 50%, #14b8a6 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
        
        
        

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white"
        >
          Building Trust in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-400 dark:to-blue-500">
            Every Career Move.
          </span>
        </motion.h1>

        {/* Animated Tooltip Section */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-row items-center justify-center">
            {users.map((user) => (
              <div key={user.id} className="relative group -mr-3 flex items-center justify-center">
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
                   <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-center backdrop-blur-lg">
                      <p className="text-[10px] font-black text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-[8px] text-teal-600 dark:text-teal-400 font-bold uppercase">{user.designation}</p>
                   </div>
                </div>
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-11 w-11 rounded-full border-2 border-white dark:border-[#0B0F19] object-cover transition-transform group-hover:scale-110 group-hover:z-30 cursor-pointer shadow-md dark:shadow-none"
                />
              </div>
            ))}
            <div className="flex flex-col items-start ml-7">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                 Trusted by 10k+ Experts
               </span>
               <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={10} className="text-blue-600 dark:text-blue-500" />
                  <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase">Verified Professional Network</span>
               </div>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-xl font-medium"
        >
          JobAI is the verified intelligence layer that eliminates hiring uncertainty. We bridge the gap between top-tier talent and visionary teams.
        </motion.p>

        {/* Dynamic Glass-Box Feedback */}
        <motion.div 
          className="mt-6 px-7 py-4 rounded-[26px] bg-white/60 dark:bg-[#111827]/60 border border-gray-200 dark:border-white/5 backdrop-blur-xl flex items-center gap-7 shadow-lg shadow-gray-200/50 dark:shadow-none"
        >
          {!submitted ? (
            <>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <MessageSquarePlus size={14} className="text-teal-600 dark:text-teal-500" />
                <span>Does this vision align?</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSubmitted(true)} className="px-5 py-1.5 rounded-lg bg-gray-900 dark:bg-[#0B0F19] border border-gray-700 dark:border-white/5 text-[9px] font-black uppercase text-white dark:text-gray-500 hover:bg-gray-800 dark:hover:text-white transition-all shadow-sm">Yes</button>
                <button onClick={() => setSubmitted(true)} className="px-5 py-1.5 rounded-lg bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-white/5 text-[9px] font-black uppercase text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm">No</button>
              </div>
            </>
          ) : (
            <div className="text-[9px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-ping" />
              Protocol Confirmed.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}