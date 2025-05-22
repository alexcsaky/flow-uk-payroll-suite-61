import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type AnomalyIcon = "warning" | "info" | "alert";

interface Anomaly {
  id: string;
  icon: AnomalyIcon;
  title: string;
  description: string;
  actionText?: string;
  route?: string;
}

interface AnomalyCardProps {
  anomaly: Anomaly;
  onAction: (id: string, route?: string) => void;
  onDismiss: (id: string) => void;
}

const AnomalyCard = ({ anomaly, onAction, onDismiss }: AnomalyCardProps) => {
  const IconComponent = {
    warning: AlertTriangle,
    info: Info,
    alert: Bell,
  }[anomaly.icon];

  return (
    <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <IconComponent 
            className={`h-5 w-5 ${
              anomaly.icon === "warning" ? "text-amber-500" : 
              anomaly.icon === "alert" ? "text-red-500" : "text-blue-500"
            }`} 
          />
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-base mb-1">{anomaly.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{anomaly.description}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onAction(anomaly.id, anomaly.route)}
            >
              {anomaly.actionText || "Review"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDismiss(anomaly.id)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnomalyDetectionFeed = () => {
  const navigate = useNavigate();
  
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: "a1",
      icon: "warning",
      title: "Unusual Salary Change Detected",
      description: "Michael Johnson's salary changed by +45% this month",
      actionText: "Review Employee",
      route: "/employees/mj-001",
    },
    {
      id: "a2",
      icon: "alert",
      title: "Duplicate Bank Account",
      description: "Same bank account found for Jane Smith and Alice Williams",
      actionText: "View Report",
      route: "/reports/duplicates",
    },
    {
      id: "a3",
      icon: "info",
      title: "Onboarding Optimization",
      description: "Average onboarding time reduced by 12% this quarter",
      actionText: "View Metrics",
    },
    {
      id: "a4",
      icon: "warning",
      title: "Overtime Threshold Reached",
      description: "5 employees exceeded overtime policy limits this month",
      actionText: "Review Hours",
      route: "/timesheets",
    },
    {
      id: "a5",
      icon: "info",
      title: "Tax Code Updates Available",
      description: "New tax year updates available for 12 employees",
      actionText: "Apply Updates",
    },
  ]);

  const handleAction = (anomalyId: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      toast.info("This action would open the relevant detail view");
    }
  };

  const handleDismissAnomaly = (anomalyId: string) => {
    setAnomalies(prev => prev.filter(a => a.id !== anomalyId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>AI-powered payroll anomalies identified</CardDescription>
      </CardHeader>
      <CardContent>
        {anomalies.length > 0 ? (
          anomalies.map((anomaly) => (
            <AnomalyCard
              key={anomaly.id}
              anomaly={anomaly}
              onAction={handleAction}
              onDismiss={handleDismissAnomaly}
            />
          ))
        ) : (
          <p className="text-center py-6 text-muted-foreground">
            No anomalies detected at this time
          </p>
        )}
      </CardContent>
    </Card>
  );
};
