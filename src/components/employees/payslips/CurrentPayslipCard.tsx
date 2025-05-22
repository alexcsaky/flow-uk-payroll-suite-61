import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { generatePayslipPDF } from "@/lib/pdf/payslip-pdf";
import { employeesData } from "../data/mock-data";
import { calculateYearToDate, calculateTotalEarnings, calculateTotalDeductions, getStatutoryPayComponents } from "@/lib/utils/payslip-calculations";
import { Employee } from "@/types/employee";
import { Payslip } from "@/types/payslip";
import { useNavigate } from "react-router-dom";

interface CurrentPayslipCardProps {
  payslip: Payslip;
  employeeId: string;
}

const CurrentPayslipCard: React.FC<CurrentPayslipCardProps> = ({ payslip, employeeId }) => {
  const navigate = useNavigate();
  
  if (!payslip) return null;
  
  // Find employee data for PDF generation
  const employee = employeesData.find(emp => emp.id === employeeId) as Employee;
  
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

  const handleViewFullPayslip = () => {
    navigate(`/payslips/${employeeId}/${payslip.id}`);
  };
  
  return (
    <Card>
      <CardContent className="p-4">
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
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" onClick={handleViewFullPayslip}>
          <Eye className="mr-2 h-4 w-4" />
          View Full Payslip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentPayslipCard;
