import AboutHero from "./AboutHero";
import OurMission from "./ourMission";
import OurValues from "./OurValues";
import db from "@/lib/db";

export const revalidate = 60; // re-fetch from DB at most once per minute

export default async function AboutPage() {
  // Fetch all real data in one parallel call
  const [users, totalUsers, applications, jobs, avgResult] = await Promise.all([
    // Latest 3 onboarded users who have a profile image
    db.user.findMany({
      where: { onboarded: true, image: { not: null } },
      select: { id: true, name: true, role: true, image: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    // Total onboarded users = "experts"
    db.user.count({ where: { onboarded: true } }),
    // Total applications = "placements"
    db.application.count(),
    // All jobs to count unique companies
    db.job.findMany({ select: { companyName: true } }),
    // Real avg match score
    db.application.aggregate({
      _avg: { matchScore: true },
      where: { matchScore: { not: null } },
    }),
  ]);

  const uniqueCompanies = new Set(jobs.map((j) => j.companyName)).size;
  const avgMatch = avgResult._avg.matchScore
    ? Math.round(avgResult._avg.matchScore)
    : null;

  const stats = {
    avgMatch,
    totalApplications: applications,
    totalCompanies: uniqueCompanies,
    totalUsers,
  };

  return (
    <main className="bg-[#0B0F19] min-h-screen">
      <AboutHero users={users} totalUsers={totalUsers} />
      <OurMission stats={stats} />
      <OurValues />
    </main>
  );
}
