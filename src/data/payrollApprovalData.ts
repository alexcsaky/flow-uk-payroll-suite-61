
import { PayrollApproval } from "@/types/payroll";

// Mock approval data
export const mockApprovalData: PayrollApproval[] = [
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
