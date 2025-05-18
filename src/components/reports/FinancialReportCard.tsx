
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FinancialReportCardProps {
  title: string;
  description?: string;
  showClientFilter?: boolean;
  clients?: string[];
  children?: React.ReactNode;
  onDateRangeChange?: (range: DateRange) => void;
  onClientChange?: (clients: string[]) => void;
  onExportCSV?: () => void;
  onDownloadPDF?: () => void;
}

export const FinancialReportCard: React.FC<FinancialReportCardProps> = ({
  title,
  description,
  showClientFilter = false,
  clients = [],
  children,
  onDateRangeChange,
  onClientChange,
  onExportCSV,
  onDownloadPDF
}) => {
  const [date, setDate] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDate(range);
      if (onDateRangeChange) {
        onDateRangeChange(range);
      }
    }
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClients(prev => {
      const isSelected = prev.includes(clientId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId];
      
      if (onClientChange) {
        onClientChange(newSelection);
      }
      return newSelection;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Date Range Picker */}
          <div className="space-y-2">
            <Label htmlFor="dateRange">Report period</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dateRange"
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date.from && "text-muted-foreground"
                  )}
                  aria-label="Select date range"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "PPP")} - {format(date.to, "PPP")}
                      </>
                    ) : (
                      format(date.from, "PPP")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Client/Organization Multi-select */}
          {showClientFilter && clients.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="clientFilter">Client / Organisation</Label>
              <Popover open={clientDropdownOpen} onOpenChange={setClientDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="clientFilter"
                    variant="outline"
                    role="combobox"
                    aria-label="Select clients"
                    className="w-[240px] justify-between"
                  >
                    {selectedClients.length > 0
                      ? `${selectedClients.length} selected`
                      : "Select clients"}
                    <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <div className="p-2 space-y-2 max-h-[300px] overflow-auto">
                    {clients.map((client) => (
                      <div key={client} className="flex items-center space-x-2">
                        <Checkbox
                          id={`client-${client}`}
                          checked={selectedClients.includes(client)}
                          onCheckedChange={() => handleClientSelect(client)}
                        />
                        <Label
                          htmlFor={`client-${client}`}
                          className="flex-grow cursor-pointer text-sm"
                        >
                          {client}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Report Content */}
        <div className="mt-6">{children}</div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-4">
        <Button variant="outline" onClick={onExportCSV}>
          <FileText className="mr-2 h-4 w-4" /> Export CSV
        </Button>
        <Button variant="outline" onClick={onDownloadPDF}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};
