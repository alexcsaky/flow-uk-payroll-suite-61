import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Download,
  FileText,
  MoreHorizontal,
  Search,
  UserPlus,
  Calendar
} from "lucide-react";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Operations",
    role: "Manager",
    status: "Active"
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Human Resources",
    role: "HR Specialist",
    status: "Active"
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Finance",
    role: "Accountant",
    status: "Active"
  },
  {
    id: "EMP004",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    department: "IT",
    role: "Developer",
    status: "Active"
  },
  {
    id: "EMP005",
    name: "James Taylor",
    email: "james.taylor@example.com",
    department: "Sales",
    role: "Sales Representative",
    status: "On Leave"
  },
  {
    id: "EMP006",
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
    department: "Marketing",
    role: "Marketing Coordinator",
    status: "Active"
  },
  {
    id: "EMP007",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    department: "Operations",
    role: "Supervisor",
    status: "Active"
  },
  {
    id: "EMP008",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    department: "Legal",
    role: "Legal Advisor",
    status: "Inactive"
  }
];

type WizardStep = {
  id: string;
  title: string;
}

type EmployeeFormData = {
  title: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  dateOfBirth: string;
  gender: string;
  birthSex: string;
  
  dateOfJoining: string;
  workerType: string;
  engagementType: string;
  
  rtwDocumentType: string;
  rtwExpiryDate: string;
  rtwCheckDate: string;
  rtwDocumentAttachment?: File;
  
  nationalInsuranceNumber: string;
  uniqueTaxpayerReference?: string;
  initialTaxCode: string;
  starterDeclaration: string;
  studentLoanIndicator: string;
  postgraduateLoanIndicator: boolean;
  previousPayToDate?: number;
  previousTaxPaidToDate?: number;
  payrollFrequency: string;
  
  autoEnrollPensionScheme: string;
  pensionOptOut: boolean;
  holidayScheme: string;
  holidayAccrualRate?: number;
  
  paymentMethod: string;
  bankName: string;
  bankSortCode: string;
  bankAccountNumber: string;
  bankAddress?: string;
  iban?: string;
  
  payslipDeliveryMethod: string;
  awrEligibilityFlag: boolean;
};

function generateWorkerId() {
  return (
    "WKR" +
    Math.floor(100000 + Math.random() * 900000).toString()
  );
}

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeData, setEmployeeData] = useState<EmployeeFormData>({
    workerId: generateWorkerId(),
    title: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    dateOfBirth: "",
    gender: "",
    birthSex: "",
    
    dateOfJoining: "",
    workerType: "",
    engagementType: "",
    
    rtwDocumentType: "",
    rtwExpiryDate: "",
    rtwCheckDate: "",
    
    nationalInsuranceNumber: "",
    initialTaxCode: "",
    starterDeclaration: "",
    studentLoanIndicator: "None",
    postgraduateLoanIndicator: false,
    payrollFrequency: "",
    
    autoEnrollPensionScheme: "",
    pensionOptOut: false,
    holidayScheme: "",
    
    paymentMethod: "",
    bankName: "",
    bankSortCode: "",
    bankAccountNumber: "",
    
    payslipDeliveryMethod: "Portal",
    awrEligibilityFlag: true,
  });
  
  const navigate = useNavigate();
  
  const wizardSteps: WizardStep[] = [
    { id: "personal", title: "Personal Information" },
    { id: "employment", title: "Employment Details" },
    { id: "rtw", title: "Right-to-Work" },
    { id: "tax", title: "Tax & Payroll Setup" },
    { id: "pension", title: "Pension & Holiday" },
    { id: "banking", title: "Banking Details" },
    { id: "preferences", title: "Preferences & Flags" },
  ];
  
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewDetails = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };
  
  const handleAddEmployee = () => {
    setEmployeeData({
      workerId: generateWorkerId(),
      title: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      dateOfBirth: "",
      gender: "",
      birthSex: "",
      dateOfJoining: "",
      workerType: "",
      engagementType: "",
      rtwDocumentType: "",
      rtwExpiryDate: "",
      rtwCheckDate: "",
      rtwDocumentAttachment: undefined,
      nationalInsuranceNumber: "",
      uniqueTaxpayerReference: "",
      initialTaxCode: "",
      starterDeclaration: "",
      studentLoanIndicator: "None",
      postgraduateLoanIndicator: false,
      previousPayToDate: undefined,
      previousTaxPaidToDate: undefined,
      payrollFrequency: "",
      autoEnrollPensionScheme: "",
      pensionOptOut: false,
      holidayScheme: "",
      holidayAccrualRate: undefined,
      paymentMethod: "",
      bankName: "",
      bankSortCode: "",
      bankAccountNumber: "",
      bankAddress: "",
      iban: "",
      payslipDeliveryMethod: "Portal",
      awrEligibilityFlag: true,
    });
    setCurrentStep(0);
    setShowAddEmployeeDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowAddEmployeeDialog(false);
  };
  
  const handleInputChange = (field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!employeeData.fullName || employeeData.fullName.length > 100) {
        toast.error("Full name is required (max 100 characters)");
        return;
      }
      if (!employeeData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(employeeData.email)) {
        toast.error("Valid email is required");
        return;
      }
      if (!employeeData.homeAddress) {
        toast.error("Home Address is required");
        return;
      }
      if (!employeeData.dateOfBirth) {
        toast.error("Date of Birth is required");
        return;
      }
    }
    if (currentStep === 1) {
      if (!employeeData.dateOfJoining) {
        toast.error("Date of Joining is required");
        return;
      }
      if (!employeeData.workerType) {
        toast.error("Worker Type is required");
        return;
      }
    }
    if (currentStep === 2) {
      if (!employeeData.rtwDocumentType) {
        toast.error("Right-to-Work Document Type is required");
        return;
      }
      if (!employeeData.rtwCheckDate) {
        toast.error("RTW Check Date is required");
        return;
      }
    }
    if (currentStep === 3) {
      if (!employeeData.nationalInsuranceNumber || !/^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]{1}$/.test(employeeData.nationalInsuranceNumber.trim())) {
        toast.error("Valid National Insurance Number is required (e.g. QQ123456C)");
        return;
      }
      if (!employeeData.initialTaxCode) {
        toast.error("Initial Tax Code is required");
        return;
      }
      if (!employeeData.starterDeclaration) {
        toast.error("Starter Declaration is required");
        return;
      }
      if (!employeeData.studentLoanIndicator) {
        toast.error("Student Loan selection is required");
        return;
      }
      if (!employeeData.payrollFrequency) {
        toast.error("Payroll Frequency is required");
        return;
      }
    }
    if (currentStep === 4) {
      if (!employeeData.autoEnrollPensionScheme) {
        toast.error("Auto-Enroll Pension Scheme is required");
        return;
      }
      if (!employeeData.holidayScheme) {
        toast.error("Holiday Scheme is required");
        return;
      }
    }
    if (currentStep === 5) {
      if (!employeeData.paymentMethod) {
        toast.error("Payment Method is required");
        return;
      }
      if (!employeeData.bankName) {
        toast.error("Bank Name is required");
        return;
      }
      if (!employeeData.bankSortCode || !/^\d{6}$/.test(employeeData.bankSortCode)) {
        toast.error("Valid 6-digit Bank Sort Code is required");
        return;
      }
      if (!employeeData.bankAccountNumber || !/^\d{8}$/.test(employeeData.bankAccountNumber)) {
        toast.error("Valid 8-digit Bank Account Number is required");
        return;
      }
    }
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitEmployee();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitEmployee = () => {
    if (!employeeData.fullName || !employeeData.email) {
      toast.error("Full name and email are required");
      return;
    }
    
    toast.success("Employee added successfully");
    handleCloseDialog();
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 0: // Personal Information
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Worker ID</Label>
              <div className="col-span-3">
                <Input value={employeeData.workerId} readOnly className="bg-muted" />
                <p className="text-xs text-muted-foreground mt-1">Internal identifier linking worker records across modules</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <div className="col-span-3">
                <Select value={employeeData.title} onValueChange={(value) => handleInputChange("title", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Prof">Prof</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Personal title for correspondence</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name *
              </Label>
              <div className="col-span-3">
                <Input
                  id="fullName"
                  maxLength={100}
                  value={employeeData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Worker's full legal name used on contracts and payslips</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="homeAddress" className="text-right pt-2">
                Home Address *
              </Label>
              <div className="col-span-3">
                <textarea 
                  id="homeAddress"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={employeeData.homeAddress}
                  onChange={(e) => handleInputChange("homeAddress", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Residential address lines, city, postcode, country</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={employeeData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Used for payslip delivery / portal access</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <div className="col-span-3">
                <Input
                  id="phoneNumber"
                  value={employeeData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  pattern="^[+]?[\d\s()-]+$"
                />
                <p className="text-xs text-muted-foreground mt-1">Contact number for queries or emergencies</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date of Birth *
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={employeeData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    required
                  />
                  <Calendar className="ml-2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Used for age-based rules (NMW, NI cat under 21)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">Gender</Label>
              <div className="col-span-3">
                <Select value={employeeData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">For equality monitoring</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthSex" className="text-right">Birth Sex</Label>
              <div className="col-span-3">
                <Select value={employeeData.birthSex} onValueChange={(value) => handleInputChange("birthSex", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select birth sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">If captured separately for compliance</p>
              </div>
            </div>
          </div>
        );
      
      case 1: // Employment Details
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfJoining" className="text-right">
                Date of Joining *
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Input
                    id="dateOfJoining"
                    name="dateOfJoining"
                    type="date"
                    value={employeeData.dateOfJoining}
                    onChange={(e) => handleInputChange("dateOfJoining", e.target.value)}
                  />
                  <Calendar className="ml-2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Date registered/onboarded with agency</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workerType" className="text-right">Worker Type *</Label>
              <div className="col-span-3">
                <Select value={employeeData.workerType} onValueChange={(value) => handleInputChange("workerType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select worker type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temp">Temp</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="ltd">Ltd</SelectItem>
                    <SelectItem value="umbrella">Umbrella</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Drives payroll flow (PAYE vs invoice)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="engagementType" className="text-right">Engagement Type</Label>
              <div className="col-span-3">
                <Select value={employeeData.engagementType} onValueChange={(value) => handleInputChange("engagementType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engagement type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="zero-hours">Zero-hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Nature of engagement for HR reporting</p>
              </div>
            </div>
          </div>
        );
      
      case 2: // Right-to-Work
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rtwDocumentType" className="text-right">RTW Document Type *</Label>
              <div className="col-span-3">
                <Select value={employeeData.rtwDocumentType} onValueChange={(value) => handleInputChange("rtwDocumentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="brp">BRP</SelectItem>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="settled-status">Settled Status</SelectItem>
                    <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Passport, BRP, Visa, Settled Status, etc.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rtwExpiryDate" className="text-right">
                RTW Expiry Date *
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Input
                    id="rtwExpiryDate"
                    name="rtwExpiryDate"
                    type="date"
                    value={employeeData.rtwExpiryDate}
                    onChange={(e) => handleInputChange("rtwExpiryDate", e.target.value)}
                  />
                  <Calendar className="ml-2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Triggers compliance alerts before expiry</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rtwCheckDate" className="text-right">
                RTW Check Date *
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Input
                    id="rtwCheckDate"
                    name="rtwCheckDate"
                    type="date"
                    value={employeeData.rtwCheckDate}
                    onChange={(e) => handleInputChange("rtwCheckDate", e.target.value)}
                  />
                  <Calendar className="ml-2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Date RTW was verified</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rtwDocumentAttachment" className="text-right">RTW Document</Label>
              <div className="col-span-3">
                <Input
                  id="rtwDocumentAttachment"
                  name="rtwDocumentAttachment"
                  type="file"
                  onChange={(e) => handleInputChange("rtwDocumentAttachment", e.target.files?.[0])}
                />
                <p className="text-xs text-muted-foreground mt-1">Scan of proof stored for audit</p>
              </div>
            </div>
          </div>
        );
      
      case 3: // Tax & Payroll Setup
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nationalInsuranceNumber" className="text-right">
                National Insurance Number *
              </Label>
              <div className="col-span-3">
                <Input
                  id="nationalInsuranceNumber"
                  name="nationalInsuranceNumber"
                  value={employeeData.nationalInsuranceNumber}
                  onChange={(e) => handleInputChange("nationalInsuranceNumber", e.target.value)}
                  placeholder="AA123456A"
                />
                <p className="text-xs text-muted-foreground mt-1">Unique NI for PAYE and NI contributions</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uniqueTaxpayerReference" className="text-right">UTR</Label>
              <div className="col-span-3">
                <Input
                  id="uniqueTaxpayerReference"
                  name="uniqueTaxpayerReference"
                  value={employeeData.uniqueTaxpayerReference || ""}
                  onChange={(e) => handleInputChange("uniqueTaxpayerReference", e.target.value)}
                  placeholder="1234567890"
                />
                <p className="text-xs text-muted-foreground mt-1">Unique Taxpayer Reference - Required for CIS/Ltd (10 digits)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="initialTaxCode" className="text-right">
                Initial Tax Code *
              </Label>
              <div className="col-span-3">
                <Input
                  id="initialTaxCode"
                  name="initialTaxCode"
                  value={employeeData.initialTaxCode}
                  onChange={(e) => handleInputChange("initialTaxCode", e.target.value)}
                  placeholder="1257L"
                />
                <p className="text-xs text-muted-foreground mt-1">Starter tax code for PAYE calculation</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="starterDeclaration" className="text-right">Starter Declaration *</Label>
              <div className="col-span-3">
                <Select value={employeeData.starterDeclaration} onValueChange={(value) => handleInputChange("starterDeclaration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select declaration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-job">This is my first job</SelectItem>
                    <SelectItem value="only-job">This is my only job</SelectItem>
                    <SelectItem value="additional-job">This is an additional job</SelectItem>
                    <SelectItem value="pension">I receive a pension</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Sets cumulative or BR tax basis</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="studentLoanIndicator" className="text-right">Student Loan *</Label>
              <div className="col-span-3">
                <Select value={employeeData.studentLoanIndicator} onValueChange={(value) => handleInputChange("studentLoanIndicator", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="plan1">Plan 1</SelectItem>
                    <SelectItem value="plan2">Plan 2</SelectItem>
                    <SelectItem value="plan4">Plan 4</SelectItem>
                    <SelectItem value="plan5">Plan 5</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Triggers loan deductions above threshold</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postgraduateLoanIndicator" className="text-right">Postgraduate Loan</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="postgraduateLoanIndicator"
                  checked={employeeData.postgraduateLoanIndicator}
                  onCheckedChange={(checked) => handleInputChange("postgraduateLoanIndicator", Boolean(checked))}
                />
                <label
                  htmlFor="postgraduateLoanIndicator"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Has postgraduate loan
                </label>
                <p className="text-xs text-muted-foreground ml-2">Adds postgraduate loan deduction</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="previousPayToDate" className="text-right">Previous Pay to Date</Label>
              <div className="col-span-3">
                <Input
                  id="previousPayToDate"
                  name="previousPayToDate"
                  type="number"
                  value={employeeData.previousPayToDate || ""}
                  onChange={(e) => handleInputChange("previousPayToDate", parseFloat(e.target.value))}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground mt-1">YTD taxable pay imported from P45</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="previousTaxPaidToDate" className="text-right">Previous Tax Paid to Date</Label>
              <div className="col-span-3">
                <Input
                  id="previousTaxPaidToDate"
                  name="previousTaxPaidToDate"
                  type="number"
                  value={employeeData.previousTaxPaidToDate || ""}
                  onChange={(e) => handleInputChange("previousTaxPaidToDate", parseFloat(e.target.value))}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground mt-1">YTD tax deducted imported from P45</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payrollFrequency" className="text-right">Payroll Frequency *</Label>
              <div className="col-span-3">
                <Select value={employeeData.payrollFrequency} onValueChange={(value) => handleInputChange("payrollFrequency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Determines pay schedule and cut-offs</p>
              </div>
            </div>
          </div>
        );
      
      case 4: // Pension & Holiday
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="autoEnrollPensionScheme" className="text-right">Auto-Enroll Pension Scheme</Label>
              <div className="col-span-3">
                <Select value={employeeData.autoEnrollPensionScheme} onValueChange={(value) => handleInputChange("autoEnrollPensionScheme", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="nest">NEST</SelectItem>
                    <SelectItem value="peoples-pension">The People's Pension</SelectItem>
                    <SelectItem value="smart-pension">Smart Pension</SelectItem>
                    <SelectItem value="now-pension">NOW: Pension</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Scheme used for workplace pension assessment</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pensionOptOut" className="text-right">Pension Opt-Out</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="pensionOptOut"
                  checked={employeeData.pensionOptOut}
                  onCheckedChange={(checked) => handleInputChange("pensionOptOut", Boolean(checked))}
                />
                <label
                  htmlFor="pensionOptOut"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Opted out of pension
                </label>
                <p className="text-xs text-muted-foreground ml-2">Stops pension deductions if ticked</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="holidayScheme" className="text-right">Holiday Scheme *</Label>
              <div className="col-span-3">
                <Select value={employeeData.holidayScheme} onValueChange={(value) => handleInputChange("holidayScheme", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accrual">12.07% Accrual</SelectItem>
                    <SelectItem value="rolled-up">Rolled-up</SelectItem>
                    <SelectItem value="statutory">Statutory</SelectItem>
                    <SelectItem value="enhanced">Enhanced</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">How holiday is accrued or rolled-up</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="holidayAccrualRate" className="text-right">Holiday Accrual Rate (Override)</Label>
              <div className="col-span-3">
                <Input
                  id="holidayAccrualRate"
                  name="holidayAccrualRate"
                  type="number"
                  value={employeeData.holidayAccrualRate || ""}
                  onChange={(e) => handleInputChange("holidayAccrualRate", parseFloat(e.target.value))}
                  step="0.01"
                  placeholder="12.07"
                />
                <p className="text-xs text-muted-foreground mt-1">Custom accrual % overriding scheme default</p>
              </div>
            </div>
          </div>
        );
      
      case 5: // Banking Details
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">Payment Method *</Label>
              <div className="col-span-3">
                <Select value={employeeData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bacs">BACS</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="faster-payment">Faster Payment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Preferred payment channel</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">
                Bank Name *
              </Label>
              <div className="col-span-3">
                <Input
                  id="bankName"
                  name="bankName"
                  value={employeeData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Name of bank (reference)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankSortCode" className="text-right">
                Bank Sort Code *
              </Label>
              <div className="col-span-3">
                <Input
                  id="bankSortCode"
                  name="bankSortCode"
                  value={employeeData.bankSortCode}
                  onChange={(e) => handleInputChange("bankSortCode", e.target.value)}
                  placeholder="123456"
                />
                <p className="text-xs text-muted-foreground mt-1">UK sort code for BACS file (6 digits)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankAccountNumber" className="text-right">
                Bank Account Number *
              </Label>
              <div className="col-span-3">
                <Input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={employeeData.bankAccountNumber}
                  onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                  placeholder="12345678"
                />
                <p className="text-xs text-muted-foreground mt-1">Account number for salary payment (8 digits)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bankAddress" className="text-right pt-2">
                Bank Address
              </Label>
              <div className="col-span-3">
                <textarea 
                  id="bankAddress"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={employeeData.bankAddress || ""}
                  onChange={(e) => handleInputChange("bankAddress", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Branch address for record</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="iban" className="text-right">
                IBAN
              </Label>
              <div className="col-span-3">
                <Input
                  id="iban"
                  name="iban"
                  value={employeeData.iban || ""}
                  onChange={(e) => handleInputChange("iban", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Used if paying non-UK account</p>
              </div>
            </div>
          </div>
        );
      
      case 6: // Preferences & Flags
        return (
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payslipDeliveryMethod" className="text-right">Payslip Delivery Method *</Label>
              <div className="col-span-3">
                <Select value={employeeData.payslipDeliveryMethod} onValueChange={(value) => handleInputChange("payslipDeliveryMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portal">Portal</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="post">Post</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Controls payslip distribution</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="awrEligibilityFlag" className="text-right">AWR Eligibility</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="awrEligibilityFlag"
                  checked={employeeData.awrEligibilityFlag}
                  onCheckedChange={(checked) => handleInputChange("awrEligibilityFlag", Boolean(checked))}
                />
                <label
                  htmlFor="awrEligibilityFlag"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Worker in scope for AWR
                </label>
                <p className="text-xs text-muted-foreground ml-2">Marks worker in scope for Agency Workers Regulations</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage your employees and their information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flow-gradient" onClick={handleAddEmployee}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Reports</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Employee Summary</DropdownMenuItem>
                  <DropdownMenuItem>Department Breakdown</DropdownMenuItem>
                  <DropdownMenuItem>Payroll Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(employee.id)}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "Active"
                            ? "default"
                            : employee.status === "On Leave"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(employee.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem>Payroll History</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showAddEmployeeDialog} onOpenChange={setShowAddEmployeeDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Step {currentStep + 1} of {wizardSteps.length}: {wizardSteps[currentStep].title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {renderStepContent()}
          </div>
          
          <DialogFooter>
            <div className="w-full flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <div>
                <Button variant="outline" onClick={handleCloseDialog} className="mr-2">Cancel</Button>
                <Button onClick={handleNextStep}>
                  {currentStep < wizardSteps.length - 1 ? "Next" : "Save Employee"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
