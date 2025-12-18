import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProjects } from "@/lib/projects";
import { DashboardLayout } from "../components/DashboardLayout";
import { UsageChart } from "../components/UsageChart";
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  BarChart2,
  Settings,
  Clock,
  Zap,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      title: "New Project",
      description: "Start generating content",
      icon: Plus,
      color: "bg-indigo-500",
      href: "/dashboard/new",
    },
    {
      title: "My Drafts",
      description: "Continue recent work",
      icon: FileText,
      color: "bg-purple-500",
      href: "/dashboard/projects",
    },
    {
      title: "Analytics",
      description: "View performance",
      icon: BarChart2,
      color: "bg-pink-500",
      href: "/dashboard/analytics",
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: Settings,
      color: "bg-slate-500",
      href: "/dashboard/settings",
    },
  ];

  const [projects, setProjects] = useState<any[]>([]);
  const [usageData, setUsageData] = useState({
    wordsUsed: 0,
    rawCycleStart: null as any,
    role: "user",
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          // Fetch Projects
          const projectsData = await getUserProjects(user.uid);
          setProjects(projectsData);

          // Fetch User Usage
          const { doc, getDoc } = await import("firebase/firestore");
          const { db } = await import("@/lib/firebase");
          const userSnap = await getDoc(doc(db, "users", user.uid));

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUsageData({
              wordsUsed: data.usage?.wordsUsed || 0,
              rawCycleStart: data.usage?.cycleStart || null,
              role: data.role || "user",
            });
          }
        } catch (error) {
          console.error("Failed to fetch dashboard data", error);
        }
      }
    };
    fetchDashboardData();
  }, [user]);

  // Calculate real stats
  const totalProjects = projects.length;

  const getResetDate = () => {
    if (usageData.role === "admin") return "Never";
    if (!usageData.rawCycleStart) return "30 days";
    const date = usageData.rawCycleStart.toDate();
    date.setDate(date.getDate() + 30);
    return date.toLocaleDateString();
  };

  const usageStats = [
    {
      label: "Words Generated",
      current: usageData.role === "admin" ? "∞" : usageData.wordsUsed,
      limit: usageData.role === "admin" ? "Unlimited" : 5000,
      color: "bg-indigo-600",
      subtext:
        usageData.role === "admin"
          ? "Admin Access"
          : `Resets on ${getResetDate()}`,
    },
    {
      label: "Projects Created",
      current: totalProjects,
      limit: "Unlimited",
      color: "bg-purple-600",
      subtext: "No limit",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {user?.displayName?.split(" ")[0] || "User"} 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your creative workspace today.
            </p>
          </motion.div>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Quick Actions Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500" />
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div key={index} variants={item}>
                  <Link
                    to={action.href}
                    className="group block p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 -translate-x-2 group-hover:translate-x-0 transition-transform" />
                    </div>
                    <div
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Usage Chart Section */}
          <section>
            <motion.div variants={item}>
              <UsageChart projects={projects} />
            </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Feed */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  Recent Activity
                </h2>
                <Link
                  to="/dashboard/projects"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View all
                </Link>
              </div>
              <motion.div
                variants={item}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {projects.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No recent activity. Start a new project!
                    </div>
                  ) : (
                    projects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        onClick={() =>
                          navigate(`/dashboard/projects/${project.id}`)
                        }
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {project.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {project.platform} •{" "}
                              {project.createdAt?.seconds
                                ? new Date(
                                    project.createdAt.seconds * 1000
                                  ).toLocaleDateString()
                                : "Just now"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              project.status === "Completed"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                : project.status === "In Progress"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {project.status}
                          </span>
                          <Link to={`/dashboard/projects/${project.id}`}>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </section>

            {/* Usage Stats */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-500" />
                Usage Overview
              </h2>
              <motion.div
                variants={item}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6"
              >
                {usageStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </span>
                      <div className="text-right">
                        <span className="font-medium text-gray-900 dark:text-white block">
                          {typeof stat.current === "number"
                            ? stat.current.toLocaleString()
                            : stat.current}{" "}
                          /{" "}
                          {typeof stat.limit === "number"
                            ? stat.limit.toLocaleString()
                            : stat.limit}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.subtext}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            typeof stat.limit === "number" &&
                            typeof stat.current === "number"
                              ? `${Math.min(
                                  (stat.current / stat.limit) * 100,
                                  100
                                )}%`
                              : "100%",
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center">
                    <p className="font-medium mb-1">Upgrade to Pro</p>
                    <p className="text-xs text-indigo-100 mb-3">
                      Unlock unlimited generation and advanced features.
                    </p>
                    <Link
                      to="/dashboard/settings"
                      className="block w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
