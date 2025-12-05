import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Printer,
  Download,
  Cookie,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CookiePolicy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("what-are-cookies");
  // Mock state for cookie preferences
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    functional: true,
  });

  const sections = [
    { id: "what-are-cookies", title: "1. What Are Cookies" },
    { id: "how-we-use", title: "2. How We Use Cookies" },
    { id: "types-of-cookies", title: "3. Types of Cookies" },
    { id: "managing-cookies", title: "4. Managing Cookies" },
    { id: "preferences", title: "5. Your Preferences" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/privacy-hero.png"
              alt="Cookie Policy Background"
              className="w-full h-full object-cover opacity-50 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/80 to-indigo-950 dark:from-black/80 dark:via-black/80 dark:to-black"></div>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Legal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
                Cookie{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Policy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                Understanding how and why we use cookies to improve your
                experience.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Table of Contents (Desktop Sticky) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 pl-4 border-l-2 border-transparent">
                  On this page
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors border-l-2 ${
                        activeSection === section.id
                          ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/10"
                          : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 mb-4">
                    Need the raw file?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-gray-200 dark:border-gray-700"
                    onClick={handlePrint}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-grow max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Last Updated
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handlePrint}
                  variant="ghost"
                  className="gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Printer className="w-4 h-4" />
                  Print Policy
                </Button>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
                <section id="what-are-cookies" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white group">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      1
                    </span>
                    What Are Cookies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-none">
                    Cookies are small text files that are placed on your
                    computer or mobile device by websites that you visit. They
                    are widely used in order to make websites work, or work more
                    efficiently, as well as to provide information to the owners
                    of the site. Lumina uses cookies to distinguish you from
                    other users of our website.
                  </p>
                </section>

                <section id="how-we-use" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      2
                    </span>
                    How We Use Cookies
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We use cookies for a variety of reasons detailed below.
                      Unfortunately, in most cases there are no industry
                      standard options for disabling cookies without completely
                      disabling the functionality and features they add to this
                      site.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "To keep you signed in",
                        "To understand how you use the site",
                        "To remember your preferences",
                        "To provide personalized content",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                        >
                          <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="types-of-cookies" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      3
                    </span>
                    Types of Cookies We Use
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Essential Cookies",
                        desc: "Necessary for the website to function properly. You cannot opt-out of these.",
                      },
                      {
                        title: "Analytics Cookies",
                        desc: "Help us understand how visitors interact with the website.",
                      },
                      {
                        title: "Functional Cookies",
                        desc: "Enable enhanced functionality and personalization.",
                      },
                      {
                        title: "Marketing Cookies",
                        desc: "Used to track visitors across websites to display relevant ads.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                          <Cookie className="w-4 h-4 text-indigo-500" />
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="managing-cookies" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      4
                    </span>
                    Managing Cookies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Most web browsers allow some control of most cookies through
                    the browser settings. To find out more about cookies,
                    including how to see what cookies have been set, visit{" "}
                    <a
                      href="http://www.aboutcookies.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      www.aboutcookies.org
                    </a>{" "}
                    or{" "}
                    <a
                      href="http://www.allaboutcookies.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      www.allaboutcookies.org
                    </a>
                    .
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Find out how to manage cookies on popular browsers:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 list-disc list-inside">
                    <li>
                      <a href="#" className="hover:text-indigo-500">
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-500">
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-500">
                        Apple Safari
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-500">
                        Microsoft Edge
                      </a>
                    </li>
                  </ul>
                </section>

                <section id="preferences" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      5
                    </span>
                    Your Preferences
                  </h2>

                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4 mb-6">
                      <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Cookie Settings
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Manage your cookie preferences for this website.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          key: "essential",
                          label: "Essential Cookies",
                          desc: "Required for basic site functionality.",
                          disabled: true,
                        },
                        {
                          key: "analytics",
                          label: "Analytics Cookies",
                          desc: "Help us improve our website.",
                        },
                        {
                          key: "marketing",
                          label: "Marketing Cookies",
                          desc: "Used for targeted advertising.",
                        },
                        {
                          key: "functional",
                          label: "Functional Cookies",
                          desc: "Allow for personalization.",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <Label
                              htmlFor={item.key}
                              className="text-base font-medium text-gray-900 dark:text-white"
                            >
                              {item.label}
                            </Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <Switch
                            id={item.key}
                            checked={
                              preferences[item.key as keyof typeof preferences]
                            }
                            disabled={item.disabled}
                            onCheckedChange={(checked: boolean) =>
                              setPreferences((prev) => ({
                                ...prev,
                                [item.key]: checked,
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
