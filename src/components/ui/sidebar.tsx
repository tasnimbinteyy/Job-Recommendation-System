"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { createContext, useContext } from "react";
import { motion } from "framer-motion";

interface SidebarContextProps {
  open: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    // স্ট্যাটিক রাখার জন্য open সব সময় true থাকবে
    <SidebarContext.Provider value={{ open: true }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      className={cn(
        "h-screen sticky top-0 px-6 py-8 flex flex-col bg-[#020617] flex-shrink-0 border-r border-white/5", 
        "w-[280px]", // স্ক্রিনশটের মতো চওড়া উইডথ
        props.className
      )}
      {...props}
    >
      {props.children}
    </motion.div>
  );
};

export const SidebarLink = ({ 
  link, 
  className 
}: { 
  link: { label: string; href: string; icon: React.ReactNode };
  className?: string;
}) => {
  const { open } = useContext(SidebarContext)!;
  return (
    <Link 
      href={link.href} 
      className={cn(
        "flex items-center gap-3 py-3 px-2 rounded-lg transition-colors group/sidebar",
        "text-slate-400 hover:text-white hover:bg-white/5",
        className
      )}
    >
      <div className="text-slate-400 group-hover/sidebar:text-teal-400 transition-colors">
        {link.icon}
      </div>
      <motion.span
        animate={{ opacity: open ? 1 : 0, display: open ? "inline-block" : "none" }}
        className="text-[15px] font-medium whitespace-pre"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};