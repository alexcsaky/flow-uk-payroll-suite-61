
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Info } from "lucide-react";
import { PersonalInfoForm } from "@/components/employees/onboarding/PersonalInfoForm";
import { JobDetailsForm } from "@/components/employees/onboarding/JobDetailsForm";
import { PayrollTaxForm } from "@/components/employees/onboarding/PayrollTaxForm";
import { BankInfoForm } from "@/components/employees/onboarding/BankInfoForm";
import { AttachmentsForm } from "@/components/employees/onboarding/AttachmentsForm";
import { ReviewForm } from "@/components/employees/onboarding/ReviewForm";
import { OnboardingProgress } from "@/components/employees/onboarding/OnboardingProgress";

// Draft employee key for local storage
const EMPLOYEE_DRAFT_KEY = "employee_onboarding_draft";

// Initial employee data structure
const initialEmployeeState = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      county: "",
      postcode: "",
    },
    niNumber: "", // National Insurance number
    isComplete: false,
  },
  job: {
    title: "",
    department: "",
    startDate: "",
    employmentType: "full-time", // full-time, part-time, contractor
    managerName: "",
    location: "",
    isComplete: false,
  },
  payroll: {
    salary: "",
    salaryPeriod: "annual", // annual, monthly, hourly
    taxCode: "",
    niCategory: "A", // National Insurance category
    hasStudentLoan: false,
    studentLoanPlan: "",
    hasPension: false,
    pensionScheme: "",
    pensionContribution: "",
    p45Provided: false,
    previousEmployer: "",
    previousTaxPaid: "",
    previousEarnings: "",
    isComplete: false,
  },
  bankInfo: {
    accountName: "",
    accountNumber: "",
    sortCode: "",
    bankName: "",
    paymentMethod: "bank-transfer", // bank-transfer, check
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
  }
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
  const navigate = useNavigate();

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

  // Auto-save changes to localStorage
  useEffect(() => {
    // Only save if we've made changes to the initial state
    if (JSON.stringify(employeeData) !== JSON.stringify(initialEmployeeState)) {
      localStorage.setItem(EMPLOYEE_DRAFT_KEY, JSON.stringify(employeeData));
      setHasDraft(true);
    }
  }, [employeeData]);

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
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Here you would normally make an API call to save the employee data
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the draft from localStorage after successful submission
      localStorage.removeItem(EMPLOYEE_DRAFT_KEY);
      
      toast.success("Employee added successfully");
      navigate("/employees");
    } catch (error) {
      toast.error("Failed to add employee. Please try again.");
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
          <h2 className="text-3xl font-bold tracking-tight">Employee Onboarding</h2>
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
