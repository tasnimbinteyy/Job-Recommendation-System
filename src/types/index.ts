// src/types/index.ts
export type UserRole = "seeker" | "company";

export interface Application {
  id: string;
  role: string;
  company: string;
  status: "In Review" | "Accepted" | "Rejected";
  date: string;
}