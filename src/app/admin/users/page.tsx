"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Users, ShieldCheck, GraduationCap, Building2 } from "lucide-react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "STUDENT" | "EMPLOYER" | "ADMIN";
  onboarded: boolean;
  createdAt: string;
  _count: { applications: number; jobsPosted: number };
};

const roleConfig = {
  STUDENT: { label: "Student", icon: GraduationCap, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
  EMPLOYER: { label: "Employer", icon: Building2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  ADMIN: { label: "Admin", icon: ShieldCheck, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((res) => setUsers(res.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: string, role: string) => {
    setUpdatingId(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: role as User["role"] } : u));
      toast.success(`Role updated to ${role}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Users size={24} className="text-rose-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            {loading ? "Loading..." : `${users.length} total users`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-teal-500" size={36} /></div>
      ) : (
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Activity</th>
                <th className="text-left px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {users.map((user) => {
                const cfg = roleConfig[user.role];
                const Icon = cfg.icon;
                return (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                          alt={user.name || ""}
                          className="h-9 w-9 rounded-full flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name || "—"}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${cfg.bg} ${cfg.color}`}>
                        <Icon size={11} /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">{user._count.applications}</span> apps ·{" "}
                      <span className="font-semibold">{user._count.jobsPosted}</span> jobs
                    </td>
                    <td className="px-6 py-4">
                      {updatingId === user.id ? (
                        <Loader2 size={16} className="animate-spin text-teal-500" />
                      ) : session?.user?.id === user.id ? (
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-600 px-3 py-2">You</span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="text-xs font-bold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="STUDENT">Student</option>
                          <option value="EMPLOYER">Employer</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
