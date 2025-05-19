
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
import { FileText } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface InvoiceSummaryProps {
  totalOutstanding: number;
  totalPaid: number;
  percentageComplete: number;
  className?: string;
  vertical?: boolean;
}

export function InvoiceSummaryCard({
  totalOutstanding,
  totalPaid,
  percentageComplete,
  className,
  vertical = false,
}: InvoiceSummaryProps) {
  // Data for the donut chart
  const data = [
    { name: 'Paid', value: percentageComplete },
    { name: 'Outstanding', value: 100 - percentageComplete }
  ];
  
  // Colors for the donut chart
  const COLORS = ['#4ade80', '#e5e5e5']; // Green for paid, Gray for outstanding

  const renderDonutChart = () => (
    <div className="relative w-full flex justify-center">
      <div className="w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-bold">{percentageComplete}%</div>
        <div className="text-xs space-y-1 mt-1">
          <div className="flex items-center justify-center gap-1 text-green-500">
            <span>﹢</span>
            <span>£{totalPaid.toLocaleString()}</span>
            <span className="text-muted-foreground">Paid</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <span>﹣</span>
            <span>£{totalOutstanding.toLocaleString()}</span>
            <span>Outstanding</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (vertical) {
    return (
      <div className={cn("flow-transition", className)}>
        <div className="grid gap-4">
          {renderDonutChart()}
          
          <Button className="w-full mt-2" variant="outline">
            View All Invoices
          </Button>
        </div>
      </div>
    );
  }

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
        {renderDonutChart()}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View All Invoices
        </Button>
      </CardFooter>
    </Card>
  );
}
