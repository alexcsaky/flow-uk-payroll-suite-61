import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttachmentModal } from "@/components/timesheets/AttachmentModal";
import { AttachmentButton } from "@/components/timesheets/AttachmentButton";
import { LinkTimesheetModal } from "@/components/timesheets/LinkTimesheetModal";
import { Badge } from "@/components/ui/badge";

interface Timesheet {
  id: number;
  employee: string;
  date: string;
  hoursWorked: number;
  status: string;
  linkedPayRun?: string;
  isPendingNextRun?: boolean;
}

const Timesheets = () => {
  const [activeTab, setActiveTab] = useState("week");
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedTimesheetId, setSelectedTimesheetId] = useState<number | null>(null);
  const [timesheetAttachments, setTimesheetAttachments] = useState<Record<number, number>>({});
  
  // Sample timesheet data with linked pay run information
  const [timesheets, setTimesheets] = useState<Timesheet[]>([
    { id: 1, employee: "Jane Cooper", date: "2025-04-01", hoursWorked: 8, status: "Approved" },
    { id: 2, employee: "Wade Warren", date: "2025-04-01", hoursWorked: 7.5, status: "Pending" },
    { id: 3, employee: "Esther Howard", date: "2025-04-02", hoursWorked: 8, status: "Approved" },
    { id: 4, employee: "Cameron Williamson", date: "2025-04-02", hoursWorked: 6, status: "Pending" },
    { id: 5, employee: "Brooklyn Simmons", date: "2025-04-03", hoursWorked: 8, status: "Approved" },
  ]);

  const handleAttachmentClick = (timesheetId: number) => {
    setSelectedTimesheetId(timesheetId);
    setIsAttachmentModalOpen(true);
  };

  const handleAttachmentUpload = () => {
    if (selectedTimesheetId) {
      setTimesheetAttachments(prev => ({
        ...prev,
        [selectedTimesheetId]: (prev[selectedTimesheetId] || 0) + 1
      }));
    }
  };

  const handleViewClick = (timesheetId: number) => {
    setSelectedTimesheetId(timesheetId);
    setIsLinkModalOpen(true);
  };

  const handleLinkTimesheet = (payRunId: string) => {
    if (selectedTimesheetId) {
      setTimesheets(prev => prev.map(timesheet => {
        if (timesheet.id === selectedTimesheetId) {
          const isClosedPayRun = payRunId.includes("2025-04") || payRunId.includes("2025-03");
          return {
            ...timesheet,
            linkedPayRun: payRunId,
            isPendingNextRun: isClosedPayRun,
            status: isClosedPayRun ? "Pending Next Run" : "Linked"
          };
        }
        return timesheet;
      }));
    }
  };

  const getStatusBadge = (timesheet: Timesheet) => {
    if (timesheet.isPendingNextRun) {
      return (
        <Badge variant="warning" className="bg-amber-100 text-amber-800">
          Pending Next Run
        </Badge>
      );
    }
    if (timesheet.linkedPayRun) {
      return (
        <Badge variant="success" className="bg-green-100 text-green-800">
          Linked
        </Badge>
      );
    }
    return (
      <Badge variant={timesheet.status === "Approved" ? "success" : "warning"}>
        {timesheet.status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timesheets</h1>
          <p className="text-muted-foreground">
            Manage and track employee working hours
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Timesheets Overview</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search timesheets..."
                    className="w-full md:w-[200px] pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="week">
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <TabsContent value="day" className="mt-4">
                <div className="rounded-md border">
                  <div className="p-4">
                    Day view content
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="week" className="mt-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Employee</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Hours</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timesheets.map((timesheet) => (
                        <tr key={timesheet.id} className="border-b">
                          <td className="py-3 px-4">{timesheet.employee}</td>
                          <td className="py-3 px-4">{timesheet.date}</td>
                          <td className="py-3 px-4">{timesheet.hoursWorked}</td>
                          <td className="py-3 px-4">
                            {getStatusBadge(timesheet)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewClick(timesheet.id)}
                              >
                                View
                              </Button>
                              <AttachmentButton
                                count={timesheetAttachments[timesheet.id]}
                                onClick={() => handleAttachmentClick(timesheet.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="month" className="mt-4">
                <div className="rounded-md border">
                  <div className="p-4">
                    Month view content
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Summary</CardTitle>
              <CardDescription>Overview of timesheet stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-blue-50">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Employees</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-50">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours This Week</p>
                  <p className="text-2xl font-bold">836</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-amber-50">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="text-sm">
                  <span className="font-medium">Jane Cooper</span>
                  <span className="text-muted-foreground"> submitted timesheet</span>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Alex Johnson</span>
                  <span className="text-muted-foreground"> approved 5 timesheets</span>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </li>
                <li className="text-sm">
                  <span className="font-medium">Sarah Miller</span>
                  <span className="text-muted-foreground"> updated hours for April 2</span>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <AttachmentModal
        isOpen={isAttachmentModalOpen}
        onClose={() => setIsAttachmentModalOpen(false)}
        onUpload={handleAttachmentUpload}
      />

      <LinkTimesheetModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        timesheetId={selectedTimesheetId || 0}
        timesheetDate={timesheets.find(t => t.id === selectedTimesheetId)?.date || ""}
        onLink={handleLinkTimesheet}
      />
    </div>
  );
};

export default Timesheets;
