import { useParams, Navigate, Link } from "react-router-dom";
import { DocsLayout } from "../../components/docs/DocsLayout";
import { docsData } from "../../data/docs";
import { ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={slug} // Reset animation on slug change
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-indigo"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 not-prose">
          <span>Docs</span>
          <ChevronRight size={14} />
          <span>{activeCategory?.title}</span>
          <ChevronRight size={14} />
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
            {activeArticle.title}
          </span>
        </div>

        {/* Content Injection - In a real app we might use a markdown parser */}
        <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
      </motion.article>

      {/* Helpful Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
        <p>Was this page helpful?</p>
        <div className="flex gap-4">
          <a
            href="mailto:support@novluma.com"
            className="hover:text-indigo-600 flex items-center gap-1"
          >
            Contact Support <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </DocsLayout>
  );
}
