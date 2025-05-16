
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChart } from "lucide-react";

interface AnalyticsEmployeeDistributionProps {
  data: { name: string; value: number }[];
}

export const AnalyticsEmployeeDistribution: React.FC<AnalyticsEmployeeDistributionProps> = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <Card>
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
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
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
            <Tooltip
              formatter={(value, name) => [
                `${value} employees`,
                name
              ]}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
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
      </CardContent>
    </Card>
  );
};
