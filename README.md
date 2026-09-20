# 🌉 LifeBridge AI — Action Navigator

> **“You have a problem. Let’s find your next step.”**  
> *“Chatbots give answers. LifeBridge turns a real-world problem into an actionable, trackable pathway.”*

---

## 🎯 The Problem

When people face real-world crises—such as a lost official document, a rejected scholarship appeal, an unfamiliar UPI payment request, or an internship skill deficit—they are forced to navigate multiple fragmented portals, unclear paperwork requirements, conflicting advice, and strict deadlines.

Traditional conversational chatbots reply with large walls of text, generic advice, or unverified information. They do not prioritize what to do *today*, do not visualize prerequisite dependencies, and do not track progress toward resolution once the chat window closes.

---

## 💡 The Solution

**LifeBridge AI** is an AI-powered problem navigator and case-resolution workspace. It ingests natural-language descriptions of real-world challenges and transforms them into a structured, prioritized, and persistent action roadmap.

### Core Workflow:
```text
Situation → AI Understanding → Action Plan → Action Graph → Resources → Checklist → Progress
```

### Key Pillars:
1. **Contextual Understanding**: Parses the user's situation to extract core entities, urgency level, bottlenecks, and missing information.
2. **"What Should I Do Now?" Spotlight**: A prominent, single prioritized immediate action with clear "Why This Matters" rationale to eliminate decision fatigue.
3. **Sequential Action Roadmap**: Step-by-step numbered milestones detailing exact procedural steps, necessary evidence, and official contact channels.
4. **Interactive Action Graph**: A dynamic topological dependency graph visualizing prerequisites, required documentation nodes, and real-time completion states.
5. **Deterministic Checklist**: Actionable tasks with deterministic progress tracking ($X$ of $Y$ completed, live progress bar, completion celebrations).
6. **Verified Resource Directory**: Direct links to authentic statutory portals and official grievance helplines with zero hallucination.
7. **Adaptive Refinement**: One-click contextual follow-up chips that adapt the roadmap without repetitive re-prompting.
8. **Persistent Case Workspace**: Local-first storage with optional Supabase PostgreSQL sync, maintaining progress across browser reloads.

---

## 🏷️ Supported Categories

LifeBridge AI specializes in structured resolution pathways across core real-world domains:

* 🎓 **Education**: Scholarship rejection appeals, fee assistance, transcript requests, academic workload triage.
* 💼 **Career**: Software engineering roadmaps, resume/portfolio preparation, skill gap identification, interview readiness.
* 📄 **Official Documents**: Lost Aadhaar cards, PAN card updates, college student IDs, DigiLocker retrieval.
* 🛡️ **Financial Safety**: Suspicious UPI collect requests, OTP fraud prevention, unauthorized debit incident response (1930 Helpline).
* 🏛️ **Civic & Public Services**: Broken streetlights, municipal water complaints, local civic grievance escalation.
* 🏥 **Health & Wellness**: Academic stress management, emergency safety triage, official support helplines.

---

## 🧠 AI & Reasoning Architecture

```text
User Situation
     ↓
Problem Understanding
     ↓
Category + Urgency Detection
     ↓
Contextual Reasoning
     ↓
Immediate Action
     ↓
Action Steps
     ↓
Resources
     ↓
Checklist
     ↓
Case Tracking
     ↓
Follow-up Refinement
```

### Dual-Tier Reasoning Pipeline:
* **Primary AI Engine (Google Gemini 1.5 Flash)**: When `GEMINI_API_KEY` is configured in `server/.env`, requests are analyzed via `@google/generative-ai` in structured JSON schema mode with strict anti-generic validation and quality scoring.
* **Deterministic Contextual Fallback Engine (v2.0)**: When external AI APIs are unavailable or unconfigured, LifeBridge remains functional through its deterministic contextual reasoning engine. It performs semantic keyword extraction, entity identification, and domain-specific topological mapping without treating the missing API key as an error.

> **Note**: *“LifeBridge remains functional without an external AI API through its deterministic contextual reasoning engine.”*

---

## 🚀 Key Innovation: *"From Chat to Case Resolution"*

| Traditional Conversational Chatbots | LifeBridge AI Action Navigator |
| :--- | :--- |
| Returns 15 unprioritized bullet points | **Highlights the single immediate next action to take today** |
| Unstructured text walls causing cognitive overload | **Interactive visual Action Graph with topological flow** |
| Session and progress lost when the tab closes | **Persistent case management with live checklist progress** |
| Potential to hallucinate links or contact numbers | **Strict verified resources policy linking only to official portals** |
| Requires manually re-typing entire prompts | **1-click adaptive refinement chips that dynamically update the plan** |

---

## 🛠️ Technology Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, SVG Topological Graph Canvas, Canvas Confetti, React Router DOM.
* **Backend**: Node.js, Express, Google Gemini SDK (`@google/generative-ai`), CORS, Dotenv.
* **Storage & Persistence**: Local-First `localStorage` synchronization with offline resilience + optional Supabase PostgreSQL backend.
* **Validation & Safety**: Custom anti-generic response validator, heuristic safety check layer for high-risk inputs.

---

## 📁 Project Structure

```text
LifeBridge/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/         # Modular UI components
│   │   │   ├── analysis/       # NextActionCard, ActionSteps, ActionGraph, Checklist
│   │   │   ├── followups/      # SmartFollowups refinement chips
│   │   │   ├── Navbar.jsx      # Navigation header
│   │   │   └── Hero.jsx        # Landing hero banner
│   │   ├── pages/              # Route pages (Home, Analyze, Dashboard, CaseDetail, Resources, About)
│   │   ├── services/           # API client & client-side fallback brain
│   │   ├── utils/              # Local storage manager, safety checks, mock data
│   │   ├── App.jsx             # React Router configuration
│   │   └── index.css           # Tailwind CSS styles & animations
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express Backend API
│   ├── db/                     # Supabase client configuration
│   ├── routes/                 # Express route handlers (analyze, cases, resources)
│   ├── services/               # Gemini AI engine, Fallback brain v2.0, Validator
│   ├── test/                   # Automated test suites
│   ├── index.js                # Express server entry point
│   ├── .env.example            # Environment variable template
│   └── package.json
├── .gitignore                  # Git ignore rules for node_modules, .env, dist
├── package.json                # Root orchestration scripts
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### 2. Install Dependencies
```bash
# Install root, server, and client dependencies in one command:
npm run install:all
```

### 3. Configure Environment (Optional)
Copy `server/.env.example` to `server/.env`:
```env
PORT=5000

# Optional: Set your Gemini API key to enable live Gemini 1.5 Flash reasoning
GEMINI_API_KEY=

# Optional: Set Supabase credentials for cloud sync
SUPABASE_URL=
SUPABASE_ANON_KEY=
```
*(If no API key is provided, LifeBridge seamlessly uses its built-in deterministic contextual reasoning engine).*

### 4. Run Development Servers
```bash
npm run dev
```
* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`
* **API Health Check**: `http://localhost:5000/api/health`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and AI provider availability |
| `POST` | `/api/analyze` | Ingests `{ problem, category }` and returns structured action plan |
| `POST` | `/api/refine` | Ingests `{ caseId, currentPlan, question, selectedOption }` and returns refined plan |
| `GET` | `/api/cases` | Retrieves list of persistent user cases |
| `POST` | `/api/cases` | Creates or updates a case instance |
| `GET` | `/api/resources` | Returns categorized directory of verified official resources |

---

## 🧪 Automated Test Suite

LifeBridge includes comprehensive automated test suites demonstrating system reliability, semantic diversity, and error resilience:

```bash
# Run all automated tests:
npm --prefix server test

# Or run individual test suites:
node server/test/reasoning_diversity_test.js  # Uniqueness matrix across 6 distinct scenarios (100% pass)
node server/test/refine_test.js               # Adaptive refinement and state preservation
node server/test/quality_check_test.js        # Anti-generic quality scoring and validation
node server/test/case_lifecycle_test.js       # Case creation, task completion, and status transitions
node server/test/api_endpoint_test.js         # Live Express HTTP endpoint integration tests
node server/test/e2e_qa_scenarios.js          # Full end-to-end user scenario validation
```

---

## 🚢 Production Build & Deployment

### Build the Frontend:
```bash
npm run build
```
Generates an optimized production bundle in `client/dist/`.

### Deployment Options:
* **Frontend**: Deploy `client/` to **Vercel**, **Netlify**, or **Cloudflare Pages** (Build Command: `npm run build`, Output Directory: `dist`).
* **Backend**: Deploy `server/` to **Render**, **Railway**, or **Google Cloud Run** (Start Command: `node index.js`).

---

## ⚖️ Responsible AI & Disclaimer

LifeBridge AI provides structured navigational assistance, procedural guidance, and organizational workflows. It is not a substitute for formal legal counsel, certified financial advisory, emergency medical services, or statutory law enforcement. Users must verify case-specific details with the relevant statutory authorities and official portals linked in the resource directory.

---

## 📄 License

This project is licensed under the MIT License — see the `LICENSE` file for details.
