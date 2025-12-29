import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";

import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100">
      <SEO
        title="Home"
        description="Novluma is the ultimate AI-powered content creation platform. Transform your ideas into professional content in seconds."
      />
      <Navbar
        onSignin={() => navigate("/login")}
        onGetStarted={() => navigate("/signup")}
      />
      <Hero onGetStarted={() => navigate("/signup")} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing onGetStarted={() => navigate("/signup")} />
      <FAQ />
      <Footer />
    </div>
  );
}
