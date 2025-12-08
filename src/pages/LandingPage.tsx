import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";

import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
// import { useAuth } from "../context/AuthContext"; // Unused now
// import { Navigate } from "react-router-dom";      // Unused now

export function LandingPage() {
  // const { user, loading } = useAuth(); // Unused now
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");

  // Redirect logic removed to allow users to visit the homepage from the dashboard logic
  // if (user && !loading) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  const openAuth = (tab: "signin" | "signup") => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Navbar
        onSignin={() => openAuth("signin")}
        onGetStarted={() => openAuth("signup")}
      />
      <Hero onGetStarted={() => openAuth("signup")} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </div>
  );
}
