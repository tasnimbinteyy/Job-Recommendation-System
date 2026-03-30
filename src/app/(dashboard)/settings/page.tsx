// src/app/(dashboard)/settings/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { IconSettings, IconBell, IconLock, IconRobot } from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          App <span className="text-teal-500">Settings</span>
        </h1>
      </div>

      <div className="grid gap-6">
        {/* AI Agent Control */}
        <Card className="bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2">
              <IconRobot className="text-teal-500" /> AI Agent Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Auto-Apply Mode</Label>
                <p className="text-xs text-slate-500">Let AI apply to jobs that match 95% of your DNA.</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Salary Negotiation AI</Label>
                <p className="text-xs text-slate-500">AI will suggest the best range during applications.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="bg-white dark:bg-[#0B0F19] border-slate-200 dark:border-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-md flex items-center gap-2">
              <IconLock className="text-teal-500" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-slate-200 dark:border-white/10 hover:bg-red-500/10 hover:text-red-500 font-bold">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}