
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  XCircle,
  Download,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Approvals = () => {
  // Sample approval requests data
  const approvalRequests = [
    { id: 1, type: "Timesheet", requester: "Jane Cooper", date: "2025-04-01", status: "Pending" },
    { id: 2, type: "Expense", requester: "Wade Warren", date: "2025-04-01", status: "Pending" },
    { id: 3, type: "Leave", requester: "Esther Howard", date: "2025-04-02", status: "Pending" },
    { id: 4, type: "Timesheet", requester: "Cameron Williamson", date: "2025-04-03", status: "Pending" },
    { id: 5, type: "Expense", requester: "Brooklyn Simmons", date: "2025-04-03", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Approvals</h1>
          <p className="text-muted-foreground mt-1">
            Manage approval requests from your team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <CardHeader className="bg-white px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-medium">Pending Approvals</CardTitle>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="w-full md:w-[250px] pl-8 h-9 border-muted"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b px-6">
              <TabsList className="bg-transparent -mb-px">
                <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-paycircle data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none">All</TabsTrigger>
                <TabsTrigger value="timesheet" className="data-[state=active]:border-b-2 data-[state=active]:border-paycircle data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none">Timesheets</TabsTrigger>
                <TabsTrigger value="expense" className="data-[state=active]:border-b-2 data-[state=active]:border-paycircle data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none">Expenses</TabsTrigger>
                <TabsTrigger value="leave" className="data-[state=active]:border-b-2 data-[state=active]:border-paycircle data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none">Leave</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0">
              <div className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-amber-500" />
                            <span className="text-amber-500">{request.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                  Actions
                                  <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                  <span>Approve</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                  <span>Decline</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Search className="h-4 w-4 mr-2" />
                                  <span>View details</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="timesheet" className="m-0 p-4">
              <div className="text-sm text-muted-foreground">
                Timesheet approval requests will appear here.
              </div>
            </TabsContent>
            <TabsContent value="expense" className="m-0 p-4">
              <div className="text-sm text-muted-foreground">
                Expense approval requests will appear here.
              </div>
            </TabsContent>
            <TabsContent value="leave" className="m-0 p-4">
              <div className="text-sm text-muted-foreground">
                Leave approval requests will appear here.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Approvals;
