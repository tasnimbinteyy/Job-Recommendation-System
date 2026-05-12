"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  User, Palette, ShieldCheck, Eye, LogOut, Trash2,
  Sun, Moon, Monitor, Check, Loader2, Github, Chrome,
  Building2, BadgeCheck, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const THEMES = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

// Sections per role
const STUDENT_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: ShieldCheck },
  { id: "privacy", label: "Privacy", icon: Eye },
];

const EMPLOYER_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: ShieldCheck },
];

const ADMIN_SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "account", label: "Account", icon: ShieldCheck },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const role: string = session?.user?.role ?? "STUDENT";

  const sections =
    role === "EMPLOYER" ? EMPLOYER_SECTIONS :
    role === "ADMIN" ? ADMIN_SECTIONS :
    STUDENT_SECTIONS;

  const [activeSection, setActiveSection] = useState("profile");

  // Profile
  const [name, setName] = useState("");
  const [savingName, setSavingName] = useState(false);

  // Company (Employer only) — stored in experience field
  const [companyInfo, setCompanyInfo] = useState("");
  const [savingCompany, setSavingCompany] = useState(false);

  // Danger zone
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  // Fetch company info for employer
  useEffect(() => {
    if (role !== "EMPLOYER" || !session?.user?.id) return;
    fetch(`/api/candidates/${session.user.id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.data?.experience) setCompanyInfo(res.data.experience);
      })
      .catch(() => {});
  }, [role, session?.user?.id]);

  const handleSaveName = async () => {
    if (!name.trim() || !session?.user?.id) return;
    setSavingName(true);
    try {
      const res = await fetch(`/api/candidates/${session.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) throw new Error();
      toast.success("Display name updated!");
    } catch {
      toast.error("Failed to update name");
    } finally {
      setSavingName(false);
    }
  };

  const handleSaveCompany = async () => {
    if (!session?.user?.id) return;
    setSavingCompany(true);
    try {
      const res = await fetch(`/api/candidates/${session.user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: companyInfo }),
      });
      if (!res.ok) throw new Error();
      toast.success("Company info updated!");
    } catch {
      toast.error("Failed to update company info");
    } finally {
      setSavingCompany(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account");
      toast.success("Account deleted successfully.");
      await signOut({ callbackUrl: "/" });
    } catch {
      toast.error("Failed to delete account. Please try again.");
      setDeleting(false);
    }
  };

  const roleBadge =
    role === "EMPLOYER" ? { label: "Employer", color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" } :
    role === "ADMIN" ? { label: "Admin", color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" } :
    { label: "Job Seeker", color: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20" };

  return (
    <div className="max-w-5xl space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            App <span className="text-teal-500">Settings</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Manage your account, appearance, and preferences.
          </p>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${roleBadge.color}`}>
          {roleBadge.label}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Main Content */}
        <div className="flex-1 space-y-5">

          {/* ── PROFILE (all roles) ── */}
          {activeSection === "profile" && (
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                  <User size={16} className="text-teal-500" /> Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 p-[2px] flex-shrink-0">
                    <div className="h-full w-full rounded-2xl bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center">
                      {session?.user?.image ? (
                        <img src={session.user.image} alt="avatar" className="h-full w-full object-cover" />
                      ) : (
                        <User size={32} className="text-slate-300" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{session?.user?.name}</p>
                      <BadgeCheck size={14} className="text-teal-500" />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{session?.user?.email}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Profile picture is managed by your OAuth provider
                    </p>
                  </div>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Display Name
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your display name"
                      className="border-slate-200 dark:border-white/10 focus-visible:ring-teal-500"
                    />
                    <Button
                      onClick={handleSaveName}
                      disabled={savingName || !name.trim()}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 flex-shrink-0"
                    >
                      {savingName ? <Loader2 size={16} className="animate-spin" /> : "Save"}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">
                    {role === "EMPLOYER"
                      ? "This name appears on your job postings and applicant views."
                      : role === "ADMIN"
                      ? "This name appears in the admin panel."
                      : "This name is shown across your profile and applications."}
                  </p>
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Email Address
                  </Label>
                  <Input
                    value={session?.user?.email ?? ""}
                    readOnly
                    className="border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400">
                    Email is managed by your OAuth provider and cannot be changed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── COMPANY (Employer only) ── */}
          {activeSection === "company" && role === "EMPLOYER" && (
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                  <Building2 size={16} className="text-blue-500" /> Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    This information is shown to candidates when they view your job postings.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Company Description
                  </Label>
                  <textarea
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                    rows={4}
                    placeholder="e.g. We are a fast-growing fintech startup based in Dhaka, building the future of digital payments..."
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-400">
                    Describe your company, culture, and what makes it a great place to work.
                  </p>
                </div>

                <Button
                  onClick={handleSaveCompany}
                  disabled={savingCompany}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8"
                >
                  {savingCompany ? <Loader2 size={16} className="animate-spin" /> : "Save Company Info"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── APPEARANCE (all roles) ── */}
          {activeSection === "appearance" && (
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                  <Palette size={16} className="text-teal-500" /> Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Theme
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {THEMES.map((t) => {
                    const Icon = t.icon;
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); toast.success(`Theme set to ${t.label}`); }}
                        className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 ${
                          isActive
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-slate-200 dark:border-white/10 hover:border-teal-500/40 bg-slate-50 dark:bg-white/5"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center">
                            <Check size={11} className="text-white" />
                          </div>
                        )}
                        <Icon size={24} className={isActive ? "text-teal-500" : "text-slate-400"} />
                        <span className={`text-xs font-black uppercase tracking-wider ${isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-500"}`}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400">
                  System theme follows your device's light/dark preference automatically.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── ACCOUNT (all roles) ── */}
          {activeSection === "account" && (
            <div className="space-y-5">
              {/* Connected Account */}
              <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                    <ShieldCheck size={16} className="text-teal-500" /> Connected Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                        <Github size={18} className="text-slate-700 dark:text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">OAuth Provider</p>
                        <p className="text-xs text-slate-400">{session?.user?.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                      Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Your account is secured via OAuth (Google/GitHub). No password is stored on our servers.
                  </p>
                </CardContent>
              </Card>

              {/* Sign Out */}
              <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                    <LogOut size={16} className="text-slate-400" /> Session
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Sign out from your current session on this device.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="border-slate-200 dark:border-white/10 font-bold hover:bg-slate-100 dark:hover:bg-white/5 gap-2"
                  >
                    <LogOut size={15} /> Sign Out
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone — not shown for ADMIN */}
              {role !== "ADMIN" && (
                <Card className="bg-white dark:bg-slate-900/40 border-red-200 dark:border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-red-500">
                      <Trash2 size={16} /> Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {role === "EMPLOYER"
                        ? "Permanently delete your employer account. All your job postings and applicant data will be removed."
                        : "Permanently delete your account. All your applications and profile data will be removed."}
                    </p>
                    {!deleteConfirm ? (
                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirm(true)}
                        className="border-red-200 dark:border-red-500/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold gap-2"
                      >
                        <Trash2 size={15} /> Delete Account
                      </Button>
                    ) : (
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">
                              This action is permanent and cannot be undone.
                            </p>
                            <p className="text-xs text-red-500/80 dark:text-red-400/70">
                              {role === "EMPLOYER"
                                ? "All your jobs, applications received, and account data will be permanently deleted."
                                : "All your applications, saved jobs, notifications, and account data will be permanently deleted."}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            Type your email to confirm: <span className="text-red-500 font-black">{session?.user?.email}</span>
                          </Label>
                          <Input
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            placeholder={session?.user?.email ?? ""}
                            className="border-red-200 dark:border-red-500/30 focus-visible:ring-red-500"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            disabled={deleteInput !== session?.user?.email || deleting}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold gap-2 disabled:opacity-40"
                            onClick={handleDeleteAccount}
                          >
                            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            {deleting ? "Deleting..." : "Permanently Delete"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                            className="font-bold"
                            disabled={deleting}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* ── PRIVACY (Student only) ── */}
          {activeSection === "privacy" && role === "STUDENT" && (
            <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                  <Eye size={16} className="text-teal-500" /> Privacy Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Coming Soon</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Granular privacy controls (public profile, resume score visibility) are planned for a future update.
                  </p>
                </div>
                {[
                  { label: "Public Profile", desc: "Allow employers to view your profile and skills in the candidates list." },
                  { label: "Show Resume Score", desc: "Display your AI resume score on your public profile." },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-white/5 opacity-40 cursor-not-allowed">
                    <div className="space-y-0.5 pr-8">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <Switch disabled checked={false} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Sidebar Nav */}
        <aside className="lg:w-52 flex-shrink-0">
          <div className="sticky top-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 mb-3">
              Settings
            </p>
            <nav className="flex flex-row lg:flex-col gap-1">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left ${
                      activeSection === s.id
                        ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
