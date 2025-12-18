import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Target, Zap, Globe, Heart } from "lucide-react";

// Team Images
// Team Images
import agbahoImg from "@/assets/images/team/agbaho-victor.webp";
import oziomaImg from "@/assets/images/team/dr-ozioma.webp";
import churchyllImg from "@/assets/images/team/churchyll-goodman.webp";
import onyinyeImg from "@/assets/images/team/onyinye-elizabeth.webp";
import emmanuelImg from "@/assets/images/team/emmanuel-olafisoye.webp";
import alexImg from "@/assets/images/team/Bosa.webp";
import karlImg from "@/assets/images/team/mymimi.webp";
import estherImg from "@/assets/images/team/esther-onyi.webp";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <SEO
        title="About Us"
        description="Meet the team behind Novluma. We are a diverse group of engineers, designers, and creatives passionate about AI."
      />
      <Navbar />

      <main className="flex-grow">
        {/* ... (Hero, Mission, Stats, Timeline sections check out) ... */}
        {/* Skipping straight to Team Section logic for brevity in replace block if possible, but replace_file_content needs contiguous block. 
            I will include the imports at the top and then I might need a second targeted replace for the array if they are too far apart.
            Actually, the imports are at line 1. The array is at line 298.
            I cannot do this in one MultiReplace if I am changing non-contiguous blocks unless I use `multi_replace`.
            Wait, I should use `multi_replace_file_content`!
        */}

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
                We are{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Novluma
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                Empowering the next generation of creators with intelligent
                tools that amplify human imagination.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Mission
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    We believe that creativity is the most important human
                    skill. In a world increasingly driven by automation, the
                    ability to imagine and create is what makes us unique.
                  </p>
                  <p>
                    But too often, technical barriers get in the way of creative
                    expression. Complex software, steep learning curves, and
                    tedious workflows stifle ideas before they can bloom.
                  </p>
                  <p>
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      Novluma exists to remove those barriers.
                    </strong>{" "}
                    We build AI-powered tools that act as a creative partner,
                    handling the mundane so you can focus on the magic.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl opacity-10 blur-2xl -z-10"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-8">
                    {[
                      {
                        icon: Target,
                        title: "Focus",
                        desc: "We solve real problems for real creators.",
                      },
                      {
                        icon: Zap,
                        title: "Speed",
                        desc: "From idea to reality in seconds.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          borderColor: "rgba(99, 102, 241, 0.5)",
                        }}
                        className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors shadow-sm hover:shadow-md"
                      >
                        <item.icon className="w-8 h-8 text-indigo-600 mb-4" />
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Heart,
                        title: "Empathy",
                        desc: "Designed for humans, not machines.",
                      },
                      {
                        icon: Globe,
                        title: "Impact",
                        desc: "Tools used by millions worldwide.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                        whileHover={{
                          y: -5,
                          borderColor: "rgba(99, 102, 241, 0.5)",
                        }}
                        className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors shadow-sm hover:shadow-md"
                      >
                        <item.icon className="w-8 h-8 text-indigo-600 mb-4" />
                        <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-indigo-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Users", value: "10k+" },
                { label: "Countries", value: "25+" },
                { label: "Content Created", value: "500K+" },
                { label: "Team Members", value: "15" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-indigo-200">
                    {stat.value}
                  </div>
                  <div className="text-indigo-100/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Journey
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                From a garage in Lagos to a global platform.
              </p>
            </div>
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>

              {[
                {
                  year: "2025",
                  title: "Inception",
                  desc: "Founded in Lagos with a vision to democratize AI.",
                },
                {
                  year: "2026",
                  title: "Beta Launch",
                  desc: "Released our first beta to 500 exclusive creators.",
                },
                {
                  year: "2026",
                  title: "Series A",
                  desc: "Raising $1M to scale our engineering team.",
                },
                {
                  year: "2026",
                  title: "Global Expansion",
                  desc: "Opening offices in Lagos and Abuja. Hit 1M users.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center justify-between mb-12 ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-5/12"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-indigo-600 font-bold text-lg block mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Meet the Team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                The visionaries building the future of Novluma.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Agbaho Victor",
                  role: "CEO & Founder",
                  img: agbahoImg,
                },
                {
                  name: "Dr Agbaho Ozioma",
                  role: "CMO",
                  img: oziomaImg,
                },
                {
                  name: "Churchyll Goodman",
                  role: "CTO",
                  img: churchyllImg,
                },
                {
                  name: "Onyinye Elizabeth",
                  role: "Senior Software Engineer ",
                  img: onyinyeImg,
                },
                {
                  name: "Esther Onyinye",
                  role: "Head of Design",
                  img: estherImg,
                },
                {
                  name: "Emmanuel Olafisoye",
                  role: "Head of Product",
                  img: emmanuelImg,
                },
                {
                  name: "Alex Johnson",
                  role: "Head of Neuroscience",
                  img: alexImg,
                },
                {
                  name: "Karl Dorathy",
                  role: "Head of Growth",
                  img: karlImg,
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-gray-100 dark:border-gray-800 group-hover:border-indigo-500 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investors Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Trusted by world-class investors
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text placeholders for logos as per plan, styled to look like logos */}
              {[
                "Sequoia",
                "Andreessen Horowitz",
                "Y Combinator",
                "Index Ventures",
              ].map((investor, index) => (
                <span
                  key={index}
                  className="text-2xl md:text-3xl font-bold text-gray-400 hover:text-indigo-600 transition-colors cursor-default"
                >
                  {investor}
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Join the journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team.
              Check out our open roles or just say hi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8"
                >
                  View Open Roles
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
