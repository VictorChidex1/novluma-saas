import { DashboardLayout } from "../components/DashboardLayout";
import { ArrowLeft, Sparkles, PlusCircle, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function GettingStartedPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: PlusCircle,
      title: "1. Create Your First Project",
      description:
        "Click the '+ New Project' button in the dashboard. Our AI wizard will ask you for a topic (e.g., 'Latest Tech Trends'), a platform (LinkedIn, Twitter, Blog), and your desired tone of voice. It's as simple as filling out a 3-question form.",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      screenshotColor: "bg-blue-50 dark:bg-blue-900/20",
      image: "/wizard-step.png",
    },
    {
      icon: Sparkles,
      title: "2. Let AI Generate Magic",
      description:
        "Watch as Lumina processes your request. Within seconds, you'll get a fully written draft tailored to your specifications. No more writer's block! We use the latest AI models to ensure your content sounds human and engaging.",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      screenshotColor: "bg-purple-50 dark:bg-purple-900/20",
      image: "/generating-step.png",
    },
    {
      icon: Pencil,
      title: "3. Refine & Polish",
      description:
        "Use our 'Magic Edit' feature. Highlight any text and tell the AI to 'make it funnier', 'shorten it', or 'fix grammar'. You have full control over the final output, just like working with a professional editor.",
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      screenshotColor: "bg-indigo-50 dark:bg-indigo-900/20",
      image: "/editor-step.png",
    },
    {
      icon: Save,
      title: "4. Save & Organize",
      description:
        "Your work is automatically saved to the cloud. You can organize projects by status (Draft, In Progress, Completed) and access them from anywhere. Never lose a great idea again.",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
      screenshotColor: "bg-green-50 dark:bg-green-900/20",
      image: "/dashboard-step.png",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/support")}
          className="mb-8 pl-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Support
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Lumina 🚀
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your all-in-one AI content workspace. Let's get you set up and
            creating in minutes.
          </p>
        </div>

        {/* Hero Video Section */}
        <div className="relative w-full aspect-video max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden mb-20 shadow-xl border border-gray-800">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ryJCy87EU3g?rel=0"
            title="Lumina Crash Course"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Zig-Zag Timeline */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual Side (Screenshot) */}
              <div className="flex-1 w-full">
                <div
                  className={`aspect-[4/3] rounded-2xl ${step.screenshotColor} flex items-center justify-center relative overflow-hidden group shadow-lg border border-gray-200 dark:border-gray-800`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Link to="/dashboard/new">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 text-lg h-14 rounded-full shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 hover:shadow-indigo-300 dark:hover:shadow-indigo-900/40 transition-all transform hover:-translate-y-1"
            >
              Start Creating Now
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
