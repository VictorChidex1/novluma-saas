import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
          New: AI Content Generator 2.0
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight animate-fade-in-up animate-delay-100">
          Turn social chaos <br />
          into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            predictable growth
          </span>
          .
        </h1>

        {/* Subheadline */}
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10 animate-fade-in-up animate-delay-200">
          Lumina helps brands publish, analyze, and grow across all channels
          using predictive AI. Stop guessing, start scaling.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-delay-300">
          <button
            onClick={onGetStarted}
            className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center"
          >
            Start Free Trial
            <ArrowRight size={20} className="ml-2" />
          </button>
          <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center">
            <Play size={20} className="mr-2" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Abstract Background Blobs */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -z-10" />
    </div>
  );
}
