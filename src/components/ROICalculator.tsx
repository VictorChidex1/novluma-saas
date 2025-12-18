import { useState, useEffect } from "react";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";

interface ROICalculatorProps {
  totalWords: number;
}

export function ROICalculator({ totalWords }: ROICalculatorProps) {
  const [costPerWord, setCostPerWord] = useState(0.1); // Default $0.10 per word
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    setSavings(totalWords * costPerWord);
  }, [totalWords, costPerWord]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            ROI Calculator
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Estimate your savings vs hiring writers
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Avg. Freelance Cost per Word
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={costPerWord}
              onChange={(e) => setCostPerWord(parseFloat(e.target.value) || 0)}
              className="block w-full pl-7 pr-12 py-2 border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Industry avg: $0.05 - $0.20 per word
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign className="w-24 h-24" />
          </div>

          <p className="text-indigo-100 text-sm font-medium mb-1 relative z-10">
            Estimated Savings
          </p>
          <div className="text-4xl font-bold mb-2 relative z-10">
            $
            {savings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs font-medium relative z-10">
            <TrendingUp className="w-3 h-3" />
            <span>ROI: ∞% (Software vs Human)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
