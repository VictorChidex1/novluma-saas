import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Quote,
  TrendingUp,
  Users,
  Zap,
  Building2,
} from "lucide-react";

const CustomersPage = () => {
  const companies = [
    { name: "TechCorp", icon: Building2 },
    { name: "InnovateLabs", icon: Zap },
    { name: "GlobalSystems", icon: Users },
    { name: "FutureWorks", icon: TrendingUp },
    { name: "AlphaStream", icon: Building2 },
    { name: "OmegaSolutions", icon: Zap },
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
  ];

  const testimonials = [
    {
      quote:
        "Lumina hasn't just improved our workflow; it completely redefined what we thought was possible with a small team.",
      author: "Sarah Jenkins",
      role: "CMO, TechFlow",
    },
    {
      quote:
        "The ROI we've seen in just the first quarter is undeniable. It's the competitive edge we were looking for.",
      author: "Michael Ross",
      role: "founder, ScaleUp",
    },
    {
      quote:
        "Finally, an AI tool that actually understands brand voice. The output requires almost no editing.",
      author: "Jessica Li",
      role: "Content Director, MediaHive",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  Customer Stories
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                  Trusted by absolute{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                    Industry Leaders
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                  Join thousands of forward-thinking companies using Lumina to
                  power their next phase of growth.
                </p>
              </motion.div>
            </div>

            {/* Logo Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
            >
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <company.icon className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {company.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
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
              <Button variant="outline" className="hidden md:flex gap-2">
                View All Stories <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
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
                    <h3 className="text-xl font-bold mb-2">{study.company}</h3>
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
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              What Founders Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl relative"
                >
                  <Quote className="w-10 h-10 text-indigo-200 dark:text-indigo-900 absolute top-6 left-6 -z-0" />
                  <p className="relative z-10 text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {t.author}
                      </div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
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
