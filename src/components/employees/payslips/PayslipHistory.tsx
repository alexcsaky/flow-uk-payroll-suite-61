
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
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

const PayslipHistory: React.FC<{ payslips: Payslip[], employeeId: string }> = ({ payslips, employeeId }) => {
  // Static employee data for PDF generation
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
  
  // Helper function to generate and download PDF
  const handleDownloadPDF = (payslip: Payslip) => {
    // Find employee data
    const employee = employeesData.find(emp => emp.id === employeeId);
    
    if (!employee) {
      console.error("Employee not found for PDF generation");
      return;
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

export default PayslipHistory;
