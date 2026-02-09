"use client";

import { useState, useEffect } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Briefcase, LayoutDashboard } from "lucide-react"; 
import { useTheme } from "next-themes";


const links = [
  { name: "Home", href: "/" },
  { name: "Browse Jobs", href: "/browse" }, 
  { name: "Companies", href: "/companies" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0B0F19]/80 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 group-hover:bg-teal-50 group-hover:text-white transition-all">
              <Briefcase size={22} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              JobAI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-slate-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-gray-400 h-10 w-10 flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {mounted ? (
              theme === "dark" ? <Sun size={20} /> : <Moon size={20} />
            ) : (
              <div className="h-5 w-5" /> 
            )}
          </button>
          
          
          <Link href="/jobs">
            <Button variant="ghost" className={`gap-2 font-medium ${pathname === '/jobs' ? 'text-teal-500' : 'text-slate-600 dark:text-gray-300'}`}>
              <LayoutDashboard size={18} /> Dashboard
            </Button>
          </Link>
          
          <Button className="rounded-xl bg-teal-500 px-6 font-bold text-white hover:bg-teal-600 shadow-lg shadow-teal-500/20">
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden p-2" aria-label="Open Menu">
            <Menu className="text-slate-900 dark:text-white" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-[#0B0F19] border-l dark:border-white/10">
            <div className="mt-12 flex flex-col gap-6">
              {links.map((l) => (
                <Link key={l.name} href={l.href} className="text-lg font-semibold text-slate-900 dark:text-white">
                  {l.name}
                </Link>
              ))}
              
             
              <Link href="/jobs" className="text-lg font-semibold text-teal-500">
                Dashboard
              </Link>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium">Theme</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 border rounded-lg"
                >
                  {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                </button>
              </div>

              <hr className="border-slate-200 dark:border-white/10" />
              <Button className="bg-teal-500 text-white rounded-xl w-full">Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}