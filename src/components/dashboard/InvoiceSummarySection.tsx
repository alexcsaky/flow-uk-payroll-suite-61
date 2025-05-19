
import React from "react";
import { InvoiceSummaryCard } from "@/components/dashboard/InvoiceSummaryCard";

interface InvoiceSummarySectionProps {
  invoiceSummary: {
    totalOutstanding: number;
    totalPaid: number;
    percentageComplete: number;
  };
  vertical?: boolean;
}

export function InvoiceSummarySection({ 
  invoiceSummary, 
  vertical = false 
}: InvoiceSummarySectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      <InvoiceSummaryCard
        totalOutstanding={invoiceSummary.totalOutstanding}
        totalPaid={invoiceSummary.totalPaid}
        percentageComplete={invoiceSummary.percentageComplete}
        vertical={vertical}
      />
    </div>
  );
}
