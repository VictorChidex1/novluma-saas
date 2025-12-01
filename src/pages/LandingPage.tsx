import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

export function LandingPage() {
  const handleSignIn = () => {
    console.log("Sign in clicked");
    // This is now handled by the Navbar internal state, but keeping for prop compatibility
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked");
    // This is now handled by the Navbar internal state
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-800">
      {/* 1. Navigation Bar */}
      <Navbar onSignin={handleSignIn} onGetStarted={handleGetStarted} />

      {/* 2. Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Placeholder for future sections */}
      <div className="py-20 text-center text-gray-400">
        (Features & Pricing sections will go here)
      </div>
    </div>
  );
}
