import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { getMLMatchScore } from "@/app/api/match-score/route";

type JobItem = {
  id: string;
  title: string;
  companyName: string;
  location: string;
  requiredSkills: string[];
  _count: { applications: number };
};

type CompanyEntry = {
  companyName: string;
  location: string;
  jobs: JobItem[];
  totalApplications: number;
};

// GET /api/recommendations — recommend companies based on user skill match
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { skills: true },
    });

    const userSkills = user?.skills ?? [];

    const jobs = await db.job.findMany({
      select: {
        id: true,
        title: true,
        companyName: true,
        location: true,
        requiredSkills: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Group jobs by company
    const companyMap: Record<string, CompanyEntry> = {};
    jobs.forEach((job) => {
      const key = job.companyName;
      if (!companyMap[key]) {
        companyMap[key] = {
          companyName: job.companyName,
          location: job.location,
          jobs: [],
          totalApplications: 0,
        };
      }
      companyMap[key].jobs.push(job);
      companyMap[key].totalApplications += job._count.applications;
    });

    // Calculate ML match score per company
    const recommendations = await Promise.all(
      Object.values(companyMap).map(async (company) => {
        let totalMatch = 0;

        for (const job of company.jobs) {
          if (userSkills.length > 0 && job.requiredSkills.length > 0) {
            const mlResult = await getMLMatchScore({
              user_skills: userSkills,
              job_skills: job.requiredSkills,
              user_experience: "mid",
              job_experience: "mid",
              user_title: "",
              job_title: job.title,
            });
            totalMatch += mlResult.matchScore;
          }
        }

        const avgMatch = company.jobs.length > 0 ? totalMatch / company.jobs.length : 0;

        // Top skills demanded by this company
        const skillFreq: Record<string, number> = {};
        company.jobs.forEach((job) => {
          job.requiredSkills.forEach((s) => {
            skillFreq[s] = (skillFreq[s] ?? 0) + 1;
          });
        });
        const topSkills = Object.entries(skillFreq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([s]) => s);

        return {
          companyName: company.companyName,
          location: company.location,
          openPositions: company.jobs.length,
          totalApplications: company.totalApplications,
          avgMatchScore: parseFloat(avgMatch.toFixed(1)),
          topSkills,
        };
      })
    );

    recommendations.sort((a, b) => b.avgMatchScore - a.avgMatchScore);

    return NextResponse.json({ data: recommendations });
  } catch (error) {
    console.error("[GET /api/recommendations]", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
