
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollSummaryCard from "@/components/dashboard/PayrollSummaryCard";
import InvoiceSummaryCard from "@/components/dashboard/InvoiceSummaryCard";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import PayrollChart from "@/components/dashboard/PayrollChart";
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
          trend="up"
          trendValue="+2.5%"
          trendText="from last month"
          icon="users"
        />
        {billingEnabled ? (
          <>
            <StatCard
              title="Open Invoices"
              value="12"
              trend="down"
              trendValue="-4"
              trendText="from last week"
              icon="fileText"
            />
            <StatCard
              title="Clients"
              value="38"
              trend="up"
              trendValue="+2"
              trendText="new this month"
              icon="building"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Pending Approvals"
              value="23"
              trend="down"
              trendValue="-5"
              trendText="from last week"
              icon="checkCircle"
            />
            <StatCard
              title="Hours Logged"
              value="1,248"
              trend="up"
              trendValue="+12.5%"
              trendText="from last month"
              icon="clock"
            />
          </>
        )}
        <StatCard
          title="Next Pay Run"
          value="Apr 25"
          trend="soon"
          trendValue="5 days"
          trendText="until processing"
          icon="calendar"
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
            <RecentActivityCard />
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <PayrollSummaryCard />
        {billingEnabled && <InvoiceSummaryCard />}
      </div>
    </div>
  );
};

export default Dashboard;
