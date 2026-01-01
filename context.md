# PROJECT CONTEXT & AI RULES

> **CRITICAL INSTRUCTION FOR AI:**
> Before answering any query, you must cross-reference the rules and patterns defined in this document. Your goal is to maintain the integrity, stability, and consistency of the existing codebase.

---

## 🤝 AI Collaboration Protocol (Strict)

**1. PERMISSION FIRST:** You (the AI) must **always** ask for explicit permission before implementing any new feature, refactoring code, or changing architecture. Do not generate full implementation code until the user says "Yes" or "Proceed."

**2. THE "WHY" RULE:** Before suggesting any change, you must provide a detailed explanation of:

- **The Risk:** What happens if we don't do it? (e.g., Security vulnerability, Crash risk).
- **The Value:** What do we gain? (e.g., Scalability, Lower cost, Better UX).
- **The Plan:** Briefly explain how you will build it.

---

## 1. TECH STACK & ARCHITECTURE

- **Frontend Framework:** React (Vite)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Backend:** Vercel Serverless Functions (Node.js/Edge runtimes)
- **Database & Auth:** Firebase Firestore (NoSQL) & Firebase Authentication
- **State Management:** Context API
- **Package Manager:** npm

**Architecture Constraints:**

- **Serverless First:** All backend logic must reside in `/api` and be stateless.
- **Firestore Data Model:** Respect the NoSQL structure. Do not try to write "joins" in code unless absolutely necessary.
- **Environment Variables:** Never hardcode API keys or Service Account credentials. Use `import.meta.env` (Frontend) or `process.env` (Backend).

---

## 2. STABILITY "CONSTITUTION"

**Violating these rules causes code "scattering". You must adhere to them:**

1.  **Vercel & Serverless Specifics:**

    - **Cold Starts:** Keep functions lightweight. Avoid importing massive libraries in backend handlers unless critical.
    - **Statelessness:** Remember that serverless functions die after execution. Do not rely on global variables or in-memory caching between requests.
    - **CORS:** Ensure appropriate headers are set if the frontend and backend interact across domains (though usually same-origin in Vercel).

2.  **Firestore Best Practices:**

    - **Async/Await:** All database interactions are asynchronous. Ensure proper `await` usage to prevent race conditions.
    - **Security Rules:** When writing client-side Firestore code, assume security rules exist. Do not bypass them.
    - **Timestamps:** Use Firestore `serverTimestamp()` for creation/update times, not client-side `new Date()`.

3.  **Immutability of Existing Patterns:**

    - Analyze the current folder structure (e.g., `src/components`, `api/`, `lib/firebase.ts`) before creating new files.
    - Match the naming conventions exactly (e.g., `useAuth.tsx` vs `use-auth.tsx`).

4.  **Junior Developer Guardrails:**

    - **NO "Rest of Code" Comments:** _Forbidden:_ `// ... existing code ...`. _Required:_ Provide the full block or explicit line replacements.
    - **Verify signatures:** Never change a function's arguments or return type unless explicitly asked.

5.  **One-Shot imports:**
    - Do not hallucinate imports. Check `package.json` (or `requirements.txt`) to see what is installed. If an import is missing, ask me to install it first.

---

## 3. CODING STANDARDS

- **TypeScript:** No `any`. Define interfaces for all Props, Firestore Documents, and API Responses.
- **Tailwind:** Use utility classes. Do not create separate `.css` files unless defining global animations/variables.
- **Error Handling:**
  - Frontend: Use clear UI feedback (toasts/alerts) for async errors.
  - Backend: Return proper HTTP status codes (200, 400, 500) and JSON error messages.
- **Dry Principle:** If logic is shared (e.g., a data formatting helper), place it in `src/utils` or `src/lib`.
  **Comments:** Comment _why_ complex logic exists, not _what_ the code is doing.

---

## 4. WORKFLOW PROTOCOL

**When asking to write code:**

1.  **Plan First:** Briefly explain your approach in pseudocode.
2.  **Output:** Provide the code block with the relative file path at the top (e.g., `// src/components/Navbar.tsx` or `// api/createUser.ts`).
3.  **Integration:** Explicitly mention if this code replaces the whole file or just a specific function.

**When debugging:**

1.  Do not rewrite the whole file blindly.
2.  Isolate the specific function causing the issue.
3.  Explain the root cause (e.g., "The React state update was asynchronous, but we accessed the value immediately").
