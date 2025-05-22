import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ReportFilterModal } from "@/components/reports/ReportFilterModal";
import { MockReportDisplay } from "@/components/reports/MockReportDisplay";
import { useNavigate } from "react-router-dom";

const REPORT_TYPES = [
  {
    name: "Working Time & Leave Compliance Report",
    description: "View working time regulations and leave compliance metrics",
    path: "/reports/wtr-leave-report",
    category: "Compliance"
  },
  {
    name: "AWR Compliance Report",
    description: "View AWR compliance metrics",
    path: "/reports/awr",
    category: "Compliance"
  },
  {
    name: "Gender Pay Gap Report",
    description: "View gender pay gap analysis",
    path: "/reports/gpgr",
    category: "Compliance"
  },
  {
    name: "Statutory Pay Overview",
    description: "View statutory pay statistics",
    path: "/reports/statutory-pay-overview",
    category: "Compliance"
  },
  {
    name: "Pensions Report",
    description: "Manage NEST pension contributions and member updates",
    path: "/reports/pensions",
    category: "Payroll"
  },
  {
    name: "General Payroll Summary",
    description: "View payroll and tax reports",
    path: "/reports/payroll-summary",
    category: "Payroll"
  },
  {
    name: "Tax Withholding Report",
    description: "View tax withholding details",
    path: "/reports/tax-withholding",
    category: "Payroll"
  },
  {
    name: "Employee Demographics",
    description: "View employee statistics",
    path: "/reports/employee-demographics",
    category: "HR"
  },
  {
    name: "Time Off Accrual",
    description: "View time off and leave balances",
    path: "/reports/time-off",
    category: "HR"
  },
  {
    name: "Benefit Utilization",
    description: "View benefits usage and costs",
    path: "/reports/benefits",
    category: "HR"
  },
  {
    name: "Detailed Financial Overview",
    description: "View financial statistics",
    path: "/reports/financial-overview",
    category: "Finance"
  }
];

const Reports = () => {
  const navigate = useNavigate();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedReportName, setSelectedReportName] = useState<string | null>(null);
  const [showMockReport, setShowMockReport] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Sample report data
  const reports = [
    { id: 1, name: "Payroll Summary - Q1 2025", type: "Payroll", date: "2025-04-01", format: "PDF" },
    { id: 2, name: "Employee Hours - March 2025", type: "Timesheet", date: "2025-04-01", format: "Excel" },
    { id: 3, name: "Department Expenses", type: "Finance", date: "2025-03-25", format: "PDF" },
    { id: 4, name: "New Hire Report", type: "HR", date: "2025-03-20", format: "Excel" },
    { id: 5, name: "Tax Documents - Q1", type: "Finance", date: "2025-03-15", format: "PDF" },
  ];

  const handleGenerateReport = (reportName: string) => {
    setSelectedReportName(reportName);
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    setShowMockReport(true);
  };

  const handleReportSelect = (report: typeof REPORT_TYPES[0]) => {
    navigate(report.path);
    setSearchOpen(false);
    setSearchValue("");
  };

  // Group reports by category
  const groupedReports = REPORT_TYPES.reduce((acc, report) => {
    if (!acc[report.category]) {
      acc[report.category] = [];
    }
    acc[report.category].push(report);
    return acc;
  }, {} as Record<string, typeof REPORT_TYPES>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and access insights for your business
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Dynamic Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={searchOpen}
                className="w-full justify-between h-12"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  {searchValue ? searchValue : "Search for a report..."}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command className="w-full">
                <CommandInput 
                  placeholder="Search reports..." 
                  className="h-9"
                />
                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No reports found.</CommandEmpty>
                  {Object.entries(groupedReports).map(([category, reports], index) => (
                    <React.Fragment key={category}>
                      {index > 0 && <CommandSeparator />}
                      <CommandGroup heading={category}>
                        {reports.map((report) => (
                          <CommandItem
                            key={report.name}
                            value={report.name}
                            onSelect={() => handleReportSelect(report)}
                            className="flex flex-col items-start py-3 px-2"
                          >
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {report.description}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </React.Fragment>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Report History</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="payroll">Payroll</SelectItem>
                <SelectItem value="timesheet">Timesheet</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Type</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Format</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="py-3 px-4">{report.name}</td>
                    <td className="py-3 px-4">{report.type}</td>
                    <td className="py-3 px-4">{report.date}</td>
                    <td className="py-3 px-4">{report.format}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ReportFilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        reportName={selectedReportName || "Report"}
        onApply={handleApplyFilters}
      />
      {showMockReport && selectedReportName && (
        <MockReportDisplay reportName={selectedReportName} />
      )}
    </div>
  );
};

export default Reports;
