"use client";

import { useState } from "react";

import AppSidebar from "@/components/layout/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // সাইডবার ওপেন বা ক্লোজ করার জন্য গ্লোবাল স্টেট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-[#020617] overflow-hidden">
      {/* ১. সাইডবারে state পাস করছি */}
      <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}