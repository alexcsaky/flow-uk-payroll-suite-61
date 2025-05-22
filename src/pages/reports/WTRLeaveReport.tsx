import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, X, Search, AlertTriangle } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for Average Weekly Hours
const weeklyHoursData = {
  totalEmployees: 100,
  withinLimit: 92,
  exceedingLimit: 5,
  optOuts: 3,
  averageHours: 42.5,
};

const weeklyHoursTableData = [
  {
    employeeName: "John Smith",
    employeeId: "EMP001",
    department: "Engineering",
    avgWeeklyHours: 38.5,
    referencePeriod: "17 Weeks",
    status: "Within Limit",
  },
  {
    employeeName: "Sarah Johnson",
    employeeId: "EMP002",
    department: "Operations",
    avgWeeklyHours: 49.2,
    referencePeriod: "17 Weeks",
    status: "Exceeds Limit",
  },
  {
    employeeName: "Michael Brown",
    employeeId: "EMP003",
    department: "Sales",
    avgWeeklyHours: 45.0,
    referencePeriod: "17 Weeks",
    status: "Opt-out in Place",
  },
];

// Mock data for Night Worker Compliance
const nightWorkerData = {
  totalNightWorkers: 20,
  compliantWorkers: 18,
  nonCompliantWorkers: 2,
  averageNightHours: 7.5,
};

const nightWorkerTableData = [
  {
    employeeName: "Emma Wilson",
    employeeId: "EMP004",
    avgNightHours: 8.5,
    referencePeriod: "17 Weeks",
    status: "Compliant",
  },
  {
    employeeName: "David Lee",
    employeeId: "EMP005",
    department: "Operations",
    avgNightHours: 10.1,
    referencePeriod: "17 Weeks",
    status: "Non-Compliant",
  },
];

// Mock data for Rest Periods
const restPeriodsData = {
  dailyRestViolations: 3,
  weeklyRestViolations: 1,
  breakCompliance: 85,
  totalShifts: 150,
  shiftsWithBreaks: 128,
};

// Mock data for Leave Entitlement
const leaveEntitlementData = {
  totalAccrued: 2500,
  totalRemaining: 800,
  averageBalance: 8.5,
  distribution: {
    "0-5": 15,
    "5-10": 45,
    "10-15": 30,
    "15+": 10,
  },
};

const leaveEntitlementTableData = [
  {
    employeeName: "John Smith",
    holidayYear: "2025",
    statutoryEntitlement: "28 days",
    accrued: "150 hrs / 20 days",
    taken: "60 hrs / 8 days",
    remaining: "90 hrs / 12 days",
    notes: "Pro-rata",
  },
  {
    employeeName: "Sarah Johnson",
    holidayYear: "2025",
    statutoryEntitlement: "28 days",
    accrued: "224 hrs / 28 days",
    taken: "112 hrs / 14 days",
    remaining: "112 hrs / 14 days",
    notes: "Full-time",
  },
];

// Mock data for Estimated Annual Leave
const estimatedLeaveData = {
  totalEstimated: 3000,
  averageDays: 25,
  distribution: {
    "20": 10,
    "25": 45,
    "28": 35,
    "30+": 10,
  },
};

// Mock data for Holiday Activity
const holidayActivityData = {
  totalDaysTaken: 1500,
  carriedOverIn: 100,
  carriedOverOut: 50,
  totalEntitlement: 2800,
};

const WTRLeaveReport = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [holidayYear, setHolidayYear] = useState("2025");

  const handleExport = (section: string) => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`${section} exported successfully`);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Within Limit":
      case "Compliant":
        return "bg-green-100 text-green-800";
      case "Exceeds Limit":
      case "Non-Compliant":
        return "bg-red-100 text-red-800";
      case "Opt-out in Place":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Working Time & Leave Compliance Report</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of working time regulations and leave compliance
          </p>
        </div>
        <Button
          onClick={() => handleExport("Full Report")}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Full Report"}
        </Button>
      </div>

      {/* Warning Bar */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-sm"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  ⚠️ Warning: Potential WTR Breach! An employee is projected to exceed the 48-hour average weekly working limit for the current reference period.{" "}
                  <button
                    onClick={() => {
                      const element = document.getElementById("weekly-hours-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-medium underline hover:text-yellow-800"
                  >
                    View Details
                  </button>
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setShowWarning(false)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Global Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference Period</label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      {dateRange.from ? (
                        format(dateRange.from, "PPP")
                      ) : (
                        <span>From Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      {dateRange.to ? (
                        format(dateRange.to, "PPP")
                      ) : (
                        <span>To Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee</label>
              <Input
                placeholder="Search Employee..."
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Holiday Year</label>
              <Select value={holidayYear} onValueChange={setHolidayYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Clear Filters</Button>
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Average Weekly Working Hours */}
      <div id="weekly-hours-section">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Average Weekly Working Hours</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("Weekly Hours")}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees Monitored</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weeklyHoursData.totalEmployees}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Within 48-hr Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {weeklyHoursData.withinLimit} ({((weeklyHoursData.withinLimit / weeklyHoursData.totalEmployees) * 100).toFixed(1)}%)
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Exceeding 48-hr Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {weeklyHoursData.exceedingLimit} ({((weeklyHoursData.exceedingLimit / weeklyHoursData.totalEmployees) * 100).toFixed(1)}%)
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Opt-outs in Place</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{weeklyHoursData.optOuts}</div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Average Weekly Hours</TableHead>
                    <TableHead>Reference Period</TableHead>
                    <TableHead>Compliance Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyHoursTableData.map((row) => (
                    <TableRow key={row.employeeId}>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.employeeId}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.avgWeeklyHours} hrs</TableCell>
                      <TableCell>{row.referencePeriod}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(row.status)}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 2: Night Worker Compliance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Night Worker Compliance</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("Night Worker")}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Night Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{nightWorkerData.totalNightWorkers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliant Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nightWorkerData.compliantWorkers} ({((nightWorkerData.compliantWorkers / nightWorkerData.totalNightWorkers) * 100).toFixed(1)}%)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Non-Compliant Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {nightWorkerData.nonCompliantWorkers} ({((nightWorkerData.nonCompliantWorkers / nightWorkerData.totalNightWorkers) * 100).toFixed(1)}%)
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Average Night Hours</TableHead>
                  <TableHead>Reference Period</TableHead>
                  <TableHead>Compliance Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nightWorkerTableData.map((row) => (
                  <TableRow key={row.employeeId}>
                    <TableCell>{row.employeeName}</TableCell>
                    <TableCell>{row.employeeId}</TableCell>
                    <TableCell>{row.avgNightHours} hrs</TableCell>
                    <TableCell>{row.referencePeriod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(row.status)}>
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Rest Periods & Breaks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rest Periods & Breaks Compliance</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("Rest Periods")}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Rest Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{restPeriodsData.dailyRestViolations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Rest Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{restPeriodsData.weeklyRestViolations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Break Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{restPeriodsData.breakCompliance}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Violation Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell>Daily Rest</TableCell>
                  <TableCell>2025-03-15</TableCell>
                  <TableCell>Less than 11 hours between shifts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>Weekly Rest</TableCell>
                  <TableCell>2025-03-20</TableCell>
                  <TableCell>No 24-hour rest period in 7 days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Leave Entitlement & Accrual */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave Entitlement & Accrual</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("Leave Entitlement")}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Accrued Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveEntitlementData.totalAccrued} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Remaining Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveEntitlementData.totalRemaining} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveEntitlementData.averageBalance} days</div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Holiday Year</TableHead>
                  <TableHead>Statutory Entitlement</TableHead>
                  <TableHead>Accrued</TableHead>
                  <TableHead>Taken</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveEntitlementTableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.employeeName}</TableCell>
                    <TableCell>{row.holidayYear}</TableCell>
                    <TableCell>{row.statutoryEntitlement}</TableCell>
                    <TableCell>{row.accrued}</TableCell>
                    <TableCell>{row.taken}</TableCell>
                    <TableCell>{row.remaining}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Estimated Annual Leave */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Estimated Annual Leave</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("Estimated Leave")}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Estimated Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estimatedLeaveData.totalEstimated} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estimatedLeaveData.averageDays} days</div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Holiday Year</TableHead>
                  <TableHead>Total Estimated Annual Leave</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Smith</TableCell>
                  <TableCell>2025</TableCell>
                  <TableCell>28 days</TableCell>
                  <TableCell>Full-time equivalent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>2025</TableCell>
                  <TableCell>22.5 days</TableCell>
                  <TableCell>Pro-rata calculation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Holiday Activity & Carry-over */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Holiday Activity & Carry-over</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("Holiday Activity")}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Days Taken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{holidayActivityData.totalDaysTaken} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carried Over (In)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{holidayActivityData.carriedOverIn} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carried Over (Out)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{holidayActivityData.carriedOverOut} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Entitlement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{holidayActivityData.totalEntitlement} days</div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Days Taken</TableCell>
                  <TableCell>{holidayActivityData.totalDaysTaken}</TableCell>
                  <TableCell>{((holidayActivityData.totalDaysTaken / holidayActivityData.totalEntitlement) * 100).toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carried Over (In)</TableCell>
                  <TableCell>{holidayActivityData.carriedOverIn}</TableCell>
                  <TableCell>{((holidayActivityData.carriedOverIn / holidayActivityData.totalEntitlement) * 100).toFixed(1)}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carried Over (Out)</TableCell>
                  <TableCell>{holidayActivityData.carriedOverOut}</TableCell>
                  <TableCell>{((holidayActivityData.carriedOverOut / holidayActivityData.totalEntitlement) * 100).toFixed(1)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WTRLeaveReport; 