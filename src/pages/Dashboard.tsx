
import { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { PayrollSummaryCard } from "@/components/dashboard/PayrollSummaryCard";
import { InvoiceSummaryCard } from "@/components/dashboard/InvoiceSummaryCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { PayrollChart } from "@/components/dashboard/PayrollChart";
import { cn } from "@/lib/utils";
import { Users, Wallet, Building, Clock } from "lucide-react";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data for the dashboard
const mockPayrollData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 48000 },
  { name: "Mar", value: 45000 },
  { name: "Apr", value: 52000 },
  { name: "May", value: 49000 },
  { name: "Jun", value: 55000 },
];

const mockActivities = [
  {
    id: "1",
    title: "Payroll Processed",
    description: "May 2025 monthly payroll was processed successfully",
    timestamp: "Today, 10:30 AM",
    type: "payroll" as const,
  },
  {
    id: "2",
    title: "New Employee Added",
    description: "Jane Smith was added to the system",
    timestamp: "Yesterday, 3:45 PM",
    type: "employee" as const,
  },
  {
    id: "3",
    title: "Invoice Generated",
    description: "Invoice #INV-2023-005 was generated for Client XYZ",
    timestamp: "2 days ago, 11:20 AM",
    type: "invoice" as const,
  },
  {
    id: "4",
    title: "System Update",
    description: "Flow software was updated to version 2.3.0",
    timestamp: "3 days ago, 9:15 AM",
    type: "system" as const,
  },
  {
    id: "5",
    title: "Payroll Scheduled",
    description: "June 2025 payroll has been scheduled",
    timestamp: "4 days ago, 2:30 PM",
    type: "payroll" as const,
  },
  {
    id: "6",
    title: "New Client Added",
    description: "ABC Ltd was added as a new client",
    timestamp: "1 week ago, 10:00 AM",
    type: "client" as const,
  },
  {
    id: "7",
    title: "Invoice Paid",
    description: "Invoice #INV-2023-004 was marked as paid",
    timestamp: "1 week ago, 2:15 PM",
    type: "invoice" as const,
  },
];

export default function Dashboard() {
  const { billingEnabled, toggleBillingFeatures } = useBillingFeatures();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your payroll and financial data
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="billing-features" className="font-medium">
            {billingEnabled ? "Billing Features Enabled" : "Billing Features Disabled"}
          </Label>
          <Switch 
            id="billing-features" 
            checked={billingEnabled}
            onCheckedChange={toggleBillingFeatures}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="124"
          icon={Users}
          description="Active employees in the system"
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatCard
          title="Monthly Payroll"
          value="£52,480"
          icon={Wallet}
          description="Upcoming May payroll"
          trend={{ value: 3, isPositive: true }}
        />
        
        {billingEnabled ? (
          <>
            <StatCard
              title="Active Clients"
              value="18"
              icon={Building}
              description="Client accounts"
              trend={{ value: 2, isPositive: true }}
            />
            
            <StatCard
              title="Billable Hours"
              value="1,245"
              icon={Clock}
              description="Hours this month"
              trend={{ value: 4, isPositive: false }}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Pending Timesheets"
              value="12"
              icon={Clock}
              description="Awaiting approval"
              trend={{ value: 8, isPositive: false }}
            />
            
            <StatCard
              title="Approved Timesheets"
              value="156"
              icon={Clock}
              description="Ready for processing"
              trend={{ value: 15, isPositive: true }}
            />
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <PayrollChart data={mockPayrollData} className={cn(
          billingEnabled ? "lg:col-span-4" : "lg:col-span-5"
        )} />
        
        <div className={cn(
          "space-y-6",
          billingEnabled ? "lg:col-span-3" : "lg:col-span-2"
        )}>
          <PayrollSummaryCard
            nextPayrollDate={new Date(2025, 4, 28)} // May 28, 2025
            employeesCount={124}
            totalAmount={52480}
          />
          
          {billingEnabled && (
            <InvoiceSummaryCard
              totalOutstanding={28600}
              totalPaid={65400}
              percentageComplete={70}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivityCard 
          activities={mockActivities}
          className={billingEnabled ? "lg:col-span-1" : "lg:col-span-2"}
        />
        
        <div className={billingEnabled ? "lg:col-span-2" : "lg:col-span-1"}>
          {/* This space is available for future components */}
          {/* For now, let's leave it empty */}
        </div>
      </div>
    </div>
  );
}
