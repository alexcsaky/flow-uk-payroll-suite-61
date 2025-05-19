
import React from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PeriodType = "daily" | "weekly" | "monthly" | "shift-confirmed";

interface InvoicePeriodSelectorProps {
  periodType: PeriodType;
  selectedDate: Date;
  onPeriodTypeChange: (type: PeriodType) => void;
  onDateChange: (date: Date) => void;
  className?: string;
}

export function InvoicePeriodSelector({
  periodType,
  selectedDate,
  onPeriodTypeChange,
  onDateChange,
  className,
}: InvoicePeriodSelectorProps) {
  // Format the display text based on period type
  const getDisplayText = () => {
    switch (periodType) {
      case "daily":
        return format(selectedDate, "PPP");
      case "weekly": {
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 }); // Sunday
        return `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;
      }
      case "monthly":
        return format(selectedDate, "MMMM yyyy");
      case "shift-confirmed":
        return "Shift Confirmed";
      default:
        return format(selectedDate, "PPP");
    }
  };

  // Helper function to get the highlighted date range for the calendar
  const getDateRange = () => {
    if (periodType === "weekly") {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
      return { from: weekStart, to: weekEnd };
    } else if (periodType === "monthly") {
      const monthStart = startOfMonth(selectedDate);
      const monthEnd = endOfMonth(selectedDate);
      return { from: monthStart, to: monthEnd };
    }
    return { from: selectedDate, to: selectedDate };
  };

  // Get the date range for the calendar
  const dateRange = getDateRange();

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex space-x-2">
        <Select value={periodType} onValueChange={(value) => onPeriodTypeChange(value as PeriodType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly (Mon–Sun)</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="shift-confirmed">Shift Confirmed</SelectItem>
          </SelectContent>
        </Select>
        
        {periodType !== "shift-confirmed" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                  periodType === "weekly" && "bg-primary/5",
                  periodType === "monthly" && "bg-primary/5"
                )}
              >
                {getDisplayText()}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && onDateChange(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
                modifiers={{
                  range: {
                    from: dateRange.from,
                    to: dateRange.to
                  }
                }}
                modifiersStyles={{
                  range: {
                    backgroundColor: 'var(--primary-50)',
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      {/* Visual indicator of selected period */}
      {periodType !== "shift-confirmed" && (
        <div className="text-xs text-muted-foreground">
          {periodType === "daily" && (
            <>Selected day: {format(selectedDate, "EEEE, MMMM d, yyyy")}</>
          )}
          {periodType === "weekly" && (
            <>Week {format(selectedDate, "w, yyyy")} selected</>
          )}
          {periodType === "monthly" && (
            <>Full month of {format(selectedDate, "MMMM yyyy")} selected</>
          )}
        </div>
      )}
    </div>
  );
}
