
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowDown, ArrowUp, Calendar } from "lucide-react";

interface AnalyticsMetricsCardsProps {
  currentRevenue: number;
  previousRevenue: number;
  revenueChange: number;
  currentExpenses: number;
  previousExpenses: number;
  expensesChange: number;
  profitMargin: number;
  profitMarginChange: number;
}

export const AnalyticsMetricsCards: React.FC<AnalyticsMetricsCardsProps> = ({
  currentRevenue,
  previousRevenue,
  revenueChange,
  currentExpenses,
  previousExpenses,
  expensesChange,
  profitMargin,
  profitMarginChange,
}) => {
  return (
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
  );
};
