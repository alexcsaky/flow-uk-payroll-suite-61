import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Clock, Users, Lock, Unlock } from "lucide-react";
import { format } from "date-fns";

interface PayrollUpcomingProps {
  onProcessPayroll?: () => void;
}

export const PayrollUpcoming: React.FC<PayrollUpcomingProps> = ({ onProcessPayroll }) => {
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Next Payroll Run</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLock}
            className="flex items-center gap-1"
          >
            {isLocked ? (
              <Lock className="h-4 w-4 text-red-500" />
            ) : (
              <Unlock className="h-4 w-4 text-green-500" />
            )}
            <span className="text-xs">
              {isLocked ? "Locked" : "Open"}
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Pay Date</p>
                  <p className="text-sm text-muted-foreground">25 April 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Week Ending</p>
                  <p className="text-sm text-muted-foreground">26 April 2025</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <p className="text-lg font-semibold">146</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Button
                disabled={isLocked}
                onClick={onProcessPayroll}
                className="flex items-center gap-2"
              >
                Run Payroll
              </Button>
              <Button variant="outline">Preview</Button>
              <Button variant="outline">Edit</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
