"use client";
import React from "react";
import { motion } from "framer-motion";

type Stats = {
  avgMatch: number | null;
  totalApplications: number;
  totalCompanies: number;
  totalUsers: number;
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return `${n}+`;
}

const MissionSection = ({ stats }: { stats: Stats }) => {
  const statCards = [
    {
      label: "Match Accuracy",
      value: stats.avgMatch !== null ? `${stats.avgMatch}%` : "N/A",
      subLabel: stats.avgMatch !== null ? "avg across all matches" : "no matches yet",
      textColor: "text-[#0891b2] dark:text-[#22d3ee]",
      bgColor: "bg-[#ecfeff] dark:bg-[#0891b2]/10",
      borderColor: "border-[#cffafe] dark:border-[#0891b2]/20",
    },
    {
      label: "Applications",
      value: formatCount(stats.totalApplications),
      subLabel: "submitted on platform",
      textColor: "text-[#059669] dark:text-[#34d399]",
      bgColor: "bg-[#ecfdf5] dark:bg-[#059669]/10",
      borderColor: "border-[#d1fae5] dark:border-[#059669]/20",
    },
    {
      label: "Companies",
      value: formatCount(stats.totalCompanies),
      subLabel: "actively hiring",
      textColor: "text-[#d97706] dark:text-[#fbbf24]",
      bgColor: "bg-[#fffbeb] dark:bg-[#d97706]/10",
      borderColor: "border-[#fef3c7] dark:border-[#d97706]/20",
    },
    {
      label: "Professionals",
      value: formatCount(stats.totalUsers),
      subLabel: "verified on platform",
      textColor: "text-[#1e293b] dark:text-[#f8fafc]",
      bgColor: "bg-[#f1f5f9] dark:bg-[#1e293b]/50",
      borderColor: "border-[#e2e8f0] dark:border-[#475569]/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-white dark:bg-[#0B0F19] py-20 px-6 transition-colors duration-500 ease-in-out overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Our Mission
          </h2>
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-xl">
            <p>
              We believe that finding the right job shouldn't be a matter of luck.
              Our AI-powered platform analyzes skills, experience, preferences,
              and company culture to create meaningful connections.
            </p>
            <p>
              By leveraging advanced machine learning algorithms, we reduce search
              time while increasing match quality, helping people find careers
              where they can truly thrive.
            </p>
          </div>
        </motion.div>

        {/* Right: Real Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateZ: index % 2 === 0 ? 1 : -1,
                transition: { duration: 0.2 },
              }}
              className={`p-10 rounded-2xl border ${stat.bgColor} ${stat.borderColor}
              flex flex-col items-center justify-center text-center
              transition-colors duration-500 shadow-sm hover:shadow-xl cursor-default group`}
            >
              <motion.span
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 + index * 0.1 }}
                className={`text-5xl font-bold mb-2 tracking-tighter ${stat.textColor}`}
              >
                {stat.value}
              </motion.span>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-base uppercase tracking-wider group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                {stat.label}
              </span>
              {stat.subLabel && (
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">
                  {stat.subLabel}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default MissionSection;
