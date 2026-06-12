import { NextRequest, NextResponse } from "next/server";

const SKILL_KEYWORDS = [
  "React", "Next.js", "Vue", "Angular", "TypeScript", "JavaScript", "Python",
  "Node.js", "Java", "Go", "Rust", "PHP", "Ruby", "C#", ".NET", "Swift", "Kotlin",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "GraphQL", "REST API",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Terraform", "Linux",
  "TensorFlow", "PyTorch", "Machine Learning", "Data Analysis", "SQL",
  "React Native", "Flutter", "iOS", "Android",
  "Figma", "UI/UX", "Tailwind", "CSS", "HTML",
  "Git", "Agile", "Scrum", "DevOps",
];

function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  return SKILL_KEYWORDS.filter((skill) => lower.includes(skill.toLowerCase())).slice(0, 8);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "software developer";
    const page = searchParams.get("page") || "1";

    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      return NextResponse.json({ error: "Adzuna API not configured" }, { status: 500 });
    }

    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${appId}&app_key=${appKey}&results_per_page=12&what=${encodeURIComponent(query)}&content-type=application/json`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Adzuna API error");

    const data = await res.json();

    const jobs = (data.results ?? []).map((job: any) => ({
      id: String(job.id),
      title: job.title,
      companyName: job.company?.display_name ?? "Unknown Company",
      location: job.location?.display_name ?? "Unknown Location",
      description: job.description ?? "",
      salaryMin: job.salary_min ? Math.round(job.salary_min) : null,
      salaryMax: job.salary_max ? Math.round(job.salary_max) : null,
      category: job.category?.label ?? "General",
      redirectUrl: job.redirect_url,
      createdAt: job.created,
      requiredSkills: extractSkills(job.title + " " + (job.description ?? "")),
    }));

    return NextResponse.json({ data: jobs, total: data.count ?? 0 });
  } catch (error) {
    console.error("[GET /api/external-jobs]", error);
    return NextResponse.json({ error: "Failed to fetch external jobs" }, { status: 500 });
  }
}
