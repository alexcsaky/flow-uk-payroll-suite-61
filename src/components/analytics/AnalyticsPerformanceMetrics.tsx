
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface AnalyticsPerformanceMetricsProps {
  revenueData: { name: string; value: number }[];
  expensesData: { name: string; value: number }[];
}

export const AnalyticsPerformanceMetrics: React.FC<AnalyticsPerformanceMetricsProps> = ({ 
  revenueData, 
  expensesData 
}) => {
  // Create data for metrics
  const profitData = revenueData.map((item, index) => ({
    name: item.name,
    value: item.value - expensesData[index].value
  }));
  
  // Create project data
  const projectData = [
    { name: "Jan", completed: 4, ongoing: 8, new: 2 },
    { name: "Feb", completed: 5, ongoing: 7, new: 3 },
    { name: "Mar", completed: 3, ongoing: 9, new: 1 },
    { name: "Apr", completed: 6, ongoing: 8, new: 2 },
    { name: "May", completed: 7, ongoing: 7, new: 4 },
    { name: "Jun", completed: 4, ongoing: 9, new: 2 }
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6">
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <Tabs defaultValue="revenue">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="profit">Profit</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="mt-4">
            <div className="h-[300px] p-4 border border-border rounded-md">
              <ChartContainer 
                config={{
                  value: {
                    label: "Revenue",
                    color: "#4F46E5",
                  }
                }}
              >
                <ResponsiveContainer width="99%" height="99%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" dy={10} />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000}k`}
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
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4F46E5" 
                      fill="#4F46E5" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="expenses" className="mt-4">
            <div className="h-[300px] p-4 border border-border rounded-md">
              <ChartContainer 
                config={{
                  value: {
                    label: "Expenses",
                    color: "#F97316",
                  }
                }}
              >
                <ResponsiveContainer width="99%" height="99%">
                  <BarChart
                    data={expensesData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" dy={10} />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000}k`}
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
                    <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="profit" className="mt-4">
            <div className="h-[300px] p-4 border border-border rounded-md">
              <ChartContainer 
                config={{
                  value: {
                    label: "Profit",
                    color: "#10B981",
                  }
                }}
              >
                <ResponsiveContainer width="99%" height="99%">
                  <LineChart
                    data={profitData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" dy={10} />
                    <YAxis 
                      tickFormatter={(value) => `$${value / 1000}k`}
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
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10B981" 
                      fill="#10B981"
                      strokeWidth={2}
                      dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="mt-4">
            <div className="h-[300px] p-4 border border-border rounded-md">
              <ChartContainer 
                config={{
                  completed: {
                    label: "Completed Projects",
                    color: "#22C55E",
                  },
                  ongoing: {
                    label: "Ongoing Projects",
                    color: "#3B82F6",
                  },
                  new: {
                    label: "New Projects",
                    color: "#A855F7",
                  }
                }}
              >
                <ResponsiveContainer width="99%" height="99%">
                  <BarChart
                    data={projectData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 30 }}
                    barGap={0}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" dy={10} />
                    <YAxis />
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
                    <Legend wrapperStyle={{ paddingTop: 10 }} />
                    <Bar dataKey="completed" name="Completed" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ongoing" name="Ongoing" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="new" name="New" fill="#A855F7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
