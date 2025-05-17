
import React from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardMainContent } from "@/components/dashboard/DashboardMainContent";
import { EarningsPayrollSection } from "@/components/dashboard/EarningsPayrollSection";
import { InvoiceSummarySection } from "@/components/dashboard/InvoiceSummarySection";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { PayrollDashboardHeader } from "@/components/dashboard/PayrollDashboardHeader";
import { PayrollInsights } from "@/components/dashboard/PayrollInsights";
import { useBillingFeatures } from "@/hooks/use-billing-features";

const Dashboard = () => {
  const { billingEnabled } = useBillingFeatures();

  // Payroll data for the chart
  const payrollData = [
    { name: "Jan", value: 24500 },
    { name: "Feb", value: 25300 },
    { name: "Mar", value: 27100 },
    { name: "Apr", value: 26200 },
    { name: "May", value: 28900 },
    { name: "Jun", value: 29100 },
  ];

  // Earnings data for the Net vs Gross chart
  const earningsData = [
    { name: "Jan", gross: 32000, net: 24500 },
    { name: "Feb", gross: 33500, net: 25300 },
    { name: "Mar", gross: 35800, net: 27100 },
    { name: "Apr", gross: 34500, net: 26200 },
    { name: "May", gross: 38000, net: 28900 },
    { name: "Jun", gross: 38400, net: 29100 },
  ];

  // Mock data for the RecentActivityCard - ensuring types are correct
  const activities = [
    {
      id: "1",
      title: "Payroll processed",
      description: "Monthly payroll for 146 employees completed",
      timestamp: "Today at 12:30 PM",
      type: "payroll" as const,
    },
    {
      id: "2",
      title: "Invoice #INV-2023-001 sent",
      description: "£12,450 to Client XYZ Ltd",
      timestamp: "Yesterday at 3:45 PM",
      type: "invoice" as const,
    },
    {
      id: "3",
      title: "New employee added",
      description: "John Smith added to IT Department",
      timestamp: "Apr 3, 2023 at 10:15 AM",
      type: "employee" as const,
    },
    {
      id: "4",
      title: "Client payment received",
      description: "£8,750 from ABC Corp for invoice #INV-2023-005",
      timestamp: "Apr 2, 2023 at 2:30 PM",
      type: "client" as const,
    },
    {
      id: "5",
      title: "System maintenance completed",
      description: "Scheduled maintenance and updates applied",
      timestamp: "Apr 1, 2023 at 11:00 PM",
      type: "system" as const,
    }
  ];

  // Mock data for PayrollSummaryCard with upcoming deadlines
  const payrollSummary = {
    nextPayrollDate: new Date(2025, 3, 25), // Using numeric constructor for stability
    employeesCount: 146,
    totalAmount: 287500,
    upcomingDeadlines: [
      {
        name: "RTI Submission",
        date: new Date(2025, 3, 26), // April 26, 2025
        type: "normal" as const
      },
      {
        name: "Auto-enrollment Review",
        date: new Date(2025, 4, 5), // May 5, 2025
        type: "warning" as const
      },
      {
        name: "P60 Distribution",
        date: new Date(2025, 4, 31), // May 31, 2025
        type: "urgent" as const
      }
    ]
  };

  // Mock data for InvoiceSummaryCard
  const invoiceSummary = {
    totalOutstanding: 68500,
    totalPaid: 156000,
    percentageComplete: 69
  };

  // Mock data for the OpenPayRunWidget (now used for PayrollDashboardHeader)
  const currentPayRun = {
    payRunName: "April 2025 Monthly Pay Run",
    payRunDate: new Date(2025, 3, 25), // April 25, 2025
    status: "blocked" as const,
    issues: [
      {
        id: "issue-1",
        message: "3 employees missing tax codes",
        severity: "warning" as const,
      },
      {
        id: "issue-2",
        message: "Approval required from Finance Manager",
        severity: "error" as const,
      },
    ],
  };
  
  // Calculate days until next payroll
  const daysUntilPayroll = 8; // Updated to 8 days
  
  // Mock user data - changed from Sarah to John
  const userName = "John";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <DashboardTabs />
        </div>
      </div>

      {/* New Payroll Dashboard Header */}
      <PayrollDashboardHeader
        userName={userName}
        employeesNeedingUpdates={3}
        daysUntilPayroll={daysUntilPayroll}
        payRunDate={currentPayRun.payRunDate}
        issues={currentPayRun.issues}
      />

      {/* Summary Cards */}
      <DashboardStats billingEnabled={billingEnabled} />
      
      {/* New Payroll Insights & Anomaly Detection Panel */}
      <PayrollInsights />

      {/* Main Content */}
      <DashboardMainContent 
        payrollData={payrollData}
        activities={activities}
      />

      {/* Earnings Chart and Next Payroll Side by Side */}
      <EarningsPayrollSection 
        earningsData={earningsData}
        payrollSummary={payrollSummary}
      />

      {/* Only show Invoice Summary if billing is enabled */}
      {billingEnabled && (
        <InvoiceSummarySection invoiceSummary={invoiceSummary} />
      )}
    </div>
  );
};

export default Dashboard;
