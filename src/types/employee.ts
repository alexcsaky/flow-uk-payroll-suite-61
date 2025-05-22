export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'on_leave';
  startDate: string;
  salary: number;
  taxCode: string;
  nationalInsurance: string;
  bankAccount: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  avatarUrl?: string;
  isOnMaternityLeave: boolean;
  isOnPaternityLeave: boolean;
  isOnSickLeave: boolean;
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string;
  date: string;
  status: 'pending' | 'approved' | 'paid';
  grossPay: number;
  taxPaid: number;
  nationalInsurance: number;
  pension: number;
  studentLoan?: number;
  netPay: number;
  earnings: PayslipItem[];
  deductions: PayslipItem[];
}

export interface PayslipItem {
  label: string;
  amount: number;
}

export interface YearToDateData {
  grossPay: number;
  taxPaid: number;
  nationalInsurance: number;
  pension: number;
  studentLoan?: number;
  netPay: number;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  registrationNumber: string;
  vatNumber: string;
}

export interface EmployeeFormData extends Omit<Employee, 'id' | 'status' | 'startDate'> {
  startDate?: string;
  status?: Employee['status'];
}

// Extended jsPDF types
declare module 'jspdf' {
  interface jsPDF {
    previousAutoTable: {
      finalY: number;
    } | undefined;
    internal: {
      getNumberOfPages(): number;
      getCurrentPageInfo(): {
        pageNumber: number;
      };
      pageSize: {
        height: number;
      };
    };
  }
} 