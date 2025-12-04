import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Users,
  HelpCircle,
} from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a question or want to learn more about Lumina? We'd love to
              hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Our friendly team is here to help.
                    </p>
                    <a
                      href="mailto:support@lumina.ai"
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      support@lumina.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Mon-Fri from 8am to 5pm PST.
                    </p>
                    <a
                      href="tel:+15551234567"
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Visit Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Come say hello at our office HQ.
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      123 AI Boulevard
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  What to expect
                </h3>
                <ul className="space-y-4 mb-8">
                  {[
                    {
                      icon: Clock,
                      text: "Response within 24 hours",
                    },
                    {
                      icon: CheckCircle,
                      text: "Dedicated support team",
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Trusted by 10,000+ Creators
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join the community building the future of content with
                    Lumina.
                  </p>
                </motion.div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Common Questions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Do you offer demos?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                      Yes! Just mention it in your message and we'll schedule
                      one.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Is there a free trial?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                      Absolutely. You can try Lumina Pro free for 14 days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="Jane"
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 focus:scale-[1.01] origin-left"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 focus:scale-[1.01] origin-left"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 focus:scale-[1.01] origin-left"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300 focus:scale-[1.01] origin-left"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your project..."
                    className="min-h-[150px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 resize-none transition-all duration-300 focus:scale-[1.01] origin-left"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
