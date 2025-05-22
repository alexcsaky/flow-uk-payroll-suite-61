// Mock employee data
export const employeesData = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+44 7123 456789",
    department: "Engineering",
    role: "Senior Software Engineer",
    startDate: "2023-01-15",
    taxCode: "1257L",
    nationalInsurance: "AB123456C",
    bankAccount: "****5678",
    salary: 65000,
    isOnMaternityLeave: false,
    isOnPaternityLeave: false,
    isOnSickLeave: false
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 7234 567890",
    department: "Marketing",
    role: "Marketing Manager",
    startDate: "2023-03-01",
    taxCode: "1257L",
    nationalInsurance: "CD234567D",
    bankAccount: "****9012",
    salary: 52000,
    isOnMaternityLeave: true,
    isOnPaternityLeave: false,
    isOnSickLeave: false
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+44 7345 678901",
    department: "Sales",
    role: "Sales Representative",
    startDate: "2023-02-15",
    taxCode: "1257L",
    nationalInsurance: "EF345678E",
    bankAccount: "****3456",
    salary: 45000,
    isOnMaternityLeave: false,
    isOnPaternityLeave: true,
    isOnSickLeave: false
  },
  {
    id: "EMP004",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+44 7456 789012",
    department: "HR",
    role: "HR Specialist",
    startDate: "2023-04-01",
    taxCode: "1257L",
    nationalInsurance: "GH456789F",
    bankAccount: "****7890",
    salary: 48000,
    isOnMaternityLeave: false,
    isOnPaternityLeave: false,
    isOnSickLeave: true
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
export const payslipsData = {
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
