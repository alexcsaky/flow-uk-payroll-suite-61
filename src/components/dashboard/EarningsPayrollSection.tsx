
import React from "react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { PayrollSummaryCard } from "@/components/dashboard/PayrollSummaryCard";

interface Deadline {
  name: string;
  date: Date;
  type: 'normal' | 'warning' | 'urgent';
}

interface EarningsPayrollSectionProps {
  earningsData: Array<{
    name: string;
    gross: number;
    net: number;
  }>;
  payrollSummary: {
    nextPayrollDate: Date;
    employeesCount: number;
    totalAmount: number;
    upcomingDeadlines?: Deadline[];
  };
}

export function EarningsPayrollSection({ 
  earningsData,
  payrollSummary
}: EarningsPayrollSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-7">
      <EarningsChart 
        data={earningsData}
        className="col-span-5"
      />
      <PayrollSummaryCard
        className="md:col-span-2"
        nextPayrollDate={payrollSummary.nextPayrollDate}
        employeesCount={payrollSummary.employeesCount}
        totalAmount={payrollSummary.totalAmount}
        upcomingDeadlines={payrollSummary.upcomingDeadlines}
      />
    </div>
  );
}
