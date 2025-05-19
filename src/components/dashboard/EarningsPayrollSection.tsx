
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
}

export function EarningsPayrollSection({ 
  earningsData,
  activities
}: EarningsPayrollSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-7 h-full">
      <EarningsChart 
        data={earningsData}
        className="md:col-span-5 h-full"
      />
      <RecentActivityCard
        activities={activities}
        className="md:col-span-2 h-full"
      />
    </div>
  );
}
