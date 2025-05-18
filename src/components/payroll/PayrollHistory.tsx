
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export const PayrollHistory: React.FC = () => {
  // Mock payroll data with additional fields
  const payrollHistory = [
    {
      id: "PR-2025-001",
      date: "Apr 25, 2025",
      employees: 146,
      totalAmount: "£287,500",
      status: "scheduled",
      client: "Acme Corporation",
      venue: "Corporate HQ",
      weekEnding: "Apr 26, 2025",
      poNumber: "PO-2025-ACM-001"
    },
    {
      id: "PR-2025-002",
      date: "Mar 25, 2025",
      employees: 145,
      totalAmount: "£285,200",
      status: "completed",
      client: "Wayne Enterprises",
      venue: "Downtown Office",
      weekEnding: "Mar 26, 2025",
      poNumber: "PO-2025-WAY-002"
    },
    {
      id: "PR-2025-003",
      date: "Feb 25, 2025",
      employees: 142,
      totalAmount: "£280,100",
      status: "completed",
      client: "Stark Industries",
      venue: "Factory",
      weekEnding: "Feb 26, 2025",
      poNumber: "PO-2025-STK-003"
    },
    {
      id: "PR-2025-004",
      date: "Jan 25, 2025",
      employees: 140,
      totalAmount: "£275,800",
      status: "completed",
      client: "Umbrella Corp",
      venue: "Warehouse",
      weekEnding: "Jan 26, 2025",
      poNumber: "PO-2025-UMB-004"
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payroll History</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payroll runs..."
              className="w-full pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Runs</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Scheduled</DropdownMenuItem>
              <DropdownMenuItem>Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Week Ending</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollHistory.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.id}</TableCell>
                  <TableCell>{run.date}</TableCell>
                  <TableCell>{run.client}</TableCell>
                  <TableCell>{run.venue}</TableCell>
                  <TableCell>{run.weekEnding}</TableCell>
                  <TableCell>{run.poNumber}</TableCell>
                  <TableCell>{run.employees}</TableCell>
                  <TableCell>{run.totalAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        run.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : run.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
