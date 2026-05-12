import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

export const runtime = "nodejs";

const KNOWN_SKILLS = [
  "React", "Next.js", "Vue", "Angular", "TypeScript", "JavaScript", "HTML", "CSS",
  "Tailwind", "Bootstrap", "Redux", "GraphQL", "Webpack", "Vite", "Svelte",
  "Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "Laravel",
  "Ruby on Rails", "Go", "Rust", "Java", "PHP", "Python", "C#", ".NET",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Prisma", "Firebase",
  "Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD", "GitHub Actions",
  "Terraform", "Linux", "Nginx", "Vercel",
  "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "SQL",
  "Machine Learning", "Deep Learning", "NLP", "Data Analysis", "Tableau",
  "React Native", "Flutter", "Swift", "Kotlin", "Android", "iOS",
  "Figma", "Adobe XD", "Photoshop", "UI/UX",
  "Git", "REST API", "Agile", "Scrum", "Jest", "Cypress",
];

function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  return KNOWN_SKILLS.filter((skill) => lower.includes(skill.toLowerCase()));
}

function extractExperience(text: string): string {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const expKeywords = ["experience", "work experience", "employment", "career"];
  const stopKeywords = ["education", "skills", "projects", "certifications", "references"];

  let capturing = false;
  const expLines: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (!capturing && expKeywords.some((k) => lower.includes(k))) {
      capturing = true;
      continue;
    }
    if (capturing) {
      if (stopKeywords.some((k) => lower.includes(k))) break;
      if (line.length > 10) expLines.push(line);
      if (expLines.length >= 4) break;
    }
  }

  if (expLines.length === 0) {
    return lines.filter((l) => l.length > 20).slice(0, 3).join(" | ");
  }
  return expLines.join(" | ");
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Only students can upload a CV" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("cv") as File | null;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.type !== "application/pdf") return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await pdfParse(buffer);
    const text = result.text;

    if (!text || text.trim().length < 30) {
      return NextResponse.json(
        { error: "Could not extract text. Make sure the PDF is not a scanned image." },
        { status: 422 }
      );
    }

    const extractedSkills = extractSkills(text);
    const extractedExperience = extractExperience(text);

    const existing = await db.user.findUnique({
      where: { id: session.user.id },
      select: { skills: true, experience: true },
    });

    const mergedSkills = Array.from(new Set([...(existing?.skills ?? []), ...extractedSkills]));

    await db.user.update({
      where: { id: session.user.id },
      data: {
        skills: mergedSkills,
        ...(extractedExperience && { experience: extractedExperience }),
      },
    });

    return NextResponse.json({
      success: true,
      extracted: {
        skills: extractedSkills,
        experience: extractedExperience,
        totalSkills: mergedSkills.length,
      },
    });
  } catch (error) {
    console.error("[POST /api/cv-upload]", error);
    return NextResponse.json({ error: "Failed to process CV" }, { status: 500 });
  }
}
