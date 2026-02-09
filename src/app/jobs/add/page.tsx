"use client";

import JobForm from "@/components/jobs/JobForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddJobPage() {
  const router = useRouter();

  const handleCreate = (data: any) => {
    // 1. Retrieve previously saved jobs from localStorage
    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    // 2. Add new job data with a unique ID and a random AI match percentage
    const newJob = {
      ...data,
      id: `J-00${existingJobs.length + 1}`,
      match: `${Math.floor(Math.random() * 40) + 60}%`,
    };

    const updatedJobs = [...existingJobs, newJob];

    // 3. Save the updated job list back to localStorage
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    alert("Job Posted Successfully!");
    router.push("/jobs"); // Redirects to the job management table
  };

  return (
    <div className="min-h-screen bg-background text-foreground container mx-auto px-4 py-10 max-w-2xl">
      <Link
        href="/jobs"
        className="inline-flex items-center text-teal-500 hover:text-teal-600 mb-6 gap-2 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Management
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Listing</h1>
        <p className="text-muted-foreground">
          Fill in the details to post a new job opportunity.
        </p>
      </div>

      <JobForm onSubmit={handleCreate} buttonText="Publish Job Posting" />
    </div>
  );
}
