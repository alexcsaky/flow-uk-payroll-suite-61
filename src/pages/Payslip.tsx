import { format } from "date-fns";
import { ArrowLeft, Building, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { generatePayslipPDF } from "../lib/pdf/payslip-pdf";

// Import the same mock data from EmployeeDetails.tsx
// In a real app, this would come from an API
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

const Payslip = () => {
  const { employeeId, payslipId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [payslip, setPayslip] = useState(null);
  
  useEffect(() => {
    if (!employeeId || !payslipId) {
      navigate('/not-found');
      return;
    }
    
    // Find employee data
    const foundEmployee = employeesData.find(emp => emp.id === employeeId);
    if (!foundEmployee) {
      navigate('/not-found');
      return;
    }
    setEmployee(foundEmployee);
    
    // Find payslip data
    const employeePayslips = payslipsData[employeeId] || [];
    const foundPayslip = employeePayslips.find(p => p.id === payslipId);
    if (!foundPayslip) {
      navigate('/not-found');
      return;
    }
    setPayslip(foundPayslip);
  }, [employeeId, payslipId, navigate]);
  
  if (!employee || !payslip) {
    return null; // Loading state
  }
  
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
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(`/employees/${employeeId}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employee
        </Button>
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Payslip</CardTitle>
              <CardDescription>{payslip.period} | Reference: {payslip.id}</CardDescription>
            </div>
            <div className="flex items-center">
              <Building className="h-6 w-6 mr-2" />
              <div>
                <h3 className="font-bold">{companyInfo.name}</h3>
                <p className="text-xs text-muted-foreground">{companyInfo.registrationNumber}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Employee & Payment Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">Employee Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{employee.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{employee.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tax Code</p>
                  <p className="font-medium">{employee.taxCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NI Number</p>
                  <p className="font-medium">{employee.nationalInsurance}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">Payment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pay Period</p>
                  <p className="font-medium">{payslip.period}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Date</p>
                  <p className="font-medium">{format(new Date(payslip.date), "dd MMM yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">Bank Transfer</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bank Account</p>
                  <p className="font-medium">{employee.bankAccount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tax Year</p>
                  <p className="font-medium">2024/2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{payslip.status}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Earnings and Deductions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Earnings */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Earnings</h3>
              <div className="space-y-3 mb-4">
                {earnings.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.label}</span>
                    <span className="font-medium">£{item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t flex justify-between items-center font-bold">
                <span>Total Earnings</span>
                <span>£{totalEarnings.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Deductions */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Deductions</h3>
              <div className="space-y-3 mb-4">
                {deductions.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.label}</span>
                    <span className="font-medium text-red-600">-£{item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t flex justify-between items-center font-bold">
                <span>Total Deductions</span>
                <span className="text-red-600">-£{totalDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Net Pay and Year-to-date Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Net Pay */}
            <div className="bg-muted/30 p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-3">Net Pay This Period</h3>
              <div className="flex justify-between items-center">
                <span>Net Pay</span>
                <span className="text-2xl font-bold">£{payslip.netPay.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Amount transferred to your bank account on {format(new Date(payslip.date), "dd MMM yyyy")}
              </p>
            </div>
            
            {/* Year to Date Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Year-to-Date Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Gross Pay</span>
                  <span className="font-medium">£{ytdData.grossPay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Income Tax</span>
                  <span className="font-medium">£{ytdData.taxPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>National Insurance</span>
                  <span className="font-medium">£{ytdData.nationalInsurance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pension</span>
                  <span className="font-medium">£{ytdData.pension.toFixed(2)}</span>
                </div>
                {payslip.studentLoan > 0 && (
                  <div className="flex justify-between items-center">
                    <span>Student Loan</span>
                    <span className="font-medium">£{ytdData.studentLoan.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 mt-2 border-t flex justify-between items-center font-bold">
                  <span>Net Pay YTD</span>
                  <span>£{ytdData.netPay.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-6 text-sm text-muted-foreground">
          <div className="w-full space-y-2">
            <p>
              {companyInfo.name} | {companyInfo.address} | {companyInfo.phone}
            </p>
            <p>
              {companyInfo.email} | {companyInfo.website}
            </p>
            <p>
              {companyInfo.registrationNumber} | {companyInfo.vatNumber}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payslip;