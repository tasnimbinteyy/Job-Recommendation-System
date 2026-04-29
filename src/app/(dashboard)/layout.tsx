"use client";

import { useState } from "react";
import AppSidebar from "@/components/layout/AppSidebar";
import NotificationBell from "@/components/notifications/NotificationBell";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role ?? "STUDENT";

  return (
    <div className="flex h-screen w-full bg-white dark:bg-[#020617] overflow-hidden">
      <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar with notification bell — only for STUDENT */}
        {role === "STUDENT" && (
          <div className="flex items-center justify-end px-6 py-3 border-b border-slate-100 dark:border-white/5 flex-shrink-0">
            <NotificationBell />
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
