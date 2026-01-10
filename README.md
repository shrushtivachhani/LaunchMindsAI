
<div align="center">

# 🧠 LaunchMindsAI
### The Autonomous Startup Co-Founder

> **Turn raw ideas into launch-ready startups with an AI executive team.**

[![Status](https://img.shields.io/badge/Status-Beta-blueviolet?style=for-the-badge)](https://github.com/shrushtivachhani/LaunchMindsAI)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16.1_|_TS_|_Tailwind_v4-000000?style=for-the-badge)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 Overview

**LaunchMindsAI** is a multi-agent orchestration system designed to act as a virtual founding team. It guides users from a "napkin scribble" idea to a fully validated, legally compliant, and financially structured execution plan.

Most startups fail not because of bad ideas, but because of **bad execution, ignored risks, and poor financial planning.** LaunchMindsAI solves this by simulating a team of strict, domain-expert agents who don't just "chat" but **work**.

---

## 📂 Developer Guide & Structure

Understanding the codebase layout is crucial for extending the platform.

```bash
LaunchMindsAI/
├── public/                 # Static assets (images, fonts, svgs like grid.svg)
├── src/
│   ├── app/                # Next.js App Router (Page-based routing)
│   │   ├── admin/          # [NEW] Admin Panel Routes
│   │   │   ├── dashboard/  # System Overview & Metrics
│   │   │   ├── users/      # User Management Interface
│   │   │   └── agents/     # AI Agent Status Monitor
│   │   ├── auth/           # Authentication Routes
│   │   │   ├── login/      # User Login Page
│   │   │   └── register/   # User Registration Page
│   │   ├── dashboard/      # Main User Application (The "Command Center")
│   │   ├── globals.css     # Global Styles (Tailwind v4 imports + Custom Themes)
│   │   ├── layout.tsx      # Root Layout (Fonts: Outfit/JetBrains Mono)
│   │   └── page.tsx        # High-Conversion Landing Page
│   ├── components/
│   │   ├── agents/         # THE AI AGENTS (Core Features)
│   │   │   ├── IdeaArchitectView.tsx   # Agent 1: Business Canvas
│   │   │   ├── FeasibilityView.tsx     # Agent 2: Risk Analysis
│   │   │   ├── ComplianceView.tsx      # Agent 3: Legal Checks
│   │   │   ├── GrowthView.tsx          # Agent 4: Marketing Strategy
│   │   │   ├── FinanceView.tsx         # Agent 5: Financial Modeling
│   │   │   └── LaunchBlueprintView.tsx # Final Output Generator
│   │   ├── admin/          # Admin-specific Components (Sidebar)
│   │   ├── layout/         # Shared Layouts (User Sidebar, Header)
│   │   ├── orchestrator/   # State Management (React Context for Multi-step Wizard)
│   │   └── ui/             # Design System (Buttons, Cards, Inputs, Tables)
│   └── lib/
│       ├── agents/         # AGENT LOGIC & TYPES
│       │   ├── engine.ts   # The "Brain" (Currently Mocked for Demo)
│       │   └── types.ts    # TypeScript definitions for Agent I/O
│       └── utils.ts        # CN (Classname) helper
├── postcss.config.mjs      # Tailwind CSS Post-Processing
├── tailwind.config.ts      # DESIGN TOKENS (Colors, Radius, Animations)
└── README.md               # You are here
```

---

## 🚧 Roadmap: What to Fix & Add

This project is currently in **Beta Phase 1 (UI/UX & Architecture)**. The following modules need to be implemented for v1.0 Production Release.

### 🔴 Critical (To-Do)
1.  **Real Backend Integration**:
    -   *Current*: `src/lib/agents/engine.ts` uses mock data (`setTimeout`) to simulate AI.
    -   *Fix*: Replace mock functions with API calls to OpenAI (GPT-4) or Anthropic (Claude 3.5).
2.  **Database Persistence**:
    -   *Current*: Data is held in React State (`OrchestratorContext`); it vanishes on refresh.
    -   *Fix*: Integrate MongoDB/PostgreSQL to save User Projects and Agent Outputs permanently.
3.  **Authentication Logic**:
    -   *Current*: Visual-only login (`setTimeout` delay).
    -   *Fix*: Connect NextAuth.js or Supabase Auth to handle real user sessions.

### 🟡 Improvements (Upcoming)
4.  **PDF Generation**:
    -   Implement `react-pdf` to allow users to actually download the "Launch Blueprint".
5.  **Payment Gateway**:
    -   Integrate Stripe for "Premium" tiers (unlocking Agent 4 & 5).

---

## 🤖 The AI Agent Team

The system is composed of 5 specialized autonomous agents, managed by a central **Orchestrator Engine**.

| Agent | Role | Responsibility | Output |
| :--- | :--- | :--- | :--- |
| **01. Idea Architect** 🧠 | The Visionary | Structures raw input into a clear value prop. | Business Canvas, Problem/Solution Fit |
| **02. Risk Analyst** 🛡️ | The Skeptic | Stress-tests feasibility (Market, Tech, Legal). | Feasibility Score (0-100), Risk Matrix |
| **03. Compliance Lead** ⚖️ | The Lawyer | Identifies mandatory registrations & docs. | Legal Checklist, GDPR/DPDP Status |
| **04. Growth Strategist** 📈 | The Marketer | Defines ICP and Go-To-Market channels. | Acquisition Plan, Pricing Strategy |
| **05. Financial Planner** 💰 | The CFO | Calculates burn rate, runway, and costs. | P&L Forecast, Cash Flow, Startup Costs |

---

## 🛠️ Installation & Setup

### Prerequisites
-   Node.js 18+
-   npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/shrushtivachhani/LaunchMindsAI.git

# 2. Navigate to project directory
cd LaunchMindsAI

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```

Visit `http://localhost:3000` to verify the installation.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Founders.**  
*Part of the Google Deepmind Agentic Coding Challenge.*

</div>