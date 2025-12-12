import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Plus,
  Minus,
  Search,
  MessageCircle,
  CreditCard,
  Zap,
  Shield,
  BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "General",
    items: [
      {
        question: "What is Novluma and who is it for?",
        answer:
          "Novluma is an enterprise-grade AI content generation platform. It is designed for marketing teams, agencies, and content creators who need to scale production without sacrificing quality. Whether you need blog posts, technical documentation, or social media campaigns, Novluma adapts to your brand voice.",
      },
      {
        question: "How does the 'Brand Voice' feature work?",
        answer:
          "Our advanced models analyze your previous content to understand your tone, style, and terminology. You can upload existing PDFs, blog URLs, or text samples, and Novluma will create a custom 'Voice Profile' that ensures every generated piece sounds exactly like you.",
      },
      {
        question: "Can I collaborate with my team?",
        answer:
          "Yes. Novluma is built for collaboration. You can invite unlimited viewers on all plans. The Pro plan allows up to 5 editors who can co-write, edit, and comment on projects in real-time. Enterprise plans offer advanced roles and permission management.",
      },
      {
        question: "What languages do you support?",
        answer:
          "We currently support content generation in over 95 languages, including English, Spanish, French, German, Mandarin, and Japanese. The AI is natively capable in these languages, ensuring cultural nuance and grammatical accuracy, not just direct translation.",
      },
      {
        question: "Can I use the content for commercial purposes?",
        answer:
          "Absolutely. You retain 100% ownership and commercial rights to all content generated within your account. You can use it for client deliverables, monetization, or internal communications without any royalties or attribution required.",
      },
    ],
  },
  {
    category: "Billing & Plans",
    items: [
      {
        question: "How does the word count limit work?",
        answer:
          "Your word count quota resets on the 1st of every billing cycle. For example, if you subscribe on the 15th, your quota renews on the 15th of next month. Unused words currently roll over for one month on the Pro plan.",
      },
      {
        question: "Do you offer discounts for nonprofits or students?",
        answer:
          "Yes! We offer a 30% discount for registered non-profit organizations and active students. Please contact our support team with your documentation to apply the discount to your account.",
      },
      {
        question: "What happens if I hit my limit?",
        answer:
          "If you reach your word limit, we won't cut you off immediately. You have a 1,000-word buffer. After that, you'll need to upgrade seamlessly to the next tier or purchase a 'Word Pack' top-up for a one-time fee.",
      },
      {
        question: "Can I switch plans at any time?",
        answer:
          "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately with pro-rated billing. Downgrades take effect at the end of your current billing cycle.",
      },
      {
        question: "Do you offer enterprise invoicing?",
        answer:
          "For Enterprise plans, we support manual invoicing, purchase orders (PO), and bank transfers. Please contact our sales team to set up a custom billing agreement.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        question: "Which AI models power Novluma?",
        answer:
          "We use a hybrid orchestration engine. For reasoning and complex structuring, we leverage Google's Gemini 2.0 Pro. For speed and creative drafting, we utilize Gemini 2.0 Flash. This ensures you get the best balance of intelligence and latency.",
      },
      {
        question: "Is my data used to train your models?",
        answer:
          "No. We have a strict zero-retention policy for model training on our Enterprise and Pro plans. Your data is processed ephemerally and is never used to improve our base models or shared with third-party model providers for training.",
      },
      {
        question: "Do you have an API for developers?",
        answer:
          "Yes, we offer a robust REST API that allows you to integrate Novluma's generation capabilities into your own CMS or workflows. Documentation is available in the developer portal upon request.",
      },
      {
        question: "How do you handle data security?",
        answer:
          "We use AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is hosted on Google Cloud Platform (GCP) and is SOC 2 Type II compliant. We also feature regular penetration testing and vulnerability scans.",
      },
      {
        question: "Can I export my projects?",
        answer:
          "Yes, you can export your content in multiple formats including Markdown (.md), PDF, HTML, and plain text. We also offer direct integrations with CMS platforms like WordPress and Ghost on the Enterprise plan.",
      },
    ],
  },
];

const topics = [
  {
    icon: Zap,
    title: "Getting Started",
    desc: "Basics of Novluma",
    category: "General",
  },
  {
    icon: CreditCard,
    title: "Billing",
    desc: "Plans & payments",
    category: "Billing & Plans",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Data & privacy",
    category: "Technical",
  },
  {
    icon: BookOpen,
    title: "API Access",
    desc: "For developers",
    category: "Technical",
  },
];

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {question}
        </span>
        <span
          className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 ${
            isOpen
              ? "bg-indigo-600 border-indigo-600 text-white rotate-180"
              : "border-gray-300 dark:border-gray-700 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("General-0");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs
    .filter(
      (category) =>
        activeCategory === "All" || category.category === activeCategory
    )
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const categories = ["All", ...faqs.map((c) => c.category)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <SEO
        title="FAQ"
        description="Frequently Asked Questions about Novluma. Find answers about billing, features, and technical details."
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section - Matching Contact Page Design */}
        <section className="relative pt-32 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Support Center
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-indigo-200 leading-relaxed max-w-2xl mx-auto">
                Everything you need to know about the product and billing. Can’t
                find the answer you’re looking for? Please chat to our friendly
                team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content Section */}
        <section className="relative -mt-20 pb-24 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar - Floating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 mb-12 flex items-center"
              >
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for answers (e.g., 'billing', 'api key')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-6 text-lg bg-transparent border-none focus-visible:ring-0 shadow-none"
                  />
                </div>
              </motion.div>

              {/* Quick Topic Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {topics.map((topic, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => setActiveCategory(topic.category)}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left"
                  >
                    <topic.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {topic.desc}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Category Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mb-8 justify-center"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* FAQ Accordion */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((category, catIndex) => (
                    <div key={catIndex}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 px-2">
                        <span className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                        {category.category}
                      </h3>
                      <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-2 md:p-8 shadow-sm">
                        {category.items.map((item, index) => {
                          const itemKey = `${category.category}-${index}`;
                          return (
                            <AccordionItem
                              key={index}
                              question={item.question}
                              answer={item.answer}
                              isOpen={openIndex === itemKey}
                              onClick={() => toggleAccordion(itemKey)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400">
                      No results found for"{searchQuery}" in {activeCategory}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 text-center bg-gray-50 dark:bg-gray-900/50 p-12 rounded-3xl border border-gray-100 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                  Can't find the answer you're looking for? Our team is here to
                  help you get back on track.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/contact"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:support@novluma.com"
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-medium transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQPage;
