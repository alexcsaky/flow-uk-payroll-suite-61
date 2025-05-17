
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClipboardList, Clock } from "lucide-react";
import { format } from "date-fns";

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
  className,
}: PayrollSummaryProps) {
  // Ensure we have a valid date before formatting
  const formattedDate = nextPayrollDate instanceof Date && !isNaN(nextPayrollDate.getTime()) 
    ? format(nextPayrollDate, "PPP") 
    : "Invalid date";

  const getDeadlineStyle = (type: Deadline['type']) => {
    switch(type) {
      case 'urgent':
        return "text-red-600";
      case 'warning':
        return "text-amber-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <Card className={cn("flow-transition", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Next Payroll</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>
          Due on {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
        
        {upcomingDeadlines.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Upcoming Deadlines</span>
            </h4>
            <ul className="space-y-2">
              {upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="flex justify-between items-center text-xs">
                  <span>{deadline.name}</span>
                  <span className={getDeadlineStyle(deadline.type)}>
                    {format(deadline.date, "d MMM")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <ClipboardList className="mr-2 h-4 w-4" />
          View Payroll Details
        </Button>
      </CardFooter>
    </Card>
  );
}
