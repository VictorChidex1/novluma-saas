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
import {
  Download,
  Loader2,
  Search,
  Users,
  FileText,
  MessageSquare,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Project {
  id: string;
  userId: string;
  userName?: string; // Enhanced with user name
  title: string;
  platform: string;
  tone: string;
  words: number;
  createdAt: any;
}

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<
    "applications" | "messages" | "projects"
  >("applications");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Users for Mapping
        const usersSnapshot = await getDocs(collection(db, "users"));
        const userMap = new Map<string, string>();
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          userMap.set(doc.id, data.displayName || data.email || "Unknown User");
        });

        // 2. Fetch Applications
        const appQuery = query(
          collection(db, "applications"),
          orderBy("createdAt", "desc")
        );
        const appSnapshot = await getDocs(appQuery);
        const apps: Application[] = [];
        appSnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() } as Application);
        });
        setApplications(apps);

        // 3. Fetch Messages
        const msgQuery = query(
          collection(db, "contact_messages"),
          orderBy("createdAt", "desc")
        );
        const msgSnapshot = await getDocs(msgQuery);
        const msgs: any[] = [];
        msgSnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });
        setMessages(msgs);

        // 4. Fetch blog posts count
        const postsQ = query(collection(db, "blog_posts"));
        const postsSnapshot = await getDocs(postsQ);
        setPostCount(postsSnapshot.size);

        // 5. Fetch Total Projects and Map Names
        const projectsQ = query(collection(db, "projects"));
        const projectsSnapshot = await getDocs(projectsQ);
        const projs: Project[] = [];
        projectsSnapshot.forEach((doc) => {
          const data = doc.data();
          projs.push({
            id: doc.id,
            userId: data.userId,
            userName: userMap.get(data.userId) || "Unknown User", // Map Name
            title: data.title || "Untitled Project",
            platform: data.platform || "Unknown",
            tone: data.tone || "Standard",
            words: data.words || 0,
            createdAt: data.createdAt,
          });
        });
        // Sort manually
        projs.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setProjects(projs);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error(`Failed to load data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset pagination when searching or switching views
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, viewMode]);

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

  const filteredMessages = messages.filter(
    (msg) =>
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (proj) =>
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.userName?.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by name
  );

  // Pagination Logic
  const getCurrentData = () => {
    switch (viewMode) {
      case "applications":
        return filteredApplications;
      case "messages":
        return filteredMessages;
      case "projects":
        return filteredProjects;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = currentData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const uniqueRoles = Array.from(new Set(applications.map((app) => app.role)));

  const getViewTitle = () => {
    switch (viewMode) {
      case "applications":
        return "Job Applications";
      case "messages":
        return "Contact Messages";
      case "projects":
        return "User Projects";
    }
  };

  const getSearchPlaceholder = () => {
    switch (viewMode) {
      case "applications":
        return "Search candidates...";
      case "messages":
        return "Search messages...";
      case "projects":
        return "Search projects or users...";
    }
  };

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
                Manage job applications, messages, and blog posts.
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
            <Card
              className={`cursor-pointer transition-colors ${
                viewMode === "applications" ? "border-2 border-indigo-600" : ""
              }`}
              onClick={() => setViewMode("applications")}
            >
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

            <Card
              className={`cursor-pointer transition-colors ${
                viewMode === "messages" ? "border-2 border-indigo-600" : ""
              }`}
              onClick={() => setViewMode("messages")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messages.length}</div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-colors ${
                viewMode === "projects" ? "border-2 border-indigo-600" : ""
              }`}
              onClick={() => setViewMode("projects")}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-gray-500 mt-1">Generated by users</p>
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

          {/* Filters & View Label */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <h2 className="text-lg font-semibold min-w-[150px]">
                {getViewTitle()}
              </h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={getSearchPlaceholder()}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {viewMode === "applications" && (
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
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages} ({currentData.length}{" "}
                  items)
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              </div>
            ) : viewMode === "applications" ? (
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
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center h-32 text-gray-500"
                      >
                        No applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((app: any) => (
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
            ) : viewMode === "messages" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center h-32 text-gray-500"
                      >
                        No messages found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((msg: any) => (
                      <TableRow key={msg.id}>
                        <TableCell className="font-medium">
                          {msg.firstName} {msg.lastName}
                        </TableCell>
                        <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                          {msg.subject}
                        </TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell>
                          {msg.createdAt?.toDate().toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          className="max-w-xs truncate text-gray-500"
                          title={msg.message}
                        >
                          {msg.message}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Tone</TableHead>
                    <TableHead>Words</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>User Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center h-32 text-gray-500"
                      >
                        No projects found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((proj: any) => (
                      <TableRow key={proj.id}>
                        <TableCell
                          className="font-medium text-indigo-600 dark:text-indigo-400 max-w-[200px] truncate"
                          title={proj.title}
                        >
                          {proj.title}
                        </TableCell>
                        <TableCell className="capitalize">
                          {proj.platform}
                        </TableCell>
                        <TableCell className="capitalize">
                          {proj.tone}
                        </TableCell>
                        <TableCell>{proj.words}</TableCell>
                        <TableCell>
                          {proj.createdAt?.seconds
                            ? new Date(
                                proj.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100 font-medium">
                          {proj.userName}
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
