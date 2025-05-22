import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Mock data for the report
const mockData = [
  {
    payRunId: "PR-2025-001",
    period: "May 2025",
    sspTotal: 5200.00,
    smpTotal: 8500.00,
    sppTotal: 3100.00,
  },
  {
    payRunId: "PR-2025-002",
    period: "June 2025",
    sspTotal: 4800.00,
    smpTotal: 9200.00,
    sppTotal: 2800.00,
  },
  {
    payRunId: "PR-2025-003",
    period: "July 2025",
    sspTotal: 5100.00,
    smpTotal: 7800.00,
    sppTotal: 3300.00,
  },
  {
    payRunId: "PR-2025-004",
    period: "August 2025",
    sspTotal: 4900.00,
    smpTotal: 8900.00,
    sppTotal: 2900.00,
  },
  {
    payRunId: "PR-2025-005",
    period: "September 2025",
    sspTotal: 5300.00,
    smpTotal: 8100.00,
    sppTotal: 3200.00,
  },
];

const StatutoryPayOverview = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate grand totals
  const grandTotals = mockData.reduce(
    (acc, row) => ({
      sspTotal: acc.sspTotal + row.sspTotal,
      smpTotal: acc.smpTotal + row.smpTotal,
      sppTotal: acc.sppTotal + row.sppTotal,
    }),
    { sspTotal: 0, smpTotal: 0, sppTotal: 0 }
  );

  const handleDownloadCSV = () => {
    setIsGenerating(true);
    
    // Simulate CSV generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Statutory Pay Report CSV generated successfully!",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Statutory Pay Overview Report</CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Filter Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">From Date</label>
                <div className="relative">
                  <Input type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">To Date</label>
                <div className="relative">
                  <Input type="date" className="pl-10" />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Filter by Pay Run ID</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Pay Run" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pay Runs</SelectItem>
                    {mockData.map((row) => (
                      <SelectItem key={row.payRunId} value={row.payRunId}>
                        {row.payRunId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Filter by Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ssp">SSP</SelectItem>
                    <SelectItem value="smp">SMP</SelectItem>
                    <SelectItem value="spp">SPP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button>Apply Filters</Button>
                <Button variant="outline">Clear Filters</Button>
              </div>
              
              <Button onClick={handleDownloadCSV} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Report Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Run ID / Period</TableHead>
                  <TableHead className="text-right">SSP Total</TableHead>
                  <TableHead className="text-right">SMP Total</TableHead>
                  <TableHead className="text-right">SPP Total</TableHead>
                  <TableHead className="text-right">Grand Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.payRunId}>
                    <TableCell className="font-medium">
                      {row.payRunId} / {row.period}
                    </TableCell>
                    <TableCell className="text-right">£{row.sspTotal.toFixed(2)}</TableCell>
                    <TableCell className="text-right">£{row.smpTotal.toFixed(2)}</TableCell>
                    <TableCell className="text-right">£{row.sppTotal.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-bold">
                      £{(row.sspTotal + row.smpTotal + row.sppTotal).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Grand Total Row */}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Overall Total</TableCell>
                  <TableCell className="text-right font-bold">£{grandTotals.sspTotal.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">£{grandTotals.smpTotal.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">£{grandTotals.sppTotal.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">
                    £{(grandTotals.sspTotal + grandTotals.smpTotal + grandTotals.sppTotal).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryPayOverview; 