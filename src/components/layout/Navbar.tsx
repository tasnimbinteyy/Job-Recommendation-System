"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Command } from "cmdk";
import { 
  Sun, Moon, Briefcase, LayoutDashboard, 
  LogOut, User, Bell, Search, Building 
} from "lucide-react";
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 pt-28 backdrop-blur-sm px-4" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-2xl transition-all" onClick={(e) => e.stopPropagation()}>
        <Command className="flex flex-col">
          <div className="flex items-center border-b border-white/5 px-4">
            <Search className="mr-2 h-4 w-4 text-slate-500" />
            <Command.Input placeholder="Search jobs, companies or actions..." className="flex h-14 w-full bg-transparent py-3 text-sm outline-none text-white" />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">No results found.</Command.Empty>
            <Command.Group heading="Links" className="px-2 py-2 text-[10px] font-bold text-teal-500 uppercase">
              <Command.Item asChild className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 text-slate-300">
                <Link href="/jobs" className="flex items-center gap-2"><LayoutDashboard size={16} /> Go to Dashboard</Link>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
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
      <div className="fixed top-0 w-full z-50 px-4 pt-4 pointer-events-none">
        <header className="mx-auto max-w-7xl h-16 pointer-events-auto">
          <nav className="flex h-full items-center justify-between rounded-2xl border border-white/20 bg-white/80 dark:bg-[#0B0F19]/80 px-6 backdrop-blur-xl transition-all shadow-lg dark:border-white/5">
            
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-teal-500 text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <Briefcase size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Job<span className="text-teal-500">AI</span>
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                      pathname === link.href 
                        ? "text-teal-600 dark:text-teal-400 bg-teal-500/10" 
                        : "text-slate-600 hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div onClick={() => setOpenSearch(true)} className="hidden lg:flex flex-1 max-w-sm mx-8 cursor-pointer">
              <div className="flex w-full items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent hover:border-teal-500/30 transition-all">
                <Search size={16} className="text-slate-400" />
                <span className="text-sm text-slate-400">Search anything...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-300 dark:border-white/10 bg-slate-200 dark:bg-white/5 px-1.5 font-mono text-[10px] text-slate-500">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* --- Theme Toggle (Fixed Rounding Issue) --- */}
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                className="p-2 rounded-xl text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none focus:outline-none focus:ring-0 ring-0 border-none bg-transparent"
              >
                {mounted && (theme === "dark" ? (
                  <Sun size={18} className="transition-all hover:text-teal-500" />
                ) : (
                  <Moon size={18} className="transition-all hover:text-teal-500" />
                ))}
              </button>

              {session ? (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="hidden sm:flex rounded-xl relative text-gray-400 focus:ring-0">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-500 rounded-full border-2 border-white dark:border-[#0B0F19]"></span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none focus:ring-0">
                      <div className="flex items-center gap-2 p-1 rounded-full border border-transparent hover:border-teal-500/30 transition-all">
                        <img src={session.user?.image || ""} alt="Profile" className="h-8 w-8 rounded-full ring-2 ring-teal-500/20" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 mt-2 rounded-2xl p-2 dark:bg-[#0B0F19] dark:border-white/10 shadow-2xl backdrop-blur-xl border-white/20">
                      <DropdownMenuLabel className="p-3">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{session.user?.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{session.user?.email}</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="dark:bg-white/10" />
                      <DropdownMenuItem asChild className="rounded-xl cursor-pointer focus:bg-teal-500/10 focus:text-teal-500">
                        <Link href="/jobs" className="flex items-center gap-2 w-full p-2 font-medium">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl cursor-pointer focus:bg-teal-500/10 focus:text-teal-500 flex items-center gap-2 p-2 font-medium">
                        <User size={16} /> My Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-white/10" />
                      <DropdownMenuItem onClick={() => signOut()} className="rounded-xl cursor-pointer text-red-500 focus:bg-red-500/10 font-bold p-2 transition-colors">
                        <LogOut size={16} /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button onClick={() => signIn("google")} className="rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-extrabold px-6 shadow-lg shadow-teal-500/20 transition-all active:scale-95">
                  Get Started
                </Button>
              )}
            </div>
          </nav>
        </header>
      </div>
      <SearchModal open={openSearch} setOpen={setOpenSearch} />
    </>
  );
}