import React, { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { type Project } from "@/lib/projects";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  Download,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
// We might need to fetch projects here if not available in context globally,
// checking projects.ts to see if there's a hook.
// Assuming for now we can get projects passed down or fetched.
// Let's rely on the pattern in Dashboard.tsx which likely fetches projects.

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RecentActivityTable } from "@/components/RecentActivityTable";
import { ROICalculator } from "@/components/ROICalculator";

export function AnalyticsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 1. Fetch Projects (Similar to Dashboard logic)
  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "projects"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(projectData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. Calculate Stats
  const stats = useMemo(() => {
    const totalWords = projects.reduce(
      (acc, curr) => acc + (curr.words || 0),
      0
    );
    const totalProjects = projects.length;
    // Estimate: 40 words per minute typing speed
    const timeSavedMinutes = Math.round(totalWords / 40);
    const timeSavedHours = (timeSavedMinutes / 60).toFixed(1);

    // Mock Efficiency Score (would be complex algorithm in real app)
    const efficiencyScore = totalProjects > 0 ? 92 : 0;

    return { totalWords, totalProjects, timeSavedHours, efficiencyScore };
  }, [projects]);

  // 3. Prepare Chart Data (Usage Trends - Last 30 Days)
  const usageData = useMemo(() => {
    const days: { date: string; name: string; words: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        date: d.toISOString().split("T")[0],
        name: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        words: 0,
      });
    }

    projects.forEach((p) => {
      if (!p.createdAt) return;
      let date: Date;
      if (typeof (p.createdAt as any).seconds === "number") {
        date = new Date((p.createdAt as any).seconds * 1000);
      } else {
        date = new Date(p.createdAt as any);
      }
      const dateString = date.toISOString().split("T")[0];
      const entry = days.find((d) => d.date === dateString);
      if (entry) entry.words += p.words || 0;
    });
    return days;
  }, [projects]);

  // 4. Prepare Pie Chart Data (Platform Distribution)
  const typeData = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      const type =
        p.platform || (p as any).type || (p as any).category || "Blog Post";
      counts[type] = (counts[type] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6"];

  if (loading)
    return (
      <div className="p-8">
        <div className="animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"
            ></div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your content performance and usage metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Words"
          value={stats.totalWords.toLocaleString()}
          icon={<BarChart3 className="w-5 h-5 text-indigo-500" />}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Projects Created"
          value={stats.totalProjects.toString()}
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          title="Time Saved"
          value={`${stats.timeSavedHours} hrs`}
          icon={<Clock className="w-5 h-5 text-amber-500" />}
          subtext="Based on avg. tying speed"
        />
        <StatCard
          title="Efficiency Score"
          value={`${stats.efficiencyScore}%`}
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          subtext="Top 10% of users"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Usage Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={usageData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-800"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                  minTickGap={30}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#4f46e5", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="words"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Platform Distribution
          </h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    typeData.length > 0
                      ? typeData
                      : [{ name: "No Data", value: 1 }]
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.length > 0 ? (
                    typeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))
                  ) : (
                    <Cell fill="#e5e7eb" />
                  )}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
              <div className="text-center">
                <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                  {projects.length}
                </span>
                <span className="text-xs text-gray-500">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity & ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivityTable projects={projects} />
        </div>
        <div>
          <ROICalculator totalWords={stats.totalWords} />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  subtext,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  subtext?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">{icon}</div>
        {trend && (
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trendUp
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
