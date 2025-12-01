# Lumina SaaS

Lumina is a modern SaaS application built with React, Vite, and Firebase. It features a responsive landing page, secure authentication (Google + Email), a protected user dashboard, and automated welcome emails.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and Lucide React for a clean, professional look.
- **Authentication**: Secure sign-up and sign-in using Firebase Auth (Google & Email/Password).
- **Protected Dashboard**: User-specific dashboard accessible only after login.
- **Database Integration**: User profiles are automatically stored in Cloud Firestore.
- **Welcome Emails**: Automated welcome emails sent via EmailJS upon sign-up.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend/Auth**: Firebase (Auth, Firestore)
- **Email Service**: EmailJS
- **Deployment**: Vercel (Production), GitHub Pages (Demo)

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

    Create a `.env.local` file in the root directory and add your keys (see `.env.example`):

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

    # EmailJS Configuration
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for Vercel. Simply import the repository and add the environment variables in the Vercel Dashboard.

### GitHub Pages

To deploy to GitHub Pages:

```bash
npm run deploy
```

This command builds the project with the correct base path (`/lumina-saas/`) and pushes it to the `gh-pages` branch.

## 📄 License

This project is licensed under the MIT License.
