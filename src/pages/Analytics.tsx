
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { BarChart as BarChartIcon, Calendar, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for charts
const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const expensesData = [
  { name: "Jan", value: 2500 },
  { name: "Feb", value: 2200 },
  { name: "Mar", value: 3100 },
  { name: "Apr", value: 2800 },
  { name: "May", value: 3500 },
  { name: "Jun", value: 3300 },
];

const employeeData = [
  { name: "Engineering", value: 40 },
  { name: "Marketing", value: 25 },
  { name: "Support", value: 15 },
  { name: "Sales", value: 20 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize and analyze business performance metrics
          </p>
        </div>
        <Select defaultValue="6m">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,000</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Expenses
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17,400</div>
            <p className="text-xs text-amber-500">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Active Projects
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-blue-500">3 added this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Profit Margin
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-purple-500">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5" />
                  Revenue vs. Expenses
                </CardTitle>
                <CardDescription>6 month comparison</CardDescription>
              </div>
              <Select defaultValue="bar">
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
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Interactive chart would be displayed here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Employee Distribution
                </CardTitle>
                <CardDescription>By department</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Interactive chart would be displayed here
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="profit">Profit</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue" className="mt-4">
              <div className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Revenue metrics would be displayed here
                </div>
              </div>
            </TabsContent>
            <TabsContent value="expenses" className="mt-4">
              <div className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Expense metrics would be displayed here
                </div>
              </div>
            </TabsContent>
            <TabsContent value="profit" className="mt-4">
              <div className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Profit metrics would be displayed here
                </div>
              </div>
            </TabsContent>
            <TabsContent value="projects" className="mt-4">
              <div className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Project metrics would be displayed here
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
