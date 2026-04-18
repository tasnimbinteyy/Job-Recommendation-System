"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Users, Briefcase, ChevronDown, ChevronUp, Loader2, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import type { Candidate } from "@/types";

interface CandidateWithApps extends Candidate {
  applications?: {
    id: string;
    status: string;
    matchScore: number | null;
    job: { id: string; title: string; companyName: string; requiredSkills: string[] };
  }[];
}

export default function CandidatesPage() {
  const { data: session } = useSession();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedData, setExpandedData] = useState<CandidateWithApps | null>(null);
  const [expandLoading, setExpandLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSkills, setEditSkills] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/candidates")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setCandidates(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setExpandedData(null);
      return;
    }
    setExpandedId(id);
    setExpandLoading(true);
    try {
      const res = await fetch(`/api/candidates/${id}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setExpandedData(json.data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setExpandLoading(false);
    }
  };

  const handleSaveSkills = async (id: string) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: editSkills }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update");
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, skills: json.data.skills } : c))
      );
      if (expandedData?.id === id) {
        setExpandedData((prev) => prev ? { ...prev, skills: json.data.skills } : prev);
      }
      toast.success("Skills updated successfully!");
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const filtered = candidates.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl pt-10 pb-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Candidate <span className="text-teal-600 dark:text-teal-400 font-light">Pool</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-[0.1em] mt-2">
              OVERVIEW: {candidates.length} REGISTERED CANDIDATES
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-10 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-[#0B0F19]/50 shadow-sm">
          {[
            { label: "Total Candidates", value: candidates.length, icon: <Users size={16} /> },
            { label: "With Skills Listed", value: candidates.filter((c) => c.skills.length > 0).length, icon: <Check size={16} /> },
            { label: "Total Applications", value: candidates.reduce((a, c) => a + (c._count?.applications ?? 0), 0), icon: <Briefcase size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 border-r border-slate-200 dark:border-white/5 last:border-r-0 hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-teal-600 dark:text-teal-500">{stat.icon}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
              </div>
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <div className="relative flex items-center bg-white dark:bg-[#0B0F19]/50 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden h-16">
            <div className="flex items-center justify-center px-6 text-slate-400 dark:text-slate-500">
              <Search size={20} />
            </div>
            <Input
              placeholder="Search by name, email, or skill..."
              className="border-none bg-transparent focus-visible:ring-0 text-base h-full w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#0B0F19]/30 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Candidate</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] hidden md:table-cell">Skills</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-center hidden lg:table-cell">Applications</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <Loader2 className="mx-auto animate-spin text-teal-500" size={28} />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                filtered.map((candidate) => (
                  <>
                    <tr
                      key={candidate.id}
                      className="group hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-all"
                    >
                      {/* Candidate Info */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 p-[1.5px] flex-shrink-0">
                            <div className="h-full w-full rounded-full bg-white dark:bg-[#020617] overflow-hidden flex items-center justify-center">
                              {candidate.image ? (
                                <img src={candidate.image} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <Users size={16} className="text-teal-500" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100">
                              {candidate.name ?? "Anonymous"}
                            </div>
                            <div className="text-[11px] text-slate-400">{candidate.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Skills */}
                      <td className="px-8 py-5 hidden md:table-cell">
                        {editingId === candidate.id ? (
                          <Input
                            value={editSkills}
                            onChange={(e) => setEditSkills(e.target.value)}
                            placeholder="React, Node.js, Python..."
                            className="h-8 text-xs border-teal-500/30 focus-visible:ring-teal-500 max-w-xs"
                            autoFocus
                          />
                        ) : candidate.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 4).map((skill) => (
                              <span key={skill} className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-md border border-teal-100 dark:border-teal-500/20">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 4 && (
                              <span className="px-2 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 rounded-md">
                                +{candidate.skills.length - 4}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No skills listed</span>
                        )}
                      </td>

                      {/* Applications count */}
                      <td className="px-8 py-5 text-center hidden lg:table-cell">
                        <span className="text-lg font-black text-slate-700 dark:text-slate-300">
                          {candidate._count?.applications ?? 0}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {editingId === candidate.id ? (
                            <>
                              <button
                                onClick={() => handleSaveSkills(candidate.id)}
                                disabled={savingId === candidate.id}
                                className="p-2 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all"
                                title="Save"
                              >
                                {savingId === candidate.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              {/* Only show edit if it's the current user */}
                              {session?.user?.id === candidate.id && (
                                <button
                                  onClick={() => {
                                    setEditingId(candidate.id);
                                    setEditSkills(candidate.skills.join(", "));
                                  }}
                                  className="p-2 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:bg-white dark:hover:bg-white/5"
                                  title="Edit Skills"
                                >
                                  <Edit2 size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => handleExpand(candidate.id)}
                                className="p-2 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:bg-white dark:hover:bg-white/5"
                                title="View Details"
                              >
                                {expandedId === candidate.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Row — Skill Gap Analysis */}
                    {expandedId === candidate.id && (
                      <tr key={`${candidate.id}-expanded`} className="bg-slate-50 dark:bg-black/10">
                        <td colSpan={4} className="px-8 py-6">
                          {expandLoading ? (
                            <div className="flex justify-center py-4">
                              <Loader2 className="animate-spin text-teal-500" size={22} />
                            </div>
                          ) : expandedData ? (
                            <div className="space-y-4">
                              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">
                                Skill Gap Analysis
                              </p>
                              {expandedData.applications && expandedData.applications.length > 0 ? (
                                <div className="grid gap-3">
                                  {expandedData.applications.map((app) => {
                                    const candidateSkillsLower = expandedData.skills.map((s) => s.toLowerCase());
                                    const gap = app.job.requiredSkills.filter(
                                      (s) => !candidateSkillsLower.includes(s.toLowerCase())
                                    );
                                    return (
                                      <div key={app.id} className="p-4 rounded-xl bg-white dark:bg-[#0B0F19]/60 border border-slate-200 dark:border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                          <div>
                                            <span className="font-bold text-sm text-slate-900 dark:text-white">{app.job.title}</span>
                                            <span className="text-slate-400 text-xs ml-2">@ {app.job.companyName}</span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            {app.matchScore != null && (
                                              <span className="text-[11px] font-black text-teal-500 bg-teal-500/10 px-2 py-1 rounded-full border border-teal-500/20">
                                                {app.matchScore}% match
                                              </span>
                                            )}
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${
                                              app.status === "ACCEPTED" ? "bg-teal-500/10 text-teal-500 border-teal-500/20" :
                                              app.status === "REJECTED" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                              app.status === "IN_REVIEW" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                              "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                            }`}>
                                              {app.status}
                                            </span>
                                          </div>
                                        </div>
                                        {gap.length > 0 ? (
                                          <div>
                                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">
                                              Missing Skills ({gap.length}):
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                              {gap.map((skill) => (
                                                <span key={skill} className="px-2 py-0.5 text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-md border border-red-100 dark:border-red-500/20">
                                                  {skill}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-[11px] text-teal-500 font-bold">✓ All required skills matched</p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="text-sm text-slate-400 italic">No applications yet.</p>
                              )}
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
