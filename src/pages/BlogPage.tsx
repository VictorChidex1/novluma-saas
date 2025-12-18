import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogPage = () => {
  const categories = ["All", "AI & Tech", "Design", "Engineering", "Culture"];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const postsPerPage = 7;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedPosts: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        console.log("Fetched Blog Posts:", fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter Posts
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Helper function for image paths
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;

    // Remove leading slash if present
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    // Replace extension with .webp
    const webpPath = cleanPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    return `${import.meta.env.BASE_URL}${webpPath}`;
  };

  const featuredPost = currentPosts[0];
  const gridPosts = currentPosts.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <SEO
        title="Blog"
        description="Discover insights, tutorials, and updates from the Novluma team. Learn how to maximize your AI content generation."
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Novluma Blog
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
                Insights &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Updates
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                The latest news, tutorials, and engineering deep dives from the
                Novluma team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No posts found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try selecting a different category.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentPage + selectedCategory} // Re-render when page or category changes
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Featured Post */}
                  {featuredPost && (
                    <div className="mb-20">
                      <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 md:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                              src={getImageUrl(featuredPost.image)}
                              alt={featuredPost.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                                {featuredPost.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />{" "}
                                {featuredPost.readTime}
                              </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {featuredPost.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 line-clamp-3">
                              {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    {featuredPost.author}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {featuredPost.date}
                                  </p>
                                </div>
                              </div>
                              <Link to={`/blog/${featuredPost.slug}`}>
                                <Button
                                  variant="ghost"
                                  className="group/btn text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                >
                                  Read Article{" "}
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Post Grid */}
                  <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    <AnimatePresence>
                      {gridPosts.map((post) => (
                        <motion.div
                          layout
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                              src={getImageUrl(post.image)}
                              alt={post.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 z-20">
                              <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-white/20">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {post.readTime}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {post.author}
                              </span>
                              <Link
                                to={`/blog/${post.slug}`}
                                className="text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform cursor-pointer"
                              >
                                Read more →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-20">
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-gray-300 dark:border-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </Button>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 dark:border-gray-700 disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
