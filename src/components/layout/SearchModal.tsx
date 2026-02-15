"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Briefcase, Building, LayoutDashboard } from "lucide-react";

export function SearchModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  // Ctrl + K শর্টকাট লজিক
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 pt-28 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-2xl transition-all" onClick={(e) => e.stopPropagation()}>
        <Command className="flex flex-col">
          <div className="flex items-center border-b border-white/5 px-4">
            <Search className="mr-2 h-4 w-4 text-slate-500" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 text-white"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">No results found.</Command.Empty>
            
            <Command.Group heading="Suggestions" className="px-2 py-1.5 text-xs font-semibold text-teal-500 uppercase tracking-wider">
              <Command.Item className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 text-slate-300">
                <Briefcase size={16} /> Browse All Jobs
              </Command.Item>
              <Command.Item className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 text-slate-300">
                <LayoutDashboard size={16} /> Go to Dashboard
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="mt-2 px-2 py-1.5 text-xs font-semibold text-teal-500 uppercase tracking-wider">
              <Command.Item className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-white/5 text-slate-300">
                <Building size={16} /> View Companies
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}