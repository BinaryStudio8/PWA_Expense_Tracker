import React from "react";
import { ChevronLeft, ChevronRight, BarChart3Icon } from "lucide-react";

interface Props {
  monthName: string;
  onPrev: () => void;
  onNext: () => void;
}

export const AnalysisHeader: React.FC<Props> = ({
  monthName,
  onPrev,
  onNext,
}) => (
  <div className="mb-8">
    {/* Title */}
    <div className="flex items-center gap-3 mb-4">
      <BarChart3Icon className="h-7 w-7 text-blue-500" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Spending Analysis
      </h1>
    </div>

    {/* Subtext */}
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Visualize spending patterns and prioritize what matters.
    </p>

    {/* Divider */}
    <hr className="border-gray-300 dark:border-gray-700 mb-5" />

    {/* Month Selector (Center aligned) */}
    <div
      className="
                rounded-xl border border-gray-300 dark:border-gray-700 
                bg-white/10 dark:bg-gray-900/80
                shadow-sm px-4 py-4 
                flex items-center justify-between
            "
    >
      {/* Left Arrow */}
      <button
        onClick={onPrev}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Previous Month"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Month Display */}
      <div className="flex-1 text-center">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-0.5">
          Selected Month
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {monthName}
        </p>
      </div>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Next Month"
      >
        <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  </div>
);
