
import React from "react";
import { InvoiceSummaryCard } from "@/components/dashboard/InvoiceSummaryCard";

interface InvoiceSummarySectionProps {
  invoiceSummary: {
    totalOutstanding: number;
    totalPaid: number;
    percentageComplete: number;
  };
}

export function InvoiceSummarySection({ invoiceSummary }: InvoiceSummarySectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      <InvoiceSummaryCard
        totalOutstanding={invoiceSummary.totalOutstanding}
        totalPaid={invoiceSummary.totalPaid}
        percentageComplete={invoiceSummary.percentageComplete}
      />
    </div>
  );
}
