// app/components/CTASection.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-teal-500 py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Ready to Find Your Next Opportunity?
        </h2>

        {/* Description */}
        <p className="text-slate-900/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of job seekers who have found their dream careers through our AI-powered platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Black Button */}
          <Button 
            className="w-full sm:w-auto min-w-[220px] bg-slate-800 text-white rounded-xl h-14 text-lg font-semibold hover:bg-black transition-all shadow-lg"
          >
            Create Free Account
          </Button>
          
          {/* Silver Button - Updated Styling */}
          <Button
            
            className="w-full sm:w-auto min-w-[220px] border border-neutral-500 bg-[#cdced2] text-slate-900 rounded-xl h-14 text-lg font-semibold hover:bg-[#b1b4b9] transition-all shadow-md active:scale-95"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}