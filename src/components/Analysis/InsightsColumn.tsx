import React from "react";

type Insight = {
  id: string | number;
  title: string;
  subtitle: string;
  value: string | number;
};

export const InsightsColumn: React.FC<{ insights: Insight[] }> = React.memo(
  ({ insights }) => (
    <div className="bg-gray-50 dark:bg-gray-900/80 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 space-y-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        💡 Key Insights
      </h3>

      {insights.length ? (
        <div className="grid grid-cols-1 gap-4">
          {insights.map((c) => (
            <div
              key={c.id}
              className="rounded-lg p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {c.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {c.subtitle}
                  </p>
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No insights yet — add more expenses.
        </p>
      )}
    </div>
  ),
);
