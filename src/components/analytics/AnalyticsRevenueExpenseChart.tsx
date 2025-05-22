import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as RechartsBarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartBar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AnalyticsRevenueExpenseChartProps {
  revenueData: {
    name: string;
    value: number;
  }[];
  expensesData: {
    name: string;
    value: number;
  }[];
  chartType: string;
  setChartType: (type: string) => void;
}

export const AnalyticsRevenueExpenseChart: React.FC<AnalyticsRevenueExpenseChartProps> = ({
  revenueData,
  expensesData,
  chartType,
  setChartType
}) => {
  // Combine data for the chart
  const combinedData = revenueData.map((item, index) => ({
    name: item.name,
    revenue: item.value,
    expenses: expensesData[index].value,
    profit: item.value - expensesData[index].value
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              Revenue vs. Expenses
            </CardTitle>
            <CardDescription>6 month comparison</CardDescription>
          </div>
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[400px] w-full">
          <ChartContainer config={{
            revenue: {
              label: "Revenue",
              color: "#4F46E5"
            },
            expenses: {
              label: "Expenses",
              color: "#F97316"
            },
            profit: {
              label: "Profit",
              color: "#10B981"
            }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "bar" ? (
                <RechartsBarChart 
                  data={combinedData} 
                  margin={{
                    top: 10,
                    right: 10,
                    left: 5,
                    bottom: 20
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={value => `$${value / 1000}k`} />
                  <ChartTooltip 
                    content={({active, payload}) => {
                      if (active && payload && payload.length) {
                        return <ChartTooltipContent 
                          className="bg-background border border-border/50 shadow-md"
                          indicator="dot" 
                        />;
                      }
                      return null;
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#F97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              ) : (
                <LineChart 
                  data={combinedData} 
                  margin={{
                    top: 10,
                    right: 10,
                    left: 5,
                    bottom: 20
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={value => `$${value / 1000}k`} />
                  <ChartTooltip 
                    content={({active, payload}) => {
                      if (active && payload && payload.length) {
                        return <ChartTooltipContent 
                          className="bg-background border border-border/50 shadow-md"
                          indicator="dot" 
                        />;
                      }
                      return null;
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4F46E5" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                    dot={{
                      stroke: '#4F46E5',
                      strokeWidth: 2,
                      r: 4
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#F97316" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                    dot={{
                      stroke: '#F97316',
                      strokeWidth: 2,
                      r: 4
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                    dot={{
                      stroke: '#10B981',
                      strokeWidth: 2,
                      r: 4
                    }} 
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
