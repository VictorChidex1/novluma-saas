import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { docsData } from "../../data/docs";
import { Menu, X, Search } from "lucide-react";
import { OnThisPage } from "./OnThisPage";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Docs Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-indigo-600 dark:text-indigo-400">
                Novluma
              </span>
              <span className="text-gray-900 dark:text-gray-100">Docs</span>
            </Link>
          </div>

          {/* Simple Search Placeholder - Implementation later */}
          <div className="hidden md:flex relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 
              text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto flex items-start">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:overflow-y-auto pt-4 pb-10
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="px-4 space-y-8 mt-16 lg:mt-0">
            {docsData.map((category) => (
              <div key={category.id}>
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3 px-2">
                  <category.icon className="w-4 h-4 text-indigo-500" />
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.articles.map((article) => {
                    const isActive =
                      location.pathname === `/docs/${article.slug}`;
                    return (
                      <Link
                        key={article.slug}
                        to={`/docs/${article.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                           block px-3 py-2 text-sm rounded-md transition-colors border-l-2
                           ${
                             isActive
                               ? "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 border-indigo-500"
                               : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                           }
                         `}
                      >
                        {article.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Backdrop for Mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full max-w-4xl px-4 md:px-8 py-10 min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Table of Contents (Right Sidebar) */}
        <OnThisPage />
      </div>
    </div>
  );
}
