"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { IconUserCircle, IconChartBar } from "@tabler/icons-react";
import { Edit2, Check, X, Loader2, Plus, Trash2, TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface ResumeScore {
  score: number;
  skillCount: number;
  demandedSkillCount: number;
  missingSkills: string[];
  feedback: { type: "success" | "warning" | "info"; message: string }[];
}

interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  skills: string[];
  experience: string | null;
  role: string;
  _count: { applications: number };
}

const SKILL_CATEGORIES = ["Frontend", "Backend", "DevOps", "Data Science", "Design", "Mobile"];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Skills edit state
  const [editingSkills, setEditingSkills] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");
  const [savingSkills, setSavingSkills] = useState(false);

  // Experience edit state
  const [editingExp, setEditingExp] = useState(false);
  const [expInput, setExpInput] = useState("");
  const [savingExp, setSavingExp] = useState(false);
  const [resumeScore, setResumeScore] = useState<ResumeScore | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/candidates/${session.user.id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setProfile(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));

    // Fetch resume score
    setScoreLoading(true);
    fetch("/api/resume-score")
      .then((r) => r.json())
      .then((json) => { if (json.data) setResumeScore(json.data); })
      .catch(() => {})
      .finally(() => setScoreLoading(false));
  }, [session]);

  const handleSaveSkills = async () => {
    if (!session?.user?.id) return;
    setSavingSkills(true);
    try {
      const res = await fetch(`/api/candidates/${session.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsInput }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update skills");
      setProfile((prev) => prev ? { ...prev, skills: json.data.skills } : prev);
      setEditingSkills(false);
      toast.success("Skills updated!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingSkills(false);
    }
  };

  const handleSaveExperience = async () => {
    if (!session?.user?.id) return;
    setSavingExp(true);
    try {
      const res = await fetch(`/api/candidates/${session.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: expInput }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update experience");
      setProfile((prev) => prev ? { ...prev, experience: json.data.experience } : prev);
      setEditingExp(false);
      toast.success("Experience updated!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSavingExp(false);
    }
  };

  // Build radar chart data from skill categories
  const radarData = SKILL_CATEGORIES.map((cat) => {
    const catSkills = profile?.skills.filter((s) =>
      cat === "Frontend" ? ["react", "next", "vue", "angular", "html", "css", "typescript", "javascript", "tailwind"].some((k) => s.toLowerCase().includes(k)) :
      cat === "Backend" ? ["node", "express", "django", "flask", "spring", "laravel", "php", "ruby", "go", "rust", "java", "python", "postgresql", "mysql", "mongodb"].some((k) => s.toLowerCase().includes(k)) :
      cat === "DevOps" ? ["docker", "kubernetes", "aws", "gcp", "azure", "ci/cd", "terraform", "linux", "nginx"].some((k) => s.toLowerCase().includes(k)) :
      cat === "Data Science" ? ["python", "tensorflow", "pytorch", "pandas", "numpy", "ml", "ai", "data", "sql", "tableau"].some((k) => s.toLowerCase().includes(k)) :
      cat === "Design" ? ["figma", "ui", "ux", "sketch", "adobe", "design", "photoshop"].some((k) => s.toLowerCase().includes(k)) :
      cat === "Mobile" ? ["react native", "flutter", "swift", "kotlin", "android", "ios", "mobile"].some((k) => s.toLowerCase().includes(k)) :
      false
    ) ?? [];
    return { subject: cat, value: Math.min(catSkills.length * 25, 100), fullMark: 100 };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-teal-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          Career <span className="text-teal-500">DNA</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium">Your professional identity — keep it updated for better matches.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 p-1 mb-4">
              <div className="h-full w-full rounded-full bg-white dark:bg-[#0B0F19] flex items-center justify-center overflow-hidden">
                {profile?.image ? (
                  <img src={profile.image} alt="avatar" className="h-full w-full object-cover rounded-full" />
                ) : (
                  <IconUserCircle size={60} className="text-slate-300" />
                )}
              </div>
            </div>
            <h2 className="text-xl font-bold dark:text-white">{profile?.name ?? "Anonymous"}</h2>
            <p className="text-xs text-slate-400 mt-1">{profile?.email}</p>
            <Badge className="mt-2 bg-teal-500/10 text-teal-500 border-none uppercase text-[10px] tracking-widest font-bold">
              {profile?.role ?? "STUDENT"}
            </Badge>

            <div className="mt-6 w-full grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{profile?.skills.length ?? 0}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Skills</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{profile?._count?.applications ?? 0}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Applied</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mt-6 w-full text-left">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</p>
                {!editingExp ? (
                  <button
                    onClick={() => { setEditingExp(true); setExpInput(profile?.experience ?? ""); }}
                    className="p-1 rounded text-slate-400 hover:text-teal-500 transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button onClick={handleSaveExperience} disabled={savingExp} className="p-1 rounded text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/10">
                      {savingExp ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                    </button>
                    <button onClick={() => setEditingExp(false)} className="p-1 rounded text-slate-400 hover:text-red-500">
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>
              {editingExp ? (
                <textarea
                  value={expInput}
                  onChange={(e) => setExpInput(e.target.value)}
                  rows={3}
                  placeholder="e.g. 2 years React, 1 year Node.js..."
                  className="w-full rounded-lg border border-teal-500/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none dark:bg-[#020617]"
                  autoFocus
                />
              ) : (
                <p className="text-sm text-slate-500 leading-relaxed">
                  {profile?.experience ?? <span className="italic text-slate-400">No experience added yet.</span>}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Skills Card */}
          <Card className="bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <IconChartBar className="text-teal-500" size={18} /> My Skills
                </CardTitle>
                {!editingSkills ? (
                  <button
                    onClick={() => { setEditingSkills(true); setSkillsInput(profile?.skills.join(", ") ?? ""); }}
                    className="flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:text-teal-600 transition-colors"
                  >
                    <Edit2 size={13} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSaveSkills} disabled={savingSkills} className="flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:text-teal-600">
                      {savingSkills ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Save
                    </button>
                    <button onClick={() => setEditingSkills(false)} className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-red-500">
                      <X size={13} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editingSkills ? (
                <div className="space-y-2">
                  <Input
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="React, Node.js, Python, Docker... (comma-separated)"
                    className="border-teal-500/30 focus-visible:ring-teal-500"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400">Separate skills with commas. These are used for AI job matching.</p>
                </div>
              ) : profile?.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-[11px] font-bold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-lg border border-teal-100 dark:border-teal-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No skills added yet. Click Edit to add your skills.</p>
              )}
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <IconChartBar className="text-teal-500" size={18} /> Skill Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              {profile?.skills && profile.skills.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Radar name="Skills" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  Add skills to see your skill matrix.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resume Score Card */}
          <Card className="bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="text-teal-500" size={18} /> Resume Score & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scoreLoading ? (
                <div className="flex justify-center py-6"><Loader2 className="animate-spin text-teal-500" size={24} /></div>
              ) : resumeScore ? (
                <div className="space-y-5">
                  {/* Score bar */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <svg className="h-full w-full -rotate-90">
                        <circle cx="40" cy="40" r="34" fill="transparent" stroke="#e2e8f0" strokeWidth="8"
                  className="dark:[stroke:#ffffff08]" />
                        <circle cx="40" cy="40" r="34" fill="transparent" stroke="#14b8a6" strokeWidth="8"
                          strokeDasharray="214"
                          strokeDashoffset={214 - (214 * resumeScore.score) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-black text-slate-900 dark:text-white">{resumeScore.score}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2 mb-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${resumeScore.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {resumeScore.score >= 80 ? "Excellent profile" : resumeScore.score >= 60 ? "Good profile" : resumeScore.score >= 40 ? "Average profile" : "Needs improvement"}
                      </p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="space-y-2">
                    {resumeScore.feedback.map((fb, i) => (
                      <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-xs font-medium ${
                        fb.type === "success" ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400" :
                        fb.type === "warning" ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400" :
                        "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      }`}>
                        {fb.type === "success" ? <CheckCircle size={14} className="flex-shrink-0 mt-0.5" /> :
                         fb.type === "warning" ? <AlertCircle size={14} className="flex-shrink-0 mt-0.5" /> :
                         <Info size={14} className="flex-shrink-0 mt-0.5" />}
                        {fb.message}
                      </div>
                    ))}
                  </div>

                  {/* Missing skills */}
                  {resumeScore.missingSkills.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Top In-Demand Skills You're Missing:</p>
                      <div className="flex flex-wrap gap-2">
                        {resumeScore.missingSkills.map((skill) => (
                          <span key={skill} className="px-2 py-1 text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Could not load resume score.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
