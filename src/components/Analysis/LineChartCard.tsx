import React from "react";
import { ChartCard } from "@/components";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatIndianNumber } from "@/utils/number";

type TrendPoint = {
  day: number;
  amount: number;
};

export const LineChartCard: React.FC<{ data: TrendPoint[] }> = React.memo(
  ({ data }) => (
    <ChartCard
      title="Daily Spending Trend"
      className="rounded-2xl p-4 sm:p-6 bg-linear-to-br from-blue-50 to-indigo-50 
      dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, left: 6, bottom: 6 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
          <XAxis
            dataKey="day"
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              `₹${formatIndianNumber(Number(v) || 0, { minimumFractionDigits: 0 })}`
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 2.5 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  ),
);
