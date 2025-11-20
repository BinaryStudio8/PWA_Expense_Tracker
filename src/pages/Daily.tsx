import {
  CalendarDays,
  IndianRupee,
  Clock,
  ChevronDown,
  MapPin,
  FileText,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
  Store,
} from "lucide-react";
import { format, parse } from "date-fns";
import { useDailyExpenses } from "@/hooks";
import { useState } from "react";
import { formatIndianCurrency, formatIndianNumber } from "@/utils";

export const Daily = () => {
  const { groupedExpenses, sortedDates, dailyTotals, hasExpenses } =
    useDailyExpenses();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  if (!hasExpenses) {
    return (
      <div className="p-4 sm:p-6 md:p-8 text-center min-h-[300px] flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl">
        <div>
          <CalendarDays className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            No expenses yet. Add one to see your daily breakdown.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <CalendarDays className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Daily Expenses
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Review your spending day-by-day and track patterns easily.
      </p>

      {/* Divider */}
      <hr className="border-gray-300 dark:border-gray-700 mb-5" />

      {/* Daily groups */}
      {sortedDates.map((date) => {
        const expenses = groupedExpenses[date];

        const mostExpensive = expenses.reduce(
          (max, expense) =>
            Math.abs(expense.amount) > Math.abs(max.amount) ? expense : max,
          expenses[0],
        );

        return (
          <div
            key={date}
            className="rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-900/80
                        shadow-xl hover:shadow-2xl transition-shadow duration-300 
                        p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-hidden"
          >
            {/* Date Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                  {format(parse(date, "yyyy-MM-dd", new Date()), "dd MMM yyyy")}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 leading-tight">
                  {expenses.length} {expenses.length === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 leading-tight">
                  <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                  {formatIndianCurrency(dailyTotals[date])}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-1 leading-tight">
                  Top:{" "}
                  <span className="font-medium">{mostExpensive.title}</span> (₹
                  {formatIndianNumber(Math.abs(mostExpensive.amount))})
                </p>
              </div>
            </div>

            {/* Expense Items */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {expenses.map((expense, index) => {
                const key = `${date}-${index}`;
                const isOpen = expanded === key;

                return (
                  <div key={key} className="py-3 sm:py-4">
                    {/* Collapsible Header */}
                    <button
                      onClick={() => toggleExpand(key)}
                      className="flex items-center justify-between w-full text-left p-3 sm:p-4 rounded-xl 
                                 hover:bg-gray-50 dark:hover:bg-gray-800 
                                 transition-all duration-200 active:scale-95 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
                        <span
                          className="text-gray-800 dark:text-gray-200 
                                         font-medium text-sm sm:text-base md:text-lg truncate leading-tight min-w-0 break-words"
                        >
                          {expense.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {expense.direction === "credit" ? (
                          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                        )}
                        <span className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base md:text-lg leading-tight">
                          ₹{formatIndianCurrency(Math.abs(expense.amount))}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        className="pl-4 sm:pl-6 pr-3 sm:pr-4 mt-3 sm:mt-4 space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                                      bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 leading-relaxed break-words"
                      >
                        {expense.source === "notification" && (
                          <div
                            className="flex items-center gap-2 px-3 py-1 
                                          text-blue-800 bg-blue-100 
                                          dark:bg-blue-900 dark:text-blue-200 
                                          rounded-full w-fit leading-tight"
                          >
                            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                            Notification Auto-detected
                          </div>
                        )}

                        {expense.merchant && (
                          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 leading-tight">
                            <Store className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="font-medium">
                              Merchant: {expense.merchant}
                            </span>
                          </div>
                        )}

                        {typeof expense.tags === "object" &&
                          expense.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {expense.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 sm:px-3 py-1 rounded-full 
                                            bg-purple-100 dark:bg-purple-800 
                                            text-purple-800 dark:text-purple-200 
                                            font-medium text-xs sm:text-sm leading-tight"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                        {expense.description && (
                          <div className="flex items-start gap-3 leading-tight">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-orange-500 mt-0.5" />
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap break-words">
                              {expense.description}
                            </p>
                          </div>
                        )}
                        {expense.location && (
                          <div className="flex items-center gap-3 leading-tight">
                            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-green-500" />
                            <a
                              href={`https://maps.google.com/?q=${expense.location.latitude},${expense.location.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 font-semibold text-xs dark:text-blue-400 hover:underline leading-tight break-words"
                            >
                              {expense.location.address ||
                                `${expense.location.latitude.toFixed(4)}, 
                                ${expense.location.longitude.toFixed(4)}`}
                            </a>
                          </div>
                        )}

                        <div
                          className="text-xs text-gray-500 dark:text-white pt-2 
                                        border-t border-gray-200 dark:border-gray-600 leading-tight"
                        >
                          Recorded at: {expense.time}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
