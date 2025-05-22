import React, { useState } from "react";
import { X, AlertTriangle, ArrowDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Exception {
  id: string;
  type: string;
  description: string;
  suggestedAction: string;
  severity: "high" | "medium" | "low";
}

interface ExceptionBannerProps {
  employeeId: string;
  exceptions: Exception[];
  isLoading: boolean;
  onResolve: (exceptionId: string) => Promise<void>;
}

const ExceptionBanner: React.FC<ExceptionBannerProps> = ({
  employeeId,
  exceptions,
  isLoading,
  onResolve,
}) => {
  const [dismissing, setDismissing] = useState<Record<string, boolean>>({});

  // Don't show anything while loading or when there are no exceptions
  if (isLoading || !exceptions || exceptions.length === 0) {
    return null;
  }

  const handleDismiss = async (exceptionId: string) => {
    setDismissing((prev) => ({ ...prev, [exceptionId]: true }));
    try {
      await onResolve(exceptionId);
    } catch (error) {
      console.error("Failed to resolve exception:", error);
    } finally {
      setDismissing((prev) => ({ ...prev, [exceptionId]: false }));
    }
  };

  // Helper function to navigate to relevant section based on exception type
  const navigateToSection = (exceptionType: string) => {
    let targetTabId = "";
    let targetElementId = "";

    // Determine which tab and section to navigate to based on exception type
    if (exceptionType.toLowerCase().includes("national insurance") || 
        exceptionType.toLowerCase().includes("ni code")) {
      targetTabId = "payroll";
      targetElementId = "national-insurance";
    } else if (exceptionType.toLowerCase().includes("pension")) {
      targetTabId = "payroll";
      targetElementId = "pension-scheme";
    } else if (exceptionType.toLowerCase().includes("tax code")) {
      targetTabId = "payroll";
      targetElementId = "tax-code";
    } else {
      // Default to details tab if no specific match
      targetTabId = "details";
    }

    // Click on the target tab first
    const tabElement = document.querySelector(`[value="${targetTabId}"]`);
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }

    // Use useEffect for cleanup of timeouts
    React.useEffect(() => {
      const scrollTimeoutId = setTimeout(() => {
        // Find and scroll to the specific element if available
        if (targetElementId) {
          const targetElement = document.querySelector(`[data-id="${targetElementId}"]`);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            targetElement.classList.add("bg-orange-50");
            
            const highlightTimeoutId = setTimeout(() => {
              targetElement.classList.remove("bg-orange-50");
            }, 2000);

            // Cleanup highlight timeout
            return () => clearTimeout(highlightTimeoutId);
          }
        }
      }, 100);

      // Cleanup scroll timeout
      return () => clearTimeout(scrollTimeoutId);
    }, [targetElementId]);
  };

  // Helper function to get badge color based on severity
  const getSeverityBadge = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            High Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Low Priority
          </Badge>
        );
      default:
        return null;
    }
  };

  // Helper function to get border color based on severity
  const getSeverityBorderColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "border-red-400";
      case "medium":
        return "border-amber-400";
      case "low":
        return "border-emerald-400";
      default:
        return "border-orange-200";
    }
  };

  return (
    <Alert
      variant="destructive"
      className="bg-orange-100 border-orange-200 text-orange-900 mb-6 p-6"
      role="alert"
    >
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-orange-600 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">
            Employee Record Exceptions
          </h3>
          <AlertDescription>
            <ul className="space-y-4 mt-3">
              {exceptions.map((exception) => (
                <li
                  key={exception.id}
                  className={`flex items-start justify-between bg-orange-50 border rounded-md p-4 ${getSeverityBorderColor(
                    exception.severity
                  )}`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">⚠️ {exception.type}</p>
                      {getSeverityBadge(exception.severity)}
                    </div>
                    <p className="text-sm">{exception.description}</p>
                    <p className="text-sm font-medium text-orange-700">
                      Suggested action: {exception.suggestedAction}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-300 hover:bg-orange-200 hover:text-orange-900"
                      onClick={() => navigateToSection(exception.type)}
                      aria-label={`Navigate to ${exception.type} location`}
                    >
                      <ArrowDown className="h-4 w-4" />
                      <span className="ml-1">Go to Location</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-300 hover:bg-orange-200 hover:text-orange-900"
                      onClick={() => handleDismiss(exception.id)}
                      disabled={dismissing[exception.id]}
                      aria-label={`Dismiss ${exception.type} exception`}
                    >
                      {dismissing[exception.id] ? (
                        <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span className="ml-1">Dismiss</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default ExceptionBanner;
