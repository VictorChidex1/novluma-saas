import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { blogPosts } from "@/data/blogPosts";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: string;
}

const AdminBlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleMigrate = async () => {
    if (
      !window.confirm(
        "This will upload all static blog posts to Firebase. Continue?"
      )
    )
      return;
    setLoading(true);
    try {
      for (const post of blogPosts) {
        // Check if post with this slug already exists to avoid duplicates
        const q = query(
          collection(db, "blog_posts"),
          where("slug", "==", post.slug)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(collection(db, "blog_posts"), {
            ...post,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      }
      toast.success("Migration completed!");
      fetchPosts();
    } catch (error) {
      console.error("Error migrating posts:", error);
      toast.error("Migration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteDoc(doc(db, "blog_posts", id));
      setPosts(posts.filter((post) => post.id !== id));
      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Blog Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Create, edit, and manage your blog posts.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleMigrate}>
                Migrate Demo Data
              </Button>
              <Link to="/admin/blog/new">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" /> Create New Post
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center h-32 text-gray-500"
                      >
                        No blog posts found. Create one to get started!
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="hover:text-indigo-600 transition-colors"
                            target="_blank"
                          >
                            {post.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                            {post.category}
                          </span>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/admin/blog/edit/${post.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4 text-gray-500 hover:text-indigo-600" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBlogPage;
