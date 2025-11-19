import { MonthlyCalendarProps } from "@/props";
import { formatIndianNumber } from "@/utils";
import React, { JSX } from "react";

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  dailyTotals,
  year,
  month,
  selectedDay,
  onSelectDay,
}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const days: JSX.Element[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const total = dailyTotals.find((d) => d.day === day)?.amount || 0;

    const isToday =
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    const isSelected = selectedDay === day;

    const opacity = Math.min(0.85, total / 2000);
    const bgHeat = total > 0 ? `rgba(239, 68, 68, ${opacity})` : undefined;

    days.push(
      <div
        key={day}
        role="button"
        tabIndex={0}
        onClick={() => onSelectDay?.(day)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelectDay?.(day);
          }
        }}
        className={`
                    aspect-square flex flex-col items-center justify-center rounded-lg border
                    transition-all duration-200 cursor-pointer select-none text-center p-1
                    ${
                      isToday
                        ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/40"
                    }
                    ${
                      isSelected
                        ? "ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.03] shadow-md"
                        : ""
                    }
                `}
        style={{
          backgroundColor: total > 0 && !isToday ? bgHeat : undefined,
        }}
        aria-pressed={isSelected}
        aria-label={`Expenses on ${new Date(
          year,
          month,
          day,
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}
      >
        {/* Day number */}
        <div
          className={`text-xs sm:text-sm font-medium leading-tight ${
            total > 0
              ? "text-black dark:text-white"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {" "}
          {day}
        </div>
        {/* Amount below */}
        {total > 0 && (
          <div
            className={`text-[10px] sm:text-xs font-semibold truncate ${
              opacity > 0.4
                ? "text-black dark:text-white"
                : "text-gray-800 dark:text-gray-200"
            }`}
            style={{ maxWidth: "100%" }}
          >
            ₹
            {formatIndianNumber(total, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        )}
      </div>,
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 sm:p-6">
      {/* Week labels */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-[13px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">{days}</div>
    </div>
  );
};
