"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export interface JobFormData {
  title: string;
  description: string;
  companyName: string;
  location: string;
  salaryRange: string;
  requiredSkills: string; // comma-separated string in the form
}

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => void;
  buttonText: string;
  isSubmitting?: boolean;
}

export default function JobForm({ initialData, onSubmit, buttonText, isSubmitting }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({ defaultValues: initialData });

  return (
    <Card className="border-teal-500/20 shadow-lg dark:bg-[#020617]">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-teal-600 dark:text-teal-400">Position Title *</Label>
            <Input
              {...register("title", { required: "Job title is required" })}
              placeholder="e.g. Senior Frontend Developer"
              className="focus-visible:ring-teal-500 border-teal-500/30"
            />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="space-y-2">
            <Label className="text-teal-600 dark:text-teal-400">Description *</Label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={4}
              className="w-full rounded-md border border-teal-500/30 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 resize-none"
            />
            {errors.description && (
              <span className="text-xs text-destructive">{errors.description.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-teal-600 dark:text-teal-400">Company Name *</Label>
            <Input
              {...register("companyName", { required: "Company name is required" })}
              placeholder="e.g. TechCorp Inc."
              className="focus-visible:ring-teal-500 border-teal-500/30"
            />
            {errors.companyName && (
              <span className="text-xs text-destructive">{errors.companyName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-teal-600 dark:text-teal-400">Location *</Label>
              <Input
                {...register("location", { required: "Location is required" })}
                placeholder="Remote / Dhaka"
                className="focus-visible:ring-teal-500 border-teal-500/30"
              />
              {errors.location && (
                <span className="text-xs text-destructive">{errors.location.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-teal-600 dark:text-teal-400">Salary Range</Label>
              <Input
                {...register("salaryRange")}
                placeholder="$120k - $180k"
                className="focus-visible:ring-teal-500 border-teal-500/30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-teal-600 dark:text-teal-400">Required Skills</Label>
            <Input
              {...register("requiredSkills")}
              placeholder="React, Node.js, PostgreSQL (comma-separated)"
              className="focus-visible:ring-teal-500 border-teal-500/30"
            />
            <p className="text-[11px] text-slate-400">Separate skills with commas</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
