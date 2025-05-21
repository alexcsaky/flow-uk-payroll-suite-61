import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Unlock } from "lucide-react";

interface PayRun {
  id: string;
  name: string;
  date: string;
  status: "open" | "closed";
}

interface LinkTimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  timesheetId: number;
  timesheetDate: string;
  onLink: (payRunId: string) => void;
}

export const LinkTimesheetModal: React.FC<LinkTimesheetModalProps> = ({
  isOpen,
  onClose,
  timesheetId,
  timesheetDate,
  onLink,
}) => {
  const [selectedPayRun, setSelectedPayRun] = useState<string>("");

  // Sample pay runs data - in a real app, this would come from an API
  const payRuns: PayRun[] = [
    {
      id: "PR-2025-001",
      name: "Pay Run 2025-04-30",
      date: "2025-04-30",
      status: "closed",
    },
    {
      id: "PR-2025-002",
      name: "Pay Run 2025-03-31",
      date: "2025-03-31",
      status: "closed",
    },
    {
      id: "PR-2025-003",
      name: "Pay Run 2025-05-31",
      date: "2025-05-31",
      status: "open",
    },
  ];

  const selectedPayRunData = payRuns.find((pr) => pr.id === selectedPayRun);
  const isClosedPayRun = selectedPayRunData?.status === "closed";

  const handleLink = () => {
    if (selectedPayRun) {
      onLink(selectedPayRun);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link Timesheet: {timesheetDate}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Link to Pay Run:</label>
            <Select value={selectedPayRun} onValueChange={setSelectedPayRun}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pay run" />
              </SelectTrigger>
              <SelectContent>
                {payRuns.map((payRun) => (
                  <SelectItem key={payRun.id} value={payRun.id}>
                    <div className="flex items-center gap-2">
                      {payRun.name}
                      {payRun.status === "closed" ? (
                        <Lock className="h-3 w-3 text-red-500" />
                      ) : (
                        <Unlock className="h-3 w-3 text-green-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        ({payRun.status === "closed" ? "Closed" : "Open"})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isClosedPayRun && (
            <Alert variant="warning">
              <AlertDescription>
                This timesheet is linked to the selected {selectedPayRunData?.name}, but due to the pay run being closed, it will be processed in the next available pay run on June 15, 2025.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleLink} disabled={!selectedPayRun}>
            Link Timesheet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 