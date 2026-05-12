"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sun, Moon, LayoutDashboard,
  LogOut, Search, Briefcase, MapPin,
  Building2, Users, User, Loader2, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import NotificationBell from "@/components/notifications/NotificationBell";

// ─── Types ───────────────────────────────────────────────────────────────────

type JobResult = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  requiredSkills: string[];
};

type UserResult = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  skills: string[];
};

type SearchResults = {
  jobs: JobResult[];
  users: UserResult[];
};

// ─── Search Modal ─────────────────────────────────────────────────────────────

function SearchModal({
  open,
  setOpen,
  role,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  role: string | undefined;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ jobs: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults({ jobs: [], users: [] });
      setSearched(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Ctrl/Cmd+K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ jobs: [], users: [] });
      setSearched(false);
      return;
    }
    const timer = setTimeout(() => fetchResults(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      const fetches: Promise<any>[] = [
        fetch(`/api/jobs?search=${encodeURIComponent(q)}`).then((r) => r.json()),
      ];

      // Admins and employers can also search users/candidates
      if (role === "ADMIN" || role === "EMPLOYER") {
        fetches.push(
          fetch(`/api/candidates?search=${encodeURIComponent(q)}`).then((r) => r.json())
        );
      }

      const [jobsRes, usersRes] = await Promise.all(fetches);
      setResults({
        jobs: (jobsRes?.data ?? []).slice(0, 5),
        users: (usersRes?.data ?? []).slice(0, 5),
      });
      setSearched(true);
      setActiveIndex(0);
    } catch {
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // Build flat list for keyboard nav
  const allItems = [
    ...results.jobs.map((j) => ({ type: "job" as const, item: j })),
    ...results.users.map((u) => ({ type: "user" as const, item: u })),
  ];

  const getHref = (type: "job" | "user", item: any) => {
    if (type === "job") return role === "STUDENT" || !role ? `/browse/${item.id}` : `/jobs`;
    return role === "ADMIN" ? `/admin/users` : `/candidates`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && allItems[activeIndex]) {
      const { type, item } = allItems[activeIndex];
      router.push(getHref(type, item));
      setOpen(false);
    }
  };

  const totalResults = results.jobs.length + results.users.length;
  const isEmpty = searched && totalResults === 0 && !loading;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 pt-24 backdrop-blur-md px-4"
      onClick={() => setOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -16 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-[#0B0F19] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-slate-100 dark:border-white/5">
          {loading
            ? <Loader2 size={16} className="text-teal-500 animate-spin flex-shrink-0" />
            : <Search size={16} className="text-slate-400 flex-shrink-0" />
          }
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              role === "EMPLOYER" ? "Search jobs or candidates..." :
              role === "ADMIN" ? "Search jobs or users..." :
              "Search jobs or companies..."
            }
            className="flex h-14 w-full bg-transparent text-sm outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600 dark:hover:text-white flex-shrink-0">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-400 flex-shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto">

          {/* Empty state */}
          {isEmpty && (
            <div className="py-12 text-center text-slate-400 text-sm font-medium">
              No results for &quot;{query}&quot;
            </div>
          )}

          {/* Initial state — quick links */}
          {!query && (
            <div className="p-3">
              <p className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Quick Links
              </p>
              {[
                { label: "Browse Jobs", href: "/browse", icon: <Briefcase size={15} /> },
                { label: "Companies", href: "/companies", icon: <Building2 size={15} /> },
                ...(role === "STUDENT" ? [{ label: "My Applications", href: "/applications", icon: <LayoutDashboard size={15} /> }] : []),
                ...(role === "EMPLOYER" ? [{ label: "Post a Job", href: "/jobs/add", icon: <Briefcase size={15} /> }, { label: "View Candidates", href: "/candidates", icon: <Users size={15} /> }] : []),
                ...(role === "ADMIN" ? [{ label: "Admin Panel", href: "/admin", icon: <LayoutDashboard size={15} /> }, { label: "Manage Users", href: "/admin/users", icon: <Users size={15} /> }] : []),
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span className="text-slate-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Job results */}
          {results.jobs.length > 0 && (
            <div className="p-3">
              <p className="px-3 py-2 text-[10px] font-black text-teal-500 uppercase tracking-widest">
                Jobs
              </p>
              {results.jobs.map((job, i) => {
                const flatIndex = i;
                const isActive = activeIndex === flatIndex;
                return (
                  <Link
                    key={job.id}
                    href={getHref("job", job)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-start gap-3 px-3 py-3 rounded-xl transition-colors",
                      isActive ? "bg-teal-500/10 text-teal-600 dark:text-teal-400" : "hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                  >
                    <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Briefcase size={14} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{job.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{job.companyName}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={10} />{job.location}
                        </span>
                      </div>
                      {job.requiredSkills.length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {job.requiredSkills.slice(0, 3).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                              {s}
                            </span>
                          ))}
                          {job.requiredSkills.length > 3 && (
                            <span className="text-[10px] text-slate-400">+{job.requiredSkills.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* User/Candidate results (Employer + Admin only) */}
          {results.users.length > 0 && (
            <div className="p-3 border-t border-slate-100 dark:border-white/5">
              <p className="px-3 py-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                {role === "ADMIN" ? "Users" : "Candidates"}
              </p>
              {results.users.map((user, i) => {
                const flatIndex = results.jobs.length + i;
                const isActive = activeIndex === flatIndex;
                return (
                  <Link
                    key={user.id}
                    href={getHref("user", user)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                      isActive ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "hover:bg-slate-50 dark:hover:bg-white/5"
                    )}
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-white/10">
                      {user.image ? (
                        <Image src={user.image} alt={user.name ?? ""} width={32} height={32} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <User size={14} className="text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name ?? "Anonymous"}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      {user.skills?.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {user.skills.slice(0, 3).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-medium">
            {searched && totalResults > 0 ? `${totalResults} result${totalResults !== 1 ? "s" : ""}` : "Type to search"}
          </span>
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-bold">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-bold">↵</kbd> open</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { data: session } = useSession();

  const role = session?.user?.role;

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse Jobs", href: "/browse" },
    { name: "Companies", href: "/companies" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => { setMounted(true); }, []);

  const dashboardHref =
    role === "EMPLOYER" ? "/jobs" :
    role === "ADMIN" ? "/admin" :
    "/overview";

  return (
    <>
      <div className="fixed top-0 w-full z-40 px-4 pt-4 pointer-events-none">
        <header className="mx-auto transition-all duration-500 pointer-events-auto max-w-7xl">
          <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-white/70 dark:bg-[#0B0F19]/70 px-6 backdrop-blur-xl shadow-xl dark:border-white/5">

            <div className="flex items-center gap-6">
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
              {/* Search button with Ctrl+K hint */}
              <button
                onClick={() => setOpenSearch(true)}
                className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-400 hover:border-teal-500/40 hover:text-teal-500 transition-all text-xs font-medium"
              >
                <Search size={14} />
                <span>Search</span>
                <kbd className="ml-1 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-bold">⌘K</kbd>
              </button>
              {/* Mobile search icon only */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenSearch(true)}
                className="sm:hidden rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
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
                  <NotificationBell />

                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <div className="h-9 w-9 rounded-full ring-2 ring-teal-500/20 hover:ring-teal-500/50 transition-all p-0.5">
                        <Image
                          src={session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.name}`}
                          alt="User Avatar"
                          width={36} height={36}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 mt-3 rounded-2xl p-2 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl">
                      <div className="p-3 mb-2 bg-teal-500/5 rounded-xl">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
                        <p className="text-[10px] text-teal-600 dark:text-teal-500 font-bold uppercase tracking-widest mt-0.5">
                          {role === "EMPLOYER" ? "Employer" : role === "ADMIN" ? "Admin" : "Job Seeker"}
                        </p>
                      </div>
                      <DropdownMenuSeparator className="dark:bg-white/10" />
                      <DropdownMenuItem asChild className="rounded-xl p-2.5 focus:bg-teal-500/10 focus:text-teal-500 cursor-pointer font-semibold">
                        <Link href={dashboardHref} className="flex items-center gap-2 w-full">
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
        {openSearch && (
          <SearchModal open={openSearch} setOpen={setOpenSearch} role={role} />
        )}
      </AnimatePresence>
    </>
  );
}
