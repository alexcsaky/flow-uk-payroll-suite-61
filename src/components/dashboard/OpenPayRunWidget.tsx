
import React from "react";
import { Calendar, AlertTriangle, CheckCircle2, XOctagon, Link, CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export type PayRunStatus = "ready" | "blocked" | "error" | "in-progress";

export interface PayRunIssue {
  id: string;
  message: string;
  severity: "warning" | "error";
}

export interface OpenPayRunWidgetProps {
  payRunName: string;
  payRunDate: Date;
  status: PayRunStatus;
  issues?: PayRunIssue[];
  className?: string;
}

export function OpenPayRunWidget({
  payRunName,
  payRunDate,
  status,
  issues = [],
  className,
}: OpenPayRunWidgetProps) {
  const navigate = useNavigate();

  const handleNavigateToPayRun = () => {
    navigate("/payroll");
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(payRunDate);

  const getStatusDetails = (status: PayRunStatus) => {
    switch (status) {
      case "ready":
        return {
          label: "Ready to process",
          color: "bg-green-500 hover:bg-green-600",
          icon: CheckCircle2,
          description: "All requirements met, ready to process",
        };
      case "blocked":
        return {
          label: "Blocked",
          color: "bg-amber-500 hover:bg-amber-600",
          icon: AlertTriangle,
          description: "There are issues that need to be resolved",
        };
      case "error":
        return {
          label: "Error",
          color: "bg-red-500 hover:bg-red-600",
          icon: XOctagon,
          description: "Critical errors detected",
        };
      case "in-progress":
        return {
          label: "In Progress",
          color: "bg-blue-500 hover:bg-blue-600",
          icon: CalendarClock,
          description: "Pay run is currently being processed",
        };
    }
  };

  const statusDetails = getStatusDetails(status);

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${className}`} 
      onClick={handleNavigateToPayRun}
      role="link"
      aria-label={`Open ${payRunName} pay run details`}
    >
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-5 gap-4 p-4">
          <div className="col-span-2 lg:col-span-1 flex flex-col justify-center space-y-1">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Current Pay Run
            </h3>
            <p className="text-sm text-muted-foreground">Click to manage</p>
          </div>
          
          <div className="col-span-2 lg:col-span-2 flex flex-col justify-center">
            <h4 className="text-base font-semibold">{payRunName}</h4>
            <p className="text-sm font-medium">{formattedDate}</p>
          </div>
          
          <div className="col-span-2 lg:col-span-1 flex items-center">
            <div 
              className={`flex items-center px-3 py-1.5 text-white rounded-md ${statusDetails.color} 
                        transition-colors w-full justify-center gap-2`}
              role="status"
              aria-label={`Status: ${statusDetails.label}`}
            >
              <statusDetails.icon className="h-4 w-4" />
              <span className="font-medium text-sm">{statusDetails.label}</span>
            </div>
          </div>
          
          <div className="col-span-5 lg:col-span-1 flex items-center justify-end">
            <Button
              variant="outline"
              className="gap-2 text-primary"
              aria-hidden="true" // The entire card is clickable
              tabIndex={-1} // Prevent focus as the card is already focusable
            >
              <span>View Details</span>
              <Link className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {issues && issues.length > 0 && (
          <Alert variant="destructive" className="border-t rounded-t-none m-0">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-1">
                {issues.map((issue) => (
                  <li key={issue.id} className="text-sm">
                    {issue.message}
                    {issue.severity === "error" && (
                      <Badge variant="destructive" className="ml-2">Critical</Badge>
                    )}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
