# Novluma SaaS - Comprehensive Project Documentation

**Project Status**: MVP Complete & Refined
**Last Updated**: December 18, 2025

## 📚 Project Overview

Novluma is a modern SaaS platform designed for AI-powered content generation. It features a high-converting landing page, a full user dashboard, a blog system, an admin panel, and a powerful AI engine.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Animations**: Framer Motion (Scroll-triggered animations, Sticky scroll)
- **Backend / Database**: Firebase (Auth, Firestore, Storage)
- **Security**: Firebase App Check (ReCAPTCHA v3)
- **AI Engine**: Google Gemini API (REST Integration)
- **Deployment**: Vercel / GitHub Pages support
- **Email**: EmailJS (Transactional emails)

---

## 🚀 Features Built

### 1. Public Facing Pages

- **Landing Page (Revamped)**:
  - **Hero Section**: Enhanced with video/image background and parallax effects.
  - **Sticky Process Section**: "Scrollytelling" experience inspired by high-end portfolios (`hen-ry.com`), featuring sticky cards that transition smoothly.
  - **New Sections**: Services Overview, Why Choose Us, Testimonials, Call to Action.
  - **Scroll-to-Top**: Interactive button for better navigation.
  - **Infinite Logo Marquee** for social proof.
- **About Us**:
  - **Team Grid & Timeline**: Professional layout.
  - **Downloadable CV**: Integrated functionality to download the founder's CV (`victor-chidera-full-stack-cv.pdf`) directly from the Navbar and About section.
  - **Decorative Visuals**: Refined alignment for "backend" and "competencies" arrays, optimized for mobile.
- **Careers**: Job board with an integrated application form (connected to Firestore).
- **Contact**: Professional form with real-time validation.
- **Legal Pages**: Privacy Policy, Terms of Service, Cookie Policy.
- **Blog System**:
  - **Public Blog**: Category filtering and pagination.
  - **Dynamic Pages**: Article pages (`/blog/:slug`).

### 2. Authentication & User System

- **Auth**: Google Sign-In and Email/Password (Firebase Auth).
  - **Hybrid Strategy**: `signInWithRedirect` for mobile (better UX), `signInWithPopup` for desktop.
- **Security**:
  - **Firebase App Check**: Integrates ReCAPTCHA v3 to protect backend resources from abuse.
  - **Debug Tokens**: Configured for local development (`localhost`) to bypass strict ReCAPTCHA checks.
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
- **Animations**: Extended Framer Motion usage to Support Deck cards (staggered entrance) and Process Section.
- **Dynamic Greeting**:
  - **Logic**: Uses `new Date().getHours()` to determine time of day.
  - **Behavior**: Returns "Good morning" (<12), "Good afternoon" (<18), or "Good evening" to personalize the dashboard experience.

### 7. Documentation Hub

- **Content**: Comprehensive guides on Getting Started, Brand Voice, Troubleshooting, and API.
- **UX**: Professional "Callout" boxes (Tips/Warnings) and "Next/Previous" article navigation.
- **Architecture**: Data-driven content structure (`docs.ts`) for easy maintenance.

---

## 🐛 Debugging Log (Critical Issues Fixed)

### 10. Firebase App Check "Forbidden" (Localhost)

- **Issue**: Local development requests to Firestore were getting 403 Forbidden errors after enabling App Check.
- **Root Cause**: ReCAPTCHA v3 blocks `localhost` traffic by default as it looks suspicious.
- **Fix**: Implemented a "Debug Token" system. Generated a debug UUID in Firebase Console and injected it into `firebase.ts` only when `import.meta.env.DEV` is true.

### 11. Process Component Spacing

- **Issue**: Inconsistent spacing between "Process" and "Selected Works" sections.
- **Fix**: Analyzed `Benefits.jsx`, `Process.jsx`, and `FeaturedProjects.jsx` to standardize padding and margin values, ensuring visual consistency.

### 12. Process Animation "Glitch"

- **Issue**: The sticky scroll animation in the Process section was jumpy or overlapping with the navbar.
- **Fix**: Refined Framer Motion variants and scroll offsets to replicate the smooth "stacking" effect seen on premium portfolios.

### 7. Broken Logo on Subpaths (GitHub Pages)

- **Issue**: Footer logo broken on non-root deployments (`/novluma-saas/`).
- **Root Cause**: Hardcoded `/favicon.png` path resolved to domain root.
- **Fix**: Implemented `import.meta.env.BASE_URL` to dynamically prefix assets based on the environment.

### 8. Firebase Unauthorized Domain

- **Issue**: `auth/unauthorized-domain` prevented sign-ups on new Vercel/GitHub domains.
- **Fix**: Detailed advisory provided to manually whitelist domains in Firebase Console (User action confirmed).

### 9. Dark Mode Visibility

- **Issue**: "Watch Demo" button text invisible in dark mode due to Framer Motion conflict.
- **Fix**: Removed hardcoded animation styles to allow Tailwind `dark:hover` classes to take precedence.

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

### 7. Missing Testimonial Images (Image Path Handling)

- **Issue**: Testimonial images worked on Vercel but broke on Localhost (`/novluma-saas/`).
- **Root Cause**: Images were referenced via absolute strings (`/img.png`) which failed when the app was served from a subdirectory. Also, images were split between public/src.
- **Fix**:
  - Moved all images to `src/assets/images/team`.
  - Implemented **ES6 Imports** (`import img from "..."`) to let Vite handle the path resolution automatically.

### 8. Footer Link Navigation

- **Issue**: Features/Pricing links in the footer were reloading the page or broken.
- **Root Cause**: Syntax error in `href` string interpolation (`'#'`) and incorrect routing logic for same-page sections.
- **Fix**:
  - Corrected syntax to `href={`#${item.toLowerCase()}`}`.
  - Split logic: `Docs/FAQ` use React Router `<Link>`, while landing page sections use anchor tags for smooth scrolling.

### 13. Image Optimization & Performance

- **Issue**: Massive initial bundle size (20MB+) due to unoptimized assets.
- **Actions**:
  - Implemented `scripts/convert-to-webp.js` using `sharp` to resize (max 1200px) and convert to WebP.
  - Reduced public asset size by ~95% (e.g., 2.3MB -> 10KB).
  - Implemented **Runtime Adapter** in `BlogPage.tsx` to dynamically swap `.png` DB references for `.webp` at runtime.
  - **Result**: Significant performance boost.

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
VITE_RECAPTCHA_SITE_KEY=...  # Added for App Check

# EmailJS
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...

# AI (Google Gemini)
VITE_GEMINI_API_KEY=...
```

### Critical Files

- `src/lib/gemini.ts`: AI logic & model fallback.
- `src/lib/firebase.ts`: Firebase initialization & App Check configuration.
- `src/lib/projects.ts`: Firestore CRUD operations.
- `firestore.rules`: Security rules for the database.
- `src/main.tsx`: Entry point with Error Boundary.

---

## 🔮 Future Roadmap

1.  **AI Refinement**: Add "Regenerate" and "Expand" features.
2.  **Payment Integration**: Connect Stripe for billing.
3.  **Analytics**: Detailed user behavior tracking.
### 8. Analytics 2.0 (Value Engine)

- **ROI Calculator (`ROICalculator.tsx`)**:
  - **Tech**: React `useState` for dynamic inputs, `useEffect` for real-time math recalculation.
  - **Purpose**: Anchors software value against freelance costs.
- **Platform Distribution**:
  - **Logic**: Aggregates project frequency using a generic `Record<string, number>` bucket strategy.
  - **Visualization**: Recharts PieChart with custom tooltip.
- **Activity Log**:
  - **Performance**: Uses `slice(0, 5)` on existing data (zero API cost) vs fetching new queries.
  - **UI**: Conditional rendering switch for "Smart Icons" based on platform type.

---

## 🐛 Recent Critical Fixes

### 14. Deployment Failure (Case Sensitivity)
- **Issue**: Vercel build failed with `ENOENT: no such file ... bosa.webp`.
- **Root Cause**: Developer imported `bosa.webp` (lowercase) while file was `Bosa.webp` (Uppercase). MacOS (Case-Insensitive) allowed it; Linux (Case-Sensitive) rejected it.
- **Fix**: Corrected import in `AboutPage.tsx` to match file system exactly. 
