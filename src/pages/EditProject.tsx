import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
  Scissors,
  MoreHorizontal,
  Briefcase,
  Zap,
  Download,
  Printer,
} from "lucide-react";

import {
  getProject,
  updateProject,
  checkUsage,
  incrementUsage,
  type Project,
} from "@/lib/projects";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuth } from "@/context/AuthContext";
export function EditProject() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Auto-resize textarea when title changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [formData.title]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const data = await getProject(id);
        if (data) {
          setProject(data);
          setFormData({
            title: data.title,
            content: data.content,
          });
        } else {
          toast.error("Project not found");
          navigate("/dashboard/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await updateProject(id, {
        title: formData.title,
        content: formData.content,
        // Update word count based on new content
        words: formData.content.split(/\s+/).length,
      });
      toast.success("Project updated successfully");
      navigate("/dashboard/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-10 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 hidden md:block" />
              <Skeleton className="h-10 w-24 hidden md:block" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) return null;

  const PlatformIcon =
    project.platform === "twitter"
      ? Twitter
      : project.platform === "linkedin"
      ? Linkedin
      : project.platform === "email"
      ? Mail
      : FileText;

  // Magic Edit Logic
  const handleMagicEdit = async (instruction: string) => {
    // Dynamic import to avoid circular dependency loop if any, or just use context hook if available
    // But since we are inside a component inside AuthProvider, we can use useAuth hook if we lift it up.
    // However, I see I forgot to import useAuth in the top level. I will fix that in a separate edit or here.
    // Let's assume I will add `const { user } = useAuth();` at top level.
    if (!user) return; // Guard

    // 1. Check Usage
    const canProceed = await checkUsage(user.uid);
    if (!canProceed) {
      toast.error(
        "You have reached your monthly word limit. Upgrade to Pro for unlimited AI edits!"
      );
      return;
    }

    const textarea = document.querySelector(
      "textarea[placeholder='Start writing or use Magic Edit to generate content...']"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);

    if (!selectedText || selectedText.trim().length === 0) {
      toast.error("Please select some text to edit first!");
      return;
    }

    setSaving(true);
    toast.info("Refining your text...");

    try {
      const { refineContent } = await import("@/lib/gemini");
      const refinedText = await refineContent(selectedText, instruction);

      // Optimistic Update
      const newContent =
        formData.content.substring(0, start) +
        refinedText.trim() +
        formData.content.substring(end);

      setFormData({ ...formData, content: newContent });

      // 2. Increment Usage
      const wordCount = refinedText.split(/\s+/).length;
      await incrementUsage(user.uid, wordCount);

      toast.success("Magic Edit complete! ✨");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to refine text."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 print:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/projects")}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white self-start md:self-auto pl-0 md:pl-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>

          {/* Magic Actions Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2 hidden md:block">
              Magic Edit:
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleMagicEdit("Improve writing quality")}
            >
              <Sparkles className="w-3 h-3 mr-1 text-indigo-500" /> Improve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleMagicEdit("Make it shorter and more concise")
              }
            >
              <Scissors className="w-3 h-3 mr-1 text-blue-500" /> Shorten
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleMagicEdit("Make it longer and more detailed")
              }
            >
              <MoreHorizontal className="w-3 h-3 mr-1 text-green-500" /> Expand
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleMagicEdit("Make the tone more professional")}
            >
              <Briefcase className="w-3 h-3 mr-1 text-purple-500" />{" "}
              Professional
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleMagicEdit("Make the tone fun and witty")}
            >
              <Zap className="w-3 h-3 mr-1 text-yellow-500" /> Fun
            </Button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            {/* Status Select (Previous Code) */}
            <select
              value={project.status}
              onChange={async (e) => {
                const newStatus = e.target.value as Project["status"];
                setProject({ ...project, status: newStatus });
                try {
                  await updateProject(id!, { status: newStatus });
                  toast.success(`Status updated to ${newStatus}`);
                } catch (error) {
                  toast.error("Failed to update status");
                }
              }}
              className="flex-1 md:flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Export Actions */}
            <div className="flex items-center gap-2 print:hidden">
              <Button
                variant="outline"
                size="icon"
                title="Download Markdown"
                onClick={() => {
                  const blob = new Blob([formData.content], {
                    type: "text/markdown",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${formData.title || "project"}.md`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  toast.success("Downloaded as Markdown");
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Save as PDF"
                onClick={() => {
                  window.print();
                }}
              >
                <Printer className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden print:border-none print:shadow-none">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <PlatformIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                className="w-full bg-transparent text-xl font-bold text-gray-900 dark:text-white border-none focus:ring-0 p-0 placeholder-gray-400 resize-none overflow-hidden"
                placeholder="Project Title"
                rows={1}
                style={{ minHeight: "28px" }}
              />
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="capitalize">{project.platform}</span>
                <span>•</span>
                <span className="capitalize">{project.tone} Tone</span>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-6">
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full min-h-[500px] p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-serif"
              placeholder="Start writing or use Magic Edit to generate content..."
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
