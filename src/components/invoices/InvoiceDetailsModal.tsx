import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Download, Plus, Undo, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Timesheet {
  id: string;
  employee: string;
  hours: number;
  amount: number;
  date: string;
  status: string;
}

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: string;
  clientName: string;
  date: string;
  initialTimesheets?: Timesheet[];
}

// Mock available timesheets
const availableTimesheets: Timesheet[] = [
  { id: "ts-1", employee: "John Doe", hours: 16, amount: 1600, date: "2024-03-01", status: "Approved" },
  { id: "ts-2", employee: "Jane Smith", hours: 20, amount: 2000, date: "2024-03-01", status: "Approved" },
  { id: "ts-3", employee: "Mike Johnson", hours: 12, amount: 1200, date: "2024-03-02", status: "Approved" },
  { id: "ts-4", employee: "Sarah Williams", hours: 24, amount: 2400, date: "2024-03-02", status: "Approved" },
  { id: "ts-5", employee: "David Brown", hours: 18, amount: 1800, date: "2024-03-03", status: "Approved" },
];

export const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  isOpen,
  onClose,
  invoiceId,
  clientName,
  date,
  initialTimesheets = [],
}) => {
  const { toast } = useToast();
  const [timesheets, setTimesheets] = useState<Timesheet[]>(initialTimesheets);
  const [removedTimesheet, setRemovedTimesheet] = useState<Timesheet | null>(null);
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isAddTimesheetOpen, setIsAddTimesheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalAmount = timesheets.reduce((sum, ts) => sum + ts.amount, 0);

  const handleRemoveTimesheet = (timesheetId: string) => {
    const timesheetToRemove = timesheets.find(ts => ts.id === timesheetId);
    if (timesheetToRemove) {
      setTimesheets(prev => prev.filter(ts => ts.id !== timesheetId));
      setRemovedTimesheet(timesheetToRemove);

      if (undoTimeout) {
        clearTimeout(undoTimeout);
      }

      const timeout = setTimeout(() => {
        setRemovedTimesheet(null);
      }, 5000);
      setUndoTimeout(timeout);
    }
  };

  const handleUndoRemove = () => {
    if (removedTimesheet) {
      setTimesheets(prev => [...prev, removedTimesheet]);
      setRemovedTimesheet(null);
      if (undoTimeout) {
        clearTimeout(undoTimeout);
        setUndoTimeout(null);
      }
    }
  };

  const handleAddTimesheet = (timesheet: Timesheet) => {
    // Check if timesheet is already added
    if (timesheets.some(ts => ts.id === timesheet.id)) {
      toast({
        title: "Timesheet already added",
        description: "This timesheet is already attached to the invoice.",
        variant: "destructive",
      });
      return;
    }

    setTimesheets(prev => [...prev, timesheet]);
    setIsAddTimesheetOpen(false);
    setSearchQuery("");
  };

  const handleSave = () => {
    toast({
      title: "Invoice updated",
      description: "The invoice has been successfully updated.",
    });
    onClose();
  };

  // Filter available timesheets based on search query
  const filteredTimesheets = availableTimesheets.filter(ts => 
    !timesheets.some(addedTs => addedTs.id === ts.id) && // Exclude already added timesheets
    (ts.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
     ts.date.includes(searchQuery))
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Invoice Details & Management: {invoiceId}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            {/* Mock Invoice Preview */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Invoice Details</h3>
                  <p className="text-sm text-muted-foreground">Client: {clientName}</p>
                  <p className="text-sm text-muted-foreground">Date: {date}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Line Items</h4>
                  <div className="space-y-1">
                    {timesheets.map((timesheet) => (
                      <div
                        key={timesheet.id}
                        className="flex justify-between text-sm py-1 border-b"
                      >
                        <span>{timesheet.employee} ({timesheet.hours} hrs)</span>
                        <span>${timesheet.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-semibold pt-2">
                    <span>Total Amount:</span>
                    <motion.span
                      key={totalAmount}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      ${totalAmount.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timesheet Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Attached Timesheets</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddTimesheetOpen(true)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Timesheet
                </Button>
              </div>

              <div className="space-y-2">
                {timesheets.map((timesheet) => (
                  <div
                    key={timesheet.id}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{timesheet.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {timesheet.hours} hours - ${timesheet.amount.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTimesheet(timesheet.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {removedTimesheet && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between p-2 bg-amber-50 rounded-md"
                  >
                    <span className="text-sm text-amber-800">
                      Timesheet removed
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUndoRemove}
                      className="text-amber-800 hover:text-amber-900"
                    >
                      <Undo className="h-4 w-4 mr-1" />
                      Undo
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Re-download Invoice
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Timesheet Dialog */}
      <Dialog open={isAddTimesheetOpen} onOpenChange={setIsAddTimesheetOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Timesheet</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder="Search timesheets..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No timesheets found.</CommandEmpty>
                <CommandGroup heading="Available Timesheets">
                  {filteredTimesheets.map((timesheet) => (
                    <CommandItem
                      key={timesheet.id}
                      onSelect={() => handleAddTimesheet(timesheet)}
                      className="flex items-center justify-between p-2 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{timesheet.employee}</p>
                        <p className="text-sm text-muted-foreground">
                          {timesheet.date} - {timesheet.hours} hours
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ${timesheet.amount.toFixed(2)}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTimesheetOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}; 