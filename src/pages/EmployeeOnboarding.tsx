import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Info, ShieldCheck, ShieldAlert, ShieldX, Save } from "lucide-react";
import { PersonalInfoForm } from "@/components/employees/onboarding/PersonalInfoForm";
import { JobDetailsForm } from "@/components/employees/onboarding/JobDetailsForm";
import { PayrollTaxForm } from "@/components/employees/onboarding/PayrollTaxForm";
import { BankInfoForm } from "@/components/employees/onboarding/BankInfoForm";
import { AttachmentsForm } from "@/components/employees/onboarding/AttachmentsForm";
import { ReviewForm } from "@/components/employees/onboarding/ReviewForm";
import { OnboardingProgress } from "@/components/employees/onboarding/OnboardingProgress";
import { validateEmployeeData } from "@/utils/hmrc-validation";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Draft employee key for local storage
const EMPLOYEE_DRAFT_KEY = "employee_onboarding_draft";

// Initial employee data structure
const initialEmployeeState = {
  // Top level fields
  employeeId: uuidv4(),
  status: "onboarding",
  complianceStatus: "needs_approval",
  createdAt: new Date().toISOString(),
  createdBy: "current-user", // This would normally be the current user's ID
  updatedAt: new Date().toISOString(),
  updatedBy: "current-user", // This would normally be the current user's ID

  // Main sections
  personal: {
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    preferredName: "",
    address: {
      line1: "",
      line2: "",
      line3: "",
      city: "",
      county: "",
      postcode: "",
      country: "GB",
    },
    niNumber: "", // National Insurance number
    nationality: "",
    isComplete: false,
  },

  job: {
    title: "",
    department: "",
    startDate: "",
    employmentType: "full-time", // full-time, part-time, contractor, director, ir35-worker
    managerName: "",
    location: "",
    normalHours: "",
    irregularPayment: false,
    offPayrollWorker: false,
    secondedFromAbroad: false,
    isComplete: false,
  },

  payroll: {
    salary: "",
    salaryPeriod: "annual", // annual, monthly, weekly, etc.
    taxCode: "",
    w1m1Basis: false,
    niCategory: "A", // National Insurance category
    niCategoryStartDate: "",
    isDirector: false,
    directorNiMethod: "cumulative",
    exemptFromNi: false,
    workplacePostcode: "",
    hasStudentLoan: false,
    studentLoanPlan: "",
    hasPostgradLoan: false,
    starterDeclaration: "",
    previousPayToDate: "",
    previousTaxToDate: "",
    secondedEmployee: false,
    hasPension: false,
    pensionScheme: "",
    pensionContribution: "",
    p45Provided: false,
    previousEmployer: "",
    previousTaxPaid: "", // Added missing field
    previousEarnings: "", // Added missing field
    isComplete: false,
  },

  bankInfo: {
    accountName: "",
    accountNumber: "",
    sortCode: "",
    bankName: "",
    buildingSocietyRef: "",
    paymentMethod: "bacs", // bacs, cheque, cash
    payslipDelivery: "portal", // portal, email, print
    payslipPassword: "",
    isComplete: false,
  },

  attachments: {
    p45Uploaded: false,
    rtwUploaded: false, // Right to work
    contractUploaded: false,
    otherDocuments: [],
    isComplete: false,
  },

  review: {
    isComplete: false,
  },

  // External IDs (optional)
  externalIds: {
    hrSystemId: "",
    payrollId: "",
    glCode: "",
  },

  // No change requests initially
  changeRequests: []
};

// Steps in the onboarding process
const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "job", label: "Job Details" },
  { id: "payroll", label: "Payroll & Tax" },
  { id: "bankInfo", label: "Bank Info" },
  { id: "attachments", label: "Attachments" },
  { id: "review", label: "Review" },
];

const EmployeeOnboarding = () => {
  const [currentStep, setCurrentStep] = useState("personal");
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const isEditMode = searchParams.get("edit") !== null;
  const employeeId = searchParams.get("edit");

  // Load draft data from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(EMPLOYEE_DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setEmployeeData(parsedDraft);
        setHasDraft(true);
      } catch (error) {
        console.error("Failed to parse draft data:", error);
      }
    }
  }, []);

  // Debounced save function
  const debouncedSave = useCallback(() => {
    if (isDirty) {
      localStorage.setItem(EMPLOYEE_DRAFT_KEY, JSON.stringify({
        ...employeeData,
        updatedAt: new Date().toISOString()
      }));
      setHasDraft(true);
      setIsDirty(false);
    }
  }, [employeeData, isDirty]);

  // Set up debounced save effect
  useEffect(() => {
    const timeoutId = setTimeout(debouncedSave, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedSave, employeeData]);

  // Handle step navigation
  const handleNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  // Update employee data from any form
  const updateEmployeeData = (section, data) => {
    setEmployeeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
    setIsDirty(true);

    // Update validation errors when data changes
    const result = validateEmployeeData(employeeData);
    if (!result.isValid) {
      setValidationErrors(result.errors);
    } else {
      setValidationErrors({});
    }
  };

  // Calculate compliance status based on validation
  const calculateComplianceStatus = () => {
    // Critical errors - missing required data
    if (Object.keys(validationErrors).length > 0) {
      return "error";
    }
    
    // Warnings - missing recommended data
    if (
      !employeeData.personal.phone ||
      !employeeData.job.title ||
      !employeeData.attachments.contractUploaded
    ) {
      return "warning";
    }
    
    // Clear if everything is provided
    return "clear";
  };

  // Get the icon for current compliance status
  const getComplianceIcon = () => {
    const status = calculateComplianceStatus();
    switch (status) {
      case "clear":
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
      case "warning":
        return <ShieldAlert className="h-5 w-5 text-amber-500" />;
      case "error":
      default:
        return <ShieldX className="h-5 w-5 text-red-500" />;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate the data
      const result = validateEmployeeData(employeeData);
      if (!result.isValid) {
        setValidationErrors(result.errors);
        toast.error("Please fix the validation errors before submitting");
        return;
      }

      // Calculate compliance status
      const complianceStatus = calculateComplianceStatus();

      // Prepare the data for submission
      const submissionData = {
        ...employeeData,
        complianceStatus,
        updatedAt: new Date().toISOString()
      };

      // In a real app, this would be an API call
      console.log("Submitting employee data:", submissionData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the draft
      localStorage.removeItem(EMPLOYEE_DRAFT_KEY);
      
      // Show success message
      toast.success("Employee onboarding completed successfully");
      
      // Navigate to employee list
      navigate("/employees");
    } catch (error) {
      console.error("Error submitting employee data:", error);
      toast.error("Failed to submit employee data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    if (hasDraft) {
      if (confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        navigate("/employees");
      }
    } else {
      navigate("/employees");
    }
  };

  useEffect(() => {
    if (isEditMode && employeeId) {
      // In a real app, you would fetch the employee data from your API
      // For now, we'll use mock data that matches the profile structure
      const mockEmployeeData = {
        id: employeeId,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+44 7123 456789",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        startDate: "2024-01-01",
        nationalInsurance: "AB123456C",
        taxCode: "1250L"
      };

      // Map the profile data to the onboarding form structure
      setEmployeeData({
        ...initialEmployeeState,
        employeeId: mockEmployeeData.id,
        status: mockEmployeeData.status.toLowerCase(),
        personal: {
          ...initialEmployeeState.personal,
          firstName: mockEmployeeData.name.split(" ")[0],
          lastName: mockEmployeeData.name.split(" ").slice(1).join(" "),
          email: mockEmployeeData.email,
          phone: mockEmployeeData.phone,
          niNumber: mockEmployeeData.nationalInsurance,
          isComplete: true
        },
        job: {
          ...initialEmployeeState.job,
          title: mockEmployeeData.role,
          department: mockEmployeeData.department,
          startDate: mockEmployeeData.startDate,
          isComplete: true
        },
        payroll: {
          ...initialEmployeeState.payroll,
          taxCode: mockEmployeeData.taxCode,
          isComplete: true
        }
      });
    }
  }, [isEditMode, employeeId]);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCancel}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Employee Details" : "Employee Onboarding"}
          </h2>
          <p className="text-muted-foreground">Add a new employee to your organization</p>
        </div>
      </div>

      {hasDraft && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            You have a draft in progress. Your changes are being automatically saved.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            {getComplianceIcon()}
          </div>
          <span className="text-sm">
            HMRC Compliance Status: 
            <span className={`ml-1 font-semibold ${
              calculateComplianceStatus() === 'clear' ? 'text-green-600' : 
              calculateComplianceStatus() === 'warning' ? 'text-amber-600' : 'text-red-600'
            }`}>
              {calculateComplianceStatus() === 'clear' ? 'All Required Information Provided' : 
               calculateComplianceStatus() === 'warning' ? 'Recommended Information Missing' : 'Required Information Missing'}
            </span>
          </span>
        </div>
      </div>

      <OnboardingProgress 
        steps={steps} 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        employeeData={employeeData}
      />

      <Card className="mt-4">
        <CardContent className="pt-6">
          <Tabs value={currentStep} onValueChange={setCurrentStep}>
            <TabsContent value="personal" className="p-0">
              <PersonalInfoForm 
                data={employeeData.personal}
                updateData={(data) => updateEmployeeData("personal", data)}
                onNext={handleNextStep}
              />
            </TabsContent>
            
            <TabsContent value="job" className="p-0">
              <JobDetailsForm 
                data={employeeData.job}
                updateData={(data) => updateEmployeeData("job", data)}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            </TabsContent>
            
            <TabsContent value="payroll" className="p-0">
              <PayrollTaxForm 
                data={employeeData.payroll}
                updateData={(data) => updateEmployeeData("payroll", data)}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            </TabsContent>
            
            <TabsContent value="bankInfo" className="p-0">
              <BankInfoForm 
                data={employeeData.bankInfo}
                updateData={(data) => updateEmployeeData("bankInfo", data)}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            </TabsContent>
            
            <TabsContent value="attachments" className="p-0">
              <AttachmentsForm 
                data={employeeData.attachments}
                updateData={(data) => updateEmployeeData("attachments", data)}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            </TabsContent>
            
            <TabsContent value="review" className="p-0">
              <ReviewForm 
                employeeData={employeeData}
                onSubmit={handleSubmit}
                onPrev={handlePrevStep}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeOnboarding;
