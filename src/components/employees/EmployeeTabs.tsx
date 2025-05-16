
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInformationCard from "./PersonalInformationCard";
import EmploymentInformationCard from "./EmploymentInformationCard";
import PayrollInformationCard from "./PayrollInformationCard";
import DeductionsBenefitsCard from "./DeductionsBenefitsCard";
import CurrentPayslipCard from "./payslips/CurrentPayslipCard";
import PayslipHistory from "./payslips/PayslipHistory";
import EmptyPayslipCard from "./EmptyPayslipCard";
import { Exception } from "./ExceptionBanner";

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

interface EmployeeTabsProps {
  employee: Employee;
  payslips: Payslip[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const EmployeeTabs: React.FC<EmployeeTabsProps> = ({
  employee,
  payslips,
  currentTab,
  setCurrentTab,
}) => {
  const currentPayslip = payslips.length > 0 ? payslips[0] : null;
  
  return (
    <Tabs defaultValue="details" onValueChange={setCurrentTab} value={currentTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Employee Details</TabsTrigger>
        <TabsTrigger value="payroll">Payroll Information</TabsTrigger>
        <TabsTrigger value="payslips">Payslips</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-6 mt-6">
        <PersonalInformationCard employee={employee} />
        <EmploymentInformationCard employee={employee} />
      </TabsContent>
      
      <TabsContent value="payroll" className="space-y-6 mt-6">
        <PayrollInformationCard employee={employee} />
        <DeductionsBenefitsCard employee={employee} />
      </TabsContent>
      
      <TabsContent value="payslips" className="space-y-6 mt-6">
        {currentPayslip && (
          <CurrentPayslipCard payslip={currentPayslip} employeeId={employee.id} />
        )}
        
        {payslips.length > 1 && (
          <PayslipHistory payslips={payslips.slice(1)} employeeId={employee.id} />
        )}
        
        {payslips.length === 0 && <EmptyPayslipCard />}
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTabs;
