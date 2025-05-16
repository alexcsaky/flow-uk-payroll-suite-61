
import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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

  if (isLoading) {
    return (
      <Alert
        variant="destructive"
        className="bg-orange-50 border-orange-200 text-orange-800 mb-6 p-4"
        role="alert"
      >
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mr-2"></div>
          <p>Loading exceptions...</p>
        </div>
      </Alert>
    );
  }

  if (!exceptions || exceptions.length === 0) {
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
                  className="flex items-start justify-between bg-orange-50 border border-orange-200 rounded-md p-4"
                >
                  <div className="space-y-1 pr-4">
                    <p className="font-medium">⚠️ {exception.type}</p>
                    <p className="text-sm">{exception.description}</p>
                    <p className="text-sm font-medium text-orange-700">
                      Suggested action: {exception.suggestedAction}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-orange-300 hover:bg-orange-200 hover:text-orange-900"
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
