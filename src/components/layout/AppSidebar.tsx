"use client";
import React from "react";
// আপনার UI ফোল্ডার থেকে Sidebar কম্পোনেন্টগুলো ইম্পোর্ট নিশ্চিত করুন
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { 
  IconHome, 
  IconLayoutDashboard, 
  IconSearch, 
  IconBriefcase, 
  IconUserBolt,
  IconSettings,
  IconLogout
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// Props ইন্টারফেস যোগ করা হয়েছে
interface AppSidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  const { data: session } = useSession();

  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5 flex-shrink-0" /> },
    { label: "Overview", href: "/overview", icon: <IconLayoutDashboard className="h-5 w-5 flex-shrink-0" /> },
    { label: "Hiring Hub", href: "/jobs", icon: <IconBriefcase className="h-5 w-5 flex-shrink-0" /> },
    { label: "Career DNA", href: "/profile", icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 flex-shrink-0" /> },
  ];

  return (
    <div className={cn(
      "h-screen flex flex-col md:flex-row transition-colors duration-300", 
      "bg-slate-50 dark:bg-[#020617]"
    )}>
      {/* open এবং setOpen প্রপসগুলো এখানে পাস করা হয়েছে */}
      <Sidebar open={isOpen} setOpen={setIsOpen} animate={false}>
        <SidebarBody className={cn(
          "justify-between gap-10",
          "bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-white/5",
          "md:w-[280px]" // বড় স্ক্রিনে স্ট্যাটিক উইডথ
        )}>
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            <div className="mt-8 mb-10 px-2">
               <Logo />
            </div>
            
            <nav className="flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
                    "hover:bg-teal-500/10 dark:hover:bg-white/5",
                    "text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white"
                  )}
                />
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6 border-t border-slate-200 dark:border-white/5 pt-6 mb-6">
            <div className="flex items-center gap-2 px-3 h-6">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="h-2 w-2 flex-shrink-0 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" 
              />
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-teal-600 dark:text-teal-500/80">
                AI Agent Active
              </span>
            </div>
            
            <div className="flex items-center justify-between px-2 h-12">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 p-[1.5px] shadow-md">
                   <div className="h-full w-full rounded-full bg-white dark:bg-[#020617] flex items-center justify-center overflow-hidden">
                      <img 
                        src={session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name || 'Felix'}`} 
                        alt="avatar" 
                        className="object-cover h-full w-full"
                      />
                   </div>
                </div>
                
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[100px]">
                    {session?.user?.name || "Anonymous"}
                  </span>
                  <span className="text-[10px] font-bold text-teal-500 uppercase tracking-tighter">
                    DNA Verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => signOut()}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"
                title="Logout"
              >
                <IconLogout className="h-5 w-5" />
              </button>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group/logo h-10">
      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 transition-transform duration-300 group-hover/logo:scale-110">
        <IconBriefcase className="text-white h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white leading-none uppercase">
          Job<span className="text-teal-500">AI</span>
        </span>
        <span className="text-[8px] font-bold text-teal-600/70 dark:text-teal-500/50 uppercase tracking-[0.2em] mt-1 italic">
          Every Job Holder
        </span>
      </div>
    </Link>
  );
};