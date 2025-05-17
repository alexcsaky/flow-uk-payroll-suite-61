
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  HelpCircle,
  Briefcase,
  Building,
  UserCheck,
  MapPin
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

interface JobDetailsFormProps {
  data: {
    title: string;
    department: string;
    startDate: string;
    employmentType: string;
    managerName: string;
    location: string;
    normalHours: string;
    irregularPayment: boolean;
    offPayrollWorker: boolean;
    secondedFromAbroad: boolean;
    isComplete: boolean;
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const JobDetailsForm = ({
  data,
  updateData,
  onNext,
  onPrev,
}: JobDetailsFormProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "startDate":
        return value === "" ? "Start date is required" : "";
      case "normalHours":
        if (value === "") return "Working hours are required";
        const hours = parseFloat(value);
        if (isNaN(hours) || hours <= 0 || hours > 168) {
          return "Please enter valid working hours (0-168)";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (typeof value === "boolean") {
      updateData({ [field]: value });
      return;
    }
    
    const error = validateField(field, value);
    
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    updateData({ [field]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      const error = validateField("startDate", dateString);
      setFormErrors((prev) => ({
        ...prev,
        startDate: error,
      }));
      updateData({ startDate: dateString });
    }
  };

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    newErrors.startDate = validateField("startDate", data.startDate);
    newErrors.normalHours = validateField("normalHours", data.normalHours || "");
    
    setFormErrors(newErrors);
    
    // Check if there are any error messages
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return !hasErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = checkFormValidity();
    if (isValid) {
      updateData({ isComplete: true });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Job Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter the employee's job information and employment details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Job Title
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Employee's official job title</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="flex items-center gap-1">
            <Building className="h-4 w-4 text-muted-foreground" />
            Department
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Department or business unit the employee works in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Select
            value={data.department}
            onValueChange={(value) => handleInputChange("department", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Legal">Legal</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Start Date <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>First day of employment - required for HMRC reporting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="startDate"
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  formErrors.startDate ? "border-red-500" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.startDate ? (
                  format(new Date(data.startDate), "PPP")
                ) : (
                  <span className="text-muted-foreground">Select start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.startDate ? new Date(data.startDate) : undefined}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formErrors.startDate && (
            <p className="text-red-500 text-sm">{formErrors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentType" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Employment Type <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Determines tax and NI calculations and employment rights</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Select
            value={data.employmentType}
            onValueChange={(value) => handleInputChange("employmentType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="director">Director</SelectItem>
              <SelectItem value="ir35-worker">IR35 Off-Payroll Worker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="normalHours" className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Normal Working Hours <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Standard weekly working hours (required for HMRC reporting)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="flex gap-2 items-center">
            <Input
              id="normalHours"
              type="number"
              min="0"
              max="168"
              step="0.5"
              value={data.normalHours || ""}
              onChange={(e) => handleInputChange("normalHours", e.target.value)}
              className={formErrors.normalHours ? "border-red-500" : ""}
            />
            <span className="text-sm text-muted-foreground">hours/week</span>
          </div>
          {formErrors.normalHours && (
            <p className="text-red-500 text-sm">{formErrors.normalHours}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="managerName" className="flex items-center gap-1">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            Manager's Name
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Employee's direct manager or supervisor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="managerName"
            value={data.managerName || ""}
            onChange={(e) => handleInputChange("managerName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Work Location
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Primary workplace location (office, remote, etc.)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="location"
            value={data.location || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g. London Office, Remote"
          />
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <h4 className="text-md font-medium">Additional Employment Information</h4>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="irregularPayment"
            checked={data.irregularPayment || false}
            onCheckedChange={(checked) => handleInputChange("irregularPayment", Boolean(checked))}
          />
          <Label htmlFor="irregularPayment" className="flex items-center gap-1">
            Irregular Payment Pattern
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Check if employee is paid irregularly, not on a fixed schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offPayrollWorker"
            checked={data.offPayrollWorker || false}
            onCheckedChange={(checked) => handleInputChange("offPayrollWorker", Boolean(checked))}
          />
          <Label htmlFor="offPayrollWorker" className="flex items-center gap-1">
            Off-Payroll Worker
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Check if worker falls under IR35 off-payroll working rules</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="secondedFromAbroad" 
            checked={data.secondedFromAbroad || false}
            onCheckedChange={(checked) => handleInputChange("secondedFromAbroad", Boolean(checked))}
          />
          <Label htmlFor="secondedFromAbroad" className="flex items-center gap-1">
            Seconded from Abroad
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Check if employee is temporarily transferred from overseas company</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};
