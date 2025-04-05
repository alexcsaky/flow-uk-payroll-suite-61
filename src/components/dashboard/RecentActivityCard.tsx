
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "payroll" | "invoice" | "employee" | "client" | "system";
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
  className?: string;
}

export function RecentActivityCard({ activities, className }: RecentActivityCardProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "payroll":
        return <div className="bg-blue-100 text-blue-600 p-1 rounded-full">P</div>;
      case "invoice":
        return <div className="bg-green-100 text-green-600 p-1 rounded-full">I</div>;
      case "employee":
        return <div className="bg-purple-100 text-purple-600 p-1 rounded-full">E</div>;
      case "client":
        return <div className="bg-amber-100 text-amber-600 p-1 rounded-full">C</div>;
      case "system":
        return <div className="bg-gray-100 text-gray-600 p-1 rounded-full">S</div>;
    }
  };

  return (
    <Card className={cn("h-[400px]", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent system activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[290px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
                {getActivityIcon(activity.type)}
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
