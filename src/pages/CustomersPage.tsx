import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Zap,
  Building2,
  Star,
  Twitter,
  Linkedin,
} from "lucide-react";

const CustomersPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const companies = [
    { name: "TechCorp", icon: Building2 },
    { name: "InnovateLabs", icon: Zap },
    { name: "GlobalSystems", icon: Users },
    { name: "FutureWorks", icon: TrendingUp },
    { name: "AlphaStream", icon: Building2 },
    { name: "OmegaSolutions", icon: Zap },
    // Duplicated for marquee effect
    { name: "TechCorp", icon: Building2 },
    { name: "InnovateLabs", icon: Zap },
    { name: "GlobalSystems", icon: Users },
    { name: "FutureWorks", icon: TrendingUp },
    { name: "AlphaStream", icon: Building2 },
    { name: "OmegaSolutions", icon: Zap },
  ];

  const metrics = [
    { label: "Content Generated", value: "10M+", icon: Zap },
    { label: "Enterprise Clients", value: "500+", icon: Building2 },
    { label: "Customer Satisfaction", value: "98%", icon: Star },
    { label: "Support Response", value: "24/7", icon: Users },
  ];

  const caseStudies = [
    {
      company: "TechFlow Solutions",
      industry: "SaaS",
      result: "200% Increase in Leads",
      description:
        "How TechFlow used Lumina's AI content generation to scale their inbound marketing and triple their organic traffic in 3 months.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
    },
    {
      company: "Creative Pulse",
      industry: "Marketing Agency",
      result: "40hrs/week Saved",
      description:
        "Creative Pulse automated their client reporting and content scheduling, allowing them to take on 5x more clients without hiring.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      company: "Growth Master",
      industry: "E-commerce",
      result: "15% Conversion Boost",
      description:
        "By personalizing product descriptions at scale with Lumina, Growth Master saw a significant uptick in add-to-cart rates.",
      image:
        "https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
    {
      company: "NextGen Health",
      industry: "Healthcare",
      result: "30% Lower CAC",
      description:
        "NextGen Health utilized Lumina to create targeted educational content, significantly reducing their customer acquisition costs.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const filteredCaseStudies =
    selectedIndustry === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.industry === selectedIndustry);

  const wallOfLove = [
    {
      name: "Alex Chen",
      handle: "@alexc_dev",
      avatar: "AC",
      content:
        "Just tried Lumina for the first time. Mind blown. 🤯 The quality of the output is lightyears ahead of anything else I've used.",
      source: "Twitter",
      icon: Twitter,
    },
    {
      name: "Sarah Miller",
      handle: "@sarahm_marketing",
      avatar: "SM",
      content:
        "Lumina saved me about 15 hours this week alone. If you're in content marketing and not using this, you're doing it wrong.",
      source: "Twitter",
      icon: Twitter,
    },
    {
      name: "David Park",
      handle: "David Park",
      avatar: "DP",
      content:
        "Incredible tool for scaling agency operations. We've doubled our client capacity without increasing headcount.",
      source: "LinkedIn",
      icon: Linkedin,
    },
    {
      name: "Emily Zhang",
      handle: "@emilyz_design",
      avatar: "EZ",
      content:
        "The new image generation features in Lumina are game-changing. Perfect for quick mockups and social assets.",
      source: "Twitter",
      icon: Twitter,
    },
    {
      name: "James Wilson",
      handle: "James Wilson",
      avatar: "JW",
      content:
        "Customer support is top notch. Had a small issue and it was resolved in minutes. Highly recommend!",
      source: "LinkedIn",
      icon: Linkedin,
    },
    {
      name: "Lisa Torres",
      handle: "@lisat_writer",
      avatar: "LT",
      content:
        "As a freelance writer, I was skeptical. But Lumina acts more like a research assistant than a replacement. Love it.",
      source: "Twitter",
      icon: Twitter,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Customer Stories
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
                  Trusted by absolute{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Industry Leaders
                  </span>
                </h1>
                <p className="text-xl text-indigo-200 leading-relaxed max-w-2xl mx-auto">
                  Join thousands of forward-thinking companies using Lumina to
                  power their next phase of growth.
                </p>
              </motion.div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-20 border-y border-indigo-800/30 py-12">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 mx-auto bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-400 mb-3 border border-indigo-800/50">
                    <metric.icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-indigo-300">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Infinite Logo Marquee */}
            <div className="relative w-full overflow-hidden py-10">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-indigo-950 dark:from-black to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-950 dark:from-black to-transparent z-10"></div>
              <motion.div
                className="flex gap-16 items-center w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 20,
                }}
              >
                {[...companies, ...companies].map((company, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-indigo-900/20 rounded-xl flex items-center justify-center group-hover:bg-indigo-900/40 transition-colors border border-indigo-800/30">
                      <company.icon className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-indigo-300 group-hover:text-white transition-colors">
                      {company.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies with Filter */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  See how real companies are achieving tangible results with our
                  platform.
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                {[
                  "All",
                  "SaaS",
                  "Marketing Agency",
                  "E-commerce",
                  "Healthcare",
                ].map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedIndustry === industry
                        ? "bg-indigo-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCaseStudies.map((study) => (
                  <motion.div
                    layout
                    key={study.company}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={study.image}
                        alt={study.company}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {study.company}
                      </h3>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                          {study.result}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                        {study.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline"
                      >
                        Read Case Study
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Wall of Love */}
        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Wall of Love</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Don't just take our word for it. Here's what the community is
                saying.
              </p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {wallOfLove.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="break-inside-avoid bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {post.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.handle}
                        </div>
                      </div>
                    </div>
                    <post.icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {post.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-indigo-900 dark:bg-black text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to write your success story?
            </h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
              Join the growing list of companies transforming their business
              with Lumina.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-indigo-900 hover:bg-gray-100 font-semibold"
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-400 text-indigo-100 hover:bg-indigo-800 hover:text-white"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomersPage;
