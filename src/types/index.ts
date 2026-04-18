export type UserRole = "STUDENT" | "EMPLOYER" | "ADMIN";

export interface Job {
  id: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  salaryRange?: string | null;
  requiredSkills: string[];
  employerId: string;
  createdAt: string;
  employer?: { name: string | null; image: string | null };
  _count?: { applications: number };
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";
  matchScore?: number | null;
  createdAt: string;
  job?: Pick<Job, "id" | "title" | "companyName" | "location" | "salaryRange" | "requiredSkills">;
}

export interface Candidate {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  skills: string[];
  experience: string | null;
  role: UserRole;
  createdAt: string;
  _count?: { applications: number };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
