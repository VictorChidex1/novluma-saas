import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function OnThisPage() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 1. Find all H2 and H3 elements in the prose content
    const elements = Array.from(
      document.querySelectorAll(".prose h2, .prose h3")
    );

    // 2. Map them to a data structure
    const items = elements.map((elem) => {
      // Ensure they have IDs for linking
      if (!elem.id) {
        elem.id =
          elem.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || "";
      }
      return {
        id: elem.id,
        text: elem.textContent || "",
        level: Number(elem.tagName.charAt(1)),
      };
    });

    setHeadings(items);

    // 3. Setup Intersection Observer for active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [headings.length]); // Re-run if content changes significantly (or route changes)

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block w-64 shrink-0 sticky top-24 pl-8 border-l border-gray-200 dark:border-gray-800 self-start">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
        On This Page
      </h4>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(heading.id)
                ?.scrollIntoView({ behavior: "smooth" });
              setActiveId(heading.id);
            }}
            className={`
              block text-sm transition-colors duration-200
              ${heading.level === 3 ? "pl-4" : ""}
              ${
                activeId === heading.id
                  ? "text-indigo-600 dark:text-indigo-400 font-medium translate-x-1"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }
            `}
          >
            {heading.text}
          </a>
        ))}
      </nav>

      {/* Go Pro Widget */}
      <div className="mt-8 p-6 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white shadow-xl ring-1 ring-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

        <div className="relative z-10">
          <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <h3 className="font-bold text-lg mb-2">Go Pro</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Unlock unlimited generations and priority support.
          </p>

          <a
            href="/billing"
            className="inline-flex items-center text-sm font-semibold text-indigo-300 hover:text-white transition-colors group-hover:translate-x-1 duration-200"
          >
            Upgrade Now <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
