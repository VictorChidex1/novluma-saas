import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  PenTool,
  Twitter,
  Linkedin,
  Mail,
  FileText,
  Zap,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { addProject } from "@/lib/projects";
import { generateContent } from "@/lib/gemini";
import { toast } from "sonner";

export function NewProject() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    platform: "",
    tone: "",
  });

  const platforms = [
    { id: "blog", name: "Blog Post", icon: FileText, color: "bg-blue-500" },
    {
      id: "twitter",
      name: "Twitter Thread",
      icon: Twitter,
      color: "bg-sky-500",
    },
    {
      id: "linkedin",
      name: "LinkedIn Post",
      icon: Linkedin,
      color: "bg-blue-700",
    },
    {
      id: "email",
      name: "Email Newsletter",
      icon: Mail,
      color: "bg-purple-500",
    },
  ];

  const tones = [
    {
      id: "professional",
      name: "Professional",
      desc: "Clear, authoritative, and polished.",
      icon: CheckCircle2,
    },
    {
      id: "witty",
      name: "Witty",
      desc: "Fun, engaging, and clever.",
      icon: Sparkles,
    },
    {
      id: "urgent",
      name: "Urgent",
      desc: "Action-oriented and direct.",
      icon: Zap,
    },
    {
      id: "friendly",
      name: "Friendly",
      desc: "Warm, approachable, and helpful.",
      icon: PenTool,
    },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = async () => {
    if (!user) return;
    setIsGenerating(true);
    try {
      // 1. Generate content with AI
      const generatedContent = await generateContent(
        formData.topic,
        formData.platform,
        formData.tone
      );

      // 2. Save to Firestore
      await addProject(user.uid, {
        title: formData.topic,
        platform: formData.platform,
        tone: formData.tone,
        content: generatedContent, // Save real content
        words: generatedContent.split(/\s+/).length, // Calculate real word count
      });

      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Topic</span>
            <span>Platform</span>
            <span>Tone</span>
            <span>Review</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What do you want to write about?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a topic, headline, or a few keywords to get started.
                </p>
                <textarea
                  value={formData.topic}
                  onChange={(e) => updateForm("topic", e.target.value)}
                  placeholder="e.g., The future of AI in healthcare..."
                  className="w-full h-40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-lg"
                  autoFocus
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose your platform
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => updateForm("platform", platform.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        formData.platform === platform.id
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white`}
                      >
                        <platform.icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        {platform.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Select a tone
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => updateForm("tone", tone.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        formData.tone === tone.id
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <tone.icon
                          className={`w-5 h-5 ${
                            formData.tone === tone.id
                              ? "text-indigo-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {tone.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tone.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  Ready to generate?
                </h2>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-6 space-y-4 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500">Topic</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right max-w-[60%] truncate">
                      {formData.topic}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500">Platform</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {formData.platform}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tone</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {formData.tone}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isGenerating}
            className="w-32"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.topic) ||
                (step === 2 && !formData.platform) ||
                (step === 3 && !formData.tone)
              }
              className="w-32 bg-indigo-600 hover:bg-indigo-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-40 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
