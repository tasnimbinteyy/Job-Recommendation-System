"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JobForm, { type JobFormData } from "@/components/jobs/JobForm";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Job } from "@/types";

export default function EditJobPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setJob(json.data);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update job");
      toast.success("Job updated successfully!");
      router.push("/jobs");
    } catch (err: any) {
      toast.error(err.message);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#04070D]">
        <Loader2 className="animate-spin text-teal-500" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#04070D] transition-colors duration-500 pt-32 pb-20 relative">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <Link
          href="/jobs"
          className="group inline-flex items-center text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 mb-10 gap-3 transition-all font-semibold text-sm"
        >
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
            <ArrowLeft size={18} />
          </div>
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-10">
          Edit <span className="text-teal-500">Listing</span>
        </h1>

        {job && (
          <div className="bg-white dark:bg-[#0B0F19] rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 p-8 md:p-14">
            <JobForm
              initialData={{
                title: job.title,
                description: job.description,
                companyName: job.companyName,
                location: job.location,
                salaryRange: job.salaryRange ?? "",
                requiredSkills: job.requiredSkills.join(", "),
              }}
              onSubmit={handleUpdate}
              buttonText="Save Changes"
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
