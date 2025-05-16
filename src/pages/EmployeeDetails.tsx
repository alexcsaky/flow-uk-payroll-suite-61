import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Download,
  Eye,
  FileText,
  Mail,
  Phone
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generatePayslipPDF } from "../lib/pdf/payslip-pdf";
import ExceptionBanner, { Exception } from "../components/employees/ExceptionBanner";

// Mock employee data (extended version of what's in Employees.tsx)
const employeesData = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+44 7890 123456",
    department: "Operations",
    role: "Manager",
    status: "Active",
    startDate: "2021-06-15",
    salary: 65000,
    taxCode: "1250L",
    nationalInsurance: "AB123456C",
    bankAccount: "**** **** **** 1234",
    address: "123 Main Street, London, SW1A 1AA",
    emergencyContact: "Jane Smith (+44 7890 654321)",
    avatarUrl: ""
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 7891 234567",
    department: "Human Resources",
    role: "HR Specialist",
    status: "Active",
    startDate: "2022-03-10",
    salary: 52000,
    taxCode: "1257L",
    nationalInsurance: "CD234567D",
    bankAccount: "**** **** **** 5678",
    address: "456 High Street, Manchester, M1 1BB",
    emergencyContact: "Mike Johnson (+44 7892 765432)",
    avatarUrl: ""
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+44 7893 345678",
    department: "Finance",
    role: "Accountant",
    status: "Active",
    startDate: "2020-11-05",
    salary: 58000,
    taxCode: "1260L",
    nationalInsurance: "EF345678G",
    bankAccount: "**** **** **** 9012",
    address: "789 Park Lane, Birmingham, B1 1CC",
    emergencyContact: "Lisa Brown (+44 7894 876543)",
    avatarUrl: ""
  },
  {
    id: "EMP004",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+44 7895 456789",
    department: "IT",
    role: "Developer",
    status: "Active",
    startDate: "2023-01-20",
    salary: 62000,
    taxCode: "1150L",
    nationalInsurance: "GH456789H",
    bankAccount: "**** **** **** 3456",
    address: "101 Tech Street, Bristol, BS1 1DD",
    emergencyContact: "Tom Wilson (+44 7896 987654)",
    avatarUrl: ""
  },
  {
    id: "EMP005",
    name: "James Taylor",
    email: "james.taylor@example.com",
    phone: "+44 7897 567890",
    department: "Sales",
    role: "Sales Representative",
    status: "On Leave",
    startDate: "2022-05-15",
    salary: 48000,
    taxCode: "1200L",
    nationalInsurance: "IJ567890K",
    bankAccount: "**** **** **** 7890",
    address: "222 Market Street, Glasgow, G1 1EE",
    emergencyContact: "Kate Taylor (+44 7898 098765)",
    avatarUrl: ""
  }
];

// Mock payslips data
const payslipsData = {
  "EMP001": [
    {
      id: "PS-25-04",
      period: "April 2025",
      date: "2025-04-25",
      grossPay: 5416.67,
      taxPaid: 1083.33,
      nationalInsurance: 433.33,
      pension: 271.83,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 3628.18,
      status: "Processed"
    },
    {
      id: "PS-25-03",
      period: "March 2025",
      date: "2025-03-25",
      grossPay: 5416.67,
      taxPaid: 1083.33,
      nationalInsurance: 433.33,
      pension: 271.83,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 3628.18,
      status: "Processed"
    },
    {
      id: "PS-25-02",
      period: "February 2025",
      date: "2025-02-25",
      grossPay: 5416.67,
      taxPaid: 1083.33,
      nationalInsurance: 433.33,
      pension: 271.83,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 3628.18,
      status: "Processed"
    },
    {
      id: "PS-25-01",
      period: "January 2025",
      date: "2025-01-25",
      grossPay: 5416.67,
      taxPaid: 1083.33,
      nationalInsurance: 433.33,
      pension: 271.83,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 3628.18,
      status: "Processed"
    }
  ],
  "EMP002": [
    {
      id: "PS-25-04",
      period: "April 2025",
      date: "2025-04-25",
      grossPay: 4333.33,
      taxPaid: 866.67,
      nationalInsurance: 346.67,
      pension: 216.67,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 2903.32,
      status: "Processed"
    },
    {
      id: "PS-25-03",
      period: "March 2025",
      date: "2025-03-25",
      grossPay: 4333.33,
      taxPaid: 866.67,
      nationalInsurance: 346.67,
      pension: 216.67,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 2903.32,
      status: "Processed"
    }
  ],
  "EMP003": [
    {
      id: "PS-25-04",
      period: "April 2025",
      date: "2025-04-25",
      grossPay: 4833.33,
      taxPaid: 966.67,
      nationalInsurance: 386.67,
      pension: 241.67,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 3238.32,
      status: "Processed"
    }
  ],
  "EMP004": [
    {
      id: "PS-25-04",
      period: "April 2025",
      date: "2025-04-25",
      grossPay: 5166.67,
      taxPaid: 1033.33,
      nationalInsurance: 413.33,
      pension: 258.33,
      studentLoan: 150.00,
      otherDeductions: 0,
      netPay: 3311.68,
      status: "Processed"
    }
  ],
  "EMP005": [
    {
      id: "PS-25-04",
      period: "April 2025",
      date: "2025-04-25",
      grossPay: 4000.00,
      taxPaid: 800.00,
      nationalInsurance: 320.00,
      pension: 200.00,
      studentLoan: 0,
      otherDeductions: 0,
      netPay: 2680.00,
      status: "Processed"
    }
  ]
};

// Current Payslip Card Component
const CurrentPayslipCard = ({ payslip, employeeId }) => {
  if (!payslip) return null;
  
  // Sample earnings breakdown (in a real app, this would come from the API)
  const earnings = [
    { label: "Basic Salary", amount: payslip.grossPay - 500 }, // Subtract allowances for demo
    { label: "Performance Bonus", amount: 300 },
    { label: "Travel Allowance", amount: 200 },
  ];
  
  // Sample deductions breakdown
  const deductions = [
    { label: "Income Tax", amount: payslip.taxPaid },
    { label: "National Insurance", amount: payslip.nationalInsurance },
    { label: "Pension Contribution", amount: payslip.pension },
  ];
  
  // Add student loan if applicable
  if (payslip.studentLoan > 0) {
    deductions.push({ label: "Student Loan Repayment", amount: payslip.studentLoan });
  }
  
  // Add other deductions if applicable
  if (payslip.otherDeductions > 0) {
    deductions.push({ label: "Other Deductions", amount: payslip.otherDeductions });
  }
  
  // Calculate totals
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  
  // Year-to-date calculations (mock data - in a real app would come from the API)
  const ytdData = {
    grossPay: payslip.grossPay * 4, // Simple multiplication for demo purposes
    taxPaid: payslip.taxPaid * 4,
    nationalInsurance: payslip.nationalInsurance * 4,
    pension: payslip.pension * 4,
    studentLoan: payslip.studentLoan * 4,
    netPay: payslip.netPay * 4
  };
  
  // Find employee data for PDF generation
  const employee = employeesData.find(emp => emp.id === employeeId);
  
  // Company information for the payslip
  const companyInfo = {
    name: "Bolt HR Solutions Ltd.",
    address: "10 Tech Park, London, EC1A 1BB",
    phone: "+44 20 1234 5678",
    email: "payroll@bolthr.example.com",
    website: "www.bolthr.example.com",
    registrationNumber: "Company Reg: 12345678",
    vatNumber: "VAT: GB123456789"
  };
  
  const handleDownloadPDF = () => {
    generatePayslipPDF({
      employee,
      payslip,
      earnings,
      deductions,
      totalEarnings,
      totalDeductions,
      ytdData,
      companyInfo
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Current Payslip</CardTitle>
            <CardDescription>{payslip.period}</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          {/* Payslip Header */}
          <div className="bg-muted/50 p-4 border-b">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Payslip Reference</h3>
                <p className="text-base font-semibold">{payslip.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Pay Date</h3>
                <p className="text-base font-semibold">{format(new Date(payslip.date), "dd MMMM yyyy")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge className="mt-1" variant="outline">{payslip.status}</Badge>
              </div>
            </div>
          </div>
          
          {/* Payslip Body */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Earnings Section */}
              <div>
                <h3 className="font-semibold mb-3 text-base pb-2 border-b">Earnings</h3>
                <div className="space-y-3">
                  {earnings.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-sm font-medium">£{item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t flex justify-between">
                    <span className="font-medium">Total Earnings</span>
                    <span className="font-bold">£{totalEarnings.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Deductions Section */}
              <div>
                <h3 className="font-semibold mb-3 text-base pb-2 border-b">Deductions</h3>
                <div className="space-y-3">
                  {deductions.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{item.label}</span>
                      <span className="text-sm font-medium text-red-600">-£{item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t flex justify-between">
                    <span className="font-medium">Total Deductions</span>
                    <span className="font-bold text-red-600">-£{totalDeductions.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Net Pay Summary */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">Net Pay</h3>
                  <p className="text-sm text-muted-foreground">Amount paid to your bank account</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">£{payslip.netPay.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Payment Date: {format(new Date(payslip.date), "dd MMM yyyy")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" onClick={() => window.open(`/payslips/${employeeId}/${payslip.id}`, '_blank')}>
          <Eye className="mr-2 h-4 w-4" />
          View Full Payslip
        </Button>
      </CardFooter>
    </Card>
  );
};

// Payslip History Component
const PayslipHistory = ({ payslips, employeeId }) => {
  // Helper function to generate and download PDF
  const handleDownloadPDF = (payslip) => {
    // Find employee data
    const employee = employeesData.find(emp => emp.id === employeeId);
    
    // Sample earnings breakdown (in a real app, this would come from the API)
    const earnings = [
      { label: "Basic Salary", amount: payslip.grossPay - 500 }, // Subtract allowances for demo
      { label: "Performance Bonus", amount: 300 },
      { label: "Travel Allowance", amount: 200 },
    ];
    
    // Sample deductions breakdown
    const deductions = [
      { label: "Income Tax", amount: payslip.taxPaid },
      { label: "National Insurance", amount: payslip.nationalInsurance },
      { label: "Pension Contribution", amount: payslip.pension },
    ];
    
    // Add student loan if applicable
    if (payslip.studentLoan > 0) {
      deductions.push({ label: "Student Loan Repayment", amount: payslip.studentLoan });
    }
    
    // Add other deductions if applicable
    if (payslip.otherDeductions > 0) {
      deductions.push({ label: "Other Deductions", amount: payslip.otherDeductions });
    }
    
    // Calculate totals
    const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    
    // Year-to-date calculations (mock data)
    const ytdData = {
      grossPay: payslip.grossPay * 4, // Simple multiplication for demo
      taxPaid: payslip.taxPaid * 4,
      nationalInsurance: payslip.nationalInsurance * 4,
      pension: payslip.pension * 4,
      studentLoan: payslip.studentLoan * 4,
      netPay: payslip.netPay * 4
    };
    
    // Company information for the payslip
    const companyInfo = {
      name: "Bolt HR Solutions Ltd.",
      address: "10 Tech Park, London, EC1A 1BB",
      phone: "+44 20 1234 5678",
      email: "payroll@bolthr.example.com",
      website: "www.bolthr.example.com",
      registrationNumber: "Company Reg: 12345678",
      vatNumber: "VAT: GB123456789"
    };
    
    // Generate the PDF
    generatePayslipPDF({
      employee,
      payslip,
      earnings,
      deductions,
      totalEarnings,
      totalDeductions,
      ytdData,
      companyInfo
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payslip History</CardTitle>
        <CardDescription>View and download previous payslips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">{payslip.id}</TableCell>
                  <TableCell>{payslip.period}</TableCell>
                  <TableCell>{format(new Date(payslip.date), "dd MMM yyyy")}</TableCell>
                  <TableCell>£{payslip.netPay.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => window.open(`/payslips/${employeeId}/${payslip.id}`, '_blank')}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadPDF(payslip)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [currentTab, setCurrentTab] = useState("details");
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loadingExceptions, setLoadingExceptions] = useState(true);
  
  useEffect(() => {
    // In a real application, we would fetch this data from an API
    const foundEmployee = employeesData.find(emp => emp.id === employeeId);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
    
    const employeePayslips = payslipsData[employeeId] || [];
    setPayslips(employeePayslips);
    
    // Fetch exceptions for the employee
    fetchExceptions();
  }, [employeeId]);
  
  const fetchExceptions = async () => {
    setLoadingExceptions(true);
    try {
      // In a real application, this would be a real API call
      // For demo purposes, we'll simulate an API call
      await simulateFetch();
      
      // Generate mock exceptions for specific employees to demonstrate functionality
      let mockExceptions: Exception[] = [];
      
      if (employeeId === "EMP001") {
        mockExceptions = [
          {
            id: "EXC001",
            type: "National Insurance Code Invalid",
            description: "The NI code AB123456C format is incorrect for HMRC submissions.",
            suggestedAction: "Update to valid format (2 letters, 6 digits, 1 letter).",
            severity: "high"
          }
        ];
      } else if (employeeId === "EMP003") {
        mockExceptions = [
          {
            id: "EXC002",
            type: "Missing Pension Enrollment",
            description: "Employee is eligible for auto-enrollment but no pension scheme is assigned.",
            suggestedAction: "Set up pension enrollment in Payroll > Pension settings.",
            severity: "medium"
          },
          {
            id: "EXC003",
            type: "Tax Code Requires Verification",
            description: "Current tax code may be outdated based on latest HMRC data.",
            suggestedAction: "Verify tax code with HMRC and update if necessary.",
            severity: "low"
          }
        ];
      }
      
      setExceptions(mockExceptions);
    } catch (error) {
      console.error("Error fetching exceptions:", error);
    } finally {
      setLoadingExceptions(false);
    }
  };
  
  // Simulate API fetch delay
  const simulateFetch = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };
  
  const resolveException = async (exceptionId: string) => {
    try {
      // In a real application, this would be a real API call to resolve the exception
      // POST /api/employees/{id}/exceptions/{exceptionId}/resolve
      await simulateFetch();
      
      // Remove the resolved exception from state
      setExceptions(exceptions.filter(exc => exc.id !== exceptionId));
    } catch (error) {
      console.error("Error resolving exception:", error);
      throw error;
    }
  };
  
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The employee you are looking for could not be found.
        </p>
        <Button onClick={() => navigate('/employees')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees
        </Button>
      </div>
    );
  }
  
  const currentPayslip = payslips.length > 0 ? payslips[0] : null;
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/employees')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Employee Details</h2>
      </div>
      
      {/* Exception Banner */}
      <ExceptionBanner
        employeeId={employeeId}
        exceptions={exceptions}
        isLoading={loadingExceptions}
        onResolve={resolveException}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Employee info */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                  <AvatarFallback className="text-2xl">{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                    <p className="text-sm text-muted-foreground">{format(new Date(employee.startDate), "dd MMMM yyyy")}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Documents
                    </Button>
                    <Button variant="outline" size="sm">
                      Leave Record
                    </Button>
                    <Button variant="outline" size="sm">
                      Performance
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Tabs and payslips */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="details" onValueChange={setCurrentTab} value={currentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Employee Details</TabsTrigger>
              <TabsTrigger value="payroll">Payroll Information</TabsTrigger>
              <TabsTrigger value="payslips">Payslips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6 mt-6">
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
            </TabsContent>
            
            <TabsContent value="payroll" className="space-y-6 mt-6">
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
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Tax Code</h4>
                      <p>{employee.taxCode}</p>
                    </div>
                    <div>
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
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deductions & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
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
            </TabsContent>
            
            <TabsContent value="payslips" className="space-y-6 mt-6">
              {currentPayslip && (
                <CurrentPayslipCard payslip={currentPayslip} employeeId={employee.id} />
              )}
              
              {payslips.length > 1 && (
                <PayslipHistory payslips={payslips.slice(1)} employeeId={employee.id} />
              )}
              
              {payslips.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Payslips Available</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      This employee doesn't have any payslips generated yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
