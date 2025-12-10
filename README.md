# Novluma SaaS

Novluma is a modern SaaS application built with **React**, **Vite**, and **Firebase**. It features a high-converting landing page, secure authentication, a protected user dashboard, and a robust settings system.

## 🚀 Features

### **Landing Page**

A professional, high-performance landing page designed to convert:

- **Hero Section**: Immersive background with fade-in animations.
- **Features**: Interactive grid with **3D Tilt** effects on hover.
- **How It Works**: Step-by-step process with **Pop & Wiggle** animations and a drawing connector line.
- **Testimonials**: Social proof with **Floating + Scale** card animations.
- **Pricing**: Clear pricing tiers with a **Pulse** effect on the popular plan.
- **FAQ**: Objection handling with **Cascade** entrance and **Focus Glow** effects.
- **Footer**: 4-column layout with integrated **Newsletter Signup**.

### **Core Application**

- **Authentication**: Secure Google & Email/Password login via **Firebase Auth**.
- **Dashboard**: Protected user area with responsive sidebar navigation.
- **Settings**: Comprehensive user preferences (Profile, Security, Notifications, Billing).
- **Profile Management**: Custom avatar upload (stored via Base64 in Firestore) with real-time sync.
- **Dark Mode**: System-wide dark mode with persistent state.

### **New Pages**

- **Careers Page**:
  - **Hero & Culture**: Immersive visuals with parallax effects.
  - **Job Board**: Dynamic list of open positions.
  - **Application System**: Seamless **Modal Form** integrated with Firebase.
  - **Resume Upload**: Auto-converts files to Base664 for secure storage.
- **Contact Page**:
  - **Split Layout**: Professional design with "What to expect" guidelines.
  - **Validation**: Real-time form validation and user feedback.
- **Help & Support Ecosystem (New)**:
  - **Support Dashboard**: Central hub (`/dashboard/support`) with quick access to resources and FAQs.
  - **Getting Started Guide (v2.0)**:
    - **Video Integration**: Embedded YouTube product tour.
    - **Visual Timeline**: "Zig-Zag" layout with real screenshots for onboarding.
    - **Interactive Deck**: Direct navigation to key documentation.
- **Documentation Hub (New)**:

  - **Comprehensive Guides**: Getting Started, Features, Brand Voice, and Troubleshooting.
  - **Pro UX**: "Next/Previous" navigation and "Callout" boxes for tips/warnings.
  - **Search Ready**: Built for easy expansion and discoverability.

- **Pro Dashboard (New)**:
  - **Usage Insights**: Real-time Area Chart visualizations powered by `recharts`.
  - **Dynamic Stats**: "Words Generated" and "Project Count" aggregating live from Firestore.
  - **Export System**:
    - **PDF Generation**: Styled browser-native print export.
    - **Markdown Download**: Instant `.md` file generation for developers.

### **Landing Page**

A professional, high-performance landing page designed to convert:

- **Hero Section**: Immersive background with **Video Modal** (Watch Demo) and **Auth Integration** (Start Free Trial).
- **Features**: Interactive grid with **3D Tilt** effects on hover.

Novluma is powered by **Google Gemini 2.0**.

- **Smart Generation**: Creates blog posts, social media content, and emails based on your topic and tone.
- **Model Strategy**: Automatically falls back between `gemini-2.0-flash`, `gemini-flash-latest`, and `gemini-pro` to ensure reliability.
- **Direct Integration**: Uses the raw REST API for maximum stability and performance.
- **Security**: API key is restricted via **Google Cloud HTTP Referrer** settings (locked to trusted domains) to prevent unauthorized usage while keeping the app serverless.

### Environment Variables

Ensure your `.env.local` has the following keys:

```env
VITE_FIREBASE_API_KEY=...
# ... other Firebase keys ...
VITE_GEMINI_API_KEY=AIzaSy...
```

- **Blog System (New)**:
  - **Public Blog**: Dynamic grid layout with category filtering.
  - **Article Pages**: SEO-friendly dynamic routes (`/blog/:slug`) with rich content rendering.
  - **Firestore Integration**: All content is fetched in real-time from Firebase.
- **Admin Dashboard (New)**:
  - **Blog Management**: Create, edit, and delete posts directly from the dashboard.
  - **Auto-Slug**: Intelligent URL generation based on post titles.
  - **Migration Tool**: One-click utility to upload demo content to the database.
- **Privacy Policy Page (New)**:
  - **Premium Styling**: Matches site aesthetic with custom gradients.
  - **UX Enhancements**: Sticky Table of Contents and Reading Progress Bar.
  - **Interactive Features**: Print/PDF support and DPO contact card.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI Library**: **shadcn/ui** (Headless UI + Tailwind)
- **Styling**: Tailwind CSS v4, Lucide React
- **Animation**: **Framer Motion** (Complex gestures & transitions)
- **Backend**: Firebase (Auth, Firestore)
- **Email**: EmailJS (Welcome emails)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VictorChidex1/lumina-saas.git
    cd lumina
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file with your Firebase and EmailJS keys (see `.env.example`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for Vercel. Simply import the repository and add your environment variables.

### GitHub Pages

To deploy to GitHub Pages:

```bash
npm run deploy
```

## 📄 License

This project is licensed under the MIT License.
