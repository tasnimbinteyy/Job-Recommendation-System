"use client";
import React from 'react';

export default function JobForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Job Posted Successfully! (Frontend V2 Demo)");
  };

  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        <div>
          <label className="block text-sm mb-1 text-gray-400">Job Title</label>
          <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 focus:border-cyan-500 outline-none transition" placeholder="e.g. AI Engineer" />
        </div>
        
        <div>
          <label className="block text-sm mb-1 text-gray-400">Required Skills</label>
          <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 focus:border-cyan-500 outline-none transition" placeholder="Python, NLP, React" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Company</label>
            <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-400">Salary</label>
            <input type="text" className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 outline-none" placeholder="$120k" />
          </div>
        </div>

        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-cyan-900/20">
          Upload to Database
        </button>
      </form>
    </div>
  );
}