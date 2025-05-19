
import React from "react";
import {
  format,
  differenceInDays,
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  eachDayOfInterval
} from "date-fns";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PeriodType } from "./InvoicePeriodSelector";
import { LockIcon, UnlockIcon } from "lucide-react";

interface InvoicePeriodProgressProps {
  periodType: PeriodType;
  selectedDate: Date;
  isPeriodClosed: boolean;
  onClosePeriod: () => void;
}

export function InvoicePeriodProgress({
  periodType,
  selectedDate,
  isPeriodClosed,
  onClosePeriod,
}: InvoicePeriodProgressProps) {
  const today = new Date();
  
  // Calculate period start, end, and progress based on period type
  const getPeriodDetails = () => {
    let start: Date;
    let end: Date;
    let days: Date[];
    let progressPercent = 0;
    let currentDayIndex = -1;
    
    switch (periodType) {
      case "daily":
        start = selectedDate;
        end = selectedDate;
        days = [selectedDate];
        progressPercent = isSameDay(today, selectedDate) ? 50 : (today > selectedDate ? 100 : 0);
        currentDayIndex = 0;
        break;
        
      case "weekly":
        start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
        end = endOfWeek(selectedDate, { weekStartsOn: 1 }); // Sunday
        days = eachDayOfInterval({ start, end });
        
        // Calculate progress: how many days have passed in the week
        if (today < start) {
          progressPercent = 0;
        } else if (today > end) {
          progressPercent = 100;
        } else {
          const totalDays = 7; // Monday to Sunday
          const daysPassed = differenceInDays(today, start) + 1;
          progressPercent = Math.round((daysPassed / totalDays) * 100);
          currentDayIndex = daysPassed - 1;
        }
        break;
        
      case "monthly":
        start = startOfMonth(selectedDate);
        end = endOfMonth(selectedDate);
        days = eachDayOfInterval({ start, end });
        
        const daysInMonth = differenceInCalendarDays(end, start) + 1;
        
        if (today < start) {
          progressPercent = 0;
        } else if (today > end) {
          progressPercent = 100;
        } else {
          const daysPassed = differenceInCalendarDays(today, start) + 1;
          progressPercent = Math.round((daysPassed / daysInMonth) * 100);
          currentDayIndex = daysPassed - 1;
        }
        break;
        
      case "shift-confirmed":
        // For shift-confirmed, we don't have a specific date range
        start = today;
        end = today;
        days = [today];
        progressPercent = 0; // No visual progress for shift-confirmed
        break;
    }
    
    return { start, end, days, progressPercent, currentDayIndex };
  };
  
  const { start, end, days, progressPercent, currentDayIndex } = getPeriodDetails();
  
  // For weekly view, render days of the week
  const renderWeekDays = () => {
    if (periodType !== "weekly") return null;
    
    return (
      <div className="grid grid-cols-7 gap-1 mt-4 text-xs text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "py-1 rounded-sm",
              index === currentDayIndex ? "bg-primary text-primary-foreground font-bold" : 
                index < currentDayIndex ? "bg-muted" : "border border-dashed"
            )}
          >
            {format(day, "EEE")}
            <div className="font-semibold">{format(day, "d")}</div>
          </div>
        ))}
      </div>
    );
  };
  
  // Helper function for class names
  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  
  // Get header text based on period type
  const getHeaderText = () => {
    switch (periodType) {
      case "daily":
        return `Invoice for ${format(selectedDate, "PPP")}`;
      case "weekly":
        return `Weekly Invoice (${format(start, "MMM d")} - ${format(end, "MMM d")})`;
      case "monthly":
        return `Monthly Invoice for ${format(selectedDate, "MMMM yyyy")}`;
      case "shift-confirmed":
        return "Shift Confirmed Invoice";
    }
  };

  // Determine if current period is in the past
  const isPeriodInPast = end < today;
  const isPeriodInFuture = start > today;
  
  return (
    <Card className={cn(
      isPeriodClosed ? "border-amber-500" : 
      isPeriodInPast ? "border-green-500" : 
      isPeriodInFuture ? "border-blue-500" : "border-primary"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getHeaderText()}
          {isPeriodClosed && <LockIcon className="h-4 w-4 text-amber-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Period Progress</span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
        
        {renderWeekDays()}
        
        {periodType !== "shift-confirmed" && (
          <div className="pt-2">
            <div className={cn(
              "text-sm px-3 py-2 rounded-md",
              isPeriodClosed ? "bg-amber-50 text-amber-800" : 
              isPeriodInPast ? "bg-green-50 text-green-800" : 
              isPeriodInFuture ? "bg-blue-50 text-blue-800" : "bg-gray-50 text-gray-800"
            )}>
              {isPeriodClosed 
                ? "This invoice period is closed. No further changes can be made."
                : isPeriodInPast
                ? "This period is in the past. Consider closing it."
                : isPeriodInFuture
                ? "This period is in the future."
                : "This invoice period is currently active and accepting entries."}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isPeriodClosed ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant={isPeriodInPast ? "default" : "outline"}
                disabled={isPeriodInFuture}
              >
                {isPeriodInFuture ? "Period Not Started" : "Close Period"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Close Invoice Period</AlertDialogTitle>
                <AlertDialogDescription>
                  Closing this period will lock all invoices and prevent further changes. 
                  This action cannot be undone. Are you sure you want to proceed?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClosePeriod}>Close Period</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" disabled className="flex items-center gap-1">
              <LockIcon className="h-4 w-4" /> Period Closed
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
