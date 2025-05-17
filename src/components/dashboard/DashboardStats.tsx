
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserCheck, Clock, Bell, ShieldCheck } from "lucide-react";

interface DashboardStatsProps {
  billingEnabled: boolean;
}

export function DashboardStats({ billingEnabled }: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
      <StatCard
        title="Total Employees"
        value="146"
        icon={Users}
        trend={{ value: 2.5, isPositive: true }}
        description="from last month"
      />
      <StatCard
        title="Pending Approvals"
        value="23"
        icon={UserCheck}
        trend={{ value: 5, isPositive: false }}
        description="from last week"
      />
      <StatCard
        title="Onboarding Time"
        value="2.4 days"
        icon={Clock}
        trend={{ value: 12.5, isPositive: true }}
        description="0.3 days faster"
      />
      <StatCard
        title="Potential Anomalies"
        value="2"
        icon={Bell}
        trend={{ value: 4, isPositive: false }}
        description="+1 from last month"
      />
      <StatCard
        title="Compliance Score"
        value="86%"
        icon={ShieldCheck}
        trend={{ value: 4, isPositive: true }}
        description="from last month"
      />
    </div>
  );
}
