
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Approvals</h1>
          <p className="text-muted-foreground">
            Manage approval requests from your team
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pending Approvals</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="w-full md:w-[200px] pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="timesheet">Timesheets</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Requester</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="py-3 px-4">{request.type}</td>
                        <td className="py-3 px-4">{request.requester}</td>
                        <td className="py-3 px-4">{request.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-amber-500" />
                            <span className="text-amber-500">{request.status}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Review</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="timesheet" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Timesheet approval requests will appear here.
              </div>
            </TabsContent>
            <TabsContent value="expense" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Expense approval requests will appear here.
              </div>
            </TabsContent>
            <TabsContent value="leave" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
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
