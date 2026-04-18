# Modeling Skill Affinity for Personalized Employment Matching Systems
### DMS Project – Frontend Version 2

A full-stack **AI-Powered Job Recommendation System** built with Next.js. The system matches candidates with jobs using **Cosine Similarity**, provides **skill-gap analysis**, **resume scoring**, and a **company recommendation dashboard** — all backed by a real PostgreSQL database.

---

## 🌐 Live Deployment
🔗 **Vercel URL:** https://job-recommendation-system-delta.vercel.app/

---

## 📌 Project Overview

This project is a Next.js-based Administrative Data Management System (ADMS) developed to manage and visualize data for a personalized employment matching system.

The system allows administrators and users to:
- Manage **Jobs**, **Candidates**, and **Skills** with full CRUD operations
- Apply AI-based **Cosine Similarity** to match candidates with jobs
- View **skill gaps**, **resume scores**, and **company recommendations**
- Track **applications** with real-time status management

---

## ✅ Instructor Requirements — Fulfilled

### 1. Data Viewing (Read/View)
- Jobs, Candidates, Skills, Applications displayed in **table/grid format**
- Read-only mode — editing requires explicit action (Edit button)

### 2. Data Modification (Create, Update, Delete)
- **Jobs** — Add new job, pre-filled edit form, delete with cascade
- **Skills** — Add, inline edit, delete grouped by category
- **Candidates** — View all candidates, inline skill editing
- **Applications** — Withdraw (student), status update (employer)

### 3. User Interface Essentials
- Clean, responsive UI with **dark/light mode**
- Sidebar navigation for dashboard, Navbar for public pages
- **Toast notifications** (Sonner) for all success/error actions

### 4. Technical Integration
- `POST`, `PUT`, `PATCH`, `DELETE` requests to backend API routes
- Client-side validation on all forms (required fields)
- Server-side validation and error handling on all API routes

---

## 🤖 AI Features

### Cosine Similarity — Job Matching Algorithm
When a candidate applies to a job, the system calculates a **match score**:

```
userSkills    = ["React", "TypeScript", "Node.js"]
jobSkills     = ["React", "TypeScript", "PostgreSQL", "Docker"]

intersection  = ["React", "TypeScript"] → 2
matchScore    = (2 / √(3 × 4)) × 100 = 57.7%
```

### Skill Gap Analysis
For each application, the system identifies missing skills:
```
gap = job.requiredSkills - candidate.skills
    = ["PostgreSQL", "Docker"]
```

### Resume Scoring
Profile page calculates a score (0–100) based on:
- Skill count (max 40 pts)
- Market demand alignment (max 40 pts)
- Experience section (max 20 pts)

### Company Recommendations
Companies are ranked by average Cosine Similarity score across all their job postings, personalized per user.

---

## 🗂️ Pages & Routes

### Public Pages
| Route | Description |
|---|---|
| `/` | Home — Hero, Features, Featured Jobs (real DB) |
| `/browse` | Browse all jobs with AI match score + Apply |
| `/companies` | Company listings |
| `/about` | About page |

### Dashboard (Protected — Login Required)
| Route | Description |
|---|---|
| `/overview` | Real-time stats — jobs, applications, top skills chart |
| `/jobs` | Jobs table — search, add, edit, delete |
| `/jobs/add` | Post new job form |
| `/jobs/[id]/edit` | Pre-filled edit form |
| `/applications` | Student: own applications / Employer: manage applicants |
| `/candidates` | All candidates — skills, skill gap analysis |
| `/skills` | Skills library — full CRUD, grouped by category |
| `/profile` | Career DNA — real skills, experience, radar chart, resume score |
| `/recommendations` | AI company recommendations ranked by skill match |
| `/settings` | App settings |

### API Routes
| Route | Method | Description |
|---|---|---|
| `/api/jobs` | GET, POST | List jobs (search), create job |
| `/api/jobs/[id]` | GET, PUT, DELETE | Get, update, delete job |
| `/api/applications` | GET, POST | Get applications (role-based), apply to job |
| `/api/applications/[id]` | PATCH, DELETE | Update status, withdraw application |
| `/api/candidates` | GET | List all candidates |
| `/api/candidates/[id]` | GET, PATCH | Get candidate details, update skills |
| `/api/skills` | GET, POST | List skills, create skill |
| `/api/skills/[id]` | PUT, DELETE | Update, delete skill |
| `/api/stats` | GET | Dashboard stats — counts, top skills |
| `/api/resume-score` | GET | Resume score + feedback for current user |
| `/api/recommendations` | GET | AI company recommendations |

---

## 🗄️ Database Schema

```prisma
model User {
  id           String        // Auth user
  skills       String[]      // Used for AI matching
  experience   String?
  role         Role          // STUDENT | EMPLOYER | ADMIN
  applications Application[]
  jobsPosted   Job[]
}

model Job {
  id             String
  title          String
  companyName    String
  location       String
  requiredSkills String[]    // Used for Cosine Similarity
  applications   Application[]
}

model Application {
  id         String
  status     String          // PENDING | IN_REVIEW | ACCEPTED | REJECTED
  matchScore Float?          // Cosine Similarity score (0-100)
  user       User
  job        Job
}

model Skill {
  id       String
  name     String   @unique
  category String   // Frontend | Backend | DevOps | etc.
}
```

---

## 🔒 Security

- **Authentication** — Google & GitHub OAuth via NextAuth.js
- **Protected routes** — Middleware redirects unauthenticated users
- **Role-based access** — Employers manage their own jobs/applications only
- **Ownership checks** — Users can only edit/delete their own records
- **Duplicate prevention** — `@@unique([userId, jobId])` prevents double applications

---

## 📊 Reporting

The `/overview` dashboard shows real-time data:
- Total active jobs
- Total applications
- Total candidates
- Average match score (AI)
- Top demanded skills (bar chart)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Auth | NextAuth.js v5 (Google + GitHub) |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React + Tabler Icons |
| Notifications | Sonner |
| Deployment | Vercel |

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/tasnimbinteyy/Job-Recommendation-System
cd Job-Recommendation-System
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables
Create a `.env` file:
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-id"
AUTH_GOOGLE_SECRET="your-google-secret"
AUTH_GITHUB_ID="your-github-id"
AUTH_GITHUB_SECRET="your-github-secret"
```

### 4. Run database migrations
```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### 5. Start development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

Screenshots demonstrating CRUD operations and UI functionality:

📁 **Screenshot folder:** `/public/screenshots/`

| Screenshot | Description |
|---|---|
| `Dashboard.png` | Overview dashboard with real stats |
| `add-record.png` | Add new job form |

---

## 👩‍💻 Author

**Tasnim Bintey Nayeem**
GitHub: [@tasnimbinteyy](https://github.com/tasnimbinteyy)
