
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PayrollSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-medium">Payment Schedule</h3>
            <p className="text-sm text-muted-foreground">
              Configure your payment frequency and schedule
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-medium">Tax Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Manage your tax settings and compliance
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              Set up how employees will receive their pay
            </p>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-medium">Approval Workflow</h3>
            <p className="text-sm text-muted-foreground">
              Configure payroll approval steps
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
