import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import type { Application } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Search, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(
          collection(db, "applications"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const apps: Application[] = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() } as Application);
        });
        setApplications(apps);

        // Fetch blog posts count
        const postsQ = query(collection(db, "blog_posts"));
        const postsSnapshot = await getDocs(postsQ);
        setPostCount(postsSnapshot.size);
      } catch (error: any) {
        console.error("Error fetching applications:", error);
        toast.error(`Failed to load applications: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const downloadResume = (base64: string, filename: string) => {
    try {
      // Check if it's a base64 string
      if (!base64.startsWith("data:")) {
        toast.error("Invalid resume format.");
        return;
      }

      const link = document.createElement("a");
      link.href = base64;
      link.download = filename || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume.");
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesRole = filterRole === "all" || app.role === filterRole;
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const uniqueRoles = Array.from(new Set(applications.map((app) => app.role)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage job applications and candidates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Welcome, {user?.displayName}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>

            <Link to="/admin/blog">
              <Card className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer border-indigo-200 dark:border-indigo-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Manage Blog
                  </CardTitle>
                  <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{postCount} Posts</div>
                  <p className="text-xs text-gray-500 mt-1">Click to manage</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Resume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center h-32 text-gray-500"
                      >
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">
                          {app.firstName} {app.lastName}
                        </TableCell>
                        <TableCell>{app.role}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>
                          {app.createdAt?.toDate().toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              downloadResume(
                                app.resume,
                                app.resumeName ||
                                  `${app.firstName}_${app.lastName}_Resume.pdf`
                              )
                            }
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
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

export default AdminDashboard;
