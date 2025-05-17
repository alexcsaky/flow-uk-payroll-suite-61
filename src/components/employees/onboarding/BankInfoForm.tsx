
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HelpCircle, Banknote, Building, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { validateBankAccount, validateSortCode } from "@/utils/hmrc-validation";

interface BankInfoFormProps {
  data: {
    accountName: string;
    accountNumber: string;
    sortCode: string;
    bankName: string;
    buildingSocietyRef: string;
    paymentMethod: string;
    payslipDelivery: string;
    payslipPassword: string;
    isComplete: boolean;
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const BankInfoForm = ({
  data,
  updateData,
  onNext,
  onPrev,
}: BankInfoFormProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "accountName":
        return value.trim() === "" && data.paymentMethod === "bacs" 
          ? "Account name is required" : "";
      case "accountNumber":
        if (data.paymentMethod !== "bacs") return "";
        if (value.trim() === "") return "Account number is required";
        if (!validateBankAccount(value)) return "Account number must be 8 digits";
        return "";
      case "sortCode":
        if (data.paymentMethod !== "bacs") return "";
        if (value.trim() === "") return "Sort code is required";
        if (!validateSortCode(value)) return "Sort code must be 6 digits";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Special handling for sort code formatting
    if (field === "sortCode") {
      // Remove any non-digit characters
      const cleanValue = value.replace(/\D/g, "");
      // Format as XX-XX-XX
      if (cleanValue.length > 0) {
        const parts = [];
        for (let i = 0; i < cleanValue.length && i < 6; i += 2) {
          parts.push(cleanValue.substring(i, i + 2));
        }
        processedValue = parts.join("-");
      } else {
        processedValue = "";
      }
    }
    
    // Validate and set error
    const error = validateField(field, processedValue);
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    // Update data
    updateData({ [field]: processedValue });
  };

  const handlePaymentMethodChange = (value: string) => {
    updateData({ paymentMethod: value });
    
    // Clear errors for bank fields if payment method is not bank transfer
    if (value !== "bacs") {
      setFormErrors((prev) => ({
        ...prev,
        accountName: "",
        accountNumber: "",
        sortCode: "",
      }));
    } else {
      // Re-validate bank fields if switching back to bank transfer
      const accountNameError = validateField("accountName", data.accountName);
      const accountNumberError = validateField("accountNumber", data.accountNumber);
      const sortCodeError = validateField("sortCode", data.sortCode);
      
      setFormErrors((prev) => ({
        ...prev,
        accountName: accountNameError,
        accountNumber: accountNumberError,
        sortCode: sortCodeError,
      }));
    }
  };

  const checkFormValidity = () => {
    // Only validate bank details if payment method is bank transfer
    if (data.paymentMethod === "bacs") {
      const newErrors: Record<string, string> = {};
      
      newErrors.accountName = validateField("accountName", data.accountName);
      newErrors.accountNumber = validateField("accountNumber", data.accountNumber);
      newErrors.sortCode = validateField("sortCode", data.sortCode);
      
      setFormErrors(newErrors);
      
      const hasErrors = Object.values(newErrors).some((error) => error !== "");
      return !hasErrors;
    }
    
    return true;
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
        <h3 className="text-lg font-medium">Bank & Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the employee's bank details and payment preferences.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-1">
          <h4 className="text-md font-medium">Payment Method</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>How the employee will receive their salary payments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <RadioGroup
          value={data.paymentMethod || "bacs"}
          onValueChange={handlePaymentMethodChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bacs" id="bacs" />
            <Label htmlFor="bacs" className="flex items-center gap-1">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              Bank Transfer (BACS)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Direct electronic payment to employee's bank account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cheque" id="cheque" />
            <Label htmlFor="cheque" className="flex items-center gap-1">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              Cheque
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Payment by paper cheque</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="flex items-center gap-1">
              <Banknote className="h-4 w-4 text-muted-foreground" />
              Cash
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Payment in cash (must still be reported to HMRC)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.paymentMethod === "bacs" && (
        <div className="space-y-6 pt-4 border-t">
          <div className="flex items-center gap-1">
            <h4 className="text-md font-medium">Bank Account Details</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Required for BACS payments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="accountName" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                Account Holder Name <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Name as it appears on the bank account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="accountName"
                value={data.accountName || ""}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
                className={formErrors.accountName ? "border-red-500" : ""}
              />
              {formErrors.accountName && (
                <p className="text-red-500 text-sm">{formErrors.accountName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                Bank Name
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Name of the bank or building society</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="bankName"
                value={data.bankName || ""}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="accountNumber" className="flex items-center gap-1">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Account Number <span className="text-red-500 ml-1">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>UK bank account numbers are 8 digits long</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="accountNumber"
                value={data.accountNumber || ""}
                onChange={(e) => {
                  // Only allow digits and limit to 8 characters
                  const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                  handleInputChange("accountNumber", value);
                }}
                className={formErrors.accountNumber ? "border-red-500" : ""}
              />
              {formErrors.accountNumber && (
                <p className="text-red-500 text-sm">{formErrors.accountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="sortCode" className="flex items-center gap-1">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Sort Code <span className="text-red-500 ml-1">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>UK sort codes are 6 digits, usually displayed as XX-XX-XX</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="sortCode"
                value={data.sortCode || ""}
                onChange={(e) => handleInputChange("sortCode", e.target.value)}
                className={formErrors.sortCode ? "border-red-500" : ""}
                placeholder="e.g. 12-34-56"
              />
              {formErrors.sortCode && (
                <p className="text-red-500 text-sm">{formErrors.sortCode}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buildingSocietyRef" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                Building Society Reference
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Roll number or reference (only required for building society accounts)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="buildingSocietyRef"
                value={data.buildingSocietyRef || ""}
                onChange={(e) => handleInputChange("buildingSocietyRef", e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 text-blue-800 rounded-md text-sm mt-4">
            <p className="font-medium">Important Security Notice</p>
            <p className="mt-1">
              Bank details are stored securely and encrypted. Only authorized payroll
              personnel will have access to this information.
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">Payslip Delivery Preferences</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="payslipDelivery" className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Payslip Delivery Method
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>How the employee would like to receive their payslips</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Select
              value={data.payslipDelivery || "portal"}
              onValueChange={(value) => handleInputChange("payslipDelivery", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portal">Employee Portal</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="print">Print</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {(data.payslipDelivery === "email" || data.payslipDelivery === "portal") && (
            <div className="space-y-2">
              <Label htmlFor="payslipPassword" className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Payslip Password
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Optional password to secure electronic payslips (e.g., last 4 digits of NI number)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="payslipPassword"
                value={data.payslipPassword || ""}
                onChange={(e) => handleInputChange("payslipPassword", e.target.value)}
                placeholder="e.g., last 4 of NI or date of birth"
              />
            </div>
          )}
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
