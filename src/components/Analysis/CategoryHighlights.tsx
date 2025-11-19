import React from "react";
import { PieChart } from "lucide-react";

type CategoryItem = {
  name: string;
  value: number;
};

export const CategoryHighlights: React.FC<{
  list: CategoryItem[];
  total: number;
  currency: (n: number) => string;
}> = React.memo(({ list, total, currency }) => (
  <div className="bg-gray-50 dark:bg-gray-900/80 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
      <PieChart className="w-5 h-5 mr-2" />
      Category Highlights
    </h3>

    {list.length ? (
      <div className="mt-4 space-y-4">
        {list.map((c, idx) => {
          const percent = (c.value / total) * 100;
          return (
            <div key={c.name} className="space-y-2">
              <div className="flex justify-between items-baseline text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {idx + 1}. {c.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {currency(c.value)} • {percent.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-br from-indigo-300 via-sky-300 to-emerald-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
        Categorize expenses to get meaningful highlights.
      </p>
    )}
  </div>
));
