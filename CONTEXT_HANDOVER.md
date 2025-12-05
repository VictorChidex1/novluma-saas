# Context Handover

## Project: Lumina SaaS

**Current State**: Feature Complete (MVP)
**Last Updated**: December 5, 2025

## 🚀 Recent Accomplishments

### 1. AI Content Generation (Major Feature)

- **Integration**: Successfully integrated Google Gemini API.
- **Models**: configured to use **Gemini 2.0 Flash** (`gemini-2.0-flash`) as the primary model, with fallbacks to `gemini-flash-latest` and `gemini-pro-latest`.
- **Architecture**: Switched from the Google SDK to a **Direct REST API** implementation (`src/lib/gemini.ts`) to resolve 404 errors caused by model version mismatches.
- **UI**: "New Project" wizard (`/dashboard/new`) now generates real content.
- **Debugging**: Solved a critical "404 Model Not Found" issue by discovering the user's API key had access to Gemini 2.0 but not 1.5.

### 2. Stability & Error Handling

- **Global Error Boundary**: Implemented `src/components/ErrorBoundary.tsx` to catch runtime crashes (White Screen of Death) and display helpful error messages.
- **Firebase Recovery**: Restored accidental deletion of Firebase config in `.env.local`.

## 🔑 Key Configuration

### Environment Variables (`.env.local`)

The project requires both Firebase and Gemini keys:

```env
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
# ... (standard Firebase config)

# AI
VITE_GEMINI_API_KEY=...
```

### AI Service (`src/lib/gemini.ts`)

The service uses a robust fallback strategy:

1.  `gemini-2.0-flash` (v1beta) - Primary, fastest, and newest.
2.  `gemini-flash-latest` (v1beta) - Fallback for latest stable flash.
3.  `gemini-pro-latest` (v1beta) - Fallback for standard pro.

## 📝 Next Steps

1.  **Refine Prompts**: The current prompt in `gemini.ts` is generic. It can be improved for specific platforms (e.g., specific tweet lengths, LinkedIn formatting).
2.  **User Feedback**: Add a way for users to "Regenerate" or "Refine" the content after it's created.
3.  **Usage Quotas**: Monitor API usage to ensure we stay within free tier limits or implement rate limiting.

## 📂 Critical Files

- `src/lib/gemini.ts`: Core AI logic.
- `src/pages/NewProject.tsx`: UI for generating content.
- `src/components/ErrorBoundary.tsx`: Global error handler.
