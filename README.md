
<div align="center">

# 🧠 LaunchMindsAI
### The Autonomous Startup Co-Founder

> **An Enterprise-Grade Multi-Agent System that turns raw ideas into Series-A ready startup blueprints using Generative AI (Llama 3.3).**

[![Status](https://img.shields.io/badge/Production-Beta_v1.0-blueviolet?style=for-the-badge)](https://github.com/shrushtivachhani/LaunchMindsAI)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16_|_Groq_|_Supabase-000000?style=for-the-badge)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 Executive Summary

**LaunchMindsAI** is not just a chatbot. It is a **computational founding team**.

It orchestrates **5 Specialized AI Agents** (Idea Architect, Risk Analyst, Compliance Officer, Growth Strategist, CFO) to sequentially audit, refine, and structure a business concept. The system replaces weeks of human research with a 60-second autonomous workflow, powered by the **Groq Cloud API** running **Meta's Llama 3.3-70b**.

The platform is built on a **Feature-Based Architecture**, ensuring strict separation of concerns, enterprise-grade security via **Supabase Auth** (with Admin/User separation), and persistent data storage.

---

## 🏛️ System Architecture

The project follows a modern **Modular Monolith** structure using Next.js 16 App Router.

```bash
LaunchMindsAI/
├── src/
│   ├── app/                    # Routing Layer (Page Controllers)
│   │   ├── admin/              # Protected Admin Dashboard
│   │   ├── auth/               # Authentication (Login/Register)
│   │   ├── dashboard/          # User Workspace (The Agent Interface)
│   │   └── page.tsx            # High-Conversion Landing Page
│   │
│   ├── features/               # DOMAIN LOGIC (The Core)
│   │   ├── admin/              # Admin Panel Logic
│   │   ├── agents/             # AI AGENT INFRASTRUCTURE
│   │   │   ├── actions/        # Server Actions (groqActions.ts - Secure API Calls)
│   │   │   ├── components/     # Agent UI Views (FeasibilityView, FinanceView...)
│   │   │   ├── types/          # Strict TypeScript Interfaces for AI JSON Output
│   │   │   └── utils/          # Prompt Engineering & Context Injection
│   │   └── orchestrator/       # State Management (React Context / Wizard Logic)
│   │
│   ├── lib/                    # Shared Infrastructure
│   │   ├── gemini/             # Legacy Gemini Client
│   │   └── supabase/           # Supabase Client & Server Utilities
│   │
│   ├── components/             # Shared UI Design System
│   │   ├── ui/                 # Atomic Components (Buttons, Cards, Inputs)
│   │   └── layout/             # Global Layouts (Sidebar, Headers)
│   │
│   ├── middleware.ts           # Edge Middleware (Role-Based Access Control)
│   └── globals.css             # Tailwind v4 + Custom "Cosmic Glass" Theme
└── .env.local                  # Secrets (Groq API Key, Supabase Keys)
```

---

## 🤖 The Agent Protocol (AI Engine)

The system uses a **Linear Waterfall Orchestration** pattern. Data flows securely from Agent 1 to Agent 5, building context at every step.

| Agent | Model | Role & Output |
| :--- | :--- | :--- |
| **01. Idea Architect** | `llama-3.3-70b` | **Input**: Raw text.<br>**Action**: Structuring.<br>**Output**: Business Model Canvas, Value Prop, Problem/Solution Fit. |
| **02. Risk Analyst** | `llama-3.3-70b` | **Input**: Agent 1 Data.<br>**Action**: Stress Testing.<br>**Output**: Feasibility Score (0-100), Market Risks, Technical Bottlenecks. |
| **03. Compliance Lead** | `llama-3.3-70b` | **Input**: Location + Industry.<br>**Action**: Legal Audit.<br>**Output**: Mandatory Registrations, GDPR/Data Laws, Contracts List. |
| **04. Growth Strategist** | `llama-3.3-70b` | **Input**: Target Audience.<br>**Action**: GTM Planning.<br>**Output**: ICP Personas, Acquisition Channels, Pricing Strategy tiers. |
| **05. Chief Financial Officer** | `llama-3.3-70b` | **Input**: Business Model.<br>**Action**: Financial Modeling.<br>**Output**: Startup Costs, Monthly Burn Rate, Runway Calculation, P&L. |

### 🧠 Real Intelligence
We use **Groq** for ultra-low latency inference. The prompts (`src/features/agents/utils/prompts.ts`) employ **Strict JSON Enforcing** to ensure the AI returns structured data that the UI can render perfectly, preventing crashes ("defensive coding").

---

## 🔐 Security & Operations

### Authentication
*   **Provider**: Supabase Auth (Email/Password).
*   **Storage**: Secure HttpOnly Cookies (SSR).
*   **RBAC**: Strict separation between `admin` and `user` roles.
    *   **Admins**: Can access `/admin/*`, view all users, monitor agent usage.
    *   **Users**: Can access `/dashboard`, create projects.
    *   **Middleware**: Intercepts requests at the Edge to enforce these rules.

### Database (PostgreSQL)
*   **Profiles Table**: Stores users, roles, and usage quotas.
*   **Projects Table**: Stores the JSON output of every agent run (Persistence).
*   **RLS (Row Level Security)**: Users can ONLY see their own projects. Admins can see everything.

---

## 🛠️ Technology Stack

*   **Frontend**: Next.js 16.1 (Turbopack), React 19, Tailwind CSS v4.
*   **Animation**: Framer Motion (Complex orchestrations and micro-interactions).
*   **Backend / API**: Next.js Server Actions.
*   **AI Inference**: Groq SDK (`groq-sdk`), Meta Llama 3.3.
*   **Database**: Supabase (PostgreSQL).
*   **Deployment**: Vercel Ready.

---

## 🔌 Setup & Installation

1.  **Clone & Install**
    ```bash
    git clone https://github.com/shrushtivachhani/LaunchMindsAI.git
    cd LaunchMindsAI
    npm install
    ```

2.  **Environment Variables (`.env.local`)**
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    GROQ_API_KEY=gsk_...
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Admin Access**
    *   There is no "Sign Up" for Admins (Security).
    *   Create a user via Register page.
    *   Manually update their role to `admin` in Supabase `profiles` table.
    *   Login at `/admin/login`.

---

<div align="center">

**Built by the LaunchMindsAI Team.**  
*Empowering founders with the intelligence of a Fortune 500 executive team.*

</div>