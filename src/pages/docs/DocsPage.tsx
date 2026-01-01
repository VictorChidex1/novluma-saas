import { useParams, Navigate, Link } from "react-router-dom";
import { DocsLayout } from "../../components/docs/DocsLayout";
import { docsData } from "../../data/docs";
import SEO from "../../components/SEO";
import { ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DocsPage() {
  const { slug } = useParams();

  // If no slug, redirect to introduction
  if (!slug) {
    return <Navigate to="/docs/introduction" replace />;
  }

  // Find the active article
  let activeCategory;
  let activeArticle;

  for (const category of docsData) {
    const found = category.articles.find((a) => a.slug === slug);
    if (found) {
      activeCategory = category;
      activeArticle = found;
      break;
    }
  }

  // 404 if not found
  if (!activeArticle) {
    return (
      <DocsLayout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">404 - Article Not Found</h1>
          <p className="text-gray-600 mb-8">
            The documentation you are looking for does not exist.
          </p>
          <Link to="/docs" className="text-indigo-600 hover:underline">
            Return to Docs Home
          </Link>
        </div>
      </DocsLayout>
    );
  }

  return (
    <DocsLayout>
      <SEO
        title={activeArticle?.title || "Documentation"}
        description={
          activeArticle?.description ||
          "Learn how to use Novluma effectively with our comprehensive documentation."
        }
        type="article"
      />

      {/* Article Hero Section */}
      <div className="relative -mx-4 md:-mx-8 px-4 md:px-8 pt-8 pb-12 mb-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:opacity-10 pointer-events-none"></div>
        <div className="relative max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
            <Link
              to="/docs"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <span className="opacity-70">Docs</span>
            </Link>
            <ChevronRight size={14} className="opacity-30" />
            <span className="opacity-70">{activeCategory?.title}</span>
            <ChevronRight size={14} className="opacity-30" />
            <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase">
              {activeArticle.title}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={slug}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              {activeArticle.title}
            </h1>
            {activeArticle.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {activeArticle.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-indigo prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800">
        {/* Content Injection */}
        <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
      </article>

      {/* Next/Previous Article Navigation */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {(() => {
          // Flatten all articles to find prev/next
          const allArticles = docsData.flatMap((cat) =>
            cat.articles.map((art) => ({ ...art, category: cat.title }))
          );
          const currentIndex = allArticles.findIndex(
            (art) => art.slug === slug
          );
          const prevArticle = allArticles[currentIndex - 1];
          const nextArticle = allArticles[currentIndex + 1];

          return (
            <>
              {prevArticle ? (
                <Link
                  to={`/docs/${prevArticle.slug}`}
                  className="flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group bg-white dark:bg-gray-950/50"
                >
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Previous
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <Link
                  to={`/docs/${nextArticle.slug}`}
                  className="flex flex-col p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 transition-all text-right group bg-white dark:bg-gray-950/50"
                >
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Next
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </>
          );
        })()}
      </div>

      {/* Helpful Footer (Still need help?) */}
      <div className="mt-16 mb-8">
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Still need help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our support team is available 24/7.
              </p>
            </div>
          </div>
          <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-lg shadow-lg shadow-indigo-500/20">
            Contact Support
          </Button>
        </div>
      </div>

      {/* Was this helpful? */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Was this page helpful?
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-900/20 transition-all"
            >
              <ThumbsUp size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 transition-all"
            >
              <ThumbsDown size={16} />
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
