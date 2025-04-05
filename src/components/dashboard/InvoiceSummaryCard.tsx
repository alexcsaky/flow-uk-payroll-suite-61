
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface InvoiceSummaryProps {
  totalOutstanding: number;
  totalPaid: number;
  percentageComplete: number;
  className?: string;
}

export function InvoiceSummaryCard({
  totalOutstanding,
  totalPaid,
  percentageComplete,
  className,
}: InvoiceSummaryProps) {
  return (
    <Card className={cn("flow-transition", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Outstanding Invoices</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>Invoice payment status</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{percentageComplete}% paid</span>
          </div>
          <Progress value={percentageComplete} className="h-2" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Outstanding</p>
            <p className="text-2xl font-bold">£{totalOutstanding.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Paid</p>
            <p className="text-2xl font-bold">£{totalPaid.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View All Invoices
        </Button>
      </CardFooter>
    </Card>
  );
}
