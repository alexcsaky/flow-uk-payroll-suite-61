
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock payroll data
  const payrollHistory = [
    {
      id: "PR-2025-001",
      date: "Apr 25, 2025",
      employees: 146,
      totalAmount: "£287,500",
      status: "scheduled",
    },
    {
      id: "PR-2025-002",
      date: "Mar 25, 2025",
      employees: 145,
      totalAmount: "£285,200",
      status: "completed",
    },
    {
      id: "PR-2025-003",
      date: "Feb 25, 2025",
      employees: 142,
      totalAmount: "£280,100",
      status: "completed",
    },
    {
      id: "PR-2025-004",
      date: "Jan 25, 2025",
      employees: 140,
      totalAmount: "£275,800",
      status: "completed",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Payroll Run
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="upcoming">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Next Payroll Run</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <div className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Run Date</p>
                        <p className="text-lg font-semibold">April 25, 2025</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Employees</p>
                        <p className="text-lg font-semibold">146</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                        <p className="text-lg font-semibold">£287,500</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <Button>Process Payroll</Button>
                      <Button variant="outline">Preview</Button>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
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
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr className="text-left">
                          <th className="px-4 py-3 text-sm font-medium">Run ID</th>
                          <th className="px-4 py-3 text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-sm font-medium">Employees</th>
                          <th className="px-4 py-3 text-sm font-medium">Total Amount</th>
                          <th className="px-4 py-3 text-sm font-medium">Status</th>
                          <th className="px-4 py-3 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollHistory.map((run) => (
                          <tr key={run.id} className="border-t">
                            <td className="px-4 py-3 text-sm">{run.id}</td>
                            <td className="px-4 py-3 text-sm">{run.date}</td>
                            <td className="px-4 py-3 text-sm">{run.employees}</td>
                            <td className="px-4 py-3 text-sm">{run.totalAmount}</td>
                            <td className="px-4 py-3 text-sm">
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
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Payment Schedule</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure your payment frequency and schedule
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Tax Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your tax settings and compliance
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up how employees will receive their pay
                    </p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Approval Workflow</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure payroll approval steps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Payroll;
