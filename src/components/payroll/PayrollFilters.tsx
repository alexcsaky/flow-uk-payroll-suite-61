
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface PayrollFiltersProps {
  clients: string[];
  venues: string[];
  initialFilters?: {
    client: string | null;
    venue: string | null;
    dateRange: DateRange;
    weekEndingDate: Date | undefined;
    poNumber: string;
  };
  onApplyFilters: (filters: {
    client: string | null;
    venue: string | null;
    dateRange: DateRange;
    weekEndingDate: Date | undefined;
    poNumber: string;
  }) => void;
  onResetFilters: () => void;
}

export const PayrollFilters: React.FC<PayrollFiltersProps> = ({ 
  clients,
  venues,
  initialFilters,
  onApplyFilters,
  onResetFilters
}) => {
  const [client, setClient] = useState<string | null>(initialFilters?.client || null);
  const [venue, setVenue] = useState<string | null>(initialFilters?.venue || null);
  const [dateRange, setDateRange] = useState<DateRange>(
    initialFilters?.dateRange || { from: undefined, to: undefined }
  );
  const [weekEndingDate, setWeekEndingDate] = useState<Date | undefined>(initialFilters?.weekEndingDate);
  const [poNumber, setPoNumber] = useState(initialFilters?.poNumber || "");

  // Update local state when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setClient(initialFilters.client);
      setVenue(initialFilters.venue);
      setDateRange(initialFilters.dateRange);
      setWeekEndingDate(initialFilters.weekEndingDate);
      setPoNumber(initialFilters.poNumber);
    }
  }, [initialFilters]);

  const handleApplyFilters = () => {
    onApplyFilters({
      client,
      venue,
      dateRange,
      weekEndingDate,
      poNumber
    });
  };

  const handleResetFilters = () => {
    setClient(null);
    setVenue(null);
    setDateRange({ from: undefined, to: undefined });
    setWeekEndingDate(undefined);
    setPoNumber("");
    onResetFilters();
  };

  return (
    <Card className="mb-4 mx-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Client Name Filter */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Select value={client || ""} onValueChange={(value) => setClient(value === "all" ? null : value)}>
              <SelectTrigger id="clientName">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map((clientName) => (
                  <SelectItem key={clientName} value={clientName}>
                    {clientName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Client Venue Filter */}
          <div className="space-y-2">
            <Label htmlFor="clientVenue">Client Venue</Label>
            <Select value={venue || ""} onValueChange={(value) => setVenue(value === "all" ? null : value)}>
              <SelectTrigger id="clientVenue">
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Venues</SelectItem>
                {venues.map((venueName) => (
                  <SelectItem key={venueName} value={venueName}>
                    {venueName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                      </>
                    ) : (
                      format(dateRange.from, "PPP")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Week Ending Date Filter */}
          <div className="space-y-2">
            <Label>Week Ending Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !weekEndingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {weekEndingDate ? format(weekEndingDate, "PPP") : "Select week ending"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={weekEndingDate}
                  onSelect={setWeekEndingDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* PO Number Filter */}
          <div className="space-y-2">
            <Label htmlFor="poNumber">PO Number</Label>
            <Input
              id="poNumber"
              placeholder="Enter PO number"
              className="w-full"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
