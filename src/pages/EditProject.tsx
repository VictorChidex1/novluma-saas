import { useState, useEffect } from "react";
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
} from "lucide-react";
import { getProject, updateProject, type Project } from "@/lib/projects";
import { toast } from "sonner";

export function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

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
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/projects")}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <div className="flex items-center gap-3">
            <select
              value={project.status}
              onChange={async (e) => {
                const newStatus = e.target.value as Project["status"];
                setProject({ ...project, status: newStatus });
                // Auto-save status change
                try {
                  await updateProject(id!, { status: newStatus });
                  toast.success(`Status updated to ${newStatus}`);
                } catch (error) {
                  toast.error("Failed to update status");
                }
              }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <PlatformIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-transparent text-xl font-bold text-gray-900 dark:text-white border-none focus:ring-0 p-0 placeholder-gray-400"
                placeholder="Project Title"
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
              placeholder="Start writing..."
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
