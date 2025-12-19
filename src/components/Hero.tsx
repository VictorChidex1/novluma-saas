import { ArrowRight, Play, X } from "lucide-react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import HeroImg from "../assets/images/hero.webp";
import { useState } from "react";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-900 dark:bg-gray-900/95 backdrop-blur-sm mb-8 md:mb-12"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={HeroImg}
              alt="Dashboard Preview"
              className="relative rounded-lg shadow-2xl border border-border/50 w-full"
              width="1200"
              height="675"
              fetchPriority="high"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-gray-900/30 mix-blend-multiply" />
          </div>

          {/* Content Overlay */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 px-4 py-16 md:px-6 md:py-32 text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm font-medium text-white mb-6 md:mb-8 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              New: AI Content Generator 2.0
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 md:mb-6 leading-tight"
            >
              Turn social chaos <br className="hidden md:block" />
              into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                predictable growth
              </span>
              .
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-xl text-gray-200 mb-0 leading-relaxed px-2"
            >
              Novluma helps brands publish, analyze, and grow across all
              channels using predictive AI. Stop guessing, start scaling.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Buttons - Placed below the card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-xl flex items-center justify-center w-full sm:w-auto"
          >
            Start Free Trial
            <ArrowRight size={20} className="ml-2" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVideoOpen(true)}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 px-6 py-3.5 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            <Play size={20} className="mr-2" />
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Abstract Background Blobs (Behind everything) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10"
      />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/B3nMvfDlQJQ?autoplay=1"
                title="Novluma Crash Course"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
