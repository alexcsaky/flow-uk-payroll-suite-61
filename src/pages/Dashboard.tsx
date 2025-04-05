
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PayrollSummaryCard } from "@/components/dashboard/PayrollSummaryCard";
import { InvoiceSummaryCard } from "@/components/dashboard/InvoiceSummaryCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { PayrollChart } from "@/components/dashboard/PayrollChart";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { Users, FileText, Building, CheckCircle, Clock, Calendar } from "lucide-react";

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

  // Mock data for the RecentActivityCard
  const activities = [
    {
      id: "1",
      title: "Payroll processed",
      description: "Monthly payroll for 146 employees completed",
      timestamp: "Today at 12:30 PM",
      type: "payroll",
    },
    {
      id: "2",
      title: "Invoice #INV-2023-001 sent",
      description: "£12,450 to Client XYZ Ltd",
      timestamp: "Yesterday at 3:45 PM",
      type: "invoice",
    },
    {
      id: "3",
      title: "New employee added",
      description: "John Smith added to IT Department",
      timestamp: "Apr 3, 2023 at 10:15 AM",
      type: "employee",
    },
    {
      id: "4",
      title: "Client payment received",
      description: "£8,750 from ABC Corp for invoice #INV-2023-005",
      timestamp: "Apr 2, 2023 at 2:30 PM",
      type: "client",
    },
    {
      id: "5",
      title: "System maintenance completed",
      description: "Scheduled maintenance and updates applied",
      timestamp: "Apr 1, 2023 at 11:00 PM",
      type: "system",
    }
  ];

  // Mock data for PayrollSummaryCard
  const payrollSummary = {
    nextPayrollDate: new Date("2025-04-25"),
    employeesCount: 146,
    totalAmount: 287500
  };

  // Mock data for InvoiceSummaryCard
  const invoiceSummary = {
    totalOutstanding: 68500,
    totalPaid: 156000,
    percentageComplete: 69
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="week" className="w-[250px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="146"
          icon={Users}
          trend={{ value: 2.5, isPositive: true }}
          description="from last month"
        />
        {billingEnabled ? (
          <>
            <StatCard
              title="Open Invoices"
              value="12"
              icon={FileText}
              trend={{ value: 4, isPositive: false }}
              description="from last week"
            />
            <StatCard
              title="Clients"
              value="38"
              icon={Building}
              trend={{ value: 2, isPositive: true }}
              description="new this month"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Pending Approvals"
              value="23"
              icon={CheckCircle}
              trend={{ value: 5, isPositive: false }}
              description="from last week"
            />
            <StatCard
              title="Hours Logged"
              value="1,248"
              icon={Clock}
              trend={{ value: 12.5, isPositive: true }}
              description="from last month"
            />
          </>
        )}
        <StatCard
          title="Next Pay Run"
          value="Apr 25"
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
          description="until processing"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Payroll Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PayrollChart data={payrollData} />
          </CardContent>
        </Card>

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

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <PayrollSummaryCard
          nextPayrollDate={payrollSummary.nextPayrollDate}
          employeesCount={payrollSummary.employeesCount}
          totalAmount={payrollSummary.totalAmount}
        />
        {billingEnabled && 
          <InvoiceSummaryCard
            totalOutstanding={invoiceSummary.totalOutstanding}
            totalPaid={invoiceSummary.totalPaid}
            percentageComplete={invoiceSummary.percentageComplete}
          />
        }
      </div>
    </div>
  );
};

export default Dashboard;
