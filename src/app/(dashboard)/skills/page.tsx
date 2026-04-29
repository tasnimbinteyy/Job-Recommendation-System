"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Check, X, Loader2, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Skill {
  id: string;
  name: string;
  category: string;
  createdAt: string;
}

const CATEGORIES = ["General", "Frontend", "Backend", "DevOps", "Data Science", "Design", "Mobile", "Other"];

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Add form state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [adding, setAdding] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setSkills(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, category: newCategory }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add skill");
      setSkills((prev) => [...prev, json.data].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)));
      setNewName("");
      setNewCategory("General");
      toast.success(`"${json.data.name}" added successfully!`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, category: editCategory }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update skill");
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? json.data : s))
          .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
      );
      setEditingId(null);
      toast.success("Skill updated successfully!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete skill");
      setSkills((prev) => prev.filter((s) => s.id !== id));
      toast.success(`"${name}" deleted.`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Skills <span className="text-teal-600 dark:text-teal-400 font-light">Library</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-[0.1em] mt-2">
              {skills.length} SKILLS ACROSS {Object.keys(grouped).length} CATEGORIES
            </p>
          </div>
        </div>

        {/* Add Skill Form */}
        <div className="bg-white dark:bg-[#0B0F19]/50 border border-slate-200 dark:border-white/5 rounded-2xl p-6 mb-8 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
            Add New Skill
          </p>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Skill name (e.g. React, Python...)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-[2] border-slate-200 dark:border-white/10 focus-visible:ring-teal-500"
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 rounded-md border border-slate-200 dark:border-white/10 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-[#020617]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Button
              type="submit"
              disabled={adding || !newName.trim()}
              className="bg-teal-600 hover:bg-teal-700 text-white font-black px-6 rounded-xl disabled:opacity-60"
            >
              {adding ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} className="mr-1" /> Add</>}
            </Button>
          </form>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <div className="relative flex items-center bg-white dark:bg-[#0B0F19]/50 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden h-14">
            <div className="flex items-center justify-center px-5 text-slate-400">
              <Search size={18} />
            </div>
            <Input
              placeholder="Search skills or categories..."
              className="border-none bg-transparent focus-visible:ring-0 h-full w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Skills Table */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-teal-500" size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 dark:text-slate-500 font-medium">
            {searchQuery ? `No skills found for "${searchQuery}".` : "No skills yet. Add the first one above!"}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([category, categorySkills]) => (
              <div key={category} className="bg-white dark:bg-[#0B0F19]/30 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                {/* Category Header */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/5 flex items-center gap-2">
                  <Tag size={14} className="text-teal-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {category}
                  </span>
                  <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
                    {categorySkills.length}
                  </span>
                </div>

                {/* Skills rows */}
                <table className="w-full border-collapse">
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {categorySkills.map((skill) => (
                      <tr key={skill.id} className="group hover:bg-teal-50 dark:hover:bg-teal-500/5 transition-all">
                        <td className="px-6 py-4">
                          {editingId === skill.id ? (
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="h-8 text-sm border-teal-500/30 focus-visible:ring-teal-500 max-w-xs"
                              autoFocus
                            />
                          ) : (
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          {editingId === skill.id ? (
                            <select
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="rounded-md border border-teal-500/30 bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-[#020617]"
                            >
                              {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-md border border-teal-100 dark:border-teal-500/20">
                              {skill.category}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-30 group-hover:opacity-100 transition-all">
                            {editingId === skill.id ? (
                              <>
                                <button
                                  onClick={() => handleEdit(skill.id)}
                                  disabled={saving}
                                  className="p-2 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all"
                                  title="Save"
                                >
                                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                  title="Cancel"
                                >
                                  <X size={15} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingId(skill.id);
                                    setEditName(skill.name);
                                    setEditCategory(skill.category);
                                  }}
                                  className="p-2 rounded-lg text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:bg-white dark:hover:bg-white/5"
                                  title="Edit"
                                >
                                  <Edit size={15} />
                                </button>
                                <button
                                  onClick={() => handleDelete(skill.id, skill.name)}
                                  disabled={deletingId === skill.id}
                                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 transition-all hover:bg-white dark:hover:bg-white/5 disabled:opacity-40"
                                  title="Delete"
                                >
                                  {deletingId === skill.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
