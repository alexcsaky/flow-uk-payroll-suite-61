import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const REPORT_TYPES = [
  "General Payroll Summary",
  "Employee Demographics",
  "Detailed Financial Overview",
  "Tax Withholding Report",
  "Time Off Accrual",
  "Benefit Utilization",
  "AWR Compliance Report",
  "Gender Pay Gap Report",
];

export function ReportTypeSelectModal({ open, onOpenChange, onSelect }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (reportType: string) => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    if (type === "AWR Compliance Report") {
      navigate("/reports/awr");
    } else if (type === "Gender Pay Gap Report") {
      navigate("/reports/gpgr");
    } else {
      onSelect(type);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Report Type</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {REPORT_TYPES.map((type) => (
            <Button
              key={type}
              variant="outline"
              className="h-20 text-lg flex items-center justify-center"
              onClick={() => handleSelect(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 