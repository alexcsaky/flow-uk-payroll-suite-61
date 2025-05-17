
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PayrollApprovalTable } from "./PayrollApprovalTable";
import { PayrollApprovalDetails } from "./PayrollApprovalDetails";
import { usePayrollApprovals } from "@/hooks/usePayrollApprovals";

export const PayrollApprovalHub: React.FC = () => {
  const { approvals, selectedPayroll, selectPayroll, closeDetails } = usePayrollApprovals();

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
          <PayrollApprovalTable 
            approvals={approvals} 
            onSelectPayroll={selectPayroll} 
          />
        </CardContent>
      </Card>

      {selectedPayroll && (
        <PayrollApprovalDetails 
          payroll={selectedPayroll} 
          onClose={closeDetails} 
        />
      )}
    </div>
  );
};
