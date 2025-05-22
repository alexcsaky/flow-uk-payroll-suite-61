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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface Letter {
  id: string;
  type: "Initial AE Letter" | "Pre-AE Reminder" | "Post-AE Confirmation";
  dateGenerated: string;
  targetAudience: string;
  status: "Sent" | "Failed";
}

const AutoEnrolmentCommunicationsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedLetterType, setSelectedLetterType] = useState<string | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: "1",
      type: "Initial AE Letter",
      dateGenerated: "2025-05-22 14:00",
      targetAudience: "5 New Joiners",
      status: "Sent",
    },
    {
      id: "2",
      type: "Pre-AE Reminder",
      dateGenerated: "2025-05-20 10:30",
      targetAudience: "10 Pending Enrolment",
      status: "Sent",
    },
    {
      id: "3",
      type: "Post-AE Confirmation",
      dateGenerated: "2025-05-18 15:45",
      targetAudience: "12 Recently Enrolled",
      status: "Sent",
    },
  ]);

  const handleGenerateLetter = (type: string) => {
    setSelectedLetterType(type);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmGenerate = async () => {
    if (!selectedLetterType) return;

    setIsLoading(selectedLetterType);
    setIsConfirmDialogOpen(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add new letter to history
      const newLetter: Letter = {
        id: String(letters.length + 1),
        type: selectedLetterType as Letter["type"],
        dateGenerated: new Date().toLocaleString(),
        targetAudience: `${Math.floor(Math.random() * 10) + 5} ${selectedLetterType === "Initial AE Letter" ? "New Joiners" : selectedLetterType === "Pre-AE Reminder" ? "Pending Enrolment" : "Recently Enrolled"}`,
        status: "Sent",
      };

      setLetters(prev => [newLetter, ...prev]);
      toast.success(`${selectedLetterType} successfully sent to ${newLetter.targetAudience}!`);
    } catch (error) {
      toast.error(`Failed to send ${selectedLetterType}. Please try again.`);
    } finally {
      setIsLoading(null);
      setSelectedLetterType(null);
    }
  };

  const handleViewSample = (letter: Letter) => {
    setSelectedLetter(letter);
    setIsSampleModalOpen(true);
  };

  const getLetterContent = (type: string) => {
    switch (type) {
      case "Initial AE Letter":
        return `Dear [Employee Name],

This letter is to inform you about your auto-enrolment into our pension scheme. As your employer, we are required by law to automatically enrol you into a workplace pension scheme.

You will be automatically enrolled into the NEST pension scheme on [Enrolment Date]. Your contributions will be deducted from your salary, and we will also make employer contributions on your behalf.

If you wish to opt out, you can do so within one month of your enrolment date. Please contact HR for more information.

Sincerely,
[Company Name]`;

      case "Pre-AE Reminder":
        return `Dear [Employee Name],

This is a reminder that your auto-enrolment into our pension scheme will take effect on [Enrolment Date]. 

Your contributions will be set at [Employee Contribution Rate]% of your qualifying earnings, and we will contribute [Employer Contribution Rate]%.

If you have any questions about your pension or wish to opt out, please contact HR before [Enrolment Date].

Sincerely,
[Company Name]`;

      case "Post-AE Confirmation":
        return `Dear [Employee Name],

We are pleased to confirm that you have been successfully enrolled into our workplace pension scheme with NEST.

Your first contribution will be deducted from your [Next Pay Date] salary. You can view your pension details and manage your contributions through the NEST member portal.

If you have any questions about your pension, please don't hesitate to contact HR.

Sincerely,
[Company Name]`;

      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auto-Enrolment Communications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Letter Generation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleGenerateLetter("Initial AE Letter")}
            disabled={isLoading === "Initial AE Letter"}
          >
            <Send className="h-6 w-6" />
            {isLoading === "Initial AE Letter" ? (
              "Generating..."
            ) : (
              "Generate Initial Auto-Enrolment Letter"
            )}
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleGenerateLetter("Pre-AE Reminder")}
            disabled={isLoading === "Pre-AE Reminder"}
          >
            <Send className="h-6 w-6" />
            {isLoading === "Pre-AE Reminder" ? (
              "Generating..."
            ) : (
              "Generate Pre-Enrolment Reminder"
            )}
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={() => handleGenerateLetter("Post-AE Confirmation")}
            disabled={isLoading === "Post-AE Confirmation"}
          >
            <Send className="h-6 w-6" />
            {isLoading === "Post-AE Confirmation" ? (
              "Generating..."
            ) : (
              "Generate Post-Enrolment Confirmation"
            )}
          </Button>
        </div>

        {/* Letter History Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Letter Type</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Target Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letters.map((letter) => (
                <TableRow key={letter.id}>
                  <TableCell className="font-medium">{letter.type}</TableCell>
                  <TableCell>{letter.dateGenerated}</TableCell>
                  <TableCell>{letter.targetAudience}</TableCell>
                  <TableCell>
                    <Badge
                      variant={letter.status === "Sent" ? "success" : "destructive"}
                    >
                      {letter.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSample(letter)}
                    >
                      View Sample
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Letter Generation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send the {selectedLetterType} to eligible employees?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmGenerate}>
              Yes, Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sample Letter Modal */}
      <Dialog open={isSampleModalOpen} onOpenChange={setIsSampleModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedLetter?.type} Sample</DialogTitle>
            <DialogDescription>
              Preview of the letter content
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-muted rounded-md whitespace-pre-wrap font-mono text-sm">
            {selectedLetter && getLetterContent(selectedLetter.type)}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSampleModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AutoEnrolmentCommunicationsSection; 