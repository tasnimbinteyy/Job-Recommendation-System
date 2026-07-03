import { NextRequest, NextResponse } from "next/server";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

export interface MLPredictRequest {
  user_skills: string[];
  job_skills: string[];
  user_experience?: string;
  job_experience?: string;
  user_title?: string;
  job_title?: string;
}

export interface MLPredictResponse {
  match_score: number;
  skill_match_pct: number;
  skill_overlap_count: number;
  skill_gap: string[];
  feature_breakdown: {
    skill_match_pct: number;
    skill_overlap_count: number;
    user_skill_count: number;
    job_skill_count: number;
    experience_match: number;
    title_similarity: number;
    skill_coverage_ratio: number;
  };
  confidence: string;
}

// Fallback: cosine similarity if ML service is unavailable
function cosineSimilarityFallback(userSkills: string[], jobSkills: string[]): number {
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  const intersection = u.filter((s) => j.includes(s)).length;
  if (u.length === 0 || j.length === 0) return 0;
  return (intersection / Math.sqrt(u.length * j.length)) * 100;
}

export async function getMLMatchScore(payload: MLPredictRequest): Promise<{
  matchScore: number;
  skillGap: string[];
  featureBreakdown: MLPredictResponse["feature_breakdown"] | null;
  confidence: string;
  source: "ml" | "fallback";
}> {
  if (!ML_SERVICE_URL) {
    const matchScore = cosineSimilarityFallback(payload.user_skills, payload.job_skills);
    const skillGap = payload.job_skills.filter(
      (s) => !payload.user_skills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
    );
    return { matchScore, skillGap, featureBreakdown: null, confidence: "N/A", source: "fallback" };
  }

  try {
    const res = await fetch(`${ML_SERVICE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000), // 8s timeout
    });

    if (!res.ok) throw new Error("ML service error");

    const data: MLPredictResponse = await res.json();
    return {
      matchScore: data.match_score,
      skillGap: data.skill_gap,
      featureBreakdown: data.feature_breakdown,
      confidence: data.confidence,
      source: "ml",
    };
  } catch {
    // Graceful fallback to cosine similarity
    const matchScore = cosineSimilarityFallback(payload.user_skills, payload.job_skills);
    const skillGap = payload.job_skills.filter(
      (s) => !payload.user_skills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
    );
    return { matchScore, skillGap, featureBreakdown: null, confidence: "N/A", source: "fallback" };
  }
}

// POST /api/match-score — direct endpoint for testing
export async function POST(req: NextRequest) {
  try {
    const body: MLPredictRequest = await req.json();
    const result = await getMLMatchScore(body);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("[POST /api/match-score]", error);
    return NextResponse.json({ error: "Failed to compute match score" }, { status: 500 });
  }
}
