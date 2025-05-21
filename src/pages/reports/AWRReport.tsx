import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, X, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock data for the summary statistics
const summaryData = {
  totalWorkers: 150,
  compliantWorkers: 120,
  approachingWorkers: 15,
  nonCompliantWorkers: 5,
  averagePayDiscrepancy: 1.50,
  endingAssignments: 8,
};

// Mock data for the AWR table
const mockAWRData = [
  {
    id: "AWR001",
    workerName: "John Smith",
    workerId: "W12345",
    clientName: "Acme Corp",
    role: "Software Developer",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    weeksWorked: 8,
    qualifyingDate: "2024-04-08",
    actualPayRate: 25.00,
    comparablePayRate: 26.50,
    payDifference: 1.50,
    status: "Approaching",
    notes: "Regular performance reviews completed",
  },
  {
    id: "AWR002",
    workerName: "Sarah Johnson",
    workerId: "W12346",
    clientName: "TechStart Ltd",
    role: "UX Designer",
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    weeksWorked: 12,
    qualifyingDate: "2024-02-23",
    actualPayRate: 28.00,
    comparablePayRate: 28.00,
    payDifference: 0.00,
    status: "Compliant",
    notes: "Qualified for equal treatment",
  },
  {
    id: "AWR003",
    workerName: "Michael Brown",
    workerId: "W12347",
    clientName: "Global Solutions",
    role: "Project Manager",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    weeksWorked: 4,
    qualifyingDate: "2024-04-25",
    actualPayRate: 35.00,
    comparablePayRate: 38.00,
    payDifference: 3.00,
    status: "Non-Compliant",
    notes: "Pay adjustment required",
  },
  {
    id: "AWR004",
    workerName: "Emma Wilson",
    workerId: "W12348",
    clientName: "Innovate Inc",
    role: "Business Analyst",
    startDate: "2024-01-01",
    endDate: "2024-04-01",
    weeksWorked: 10,
    qualifyingDate: "2024-03-25",
    actualPayRate: 30.00,
    comparablePayRate: 30.00,
    payDifference: 0.00,
    status: "Approaching",
    notes: "Performance review pending",
  },
  {
    id: "AWR005",
    workerName: "David Lee",
    workerId: "W12349",
    clientName: "Future Systems",
    role: "DevOps Engineer",
    startDate: "2023-11-01",
    endDate: "2024-02-01",
    weeksWorked: 12,
    qualifyingDate: "2024-01-24",
    actualPayRate: 32.00,
    comparablePayRate: 32.00,
    payDifference: 0.00,
    status: "Compliant",
    notes: "Qualified for equal treatment",
  },
];

const AWRReport = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      toast.success("AWR Report exported successfully");
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800";
      case "Non-Compliant":
        return "bg-red-100 text-red-800";
      case "Approaching":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredData = mockAWRData.filter((item) => {
    const matchesSearch = item.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesClient = clientFilter === "all" || item.clientName === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AWR Compliance Report</h1>
          <p className="text-muted-foreground">
            Monitor and manage Agency Workers Regulations compliance
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Report"}
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agency Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalWorkers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData.compliantWorkers} ({((summaryData.compliantWorkers / summaryData.totalWorkers) * 100).toFixed(1)}%)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approaching 12 Weeks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.approachingWorkers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Compliant Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryData.nonCompliantWorkers} ({((summaryData.nonCompliantWorkers / summaryData.totalWorkers) * 100).toFixed(1)}%)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Pay Discrepancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{summaryData.averagePayDiscrepancy}/hour</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ending Soon (2 weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.endingAssignments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client</label>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                  <SelectItem value="TechStart Ltd">TechStart Ltd</SelectItem>
                  <SelectItem value="Global Solutions">Global Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Worker</label>
              <Input placeholder="Search worker..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Compliance Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Compliant">Compliant</SelectItem>
                  <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                  <SelectItem value="Approaching">Approaching</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Software Developer">Software Developer</SelectItem>
                  <SelectItem value="UX Designer">UX Designer</SelectItem>
                  <SelectItem value="Project Manager">Project Manager</SelectItem>
                  <SelectItem value="Business Analyst">Business Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            <Button size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AWR Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker Name</TableHead>
                  <TableHead>Worker ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Weeks</TableHead>
                  <TableHead>Qualifying Date</TableHead>
                  <TableHead>Actual Pay</TableHead>
                  <TableHead>Comparable Pay</TableHead>
                  <TableHead>Difference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.workerName}</TableCell>
                    <TableCell>{worker.workerId}</TableCell>
                    <TableCell>{worker.clientName}</TableCell>
                    <TableCell>{worker.role}</TableCell>
                    <TableCell>{worker.startDate}</TableCell>
                    <TableCell>{worker.endDate}</TableCell>
                    <TableCell>{worker.weeksWorked}</TableCell>
                    <TableCell>{worker.qualifyingDate}</TableCell>
                    <TableCell>£{worker.actualPayRate.toFixed(2)}</TableCell>
                    <TableCell>£{worker.comparablePayRate.toFixed(2)}</TableCell>
                    <TableCell>£{worker.payDifference.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(worker.status)}>
                        {worker.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{worker.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AWRReport; 