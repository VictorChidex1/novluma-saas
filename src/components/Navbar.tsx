import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import Logo from "../assets/images/Logo.png";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

interface NavbarProps {
  onSignin?: () => void; // Keeping these for backward compatibility if needed, but we'll use internal state
  onGetStarted?: () => void;
}

export function Navbar({}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">(
    "signin"
  );

  const { user, logout } = useAuth();

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src={Logo}
              alt="Lumina Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Luminar
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
            <a
              href="#features"
              className="hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-indigo-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="hover:text-indigo-600 transition-colors"
            >
              Customers
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <UserIcon size={16} />
                    </div>
                  )}
                  <span>{user.displayName || user.email?.split("@")[0]}</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="text-gray-600" />
              ) : (
                <Menu className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg absolute w-full left-0">
            <a href="#features" className="block text-gray-600 font-medium">
              Features
            </a>
            <a href="#pricing" className="block text-gray-600 font-medium">
              Pricing
            </a>
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-t border-gray-100 mt-2 pt-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <UserIcon size={16} />
                    </div>
                  )}
                  <span className="font-medium text-gray-900">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="block text-red-600 font-medium w-full text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="block text-gray-600 font-medium w-full text-left"
                >
                  Sign in
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
