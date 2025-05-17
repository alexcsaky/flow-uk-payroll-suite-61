
import React, { useState } from "react";
import { MetricCard } from "./MetricCard";
import { AnomalyCard } from "./AnomalyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Anomaly {
  id: string;
  icon: "warning" | "info" | "alert";
  title: string;
  description: string;
  primaryActionText?: string;
  route?: string;
}

export function PayrollInsights() {
  const navigate = useNavigate();
  
  // Sample metric data - in a real app, this would come from an API or context
  const metrics = [
    {
      title: "Onboarding Time",
      subtitle: "Average onboarding completion",
      value: "2.4 days",
      trend: {
        value: "0.3 days faster",
        isPositive: true,
      },
    },
    {
      title: "Duplicate Bank Details",
      subtitle: "Potential fraud indicators",
      value: "2",
      trend: {
        value: "+1 from last month",
        isPositive: false,
      },
    },
    {
      title: "Compliance Score",
      subtitle: "Overall readiness",
      value: "86%",
      trend: {
        value: "+4% from last month",
        isPositive: true,
      },
    },
  ];

  // Sample anomaly data - in a real app, this would come from an API
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: "a1",
      icon: "warning",
      title: "Unusual Salary Change Detected",
      description: "Michael Johnson's salary changed by +45% this month",
      primaryActionText: "Review",
      route: "/employees/mj-001",
    },
    {
      id: "a2",
      icon: "alert",
      title: "Duplicate Bank Account",
      description: "Same bank account found for Jane Smith and Alice Williams",
      primaryActionText: "View Report",
      route: "/reports/duplicates",
    },
    {
      id: "a3",
      icon: "info",
      title: "Onboarding Optimization",
      description: "Average onboarding time reduced by 12% this quarter",
      primaryActionText: "View Metrics",
      route: "/analytics",
    },
  ]);

  const handlePrimaryAction = (anomalyId: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      toast.info("This action would open the relevant detail view");
    }
  };

  const handleDismiss = (anomalyId: string) => {
    setAnomalies((current) => current.filter((a) => a.id !== anomalyId));
    toast.success("Anomaly dismissed");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Payroll Insights</h3>
      
      {/* KPI Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <MetricCard
            key={`metric-${index}`}
            title={metric.title}
            subtitle={metric.subtitle}
            value={metric.value}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Anomaly Detection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Anomaly Detection
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-powered payroll anomalies identified
          </p>
        </CardHeader>
        <CardContent>
          {anomalies.length > 0 ? (
            anomalies.map((anomaly) => (
              <AnomalyCard
                key={anomaly.id}
                icon={anomaly.icon}
                title={anomaly.title}
                description={anomaly.description}
                primaryActionText={anomaly.primaryActionText}
                onPrimaryAction={() => handlePrimaryAction(anomaly.id, anomaly.route)}
                onDismiss={() => handleDismiss(anomaly.id)}
              />
            ))
          ) : (
            <p className="text-center py-6 text-muted-foreground">
              No anomalies detected at this time
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
