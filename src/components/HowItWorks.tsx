import { motion } from "framer-motion";
import { Link, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Link,
    title: "Connect Your Accounts",
    description:
      "Securely link your social media profiles (Instagram, Twitter, LinkedIn) with just one click.",
  },
  {
    icon: Settings,
    title: "Set Your Preferences",
    description:
      "Define your brand voice, target audience, and posting schedule. Our AI adapts to your unique style.",
  },
  {
    icon: TrendingUp,
    title: "Watch It Grow",
    description:
      "Sit back as Lumina generates high-quality content, schedules posts, and drives engagement automatically.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How Lumina Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Get started in minutes and let our AI handle the heavy lifting.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-800 z-0">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-full bg-indigo-600 dark:bg-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5 + index * 0.2,
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 border-4 border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center mb-6 shadow-lg relative z-10 transition-colors duration-300 group-hover:border-indigo-500 dark:group-hover:border-indigo-400"
                >
                  <step.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 transition-colors duration-300 group-hover:text-indigo-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
