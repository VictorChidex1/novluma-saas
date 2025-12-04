import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Heart,
  Zap,
  Globe,
  Users,
  CheckCircle,
  Upload,
} from "lucide-react";

const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Build the future of{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    AI
                  </span>{" "}
                  with us.
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Join a team of visionaries, engineers, and creators who are
                  redefining how the world creates content. We're looking for
                  the best.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8"
                    onClick={() => {
                      document
                        .getElementById("roles")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Open Roles
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Read our Culture
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl transform rotate-3 scale-105 -z-10 blur-2xl"></div>
                <img
                  src="/career-hero.png"
                  alt="Lumina Team"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why join Lumina?</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We believe that happy people create the best products. That's
                why we offer industry-leading benefits.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Remote First",
                  desc: "Work from anywhere in the world. We trust you.",
                },
                {
                  icon: Heart,
                  title: "Full Health",
                  desc: "Premium health, dental, and vision coverage for you.",
                },
                {
                  icon: Zap,
                  title: "High Impact",
                  desc: "Work on challenges that affect millions of users.",
                },
                {
                  icon: Users,
                  title: "Equity",
                  desc: "Own a piece of the company you're helping to build.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Team Section */}
        <section className="py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-2xl -z-10"></div>
                <img
                  src="/join-luminar.png"
                  alt="Join Lumina"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Come build with us
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    At Lumina, we're not just building software; we're crafting
                    the future of creativity. We value <strong>autonomy</strong>
                    , <strong>mastery</strong>, and <strong>purpose</strong>.
                  </p>
                  <p>
                    Our team is diverse, distributed, and driven by a shared
                    mission to empower creators. If you're passionate about AI
                    and design, you'll fit right in.
                  </p>
                  <ul className="space-y-3 mt-4">
                    {[
                      "Transparent culture",
                      "Continuous learning",
                      "User-obsessed",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50" id="roles">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find your next role.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  title: "Senior Frontend Engineer",
                  dept: "Engineering",
                  loc: "Remote",
                },
                {
                  title: "Product Designer",
                  dept: "Design",
                  loc: "San Francisco / Remote",
                },
                {
                  title: "Growth Marketing Manager",
                  dept: "Marketing",
                  loc: "New York / Remote",
                },
                {
                  title: "AI Research Scientist",
                  dept: "Engineering",
                  loc: "Remote",
                },
                {
                  title: "Partnership Manager",
                  dept: "Business",
                  loc: "New York / Remote",
                },
                {
                  title: "Senior Data Analyst",
                  dept: "Data Science",
                  loc: "New York / Remote",
                },
              ].map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-indigo-500 transition-colors group"
                >
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-600 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{role.dept}</span>
                      <span>•</span>
                      <span>{role.loc}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all"
                        onClick={() => setSelectedRole(role.title)}
                      >
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                      <DialogHeader>
                        <DialogTitle>Apply for {selectedRole}</DialogTitle>
                        <DialogDescription>
                          Join our team and help build the future of AI.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        className="space-y-4 mt-4"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="Jane" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resume">Resume</Label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="resume-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, DOCX (MAX. 5MB)
                                </p>
                              </div>
                              <input
                                id="resume-upload"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">Cover Letter</Label>
                          <Textarea
                            id="coverLetter"
                            placeholder="Tell us why you're a great fit..."
                            className="min-h-[100px]"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Submit Application
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
