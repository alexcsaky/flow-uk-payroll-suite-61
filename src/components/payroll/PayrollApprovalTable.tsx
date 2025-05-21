import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PayrollApproval } from '@/types/payroll';
import { getStatusBadge, formatRoleName, getRoleIcon } from '@/utils/payrollApprovalHelpers';
import { Eye, ArrowRightCircle } from 'lucide-react';
import { PayslipDistributionModal } from './PayslipDistributionModal';

interface PayrollApprovalTableProps {
  approvals: PayrollApproval[];
  onSelectPayroll: (payroll: PayrollApproval) => void;
}

export const PayrollApprovalTable: React.FC<PayrollApprovalTableProps> = ({ 
  approvals, 
  onSelectPayroll 
}) => {
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollApproval | null>(null);

  const handleProcessClick = (approval: PayrollApproval) => {
    setSelectedPayroll(approval);
    setShowDistributionModal(true);
  };

  return (
    <>
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
            {approvals.map((approval) => (
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
                      onClick={() => onSelectPayroll(approval)}
                    >
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                    {approval.status === "approved" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleProcessClick(approval)}
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
      <PayslipDistributionModal
        open={showDistributionModal}
        onOpenChange={setShowDistributionModal}
      />
    </>
  );
};
