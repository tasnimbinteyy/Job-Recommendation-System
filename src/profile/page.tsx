"use client";

import React, { useState } from "react";
import { User, Building, Mail, MapPin, Award, Settings, Plus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";

export default function ProfilePage() {
  // Frontend Demo: এখানে স্টেট পরিবর্তন করে আপনি Company বা Seeker ভিউ দেখতে পারবেন
  const [role, setRole] = useState<UserRole>("seeker");

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Dev Role Switcher */}
      <div className="flex justify-end items-center gap-3 bg-teal-500/5 p-2 rounded-xl border border-teal-500/10 w-fit ml-auto">
        <span className="text-[10px] font-bold uppercase text-slate-400 px-2">Preview Role:</span>
        <Button size="sm" variant={role === "seeker" ? "default" : "ghost"} onClick={() => setRole("seeker")} className={role === "seeker" ? "bg-teal-500" : ""}>Seeker</Button>
        <Button size="sm" variant={role === "company" ? "default" : "ghost"} onClick={() => setRole("company")} className={role === "company" ? "bg-teal-500" : ""}>Company</Button>
      </div>

      {/* Profile Header Card */}
      <div className="relative rounded-[2rem] border border-white/10 bg-white dark:bg-[#0B0F19] overflow-hidden shadow-2xl shadow-teal-500/5">
        <div className="h-44 bg-gradient-to-br from-teal-500/20 via-blue-500/10 to-transparent backdrop-blur-3xl" />
        <div className="px-10 pb-10">
          <div className="relative -mt-20 flex flex-col md:flex-row items-end gap-6">
            <div className="h-40 w-40 rounded-[2.5rem] border-[6px] border-white dark:border-[#0B0F19] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-2xl">
              {role === "company" ? <Building size={60} className="text-teal-500" /> : <User size={60} className="text-teal-500" />}
            </div>
            <div className="flex-1 space-y-2 mb-4">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                {role === "company" ? "Neural Systems Inc." : "Arif Al Mamun"}
              </h1>
              <p className="flex items-center gap-2 text-teal-500 font-bold uppercase text-xs tracking-widest">
                {role === "company" ? <Globe size={14} /> : <Award size={14} />}
                {role === "company" ? "AI Research Hub" : "Senior Frontend Architect"}
              </p>
            </div>
            <div className="flex gap-3 mb-4">
              <Button className="rounded-2xl bg-teal-500 hover:bg-teal-600 px-8 shadow-lg shadow-teal-500/30">Edit Profile</Button>
              <Button variant="outline" size="icon" className="rounded-2xl border-white/10"><Settings size={18} /></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section className="p-8 rounded-[2rem] border border-white/10 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tighter">About {role === "company" ? "Company" : "Me"}</h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              {role === "company" 
                ? "We are building the next generation of neural networks to solve real-world problems. Join our elite team of researchers." 
                : "Focusing on building high-performance web applications using React and Next.js. Specialist in UI/UX and animation."}
            </p>
          </section>

          {/* Role Specific Section */}
          {role === "company" ? (
            <section className="p-8 rounded-[2rem] border border-white/10 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-tighter">Active Openings</h2>
                <Button variant="ghost" size="sm" className="text-teal-500 hover:bg-teal-500/10"><Plus size={18} className="mr-2" /> Post New</Button>
              </div>
              <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-slate-500 text-sm">No active listings. Create your first job post today.</p>
              </div>
            </section>
          ) : (
            <section className="p-8 rounded-[2rem] border border-white/10 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter">Skill Matrix</h2>
              <div className="flex flex-wrap gap-3">
                {["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Zustand"].map(skill => (
                  <span key={skill} className="px-5 py-2 bg-white dark:bg-white/5 rounded-2xl text-xs font-extrabold border border-white/5 dark:text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <section className="p-8 rounded-[2rem] border border-teal-500/20 bg-teal-500/5">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <Mail size={18} className="text-teal-500" />
                {role === "company" ? "hr@neural.com" : "arif@dev.com"}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <MapPin size={18} className="text-teal-500" /> Dhaka, Bangladesh
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <Globe size={18} className="text-teal-500" /> www.{role === "company" ? "neural" : "arifdev"}.ai
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}