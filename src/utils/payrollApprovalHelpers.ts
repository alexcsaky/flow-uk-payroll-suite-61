
import { ApproverRole, PayrollApproval } from "@/types/payroll";
import { Badge } from "@/components/ui/badge";
import { User, Users, Banknote, Briefcase } from "lucide-react";

// Helper function to get status badge styling
export const getStatusBadge = (status: PayrollApproval['status']) => {
  switch (status) {
    case "draft":
      return <Badge variant="gray">Draft</Badge>;
    case "in_approval":
      return <Badge variant="info">In Approval</Badge>;
    case "approved":
      return <Badge variant="success">Approved</Badge>;
    case "rejected":
      return <Badge variant="error">Rejected</Badge>;
    case "processing":
      return <Badge variant="pending">Processing</Badge>;
    case "completed":
      return <Badge variant="success">Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Get icon for approver role
export const getRoleIcon = (role: ApproverRole) => {
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
export const formatRoleName = (role: ApproverRole) => {
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
