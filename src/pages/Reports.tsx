import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, Filter, PieChart, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportTypeSelectModal } from "@/components/reports/ReportTypeSelectModal";
import { ReportFilterModal } from "@/components/reports/ReportFilterModal";
import { MockReportDisplay } from "@/components/reports/MockReportDisplay";

const REPORT_CARD_MAP = [
  {
    key: "Payroll Report",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Payroll Reports",
    desc: "View payroll and tax reports",
    filterName: "Payroll Report"
  },
  {
    key: "Employee Report",
    icon: <FileText className="h-5 w-5" />,
    title: "Employee Reports",
    desc: "View employee statistics",
    filterName: "Employee Report"
  },
  {
    key: "Financial Report",
    icon: <PieChart className="h-5 w-5" />,
    title: "Financial Reports",
    desc: "View financial statistics",
    filterName: "Financial Report"
  },
];

const Reports = () => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedReportName, setSelectedReportName] = useState<string | null>(null);
  const [showMockReport, setShowMockReport] = useState(false);

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
          <Button className="flow-gradient" onClick={() => setShowTypeModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REPORT_CARD_MAP.map((card) => (
          <Card key={card.key}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {card.icon}
                {card.title}
              </CardTitle>
              <CardDescription>{card.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => handleGenerateReport(card.filterName)}>
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

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

      <ReportTypeSelectModal
        open={showTypeModal}
        onOpenChange={setShowTypeModal}
        onSelect={(type) => {
          setSelectedReportName(type);
          setShowFilterModal(true);
        }}
      />
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
