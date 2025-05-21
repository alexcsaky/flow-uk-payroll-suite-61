import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, X } from "lucide-react";
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
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for the pay gap metrics
const payGapData = {
  meanPayGap: 15.3,
  medianPayGap: 12.1,
  meanBonusGap: 35.0,
  medianBonusGap: 28.5,
};

// Mock data for the bonus recipients chart
const bonusRecipientsData = [
  { name: "Men", value: 60 },
  { name: "Women", value: 40 },
];

// Mock data for the pay quartiles chart
const payQuartilesData = [
  {
    quartile: "Lower",
    men: 30,
    women: 70,
  },
  {
    quartile: "Lower Middle",
    men: 45,
    women: 55,
  },
  {
    quartile: "Upper Middle",
    men: 60,
    women: 40,
  },
  {
    quartile: "Upper",
    men: 75,
    women: 25,
  },
];

// Mock data for the detailed table
const mockTableData = [
  {
    id: "EMP001",
    gender: "M",
    hourlyPay: 25.50,
    bonusPaid: 2500,
    payQuartile: "Upper",
  },
  {
    id: "EMP002",
    gender: "F",
    hourlyPay: 22.75,
    bonusPaid: 2000,
    payQuartile: "Upper Middle",
  },
  {
    id: "EMP003",
    gender: "M",
    hourlyPay: 20.00,
    bonusPaid: 1500,
    payQuartile: "Lower Middle",
  },
  {
    id: "EMP004",
    gender: "F",
    hourlyPay: 18.50,
    bonusPaid: 0,
    payQuartile: "Lower",
  },
];

const COLORS = ["#0088FE", "#FF8042"];

export default function GPGRReport() {
  const [isExporting, setIsExporting] = useState(false);
  const [reportingYear, setReportingYear] = useState("2024-2025");
  const [department, setDepartment] = useState("all");
  const [employeeType, setEmployeeType] = useState("all");

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Gender Pay Gap Report exported successfully");
    }, 1500);
  };

  const handleClearFilters = () => {
    setReportingYear("2024-2025");
    setDepartment("all");
    setEmployeeType("all");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gender Pay Gap Report</h1>
          <p className="text-muted-foreground">
            UK Gender Pay Gap Reporting metrics and analysis
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="flow-gradient"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export to CSV"}
        </Button>
      </div>

      {/* Reporting Context */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Reporting Period</h3>
              <p className="text-2xl font-bold">2024-2025</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Snapshot Date</h3>
              <p className="text-2xl font-bold">April 5, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mean Gender Pay Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payGapData.meanPayGap}%</div>
            <p className="text-xs text-muted-foreground">Hourly Pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Median Gender Pay Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payGapData.medianPayGap}%</div>
            <p className="text-xs text-muted-foreground">Hourly Pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mean Gender Bonus Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payGapData.meanBonusGap}%</div>
            <p className="text-xs text-muted-foreground">Bonus Pay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Median Gender Bonus Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payGapData.medianBonusGap}%</div>
            <p className="text-xs text-muted-foreground">Bonus Pay</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Breakdowns */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Proportion of Employees Receiving a Bonus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bonusRecipientsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {bonusRecipientsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pay Quartiles Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={payQuartilesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quartile" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="men" name="Men" stackId="a" fill="#0088FE" />
                  <Bar dataKey="women" name="Women" stackId="a" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reporting Year</label>
              <Select value={reportingYear} onValueChange={setReportingYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2022-2023">2022-2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee Type</label>
              <Select value={employeeType} onValueChange={setEmployeeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
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

      {/* Detailed Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detailed Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Hourly Pay</TableHead>
                  <TableHead>Bonus Paid</TableHead>
                  <TableHead>Pay Quartile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTableData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>£{employee.hourlyPay.toFixed(2)}</TableCell>
                    <TableCell>£{employee.bonusPaid.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{employee.payQuartile}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 