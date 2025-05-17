
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ApprovalSteps } from './ApprovalSteps';
import { ApprovalHistory } from './ApprovalHistory';
import { PayrollApproval } from '@/types/payroll';
import { AlertCircle, ArrowRightCircle, FileText } from 'lucide-react';

interface PayrollApprovalDetailsProps {
  payroll: PayrollApproval;
  onClose: () => void;
}

export const PayrollApprovalDetails: React.FC<PayrollApprovalDetailsProps> = ({ payroll, onClose }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Approval Details: {payroll.runId}</CardTitle>
          <CardDescription>
            {payroll.runDate} • {payroll.amount} • {payroll.employees} employees
          </CardDescription>
        </div>
        {payroll.status === "rejected" && (
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
          <ApprovalSteps payroll={payroll} />
        </div>

        <ApprovalHistory payroll={payroll} />

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {payroll.status === "in_approval" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      className="flex items-center gap-1"
                      disabled={payroll.currentApprover !== "payroll_manager"}
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
          {payroll.status === "rejected" && (
            <Button className="flex items-center gap-1">
              <ArrowRightCircle className="h-4 w-4" />
              Resubmit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
