import { Payslip } from "@/types/payslip";

export interface YearToDateData {
  grossPay: number;
  taxPaid: number;
  nationalInsurance: number;
  pension: number;
  studentLoan: number;
  netPay: number;
}

export const calculateYearToDate = (payslip: Payslip, multiplier: number = 4): YearToDateData => {
  return {
    grossPay: payslip.grossPay * multiplier,
    taxPaid: payslip.taxPaid * multiplier,
    nationalInsurance: payslip.nationalInsurance * multiplier,
    pension: payslip.pension * multiplier,
    studentLoan: payslip.studentLoan * multiplier,
    netPay: payslip.netPay * multiplier
  };
};

export const calculateTotalEarnings = (earnings: Array<{ amount: number }>): number => {
  return earnings.reduce((sum, item) => sum + item.amount, 0);
};

export const calculateTotalDeductions = (deductions: Array<{ amount: number }>): number => {
  return deductions.reduce((sum, item) => sum + item.amount, 0);
};

export const getStatutoryPayComponents = (
  isOnMaternityLeave: boolean,
  isOnPaternityLeave: boolean,
  isOnSickLeave: boolean
): Array<{ label: string; amount: number }> => {
  const components: Array<{ label: string; amount: number }> = [];

  if (isOnSickLeave) {
    components.push({ label: "SSP 14/3-18/3", amount: 250.00 });
  }

  if (isOnMaternityLeave) {
    components.push({ label: "SMP 01/4-30/4", amount: 800.00 });
  }

  if (isOnPaternityLeave) {
    components.push({ label: "SPP 05/6-19/6", amount: 450.00 });
  }

  return components;
}; 