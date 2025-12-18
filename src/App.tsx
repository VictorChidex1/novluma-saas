import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { NewProject } from "./pages/NewProject";
import { Projects } from "./pages/Projects";
import { EditProject } from "./pages/EditProject";
import { SupportPage } from "./pages/SupportPage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { ApiDocsPage } from "./pages/ApiDocsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FAQPage } from "./pages/FAQPage";
import { BrandVoicesPage } from "./pages/BrandVoicesPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import CustomersPage from "./pages/CustomersPage";
import ScrollToHashElement from "./components/ScrollToHashElement";
import ScrollToTop from "./components/ScrollToTop";
import { DocsPage } from "./pages/docs/DocsPage";
import { Toaster } from "@/components/ui/sonner";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBlogPage from "@/pages/admin/AdminBlogPage";
import AdminPostEditor from "@/pages/admin/AdminPostEditor";
import { AdminRoute } from "@/components/AdminRoute";

import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <ScrollToHashElement />
            <Toaster />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/:slug" element={<DocsPage />} />
              <Route path="/faq" element={<FAQPage />} />
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
              <Route
                path="/dashboard/new"
                element={
                  <ProtectedRoute>
                    <NewProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/projects/:id"
                element={
                  <ProtectedRoute>
                    <EditProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/support"
                element={
                  <ProtectedRoute>
                    <SupportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/getting-started"
                element={
                  <ProtectedRoute>
                    <GettingStartedPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/brand-voices"
                element={
                  <ProtectedRoute>
                    <BrandVoicesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/docs/api"
                element={
                  <ProtectedRoute>
                    <ApiDocsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/analytics"
                element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
