
import { useState } from 'react';
import { PayrollApproval } from '@/types/payroll';
import { mockApprovalData } from '@/data/payrollApprovalData';

export function usePayrollApprovals() {
  const [approvals, setApprovals] = useState<PayrollApproval[]>(mockApprovalData);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollApproval | null>(null);

  const selectPayroll = (payroll: PayrollApproval) => {
    setSelectedPayroll(payroll);
  };

  const closeDetails = () => {
    setSelectedPayroll(null);
  };

  // Additional methods could be added for approving, rejecting, submitting, etc.

  return {
    approvals,
    selectedPayroll,
    selectPayroll,
    closeDetails
  };
}
