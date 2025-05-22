import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PayrollChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function PayrollChart({ data }: PayrollChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Payroll Trends</CardTitle>
        <CardDescription>Monthly payroll totals for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <div className="h-[350px] w-full">
          <ChartContainer 
            config={{
              value: {
                label: "Total",
                color: "#1F67B9"
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
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
                  tickFormatter={(value) => `£${value.toLocaleString()}`}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-background border border-border/50 shadow-md"
                          formatter={(value) => `£${Number(value).toLocaleString()}`}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#1F67B9" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
