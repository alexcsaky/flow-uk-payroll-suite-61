
import React from "react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { PayrollSummaryCard } from "@/components/dashboard/PayrollSummaryCard";

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
  };
}

export function EarningsPayrollSection({ 
  earningsData,
  payrollSummary
}: EarningsPayrollSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-7 h-full">
      <EarningsChart 
        data={earningsData}
        className="md:col-span-5 h-full"
      />
      <PayrollSummaryCard
        className="md:col-span-2 h-full"
        nextPayrollDate={payrollSummary.nextPayrollDate}
        employeesCount={payrollSummary.employeesCount}
        totalAmount={payrollSummary.totalAmount}
      />
    </div>
  );
}
