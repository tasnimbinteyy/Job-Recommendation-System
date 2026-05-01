"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, Briefcase, FileText, Code2, LogOut, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "ADMIN") {
      router.replace("/overview");
    }
  }, [session, status, router]);

  if (status === "loading") return null;
  if (session?.user?.role !== "ADMIN") return null;

  return (
    <div className="flex h-screen bg-white dark:bg-[#020617] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617]">
        {/* Logo */}
        <div className="px-6 py-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">Admin Panel</p>
              <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">JobAI Control</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  isActive
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-6 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`}
                alt="avatar"
                className="h-9 w-9 rounded-full flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session?.user?.name}</p>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-wider">Admin</p>
              </div>
            </div>
            <button onClick={() => signOut()} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
