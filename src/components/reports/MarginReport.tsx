
import React, { useState, useMemo } from "react";
import { FinancialReportCard } from "./FinancialReportCard";
import { DateRange } from "react-day-picker";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format, parseISO, isWithinInterval } from "date-fns";

// Mock data structure for payroll transactions
interface PayrollTransaction {
  id: string;
  date: string; // ISO string
  client: string;
  organization: string;
  revenue: number;
  cost: number;
  description: string;
}

// Sample data
const mockTransactions: PayrollTransaction[] = [
  { id: "1", date: "2025-01-05", client: "Acme Corp", organization: "Marketing", revenue: 15000, cost: 11000, description: "Staff Augmentation" },
  { id: "2", date: "2025-01-12", client: "TechCo", organization: "Development", revenue: 22000, cost: 15000, description: "Project Outsourcing" },
  { id: "3", date: "2025-01-20", client: "MediaGroup", organization: "Design", revenue: 8000, cost: 6000, description: "Contract Work" },
  { id: "4", date: "2025-02-03", client: "Acme Corp", organization: "Marketing", revenue: 16000, cost: 12000, description: "Staff Augmentation" },
  { id: "5", date: "2025-02-15", client: "TechCo", organization: "Development", revenue: 24000, cost: 16500, description: "Project Outsourcing" },
  { id: "6", date: "2025-02-28", client: "FinServ", organization: "Finance", revenue: 32000, cost: 23000, description: "Consulting" },
  { id: "7", date: "2025-03-10", client: "Acme Corp", organization: "Marketing", revenue: 17000, cost: 12500, description: "Staff Augmentation" },
  { id: "8", date: "2025-03-18", client: "MediaGroup", organization: "Design", revenue: 9500, cost: 7000, description: "Contract Work" },
  { id: "9", date: "2025-03-25", client: "FinServ", organization: "Finance", revenue: 31000, cost: 22000, description: "Consulting" },
  { id: "10", date: "2025-04-05", client: "TechCo", organization: "Development", revenue: 26000, cost: 18000, description: "Project Outsourcing" },
  { id: "11", date: "2025-04-15", client: "Acme Corp", organization: "Marketing", revenue: 18000, cost: 13000, description: "Staff Augmentation" },
  { id: "12", date: "2025-04-28", client: "FinServ", organization: "Finance", revenue: 33000, cost: 24000, description: "Consulting" },
];

// Get unique clients from transactions
const uniqueClients = Array.from(new Set(mockTransactions.map(t => t.client)));

export const MarginReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 0, 1), // Default to Jan 1, 2025
    to: new Date(2025, 3, 30)  // Default to Apr 30, 2025
  });
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  // Filter transactions based on date range and selected clients
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const isInDateRange = dateRange.from && dateRange.to ? 
        isWithinInterval(transactionDate, { start: dateRange.from, end: dateRange.to }) : 
        dateRange.from ? transactionDate >= dateRange.from : true;
      
      const isClientSelected = selectedClients.length === 0 || 
        selectedClients.includes(transaction.client);
      
      return isInDateRange && isClientSelected;
    });
  }, [dateRange, selectedClients]);

  // Compute metrics
  const metrics = useMemo(() => {
    const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.revenue, 0);
    const totalCost = filteredTransactions.reduce((sum, t) => sum + t.cost, 0);
    const grossMargin = totalRevenue - totalCost;
    const marginPercentage = totalRevenue > 0 ? (grossMargin / totalRevenue) * 100 : 0;
    
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalCost: totalCost.toFixed(2),
      grossMargin: grossMargin.toFixed(2),
      marginPercentage: marginPercentage.toFixed(2)
    };
  }, [filteredTransactions]);

  // Prepare chart data grouped by month
  const chartData = useMemo(() => {
    const monthlyData: Record<string, { month: string, revenue: number, cost: number }> = {};
    
    filteredTransactions.forEach(transaction => {
      const date = parseISO(transaction.date);
      const monthKey = format(date, 'yyyy-MM');
      const monthLabel = format(date, 'MMM yyyy');
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthLabel, revenue: 0, cost: 0 };
      }
      
      monthlyData[monthKey].revenue += transaction.revenue;
      monthlyData[monthKey].cost += transaction.cost;
    });
    
    return Object.values(monthlyData);
  }, [filteredTransactions]);

  // Group transactions by client for the table
  const clientSummary = useMemo(() => {
    const summary: Record<string, { 
      client: string, 
      revenue: number, 
      cost: number,
      margin: number,
      marginPercentage: number 
    }> = {};
    
    filteredTransactions.forEach(transaction => {
      const { client, revenue, cost } = transaction;
      
      if (!summary[client]) {
        summary[client] = { client, revenue: 0, cost: 0, margin: 0, marginPercentage: 0 };
      }
      
      summary[client].revenue += revenue;
      summary[client].cost += cost;
    });
    
    // Calculate margin and percentage
    Object.values(summary).forEach(item => {
      item.margin = item.revenue - item.cost;
      item.marginPercentage = item.revenue > 0 ? (item.margin / item.revenue) * 100 : 0;
    });
    
    return Object.values(summary);
  }, [filteredTransactions]);

  const handleExportCSV = () => {
    console.log("Exporting CSV for Margin Report");
    // CSV export logic would go here
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for Margin Report");
    // PDF generation logic would go here
  };

  return (
    <FinancialReportCard
      title="Margin Report"
      description="Revenue vs. Cost analysis with margin calculations"
      showClientFilter={true}
      clients={uniqueClients}
      onDateRangeChange={setDateRange}
      onClientChange={setSelectedClients}
      onExportCSV={handleExportCSV}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</h4>
            <p className="text-2xl font-bold">£{metrics.totalRevenue}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Cost</h4>
            <p className="text-2xl font-bold">£{metrics.totalCost}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Gross Margin</h4>
            <p className="text-2xl font-bold">£{metrics.grossMargin}</p>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Margin %</h4>
            <p className="text-2xl font-bold">{metrics.marginPercentage}%</p>
          </div>
        </div>
        
        {/* Bar Chart */}
        <div className="h-80">
          <ChartContainer 
            config={{
              revenue: { color: "#8B5CF6" },
              cost: { color: "#EC4899" }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `£${value}`}
                  aria-label="Amount in GBP"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value: number) => `£${value.toFixed(2)}`}
                    />
                  }
                />
                <Legend />
                <Bar
                  name="Revenue"
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Cost"
                  dataKey="cost"
                  fill="var(--color-cost)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Data Table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Gross Margin</TableHead>
                <TableHead className="text-right">Margin %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientSummary.map((item) => (
                <TableRow key={item.client}>
                  <TableCell>{item.client}</TableCell>
                  <TableCell className="text-right">£{item.revenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">£{item.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">£{item.margin.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.marginPercentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FinancialReportCard>
  );
};
