"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, ShieldCheck, Target } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      title: "Innovation First",
      desc: "We push boundaries to create intuitive and seamless hiring experiences.",
      icon: <Lightbulb size={24} />,
      textColor: "text-[#0891b2] dark:text-[#22d3ee]",
      bgColor: "bg-[#ecfeff] dark:bg-[#0891b2]/10",
      borderColor: "border-[#cffafe] dark:border-[#0891b2]/20",
    },
    {
      title: "People Focused",
      desc: "Every feature is designed with seekers and employers at the heart.",
      icon: <Users size={24} />,
      textColor: "text-[#059669] dark:text-[#34d399]",
      bgColor: "bg-[#ecfdf5] dark:bg-[#059669]/10",
      borderColor: "border-[#d1fae5] dark:border-[#059669]/20",
    },
    {
      title: "Privacy & Trust",
      desc: "Your data is secure and managed with the highest level of integrity.",
      icon: <ShieldCheck size={24} />,
      textColor: "text-[#d97706] dark:text-[#fbbf24]",
      bgColor: "bg-[#fffbeb] dark:bg-[#d97706]/10",
      borderColor: "border-[#fef3c7] dark:border-[#d97706]/20",
    },
    {
      title: "Accuracy Matters",
      desc: "We strive for excellence in every recommendation we provide.",
      icon: <Target size={24} />,
      textColor: "text-[#1e293b] dark:text-[#f8fafc]",
      bgColor: "bg-[#f1f5f9] dark:bg-[#1e293b]/50",
      borderColor: "border-[#e2e8f0] dark:border-[#475569]/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="bg-white dark:bg-[#0B0F19] py-24 px-6 transition-colors duration-500 ease-in-out overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Our Values
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Core principles that guide us in creating a fair and efficient environment for everyone.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className={`p-10 rounded-2xl border ${v.bgColor} ${v.borderColor} 
              flex flex-col items-center justify-center text-center 
              transition-all duration-500 shadow-sm hover:shadow-xl cursor-default group`}
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${v.textColor} group-hover:scale-110`}>
                {v.icon}
              </div>

              <h3 className={`text-xl font-bold mb-3 tracking-tight ${v.textColor}`}>
                {v.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}