
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const EmptyPayslipCard: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Payslips Available</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          This employee doesn't have any payslips generated yet.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyPayslipCard;
