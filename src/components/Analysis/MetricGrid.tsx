import React from "react";
import { SummaryCard } from "@/components";

interface Metric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

export const MetricGrid: React.FC<{ metrics: Metric[] }> = React.memo(
  ({ metrics }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {metrics.map((m) => (
        <SummaryCard
          key={m.id}
          icon={<m.Icon className="h-6 w-6" />}
          title={m.title}
          value={m.value}
          subtitle={m.subtitle}
          gradient={m.accent}
        />
      ))}
    </div>
  ),
);
