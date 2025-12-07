import { DashboardLayout } from "../components/DashboardLayout";
import {
  HelpCircle,
  Book,
  Video,
  MessageCircle,
  FileText,
  ExternalLink,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SupportPage() {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Getting Started Guide",
      description:
        "Everything you need to know to create your first content project.",
      icon: Book,
      color: "bg-blue-500",
      link: "/dashboard/getting-started",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step videos on how to use advanced features.",
      icon: Video,
      color: "bg-red-500",
      link: "/tutorials",
    },
    {
      title: "API Documentation",
      description:
        "Technical documentation for integrating Lumina into your workflow.",
      icon: FileText,
      color: "bg-purple-500",
      link: "/docs/api",
    },
    {
      title: "Community Forum",
      description: "Connect with other creators and share tips and tricks.",
      icon: MessageCircle,
      color: "bg-green-500",
      link: "/community",
    },
  ];

  const faqs = [
    {
      question: "How do I upgrade my subscription?",
      answer:
        "You can upgrade your plan at any time from the 'Billing & Subscription' section in your Settings page. Changes take effect immediately.",
    },
    {
      question: "Can I export my projects?",
      answer:
        "Yes! You can copy content directly or use the 'Export' feature (coming soon) to download as PDF or Markdown.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption for all data and never share your personal content with third parties.",
    },
    {
      question: "What happens if I run out of credits?",
      answer:
        "If you reach your monthly limit, you can purchase a top-up pack or wait for your credits to refresh at the start of the next billing cycle.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Help & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Find answers, learn how to use Lumina, or get in touch with our
            team.
          </p>
        </div>

        {/* Support Deck (Resources Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(resource.link)}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:shadow-md transition-all group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                <resource.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {resource.description}
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Learn more <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="lg:col-span-1">
            <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-900/30 sticky top-24">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                Still need help?
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Our support team is available 24/7 to assist you with any
                issues.
              </p>
              <Link to="/contact">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Contact Support
                </Button>
              </Link>
              <div className="mt-4 text-center">
                <a
                  href="mailto:support@lumina.com"
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  or email support@lumina.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-800/50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
