import React, { useState } from "react";
import { Navbar } from "./Navbar";
import {
  LayoutDashboard,
  Settings,
  Users,
  FolderOpen,
  PieChart,
  HelpCircle,
  LogOut,
  Book,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/Logo.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Reports", href: "/reports", icon: PieChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Documentation", href: "/docs", icon: Book },
    { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Novluma Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Novluma
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={async () => {
            await logout();
            // Use window.location to ensure a full state reset
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-2.5 rounded-lg transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-20 px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Novluma Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Novluma
          </span>
        </Link>
        <Navbar
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isSidebarOpen={isMobileMenuOpen}
        />
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-40 transform transition-transform duration-300 pt-16 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <SidebarContent />
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16">
        <div className="p-6 pb-24 md:p-8">{children}</div>
      </main>
    </div>
  );
}
