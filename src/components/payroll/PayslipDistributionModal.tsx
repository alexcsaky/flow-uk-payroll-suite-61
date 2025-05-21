import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Mail, Download, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayslipDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayslipDistributionModal({
  open,
  onOpenChange,
}: PayslipDistributionModalProps) {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBacsDownloading, setIsBacsDownloading] = useState(false);

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Success",
        description: "Payslips sent successfully!",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send payslips. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Success",
        description: "Downloading payslips...",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download payslips. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadBacs = async () => {
    setIsBacsDownloading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Downloading Bacs File",
      });
      onOpenChange(false);
    } finally {
      setIsBacsDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payroll Actions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            className="w-full h-16 text-lg"
            onClick={handleSendEmails}
            disabled={isSending || isDownloading || isBacsDownloading}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Payslips...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-5 w-5" />
                Send Payslips via Email
              </>
            )}
          </Button>
          <Button
            className="w-full h-16 text-lg"
            onClick={handleDownload}
            disabled={isSending || isDownloading || isBacsDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download All Print Payslips
              </>
            )}
          </Button>
          <Button
            className="w-full h-16 text-lg"
            onClick={handleDownloadBacs}
            disabled={isSending || isDownloading || isBacsDownloading}
          >
            {isBacsDownloading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Downloading BACS File...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-5 w-5" />
                Download BACS File
              </>
            )}
          </Button>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSending || isDownloading || isBacsDownloading}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 