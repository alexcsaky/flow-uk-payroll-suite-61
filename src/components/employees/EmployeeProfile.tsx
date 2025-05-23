import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Briefcase, Calendar, Mail, Phone, FileText, Edit } from "lucide-react";
import { EmployeeTags } from "./EmployeeTags";
import { P45Modal } from "./P45Modal";

interface EmployeeProfileProps {
  employee: {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    status: string;
    startDate: string;
    avatarUrl: string;
    nationalInsurance: string;
    taxCode: string;
  };
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  const [showP45Modal, setShowP45Modal] = useState(false);
  const navigate = useNavigate();

  // Mock employer data - in a real app, this would come from your company settings
  const employer = {
    name: "Acme Corp",
    payeReference: "123/AB456"
  };

  const handleEditDetails = () => {
    // Navigate to onboarding form with employee data
    navigate(`/employees/onboarding?edit=${employee.id}`);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={employee.avatarUrl} alt={employee.name} />
              <AvatarFallback className="text-2xl">
                {employee.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{employee.name}</h3>
            <p className="text-muted-foreground">{employee.role}</p>
            <Badge className="mt-2" variant={
              employee.status === "Active"
                ? "default"
                : employee.status === "On Leave"
                ? "outline"
                : "secondary"
            }>
              {employee.status}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">{employee.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-sm text-muted-foreground">{employee.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Department</h4>
                <p className="text-sm text-muted-foreground">{employee.department}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-medium">Start Date</h4>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(employee.startDate), "dd MMMM yyyy")}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditDetails}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
                <Button variant="outline" size="sm">
                  Documents
                </Button>
                <Button variant="outline" size="sm">
                  Leave Record
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowP45Modal(true)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View P45
                </Button>
              </div>
            </div>

            <Separator />
            
            <div className="pt-2">
              <EmployeeTags />
            </div>
          </div>
        </CardContent>
      </Card>

      <P45Modal
        open={showP45Modal}
        onOpenChange={setShowP45Modal}
        employee={employee}
        employer={employer}
      />
    </>
  );
};

export default EmployeeProfile;
