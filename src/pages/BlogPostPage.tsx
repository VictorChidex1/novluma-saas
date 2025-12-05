import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Loader2,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        // Fetch current post
        const q = query(
          collection(db, "blog_posts"),
          where("slug", "==", slug),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const postData = { id: doc.id, ...doc.data() } as BlogPost;
          setPost(postData);

          // Fetch related posts (simple implementation: just fetch 3 recent posts excluding current)
          const relatedQ = query(collection(db, "blog_posts"), limit(4));
          const relatedSnapshot = await getDocs(relatedQ);
          const related: BlogPost[] = [];
          relatedSnapshot.forEach((d) => {
            if (d.id !== doc.id) {
              related.push({ id: d.id, ...d.data() } as BlogPost);
            }
          });
          setRelatedPosts(related.slice(0, 3));
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Post not found
        </h1>
        <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Article Hero */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>
                <div className="flex items-center gap-4 text-sm text-indigo-300 font-medium mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-600/80 backdrop-blur-sm border border-indigo-500/50">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {post.author}
                    </p>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none prose-indigo prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-li:marker:text-indigo-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Links */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Share this article
                </h3>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:text-indigo-600 hover:border-indigo-600"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:text-indigo-600 hover:border-indigo-600"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:text-indigo-600 hover:border-indigo-600"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:text-indigo-600 hover:border-indigo-600"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((related, index) => (
                    <Link
                      key={index}
                      to={`/blog/${related.slug}`}
                      className="group block"
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-1">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {related.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Newsletter CTA */}
        <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
              Get the latest AI insights and engineering tutorials delivered
              straight to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button className="rounded-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
