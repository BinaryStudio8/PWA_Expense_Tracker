import { Expense } from "@/types";
import { SearchCheck } from "lucide-react";
import React from "react";

export const AnalysisExpenseList: React.FC<{
  expenses: Expense[];
  currency: (n: number) => string;
}> = React.memo(({ expenses, currency }) => {
  if (!expenses.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          <span className="flex gap-3">
            <SearchCheck className="h-7 w-6 text-blue-500" /> Expenses to Review
          </span>
        </h3>
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-200">
          Top {expenses.length}
        </span>
      </div>

      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {exp.title || "Untitled expense"}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-300 flex flex-wrap gap-2">
                <span>
                  {new Date(exp.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {exp.category && (
                  <>
                    <span>•</span>
                    <span className="text-blue-400">{exp.category}</span>
                  </>
                )}
              </div>
              {exp.description && (
                <p className="text-xs text-gray-500 dark:text-white mt-1">
                  •&nbsp; {exp.description}
                </p>
              )}
            </div>

            <div className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">
              {currency(exp.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
