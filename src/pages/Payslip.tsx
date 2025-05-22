import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { generatePayslipPDF } from "@/lib/pdf/payslip-pdf";
import { employeesData, payslipsData } from "@/components/employees/data/mock-data";
import { calculateYearToDate, calculateTotalEarnings, calculateTotalDeductions, getStatutoryPayComponents } from "@/lib/utils/payslip-calculations";
import { Employee } from "@/types/employee";
import { Payslip } from "@/types/payslip";

const Payslip = () => {
  const { employeeId, payslipId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [payslip, setPayslip] = useState<Payslip | null>(null);
  
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
  
  return (
    <div className="container mx-auto py-8">
      <Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="pt-2 mt-2 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Statutory Pay</h4>
                  {statutoryPay.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.label}</span>
                      <span className="font-medium">£{item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
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
      </Card>
      
      <div className="mt-6 flex justify-center">
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default Payslip;