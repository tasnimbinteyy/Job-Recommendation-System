"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Command } from "cmdk";
import { 
  Sun, Moon, LayoutDashboard, 
  LogOut, User, Bell, Search, 
  Briefcase // Lucide Briefcase Icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// --- Search Modal Component ---
function SearchModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 pt-28 backdrop-blur-md px-4" onClick={() => setOpen(false)}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)]" 
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="flex flex-col">
          <div className="flex items-center border-b border-white/5 px-4">
            <Search className="mr-2 h-4 w-4 text-slate-500" />
            <Command.Input placeholder="Quick search jobs or companies..." className="flex h-14 w-full bg-transparent py-3 text-sm outline-none text-white" />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">No results found.</Command.Empty>
            <Command.Group heading="Quick Links" className="px-2 py-2 text-[10px] font-bold text-teal-500 uppercase tracking-widest">
              <Command.Item asChild className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 text-slate-300">
                <Link href="/jobs" className="flex items-center gap-2"><LayoutDashboard size={16} /> Go to Dashboard</Link>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </motion.div>
    </div>
  );
}

// --- Main Navbar Component ---
export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { data: session } = useSession();

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse Jobs", href: "/browse" },
    { name: "Companies", href: "/companies" },
    { name: "About", href: "/about" }, 
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-40 px-4 pt-4 pointer-events-none">
        <header className="mx-auto transition-all duration-500 pointer-events-auto max-w-7xl">
          <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-white/70 dark:bg-[#0B0F19]/70 px-6 backdrop-blur-xl shadow-xl dark:border-white/5">
            
            <div className="flex items-center gap-6">
              {/* --- UPDATED BRIEFCASE LOGO --- */}
              <Link href="/" className="flex items-center gap-2 group mr-2">
                <div className="h-10 w-10 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-all duration-300">
                  <Briefcase className="text-white h-5 w-5 fill-white/10" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                    Job<span className="text-teal-500">AI</span>
                  </span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-semibold transition-all rounded-lg",
                      pathname === link.href 
                        ? "text-teal-600 dark:text-teal-400 bg-teal-500/10" 
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpenSearch(true)}
                className="rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <Search size={18} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              </Button>

              {session ? (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="rounded-xl relative text-slate-400 hover:bg-teal-500/10 hover:text-teal-500">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white dark:border-[#0B0F19]"></span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <div className="h-9 w-9 rounded-full ring-2 ring-teal-500/20 hover:ring-teal-500/50 transition-all p-0.5">
                        <Image 
                          src={session.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                          alt="User Avatar" 
                          width={36} height={36} 
                          className="rounded-full object-cover"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 mt-3 rounded-2xl p-2 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl">
                       <div className="p-3 mb-2 bg-teal-500/5 rounded-xl">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
                          <p className="text-[10px] text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest mt-0.5">AI Agent Verified</p>
                       </div>
                       <DropdownMenuSeparator className="dark:bg-white/10" />
                       <DropdownMenuItem asChild className="rounded-xl p-2.5 focus:bg-teal-500/10 focus:text-teal-500 cursor-pointer font-semibold">
                          <Link href="/jobs" className="flex items-center gap-2 w-full">
                            <LayoutDashboard size={16} /> Go to Dashboard
                          </Link>
                       </DropdownMenuItem>
                       <DropdownMenuSeparator className="dark:bg-white/10" />
                       <DropdownMenuItem onClick={() => signOut()} className="rounded-xl p-2.5 text-red-500 focus:bg-red-500/10 font-bold cursor-pointer">
                          <LogOut size={16} className="mr-2" /> Logout
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button 
                  onClick={() => signIn()}
                  className="rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 shadow-lg shadow-teal-500/25 transition-all active:scale-95"
                >
                  Join JobAI
                </Button>
              )}
            </div>
          </nav>
        </header>
      </div>
      
      <AnimatePresence>
        {openSearch && <SearchModal open={openSearch} setOpen={setOpenSearch} />}
      </AnimatePresence>
    </>
  );
}