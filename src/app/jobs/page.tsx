"use client";

import { useState } from "react";
import Link from "next/link";

// Define an interface for the Job object to ensure type safety during build
interface Job {
  id: string;
  title: string;
  match: string;
  skills: string;
  status: string;
}

export default function JobsPage() {
  // Initialize state with dummy data for the Database View
  const [jobs, setJobs] = useState<Job[]>([
    { id: "J-001", title: "ML Developer", match: "98%", skills: "Python, PyTorch", status: "Active" },
    { id: "J-002", title: "Frontend Specialist", match: "85%", skills: "Next.js, Tailwind", status: "Closed" },
    { id: "J-003", title: "Data Analyst", match: "72%", skills: "SQL, Tableau", status: "Active" },
  ]);

  const [search, setSearch] = useState("");

  // Logic to filter jobs based on Job ID, Title, or Skills
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.toLowerCase().includes(search.toLowerCase()) ||
      job.id.toLowerCase().includes(search.toLowerCase())
  );

  // Handler to delete a job record from the state
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  // Handler for the edit button (Placeholder for navigation)
  const handleEdit = (job: Job) => {
    alert(`Redirecting to edit form for: ${job.title}`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen text-white dark:text-white">
      {/* Header Section with Title and Add Button */}
      <div className="flex justify-between items-center mb-6 pt-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          AI Job Oversight
        </h1>
        <Link
          href="/jobs/add"
          className="bg-teal-400 text-black px-4 py-2 rounded-md font-medium hover:bg-teal-300 transition"
        >
          + Add New Job
        </Link>
      </div>

      {/* Search Input Field with responsive styling */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Job ID, Title or Skills..."
          className="w-full p-2 rounded-md border border-gray-400 text-black dark:bg-[#0f172a] dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Database Table View */}
      <div className="dark:bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50 dark:text-gray-400 border-b border-gray-800">
                <th className="p-4 font-semibold text-xs uppercase tracking-wider">Job ID</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider">Position</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-teal-400">AI Match</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-800/30 transition group">
                    <td className="p-4 font-mono text-gray-500">{job.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-200">{job.title}</div>
                      <div className="text-xs text-gray-500">{job.skills}</div>
                    </td>
                    <td className="p-4 font-bold text-cyan-500">{job.match}</td>
                    <td className="p-4 space-x-4">
                      <button
                        className="text-green-500 hover:text-green-400 font-medium text-sm transition-colors"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-400 font-medium text-sm transition-colors"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Displayed when no search results are found */
                <tr>
                  <td colSpan={4} className="text-center p-8 text-gray-500 dark:text-gray-400">
                    No jobs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Console Footer */}
      <p className="mt-8 text-xs text-gray-600 dark:text-gray-400 uppercase tracking-widest text-center italic">
        Global AI Privileges Active for Current Session
      </p>
    </div>
  );
}