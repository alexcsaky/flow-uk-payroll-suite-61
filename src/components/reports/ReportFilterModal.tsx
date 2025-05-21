import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

const MOCK_CLIENTS = [
  "Acme Corporation",
  "Wayne Enterprises",
  "Stark Industries",
  "Umbrella Corp",
  "LexCorp",
];
const FORMATS = ["PDF", "Excel", "CSV"];

export function ReportFilterModal({ open, onOpenChange, reportName, onApply }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportName: string;
  onApply: (filters?: any) => void;
}) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [client, setClient] = useState<string>("");
  const [formatType, setFormatType] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filters for {reportName}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange?.from && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to
                      ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                      : format(dateRange.from, "LLL dd, y")
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Input
                  type="date"
                  value={dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
                  onChange={e => setDateRange(r => ({ ...r, from: e.target.value ? new Date(e.target.value) : undefined }))}
                  className="mb-2"
                />
                <Input
                  type="date"
                  value={dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
                  onChange={e => setDateRange(r => ({ ...r, to: e.target.value ? new Date(e.target.value) : undefined }))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <Select value={client} onValueChange={setClient}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_CLIENTS.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Format</label>
            <Select value={formatType} onValueChange={setFormatType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-muted-foreground text-xs mt-2">
            Filter options for {reportName} will appear here.
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onApply({ dateRange, client, formatType })} className="w-full">Apply Filters</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full mt-2">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 