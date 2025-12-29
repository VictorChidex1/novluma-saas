import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Settings,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  LayoutDashboard,
  Shield,
  ChevronDown,
} from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import Logo from "../assets/images/Logo.webp";

interface NavbarProps {
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  onSignin?: () => void;
  onGetStarted?: () => void;
}

export function Navbar({
  onMenuClick,
  isSidebarOpen,
  onSignin,
  onGetStarted,
}: NavbarProps) {
  const { user, userRole, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleSigninClick = () => {
    if (onSignin) {
      onSignin();
    } else {
      navigate("/login");
    }
  };

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate("/signup");
    }
  };

  // Fetch real-time profile data from Firestore
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.photoURL) {
            setAvatarUrl(data.photoURL);
          }
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const profileRef = useClickOutside<HTMLDivElement>(() =>
    setIsProfileOpen(false)
  );

  const handleSignOut = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const showMobileMenu = !onMenuClick && isMenuOpen;
  const isMenuIconOpen = onMenuClick ? isSidebarOpen : isMenuOpen;

  const navLinks = [
    { name: "Features", href: "/#features", type: "hash" },
    { name: "Pricing", href: "/#pricing", type: "hash" },
    { name: "Docs", href: "/docs", type: "route" },
    { name: "Customers", href: "/customers", type: "route" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full z-50 transition-colors duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 relative">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Novluma"
                className="h-8 w-8"
                width="32"
                height="32"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Novluma
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="Toggle dark/light mode"
            >
              <Sun
                size={20}
                className="absolute inset-0 m-auto text-yellow-500 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 pointer-events-none"
              />
              <Moon
                size={20}
                className="absolute inset-0 m-auto text-indigo-400 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100 pointer-events-none"
              />
            </button>

            {user ? (
              <>
                <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs overflow-hidden border border-gray-200 dark:border-gray-700">
                      {avatarUrl || user.photoURL ? (
                        <img
                          src={avatarUrl || user.photoURL || undefined}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>
                          {user.displayName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2) || "U"}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>
                        {userRole === "admin" && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Shield size={16} />
                            Admin
                          </Link>
                        )}
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings size={16} />
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              // Logged Out State
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSigninClick}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStartedClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleMenuClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuIconOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            )}
            <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
            {userRole === "admin" && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    window.location.href = "/";
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSigninClick();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleGetStartedClick();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                >
                  Get Started
                </button>
              </>
            )}

            <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>

            <button
              onClick={toggleTheme}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Switch Theme
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
