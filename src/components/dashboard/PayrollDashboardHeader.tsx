
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PayrunIssue {
  id: string;
  message: string;
  severity: "warning" | "error";
}

interface PayrollDashboardHeaderProps {
  userName: string;
  employeesNeedingUpdates: number;
  daysUntilPayroll: number;
  payRunDate: Date;
  issues?: PayrunIssue[];
}

export function PayrollDashboardHeader({
  userName,
  employeesNeedingUpdates,
  daysUntilPayroll,
  payRunDate,
  issues = [],
}: PayrollDashboardHeaderProps) {
  const navigate = useNavigate();

  const handleProcessPayroll = () => {
    navigate("/payroll");
  };

  const formattedPayDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(payRunDate);
  
  const hasIssues = issues && issues.length > 0;
  const hasCriticalIssues = issues.some((issue) => issue.severity === "error");

  return (
    <div className="bg-white rounded-lg border shadow-sm p-5 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {userName}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">
              {employeesNeedingUpdates > 0
                ? `${employeesNeedingUpdates} ${
                    employeesNeedingUpdates === 1 ? "employee needs" : "employees need"
                  } updates before next payroll`
                : "All employees are up to date"}
            </p>
            
            {hasIssues && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex cursor-help">
                      <AlertTriangle 
                        className={`h-4 w-4 ${hasCriticalIssues ? "text-destructive" : "text-amber-500"}`} 
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="w-80 p-3">
                    <div className="font-medium mb-2">Required Changes Before Processing</div>
                    <ul className="text-sm space-y-2">
                      {issues.map((issue) => (
                        <li key={issue.id} className={`p-2 rounded ${
                          issue.severity === "error" ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"
                        }`}>
                          <div className="flex items-start gap-2">
                            <AlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                              issue.severity === "error" ? "text-destructive" : "text-amber-500"
                            }`} />
                            <div>
                              <p className="font-medium">{issue.message}</p>
                              {issue.severity === "error" && (
                                <p className="text-xs text-destructive font-medium mt-1">Must be resolved before proceeding</p>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1.5 text-sm font-normal py-1.5 border-muted">
            <Clock className="h-3.5 w-3.5" />
            <span>Next Payroll:</span>
            <span className="font-medium">
              {daysUntilPayroll === 0 
                ? "Today" 
                : daysUntilPayroll === 1 
                  ? "Tomorrow" 
                  : `${daysUntilPayroll} days`
              } ({formattedPayDate})
            </span>
          </Badge>
          
          <Button
            onClick={handleProcessPayroll}
            className="whitespace-nowrap"
            variant={hasCriticalIssues ? "outline" : "default"}
            disabled={hasCriticalIssues}
          >
            Process Payroll
            {hasCriticalIssues && <span className="sr-only">(Blocked by critical issues)</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
