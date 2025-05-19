import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Check, 
  AlertTriangle, 
  Loader2, 
  FileText, 
  Download, 
  ChevronRight,
  RefreshCw,
  FileDown,
  Eye,
  Clock,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock Report Dialog
interface MockReportDialogProps {
  open: boolean;
  onClose: () => void;
  reportType: string;
}

const MockReportDialog: React.FC<MockReportDialogProps> = ({ open, onClose, reportType }) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{reportType}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4">
          {reportType === "Validation Report" && (
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-lg mb-2">Data Validation Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Valid records: 42</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Flagged records: 2</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Invalid records: 0</span>
                  </div>
                </div>
              </div>
              
              <table className="w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="border p-2 text-left">Employee</th>
                    <th className="border p-2 text-left">Field</th>
                    <th className="border p-2 text-left">Issue</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Jane Smith</td>
                    <td className="border p-2">Tax Code</td>
                    <td className="border p-2">Missing for current tax year</td>
                    <td className="border p-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Flagged
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">John Davis</td>
                    <td className="border p-2">Overtime</td>
                    <td className="border p-2">Unusually high hours ({">"} 40)</td>
                    <td className="border p-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Flagged
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {reportType === "Gross Pay Breakdown" && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="font-medium text-lg mb-2">Payroll Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pay Period</p>
                    <p>May 1 - May 31, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p>44</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gross Pay</p>
                    <p className="font-medium">£168,432.50</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                    <p>6,782</p>
                  </div>
                </div>
              </div>
              
              <table className="w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="border p-2 text-left">Employee</th>
                    <th className="border p-2 text-left">Basic Pay</th>
                    <th className="border p-2 text-left">Overtime</th>
                    <th className="border p-2 text-left">Bonus</th>
                    <th className="border p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Sarah Johnson</td>
                    <td className="border p-2">£3,250.00</td>
                    <td className="border p-2">£125.50</td>
                    <td className="border p-2">£500.00</td>
                    <td className="border p-2 font-medium">£3,875.50</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Michael Brown</td>
                    <td className="border p-2">£4,100.00</td>
                    <td className="border p-2">£0.00</td>
                    <td className="border p-2">£250.00</td>
                    <td className="border p-2 font-medium">£4,350.00</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Emma Wilson</td>
                    <td className="border p-2">£2,800.00</td>
                    <td className="border p-2">£210.75</td>
                    <td className="border p-2">£0.00</td>
                    <td className="border p-2 font-medium">£3,010.75</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {reportType === "Payslips & HMRC Documentation" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-3">Payslip Bundle</h3>
                  <p className="text-sm text-muted-foreground mb-4">44 payslips generated for May 2025</p>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-sm">payslip-bundle-may-2025.pdf</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-3">HMRC Documentation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">FPS Submission Receipt</span>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-sm">EPS Submission Receipt</span>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="font-medium text-lg mb-2">Submission Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>FPS submitted to HMRC on May 30, 2025 at 14:32</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>EPS submitted to HMRC on May 30, 2025 at 14:33</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Payslips generated for all 44 employees</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {reportType === "Payment Summary" && (
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="font-medium text-lg mb-2">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Net Pay</p>
                    <p className="font-medium">£128,745.32</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Date</p>
                    <p>May 31, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Reference</p>
                    <p>FLOW-PAYROLL-MAY25</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p>BACS Transfer</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between gap-4">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download BACS File
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-1" />
                  Export Payment Report
                </Button>
              </div>
              
              <table className="w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="border p-2 text-left">Employee</th>
                    <th className="border p-2 text-left">Account Details</th>
                    <th className="border p-2 text-left">Amount</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Sarah Johnson</td>
                    <td className="border p-2">**** 4832</td>
                    <td className="border p-2">£2,945.18</td>
                    <td className="border p-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Michael Brown</td>
                    <td className="border p-2">**** 7621</td>
                    <td className="border p-2">£3,267.45</td>
                    <td className="border p-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Emma Wilson</td>
                    <td className="border p-2">**** 1954</td>
                    <td className="border p-2">£2,356.82</td>
                    <td className="border p-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Validation issue review dialog
interface ValidationReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onNavigate: () => void;
  issueType: string;
  description: string;
  targetPage: string;
}

const ValidationReviewDialog: React.FC<ValidationReviewDialogProps> = ({ 
  open, 
  onClose, 
  onConfirm, 
  onNavigate,
  issueType,
  description,
  targetPage
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <h2 className="text-xl font-semibold">{issueType}</h2>
        </div>
        
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="bg-muted/30 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-2">You have two options:</h3>
          <ul className="space-y-2 ml-5 list-disc text-sm">
            <li>Navigate to {targetPage} to review and fix the issues</li>
            <li>Override the warnings and continue with the payroll process</li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-end">
          <Button variant="outline" onClick={onNavigate}>
            Go to {targetPage}
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Override and Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Define the different possible statuses for a step
type StepStatus = "pending" | "in-progress" | "done" | "flagged";

// Interface for ValidationFlag
interface ValidationFlag {
  id: string;
  employeeId: string;
  employeeName: string;
  flagType: string;
  description: string;
  severity: "warning" | "info";
  targetPage?: string;
}

// Interface for a payroll step
interface PayrollStep {
  id: number;
  name: string;
  description: string;
  status: StepStatus;
  isCheckpoint: boolean;
  downloadable: boolean;
  reportTitle?: string;
  flags: ValidationFlag[];
  requiresConfirmation?: boolean;
  targetPage?: string;
}

// Props for the ProcessPayrollModal component
interface ProcessPayrollModalProps {
  open: boolean;
  onClose: () => void;
}

export const ProcessPayrollModal: React.FC<ProcessPayrollModalProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [currentReportType, setCurrentReportType] = useState("");
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [currentValidationIssue, setCurrentValidationIssue] = useState({ 
    type: "", 
    description: "", 
    targetPage: "" 
  });
  
  // Mock steps data with initial status
  const [steps, setSteps] = useState<PayrollStep[]>([
    {
      id: 1,
      name: "Pre-Processing Data Validation",
      description: "Checking employee data for completeness and accuracy",
      status: "pending",
      isCheckpoint: true,
      downloadable: true,
      reportTitle: "Validation Report",
      flags: [],
      targetPage: "employees"
    },
    {
      id: 2,
      name: "Timesheet & Absence Verification",
      description: "Verifying timesheets and absence records",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      flags: [],
      targetPage: "timesheets"
    },
    {
      id: 3,
      name: "Variable Pay Inputs Import",
      description: "Importing bonus, commission, and other variable pay data",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      flags: [],
      targetPage: "payroll"
    },
    {
      id: 4,
      name: "Gross Pay Calculation",
      description: "Calculating salary, hourly pay, overtime, bonuses, and expenses",
      status: "pending",
      isCheckpoint: false,
      downloadable: true,
      reportTitle: "Gross Pay Breakdown",
      flags: [],
      targetPage: "payroll"
    },
    {
      id: 5,
      name: "Statutory Deductions",
      description: "Calculating PAYE, NI, student loans, and court orders",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      flags: [],
      targetPage: "settings"
    },
    {
      id: 6,
      name: "Voluntary Deductions",
      description: "Processing pension contributions, benefits, and union fees",
      status: "pending",
      isCheckpoint: true,
      downloadable: true,
      reportTitle: "Payslips & HMRC Documentation",
      flags: [],
      targetPage: "settings"
    },
    {
      id: 7,
      name: "Net Pay Calculation",
      description: "Finalizing pay after all deductions",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      flags: [],
      targetPage: "dashboard"
    },
    {
      id: 8,
      name: "Reporting & Compliance Outputs",
      description: "Generating payslips, RTI submissions, and compliance documents",
      status: "pending",
      isCheckpoint: false,
      downloadable: true,
      reportTitle: "Payment Summary",
      flags: [],
      targetPage: "dashboard"
    },
    {
      id: 9,
      name: "Banking & Accounting Integration",
      description: "Preparing BACS files and accounting entries",
      status: "pending",
      isCheckpoint: true,
      downloadable: false,
      requiresConfirmation: true,
      flags: [],
      targetPage: "dashboard"
    }
  ]);

  // Open report dialog
  const openReportDialog = (reportType: string) => {
    setCurrentReportType(reportType);
    setReportDialogOpen(true);
  };

  // Close report dialog
  const closeReportDialog = () => {
    setReportDialogOpen(false);
  };

  // Open validation review dialog
  const openValidationDialog = (type: string, description: string, targetPage: string) => {
    setCurrentValidationIssue({ type, description, targetPage });
    setValidationDialogOpen(true);
  };

  // Close validation dialog
  const closeValidationDialog = () => {
    setValidationDialogOpen(false);
  };

  // Navigate to the relevant page based on the issue
  const navigateToRelevantPage = () => {
    const step = steps[currentStepIndex];
    const targetPage = step.targetPage || "dashboard";
    closeValidationDialog();
    onClose();
    navigate(`/${targetPage}`);
    
    toast({
      title: "Navigated to " + targetPage,
      description: "Please review and fix the issues before continuing the payroll process.",
    });
  };

  // Generate mock validation flags (10-20% chance)
  const generateMockValidationFlags = (step: number): ValidationFlag[] => {
    // Only generate flags with a 10-20% chance
    if (Math.random() > 0.8) {
      if (step === 0) {
        return [
          {
            id: "flag-1",
            employeeId: "EMP-2023-001",
            employeeName: "Jane Smith",
            flagType: "missing-data",
            description: "Tax code missing for current tax year",
            severity: "warning",
            targetPage: "employees"
          },
          {
            id: "flag-2",
            employeeId: "EMP-2023-008",
            employeeName: "John Davis",
            flagType: "validation-warning",
            description: "Unusually high overtime hours (>40)",
            severity: "warning",
            targetPage: "timesheets"
          }
        ];
      } else if (step === 3) {
        return [
          {
            id: "flag-3",
            employeeId: "EMP-2023-015",
            employeeName: "Sarah Johnson",
            flagType: "unusual-amount",
            description: "Bonus amount exceeds typical range",
            severity: "warning",
            targetPage: "payroll"
          }
        ];
      } else if (step === 5) {
        return [
          {
            id: "flag-4",
            employeeId: "EMP-2023-002",
            employeeName: "Michael Brown",
            flagType: "missing-data",
            description: "Missing pension enrollment information",
            severity: "warning",
            targetPage: "settings"
          }
        ];
      }
    }
    return [];
  };

  // Process the current step and move to the next one after a delay
  const processCurrentStep = async () => {
    if (isComplete || isPaused) return;

    // Update step status to in-progress
    updateStepStatus(currentStepIndex, "in-progress");
    
    // Simulate processing with a random delay between 1-2 seconds
    const processingTime = Math.random() * 1000 + 1000;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Check if the step generates flags
    const mockFlags = generateMockValidationFlags(currentStepIndex);
    const hasFlags = mockFlags.length > 0;
      
    if (hasFlags) {
      updateStepStatus(currentStepIndex, "flagged");
      setIsPaused(true);
      
      // Add flags to the step
      const updatedSteps = [...steps];
      updatedSteps[currentStepIndex].flags = mockFlags;
      setSteps(updatedSteps);
      
      toast({
        title: "Data Flags Detected",
        description: `${mockFlags.length} items require your review before continuing.`,
      });

      // Open validation dialog with the first flag information
      const firstFlag = mockFlags[0];
      const currentStep = updatedSteps[currentStepIndex];
      openValidationDialog(
        `${currentStep.name} Issue`,
        `We found ${mockFlags.length} issues that may need your attention: ${firstFlag.description}`,
        currentStep.targetPage || "dashboard"
      );
    } else {
      // Step completed successfully
      updateStepStatus(currentStepIndex, "done");
      
      // Check if it's a checkpoint that requires pausing
      const currentStep = steps[currentStepIndex];
      if (currentStep.isCheckpoint) {
        setIsPaused(true);
        
        if (currentStep.downloadable) {
          toast({
            title: "Checkpoint Reached",
            description: `${currentStep.reportTitle} is now available for review.`,
          });
        }
        
        if (currentStep.requiresConfirmation) {
          toast({
            title: "Confirmation Required",
            description: "Please review and send approval request.",
          });
        }
      } else {
        // Automatically move to next step if not a checkpoint
        moveToNextStep();
      }
    }
  };

  // Update the status of a specific step
  const updateStepStatus = (index: number, status: StepStatus) => {
    setSteps(prevSteps => {
      const updatedSteps = [...prevSteps];
      updatedSteps[index] = { ...updatedSteps[index], status };
      return updatedSteps;
    });
  };

  // Move to the next step if available
  const moveToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else {
      // All steps completed
      setIsComplete(true);
      toast({
        title: "Payroll Processing Complete",
        description: "All steps have been successfully completed.",
      });
    }
  };

  // Confirm flags and continue
  const confirmFlags = () => {
    closeValidationDialog();
    toast({
      title: "Issues Overridden",
      description: "Processing will continue with your confirmation.",
    });
    updateStepStatus(currentStepIndex, "done");
    setIsPaused(false);
    moveToNextStep();
  };

  // Continue processing after a checkpoint
  const continueProcessing = () => {
    setIsPaused(false);
    moveToNextStep();
  };

  // Navigate to approvals hub
  const navigateToApprovals = () => {
    onClose();
    navigate('/approvals');
  };

  // Handle downloading of reports
  const handleDownload = (reportType: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportType} download started.`,
    });
  };

  // Update overall progress as steps are completed
  useEffect(() => {
    const completedSteps = steps.filter(step => step.status === "done").length;
    const newProgress = Math.round((completedSteps / steps.length) * 100);
    setOverallProgress(newProgress);
  }, [steps]);

  // Process current step whenever it changes or is unpaused
  useEffect(() => {
    if (open && !isPaused && !isComplete) {
      processCurrentStep();
    }
  }, [currentStepIndex, isPaused, open]);

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-background sticky top-0 z-10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {isComplete ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : isPaused && steps[currentStepIndex].status === "flagged" ? (
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              ) : (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              {isComplete
                ? "Payroll Processing Complete"
                : isPaused && steps[currentStepIndex].status === "flagged"
                ? "Review Required"
                : "Processing Payroll"}
            </h2>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-auto">
            {/* Steps List */}
            <div className="w-full p-6">
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const isCurrentStep = index === currentStepIndex;
                  const isPast = index < currentStepIndex;
                  
                  return (
                    <div 
                      key={step.id}
                      className={`relative ${
                        isCurrentStep && step.status === "in-progress" ? "animate-pulse" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step Number and Status Icon */}
                        <div className="flex-shrink-0 relative">
                          <div 
                            className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2
                              ${step.status === "pending" ? "bg-white border-gray-300 text-gray-500" : ""}
                              ${step.status === "in-progress" ? "bg-blue-50 border-blue-500 text-blue-600" : ""}
                              ${step.status === "done" ? "bg-green-50 border-green-500 text-green-600" : ""}
                              ${step.status === "flagged" ? "bg-amber-50 border-amber-500 text-amber-600" : ""}
                            `}
                          >
                            {step.status === "pending" && step.id}
                            {step.status === "in-progress" && (
                              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            )}
                            {step.status === "done" && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                            {step.status === "flagged" && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                          
                          {/* Connecting Line */}
                          {index < steps.length - 1 && (
                            <div 
                              className={`
                                absolute top-8 left-4 w-0.5 h-[calc(100%+1.5rem)] -mb-6
                                ${isPast ? "bg-green-500" : "bg-gray-300"}
                                ${isCurrentStep && step.status === "in-progress" ? "bg-blue-500" : ""}
                                ${step.status === "flagged" ? "bg-amber-500" : ""}
                              `}
                            />
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 
                              className={`
                                text-base font-medium
                                ${step.status === "pending" ? "text-gray-600" : ""}
                                ${step.status === "in-progress" ? "text-blue-700" : ""}
                                ${step.status === "done" ? "text-green-700" : ""}
                                ${step.status === "flagged" ? "text-amber-700" : ""}
                              `}
                            >
                              {step.name}
                            </h3>
                            
                            {step.status === "in-progress" && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                                In Progress
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                          
                          {/* Flagged Data Alert */}
                          {step.status === "flagged" && (
                            <Alert className="mt-3 border-amber-200 bg-amber-50">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              <AlertTitle className="text-amber-800">Review Required</AlertTitle>
                              <AlertDescription className="text-amber-700">
                                Please review the flagged items before continuing the payroll process.
                              </AlertDescription>
                              <div className="mt-3 flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => {
                                    openValidationDialog(
                                      `${step.name} Issue`, 
                                      `We found ${step.flags.length} issues that may need your attention.`, 
                                      step.targetPage || "dashboard"
                                    );
                                  }}
                                  className="bg-amber-600 hover:bg-amber-700 text-white"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Review Issues
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => openReportDialog(step.reportTitle || "Report")}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </div>
                            </Alert>
                          )}
                          
                          {/* Validation Flags */}
                          {isCurrentStep && 
                           step.status === "flagged" && 
                           step.flags && 
                           step.flags.length > 0 && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-md p-4">
                              <h4 className="font-medium text-amber-800 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                                Flagged Items ({step.flags.length})
                              </h4>
                              <ul className="mt-2 space-y-2">
                                {step.flags.map((flag) => (
                                  <li key={flag.id} className="text-sm">
                                    <div className="flex items-start gap-1">
                                      <div 
                                        className={`
                                          w-1.5 h-1.5 rounded-full mt-1.5
                                          ${flag.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}
                                        `}
                                      />
                                      <div>
                                        <span className="font-medium">{flag.employeeName}</span>
                                        <span className="text-gray-500"> - {flag.description}</span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-3">
                                <Button size="sm" variant="secondary" onClick={() => openReportDialog("Validation Report")}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Full Report
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {/* Download and View Options */}
                          {step.status === "done" && step.downloadable && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownload(step.reportTitle!)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download {step.reportTitle}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => openReportDialog(step.reportTitle!)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View {step.reportTitle}
                              </Button>
                            </div>
                          )}
                          
                          {/* Checkpoint Actions */}
                          {isCurrentStep && step.status === "done" && step.isCheckpoint && (
                            <div className="mt-3">
                              <Button 
                                onClick={step.requiresConfirmation ? navigateToApprovals : continueProcessing}
                                className="mt-2"
                              >
                                {step.requiresConfirmation 
                                  ? "Send Approval Request" 
                                  : "Continue Processing"}
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Completion Actions */}
              {isComplete && (
                <div className="mt-8 border-t pt-6 flex flex-col items-center">
                  <div className="bg-green-50 rounded-full p-4 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center">Payroll Processing Complete</h3>
                  <p className="text-gray-600 text-center mt-2">
                    The payroll run has been successfully processed and all required reports are available.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <Button onClick={navigateToApprovals}>
                      Go to Approval Hub
                    </Button>
                    <Button variant="outline" onClick={() => handleDownload("Complete Payroll Package")}>
                      <FileDown className="h-4 w-4 mr-1" />
                      Download All Reports
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Mock Report Dialog */}
      {reportDialogOpen && (
        <MockReportDialog
          open={reportDialogOpen}
          onClose={closeReportDialog}
          reportType={currentReportType}
        />
      )}

      {/* Validation Review Dialog */}
      <ValidationReviewDialog
        open={validationDialogOpen}
        onClose={closeValidationDialog}
        onConfirm={confirmFlags}
        onNavigate={navigateToRelevantPage}
        issueType={currentValidationIssue.type}
        description={currentValidationIssue.description}
        targetPage={currentValidationIssue.targetPage}
      />
    </>
  );
};
