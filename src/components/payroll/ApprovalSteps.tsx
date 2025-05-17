
import React from "react";
import { Check, X, Clock } from "lucide-react";
import { PayrollApproval } from "@/types/payroll";
import { getRoleIcon, formatRoleName } from "@/utils/payrollApprovalHelpers";

interface ApprovalStepsProps {
  payroll: PayrollApproval;
}

export const ApprovalSteps: React.FC<ApprovalStepsProps> = ({ payroll }) => {
  const steps = [
    { 
      role: "payroll_manager", 
      label: formatRoleName("payroll_manager"),
      status: payroll.approvers.find(a => a.role === "payroll_manager")?.status || "not_started"
    },
    { 
      role: "hr", 
      label: formatRoleName("hr"),
      status: payroll.approvers.find(a => a.role === "hr")?.status || "not_started"
    },
    { 
      role: "finance_manager", 
      label: formatRoleName("finance_manager"),
      status: payroll.approvers.find(a => a.role === "finance_manager")?.status || "not_started"
    },
    { 
      role: "managing_director", 
      label: formatRoleName("managing_director"),
      status: payroll.approvers.find(a => a.role === "managing_director")?.status || "not_started"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4 text-white" />;
      case "rejected":
        return <X className="h-4 w-4 text-white" />;
      case "in_review":
      case "pending":
        return <Clock className="h-4 w-4 text-white" />;
      default:
        return null;
    }
  };

  const getStepColor = (status: string, isActive: boolean) => {
    if (status === "approved") return "bg-green-500 border-green-500 text-white";
    if (status === "rejected") return "bg-red-500 border-red-500 text-white";
    if (status === "in_review") return "bg-blue-500 border-blue-500 text-white";
    if (status === "pending") return "bg-amber-500 border-amber-500 text-white";
    return isActive 
      ? "bg-blue-100 border-blue-300 text-blue-900" 
      : "bg-gray-100 border-gray-300 text-gray-500";
  };

  const getLineColor = (status: string) => {
    if (status === "approved") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    if (status === "in_review" || status === "pending") return "bg-blue-500";
    return "bg-gray-200";
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.role}>
            <div className="flex flex-col items-center gap-2 z-10">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  getStepColor(step.status, payroll.currentApprover === step.role)
                }`}
              >
                {getStatusIcon(step.status) || getRoleIcon(step.role as any)}
              </div>
              <span className="text-xs font-medium text-center">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 ${getLineColor(step.status)}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
