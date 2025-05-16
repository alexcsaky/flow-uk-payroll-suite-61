
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Calendar, TrendingUp, ArrowDown, ArrowUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { AnalyticsCostProjections } from "@/components/analytics/AnalyticsCostProjections";
import { AnalyticsEmployeeDistribution } from "@/components/analytics/AnalyticsEmployeeDistribution";
import { AnalyticsRevenueExpenseChart } from "@/components/analytics/AnalyticsRevenueExpenseChart";
import { AnalyticsPerformanceMetrics } from "@/components/analytics/AnalyticsPerformanceMetrics";

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
  const [timeframe, setTimeframe] = useState("6m");
  const [chartType, setChartType] = useState("bar");
  
  // Calculate metrics for cards
  const currentRevenue = revenueData[revenueData.length - 1].value;
  const previousRevenue = revenueData[revenueData.length - 2].value;
  const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  const currentExpenses = expensesData[expensesData.length - 1].value;
  const previousExpenses = expensesData[expensesData.length - 2].value;
  const expensesChange = ((currentExpenses - previousExpenses) / previousExpenses) * 100;

  // Profit calculation
  const currentProfit = currentRevenue - currentExpenses;
  const previousProfit = previousRevenue - previousExpenses;
  const profitChange = ((currentProfit - previousProfit) / previousProfit) * 100;
  const profitMargin = (currentProfit / currentRevenue) * 100;
  const previousProfitMargin = (previousProfit / previousRevenue) * 100;
  const profitMarginChange = profitMargin - previousProfitMargin;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize and analyze business performance metrics
          </p>
        </div>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
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
              {revenueChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1">
              {revenueChange > 0 ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <p className={revenueChange > 0 ? "text-xs text-green-500" : "text-xs text-red-500"}>
                {Math.abs(revenueChange).toFixed(1)}% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                Total Expenses
              </CardTitle>
              {expensesChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-amber-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentExpenses.toLocaleString()}</div>
            <div className="flex items-center gap-1">
              {expensesChange > 0 ? (
                <ArrowUp className="h-3 w-3 text-amber-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-green-500" />
              )}
              <p className={expensesChange > 0 ? "text-xs text-amber-500" : "text-xs text-green-500"}>
                {Math.abs(expensesChange).toFixed(1)}% from last month
              </p>
            </div>
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
              {profitMarginChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-purple-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
            <div className="flex items-center gap-1">
              {profitMarginChange > 0 ? (
                <ArrowUp className="h-3 w-3 text-purple-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <p className={profitMarginChange > 0 ? "text-xs text-purple-500" : "text-xs text-red-500"}>
                {Math.abs(profitMarginChange).toFixed(1)}% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalyticsRevenueExpenseChart 
          revenueData={revenueData} 
          expensesData={expensesData} 
          chartType={chartType} 
          setChartType={setChartType} 
        />
        <AnalyticsEmployeeDistribution data={employeeData} />
      </div>

      <AnalyticsCostProjections />

      <AnalyticsPerformanceMetrics 
        revenueData={revenueData} 
        expensesData={expensesData} 
      />
    </div>
  );
};

export default Analytics;
