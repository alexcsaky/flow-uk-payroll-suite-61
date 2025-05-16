
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeductionsBenefitsCardProps {
  employee: {
    id: string;
  };
}

const DeductionsBenefitsCard: React.FC<DeductionsBenefitsCardProps> = ({
  employee,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Deductions & Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div data-id="pension-scheme">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Pension Scheme</h4>
            <p>Company Pension (5%)</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Student Loan</h4>
            <p>{employee.id === "EMP004" ? "Plan 2" : "None"}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Healthcare</h4>
            <p>Private Medical Insurance</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Other Benefits</h4>
            <p>Company Car Allowance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeductionsBenefitsCard;
