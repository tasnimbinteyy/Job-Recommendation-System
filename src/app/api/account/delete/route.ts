import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/lib/db";

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      cookieName: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from DB using dbId or email from token
    const dbId = token.dbId as string | undefined;
    const email = token.email as string | undefined;

    if (!dbId && !email) {
      return NextResponse.json({ error: "Cannot identify user" }, { status: 400 });
    }

    const where = dbId ? { id: dbId } : { email: email! };
    const user = await db.user.findUnique({ where, select: { id: true } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    // Delete in correct order to respect foreign key constraints
    await db.notification.deleteMany({ where: { userId } });
    await db.savedJob.deleteMany({ where: { userId } });
    await db.application.deleteMany({ where: { userId } });

    // If employer — delete their jobs and related data first
    const jobs = await db.job.findMany({ where: { employerId: userId }, select: { id: true } });
    if (jobs.length > 0) {
      const jobIds = jobs.map((j) => j.id);
      await db.savedJob.deleteMany({ where: { jobId: { in: jobIds } } });
      await db.application.deleteMany({ where: { jobId: { in: jobIds } } });
      await db.job.deleteMany({ where: { employerId: userId } });
    }

    await db.account.deleteMany({ where: { userId } });
    await db.user.delete({ where: { id: userId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/account/delete]", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
