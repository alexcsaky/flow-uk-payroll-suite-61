import React, { useState, useMemo } from "react";
import { FinancialReportCard } from "./FinancialReportCard";
import { DateRange } from "react-day-picker";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { isWithinInterval, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Custom label renderer to avoid overlap for 'Fees' and connect the line properly
const renderCustomLabel = (props: any) => {
  const { name, value, cx, cy, midAngle, outerRadius, percent } = props;
  let RADIAN = Math.PI / 180;
  let radius = outerRadius + 30;
  let x = cx + radius * Math.cos(-midAngle * RADIAN);
  let y = cy + radius * Math.sin(-midAngle * RADIAN);

  // For 'Fees', move label down and draw a line from arc to label
  if (name === 'Fees') {
    const labelY = y + 60;
    return (
      <g>
        {/* Line from arc to label */}
        <polyline
          points={`${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${cy + outerRadius * Math.sin(-midAngle * RADIAN)} ${x},${y} ${x},${labelY}`}
          stroke={CATEGORY_COLORS[name]}
          fill="none"
          strokeWidth={2}
        />
        <text x={x} y={labelY} fill={CATEGORY_COLORS[name]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={16} fontWeight={500}>
          {`${name}: £${value.toLocaleString()}`}
        </text>
      </g>
    );
  }

  // Default label for other categories
  return (
    <text x={x} y={y} fill={CATEGORY_COLORS[name]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={16} fontWeight={500}>
      {`${name}: £${value.toLocaleString()}`}
    </text>
  );
};

export const SpendReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 0, 1), // Default to Jan 1, 2025
    to: new Date(2025, 3, 30)  // Default to Apr 30, 2025
  });

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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

  // Group data by category
  const groupedData = chartData.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {} as Record<string, typeof chartData>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleExportCSV = () => {
    console.log("Exporting CSV for Spend Report");
    // CSV export logic would go here
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for Spend Report");
    // PDF generation logic would go here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as keyof typeof CATEGORY_COLORS]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{
                    paddingLeft: "20px"
                  }}
                  formatter={(value, entry) => (
                    <span className="text-sm">
                      {value}: £{chartData.find(item => item.name === value)?.value.toLocaleString()}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Table with Collapsible Categories */}
          <div className="overflow-x-auto">
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
                {Object.entries(groupedData).map(([category, items]) => (
                  <React.Fragment key={category}>
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={4}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => toggleCategory(category)}
                        >
                          {expandedCategories.includes(category) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          {category} - Total: £{items.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedCategories.includes(category) && filteredTransactions
                      .filter(t => t.category === category)
                      .map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell></TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">£{transaction.amount.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
