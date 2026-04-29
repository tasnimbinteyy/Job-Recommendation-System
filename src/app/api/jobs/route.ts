import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/jobs — fetch all jobs (public), or employer's own jobs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const employerOnly = searchParams.get("employerOnly") === "true";

    let employerId: string | undefined;
    if (employerOnly) {
      const session = await auth();
      if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      employerId = session.user.id;
    }

    const jobs = await db.job.findMany({
      where: {
        ...(employerId ? { employerId } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        employer: { select: { name: true, image: true } },
        _count: { select: { applications: true } },
      },
    });

    return NextResponse.json({ data: jobs });
  } catch (error) {
    console.error("[GET /api/jobs]", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST /api/jobs — create a new job (requires login)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, companyName, location, salaryRange, requiredSkills } = body;

    if (!title || !description || !companyName || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await db.job.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        companyName: companyName.trim(),
        location: location.trim(),
        salaryRange: salaryRange?.trim() || null,
        requiredSkills: Array.isArray(requiredSkills)
          ? requiredSkills
          : requiredSkills?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
        employerId: session.user.id,
      },
    });

    return NextResponse.json({ data: job }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/jobs]", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
