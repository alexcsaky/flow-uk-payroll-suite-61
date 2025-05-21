import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, Mail, Lock, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { PayrollFilters } from "./PayrollFilters";
import { format, isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { ResendPayslipsModal } from "./ResendPayslipsModal";

export const PayrollHistory: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResendModal, setShowResendModal] = useState(false);
  const [payrollLockStatus, setPayrollLockStatus] = useState<Record<string, boolean>>({
    "PR-2025-001": false, // Open
    "PR-2025-002": true,  // Locked
  });
  
  // Filter states
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [weekEndingDate, setWeekEndingDate] = useState<Date | undefined>(undefined);
  const [poNumber, setPoNumber] = useState("");

  // Mock payroll data with additional fields
  const allPayrollHistory = [
    {
      id: "PR-2025-001",
      date: "2025-04-25",
      employees: 146,
      totalAmount: "£287,500",
      status: "scheduled",
      client: "Acme Corporation",
      venue: "Corporate HQ",
      weekEnding: "2025-04-26",
      poNumber: "PO-2025-ACM-001"
    },
    {
      id: "PR-2025-002",
      date: "2025-03-25",
      employees: 145,
      totalAmount: "£285,200",
      status: "completed",
      client: "Wayne Enterprises",
      venue: "Downtown Office",
      weekEnding: "2025-03-26",
      poNumber: "PO-2025-WAY-002"
    },
    {
      id: "PR-2025-003",
      date: "2025-02-25",
      employees: 142,
      totalAmount: "£280,100",
      status: "completed",
      client: "Stark Industries",
      venue: "Factory",
      weekEnding: "2025-02-26",
      poNumber: "PO-2025-STK-003"
    },
    {
      id: "PR-2025-004",
      date: "2025-01-25",
      employees: 140,
      totalAmount: "£275,800",
      status: "completed",
      client: "Umbrella Corp",
      venue: "Warehouse",
      weekEnding: "2025-01-26",
      poNumber: "PO-2025-UMB-004"
    },
    // Additional mock data
    {
      id: "PR-2025-005",
      date: "2025-04-18",
      employees: 143,
      totalAmount: "£284,100",
      status: "completed",
      client: "Acme Corporation",
      venue: "Branch Office",
      weekEnding: "2025-04-19",
      poNumber: "PO-2025-ACM-002"
    },
    {
      id: "PR-2025-006",
      date: "2025-04-11",
      employees: 147,
      totalAmount: "£290,300",
      status: "completed",
      client: "Wayne Enterprises",
      venue: "Research Lab",
      weekEnding: "2025-04-12",
      poNumber: "PO-2025-WAY-003"
    },
    {
      id: "PR-2025-007",
      date: "2025-03-28",
      employees: 144,
      totalAmount: "£283,500",
      status: "completed",
      client: "Stark Industries",
      venue: "Corporate HQ",
      weekEnding: "2025-03-29",
      poNumber: "PO-2025-STK-004"
    },
    {
      id: "PR-2025-008",
      date: "2025-03-21",
      employees: 142,
      totalAmount: "£281,900",
      status: "completed",
      client: "Umbrella Corp",
      venue: "Laboratory",
      weekEnding: "2025-03-22",
      poNumber: "PO-2025-UMB-005"
    },
    {
      id: "PR-2025-009",
      date: "2025-03-14",
      employees: 145,
      totalAmount: "£286,700",
      status: "completed",
      client: "LexCorp",
      venue: "Headquarters",
      weekEnding: "2025-03-15",
      poNumber: "PO-2025-LEX-001"
    },
    {
      id: "PR-2025-010",
      date: "2025-03-07",
      employees: 148,
      totalAmount: "£291,200",
      status: "completed",
      client: "LexCorp",
      venue: "Research Center",
      weekEnding: "2025-03-08",
      poNumber: "PO-2025-LEX-002"
    },
    {
      id: "PR-2025-011",
      date: "2025-02-28",
      employees: 141,
      totalAmount: "£277,400",
      status: "completed",
      client: "Oscorp",
      venue: "Main Office",
      weekEnding: "2025-03-01",
      poNumber: "PO-2025-OSC-001"
    },
    {
      id: "PR-2025-012",
      date: "2025-02-21",
      employees: 143,
      totalAmount: "£282,600",
      status: "completed",
      client: "Oscorp",
      venue: "Testing Facility",
      weekEnding: "2025-02-22",
      poNumber: "PO-2025-OSC-002"
    }
  ];

  // Apply filters to payroll data
  const filteredPayrollHistory = useMemo(() => {
    return allPayrollHistory.filter((run) => {
      // Search filter
      if (searchTerm && 
          !run.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !run.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !run.poNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Client filter
      if (selectedClient && run.client !== selectedClient) {
        return false;
      }
      
      // Venue filter
      if (selectedVenue && run.venue !== selectedVenue) {
        return false;
      }
      
      // Date range filter
      if (dateRange.from && dateRange.to) {
        const runDate = parseISO(run.date);
        if (!isWithinInterval(runDate, { start: dateRange.from, end: dateRange.to })) {
          return false;
        }
      }
      
      // Week ending date filter
      if (weekEndingDate) {
        const weekEnd = parseISO(run.weekEnding);
        const formattedWeekEndingDate = format(weekEndingDate, 'yyyy-MM-dd');
        const formattedRunWeekEnding = format(weekEnd, 'yyyy-MM-dd');
        
        if (formattedWeekEndingDate !== formattedRunWeekEnding) {
          return false;
        }
      }
      
      // PO Number filter
      if (poNumber && !run.poNumber.toLowerCase().includes(poNumber.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [searchTerm, selectedClient, selectedVenue, dateRange, weekEndingDate, poNumber, allPayrollHistory]);

  // Extract unique clients and venues for filters
  const clients = [...new Set(allPayrollHistory.map(run => run.client))];
  const venues = [...new Set(allPayrollHistory.map(run => run.venue))];

  // Handle filter application
  const handleApplyFilters = (filters: {
    client: string | null;
    venue: string | null;
    dateRange: DateRange;
    weekEndingDate: Date | undefined;
    poNumber: string;
  }) => {
    setSelectedClient(filters.client);
    setSelectedVenue(filters.venue);
    setDateRange(filters.dateRange);
    setWeekEndingDate(filters.weekEndingDate);
    setPoNumber(filters.poNumber);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedClient(null);
    setSelectedVenue(null);
    setDateRange({ from: undefined, to: undefined });
    setWeekEndingDate(undefined);
    setPoNumber("");
    setSearchTerm("");
  };

  const togglePayrollLock = (payrollId: string) => {
    setPayrollLockStatus(prev => ({
      ...prev,
      [payrollId]: !prev[payrollId]
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payroll History</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowResendModal(true)}
              >
                <Mail className="h-4 w-4" />
                Manual Payslip Resend
              </Button>
              <Button
                variant={showFilters ? "secondary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by ID, client, or PO number..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <PayrollFilters
                clients={clients}
                venues={venues}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            )}

            {/* Payroll history table */}
            <div className="rounded-md border">
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
                    <TableHead>Lock Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayrollHistory.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell className="font-medium">{run.id}</TableCell>
                      <TableCell>{format(parseISO(run.date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{run.client}</TableCell>
                      <TableCell>{run.venue}</TableCell>
                      <TableCell>{format(parseISO(run.weekEnding), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{run.poNumber}</TableCell>
                      <TableCell>{run.employees}</TableCell>
                      <TableCell>{run.totalAmount}</TableCell>
                      <TableCell>{run.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePayrollLock(run.id)}
                          className="flex items-center gap-1"
                        >
                          {payrollLockStatus[run.id] ? (
                            <Lock className="h-4 w-4 text-red-500" />
                          ) : (
                            <Unlock className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-xs">
                            {payrollLockStatus[run.id] ? "Locked" : "Open"}
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <ResendPayslipsModal
        open={showResendModal}
        onOpenChange={setShowResendModal}
      />
    </div>
  );
};
