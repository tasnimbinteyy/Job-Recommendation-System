import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await db.newsletterSubscriber.create({
      data: { email: email.trim().toLowerCase() },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Already subscribed — treat as success so we don't leak whether an email exists
      return NextResponse.json({ success: true });
    }
    console.error("[POST /api/newsletter]", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
