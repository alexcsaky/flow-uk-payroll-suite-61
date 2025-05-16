
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface EmploymentInformationCardProps {
  employee: {
    id: string;
    department: string;
    role: string;
    startDate: string;
    status: string;
  };
}

const EmploymentInformationCard: React.FC<EmploymentInformationCardProps> = ({
  employee,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Employment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Employee ID</h4>
            <p>{employee.id}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Department</h4>
            <p>{employee.department}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Role</h4>
            <p>{employee.role}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Start Date</h4>
            <p>{format(new Date(employee.startDate), "dd MMMM yyyy")}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
            <p>{employee.status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentInformationCard;
