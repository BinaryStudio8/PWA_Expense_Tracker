import React from "react";
import { ChartCard } from "@/components";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

type PieSlice = {
  name: string;
  value: number;
};

export const PieChartCard: React.FC<{ data: PieSlice[]; colors: string[] }> =
  React.memo(({ data, colors }) => {
    if (!data.length) {
      return (
        <ChartCard
          title="Category Distribution"
          className="rounded-2xl p-4 sm:p-6 bg-linear-to-br from-emerald-50 to-teal-100 
            dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex h-[220px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Categorize expenses to see distribution.
          </div>
        </ChartCard>
      );
    }

    return (
      <ChartCard
        title="Category Distribution"
        className="rounded-2xl p-4 sm:p-6 bg-linear-to-br from-emerald-50 to-teal-100 
          dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <ResponsiveContainer width="100%" height={270}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={90}
              dataKey="value"
              label={({
                cx = 0,
                cy = 0,
                midAngle = 0,
                innerRadius = 0,
                outerRadius = 0,
                percent = 0,
              }) => {
                const RADIAN = Math.PI / 180;

                const r = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + r * Math.cos(-midAngle * RADIAN);
                const y = cy + r * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-[10px] font-medium"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={colors[i % colors.length]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={30} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    );
  });
