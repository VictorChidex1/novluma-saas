import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
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
  Loader2,
  Target,
  MessageSquare,
  FileText,
  Coffee,
  Code,
  Trophy,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { sendJobApplication } from "@/lib/email";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    resume: null as string | null,
    resumeName: "" as string,
    coverLetter: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error("File size exceeds 500KB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          resume: reader.result as string,
          resumeName: file.name,
        }));
        toast.success("Resume attached successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.resume
    ) {
      toast.error("Please fill in all required fields and upload a resume.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "applications"), {
        role: selectedRole,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        resume: formData.resume,
        resumeName: formData.resumeName,
        coverLetter: formData.coverLetter,
        createdAt: serverTimestamp(),
      });

      // Send email notification
      await sendJobApplication({
        role: selectedRole || "Unknown Role",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        coverLetter: formData.coverLetter,
      });

      toast.success("Application submitted successfully! We'll be in touch.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        resume: null,
        resumeName: "",
        coverLetter: "",
      });
      setSelectedRole(null); // Close dialog
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <Navbar />

      <main className="flex-grow">
        <SEO
          title="Careers"
          description="Join the Novluma team and help shape the future of AI content creation. View our open positions and company culture."
        />
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  We are hiring
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
                  Build the future of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    AI
                  </span>{" "}
                  with us.
                </h1>
                <p className="text-xl text-indigo-200 mb-8 leading-relaxed">
                  Join a team of visionaries, engineers, and creators who are
                  redefining how the world creates content. We're looking for
                  the best.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 border-0"
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
                    className="rounded-full px-8 bg-transparent text-white border-indigo-700 hover:bg-indigo-900/50 hover:text-white"
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
                <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl transform rotate-3 scale-105 -z-10 blur-2xl"></div>
                <img
                  src={`${import.meta.env.BASE_URL}career-hero.webp`}
                  alt="Novluma Team"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] border border-indigo-800/50"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why join Novluma?</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                We believe that happy people create the best products. That's
                why we offer industry-leading benefits.
              </p>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
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
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-colors shadow-sm hover:shadow-lg group"
                >
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                  >
                    <benefit.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                The principles that guide every decision we make.
              </p>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Target,
                  title: "Customer Obsession",
                  desc: "We start with the customer and work backwards. Their success is our success.",
                },
                {
                  icon: Zap,
                  title: "Bias for Action",
                  desc: "Speed matters. We calculate risk and move fast. We value doing over over-analyzing.",
                },
                {
                  icon: MessageSquare,
                  title: "Radical Candor",
                  desc: "We care personally and challenge directly. Honest feedback is our secret weapon.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
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
                  src={`${import.meta.env.BASE_URL}join-novluma.webp`}
                  alt="Join Novluma"
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

        {/* Hiring Process Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">The Hiring Process</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Simple, transparent, and respectful of your time.
              </p>
            </div>
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 relative z-10"
              >
                {[
                  {
                    icon: FileText,
                    step: "01",
                    title: "Application",
                    desc: "Tell us your story.",
                  },
                  {
                    icon: Coffee,
                    step: "02",
                    title: "Culture Chat",
                    desc: "30-min vibe check.",
                  },
                  {
                    icon: Code,
                    step: "03",
                    title: "Deep Dive",
                    desc: "Show us your skills.",
                  },
                  {
                    icon: Trophy,
                    step: "04",
                    title: "The Offer",
                    desc: "Welcome aboard.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 text-center relative group hover:border-indigo-500 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto bg-white dark:bg-gray-900 border-4 border-gray-50 dark:border-gray-800 rounded-full flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">
                      Step {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
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
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(99, 102, 241, 0.05)",
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-indigo-500 transition-all group"
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
                  <Dialog
                    open={selectedRole === role.title}
                    onOpenChange={(open) => !open && setSelectedRole(null)}
                  >
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
                      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                              id="firstName"
                              placeholder="Jane"
                              value={formData.firstName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  firstName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            required
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
                                  {formData.resumeName
                                    ? formData.resumeName
                                    : "PDF, DOCX (MAX. 500KB)"}
                                </p>
                              </div>
                              <input
                                id="resume-upload"
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
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
                            value={formData.coverLetter}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                coverLetter: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
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
