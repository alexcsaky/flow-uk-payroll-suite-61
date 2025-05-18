
import React, { useState, useMemo } from "react";
import { FinancialReportCard } from "./FinancialReportCard";
import { DateRange } from "react-day-picker";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { isWithinInterval, parseISO } from "date-fns";

// Mock data structure for expense transactions
interface ExpenseTransaction {
  id: string;
  date: string; // ISO string
  category: "Salary" | "Benefits" | "Tax" | "Fees";
  amount: number;
  description: string;
}

// Sample expense data
const mockExpenses: ExpenseTransaction[] = [
  { id: "e1", date: "2025-01-05", category: "Salary", amount: 22000, description: "January Payroll" },
  { id: "e2", date: "2025-01-05", category: "Benefits", amount: 3500, description: "January Benefits" },
  { id: "e3", date: "2025-01-05", category: "Tax", amount: 6800, description: "January Tax Payments" },
  { id: "e4", date: "2025-01-05", category: "Fees", amount: 1200, description: "Service Fees" },
  { id: "e5", date: "2025-02-05", category: "Salary", amount: 23000, description: "February Payroll" },
  { id: "e6", date: "2025-02-05", category: "Benefits", amount: 3500, description: "February Benefits" },
  { id: "e7", date: "2025-02-05", category: "Tax", amount: 7100, description: "February Tax Payments" },
  { id: "e8", date: "2025-02-05", category: "Fees", amount: 1200, description: "Service Fees" },
  { id: "e9", date: "2025-03-05", category: "Salary", amount: 24000, description: "March Payroll" },
  { id: "e10", date: "2025-03-05", category: "Benefits", amount: 3600, description: "March Benefits" },
  { id: "e11", date: "2025-03-05", category: "Tax", amount: 7400, description: "March Tax Payments" },
  { id: "e12", date: "2025-03-05", category: "Fees", amount: 1200, description: "Service Fees" },
  { id: "e13", date: "2025-04-05", category: "Salary", amount: 24500, description: "April Payroll" },
  { id: "e14", date: "2025-04-05", category: "Benefits", amount: 3700, description: "April Benefits" },
  { id: "e15", date: "2025-04-05", category: "Tax", amount: 7600, description: "April Tax Payments" },
  { id: "e16", date: "2025-04-05", category: "Fees", amount: 1200, description: "Service Fees" },
];

// Colors for the different expense categories
const CATEGORY_COLORS = {
  Salary: "#8B5CF6", // Purple
  Benefits: "#1D4ED8", // Blue
  Tax: "#DC2626", // Red
  Fees: "#059669" // Green
};

export const SpendReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 0, 1), // Default to Jan 1, 2025
    to: new Date(2025, 3, 30)  // Default to Apr 30, 2025
  });

  // Filter transactions based on date range
  const filteredTransactions = useMemo(() => {
    return mockExpenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return dateRange.from && dateRange.to ? 
        isWithinInterval(expenseDate, { start: dateRange.from, end: dateRange.to }) : 
        dateRange.from ? expenseDate >= dateRange.from : true;
    });
  }, [dateRange]);

  // Compute total spend
  const totalSpend = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
  }, [filteredTransactions]);

  // Prepare chart data grouped by category
  const chartData = useMemo(() => {
    const categoryData: Record<string, { name: string, value: number }> = {};
    
    filteredTransactions.forEach(transaction => {
      const { category, amount } = transaction;
      
      if (!categoryData[category]) {
        categoryData[category] = { name: category, value: 0 };
      }
      
      categoryData[category].value += amount;
    });
    
    return Object.values(categoryData);
  }, [filteredTransactions]);

  const handleExportCSV = () => {
    console.log("Exporting CSV for Spend Report");
    // CSV export logic would go here
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for Spend Report");
    // PDF generation logic would go here
  };

  return (
    <FinancialReportCard
      title="Spend Report"
      description="Expenditure analysis by category"
      onDateRangeChange={setDateRange}
      onExportCSV={handleExportCSV}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="space-y-6">
        {/* Total Spend Card */}
        <div className="bg-card rounded-lg p-4 border">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Spend</h4>
          <p className="text-2xl font-bold">£{totalSpend}</p>
        </div>
        
        {/* Pie Chart - Increased height for better visualization */}
        <div className="h-96">
          <ChartContainer 
            config={{
              Salary: { color: CATEGORY_COLORS.Salary },
              Benefits: { color: CATEGORY_COLORS.Benefits },
              Tax: { color: CATEGORY_COLORS.Tax },
              Fees: { color: CATEGORY_COLORS.Fees }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} 
                    />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value: number) => `£${value.toFixed(2)}`}
                    />
                  } 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Data Table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: CATEGORY_COLORS[expense.category] }}
                      />
                      {expense.category}
                    </div>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">£{expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FinancialReportCard>
  );
};
