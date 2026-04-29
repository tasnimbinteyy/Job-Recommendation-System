import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const saved = await db.savedJob.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          include: {
            employer: { select: { name: true } },
            _count: { select: { applications: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: saved });
  } catch (error) {
    console.error("[GET /api/saved-jobs]", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Toggle save/unsave
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { jobId } = await req.json();
    if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });

    const existing = await db.savedJob.findUnique({
      where: { userId_jobId: { userId: session.user.id, jobId } },
    });

    if (existing) {
      await db.savedJob.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    } else {
      await db.savedJob.create({ data: { userId: session.user.id, jobId } });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("[POST /api/saved-jobs]", error);
    return NextResponse.json({ error: "Failed to toggle" }, { status: 500 });
  }
}
