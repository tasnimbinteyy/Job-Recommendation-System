"use client";

import JobForm from '@/components/jobs/JobForm';
import Link from 'next/link';

export default function AddJobPage() {
  return (
    <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <Link href="/jobs" className="text-gray-500 hover:text-white mb-4 inline-block">← Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-6 text-white tracking-tight">Post New AI Job</h1>
      <JobForm />
    </div>
  );
}