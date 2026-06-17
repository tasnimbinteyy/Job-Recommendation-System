# AI-Powered Job Recommendation System

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

🔗 Live: https://jobai-phi.vercel.app/browse

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [SDLC Phases](#2-sdlc-phases)
3. [System Architecture](#3-system-architecture)
4. [AI Algorithms](#4-ai-algorithms)
5. [Role-Based Access Control](#5-role-based-access-control)
6. [Database Design](#6-database-design)
7. [API Reference](#7-api-reference)
8. [Pages & Routes](#8-pages--routes)
9. [Tech Stack](#9-tech-stack)
10. [Installation & Setup](#10-installation--setup)
11. [Deployment](#11-deployment)
12. [Security](#12-security)
13. [Author](#13-author)

---

## 1. Project Overview

A full-stack AI-powered job recommendation platform built with Next.js 16 App Router. The system uses Cosine Similarity to match candidates with jobs, provides skill-gap analysis, resume scoring, and a company recommendation dashboard — all backed by a real PostgreSQL database on Neon.

| Feature                  | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| AI Job Matching          | Cosine Similarity algorithm calculates match % per job                   |
| Skill Gap Analysis       | Identifies missing skills per application                                |
| Resume Scoring           | 0–100 score based on skills, market demand, experience                   |
| Company Recommendations  | Companies ranked by avg skill match score                                |
| Role-Based Dashboard     | Separate UI for Job Seeker, Employer, Admin                              |
| Onboarding Flow          | New users select role after first login                                  |
| Full CRUD                | Jobs, Skills, Applications — create, read, update, delete                |
| Saved Jobs               | Users can bookmark jobs for later                                        |
| Notifications            | Auto-triggered in-app notifications with individual read support         |
| CV Upload                | Upload and parse resume/CV file — skills auto-extracted                  |
| Newsletter               | Email newsletter subscription                                            |
| AI Agent Modal           | Hero page button runs live AI scan — resume score + top job matches      |
| Live Jobs (Adzuna)       | Real-world job listings from Adzuna API with AI match score              |
| Privacy Settings         | Public profile toggle, resume score visibility control                   |
| Admin Panel              | Full user, job, application, and skills management                       |

---

## 2. SDLC Phases

Phase 1 — Planning

- Objective: Build an AI-powered employment matching system for a university DMS project
- Stakeholders: Students (job seekers), Employers (hiring), Admin (system management)
- Constraints: Free-tier infrastructure, no paid AI APIs, deployable on Vercel
- Methodology: Agile — 4 sprints, incremental delivery

Phase 2 — Requirements Analysis

Functional Requirements:

- Users can register via Google or GitHub OAuth
- New users complete a role-selection onboarding flow
- Job Seekers can browse jobs, apply, track applications, view resume score
- Employers can post jobs, view applicants, update application status
- Admins can manage all users, change roles, view system stats
- AI calculates match score on every job application
- System identifies skill gaps per application
- Notifications auto-triggered on application submit and status change
- Live external jobs fetched from Adzuna API with AI match scoring

Non-Functional Requirements:

- Page load under 2 seconds (client-side filtering, no re-fetching)
- Role-based route protection at middleware level
- Light/dark mode support across all pages
- Mobile-responsive UI
- Zero-downtime deployment via Vercel

Phase 3 — System Design

Architecture Decision: Next.js App Router (full-stack monorepo)

- Frontend: React Server/Client Components
- Backend: Next.js API Routes
- Database: PostgreSQL via Prisma ORM
- Auth: NextAuth.js v5 with JWT strategy
- Hosting: Vercel + Neon (serverless PostgreSQL)
- External API: Adzuna Jobs API for live job listings

Database Design Decision: Normalized relational schema with:

- `User` — stores role, skills, experience, resume URL, privacy preferences
- `Job` — stores required skills for AI matching
- `Application` — stores computed match score
- `Skill` — master skills library
- `Account` — OAuth provider tokens
- `Notification` — per-user in-app notifications with auto-triggers
- `SavedJob` — bookmarked jobs per user
- `NewsletterSubscriber` — email newsletter subscriptions

Phase 4 — Implementation (Sprints)

| Sprint   | Deliverables                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Sprint 1 | Jobs CRUD, search, auth protection, toast notifications                                                                               |
| Sprint 2 | Browse Jobs, Cosine Similarity matching, Skill Gap Analysis, Overview stats, Candidates page, Skills Library                          |
| Sprint 3 | Profile page, Resume Scoring API, Company Recommendations, Featured Jobs (real DB)                                                    |
| Sprint 4 | Employer Application Management, Role-based dashboard, Onboarding flow, Admin panel, How It Works page                               |
| Sprint 5 | Notification system (auto-triggers), AI Agent Modal, Live Jobs (Adzuna API), Privacy settings, Admin jobs/applications/skills panels  |

Phase 5 — Testing

| Type                  | Coverage                                                        |
| --------------------- | --------------------------------------------------------------- |
| Build verification    | ✅ Zero TypeScript errors across all routes                     |
| API testing           | ✅ All endpoints tested via browser + curl                      |
| Role-based access     | ✅ Middleware tested for STUDENT/EMPLOYER/ADMIN                 |
| DB migration          | ✅ 9 migrations applied, schema validated                       |
| Light/Dark mode       | ✅ All dashboard and public pages verified                      |
| Onboarding flow       | ✅ New user → role select → dashboard                           |
| Notification triggers | ✅ Apply → employer notified, status change → student notified  |
| AI Agent Modal        | ✅ Scan → resume score + top matches + company recommendation   |
| Live Jobs             | ✅ Adzuna API connected, AI match score applied to live jobs    |
| Privacy settings      | ✅ DB-persisted, toggle works for both preferences              |

Phase 6 — Deployment

- Platform: Vercel (automatic CI/CD from GitHub)
- Database: Neon PostgreSQL (serverless, auto-scaling)
- Environment Variables: Set in Vercel dashboard
- Admin Setup: `pnpm seed` run locally after first login

Phase 7 — Maintenance

- Schema changes via `pnpm prisma migrate dev`
- New features via feature branches → PR → merge to main → auto-deploy
- Admin can manage user roles via `/admin/users` panel

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Browser                    │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│              Next.js 16 (Vercel Edge)                │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  App Router │  │  API Routes  │  │ Middleware  │  │
│  │  (RSC/CSR)  │  │  (REST API)  │  │ (proxy.ts) │  │
│  └─────────────┘  └──────┬───────┘  └────────────┘  │
└─────────────────────────┬───────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
┌─────────▼──────────┐       ┌────────────▼───────────┐
│   Prisma ORM (v7)  │       │   Adzuna Jobs API       │
└─────────┬──────────┘       │   (External Live Jobs)  │
          │                  └────────────────────────┘
┌─────────▼──────────────────────────────────────────┐
│           Neon PostgreSQL (Serverless)              │
│  Users │ Jobs │ Applications │ Skills │ Accounts    │
│  Notifications │ SavedJobs │ NewsletterSubscribers  │
└─────────────────────────────────────────────────────┘
```

---

## 4. AI Algorithms

Cosine Similarity — Job Matching

When a candidate applies to a job, the system calculates a match score using Cosine Similarity — the same algorithm used by search engines and recommendation systems.

```
userSkills   = ["React", "TypeScript", "Node.js"]
jobSkills    = ["React", "TypeScript", "PostgreSQL", "Docker"]

intersection = ["React", "TypeScript"] → 2
matchScore   = (2 / √(3 × 4)) × 100 = 57.7%
```

```typescript
function computeMatch(userSkills: string[], jobSkills: string[]): number {
  const u = userSkills.map((s) => s.toLowerCase());
  const j = jobSkills.map((s) => s.toLowerCase());
  const intersection = u.filter((s) => j.includes(s)).length;
  return (intersection / Math.sqrt(u.length * j.length)) * 100;
}
```

Skill Gap Analysis

After applying, the system identifies which skills the candidate is missing for each job.

```
gap = jobRequiredSkills − candidateSkills
    = ["PostgreSQL", "Docker"]
```

Shown per application in the Candidates and Applications pages.

Resume Scoring (0–100)

| Component     | Max Points | Criteria                                              |
| ------------- | ---------- | ----------------------------------------------------- |
| Skill Count   | 40 pts     | More relevant skills = higher score                   |
| Market Demand | 40 pts     | How in-demand your skills are in current job postings |
| Experience    | 20 pts     | Experience section filled in profile                  |

Company Recommendations

Companies are ranked by average Cosine Similarity score across all their job postings, personalized per user's skill set. Sorted from highest to lowest match.

AI Agent Modal

Clicking "Activate AI Agent" on the homepage runs a live 3-step scan:
1. Animated scan with progress bar (fetches resume score + jobs + recommendations in parallel)
2. Results — Resume Score, Top 3 matched jobs, Best company match
3. Action buttons — View all matches, Update profile, Company recommendations

Live Jobs AI Matching

External jobs fetched from Adzuna API are also scored using the same Cosine Similarity algorithm against the user's skills — skills are extracted from job titles and descriptions automatically.

---

## 5. Role-Based Access Control

Three Stakeholder Types

| Role     | Access                                                                        | Dashboard   |
| -------- | ----------------------------------------------------------------------------- | ----------- |
| STUDENT  | Browse jobs, apply, track applications, resume score, company recommendations | `/overview` |
| EMPLOYER | Post/manage own jobs, view applicants, update application status              | `/jobs`     |
| ADMIN    | All users, all jobs, all applications, skills management, role management     | `/admin`    |

Onboarding Flow

```
New User Login
      ↓
/onboarding  →  Select: Job Seeker / Employer
      ↓
Role saved to DB → JWT token updated
      ↓
STUDENT  →  /overview
EMPLOYER →  /jobs
```

Admin Setup (after deployment)

```bash
# 1. Add to .env
ADMIN_EMAIL="your-email@gmail.com"

# 2. Login to the site with that email first

# 3. Run seed script
pnpm seed
```

Route Protection (Middleware)

```
/admin/*       →  ADMIN only
/overview/*    →  Authenticated + Onboarded
/jobs/*        →  Authenticated + Onboarded
/profile/*     →  Authenticated + Onboarded
/onboarding    →  Authenticated + NOT yet Onboarded
```

---

## 6. Database Design

Schema

```prisma
model User {
  id               String         @id @default(cuid())
  name             String?
  email            String?        @unique
  image            String?
  role             Role           @default(STUDENT)
  onboarded        Boolean        @default(false)
  publicProfile    Boolean        @default(true)
  showResumeScore  Boolean        @default(true)
  skills           String[]
  experience       String?
  resumeUrl        String?
  createdAt        DateTime       @default(now())
  applications     Application[]
  jobsPosted       Job[]          @relation("EmployerJobs")
  accounts         Account[]
  notifications    Notification[]
  savedJobs        SavedJob[]
}

model Job {
  id             String        @id @default(cuid())
  title          String
  description    String
  companyName    String
  location       String
  salaryRange    String?
  requiredSkills String[]
  employerId     String
  createdAt      DateTime      @default(now())
  applications   Application[]
  savedBy        SavedJob[]
  @@index([title])
}

model Application {
  id         String   @id @default(cuid())
  status     String   @default("PENDING")
  matchScore Float?
  userId     String
  jobId      String
  createdAt  DateTime @default(now())
  @@unique([userId, jobId])
  @@index([userId])
  @@index([jobId])
}

model Skill {
  id        String   @id @default(cuid())
  name      String   @unique
  category  String   @default("General")
  createdAt DateTime @default(now())
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  title     String
  message   String
  read      Boolean  @default(false)
  link      String?
  createdAt DateTime @default(now())
  @@index([userId])
}

model SavedJob {
  id        String   @id @default(cuid())
  userId    String
  jobId     String
  createdAt DateTime @default(now())
  @@unique([userId, jobId])
  @@index([userId])
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}

model Account {
  // OAuth provider tokens (Google/GitHub)
}

enum Role {
  STUDENT
  EMPLOYER
  ADMIN
}
```

Migrations

| Migration                          | Description                                                             |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `init`                             | Initial schema — User, Job, Application, Account                        |
| `updated_migration`                | Schema refinements post-init                                            |
| `add_skill_model`                  | Added Skill model with category                                         |
| `add_onboarded_field`              | Added onboarded boolean to User                                         |
| `remove_session_verificationtoken` | Removed unused Session and VerificationToken tables (JWT strategy used) |
| `add_notifications_savedjobs`      | Added Notification and SavedJob models                                  |
| `add_newsletter_subscriber`        | Added NewsletterSubscriber model                                        |
| `add_performance_indexes`          | Added DB indexes on userId, jobId, title for query performance          |
| `add_privacy_preferences`          | Added publicProfile and showResumeScore fields to User                  |

---

## 7. API Reference

Public

| Method | Route                  | Description                                                  |
| ------ | ---------------------- | ------------------------------------------------------------ |
| GET    | `/api/jobs`            | List all jobs — supports `?search=` and `?employerOnly=true` |
| GET    | `/api/companies`       | List companies aggregated from jobs                          |
| GET    | `/api/external-jobs`   | Live jobs from Adzuna API — supports `?q=` search query      |

Authenticated

| Method              | Route                       | Description                                             |
| ------------------- | --------------------------- | ------------------------------------------------------- |
| POST                | `/api/jobs`                 | Create job (EMPLOYER only)                              |
| GET / PUT / DELETE  | `/api/jobs/[id]`            | Get, update, delete job                                 |
| GET                 | `/api/applications`         | Role-based — STUDENT gets own, EMPLOYER gets applicants |
| POST                | `/api/applications`         | Apply to job (calculates match score + notifies employer)|
| PATCH / DELETE      | `/api/applications/[id]`    | Update status (notifies student) / withdraw application |
| GET                 | `/api/candidates`           | All STUDENT users                                       |
| GET / PATCH         | `/api/candidates/[id]`      | Get candidate, update skills/experience/privacy         |
| GET / POST          | `/api/skills`               | List skills, create skill                               |
| PUT / DELETE        | `/api/skills/[id]`          | Update, delete skill                                    |
| GET                 | `/api/stats`                | Dashboard stats                                         |
| GET                 | `/api/resume-score`         | Resume score + feedback                                 |
| GET                 | `/api/recommendations`      | AI company recommendations                              |
| POST                | `/api/onboarding`           | Save user role after onboarding                         |
| GET / POST          | `/api/notifications`        | List notifications / Admin creates manual notification  |
| PATCH               | `/api/notifications`        | Mark all notifications as read                          |
| PATCH               | `/api/notifications/[id]`   | Mark single notification as read                        |
| GET / POST / DELETE | `/api/saved-jobs`           | Save, list, and unsave jobs                             |
| POST                | `/api/cv-upload`            | Upload and parse CV/resume file                         |
| POST                | `/api/newsletter`           | Subscribe to newsletter                                 |
| DELETE              | `/api/account/delete`       | Delete user account                                     |

Admin Only

| Method | Route              | Description                                    |
| ------ | ------------------ | ---------------------------------------------- |
| GET    | `/api/admin/users` | All users with stats                           |
| PATCH  | `/api/admin/users` | Change user role (notifies the affected user)  |

---

## 8. Pages & Routes

Public Pages

| Route           | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `/`             | Home — Hero with AI Agent Modal, Features, Featured Jobs, CTA  |
| `/browse`       | Browse jobs — Platform Jobs tab + Live Jobs tab (Adzuna)       |
| `/companies`    | Company listings from real DB                                  |
| `/how-it-works` | System documentation — algorithms explained with code          |
| `/about`        | About page with real DB stats                                  |

Dashboard (Protected — Login Required)

| Route              | Role           | Description                                    |
| ------------------ | -------------- | ---------------------------------------------- |
| `/overview`        | All            | Real-time stats, top skills chart, AI score    |
| `/jobs`            | All / Employer | Employer: own jobs. Others: all jobs           |
| `/jobs/add`        | Employer       | Post new job                                   |
| `/jobs/[id]/edit`  | Employer       | Edit own job                                   |
| `/applications`    | All            | Student: own apps. Employer: manage applicants |
| `/candidates`      | All            | All candidates with skill gap analysis         |
| `/skills`          | All            | Skills library — full CRUD                     |
| `/profile`         | Student        | Career DNA — skills, radar chart, resume score |
| `/recommendations` | Student        | AI company recommendations                     |
| `/saved`           | Student        | Saved/bookmarked jobs                          |
| `/settings`        | All            | Profile, Appearance, Account, Privacy settings |

Admin Panel

| Route                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `/admin`               | Admin dashboard with system stats                    |
| `/admin/users`         | User management — view all, change roles             |
| `/admin/jobs`          | View and delete any job in the system                |
| `/admin/applications`  | View and manage all applications across all jobs     |
| `/admin/skills`        | Full skills library management — add, edit, delete   |

---

## 9. Tech Stack

| Layer         | Technology                  | Version |
| ------------- | --------------------------- | ------- |
| Framework     | Next.js App Router          | 16.1.6  |
| Language      | TypeScript                  | 5.x     |
| Styling       | Tailwind CSS                | v4      |
| Database      | PostgreSQL (Neon)           | —       |
| ORM           | Prisma                      | 7.x     |
| Auth          | NextAuth.js                 | v5 beta |
| Charts        | Recharts                    | 3.x     |
| Animations    | Framer Motion               | 12.x    |
| Icons         | Lucide React + Tabler Icons | —       |
| Notifications | Sonner                      | 2.x     |
| Theme         | next-themes                 | 0.4.x   |
| Forms         | React Hook Form             | 7.x     |
| External API  | Adzuna Jobs API             | v1      |
| Deployment    | Vercel                      | —       |

---

## 10. Installation & Setup

Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database (Neon recommended)
- Google OAuth credentials
- GitHub OAuth credentials
- Adzuna API credentials (free at developer.adzuna.com)

1. Clone the repository

```bash
git clone https://github.com/tasnimbinteyy/Job-Recommendation-System
cd Job-Recommendation-System
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="your-secret-min-32-chars"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
ADMIN_EMAIL="your-admin-email@gmail.com"
ADZUNA_APP_ID="your-adzuna-app-id"
ADZUNA_APP_KEY="your-adzuna-app-key"
```

4. Run database migrations

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

5. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

6. Set up Admin account and seed jobs

```bash
# Login to the site first with ADMIN_EMAIL, then run:
pnpm seed
```

This will:
- Set your account as ADMIN
- Seed 36 realistic job listings across 10 categories (tech + non-tech, local + remote)

Seeded Job Categories

| Category | Companies / Roles |
| -------------------- | ----------------------------------------------------------------------- |
| Software Engineering | Brain Station 23, Shohoz, Pathao, Chaldal, bKash, SELISE, Therap BD |
| Mobile Development | Shohoz (React Native), bKash (Android) |
| DevOps & Cloud | Upwork Enterprise Client (Remote) |
| Machine Learning | DataAnnotation Tech (Remote) |
| UI/UX & Design | Shajgoj, Toptal (Remote) |
| Product Management | Pathao, Remote.com (Remote) |
| Marketing & Content | Chaldal, HubSpot (Remote), Shohoz |
| Human Resources | Brain Station 23, Deel (Remote) |
| Finance & Accounting | bKash, Bookkeeper360 (Remote) |
| Business Dev & Sales | SELISE, Salesforce (Remote) |
| Data Analytics | Grameenphone, Fiverr Business (Remote) |
| Operations & PM | Chaldal, Appen (Remote) |
| Customer Success | Shohoz, Automattic (Remote) |

---

## 11. Deployment

Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel Dashboard — https://vercel.com
3. Add all environment variables from `.env` including `ADZUNA_APP_ID` and `ADZUNA_APP_KEY`
4. Deploy — Vercel auto-detects Next.js

Post-Deployment Admin Setup

```bash
# Run from local machine — connects to the same Neon DB
pnpm seed
```

---

## 12. Security

| Measure               | Implementation                                            |
| --------------------- | --------------------------------------------------------- |
| Authentication        | Google & GitHub OAuth via NextAuth.js v5                  |
| Session Strategy      | JWT — stateless, no DB session storage                    |
| Route Protection      | Middleware (proxy.ts) — role + onboarded check            |
| Admin Protection      | `/admin/*` — ADMIN role required at middleware level      |
| Ownership Checks      | Employers can only edit/delete their own jobs             |
| Duplicate Prevention  | `@@unique([userId, jobId])` prevents double applications  |
| Role Assignment       | Admin role only via `pnpm seed` — not publicly selectable |
| Notification Security | Users can only read/update their own notifications        |
| Privacy Controls      | publicProfile + showResumeScore — DB-persisted per user   |
| Environment Variables | All secrets in `.env`, never committed to git             |

---

## 13. Author

Tasnim Bintey Nayeem
GitHub: [@tasnimbinteyy](https://github.com/tasnimbinteyy)
