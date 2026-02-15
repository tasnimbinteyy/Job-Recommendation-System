"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Info, ArrowRight } from "lucide-react";

export default function CTASection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="py-10 px-6 bg-white dark:bg-[#06080F] transition-colors duration-500">
      <div
        onMouseMove={handleMouseMove}
        className="group relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden min-h-[480px] flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-2xl"
      >
        {/* Background Image Layer - Opacity set to high for clarity */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 opacity-100 dark:opacity-80"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* স্বচ্ছ ওভারলে: এটি ইমেজকে ঢেকে দেবে না, শুধু টেক্সটের নিচে গভীরতা যোগ করবে */}
        <div className="absolute inset-0 z-10 bg-transparent dark:bg-black/20 transition-colors" />
        
        {/* বাম দিকের গ্রেডিয়েন্ট যা টেক্সটকে ফুটিয়ে তুলবে কিন্তু ডান দিকের ইমেজ ক্লিয়ার রাখবে */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-slate-950 dark:via-slate-950/30 dark:to-transparent" />

        {/* Aceternity Interactive Glow - খুব হালকা করে রাখা হয়েছে */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(20, 184, 166, 0.12),
                transparent 80%
              )
            `,
          }}
        />

        {/* Content Section */}
        <div className="relative z-30 w-full px-10 md:px-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest mb-6 shadow-xl shadow-teal-500/30">
              <Rocket className="h-3.5 w-3.5" /> Start Your Journey
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.9]">
              Elevate Your <br />
              <span className="bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent italic">
                Career.
              </span>
            </h2>

            <p className="text-slate-800 dark:text-slate-100 text-lg max-w-md font-bold leading-relaxed drop-shadow-sm">
              Join the elite circle of professionals using{" "}
              <span className="text-teal-600 dark:text-teal-300 font-extrabold">JobAI</span> to outpace the market.
            </p>
          </div>

          <div className="flex flex-col gap-5 max-w-sm ml-auto w-full">
            {/* Launch Button - High Contrast */}
            <Button className="h-16 bg-teal-500 hover:bg-teal-600 text-white text-xl font-black rounded-2xl transition-all flex items-center justify-between px-10 shadow-[0_10px_30px_rgba(20,184,166,0.4)] border-none group/btn">
              Launch Profile
              <ArrowRight className="h-6 w-6 transition-transform group-hover/btn:translate-x-2" />
            </Button>

            {/* Learn More - Glass Effect without Blur for clarity */}
            <Button
              variant="outline"
              className="h-16 border-white/30 bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 text-lg font-bold rounded-2xl transition-all flex items-center justify-between px-10"
            >
              Learn More
              <Info className="h-5 w-5 opacity-80" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}