
import React from "react";
import { AlertTriangle, Bell, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnomalyIcon = "warning" | "info" | "alert";

interface AnomalyCardProps {
  icon: AnomalyIcon;
  title: string;
  description: string;
  onPrimaryAction: () => void;
  onDismiss: () => void;
  primaryActionText?: string;
  className?: string;
}

export function AnomalyCard({
  icon,
  title,
  description,
  onPrimaryAction,
  onDismiss,
  primaryActionText = "Review",
  className,
}: AnomalyCardProps) {
  const IconComponent = {
    warning: AlertTriangle,
    info: Info,
    alert: Bell,
  }[icon];

  return (
    <Card className={cn("mb-3", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <IconComponent 
              className={cn(
                "h-5 w-5",
                icon === "warning" ? "text-amber-500" : 
                icon === "alert" ? "text-red-500" : "text-blue-500"
              )} 
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-base mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onPrimaryAction}
              >
                {primaryActionText}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
