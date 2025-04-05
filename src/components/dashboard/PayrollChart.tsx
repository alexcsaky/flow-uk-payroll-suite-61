
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

interface PayrollChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function PayrollChart({ data }: PayrollChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Trends</CardTitle>
        <CardDescription>Monthly payroll totals for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
              <Tooltip 
                formatter={(value) => [`£${Number(value).toLocaleString()}`, "Total"]}
                labelStyle={{ color: "#374151", fontWeight: 500 }}
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  border: "none",
                  padding: "0.75rem"
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#1F67B9" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
