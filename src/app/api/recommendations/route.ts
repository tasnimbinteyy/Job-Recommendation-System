import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

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

    const userSkills = (user?.skills ?? []).map((s) => s.toLowerCase());

    // Get all jobs grouped by company
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

    // Group jobs by company and calculate avg match score
    const companyMap: Record<string, {
      companyName: string;
      location: string;
      jobs: typeof jobs;
      avgMatch: number;
      topSkills: string[];
      totalApplications: number;
    }> = {};

    jobs.forEach((job) => {
      const key = job.companyName;
      if (!companyMap[key]) {
        companyMap[key] = {
          companyName: job.companyName,
          location: job.location,
          jobs: [],
          avgMatch: 0,
          topSkills: [],
          totalApplications: 0,
        };
      }
      companyMap[key].jobs.push(job);
      companyMap[key].totalApplications += job._count.applications;
    });

    // Calculate match score per company
    const recommendations = Object.values(companyMap).map((company) => {
      const allSkills: string[] = [];
      let totalMatch = 0;

      company.jobs.forEach((job) => {
        const jobSkills = job.requiredSkills.map((s) => s.toLowerCase());
        jobSkills.forEach((s) => { if (!allSkills.includes(s)) allSkills.push(s); });

        if (userSkills.length > 0 && jobSkills.length > 0) {
          const intersection = userSkills.filter((s) => jobSkills.includes(s)).length;
          totalMatch += (intersection / Math.sqrt(userSkills.length * jobSkills.length)) * 100;
        }
      });

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
    });

    // Sort by match score descending
    recommendations.sort((a, b) => b.avgMatchScore - a.avgMatchScore);

    return NextResponse.json({ data: recommendations });
  } catch (error) {
    console.error("[GET /api/recommendations]", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
