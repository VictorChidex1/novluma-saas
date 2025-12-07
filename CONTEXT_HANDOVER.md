# Novluma SaaS - Comprehensive Project Documentation

**Project Status**: MVP Complete
**Last Updated**: December 5, 2025

## � Project Overview

Novluma is a modern SaaS platform designed for AI-powered content generation. It features a high-converting landing page, a full user dashboard, a blog system, an admin panel, and a powerful AI engine.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend / Database**: Firebase (Auth, Firestore, Storage)
- **AI Engine**: Google Gemini API (REST Integration)
- **Deployment**: Vercel / GitHub Pages support
- **Email**: EmailJS (Transactional emails)

---

## 🚀 Features Built

### 1. Public Facing Pages

- **Landing Page**:
  - Hero section with video/image background and parallax effects.
  - "Features", "Pricing", "Testimonials", and "FAQ" sections.
  - **Infinite Logo Marquee** for social proof.
- **About Us**: Team grid, company timeline, and mission statement.
- **Careers**: Job board with an integrated application form (connected to Firestore).
- **Contact**: Professional form with real-time validation.
- **Legal Pages**: Privacy Policy, Terms of Service, Cookie Policy.
- **Blog System**:
  - Public blog with category filtering and pagination.
  - Dynamic article pages (`/blog/:slug`).

### 2. Authentication & User System

- **Auth**: Google Sign-In and Email/Password (Firebase Auth).
- **Profile Management**: Users can upload avatars (Base64 encoded), update names, and manage security settings (2FA UI, Password change).
- **Dashboard**:
  - **Overview**: Usage stats, recent activity feed.
  - **Projects**: Full CRUD with clickable cards and responsive grid layout.
  - **Settings**: Comprehensive settings for Account, Security, Billing, and Display.

### 3. AI Content Generation (The Core)

- **Engine**: Google Gemini 2.0.
- **Wizard**: Step-by-step UI for generating blog posts, tweets, and emails.
- **Features**: Generates blog posts, social media content (Twitter, LinkedIn, Instagram, TikTok, YouTube), and emails.
- **Architecture**: Direct REST API integration to ensure stability.
- **Smart Fallback**: Automatically retries with `gemini-2.0-flash`, `gemini-flash-latest`, and `gemini-pro`.

### 4. Admin System

- **RBAC**: Role-Based Access Control (Admins vs. Users).
- **Blog Editor**: Markdown-based editor for creating and managing blog posts.
- **Hiring Portal**: View and manage job applications submitted via the Careers page.

### 5. Help & Support Ecosystem

- **Dedicated Support Page**: Central hub for FAQs, documentation links, and contact options.
- **Getting Started Wizard**:
  - **Video Hero**: Embedded product tour.
  - **Zig-Zag Layout**: Visual-heavy onboarding guide using alternately aligned text and screenshots.
  - **Deep Listing**: Correctly routed and protected (`/dashboard/getting-started`).

### 6. UX Enhancements

- **Skeleton Loaders**: Replaced basic spinners with shimmering skeleton UI for "Projects List" and "Editor" to improve perceived performance.
- **Animations**: Extended Framer Motion usage to Support Deck cards (staggered entrance).

---

## 🐛 Debugging Log (Critical Issues Fixed)

### 1. AI Generation Failure (Error 404)

- **Issue**: Users received a "404 Model Not Found" error when generating content.
- **Root Cause**: The API key had access to the newer **Gemini 2.0** models but not the older 1.5 versions used in the initial code.
- **Fix**:
  - Identified available models using `curl` and `grep`.
  - Updated `src/lib/gemini.ts` to use `gemini-2.0-flash` as the primary model.
  - Implemented a fallback strategy to try multiple model versions (`v1beta` and `v1`).
  - Switched from the Google SDK to raw `fetch` calls to bypass SDK versioning constraints.

### 2. White Screen of Death (Runtime Crash)

- **Issue**: The application would occasionally render a blank white screen.
- **Root Cause**: Unhandled runtime errors in React components.
- **Fix**: Implemented a global **Error Boundary** (`src/components/ErrorBoundary.tsx`) to catch crashes and display a helpful error message instead of a blank screen.

### 3. Firebase Configuration Loss

- **Issue**: `auth/invalid-api-key` error appeared after an update.
- **Root Cause**: The `.env.local` file was accidentally overwritten during the AI fix.
- **Fix**: Restored all Firebase and EmailJS environment variables and appended the Gemini key correctly.

### 4. Deployment & Routing

- **Issue**: 404 errors on refresh (Vercel/GitHub Pages).
- **Fix**: Configured `vite.config.ts` base path and ensured proper SPA routing fallback.

### 5. Mobile Responsiveness

- **Issue**: Horizontal scrolling (overflow) on mobile devices.
- **Fix**: Adjusted `max-w` classes and padding in the Navbar and Hero sections to ensure content fits within the viewport.

### 6. API Key Security (Strategic Pivot)

- **Issue**: Need to secure Gemini API key without incurring Firebase Functions costs (Blaze Plan).
- **Previous Attempt**: Migrated to Firebase Functions (`onCall`), but hit billing wall.
- **Final Solution**:
  - Reverted to Client-Side API calls for free tier usage.
  - **Security Layer**: Configured Google Cloud Console **HTTP Referrer Restrictions**.
  - **Result**: API key is now strictly locked to `localhost`, `lumina-saas.vercel.app`, and `victorchidex1.github.io`. Stolen keys cannot be used elsewhere.

---

## 🔧 Configuration Reference

### Environment Variables (`.env.local`)

```env
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...

# EmailJS
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...

# AI (Google Gemini)
VITE_GEMINI_API_KEY=...
```

### Critical Files

- `src/lib/gemini.ts`: AI logic & model fallback.
- `src/lib/firebase.ts`: Firebase initialization.
- `src/lib/projects.ts`: Firestore CRUD operations.
- `firestore.rules`: Security rules for the database.
- `src/main.tsx`: Entry point with Error Boundary.

---

## � Future Roadmap

1.  **AI Refinement**: Add "Regenerate" and "Expand" features.
2.  **Payment Integration**: Connect Stripe for billing.
3.  **Analytics**: detailed user behavior tracking.
