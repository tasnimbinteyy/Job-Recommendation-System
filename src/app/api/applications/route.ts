import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/applications — get current user's applications
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If employer — return applications for their posted jobs
    const user = await db.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
    const isEmployer = user?.role === "EMPLOYER" || user?.role === "ADMIN";

    if (isEmployer) {
      const applications = await db.application.findMany({
        where: { job: { employerId: session.user.id } },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true, image: true, skills: true } },
          job: { select: { id: true, title: true, companyName: true, requiredSkills: true } },
        },
      });
      return NextResponse.json({ data: applications, role: "EMPLOYER" });
    }

    // Student — return their own applications
    const applications = await db.application.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            companyName: true,
            location: true,
            salaryRange: true,
            requiredSkills: true,
          },
        },
      },
    });

    return NextResponse.json({ data: applications, role: "STUDENT" });
  } catch (error) {
    console.error("[GET /api/applications]", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

// POST /api/applications — apply to a job
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const job = await db.job.findUnique({ where: { id: jobId } });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    // prevent duplicate applications (schema has @@unique([userId, jobId]))
    const existing = await db.application.findUnique({
      where: { userId_jobId: { userId: session.user.id, jobId } },
    });
    if (existing) {
      return NextResponse.json({ error: "Already applied to this job" }, { status: 409 });
    }

    // Cosine Similarity match score calculation
    const user = await db.user.findUnique({ where: { id: session.user.id }, select: { skills: true } });
    const userSkills = (user?.skills ?? []).map((s) => s.toLowerCase());
    const jobSkills = job.requiredSkills.map((s) => s.toLowerCase());
    let matchScore = 0;
    if (userSkills.length > 0 && jobSkills.length > 0) {
      const intersection = userSkills.filter((s) => jobSkills.includes(s)).length;
      matchScore = (intersection / Math.sqrt(userSkills.length * jobSkills.length)) * 100;
    }

    const application = await db.application.create({
      data: {
        userId: session.user.id,
        jobId,
        status: "PENDING",
        matchScore: parseFloat(matchScore.toFixed(1)),
      },
      include: {
        job: { select: { title: true, companyName: true } },
      },
    });

    return NextResponse.json({ data: application }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/applications]", error);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}
