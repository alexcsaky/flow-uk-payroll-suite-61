
import React from "react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { PayrollSummaryCard } from "@/components/dashboard/PayrollSummaryCard";

interface EarningsPayrollSectionProps {
  earningsData: Array<{ name: string; gross: number; net: number }>;
  payrollSummary: {
    nextPayrollDate: Date;
    employeesCount: number;
    totalAmount: number;
  };
}

export function EarningsPayrollSection({ earningsData, payrollSummary }: EarningsPayrollSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
      <EarningsChart data={earningsData} className="lg:col-span-4" />
      <PayrollSummaryCard
        nextPayrollDate={payrollSummary.nextPayrollDate}
        employeesCount={payrollSummary.employeesCount}
        totalAmount={payrollSummary.totalAmount}
        className="lg:col-span-3"
      />
    </div>
  );
}
