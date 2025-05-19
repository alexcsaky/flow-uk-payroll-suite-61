
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Check, 
  AlertCircle, 
  Loader2, 
  FileText, 
  Download, 
  ChevronRight,
  RefreshCw,
  FileDown,
  Eye,
  Clock,
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the different possible statuses for a step
type StepStatus = "pending" | "in-progress" | "done" | "error";

// Interface for ValidationError
interface ValidationError {
  id: string;
  employeeId: string;
  employeeName: string;
  errorType: string;
  description: string;
  severity: "warning" | "error";
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
  errors: ValidationError[];
  requiresConfirmation?: boolean;
}

// Props for the ProcessPayrollModal component
interface ProcessPayrollModalProps {
  open: boolean;
  onClose: () => void;
}

export const ProcessPayrollModal: React.FC<ProcessPayrollModalProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  
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
      errors: [],
    },
    {
      id: 2,
      name: "Timesheet & Absence Verification",
      description: "Verifying timesheets and absence records",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      errors: [],
    },
    {
      id: 3,
      name: "Variable Pay Inputs Import",
      description: "Importing bonus, commission, and other variable pay data",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      errors: [],
    },
    {
      id: 4,
      name: "Gross Pay Calculation",
      description: "Calculating salary, hourly pay, overtime, bonuses, and expenses",
      status: "pending",
      isCheckpoint: false,
      downloadable: true,
      reportTitle: "Gross Pay Breakdown",
      errors: [],
    },
    {
      id: 5,
      name: "Statutory Deductions",
      description: "Calculating PAYE, NI, student loans, and court orders",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      errors: [],
    },
    {
      id: 6,
      name: "Voluntary Deductions",
      description: "Processing pension contributions, benefits, and union fees",
      status: "pending",
      isCheckpoint: true,
      downloadable: true,
      reportTitle: "Payslips & HMRC Documentation",
      errors: [],
    },
    {
      id: 7,
      name: "Net Pay Calculation",
      description: "Finalizing pay after all deductions",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      errors: [],
    },
    {
      id: 8,
      name: "Reporting & Compliance Outputs",
      description: "Generating payslips, RTI submissions, and compliance documents",
      status: "pending",
      isCheckpoint: false,
      downloadable: false,
      errors: [],
    },
    {
      id: 9,
      name: "Banking & Accounting Integration",
      description: "Preparing BACS files and accounting entries",
      status: "pending",
      isCheckpoint: true,
      downloadable: true,
      reportTitle: "Payment Summary",
      requiresConfirmation: true,
      errors: [],
    }
  ]);

  // Generate mock validation errors for the first step (50% chance)
  const generateMockValidationErrors = (): ValidationError[] => {
    if (Math.random() > 0.5) {
      return [
        {
          id: "error-1",
          employeeId: "EMP-2023-001",
          employeeName: "Jane Smith",
          errorType: "missing-data",
          description: "Tax code missing for current tax year",
          severity: "error",
        },
        {
          id: "error-2",
          employeeId: "EMP-2023-008",
          employeeName: "John Davis",
          errorType: "validation-warning",
          description: "Unusually high overtime hours (>40)",
          severity: "warning",
        }
      ];
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

    // Determine if the step generates errors (10% chance except for step 1)
    const hasStepError = currentStepIndex === 0 
      ? Math.random() > 0.5 // 50% chance for validation errors in step 1
      : Math.random() > 0.9; // 10% chance for other steps
      
    if (hasStepError) {
      updateStepStatus(currentStepIndex, "error");
      setHasError(true);
      setIsPaused(true);
      
      // Generate mock errors for step 1
      if (currentStepIndex === 0) {
        const mockErrors = generateMockValidationErrors();
        if (mockErrors.length > 0) {
          const updatedSteps = [...steps];
          updatedSteps[currentStepIndex].errors = mockErrors;
          setSteps(updatedSteps);
          
          toast({
            title: "Validation Errors",
            description: `${mockErrors.length} issues found. Review required.`,
            variant: "destructive",
          });
        }
      } else {
        // For other steps, just show a generic error
        toast({
          title: "Processing Error",
          description: `Error in ${steps[currentStepIndex].name}. Please review and retry.`,
          variant: "destructive",
        });
      }
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
            description: `${currentStep.reportTitle} is now available for download.`,
          });
        }
        
        if (currentStep.requiresConfirmation) {
          toast({
            title: "Confirmation Required",
            description: "Please review and approve to continue processing.",
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

  // Retry the current step if it has an error
  const retryStep = () => {
    updateStepStatus(currentStepIndex, "pending");
    setHasError(false);
    setIsPaused(false);
  };

  // Continue processing after a checkpoint
  const continueProcessing = () => {
    setIsPaused(false);
    moveToNextStep();
  };

  // Abort the payroll process
  const abortPayroll = () => {
    toast({
      title: "Payroll Processing Aborted",
      description: "The payroll run has been cancelled.",
    });
    onClose();
  };

  // Handle downloading of reports
  const handleDownload = (reportType: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportType} download started.`,
    });
  };

  // Handle viewing of reports
  const handleViewReport = (reportType: string) => {
    toast({
      title: "Opening Report",
      description: `Viewing ${reportType}.`,
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-background sticky top-0 z-10">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {isComplete ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            )}
            {isComplete
              ? "Payroll Processing Complete"
              : hasError
              ? "Payroll Processing Error"
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
                      isCurrentStep ? "animate-pulse" : ""
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
                            ${step.status === "error" ? "bg-red-50 border-red-500 text-red-600" : ""}
                          `}
                        >
                          {step.status === "pending" && step.id}
                          {step.status === "in-progress" && (
                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                          )}
                          {step.status === "done" && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                          {step.status === "error" && (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        
                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                          <div 
                            className={`
                              absolute top-8 left-4 w-0.5 h-[calc(100%+1.5rem)] -mb-6
                              ${isPast ? "bg-green-500" : "bg-gray-300"}
                              ${isCurrentStep && step.status === "in-progress" ? "bg-blue-500" : ""}
                              ${step.status === "error" ? "bg-red-500" : ""}
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
                              ${step.status === "error" ? "text-red-700" : ""}
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
                        
                        {/* Error Alert */}
                        {step.status === "error" && (
                          <Alert variant="destructive" className="mt-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error Processing Step</AlertTitle>
                            <AlertDescription>
                              An error occurred while processing this step. Please review and try again.
                            </AlertDescription>
                            <div className="mt-3 flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={retryStep}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Retry Step
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={abortPayroll}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Abort Payroll
                              </Button>
                            </div>
                          </Alert>
                        )}
                        
                        {/* Validation Errors */}
                        {isCurrentStep && 
                         step.status !== "pending" && 
                         step.errors && 
                         step.errors.length > 0 && (
                          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-md p-4">
                            <h4 className="font-medium text-amber-800 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Validation Issues ({step.errors.length})
                            </h4>
                            <ul className="mt-2 space-y-2">
                              {step.errors.map((error) => (
                                <li key={error.id} className="text-sm">
                                  <div className="flex items-start gap-1">
                                    <div 
                                      className={`
                                        w-1.5 h-1.5 rounded-full mt-1.5
                                        ${error.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}
                                      `}
                                    />
                                    <div>
                                      <span className="font-medium">{error.employeeName}</span>
                                      <span className="text-gray-500"> - {error.description}</span>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3">
                              <Button size="sm" variant="secondary" onClick={() => handleViewReport("Validation Report")}>
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
                              onClick={() => handleViewReport(step.reportTitle!)}
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
                              onClick={continueProcessing}
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
                  <Button onClick={onClose}>
                    Return to Payroll
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
  );
};
