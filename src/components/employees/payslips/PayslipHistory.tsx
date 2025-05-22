import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { generatePayslipPDF } from "@/lib/pdf/payslip-pdf";
import { employeesData } from "../data/mock-data";
import { calculateYearToDate, calculateTotalEarnings, calculateTotalDeductions, getStatutoryPayComponents } from "@/lib/utils/payslip-calculations";
import { Employee } from "@/types/employee";
import { Payslip } from "@/types/payslip";

interface PayslipHistoryProps {
  payslips: Payslip[];
  employeeId: string;
}

const PayslipHistory: React.FC<PayslipHistoryProps> = ({ payslips, employeeId }) => {
  // Helper function to generate and download PDF
  const handleDownloadPDF = (payslip: Payslip) => {
    // Find employee data
    const employee = employeesData.find(emp => emp.id === employeeId) as Employee;
    
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
    
    // Get statutory pay components based on employee's leave status
    const statutoryPay = getStatutoryPayComponents(
      employee.isOnMaternityLeave,
      employee.isOnPaternityLeave,
      employee.isOnSickLeave
    );
    
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
    
    // Calculate totals using utility functions
    const totalEarnings = calculateTotalEarnings(allEarnings);
    const totalDeductions = calculateTotalDeductions(deductions);
    
    // Year-to-date calculations using utility function
    const ytdData = calculateYearToDate(payslip);
    
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Gross Pay</TableHead>
              <TableHead className="text-right">Net Pay</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payslips.map((payslip) => (
              <TableRow key={payslip.id}>
                <TableCell className="font-medium">{payslip.period}</TableCell>
                <TableCell>{format(new Date(payslip.date), "dd MMM yyyy")}</TableCell>
                <TableCell className="text-right">£{payslip.grossPay.toFixed(2)}</TableCell>
                <TableCell className="text-right">£{payslip.netPay.toFixed(2)}</TableCell>
                <TableCell className="text-right">{payslip.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/payslips/${employeeId}/${payslip.id}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadPDF(payslip)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PayslipHistory;
