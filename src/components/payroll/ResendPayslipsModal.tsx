import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
}

interface ResendPayslipsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock employee data for demonstration
const mockEmployees: Employee[] = [
  { id: "EMP12345", name: "John Doe" },
  { id: "EMP12346", name: "Jane Smith" },
  { id: "EMP12347", name: "Alice Johnson" },
  { id: "EMP12348", name: "Bob Wilson" },
  { id: "EMP12349", name: "Carol Brown" },
  { id: "EMP12350", name: "David Lee" },
  { id: "EMP12351", name: "Emma Davis" },
  { id: "EMP12352", name: "Frank Miller" },
  { id: "EMP12353", name: "Grace Taylor" },
  { id: "EMP12354", name: "Henry Clark" },
];

export function ResendPayslipsModal({
  open,
  onOpenChange,
}: ResendPayslipsModalProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [isResending, setIsResending] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployees);

  // Update filtered employees when search query changes
  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    const filtered = mockEmployees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(normalizedQuery) ||
        employee.id.toLowerCase().includes(normalizedQuery)
    );
    setFilteredEmployees(filtered);
  }, [searchQuery]);

  // Get all employees that should be displayed (filtered + selected)
  const displayedEmployees = [...new Set([
    ...filteredEmployees,
    ...mockEmployees.filter(emp => selectedEmployees.has(emp.id))
  ])];

  const handleEmployeeToggle = (employeeId: string) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Success",
        description: "Payslips resent successfully for selected employees!",
      });
      setSelectedEmployees(new Set());
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend payslips. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Resend Payslips to Employees</DialogTitle>
          <DialogDescription>
            Search for employees and select those who need their payslips resent.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or employee ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[300px] border rounded-md">
          <div className="p-4 space-y-2">
            {displayedEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md"
              >
                <Checkbox
                  id={employee.id}
                  checked={selectedEmployees.has(employee.id)}
                  onCheckedChange={() => handleEmployeeToggle(employee.id)}
                />
                <label
                  htmlFor={employee.id}
                  className="flex-1 flex items-center justify-between cursor-pointer text-sm"
                >
                  <span>{employee.name}</span>
                  <span className="text-muted-foreground">{employee.id}</span>
                </label>
              </div>
            ))}
            {displayedEmployees.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No employees found
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isResending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResend}
            disabled={selectedEmployees.size === 0 || isResending}
            className="min-w-[120px]"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend Payslips"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 