
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Clock, Check, X } from 'lucide-react';
import { PayrollApproval } from '@/types/payroll';
import { formatRoleName, getRoleIcon } from '@/utils/payrollApprovalHelpers';

interface ApprovalHistoryProps {
  payroll: PayrollApproval;
}

export const ApprovalHistory: React.FC<ApprovalHistoryProps> = ({ payroll }) => {
  return (
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
            {payroll.approvers.map((approver, index) => (
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
  );
};
