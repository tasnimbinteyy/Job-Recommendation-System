import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  TableOfContents, PageBreak, Spacing
} from "docx";
import { writeFileSync } from "fs";

const BLUE = "1A56DB";
const LIGHT_BLUE = "EEF2FF";
const DARK = "1A1A1A";
const WHITE = "FFFFFF";
const GRAY_BG = "F3F4F6";
const BORDER_GRAY = "D1D5DB";

function h1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    border: { bottom: { color: BLUE, size: 8, style: BorderStyle.SINGLE } },
  });
}

function h2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
  });
}

function h3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, color: DARK, ...opts })],
    spacing: { before: 80, after: 80 },
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, color: DARK })],
    bullet: { level: 0 },
    spacing: { before: 40, after: 40 },
  });
}

function code(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Courier New", size: 18, color: "1E3A5F" })],
    spacing: { before: 40, after: 40 },
    indent: { left: 720 },
    shading: { type: ShadingType.SOLID, color: "F0F4FF", fill: "F0F4FF" },
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map((text, i) =>
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({
            text: String(text),
            bold: isHeader,
            color: isHeader ? WHITE : DARK,
            size: isHeader ? 20 : 20,
          })],
          spacing: { before: 60, after: 60 },
          alignment: AlignmentType.LEFT,
        })],
        shading: isHeader ? { type: ShadingType.SOLID, color: BLUE, fill: BLUE } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
      })
    ),
  });
}

function makeTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
      left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
      right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
      insideH: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
      insideV: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
    },
    rows: [
      tableRow(headers, true),
      ...rows.map(r => tableRow(r)),
    ],
  });
}

function spacer() {
  return new Paragraph({ text: "", spacing: { before: 100, after: 100 } });
}

// ─── COVER PAGE ────────────────────────────────────────────────────────────────
const coverPage = [
  new Paragraph({ text: "", spacing: { before: 1200 } }),
  new Paragraph({
    children: [new TextRun({ text: "Software Engineering Lab Report", bold: true, size: 52, color: BLUE })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Modeling Skill Affinity for Personalized Employment Matching Systems", size: 28, color: DARK, italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Course: ", bold: true, size: 24 }), new TextRun({ text: "Software Engineering Lab", size: 24 })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Submitted by: ", bold: true, size: 24 }), new TextRun({ text: "Tasnim Bintey Nayeem", size: 24 })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "GitHub: ", bold: true, size: 24 }), new TextRun({ text: "github.com/tasnimbinteyy", size: 24 })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "Live System: ", bold: true, size: 24 }), new TextRun({ text: "https://job-recommendation-system-delta.vercel.app", size: 24, color: BLUE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  pageBreak(),
];

// ─── LAB 1 ─────────────────────────────────────────────────────────────────────
const lab1 = [
  h1("Lab Session 1: Software Engineering Fundamentals & Project Initiation"),
  h2("Objectives"),
  bullet("Understand the scope and importance of software engineering"),
  bullet("Identify a real-world problem suitable for a software solution"),
  bullet("Define project vision, stakeholders, and system boundaries"),
  spacer(),
  h2("Theory Overview"),
  para("Software engineering applies disciplined, systematic engineering principles to the development of software. It goes beyond writing code — it involves planning, analysis, design, testing, and maintenance. Large-scale systems involve multiple stakeholders, long-term upkeep, and significant risk, which is why structured engineering approaches are essential. Key concepts include the software crisis, characteristics of good software (reliability, maintainability, efficiency), and the importance of documentation throughout the lifecycle."),
  spacer(),
  h2("Project Title"),
  para("Modeling Skill Affinity for Personalized Employment Matching Systems"),
  spacer(),
  h2("Problem Statement"),
  para("Traditional job portals rely on keyword-based filtering, which fails to accurately match candidates with suitable positions. Job seekers waste time applying to irrelevant roles, and employers receive applications from candidates who lack the required skills. There is no intelligent mechanism to analyze a candidate's skill profile and map it to job requirements in a meaningful way. This system addresses that gap using AI-based matching, skill gap analysis, and resume scoring."),
  spacer(),
  h2("Stakeholders"),
  makeTable(
    ["Stakeholder", "Role"],
    [
      ["Job Seekers (Students)", "Browse jobs, apply, track application status, view resume score"],
      ["Employers", "Post jobs, view applicants, manage hiring pipeline"],
      ["Admin", "Manage users, jobs, applications, system-wide oversight"],
      ["External System (Adzuna API)", "Provides live real-world job listings"],
    ]
  ),
  spacer(),
  h2("System Scope"),
  h3("In-Scope"),
  bullet("User registration via Google/GitHub OAuth"),
  bullet("Role-based dashboards (Job Seeker, Employer, Admin)"),
  bullet("AI job matching using Cosine Similarity"),
  bullet("Skill gap analysis per application"),
  bullet("Resume scoring (0–100)"),
  bullet("Company recommendations, notifications, saved jobs, CV upload, newsletter"),
  bullet("Live job listings from Adzuna API"),
  bullet("Full CRUD for jobs, skills, applications"),
  h3("Out-of-Scope"),
  bullet("Paid AI/LLM APIs"),
  bullet("Direct messaging between users"),
  bullet("Video interviews or assessment modules"),
  bullet("Payment or subscription systems"),
  spacer(),
  h2("Key Learning"),
  para("Before touching any code, defining the problem clearly and identifying who benefits from the system is critical. This session helped establish a shared understanding of what the system must do and for whom."),
  pageBreak(),
];

// ─── LAB 2 ─────────────────────────────────────────────────────────────────────
const lab2 = [
  h1("Lab Session 2: Software Process Models & Development Strategy"),
  h2("Objectives"),
  bullet("Understand different SDLC models"),
  bullet("Select an appropriate process model for the project"),
  bullet("Justify process selection based on project characteristics"),
  spacer(),
  h2("Theory Overview"),
  para("A software process model defines the stages, activities, and feedback loops in development. Choosing the right model affects delivery speed, flexibility, and risk management. Common models include Waterfall, Incremental, Spiral, and Agile (Scrum), each suited to different project contexts."),
  spacer(),
  h2("SDLC Comparison"),
  makeTable(
    ["Model", "Advantages", "Limitations"],
    [
      ["Waterfall", "Simple, well-documented phases", "Inflexible; late feedback"],
      ["Incremental", "Early delivery; iterative", "Requires good planning per increment"],
      ["Spiral", "Risk-driven; highly flexible", "Complex to manage"],
      ["Agile (Scrum)", "Fast iteration; adaptable to change", "Needs continuous stakeholder involvement"],
    ]
  ),
  spacer(),
  h2("Selected Model: Incremental Agile (5 Sprints)"),
  h3("Justification"),
  para("The requirements for this project were not fully known upfront — features like the AI Agent Modal, live Adzuna jobs integration, and privacy settings emerged as the project progressed. An Agile incremental approach allowed early delivery of core features (auth, jobs CRUD) while iterating on more complex functionality (AI matching, notifications, admin panel). Sprint-based planning made it easy to track progress and adjust scope."),
  spacer(),
  h2("Sprint Breakdown"),
  makeTable(
    ["Sprint", "Deliverables"],
    [
      ["Sprint 1", "Jobs CRUD, search, auth, toast notifications"],
      ["Sprint 2", "Browse Jobs, Cosine Similarity, Skill Gap Analysis, Overview stats"],
      ["Sprint 3", "Profile page, Resume Scoring API, Company Recommendations"],
      ["Sprint 4", "Employer management, onboarding flow, Admin panel"],
      ["Sprint 5", "Notifications, AI Agent Modal, Adzuna live jobs, Privacy settings"],
    ]
  ),
  spacer(),
  h2("Key Learning"),
  para("No single SDLC model fits every project. For a system with evolving requirements and a tight delivery timeline, Agile sprints offered the best balance of flexibility and structure."),
  pageBreak(),
];

// ─── LAB 3 ─────────────────────────────────────────────────────────────────────
const lab3 = [
  h1("Lab Session 3: Requirements Engineering & Analysis"),
  h2("Objectives"),
  bullet("Identify functional and non-functional requirements"),
  bullet("Learn requirement elicitation techniques"),
  bullet("Prioritize requirements"),
  spacer(),
  h2("Theory Overview"),
  para("Requirements engineering ensures that the right system is built. Functional requirements describe what the system does; non-functional requirements describe quality attributes like performance and security. Poorly defined requirements are the leading cause of project failure."),
  spacer(),
  h2("Functional Requirements"),
  makeTable(
    ["ID", "Requirement", "Priority"],
    [
      ["FR01", "Users can register and log in via Google or GitHub OAuth", "High"],
      ["FR02", "New users complete a role-selection onboarding flow", "High"],
      ["FR03", "Job seekers can browse, search, and apply to jobs", "High"],
      ["FR04", "System calculates Cosine Similarity match score on each application", "High"],
      ["FR05", "System identifies skill gaps per application", "High"],
      ["FR06", "Employers can post, edit, and delete their own jobs", "High"],
      ["FR07", "Employers can view applicants and update application status", "High"],
      ["FR08", "Admin can manage all users, change roles, and view system stats", "High"],
      ["FR09", "System auto-triggers notifications on application and status change", "Medium"],
      ["FR10", "Users can save jobs and upload a CV for skill extraction", "Medium"],
      ["FR11", "System fetches live jobs from Adzuna API with AI match scoring", "Medium"],
      ["FR12", "Resume scoring generates a 0–100 score with feedback", "Medium"],
      ["FR13", "Users can configure privacy settings", "Low"],
      ["FR14", "Users can subscribe to a newsletter", "Low"],
    ]
  ),
  spacer(),
  h2("Non-Functional Requirements"),
  makeTable(
    ["ID", "Requirement", "Priority"],
    [
      ["NFR01", "Page load under 2 seconds (client-side filtering, no redundant fetches)", "High"],
      ["NFR02", "Role-based route protection enforced at middleware level", "High"],
      ["NFR03", "System must support light and dark mode across all pages", "Medium"],
      ["NFR04", "Full mobile responsiveness on all dashboard and public pages", "Medium"],
      ["NFR05", "Zero-downtime deployment via Vercel CI/CD", "High"],
      ["NFR06", "All secrets stored in environment variables, never committed to Git", "High"],
      ["NFR07", "Database must support concurrent users without performance degradation", "Medium"],
    ]
  ),
  spacer(),
  h2("Key Learning"),
  para("Writing requirements before designing anything reveals gaps and contradictions early. Assigning priorities helped decide what to build first and what could wait for later sprints."),
  pageBreak(),
];

// ─── LAB 4 ─────────────────────────────────────────────────────────────────────
const lab4 = [
  h1("Lab Session 4: Software Requirement Specification (SRS)"),
  h2("Objectives"),
  bullet("Prepare a formal IEEE-standard SRS document"),
  bullet("Learn requirement documentation best practices"),
  spacer(),
  h2("Theory Overview"),
  para("The SRS document acts as a contract, a design reference, and a testing baseline. A good SRS must be complete, unambiguous, and verifiable."),
  spacer(),
  h2("1. Introduction"),
  h3("1.1 Purpose"),
  para("This SRS defines the functional and non-functional requirements for the AI-Powered Job Recommendation System — a full-stack web application that uses Cosine Similarity to match job seekers with relevant job postings."),
  h3("1.2 Scope"),
  para("The system enables job seekers to receive personalized job recommendations, skill gap feedback, and resume scoring. Employers can post and manage jobs. Admins oversee the entire platform. The system is deployed on Vercel and backed by a Neon PostgreSQL database."),
  h3("1.3 Definitions"),
  bullet("Match Score: A percentage calculated using Cosine Similarity between candidate skills and job required skills"),
  bullet("Skill Gap: Skills required by a job that a candidate does not currently have"),
  bullet("Onboarding: The post-registration flow where a new user selects their role"),
  spacer(),
  h2("2. Overall Description"),
  para("The system is a Next.js 16 App Router full-stack application. Users authenticate via OAuth (Google/GitHub). Based on their assigned role, they are directed to a role-specific dashboard. The AI engine runs on every job application to compute match scores and identify skill gaps. External live jobs are fetched from the Adzuna API and scored using the same algorithm."),
  spacer(),
  h2("3. Functional Requirements"),
  para("See Lab Session 3 — FR01 through FR14."),
  spacer(),
  h2("4. Non-Functional Requirements"),
  para("See Lab Session 3 — NFR01 through NFR07."),
  spacer(),
  h2("5. Constraints & Assumptions"),
  bullet("The system uses only free-tier infrastructure (Vercel, Neon, Adzuna free plan)"),
  bullet("No paid AI APIs are used; all algorithms are implemented from scratch"),
  bullet("Authentication is handled exclusively via OAuth — no email/password login"),
  bullet("The Admin role is assigned only via the seed script, not through the UI"),
  bullet("The system assumes a stable internet connection for Adzuna API calls"),
  bullet("All user data handling must comply with applicable data protection principles"),
  spacer(),
  h2("Key Learning"),
  para("Writing a proper SRS makes the system's intent unambiguous. It acts as a reference throughout design, development, and testing — ensuring everyone builds toward the same goal."),
  pageBreak(),
];

// ─── LAB 5 ─────────────────────────────────────────────────────────────────────
const lab5 = [
  h1("Lab Session 5: Use Case Modeling & System Behavior"),
  h2("Objectives"),
  bullet("Model system behavior through use cases"),
  bullet("Identify interactions between users and the system"),
  spacer(),
  h2("Theory Overview"),
  para("Use cases describe how different users (actors) interact with the system to achieve specific goals. They form the foundation for design decisions, test case creation, and requirement validation."),
  spacer(),
  h2("System Actors"),
  bullet("Job Seeker (STUDENT role)"),
  bullet("Employer"),
  bullet("Admin"),
  bullet("System (automated triggers)"),
  bullet("Adzuna API (external actor)"),
  spacer(),
  h2("Key Use Cases"),
  makeTable(
    ["Use Case", "Actor", "Description"],
    [
      ["UC01: Register & Onboard", "Job Seeker / Employer", "User logs in via OAuth, selects role, gets directed to dashboard"],
      ["UC02: Apply to Job", "Job Seeker", "Applies to a job; system calculates match score and notifies employer"],
      ["UC03: View Skill Gap", "Job Seeker", "Views missing skills per application in the applications page"],
      ["UC04: View Resume Score", "Job Seeker", "System scores resume 0–100 based on skills, demand, experience"],
      ["UC05: Post a Job", "Employer", "Creates a job listing with required skills"],
      ["UC06: Manage Applicants", "Employer", "Views applicants, updates status, triggers notification to student"],
      ["UC07: Manage Users", "Admin", "Views all users, changes roles, auto-notifies affected user"],
      ["UC08: AI Agent Scan", "Job Seeker", "Clicks hero button; system runs live scan and returns score + top matches"],
      ["UC09: Fetch Live Jobs", "System / Adzuna", "System fetches Adzuna jobs and applies AI match scoring per user"],
      ["UC10: Save Job", "Job Seeker", "Bookmarks a job for later review"],
    ]
  ),
  spacer(),
  h2("Use Case Description — UC02: Apply to Job"),
  makeTable(
    ["Field", "Detail"],
    [
      ["Actor", "Job Seeker"],
      ["Precondition", "User is authenticated and onboarded as STUDENT"],
      ["Main Flow", "User views a job → clicks Apply → system checks for duplicate → calculates Cosine Similarity → saves application → notifies employer"],
      ["Alternate Flow", "If already applied, system returns error: 'Already applied'"],
      ["Postcondition", "Application saved with match score; employer notified"],
    ]
  ),
  spacer(),
  h2("Key Learning"),
  para("Use case modeling helped visualize system behavior from the user's perspective, making it easier to identify edge cases (like duplicate applications) before writing any code."),
  pageBreak(),
];

// ─── LAB 6 ─────────────────────────────────────────────────────────────────────
const lab6 = [
  h1("Lab Session 6: System Design & UML Modeling"),
  h2("Objectives"),
  bullet("Design system architecture"),
  bullet("Apply UML for software modeling"),
  spacer(),
  h2("Theory Overview"),
  para("System design defines how the software will be structured and how components will interact. Good design ensures low coupling, high cohesion, maintainability, and scalability. UML diagrams communicate design intent clearly."),
  spacer(),
  h2("System Architecture"),
  para("The system follows a full-stack monorepo architecture using Next.js 16 App Router, effectively a 3-tier architecture:"),
  bullet("Presentation Layer: React Server Components + Client Components"),
  bullet("Business Logic Layer: Next.js API Routes + AI algorithms"),
  bullet("Data Layer: PostgreSQL via Prisma ORM on Neon"),
  spacer(),
  para("Architecture Diagram:"),
  code("Client Browser"),
  code("      ↓ HTTPS"),
  code("Next.js 16 on Vercel"),
  code("  ├── App Router (RSC + Client Components)"),
  code("  ├── API Routes (REST)"),
  code("  └── Middleware (auth + role protection)"),
  code("      ↓"),
  code("  Prisma ORM (v7)        Adzuna Jobs API"),
  code("      ↓"),
  code("  Neon PostgreSQL (Serverless)"),
  code("  Users | Jobs | Applications | Skills"),
  code("  Notifications | SavedJobs | Accounts"),
  spacer(),
  h2("Class Diagram (Simplified)"),
  makeTable(
    ["Model", "Key Fields", "Relationships"],
    [
      ["User", "id, name, email, role, skills[], experience, resumeUrl, onboarded, publicProfile, showResumeScore", "Has many: Application, SavedJob, Notification"],
      ["Job", "id, title, description, companyName, location, requiredSkills[], employerId", "Has many: Application, SavedJob"],
      ["Application", "id, userId, jobId, status, matchScore", "Unique(userId, jobId)"],
      ["Skill", "id, name, category", "—"],
      ["Notification", "id, userId, title, message, read, link", "Belongs to: User"],
    ]
  ),
  spacer(),
  h2("Sequence Diagram — Apply to Job"),
  code("JobSeeker → UI: Click Apply"),
  code("UI → POST /api/applications: { jobId }"),
  code("API → DB: Check existing application (userId + jobId)"),
  code("DB → API: Not found"),
  code("API → DB: Fetch user skills"),
  code("API → DB: Fetch job requiredSkills"),
  code("API: computeMatch(userSkills, jobSkills) → matchScore"),
  code("API → DB: Create Application record"),
  code("API → DB: Create Notification for employer"),
  code("API → UI: 200 OK { matchScore }"),
  code("UI → JobSeeker: Show success toast with match %"),
  spacer(),
  h2("Key Learning"),
  para("Designing the schema and sequence flows before coding prevented several structural issues — particularly around the unique constraint on applications and the notification trigger logic."),
  pageBreak(),
];

// ─── LAB 7 ─────────────────────────────────────────────────────────────────────
const lab7 = [
  h1("Lab Session 7: Reliability, Dependability & Security Engineering"),
  h2("Objectives"),
  bullet("Identify system risks and failures"),
  bullet("Design reliable and secure systems"),
  spacer(),
  h2("Theory Overview"),
  para("Dependability encompasses reliability (system performs correctly), availability (system is accessible), security (system resists attacks), and maintainability (system can be updated). Security engineering protects systems from misuse, data breaches, and unauthorized access."),
  spacer(),
  h2("Failure Scenarios & Mitigations"),
  makeTable(
    ["Failure Scenario", "Likelihood", "Impact", "Mitigation"],
    [
      ["Adzuna API unavailable", "Medium", "Low", "Graceful fallback; live jobs tab shows empty state without breaking the page"],
      ["Database connection timeout", "Low", "High", "Neon serverless auto-scales; Prisma connection pooling configured"],
      ["Unauthorized role escalation", "Low", "Critical", "Admin role only assignable via seed script; not selectable in UI"],
      ["Duplicate application submission", "Medium", "Medium", "DB-level unique constraint on (userId, jobId)"],
      ["Session hijacking", "Low", "High", "JWT strategy with short expiry; OAuth only — no password storage"],
    ]
  ),
  spacer(),
  h2("Reliability Targets"),
  bullet("System uptime: 99.9% (leveraging Vercel + Neon SLAs)"),
  bullet("API response time: under 2 seconds for all dashboard routes"),
  bullet("Match score calculation: deterministic — same inputs always produce same output"),
  bullet("Zero data loss on application submission (DB write confirmed before response)"),
  spacer(),
  h2("Security Controls Implemented"),
  makeTable(
    ["Threat", "Control"],
    [
      ["Unauthorized access", "OAuth-only auth via NextAuth.js v5; no public registration without provider"],
      ["Privilege escalation", "Role-based middleware checks on every protected route"],
      ["Cross-tenant data access", "Employers can only edit/delete their own jobs; ownership verified in API"],
      ["Notification snooping", "Users can only read/update their own notifications (userId verified server-side)"],
      ["Secret exposure", "All credentials in .env; never committed to Git"],
      ["Double application", "Unique DB constraint prevents bypass even if client-side guard is skipped"],
    ]
  ),
  spacer(),
  h2("Key Learning"),
  para("Security cannot be added as an afterthought. Building ownership checks and role verification into the API layer from the start prevented entire categories of vulnerabilities."),
  pageBreak(),
];

// ─── LAB 8 ─────────────────────────────────────────────────────────────────────
const lab8 = [
  h1("Lab Session 8: Verification, Validation & Software Testing"),
  h2("Objectives"),
  bullet("Ensure system correctness through systematic testing"),
  bullet("Design test cases and a requirement traceability matrix"),
  spacer(),
  h2("Theory Overview"),
  para("Verification asks 'are we building the system right?' while validation asks 'are we building the right system?' Testing increases confidence in correctness but cannot prove the absence of all bugs."),
  spacer(),
  h2("Test Plan Summary"),
  makeTable(
    ["Test Type", "Scope", "Method"],
    [
      ["Build Verification", "All TypeScript files", "pnpm build — zero type errors required"],
      ["API Testing", "All 25+ API endpoints", "Browser + curl manual testing"],
      ["Role-Based Access", "STUDENT / EMPLOYER / ADMIN routes", "Manual login with each role"],
      ["DB Migration", "Schema integrity", "9 migrations applied and validated"],
      ["UI/UX", "Light/dark mode, mobile responsiveness", "Manual verification across browsers"],
      ["AI Algorithm", "Match score calculation", "Manual calculation cross-checked with output"],
      ["Notification Triggers", "Apply → employer notified; status change → student notified", "End-to-end manual testing"],
    ]
  ),
  spacer(),
  h2("Test Cases"),
  makeTable(
    ["TC ID", "Test Case", "Expected Output", "Result"],
    [
      ["TC01", "Apply to job with matching skills", "Match score ~81.6%, application saved", "Pass"],
      ["TC02", "Duplicate application prevention", "Error: 'Already applied'", "Pass"],
      ["TC03", "STUDENT access to /admin route", "Redirect to /overview", "Pass"],
      ["TC04", "Employer edits another employer's job", "403 Forbidden", "Pass"],
      ["TC05", "Unauthenticated user accesses /profile", "Redirect to login", "Pass"],
      ["TC06", "CV upload skill extraction", "Skills array populated from parsed content", "Pass"],
      ["TC07", "Notification on application submit", "Employer receives in-app notification", "Pass"],
      ["TC08", "Mark single notification as read", "Notification read=true in DB", "Pass"],
      ["TC09", "Resume score calculation", "Score between 60–100 for strong profile", "Pass"],
      ["TC10", "Adzuna live jobs with AI scoring", "Live jobs returned with match %", "Pass"],
    ]
  ),
  spacer(),
  h2("Requirement Traceability Matrix"),
  makeTable(
    ["Requirement", "Use Case", "Test Case"],
    [
      ["FR04: Match score on application", "UC02", "TC01"],
      ["FR05: Skill gap analysis", "UC03", "Verified in applications page"],
      ["FR01: OAuth authentication", "UC01", "TC05"],
      ["FR09: Auto-notifications", "UC02, UC06", "TC07, TC08"],
      ["NFR02: Route protection", "UC01", "TC03, TC04, TC05"],
    ]
  ),
  spacer(),
  h2("Key Learning"),
  para("Systematic test cases caught edge cases that informal testing would have missed — particularly around ownership validation and the duplicate application scenario."),
  pageBreak(),
];

// ─── LAB 9 ─────────────────────────────────────────────────────────────────────
const lab9 = [
  h1("Lab Session 9: Coding, Implementation & Version Control"),
  h2("Objectives"),
  bullet("Implement system modules following the design"),
  bullet("Apply clean coding practices and version control"),
  spacer(),
  h2("Theory Overview"),
  para("Good implementation follows the design, adheres to coding standards, and uses version control to enable collaboration and rollback. Secure coding practices prevent vulnerabilities from being introduced during implementation."),
  spacer(),
  h2("Implementation Summary"),
  para("The system is implemented as a Next.js 16 App Router monorepo with TypeScript throughout. Key implementation decisions:"),
  bullet("All API routes are in app/api/ following REST conventions"),
  bullet("Server Components used where no client interaction is needed (reduced JS bundle)"),
  bullet("Client Components used only where state, events, or browser APIs are required"),
  bullet("Prisma ORM handles all DB queries with type-safe generated client"),
  bullet("NextAuth.js v5 manages sessions with JWT strategy"),
  spacer(),
  h2("Core Algorithm Implementation"),
  h3("Cosine Similarity — Match Score"),
  code("function computeMatch(userSkills: string[], jobSkills: string[]): number {"),
  code("  const u = userSkills.map(s => s.toLowerCase());"),
  code("  const j = jobSkills.map(s => s.toLowerCase());"),
  code("  const intersection = u.filter(s => j.includes(s)).length;"),
  code("  if (u.length === 0 || j.length === 0) return 0;"),
  code("  return (intersection / Math.sqrt(u.length * j.length)) * 100;"),
  code("}"),
  spacer(),
  h3("Skill Gap Analysis"),
  code("function getSkillGap(userSkills: string[], jobSkills: string[]): string[] {"),
  code("  const u = userSkills.map(s => s.toLowerCase());"),
  code("  return jobSkills.filter(s => !u.includes(s.toLowerCase()));"),
  code("}"),
  spacer(),
  h3("Resume Scoring"),
  code("function computeResumeScore(skills: string[], demand: number, experience: string | null): number {"),
  code("  const skillScore = Math.min((skills.length / 10) * 40, 40);"),
  code("  const demandScore = Math.min((demand / 100) * 40, 40);"),
  code("  const expScore = experience ? 20 : 0;"),
  code("  return Math.round(skillScore + demandScore + expScore);"),
  code("}"),
  spacer(),
  h2("Version Control"),
  bullet("Git repository: github.com/tasnimbinteyy/Job-Recommendation-System"),
  bullet("Branching: Feature branches merged via pull requests to main"),
  bullet("CI/CD: Vercel auto-deploys on every merge to main"),
  bullet("9 database migrations tracked and version-controlled with Prisma"),
  spacer(),
  h2("Secure Coding Practices Applied"),
  bullet("No raw SQL — all queries go through Prisma ORM (prevents SQL injection)"),
  bullet("Input validation at API level before DB writes"),
  bullet("Role and ownership checks in every mutating API route"),
  bullet("Environment variables for all secrets"),
  spacer(),
  h2("Key Learning"),
  para("Keeping the AI algorithms clean and self-contained made them easy to test and reuse across different parts of the system — applications, live jobs, the AI agent modal, and recommendations."),
  pageBreak(),
];

// ─── LAB 10 ────────────────────────────────────────────────────────────────────
const lab10 = [
  h1("Lab Session 10: Maintenance, Ethics & Final Review"),
  h2("Objectives"),
  bullet("Understand post-deployment software challenges"),
  bullet("Address ethical responsibilities in software systems"),
  bullet("Present the final project"),
  spacer(),
  h2("Theory Overview"),
  para("Studies consistently show that the majority of a software system's total cost occurs during maintenance — not initial development. Engineers have an ethical obligation to build systems that are fair, transparent, secure, and respectful of user privacy."),
  spacer(),
  h2("Maintenance Plan"),
  makeTable(
    ["Activity", "Trigger", "Approach"],
    [
      ["Schema changes", "New feature requiring DB update", "pnpm prisma migrate dev → new migration → PR → auto-deploy"],
      ["Dependency updates", "Security advisories or version releases", "pnpm update → test build → merge"],
      ["Bug fixes", "User reports or monitoring alerts", "Feature branch → fix → PR → deploy"],
      ["New features", "Stakeholder requests", "New sprint → requirements → design → implement → test → deploy"],
      ["Admin operations", "User role management", "Via /admin/users panel in the live system"],
      ["API key rotation", "Adzuna / OAuth credential changes", "Update in Vercel environment variables"],
    ]
  ),
  spacer(),
  h2("Planned Enhancements"),
  bullet("Email alerts via AWS SES for application status changes"),
  bullet("Mobile application using React Native"),
  bullet("NLP-based skill extraction from job descriptions"),
  bullet("Advanced analytics dashboard for employers"),
  bullet("Weighted skill matching (some skills worth more than others)"),
  spacer(),
  h2("Ethical Analysis"),
  makeTable(
    ["Ethical Issue", "Concern", "How the System Addresses It"],
    [
      ["Algorithmic bias", "Cosine Similarity may favor candidates with more skills regardless of quality", "Score is displayed as one signal among many; not the sole decision factor"],
      ["Data privacy", "User profile and skill data is sensitive", "Privacy settings allow users to hide profiles and resume scores; data is never sold"],
      ["Transparency", "Users should understand how they are matched", "The 'How It Works' page fully explains the algorithm with code examples"],
      ["Access equity", "OAuth-only login may exclude some users", "GitHub and Google are widely accessible; email auth planned for future"],
      ["Role manipulation", "Admin role grants system-wide access", "Admin role is only assignable via seed script — not through any UI"],
      ["Data retention", "Deleted accounts should remove personal data", "DELETE /api/account/delete removes user record and cascades to related data"],
    ]
  ),
  spacer(),
  h2("Final Project Summary"),
  makeTable(
    ["Metric", "Value"],
    [
      ["API Endpoints", "25+"],
      ["Database Tables", "8"],
      ["DB Migrations", "9"],
      ["Sprint Cycles", "5"],
      ["Role Types", "3 (Student, Employer, Admin)"],
      ["Core AI Algorithms", "3 (Cosine Similarity, Skill Gap, Resume Scoring)"],
      ["Live Deployment", "Vercel + Neon PostgreSQL"],
    ]
  ),
  spacer(),
  h2("Key Learning from the Full Lab Series"),
  para("Software engineering is not just about writing code — it is about solving the right problem, in the right way, for the right people, with appropriate care for quality, security, ethics, and long-term maintainability. Every phase from requirements to deployment contributed something real to the final system."),
  spacer(),
  new Paragraph({
    children: [
      new TextRun({ text: "Repository: ", bold: true, size: 22 }),
      new TextRun({ text: "https://github.com/tasnimbinteyy/Job-Recommendation-System", size: 22, color: BLUE }),
    ],
    spacing: { before: 100, after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Live System: ", bold: true, size: 22 }),
      new TextRun({ text: "https://job-recommendation-system-delta.vercel.app", size: 22, color: BLUE }),
    ],
    spacing: { before: 60, after: 100 },
  }),
];

// ─── BUILD DOCUMENT ─────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22, color: DARK },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 32, color: BLUE, font: "Calibri" },
        paragraph: { spacing: { before: 400, after: 160 } },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 26, color: "1E3A5F", font: "Calibri" },
        paragraph: { spacing: { before: 300, after: 120 } },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        run: { bold: true, size: 24, color: "374151", font: "Calibri" },
        paragraph: { spacing: { before: 200, after: 80 } },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      children: [
        ...coverPage,
        ...lab1,
        ...lab2,
        ...lab3,
        ...lab4,
        ...lab5,
        ...lab6,
        ...lab7,
        ...lab8,
        ...lab9,
        ...lab10,
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("Lab_Report_Job_Recommendation_System.docx", buffer);
console.log("Done: Lab_Report_Job_Recommendation_System.docx");
