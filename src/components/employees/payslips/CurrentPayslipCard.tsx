import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { generatePayslipPDF } from "../../../lib/pdf/payslip-pdf";

interface Payslip {
  id: string;
  period: string;
  date: string;
  grossPay: number;
  taxPaid: number;
  nationalInsurance: number;
  pension: number;
  studentLoan: number;
  otherDeductions: number;
  netPay: number;
  status: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: string;
  startDate: string;
  salary: number;
  taxCode: string;
  nationalInsurance: string;
  bankAccount: string;
  address: string;
  emergencyContact: string;
  avatarUrl: string;
}

interface CurrentPayslipCardProps {
  payslip: Payslip | null;
  employeeId: string;
}

const CurrentPayslipCard: React.FC<CurrentPayslipCardProps> = ({ payslip, employeeId }) => {
  if (!payslip) return null;
  
  // Sample data for the employeesData array (needed for PDF generation)
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
  
  // Sample earnings breakdown (in a real app, this would come from the API)
  const earnings = [
    { label: "Basic Salary", amount: payslip.grossPay - 500 }, // Subtract allowances for demo
    { label: "Performance Bonus", amount: 300 },
    { label: "Travel Allowance", amount: 200 },
  ];
  
  // Find employee data for PDF generation
  const employee = employeesData.find(emp => emp.id === employeeId) as Employee;
  
  // Determine which statutory pay to show based on employee name
  const isFemaleName = ['Sarah', 'Emma'].includes(employee.name.split(' ')[0]);
  const isMaleName = ['John', 'Michael', 'James'].includes(employee.name.split(' ')[0]);
  
  // Add statutory pay components based on employee name
  const statutoryPay = [
    // SSP is shown for everyone
    { label: "SSP 14/3-18/3", amount: 250.00 },
    // SMP only for female names
    ...(isFemaleName ? [{ label: "SMP 01/4-30/4", amount: 800.00 }] : []),
    // SPP only for male names
    ...(isMaleName ? [{ label: "SPP 05/6-19/6", amount: 450.00 }] : []),
  ];
  
  // Combine regular earnings with statutory pay
  const allEarnings = [...earnings, ...statutoryPay];
  
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
  const totalEarnings = allEarnings.reduce((sum, item) => sum + item.amount, 0);
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
                  <div className="pt-2 mt-2 border-t">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Statutory Pay</h4>
                    {statutoryPay.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-sm font-medium">£{item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
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

export default CurrentPayslipCard;
