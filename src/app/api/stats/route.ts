import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/stats — dashboard overview stats
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalJobs, totalApplications, totalCandidates, avgResult, totalSubscribers] = await Promise.all([
      db.job.count(),
      db.application.count(),
      db.user.count({ where: { role: "STUDENT" } }),
      db.application.aggregate({
        _avg: { matchScore: true },
        where: { matchScore: { not: null } },
      }),
      db.newsletterSubscriber.count(),
    ]);

    const avgMatchScore = avgResult._avg.matchScore ?? 0;

    // Top demanded skills — use groupBy on requiredSkills via raw aggregation
    // We still need findMany for skill frequency but limit to requiredSkills only
    const jobs = await db.job.findMany({ select: { requiredSkills: true } });
    const skillFrequency: Record<string, number> = {};
    for (const job of jobs) {
      for (const skill of job.requiredSkills) {
        const key = skill.toLowerCase();
        skillFrequency[key] = (skillFrequency[key] ?? 0) + 1;
      }
    }
    const topSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));

    return NextResponse.json({
      data: {
        totalJobs,
        totalApplications,
        totalCandidates,
        totalSubscribers,
        avgMatchScore: parseFloat(avgMatchScore.toFixed(1)),
        topSkills,
      },
    });
  } catch (error) {
    console.error("[GET /api/stats]", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
