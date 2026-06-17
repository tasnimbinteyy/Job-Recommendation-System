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

  // ── UI/UX & DESIGN ──
  {
    title: "UI/UX Designer",
    companyName: "Shajgoj",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 45,000 – 75,000",
    description: "Shajgoj is looking for a creative UI/UX Designer to craft beautiful, user-friendly experiences for our beauty e-commerce platform. You will work closely with the product and engineering teams to design intuitive interfaces for web and mobile.",
    requiredSkills: ["Figma", "UI/UX", "Wireframing", "Prototyping", "User Research", "Adobe XD"],
  },
  {
    title: "Product Designer (Remote)",
    companyName: "Toptal",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,200 – 2,000/month",
    description: "Join Toptal's network as a freelance Product Designer working with top global startups. You will own end-to-end product design — from user research and wireframes to high-fidelity prototypes and design systems.",
    requiredSkills: ["Figma", "UI/UX", "Prototyping", "Design Systems", "User Research", "CSS"],
  },

  // ── PRODUCT MANAGEMENT ──
  {
    title: "Product Manager",
    companyName: "Pathao",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 1,00,000 – 1,60,000",
    description: "Pathao is looking for a driven Product Manager to own the roadmap for our ride-sharing product. You will work with engineering, design, and data teams to define features, prioritize backlog, and ship products that delight millions of users.",
    requiredSkills: ["Product Management", "Agile", "Scrum", "Roadmapping", "Data Analysis", "Figma"],
  },
  {
    title: "Associate Product Manager (Remote)",
    companyName: "Remote.com",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,000 – 1,800/month",
    description: "Remote.com is hiring an Associate Product Manager to help build the future of global employment. You will assist senior PMs in defining product requirements, conducting user interviews, and tracking KPIs across our global HR platform.",
    requiredSkills: ["Product Management", "Agile", "User Research", "Data Analysis", "Communication", "Roadmapping"],
  },

  // ── MARKETING & CONTENT ──
  {
    title: "Digital Marketing Manager",
    companyName: "Chaldal",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 55,000 – 85,000",
    description: "Chaldal is looking for a Digital Marketing Manager to drive customer acquisition and retention for Bangladesh's leading online grocery platform. You will lead SEO, SEM, social media, and email campaigns to grow our user base.",
    requiredSkills: ["Digital Marketing", "SEO", "Google Ads", "Social Media Marketing", "Email Marketing", "Analytics"],
  },
  {
    title: "Content Writer & SEO Specialist (Remote)",
    companyName: "HubSpot",
    location: "Remote – Bangladesh",
    salaryRange: "USD 800 – 1,400/month",
    description: "HubSpot is seeking a Content Writer & SEO Specialist to create high-quality blog posts, guides, and marketing copy that ranks on Google and drives inbound traffic. You will collaborate with the marketing team to execute content strategies.",
    requiredSkills: ["Content Writing", "SEO", "Copywriting", "WordPress", "Google Analytics", "Keyword Research"],
  },
  {
    title: "Social Media Marketing Executive",
    companyName: "Shohoz",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 30,000 – 50,000",
    description: "Join Shohoz's marketing team to manage and grow our social media presence across Facebook, Instagram, and TikTok. You will create engaging content, run campaigns, and analyze performance metrics to increase brand awareness.",
    requiredSkills: ["Social Media Marketing", "Content Creation", "Canva", "Facebook Ads", "Analytics", "Copywriting"],
  },

  // ── HUMAN RESOURCES ──
  {
    title: "HR Manager",
    companyName: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 60,000 – 90,000",
    description: "Brain Station 23 is looking for an experienced HR Manager to lead talent acquisition, employee engagement, and HR operations for our 500+ person engineering company. You will shape the culture and people strategy of a leading tech firm.",
    requiredSkills: ["Recruitment", "HR Management", "Employee Relations", "Performance Management", "HRIS", "Communication"],
  },
  {
    title: "Talent Acquisition Specialist (Remote)",
    companyName: "Deel",
    location: "Remote – Bangladesh",
    salaryRange: "USD 900 – 1,500/month",
    description: "Deel is hiring a Talent Acquisition Specialist to source, screen, and hire top talent across multiple countries. You will manage the full recruitment lifecycle, build talent pipelines, and partner with hiring managers globally.",
    requiredSkills: ["Recruitment", "Talent Acquisition", "LinkedIn Recruiter", "Interviewing", "ATS", "Communication"],
  },

  // ── FINANCE & ACCOUNTING ──
  {
    title: "Financial Analyst",
    companyName: "bKash Limited",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 70,000 – 1,10,000",
    description: "bKash is looking for a Financial Analyst to support business decisions through financial modeling, forecasting, and reporting. You will analyze revenue trends, prepare dashboards for leadership, and contribute to strategic planning.",
    requiredSkills: ["Financial Analysis", "Excel", "Financial Modeling", "SQL", "Power BI", "Accounting"],
  },
  {
    title: "Accounting & Finance Manager (Remote)",
    companyName: "Bookkeeper360",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,000 – 1,800/month",
    description: "Bookkeeper360 provides cloud accounting services to US-based small businesses. We are hiring an Accounting Manager to manage client accounts, prepare financial statements, and ensure compliance with US accounting standards.",
    requiredSkills: ["Accounting", "QuickBooks", "Financial Reporting", "Excel", "Bookkeeping", "US GAAP"],
  },

  // ── BUSINESS DEVELOPMENT & SALES ──
  {
    title: "Business Development Executive",
    companyName: "SELISE Digital Platforms",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 50,000 – 80,000",
    description: "SELISE is seeking a Business Development Executive to identify and close new enterprise client opportunities across South and Southeast Asia. You will build relationships with C-level stakeholders and drive revenue growth for our digital platform solutions.",
    requiredSkills: ["Sales", "Business Development", "CRM", "Negotiation", "Communication", "Lead Generation"],
  },
  {
    title: "Sales Development Representative (Remote)",
    companyName: "Salesforce",
    location: "Remote – Bangladesh",
    salaryRange: "USD 800 – 1,400/month",
    description: "Salesforce is hiring a Sales Development Representative to prospect, qualify, and generate new pipeline for our APAC sales team. You will conduct outreach via calls, emails, and LinkedIn to connect decision-makers with our CRM solutions.",
    requiredSkills: ["Sales", "Lead Generation", "CRM", "Cold Outreach", "Communication", "Salesforce"],
  },

  // ── DATA ANALYTICS (NON-ENGINEERING) ──
  {
    title: "Business Analyst",
    companyName: "Grameenphone",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 75,000 – 1,15,000",
    description: "Grameenphone is hiring a Business Analyst to bridge the gap between business stakeholders and technology teams. You will gather requirements, document processes, analyze data, and ensure successful delivery of digital transformation projects.",
    requiredSkills: ["Business Analysis", "SQL", "Excel", "Power BI", "Requirements Gathering", "Agile"],
  },
  {
    title: "Data Analyst (Remote)",
    companyName: "Fiverr Business",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,000 – 1,700/month",
    description: "Work as a remote Data Analyst for international clients through Fiverr Business. You will clean and analyze datasets, build dashboards, and deliver actionable insights to help businesses make data-driven decisions.",
    requiredSkills: ["Data Analysis", "SQL", "Excel", "Tableau", "Python", "Google Analytics"],
  },

  // ── OPERATIONS & PROJECT MANAGEMENT ──
  {
    title: "Operations Manager",
    companyName: "Chaldal",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 80,000 – 1,20,000",
    description: "Chaldal is looking for an Operations Manager to oversee warehouse operations, last-mile delivery, and vendor management. You will optimize processes to ensure fast, reliable grocery delivery to thousands of customers daily.",
    requiredSkills: ["Operations Management", "Supply Chain", "Excel", "Team Leadership", "Process Improvement", "Communication"],
  },
  {
    title: "Project Manager (Remote)",
    companyName: "Appen",
    location: "Remote – Bangladesh",
    salaryRange: "USD 1,200 – 2,000/month",
    description: "Appen is hiring a Project Manager to lead AI data collection and annotation projects for global technology clients. You will manage project timelines, coordinate remote teams, and ensure quality deliverables across multiple concurrent projects.",
    requiredSkills: ["Project Management", "Agile", "Scrum", "Communication", "Risk Management", "MS Project"],
  },

  // ── CUSTOMER SUCCESS ──
  {
    title: "Customer Success Manager",
    companyName: "Shohoz",
    location: "Dhaka, Bangladesh",
    salaryRange: "BDT 40,000 – 65,000",
    description: "Shohoz is hiring a Customer Success Manager to ensure our B2B clients get maximum value from our platform. You will onboard new clients, handle escalations, and build long-term relationships to drive retention and upsell opportunities.",
    requiredSkills: ["Customer Success", "CRM", "Communication", "Problem Solving", "Account Management", "Excel"],
  },
  {
    title: "Technical Support Specialist (Remote)",
    companyName: "Automattic",
    location: "Remote – Bangladesh",
    salaryRange: "USD 700 – 1,200/month",
    description: "Automattic (makers of WordPress.com) is hiring a Technical Support Specialist to help customers resolve issues with their WordPress sites. You will troubleshoot problems via live chat, email, and forums, and contribute to documentation.",
    requiredSkills: ["Customer Support", "WordPress", "HTML", "CSS", "Communication", "Troubleshooting"],
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
