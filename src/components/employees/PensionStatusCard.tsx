import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

type PensionStatus = "enrolled" | "eligible" | "opted_out" | "not_eligible";

interface PensionStatusCardProps {
  employee: {
    id: string;
    name: string;
  };
}

const PensionStatusCard: React.FC<PensionStatusCardProps> = ({ employee }) => {
  const [status, setStatus] = useState<PensionStatus>("eligible");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getStatusConfig = (status: PensionStatus) => {
    switch (status) {
      case "enrolled":
        return {
          label: "Enrolled with NEST",
          variant: "default" as const,
          color: "text-green-600",
        };
      case "eligible":
        return {
          label: "Eligible - Pending Enrolment",
          variant: "outline" as const,
          color: "text-amber-600",
        };
      case "opted_out":
        return {
          label: "Opted Out",
          variant: "secondary" as const,
          color: "text-gray-600",
        };
      case "not_eligible":
        return {
          label: "Not Eligible",
          variant: "secondary" as const,
          color: "text-gray-600",
        };
    }
  };

  const handleEnrol = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update status
      setStatus("enrolled");
      
      // Show success toast
      toast({
        title: "Success",
        description: "Employee successfully submitted for enrolment with NEST!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not enrol employee with NEST. Please check logs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">NEST Pension Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${statusConfig.color}`} />
            <Badge variant={statusConfig.variant}>
              {statusConfig.label}
            </Badge>
          </div>

          {status === "eligible" && (
            <Button
              onClick={handleEnrol}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Enrol in NEST"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PensionStatusCard; 