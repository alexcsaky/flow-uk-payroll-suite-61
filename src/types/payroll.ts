
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
