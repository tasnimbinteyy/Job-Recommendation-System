"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Read data from LocalStorage
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    
    // if localstorage is empty, then folowing data will be shown
    if (savedJobs.length === 0) {
      const defaultJobs = [
        { id: "J-001", title: "ML Developer", location: "Remote", match: "98%" },
        { id: "J-002", title: "Frontend Engineer", location: "Dhaka", match: "85%" },
        { id: "J-003", title: "Backend Developer", location: "Hybrid", match: "90%" },
        { id: "J-004", title: "Data Analyst", location: "Remote", match: "88%" },
      ];
      setJobs(defaultJobs);
      localStorage.setItem("jobs", JSON.stringify(defaultJobs));
    } else {
      setJobs(savedJobs);
    }
  }, []);

  // Delete Funtionality
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    }
  };

  //Search Filter Logic
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Manage Jobs
            </h1>
            <p className="text-muted-foreground">
              Add, edit or remove job listings from the system.
            </p>
          </div>
          <Link href="/jobs/add">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white gap-2 shadow-teal-500/20 shadow-lg transition-all active:scale-95">
              <Plus size={18} /> Add New Job
            </Button>
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search by Job ID, Title or Skills..." 
            className="pl-10 border-teal-500/20 focus-visible:ring-teal-500 bg-white dark:bg-slate-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Responsive Table Container */}
        <div className="relative overflow-x-auto rounded-xl border border-teal-500/20 bg-white dark:bg-slate-950 shadow-sm transition-all">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-teal-600 dark:text-teal-400 border-b border-teal-500/10">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Job ID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Position</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider">AI Match</th>
                <th className="px-6 py-4 font-semibold text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-teal-500/5">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                    <tr key={`${job.id}-${index}`} className="...">
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground group-hover:text-teal-500">
                      {job.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {job.title}
                      </div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                      {job.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20">
                        {job.match}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-teal-500 hover:text-teal-600 p-2 rounded-md hover:bg-teal-500/10 transition-all">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="text-destructive hover:text-red-600 p-2 rounded-md hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No jobs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <p className="mt-4 text-center text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
          Global AI Privileges Active for Current Session
        </p>
      </div>
    </div>
  );
}