
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartBarStacked } from "lucide-react";

interface EarningsData {
  name: string;
  gross: number;
  net: number;
}

interface EarningsChartProps {
  data: EarningsData[];
  className?: string;
}

export function EarningsChart({ data, className }: EarningsChartProps) {
  // Format currency values for display
  const formatCurrency = (value: number) => {
    return `£${value.toLocaleString()}`;
  };

  // Calculate percentages for summary
  const latestMonth = data[data.length - 1];
  const totalNet = latestMonth.net;
  const totalGross = latestMonth.gross;
  const netPercentage = Math.round((totalNet / totalGross) * 100);
  
  // Calculate tax and deduction
  const taxAndDeductions = totalGross - totalNet;
  const taxPercentage = Math.round((taxAndDeductions / totalGross) * 100);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ChartBarStacked className="h-5 w-5 text-muted-foreground" />
            Net vs Gross Earnings
          </CardTitle>
          <CardDescription>
            Monthly comparison of net and gross earnings
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Gross Earnings</div>
              <div className="text-2xl font-bold">{formatCurrency(totalGross)}</div>
              <div className="text-xs text-muted-foreground mt-1">Latest month</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Net Earnings</div>
              <div className="text-2xl font-bold">{formatCurrency(totalNet)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {netPercentage}% of gross
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Tax & Deductions</div>
              <div className="text-2xl font-bold">{formatCurrency(taxAndDeductions)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {taxPercentage}% of gross
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ChartContainer
            config={{
              gross: {
                label: "Gross Earnings",
                color: "#1F67B9",
              },
              net: {
                label: "Net Earnings",
                color: "#4E96FF",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickMargin={8}
                  tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-background border border-border/50 shadow-md"
                          indicator="dot"
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="gross" name="Gross Earnings" fill="#1F67B9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" name="Net Earnings" fill="#4E96FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
