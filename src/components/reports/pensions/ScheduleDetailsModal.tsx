import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ContributionSchedule {
  id: string;
  payPeriod: string;
  submissionDate: string;
  status: "Submitted" | "Approved" | "Failed" | "Processing";
  totalEmployeeContributions: number;
  totalEmployerContributions: number;
  totalPaid: number;
  memberCount: number;
}

interface ScheduleDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: ContributionSchedule | null;
}

const ScheduleDetailsModal: React.FC<ScheduleDetailsModalProps> = ({
  open,
  onOpenChange,
  schedule,
}) => {
  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{schedule.payPeriod} Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Submission Date</h4>
              <p>{schedule.submissionDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
              <p>{schedule.status}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Employee Contributions</h4>
              <p className="font-medium">{formatCurrency(schedule.totalEmployeeContributions)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Employer Contributions</h4>
              <p className="font-medium">{formatCurrency(schedule.totalEmployerContributions)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total Paid</h4>
              <p className="font-medium">{formatCurrency(schedule.totalPaid)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Members Included</h4>
              <p className="font-medium">{schedule.memberCount} members</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsModal; 