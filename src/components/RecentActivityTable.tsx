import { type Project } from "@/lib/projects";
import { format } from "date-fns";
import {
  FileText,
  Mail,
  MessageSquare,
  Video,
  CheckCircle2,
} from "lucide-react";

interface RecentActivityTableProps {
  projects: Project[];
}

export function RecentActivityTable({ projects }: RecentActivityTableProps) {
  // Take only the first 5 projects
  const recentProjects = projects.slice(0, 5);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "email":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "social":
      case "tweet":
      case "linkedin":
        return <MessageSquare className="w-4 h-4 text-pink-500" />;
      case "video":
      case "youtube":
        return <Video className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-indigo-500" />;
    }
  };

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No recent activity found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 font-medium">Project Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Words</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentProjects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {project.title || "Untitled Project"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                      {getIcon(project.platform || "blog")}
                    </div>
                    <span className="capitalize text-gray-700 dark:text-gray-300">
                      {project.platform || "Blog Post"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {project.words?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {project.createdAt
                    ? (() => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const toDate = (project.createdAt as any).toDate;
                        const date = toDate
                          ? toDate.call(project.createdAt)
                          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            new Date((project.createdAt as any).seconds * 1000);

                        return format(date, "MMM d, yyyy");
                      })()
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
