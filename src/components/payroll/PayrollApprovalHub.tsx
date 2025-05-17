
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Clock, 
  Check, 
  X, 
  User, 
  Users, 
  Banknote, 
  Briefcase,
  AlertCircle,
  ArrowRightCircle,
  FileText,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ApprovalSteps } from "./ApprovalSteps";

// Types for our approval workflow
export type ApprovalStatus = 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "in_review" 
  | "not_started";

export type ApproverRole = 
  | "payroll_manager" 
  | "hr" 
  | "finance_manager" 
  | "managing_director";

export type ApproverInfo = {
  role: ApproverRole;
  name: string;
  status: ApprovalStatus;
  comments?: string;
  dateReviewed?: string;
};

export type PayrollApproval = {
  id: string;
  runId: string;
  runDate: string;
  amount: string;
  employees: number;
  status: "draft" | "in_approval" | "approved" | "rejected" | "processing" | "completed";
  currentApprover: ApproverRole;
  approvers: ApproverInfo[];
};

// Mock approval data
const mockApprovalData: PayrollApproval[] = [
  {
    id: "APR-2025-001",
    runId: "PR-2025-001",
    runDate: "Apr 25, 2025",
    amount: "£287,500",
    employees: 146,
    status: "in_approval",
    currentApprover: "hr",
    approvers: [
      {
        role: "payroll_manager",
        name: "John Smith",
        status: "approved",
        comments: "All calculations verified",
        dateReviewed: "2025-04-20T14:30:00Z"
      },
      {
        role: "hr",
        name: "Sarah Johnson",
        status: "in_review",
        comments: "",
      },
      {
        role: "finance_manager",
        name: "Michael Brown",
        status: "not_started",
      },
      {
        role: "managing_director",
        name: "Elizabeth Davies",
        status: "not_started",
      }
    ]
  },
  {
    id: "APR-2025-002",
    runId: "PR-2025-002",
    runDate: "Mar 25, 2025",
    amount: "£285,200",
    employees: 145,
    status: "rejected",
    currentApprover: "payroll_manager",
    approvers: [
      {
        role: "payroll_manager",
        name: "John Smith",
        status: "in_review",
        comments: "Updating after rejection",
      },
      {
        role: "hr",
        name: "Sarah Johnson",
        status: "rejected",
        comments: "3 employees with incorrect tax codes",
        dateReviewed: "2025-03-22T09:15:00Z"
      },
      {
        role: "finance_manager",
        name: "Michael Brown",
        status: "not_started",
      },
      {
        role: "managing_director",
        name: "Elizabeth Davies",
        status: "not_started",
      }
    ]
  },
  {
    id: "APR-2025-003",
    runId: "PR-2025-003",
    runDate: "Feb 25, 2025",
    amount: "£280,100",
    employees: 142,
    status: "approved",
    currentApprover: "managing_director",
    approvers: [
      {
        role: "payroll_manager",
        name: "John Smith",
        status: "approved",
        comments: "All calculations verified",
        dateReviewed: "2025-02-20T11:30:00Z"
      },
      {
        role: "hr",
        name: "Sarah Johnson",
        status: "approved",
        comments: "All employee details verified",
        dateReviewed: "2025-02-21T14:45:00Z"
      },
      {
        role: "finance_manager",
        name: "Michael Brown",
        status: "approved",
        comments: "Budget verified",
        dateReviewed: "2025-02-22T10:15:00Z"
      },
      {
        role: "managing_director",
        name: "Elizabeth Davies",
        status: "approved",
        comments: "Approved for processing",
        dateReviewed: "2025-02-23T16:30:00Z"
      }
    ]
  }
];

// Helper function to get status badge styling
const getStatusBadge = (status: PayrollApproval['status']) => {
  switch (status) {
    case "draft":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>;
    case "in_approval":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Approval</Badge>;
    case "approved":
      return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
    case "processing":
      return <Badge variant="outline" className="bg-purple-100 text-purple-800">Processing</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Get icon for approver role
const getRoleIcon = (role: ApproverRole) => {
  switch (role) {
    case "payroll_manager":
      return <User className="h-4 w-4" />;
    case "hr":
      return <Users className="h-4 w-4" />;
    case "finance_manager":
      return <Banknote className="h-4 w-4" />;
    case "managing_director":
      return <Briefcase className="h-4 w-4" />;
  }
};

// Format role name for display
const formatRoleName = (role: ApproverRole) => {
  switch (role) {
    case "payroll_manager":
      return "Payroll Manager";
    case "hr":
      return "HR";
    case "finance_manager":
      return "Finance Manager";
    case "managing_director":
      return "Managing Director";
  }
};

export const PayrollApprovalHub: React.FC = () => {
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollApproval | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Payroll Approval Hub</CardTitle>
          <CardDescription>
            Track and manage the approval process for payroll runs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payroll Run</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Approver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApprovalData.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="font-medium">{approval.runId}</TableCell>
                    <TableCell>{approval.runDate}</TableCell>
                    <TableCell>{approval.amount}</TableCell>
                    <TableCell>{approval.employees}</TableCell>
                    <TableCell>{getStatusBadge(approval.status)}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      {getRoleIcon(approval.currentApprover)}
                      <span>{formatRoleName(approval.currentApprover)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setSelectedPayroll(approval)}
                        >
                          <Eye className="h-4 w-4" />
                          Details
                        </Button>
                        {approval.status === "approved" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                          >
                            <ArrowRightCircle className="h-4 w-4" />
                            Process
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedPayroll && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Approval Details: {selectedPayroll.runId}</CardTitle>
              <CardDescription>
                {selectedPayroll.runDate} • {selectedPayroll.amount} • {selectedPayroll.employees} employees
              </CardDescription>
            </div>
            {selectedPayroll.status === "rejected" && (
              <Alert className="w-auto border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Requires attention</AlertTitle>
                <AlertDescription>
                  This payroll run has been rejected and needs corrections
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <ApprovalSteps payroll={selectedPayroll} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Approval History</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Approver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Date Reviewed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedPayroll.approvers.map((approver, index) => (
                      <TableRow key={index}>
                        <TableCell className="flex items-center gap-2">
                          {getRoleIcon(approver.role)}
                          {formatRoleName(approver.role)}
                        </TableCell>
                        <TableCell>{approver.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {approver.status === "pending" && <Clock className="h-4 w-4 text-amber-500" />}
                            {approver.status === "approved" && <Check className="h-4 w-4 text-green-500" />}
                            {approver.status === "rejected" && <X className="h-4 w-4 text-red-500" />}
                            {approver.status === "in_review" && <Clock className="h-4 w-4 text-blue-500" />}
                            {approver.status === "not_started" && <Clock className="h-4 w-4 text-gray-300" />}
                            <span className={`
                              ${approver.status === "approved" && "text-green-700"}
                              ${approver.status === "rejected" && "text-red-700"}
                              ${approver.status === "in_review" && "text-blue-700"}
                              ${approver.status === "pending" && "text-amber-700"}
                              ${approver.status === "not_started" && "text-gray-400"}
                            `}>
                              {approver.status === "in_review" 
                                ? "In Review" 
                                : approver.status === "not_started" 
                                  ? "Not Started"
                                  : approver.status.charAt(0).toUpperCase() + approver.status.slice(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{approver.comments || "—"}</TableCell>
                        <TableCell>{approver.dateReviewed ? new Date(approver.dateReviewed).toLocaleDateString() : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedPayroll(null)}>
                Close
              </Button>
              {selectedPayroll.status === "in_approval" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button 
                          className="flex items-center gap-1"
                          disabled={selectedPayroll.currentApprover !== "payroll_manager"}
                        >
                          <FileText className="h-4 w-4" />
                          Submit for Approval
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-2">
                      <p>Only the Payroll Manager can submit for approval</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {selectedPayroll.status === "rejected" && (
                <Button className="flex items-center gap-1">
                  <ArrowRightCircle className="h-4 w-4" />
                  Resubmit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
