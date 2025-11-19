import { useMonthlyStats } from "@/hooks";
import {
  Calendar,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  FileText,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MonthlyCalendar, SummaryCard } from "@/components";
import { formatIndianCurrency } from "@/utils";

export const Monthly = () => {
  const { stats, selectedMonth, selectedYear, monthName, changeMonth } =
    useMonthlyStats();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setSelectedDay((current) => {
      const existsInMonth = current
        ? stats.dailyTotals.some((d) => d.day === current)
        : false;

      if (existsInMonth) return current;

      const today = new Date();
      if (
        today.getMonth() === selectedMonth &&
        today.getFullYear() === selectedYear
      ) {
        return today.getDate();
      }

      const firstWithSpend = stats.dailyTotals.find((d) => d.amount > 0)?.day;
      return firstWithSpend || (stats.dailyTotals[0]?.day ?? null);
    });
  }, [selectedMonth, selectedYear, stats.dailyTotals]);

  const selectedDate = useMemo(() => {
    if (!selectedDay) return null;
    return new Date(selectedYear, selectedMonth, selectedDay);
  }, [selectedDay, selectedMonth, selectedYear]);

  const dayExpenses = useMemo(() => {
    if (!selectedDay) return [];

    const filtered = stats.expenses.filter((expense) => {
      const [y, m, d] = expense.date.split("-").map(Number);
      return y === selectedYear && m - 1 === selectedMonth && d === selectedDay;
    });

    return filtered.sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`).getTime() -
        new Date(`${a.date} ${a.time}`).getTime(),
    );
  }, [selectedDay, selectedMonth, selectedYear, stats.expenses]);

  const dayTotal = useMemo(
    () => dayExpenses.reduce((s, e) => s + e.amount, 0),
    [dayExpenses],
  );

  return (
    <div className="min-h-screen w-full px-2 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-6 md:py-8 space-y-4 sm:space-y-5 md:space-y-6">
        {/* HEADER */}
        <div className="mb-5">
          {/* Title Row */}
          <div className="flex items-center gap-3 mb-3">
            {/* Icon Bubble */}
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400" />
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
              Monthly Overview
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Track month-to-month activity and understand spending trends.
          </p>

          {/* Divider */}
          <hr className="border-gray-300 dark:border-gray-700" />
        </div>

        {/* MONTH SELECTOR */}
        <div
          className="bg-white dark:bg-gray-900/80
                        border border-gray-200 dark:border-gray-600
                        rounded-xl sm:rounded-2xl 
                        shadow-sm hover:shadow-md transition-shadow
                        p-3 sm:p-4 md:p-5 
                        flex justify-between items-center gap-3"
        >
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       active:scale-95 transition-all
                       touch-manipulation shrink-0"
            aria-label="Previous month"
          >
            <ChevronLeft
              className="h-5 w-5 sm:h-6 sm:w-6 
                                    text-gray-700 dark:text-gray-300"
            />
          </button>

          <div className="text-center flex-1 min-w-0">
            <p
              className="text-[14.5px] sm:text-sm text-gray-500 dark:text-gray-400 
                          font-medium mb-0.5 sm:mb-1"
            >
              Selected Month
            </p>
            <h2
              className="text-base sm:text-lg md:text-xl lg:text-2xl 
                           font-bold text-gray-900 dark:text-gray-50 
                           tracking-tight truncate"
            >
              {monthName}
            </h2>
          </div>

          <button
            onClick={() => changeMonth(1)}
            className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       active:scale-95 transition-all
                       touch-manipulation shrink-0"
            aria-label="Next month"
          >
            <ChevronRight
              className="h-5 w-5 sm:h-6 sm:w-6 
                                     text-gray-700 dark:text-gray-300"
            />
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <SummaryCard
            icon={<BarChart3 />}
            title="Average per Day"
            value={`₹${formatIndianCurrency(stats.avgPerDay)}`}
            subtitle="Daily spending rate"
            gradient="from-emerald-500 to-teal-600"
          />
        </div>

        {/* CALENDAR */}
        <div
          className="bg-white dark:bg-gray-900/80 
                        rounded-xl sm:rounded-2xl 
                        shadow-sm hover:shadow-md transition-shadow
                        "
        >
          <MonthlyCalendar
            dailyTotals={stats.dailyTotals}
            year={selectedYear}
            month={selectedMonth}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* DAILY EXPENSES SECTION */}
        <div
          className="bg-white dark:bg-gray-900 
                        rounded-xl sm:rounded-2xl 
                        shadow-sm hover:shadow-md transition-shadow
                        p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5"
        >
          {/* DATE HEADER */}
          <div
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between 
                          gap-3 sm:gap-4 pb-3 sm:pb-4 
                          border-b border-gray-200 dark:border-gray-600"
          >
            <div className="flex-1 min-w-0">
              <h3
                className="text-base sm:text-lg md:text-xl font-bold 
                             text-gray-900 dark:text-gray-50 
                             mb-1 sm:mb-1.5 leading-snug wrap-break-word"
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Select a date"}
              </h3>

              <p
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 
                            leading-relaxed wrap-break-word"
              >
                {selectedDate
                  ? dayExpenses.length
                    ? `${dayExpenses.length} expense${dayExpenses.length !== 1 ? "s" : ""} recorded`
                    : "No expenses recorded on this day"
                  : "Tap a date in the calendar to view expenses"}
              </p>
            </div>

            {selectedDate && dayExpenses.length > 0 && (
              <div
                className="inline-flex items-center gap-2 
                              bg-linear-to-r from-blue-500 to-blue-600
                              text-white
                              px-3 sm:px-4 py-2 sm:py-2.5 
                              rounded-lg sm:rounded-xl 
                              text-sm sm:text-base font-bold 
                              shadow-sm shrink-0
                              whitespace-nowrap"
              >
                <span className="text-xs sm:text-sm opacity-90">Total:</span>
                <span>₹{formatIndianCurrency(dayTotal)}</span>
              </div>
            )}
          </div>

          {/* EXPENSE LIST */}
          {selectedDate && dayExpenses.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {dayExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="group relative
                             rounded-xl sm:rounded-2xl 
                             border border-gray-200 dark:border-gray-700 
                             bg-linear-to-br from-gray-50 to-gray-100/50
                             dark:from-gray-800 dark:to-gray-900/50
                             hover:border-gray-300 dark:hover:border-gray-700
                             hover:shadow-md transition-all
                             p-4 sm:p-5 space-y-3 sm:space-y-3.5
                             overflow-hidden"
                >
                  {/* TOP ROW: Title + Amount */}
                  <div className="flex items-start justify-between gap-3">
                    <h4
                      className="text-sm sm:text-base md:text-lg font-bold 
                                   text-gray-900 dark:text-gray-50 
                                   leading-snug wrap-break-word flex-1 min-w-0"
                    >
                      {expense.title}
                    </h4>

                    <span
                      className={`text-lg sm:text-xl md:text-2xl font-bold 
                                  shrink-0 leading-none
                                  ${
                                    expense.direction === "credit"
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                    >
                      ₹{formatIndianCurrency(Math.abs(expense.amount))}
                    </span>
                  </div>

                  {/* METADATA ROW */}
                  <div
                    className="flex flex-wrap items-center gap-x-2 gap-y-1.5 
                                  text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="font-medium">{expense.time}</span>

                    {expense.category && (
                      <>
                        <span className="text-gray-400 dark:text-gray-600">
                          •
                        </span>
                        <span className="wrap-break-word">
                          {expense.category}
                        </span>
                      </>
                    )}

                    {expense.merchant && (
                      <>
                        <span className="text-gray-400 dark:text-gray-600">
                          •
                        </span>
                        <span
                          className="text-purple-600 dark:text-purple-400 
                                       font-medium break-all"
                        >
                          {expense.merchant}
                        </span>
                      </>
                    )}

                    {expense.direction === "credit" && (
                      <span
                        className="inline-flex items-center gap-1 
                                     bg-green-100 dark:bg-green-900/30 
                                     text-green-700 dark:text-green-400 
                                     px-2 py-0.5 rounded-md font-medium"
                      >
                        ↑ Credit
                      </span>
                    )}

                    {expense.direction === "debit" && (
                      <span
                        className="inline-flex items-center gap-1 
                                     bg-red-100 dark:bg-red-900/30 
                                     text-red-700 dark:text-red-400 
                                     px-2 py-0.5 rounded-md font-medium"
                      >
                        ↓ Debit
                      </span>
                    )}
                  </div>

                  {/* AUTO-DETECT BADGE */}
                  {expense.source === "notification" && (
                    <div
                      className="inline-flex items-center gap-2 
                                    bg-linear-to-r from-blue-600 to-blue-700
                                    text-white 
                                    px-3 py-1.5 rounded-lg 
                                    text-xs sm:text-sm font-semibold 
                                    shadow-sm w-fit"
                    >
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>SMS Auto-detected</span>
                    </div>
                  )}

                  {/* TAGS */}
                  {Array.isArray(expense.tags) && expense.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {expense.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center
                                     px-2.5 py-1 text-xs sm:text-sm
                                     rounded-lg font-medium
                                     bg-purple-100 dark:bg-purple-800
                                     text-purple-600 dark:white
                                     border border-purple-200 dark:border-purple-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  {expense.description && (
                    <div
                      className="flex items-start gap-2.5 
                                    bg-white dark:bg-gray-950/50
                                    border border-gray-200 dark:border-gray-700
                                    rounded-lg p-2.5
                                    text-sm sm:text-sm text-gray-700 dark:text-white"
                    >
                      <FileText
                        className="h-4 w-4 text-orange-400 dark:text-orange-500 
                                          shrink-0 mt-0.5"
                      />
                      <p className="leading-relaxed wrap-break-word flex-1 min-w-0">
                        {expense.description}
                      </p>
                    </div>
                  )}

                  {/* LOCATION */}
                  {expense.location && (
                    <div
                      className="flex items-start gap-2.5 
                                    bg-white dark:bg-gray-950/50
                                    border border-gray-200 dark:border-gray-700
                                    rounded-lg p-3"
                    >
                      <MapPin
                        className="h-4 w-4 text-green-500 dark:text-green-400 
                                        shrink-0 mt-0.5"
                      />
                      <a
                        href={`https://maps.google.com/?q=${expense.location.latitude},${expense.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 
                                   hover:text-blue-700 dark:hover:text-blue-300
                                   underline break-all flex-1 min-w-0 leading-relaxed
                                   font-medium"
                      >
                        {expense.location.address ||
                          `${expense.location.latitude.toFixed(3)}, ${expense.location.longitude.toFixed(3)}`}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-12 sm:py-16">
              <div
                className="inline-flex items-center justify-center 
                              w-16 h-16 sm:w-20 sm:h-20 
                              bg-gray-100 dark:bg-gray-800 
                              rounded-full mb-4"
              >
                <FileText
                  className="h-8 w-8 sm:h-10 sm:w-10 
                                      text-gray-400 dark:text-gray-600"
                />
              </div>
              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 
                            font-medium"
              >
                No expenses recorded for this day
              </p>
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div
                className="inline-flex items-center justify-center 
                              w-16 h-16 sm:w-20 sm:h-20 
                              bg-linear-to-br from-blue-100 to-blue-200
                              dark:from-blue-900/30 dark:to-blue-800/30
                              rounded-full mb-4"
              >
                <Calendar
                  className="h-8 w-8 sm:h-10 sm:w-10 
                                      text-blue-600 dark:text-blue-400"
                />
              </div>
              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 
                            font-medium"
              >
                Select a date from the calendar above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
