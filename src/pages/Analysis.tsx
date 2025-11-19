import React, { useMemo, useCallback } from "react";
import { useMonthlyStats } from "@/hooks";
import {
  AnalysisHeader,
  MetricGrid,
  LineChartCard,
  PieChartCard,
  InsightsColumn,
  CategoryHighlights,
  AnalysisExpenseList,
} from "@/components";

import { TrendingUp, Target, PieChart as PieChartIcon } from "lucide-react";

type InsightItem = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
};

export const Analysis: React.FC = () => {
  const { stats, monthName, changeMonth } = useMonthlyStats();

  /* ---------------- FORMATTER ---------------- */
  const currency = useMemo(
    () => (n: number) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(n),
    [],
  );

  const COLORS = useMemo(
    () => ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
    [],
  );

  /* ---------------- AGGREGATES ---------------- */
  const aggregated = useMemo(() => {
    const daysWithSpend = stats.dailyTotals.filter((d) => d.amount > 0).length;

    const highestDay =
      stats.dailyTotals.length > 0
        ? stats.dailyTotals.reduce((a, b) => (a.amount > b.amount ? a : b))
        : null;

    const topCategory =
      stats.categoryData.length > 0
        ? stats.categoryData.reduce((a, b) => (a.value > b.value ? a : b))
        : null;

    const highestExpense =
      stats.expenses.length > 0
        ? stats.expenses.reduce((a, b) => (a.amount > b.amount ? a : b))
        : null;

    const topCategories = [...stats.categoryData]
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);

    const focusExpenses = [...stats.expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const topSpendingDays = stats.dailyTotals
      .filter((d) => d.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return {
      daysWithSpend,
      highestDay,
      topCategory,
      highestExpense,
      topCategories,
      focusExpenses,
      topSpendingDays,
    };
  }, [stats]);

  /* ---------------- METRICS DATA ---------------- */
  const metrics = useMemo(
    () => [
      {
        id: "avg",
        title: "Average / Day",
        value: currency(stats.avgPerDay),
        subtitle: aggregated.daysWithSpend
          ? `${aggregated.daysWithSpend} active ${
              aggregated.daysWithSpend === 1 ? "day" : "days"
            }`
          : "No activity",
        Icon: TrendingUp,
        accent: "from-emerald-600 to-teal-700",
      },
      {
        id: "highest-day",
        title: "Highest Day",
        value: aggregated.highestDay
          ? currency(aggregated.highestDay.amount)
          : "—",
        subtitle: aggregated.highestDay
          ? `Day ${aggregated.highestDay.day}`
          : "No data",
        Icon: Target,
        accent: "from-rose-600 to-pink-700",
      },
      {
        id: "top-category",
        title: "Top Category",
        value: aggregated.topCategory
          ? currency(aggregated.topCategory.value)
          : "—",
        subtitle: aggregated.topCategory
          ? aggregated.topCategory.name
          : "Awaiting expenses",
        Icon: PieChartIcon,
        accent: "from-violet-600 to-purple-700",
      },
    ],
    [stats, aggregated, currency],
  );

  /* ---------------- INSIGHTS ---------------- */
  const insights = useMemo(() => {
    const items: InsightItem[] = [];

    if (aggregated.highestExpense) {
      items.push({
        id: "max",
        title: "Largest Purchase",
        value: currency(aggregated.highestExpense.amount),
        subtitle:
          new Date(aggregated.highestExpense.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) +
          (aggregated.highestExpense.title
            ? ` • ${aggregated.highestExpense.title}`
            : ""),
      });
    }

    if (aggregated.daysWithSpend) {
      items.push({
        id: "days",
        title: "Active Days",
        value: `${aggregated.daysWithSpend} / ${stats.dailyTotals.length}`,
        subtitle: "Days with expenses this month",
      });
    }

    return items;
  }, [aggregated, stats.dailyTotals.length, currency]);

  /* ---------------- HANDLERS ---------------- */
  const onPrev = useCallback(() => changeMonth(-1), [changeMonth]);
  const onNext = useCallback(() => changeMonth(1), [changeMonth]);

  /* ---------------- RENDER ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {/* Header */}
      <AnalysisHeader monthName={monthName} onPrev={onPrev} onNext={onNext} />

      {/* Metrics */}
      <MetricGrid metrics={metrics} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <LineChartCard data={stats.dailyTotals} />
          <PieChartCard data={stats.categoryData} colors={COLORS} />
        </div>

        <div className="space-y-6">
          <InsightsColumn insights={insights} />
          <CategoryHighlights
            list={aggregated.topCategories}
            total={stats.categoryData.reduce((s, t) => s + t.value, 0)}
            currency={currency}
          />
        </div>
      </div>

      {/* Expense list at bottom */}
      <AnalysisExpenseList
        expenses={aggregated.focusExpenses}
        currency={currency}
      />

      {/* Empty state */}
      {(!stats.dailyTotals.length || !stats.categoryData.length) && (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-base">
            No data available yet. Add expenses to see analysis.
          </p>
        </div>
      )}
    </div>
  );
};
