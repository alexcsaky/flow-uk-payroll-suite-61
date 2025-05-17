
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  clickable = false,
  onClick,
}: StatCardProps) {
  const handleCardClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <Card 
      className={cn(
        "flow-transition", 
        clickable && "cursor-pointer hover:border-primary/50 hover:shadow-md transition-all",
        className
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", clickable ? "text-primary" : "text-muted-foreground")} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p
            className={cn(
              "text-xs font-medium mt-2 flex items-center",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
            <span className="text-muted-foreground ml-1">{description}</span>
          </p>
        )}
        {clickable && (
          <div className="mt-2 text-xs text-primary font-medium">
            View details →
          </div>
        )}
      </CardContent>
    </Card>
  );
}
