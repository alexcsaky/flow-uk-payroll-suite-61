
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnalyticsMetricsCards } from "@/components/analytics/AnalyticsMetricsCards";
import { AnomalyDetectionFeed } from "@/components/analytics/AnomalyDetectionFeed";
import { AnalyticsRevenueExpenseChart } from "@/components/analytics/AnalyticsRevenueExpenseChart";
import { AnalyticsPerformanceMetrics } from "@/components/analytics/AnalyticsPerformanceMetrics";
import { CostProjectionChart } from "@/components/analytics/CostProjectionChart";

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
    <div className="space-y-6 p-2">
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

      <AnalyticsMetricsCards 
        currentRevenue={currentRevenue}
        previousRevenue={previousRevenue}
        revenueChange={revenueChange}
        currentExpenses={currentExpenses}
        previousExpenses={previousExpenses}
        expensesChange={expensesChange}
        profitMargin={profitMargin}
        profitMarginChange={profitMarginChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalyticsRevenueExpenseChart 
          revenueData={revenueData} 
          expensesData={expensesData} 
          chartType={chartType} 
          setChartType={setChartType} 
        />
        {/* Replace AnalyticsEmployeeDistribution with AnomalyDetectionFeed */}
        <AnomalyDetectionFeed />
      </div>

      {/* Replacing AnalyticsCostProjections with our new CostProjectionChart */}
      <CostProjectionChart />

      <AnalyticsPerformanceMetrics 
        revenueData={revenueData} 
        expensesData={expensesData} 
      />
    </div>
  );
};

export default Analytics;
