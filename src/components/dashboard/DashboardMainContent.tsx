
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PayrollChart } from "@/components/dashboard/PayrollChart";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";

interface DashboardMainContentProps {
  payrollData: Array<{ name: string; value: number }>;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: "payroll" | "invoice" | "employee" | "client" | "system";
  }>;
}

export function DashboardMainContent({ payrollData, activities }: DashboardMainContentProps) {
  return (
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
  );
}
