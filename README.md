# Job Board AI: Next-Gen Edition ✨

An AI-powered job board with automated resume evaluation using **Gemini 2.5 Flash**, now refactored with a premium **Next-Gen UI** featuring Glassmorphism, Bento Grid layouts, and cinematic animations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run seed
npm run dev
```
Backend runs at: http://localhost:5001

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5174 (or 5173)

## 🎨 Next-Gen UI Features

The application has been completely refactored with the **Aura Design System**:

- **Bento Grid Layout**: Dynamic and responsive grid system for HR Dashboard and Job Listings.
- **Glassmorphism**: Premium "frosted glass" effects with deep backdrop blurs and semi-transparent surfaces.
- **Cinematic Animations**: Powered by **Framer Motion**, featuring stagger effects, smooth page transitions, and micro-interactions.
- **AI Scanning Effect**: Animated laser scanning animation for AI results.
- **Dynamic Glows**: Interactive glowing borders and shadows that react to user hover.
- **Tailwind CSS 3.4**: Modern styling with a custom color palette (Violet to Cyan gradients).
- **Lucide React Icons**: Consistent, high-quality vector icons throughout the app.

## 📋 Features

### For Applicants
- 🔍 **Browse Jobs**: Advanced search and filters with Bento Grid layout.
- 📝 **Apply**: Submit applications with PDF/Docx resume upload.
- 🤖 **AI Match Score**: Instant resume evaluation with a match score badge.
- 📊 **Track Status**: Real-time updates on application progress.
- ⭐ **AI Feedback**: Detailed feedback from Gemini on how to improve.

### For HR
- 📊 **Bento Dashboard**: Interactive statistics with glassmorphism cards.
- 💼 **Job Management**: Create, edit, and manage job postings.
- 👥 **Candidate Review**: Staggered list of applications with AI scores.
- 📄 **Resume Preview**: One-click download of applicant resumes.
- ✅ **Quick Actions**: Accept or reject applications with glass buttons.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Aura Design System
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js + Express 5
- **Language**: TypeScript
- **Database**: SQLite (Production-ready for Vercel)
- **AI Engine**: Google Gemini 2.5 Flash
- **Auth**: JWT + Bcrypt

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **HR Manager** | `hr@jobboard.com` | `12345678` |
| **Applicant** | `john.doe@example.com` | `password123` |

## 🏗️ Project Structure

```
job-board-ai/
├── frontend/             # Next-Gen React UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/       # GlassCard, Bento components
│   │   │   ├── GeminiFeedback.tsx
│   │   │   └── LoadingAI.tsx
│   │   ├── pages/        # Applicant & HR pages
│   │   └── lib/          # Tailwind utilities (cn utility)
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/              # Express + TypeScript API
│   ├── src/
│   │   ├── config/       # Gemini & DB configuration
│   │   ├── controllers/  # Auth & Job logic
│   │   └── models/       # SQLite schemas
│   └── uploads/          # Resume storage
├── vercel.json           # Monorepo deployment config
└── ...
```

## 🚀 Deployment

The project is optimized for deployment on **Vercel**.

1. **GitHub**: Push your code to a GitHub repository.
2. **Import**: Import the repo into Vercel.
3. **Env Vars**: Add `JWT_SECRET` and `GEMINI_API_KEY`.
4. **Deploy**: Vercel will automatically handle the monorepo build using the provided `vercel.json`.

For detailed instructions, see:
- 📖 [QUICK-START.md](./QUICK-START.md)
- 📋 [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- 🌐 [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)

## 🎯 AI Evaluation Logic

When an applicant submits a resume:
1. Physical file is handled by **Multer**.
2. Text is extracted from PDF/Docx.
3. Sent to **Gemini AI** with a custom system prompt.
4. AI generates a **Match Score (1-10)** and feedback.
5. Applicants with **Score < 5** are automatically filtered for HR efficiency.

## 📄 License
MIT

---
Built with ❤️ using React, Tailwind, and Gemini

