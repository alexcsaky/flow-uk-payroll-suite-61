
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
import { HelpCircle, PiggyBank, Calendar, FileText, Building } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { validateTaxCode, isFreeportOrInvestmentZoneCategory, validatePostcode } from "@/utils/hmrc-validation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface PayrollTaxFormProps {
  data: {
    salary: string;
    salaryPeriod: string;
    taxCode: string;
    w1m1Basis: boolean;
    niCategory: string;
    niCategoryStartDate: string;
    isDirector: boolean;
    directorNiMethod: string;
    exemptFromNi: boolean;
    workplacePostcode: string;
    hasStudentLoan: boolean;
    studentLoanPlan: string;
    hasPostgradLoan: boolean;
    starterDeclaration: string;
    previousPayToDate: string;
    previousTaxToDate: string;
    secondedEmployee: boolean;
    hasPension: boolean;
    pensionScheme: string;
    pensionContribution: string;
    p45Provided: boolean;
    previousEmployer: string;
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

  // Special NI categories that require workplace postcode (Freeport/Investment Zone)
  useEffect(() => {
    setShowPostcodeField(isFreeportOrInvestmentZoneCategory(data.niCategory));
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
      case "workplacePostcode":
        if (showPostcodeField && (!value || value.trim() === "")) {
          return "Workplace postcode is required for this NI category";
        }
        if (value && !validatePostcode(value)) {
          return "Please enter a valid UK postcode";
        }
        return "";
      case "studentLoanPlan":
        if (data.hasStudentLoan && (!value || value === "")) {
          return "Please select a student loan plan";
        }
        return "";
      case "starterDeclaration":
        if (!data.p45Provided && (!value || value === "")) {
          return "Please select a starter declaration";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: any) => {
    const error = typeof value === "boolean" ? "" : validateField(field, value);
    
    setFormErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    updateData({ [field]: value });
  };

  const handleDateChange = (date: Date | undefined, field: string) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      updateData({ [field]: dateString });
    }
  };

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    newErrors.salary = validateField("salary", data.salary);
    newErrors.taxCode = validateField("taxCode", data.taxCode);
    
    // Conditional fields
    if (showPostcodeField) {
      newErrors.workplacePostcode = validateField("workplacePostcode", data.workplacePostcode || "");
    }
    
    if (data.hasStudentLoan) {
      newErrors.studentLoanPlan = validateField("studentLoanPlan", data.studentLoanPlan || "");
    }

    if (!data.p45Provided) {
      newErrors.starterDeclaration = validateField("starterDeclaration", data.starterDeclaration || "");
    }
    
    setFormErrors(newErrors);
    
    // Check if there are any error messages
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return !hasErrors;
  };

  const formatCurrency = (value: string) => {
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
      updateData({ isComplete: true });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Payroll & Tax Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the employee's tax codes, National Insurance details, and other payroll information.
        </p>
      </div>

      {/* Salary Section */}
      <div className="space-y-6">
        <h4 className="text-md font-medium">Salary Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary" className="flex items-center gap-1">
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
              Salary Amount <span className="text-red-500 ml-1">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Gross salary or wage rate before deductions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">£</span>
              <Input
                id="salary"
                value={data.salary}
                onChange={(e) => {
                  const formattedValue = formatCurrency(e.target.value);
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
            <Label htmlFor="salaryPeriod" className="flex items-center gap-1">
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
              Salary Period <span className="text-red-500 ml-1">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>How often the employee is paid</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
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
                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                <SelectItem value="4-weekly">4-Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tax Details Section */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">Tax Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="taxCode" className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Tax Code <span className="text-red-500 ml-1">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>
                      Tax code determines tax-free allowance. Common formats: 1257L (standard),
                      BR (basic rate), 0T (no allowance), K-codes (reduced allowance)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
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

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="w1m1Basis"
                checked={data.w1m1Basis || false}
                onCheckedChange={(checked) => handleInputChange("w1m1Basis", Boolean(checked))}
              />
              <Label htmlFor="w1m1Basis" className="flex items-center gap-1">
                Week 1/Month 1 Basis
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        Non-cumulative tax calculation. Each pay period is taxed in isolation
                        without considering previous earnings in the tax year.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
          </div>
        </div>

        {/* P45 Information */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="p45Provided"
              checked={data.p45Provided || false}
              onCheckedChange={(checked) => handleInputChange("p45Provided", Boolean(checked))}
            />
            <Label htmlFor="p45Provided" className="flex items-center gap-1">
              Employee has provided a P45
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>
                      P45 shows tax and earnings from previous employment in current tax year
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>

          {data.p45Provided ? (
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="previousEmployer" className="flex items-center gap-1">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Previous Employer
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>Name of previous employer as shown on P45</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="previousEmployer"
                  value={data.previousEmployer || ""}
                  onChange={(e) => handleInputChange("previousEmployer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousPayToDate" className="flex items-center gap-1">
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                  Previous Pay to Date
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>Total pay from previous employment this tax year (from P45)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">£</span>
                  <Input
                    id="previousPayToDate"
                    value={data.previousPayToDate || ""}
                    onChange={(e) => handleInputChange("previousPayToDate", formatCurrency(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousTaxToDate" className="flex items-center gap-1">
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                  Previous Tax Paid
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>Total tax paid in previous employment this tax year (from P45)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">£</span>
                  <Input
                    id="previousTaxToDate"
                    value={data.previousTaxToDate || ""}
                    onChange={(e) => handleInputChange("previousTaxToDate", formatCurrency(e.target.value))}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="pl-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="starterDeclaration" className="flex items-center gap-1">
                  Starter Declaration <span className="text-red-500 ml-1">*</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>
                          Required when no P45 is provided. Statement A: First job since April 6.
                          Statement B: Only job now but worked since April 6.
                          Statement C: Have another job or pension.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={data.starterDeclaration || ""}
                  onValueChange={(value) => handleInputChange("starterDeclaration", value)}
                >
                  <SelectTrigger className={formErrors.starterDeclaration ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select statement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Statement A: This is my first job since April 6</SelectItem>
                    <SelectItem value="B">Statement B: This is now my only job, but since April 6 I've had another job</SelectItem>
                    <SelectItem value="C">Statement C: I have another job or pension</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.starterDeclaration && (
                  <p className="text-red-500 text-sm">{formErrors.starterDeclaration}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* National Insurance Section */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">National Insurance</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="niCategory" className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              NI Category <span className="text-red-500 ml-1">*</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>
                      National Insurance category determines contribution rates.
                      Category A is standard for most employees.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
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
                <SelectItem value="L">L - Freeport/IZ deferment</SelectItem>
                <SelectItem value="M">M - Under 21s</SelectItem>
                <SelectItem value="S">S - Social security agreement</SelectItem>
                <SelectItem value="V">V - Veterans plus Freeport/IZ</SelectItem>
                <SelectItem value="Z">Z - Deferred NI (multiple employment)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="niCategoryStartDate" className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              NI Category Start Date
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Date when this NI category became applicable</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {data.niCategoryStartDate ? (
                    format(new Date(data.niCategoryStartDate), "PPP")
                  ) : (
                    <span className="text-muted-foreground">Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.niCategoryStartDate ? new Date(data.niCategoryStartDate) : undefined}
                  onSelect={(date) => handleDateChange(date, "niCategoryStartDate")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {showPostcodeField && (
            <div className="space-y-2">
              <Label htmlFor="workplacePostcode" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                Workplace Postcode <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        Required for Freeport/Investment Zone relief. Must be valid postcode
                        within designated Freeport or Investment Zone area.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="workplacePostcode"
                value={data.workplacePostcode || ""}
                onChange={(e) => handleInputChange("workplacePostcode", e.target.value.toUpperCase())}
                className={formErrors.workplacePostcode ? "border-red-500" : ""}
                placeholder="e.g. NE1 4ST"
              />
              {formErrors.workplacePostcode && (
                <p className="text-red-500 text-sm">{formErrors.workplacePostcode}</p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDirector"
                checked={data.isDirector || false}
                onCheckedChange={(checked) => handleInputChange("isDirector", Boolean(checked))}
              />
              <Label htmlFor="isDirector" className="flex items-center gap-1">
                Company Director
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>Different NI calculation methods apply to company directors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>

            {data.isDirector && (
              <div className="pl-6 space-y-2">
                <Label htmlFor="directorNiMethod" className="flex items-center gap-1">
                  Director NI Method
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <p>
                          Directors can use cumulative (annual) or alternative (standard) NI calculation method.
                          Cumulative is the default.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={data.directorNiMethod || "cumulative"}
                  onValueChange={(value) => handleInputChange("directorNiMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cumulative">Cumulative (Annual)</SelectItem>
                    <SelectItem value="alternate">Alternative (Standard)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="exemptFromNi"
                checked={data.exemptFromNi || false}
                onCheckedChange={(checked) => handleInputChange("exemptFromNi", Boolean(checked))}
              />
              <Label htmlFor="exemptFromNi" className="flex items-center gap-1">
                Exempt from NI
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        Check if employee has exemption certificate or is otherwise not liable for NI
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Student Loan Section */}
      <div className="space-y-6 pt-4 border-t">
        <h4 className="text-md font-medium">Student & Postgraduate Loans</h4>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasStudentLoan"
              checked={data.hasStudentLoan || false}
              onCheckedChange={(checked) => handleInputChange("hasStudentLoan", Boolean(checked))}
            />
            <Label htmlFor="hasStudentLoan" className="flex items-center gap-1">
              Student Loan Repayments Apply
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Check if employee is repaying a student loan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>

          {data.hasStudentLoan && (
            <div className="pl-6 space-y-2">
              <Label htmlFor="studentLoanPlan" className="flex items-center gap-1">
                Student Loan Plan <span className="text-red-500 ml-1">*</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>
                        Different plans have different thresholds and rates:
                        Plan 1: Pre-2012 loans (England/Wales) and Scotland. 
                        Plan 2: Post-2012 loans (England/Wales).
                        Plan 4: Scotland from 2021.
                        Plan 5: Post-2023 loans (England/Wales).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={data.studentLoanPlan || ""}
                onValueChange={(value) => handleInputChange("studentLoanPlan", value)}
              >
                <SelectTrigger className={formErrors.studentLoanPlan ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Plan 1</SelectItem>
                  <SelectItem value="2">Plan 2</SelectItem>
                  <SelectItem value="4">Plan 4 (Scotland)</SelectItem>
                  <SelectItem value="5">Plan 5 (England/Wales from 2023)</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.studentLoanPlan && (
                <p className="text-red-500 text-sm">{formErrors.studentLoanPlan}</p>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPostgradLoan"
              checked={data.hasPostgradLoan || false}
              onCheckedChange={(checked) => handleInputChange("hasPostgradLoan", Boolean(checked))}
            />
            <Label htmlFor="hasPostgradLoan" className="flex items-center gap-1">
              Postgraduate Loan
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Check if employee is repaying a postgraduate loan</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
          </div>
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
