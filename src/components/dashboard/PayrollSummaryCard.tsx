import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClipboardList, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
interface Deadline {
  name: string;
  date: Date;
  type: 'normal' | 'warning' | 'urgent';
}
interface PayrollSummaryProps {
  nextPayrollDate: Date;
  employeesCount: number;
  totalAmount: number;
  upcomingDeadlines?: Deadline[];
  className?: string;
}
export function PayrollSummaryCard({
  nextPayrollDate,
  employeesCount,
  totalAmount,
  upcomingDeadlines = [],
  className
}: PayrollSummaryProps) {
  // Ensure we have a valid date before formatting
  const formattedDate = nextPayrollDate instanceof Date && !isNaN(nextPayrollDate.getTime()) ? format(nextPayrollDate, "PPP") : "Invalid date";
  const getDeadlineStyle = (deadline: Deadline) => {
    // Calculate days until the deadline
    const today = new Date();
    const daysUntil = differenceInDays(deadline.date, today);

    // Color coding based on days remaining
    if (daysUntil <= 7) {
      return "text-red-600 font-medium";
    } else if (daysUntil <= 14) {
      return "text-amber-600 font-medium";
    } else if (daysUntil <= 30) {
      return "text-blue-600";
    } else {
      return "text-green-600";
    }
  };
  return <Card className={cn("flow-transition flex flex-col h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Next Payroll</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>
          Due on {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="grid gap-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Employees</span>
            <span className="text-sm font-medium">{employeesCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Total Amount</span>
            <span className="text-sm font-medium">£{totalAmount.toLocaleString()}</span>
          </div>
        </div>
        
        {upcomingDeadlines.length > 0 && <div className="border-t pt-3 flex-grow">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Upcoming Deadlines</span>
            </h4>
            <ul className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => {
            const daysUntil = differenceInDays(deadline.date, new Date());
            return <li key={index} className="flex justify-between items-center text-xs">
                    <span className="font-large">{deadline.name}</span>
                    <div>
                      <span className={getDeadlineStyle(deadline)}>
                        {format(deadline.date, "d MMM")}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {daysUntil <= 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                      </div>
                    </div>
                  </li>;
          })}
            </ul>
          </div>}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" variant="outline">
          <ClipboardList className="mr-2 h-4 w-4" />
          View Payroll Details
        </Button>
      </CardFooter>
    </Card>;
}