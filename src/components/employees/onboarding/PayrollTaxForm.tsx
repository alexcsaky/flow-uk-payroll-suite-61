
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
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { validateTaxCode } from "@/utils/hmrc-validation";

interface PayrollTaxFormProps {
  data: {
    salary: string;
    salaryPeriod: string;
    taxCode: string;
    niCategory: string;
    hasStudentLoan: boolean;
    studentLoanPlan: string;
    hasPension: boolean;
    pensionScheme: string;
    pensionContribution: string;
    p45Provided: boolean;
    previousEmployer: string;
    previousTaxPaid: string;
    previousEarnings: string;
    isComplete: boolean;
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PayrollTaxForm = ({
  data,
  updateData,
  onNext,
  onPrev,
}: PayrollTaxFormProps) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPostcodeField, setShowPostcodeField] = useState(false);
  const [postcode, setPostcode] = useState("");

  // Special NI categories that require workplace postcode (Freeport/Investment Zone)
  const specialNICategories = ["F", "I", "L", "S", "V"];

  useEffect(() => {
    setShowPostcodeField(specialNICategories.includes(data.niCategory));
  }, [data.niCategory]);

  const validateField = (field: string, value: string | boolean): string => {
    if (typeof value === "boolean") return "";
    
    switch (field) {
      case "salary":
        if (!value || value.trim() === "") return "Salary is required";
        const numValue = parseFloat(value.replace(/[^\d.-]/g, ""));
        if (isNaN(numValue) || numValue <= 0) {
          return "Please enter a valid salary amount";
        }
        return "";
      case "taxCode":
        if (!value || value.trim() === "") return "Tax code is required";
        return validateTaxCode(value) ? "" : "Please enter a valid tax code";
      case "postcode":
        if (showPostcodeField && (!value || value.trim() === "")) {
          return "Workplace postcode is required for this NI category";
        }
        return "";
      case "studentLoanPlan":
        if (data.hasStudentLoan && (!value || value === "")) {
          return "Please select a student loan plan";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: any) => {
    const error = typeof value === "boolean" ? "" : validateField(field, value);
    
    if (field === "postcode") {
      setPostcode(value);
      setFormErrors((prev) => ({
        ...prev,
        postcode: error,
      }));
      return;
    }
    
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    updateData({ [field]: value });
  };

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    newErrors.salary = validateField("salary", data.salary);
    newErrors.taxCode = validateField("taxCode", data.taxCode);
    
    // Conditional fields
    if (showPostcodeField) {
      newErrors.postcode = validateField("postcode", postcode);
    }
    
    if (data.hasStudentLoan) {
      newErrors.studentLoanPlan = validateField("studentLoanPlan", data.studentLoanPlan);
    }
    
    setFormErrors(newErrors);
    
    // Check if there are any error messages
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return !hasErrors;
  };

  const formatSalary = (value: string) => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");
    
    // Convert to a number and format with commas
    const number = parseFloat(numericValue);
    if (isNaN(number)) return "";
    
    return number.toLocaleString("en-GB", {
      minimumFractionDigits: numericValue.includes(".") ? 2 : 0,
      maximumFractionDigits: 2,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = checkFormValidity();
    if (isValid) {
      // If there's a postcode for special NI categories, include it in the update
      if (showPostcodeField) {
        updateData({ 
          isComplete: true,
          workplacePostcode: postcode
        });
      } else {
        updateData({ isComplete: true });
      }
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Payroll & Tax Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the employee's salary, tax codes, and other payroll-related information.
        </p>
      </div>

      {/* Salary Section */}
      <div className="space-y-6">
        <h4 className="text-md font-medium">Salary Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary" className="flex items-center">
              Salary Amount <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">£</span>
              <Input
                id="salary"
                value={data.salary}
                onChange={(e) => {
                  const formattedValue = formatSalary(e.target.value);
                  handleInputChange("salary", formattedValue);
                }}
                className={`pl-7 ${formErrors.salary ? "border-red-500" : ""}`}
              />
            </div>
            {formErrors.salary && (
              <p className="text-red-500 text-sm">{formErrors.salary}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salaryPeriod">Salary Period</Label>
            <Select
              value={data.salaryPeriod}
              onValueChange={(value) => handleInputChange("salaryPeriod", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tax & NI Section */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">Tax & National Insurance</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="taxCode" className="flex items-center">
                Tax Code <span className="text-red-500 ml-1">*</span>
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      This determines how much tax-free income the employee can receive.
                      Example tax codes: 1257L (basic), BR (basic rate), 0T (no allowance).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="taxCode"
              value={data.taxCode}
              onChange={(e) => handleInputChange("taxCode", e.target.value.toUpperCase())}
              className={formErrors.taxCode ? "border-red-500" : ""}
              placeholder="e.g. 1257L"
            />
            {formErrors.taxCode && (
              <p className="text-red-500 text-sm">{formErrors.taxCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="niCategory">
                NI Category
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      National Insurance category determines the rate of NI contributions.
                      Category A is standard for most employees. Special categories (F, I, L, S, V)
                      are for employees working in Freeport or Investment Zones.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={data.niCategory}
              onValueChange={(value) => handleInputChange("niCategory", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select NI category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A - Standard rate</SelectItem>
                <SelectItem value="B">B - Married women's reduced rate</SelectItem>
                <SelectItem value="C">C - Pension age (not liable)</SelectItem>
                <SelectItem value="F">F - Freeport employee</SelectItem>
                <SelectItem value="H">H - Apprentice under 25</SelectItem>
                <SelectItem value="I">I - Investment Zone employee</SelectItem>
                <SelectItem value="J">J - Veterans in first 12 months</SelectItem>
                <SelectItem value="M">M - Under 21s</SelectItem>
                <SelectItem value="Z">Z - Deferred NI (multiple employment)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showPostcodeField && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="postcode" className="flex items-center">
                  Workplace Postcode <span className="text-red-500 ml-1">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Required for employees in Freeport or Investment Zone areas to qualify
                        for special NI relief.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="postcode"
                value={postcode}
                onChange={(e) => handleInputChange("postcode", e.target.value.toUpperCase())}
                className={formErrors.postcode ? "border-red-500" : ""}
                placeholder="e.g. NE1 4ST"
              />
              {formErrors.postcode && (
                <p className="text-red-500 text-sm">{formErrors.postcode}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Student Loan Section */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">Additional Deductions</h4>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasStudentLoan"
              checked={data.hasStudentLoan}
              onCheckedChange={(checked) => handleInputChange("hasStudentLoan", !!checked)}
            />
            <Label htmlFor="hasStudentLoan">Student Loan Repayments Apply</Label>
          </div>

          {data.hasStudentLoan && (
            <div className="pl-6 space-y-2">
              <Label htmlFor="studentLoanPlan" className="flex items-center">
                Student Loan Plan <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={data.studentLoanPlan}
                onValueChange={(value) => handleInputChange("studentLoanPlan", value)}
              >
                <SelectTrigger className={formErrors.studentLoanPlan ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plan1">Plan 1</SelectItem>
                  <SelectItem value="plan2">Plan 2</SelectItem>
                  <SelectItem value="plan4">Plan 4 (Scotland)</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate Loan</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.studentLoanPlan && (
                <p className="text-red-500 text-sm">{formErrors.studentLoanPlan}</p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPension"
              checked={data.hasPension}
              onCheckedChange={(checked) => handleInputChange("hasPension", !!checked)}
            />
            <Label htmlFor="hasPension">Pension Scheme</Label>
          </div>

          {data.hasPension && (
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pensionScheme">Pension Scheme</Label>
                <Select
                  value={data.pensionScheme}
                  onValueChange={(value) => handleInputChange("pensionScheme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pension scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Company Pension</SelectItem>
                    <SelectItem value="nest">NEST</SelectItem>
                    <SelectItem value="people">The People's Pension</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pensionContribution">Employee Contribution (%)</Label>
                <Input
                  id="pensionContribution"
                  value={data.pensionContribution}
                  onChange={(e) => handleInputChange("pensionContribution", e.target.value)}
                  placeholder="e.g. 5"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* P45 Information */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">P45 Information</h4>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="p45Provided"
              checked={data.p45Provided}
              onCheckedChange={(checked) => handleInputChange("p45Provided", !!checked)}
            />
            <Label htmlFor="p45Provided">Employee has provided a P45</Label>
          </div>

          {data.p45Provided && (
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="previousEmployer">Previous Employer</Label>
                <Input
                  id="previousEmployer"
                  value={data.previousEmployer}
                  onChange={(e) => handleInputChange("previousEmployer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousTaxPaid">Previous Tax Paid</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">£</span>
                  <Input
                    id="previousTaxPaid"
                    value={data.previousTaxPaid}
                    onChange={(e) => handleInputChange("previousTaxPaid", formatSalary(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousEarnings">Previous Earnings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">£</span>
                  <Input
                    id="previousEarnings"
                    value={data.previousEarnings}
                    onChange={(e) => handleInputChange("previousEarnings", formatSalary(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
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
