
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInformationCardProps {
  employee: {
    name: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: string;
  };
}

const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({
  employee,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
            <p>{employee.name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
            <p>{employee.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
            <p>{employee.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
            <p>{employee.address}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Emergency Contact</h4>
            <p>{employee.emergencyContact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
