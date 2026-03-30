// "use client";
// import React from 'react';

// export default function JobForm() {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Job Posted Successfully! (Frontend V2 Demo)");
//   };

//   return (
//     <div className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-2xl">
//       <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
//         <div>
//           <label className="block text-sm mb-1 text-gray-400">Job Title</label>
//           <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 focus:border-cyan-500 outline-none transition" placeholder="e.g. AI Engineer" />
//         </div>
        
//         <div>
//           <label className="block text-sm mb-1 text-gray-400">Required Skills</label>
//           <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 focus:border-cyan-500 outline-none transition" placeholder="Python, NLP, React" />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm mb-1 text-gray-400">Company</label>
//             <input type="text" required className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 outline-none" />
//           </div>
//           <div>
//             <label className="block text-sm mb-1 text-gray-400">Salary</label>
//             <input type="text" className="w-full p-2.5 rounded bg-[#1a1a1a] border border-gray-700 outline-none" placeholder="$120k" />
//           </div>
//         </div>

//         <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-cyan-900/20">
//           Upload to Database
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: string;
}

interface JobFormProps {
  initialData?: JobFormData;
  onSubmit: (data: JobFormData) => void;
  buttonText: string;
}

export default function JobForm({ initialData, onSubmit, buttonText }: JobFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
    defaultValues: initialData,
  });

  return (
    <Card className="border-teal-500/20 shadow-lg dark:bg-[#020617]">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-teal-600 dark:text-teal-400">Position Title</Label>
            <Input 
              {...register("title", { required: "Job title is required" })} 
              placeholder="e.g. Senior Frontend Developer"
              className="focus-visible:ring-teal-500 border-teal-500/30"
            />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-teal-600 dark:text-teal-400">Company</Label>
            <Input 
              {...register("company", { required: "Company name is required" })} 
              placeholder="e.g. TechCorp Inc."
              className="focus-visible:ring-teal-500 border-teal-500/30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-teal-600 dark:text-teal-400">Location</Label>
              <Input {...register("location")} placeholder="Remote / Dhaka" className="focus-visible:ring-teal-500 border-teal-500/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-teal-600 dark:text-teal-400">Salary</Label>
              <Input {...register("salary")} placeholder="$120k - $180k" className="focus-visible:ring-teal-500 border-teal-500/30" />
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors">
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}