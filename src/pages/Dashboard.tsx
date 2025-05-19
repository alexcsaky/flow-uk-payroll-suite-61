import React from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardMainContent } from "@/components/dashboard/DashboardMainContent";
import { EarningsPayrollSection } from "@/components/dashboard/EarningsPayrollSection";
import { InvoiceSummarySection } from "@/components/dashboard/InvoiceSummarySection";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { PayrollDashboardHeader } from "@/components/dashboard/PayrollDashboardHeader";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { PayrollChart } from "@/components/dashboard/PayrollChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";

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

  // Modified payrollSummary without upcomingDeadlines
  const payrollSummary = {
    nextPayrollDate: new Date(2025, 3, 25), // Using numeric constructor for stability
    employeesCount: 146,
    totalAmount: 287500
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

      {/* Consolidated Summary Cards */}
      <DashboardStats billingEnabled={billingEnabled} />
      
      {/* EarningsPayrollSection with simplified payrollSummary */}
      <EarningsPayrollSection 
        earningsData={earningsData}
        payrollSummary={payrollSummary}
      />

      {/* Main Content - Changed to directly include Payroll Chart and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Payroll Chart with no card wrapper */}
        <div className="md:col-span-2 lg:col-span-4">
          <PayrollChart data={payrollData} />
        </div>

        <Card className="md:col-span-1 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityCard activities={activities} />
          </CardContent>
        </Card>
      </div>

      {/* Only show Invoice Summary if billing is enabled */}
      {billingEnabled && (
        <InvoiceSummarySection invoiceSummary={invoiceSummary} />
      )}
    </div>
  );
};

export default Dashboard;
