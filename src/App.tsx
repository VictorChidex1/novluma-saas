import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

// We will add more components here later (Features, Pricing, etc.)

function App() {
  // Placeholder state for now - we will build the full Wizard later
  const handleSignIn = () => {
    console.log("Sign in clicked");
    alert("Sign In coming soon!");
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked");
    alert("Wizard flow starting soon!");
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

export default App;
