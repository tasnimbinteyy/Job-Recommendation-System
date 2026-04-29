# Modeling Skill Affinity for Personalized Employment Matching Systems

> DMS Project — Full Stack AI-Powered Job Recommendation System

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

🔗 Live: https://job-recommendation-system-delta.vercel.app

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

| Feature | Description |
|---|---|
| AI Job Matching | Cosine Similarity algorithm calculates match % per job |
| Skill Gap Analysis | Identifies missing skills per application |
| Resume Scoring | 0–100 score based on skills, market demand, experience |
| Company Recommendations | Companies ranked by avg skill match score |
| Role-Based Dashboard | Separate UI for Job Seeker, Employer, Admin |
| Onboarding Flow | New users select role after first login |
| Full CRUD | Jobs, Skills, Applications — create, read, update, delete |

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

Database Design Decision: Normalized relational schema with:

- `User` — stores role, skills, experience
- `Job` — stores required skills for AI matching
- `Application` — stores computed match score
- `Skill` — master skills library
- `Account` — OAuth provider tokens

Phase 4 — Implementation (Sprints)

| Sprint | Deliverables |
|---|---|
| Sprint 1 | Jobs CRUD, search, auth protection, toast notifications |
| Sprint 2 | Browse Jobs, Cosine Similarity matching, Skill Gap Analysis, Overview stats, Candidates page, Skills Library |
| Sprint 3 | Profile page, Resume Scoring API, Company Recommendations, Featured Jobs (real DB) |
| Sprint 4 | Employer Application Management, Role-based dashboard, Onboarding flow, Admin panel, How It Works page |

Phase 5 — Testing

| Type | Coverage |
|---|---|
| Build verification | ✅ Zero errors across 30 routes |
| API testing | ✅ All endpoints tested via browser + curl |
| Role-based access | ✅ Middleware tested for STUDENT/EMPLOYER/ADMIN |
| DB migration | ✅ 5 migrations applied, schema validated |
| Light/Dark mode | ✅ All dashboard pages verified |
| Onboarding flow | ✅ New user → role select → dashboard |

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
┌─────────────────────────▼───────────────────────────┐
│                  Prisma ORM (v7)                     │
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│           Neon PostgreSQL (Serverless)               │
│  Users │ Jobs │ Applications │ Skills │ Accounts     │
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
  const u = userSkills.map(s => s.toLowerCase());
  const j = jobSkills.map(s => s.toLowerCase());
  const intersection = u.filter(s => j.includes(s)).length;
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

| Component | Max Points | Criteria |
|---|---|---|
| Skill Count | 40 pts | More relevant skills = higher score |
| Market Demand | 40 pts | How in-demand your skills are in current job postings |
| Experience | 20 pts | Experience section filled in profile |

Company Recommendations

Companies are ranked by average Cosine Similarity score across all their job postings, personalized per user's skill set. Sorted from highest to lowest match.

---

## 5. Role-Based Access Control

Three Stakeholder Types

| Role | Access | Dashboard |
|---|---|---|
| STUDENT | Browse jobs, apply, track applications, resume score, company recommendations | `/overview` |
| EMPLOYER | Post/manage own jobs, view applicants, update application status | `/jobs` |
| ADMIN | All users, all jobs, all applications, role management | `/admin` |

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
  id            String        @id @default(cuid())
  email         String?       @unique
  role          Role          @default(STUDENT)
  onboarded     Boolean       @default(false)
  skills        String[]
  experience    String?
  applications  Application[]
  jobsPosted    Job[]         @relation("EmployerJobs")
  accounts      Account[]
}

model Job {
  id             String        @id @default(cuid())
  title          String
  companyName    String
  location       String
  requiredSkills String[]
  employerId     String
  applications   Application[]
}

model Application {
  id         String  @id @default(cuid())
  status     String  @default("PENDING")
  matchScore Float?
  userId     String
  jobId      String
  @@unique([userId, jobId])
}

model Skill {
  id       String @id @default(cuid())
  name     String @unique
  category String
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

| Migration | Description |
|---|---|
| `init` | Initial schema — User, Job, Application, Account |
| `add_skill_model` | Added Skill model with category |
| `add_onboarded_field` | Added onboarded boolean to User |
| `remove_session_verificationtoken` | Removed unused Session and VerificationToken tables (JWT strategy used) |

---

## 7. API Reference

Public

| Method | Route | Description |
|---|---|---|
| GET | `/api/jobs` | List all jobs — supports `?search=` and `?employerOnly=true` |
| GET | `/api/companies` | List companies aggregated from jobs |

Authenticated

| Method | Route | Description |
|---|---|---|
| POST | `/api/jobs` | Create job (EMPLOYER only) |
| GET / PUT / DELETE | `/api/jobs/[id]` | Get, update, delete job |
| GET | `/api/applications` | Role-based — STUDENT gets own, EMPLOYER gets applicants |
| POST | `/api/applications` | Apply to job (calculates match score) |
| PATCH / DELETE | `/api/applications/[id]` | Update status / withdraw application |
| GET | `/api/candidates` | All STUDENT users |
| GET / PATCH | `/api/candidates/[id]` | Get candidate, update skills/experience |
| GET / POST | `/api/skills` | List skills, create skill |
| PUT / DELETE | `/api/skills/[id]` | Update, delete skill |
| GET | `/api/stats` | Dashboard stats |
| GET | `/api/resume-score` | Resume score + feedback |
| GET | `/api/recommendations` | AI company recommendations |
| POST | `/api/onboarding` | Save user role after onboarding |

Admin Only

| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/users` | All users with stats |
| PATCH | `/api/admin/users` | Change user role |

---

## 8. Pages & Routes

Public Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, How It Works, Features, Featured Jobs |
| `/browse` | Browse all jobs with AI match score |
| `/companies` | Company listings from real DB |
| `/how-it-works` | Blog-style system documentation |
| `/about` | About page |

Dashboard (Protected — Login Required)

| Route | Role | Description |
|---|---|---|
| `/overview` | All | Real-time stats, top skills chart, AI score |
| `/jobs` | All / Employer | Employer: own jobs. Others: all jobs |
| `/jobs/add` | Employer | Post new job |
| `/jobs/[id]/edit` | Employer | Edit own job |
| `/applications` | All | Student: own apps. Employer: manage applicants |
| `/candidates` | All | All candidates with skill gap analysis |
| `/skills` | All | Skills library — full CRUD |
| `/profile` | Student | Career DNA — skills, radar chart, resume score |
| `/recommendations` | Student | AI company recommendations |
| `/settings` | All | App settings |

Admin Panel

| Route | Description |
|---|---|
| `/admin` | Admin dashboard with system stats |
| `/admin/users` | User management — view all, change roles |

---

## 9. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.1.6 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Database | PostgreSQL (Neon) | — |
| ORM | Prisma | 7.x |
| Auth | NextAuth.js | v5 beta |
| Charts | Recharts | 3.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React + Tabler Icons | — |
| Notifications | Sonner | 2.x |
| Deployment | Vercel | — |

---

## 10. Installation & Setup

Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database (Neon recommended)
- Google OAuth credentials
- GitHub OAuth credentials

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

6. Set up Admin account

```bash
# Login to the site first with ADMIN_EMAIL, then run:
pnpm seed
```

---

## 11. Deployment

Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel Dashboard — https://vercel.com
3. Add all environment variables from `.env`
4. Deploy — Vercel auto-detects Next.js

Post-Deployment Admin Setup

```bash
# Run from local machine — connects to the same Neon DB
pnpm seed
```

---

## 12. Security

| Measure | Implementation |
|---|---|
| Authentication | Google & GitHub OAuth via NextAuth.js v5 |
| Session Strategy | JWT — stateless, no DB session storage |
| Route Protection | Middleware (proxy.ts) — role + onboarded check |
| Admin Protection | `/admin/*` — ADMIN role required at middleware level |
| Ownership Checks | Employers can only edit/delete their own jobs |
| Duplicate Prevention | `@@unique([userId, jobId])` prevents double applications |
| Role Assignment | Admin role only via `pnpm seed` — not publicly selectable |
| Environment Variables | All secrets in `.env`, never committed to git |

---

## 13. Author

Tasnim Bintey Nayeem
GitHub: [@tasnimbinteyy](https://github.com/tasnimbinteyy)
