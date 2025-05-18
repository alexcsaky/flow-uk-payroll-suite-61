
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AnalyticsEmployeeDistributionProps {
  data: { name: string; value: number }[];
}

export const AnalyticsEmployeeDistribution: React.FC<AnalyticsEmployeeDistributionProps> = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Employee Distribution
            </CardTitle>
            <CardDescription>By department</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[280px] w-full">
          <ChartContainer
            config={
              Object.fromEntries(
                data.map((entry, index) => [
                  entry.name,
                  { 
                    label: entry.name,
                    color: COLORS[index % COLORS.length]
                  }
                ])
              )
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-background border border-border/50 shadow-md"
                          formatter={(value: number) => `${value} employees`}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value, entry) => <span style={{ color: '#333', fontWeight: 500 }}>{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
