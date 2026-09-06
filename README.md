# ⚡ WorkWise AI — Enterprise Employee Assistant & HR Dashboard

> **WorkWise AI** is a modern, enterprise-grade AI-powered Employee Assistant and HR Management Dashboard built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Google Gemini AI**.

---

## 🌟 Overview

WorkWise AI empowers employees and HR managers by streamlining workplace operations, employee directory search, HR analytics, company policy queries, and voice-assisted workflows. 

The application includes an **AI Assistant** grounded in company context, equipped with dual-engine AI (Gemini 1.5 Flash API with a seamless offline fallback engine), markdown rendering, robust error retry mechanisms, and Web Speech API voice control.

---

## ✨ Key Features

### 1. 🤖 Context-Aware AI Assistant (`/assistant`)
- **Dual AI Engine**: Connects to **Google Gemini 1.5 Flash** when a `GEMINI_API_KEY` is provided, and gracefully falls back to an offline **Smart Rules Engine** if offline or without an API key.
- **Company Knowledge Grounding**: Pre-loaded with company employee data, departmental structures, PTO policies, remote work stipends, and IT support context.
- **Strict Guardrails**: Configured to strictly answer company-related queries (policies, directory, analytics, drafting emails/onboarding) and politely decline off-topic queries (general trivia, recipes, etc.).
- **Rich Markdown Formatting**: Renders bold text, headers, bullet points, and numbered lists cleanly.
- **Error Recovery & Retry**: Visual error indicators with 1-click **Retry Message** buttons on network failures.
- **Voice Command Support**: Built-in modal using the **Web Speech API** for hands-free voice prompting.
- **Message Actions**: Copy response text to clipboard and provide thumbs up / thumbs down feedback.

### 2. 👥 Interactive Employee Directory (`/directory`)
- **Search & Filter**: Search employees by name, email, role, or skills, and filter by department.
- **Employee Detail Modal**: View comprehensive bio, performance metrics, skills tags, location, and contact information.
- **Quick Actions**: Direct email triggers, manager sync scheduling, and performance scores.

### 3. 📊 HR Analytics & Headcount Dashboard (`/analytics`)
- **Workforce Metrics**: Real-time stats on total active workforce, remote/hybrid distribution, and average performance score.
- **Visual Charts**: Built with **Recharts** for department headcount breakdowns and workplace model distribution.

### 4. ⚙️ User Settings & Personalization (`/settings`)
- **Profile Management**: Update employee profile details, avatar, position, and department.
- **Preferences**: Light/Dark theme toggling, notification triggers, and AI creativity adjustments.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19 & TypeScript
- **Styling**: Tailwind CSS v4 & Glassmorphic Design System
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini 1.5 Flash API (`@google/generativelanguage`)
- **Voice Recognition**: Web Speech API (`webkitSpeechRecognition`)

---

## 🚀 Getting Started & Setup Instructions

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have Node.js 18+ installed on your system:
```bash
node -v
npm -v
```

### 1. Clone the Repository & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>

# Navigate into project folder
cd employee-assistant-assignment

# Install dependencies
npm install
```

### 2. Configure Environment Variables (Optional for Real Gemini API)
Create a `.env.local` file in the root directory:

```env
# Optional: Add your Gemini API key to enable live generative responses.
# If omitted, the app will run seamlessly using its built-in Smart Rules Engine!
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Architecture & Directory Structure

```
employee-assistant-assignment/
├── app/
│   ├── analytics/        # HR Analytics page & charts
│   ├── api/
│   │   └── chat/         # POST /api/chat Next.js API Route for Gemini & Fallback Engine
│   ├── assistant/        # AI Assistant Chat page with Voice & Markdown
│   ├── directory/        # Employee Directory page with filters & details drawer
│   ├── settings/         # Profile & Application Settings page
│   ├── layout.tsx        # Global App Shell layout
│   ├── page.tsx          # High-converting Landing Page
│   └── globals.css       # Tailwind CSS v4 styling & dark mode tokens
├── components/
│   ├── assistant/        # VoiceInputModal and Assistant components
│   ├── directory/        # EmployeeCard and EmployeeDrawer components
│   ├── landing/          # Hero, Features, Impact, AI Intro, Testimonials, CTA, Footer
│   └── AppShell.tsx      # Sidebar navigation & header shell
├── context/
│   └── AppContext.tsx    # React Context for global state (user, theme, notifications)
├── data/
│   └── mockEmployees.ts  # Centralized employee directory mock dataset & user profile
├── types/
│   └── index.ts          # TypeScript interfaces for Employee, Message, Settings
├── package.json
└── README.md
```

---

## 🎯 Assignment Implementation Summary

| Requirement | Implementation Detail |
| :--- | :--- |
| **AI Assistant** | Integrated `/assistant` with Gemini API + Fallback Smart Engine, markdown parsing, and retry handling. |
| **Company Grounding** | API route system instructions enforce company-only responses and filter out off-topic queries. |
| **Voice Command** | Integrated Web Speech API modal for hands-free prompt transcription. |
| **Employee Directory** | Filterable grid of employee cards with detailed drawers and performance metrics. |
| **Analytics Dashboard** | Headcount distribution charts, hybrid/remote split, and active employee metrics. |
| **UI Excellence** | Modern dark/light theme support, responsive mobile navigation, glassmorphic card designs. |

---

## 📄 License
This project was developed for the **Employee Assistant Assignment**. All rights reserved.
