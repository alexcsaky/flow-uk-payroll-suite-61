
import React from "react";
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

export const PayrollFilters: React.FC = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [weekEndingDate, setWeekEndingDate] = React.useState<Date>();

  // Mock client data
  const clients = [
    { id: "1", name: "Acme Corporation" },
    { id: "2", name: "Wayne Enterprises" },
    { id: "3", name: "Stark Industries" },
    { id: "4", name: "Umbrella Corp" }
  ];

  // Mock venue data
  const venues = [
    { id: "1", name: "Corporate HQ" },
    { id: "2", name: "Downtown Office" },
    { id: "3", name: "Warehouse" },
    { id: "4", name: "Factory" }
  ];

  const handleApplyFilters = () => {
    // Logic to apply filters goes here
    console.log("Applying filters");
  };

  const handleResetFilters = () => {
    // Logic to reset filters goes here
    setStartDate(undefined);
    setEndDate(undefined);
    setWeekEndingDate(undefined);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Client Name Filter */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Select>
              <SelectTrigger id="clientName">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Client Venue Filter */}
          <div className="space-y-2">
            <Label htmlFor="clientVenue">Client Venue</Label>
            <Select>
              <SelectTrigger id="clientVenue">
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Venues</SelectItem>
                {venues.map((venue) => (
                  <SelectItem key={venue.id} value={venue.id}>
                    {venue.name}
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
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    endDate ? (
                      <>
                        {format(startDate, "PPP")} - {format(endDate, "PPP")}
                      </>
                    ) : (
                      format(startDate, "PPP")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: startDate,
                    to: endDate,
                  }}
                  onSelect={(range) => {
                    setStartDate(range?.from);
                    setEndDate(range?.to);
                  }}
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
