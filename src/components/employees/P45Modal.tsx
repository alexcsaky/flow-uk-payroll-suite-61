import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Download, Mail, X } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface P45ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: {
    name: string;
    nationalInsurance: string;
    taxCode: string;
    email: string;
  };
  employer: {
    name: string;
    payeReference: string;
  };
}

export function P45Modal({ open, onOpenChange, employee, employer }: P45ModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [lastSent, setLastSent] = useState<string | null>(null);

  const handleSendP45 = () => {
    setShowConfirmDialog(true);
  };

  const confirmSendP45 = () => {
    // Simulate API call to send P45
    setTimeout(() => {
      const now = new Date();
      setLastSent(format(now, "yyyy-MM-dd HH:mm"));
      toast.success(`P45 sent successfully to ${employee.email}`);
      setShowConfirmDialog(false);
    }, 1000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">P45 Form</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* P45 Form Header */}
            <div className="text-center">
              <h2 className="text-xl font-bold">P45</h2>
              <p className="text-sm text-muted-foreground">Details of employee leaving</p>
            </div>

            {/* P45 Form Content */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Part 1 - For HMRC */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Part 1 - For HMRC</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Employee's Full Name</p>
                        <p className="font-medium">{employee.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">National Insurance Number</p>
                        <p className="font-medium">{employee.nationalInsurance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employer Name</p>
                        <p className="font-medium">{employer.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Employer PAYE Reference</p>
                        <p className="font-medium">{employer.payeReference}</p>
                      </div>
                    </div>
                  </div>

                  {/* Part 2 - For New Employer */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Part 2 - For New Employer</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Tax Code</p>
                        <p className="font-medium">{employee.taxCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Leaving Date</p>
                        <p className="font-medium">{format(new Date(), "dd MMMM yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Pay to Date</p>
                        <p className="font-medium">£18,500.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tax Paid to Date</p>
                        <p className="font-medium">£1,850.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Part 3 - For Employee */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Part 3 - For Employee</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Student Loan Deductions</p>
                      <p className="font-medium">£0.00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Postgraduate Loan Deductions</p>
                      <p className="font-medium">£0.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
              <div className="flex items-center gap-4">
                {lastSent && (
                  <p className="text-sm text-muted-foreground">
                    Last sent: {lastSent}
                  </p>
                )}
                <Button onClick={handleSendP45}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send to Employee
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send P45 to Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send this P45 to {employee.name}'s registered email address ({employee.email})?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSendP45}>Yes, Send</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 