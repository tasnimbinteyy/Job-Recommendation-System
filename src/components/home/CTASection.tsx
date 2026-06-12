"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Info, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function CTASection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { data: session } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const isStudent = session?.user?.role === "STUDENT";

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Only PDF files are accepted."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File size must be under 5MB."); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("cv", file);
      const res = await fetch("/api/cv-upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setUploaded(true);
      toast.success(`CV processed! Found ${json.extracted.skills.length} skills. Profile updated.`, { duration: 5000 });
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process CV");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    // এখানে FeaturedJobs এর মতো bg-slate-50 এবং dark:bg-[#020617] ব্যবহার করা হয়েছে
    <section className="py-10 px-6 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <div
        onMouseMove={handleMouseMove}
        className="group relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden min-h-[480px] flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-2xl"
      >
        {/* Background Image Layer - Opacity adjusted for dark theme consistency */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 opacity-100 dark:opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        {/* Overlays: dark:bg-[#020617] এর সাথে ব্লেন্ড করার জন্য আপডেট করা হয়েছে */}
        <div className="absolute inset-0 z-10 bg-transparent dark:bg-[#020617]/40 transition-colors" />
        
        {/* Gradient Overlay: FeaturedJobs এর মতো ডার্ক কালার ব্যবহার করা হয়েছে */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-[#020617] dark:via-[#020617]/60 dark:to-transparent" />

        {/* Aceternity Interactive Glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(20, 184, 166, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* Content Section */}
        <div className="relative z-30 w-full px-10 md:px-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest mb-6 shadow-xl shadow-teal-500/30">
              <Rocket className="h-3.5 w-3.5" /> Start Your Journey
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.9]">
              Elevate Your <br />
              <span className="bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent italic">
                Career.
              </span>
            </h2>

            <p className="text-slate-800 dark:text-slate-100 text-lg max-w-md font-bold leading-relaxed drop-shadow-sm">
              Join the elite circle of professionals using{" "}
              <span className="text-teal-600 dark:text-teal-300 font-extrabold">JobAI</span> to outpace the market.
            </p>
          </div>

          <div className="flex flex-col gap-5 max-w-sm ml-auto w-full">
            {isStudent ? (
              <>
                <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || uploaded}
                  className="h-16 bg-teal-500 hover:bg-teal-600 text-white text-xl font-black rounded-2xl transition-all flex items-center justify-between px-10 shadow-[0_10px_30px_rgba(20,184,166,0.4)] border-none group/btn disabled:opacity-80"
                >
                  {uploading ? "Extracting CV..." : uploaded ? "Profile Updated!" : "Upload CV"}
                  {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : uploaded ? <CheckCircle className="h-6 w-6" /> : <ArrowRight className="h-6 w-6 transition-transform group-hover/btn:translate-x-2" />}
                </Button>
              </>
            ) : session?.user ? (
              // Logged in but not student (Employer or Admin)
              <Button asChild className="h-16 bg-teal-500 hover:bg-teal-600 text-white text-xl font-black rounded-2xl transition-all flex items-center justify-between px-10 shadow-[0_10px_30px_rgba(20,184,166,0.4)] border-none group/btn">
                <Link href={session.user.role === "EMPLOYER" ? "/jobs" : "/admin"}>
                  {session.user.role === "EMPLOYER" ? "My Jobs" : "Admin Panel"}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </Button>
            ) : (
              // Not logged in
              <Button asChild className="h-16 bg-teal-500 hover:bg-teal-600 text-white text-xl font-black rounded-2xl transition-all flex items-center justify-between px-10 shadow-[0_10px_30px_rgba(20,184,166,0.4)] border-none group/btn">
                <Link href="/api/auth/signin">
                  Get Started Free
                  <ArrowRight className="h-6 w-6 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              className="h-16 border-white/30 bg-white/10 dark:bg-white/5 text-white hover:bg-white/20 text-lg font-bold rounded-2xl transition-all flex items-center justify-between px-10 backdrop-blur-md"
            >
              <Link href="/how-it-works">
                Learn More
                <Info className="h-5 w-5 opacity-80" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}