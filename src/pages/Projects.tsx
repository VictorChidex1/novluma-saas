import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Twitter,
  Linkedin,
  Mail,
  Calendar,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getUserProjects, deleteProject, type Project } from "@/lib/projects";

export function Projects() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserProjects(user.uid);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and organize your generated content.
            </p>
          </div>
          <Link to="/dashboard/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              + New Project
            </Button>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["All", "Completed", "Draft", "In Progress"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === status
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Get started by creating your first project.
              </p>
              <Link to="/dashboard/new">
                <Button variant="outline">Create Project</Button>
              </Link>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      {project.platform === "twitter" ? (
                        <Twitter className="w-6 h-6" />
                      ) : project.platform === "linkedin" ? (
                        <Linkedin className="w-6 h-6" />
                      ) : project.platform === "email" ? (
                        <Mail className="w-6 h-6" />
                      ) : (
                        <FileText className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1 capitalize">
                          {project.platform}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.createdAt?.seconds
                            ? new Date(
                                project.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "Just now"}
                        </span>
                        <span>•</span>
                        <span>{project.words} words</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Completed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : project.status === "In Progress"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {project.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
