
import React from "react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";

interface EarningsPayrollSectionProps {
  earningsData: Array<{
    name: string;
    gross: number;
    net: number;
  }>;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: "payroll" | "invoice" | "employee" | "client" | "system";
  }>;
  className?: string;
  chartClassName?: string;
  activityClassName?: string;
  chartOnly?: boolean;
  activityOnly?: boolean;
}

export function EarningsPayrollSection({ 
  earningsData,
  activities,
  className = "grid gap-6 md:grid-cols-7 h-full",
  chartClassName = "md:col-span-5 h-full",
  activityClassName = "md:col-span-2 h-full",
  chartOnly = false,
  activityOnly = false
}: EarningsPayrollSectionProps) {
  if (chartOnly) {
    return (
      <div className={className}>
        <EarningsChart 
          data={earningsData}
          className={chartClassName}
        />
      </div>
    );
  }
  
  if (activityOnly) {
    return (
      <div className={className}>
        <RecentActivityCard
          activities={activities}
          className={activityClassName}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <EarningsChart 
        data={earningsData}
        className={chartClassName}
      />
      <RecentActivityCard
        activities={activities}
        className={activityClassName}
      />
    </div>
  );
}
