import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/resume-score — calculate resume score + feedback for current user
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { skills: true, experience: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userSkills = user.skills.map((s) => s.toLowerCase());

    // Get all job required skills to find market demand
    const jobs = await db.job.findMany({ select: { requiredSkills: true } });
    const skillFrequency: Record<string, number> = {};
    jobs.forEach((job) => {
      job.requiredSkills.forEach((skill) => {
        const key = skill.toLowerCase();
        skillFrequency[key] = (skillFrequency[key] ?? 0) + 1;
      });
    });

    const totalJobs = jobs.length;

    // Score components
    let score = 0;
    const feedback: { type: "success" | "warning" | "info"; message: string }[] = [];

    // 1. Skill count score (max 40 points)
    const skillCountScore = Math.min((userSkills.length / 8) * 40, 40);
    score += skillCountScore;

    if (userSkills.length === 0) {
      feedback.push({ type: "warning", message: "Add skills to your profile to improve your score." });
    } else if (userSkills.length < 4) {
      feedback.push({ type: "warning", message: `You have ${userSkills.length} skill(s). Aim for at least 6-8 skills.` });
    } else {
      feedback.push({ type: "success", message: `Good skill count: ${userSkills.length} skills listed.` });
    }

    // 2. Market demand score (max 40 points) — how many of user's skills are in demand
    const demandedSkills = userSkills.filter((s) => (skillFrequency[s] ?? 0) > 0);
    const demandScore = totalJobs > 0 ? Math.min((demandedSkills.length / Math.max(userSkills.length, 1)) * 40, 40) : 0;
    score += demandScore;

    if (demandedSkills.length === 0 && userSkills.length > 0) {
      feedback.push({ type: "warning", message: "None of your skills match current job requirements. Update your skills." });
    } else if (demandedSkills.length > 0) {
      const topDemanded = demandedSkills
        .sort((a, b) => (skillFrequency[b] ?? 0) - (skillFrequency[a] ?? 0))
        .slice(0, 3);
      feedback.push({ type: "success", message: `High-demand skills you have: ${topDemanded.join(", ")}.` });
    }

    // 3. Experience score (max 20 points)
    if (user.experience && user.experience.trim().length > 10) {
      score += 20;
      feedback.push({ type: "success", message: "Experience section is filled in." });
    } else {
      feedback.push({ type: "info", message: "Add your experience to boost your score by 20 points." });
    }

    // Missing in-demand skills (top 5 skills user doesn't have)
    const missingSkills = Object.entries(skillFrequency)
      .filter(([skill]) => !userSkills.includes(skill))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill]) => skill);

    return NextResponse.json({
      data: {
        score: Math.round(score),
        skillCount: userSkills.length,
        demandedSkillCount: demandedSkills.length,
        missingSkills,
        feedback,
      },
    });
  } catch (error) {
    console.error("[GET /api/resume-score]", error);
    return NextResponse.json({ error: "Failed to calculate score" }, { status: 500 });
  }
}
