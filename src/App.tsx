import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";

import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlogPage from "@/pages/admin/AdminBlogPage";
import AdminPostEditor from "@/pages/admin/AdminPostEditor";
import { AdminRoute } from "@/components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Toaster />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/blog" element={<AdminBlogPage />} />
                    <Route path="/blog/new" element={<AdminPostEditor />} />
                    <Route
                      path="/blog/edit/:id"
                      element={<AdminPostEditor />}
                    />
                  </Routes>
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
