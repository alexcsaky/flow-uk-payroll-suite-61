
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PayrollInformationCardProps {
  employee: {
    salary: number;
    taxCode: string;
    nationalInsurance: string;
    bankAccount: string;
  };
}

const PayrollInformationCard: React.FC<PayrollInformationCardProps> = ({
  employee,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payroll Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Annual Salary</h4>
            <p>£{employee.salary.toLocaleString()}</p>
          </div>
          <div data-id="tax-code">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Tax Code</h4>
            <p>{employee.taxCode}</p>
          </div>
          <div data-id="national-insurance">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">National Insurance Number</h4>
            <p>{employee.nationalInsurance}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Bank Account</h4>
            <p>{employee.bankAccount}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h4>
            <p>Bank Transfer</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Frequency</h4>
            <p>Monthly</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollInformationCard;
