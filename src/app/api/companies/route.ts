import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const jobs = await db.job.findMany({
      select: {
        companyName: true,
        location: true,
        requiredSkills: true,
        _count: { select: { applications: true } },
      },
    });

    // Group by companyName
    const map: Record<string, {
      companyName: string;
      location: string;
      openPositions: number;
      skillFreq: Record<string, number>;
    }> = {};

    jobs.forEach((job) => {
      const key = job.companyName;
      if (!map[key]) {
        map[key] = { companyName: key, location: job.location, openPositions: 0, skillFreq: {} };
      }
      map[key].openPositions += 1;
      job.requiredSkills.forEach((s) => {
        map[key].skillFreq[s] = (map[key].skillFreq[s] ?? 0) + 1;
      });
    });

    const companies = Object.values(map).map((c) => ({
      companyName: c.companyName,
      location: c.location,
      openPositions: c.openPositions,
      topSkills: Object.entries(c.skillFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([s]) => s),
    }));

    companies.sort((a, b) => b.openPositions - a.openPositions);

    return NextResponse.json({ data: companies });
  } catch (error) {
    console.error("[GET /api/companies]", error);
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}
