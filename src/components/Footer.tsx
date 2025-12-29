import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-24 md:py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}favicon.webp`}
                  alt="Novluma Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-white">Novluma</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering creators and businesses with AI-driven content
              solutions. Scale your presence effortlessly.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              {["Features", "Pricing", "Docs", "Testimonials", "FAQ"].map(
                (item) => {
                  const isPage = item === "Docs" || item === "FAQ";
                  const isHome = location.pathname === "/";
                  const sectionId = item.toLowerCase();

                  // Link Logic:
                  // 1. Docs/FAQ -> Always link to their page (/docs, /faq)
                  // 2. Sections (Features, Pricing...) ->
                  //    a. If on Home: Scroll to #section
                  //    b. If NOT on Home: Navigate to /#section

                  if (isPage) {
                    return (
                      <li key={item}>
                        <Link to={item === "Docs" ? "/docs" : "/faq"}>
                          <motion.span
                            whileHover={{ x: 5 }}
                            className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                          >
                            {item}
                          </motion.span>
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item}>
                      {isHome ? (
                        <motion.a
                          href={`#${sectionId}`}
                          whileHover={{ x: 5 }}
                          className="inline-block text-gray-400 hover:text-indigo-400 transition-colors"
                        >
                          {item}
                        </motion.a>
                      ) : (
                        <Link to={`/#${sectionId}`}>
                          <motion.span
                            whileHover={{ x: 5 }}
                            className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                          >
                            {item}
                          </motion.span>
                        </Link>
                      )}
                    </li>
                  );
                }
              )}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    About Us
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    Blog
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/careers">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    Careers
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ x: 5 }}
                    className="inline-block text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    Contact
                  </motion.span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest AI trends and product
              updates.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500 transition-all duration-300 focus:scale-[1.02] origin-left"
              />
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Lumina. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-sm text-gray-500 w-full md:w-auto">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
