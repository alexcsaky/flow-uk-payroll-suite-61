
import React from "react";
import { InvoiceSummaryCard } from "@/components/dashboard/InvoiceSummaryCard";

interface InvoiceSummarySectionProps {
  invoiceSummary: {
    totalOutstanding: number;
    totalPaid: number;
    percentageComplete: number;
  };
  vertical?: boolean;
  className?: string;
}

export function InvoiceSummarySection({ 
  invoiceSummary, 
  vertical = false,
  className
}: InvoiceSummarySectionProps) {
  return (
    <div className={className}>
      <InvoiceSummaryCard
        totalOutstanding={invoiceSummary.totalOutstanding}
        totalPaid={invoiceSummary.totalPaid}
        percentageComplete={invoiceSummary.percentageComplete}
        vertical={vertical}
      />
    </div>
  );
}
