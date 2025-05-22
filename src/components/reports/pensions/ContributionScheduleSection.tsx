import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Send } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface ContributionScheduleSectionProps {
  onViewSchedule: (schedule: ContributionSchedule) => void;
}

const ContributionScheduleSection: React.FC<ContributionScheduleSectionProps> = ({
  onViewSchedule,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState<ContributionSchedule[]>([
    {
      id: "1",
      payPeriod: "April 2025",
      submissionDate: "2025-05-01 10:30 AM",
      status: "Approved",
      totalEmployeeContributions: 1500.00,
      totalEmployerContributions: 1200.00,
      totalPaid: 2700.00,
      memberCount: 50,
    },
    {
      id: "2",
      payPeriod: "March 2025",
      submissionDate: "2025-04-01 09:15 AM",
      status: "Approved",
      totalEmployeeContributions: 1450.00,
      totalEmployerContributions: 1150.00,
      totalPaid: 2600.00,
      memberCount: 48,
    },
    {
      id: "3",
      payPeriod: "February 2025",
      submissionDate: "2025-03-01 11:45 AM",
      status: "Approved",
      totalEmployeeContributions: 1400.00,
      totalEmployerContributions: 1100.00,
      totalPaid: 2500.00,
      memberCount: 45,
    },
  ]);

  const handleSubmitSchedule = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new schedule
      const newSchedule: ContributionSchedule = {
        id: String(schedules.length + 1),
        payPeriod: "May 2025",
        submissionDate: new Date().toLocaleString(),
        status: "Submitted",
        totalEmployeeContributions: 1550.00,
        totalEmployerContributions: 1250.00,
        totalPaid: 2800.00,
        memberCount: 52,
      };
      
      setSchedules(prev => [newSchedule, ...prev]);
      
      toast.success("Contribution schedule for May 2025 submitted to NEST successfully.");
    } catch (error) {
      toast.error("Failed to submit schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: ContributionSchedule["status"]) => {
    switch (status) {
      case "Approved":
        return <Badge variant="default">Approved</Badge>;
      case "Submitted":
        return <Badge variant="outline">Submitted</Badge>;
      case "Processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Contribution Schedule Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Latest Pay Period: May 2025
            </p>
          </div>
          <Button
            onClick={handleSubmitSchedule}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Send className="h-4 w-4 animate-spin" />
                Submitting schedule...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Latest Contribution Schedule to NEST
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Submission Date/Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.payPeriod}</TableCell>
                  <TableCell>{schedule.submissionDate}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewSchedule(schedule)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionScheduleSection; 