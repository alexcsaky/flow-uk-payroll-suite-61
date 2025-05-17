import { useState, useEffect } from "react";
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
import { CalendarIcon, HelpCircle, User, Phone, Mail, FileText, Home, Globe } from "lucide-react";
import { validateNINumber, validatePostcode } from "@/utils/hmrc-validation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PersonalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      county: string;
      postcode: string;
      country: string; // Added missing country property
    };
    niNumber: string;
    isComplete: boolean;
  };
  updateData: (data: any) => void;
  onNext: () => void;
}

export const PersonalInfoForm = ({
  data,
  updateData,
  onNext,
}: PersonalInfoFormProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showAddressFields, setShowAddressFields] = useState(false);

  // Check if NI number is provided, if not, show address fields
  useEffect(() => {
    setShowAddressFields(!data.niNumber || data.niNumber === "");
  }, [data.niNumber]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "phone":
        return value.trim() !== "" && !/^(\+?[0-9]{10,15})$/.test(value)
          ? "Please enter a valid phone number"
          : "";
      case "niNumber":
        return value.trim() !== "" && !validateNINumber(value)
          ? "Please enter a valid NI number (e.g., QQ123456C)"
          : "";
      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        const dob = new Date(value);
        const now = new Date();
        const age = now.getFullYear() - dob.getFullYear();
        return age < 16 || age > 100 ? "Employee must be between 16 and 100 years old" : "";
      case "address.postcode":
        return value.trim() !== "" && !validatePostcode(value)
          ? "Please enter a valid UK postcode"
          : "";
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

    // Special handling for nested address fields
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      updateData({
        address: {
          ...data.address,
          [addressField]: value,
        },
      });
    } else {
      updateData({ [field]: value });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      const error = validateField("dateOfBirth", dateString);
      setFormErrors((prev) => ({
        ...prev,
        dateOfBirth: error,
      }));
      updateData({ dateOfBirth: dateString });
    }
  };

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    newErrors.firstName = validateField("firstName", data.firstName);
    newErrors.lastName = validateField("lastName", data.lastName);
    newErrors.email = validateField("email", data.email);
    newErrors.dateOfBirth = validateField("dateOfBirth", data.dateOfBirth);
    
    // Conditional fields
    if (!data.niNumber || data.niNumber === "") {
      newErrors["address.line1"] = data.address.line1 ? "" : "Address is required when NI number is not provided";
      newErrors["address.city"] = data.address.city ? "" : "City is required when NI number is not provided";
      newErrors["address.postcode"] = data.address.postcode ? "" : "Postcode is required when NI number is not provided";
    } else {
      newErrors.niNumber = validateField("niNumber", data.niNumber);
    }
    
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
        <h3 className="text-lg font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the employee's personal details as they appear on official documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-1">
            <User className="h-4 w-4 text-muted-foreground" />
            First Name <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Legal first name as it appears on official ID documents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={formErrors.firstName ? "border-red-500" : ""}
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm">{formErrors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-1">
            <User className="h-4 w-4 text-muted-foreground" />
            Last Name <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Legal surname as it appears on official ID documents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={formErrors.lastName ? "border-red-500" : ""}
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm">{formErrors.lastName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Email Address <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Primary contact email for payslips and HR communications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={formErrors.email ? "border-red-500" : ""}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Phone Number
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Primary contact phone number for HR communications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={formErrors.phone ? "border-red-500" : ""}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            Date of Birth <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Required for HMRC reporting and pension auto-enrollment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  formErrors.dateOfBirth ? "border-red-500" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dateOfBirth ? (
                  format(new Date(data.dateOfBirth), "PPP")
                ) : (
                  <span className="text-muted-foreground">Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dateOfBirth ? new Date(data.dateOfBirth) : undefined}
                onSelect={handleDateChange}
                disabled={(date) => {
                  const now = new Date();
                  const sixteenYearsAgo = new Date();
                  sixteenYearsAgo.setFullYear(now.getFullYear() - 16);
                  const hundredYearsAgo = new Date();
                  hundredYearsAgo.setFullYear(now.getFullYear() - 100);
                  return date > sixteenYearsAgo || date < hundredYearsAgo;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formErrors.dateOfBirth && (
            <p className="text-red-500 text-sm">{formErrors.dateOfBirth}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="flex items-center gap-1">
            <User className="h-4 w-4 text-muted-foreground" />
            Gender <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Required for HMRC and pension reporting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Select
            value={data.gender}
            onValueChange={(value) => handleInputChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="not-specified">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="niNumber" className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              National Insurance Number
              {!showAddressFields && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>
                    Format: two letters, six numbers, and one letter (e.g., AB123456C). 
                    Required for HMRC reporting. If not available, complete address section.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="niNumber"
            value={data.niNumber}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().replace(/\s/g, "");
              handleInputChange("niNumber", value);
            }}
            className={formErrors.niNumber ? "border-red-500" : ""}
            placeholder="e.g. AA123456C"
          />
          {formErrors.niNumber && (
            <p className="text-red-500 text-sm">{formErrors.niNumber}</p>
          )}
        </div>
      </div>

      {showAddressFields && (
        <>
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-lg font-medium">Address Information</h3>
            <p className="text-sm text-muted-foreground">
              Please provide the employee's full address as it will be required for HMRC records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="addressLine1" className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                Address Line 1 <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Building number/name and street name (required when no NI number)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="addressLine1"
                value={data.address.line1}
                onChange={(e) => handleInputChange("address.line1", e.target.value)}
                className={formErrors["address.line1"] ? "border-red-500" : ""}
              />
              {formErrors["address.line1"] && (
                <p className="text-red-500 text-sm">{formErrors["address.line1"]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine2" className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                Address Line 2
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Additional address information if needed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="addressLine2"
                value={data.address.line2}
                onChange={(e) => handleInputChange("address.line2", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                City <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>City or town name (required when no NI number)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="city"
                value={data.address.city}
                onChange={(e) => handleInputChange("address.city", e.target.value)}
                className={formErrors["address.city"] ? "border-red-500" : ""}
              />
              {formErrors["address.city"] && (
                <p className="text-red-500 text-sm">{formErrors["address.city"]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="county" className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                County
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>County name (optional)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="county"
                value={data.address.county}
                onChange={(e) => handleInputChange("address.county", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode" className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                Postcode <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>UK postcode in valid format (required when no NI number)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="postcode"
                value={data.address.postcode}
                onChange={(e) => handleInputChange("address.postcode", e.target.value)}
                className={formErrors["address.postcode"] ? "border-red-500" : ""}
              />
              {formErrors["address.postcode"] && (
                <p className="text-red-500 text-sm">{formErrors["address.postcode"]}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Country <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Country of residence (required when no NI number)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={data.address.country || "GB"}
                onValueChange={(value) => handleInputChange("address.country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="IE">Ireland</SelectItem>
                  <SelectItem value="ES">Spain</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-4">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};
