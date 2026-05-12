"use client";

import { motion } from "framer-motion";
import { MessageSquarePlus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type User = {
  id: string;
  name: string | null;
  role: string;
  image: string | null;
};

function formatUserCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k+`;
  return `${count}+`;
}

function getRoleLabel(role: string): string {
  if (role === "EMPLOYER") return "Employer";
  if (role === "ADMIN") return "Admin";
  return "Job Seeker";
}

function getInitial(name: string | null): string {
  return (name ?? "U").charAt(0).toUpperCase();
}

export default function AboutHero({
  users,
  totalUsers,
}: {
  users: User[];
  totalUsers: number;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-start px-6 overflow-hidden transition-colors duration-700 bg-[#FAFAFA] dark:bg-[#0B0F19] pt-40 pb-20">

      {/* Background */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] bg-teal-200/40 dark:bg-teal-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[50%] bg-blue-200/30 dark:bg-blue-600/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-50 dark:opacity-30" />
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

        {/* Avatar stack + count */}
        <div className="flex items-center gap-4">

          {/* Overlapping avatars */}
          <div className="flex items-center">
            {users.length > 0 ? (
              users.map((user, i) => (
                <div
                  key={user.id}
                  className="relative group"
                  style={{
                    marginLeft: i === 0 ? 0 : "-10px",
                    zIndex: users.length - i,
                  }}
                >
                  {/* Tooltip — rendered outside overflow context */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-xl text-center">
                      <p className="text-[10px] font-black text-gray-900 dark:text-white">{user.name ?? "User"}</p>
                      <p className="text-[8px] text-teal-600 dark:text-teal-400 font-bold uppercase">{getRoleLabel(user.role)}</p>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="w-2 h-2 bg-white dark:bg-[#111827] border-r border-b border-gray-200 dark:border-white/10 rotate-45 mx-auto -mt-1" />
                  </div>

                  {/* Avatar */}
                  <div className="h-11 w-11 rounded-full ring-2 ring-white dark:ring-[#0B0F19] overflow-hidden bg-teal-500/20 transition-transform duration-200 group-hover:scale-110 group-hover:z-50 cursor-pointer shadow-md flex-shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? "User"}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600">
                        <span className="text-white text-sm font-black">{getInitial(user.name)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Placeholder avatars when no users have images
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-11 w-11 rounded-full ring-2 ring-white dark:ring-[#0B0F19] bg-gradient-to-br from-teal-400/40 to-teal-600/40 flex items-center justify-center flex-shrink-0"
                  style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: 3 - i }}
                >
                  <span className="text-teal-600 dark:text-teal-400 text-xs font-black">?</span>
                </div>
              ))
            )}
          </div>

          {/* Count + label */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Trusted by {formatUserCount(totalUsers)} Experts
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck size={10} className="text-blue-600 dark:text-blue-500" />
              <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase">Verified Professional Network</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-xl font-medium"
        >
          JobAI is the verified intelligence layer that eliminates hiring uncertainty. We bridge the gap between top-tier talent and visionary teams.
        </motion.p>

        {/* Feedback box */}
        <motion.div className="mt-6 px-7 py-4 rounded-[26px] bg-white/60 dark:bg-[#111827]/60 border border-gray-200 dark:border-white/5 backdrop-blur-xl flex items-center gap-7 shadow-lg shadow-gray-200/50 dark:shadow-none">
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
