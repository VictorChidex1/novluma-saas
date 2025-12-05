import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";
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
import { Link } from "react-router-dom";

export function Dashboard() {
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
      href: "/reports",
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: Settings,
      color: "bg-slate-500",
      href: "/dashboard/settings",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Blog Post: AI Trends 2025",
      type: "Generated Content",
      time: "2 hours ago",
      status: "Completed",
    },
    {
      id: 2,
      title: "Social Media Campaign",
      type: "Project Created",
      time: "5 hours ago",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Product Description V2",
      type: "Edited",
      time: "Yesterday",
      status: "Draft",
    },
  ];

  const usageStats = [
    {
      label: "Words Generated",
      current: 12500,
      limit: 50000,
      color: "bg-indigo-600",
    },
    {
      label: "Projects Created",
      current: 8,
      limit: 20,
      color: "bg-purple-600",
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
              Good afternoon, {user?.displayName?.split(" ")[0] || "User"} 👋
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
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.type} • {activity.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          {activity.status}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
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
                      <span className="font-medium text-gray-900 dark:text-white">
                        {stat.current.toLocaleString()} /{" "}
                        {stat.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(stat.current / stat.limit) * 100}%`,
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
