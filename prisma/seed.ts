import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

const JOB_LISTINGS = [
  // ── BRAIN STATION 23 ──
  {
    title: "Senior Software Engineer (React)",
    companyName: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 80,000 – 1,20,000",
    description: "We are looking for a Senior Software Engineer with strong React expertise to join our growing product team. You will lead frontend development, mentor junior developers, and collaborate with cross-functional teams to deliver high-quality web applications.",
    requiredSkills: ["React", "TypeScript", "Next.js", "Node.js", "REST API", "Git", "Agile"],
  },
  {
    title: "Backend Engineer (Node.js)",
    companyName: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 70,000 – 1,10,000",
    description: "Join our backend team to build scalable APIs and microservices. You will work with Node.js, PostgreSQL, and cloud infrastructure to power our enterprise products used by clients across 30+ countries.",
    requiredSkills: ["Node.js", "PostgreSQL", "Docker", "AWS", "REST API", "TypeScript", "Git"],
  },

  // ── SHOHOZ ──
  {
    title: "Full Stack Developer",
    companyName: "Shohoz",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 60,000 – 1,00,000",
    description: "Shohoz is Bangladesh's leading mobility platform. We are hiring a Full Stack Developer to build and maintain our ticketing and ride-sharing platform. You will work on both frontend and backend systems serving millions of users.",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "REST API", "Git", "Agile"],
  },
  {
    title: "Mobile App Developer (React Native)",
    companyName: "Shohoz",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 65,000 – 1,05,000",
    description: "Build and maintain Shohoz's mobile applications used by millions of commuters across Bangladesh. You will work closely with the product and design teams to deliver seamless mobile experiences on iOS and Android.",
    requiredSkills: ["React Native", "JavaScript", "TypeScript", "iOS", "Android", "REST API", "Git"],
  },

  // ── PATHAO ──
  {
    title: "Software Engineer – Platform Team",
    companyName: "Pathao",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 75,000 – 1,15,000",
    description: "Pathao is one of Bangladesh's most recognized tech startups. Join our platform team to build the infrastructure that powers ride-sharing, food delivery, and courier services for millions of users across Bangladesh.",
    requiredSkills: ["Go", "PostgreSQL", "Docker", "Kubernetes", "AWS", "REST API", "Git"],
  },
  {
    title: "Frontend Engineer",
    companyName: "Pathao",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 60,000 – 95,000",
    description: "We are looking for a talented Frontend Engineer to build beautiful, performant web interfaces for Pathao's merchant and admin dashboards. You will work with a modern React stack and collaborate with our design system team.",
    requiredSkills: ["React", "TypeScript", "Tailwind", "JavaScript", "REST API", "Figma", "Git"],
  },

  // ── SHAJGOJ ──
  {
    title: "Junior Software Developer",
    companyName: "Shajgoj",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 35,000 – 55,000",
    description: "Shajgoj is Bangladesh's largest beauty and lifestyle e-commerce platform. We are looking for a Junior Software Developer to join our engineering team and help build features for our web and mobile platforms.",
    requiredSkills: ["JavaScript", "React", "HTML", "CSS", "Git", "REST API"],
  },

  // ── CHALDAL ──
  {
    title: "Software Engineer – E-commerce Platform",
    companyName: "Chaldal",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 70,000 – 1,10,000",
    description: "Chaldal is Bangladesh's pioneering online grocery delivery service. Join our engineering team to build and scale the platform that delivers groceries to thousands of households daily across Dhaka and Chattogram.",
    requiredSkills: ["Python", "Django", "PostgreSQL", "React", "Docker", "AWS", "Git"],
  },
  {
    title: "Data Engineer",
    companyName: "Chaldal",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 80,000 – 1,20,000",
    description: "Build and maintain data pipelines that power Chaldal's inventory management, demand forecasting, and business intelligence systems. You will work with large datasets and modern data engineering tools.",
    requiredSkills: ["Python", "SQL", "Data Analysis", "PostgreSQL", "AWS", "Pandas", "Git"],
  },

  // ── BKASH ──
  {
    title: "Software Engineer – Fintech",
    companyName: "bKash Limited",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 90,000 – 1,40,000",
    description: "bKash is Bangladesh's largest mobile financial service provider with over 60 million users. Join our engineering team to build secure, scalable fintech solutions that are transforming financial inclusion in Bangladesh.",
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "AWS", "REST API", "Git"],
  },
  {
    title: "Android Developer",
    companyName: "bKash Limited",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 80,000 – 1,20,000",
    description: "Develop and maintain the bKash Android application used by millions of Bangladeshis for mobile banking. You will work on new features, performance optimization, and security enhancements for our flagship mobile app.",
    requiredSkills: ["Android", "Kotlin", "Java", "REST API", "Git", "Agile"],
  },

  // ── SELISE ──
  {
    title: "Full Stack Engineer (.NET + React)",
    companyName: "SELISE Digital Platforms",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 85,000 – 1,30,000",
    description: "SELISE is a Swiss-Bangladeshi software company building enterprise digital platforms. We are looking for a Full Stack Engineer to work on our flagship products used by clients across Europe and Asia.",
    requiredSkills: ["C#", ".NET", "React", "TypeScript", "PostgreSQL", "Docker", "Azure", "Git"],
  },

  // ── THERAP BD ──
  {
    title: "Software Quality Assurance Engineer",
    companyName: "Therap (BD) Ltd.",
    location: "Sylhet, Bangladesh",
    salaryRange: "BDT 50,000 – 80,000",
    description: "Therap provides cloud-based software solutions for the disability services sector in the USA. Join our QA team to ensure the quality and reliability of our healthcare software used by thousands of providers across America.",
    requiredSkills: ["Jest", "Cypress", "JavaScript", "REST API", "Agile", "Scrum", "Git"],
  },
  {
    title: "Java Software Engineer",
    companyName: "Therap (BD) Ltd.",
    location: "Sylhet, Bangladesh",
    salaryRange: "BDT 70,000 – 1,10,000",
    description: "Build and maintain Therap's enterprise healthcare platform using Java and modern backend technologies. You will work in an agile environment with a team of experienced engineers delivering software to the US market.",
    requiredSkills: ["Java", "Spring Boot", "PostgreSQL", "REST API", "Git", "Agile", "Docker"],
  },

  // ── REMOTE / INTERNATIONAL ──
  {
    title: "Frontend Developer (Remote)",
    companyName: "Optimizely",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,500 – 2,500/month",
    description: "Work remotely for a global SaaS company building digital experience platforms. You will collaborate with international teams to build high-performance frontend applications using React and TypeScript.",
    requiredSkills: ["React", "TypeScript", "JavaScript", "CSS", "Tailwind", "Git", "Agile"],
  },
  {
    title: "DevOps Engineer (Remote)",
    companyName: "Upwork Enterprise Client",
    location: "Remote – Bangladesh",
    salaryRange: "USD 2,000 – 3,500/month",
    description: "Join a fast-growing international startup as a DevOps Engineer. You will manage cloud infrastructure, CI/CD pipelines, and containerized deployments for a SaaS platform with users across 50+ countries.",
    requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux", "Git"],
  },
  {
    title: "Machine Learning Engineer (Remote)",
    companyName: "DataAnnotation Tech",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,800 – 3,000/month",
    description: "Work on cutting-edge machine learning projects for international clients. You will build and deploy ML models, work with large datasets, and collaborate with data scientists to deliver AI-powered solutions.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Pandas", "SQL", "Git"],
  },
];

async function main() {
  if (!ADMIN_EMAIL) {
    console.log("❌ ADMIN_EMAIL is not set in .env");
    return;
  }

  const user = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });

  if (!user) {
    console.log(` No user found with email: ${ADMIN_EMAIL}`);
    console.log("→ Sign in with that email first, then run pnpm seed again.");
    return;
  }

  await db.user.update({
    where: { email: ADMIN_EMAIL },
    data: { role: "ADMIN", onboarded: true },
  });

  console.log(`✅ Admin role set for: ${ADMIN_EMAIL}`);

  // Seed jobs
  let created = 0;
  let skipped = 0;

  for (const job of JOB_LISTINGS) {
    const exists = await db.job.findFirst({
      where: { title: job.title, companyName: job.companyName },
    });

    if (exists) {
      skipped++;
      continue;
    }

    await db.job.create({
      data: {
        title: job.title,
        companyName: job.companyName,
        location: job.location,
        salaryRange: job.salaryRange,
        description: job.description,
        requiredSkills: job.requiredSkills,
        employerId: user.id,
      },
    });
    created++;
  }

  console.log(`✅ Jobs seeded: ${created} created, ${skipped} already existed.`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
