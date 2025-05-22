import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MemberUpdate {
  id: string;
  employeeName: string;
  nestStatus: string;
  effectiveDate: string;
}

interface MemberUpdatesSectionProps {
  onSync: () => void;
}

const MemberUpdatesSection: React.FC<MemberUpdatesSectionProps> = ({ onSync }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState<MemberUpdate[]>([
    {
      id: "1",
      employeeName: "John Smith",
      nestStatus: "Opted Out",
      effectiveDate: "2025-05-15",
    },
    {
      id: "2",
      employeeName: "Sarah Johnson",
      nestStatus: "Ceased Contributions",
      effectiveDate: "2025-05-10",
    },
    {
      id: "3",
      employeeName: "Michael Brown",
      nestStatus: "Enrolment Rejected",
      effectiveDate: "2025-05-12",
    },
  ]);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate new updates
      const newUpdates = [
        {
          id: "4",
          employeeName: "Emma Wilson",
          nestStatus: "Opted Out",
          effectiveDate: "2025-05-20",
        },
        {
          id: "5",
          employeeName: "James Taylor",
          nestStatus: "Ceased Contributions",
          effectiveDate: "2025-05-18",
        },
      ];
      
      setUpdates(prev => [...newUpdates, ...prev]);
      onSync();
      
      toast.success(`${newUpdates.length} new member updates found!`);
    } catch (error) {
      toast.error("Failed to fetch member updates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (updateId: string, employeeName: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the confirmed update
      setUpdates(prev => prev.filter(update => update.id !== updateId));
      
      toast.success(`Employee status confirmed in Flow: ${employeeName}`);
    } catch (error) {
      toast.error("Failed to confirm status. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Opted Out":
        return <Badge variant="secondary">Opted Out</Badge>;
      case "Ceased Contributions":
        return <Badge variant="destructive">Ceased Contributions</Badge>;
      case "Enrolment Rejected":
        return <Badge variant="outline">Enrolment Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>NEST Member Updates & Status</CardTitle>
          <Button
            onClick={handleSync}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Checking for updates...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Retrieve NEST Member Updates
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
                <TableHead>Employee Name</TableHead>
                <TableHead>NEST Status</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell className="font-medium">{update.employeeName}</TableCell>
                  <TableCell>{getStatusBadge(update.nestStatus)}</TableCell>
                  <TableCell>{update.effectiveDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfirm(update.id, update.employeeName)}
                    >
                      Confirm in Flow
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {updates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No pending member updates
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberUpdatesSection; 