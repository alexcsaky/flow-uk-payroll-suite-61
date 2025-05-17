
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
import { CalendarIcon, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface JobDetailsFormProps {
  data: {
    title: string;
    department: string;
    startDate: string;
    employmentType: string;
    managerName: string;
    location: string;
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
      case "title":
      case "department":
        return value.trim() === "" ? "This field is required" : "";
      case "startDate":
        return value === "" ? "Start date is required" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
    newErrors.title = validateField("title", data.title);
    newErrors.department = validateField("department", data.department);
    newErrors.startDate = validateField("startDate", data.startDate);
    
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
          <Label htmlFor="title" className="flex items-center">
            Job Title <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={formErrors.title ? "border-red-500" : ""}
          />
          {formErrors.title && (
            <p className="text-red-500 text-sm">{formErrors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="flex items-center">
            Department <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={data.department}
            onValueChange={(value) => handleInputChange("department", value)}
          >
            <SelectTrigger className={formErrors.department ? "border-red-500" : ""}>
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
          {formErrors.department && (
            <p className="text-red-500 text-sm">{formErrors.department}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center">
            Start Date <span className="text-red-500 ml-1">*</span>
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
          <Label htmlFor="employmentType">
            <div className="flex items-center gap-1">
              Employment Type
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This will affect tax and NI calculations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="managerName">Manager's Name</Label>
          <Input
            id="managerName"
            value={data.managerName}
            onChange={(e) => handleInputChange("managerName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="location">Work Location</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Where the employee will primarily work (office location, remote, etc.)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g. London Office, Remote"
          />
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
