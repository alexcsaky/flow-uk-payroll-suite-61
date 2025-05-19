
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClipboardList } from "lucide-react";
import { format } from "date-fns";

interface PayrollSummaryProps {
  nextPayrollDate: Date;
  employeesCount: number;
  totalAmount: number;
  className?: string;
}

export function PayrollSummaryCard({
  nextPayrollDate,
  employeesCount,
  totalAmount,
  className
}: PayrollSummaryProps) {
  // Ensure we have a valid date before formatting
  const formattedDate = nextPayrollDate instanceof Date && !isNaN(nextPayrollDate.getTime()) ? format(nextPayrollDate, "PPP") : "Invalid date";
  
  return <Card className={cn("flow-transition flex flex-col h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Payroll Summary</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>
          Next run on {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Employees</span>
            <span className="text-sm font-medium">{employeesCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Amount</span>
            <span className="text-sm font-medium">£{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" variant="outline">
          <ClipboardList className="mr-2 h-4 w-4" />
          View Payroll Details
        </Button>
      </CardFooter>
    </Card>;
}
