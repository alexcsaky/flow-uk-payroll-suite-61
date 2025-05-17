
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const PayrollUpcoming: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Next Payroll Run</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Run Date</p>
                <p className="text-lg font-semibold">April 25, 2025</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <p className="text-lg font-semibold">146</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-lg font-semibold">£287,500</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Button>Process Payroll</Button>
              <Button variant="outline">Preview</Button>
              <Button variant="outline">Edit</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
