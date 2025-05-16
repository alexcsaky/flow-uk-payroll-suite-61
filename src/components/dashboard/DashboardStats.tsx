
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, FileText, Building, CheckCircle2, Clock, Calendar } from "lucide-react";

interface DashboardStatsProps {
  billingEnabled: boolean;
}

export function DashboardStats({ billingEnabled }: DashboardStatsProps) {
  return (
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
            icon={CheckCircle2}
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
  );
}
