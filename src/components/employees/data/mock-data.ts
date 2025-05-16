
// Mock employee data
export const employeesData = [
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
