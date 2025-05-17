
import { useState, useEffect } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: string;
  setCurrentStep: (stepId: string) => void;
  employeeData: any;
}

export const OnboardingProgress = ({
  steps,
  currentStep,
  setCurrentStep,
  employeeData,
}: OnboardingProgressProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Check which steps are completed
  useEffect(() => {
    const completed = Object.keys(employeeData).filter(
      (key) => employeeData[key].isComplete
    );
    setCompletedSteps(completed);
  }, [employeeData]);

  // Calculate if a step can be clicked (either current, completed, or right after the last completed step)
  const canGoToStep = (stepId: string): boolean => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    
    // Can always go to current step or completed steps
    if (stepId === currentStep || completedSteps.includes(stepId)) {
      return true;
    }
    
    // Can go to the next step from current
    if (stepIndex === currentIndex + 1) {
      return true;
    }
    
    // Can go to any step if all previous steps are completed
    const previousSteps = steps.slice(0, stepIndex);
    const allPreviousComplete = previousSteps.every((step) =>
      completedSteps.includes(step.id)
    );
    
    return allPreviousComplete;
  };

  return (
    <div className="relative">
      {/* Progress path line */}
      <div
        className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"
        style={{ width: "100%", zIndex: 0 }}
      />
      
      {/* Steps */}
      <div className="relative grid grid-cols-6 gap-2 md:gap-0">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isClickable = canGoToStep(step.id);
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "relative h-12 w-12 rounded-full border flex items-center justify-center mb-2",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isCompleted && !isActive && "border-primary bg-primary/10 text-primary",
                  !isActive && !isCompleted && "border-gray-200 bg-background text-muted-foreground",
                  !isClickable && "opacity-50 cursor-not-allowed"
                )}
                disabled={!isClickable}
                onClick={() => isClickable && setCurrentStep(step.id)}
              >
                {isCompleted ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </Button>
              <span
                className={cn(
                  "text-xs font-medium text-center",
                  isActive && "text-primary",
                  !isActive && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
