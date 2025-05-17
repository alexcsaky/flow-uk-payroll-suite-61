import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Download,
  FileText,
  MoreHorizontal,
  Search,
  Upload,
  UserPlus
} from "lucide-react";
import { BulkOnboardDialog } from "@/components/employees/BulkOnboardDialog";

// Mock employee data
const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Operations",
    role: "Manager",
    status: "Active"
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Human Resources",
    role: "HR Specialist",
    status: "Active"
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    role: "Accountant",
    status: "Active"
  },
  {
    id: "EMP004",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    department: "IT",
    role: "Developer",
    status: "Active"
  },
  {
    id: "EMP005",
    name: "James Taylor",
    email: "james.taylor@example.com",
    department: "Sales",
    role: "Sales Representative",
    status: "On Leave"
  },
  {
    id: "EMP006",
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    department: "Marketing",
    role: "Marketing Coordinator",
    status: "Active"
  },
  {
    id: "EMP007",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    department: "Operations",
    role: "Supervisor",
    status: "Active"
  },
  {
    id: "EMP008",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    department: "Legal",
    role: "Legal Advisor",
    status: "Inactive"
  }
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkOnboardOpen, setBulkOnboardOpen] = useState(false);
  const navigate = useNavigate();
  
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewDetails = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };
  
  const handleAddEmployee = () => {
    navigate('/employees/onboarding');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage your employees and their information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flow-gradient" onClick={handleAddEmployee}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
          <Button variant="outline" onClick={() => setBulkOnboardOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Bulk Onboard
          </Button>
        </div>
      </div>

      {/* Bulk Onboarding Dialog */}
      <BulkOnboardDialog 
        open={bulkOnboardOpen} 
        onOpenChange={setBulkOnboardOpen} 
      />

      <Card>
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Reports</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Employee Summary</DropdownMenuItem>
                  <DropdownMenuItem>Department Breakdown</DropdownMenuItem>
                  <DropdownMenuItem>Payroll Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(employee.id)}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "Active"
                            ? "default"
                            : employee.status === "On Leave"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(employee.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem>Payroll History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
