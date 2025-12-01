import React from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/images/Logo.png";

interface NavbarProps {
  onSignin: () => void;
  onGetStarted: () => void;
}

export function Navbar({ onSignin, onGetStarted }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
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
            Lumina
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
          <button
            onClick={onSignin}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Get Started
          </button>
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
          <button
            onClick={onSignin}
            className="block text-gray-600 font-medium w-full text-left"
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
